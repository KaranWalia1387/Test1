<%@ Page Title="Sprinkler Schedule" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true" CodeBehind="SprinklerSchedule.aspx.cs" Inherits="CustomerPortal.SprinklerSchedule" %>
    
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
       <%: System.Web.Optimization.Styles.Render("~/Content/cssSprinklerSchedule") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSprinklerSchedule")%>
     <%--<title globalize="ML_SmartHome_SprinklerSchedule">Sprinkler Schedule</title>--%>
    <%--<link href="css/Sprinkler.css" rel="stylesheet" />--%>
    <link rel="stylesheet" href="code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />

    <%--<script type="text/javascript" src="js/jquery.min.js"></script>--%>
     <!-- JavaScripts files -->
     <!-- JavaScripts files -->
      <!-- Meta tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="robots" content="index, follow" />
    <meta name="revisit-after" content="Daily" />
    <meta name="rating" content="general" />
    <meta name="author" content="opmo" />
    <!-- Favicon -->
    <link href="images/solutions-favicon.ico" rel="shortcut icon" type="image/x-icon" />
	<%--<link href="css/bootstrap.css" rel="stylesheet" />--%>
	<link rel="stylesheet" href="maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" />
	<%--<link href="css/stylesheet.css" rel="stylesheet" />--%>

    <script  type="text/javascript" src="ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<%--<script  type="text/javascript" src="js/bootstrap.min.js"></script>--%>
	<%--<script  type="text/javascript">
	    $(document).ready(function () {
	        $(".cover_right_top_area").css("display", "none");
	        // $('.tggler :checkbox').checkboxpicker();
	        $(".nav_left li.schedule").addClass('active');
	        $("#txt-enabled").click(function () {
	            $("span.slider-button22").html($("span.slider-button22").html() == 'enabled' ? 'disabled' : 'enabled');
	            $('span.slider-button22').toggleClass('slider-button2');
	            e.preventDefault();
	        });
	        $(".sdlc").click(function () {
	            $("span.slider-button").html($("span.slider-button").html() == 'Yes' ? 'No' : 'Yes');
	            $('span.slider-button').toggleClass('slider-button2');
	        });


	    });
</script>--%>
	
<%--<script type="text/javascript">
    var globalschedule = [];
   
    //$(function () {
    //    $(".datepicker").datepicker({
    //        showOn: "button",
    //        buttonImage: "images/calender_icon.gif",
    //        buttonImageOnly: true,
    //        buttonText: "Select date"
    //    });
    //});
    //$(function () {
    //    $("#datepicker_1").datepicker({
    //        showOn: "button",
    //        buttonImage: "images/calender_icon.gif",
    //        buttonImageOnly: true,
    //        buttonText: "Select date"
    //    });
    //});


    $(function () {
        $('#scheduleRuleBl li').click(function () {
           var str= $(this).attr("ID");
           var input = { "scheduleid": str };
          
            $.ajax({
                type: "POST",
                url: "SprinklerSchedule.aspx/GetScheduleRules",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(input),
                dataType: "json",
                success: function (response) {
                   // $("#ScheduledEventsBl").empty();

                    
                    var array = $.parseJSON(response.d);
                    //alert(array);
                    
                    if (array.length > 0) {
                        $('#ScheduleName').val(array[0].name);
                        $('#TotalWaterDuration').val(array[0].totalDuration);
                        $('#ScheduleType').text((array[0].externalName).substring(0, 14));
                        var type = (array[0].externalName).substring(0, 5);
                        if (type == "Fixed") {
                            $("#Days").removeAttr("disabled");
                            var Repeats = (array[0].summary).substring(0, 13);
                            var startTime = (array[0].summary).substring(16, 23);
                            $('#Days').val(Repeats);
                            $('#StartTime').val(startTime);
                            var startDate = (new Date(array[0].startDate)).toString().substring(0, 15);
                            $('#StartDate').val(startDate);
                            $('#WateringDays input[type=checkbox]').prop( "disabled", true ).prop("checked", false);
                            
                           
                        }
                        else {
                           // $('.WateringDays').removeAttr("disabled");
                            
                            var startTime = (array[0].summary).substring((array[0].summary).indexOf(' at') + 4, (array[0].summary).indexOf('m') + 2);
                            $('#StartTime').val(startTime);
                            var startDate = (new Date(array[0].startDate)).toString().substring(0, 15);
                            $('#StartDate').val(startDate);
                            var Repeats = (array[0].summary).substring(6, (array[0].summary).indexOf(' at'));
                           
                            var Days = Repeats.split(',');
                            
                            //alert(Days);
                            $('#WateringDays input[type=checkbox]').prop("checked", false);
                            $.each(Days, function () {
                                
                                
                                $("#WateringDays ." + $.trim(this) + "").prop('checked', true);

                            });
                            $("#Days").attr("disabled", "disabled");
                            $("#Days").val('');
                            
                        }
                        $('#rightside').empty();
                        //alert("RightSide");
                        $.each(array[0].zones, function () {
                            
                            //$('#rightside').append("<section class='zone-lists'><div class='zone-list-item'><div class='left-zone-list'><div class='zone-images'><span class='icon'></span><span class='icon icon-crop'></span></div><div class='list-name-select'><span class='name-zone'>Zone " + this.zoneNumber + "</span><select name='duration'  class='form-control'><option>" + (this.duration / 60) + " min</option></select></div></div><div class='right-zone-list'><div id='' class='rach-toggle checked sdlc'><span class='slider-button slider-button'>Yes</span></div></div></div></section>");
                            $('#rightside').append("<section class='zone-lists'><div class='zone-list-item'><div class='left-zone-list'><div class='zone-images'><span class='icon'></span><span class='icon icon-crop'></span></div><div class='list-name-select'><span class='name-zone'>Zone " + this.zoneNumber + "</span></div></div><div class='right-zone-list'><div id='' class='rach-toggle checked sdlc'><span class='slider-button slider-button'>Yes</span></div></div></div></section>");
                        });
                        
                    }
                },
                failure: function (response) {
                   // alert("Error");
                    toastr.warning(response.d);
                }
            });

        });



        $(".datepicker").datepicker({
            showOn: "button",
            buttonImage: "images/calender_icon.gif",
            buttonImageOnly: true,
            buttonText: "Select date"
        });


    });


    $(function () {
        var selection = null;
        $("#datepicker_1").datepicker({
            showOn: "button",
            buttonImage: "images/calender_icon.gif",
            buttonImageOnly: false,
            buttonText: "Select date",
            minDate: "0",
            maxDate: "12",
            onSelect: function (date) {
                updateSelection(date);
            }
        });
        function updateSelection(date) {
            var selectedDevice = $('#deviceListDd option[selected]').val();
            var input = { "selectedDate": date, "deviceId": selectedDevice };
            $.ajax({
                type: "POST",
                url: "SprinklerSchedule.aspx/CalendarDate",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(input),
                dataType: "json",
                success: function (response) {
                    $("#ScheduledEventsBl").empty();
                   
                    
                    var array = $.parseJSON(response.d);
                    
                    if (array.length > 0) {
                        $.map(array, function (val) {
                            $("#ScheduledEventsBl").append("<li>" + val + "</li>");
                        });
                    }
                },
                failure: function (response) {
                   // alert("Error");
                    toastr.warning(response.d);
                }
            });
        };
    });


  </script>--%>
  
<%--<style type="text/css">

.calender_right {
	    background: url("images/sprinkler/calender_icon.gif") no-repeat left top;
		}
.ui-widget-header .ui-icon.ui-icon-circle-triangle-w {
	    background: url("images/sprinkler/arrow_left_cal.png") no-repeat left top !important;
		background-position:left top !important;
	}
	
	.ui-widget-header .ui-icon {
    background: url("images/sprinkler/arrow_right_cal.png")  no-repeat left top !important;
	background-position:left top !important;
}

 .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus {
	  background: none !important;
    border: 0px solid #999999 !important;
	padding:0px !important;
	margin:0px !important;
	cursor:pointer;
	transition:all 0.7s ease-in;
}	
.ui-datepicker-title {
	color:#fff;
}	
.zone_are_select select, .zone_are_select input[type="text"] {
    margin-top:10px;
}

        .energy_mid_box .right_content_box {
    margin-left: 0%;
    overflow: visible !important;
    width: 80%;
}
       
        
</style>--%>



    
            <div class="inner_mid_con">
             <ul class="tab_nav_1 navbar-nav">
                <li class="device" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinkerDevice)%>"> <a href="<%=string.Format("{0}/SprinklerDevice.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerDevice">Sprinkler Device</a></li>
                <li class="zone" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerZones)%>"> <a href="<%=string.Format("{0}/SprinklerZones.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerZones">Sprinkler Zones</a></li>
                <li class="schedule active" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerSchedule)%>"> <a href="<%=string.Format("{0}/SprinklerSchedule.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerSchedule">Sprinkler Schedule</a></li>
            </ul>    
              <div class="type_zone_area">
                   <div class="col-lg-4 zone_are_select">                        
                    <asp:DropDownList ID="deviceListDd" runat="server" ClientIDMode="Static" Font-Size="Small" ForeColor="Black" ></asp:DropDownList>
                   </div>
                    <div class="col-lg-4 zone_are_select"> <asp:DropDownList ID="scheduleListdd" runat="server"></asp:DropDownList></div>
                    <div class="col-lg-4 zone_are_select">    <asp:Button ID="schSkipBtn" runat="server" CssClass="submit_new" Text="Skip Schedule" OnClick="schSkipBtn_Click" />&nbsp;&nbsp;&nbsp;
                  <asp:Button ID="schStartbtn" runat="server" CssClass="submit_new" Text="Start Schedule" OnClick="schStartbtn_Click" /></div>
                   <div class="col-lg-4 zone_are_select">    <asp:TextBox ID="seasonalAdjustTb" runat="server" placeholder="-1 to 1" style="width:100%;"></asp:TextBox></div>
                   <div class="col-lg-4 zone_are_select">   <asp:Button ID="seasonalAdjustBtn" runat="server" CssClass="submit_new" Text="Seasonal Adjust" OnClick="seasonalAdjustBtn_Click" /></div>
               <%-- <div class="type_area schedule_area">
                
                        </div>--%>
               <%--     <select>
                        <option>--Select--</option>
                        <option>Rachio</option>
                        <option>Rachio 1</option>
                        <option>Rachio 2</option>
                        <option>Rachio 3</option>
                    </select>--%>

                  
                    <div class="clearfix"></div>  
                        <%--<span style="float:right;">
                            <input type="button" value="Skip Schedule" class="submit_new" />
                            <input type="button" value="Start Schedule" class="submit_new" />
                            </span>--%>
              
                
                <div class="zone_area schedule">
                    <div class="zone_area_bottom">
                        <%--<input type="text" placeholder="Eneter here..." /> 
                        <div class="clearfix"></div>
                        <input type="button" value="Seasonal Adjust" class="submit_new" />--%>
                     
                         
                    </div>
                </div>

            </div>


              <div class="cal_news_wrapper">
                    	<div class="cal_left">
                        	<div id="datepicker_1"></div>
                        </div>
                        <div class="today_events">
                            <h4> Future Events</h4>
                          
                            <asp:BulletedList ID="ScheduledEventsBl" ClientIDMode="Static" runat="server"></asp:BulletedList>
                            <asp:PlaceHolder ID="ScheduledEventsPh" runat="server"></asp:PlaceHolder>
                        </div>
                    </div>
             <div class="clearfix"></div>
              <div class="today_events">
                        	<h4> Schedules</h4>
                           <asp:BulletedList ID="scheduleRuleBl" CssClass="today_events_height" ClientIDMode="Static" data-toggle="modal" data-target="#myModal" runat="server"></asp:BulletedList> 
                        </div>
         </div>
    <!-- Modal -->
    <div class="modal fade bs-example-modal-lg edit-flex-schedule" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Edit Schedule</h4>
      </div>
      <div class="modal-body">
     <section class="rach-section">
	 <div class="content">
	 <section class="schedule-edit-form">
	 <div class="left-section">
		 <div class="header">
			 <span class="icon" data-type="fixed-schedule-color"></span>
			 <span id="ScheduleType"></span>
			 <%--<div id="txt-enabled" class="rach-toggle checked"><span class="slider-button22">enabled</span></div>--%>
		 </div>
		 <div class="form-group">
                                  <label>Schedule Name</label>
                                  <input type="text" id="ScheduleName" name="name" placeholder="" class="form-control">
         </div>
		 <div class="form-group">
			 <label>Start Date</label>
			 <input type="text" name="date" id="StartDate" placeholder="" class="form-control" data-type="date">
			 <%--<span class="dating"></span>--%>
         </div>
		 <div class="form-group">
			 <label>Start Time</label>
			 <input type="text" name="time" id="StartTime" placeholder="" class="form-control">
			 <%-- <span class="dating"></span>--%>
         </div>	
		 <div class="form-group" id="wateringDays">
			 <label>Watering Days</label>
			 <div class="checkbox-inline no_indent" id="WateringDays">
			 <input type="checkbox" name="name" class="Sun" placeholder=""><label>Sun</label>
			 <input type="checkbox" name="name" class="Mon" placeholder=""><label>Mon</label>
			 <input type="checkbox" name="name" class="Tue" placeholder=""><label>Tue</label>
			 <input type="checkbox" name="name" class="Wed" placeholder=""><label>Wed</label>
			 <input type="checkbox" name="name" class="Thu" placeholder=""><label>Thu</label>
			 <input type="checkbox" name="name" class="Fri" placeholder=""><label>Fri</label>
			 <input type="checkbox" name="name" class="Sat" placeholder=""><label>Sat</label>
			 </div>
         </div>		
<div class="form-group run-interval" disabled="disabled">
<label>Or Repeats...</label>
     <input type="text" name="time" id="Days" placeholder="" class="form-control" />
	
		<%-- <span class="dating"></span>--%>
	 </div>
	

	 </div>
	 <div id="rightside" class="right-section">
	 <header class="header">
                                    <%--<div class="total" >
                                      <span class="copy">Watering Duration</span>
                                      <span class="data" data-unit="min" id="TotalWaterDuration"></span>
                                    </div>--%>
     </header>
	
</div>	 
	 
	 
	 
	 </section>
	 </div>
	 </section>
      </div>
   <%--   <div class="modal-footer">
	  <div class="lft-sct">
	  <button type="button" class="btn btn-success">Run Now</button>
	  <button type="button" class="btn btn-danger">Delete</button>
	  </div>
       <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-info">Save</button>
      </div>--%>
    </div>
  </div>
</div>

   
    <link rel="stylesheet" href="code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />
        <script type="text/javascript" src="code.jquery.com/jquery-1.10.2.js"></script>
        <script type="text/javascript" src="code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</asp:Content>
