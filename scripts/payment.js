$(document).ready(function () {
    //show the ticket detailed infortmaion to user so that they can confirm thickets detailes
    
    $.get("user_ticket.json", function (data) {
        flights = data;
        displayFlights(flights);
    });

    


        // Handle form submission for payment
        $("#paymentForm").submit(function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Get the input values
            var cardNumber = $("#cardNumber").val();
            var expiryDate = $("#expiryDate").val();
            var cvv = $("#cvv").val();

            // Perform validation on input values 

            // Simulate payment process (you can replace this with your actual payment processing logic)
            var paymentStatus = Math.random() < 0.5 ? "success" : "failed";

            // Display payment status
            if (paymentStatus === "success") {
                $("#paymentStatus").html("<p class='text-success'>Payment successful!</p>");

                // Show electronic tickets to buyers after successful purchase
                var ticketsHtml = "<h2>Electronic Tickets</h2>";
                // Generate and append the ticket details dynamically to the 'tickets' div element

                $("#tickets").html(ticketsHtml);

                // Update the order status upon successful payment
                // You can make an AJAX request here to update the order status in your backend database
            } else {
                $("#paymentStatus").html("<p class='text-danger'>Payment failed. Please try again.</p>");
            }
        });
    });
