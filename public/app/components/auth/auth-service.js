function AuthService() {

    var baseUrl = 'http://localhost:3000/'
    
    var user = {}

    function logError() {
        console.log('your request failed')
    }

    this.login = function login(user, cb) {
        console.log(user)
        $.post(baseUrl + 'login', user)
            .then( res => {
                console.log(res)
                this.authenticate(cb)
            })
            .fail(logError)
    }

    this.registration = function registration(form, cb) {
        $.post(baseUrl + 'register', form)
         .then(this.authenticate(cb))
            .fail(logError)
    }

    this.authenticate = function authenticate(cb) {
        $.get(baseUrl + 'authenticate')
            .then(res => {
                cb(res)
                console.log(res)
            })
            .fail(logError)
    }

    this.logout = function logout(cb) {
        $.ajax({
            url: baseUrl + 'logout',
            method: 'DELETE'
        })
            .then(res => {

                user = {}
                cb(user)
            })
            .fail(logError)
    }
}