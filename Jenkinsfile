pipeline {
  agent {
    docker {
      image 'node:8.9.1'
      args '-u root'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''npm install
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