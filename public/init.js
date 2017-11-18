var app ={
    controllers:{
        postingsController : new PostingsController(),
        commentsController: new CommentsController(),
        authController: new AuthController()
    }
}
if(!false){
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
}
function dropdown(){
    $('.dropdown').dropdown('toggle')
}