function ProfileController() {
    var profileService = new ProfileService()

}

this.getProfiles = function getProfiles() {

    profilesService.getProfiles(drawProfiles)
}

var profilesElem = document.getElementById(profiles)


function drawProfiles(profiles) {


    var template = ''
    for (var i = 0; i < profiles.length; i++) {
        var profile = profiles[i];
        template += `
      <div id = "profile" class="profile">
      <div class="row">
          <h2>userName</h2>
      <button id="my-postings" >Show my Postings</button>
      </div>
  </div>
            `
    }
    profilesElem.innerHTML = template
}

this.addProfile = function addProfile(event) {
    event.preventDefault()
    var form = event.target
    profilesService.addProfile(form, getProfiles)
    profilesFormElem.classList.toggle('hidden', true)
}
var formstate = false

this.showAddProfileForm = function showAddProfileForm() {
    if (formstate) {
        showButton.innerText = 'Add Profile'
        showButton.className = 'btn btn-info'
        profilesFormElem.classList.add('hidden')
        formstate = false
    } else {
        showButton.innerText = 'Cancel'
        showButton.className = 'btn btn-danger'
        profilesFormElem.classList.remove('hidden')
        formstate = true
    }
}
this.removeProfile = function removeProfile(index) {
    profilesService.removeProfile(index, getProfiles)
}

getProfiles()
