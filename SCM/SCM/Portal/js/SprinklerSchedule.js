
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

	    
            var globalschedule = [];
   
    

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


	    
