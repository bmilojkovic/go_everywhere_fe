pipeline {
  agent {
    docker {
      image 'node:8.9.1'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''sudo su
rm -rf node_modules
rm package-lock.json
npm cache clean
npm install
'''
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
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
    HOME = '.'
  }
}