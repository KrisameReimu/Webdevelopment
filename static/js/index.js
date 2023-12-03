//staic/js/main.js

$(document).ready(function () {
    // Array to store the flights
    var flights = [];
    // Default isAdmin value set to false
    var isAdmin = false;
    // Show or hide the admin-specific elements
    if (isAdmin) {
        $("#createFlightForm").show(); // Show the form for admins
    } else {
        $("#createFlightForm").hide(); // Hide the form for non-admins
    }
    
    
    // Load flights from JSON file
    $.get("assets/flights.json", function (data) {
        flights = data;
        displayFlights(flights); // Display the flights in the table
    });

    // Function to display flights in the table
    function displayFlights(flights) {
        // Clear previous flight rows
        $("#flightTable tbody").empty();

        // Loop through the flights array and display each flight
        $.each(flights, function (index, flight) {
            var flightRow = "<tr>" +
                "<td>" + flight.departureAirport + "</td>" +
                "<td>" + flight.destinationAirport + "</td>" +
                "<td>" + flight.departureTime + "</td>" +
                "<td>" + flight.duration + "  hours</td>" +
                "<td> $" + flight.ticketPrice + "</td>" +
                "</tr>";
            $("#flightTable tbody").append(flightRow);
        });
    }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/auth/me");
    const data = await response.json();

    if (!response.ok) {
      alert("Welcome to our website! But Please login first to get more infomation!");
      window.open("/register.html", "_self");
    } else {
      const greeting = document.querySelector(".greeting");
      greeting.textContent = `Welcome, ${data.user.username} (${data.user.role})`;
    }
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      const confirmed = confirm("Confirm to logout?");
      if (confirmed) {
        try {
          const response = await fetch("/auth//logout", { method: 'POST' });
          if (!response.ok) {
            alert("An unexpected error occurred");
            return;
          }
          console.log("Logged out successfully");
          alert("Logged out successfully");
          window.open("/register.html", "_self");
        } catch (error) {
          console.error(error);
          alert("An unexpected error occurred");
        }
      }
    });
  } catch (error) {
    console.error(error);
    alert("An unexpected error occurred");
  }
});




