// Global Variables
let userProfilePic = "";
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

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

$(document).ready(() => {
    // Document Listeners
    $("#supprofilepic").on("change", changeProfilePic)

    $(document).on('click', '#btnlogout', logOut)

    $(document).on('click', '#btnsignup', signUp)

    $(document).on('click', '#btnlogin', logIn)

    $(document).on('keyup', '#LIpassword', (event) => {
        if (event.key === "Enter" && $("#LIpassword") && $("#LIemail")) {
            $("#btnlogin").click()
        }
    })

    if (auth.currentUser) {
        $("#btnlogout").addClass("d-none")
        $("#login-collapse").removeClass("d-none")
    } else {
        $("#btnlogout").removeClass("d-none")
        $("#login-collapse").addClass("d-none")
    }
})