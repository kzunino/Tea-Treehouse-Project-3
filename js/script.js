//  ***** Project 3 ******

// Global Variables

const otherInput = $('#other-title');
const design = $('#design');
const shirtColorsDiv = $('#colors-js-puns');
const shirtColors = $('#color option');
const checkBoxCollection = $(':checkbox');
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
const creditCardInformation = $('#credit-card div');
const activitiesFieldSet = $('.activities');
const paymentMethod = $('#payment option');
const paypalDiv = $('#credit-card').next();
const bitcoinDiv = $('#credit-card').next().next();

const nameFieldError = '<span class="validator" id="name_validator_message">Please do not leave name field blank.</span>';
const emailFieldError = '<span class="validator" id="email_validator_message">Please make sure email format contains an "@" and a ".".</span>';
const workshopFieldError = '<span class="validator" id="workshop_validator_message">Please make sure to select at least one workshop.</span><br>'
const creditCardCharacterError = '<span class="validator" id="ccNANError">Please use only numeral characters.</span>';
const creditCardFieldError = '<span class="validator" id="cc_validator_message">Invalid Number.</span>'
const zipcodeFieldError = '<span class="validator" id="zipcode_validator_message">Invalid ZIP Code.</span>'
const cvvFieldError = '<span class="validator" id="cvv_validator_message">Invalid CVV.</span>'
const submitButton = $('button[type="submit"]');
    nameField.before(nameFieldError);
    email.before(emailFieldError);
    activitiesFieldSet.prepend(workshopFieldError);
    creditCardNumber.before(creditCardFieldError);
    creditCardNumber.before(creditCardCharacterError);
    zipcode.before(zipcodeFieldError);
    cvv.before(cvvFieldError);

const validatorSpans = $('.validator');

validatorSpans.hide();

let activityCosts = $('[name="total"]').val(0);                          //sets the start value of activity costs to 0 because no workships are selected

$('input[type=checkbox]').prop('checked',false);                        // unchecks all checkboxes if page is refreshed
$('select option[value="credit card"]').prop('selected', true);        // sets credit card option to default select option
$(paymentMethod[0]).prop('disabled', true);                          // Disables the "select payment" as selectable option

shirtColorsDiv.hide();
// shirtColors.hide();                                                    // hides shirt colors when page loads
paypalDiv.hide();                                                      //hides paypal div
bitcoinDiv.hide();                                                   //hides Bitcoin div

// Puts the focus on name input when page is loaded
$('#name').focus();

// ****** Job role Section ********
otherInput.hide();                               // hides the other-title job input field

$('#title').on('click', function(){             // function shows input if other is selected and hides it if not
    if ($('#title').val() === 'other') {
      otherInput.show();
    }else{
      otherInput.hide();
  }
});

// ******* T-shirt information Section ***********

design.on('click', function (){                     // function to hide/show colors for specific designs
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
  if (design.val() === 'heart js'){
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

checkBoxCollection.on('change', function(){         //fucntion to disable conflicting times for workshops
  if (js_frameworks.is(':checked')){                //if js_frameworks is checked then express workship is disabled and checkbox is hidden
    express.prop('disabled', true).hide();
  }
  if (js_frameworks.is(':checked') === false){
    express.prop('disabled', false).show();
  }
  if (express.is(':checked')){
    js_frameworks.prop('disabled', true).hide();
  }
  if (express.is(':checked') === false){
    js_frameworks.prop('disabled', false).show();
  }
  if (js_libs.is(':checked')){
    node.prop('disabled', true).hide();
  }
  if (js_libs.is(':checked') === false){
    node.prop('disabled', false).show();
  }
  if (node.is(':checked')){
    js_libs.prop('disabled', true).hide();
  }
  if (node.is(':checked') === false){
    js_libs.prop('disabled', false).show();
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
  activityCosts.val(cost);                          //updates the activtyCosts input value
});

// *********** "Payment Info" section ***************

paymentMethod.on('click', function(){               //iterates through selectable payment options
  for (let i = 1; i < paymentMethod.length; i++){
    if ($(paymentMethod[i]).is(':selected')){
      if (i === 1){                                 //hides and shows appropriate information for each payment option
        $('.credit-card').show().prop('disabled', false);
        bitcoinDiv.hide();
        paypalDiv.hide();
      }else if (i === 2){
        $('.credit-card').hide().prop('disabled', true);
        paypalDiv.show();
        bitcoinDiv.hide();
      }else if (i === 3){
        $('.credit-card').hide().prop('disabled', true);
        bitcoinDiv.show();
        paypalDiv.hide();
      }
    }
  }
});


// ************* Form validation **************


function isNameBlank(){
    if (nameField.val() === '' || /^\s*$/.test(nameField.val())){     // tests for blank or whitespce
      nameField.css({"border": "1px solid red"});
      $('#name_validator_message').show();
    }else{
      nameField.css({"border": "1px solid green"});
      $('#name_validator_message').hide();
        }
};

nameField.on('keydown keyup', function(){
  isNameBlank();
});


function validEmailFormat(email){
    return /^[^@$#]+@[^@]+\.[a-z]+$/i.test(email.val());             //checks to see if email value is valid.
};

function isEmailValid(){
    if (validEmailFormat(email)){
      email.css({"border": "1px solid green"});
      $("#email_validator_message").hide();
    }else{
      email.css({"border": "1px solid red"});
      $("#email_validator_message").show();

    }
};

email.on('keydown keyup', function(){
  isEmailValid();
});

function oneCheckboxChecked(){                                            //if no checkboxes checked, value is 0 and false
  if ($(':checkbox:checked').length === 0){
    isCheckboxChecked = false;
    $('#workshop_validator_message').show();
  }else{
    isCheckboxChecked = true;
    $('#workshop_validator_message').hide();
  }
};

checkBoxCollection.on('click', function(){
  oneCheckboxChecked();
});


function creditCardValidation(creditCardNumber){
  return /^\d{13,16}$/.test(creditCardNumber.val());                                // validates that field contains 13-16 numerals
};

function creditCardLetterError(creditCardNumber){
  return /[a-z]/i.test(creditCardNumber.val());
}

function isCreditNumberValid(){
    if (creditCardValidation(creditCardNumber)){
      creditCardNumber.css({"border": "1px solid green"});
    }else if (creditCardLetterError(creditCardNumber)){
      creditCardNumber.css({"border": "1px solid red"})
      $('#ccNANError').show();
    }else if (creditCardLetterError(creditCardNumber) === false){
      $('#ccNANError').hide();
    }else{
      creditCardNumber.css({"border": "1px solid red"});
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
    }else{
      zipcode.css({"border": "1px solid red"});
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
    }else{
      cvv.css({"border": "1px solid red"});
    }
};

cvv.on('keyup keydown', function(){
  isCvvValid();
});


submitButton.on('click', function(e){
    if ($(paymentMethod[1]).is(':selected')
        && isNameBlank()
        && isEmailValid()
        && oneCheckboxChecked()
        && isCreditNumberValid()
        && isZipcodeValid()
        && isCvvValid()){
    }else if ($(paymentMethod[1]).prop(':selected', false)
        && isNameBlank()
        && isEmailValid()
        && oneCheckboxChecked()){
    }else{
          e.preventDefault();
          alert("Please make sure to fill out form correctly")
        }
    });
