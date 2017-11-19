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

npm run lint:ci'''
      }
    }
    stage('Post') {
      parallel {
        stage('Post') {
          steps {
            echo 'Build and test end'
            sh '''delete workspace

heroku git:remote -a radiant-crag-83463

git remote -v

heroku keys:add

git push heroku master'''
          }
        }
        stage('') {
          steps {
            cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, notFailBuild: true, skipWhenFailed: true, deleteDirs: true)
          }
        }
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '/home/jenkins'
  }
}