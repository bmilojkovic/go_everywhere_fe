pipeline {
  agent {
    docker {
      args '-u root'
      image 'node:9.1.0'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''npm install -g @angular/cli
npm install'''
      }
    }
    stage('Test') {
      steps {
        sh 'npm run lint'
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