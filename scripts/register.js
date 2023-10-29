$(document).ready(function() {
    // Handle form submission
    $('#registrationForm').submit(function(event) {
      event.preventDefault(); // Prevent form from submitting
  
      // Get form values
      var userId = $('#userId').val();
      var password = $('#password').val();
      var confirmPassword = $('#confirmPassword').val();
      var nickname = $('#nickname').val();
      var email = $('#email').val();
      var gender = $('#gender').val();
      var birthdate = $('#birthdate').val();
  
      // Perform validation checks
      if (!validateUserId(userId)) {
        showMessage('Invalid User ID');
        return;
      }
  
      if (!validatePassword(password)) {
        showMessage('Invalid Password');
        return;
      }
  
      if (password !== confirmPassword) {
        showMessage('Passwords do not match');
        return;
      }
  
      if (!validateNickname(nickname)) {
        showMessage('Invalid Nickname');
        return;
      }
  
      if (!validateEmail(email)) {
        showMessage('Invalid Email');
        return;
      }
  
      // Additional validation checks for other fields (e.g., gender, birthdate)
  
      // Registration success
      showMessage('Registration successful', 'success');
  
      // Clear form values
      $('#userId').val('');
      $('#password').val('');
      $('#confirmPassword').val('');
      $('#nickname').val('');
      $('#email').val('');
      $('#gender').val('');
      $('#birthdate').val('');
    });
  
    // Function to validate User ID
    function validateUserId(userId) {
      // Add your validation logic here
      return true;
    }
  
    // Function to validate Password
    function validatePassword(password) {
      // Add your validation logic here
      return true;
    }
  
    // Function to validate Nickname
    function validateNickname(nickname) {
      // Add your validation logic here
      return true;
    }
  
    // Function to validate Email
    function validateEmail(email) {
      // Add your validation logic here
      return true;
    }
  
    // Function to show feedback message
    function showMessage(message, type = 'danger') {
      var alertClass = 'alert-' + type;
      $('#registrationForm .alert').remove(); // Remove previous messages
  
      // Create and display the message
      var alertMessage = '<div class="alert ' + alertClass + '">' + message + '</div>';
      $('#registrationForm').prepend(alertMessage);
    }
  });
  