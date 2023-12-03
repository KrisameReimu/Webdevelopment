//static/js/register.js  
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
      
      // Validate form values
      if (!validateUserId(userId)) {
        alert('Invalid User ID');
        return false;
      }
  
      if (!validatePassword(password)) {
        // Password must be at least 8 characters
        if (password.length < 8) {
          alert('Password must be at least 8 characters');
          return false;
        } else {
          alert('Invalid Password');
          return false;
        }
      }
  
      if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match');
        return false;
      }

      //Optional to validate nickname, if user do not input nickname, it will use userID as nickname
      if (!validateNickname(nickname)) {
        nickname = userId;
      }
        
    
      if (!validateEmail(email)) {
        alert('Invalid Email');
        return false;
      }
  
  
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
      // User ID must be at least 4 characters
      if (userId.length < 4) {
        showMessage('Invalid User ID,User ID must be at least 4 characters!');
        return false;
      }
      return true;
    }
  
    // Function to validate Password
    function validatePassword(password) {
      // Password must be at least 8 characters
      if (password.length < 8) {
        showMessage('Invalid Password,Password must be at least 8 characters!');
        return false;
      }
      return true;
    }
  
    // Function to validate Email
    function validateEmail(email) {
      // Email should contain '@' character
      if (email.indexOf('@') === -1) {
        showMessage('Invalid Email,Email should contain @ character!');
        return false;
      }
      
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

     // Submit the form data to /auth/register and handle the result programmatically
      let formData = new URLSearchParams();
      formData.append('userId', userId);
      formData.append('password', password);
      formData.append('nickname', nickname);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('birthdate', birthdate);
      console.log(formData);
      fetch('/auth/register', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Registration success
          showMessage('Registration successful', 'success');
        } else {
          // Registration failed
          showMessage(data.message);
        }
      })
      .catch(err => {
        showMessage('Unable to register: ' + err.message);
      });

  });
  