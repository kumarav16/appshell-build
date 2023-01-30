__='
   *************************************************
    BH [Highly] Confidential
    [Unpublished] Copyright 2020.  Baker Hughes
   
    NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
    its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
    and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
    reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
   **************************************************
   
'
rr() {

  echo  $(caller) >&2

  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $@" >&2

}

fetch_access_token() {

    local build_uaa_url=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.env_details.uaa_url" "escapeQuotes")

    local build_uaa_token=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.env_details.uaa_auth" "escapeQuotes")

    local api_response="$(curl -X GET "${build_uaa_url}" -H "authorization: ${build_uaa_token}")"

    if [[ ! $? -eq 0 ]]

    then

      err "$(caller) Not able to fetch access token. Exiting"

      exit 1



    fi

    access_token="$(echo "${api_response}" | jq '.access_token' | tr -d '"')"

    if [[ -z "${access_token}" || "${access_token}" == "null" ]]

    then

      err "$(caller) Not able to fetch access token. Api response was : $api_response"

      exit 1



    fi

    echo $access_token

}



parseNestedFileJson() {

    local json_variable="$1"

    local key="$2"



    if [[ $3 == "escapeQuotes" ]]

    then

        value=$(echo `${json_variable}` | jq '.'"${key}"'' | tr -d '"')

    else 

        value=$(echo `${json_variable}` | jq '.'"${key}"'')

    fi



    if [[ -z "${value}" || "${value}" == "null" ]]

    then

      err "$(caller) Not able to fetch ${key} from ${json_variable} json.....${value}. Exiting"

      exit 1

    fi

    echo ${value}

}



notifyUser() {

  local buildStatus=$1;

  if [[ $2 == "build" ]]

    then

    local localnotifyText="Branch Name : ${CHECKOUT_BRANCH/origin\/} \nBuild ID: ${BUILD_ID}\nBuilt by: ${BUILD_USER}"

    if [[ $1 == "success" ]]

      then

        local notifyMessage="<!here> Build Successful: ${SERVICE_NAME}"

        local notifyColor="#0000FF"

      else 

        local notifyMessage="<!here> Build Failed: ${SERVICE_NAME}"

        local notifyColor="#FF0000"

    fi

  elif [[ $2 == "deploy" ]]

  local localnotifyText="Branch Name: ${CHECKOUT_BRANCH/origin\/} \nTarget Environment: ${DEPLOY_ENVIRONMENT}\nDeployed by: ${BUILD_USER}"

    then

      if [[ $1 == "success" ]]

        then

          local notifyMessage="<!here> Deployment Successful: ${SERVICE_NAME} !"

          local notifyColor="#0000FF"

        else 

          local notifyMessage="<!here> Deployment Failed: ${SERVICE_NAME}"

          local notifyColor="#FF0000"

      fi

  fi



  local slackurl=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.slack_webhook_url" "escapeQuotes")



  local api_response=$(curl -X POST ${slackurl}  -H 'content-type: application/json' -d "{

        \"attachments\": [{

          \"fallback\": \"${notifyMessage}\",

          \"color\": \"${notifyColor}\",

          \"title\":\"${notifyMessage}\",

          \"text\":\"${localnotifyText}\",

          \"actions\": [{

            \"type\": \"button\",

            \"name\": \"Jenkins Build Url\",

            \"text\": \"Click to View Build Details :jenkins-ci:\",

            \"url\": \"${BUILD_URL}\",

            \"style\": \"primary\"

          }],

          \"footer\": \"BHGE Digital\",

          \"ts\": \"'$(date +%s)'\"

        }]

   }")

   if [[ ! $? -eq 0 ]]

    then

      err "$(caller) Not able to fetch details of run id. Exiting"

      exit 1



    fi

    if [[ -z "${api_response}" || "${api_response}" == "null" ]]

    then

      err "$(caller) Not able to fetch details of run id. Api response was : $api_response"

      exit 1



    fi

    echo $api_response

}



prepareBuildDetails() {

  build_date=`date`

  jq -n "{\"${SERVICE_NAME}\": {\"version\": \"${CHECKOUT_BRANCH}_${BUILD_ID}\", \"image_name\": \"${qaDockerRegistry}/${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID}\", \"date_time\": \"${build_date}\", \"git_latest_commit\": \"${GIT_COMMIT}\", \"jenkins_build_url\": \"${BUILD_URL}\", \"artifactory_path\": \"ARTIFACTORY PATH\"}}" > builddetails.json

}



getBuildMetaData() {

  local build_metadata="${BUILD_METADATA_URL}${BUILD_METADATA_PATH}"

  if [[ $1 == "deploy" ]]

  then

   build_metadata="${BUILD_METADATA_URL}${BUILD_METADATA_PATH}/env_details_${DEPLOY_ENVIRONMENT}.json"

  fi

  curl -u "${ARTIFACTORY_TOKEN}" "${build_metadata}"  -o "./buildMetaData.json"

}





pushImageToDocker() {

  local docker_registry=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.build_registry.url" "escapeQuotes")

  local docker_username=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.build_registry.username" "escapeQuotes")

  local docker_password=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.build_registry.password" "escapeQuotes")

  local SERVICE=`echo ${SERVICE_NAME} | awk -F"_" '{ print $1}'`

  docker login -u ${docker_username} -p ${docker_password} ${docker_registry}

  docker build -t ${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID} .

  docker tag ${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID} ${docker_registry}/${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID}

  docker push ${docker_registry}/${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID}

}



updateCatalog() {

  local BUILD_CATALOG_URL=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.env_details.env_details_url" "escapeQuotes")

  local SERVICES_DEPLOY_DETAILS_ID=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.env_details.env_details_id" "escapeQuotes")

  local docker_registry=$(parseNestedFileJson "cat buildMetaData.json" "misc_meta.build_registry.url" "escapeQuotes")

  ACCESS_TOKEN="$(fetch_access_token)"

  build_date=`date`

  local SERVICE=`echo ${SERVICE_NAME} | awk -F"_" '{ print $1}'`

  local api_response=$(curl --request PATCH "${BUILD_CATALOG_URL}/${SERVICES_DEPLOY_DETAILS_ID}" -H "authorization: Bearer ${ACCESS_TOKEN}" -H 'content-type: application/json' -H 'Cache-Control: no-cache' -d "{  

   \"name\":\"services_deploy_details\",

   \"description\":\"Build Details for all services based on branch name\",

   \"misc_meta\": {

   \"${CHECKOUT_BRANCH/origin\/}\": {

      \"${SERVICE_NAME}\": {

        \"latest\": {

          \"image_name\": \"${docker_registry}/${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID}\",

          \"date_time\": \"${build_date}\",

          \"artifactory_path\":\"GET THIS VALUE FROM ENV\",

          \"git_latest_commit\":\"${GIT_COMMIT}\",

          \"jenkins_build_url\": \"${BUILD_URL}\",

          \"jenkins_build_tag\":\"${BUILD_TAG}\"

        },

        \"jenkins_build_${BUILD_ID}\": {

          \"image_name\": \"${docker_registry}/${SERVICE_NAME}:${CHECKOUT_BRANCH}_${BUILD_ID}\",

          \"date_time\": \"${build_date}\",

          \"artifactory_path\":\"GET THIS VALUE FROM ENV\",

          \"git_latest_commit\":\"${GIT_COMMIT}\",

          \"jenkins_build_url\": \"${BUILD_URL}\",

          \"jenkins_build_tag\":\"${BUILD_TAG}\"

        }

      }

   }

   }

   }")

    if [[ ! $? -eq 0 ]]

    then

      err "$(caller) Not able to fetch details of run id. Exiting"

      exit 1



    fi

    if [[ -z "${api_response}" || "${api_response}" == "null" ]]

    then

      err "$(caller) Not able to fetch details of run id. Api response was : $api_response"

      exit 1



    fi

    echo $api_response

}
