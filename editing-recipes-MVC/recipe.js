
$('recipe-name').on('click', function() {

	box = $('<input>').attr('type', 'textbox').val($(this).text())
	
	console.log("selected box")

	box.on('blur', function() {
		// make ajax call to save edit

		rnid = box.parent().attr("id")
		$.ajax({url : baseurl 
			+ "/handlers/edit_recipe_name/" 
			+ rnid + "/" 
			+ $(box).val(),
            dataType : "text"})
            
		.done(function() {
			// deal with error code in response
			// put back on page        
			$(box).parent().text($(box).val())    
			console.log("new name: " + $(box).val())
		})
	})

	$(this).text("")
	$(this).append(box)
	box.select()
})

// edit step description
$('step-description').on('click', function(){
	
	box = $('<input>').attr('type', 'textbox').val($(this).text())

	//console.log("desc selected")

	box.on('blur', function(){
		
		snid = box.parent().attr("id")
		$.ajax({url : baseurl
				+ "/handlers/edit_step_desc/"
				+ snid + "/"
				+ $(box).val(),
				dataType : "text"})

		.done(function() {
			// put back on page
			$(box).parent().text($(box).val())
			console.log("edit desc step: " + $(box).val())
		})

	})

	$(this).text("")
	$(this).append(box)
	box.select()
})

// Adding new step
$('#add-btn').on('click', function(){

	box = $('<input>').attr('type', 'textbox').attr('placeholder', 'Add step description').css('width', '100%')
	// keep track of number of steps with prev sibling
	prev_step_id =  $("#steps-list li:last-child").attr("id")
	new_step_id = (parseInt(prev_step_id) + 1)
	console.log("new step number: " + new_step_id)
	list = $("#steps-list").find("li")
		// store list lenght for later use
	count = list.length
	new_step_id = count + 1
	new_step = $('.clone-li').clone()
	new_step.removeAttr('style')
	new_step.removeClass('clone-li')
	new_step.attr('id', new_step_id)
	new_step.find('span').text(new_step_id)

	// recipe name id
	rid = parseInt($('recipe-name').attr("id"))
	console.log("recipe name id: " + rid)

	$('#steps-list').append(new_step)

	box.on('blur', function(){
		
		// step id
		sid = new_step_id

		// add new step to table
		$.ajax({url : baseurl
			+ "/handlers/add_new_step/"
			+ rid + "/"
			+ sid + "/"
			+ $(box).val(),
			dataType : "text"})


		.done(function() {
			new_step.find('step-description').text($(box).val())
			console.log("new step desc: " + $(box).val())
			box.remove()

		})
		
	})
	
	// clear text to display text box
	new_step.find('step-description').text("")
	new_step.find('step-description').append(box)
	box.select()
})






$('.sortable').sortable({
	stop: function( event, item ){
		// get list items
		list = $("#steps-list").find("li")
		// store list lenght for later use
		count = list.length

		// object to hold descriptions
		descriptions = {}
		// store descriptions in object
		for(i = 0; i < count; i++){
			descriptions[i] = list[i].children[1].textContent
		}
		console.log(descriptions)

		// convert object to string
		descriptionsJSON = JSON.stringify(descriptions)

		// recipe id number
		rid = parseInt($('recipe-name').attr("id"))
		
		$.ajax({
			method: "POST",
			url:  baseurl 
			+ "/handlers/reorder_steps/"
			+ rid,
			data : {steps : descriptionsJSON},
			dataType : "text",
		})
		.done(function(){

			// update step # on page
			for(j = 0; j < count; j++){
				list[j].children[0].textContent = j+1
			}	
			
		})
		
	}
});







