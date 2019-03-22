var db = firebase.firestore();

db.collection('parkUsers').onSnapshot(function (querySnapshot) {
    // Clear the buttonDiv and myModal ids
    querySnapshot.forEach((doc) => {
        let val = doc.data()
        // returns val.bio, val.dog, val.email, val.location, val.checkInTime val.pic, val.uid, val.username
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let currentTime = hours + (minutes / 60)
        if (currentTime - val.checkInTime > .75 || currentTime - val.checkInTime < 0) {
            db.collection('parkUsers').doc(doc.id).update({
                location: "",
                checkInTime: ""
            })
            val.location = ""
        }
        if (val.location === $('#check-in').attr('data-location')) {
            // make new card and display it.
        }
    })

})

function updateCurrentPark() {
    // Clear the buttonDiv and myModal ids
    db.collection('parkUsers').get(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let val = doc.data()
            // returns val.bio, val.dog, val.email, val.location, val.pic, val.uid, val.username
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let currentTime = hours + (minutes / 60);
            if (currentTime - val.checkInTime > .75 || currentTime - val.checkInTime < 0) {
                db.collection('parkUsers').doc(doc.id).update({
                    location: "",
                    checkInTime: ""
                })
                val.location = ""
            }
            if (val.location === $('#check-in').attr('data-location')) {
                // make new card and display it.
            }
        })

    })
}