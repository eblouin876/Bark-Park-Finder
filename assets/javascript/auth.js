const email = document.getElementById("email");
const password = document.getElementById("password");
const btnlogin = document.getElementById("btnlogin");
const btnsignup = document.getElementById("btnsignup");
const btnlogout = document.getElementById("btnlogout");

btnlogin.addEventListener("click", e =>{
    const userEmail = email.value;
    const userPass = password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(userEmail, userPass);
    promise.catch(e => console.log(e.message));
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            window.location = "index.html";
        }
    })
})

btnsignup.addEventListener("click", e =>{
    const userEmail = email.value;
    const userPass = password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(userEmail, userPass);
    promise.catch(e => console.log(e.message));
    window.location = "signup.html";
})

btnlogout.addEventListener("click", e =>{
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(user => {
        if(!user){
            window.location = "auth.html";
        }
    })
})



firebase.auth().onAuthStateChanged(user => {
    if(user){
        console.log(user);
    }
    else{
        console.log("not logged in");
    }
})