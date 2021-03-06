

function CommentsService() {

    var baseUrl = 'http://localhost:3000/api/comments'

    var comments = []
       

    function Comment(config, postingId) {
        this.postingId = postingId
        this.comment = config.songResponse.value
        //user id will be grabbed by server.
    }

    function logError(err) {
        console.log(err)
    }
    // PUBLIC?
    this.getComments = function getComments(id, cb) {
        if (!cb || typeof cb != 'function') { console.error('you need a callback') }
        $.get(`http://localhost:3000/api/postings/${id}/comments`)
            .then(res => {
                comments = res
                console.log(comments)
                cb(comments)
            })
            .fail(logError)
        return comments
        cb(comments)
    }
    this.setVote = (data) => {
        var options = {
            up : 1,
            down : -1
        }
        if(options[data.vote]){
            //$.post(`http://localhost:3000/api/votes/comments/${data.commentId}`, {data: options[data.vote]})
            $.ajax({
                url: `http://localhost:3000/api/votes/comments/${data.commentId}`,
                method: 'PUT',
                data: {data: options[data.vote]}
            })
            //.then(getComments)
            .fail(logError)
        }
    }
    this.getComment = function getComment(id, cb) {
        var comment = {}
        for (var i = 0; i < comments.length; i++) {
            var string = comments[i];
            if (id == string._id) {
                comment = string
            }
        }
        cb(comment)
    }

    this.addComment = function addComment(form, postingId, getComms) {

        //need to create html form for new comment


        var newComment = new Comment(form, postingId)
        $.post(baseUrl, newComment)
            .then(getComms(postingId))
            .fail(logError)
    }
    this.removeComment = function removeComment(id, getComms) {

        $.ajax({
            url: baseUrl + '/' + id,
            method: 'DELETE'
        })
        .then(getComments)
        .fail(logError)
    }


}