
       $(document).ready(function () {

           $(".cover_right_top_area").css("display", "none");

           $(".nav_left li.zone").addClass('active');
           $(".remote_icon").click(function () {
                
               $(".remote_area").show();
               $("#backgrounddiv").addClass('opacbody');
                
               $.ajax({
                   type: "POST",
                   url: "SprinklerZones.aspx/RemoteZones",
                   dataType: "json",
                   // contentType: "text/plain",
                   contentType: "application/json; charset=utf-8",
                   //// data: JSON.stringify(input),
                   //dataType: "json",
                   success: function (response) {
                      
                       var htmlData = response.d;
                       //alert(htmlData);
                        
                       //  var sfs = $('#remoteZone').innerHTML(htmlData);
                       $('#remoteZone').html(htmlData);
                       //    $('#remoteZone').appendTo(htmlData);
                       
                   },
                   //failure: function (response) {
                        
                   //    alert(response.d);
                   //},
                   error: function (request, status, errorThrown) {
                       //alert("HII");
                       //alert(request + "|" + status + "|" + errorThrown);
                   }
               });


           });

           $("#backgrounddiv").click(function () {
               $(".remote_area").hide();
               $("#backgrounddiv").removeClass('opacbody');
           });

           $('.modal-toggle').on('click', function () {
                
               var infoModal = $('#myModal');
               var zoneId = $(this).data("id");
               var input = { "zoneId": zoneId };
               //alert(infoModal);
               //alert(zoneId);
               //alert(input);
            
               $.ajax({
                   type: "POST",
                   url: "SprinklerZones.aspx/AddZones",
                   contentType: "application/json; charset=utf-8",
                   data: JSON.stringify(input),
                   dataType: "json",
                   success: function (response) {
                       var htmlData = response.d;
                       infoModal.find('#modal-body')[0].innerHTML = htmlData;
                       infoModal.modal();
                       //var html;
                       //html = "<input type=text ... /><br />";
                       //$("#myContainerDiv").append(html);
                   },
                   failure: function (response) {
                       // alert(response.d);
                       toastr.warning(response.d);
                   }
               });
           });

           $('.submit_new').on('click', function () {

               //var zoneid = $.map($('#remoteZone li h4'), function (x) { return $(x).text() });
               //var zonetime = $.map($('.zonetime'), function (x) { return x.value });
               var zoneidtime = '{arr:' + JSON.stringify($.map($('#remoteZone select'), function (x) { return ("Zone " + x.id) + '|' + x.value })) + '}';
               //$.each(zoneids, function (index, value) {

               //    console.log('element at index ' + index + ' is ' + value);
               //});
                
               //var input = '{ zoneid: "'+JSON.stringify(zoneid)+'",zonetime:"'+JSON.stringify(zonetime)+'" }';
               //alert(input);
               $.ajax({
                   type: "POST",
                   url: "SprinklerZones.aspx/RunZone",
                   contentType: "application/json; charset=utf-8",
                   // data: (input),
                   data: zoneidtime,
                   dataType: "json",
                   success: function (response) {
                       var htmlData = response.d;
                       //  alert(htmlData);
                       toastr.warning(htmlData);
                   },
                   failure: function (response) {
                       // alert(response.d);
                       toastr.warning(response.d);
                   }
               });
           });


       });





