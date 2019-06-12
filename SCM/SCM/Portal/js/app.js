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
   
    GridHeight = $('.inner-right-section').height();
    GridWidth = $('.inner-right-section').width();
    $("#chartDiv").height(GridHeight * .77);
    $(".jqgrid").height(GridHeight * .77);
    $(".highchartdiv").height(GridHeight * .77);
    
    "use strict";

    //Enable sidebar toggle
    $("[data-toggle='offcanvas']").click(function(e) {
        e.preventDefault();

        //If window is small enough, enable sidebar push menu
        if ($(window).width() <= 992) {
            $('.row-offcanvas').toggleClass('active');
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $('.row-offcanvas').toggleClass("relative");
        } else {
            //Else, enable content streching
            $('.left-side').toggleClass("collapse-left");
            $(".right-side").toggleClass("strech");
        }
        resizegrid();
      
    });
    changeactivelinkcolor();
});
$(function () {
            $(document).on("click", function (e) {
                if ($(e.srcElement).closest('.admin-box').length) return;
                if ($('.admin-box').is(":visible")) $('.admin-box').fadeOut('slow');
            });
            $('.click').on("click", function (e) {
                if ($(e.srcElement).closest('.admin-box').length) return;
                $('.admin-box').slideToggle('slow');
                return false;
            });
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
            $("." + obj + ' a').addClass('active');
        });
    }

}