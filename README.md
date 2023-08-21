# OrangeHRM_Page_Object_Design_Pattern_Framework

## Application Under Test

- **URL** :  https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  
- **Test Tool** :  Playwright
  
- **Architecture** :  Page Object Design Pattern Framework
  
- **Report** :  Allure Report, HTML Report

- **OS**  :  Windows
  
- **Version Control**  :  Git
  
- **Pipeline**  :  CI/CD (Jinkins)
  
- **BDD**  :  Cucumber (JavaScript)

- **IDE** :  Visual Studio Code
  

## Scenarios
```bash
Scenario 1: Verify user Login with all required field and valid, invalid credentials and messages.

Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials and verify all error message
and Track Successfully login. 

Testname: Test_001_login_page.spec.js
```
```bash
Scenario 2: Add new employee with valid user details.

Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials.Valid user Navigate to the Pim
page add new employee with verification message.

Testname: Test_002_pim_page.spec.js
```

```bash
 Scenario 3: Verify Admin Page with CURD Operation and verify all required field and valid, invalid credentials and messages. 


Scenario Description: 
User Navigate To the Login page and Login with valid and invalid Credentials.Valid user Navigate to the Admin
page add new user ,search user,select user, update and also delete user with varification message.

Testname: Test_003_admin_page.spec.js
```

## Installation
Install the dependencies and devDependencies to run the test.
- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:
  
**Clone the repository**
```bash
 https://github.com/shihab0005/OrangeHRM_Automation.git
```

**Install dependencies**
```bash
npm install
npx playwright install
```
## Run Application
```bash
npx playwright test
OR
npx playwright test Test_001_login_page.spec.js
OR
npx playwright test Test_003_admin_page.spec.js
```
## Run Application with Cucumber

### Run All Cucumber Secnario
```bash
npm run cucumber:test
```
### Run All Cucumber Secnario With Cucumber Html Report
```bash
npm run cucumber:withHTMLReport
```
