// //auth.js is the logic behind user authenication

// //get values from input boxes and put into variables
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const btnlogin = document.getElementById("btnlogin");
// const btnsignup = document.getElementById("btnsignup");
// const btnlogout = document.getElementById("btnlogout");

// // Hide the buttons don't empty the div

// //on clicking log in, take input values of email and password and check with server to log in. then go to main page
// btnlogin.addEventListener("click", e => {
//     const userEmail = email.value;
//     const userPass = password.value;
//     const auth = firebase.auth();
//     const promise = auth.signInWithEmailAndPassword(userEmail, userPass);
//     promise.catch(e => console.log(e.message));
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             window.location = "index.html";
//         }
//     })
// })

// //on click sign up, create a new user with said email and pass, and go to sign up page
// btnsignup.addEventListener("click", e => {
//     const userEmail = email.value;
//     const userPass = password.value;
//     const auth = firebase.auth();
//     const promise = auth.createUserWithEmailAndPassword(userEmail, userPass);
//     promise.catch(e => console.log(e.message));
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             window.location = "signup.html";
//         }
//     })
// })

// //on log out click, sign the user out, and go back to log in page
// btnlogout.addEventListener("click", e => {
//     firebase.auth().signOut();
//     firebase.auth().onAuthStateChanged(user => {
//         if (!user) {
//             window.location = "auth.html";
//         }
//     })
// })

// //console logging changes to state of user, delete later
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         console.log(user);
//     } else {
//         console.log("not logged in");
//     }
// })