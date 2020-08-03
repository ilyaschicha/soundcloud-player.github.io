let UI = {};

UI.LoadResulte = () => {
    let searchResults = document.querySelector('.js-search-results');
    searchResults.innerHTML = "";
    let input = document.querySelector(".js-search").value;
    SoundCloudAPI.getTrack(input);
}

UI.enterPress = () => {
    document.querySelector(".js-search").addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            UI.LoadResulte();
        }
    });
}

UI.ClearPL = () => {
    let sideBar = document.querySelector('.js-playlist');
    let clear = document.querySelector('.js-clear');
    clear.addEventListener('click', () => {
        sidebar.innerHTML = "";
        localStorage.clear();
    });
}
UI.ClearPL();
UI.enterPress();
UI.SubmitClick = () => {
    document.querySelector(".js-submit").addEventListener('click', () => {
        UI.LoadResulte();
    });
}
UI.SubmitClick();
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


SoundCloudAPI.renderTracks = (track) => {
    track.forEach(element => {

        //card
        let card = document.createElement('div');
        card.classList.add("card");

        // image
        let imageDiv = document.createElement('div');
        imageDiv.classList.add("image");
        let image_img = document.createElement('img');
        image_img.classList.add("image_img");
        image_img.src = element.artwork_url || 'http://lorempixel.com/100/100/abstract/';
        imageDiv.appendChild(image_img);

        //content
        let content = document.createElement('div');
        content.classList.add("content");
        let header = document.createElement('header');
        header.classList.add("header");
        header.innerHTML = `<a href="${element.permalink_url}" target="_blank">${element.title}</a>`;
        content.appendChild(header);
        //button
        let button = document.createElement("div");
        button.classList.add("ui", "bottom", "attached", "button", "js-button");

        let icon = document.createElement('i');
        icon.classList.add("add", "icon");

        let buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        button.appendChild(icon);
        button.appendChild(buttonText);
        button.addEventListener('click', function () {
            console.log(element.permalink_url);
            SoundCloudAPI.getEmbed(element.permalink_url);
        });



        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);


        let searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(card);


    });
}

SoundCloudAPI.getEmbed = (embadURL) => {
    console.log("click");
    SC.oEmbed(embadURL, {
        auto_play: true
    }).then(function (embed) {
        console.log('oEmbed response: ', embed);
        let sideBar = document.querySelector('.js-playlist');
        let box = document.createElement('div');
        box.innerHTML = embed.html;
        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("key", sideBar.innerHTML);
    });
}

let sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem("key");
localStorage.clear();
