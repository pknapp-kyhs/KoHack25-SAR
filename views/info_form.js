
const steps = [
    ["Email:", "Name:", "Password:"],
    ["Address:", "City:", "Country:"],
    ["Phone Number:", "Date of Birth:", "Heritage:"],
    ["Tell Us Your heritage Story:"],
    ["Tell us a traditional recipes you know:"]
];

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const infoBox = document.getElementById('formBox'); // grab the infoBox container
  
    let step = 0;

    setInfoFormDefault();
  
    submitButton.addEventListener('click', () => {
        
        if (steps[step]) {
    
            if (steps[step].length == 3) {
                for (let i = 1; i <= 3; i++) {

                    document.getElementById('label' + i.toString()).textContent = steps[step][i-1];
                    document.getElementById('input' + i.toString()).value = '';
                }
            }
            else if (steps[step].length == 1) {
                
                document.getElementById('label1').textContent = steps[step][0];
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
            setInfoFormDefault();
            infoBox.style.visibility = 'hidden';
            document.getElementById("submitInfoButton").style.visibility = 'visible';
            document.getElementById('searchBar').style.visibility='visible';
            step = -1;
        }
        
        step++;
    });
});
  

function setInfoFormDefault() {
    
    for (let i = 1; i <= 3; i++) {
        document.getElementById('label' + i.toString()).textContent = steps[0][i-1];
        document.getElementById('input' + i.toString()).value = '';

        document.getElementById('label' + i.toString()).style.visibility = null;
        document.getElementById('input' + i.toString()).style.visibility = null;

        submitButton.textContent = 'Next';
    }
}
