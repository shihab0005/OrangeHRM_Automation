# OrangeHRM_page_object_design_pattern_framework

## Application Under Test

- **URL** :  https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- **Test Tool** :  Playwright 
- **Architecture** :  Page Object Design Pattern Framework 
- **Report** :  Allure Report, HTML Report
- **OS**  :  Windows
- **Version Control**  :  Git
- **Pipeline**  :  CI/CD (Jinkins)
- **BDD**  :  Cucumber (JavaScript))
- **IDE** :  Visual Studio Code

## Scenarios
```bash
Scenario 1: Verify user Login with all required field and valid, invalid credentials and messages.

User Navigate To the Home Page and goto Login (লগইন / রেজিস্টার) page and Login with valid username/email
and password and also Login With invalid Credentials and verify all error message.

Testname: TC_001_Login_page.spec.js
```

```bash
Scenario_2: Search Favourite Writer from Writer Page and view All books and selected One of Your Favourite Book and Confirm order.

Scenario Description: User Navigate To the Home Page and goto Login (লগইন / রেজিস্টার) page and Login with valid username/email and
password.Navigate to Writer(লেখক) page Search Writer and Selcet Writter and view all books of the selected writer, select a book
from all books and view book details, confirm order by fillup the form of user details and successfully logout.

Testname: TC_002_Order_book_from_writer.spec.js
```

## Installation
Install the dependencies and devDependencies to run the test.
- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:
  
**Clone the repository**
```bash
 git clone https://github.com/shihab0005/Wafilife_page_object_design_pattern_framework.git
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
npx playwright test TC_001_Login_page.spec.js
OR
npx playwright test TC_002_Order_book_from_writer.spec.js
```
