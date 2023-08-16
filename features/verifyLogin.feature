Feature: Login Page varificatin

 @LoginValidCredintials
  Scenario Outline: verify login with valid  credintials
    Given navigate to the login page
    And Check Ui element of Login Page
    When Enter with Valid Username 'Admin' and Password 'admin123'
    Then Successfully login and navigate to Dashboard page

@LoginInvalidCredintials
  Scenario Outline: verify login with invalid credintials
    Given navigate to the web page
    And verify Ui element of Login Page
    When Enter with Invalid Username 'Admin1' and Password 'admin122'
    Then verify Error message with invalid credintials