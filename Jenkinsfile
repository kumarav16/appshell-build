pipeline {
    agent any
    environment{
                Azure_token = credentials('AZURE_SP_ID')
                AZURE_STORAGE_ACCOUNT='appshellsa'
                AZURE_CONTAINER_NAME='buildappshell'
            }
    stages {
         stage('Build'){
        steps{
        sh ''' #!/bin/bash
        rm -rf *
        mkdir text
        #cd "C:/Users/kumarav16/OneDrive - Baker Hughes/Documents/repo/app-shell/client/build/static/"
        #ls -a
        cp -r "C:/Users/kumarav16/OneDrive - Baker Hughes/Documents/repo/app-shell/client/build/static/" ./text
        #echo Hello Azure Storage from Jenkins2 > ./text/hello.txt
        #date > ./text/date.txt
            '''
        }
         }
        stage('Azure login'){
            steps{
                 sh '''
              echo $container_name
              # Login to Azure with ServicePrincipal
              az login --service-principal -u $Azure_token_CLIENT_ID -p $Azure_token_CLIENT_SECRET -t $Azure_token_TENANT_ID
              # Set default subscription
              az account set --subscription $Azure_token_SUBSCRIPTION_ID
              # Execute upload to Azure
              #az storage container create --account-name $AZURE_STORAGE_ACCOUNT --name $JOB_NAME --auth-mode login
              az storage blob upload-batch  --overwrite --destination $AZURE_CONTAINER_NAME --source ./text --account-name $AZURE_STORAGE_ACCOUNT
              # Logout from Azure
              az logout
            '''
            }
        }
    
   
        
        
    }
}
