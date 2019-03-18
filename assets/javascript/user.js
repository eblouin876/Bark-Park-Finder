class userCard{
    constructor(username, contact, picture, bio, dog, location){
        this.username = username;
        this.contact = contact;
        this.picture = picture;
        this.bio = bio;
        this.dog = dog;
        this.location = location;
    }

    buildTile(parentID){
        let anchor = $("<a>")
        .addClass("user-card")
        .attr("data-toggle", "modal")
        .attr("data-target", this.username);
        let image = $("<img>")
        .attr("src", this.picture)
        .attr("alt", this.username)
        .addClass("user-image");
        let userLocation = $("<p>")
        .addClass("user-location")
        .text(this.location);
        parentID.append(anchor);
        parentID.append(image);
        parentID.append(userLocation);
    }
}

{/* <a class="user-card" data-toggle="modal" data-target="#userCardModal">
    <img src="https://www.hsppr.org/sites/default/files/Donate-dog_0.jpg" alt="test dog" class="user-image">
    <p class="user-location">location</p>
    <!--Modal for user cards-->
    <div class="modal fade" id="userCardModal" tabindex="-1" role="dialog" aria-labelledby="userCardModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <!--Model Content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userCardModalLabel">Username goes here</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>user description</p>
                    <p>type dog?</p>
                    <img src="https://www.hsppr.org/sites/default/files/Donate-dog_0.jpg" alt="test dog"
                        style="height: 100px; width: 100px;">
                    <p>other</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo minima
                        quis
                        ipsam odio excepturi aliquid commodi quo. Dolore, ad corporis? Vitae sit adipisci
                        officia aperiam quis earum rerum saepe.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</a> */}