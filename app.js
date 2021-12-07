"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    mainMenu(person,people);
    break;
    case "family":
      displayFamilyInfo(person,people);
      mainMenu(person,people);
      break;
    case "descendants":
    displayPeople(displayDescendants(person,people));
    mainMenu(person,people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function selectTrait(){
  let trait = promptFor("Which Trait would you like to search by?\n Gender, Height, Weight, Eye Color, Occupation, None", chars)
  return trait;
}


function searchByTraits(people) {


}
let display;
  let searchAgain = true;
  

  while(testing){
    let trait = selectTrait().toLowerCase();
  switch (trait) {
    case "gender":
      display = searchGender(people);
      displayPeople(display);
      break;
    case "height":
      display = searchHeight(people);
      displayPeople(display);
      break;
    case "weight":
      display = searchWeight(people);
      displayPeople(display);
      break;
    case "eye color":
      display = searchEyeColor(people);
      displayPeople(display);
      break;
    case "occupation":
      display = searchOccupation(people);
      displayPeople(display);
      break;
    default:
      break;
  }
}
