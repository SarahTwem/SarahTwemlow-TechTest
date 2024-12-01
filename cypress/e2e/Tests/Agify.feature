Feature: Agify API

Background: Set URL
Given I have a URL "https://api.agify.io/"

Scenario Outline: Valid name parameter: <name>
When I call the URL with parameter "name" equals "<name>"
Then an age is returned: <age>
And the count and name fields are populated: <count>, "<name>"
  Examples:
      | name | count | age |
      | Sarah |183042 | 46 |
      | Name With Space |12369 |46 |
      | Dr John Fred George Steven Really Long the third | 64 | 46 |
      | a | 18933 | 59 |
      | Æēì | 1 | 55 |
      | María José Carreño Quiñones | 446 | 38 |
      | O'Leary|5 |54 |
      
Scenario Outline: Invalid name parameter: <name>
When I call the URL with parameter "name" equals "<name>"
Then no age is returned
  Examples:
      | name |
      | Test£$!&* | 
      | Notaname | 
      | 1 |
      | 0.1 |
      | -1 |
      |  |

Scenario: Parameter name written in capitals
When I call the URL with parameter "NAME" equals "Test"
Then an error is returned

Scenario: No parameter is included in the request
When I call the URL with parameter "" equals ""
Then an error is returned
