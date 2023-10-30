$(document).ready(function() {
    // Pre-fill the user ID field based on the logged-in user
    $('#userId').val(loggedInUserId);

    // Handle profile form submission
    $('#profileForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the form data
        var formData = $(this).serializeArray();

        // Convert the form data into an object
        var profileData = {};
        $.each(formData, function(index, field) {
            profileData[field.name] = field.value;
        });

        // Update the profile JSON file with the new information
        updateProfile(profileData);
    });

    // Function to update the profile JSON file
    function updateProfile(profileData) {
        // Make an AJAX POST request to update the profile
        $.ajax({
            url: 'update_profile.php', // Replace with the appropriate server-side script URL
            method: 'POST',
            data: profileData,
            success: function(response) {
                // Handle the response
                if (response.success) {
                    alert('Profile updated successfully!');
                } else {
                    alert('Error updating profile. Please try again.');
                }
            },
            error: function() {
                alert('An error occurred while updating the profile. Please try again later.');
            }
        });
    }
});
