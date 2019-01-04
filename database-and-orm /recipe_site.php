<?php

// invoke autoload to get access to the propel generated models
require_once 'vendor/autoload.php';

// require the config file that propel init created with your db connection information
require_once 'generated-conf/config.php';

// now this script can access the database through the propel models!

// retrieve a recipe by it's id and print it's name
// note that the getters were generated based on the db col names name and id

$r = RecipeQuery::create()->findPk(2);
echo "<p>".$r->getName().", ".$r->getDescription()."</p>";

$r = RecipeQuery::create()->findPk(1);
echo "<p>".$r->getName().", ".$r->getDescription()."</p>";


// add a new recipe to the database (every time you reload this page)
$r = new Recipe();
//$r->setImage_Url("https://images.media-allrecipes.com/userphotos/300x300/493502.jpg");
$r->setName("Chocolate Chip Cookies");
$r->setDescription("chocolaty cookies to be hyper all day");
$r->save();

echo "<p>Saved ".$r->getName().", ".$r->getDescription()." with ID ".$r->getId()."</p>";





















?>
