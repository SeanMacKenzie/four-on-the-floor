function AuthController() {

    var authService = new AuthService()


    this.login = function login(event) {
        event.preventDefault()
        var loginData = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        authService.login(loginData, drawNav)
    }

    function drawNav(user) {
        if(user._id){
            document.getElementById('nav-bar').innerHTML = `
                                    <form class="navbar-form navbar-left" onsubmit="app.controllers.authController.login(event)">
                                    <button class="btn btn-default" type="button">Register</button>         
                                    </form>
                                    <ul class="nav navbar-nav navbar-right">
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" id="dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown
                                                <span class="caret"></span>
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a href="#">Home</a>
                                                </li>
                                                <li>
                                                    <a href="#">Profile Page</a>
                                                </li>
                                                <li>
                                                    <a href="#">Favorites</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
            
            `
        }else{
            document.getElementById('nav-bar').innerHTML =
            `
            <form class="navbar-form navbar-left" onsubmit="app.controllers.authController.login(event)">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <button type="submit" class="btn btn-default">Log In</button>
            <button onclick="app.controllers.authController.register()" class="btn btn-default" type="button">Register</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a id="dropdown" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Profile Page</a>
                    </li>
                    <li>
                        <a href="#">Favorites</a>
                    </li>
                </ul>
            </li>
        </ul>
        `

        }

    }


    this.register = function register() {
        document.getElementById('reg-form').classList.toggle('hidden')
    }


    this.registration = function registration(event) {
        if (event.target.password.value != event.target.reEnterPassword.value) {
            event.preventDefault()
            console.log('please re-enter password')
        } else {
            var registerData = {
                email: event.target.email.value,
                username: event.target.displayName.value,
                password: event.target.password.value

            }
            authService.registration(registerData, drawNav)
        }   

    }



    authService.authenticate()





}