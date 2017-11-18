function ProfilesService(){

    var profileService = new ProfileService
}

var profiles = []


function Profile(config) {
    this.username= config.username.value
    this.email = config.email.value
    this.img = config.img.value
    this.favorites = config.favorites.value
    this.upvotes = config.upvotes.value
    this.created = config.created.value
}

this.getProfiles = function getProfiles(cb) {
    if (!cb || typeof cb != 'function') { return console.error('WOah I need a cb to run') }
    // first task is to request the data from the server ASYNC
    // the data from the server
    // give the controller what it wants
    $.get(baseUrl)
        .then(res => {
            // second task is to update the local profiles array with 
            profiles = res
            cb(profiles)
        })
        .fail(logError)
}

this.getProfile = function getProfile(id, cb) {
    for (var i = 0; i < profiles.length; i++) {
        var profile = profiles[i];
        if (id == profile.id) {
            return profile
        }
    }cb(profile)
}

this.addProfile = function addProfile(form, getProfiles) {
    if (!form || !getProfiles || typeof getProfiles != 'function') { return console.error('Unable to add Profile', 'bad parameters', form, getProfiles) }
    var newProfile = new Profile(form)
    $.post(baseUrl, newProfile)
        .then(getProfiles)
        .fail(logError)
}

this.removeProfile = function removeProfile(index, getProfiles) {
    $.ajax({
        url: baseUrl + '/' + index,
        method: 'DELETE'
    })
        .then(getProfiles)
        .fail(logError)
}

