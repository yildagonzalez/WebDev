<?php
require '../vendor/autoload.php';
require '../generated-conf/config.php';

//////////////////////
// Slim Setup
//////////////////////

$settings = ['displayErrorDetails' => true];

$app = new \Slim\App(['settings' => $settings]);

$container = $app->getContainer();
$container['view'] = function($container) {
	$view = new \Slim\Views\Twig('../templates');
	
	$basePath = rtrim(str_ireplace('index.php', '', 
	$container->get('request')->getUri()->getBasePath()), '/');

	$view->addExtension(
	new Slim\Views\TwigExtension($container->get('router'), $basePath));
	
	return $view;
};

//////////////////////
// Routes
//////////////////////

// home page route
$app->get('/', function ($request, $response, $args) {
	//$this->view->render($response, 'home.html');
	$this->view->render($response, 'post.html');
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////
$app->get('/register', function ($request, $response, $args) {
	$user = new User();
	$user->setUsername('john');
	$password = 'hello';
	$hash = password_hash($password, PASSWORD_DEFAULT);
	$user->setPasswordHash($hash);
	$user->save();
});

$app->get('/register/{username}/{password}', function ($request, $response, $args) {
	$user = new User();
	$user->setUsername($args['username']);
	$password = $args['password'];
	$user->setPasswordHash($user->setPassword($password));
	$user->save();

	if($user->login("hello") == true){
		//echo "Login successful";
	}
	else{
		//echo "Wrong Password";
	}

	//echo $user;
});

// Get user by username
$app->post('/handlers/login_verify', function ($request, $response, $args) {

	// get params passed in data object
	$data = $request->getParams();
	$username = $request->getParam('username');

	$obj = new User();
	
	// check if user exists on database
	// returns false if user does not exist, true o.t.w
	$user = $obj->userExists($username);

	// username not found, return user as empty string
	if(empty($user)){
		return $response->withJSON(array(
			'username' => ""
		));
	}
	
	// user exists
	else{
			
		// password is correct
		if ($user->login($data['password'])){
			// return username and id when ajax call done
				return $response->withJSON(array(
					'username' => $user->getUsername(),
					'id' => $user->getId()
				));
			}

		// wrong password 
		else{
			return $response->withJSON(array(
				'password' => ""
			));
		}
	}


});

$app->post('/handlers/logout', function ($request, $response, $args) {

	//return success response to ajax logout call to succesfully logout
	// and in turn, alter the page accordingly
	return $response->withJSON(array(
		 'success' => "true"
	));

});


// add comment to database
$app->post('/handlers/add_comment', function ($request, $response, $args) {

	// get params passed in data object
	$data = $request->getParams();
	$id = $request->getParam('user_id');
	$user_comment = $request->getParam('comment');

	date_default_timezone_set('America/Chicago');
	$date = date("D, M d, Y, h:i:sa");

	$comment = new Comment();
	$comment->setAuthorId($id);
	$comment->setCreateTime($date);
	$comment->setBody($user_comment);

	if ($user_comment != ""){
		$comment->save();
	}
	

	// comment is empty
	if(empty($user_comment)){
		return $response->withJSON(array(
			'success' => "false"
	   ));
	}
	// comment is not empty
	else{
		return $response->withJSON(array(
			'success' => "true"
	   ));
	}

	//echo $id;
	//echo $comment;
	
});


$app->post('/handlers/retrieve_comments', function ($request, $response, $args) {

	// find all comments in comment table
	$comments = CommentQuery::create()->find();
	

	$c = array();
	$i = 0;

	// assign objects to array, for easier access in js file
	foreach($comments as $comment){
		$id = $comment->getAuthorId();
		$c[$i][] = $comment->getAuthorId();
		$c[$i][] = $comment->getBody();
		$c[$i][] = $comment->getCreateTime()->format('D, M d, Y, h:i:sa');
		// find username by using foreign key
		$users = UserQuery::create()->findPK($id)
		->getUsername();

		// set username in array object
		$c[$i][] = $users;
		// send id to check which is last id when adding more comments
		$c[$i][] = $comment->getId();

		$i = $i + 1;
	}

	// return array to .done ajax
	return $response->withJSON(array(
		'comment' => $c
   ));


	//print_r($arr);
	

});




$app->post('/handlers/update_comments', function ($request, $response, $args) {

	$data = $request->getParams();
	$last_id = $request->getParam('last_elem_id');
	$last_id = $last_id + 1;

	

	$comments = CommentQuery::create()
					->filterById(array('min' => $last_id))
					->find();


	$c = array();
	$i = 0;
	foreach($comments as $comment){
		$id = $comment->getAuthorId();
		$c[$i][] = $comment->getAuthorId();
		$c[$i][] = $comment->getBody();
		$c[$i][] = $comment->getCreateTime()->format('D, M d, Y, h:i:sa');
		$users = UserQuery::create()->findPK($id)
		->getUsername();

		$c[$i][] = $users;
		$c[$i][] = $comment->getId();

		$i = $i + 1;
	}


	return $response->withJSON(array(
		'comment' => $c
	));


	print_r($arr);

});


//////////////////////
// App run
//////////////////////

$app->run();
