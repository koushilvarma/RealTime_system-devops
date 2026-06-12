# CI/CD Pipeline Deployment on Kubernetes with Monitoring Stack

## Overview

This project demonstrates a complete end-to-end DevOps platform that automates the software delivery lifecycle from code commit to deployment and monitoring. The solution integrates GitHub, GitHub Webhooks, Cloudflare Tunnel, Jenkins, Docker, Docker Hub, Kubernetes, Helm, Prometheus, and Grafana to implement Continuous Integration, Continuous Deployment, and Observability.

The primary objective of this project is to eliminate manual deployment tasks, improve deployment consistency, enable automated software delivery, and provide real-time monitoring of applications running inside a Kubernetes cluster.

---

# Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Webhook
    │
    ▼
Cloudflare Tunnel
    │
    ▼
Jenkins Pipeline
    │
    ├── Source Code Checkout
    ├── Install Dependencies
    ├── Build Docker Image
    ├── Docker Hub Authentication
    ├── Push Docker Image
    └── Kubernetes Verification
    ▼
Docker Hub
    │
    ▼
Kubernetes Cluster
    │
    ├── Deployment (3 Replicas)
    ├── Service
    └── Pods
    ▼
Prometheus
    │
    ▼
Grafana
    │
    ▼
Monitoring Dashboards
```

---

# Features

* Automated CI/CD Pipeline using Jenkins
* GitHub Webhook-based build triggering
* Secure Jenkins exposure using Cloudflare Tunnel
* Docker containerization
* Docker Hub image registry integration
* Kubernetes Deployment and Service configuration
* Kubernetes self-healing capabilities
* Replica-based scaling
* Infrastructure as Code using YAML
* Helm package management for Kubernetes
* Prometheus-based monitoring
* Grafana dashboard visualization
* End-to-end DevOps workflow automation

---

# Technologies Used

## CI/CD

* Jenkins
* GitHub
* GitHub Webhooks
* Cloudflare Tunnel

## Containerization

* Docker
* Docker Hub

## Orchestration

* Kubernetes
* kubectl

## Monitoring

* Helm
* Prometheus
* Grafana
* AlertManager
* kube-state-metrics

## Application

* Node.js
* Express.js

## Configuration

* YAML
* Git

---

# Application Endpoints

The sample Node.js application exposes the following endpoints:

```http
GET /
GET /k8s
GET /webhook
```

Example responses:

```text
/
CI/CD Pipeline Successfully Deployed!

/k8s
Hello from Kubernetes v2

/webhook
Webhook Auto Trigger Test
```

---

# CI/CD Workflow

## Step 1: Code Commit

The developer pushes code to GitHub.

```bash
git add .
git commit -m "Feature update"
git push origin main
```

---

## Step 2: GitHub Webhook Trigger

GitHub detects the push event and sends a webhook request.

```text
GitHub
    ↓
Webhook Event
    ↓
Cloudflare Tunnel
    ↓
Jenkins
```

---

## Step 3: Jenkins Pipeline Execution

Jenkins automatically starts the pipeline.

Pipeline Stages:

```text
Checkout Source Code
Install Dependencies
Build Docker Image
Docker Login
Push Docker Image
Kubernetes Verification
```

---

## Step 4: Docker Image Build

Example Dockerfile:

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
```

Build:

```bash
docker build -t koushilvarma/cicd-app .
```

---

## Step 5: Docker Hub Push

```bash
docker push koushilvarma/cicd-app
```

The image becomes available for Kubernetes deployments.

---

## Step 6: Kubernetes Deployment

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Deployment creates:

```text
Deployment
    ↓
ReplicaSet
    ↓
3 Running Pods
```

---

## Step 7: Kubernetes Service

The Service provides:

* Stable Networking
* Load Balancing
* Service Discovery

Traffic Flow:

```text
User
    ↓
Service
    ↓
Pod 1

Pod 2

Pod 3
```

---

# Jenkins Pipeline Configuration

## Jenkinsfile

```groovy
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/your-repository.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t koushilvarma/cicd-app .'
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push koushilvarma/cicd-app'
            }
        }

        stage('Kubernetes Verification') {
            steps {
                bat 'kubectl get nodes'
            }
        }
    }
}
```

---

# Kubernetes Configuration

## deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: cicd-app

spec:
  replicas: 3

  selector:
    matchLabels:
      app: cicd-app

  template:
    metadata:
      labels:
        app: cicd-app

    spec:
      containers:
      - name: cicd-app
        image: koushilvarma/cicd-app:latest

        ports:
        - containerPort: 3000
```

---

## service.yaml

```yaml
apiVersion: v1
kind: Service

metadata:
  name: cicd-app-service

spec:
  selector:
    app: cicd-app

  ports:
  - port: 80
    targetPort: 3000

  type: LoadBalancer
```

---

# Monitoring Stack

Monitoring was implemented using Helm and the kube-prometheus-stack chart.

Installation:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update

kubectl create namespace monitoring

helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
```

---

# Components Installed

## Prometheus

Responsibilities:

* Metrics Collection
* Metrics Storage
* Time-Series Database

Collects:

* Pod Metrics
* Container Metrics
* Deployment Metrics
* Cluster Metrics

---

## Grafana

Responsibilities:

* Dashboard Creation
* Visualization
* Monitoring Analytics

Provides dashboards for:

* Pods
* Deployments
* Containers
* Cluster Health
* Resource Utilization

---

## AlertManager

Responsibilities:

* Alert Processing
* Alert Routing
* Alert Management

---

## kube-state-metrics

Provides Kubernetes object metrics such as:

* Pod Status
* Deployment Status
* Replica Counts
* Namespace Information

---

## Node Exporter

Provides node-level metrics such as:

* CPU Usage
* Memory Usage
* Disk Utilization
* Network Statistics

---

# Kubernetes Verification Commands

Verify Cluster:

```bash
kubectl get nodes
```

Verify Pods:

```bash
kubectl get pods
```

Verify Deployments:

```bash
kubectl get deployments
```

Verify Services:

```bash
kubectl get svc
```

Verify Monitoring Pods:

```bash
kubectl get pods -n monitoring
```

---

# Project Structure

```text
cicd-kubernetes-project/
│
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── Jenkinsfile
├── README.md
│
├── deployment.yaml
├── service.yaml
│
└── .gitignore
```

---

# Challenges Encountered

## Jenkins Docker Hub Authentication

Issue:

```text
Docker push failed due to authentication errors.
```

Solution:

```text
Created Docker Hub Personal Access Token (PAT)
Stored credentials securely in Jenkins
Used Jenkins Credentials Management
```

---

## Jenkins Kubernetes Authentication

Issue:

```text
kubectl commands failed inside Jenkins.
```

Solution:

```text
Exported kubeconfig
Added kubeconfig as Jenkins Credential
Configured Jenkins pipeline authentication
```

---

## GitHub Webhook Connectivity

Issue:

```text
GitHub could not access localhost Jenkins instance.
```

Solution:

```text
Configured Cloudflare Tunnel
Created public webhook endpoint
Connected GitHub Webhooks to Jenkins
```

---

## Helm Installation

Issue:

```text
helm command not recognized.
```

Solution:

```text
Restarted terminal after installation
Verified Helm PATH configuration
```

---

## Grafana Login

Issue:

```text
Unable to login using Grafana Cloud credentials.
```

Solution:

```text
Retrieved admin password from Kubernetes Secret
Logged into local Grafana instance
```

---

## Node Exporter CrashLoopBackOff

Issue:

```text
Node Exporter failed on Docker Desktop Kubernetes.
```

Root Cause:

```text
Linux host mount compatibility issue on Docker Desktop.
```

Investigation Performed Using:

```bash
kubectl logs
kubectl describe pod
```

---

# Learning Outcomes

This project provided practical experience with:

* Continuous Integration
* Continuous Deployment
* Jenkins Pipeline Automation
* Docker Containerization
* Docker Hub Registry Management
* GitHub Webhooks
* Cloudflare Tunnel
* Kubernetes Orchestration
* Deployments and Services
* Kubernetes Networking
* Helm Package Management
* Prometheus Monitoring
* Grafana Dashboards
* Kubernetes Troubleshooting
* Infrastructure as Code
* DevOps Best Practices

---

# Future Improvements

* AWS EKS Deployment
* Terraform Infrastructure Provisioning
* ArgoCD GitOps Workflow
* ELK Stack Centralized Logging
* Trivy Security Scanning
* Blue-Green Deployments
* Canary Releases
* Multi-Node Kubernetes Cluster

---

# Author

**Koushil Varma**

B.Tech Computer Science and Engineering (Honors)

DevOps | Cloud | Kubernetes | Systems Engineering
