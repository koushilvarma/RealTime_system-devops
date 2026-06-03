# CI/CD Pipeline Deployment on Kubernetes using Jenkins

## Overview

This project demonstrates a complete end-to-end DevOps CI/CD pipeline that automates the software delivery lifecycle from code commit to deployment on a Kubernetes cluster. The pipeline integrates GitHub, Jenkins, Docker, and Kubernetes to enable continuous integration, automated containerization, and continuous deployment. The primary goal is to reduce manual intervention, improve deployment consistency, and implement modern DevOps practices used in production environments.

---

## Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Source Code Checkout
    ├── Build Application
    ├── Run Tests
    ├── Build Docker Image
    ├── Push Image to Docker Registry
    ▼
Kubernetes Cluster
    │
    ├── Deployment
    ├── Service
    └── Pods
    ▼
Application Accessible to Users
```

---

## Features

- Automated CI/CD pipeline using Jenkins
- Continuous Integration with GitHub
- Docker-based containerization
- Automated image versioning and deployment
- Kubernetes Deployment and Service configuration
- Rolling updates and scalable deployments
- Infrastructure-as-Code using YAML manifests
- Reduced manual deployment effort
- Production-style DevOps workflow

---

## Technologies Used

- Jenkins
- Docker
- Kubernetes
- Git & GitHub
- Linux
- YAML
- Docker Hub

---

## Workflow

### 1. Code Commit

The developer pushes code changes to the GitHub repository.

```bash
git add .
git commit -m "Updated application"
git push origin main
```

### 2. Jenkins Pipeline Trigger

Jenkins automatically detects changes and starts the CI/CD pipeline.

Pipeline stages include:

- Source Code Checkout
- Build
- Testing
- Docker Image Build
- Docker Image Push
- Kubernetes Deployment

### 3. Build Application

Example:

```bash
npm install
npm run build
```

or

```bash
mvn clean package
```

### 4. Docker Image Build

Dockerfile Example:

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
```

Build Image:

```bash
docker build -t myapp:v1 .
```

### 5. Push Docker Image

```bash
docker tag myapp:v1 username/myapp:v1

docker push username/myapp:v1
```

### 6. Deploy to Kubernetes

```bash
kubectl apply -f deployment.yaml

kubectl apply -f service.yaml
```

---

## Jenkins Pipeline Configuration

### Jenkinsfile

```groovy
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/repository.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push username/myapp:${BUILD_NUMBER}'
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
```

---

## Kubernetes Configuration

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: myapp

spec:
  replicas: 3

  selector:
    matchLabels:
      app: myapp

  template:
    metadata:
      labels:
        app: myapp

    spec:
      containers:
      - name: myapp
        image: username/myapp:latest

        ports:
        - containerPort: 3000
```

### service.yaml

```yaml
apiVersion: v1
kind: Service

metadata:
  name: myapp-service

spec:
  selector:
    app: myapp

  ports:
  - port: 80
    targetPort: 3000

  type: LoadBalancer
```

---

## Project Structure

```text
project/
│
├── Jenkinsfile
├── Dockerfile
├── README.md
│
├── src/
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
└── .gitignore
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/your-username/project-name.git

cd project-name
```

### Build Docker Image

```bash
docker build -t myapp .
```

### Push Docker Image

```bash
docker push username/myapp
```

### Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

### Verify Deployment

```bash
kubectl get pods

kubectl get deployments

kubectl get services
```

---

## Learning Outcomes

This project provided hands-on experience with:

- Continuous Integration and Continuous Deployment
- Jenkins Pipeline Automation
- Docker Containerization
- Kubernetes Orchestration
- Infrastructure as Code
- Linux Administration
- Git Version Control
- Deployment Automation
- Cloud-Native Application Delivery

---

## Future Improvements

- Helm Chart Integration
- Terraform for Infrastructure Provisioning
- AWS EKS Deployment
- Monitoring using Prometheus and Grafana
- ELK Stack Logging
- Blue-Green Deployments
- Canary Releases
- Security Scanning with Trivy

---

## Author

**Koushil Varma**

B.Tech CSE (Honors) | DevOps Enthusiast | Systems Engineering Aspirant

---

