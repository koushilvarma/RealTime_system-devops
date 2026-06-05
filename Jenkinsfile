pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "koushilvarma/cicd-app"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'main',
                    url: 'https://github.com/koushilvarma/RealTime_system-devops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE%:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Logging into Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image...'
                bat 'docker push %DOCKER_IMAGE%:latest'
            }
        }

        stage('Test Kubernetes') {
            steps {
                echo 'Testing Kubernetes connection...'
                bat 'kubectl get nodes'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}