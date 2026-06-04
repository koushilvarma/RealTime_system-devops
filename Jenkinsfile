pipeline {
    agent any

    environment {
        REGISTRY = 'docker.io'
        IMAGE_NAME = 'cicd-kubernetes-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        NAMESPACE = 'default'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .'
                sh 'docker tag ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}/${IMAGE_NAME}:latest'
            }
        }

        stage('Push to Registry') {
            steps {
                echo 'Pushing image to registry...'
                sh 'docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'docker push ${REGISTRY}/${IMAGE_NAME}:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh 'kubectl set image deployment/cicd-app cicd-app=${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n ${NAMESPACE} || kubectl apply -f k8s/'
                sh 'kubectl rollout status deployment/cicd-app -n ${NAMESPACE}'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
