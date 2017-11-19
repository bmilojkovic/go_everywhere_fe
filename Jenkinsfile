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
        sh '''branch=$(git symbolic-ref --short HEAD)

if [ "$branch" == "master" ]
then 
	git checkout --f develop
	git push heroku HEAD:master
elif [ "$branch" == "develop" ]
then 
	git checkout --f develop
	git push heroku HEAD:develop:master
fi'''
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '/home/jenkins'
  }
}