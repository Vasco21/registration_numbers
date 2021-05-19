var errorMsgElement = document.querySelector('.errorMessage');
var RegTextHolderElement = document.querySelector('.regTextHolder');
var regNoplate = document.querySelector('.resetButton');
var errorsElement = document.querySelector('.errors');

var ReggRadio = document.querySelector('.reggRadio');
var addregBtn = document.querySelector('.regBtn');
var displayButton = document.querySelector('.displayButton');
var resetButton = document.querySelector('.resetButton');

var registrationFunc = registration();

addregBtn.addEventListener('click', function(){
    
    var checkedRegistrationElem = document.querySelector("input[name='registrationRadio']:checked")
    var registrationsNumber = RegTextHolderElement.value;

    if (!checkedRegistrationElem && registrationsNumber ==""){
        errorMsgElement.innerHTML = "Please insert a registration number and Select a City!";
        // errorMessageTimeout()
        return;
    } 
    if (!checkedRegistrationElem){
        errorMsgElement.innerHTML = "Please Select a City!";
        // errorMessageTimeout()
        return
    } 
});

