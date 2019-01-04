// javascript here
let f = $("<div>").attr( {"id" : "date", "class" : "card-footer text-muted"})
$("#comment-card").append(f)


  //delete button (global handler)
  $("#delete-btn").click(function(){
    $(this).closest("#comment-card").fadeOut(300, function(){
        $(this).remove()
    })
})
//when the user clicks the button
$("#submit").click(function(){
    //don't display warning multiple times!
    //checks if warning div exists, if so, remove
    if($("#warning").length){
        $("#warning").remove()
    }

    if($("#comment-warning").length)
    {
        $("#comment-warning").remove()
    }


    //get the name
    let name = $("#name").val()
    //get the comment
    let comment = $("#comment").val()

    //clone the comment card
   // let newComment = $("#comment-card").clone()
    
    let newComment = $("#comment-card").clone(true) //to use with global handler


    //edit name + comment attr
    newComment.find('h4').text(name)
    newComment.find('p').text(comment)

    //update date
    //dddd MMMM DD YYYY HH:mm:ss
     let d = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")
     newComment.find('#date').text(d)


    //alerts for invalid name/comment
     let nameAlert = $("<p>").attr("class", "text-danger").attr("id", "warning").text("The name cannot be blank, and must consist of all alphanumeric characters (0-9, a-z, A-Z, no spaces!)")
     let commentAlert = $("<p>").attr("class", "text-danger").attr("id", "comment-warning").text("The comment cannot be blank")

    /* CASES TO CHECK FOR VALIDATION */
    if(!name && !comment){ //both blank
        addCommentBorder()
        addNameBorder()
        nameAlert.insertBefore("#name")
        commentAlert.insertBefore("#comment")
    }

    else if(!comment && !alphanumeric(name)){ //comment blank, not alphanumeric name
            addNameBorder()
            addCommentBorder()
            commentAlert.insertBefore("#comment")
            nameAlert.insertBefore("#name")
            
        }

    else if(!alphanumeric(name)){ //not alphanumeric name
        removeCommentBorder()
        addNameBorder()
        nameAlert.insertBefore("#name")
    }
    
    else if(!comment && name){ //blank comment, and name is good
        removeNameBorder()
        addCommentBorder()
        commentAlert.insertBefore("#comment")
    }

    else{ //success
        removeNameBorder()
        removeCommentBorder()
        newComment.removeAttr('hidden')
        newComment.insertBefore($("#comment-card")) //insert updated card
        newComment.hide().fadeIn(300) //subtle effect when adding comment
    } 

    //delete button
  /*  $("#delete-btn").click(function(){
        $(this).closest("#comment-card").fadeOut(300, function(){
            $(this).remove()
        })
    })*/
    
    return false //prevents reloading of page

})

 


function alphanumeric (inputVal){
    var a = /^[0-9A-Za-z]+$/
    if(inputVal.match(a)){
       return true
    }
    else{
        return false
    }
}

function addCommentBorder(){
    $("#comment").css('border', '2px solid red')
}

function addNameBorder(){
    $("#name").css('border', ' 2px solid red')
}

function removeNameBorder(){
    $("#name").css('border-color', '')
}

function removeCommentBorder(){
    $("#comment").css('border-color', '')

}

  /*$("#delete-btn").click(function(){
        //$(this).parent().parent().parent().parent().fadeOut(300);
        $(this).closest("#comment-card").remove().fadeOut(300)

    })*/

    //regular expressions library
    //use trim to get rid of spaces
