var user = new userCard("sam", "sam", "https://www.aspcapetinsurance.com/media/1064/mountain-dog.jpg", "bio", "dog", "here");
user.buildTile("#buttonDiv", "#myModal")
modalUserCard(user);

function modalUserCard(user){
    var modal = document.getElementById('myModal');
    var btn = document.getElementById(user.username);
    var span = document.getElementsByClassName("close")[0];
    
    btn.onclick = function() {
        modal.style.display = "block";
        console.log("work")
    }
    
    span.onclick = function() {
        modal.style.display = "none";
        console.log("work")
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          console.log("work")
        }
    }   
}
