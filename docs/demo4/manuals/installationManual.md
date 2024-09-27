# Technical Installation Manual

## Introduction
WorkWise is a PWA designed to be a management tool for service delivery businesses. This is the technical installation manual for the project 

## Prerequisites
### Node.js & npm
To be able to run this project you will need to install [node 18.18.0](https://nodejs.org/en) & [npm](https://www.npmjs.com/).

#### On Windows
1. Download Node.js Installer
   - Visit the Node.js website: Go to the official [Node.js website](https://nodejs.org/en/download/package-manager/current).
   - Choose the version: Download the latest LTS (Long Term Support) version, as it's recommended for most users.
     ![node installation image](/nodejsInstallation.png)
2. Install Node.js
   - Run the installer: Locate the downloaded .msi file and double-click it to start the installation. 
   - Follow the prompts: The installer will guide you through the installation process. 
3. Verify Installation
    - Open Command Prompt or PowerShell
    - Check Node.js installation:
      ```PowerShell
      node -v
      ```
        - This should display the installed version of Node.js.
   4. Update npm (Optional)
      - If you want to ensure you have the latest version of npm, you can update it by running:
      ```PowerShell
        npm install -g npm
      ```

#### On Linux
1. Update Your Package List
    - First, update the package list to make sure you have the latest information:
    ```bash
      sudo apt update
    ```
2. Install Node.js and npm
    - You can install both Node.js and npm using the following command:
   ```bash
      sudo apt install nodejs npm
   ```
3. Verify the Installation
   - To check the Node.js version:
   ```bash
      node -v
   ```
   - To check the npm version:
   ```bash
      npm -v
   ```
4. Update npm (Optional)
   - If you want to ensure you have the latest version of npm, you can update it using npm itself:
   ```bash
      sudo npm install -g npm
   ```

#### On MacOS
1. Install Node.js via Homebrew (Recommended)
   - Install Homebrew (if not already installed)
     - If you haven't installed Homebrew yet, you can install it by running the following command in your Terminal:
     ```bash
         /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Node.js (includes npm)
     - Once Homebrew is installed, you can install Node.js by running:
     ```bash
         brew install node
     ```
2. Verify the Installation
   - Check the Node.js version:
     ```bash
         node -v
     ```
   - Check the npm version:
      ```bash
         npm -v
     ```
3. Update npm (Optional)
   - To ensure you have the latest version of npm, you can update it by running:
      ```bash
         npm install -g npm
     ```
     
 

## Installation
You will need to install the project from [this](https://github.com/COS301-SE-2024/WorkWise-Central) repository.
1. Clone the Repository
   - First, you need to clone the repository to your local machine. Open your terminal and use the following command:
   ```bash
        git clone https://github.com/COS301-SE-2024/WorkWise-Central
   ```
2. Navigate to the Project Directory
    - Once the repository is cloned, navigate to the project directory:
   ```bash
        cd WorkWise-Central
   ```
3. Install Dependencies
   - To install all the dependencies, run the following command:
   ```bash
        npm install &&
        cd src/api-gateway &&
        npm install &&
        cd ../frontend &&
        npm install
    ```
    
## Running

To run the project you need to add .env files in the appropriate places. Make sure to add all the appropriate values to the keys

### .env files
You will need to add .env files in the following places in the project.
#### In the "src" folder
```bash
ANON_KEY=
SUPER_KEY=
SERVER_LOGIN=

#Basic mail
EMAIL_HOST=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_PORT=

#Final mail
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
MAIL_TRANSPORT=

FB_PRIVATE_KEY=
```
#### In the "src/api-gateway" folder
```bash
ANON_KEY=
SUPER_KEY=
SERVER_LOGIN=

#Basic mail
EMAIL_HOST=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_PORT=

#Final mail
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
MAIL_TRANSPORT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# For dynamic link
SERVER_URL=
FRONTEND_URL=

# For payment gateway encryption
PAY_KEY=
```

#### In the "src/frontend" folder
```bash
ENVIRONMENT=
VITE_ROOT_API_DEV=
VITE_ROOT_API_PROD=
VITE_SERVER_API_DEV=
VITE_SERVER_API_PROD=

#GOOGLE MAPS API
VITE_GOOGLE_MAPS_API_KEY=
```

[//]: # (#### In the "frontend" folder)

[//]: # (```)

[//]: # (This is a text box using a code block.)

[//]: # (```)

### Running
1. Move to the root directory of the project
    ```bash
        cd ../../
   ```
2. Run the following command 
    ```bash
        cd npm run start:dev
   ```
3. Open the website by going to [http://localhost:5173/](http://localhost:5173/)
