# Spec Delta: Board Title

## MODIFIED Requirements

### Requirement: App displays the correct product name

The application must display "My Spec Driven Board" as its product name in all
user-visible surfaces.

#### Scenario: Browser tab shows updated title

GIVEN the user opens the app in a browser  
WHEN the page loads  
THEN the browser tab title reads "Spec Workflow · My Spec Driven Board"

#### Scenario: Header shows updated brand name

GIVEN the app is rendered  
WHEN the user views the header  
THEN the brand-name element contains the text "My Spec Driven Board"
