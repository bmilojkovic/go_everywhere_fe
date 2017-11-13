node {
    agent {
        docker {
            image 'node:9.1.0'
            args '-p 3000:3000'
        }
    }
    
    stage('Build') {
        steps {
+	              sh 'npm install'
        }
    }
    stage('Deliver') { 
        steps {
            input message: 'Finished using the web site? (Click "Proceed" to continue)' 
        }
    }
}
