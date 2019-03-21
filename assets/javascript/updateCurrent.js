var db = firebase.firestore();

db.collection('parkUsers').onSnapshot(function (querySnapshot) {
    // Clear the buttonDiv and myModal ids
    querySnapshot.forEach((doc) => {
        let val = doc.data()
        // returns val.bio, val.dog, val.email, val.location, val.pic, val.uid, val.username
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
            if (val.location === $('#check-in').attr('data-location')) {
                // make new card and display it.
            }
        })

    })
}



// Could pass in where("parkId", "===", "parkId") Later to get specific ones
//  admin.firestore().collection('parkUsers').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log("Document data:", doc.data())
//     })