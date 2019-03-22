// //userdata.js is used for creating new users

// //initilize database
// var db = firebase.firestore();

// //get current user
// var user = firebase.auth().currentUser;

// //variables to get inputs from user in textboxes
// var username = document.getElementById("username");
// var dog = document.getElementById("dog");
// var picture = document.getElementById("profilepic");
// var bio = document.getElementById("bio");
// var submit = document.getElementById("submit");

// //use this to get the picture name later
// var profilePic

// //on changes to user state
// firebase.auth().onAuthStateChanged(function (user) {

//     //if user is logged in
//     if (user) {

//         //when user selects an image as a profile picture, add it to the firebase storage
//         picture.addEventListener("change", function (e) {
//             var file = e.target.files[0];
//             // if(firebase.storage().ref("userProfiles/" + user.uid)){
//             //     console.log("gje")
//             //     firebase.storage().ref("userProfiles/" + user.uid).delete();
//             // }

//             var storageRef = firebase.storage().ref("userProfiles/" + user.uid + "/" + file.name);
//             let storePicture = function () {
//                 return new Promise(function (resolve, reject) {
//                     resolve(storageRef.put(file));
//                 });
//             }
//             //storageRef.put(file);

//             storePicture().then(function () {
//                 profilePic = storageRef.getDownloadURL();
//             })
//         });

//         //when user hits submit, store all values into firestore
//         submit.addEventListener("click", e => {
//             var useremail = user.email;
//             console.log(useremail);
//             var uid = user.uid;
//             console.log(uid);
//             var userValue = username.value;
//             console.log(userValue);
//             var dogValue = dog.value;
//             console.log(dogValue);
//             var bioValue = bio.value;
//             console.log(bioValue);

//             console.log(profilePic.i);

//             let storeData = function () {
//                 return new Promise(function (resolve, reject) {
//                     resolve(
//                         //adding values to database
//                         db.collection("users").doc(uid).set({
//                             email: useremail,
//                             uid: uid,
//                             username: userValue,
//                             dog: dogValue,
//                             bio: bioValue,
//                             pic: profilePic.i
//                         })
//                     )
//                 })
//             }

//             storeData().then(function () {
//                 window.location = "index.html";
//             });
//         })
//     }
// })