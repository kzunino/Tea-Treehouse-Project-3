//  ***** Project 3 ******

// Global Variables

const otherInput = $('#other-title');
const design = $('#design');
const shirtColors = $('#color option');

shirtColors.hide();                       // hides shirt colors when page loads

// Puts the focus on name input when page is loaded
$('#name').focus();

// ****** Job role Section ********
otherInput.hide();                     // hides the other-title job input field

$('#title').on('click', function(){       // function shows input if other is selected and hides it if not
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

/*
-Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a
  workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop
  in the competing time slot isn't available.
-When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
-As a user selects activities, a running total should display below the list of checkboxes.
  For example, if the user selects "Main Conference", then Total: $200 should appear.
  If they add 1 workshop, the total should change to Total: $300.
*/

const checkBoxCollection = $(':checkbox');
const activityLabels = $('.activities label input');
const mainConference = $('[name="all"]');
const js_frameworks = $('[name="js-frameworks"]');
const express = $('[name="express"]');
const js_libs = $('[name="js-libs"]');
const node = $('[name="node"]');
const build_tools = $('[name="build-tools"]');
const npm = $('[name="npm"]');
const activitiesFieldSet = $('.activities');
activitiesFieldSet.append('<p>Cost:</p>');
let activityCosts = 0;

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

checkBoxCollection.on('change', function(){
  // activityCosts = 0;
  if (mainConference.is(':checked')){
    activityCosts += 200;
  }else if (mainConference.is(':checked') === false){
    activityCosts -= 200;
  }
  if (js_frameworks.is(':checked')
        || express.is(':checked')
        || js_libs.is(':checked')
        || node.is(':checked')
        || build_tools.is(':checked')
        || npm.is(':checked')) {
           activityCosts += 100;
     }else{
     }
  if (activityCosts < 0){
    activityCosts = 0;
  }
  console.log(activityCosts);
});
