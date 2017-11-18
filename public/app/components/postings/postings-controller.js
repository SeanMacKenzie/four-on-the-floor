function PostingsController() {
    var postingsService = new PostingsService()
  
    // Buttons
    // Add New Posting
    // Delete Posting
    // Report Flag
    // View More
    // Filter / Search
   
  
    function getPostings(){
    
      postingsService.getPostings(drawPostings)
    }

    var postingsElem = document.getElementById('postings')
    
    
    function drawPostings(postings) {
      
      var template = ''
      for (var i = 0; i < postings.length; i++) {
        var posting = postings[i];
        template += `
            <div class="row">
                <div class="col-xs-4">
                    <img class="postings-image" onclick="app.controllers.postingsController.getPosting('${posting._id}');app.controllers.commentsController.getComments('${posting._id}')" src="${posting.img}">
                </div>
                <div class="col-xs-8 text-center">
                    <h4>${posting.title}</h4>
                    <button onclick="app.controllers.postingsController.removePosting('${posting._id}')">delete</button>
                </div>
            </div>
              `
      }
      postingsElem.innerHTML = template
    }

    function drawPosting(posting){
        var template = ""
        template +=
        `
        <div class="row">
            <div class="col-xs-10 col-xs-offset-1 text-center">
                <h2>${posting.title}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-10 col-xs-offset-1 text-center">
                <img class="posting-image" src="${posting.img}">
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 text-center">
                <button class="btn btn-default">Add Comment</button>
            </div>
        </div>
            
        `

        document.getElementById('posting').innerHTML = template
    }


    this.getPosting = function getPosting(id){
        debugger
        postingsService.getPosting(id, drawPosting)
    }

    this.addPosting = function addPosting(event) {
        //build form for this
      event.preventDefault()
      var form = event.target
      postingsService.addPosting(form, getPostings)
    //   postingsFormElem.classList.toggle('hidden', true)
    //   document.getElementById('addPostingForm').reset()
    //   this.showAddPostingForm()
    }
  
    this.removePosting = function removePosting(id){
      postingsService.removePosting(id, getPostings)
    }
  
    
    var formstate = false
    this.showAddPostingForm = function showAddPostingForm() {
      if (formstate) {
        showButton.innerText = 'Add Listing'
        showButton.className = 'btn btn-info'
        postingsFormElem.classList.add('hidden')
        formstate = false
      } else {
        showButton.innerText = 'Cancel'
        showButton.className = 'btn btn-danger'
        postingsFormElem.classList.remove('hidden')
        formstate = true
      }
    }
  
    getPostings()
  }