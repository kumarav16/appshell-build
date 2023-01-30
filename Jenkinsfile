pipeline { 
    agent { label 'dkr-lbl' }
    environment {
        HOME = '.'
        SERVICE_NAME = 'appshell_app'
        BUILD_METADATA_PATH = "/APM-Onshore/com/ge/ogd/deploy-meta/build_details.json"
    }
    stages {
        stage('Get Build Metadata') {
            steps {
            withCredentials([string(credentialsId: 'artifactory_base_url', variable: 'BUILD_METADATA_URL'), 
                                string(credentialsId: 'artifactory_token', variable: 'ARTIFACTORY_TOKEN')]) {
                sh '''#!/bin/bash
                    chmod +x $WORKSPACE/deploy/functions.sh
                    source ./deploy/functions.sh
                    echo "Build MetaData $(getBuildMetaData "build")"
                    echo "prepare build details $(prepareBuildDetails)"
                '''
            }
        }
        }
        stage('Checkout SCM Code') {
            steps {
                sh 'printenv'
                git branch: "${CHECKOUT_BRANCH}", credentialsId: '3b6f74f4-cf49-46be-9722-f17595f332b5', url: 'https://github.build.ge.com/OG-Commons/app-shell/'
            }
        }
        stage('npm install') {
            steps {
            sh 'rm -f package-lock.json'
            sh 'npm cache clean --force'
            sh 'rm -rf node_modules'
            sh 'npm i npm@latest'
            sh 'npm install'
            }
        }
        stage('Run Unit Test Cases') {
            steps {
                echo "Printing Env Variables"
                sh 'printenv'
                sh 'npm run test'
                //sh 'npm run sonar'
            }
        }
        stage('build docker image'){
            steps{                
                sh '''#!/bin/bash
                    chmod +x $WORKSPACE/deploy/functions.sh
                    source ./deploy/functions.sh
                    echo "Push Image to Docker $(pushImageToDocker)"
                '''    
            }
        }
        stage('update build details to catalog'){
           steps {
               sh '''#!/bin/bash
               chmod +x $WORKSPACE/deploy/functions.sh
               source ./deploy/functions.sh
               echo "Update build details $(updateCatalog)"
               '''
            }
           
        }
        stage('Dev Deployment') {
            when {
                expression {env.BRANCH_NAME == 'PR-208'}
            }
            steps {                
                withCredentials([string(credentialsId: 'build_catalog_dev_auth', variable: 'UAA_TOKEN'), 
                                string(credentialsId: 'build_catalog_dev_url', variable: 'UAA_URL'),
                                string(credentialsId:'build_catalog_dev_details_url', variable:'BUILD_CATALOG_URL')]) {
                    sh '''#!/bin/bash
                        chmod +x $WORKSPACE/deploy/configure.sh
                        ./deploy/configure.sh
                    '''
                }
            }
        }
    }
    post {
        cleanup {
            script {
            echo 'Cleaning up the Workspaces'
            sh '''
            echo "Deleting Docker Images Created during the build."
            SERVICE=`echo ${SERVICE_NAME} | awk -F"_" '{ print $1}'`
            #docker images | grep "${SERVICE}_" | awk '{print $1 ":" $2}' | xargs docker rmi
            '''
            }
            deleteDir()
        }
        failure {
            wrap([$class: 'BuildUser']) {           
                sh '''#!/bin/bash
                    chmod +x $WORKSPACE/deploy/functions.sh
                    source ./deploy/functions.sh
                    echo "notify $(notifyUser "failure" "build")"
                '''
            }
            
        }
        success {
            wrap([$class: 'BuildUser']) {                        
                sh '''#!/bin/bash
                    chmod +x $WORKSPACE/deploy/functions.sh
                    source ./deploy/functions.sh
                    echo "notify $(notifyUser "success" "build")"
                '''
        }
        }
    }
}

