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

npm rebuild node-sass

npm install -g @angular/cli@1.4.9 --unsafe 

npm install'''
          }
        }
        stage('list files') {
          steps {
            sh 'ls -a'
          }
        }
      }
    }
    stage('Test') {
      steps {
        sh '''ls -a

npm test

npm run lint'''
      }
    }
    stage('Post') {
      steps {
        echo 'Build and test end'
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '/home/jenkins'
  }
}