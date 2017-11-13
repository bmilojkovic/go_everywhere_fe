ipeline {
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deliver') { 
            steps {
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
            }
        }
    }
}
