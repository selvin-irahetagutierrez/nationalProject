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
  people = display;
  searchAgain = multiCriteria(people);
}
  mainMenu(people[0]);
}


function multiCriteria(display){
  if(display.length > 1){
    alert("Please enter another search criteria!");
    return true;
  }
  else{
    return false;
  }
}

function searchGender(people) {
  let input = promptFor("Is the person male or female?",chars);
  let foundPeople = people.filter(function(person) {
    if (person.gender === input) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
//finds the person using the gender they entered
}

function searchHeight(people) {
  let input = promptFor("Enter the person's height in inches?",chars);
  let foundPeople = people.filter(function(person) {
    if (person.height == input) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
//finds the person using the gender they entered
}

function searchWeight(people) {
  let input = promptFor("Enter the person's weight in pounds?",chars);
  let foundPeople = people.filter(function(person) {
    if (person.weight == input) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
//finds the person using the gender they entered
}

function searchEyeColor(people) {
  let input = promptFor("Enter the person's eye color?",chars);
  let foundPeople = people.filter(function(person) {
    if (person.eyeColor === input) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
//finds the person using the gender they entered
}

function searchOccupation(people) {
  let input = promptFor("Enter the person's occupation?",chars);
  let foundPeople = people.filter(function(person) {
    if (person.occupation === input) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
//finds the person using the gender they entered
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";


  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

var desList = [];
var counter = 0;
function displayDescendants(person, people) {

  let foundPeople = people.filter(function (el) {
    if (person.id === el.parents[0] || person.id === el.parents[1]) {
      desList.push(el);
      return true;
    }
    else {
      return false;
    }
  })
  for (var i = counter; i < desList.length; i++) {
    counter++;
    displayDescendants(desList[i], people);
  }
  return desList;
}



function findParents(person, people) {
 let findParent;
  if (person.parents.length == 0) {
    return null;

  }
  else if (person.parents.length == 1) {

      findParent = people.filter(function (el) {
      if (person.parents[0] === el.id) {
        return true;
      }
      else {
        return false;
      }
    }
    )}

  else {
    findParent = people.filter(function (el) {
      if (person.parents[0] === el.id || person.parents[1] === el.id ) {
        return true;
      }
      else {
        return false;
      }
      })
}
  return findParent;
}

function findSpouse(person, people){
let findSpouse = people.filter(function (el) {
  if (person.currentSpouse === el.id){
    return true;
    
  }
  else{
    return false;
}
})
return findSpouse;
}

function findSiblings(person, people) {
  for (let i = 0; i < person.parents.length; i++) {
    if (person.parents[i] != undefined) {
      var findSiblings = people.filter(function (el) {
        if ((person.parents[i] === el.parents[0] || person.parents[i] === el.parents[1]) && person.id !== el.id) {
          return true;
        }
        else {
          return false;
        }
      })
    
  }
  
  }
  return findSiblings;
}

function displayFamilyInfo(person, people) {
  let print = "";
  let parents = findParents(person,people);
  let spouse = findSpouse(person, people);
  let siblings = findSiblings(person, people);

  if (parents != null){
    parents.forEach(function(parent){
      print +=  "Parent(s): " + parent.firstName + " " + parent.lastName + "\n";
    })
  }
  else{
    print += "Parentz: None\n";
  }

  if(spouse != undefined){
    print += "Spousez:" + spouse[0].firstName + " " + spouse[0].lastName + "\n";
  }
  else{
    print += "Spousez: None\n";
  }
if (siblings != null){
  siblings.forEach(function(sibling){
      print += "Siblings(s): " + sibling.firstName + " " + sibling.lastName + "\n";
    })
}
else{
  print += "Siblingz: None";
}
  alert(print);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}