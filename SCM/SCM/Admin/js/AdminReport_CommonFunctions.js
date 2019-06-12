$(document).ready(function () {
    //Code for Toggle active on chart and graph click
    $('.left-active-sprites ul li').on('click', 'a', function() {
        $('.left-active-sprites ul li a.active').removeClass('active');
        $(this).addClass('active');
        if($('.left-active-sprites ul li.graph a').hasClass('active')){
            $('#graphdivarea').css('display','block');
            $('#tabledivarea').css('display','none');
        }
        else
        {
            $('#graphdivarea').css('display','none');
            $('#tabledivarea').css('display','block');
        }
        
    });
    $('.predict-btns li a').click(function(e) {
        e.preventDefault(); //prevent the link from being followed
        $('.predict-btns li a').removeClass('active');
        $(this).addClass('active');
    });
    //End Toggle Comment

    $('#filter_btn_explorer').click(function () {
        $(this).toggleClass('active');
        $('#divFilter').slideToggle();
    });

});

function checkDate(sender, args) {

    //Check if the date selected is less than todays date
    if (sender._selectedDate > new Date()) {
        //show the alert message
        alert("You cannot select a future date");
        //set the selected date to todays date in calendar extender control
        sender._selectedDate = new Date();

        // set the date back to the current date
        sender._textbox.set_Value(sender._selectedDate.format(sender._format))

    }
}

function getDateFormat(obj) {
    var d = new Date(obj);
    var day = d.getDate();
    if (d.getMonth() <= 10) {
        var month = d.getMonth() + 1;
    }
    else {
        var month = d.getMonth();
    }
    var year = d.getFullYear();
    switch (month) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
    }
    return month + ' ' + day + ', ' + year;
}


/* ************************************** */
$(document).ready(function () {
    if ($('ul.sidebar-menu  li.sidebar_admin').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_payment').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_device').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_resolution').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_browser').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_heat').hasClass('active')) {
        $('#sidebar-userbehaviour').addClass('show');
        $('#sidebar-userbehaviour').removeClass('hide');
    }
    else {
        $('#sidebar-userbehaviour').addClass('hide');
        $('#sidebar-userbehaviour').removeClass('show');
    }


    /*  */
    if ($('ul.sidebar-menu  li.sidebar_efficency').hasClass('active')) {
        $('#sidebar-programs').addClass('show');
        $('#sidebar-programs').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_programs').hasClass('active')) {
        $('#sidebar-programs').addClass('show');
        $('#sidebar-programs').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_rebates').hasClass('active')) {
        $('#sidebar-programs').addClass('show');
        $('#sidebar-programs').removeClass('hide');
    }
    else {
        $('#sidebar-programs').addClass('hide');
        $('#sidebar-programs').removeClass('show');
    }

    /* ------------- */
    if ($('ul.sidebar-menu  li.sidebar_cust_conf').hasClass('active')) {
        $('#conf-setting').addClass('show');
        $('#conf-setting').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_service_conf').hasClass('active')) {
        $('#conf-setting').addClass('show');
        $('#conf-setting').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_admin_conf').hasClass('active')) {
        $('#conf-setting').addClass('show');
        $('#conf-setting').removeClass('hide');
    }
    else if ($('ul.sidebar-menu  li.sidebar_adser_conf').hasClass('active')) {
        $('#conf-setting').addClass('show');
        $('#conf-setting').removeClass('hide');
    }
    else {
        $('#conf-setting').addClass('hide');
        $('#conf-setting').removeClass('show');
    }


});
$(document).ready(function () {

    $('ul.sidebar-menu  li.sidebar_efficency').mouseover(function () {
        $('#sidebar-programs').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_efficency").mouseout(function () {
        $('#sidebar-programs').removeClass('show');
    });
    $('ul.sidebar-menu  li.sidebar_admin').mouseover(function () {
        $('#sidebar-userbehaviour').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_admin").mouseout(function () {
        $('#sidebar-userbehaviour').removeClass('show');
    });
    $('ul.sidebar-menu  li.sidebar_configurationsetting').mouseover(function () {
        $('#conf-setting').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_configurationsetting").mouseout(function () {
        $('#conf-setting').removeClass('show');
    });

});

$(document).ready(function () {



    
    $('ul.sidebar-menu  li.sidebar_efficency').mouseover(function () {
        $('#sidebar-programs').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_efficency").mouseout(function () {
        $('#sidebar-programs').removeClass('show');
    });
    $('ul.sidebar-menu  li.sidebar_admin').mouseover(function () {
        $('#sidebar-userbehaviour').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_admin").mouseout(function () {
        $('#sidebar-userbehaviour').removeClass('show');
    });
    $('ul.sidebar-menu  li.sidebar_configurationsetting').mouseover(function () {
        $('#sidebar-conf-setting').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_configurationsetting").mouseout(function () {
        $('#sidebar-conf-setting').removeClass('show');
    });
    $('ul.sidebar-menu  li.sidebar_configurationsetting').mouseover(function () {
        $('#conf-setting').addClass('show');
    });
    $("ul.sidebar-menu  li.sidebar_configurationsetting").mouseout(function () {
        $('#conf-setting').removeClass('show');
    });

});
