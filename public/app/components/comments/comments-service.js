import { basename } from "path";

function CommentsService() {

    var baseUrl = 'http://localhost:3000/api/comments'

    var comments = [{
        comment: 'this is a pretty cool picture',
        upvotes: '13',
        userId: 12,
        _id: 3
    }, {
        comment: 'this is a pretty cool picture',
        upvotes: '13',
        userId: 13,
        _id: 4
    }, {
        comment: 'this is a pretty cool picture',
        upvotes: '13',
        userId: 14,
        _id: 5
    }, {
        comment: 'this is a pretty cool picture',
        upvotes: '13',
        userId: 15,
        _id: 6
    }]

    function Comment(config) {
        this.comment = config.comment.value
        //user id will be grabbed by server.
    }

    function logError(err) {
        console.log(err)
    }
    // PUBLIC?
    this.getComments = function getComments(cb) {
        if (!cb || typeof cb != 'function') { console.error('you need a callback') }
        $.get(baseUrl)
            .then(res => {
                comments = res
                console.log(comments)
                cb(comments)
            })
            .fail(logError)
        return comments
        cb(comments)
    }
    this.setVote = (data, getComments) => {
        var options = [-1,0,1]
        if(options.includes(data.value)){
            var obj = {
                commentId : data.commentId,
                vote: data.vote,
                userId : data.userId
            }
            $.put(baseUrl + `/${data.commentId}/votes`, obj)
            .then(getComments)
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

    this.addComment = function addComment(form, getComments) {

        //need to create html form for new comment


        var newComment = new Comment(form)
        $.post(baseUrl, newComment)
            .then(getComments)
            .fail(logError)
    }
    this.removeComment = function removeComment(id, getComments) {

        $.ajax({
            url: baseUrl + '/' + id,
            method: 'DELETE'
        })
        .then(getComments)
        .fail(logError)
    }


}