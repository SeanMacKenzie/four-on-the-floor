function AuthController(){

var authService = new AuthService()


this.login = function login(event){
    event.preventDefault()
    var loginData= {
        email: event.target.email.value,
        password: event.target.password.value
    }

    authService.login(loginData, drawNav)
}

function drawNav(){
var template = ""
    



}









}