$(document).ready(function () {
    // show home page on page load
    $("#home-page").show();
    $("#admin-dashboard-page").hide();
    $("#user-login-page").hide();

    // handle navigation clicks
    $("#admin-dashboard-link").click(function () {
        $("#home-page").hide();
        $("#user-login-page").hide();
        $("#admin-dashboard-page").show();
    }
    )
}
)