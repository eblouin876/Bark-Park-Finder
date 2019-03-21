function checkIn() {
    var db = firebase.firestore();
    // let user = firebase.auth().currentUser;
    let user = {
        uid: "FX6FDxn0NcWZLLOS4un6IZh6X8t1"
    }
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

$(document).on('click', '#check-in', checkIn)