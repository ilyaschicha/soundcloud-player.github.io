
let SoundCloudAPI = {};
SoundCloudAPI.init = () => {
    SC.initialize({ client_id: 'cd9be64eeb32d1741c17cb39e41d254d' });
};
SoundCloudAPI.init();
SoundCloudAPI.getTrack = (inputVlue) => {
    SC.get('/tracks', {
        q: inputVlue
    }).then((tracks) => {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });
}
SoundCloudAPI.getTrack("alan walker");

SoundCloudAPI.renderTracks = (track) => {
    let addEvent = () => {
        let btn = document.querySelector(".js-button:last-child");
        console.log(btn);
        btn.addEventListener('click', () => {
            console.log("click");
        });
    }
    track.forEach(element => {
        let card = `<div class="card">
        <div class="image">
            <img class="image_img" src="${element.artwork_url || 'http://lorempixel.com/100/100/abstract/'}">
        </div >
            <div class="content">
                <div class="header">
                    <a href="${element.permalink_url}" target="_blank">${element.title}</a>
                </div>
            </div>
            <div class="ui bottom attached button js-button">
                <i class="add icon"></i>
                <span>Add to playlist</span>
            </div>
    </div >`;
        console.log("in");

        let searchResults = document.querySelector('.js-search-results');
        searchResults.innerHTML += card;
        // addEvent();
    });
}

SoundCloudAPI.getEmbed = () => {
    SC.oEmbed('https://soundcloud.com/forss/flickermood', {
        auto_play: true
    }).then(function (embed) {
        console.log('oEmbed response: ', embed);
        let sidebar = document.querySelector('.js-playlist');
        sidebar.innerHTML = embed.html;
    });
}
// SoundCloudAPI.getEmbeded();
