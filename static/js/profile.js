document.addEventListener("DOMContentLoaded", async () => {
  try {
    // check login status
    const loginResponse = await fetch("/auth/me");
    // if not logged in, redirect to register.html
    if (!loginResponse.ok) {
      alert("Welcome to our website! But Please login first to get more infomation!");
      window.open("/register.html", "_self");
    } else {
      // if logged in, display user info
      await fetchUserProfile();
    }
  } catch (error) {
    console.error('get user profile failed:', error);
  }

  // add event listener to profile form
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      await updateProfile();
    });
  }
});

async function fetchUserProfile() {
  try {
    const response = await fetch('/auth/me');
    if (response.ok) {
      const data = await response.json();
      const greeting = document.querySelector(".greeting");
      greeting.textContent = `Welcome, ${data.user.username} (${data.user.role})`;

    } else {
      throw new Error('cannot get user profile');
    }
  } catch (error) {
    console.error('cannot get user profile:', error);
  }
}



async function updateProfile() {
  const formData = new FormData(document.getElementById('profileForm'));
  try {

    const updateData = {
      username: formData.get('username'),
      password: formData.get('password'),
      nickname: formData.get('nickname'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      birthdate: formData.get('birthdate')
    };

    const response = await fetch('/auth/update_user', {
      method: 'POST',
      body: JSON.stringify(updateData)
    });

    if (response.ok) {
      alert("success update profile");
    } else {
      throw new Error('failed to update profile');
    }
  } catch (error) {
    console.error('error:', error);
    alert('更新个人资料失败');
  }
}
