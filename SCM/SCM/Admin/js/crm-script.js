$(document).ready(function(){
	
$(".crm_new_event_pie").click(function() {
   $(".crm_bottom_content_area_pie").fadeIn();
   $(".crm_bottom_content_area_graph").hide();
   $(".crm_bottom_content_area_chart").hide();
  });

$(".crm_new_event_graph").click(function() {
   $(".crm_bottom_content_area_graph").fadeIn();
   $(".crm_bottom_content_area_pie").hide();
   $(".crm_bottom_content_area_chart").hide();
 });
 
$(".crm_new_event_chart").click(function() {
   $(".crm_bottom_content_area_chart").fadeIn();
   $(".crm_bottom_content_area_graph").hide();
   $(".crm_bottom_content_area_pie").hide();
 });
 
 
  $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').slideToggle();
            });
			
			$(".no").click(function(){
				$(".show_me").show();
			});
			
			$(".clc").on("click", function () { 
				$(".add_seg_details").show();
			});
 
});



