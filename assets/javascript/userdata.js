var db = firebase.firestore();
var user = firebase.auth().currentUser;
var username = document.getElementById("username");
var dog = document.getElementById("dog");
var picture = document.getElementById("profilepic");
var bio = document.getElementById("bio");
var submit = document.getElementById("submit");
var profilePic

firebase.auth().onAuthStateChanged(function(user){

    if(user){

        picture.addEventListener("change", function(e) {
            var file = e.target.files[0];
            profilePic = file;
            // if(firebase.storage().ref("userProfiles/" + user.uid)){
            //     console.log("gje")
            //     firebase.storage().ref("userProfiles/" + user.uid).delete();
            // }

            var storageRef = firebase.storage().ref("userProfiles/" + user.uid +"/" + file.name);

            storageRef.put(file);
        });

        submit.addEventListener("click", e =>{
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

            console.log(profilePic)
            var storage = firebase.storage();
            var pathReference = storage.ref("userProfiles/" + uid +"/" + profilePic.name);

            console.log(pathReference);

            var newUser = new userCard(userValue, useremail, pathReference, bioValue, dogValue, "here");

            db.collection("users").add({
                email: useremail,
                uid: uid,
                username: userValue,
                dog: dogValue,
                bio: bioValue,
            })



        })
    }
})

