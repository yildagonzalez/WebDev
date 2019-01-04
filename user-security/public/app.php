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
	$this->view->render($response, 'home.html');
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////
$app->get('/register', function ($request, $response, $args) {
	$user = new User();
	$user->setUsername('test');
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
		echo "Login successful";
	}
	else{
		echo "Wrong Password";
	}

	echo $user;
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
			// return username and password when ajax call done
				return $response->withJSON(array(
					'username' => $user->getUsername(),
					'password' => $user->getPasswordHash()
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


//////////////////////
// App run
//////////////////////

$app->run();
