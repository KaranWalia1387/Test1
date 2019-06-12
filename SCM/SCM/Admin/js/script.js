/* 

Author: Manoj Kumar Sharma

*/

//  ---- Toggle navigation Function

 $(document).ready(function(){
      $(".button a").click(function(){
        $("nav.main").slideToggle();
      });
    });







//  ---- Navigation Open function


	  function processForm()
	  {
		var parameters = location.search.substring(1).split("&");
		var temp = parameters[0].split("=");
		l = unescape(temp[1]);
		 //Dialog with the text you put on the textbox
		 
	   if(l!="undefined")
	   {
		  
	 		setTimeout(hideShowDiv,200 , l);
	   }
	  
	   
	  }
	  function hideShowDiv(divID)
	  {
	 // alert(divID);
	  $("#tab1-1").css("display", "none");
	  $("#tab1-2").css("display", "none");
	  $("#tab1-3").css("display", "none");
	  $("#tab1-4").css("display", "none");
	   $("#tab1-5").css("display", "none");
	   $("#tabs ul.tabs li, ul.mainnav li").removeClass("active"); //Remove any "active" class
	   	$("#tabs .tab-content").hide(); //Hide all content
		
	   if(divID=="CCE" )
	  {
		  	$("#tab1-1").css("display", "block");
			$("#tabs ul.tabs li:eq(0), ul.mainnav li:eq(0)").addClass("active").show(); //Activate first tab
			$("#tabs .tab-content:eq(0)").show(); //Show first tab content
		  
	  }
	  else   if(divID=="EED")
	  {
		  	$("#tab1-2").css("display", "block");
			$("#tabs ul.tabs li:eq(1), ul.mainnav li:eq(1)").addClass("active").show(); //Activate first tab
			$("#tabs .tab-content:eq(1)").show(); //Show first tab content
	  }
	   else   if(divID=="SV")
	   {
		   	$("#tab1-3").css("display", "block");
			$("#tabs ul.tabs li:eq(2), ul.mainnav li:eq(2)").addClass("active").show(); //Activate first tab
			$("#tabs .tab-content:eq(2)").show(); //Show first tab content
	   }
		else   if(divID=="CV")
		{
			$("#tab1-4").css("display", "block");
			$("#tabs ul.tabs li:eq(3), ul.mainnav li:eq(3)").addClass("active").show(); //Activate first tab
			$("#tabs .tab-content:eq(3)").show(); //Show first tab content
		}
		
		else   if(divID=="SCM")
		{
			$("#tab1-5").css("display", "block");
			$("#tabs ul.tabs li:eq(4), ul.mainnav li:eq(4)").addClass("active").show(); //Activate first tab
			$("#tabs .tab-content:eq(4)").show(); //Show first tab content
		}
	
  }
  
  processForm();