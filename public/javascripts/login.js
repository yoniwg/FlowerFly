$("#invalidWarning").hide();
document.isUserLoggedIn = false;

function renderLoggedIn(userRole) {
    switch (userRole) {
        case "Manager":
            break;
        case "Employee":
            break;
        case "Provider":
            break;
        case "Customer":
            break;
        default:
            break;
    }
    $("#loginLi").hide();
    $("#logoutLi").show();
}

function renderLoggedOut() {
    $("#loginLi").show();
    $("#logoutLi").hide();
}

$.ajax({
    type: "GET",
    url: "./login/isLoggedIn",
    success: function (res) {
        if (res.userRole) renderLoggedIn(res.userRole);
        else renderLoggedOut();
    },
    error: function (err) {
        renderLoggedOut();
    }
});

$("#loginForm").submit(function(e) {

    const url = "./login"; // the script where you handle the form input.

    $.ajax({
        type: "POST",
        url: url,
        data: $("#loginForm").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('#loginModal').modal('toggle');
            renderLoggedIn(data.userRole)

        },
        error: function(data)
        {
            $("#invalidWarning").show();
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

function onCancelClick() {
    $("#invalidWarning").hide();
}