# 🌐 WebDriverIO Automation Setup with Docker, Selenium, and CI/CD

## 📖 Overview
This guide provides instructions on setting up and running WebDriverIO tests locally using Docker, Selenium, and a live app URL.

### 🎯 Target URL of the live app:
[https://track-expenses-v1.netlify.app/](https://track-expenses-v1.netlify.app/)

### 📂 The project can be found on GitHub:
[https://github.com/digiborg91/ExpenseTracker](https://github.com/digiborg91/ExpenseTracker)

## Prerequisites


### **1. Clone the WebDriverIO Repository**
Clone the repository to your local machine:
```sh
git clone https://github.com/digiborg91/ExpenseTracker.git
cd ExpenseTracker
```

### **2. Install Dependencies**
```sh
npm install
```

## 🐳3. **Install Docker & Docker-Compose Locally**

### **1. Create `docker-compose.yml`**
Ensure you have the following `docker-compose.yml` in your project root:

```yaml
version: '3.8'
services:
  selenium:
    image: selenium/standalone-chrome:120.0
    shm_size: 2gb
    ports:
      - "4444:4444"  # WebDriver
      - "7900:7900"  # VNC Viewer
    environment:
      - SE_NODE_MAX_INSTANCES=1
      - SE_NODE_MAX_SESSIONS=1
      - SE_VNC_NO_PASSWORD=1
      - START_XVFB=true

  tests:
    build: .
    depends_on:
      - selenium
    environment:
      - SELENIUM_REMOTE_URL=http://selenium:4444/wd/hub
```

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

### **3. Access VNC Viewer** (Live Test Monitoring)
- Open **http://localhost:7900** in your browser.

---

## 🏃‍♂️ Running Tests

### **1. Execute WebDriverIO Tests Locally**
```sh
yarn test:ExpenseTracker
```

### **1. Execute WebDriverIO Tests Locally**
``` sh
yarn report
```