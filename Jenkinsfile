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
      steps {
        echo 'Build and test end'
        sh '''heroku login

heroku git:remote -a radiant-crag-83463

git remote -v

heroku keys:add

git push heroku master'''
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '/home/jenkins'
  }
}
