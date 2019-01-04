-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2018 at 09:46 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_site`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `total_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `image_url`, `name`, `description`, `prep_time`, `total_time`) VALUES
(1, 'https://images.media-allrecipes.com/userphotos/560x315/4574914.jpg', 'Spinach Quiche', 'Delicious low carb Spinach Quiche', 10, 60),
(2, 'https://images.media-allrecipes.com/userphotos/560x315/1081167.jpg', 'Cranberry and Cilantro Quinoa Salad', 'light lunch for a nice day', 10, 120),
(3, 'https://images.media-allrecipes.com/userphotos/720x405/46458.jpg', 'Roast Sticky Chicken-Rotisserie Style', 'grilled juicy chicken, great for all occasions ', 15, 75),
(4, 'https://images.media-allrecipes.com/userphotos/300x300/525185.jpg', 'Angel Chicken Pasta', 'A delicious, easy company dish - the flavors are wonderful.', 30, 90),
(5, 'https://images.media-allrecipes.com/userphotos/300x300/1113400.jpg', 'Chicken Fettuccini Alfredo', 'Savory chicken is slow cooked and added with tomatoes on the side.', 20, 120);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `step_number`, `description`, `recipe_id`) VALUES
(1, 1, 'Preheat the oven to 375 degrees F.', 1),
(2, 2, 'Combine the eggs, cream, salt, and pepper in a food processor or blender. Layer the spinach, bacon, and cheese in the bottom of the pie crust, then pour the egg mixture on top. Bake for 35 to 45 minutes until the egg mixture is set. Cut into 8 wedges.', 1),
(3, 1, 'Pour the water into a saucepan, and cover with a lid. Bring to a boil over high heat, then pour in the quinoa, recover, and continue to simmer over low heat until the water has been absorbed, 15 to 20 minutes. ', 2),
(4, 2, 'Scrape into a mixing bowl, and chill in the refrigerator until cold.\r\n', 2),
(5, 3, 'Once cold, stir in the red bell pepper, yellow bell pepper, red onion, curry powder, cilantro, lime juice, sliced almonds, carrots, and cranberries. Season to taste with salt and pepper. Chill before serving.', 2),
(6, 1, 'In a small bowl, mix together salt, paprika, onion powder, thyme, white pepper, black pepper, cayenne pepper, and garlic powder. ', 3),
(7, 2, 'Remove and discard giblets from chicken. Rinse chicken cavity, and pat dry with paper towel. Rub each chicken inside and out with spice mixture. Place 1 onion into the cavity of each chicken. Place chickens in a resealable bag or double wrap with plastic ', 3),
(8, 3, 'Refrigerate overnight, or at least 4 to 6 hours.', 3),
(9, 4, 'Preheat oven to 250 degrees F (120 degrees C).', 3),
(10, 5, 'Place chickens in a roasting pan. Bake uncovered for 5 hours, to a minimum internal temperature of 180 degrees F (85 degrees C). Let the chickens stand for 10 minutes before carving.', 3),
(11, 1, 'Preheat oven to 325 degrees F (165 degrees C).', 4),
(12, 2, 'In a large saucepan, melt butter over low heat. Stir in the package of dressing mix. Blend in wine and golden mushroom soup. Mix in cream cheese, and stir until smooth. ', 4),
(13, 3, ' Heat through, but do not boil. Arrange chicken breasts in a single layer in a 9x13 inch baking dish. Pour sauce over.', 4),
(14, 4, 'Bake for 60 minutes in the preheated oven. Twenty minutes before the chicken is done, bring a large pot of lightly salted water to a rolling boil. Cook pasta until al dente, about 5 minutes. Drain. Serve chicken and sauce over pasta.', 4),
(15, 1, 'Bring a large pot of salted water to a boil. Add the pasta and cook according to the package instructions, about 8 minutes.', 5),
(16, 2, 'Season the chicken with 1 teaspoon salt and some pepper. Dredge in the flour and shake off the excess.', 5),
(17, 3, 'Pour the cream into the same pan and bring to a simmer. Stir in the Parmesan.', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
