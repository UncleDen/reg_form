$(document).ready(function () {
    $('input').unbind().blur(function () {
        
        var val = $(this).val();
        var id = $(this).attr('id');
        //Validation inputs
        switch(id) {
            case 'email':
                
                var test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                //checking for error
                if(val != '' && test_email.test(val)) {
                    //add class in inputs 
                    $(this).addClass('not_error');
                    $(this).removeClass('error');
                    $(this).removeClass('empty');
                } else {
                    $(this).addClass('error');
                    $(this).removeClass('not_error');
                    $(this).addClass('empty')
                }
            break;
                
            case 'birthsday':
                
                var userDate, now = new Date();
                var input = val.split('/'),
                    userDate = new Date(input[2], input[1] - 1, input[0]);
                //checking for error
                if(val != '' && now > userDate) { 
                    //add class in inputs
                    $(this).addClass('not_error');
                    $(this).removeClass('error');
                    $(this).removeClass('empty');
                } else {
                    $(this).addClass('error');
                    $(this).removeClass('not_error');
                    $(this).addClass('empty')
                }
            break;
                
            case 'password':
                //checking for error
                if(val >= 5) {            
                    //add class in inputs
                    $(this).addClass('not_error');
                    $(this).removeClass('error');
                    $(this).removeClass('empty');
                } else {
                    $(this).addClass('error');
                    $(this).removeClass('not_error');
                    $(this).addClass('empty')
                }
            break;
                
            case 're_password':
                
                var rePass = val;
                var Pass = $('#password').val();
                //checking for error
                if(val >= 5 && rePass == Pass) {    
                    //add class in inputs
                    $(this).addClass('not_error');
                    $(this).removeClass('error');
                    $(this).removeClass('empty');
                } else {
                    $(this).addClass('error');
                    $(this).removeClass('not_error');
                    $(this).addClass('empty')
                }
            break;                
        }       
    });
    
    //send form 
    $('.submit').click(function () {
        var noError = $('form').find('.not_error');
        //checking for error form
        if(noError.length == 4) {
            //taking info from inputs
            var userEmail = $.trim($('#email').val());
            var userBirthsday = $.trim($('#birthsday').val());
            var userPass = $('#password').val();
            var userRePass = $('#re_password').val();           
            //send form
            $.ajax({
                type: 'POST',
                url: 'index.php',
                beforeSend: function(data) {
                    //disabled button in form
		            $('.submit').attr('disabled', 'disabled');
                    //show green spinner
                    $('.spiner').css("display", "inline-block");
		        },
                data: {user_Email: userEmail, user_birthsday: userBirthsday, user_pass: userPass, user_RePass: userRePass},
                error: function(req, text, error) {
                    console.log('AJAX error: ' + text + ' | ' + error);
                },
                success: function (data) {
                    //window.location.replace(' http://form2/app/success.php');
                    console.log('send');
                }
            });
        } else {
            //find empty inputs and show error
            $('form').find('.empty').addClass('error');
            console.log('error');
    }
    });

});