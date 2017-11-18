var app ={
    controllers:{
        postingsController : new PostingsController(),
        commentsController: new CommentsController(),
        authController: new AuthController()
    }
}

function dropdown(){
    $('.dropdown').dropdown('toggle')
}