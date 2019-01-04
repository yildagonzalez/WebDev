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
 });

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


$app->run();