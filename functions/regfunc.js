var registration = function() {
    var myStore = {};
    var counter = 0;
    var error = '';



    var registrationNo = function(reg) {
        var regChar = reg;

        emptyStringTest(regChar);

        regexCheck(regChar)

        regChar = toUpperCaseReg(regChar)

        if (myStore[regChar] === undefined) {
            myStore[regChar] = 0;
            counter++
        } else {
            myStore[regChar]++;
        }
        return regChar;
    }

    var toUpperCaseReg = function(regChar) {
        return regChar.toUpperCase();
    }

    var setMyStore = function(regName) {
        myStore = regName;
    }
    var getMyStore = function() {
        return myStore;
    }
    var getCounter = function() {
        return counter;
    }

    var regexCheck = function(regChar) {
        var regex = /^((CA|CJ|CY|CL)\s\d{3}\-\d{3})$|^((CA|CJ|CY|CL)\s\d{3}\d{3})$|^((CA|CJ|CY|CL)\s\d{3}\s\d{3})$/;
        return regex.test(regChar);
    }

    var emptyStringTest = function(regChar) {
        if (!regChar || regChar == '') {
            return false;
        }
        return true;
    }
    var resetBtn = function() {
        return myStore;
    }

    return {
        registrationNo,
        setMyStore,
        getMyStore,
        getCounter,
        toUpperCaseReg,
        regexCheck,
        emptyStringTest,
        resetBtn
    }

}