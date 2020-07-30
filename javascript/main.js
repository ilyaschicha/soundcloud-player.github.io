
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
    });
}
SoundCloudAPI.getTrack("ilyes chicha");

