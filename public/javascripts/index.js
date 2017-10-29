$("#invalidWarning").hide();
document.isUserLoggedIn = false;

let menuJson;

$.getJSON('./json/navMenu.json', data => {
    menuJson = data;
    refreshNavigationBar()
});

class ViewState {

    constructor() {
        this.role = undefined;
    }

    get loggedIn() { return this.role !== undefined; }

    get isManager() { return this.role === 'Manager'; };

    get menu() {
        return menuJson.map(item => {
            item.shown = (this.loggedIn || !item.loggedInOnly) && (this.isManager || !item.managerOnly);
            return item
        });
    }

}

function getCurrentLink() { return window.location.pathname; }

function itemIsActive(item) { return getCurrentLink() === item.link }

const viewModel = new ViewState();

function onNavigationClick(link) {
    window.history.pushState("","",link);
    refreshNavigationBar();
    refreshBody();
}

function refreshBody() {
    $.ajax({
        type: "GET",
        url: "./body" + getCurrentLink(),
        success: (res) => $('#main-body-container').html(res),
        error: function (err) { $('#main-body-container').text("Error code " + err.status + ". Sorry!") }
    });
}

function refreshNavigationBar() {
    if (viewModel.loggedIn) {
        $("#loginLi").hide();
        $("#logoutLi").show();
    } else {
        $("#loginLi").show();
        $("#logoutLi").hide();
    }

    $('#nav-bar-menu').html( viewModel.menu
        .filter(item => item.shown)
        .map(item => {
            return '<li class=' + (itemIsActive(item)?"active":"") + '><a href="' + item.link + '" onclick="onNavigationClick(\'' + item.link + '\'); return false;">' + item.title + '</a></li>\n';
        })
        .reduce((a,b) => a + b, '')
    );
}

$.ajax({
    type: "GET",
    url: "./login/isLoggedIn",
    success: function (res) {
        viewModel.role = res.userRole;
        refreshNavigationBar();
        refreshBody();
    },
    error: function (err) {
        viewModel.role = undefined;
        refreshNavigationBar();
        refreshBody();
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
            viewModel.role = data.userRole;
            refreshNavigationBar();
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
