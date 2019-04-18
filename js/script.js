//  ***** Project 3 ******

// Global Variables

const validatorSpans = $('.validator');
const otherInput = $('#other-title');
const design = $('#design');
const shirtColors = $('#color option');
const checkBoxCollection = $(':checkbox');
const js_frameworks = $('[name="js-frameworks"]');
const express = $('[name="express"]');
const js_libs = $('[name="js-libs"]');
const node = $('[name="node"]');
const activitiesFieldSet = $('.activities');
const paymentMethod = $('#payment option');
const paypalDiv = $('#credit-card').next();
const bitcoinDiv = $('#credit-card').next().next();

let activityCosts = $('[name="total"]').val(0);                          //sets the start value of activity costs to 0 because no workships are selected

$('input[type=checkbox]').prop('checked',false);                        // unchecks all checkboxes if page is refreshed
$('select option[value="credit card"]').prop('selected', true);        // sets credit card option to default select option
$(paymentMethod[0]).prop('disabled', true);                          // Disables the "select payment" select option to ensure form is filled out properly

validatorSpans.hide();                                                  //hides validator helper messages
shirtColors.hide();                                                    // hides shirt colors when page loads
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
    shirtColors.each(function(index, colorOption){
      if (index > 2){
        $(colorOption).show();
      }else{
      $(colorOption).hide();
      }
    });
  }
 if (design.val() === 'select theme'){              //if select theme is selected, hides all color options
   shirtColors.hide();
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
/*
If any of the following validation errors exist, prevent the user from submitting the form:
  -  Name field can't be blank.
  -  Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address,
        just that it's formatted like one: dave@teamtreehouse.com for example.
  -  User must select at least one checkbox under the "Register for Activities" section of the form.
  -  If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number,
        a Zip Code, and a 3 number CVV value before the form can be submitted.
  -  Credit Card field should only accept a number between 13 and 16 digits.
  -  The Zip Code field should accept a 5-digit number.
  -  The CVV should only accept a number that is exactly 3 digits long.

NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements. You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.

*/


let nameField = $('#name');

function isNameBlank(){
    if (nameField.val() === '' || /^\s*$/.test(nameField.val())){     // tests for blank or whitespce
      nameField.css({"border": "1px solid red"});
      nameField.append($('<span>Please do not leave name field blank</span>'));
    }else{
      nameField.css({"border": "1px solid green"});
    }
};

nameField.on('keyup', function(){
  isNameBlank();
});

let email = $('#mail');

function validEmailFormat(email){
    return /^[^@$#]+@[^@]+\.[a-z]+$/i.test(email.val());             //checks to see if email value is valid.
};

function isEmailValid(){
    if (validEmailFormat(email)){
      email.css({"border": "1px solid green"});
    }else{
      email.css({"border": "1px solid red"});
    }
};

email.on('keyup', function(){
  isEmailValid();
});

let isCheckboxChecked = false;                                             // when page loads default is false, unitl 1 checkbox is checked

function oneCheckboxChecked(){                                            //if no checkboxes checked, value is 0 and false
  if ($(':checkbox:checked').length === 0){
    isCheckboxChecked = false;
  }else{
    isCheckboxChecked = true;
  }
};

checkBoxCollection.on('click', function(){
  oneCheckboxChecked();
});


let creditCardNumber = $('#cc-num');
let zipcode = $('#zip');
let cvv = $('#cvv');
let creditCardInformation = $('#credit-card div');

function creditCardValidation(creditCardNumber){
  return /^\d{13,16}$/.test(creditCardNumber.val());                                // validates that field contains 13-16 numerals
};

function isCreditNumberValid(){
    if (creditCardValidation(creditCardNumber)){
      creditCardNumber.css({"border": "1px solid green"});
    }else{
      creditCardNumber.css({"border": "1px solid red"});
    }
};

creditCardNumber.on('keyup', function(){
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

zipcode.on('keyup', function(){
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

cvv.on('keyup', function(){
  isCvvValid();
});

function isPaymentCredit(){                                           //itterates through credit card payment fields for validation
  if ($(paymentMethod[1]).is(':selected')){
     for (let i = 0; i < creditCardInformation.length; i++){
       if ($(creditCardInformation[i]) === 0){
         isCreditNumberValid(creditCardNumber);
       }else if ($(creditCardInformation[i]) === 1){
         isZipcodeValid(zipcode);
       }else{
         isCvvValid(cvv);
       }
     }
}
};

const submitButton = $('button[type="submit"]');


// creditCardNumberValid(creditCardInformation);
// zipcodeNumberValid(zipcode);
// cvvNumberValid(cvv);
