/* GLOBAL VARIABLES */
last_elem_id = 0

/* LOGIN FORM */
$('#submit-btn').on('click', function(e){
    // get username and password from input textbox
    username = $('#username').val()
    password = $('#password').val()

    // send username and password data to route
    $.ajax({method : "POST",
            url : baseurl
            + "/handlers/login_verify",
            data: {username : username, 
                   password : password}
            })

    .done(function(data){
        // user not found
        if (data['username'] == ""){
            $('#invalid-login').text("Invalid Username")
            $('#invalid-login').removeClass("d-none")
        }

        // user found, password was incorrect
        else if(data['password'] == ""){
            $('#invalid-login').text("Invalid Password")
            $('#invalid-login').removeClass("d-none")
        }

        // successful login
        else{
            $('#invalid-login').attr("class", "d-none alert-danger p-2 mb-2")
            $("#username").val("")
            $("#password").val("")
            $("#login-form").attr("class", "d-none") 
            $("user").text(data['username'])
            $("#dashboard").removeClass("d-none")
            $("#comment-form").removeClass("d-none")
        }
        user_id = data['id']
    })

    e.preventDefault()
})

/* LOGOUT */
$("#logout").on('click', function(e){

    // send ajax request to logout route handler
    $.ajax({method : "POST",
            url: baseurl
            + "/handlers/logout"})
    
    // successfully logged out, return page to normal
    .done(function(data){
        if(data['success'] == "true"){
            $('#login-form').removeClass("d-none")
            $("#dashboard").attr("class", "d-none")
            $('#comment-form').attr("class", "d-none")
        }
    })
    e.preventDefault()
})


/* SUBMIT COMMENT */
$('#submit-comment').on('click', function(e){

    comment = $('#comment').val()
   
    // comment is not blank
    if($('#comment').val().length > 0){
        $('#comment-warning').attr("class", "d-none")
    }
    // comment is blank, show warning
    else{
        $('#comment-warning').removeClass("d-none")
    }
    // send ajax post to add comment to database
    $.ajax({method : "POST",
            url: baseurl
            + "/handlers/add_comment",
            data: {user_id : user_id, 
                comment : comment} 
            })

    .done(function(data){
        // blank comment
        if (data['success'] == false){
            $('#comment-warning').attr("class", "d-none");
        }
    })

    e.preventDefault()
})


/* RETRIEVE ALL COMMENTS */
$(document).ready(function(){
    $.ajax({method : "POST",
            url: baseurl
            + "/handlers/retrieve_comments"
            })

    .done(function(data){
        // iterate through returned array to display
        data['comment'].forEach(function(element){
            // clone hidden comment
            newComment = $('#comment-card').clone(true)
            // edit name + comment
            newComment.find('h4').text(element[3])
            newComment.find('p').text(element[1])
            newComment.find('#date').text(element[2])

            newComment.removeAttr('hidden')
            newComment.removeAttr('style')
            newComment.removeAttr("id", "comment-card")
            newComment.insertAfter($('#comment-card'))
            newComment.hide().fadeIn(300)
        })

    // if no comments yet, leave last_elem_id as zero, otw change to last id 
    if (data['comment'].length == 0){
        last_elem_id = 0            
   }
    else{
       // updating last element id
       last_elem = (data['comment'].length) - 1;
       last_elem_id = data['comment'][last_elem][4]
   }

    function repeat() {

        $.ajax({method : "POST",
                url: baseurl
                + "/handlers/update_comments",
                data: {last_elem_id : last_elem_id}
            })
            
        .done(function(data){

            last_elem = (data['comment'].length) - 1;
            last_elem_id = data['comment'][last_elem][4];
            
            // add new comment if there is something to add, otherwise don't
            if(data != null){
                // iterate through returned array to display
                data['comment'].forEach(function(element){
    
                // clone hidden comment
                newComment = $('#comment-card').clone(true)
    
                // edit name + comment
                newComment.find('h4').text(element[3])
                newComment.find('p').text(element[1])
                newComment.find('#date').text(element[2])
    
                newComment.removeAttr('hidden')
                newComment.removeAttr('style')
                newComment.removeAttr("id", "comment-card")
                newComment.insertAfter($('#comment-card'))
                newComment.hide().fadeIn(300)
    
                })
            } 
           
        }) // done ends
        
        // repeat ajax call every 3 seconds
        setTimeout(repeat,3000)
    }

    repeat()
})

})
        

        




