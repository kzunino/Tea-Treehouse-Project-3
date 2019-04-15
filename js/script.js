//  ***** Project 3 ******

// Global Variables

const otherInput = $('#other-title');
const design = $('#design');
const shirtColors = $('#color option');
const checkBoxCollection = $(':checkbox');
const js_frameworks = $('[name="js-frameworks"]');
const express = $('[name="express"]');
const js_libs = $('[name="js-libs"]');
const node = $('[name="node"]');
const activitiesFieldSet = $('.activities');
activitiesFieldSet.append(`<p>
    <label>Total: $
      <input type="text" name="total" value="0.00" readonly="readonly">
    </label>
    </p>`);                                         // appends  a readonly text field for total costs
let activityCosts = $('[name="total"]').val(0);     //sets the start value of activity costs to 0 because no workships are selected

$('input[type=checkbox]').prop('checked',false);    // unchecks all checkboxes if page is refreshed
shirtColors.hide();                                // hides shirt colors when page loads

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
/*
Payment option in the select menu should match the payment option displayed on the page.
  When a user selects the "PayPal" payment option, the PayPal information should display,
and the credit card and “Bitcoin” information should be hidden.
  When a user selects the "Bitcoin" payment option, the Bitcoin information should display,
and the credit card and “PayPal” information should be hidden.

NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
*/
const paymentMethod = $('#payment option');
const paypalDiv = $('#credit-card').next();
const bitcoinDiv = $('#credit-card').next().next();
$('select option[value="credit card"]').prop('selected', true);        // sets credit card option to default select option
paypalDiv.hide();                                                      //hides paypal div
bitcoinDiv.hide();                                                   //hides Bitcoin div

paymentMethod.on('select', function(){
  for (let i = 0; i < paymentMethod.length; i++){
    if ($(paymentMethod[i]).is('selected', true)){
      if (i === 0){
        $('.credit-card').hide();
      }
    }
  }
});
