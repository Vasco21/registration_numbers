describe('Registration Number', function(){
describe('Incrementing counter for registration number', function(){
    var registrationFunc = registration()
    it('should add new registration number', function(){      
        registrationFunc.registrationNo(("CA 123456"));
        registrationFunc.registrationNo(("CJ 123-789"));
        registrationFunc.registrationNo(("CL 246897"));
        registrationFunc.registrationNo(("CY 011-171"));
        assert.equal(4,registrationFunc.getCounter());
    });
});

describe('Uppercasing a lowercased registration number', function(){
    var registrationFunc = registration()
    it('should the uppercased registrations', function(){      
        assert.equal("CA 123456", registrationFunc.toUpperCaseReg(("ca 123456")));
        assert.equal("CJ 123-789", registrationFunc.toUpperCaseReg(("cj 123-789")));
        assert.equal("CL 246897", registrationFunc.toUpperCaseReg(("cl 246897")));
        assert.equal("CY 011-171", registrationFunc.toUpperCaseReg(("cy 011-171")));
    });
});

describe('regex', function(){
    it('Should return false if the registration number is incorrect', function(){
        var registrationFunc = registration()
        assert.equal(false, registrationFunc.regexCheck('ct123456'));
        assert.equal(false, registrationFunc.regexCheck('45@wqAZ'));
        assert.equal(false, registrationFunc.regexCheck('CA 1m23456')); 
         
    });
    it('Should return true if registration number is correct', function(){
        var registrationFunc = registration()
        assert.equal(true, registrationFunc.regexCheck('CL 123-456')); 
        assert.equal(true, registrationFunc.regexCheck('CA 123-457')); 
        assert.equal(true, registrationFunc.regexCheck('CY 345630'));
    });
});

describe('Empty String', function(){
    it('Should return false if the string is empty', function(){
        var registrationFunc = registration()
        assert.equal(false, registrationFunc.emptyStringTest(''));
        assert.equal(false, registrationFunc.emptyStringTest(''));
        assert.equal(false, registrationFunc.emptyStringTest(''));
    });
    it('Should return true if there was a string captured', function(){
        var registrationFunc = registration()
        assert.equal(true, registrationFunc.emptyStringTest("CA 246897"));
        assert.equal(true, registrationFunc.emptyStringTest("CL 225-897"));
        assert.equal(true, registrationFunc.emptyStringTest("CJ 246-897"));
    });

});

describe('reset button', function(){
        it('Should clear all the local storage', function(){
            var registrationFunc = registration()
            assert.deepEqual({}, registrationFunc.resetBtn())
        });
    });


});


