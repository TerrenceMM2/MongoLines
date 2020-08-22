$(document).ready(function () {

    var images = $(".card-img-top");

    // If an incoming image's size is equal to 72, it will format the card image different from the other images.
    for (var i = 0; i < images.length; i++) {
        if (images[i].width === 72) {
            $(images[i]).addClass("card-img-top-mod");
        };
    };

    // Deletes an article and reloads the page.
    $("body").on("click", ".delete-article", function () {

        var id = $(this).attr("data-id");

        $.ajax({
            url: "/articles/delete",
            method: "DELETE",
            data: {
                data: id
            }
        }).then(function (response) {
            window.location.href = "/articles";
        })

    });

    // A modal will display in order view and add new comments.
    $("body").on("click", ".comment-article", function (event) {

        event.preventDefault();

        $(".comment-table").empty();

        var id = $(this).attr("data-id");
        var articleTitle = $(this).siblings(".card-title").text();
        $(".comment-modal-title").text(articleTitle);
        $("#submit-comment").attr("data-id", id)

        $.ajax({
            url: "/comment/" + id,
            method: 'GET'
        }).then(function (results) {
            results.forEach(function (comment) {
                var commentContainer = $("<div>").addClass("comment-container");
                var commentBody = $("<p>").text(comment.body);
                var commentAuthor = $("<small>").text("By: " + comment.createdBy);
                var commentDate = $("<small>").text(" on " + comment.createdAt);
                var commentDelete = $("<i>").addClass("fas fa-trash-alt float-right").attr({
                    "data-id": comment.id,
                    "parent-id": id
                });
                commentContainer.append(commentBody, commentAuthor, commentDate, commentDelete);
                $(".comment-table").append(commentContainer);
            })
            $("#article-comment-modal").modal("show");
        })


    });

    // Posts a new comment and resets the form.
    $("body").on("click", "#submit-comment", function (event) {

        event.preventDefault();

        var id = $(this).attr("data-id");
        var commentBody = $("#comment-body").val().trim();
        var commentAuthor = $("#comment-author").val().trim();

        $.ajax({
            url: "/comment/" + id,
            method: "POST",
            data: {
                commentBody,
                commentAuthor
            }
        }).then(function (results) {
            $(".comment-table").empty();
            $.ajax({
                url: "/comment/" + id,
                method: 'GET'
            }).then(function (results) {
                results.forEach(function (comment) {
                    var commentContainer = $("<div>").addClass("comment-container");
                    var commentBody = $("<p>").text(comment.body);
                    var commentAuthor = $("<small>").text("By: " + comment.createdBy);
                    var commentDate = $("<small>").text(" on " + comment.createdAt);
                    var commentDelete = $("<i>").addClass("fas fa-trash-alt float-right").attr({
                        "data-id": comment.id,
                        "parent-id": id
                    });
                    commentContainer.append(commentBody, commentAuthor, commentDate, commentDelete);
                    $(".comment-table").append(commentContainer);
                })
            })
            $("#comment-body").val("");
            $("#comment-author").val("");
        })

    });

    // Deletes a comment when the trashcan icon is clicked.
    $("body").on("click", "svg", function () {

        var id = $(this).attr("data-id");

        $.ajax({
            url: "/comment/" + id,
            method: "DELETE",
            data: {
                id
            },
        });

        $(this).parent(".comment-container").remove();

    });

});