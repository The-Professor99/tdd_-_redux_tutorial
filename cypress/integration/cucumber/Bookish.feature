Feature: Book List
  As a reader
  I want to see books that are trending
  So I know what to read next

  Scenario: Heading
    Given I am a bookish user
    When I open the list page
    Then I can see the title 'Bookish' is showing

  Scenario: Book List
    Given I am a bookish user
    When I open the list page 
    And there is a book list
      | name                      |
      | Refactoring               |
      | Domain-driven design      |
      | Building Microservices    |
      | Acceptance Test Driven Development with React       |

  Scenario: Search by keyword
    Given I am a bookish user
    When I open the list page
    And I typed 'design' to perform a Search
    Then I should see "Domain-driven design" is matched

  Scenario: Write a review
    Given I am a bookish user
    When I open the book detail page for the first item
    And I add a review to that book
      | name          | content         |
      | Ihechi Festus | Excellent work! |
    Then I can see it displayed beneath the description section with the text 'Excellent works!'

# given when and then should have the same strings as those in given when and then test definitions in test files