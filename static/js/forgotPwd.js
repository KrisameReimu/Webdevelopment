// static/js/forgotPassword.js

document.addEventListener('DOMContentLoaded', function() {
  // get references to the form elements
  var forgotPasswordForm = document.getElementById('forgotPasswordForm');
  var emailInput = document.getElementById('emailInput');

  // handle form submission
  forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting

    // get the email address entered by the user
    var email = emailInput.value;

    // check if the email address is empty
    if (email === '') {
      alert('email address cannot be empty');
      return;
    }

    // create a new XMLHttpRequest object
    // just example, not used
    var request = new XMLHttpRequest();
    request.open('POST', '/reset-password', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // success response received in requesting /reset-password
        var resp = JSON.parse(request.responseText);
        if (resp.success) {
          alert('Reset password email sent. Please check your inbox.');
        } else {
          alert(' Reset password email failed to send. Please try again later.');
        }
      } else {
        // error response received in requesting /reset-password
        alert('Reset password email failed to send. Please try again later.');
      }
    };

    request.onerror = function() {
      // error occurred in requesting /reset-password
      alert('Reset password email failed to send. Please try again later.');
    };

    // send POST request to /reset-password
    request.send('email=' + encodeURIComponent(email));
  });
});
