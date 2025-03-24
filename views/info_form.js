// Imports
import { getGeocoordinatesFromName } from './geocoordinates.js'
import { updateDb } from './query.js';


// Stores display name (how it will show up on the question form) and its name in the db
class InfoFormNamePair {
    constructor(displayName, dbName) {
        this.displayName = displayName;
        this.dbName = dbName;
    }
}

// Questions that will be asked on the info form
const steps = [
    [new InfoFormNamePair("Email:", "email"), new InfoFormNamePair("Name:", "name"), new InfoFormNamePair("Password:", "password")],
    [new InfoFormNamePair("Address:", "location_name"), new InfoFormNamePair("City:", "location_name"),new InfoFormNamePair("Country:", "location_name")],
    [new InfoFormNamePair("Phone Number:", "phone"), new InfoFormNamePair("Shul Name:", "shul"), new InfoFormNamePair("Heritage:","heritage_name")],
    [new InfoFormNamePair("Tell Us Your Heritage Story:", "story")],
    [new InfoFormNamePair("Tell Us a Traditional Recipe You Know:", "recipe")]
];

// Stores answers on each page of the form
const answers = {};

document.addEventListener('DOMContentLoaded', () => {

    // Intialize info form data

    const submitButton = document.getElementById('submitButton');
    const infoBox = document.getElementById('formBox');
  
    let step = 1;

    setInfoFormDefault();
  
    submitButton.addEventListener('click', () => {

        
        for (let i = 1; i <= 3; i++) {
                    
            if (document.getElementById('input' + i.toString()).value == '') {
                alert("Please fill in field: " + steps[step-1][i-1].displayName.slice(0, -1));
                return;
            }
        }

        // On click of the 'Next' or 'Submit' buttons:

        recordAnswers(step);

        if (steps[step]) {
    
            // Render next question, hide others
            if (steps[step].length == 3) {
                for (let i = 1; i <= 3; i++) {

                    document.getElementById('label' + i.toString()).textContent = steps[step][i-1].displayName;
                    document.getElementById('input' + i.toString()).value = '';
                }
            }
            else if (steps[step].length == 1) {
                
                document.getElementById('label1').textContent = steps[step][0].displayName;
                document.getElementById('input1').value = '';

                for (let i = 2; i <= 3; i++) {
                    
                    document.getElementById('label' + i.toString()).style.visibility = 'hidden';
                    document.getElementById('input' + i.toString()).style.visibility = 'hidden';
                }

            }
            
            if (!steps[step + 1]) {
                submitButton.textContent = 'Submit';
            }
        }
        else {
            // No more steps left, form submitted

            recordAnswers(step);
            setInfoFormDefault();
            infoBox.style.visibility = 'hidden';
            document.getElementById("submitInfoButton").style.visibility = 'visible';
            step = 0;
            
            // Update DB, reload page
            updateDb(answers);
            location.reload();
        }
        
        step++;
    });
});
  

// Return info form to defualt state
function setInfoFormDefault() {
    
    for (let i = 1; i <= 3; i++) {
        document.getElementById('label' + i.toString()).textContent = steps[0][i-1].displayName;
        document.getElementById('input' + i.toString()).value = '';

        document.getElementById('label' + i.toString()).style.visibility = null;
        document.getElementById('input' + i.toString()).style.visibility = null;

        submitButton.textContent = 'Next';
    }
}

// Record answers on form from previous step
function recordAnswers(step) {
    step--;

    if (step == 1) {

        answers['location'] = {
            location_name : 
                document.getElementById('input1').value + " " +
                document.getElementById('input2').value + " " +
                document.getElementById('input3').value,
        };

        getGeocoordinatesFromName(answers['location'].location_name).then(data => { 
            if (data.results[0]) {
                answers['location']['latitude'] = data.results[0].geometry.location.lat;
                answers['location']['longitude'] = data.results[0].geometry.location.lng;
            }
        });

        console.log(answers['location']);
    }

    for (let i = 1; i <= steps[step].length; i++) {
        answers[steps[step][i-1].dbName] = document.getElementById('input' + i.toString()).value;
    }
    
}

