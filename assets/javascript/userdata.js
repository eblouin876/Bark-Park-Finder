//userdata.js is used for creating new users

//initilize database
var db = firebase.firestore();

//get current user
var user = firebase.auth().currentUser;

//variables to get inputs from user in textboxes
var username = document.getElementById("username");
var dog = document.getElementById("dog");
var picture = document.getElementById("profilepic");
var bio = document.getElementById("bio");
var submit = document.getElementById("submit");

//use this to get the picture name later
var profilePic

//on changes to user state
firebase.auth().onAuthStateChanged(function (user) {

    //if user is logged in
    if (user) {

        //when user selects an image as a profile picture, add it to the firebase storage
        picture.addEventListener("change", function (e) {
            var file = e.target.files[0];
            profilePic = file;
            // if(firebase.storage().ref("userProfiles/" + user.uid)){
            //     console.log("gje")
            //     firebase.storage().ref("userProfiles/" + user.uid).delete();
            // }

            var storageRef = firebase.storage().ref("userProfiles/" + user.uid + "/" + file.name);

            storageRef.put(file);
        });

        //when user hits submit, store all values into firestore
        submit.addEventListener("click", e => {
            var useremail = user.email;
            console.log(useremail);
            var uid = user.uid;
            console.log(uid);
            var userValue = username.value;
            console.log(userValue);
            var dogValue = dog.value;
            console.log(dogValue);
            var bioValue = bio.value;
            console.log(bioValue);

            //this is to get the reference of the picture insde of firebase storage
            var storage = firebase.storage();
            var pathReference = storage.ref("userProfiles/" + uid + "/" + profilePic.name);

            //adding values to database
            db.collection("users").add({
                email: useremail,
                uid: uid,
                username: userValue,
                dog: dogValue,
                bio: bioValue,
                pic: pathReference
            })



        })
    }
})

