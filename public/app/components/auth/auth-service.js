function AuthService() {

    var baseUrl = 'http://localhost:3000/'
    var register = 'register'
    var login = 'login'
    
    var logout = 'logout'

    var user = {}

    function logError() {
        console.log('your request failed')
    }

    this.login = function login(form, cb) {
        $.post(baseUrl + login, form)
            .then(res => {
                user = res.data
                cb(user)
            })
            .fail(logError)
    }

    this.registration = function registration(form, cb) {
        $.post(baseUrl + register, form)
            .then(res => {
                user = res.data
                cb(user)
            })
            .fail(logError)
    }

    this.authenticate = function authenticate(cb) {
        $.get(baseUrl + 'authenticate')
            .then(res => {
                user = res.data
                cb(user)
            })
            .fail(logError)
    }

    this.logout = function logout(cb) {
        $.ajax({
            url: baseUrl + logout,
            method: 'DELETE'
        })
            .then(res => {
                
                user = {}
                cb(user)
            })
            .fail(logError)
    }

}