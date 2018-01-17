<?php
require "db.php";
header('Refresh: 2; url=/app');
?>

<h1 style="color: green;">Welcome <?php echo $_SESSION['reg_user']->email; ?></h1>