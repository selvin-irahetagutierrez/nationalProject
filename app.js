function app(people){
	let searchType = promptFor("Would you like to search by 'name' or 'traits'? Enter 'name', 'traits', or click cancel to stop.", eitherNameOrTraits);
    let filteredPeople;
	let stopRunning
	switch(searchType){
		case 'name':
			filteredPeople = searchByName(people);
			break;
		case 'traits':
		    filteredPeople = pickOneOrMoreTraits(people);
		    break;
		case undefined:
			filteredPeople = undefined;
			break;
		default:
		    alert("That input is invalid. Please enter 'name', 'traits', or click cancel.");
		    app(people);
		    break;
			return;
	}
	if (filteredPeople === undefined){
		alert("Thanks for trying out our secret service!");
		return;
	}else if (!(filteredPeople.length > 0)){
		alert("Noone was found who matched the information you entered.");
		app(people);
	}else{
		for(let i = 0; i < filteredPeople.length && !(stopRunning === "restart"); i++){
			let foundPerson = filteredPeople[i];
			stopRunning = mainMenu(foundPerson, people);
			if (stopRunning === null){
				return alert("Thanks for trying out our secret service!");
			}
		}
		if (!(stopRunning === "restart")){
			alert("That is everyone found who met the criteria entered.  Thanks for using our secret service!");
		}
	}
	return;
}
function capitalize(name){
	let wordsArray = name.split(" ");
	for(let i = 0; i < wordsArray.length; i++){
		let cappedWord = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1).toLowerCase();
	    wordsArray[i] = cappedWord;
	}
	let answer = wordsArray.join(" ");
	return answer;
}
function chars(input){
	let checkForLetters = input.match(/[A-z ]/g);
	if (checkForLetters === null){
		return true;
	}
	if (input === checkForLetters.join("")){
		return true;
	}
	return false;
}
function checkIfNumber(input){
	let checkForNumbers = input.match(/[0-9]/g);
	if (checkForNumbers === null){
		return true;
	}
	if (input === checkForNumbers.join("")){
		return true;
	}
	return false;
}

function getTraits (){
    let traits = promptFor("Which traits would you like to search?  Search by: 'weight', 'height', 'eye color', 'age', or 'occupation'.  Please separate each trait with a space.", chars);
    let traitsArray = traits.toLowerCase().split(" ");
    console.log (traitsArray);
    return traitsArray;
}
function mainMenu(person, people){
    if(!person){
        alert("Could not find that individual.");
        return app(people);
    }
	let displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Please enter the option you want, or type 'pass' to see the next match (if there is one), 'restart' to start over or click cancel to quit.");
	switch(displayOption){
		case "info":
		    return displayPerson(person, people);
		    break;
		case "family":
			return displayFamily(person, people);
			break;
		case "descendants":
			return displayDescendants(person, people);
			break;
		case "pass":
			return displayOption;
			break;
		case "restart":
			app(people);
            return displayOption;
		case undefined || null:
			return null;
		default:
		alert("That input is invalid. Please enter 'info', 'family', 'descendants', or 'restart' to exit the program.  You can also click cancel to quit.");
		return mainMenu(person, people);
    }
	displayOption = promptFor("Thanks for using the secret service!  Would you like to search again? (Type 'yes', 'no', or click cancel)", yesNo);
	if (displayOption === "yes"){
		app(people);
	}else{
		return;
	}
}
function pickOneOrMoreTraits(people){
	let searchType = promptFor("Would you like to search more than one trait?  Enter 'yes', 'no', or click cancel to stop.", yesNo);
    let filteredPeople;
	let traits;
    switch(searchType){
		case 'yes':
			traits = getTraits();
            filteredPeople = searchMultipleTraits(people, traits);
			break;
		case 'no':
		    filteredPeople = searchByTraits(people);
		    break;
		case undefined:
			return;
		default:
		    alert("That input is invalid. Please enter 'yes', 'no', or 'cancel'.");
		    app(people);
		    break;
			return;
	}
	return filteredPeople;
}
function promptFor(question, valid){
    do{
        let response = prompt(question);
		if (response === null || response === "") {
			return;
		}else { 
			response = response.trim();	
		}
		if (!response || !valid(response)){
			alert("You're input didn't match the text/number required.  Please try again.");
		}
    }
	while(!response || !valid(response));
    return response;
}
function searchByAge(people){
	let userInputAge = parseInt(promptFor("How old is the person in years?", checkIfNumber), 10);
    let newArray = people.filter(function (el){
		let personAge = findAge(el);
        if(personAge === userInputAge){
            return true;
        }
    });
    return newArray;
}
function searchByEyeColor(people){
	let userInputEyeColor = promptFor("What color is the person's eyes?", chars).toLowerCase();
    let newArray = people.filter(function (el){
        if(el.eyeColor === userInputEyeColor.toLowerCase()){
            return true;
        }
    });
    return newArray;
}
function searchByGender(people){
	let userInputGender = promptFor("What is the person's gender?",chars).toLowerCase();
    let newArray = people.filter(function (el){
        if(el.gender === userInputGender){
            return true;
        }
    });
    return newArray;
}
function searchByHeight(people){
	let userInputHeight = parseInt(promptFor("How tall is the person in inches?", checkIfNumber), 10);
    let newArray = people.filter(function (el){
        if(el.height === userInputHeight){
            return true;
        }
    });
    return newArray;
}
function searchByName(people){
	let firstName = promptFor("What is the person's first name?", chars);
	if (firstName === null || firstName === undefined) {
		return;
	}else { 
		firstName = capitalize(firstName.toLowerCase().trim());	
	}
	
    let lastName = promptFor("What is the person's last name?", chars);
	if (lastName === null || lastName === undefined) {
		return;
	}else { 
		lastName = capitalize(lastName.toLowerCase().trim());	
	}
	
    let newArray = people.filter(function (el){
        if(el.firstName === firstName && el.lastName === lastName){
            return true;
        }
    });
    return newArray;
}
function searchByOccupation(people){
	let userInputOccupation = promptFor("What is the person's occupation?", chars).toLowerCase();
    let newArray = people.filter(function (el){
        if(el.occupation === userInputOccupation){
            return true;
        }
    });
    return newArray;
}
function searchByTraits(people){
	let userSearchChoice = prompt("What single trait would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
	if (userSearchChoice === null || userSearchChoice === ""){
		return;
	}else{ 
		userSearchChoice = userSearchChoice.toLowerCase().trim();	
	}
    let filteredPeople;
    switch(userSearchChoice){
		case "height":
			filteredPeople = searchByHeight(people);
			break;
		case "weight":
			filteredPeople = searchByWeight(people);
			break;
		case "eye color":
			filteredPeople = searchByEyeColor(people);
			break;
		case "gender":
            filteredPeople = searchByGender(people);
			break;
        case "age":
            filteredPeople = searchByAge(people);
			break;
        case "occupation":
            filteredPeople = searchByOccupation(people);
            break;	
		case "quit":
			return;
		default:
		    alert("That input is invalid. Please enter 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
		    searchByTraits(people);
            break;
			return;
    }  
	return filteredPeople;
}
function searchByWeight(people){
	let userInputWeight = parseInt(promptFor("How much does the person weigh?",checkIfNumber), 10);
	let newArray = people.filter(function (el){
		if(el.weight === userInputWeight){
			return true;
		}
	});
	return newArray;
}
function searchForChildren(person, people, descendants){
	let progenyIteration;
	let addName;
	let totalChildren = [separateName(person), "has children named:"];
	if(descendants){
		totalChildren = ["whose children are:"];
	}
	let newArray = people.filter(function (el){
		if(el.parents[0] === person.id || el.parents[1] === person.id){
			let descendants = true;
			addName = separateName(el);
			totalChildren.push(addName);
			progenyIteration = searchForChildren(el, people, descendants);
			if (!(progenyIteration === undefined)){
				totalChildren.push(progenyIteration);
			}
			return true;
		}
    });
	if(newArray.length > 0){
		return totalChildren;
	}else if(descendants){
		return;
	}else{
		return alert(person.firstName + " " + person.lastName + " has no children.");
	}
}
function searchForKids(person, people){
	let matchNotFound = true;
	let addName;
	let totalKids = ["has children named:"]
	let newArray = people.filter(function (el){
		if(el.parents[0] === person.id || el.parents[1] === person.id){
			addName = separateName(el);
			totalKids.push(addName);
			matchNotFound = false;
			return true;
		}
	});
	if(matchNotFound){
		return totalKids = person.firstName + " " + person.lastName + " has no children.";
	}else{
		return totalKids;
	}
}
function searchForSiblings(person, people){
	let matchNotFound = true;
	let personID = person.id;
	let totalSiblings = ["has siblings named:"];
	let addName;
	let newArray = people.filter(function (el){
		if (!(person.parents.length > 0)){
			return;
		}
		else if(el.parents[0] === person.parents[0] || el.parents[1] === person.parents[0] || el.parents[1] === person.parents[0] || el.parents[1] === person.parents[1]){
			while(el.id !== personID){
			addName = separateName(el);
			totalSiblings.push(addName);
			matchNotFound = false;
			return true;
			}
		}
	});
	if (matchNotFound){
		return totalSiblings = person.firstName + " " + person.lastName + " has no siblings.";
	}else{
		return totalSiblings;
	}
}
function searchForSpouse (person, people){
    let matchNotFound = true;
	let spouse = ["has current spouse:"];
	let addName;
        let newArray = people.filter(function (el){g
            if (el.currentSpouse === person.id){
                addName = separateName(el);
				spouse.push(addName);
				matchNotFound = false;
                return true;
            }
        });
		if(matchNotFound){
		return spouse = person.firstName + " " + person.lastName + " has no current spouse.";
	}else{
		return spouse;
	}
}
function searchForParents (person, people, descendants){
	let matchNotFound = true;
	let theParents = [person.firstName + " " + person.lastName + "\nhas parent(s) named:\n"];
	let newArray = people.filter(function (el){
		if(el.id === person.parents[0] || el.id === person.parents[1]){
			if (!(matchNotFound)){
				theParents.push(" & ");
			}
			theParents.push(el.firstName + " " + el.lastName);
			matchNotFound = false;
			return true;
		}
    });
	if(matchNotFound){
		return theParents = person.firstName + " " + person.lastName + " has no living parents.";
	}else{
		return theParents.join("");
	}
}
function searchMultipleTraits (people, traits){
	let results = people;
	if(traits.includes("height")){  
        results = searchByHeight(results);
	}
	if(traits.includes("weight")){
		results = searchByWeight(results);
	}
	if(traits.includes("eye") && traits.includes("color")){
		results = searchByEyeColor(results);
	}
	if(traits.includes("age")){
		results = searchByAge(results);
	}
	if(traits.includes("occupation")){
		results = searchByOccupation(results);
	}
	let filteredPeopleNames = results.map(function(el){
		return el.firstName + " " + el.lastName;
	});
	let userInput = promptFor(filteredPeopleNames.join("\n") + "\nMatched the traits searched. Would you like to see their information, descendants, or family?  Type 'yes' to check more data on the matches found, or type 'no' / click cancel to exit this search.", yesNo);
	if (userInput === "yes"){
		return results;
	}
	return;
}
function separateName(person){
	return person.firstName + " " + person.lastName;
}
function yesNo(input){
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}