<?php
require "db.php";  
$data = $_POST;
//cheking post array
if( isset($data['user_Email'], $data['user_birthsday'], $data['user_pass'], $data['user_RePass']) ) {
    $errors = array();
    //checking for error
    if(R::count('users', "email = ?", array($data['user_Email'])) > 0) {
        $errors[] = 'already reg';
    }
    //registration
    if(empty ($errors)) {
        //add user in db
        $user = R::dispense('users');
        $user->email = $data['user_Email'];
        $user->birthsday = $data['user_birthsday'];
        $user->password = password_hash($data['user_pass'], PASSWORD_DEFAULT);
        R::store($user);
        //add user email in session
        $reg = R::findOne('users', 'email = ?', array($data['user_Email']));
        $_SESSION['reg_user'] = $reg; 
        header( 'Refresh: 2; url=/app/success.php' );//don't work(
    } else {
        return false;
    }

    
} else {
    $error[] = 'already reg';
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test work</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="js/jquery-3.1.1.min.js"></script>
    <script src="js/app.js"></script>
  </head>
  <body>
    <div class="logo">
      <h1>Registration Exercise</h1>
    </div>
    <form>
      <div class="input">
        <h3>Email</h3>
        <input id="email" class="empty" type="email" name="email" placeholder="example@example.com">
      </div>
      <div class="input">
        <h3>Birthsday</h3>
        <input id="birthsday" class="empty" type="text" name="birthsday" placeholder="dd/mm/yyyy">
      </div>
      <div class="input">
        <h3>Password</h3>
        <input id="password" class="empty" type="password" name="password">
      </div>
      <div class="input">
        <h3>Confirm Password</h3>
        <input id="re_password" class="empty" type="password" name="re_password">
      </div>
      <div class="button">
        <button class="submit" type="button">Register</button>
        <span class="spiner" style="display:none;"></span>
      </div>
    </form>
  </body>
</html>