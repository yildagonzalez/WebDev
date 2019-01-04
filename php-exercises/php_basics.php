<html>

<head>
<title>PHP Basics</title>
</head>

<body>

<h1>PHP Exercises</h1>

<p>Edit this file and upload to the repo here:</p>

<pre>https://classroom.github.com/a/C30qbA_J</pre>

<h3>Question 1</h3>
<?php

	date_default_timezone_set('America/Chicago');
?>

<p>Put the current date and time right here: <?php echo date("D, M d, Y, h:i:sa "); ?>
</p>


<h3>Question 2</h3>

<p>Print the IP address of the client browser right here:<?php echo $_SERVER['REMOTE_ADDR']; ?></p>

<h4>Question 3</h4>

<p>Create an associative array of your favorite things and print them out like so:</p>


<?php 
$my_array = array(
	0 => array(
		'name' => 'dogs',
		'desc' => 'best friend of man',
		'reasons' => array(
			0 => "so cute and fluffy",
			1 => "puppy eyes!",
			2 => "real small and perfect"
		)
	),
	1 => array(
		'name' => 'music',
		'desc' => 'makes the world better',
		'reasons' => array(
			0 => "brings people together",
			1 => "is all around the world",
			2 => "concerts are fun!!"
		)
	)
	);

foreach($my_array as $k => $v){ ?>
	<div style="border:1px solid black; padding: 5px; width: 50%; margin: 5px">
		<h4><?php echo $my_array[$k]['name']; ?></h4>
		<p><em><?php echo $my_array[$k]['desc']; ?></em></p>
		<p>Because...</p>
		<ol>
			<?php for($i = 0; $i < 3; $i++){ ?>
			<li><?php echo $my_array[$k]['reasons'][$i] ?></li>

			<?php } ?>
		</ol>
	</div>

<?php }  ?>






<h3>Question 4</h3>

<p>The link below comes back to this same page, with a querystring added to the URL.</p>

<p>Finish the question (answer only appears when you click on the link):</p>

<p><a href="?n1=14&n2=16">14 + 16 = 
<?php 
	parse_str($_SERVER['QUERY_STRING'], $queries);
	if(!empty($queries)){
		echo array_sum($queries);
	}


?> </a></p>



<h3>Question 5</h3>

<p>The form below POSTs back to this page (empty action). When the POST comes
in, reverse whatever they typed in the box.</p>

<form action="" method="POST">

	<p>My nickname: <input type="textbox" name="nickname"/></p>
	<p><b>Reversed nickname:</b>

	
	 <?php 
	if(!empty($_POST['nickname'])){
		echo strrev($_POST['nickname']);
	 }
	 
	 ?>

	 </p>
	<button>Reverse it</button>
	 


</form>

</body>
</html>