<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../generated-conf/config.php';

// adding an external config file
$app = new \Slim\App(["settings" => ['displayErrorDetails' => true]]);

// calling twigview from controller
$container = $app->getContainer();

// note that this file lives in a subdirectory, so templates is up a level
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('../templates', [
        'cache' => false
    ]);

    // Instantiate and add Slim specific extension (from the docs)
    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new Slim\Views\TwigExtension($router, $uri));

    return $view;
};


# Route to view all recipes 
$app->get('/', function (Request $request, Response $response, array $args) {
    $recipes = RecipeQuery::create()->orderByname()->find();

    $response = $this->view->render($response, 'view-recipes.html', [
        'recipes' => $recipes
       ]);
   
    return $response;
});


$app->get('/recipes', function (Request $request, Response $response, array $args) {
     $recipes = RecipeQuery::create()->orderByname()->find();
    
     $response = $this->view->render($response, 'view-recipes.html', [
         'recipes' => $recipes
        ]);
    
     return $response;
 })->setName('recipes');

 $app->get('/recipes/{id}', function (Request $request, Response $response, array $args) {
    $id = (int)$args['id'];
    $recipe = RecipeQuery::create()->findPk($id);

    $steps = StepsQuery::create()->findByRecipeId($id);

    $response = $this->view->render($response, 'view-recipe.html', [
        'recipe' => $recipe,
        'steps' => $steps
       ]);
   
    return $response;
})->setName('view-recipe');

//////////////////////
// AJAX handlers
//////////////////////

// phone number editor - by personid+seq or by pnid
$app->get('/handlers/edit_recipe_name/{rnid}/{name}', 
	function($request, $response, $args) {
		// check that they are authorzied to edit

		$rn = RecipeQuery::create()->findPk($args['rnid']);
		$rn->setName($args['name']);
		$rn->save();

        $response->getBody()->write("OK");
});
    
// recipe description editor - stepid 
$app->get('/handlers/edit_step_desc/{snid}/{desc}',
    function($request, $response, $args) {

        $step = StepsQuery::create()->findPk($args['snid']);
        $step->setDescription($args['desc']);
        $step->save();

        $response->getBody()->write("OK");
    });

// Add a new step
$app->get('/handlers/add_new_step/{rid}/{sid}/{desc}',
function($request, $response, $args) {

    $step = new Steps();
    $step->setRecipeId($args['rid']);
    $step->setDescription($args['desc']);
    $step->setStepNumber($args['sid']);
    $step->save();

    $response->getBody()->write("OK");
});


// Reorder steps
$app->post('/handlers/reorder_steps/{rid}',
function($request, $response, $args) {

    // getting new order steps from json object
    $post = $request->getParsedBody();
    $json = $post['steps'];

    echo  $json;

    // decode json object
    $obj = json_decode($json);

    // Get steps with recipe id rid
    //$rid = $args['rid'];

    $desc = get_object_vars($obj);


    $steps = StepsQuery::create()
    ->filterByRecipeId($args['rid'])
    ->find();

    $i = 0;
    
    foreach($steps as $s){
        $s->setStepNumber($i + 1);
        $s->setDescription($desc[$i]);
        $s->save();
        $i = $i + 1;

    }






});
$app->run();