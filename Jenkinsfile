pipeline {
  agent {
    docker {
      args '-u root'
      image 'node'
    }
    
  }
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh '''rm -rf node_modules/

wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

npm rebuild node-sass

npm install -g @angular/cli@1.4.9 --unsafe

npm install'''
            slackSend(message: 'Started build', token: 'G4RX8a36M699Ws964k2oQHQj', color: '#00ff00', channel: 'build-status', baseUrl: 'https://testiranje-raf.slack.com/services/hooks/jenkins-ci/')
          }
        }
        stage('list files') {
          steps {
            sh 'ls -a'
          }
        }
        stage('build failed') {
          steps {
            catchError() {
              slackSend(message: 'Build failed', color: '#ff0000', failOnError: true, baseUrl: 'https://testiranje-raf.slack.com/services/hooks/jenkins-ci/', token: 'G4RX8a36M699Ws964k2oQHQj', channel: 'build-status')
            }
            
          }
        }
      }
    }
    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            sh '''ls -a

npm test

npm run lint:ci'''
          }
        }
        stage('tests failed') {
          steps {
            catchError() {
              slackSend(message: 'Tests and lint Failed', color: '#ff0000', channel: 'build-status', token: 'G4RX8a36M699Ws964k2oQHQj', baseUrl: 'https://testiranje-raf.slack.com/services/hooks/jenkins-ci/')
            }
            
          }
        }
      }
    }
    stage('Post') {
      steps {
        echo 'Build and test end'
        sh '''echo ${BRANCH_NAME}

if [ "${BRANCH_NAME}" == "master" ]
then
    git checkout --f master
elif [ "${BRANCH_NAME}" == "develop" ]
then 
    git checkout --f develop
else echo "This branch should not deploy"
fi'''
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '/home/jenkins'
  }
}