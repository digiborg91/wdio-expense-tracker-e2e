# 🌐 WebDriverIO Automation Setup with Docker, Selenium Grid, and CI/CD

## 📖 Overview
This repository provides a ready-to-use automation testing framework built with WebDriverIO, Docker, and Selenium Grid. It allows you to quickly set up and execute automated end-to-end tests against a live web application. The setup is fully containerized, making it easy to run locally or integrate into any CI/CD pipeline.

### 🎯 Application Under Test
Live URL: [https://track-expenses-v1.netlify.app/](https://track-expenses-v1.netlify.app/)

### 📂 The project can be found on GitHub:
Github Repository: [https://github.com/digiborg91/ExpenseTracker](https://github.com/digiborg91/ExpenseTracker)

## ✅ Prerequisites
Before starting, ensure you have the following installed:

    Node.js v20+
    Docker
    Docker Compose
    Yarn (optional, but recommended)


## 🚀 Quick Start Guide
Follow these steps to quickly set up and run your tests locally:

## **1. Clone the WebDriverIO Repository**
Clone the repository to your local machine:
```sh
git clone https://github.com/digiborg91/ExpenseTracker.git
cd ExpenseTracker
```

## **2. Install Dependencies**
```sh
npm install
# or using yarn
yarn install
```

## 🐳3. **Dockerized Selenium Grid Setup**

### **1. Check `docker-compose.yml`**
Ensure you have the `docker-compose.yml` in your project root:


### **2. Start Selenium & Test Execution Container**
Run the following command:
```sh
docker-compose up -d
```
- This will start **Selenium** and **VNC Server** in detached mode.
- To monitor logs:
```sh
docker-compose logs -f
```

### **3. 🎥 Live Test Monitoring via VNC**
- 

You can visually monitor your tests in real-time using VNC:
Browser	        VNC URL
- Chrome	http://localhost:7900
- Firefox	http://localhost:7901
- Edge	  http://localhost:7902

---

## 🧪 Running Tests

### **Execute WebDriverIO Tests**
```sh
yarn test:ExpenseTracker
```
---

## 📊 Running Allure Report
### **Execute WebDriverIO Report**
``` sh
yarn report
```