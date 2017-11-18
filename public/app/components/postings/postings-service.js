function PostingsService() {

    var baseUrl = 'http://localhost:3000/api/postings'

    var postings = []
    //     {
    //     title: "hey this is cool",
    //     img: 'http://placehold.it/200x200',
    //     _id: 1
    // }, {
    //     title: "hey this is cool",
    //     img: 'http://placehold.it/200x200',
    //     _id: 2
    // }, {
    //     title: "hey this is cool",
    //     img: 'http://placehold.it/200x200',
    //     _id: 3
    // }, {
    //     title: "hey this is cool",
    //     img: 'http://placehold.it/200x200',
    //     _id: 4
    // }


    function Posting(config) {
        this.img = config.image.value
        this.title = config.title.value
        //user id will be grabbed by server.
    }

    function logError(err) {
        console.log(err)
    }
    // PUBLIC?
    this.getPostings = function getPostings(cb) {
        if (!cb || typeof cb != 'function') { console.error('you need a callback') }
        $.get(baseUrl)
            .then(res => {
                postings = res
                console.log(postings)
                cb(postings)
            })
            .fail(logError)
        return postings
        cb(postings)
    }

    this.getPosting = function getPosting(id, cb) {
        var posting = {}
        for (var i = 0; i < postings.length; i++) {
            var post = postings[i];
            if (id == post._id) {
                posting = post
            }
        }
        cb(posting)
    }

    this.addPosting = function addPosting(form, getPostings) {
        debugger
        //need to create html form for new posting


        var newPosting = new Posting(form)
        $.post(baseUrl, newPosting)
            .then(getPostings)
            .fail(logError)
    }
    this.removePosting = function removePosting(id, getPostings) {

        $.ajax({
            url: baseUrl + '/' + id,
            method: 'DELETE'
        })
            .then(getPostings)
            .fail(logError)
    }


}