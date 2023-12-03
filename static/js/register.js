//static/js/register.js  

//add button listener
document.getElementById('registerButton').addEventListener('click', function(){

  // Get the form data
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let nickname = document.getElementById('nickname').value;
  let email = document.getElementById('email').value;
  let gender = document.getElementById('gender').value;
  let birthdate = document.getElementById('birthdate').value;
  // profileImage is a File object
  let profileImage = document.getElementById('profileImage').files;

  //check if username is empty
  if (username === '') {
    alert('User Name cannot be empty!');
    return;
    //check if username is less than 4 characters
  } else if (username.length < 4) {
    alert('User ID must be at least 4 characters!');
    return;
  }
  //check if password is empty
  if (password === '') {
      alert('Password cannot be empty!');
      return;
      //check if password is less than 6 characters
  } else if (password.length < 6) {
    alert('Password must be at least 6 characters!');
    return;
  }
  //check if password and confirm password match
  else if (password !== confirmPassword) {
    alert('Password and confirm password do not match!');
    return;
  }

  //check if nickname is empty
  //if it is empty, set it to username
  if (nickname === '') {
    nickname = username;
  }
  //check if email is empty
  if (email === '') {
    alert('Email cannot be empty!');
    return;
  }

  // Submit the form data to /auth/register and handle the result programmatically
  let formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('nickname', nickname);
  formData.append('email', email);
  formData.append('gender', gender);
  formData.append('birthdate', birthdate);
  formData.append('profileImage', profileImage[0]);
  console.log(formData);
  fetch('/auth/register', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
       if (data.status === 'success') {
        // Registration success
        alert('Registration success!Please login~');
       //to login form
        window.location.href = '/login.html';

      } else {
        // Registration failed
        alert(`Registration failed: ${data.message}`);
        
      }
    })
    .catch(err => {
      // Handle registration error
      alert(`Registration failed: ${err}`);
      
    });
});

  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async (event) => {
    const username = document.getElementById("loginUserName").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(`Logged in as ${data.user.username} (${data.user.role})`);
        window.location.href = "/index.html";
      } else if (data.status === "failed") {
        alert(data.message);
      } else {
        alert("Unknown error");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    }
  });

//add remember me function
document.getElementById('rememberMe').addEventListener('change', function(event) {
  if (event.target.checked) {
    localStorage.setItem('rememberUsername', document.getElementById('loginUserName').value);
  } else {
    localStorage.removeItem('rememberUsername');
  }
});

//load username when page load
window.onload = function() {
  const rememberedUsername = localStorage.getItem('rememberUsername');
  if (rememberedUsername) {
    document.getElementById('loginUserName').value = rememberedUsername;
    document.getElementById('rememberMe').checked = true;
  }
};
    
// set a timer to logout after 10 minutes of inactivity
let idleTimeout;
function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    // alert user that they will be logged out
    alert('You have been logged out due to inactivity.');
    // logout 
    fetch('/auth/logout', {
      method: 'POST'
    });

    // redirect to login page
    
    window.location.href = '/register.html';
  }, 5 * 60 * 1000); // 5 minutes
}

// reset the timer on any of these events
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keypress', resetIdleTimer);

// reset the timer on page load
window.onload = resetIdleTimer;