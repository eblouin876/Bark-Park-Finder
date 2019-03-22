// Global Variables
let userProfilePic = "";
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();


// Class declarations
class ParkCard {
    constructor(image, name, description, location, rating, reviews = []) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.location = location;
        this.rating = rating;
        this.reviews = reviews;
        if (this.rating > 4.7) {
            this.rating = "assets/images/paws5.png"
        } else if (this.rating <= 4.7 && this.rating > 4.2) {
            this.rating = "assets/images/paws4-5.png"
        } else if (this.rating <= 4.2 && this.rating > 3.7) {
            this.rating = "assets/images/paws4.png"

        } else if (this.rating <= 3.7 && this.rating > 3.2) {
            this.rating = "assets/images/paws3-5.png"

        } else if (this.rating <= 3.2 && this.rating > 2.7) {
            this.rating = "assets/images/paws3.png"

        } else if (this.rating <= 2.7 && this.rating > 2.2) {
            this.rating = "assets/images/paws2-5.png"

        } else if (this.rating <= 2.2 && this.rating > 1.7) {
            this.rating = "assets/images/paws2.png"

        } else {
            this.rating = "assets/images/paws1.png"

        }
    }

    buildCard() {
        // Build Card
        let img = $('<img>').attr('src', this.image).addClass('card-image').attr('alt', this.name);
        let title = $('<h2>').addClass('card-title').text(this.name);
        let description = $('<p>').addClass('card-text').text(this.description)
        let reviews = $('<button>').addClass('card-reviews').attr('data-toggle', 'modal').attr('data-target', '#parkModal').text("Reviews")
        let rating = $('<img>').addClass('card-rating center').attr('src', this.rating)
        let check = $('<button>').addClass('card-checkin').text('Check In').attr('data-location', this.location).attr('id', 'check-in')
        $(`#park-card`).empty()
        $(`#park-card`).append(img, title, description, reviews, rating, check)

        // Update modal
        $('#parkModalLabel').text(this.name)
        $('#modal-comments').empty()
        this.reviews.forEach(review => {
            review.buildReview()
        });
    }

    checkIn() {

    }
}

class Review {
    constructor(image, name, rating, review) {
        this.review = review;
        this.image = image;
        this.rating = rating;
        this.name = name;
        if (this.rating > 4.7) {
            this.rating = "assets/images/paws5.png"
        } else if (this.rating <= 4.7 && this.rating > 4.2) {
            this.rating = "assets/images/paws4-5.png"
        } else if (this.rating <= 4.2 && this.rating > 3.7) {
            this.rating = "assets/images/paws4.png"

        } else if (this.rating <= 3.7 && this.rating > 3.2) {
            this.rating = "assets/images/paws3-5.png"

        } else if (this.rating <= 3.2 && this.rating > 2.7) {
            this.rating = "assets/images/paws3.png"

        } else if (this.rating <= 2.7 && this.rating > 2.2) {
            this.rating = "assets/images/paws2-5.png"

        } else if (this.rating <= 2.2 && this.rating > 1.7) {
            this.rating = "assets/images/paws2.png"

        } else {
            this.rating = "assets/images/paws1.png"
        }
    }

    buildReview() {
        let review = $('<li>').addClass('media m-1')
        let image = $('<img>').attr('src', this.image).addClass('mr-3 review-image').attr('alt', this.name)
        let body = $('<div>').addClass('media-body')
        let text = $('<h5>').addClass('mt-0 mb-1').text(`${this.name}: `)
        text.append($('<img>').attr('src', this.rating).addClass('paw-rating'))
        let description = $('<p>').text(this.review)
        body.append(text, description)
        $('#modal-comments').append(review.append(image, body))
    }
}

class userCard {

    //constructor takes in a username, email, picture, bio, dog, and location
    constructor(username, contact, picture, bio, dog, uid) {
        this.username = username;
        this.contact = contact;
        this.picture = picture;
        this.bio = bio;
        this.dog = dog;
        this.uid = uid;
        this.buildUser();
    }

    buildUser() {
        // Build button img
        let image = $("<img>")
            .addClass("modal-toggle-img")
            .attr('data-toggle', 'modal')
            .attr('data-target', `#${this.uid}Modal`)
            .attr("src", this.picture)
            .attr('alt', this.username);
        $("#user-buttons").append(image);


        // Build modal
        let modal = $("<div>")
            .addClass('modal fade')
            .attr('id', `${this.uid}Modal`)
            .attr('tabindex', '-1')
            .attr('role', 'dialog');
        let modalDialog = $('<div>')
            .addClass('modal-dialog')
            .attr('role', 'document');
        let modalContent = $("<div>")
            .addClass('modal-content');
        let modalHeader = $("<div>")
            .addClass('modal-header')
            .attr('style', 'justify-content:center');
        let modalTitle = $('<h2>').text(this.username).addClass('modal-contents');
        let modalBody = $("<div>");
        let modalPic = $('<img>')
            .attr('src', this.picture)
            .attr('alt', this.username)
            .addClass('modal-img modal-contents');
        let modalDog = $('<h3>').text(this.dog).addClass('modal-contents');
        let modalBio = $('<p>').text(this.bio).addClass('modal-contents');
        let modalFooter = $('<div>')
            .addClass('modal-footer');
        let modalDismiss = $('<button>')
            .attr('type', 'button')
            .addClass('btn')
            .attr('data-dismiss', 'modal')
            .text('Close');

        $('#user-modals').append(modal.append(modalDialog.append(modalContent.append(modalHeader.append(modalTitle), modalBody.append(modalPic, modalDog, modalBio), modalFooter.append(modalDismiss)))))
    }

}


// Functions
function signUp() {
    let email = $("#supemail")
    let username = $("#supusername")
    let password = $("#suppassword")
    let breed = $("#supdog")
    let bio = $("#supbio")

    let userEmail = email.val();
    let userPass = password.val();

    auth.createUserWithEmailAndPassword(userEmail, userPass)
        .catch(e => console.log(e.message));

    auth.onAuthStateChanged(user => {
        if (user) {
            let file = userProfilePic
            var storageRef = storage.ref("userProfiles/" + user.uid + "/" + file.name);

            storageRef.put(file).then(function () {
                storageRef.getDownloadURL().then((img) => {
                    let userEmail = user.email;
                    let uid = user.uid;
                    let userName = username.val();
                    let dogBreed = breed.val();
                    let userBio = bio.val();

                    db.collection("users").doc(uid).set({
                        email: userEmail,
                        uid: uid,
                        username: userName,
                        dog: dogBreed,
                        bio: userBio,
                        pic: img
                    })

                    $(".sign-modal-body")
                        .empty()
                        .append("<h1>Thank you for signing up!");
                    $("#btnsignup").attr('id', 'return').text("Return").attr("data-dismiss", "modal")
                    $("#btnlogout").removeClass("d-none")
                    $("#login-collapse").addClass("d-none")
                })
            })
        }
    })
}

function changeProfilePic(e) {
    userProfilePic = e.target.files[0];
}

function logOut() {
    auth.signOut()
    $("#btnlogout").addClass("d-none")
    $("#login-collapse").removeClass("d-none")
}

function logIn() {
    let userEmail = $("#LIemail").val();
    let userPass = $("#LIpassword").val();
    let promise = auth.signInWithEmailAndPassword(userEmail, userPass);
    promise.catch(e => console.log(e.message));
    auth.onAuthStateChanged(user => {
        if (user) {
            $("#btnlogout").removeClass("d-none")
            $("#login-collapse").addClass("d-none")
        }
    })
}

let collapseNav = () => {
    if ($(".nav-expand").attr("state") === "collapsed") {
        $(".nav-expand").animate({
            height: "100%"
        })
        $(".nav-expand").attr("state", "open")
        $(".nav-button").addClass("d-none")
    } else {
        $(".nav-expand").animate({
            height: "0"
        })
        $(".nav-expand").attr("state", "collapsed")
    }
}

function checkIn() {
    let user = auth.currentUser;

    if (user) {
        let userId = user.uid;
        let park = $(this).attr('data-location');
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let checkInTime = hours + (minutes / 60)

        db.collection('checkIn').doc(userId).set({
            uid: userId,
            location: park,
            checkInTime: checkInTime,
        })

    } else {
        console.log("no user signed in")
    }
}

function updateCurrentPark() {
    // Clear the user-buttons and myModal ids
    $('#user-modals').empty()
    $('#user-buttons').empty()
    db.collection('parkUsers').get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let val = doc.data()
            if (!val.Init) {
                let date = new Date();
                // returns: .time, .location, .uid
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let currentTime = hours + (minutes / 60);

                if (currentTime - val.time > .75 || currentTime - val.time < 0) {
                    db.collection('parkUsers').doc(doc.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                    db.collection('checkIn').doc(doc.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                    val.location = ""
                }
                if (val.location === $('#check-in').attr('data-location')) {
                    db.collection("users").doc(val.uid).get().then(user => {
                        user = user.data()
                        // returns user.bio, user.dog, user.email, user.location, user.pic, user.uid, user.username
                        let usr = new userCard(user.username, user.email, user.pic, user.bio, user.dog, user.uid)
                    })
                }
            }
        })

    })
}


// Document Listeners
$(document).ready(() => {
    $("#supprofilepic").on("change", changeProfilePic)

    $(document).on('click', '#btnlogout', logOut)

    $(document).on('click', '#btnsignup', signUp)

    $(document).on('click', '#btnlogin', logIn)

    $(document).on('click', '#login-collapse', collapseNav)

    $(document).on('click', '#check-in', checkIn)

    $(document).on('keyup', '#LIpassword', (event) => {
        if (event.key === "Enter" && $("#LIpassword") && $("#LIemail")) {
            $("#btnlogin").click()
        }
    })

    db.collection('parkUsers').onSnapshot(function (querySnapshot) {
        // Clear the user-buttons and myModal ids
        $('#user-modals').empty()
        $('#user-buttons').empty()
        querySnapshot.forEach((doc) => {
            let val = doc.data()
            if (!val.Init) {
                let date = new Date();
                // returns val.bio, val.dog, val.email, val.location, val.checkInTime val.pic, val.uid, val.username
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let currentTime = hours + (minutes / 60)
                if (currentTime - val.checkInTime > .75 || currentTime - val.checkInTime < 0) {
                    db.collection('parkUsers').doc(doc.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                    db.collection('checkIn').doc(doc.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                    val.location = ""
                }
                if (val.location === $('#check-in').attr('data-location')) {
                    db.collection("users").doc(val.uid).get().then(user => {
                        user = user.data()
                        // returns user.bio, user.dog, user.email, user.location, user.pic, user.uid, user.username
                        let usr = new userCard(user.username, user.email, user.pic, user.bio, user.dog, user.uid)
                    })
                }
            }
        })

    })

    if (auth.currentUser) {
        $("#btnlogout").removeClass("d-none")
        $("#login-collapse").addClass("d-none")
    } else {
        $("#btnlogout").addClass("d-none")
        $("#login-collapse").removeClass("d-none")
    }
})