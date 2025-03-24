import { getGeocoordinatesFromName } from './geocoordinates.js'
import { updateDb } from './query.js';


class InfoFormNamePair {
    constructor(displayName, dbName) {
        this.displayName = displayName;
        this.dbName = dbName;
    }
}

const steps = [
    [new InfoFormNamePair("Email:", "email"), new InfoFormNamePair("Name:", "name"), new InfoFormNamePair("Password:", "password")],
    [new InfoFormNamePair("Address:", "location_name"), new InfoFormNamePair("City:", "location_name"),new InfoFormNamePair("Country:", "location_name")],
    [new InfoFormNamePair("Phone Number:", "phone"), new InfoFormNamePair("Shul Name:", "shul"), new InfoFormNamePair("Heritage:","heritage_name")],
    [new InfoFormNamePair("Tell Us Your heritage Story:", "story")],
    [new InfoFormNamePair("Tell us a traditional recipes you know:", "recipe")]
];

const answers = {};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const infoBox = document.getElementById('formBox'); // grab the infoBox container
  
    let step = 1;

    setInfoFormDefault();
  
    submitButton.addEventListener('click', () => {
        
        recordAnswers(step);

        if (steps[step]) {
    
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
            recordAnswers(step);
            setInfoFormDefault();
            infoBox.style.visibility = 'hidden';
            document.getElementById("submitInfoButton").style.visibility = 'visible';
            step = 0;
            
            updateDb(answers);
        }
        
        step++;
    });
});
  

function setInfoFormDefault() {
    
    for (let i = 1; i <= 3; i++) {
        document.getElementById('label' + i.toString()).textContent = steps[0][i-1].displayName;
        document.getElementById('input' + i.toString()).value = '';

        document.getElementById('label' + i.toString()).style.visibility = null;
        document.getElementById('input' + i.toString()).style.visibility = null;

        submitButton.textContent = 'Next';
    }
}

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

