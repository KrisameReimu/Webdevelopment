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
                "<td>" + flight.departureTime + "  GMT: +8:00</td>" +
                "<td>" + flight.duration + "  hours</td>" +
                "<td> $" + flight.ticketPrice + "</td>" +
                "</tr>";
            $("#flightTable tbody").append(flightRow);
        });
    }
});





