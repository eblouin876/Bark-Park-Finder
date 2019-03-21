// This is an example on how to properly build a card

//initilize firestore
var db = firebase.firestore();

//variables to be used for the user card
var username;
var useremail;
var picture;
var bio;
var dog;
var uid;

//initilize firebase storage
var storage = firebase.storage();


//Check whether the user is signed in or not

firebase.auth().onAuthStateChanged(user => {

    //if the user is signed in 
    if (user) {
        var currentUser = firebase.auth().currentUser;

        //reference the path to the user in firestore using their uid
        var userRef = db.collection("users").doc(currentUser.uid);

        //get their information, save it in variables, and console log the data
        userRef.get().then(function(doc) {
            if (doc.exists) {

                console.log("Document data:", doc.data());
                username = doc.data().username;
                console.log(username);
                useremail = doc.data().email;
                console.log(useremail);
                bio = doc.data().bio;
                console.log(bio);
                dog = doc.data().dog;
                console.log(dog);
                uid = doc.data().uid;
                console.log(uid);
                picture = doc.data().pic;
                console.log(picture);

                //create the user using the buildUser function.
                //the buildUser function will build the user card and the modal and 
                //return a user class object
                var user = buildUser(username, useremail, picture, bio, dog, uid);

            //if there is nobody signed in
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
})