class userCard{
    constructor(username, contact, picture, bio, dog, location){
        this.username = username;
        this.contact = contact;
        this.picture = picture;
        this.bio = bio;
        this.dog = dog;
        this.location = location;
    }
    
    buildTile(parentID, modalID){
        let button = $("<button>")
        .attr("id", this.username);
        let image = $("<img>")
        .addClass("user-image")
        .attr("src", this.picture);
        button.append(image);
        $(parentID).append(button);

        let modalContent = $("<div>")
        .addClass("modal-content");

        let span = $("<span>")
        .addClass("close")
        .html('&times;');

        let para = $("<p>")
        .text(this.bio);

        modalContent.append(span)
        modalContent.append(para)
        $(modalID).append(modalContent);
    }
}