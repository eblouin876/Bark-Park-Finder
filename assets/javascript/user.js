// //class for the cards from users
// class userCard {

//     //constructor takes in a username, email, picture, bio, dog, and location
//     constructor(username, contact, picture, bio, dog, uid) {
//         this.username = username;
//         this.contact = contact;
//         this.picture = picture;
//         this.bio = bio;
//         this.dog = dog;
//         this.uid = uid;
//     }

//     //buildTile takes in a parent ID that is a div where the cards are going to be placed
//     //it also takes in a div to place modals with the information of the user
//     buildTile(parentID, modalID) {
//         let button = $("<button>")
//             .attr("id", this.uid);
//         let image = $("<img>")
//             .addClass("user-image")
//             .attr("src", this.picture);
//         button.append(image);
//         $(parentID).append(button);

//         let modalContent = $("<div>")
//             .addClass("modal-content mod-content");

//         let modalHeader = $("<div>")
//             .addClass("modal-header mod-header");
//         let modalBody = $("<div>")
//             .addClass("modal-body mod-body");
//         let modalFooter = $("<div>")
//             .addClass("modal-footer mod-footer");
//         let span = $("<span>")
//             .addClass("close")
//             .html('&times;');

//         let displayUser = $("<h2>")
//             .text(this.username);
//         let paraContact = $("<p>")
//             .text("Email: " + this.contact);
//         let paraDog = $("<p>")
//             .text("Dog: " + this.dog);
//         let paraBio = $("<p>")
//             .text("My Bio: " + this.bio);
//         let br = $("<br>");
//         let profilePic = $("<img>")
//             .attr("src", this.picture);

//         modalHeader.append(span);
//         modalHeader.append(displayUser);
//         modalBody.append(paraContact);
//         modalBody.append(br)
//         modalBody.append(paraDog);
//         modalBody.append(br)
//         modalBody.append(paraBio);
//         modalBody.append(br)
//         modalBody.append(profilePic);
//         modalContent.append(modalHeader);
//         modalContent.append(modalBody);
//         modalContent.append(modalFooter);
//         $(modalID).append(modalContent);
//     }
// }

// //modalUserCard takes a user and adds info to their modal based on user information
// function modalUserCard(user) {
//     var modal = document.getElementById('myModal');
//     var btn = document.getElementById(user.uid);
//     var span = document.getElementsByClassName("close")[0];

//     btn.onclick = function () {
//         modal.style.display = "block";
//     }

//     span.onclick = function () {
//         modal.style.display = "none";
//     }

//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }

// function buildUser(username, contact, picture, bio, dog, uid) {
//     user = new userCard(username, contact, picture, bio, dog, uid);
//     user.buildTile("#buttonDiv", "#myModal");
//     modalUserCard(user);
//     console.log("working");
//     return user;
// }