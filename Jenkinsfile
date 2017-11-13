pipeline {
  agent {
    docker {
      image 'node:9.1.0'
      args '-p 3000:3000'
    }
  }
  stages {
    stage('install-dep') {
      steps {
	      sh 'npm install'
      }
    }
  }
}
