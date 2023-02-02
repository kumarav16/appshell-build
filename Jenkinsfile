pipeline {
  agent any
  environment {
    AZURE_SUBSCRIPTION_ID='142a3641-1645-44ca-9ab0-286cfda5ad34'
    AZURE_TENANT_ID='9e0a6f2e-e851-416c-8abf-5443a828278e'
    AZURE_STORAGE_ACCOUNT='appshellsa'
    AZURE_CLIENT_SECRET='upF8Q~23mRfzp1Ou28L4AAEb1jYrRaKCcXbC1bty'
    AZURE_CLIENT_ID='49d8a0af-b599-48b2-a4c1-429403d539cb'
    
  }
  stages{
    stage('Build'){
        steps{
        sh ''' #!/bin/bash
        sh 'rm -rf *'
        sh 'mkdir text'
        sh 'echo Hello Azure Storage from Jenkins > ./text/hello.txt'
        sh 'date > ./text/date.txt'
            '''
        }
    }
  }
  post{
    success{
        withCredentials([usernamePassword(credentialsId: 'azuresp', 
                          passwordVariable: 'AZURE_CLIENT_SECRET', 
                          usernameVariable: 'AZURE_CLIENT_ID')]) {
                             sh ''' #!/bin/bash
              echo $container_name
              # Login to Azure with ServicePrincipal
              az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID
              # Set default subscription
              az account set --subscription $AZURE_SUBSCRIPTION_ID
              # Execute upload to Azure
              az storage container create --account-name $AZURE_STORAGE_ACCOUNT --name $JOB_NAME --auth-mode login
              az storage blob upload-batch --destination ${JOB_NAME} --source ./text --account-name $AZURE_STORAGE_ACCOUNT
              # Logout from Azure
              az logout
            '''

    }
  }
  }
}
 