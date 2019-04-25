//  ***** Project 3 ******

// Global Variables

const otherInput = $('#other-title');
const design = $('#design');
const designOptions = $('#design option')
const shirtColorsDiv = $('#colors-js-puns');
const shirtColors = $('#color option');
const checkBoxCollection = $(':checkbox');
const costField = '<p><label>Total: $ <input type="text" name="total" value="0.00" readonly="readonly"></label></p>'  //appends a read only cost field
const js_frameworks = $('[name="js-frameworks"]');
const express = $('[name="express"]');
const js_libs = $('[name="js-libs"]');
const node = $('[name="node"]');
const nameField = $('#name');
const email = $('#mail');
let isCheckboxChecked = false;                                             // when page loads default is false, unitl 1 checkbox is checked
const creditCardNumber = $('#cc-num');
const zipcode = $('#zip');
const cvv = $('#cvv');
const creditCardInformation = $('#credit-card');
const activitiesFieldSet = $('.activities');
const paymentMethod = $('#payment');
const paymentOptions = $('#payment option');
const paypalDiv = $('#credit-card').next();
const bitcoinDiv = $('#credit-card').next().next();

const nameFieldError = '<span class="validator" id="name_validator_message">Please do not leave name field blank.</span>';
const emailFieldError = '<span class="validator" id="email_validator_message">Please enter a valid email address.</span>';
const workshopFieldError = '<span class="validator" id="workshop_validator_message">Please make sure to select at least one workshop.</span><br>'
const creditcardBlankError = '<span class="validator" id="cc_blank_validator">Please do not leave field blank.</span>';
const creditCardCharacterError = '<p><span class="validator" id="ccNANError">Please use numeral characters.</span></p>';
const creditCardFieldError = '<p><span class="validator" id="cc_validator_message">Invalid Number.</span></p>';
const zipcodeFieldError = '<p><span class="validator" id="zipcode_validator_message">Invalid ZIP Code.</span></p>';
const cvvFieldError = '<p><span class="validator" id="cvv_validator_message">Invalid CVV.</span></p>';
const submitButton = $('button[type="submit"]');
    activitiesFieldSet.append(costField);                                         //appends the costField to the bottom of workshop list
    nameField.before(nameFieldError);
    email.before(emailFieldError);
    activitiesFieldSet.prepend(workshopFieldError);
    creditCardInformation.before(creditCardFieldError);
    creditCardInformation.before(creditcardBlankError);
    creditCardInformation.before(creditCardCharacterError);
    creditCardInformation.before(zipcodeFieldError);
    creditCardInformation.before(cvvFieldError);

const validatorSpans = $('.validator');                                   //creates validator variable to hide validation error messages

validatorSpans.hide();                                                    //hides the error messages when page loads

let activityCosts = $('[name="total"]').val(0);                          //sets the start value of activity costs to 0 because no workships are selected

$('input[type=checkbox]').prop('checked',false);                        // unchecks all checkboxes if page is refreshed
$('select option[value="credit card"]').prop('selected', true);        // sets credit card option to default select option
$(paymentOptions[0]).prop('disabled', true);                          // Disables the "select payment" as selectable option
$(designOptions[0]).prop('selected', true);                         //Sets default desing to 'Select Theme'
shirtColorsDiv.hide();                                                  //hides shirt colors when page laods
paypalDiv.hide();                                                      //hides paypal div
bitcoinDiv.hide();                                                   //hides Bitcoin div

// Puts the focus on name input when page is loaded
$('#name').focus();

// ****** Job role Section ********
otherInput.hide();                               // hides the other-title job input field

$('#title').on('change', function(){             // function shows input if other is selected and hides it if not
    if ($('#title').val() === 'other') {
      otherInput.show();
    }else{
      otherInput.hide();
  }
});

// ******* T-shirt information Section ***********

design.on('change', function (){                     // function to hide/show colors for specific designs
  $(shirtColors[0]).prop("selected", true);    //changes T-shirt colors when new design is selected.
  shirtColorsDiv.show();                            //shows color optionsDiv if selected
  if (design.val() === 'js puns'){                  //if statement checks value for design string
    shirtColors.each(function(index, colorOption){  //uses Jquery loop to read index values of color options
      if (index <= 2){                              //either shows or hids depending on which design is selected.
        $(colorOption).show();
      }else{
        $(colorOption).hide();
    }
  });
}
  if (design.val() === 'heart js'){                   //hides JS Puns, and also shows hear JS desings
    $(shirtColors[3]).attr("selected", true);
    shirtColorsDiv.show();
    shirtColors.each(function(index, colorOption){
      if (index > 2){
        $(colorOption).show();
      }else{
      $(colorOption).hide();
      }
    });
  }
 if (design.val() === 'select theme'){              //if select theme is selected, hides all color options
   shirtColorsDiv.hide();
 }
});

// ***** ”Register for Activities” section *******

function enableCheckbox(element){                   //DRY refactoring functions that disable and enable checkboxes depending on conflicting time slots
    element.prop('disabled', false);         //function calls make readability easier.
}
function disableCheckbox(element){
  element.prop('disabled', true);
}

checkBoxCollection.on('change', function(){         //fucntion to disable conflicting times for workshops
  if (js_frameworks.is(':checked')){                //if js_frameworks is checked then express workship is disabled and checkbox is hidden
    disableCheckbox(express);
  }
  if (js_frameworks.is(':checked') === false){        //if js_frameworks is unchecked then express.prop is reenabled and clickable
    enableCheckbox(express);
  }
  if (express.is(':checked')){
    disableCheckbox(js_frameworks);
  }
  if (express.is(':checked') === false){
    enableCheckbox(js_frameworks);
  }
  if (js_libs.is(':checked')){
    disableCheckbox(node);
  }
  if (js_libs.is(':checked') === false){
    enableCheckbox(node);
  }
  if (node.is(':checked')){
    disableCheckbox(js_libs);
  }
  if (node.is(':checked') === false){
    enableCheckbox(js_libs);
  }
});

checkBoxCollection.on('change', function(){           // function to add the value of checkbox to activityCosts
  let cost = 0;                                       // sets a variable that sets cost
  for (let i = 0; i < checkBoxCollection.length; i++){    // itterates through checkboxes to check if they are checked
    if ($(checkBoxCollection[i]).is(':checked')){
      if (i === 0){                                   //if i === 0 then the cost is 200 because refrences main conference
        cost += 200;
      }else{                                          // if any other checkbox is checked then adds 100 to total
        cost += 100;
    }
  }
}
  activityCosts.val(cost);                          //updates the activtyCosts input value defined under global variables
});

// *********** "Payment Info" section ***************

paymentMethod.on('change', function(){                            //iterates through selectable payment options
  for (let i = 1; i < paymentOptions.length; i++){
    if ($(paymentOptions[i]).is(':selected')){
      if (i === 1){                                              //hides and shows appropriate information for each payment option
        $('.credit-card').show().prop('hidden', false);
        bitcoinDiv.hide();
        paypalDiv.hide();
      }else if (i === 2){
        $('.credit-card').hide().prop('hidden', true);
        paypalDiv.show();
        bitcoinDiv.hide();
      }else if (i === 3){
        $('.credit-card').hide().prop('hidden', true);
        bitcoinDiv.show();
        paypalDiv.hide();
      }
    }
  }
});


// ************* Form validation **************

//*************  Name Validator *************************

function isNameBlank(){
    if (nameField.val() === '' || /^\s*$/.test(nameField.val())){     // tests for blank or whitespce
      nameField.css({"border": "1px solid red"});
      $('#name_validator_message').show();
      return false;
    }else{
      nameField.css({"border": "1px solid green"});
      $('#name_validator_message').hide();
      return true;
    }
};

nameField.on('keydown keyup', function(){                             //event listenter that calls validation function for name field
  isNameBlank();
});

//*************  Email Validator *************************
function validEmailFormat(email){
    return /^[^@$#\s]+@[^@\s]+\.[^\s][a-z]+$/i.test(email.val());             //checks to see if email value is valid.
};

function isEmailValid(){
    if (validEmailFormat(email)){
      email.css({"border": "1px solid green"});
      $("#email_validator_message").hide();
      return true;
    }else{
      email.css({"border": "1px solid red"});
      $("#email_validator_message").show();
      return false;

    }
};

email.on('keydown keyup', function(){
  isEmailValid();
});


// ************* Is one Checkbox Checked ******************

function oneCheckboxChecked(){                                            //if no checkboxes checked, value is 0 and false
  if ($(':checkbox:checked').length === 0){
    isCheckboxChecked = false;
    $('#workshop_validator_message').fadeIn(1000);
    return false;
  }else{
    isCheckboxChecked = true;                                           //if checkbox selector has a length, then at least one is checked and returns true
    $('#workshop_validator_message').hide();
    return true;
  }
};

checkBoxCollection.on('click', function(){
  oneCheckboxChecked();
});

//*************  Credit Card Section Validators *************************


function creditCardValidation(creditCardNumber){
  return /^\d{13,16}$/.test(creditCardNumber.val());                                // validates that field contains 13-16 numerals
};

function creditCardNumeralError(creditCardNumber){                                //checks for characters besides numeral/digits
  return /\D/.test(creditCardNumber.val());
}

function isCreditNumberValid(){
  $('#ccNANError').hide();                                      //hides cc NAN error message if validation error is fixed
  $('#cc_blank_validator').hide();                              // hides error if validation error is fixed
    if (creditCardValidation(creditCardNumber)                  // if field is not blank, and has only numerals in correct quanitity, returns true
     && creditCardNumber.val() !== ''
     && creditCardNumeralError(creditCardNumber) === false){
       creditCardNumber.css({"border": "1px solid green"})
       return true;
    }else if (creditCardNumeralError(creditCardNumber)){        //if credit card number has character or whitespace other than numeral reveals message
        creditCardNumber.css({"border": "1px solid red"})       // and returns false
        $('#ccNANError').show();
        return false;
    }else if (creditCardNumber.val() === ''){                 // if field is blank, shows please don't leave blank message
        $('#cc_blank_validator').show();
        return false;
    }else{
      creditCardNumber.css({"border": "1px solid red"});
      return false;
    }
};

creditCardNumber.on('keyup keydown', function(){
  isCreditNumberValid();
});

function zipcodeNumberValid(zipcode){
  return /^\d{5}$/.test(zipcode.val());                                // validates that zipcode field contains 5 numerals
}

function isZipcodeValid(){
    if (zipcodeNumberValid(zipcode)){
      zipcode.css({"border": "1px solid green"});
      $('#zipcode_validator_message').hide();
      return true;
    }else{
      zipcode.css({"border": "1px solid red"});
      $('#zipcode_validator_message').show();
      return false;
    }
};

zipcode.on('keyup keydown', function(){
  isZipcodeValid();
});

function cvvNumberValid(cvv){
  return /^\d{3}$/.test(cvv.val());                                // validates that cvv field contains 3 numerals
}

function isCvvValid(){
    if (cvvNumberValid(cvv)){
      cvv.css({"border": "1px solid green"});
      $('#cvv_validator_message').hide();
      return true;
    }else{
      cvv.css({"border": "1px solid red"});
      $('#cvv_validator_message').show();
      return false;
    }
};

cvv.on('keyup keydown', function(){
  isCvvValid();
});

// ********** Submit Button *************


submitButton.on('click', function(e){                                       //if payment method is credit is true, all validations must be true
    if (!isNameBlank()
        || !isEmailValid()
        || !oneCheckboxChecked()){
          e.preventDefault();
          alert("Please make sure you fill out all form fields!")
        }
    if ($(paymentOptions[1]).is(':selected')) {                              //paymentOption[1] is credit card selector option
        if (!isCreditNumberValid()
        || !isZipcodeValid()
        || !isCvvValid()){
          e.preventDefault();
          }
        }
    });
