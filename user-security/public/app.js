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

    // once ajax call is done, data is returned
    // check several cases and change page accordingly
    .done(function(data){
        // user was not found, show invalid user banner
        if (data['username'] == ""){
            $('#invalid-login').text("Invalid Username")
            $('#invalid-login').removeClass("d-none")
        }

        // user found, password was incorrect, show incorrect password banner
        else if(data['password'] == ""){
            $('#invalid-login').text("Invalid Password")
            $('#invalid-login').removeClass("d-none")
        }

        // successful login, show welcome dashboard
        else{
            console.log("successfull login!!")
            $("#main-page").attr("class", "d-none")
            $("user").text(data['username'])
            $("code").text(data['password'])
            $("#dashboard").removeClass("d-none")
            $('#invalid-login').attr("class", "d-none alert-danger p-2 mb-2")
            $("#username").val("")
            $("#password").val("")
        }

    })

// on logout click, restore page to original form
$("#logout").on('click', function(){

    $("#dashboard").attr("class", "d-none")
    $("#main-page").removeClass("d-none")
})

    e.preventDefault();
})

