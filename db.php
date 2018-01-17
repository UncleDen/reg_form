<?php

require "libs/rb.php";

R::setup( 'mysql:host=localhost;dbname=form',
        'root', '' );

session_start();
