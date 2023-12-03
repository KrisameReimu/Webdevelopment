$(document).ready(function () {
    var totalPrice = 0;

    $.get("assets/user_ticket.json", function (data) {
        flights = data;
        displayFlights(flights); // Display the flights in the table
        calculateTotalPrice(); // Calculate and update the total price
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
                "<td>" + flight.duration + " hours</td>" +
                "<td>" + flight.seat + "</td>" +
                "<td>$" + flight.ticketPrice + "</td>" +
                "</tr>";
            $("#flightTable tbody").append(flightRow);
        });
    }

    function calculateTotalPrice() {
        totalPrice = 0;

        // Loop through the flights array and add up the ticket prices
        $.each(flights, function (index, flight) {
            totalPrice += flight.ticketPrice;
        });

        // Update the total price element with the calculated value
        $("#totalPrice").text(totalPrice);
    }

    // Call the calculateTotalPrice function initially to display the default total price
    calculateTotalPrice();






    // Handle form submission for payment
    $("#paymentForm").submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the input values
        var cardNumber = $("#cardNumber").val();
        var expiryDate = $("#expiryDate").val();
        var cvv = $("#cvv").val();

        // Perform validation on input values 

        // Simulate payment process
        var paymentStatus = Math.random() < 0.5 ? "success" : "failed";

        // Display payment status
        if (paymentStatus === "success") {
            $("#paymentStatus").html("<p class='text-success'>Payment successful!</p>");

            // Show electronic tickets to buyers after successful purchase
            var ticketsHtml = "<h2>Electronic Tickets</h2>";
            // Generate and append the ticket details dynamically to the 'tickets' div element

            $("#tickets").html(ticketsHtml);

            // Update the order status upon successful payment
            // Can make an AJAX request here to update the order status in backend database
        } else {
            $("#paymentStatus").html("<p class='text-danger'>Payment failed. Please try again.</p>");
        }
    });
});
