$(document).ready(function() {
    // handle registration form submit
    $("#registrationForm").submit(function(event) {
        event.preventDefault();

        // get form values
        var userId = $("#userId").val();
        var password = $("#