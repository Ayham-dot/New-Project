function createUser(username, password) {
    return {
        username: username,
        password: password
    };
}

var currentUser = null;

function loggedIn(username, password) {
    for (let user of users) {
        if (user.username === username && user.password === password) {
            currentUser = user;
            console.log("Logged in successfully");
            return true;
        }
    }
    console.log("Please try again");
    return false;
}

function logout() {
    if (currentUser) {
        currentUser = null;
        console.log("User has logged out");
    } else {
        console.log("No user is logged in");
    }
}


var user1 = createUser("rayen03", "49@3")
var user2 = createUser("ayham001", "123@4")
var user3 = createUser("rahma004", "246@8")
var user4 = createUser("yassin002", "20@3")
var user5 = createUser("gaith27", "199@")
var user6 = createUser("iheb456", "20@1")

var users = [user1, user2, user3, user4, user5, user6];


$(".btn").on('click', function () {
    var username = $("#Username").val() 
    var password = $("#Password").val()
    loggedIn(username, password)
})