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
    let clear = document.querySelector('.js-clear');
    clear.addEventListener('click', () => {
        let sideBar = document.querySelector('.js-playlist');
        sideBar.innerHTML = "";
        localStorage.clear();
    });
}

UI.SubmitClick = () => {
    document.querySelector(".js-submit").addEventListener('click', () => {
        UI.LoadResulte();
    });
}
UI.deleteSong = (elem) => {
    let id = elem.parentNode.dataset.id;
    console.log("click");
    localStorage.removeItem(id.toString());
    elem.parentNode.remove();
}

let SoundCloudAPI = {};
SoundCloudAPI.init = () => {
    SC.initialize({ client_id: 'cd9be64eeb32d1741c17cb39e41d254d' });
};

SoundCloudAPI.getTrack = (inputVlue) => {
    SC.get('/tracks', {
        q: inputVlue
    }).then((tracks) => {
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
        button.addEventListener('click', () => {
            SoundCloudAPI.getEmbed(element.permalink_url, element.id);
        });



        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);


        let searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(card);


    });
}

SoundCloudAPI.getEmbed = (embadURL, id) => {
    SC.oEmbed(embadURL, {
        auto_play: true,
        buying: false,
        show_artwork: false,
        show_playcount: false,
        show_user: false

    }).then((embed) => {
        //play list container 
        let sideBar = document.querySelector('.js-playlist');

        //the delete song button 
        let closeBtn = `<button class="ui place google plus circular button icon js-deleteOne" onClick="UI.deleteSong(this);"><i class="close icon"></i></button>`;

        //song container
        let box = `<div class="re" data-id="${id}">
            ${embed.html}
            ${closeBtn}
        </div>`;
        // console.log(box);

        sideBar.innerHTML += box;
        id = `${id}`;  // id.toString()
        localStorage.setItem(id, box);
        // console.log(localStorage);
        // console.log(localStorage.getItem(id));
    });
}


function allStorage() {
    let sidebar = document.querySelector('.js-playlist');
    // sidebar.innerHTML = "";
    let keys = Object.keys(localStorage);
    console.log(keys);
    // console.log(localStorage.getItem(keys[0]));

    for (let i = 0; i < keys.length; i++) {
        console.log(localStorage.getItem(keys[i]));
        console.log(keys[i]);
        sidebar.innerHTML += localStorage.getItem(keys[i]);
    }
}

let main = () => {
    UI.enterPress();
    UI.ClearPL();
    UI.SubmitClick();
    SoundCloudAPI.init();
    allStorage();
}
main();