 const loginBtn = document.getElementById("loginBtn2");

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