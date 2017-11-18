function AuthService(){

var baseUrl= 'http://localhost:3000/'
var register = 'register'
var login = 'login'
var user={}


function login(form, cb){
    $.post(baseUrl+login, form)
        .then()
        .fail()
}



}