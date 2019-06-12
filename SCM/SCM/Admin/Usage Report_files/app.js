/*!
 * Author: Manoj Kumar Sharma
 * Date: 4 Jan 2014
 * Description:
 *      This file should be included in all pages
 !**/

/*
 * Global variables. If you change any of these vars, don't forget 
 * to change the values in the less files!
 */
var left_side_width = 220; //Sidebar width in pixels
var GridWidth = '';
var percentwidth = 1;
$(function () {
   
    $("#excelExport").click(function () {
        flag = 0;
        $("div[class*='jqgrid'").each(function () {
            flag = 1;
            if ($(this).css("display") != 'none') {
                $(this).jqxGrid('exportdata', 'xls', 'User Details');
            };

        });
        if (flag != 1)
            alert("1");
    });

    GridHeight = $('.inner-right-section').height();
    GridWidth = $('.inner-right-section').width();
    $("#chartDiv").height(GridHeight * .77);
    $(".jqgrid").height(GridHeight * .65);
    $(".highchartdiv").height(GridHeight * .77);
    
    "use strict";

    //Enable sidebar toggle
    $("[data-toggle='offcanvas']").click(function(e) {
        e.preventDefault();

        ////If window is small enough, enable sidebar push menu
        //if ($(window).width() <= 992) {
        //    $('.row-offcanvas').toggleClass('active');
        //    $('.left-side').removeClass("collapse-left");
        //    $(".right-side").removeClass("strech");
        //    $('.row-offcanvas').toggleClass("relative");
        //} else {
        //    //Else, enable content streching
        //    $('.left-side').toggleClass("collapse-left");
        //    $(".right-side").toggleClass("strech");
        //}
        //resizegrid();
      
    });
    changeactivelinkcolor();
});
$(function () {
    //checkClientTimeZone();

    /*

            $(document).on("click", function (e) {
                if ($(e.srcElement).closest('.admin-box').length) return;
                if ($('.admin-box').is(":visible")) $('.admin-box').fadeOut('slow');
            });
            $('.click').on("click", function (e) {
                if ($(e.srcElement).closest('.admin-box').length) return;
                $('.admin-box').slideToggle('slow');
                return false;
            });
            // The popup after selecting the Admin is not required. Display Admin name only. Incorporate the above UI 
           */   
            // $('input[type="text"],input[type="password"],input[type="file"],textarea,select').change(function () {

});

function resizegrid()
{

  //  $("#" + gridId).jqxGrid({ height: GridHeight });
    $(".jqgrid:visible").jqxGrid('updatebounddata');
   
}
function changeactivelinkcolor() {
    if ($(".activeli_list").val() != null && $(".activeli_list").val() != undefined) {
        var objli = $(".activeli_list").val().split(',');
        $(objli).each(function (i, obj) {
            //$("." + obj + ' a').addClass('active');
            
            $("." + objli[i]).addClass('active');
        });
    }

}

//function checkClientTimeZone() {
//    try {
//        // Set the client time zone
//        var dt = new Date();
//        // SetCookieCrumb("ClientDateTime", dt.toString());
//        var tz = -dt.getTimezoneOffset();
//        // SetCookieCrumb("ClientTimeZone", tz.toString());
//        Default.setcookie(tz.toString());
//    }
//    catch (ex)
//    { }
//}