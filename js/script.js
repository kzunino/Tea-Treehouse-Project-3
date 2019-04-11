//  ***** Project 3 ******

// Global Variables

const otherInput = $('#other-title');
const design = $('#design');
const shirtColors = $('#color option');
shirtColors.hide();

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
 if (design.val() === 'select theme'){              //if no design is selected, hides all color options
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

const checkBoxCollection = $('.activities label input');
ddd
