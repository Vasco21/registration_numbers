var errorMsgElement = document.querySelector('.errorMessage');
var RegTextHolderElement = document.querySelector('.regTextHolder');
var regNoplate = document.querySelector('.resetButton');
var errorsElement = document.querySelector('.errors');
var displayByTownButton = document.querySelector('.displayByTown');

var ReggRadio = document.querySelector('.reggRadio');
var addregBtn = document.querySelector('.regBtn');
var displayButton = document.querySelector('.displayButton');
var resetButton = document.querySelector('.resetButton');

var registrationFunc = registration();

var plateRegNumsKey = 'PlateRegNums';

var plateRegNumsArray = [];

var  ZERO = 0;

addregBtn.addEventListener('click', function(){
   
    var registrationsNumber = RegTextHolderElement.value;

    if(!registrationFunc.emptyStringTest(registrationsNumber)){
        errorMsgElement.innerHTML = "Please enter a number plate, required";
        errorMsgElement.style.color = "red";
        errorMessageTimeout();
        return false;
    }

    registrationsNumber = registrationFunc.toUpperCaseReg(registrationsNumber);
    
    if(!registrationFunc.regexCheck(registrationsNumber)){
        errorMsgElement.innerHTML = "Please insert the number plate in a correct format e.g. CA 123456 CL 123-123";
        errorMsgElement.style.color = "red";
        errorMessageTimeout();
        clearField(RegTextHolderElement);
        return false;
    }

    //Get existing array of objects in localStorage
    plateRegNumsArray = getLocalStorageObject(plateRegNumsKey);

    if(plateRegNumsArray) {
    //Filter incomingName name in existing array on localstorage
    //creates an array filled with all array elements that pass a test (provided as a function).    
        let existingobject = plateRegNumsArray.filter(x => x.regNum === registrationsNumber)[ZERO]
        if(existingobject) {
            errorMsgElement.innerHTML = "Entered number plate already exists, please enter a different number plate";
            errorMsgElement.style.color = "red";
            errorMessageTimeout();
            clearField(RegTextHolderElement);
            return false;
        } else {
            plateRegNumsArray.push({regNum : registrationsNumber});
        }
    } else {
        plateRegNumsArray = [];
        plateRegNumsArray.push({regNum : registrationsNumber});
        setLocalStorageObject(plateRegNumsKey, plateRegNumsArray);
        errorMsgElement.innerHTML = "Registration number successfuly added!";
        errorMsgElement.style.color = "green";
        clearField(RegTextHolderElement);
        plateRegNumsArray = [];
        return true;
    }
    //Update NamesStored array in localstorage with new added data
    setLocalStorageObject(plateRegNumsKey, plateRegNumsArray);
    errorMsgElement.innerHTML = "Registration number successfuly added!";
    errorMsgElement.style.color = "green";
    errorMessageTimeout();
    clearField(RegTextHolderElement);
    plateRegNumsArray = [];
    return true;
    
});

displayByTownButton.addEventListener('click', function(){
    displayElementsOnFormByTown()
});

displayButton.addEventListener('click', function(){
    displayElementsOnForm();
    return true;
});


resetButton.addEventListener('click', function(){
    removeDynamicallyAddedElements();
    clearLocalStorage(plateRegNumsKey);
    errorMsgElement.innerHTML = "Local Storage cleared!";
    clearField(RegTextHolderElement)
    errorMessageTimeout();
    return true;
    
});

function errorMessageTimeout() {
    setTimeout(function(){
        errorMsgElement.innerHTML = "";

    }, 6000)
}


var getLocalStorageObject  = function(key) {
    let temp = window.localStorage.getItem(key);
    if(temp == null) {
        return null;
    }
    return JSON.parse(temp);
}

var setLocalStorageObject = function(key, Object) {
    window.localStorage.setItem(key, JSON.stringify(Object));
}


var clearLocalStorage = function(key) {
    window.localStorage.removeItem(key)
}

function clearField(ele) {
    ele.value = '';
}

function displayElementsOnForm() {
    removeDynamicallyAddedElements()
    plateRegNumsArray = getLocalStorageObject(plateRegNumsKey);
    if(plateRegNumsArray) {
        var parentDivElement = document.getElementById('regNumDisplay');
        for(var i =0; i< plateRegNumsArray.length; i++) {
            var button = document.createElement('button');
            var divIdName = 'regNumDisplay' + i;
            button.setAttribute('id', divIdName);
            button.type = 'button';
            button.innerHTML = plateRegNumsArray[i].regNum;
            button.className = 'btn-styled';
            parentDivElement.appendChild(button)
            var span = document.createElement("span");
            span.innerHTML = "  ";
            parentDivElement.appendChild(span)
        }
        return;
    }
    errorMsgElement.innerHTML = "No list to dispaly!";
    errorMsgElement.style.color = "orange";
    errorMessageTimeout();
    return;
}



function displayElementsOnFormByTown() {
    removeDynamicallyAddedElements()
    plateRegNumsArray = getLocalStorageObject(plateRegNumsKey);
    if(plateRegNumsArray) {
        var parentDivElement = document.getElementById('regNumDisplay');
        var checkedRegistrationElem = document.querySelector("input[name='registrationRadio']:checked")
        if(checkedRegistrationElem) {
            var plateRegNumsArrayByTown = [];
            for(var i =0; i< plateRegNumsArray.length; i++) {
                if(plateRegNumsArray[i].regNum.substr(0,2) === checkedRegistrationElem.value) {
                    plateRegNumsArrayByTown.push(plateRegNumsArray[i])
                }
            }
            for(var i =0; i< plateRegNumsArrayByTown.length; i++) {
                var button = document.createElement('button');
                var divIdName = 'regNumDisplay' + i;
                button.setAttribute('id', divIdName);
                button.type = 'button';
                button.innerHTML = plateRegNumsArrayByTown[i].regNum;
                button.className = 'btn-styled';
                parentDivElement.appendChild(button)
                var span = document.createElement("span");
                span.innerHTML = "  ";
                parentDivElement.appendChild(span)
            }
            return;
        } else {
            errorMsgElement.innerHTML = "Plaese first select the towny you want to filter on";
            errorMessageTimeout();
            return;
        }
    }
    errorMsgElement.innerHTML = "No list to dispaly!";
    errorMsgElement.style.color = "orange";
    errorMessageTimeout();
    return;
}

function removeDynamicallyAddedElements() {
    plateRegNumsArray = getLocalStorageObject(plateRegNumsKey);
    var divId = document.getElementById('regNumDisplay');
    if(plateRegNumsArray) {
        for(var i =0; i< plateRegNumsArray.length; i++) {
            var childId = document.getElementById('regNumDisplay' + i);
            if(childId) {
                divId.removeChild(childId)
            }
        }
    }
}