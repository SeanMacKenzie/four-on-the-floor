function CommentsController() {
    var commentsService = new CommentsService()
  
    // Buttons
    // Add New Comment
    // Delete Comment
    // Report Flag
    // View More
    // Filter / Search
   var postingId = ''
  
    function getComms(id){
    
      commentsService.getComments(id, drawComments)
    }
    this.getComments = getComms

    var commentsElem = document.getElementById('comments')
    
    
    function drawComments(comments) {
      
      var template = ''
      for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        template += `
            <div class="row">
                <div class="col-xs-8 col-xs-offset-2 text-center">
                    <blockquote>
                        <p>${comment.comment}</p>
                        <button onclick="app.controllers.commentsController.setVote('up', ${comment._id})">Vote UP</button>
                        <button onclick="app.controllers.commentsController.setVote('down', ${comment._id})">Vote DOWN</button>
                    </blockquote>
                    <caption>${comment.userId}</caption>
                </div>
            </div>
              `
      }
      commentsElem.innerHTML = template
    }

    this.addCommentForm = function addCommentForm(id){
      postingId = id

    }

    this.addComment = function addComment(event) {
      event.preventDefault()
      debugger
      var form = event.target
      commentsService.addComment(form, postingId, getComms)
    //   commentsFormElem.classList.toggle('hidden', true)
    //   document.getElementById('addCommentForm').reset()
    //   this.showAddCommentForm()
    }
  
    this.removeComment = function removeComment(id){
      commentsService.removeComment(id, getComments)
    }
    this.setVote = (vote, commentId) => {
      var data = {
        vote : vote,
        commentId : commentId
      }
      commentsService.setVote(data)
    }
    
    var formstate = false
    this.showAddCommentForm = function showAddCommentForm() {
      if (formstate) {
        showButton.innerText = 'Add Listing'
        showButton.className = 'btn btn-info'
        commentsFormElem.classList.add('hidden')
        formstate = false
      } else {
        showButton.innerText = 'Cancel'
        showButton.className = 'btn btn-danger'
        commentsFormElem.classList.remove('hidden')
        formstate = true
      }
    }
  
  }