//static/js/payment.js
(document).ready(function () {
    var totalPrice = 0;
    var flights;

    // get user ticket
    $.get("assets/user_ticket.json", function (data) {
        flights = data;
        displayFlights(flights); // display flights
        calculateTotalPrice(flights); // calculate total price
    });

   
    function displayFlights(flights) {
        // clear table body
        $("#flightTable tbody").empty();

        // display flights
        $.each(flights, function (index, flight) {
            var flightRow = "<tr>" +
                "<td>" + flight.departureAirport + "</td>" +
                "<td>" + flight.destinationAirport + "</td>" +
                "<td>" + flight.departureTime + "</td>" +
                "<td>" + flight.duration + " 小时</td>" +
                "<td>" + flight.seat + "</td>" +
                "<td>$" + flight.ticketPrice + "</td>" +
                "</tr>";
            $("#flightTable tbody").append(flightRow);
        });
    }

    // calculate total price
    function calculateTotalPrice(flights) {
        totalPrice = flights.reduce((acc, flight) => acc + flight.ticketPrice, 0);

        // update total price
        $("#totalPrice").text(totalPrice);
    }

    // deal with payment
    $("#paymentForm").submit(function (event) {
        event.preventDefault(); // 阻止表单默认提交

        
        var cardNumber = $("#cardNumber").val();
        var expiryDate = $("#expiryDate").val();
        var cvv = $("#cvv").val();

        

        // simulate payment
        var paymentStatus = Math.random() < 0.5 ? "success" : "failed";

        // display payment status
        if (paymentStatus === "success") {
            $("#paymentStatus").html("<p class='text-success'>支付成功！</p>");

            // display tickets
            var ticketsHtml = "<h2>eTicket</h2>";
            $.each(flights, function (index, flight) {
                ticketsHtml += "<p>" + flight.departureAirport + " -> " + flight.destinationAirport + "</p>";
            });
            $("#tickets").html(ticketsHtml);

  
    
        } else {
            $("#paymentStatus").html("< class='text-danger'>failed</p>");
        }
    });
});
