$(document).ready(function () {
    $(".nav_left li.icon_sprinkler").addClass('active');
    $(".on_btn").click(function () {
        $(".on_btn").toggleClass("off_btn");
    });

    $(".cover_right_top_area").css("display", "none");

    $('#deviceSwitch').click(function () {
        var switchvalue = $('#deviceSwitch').val();


        var input = { "deviceSwitch": switchvalue };
        $.ajax({

            type: "POST",
            url: "SprinklerDevice.aspx/deviceSwitchMethod",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input),
            dataType: "json",
            success: function (response) {
                var result = response.d;
                $('#')

                //  alert(result);
            },
            faliure: function (response) {
                // alert(response.d);
                toastr.warning(response.d);

            }
        });


    });

    $(".remote_icon").click(function () {

        $(".remote_area").show();
        $("#backgrounddiv").addClass('opacbody');

        $.ajax({
            type: "POST",
            url: "SprinklerDevice.aspx/RemoteZones",
            contentType: "application/json; charset=utf-8",
            // data: JSON.stringify(input),
            dataType: "json",
            success: function (response) {

                var htmlData = response.d;


                //  var sfs = $('#remoteZone').innerHTML(htmlData);
                $('#remoteZone').html(htmlData);
                //    $('#remoteZone').appendTo(htmlData);

            },
            failure: function (response) {

                // alert(response.d);
                toastr.warning(response.d);
            },
            error: function (request, status, errorThrown) {

            }
        });


    });

    $("#backgrounddiv").click(function () {
        $(".remote_area").hide();
        $("#backgrounddiv").removeClass('opacbody');
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
                //  alert(response.d);
                toastr.warning(response.d);
            }
        });
    });


    $('#ActivatRain').click(function () {


        var delaytime = escape($('#txtdelay').val());

        var input = { "delaytime": delaytime };

        $.ajax({
            type: "POST",
            url: "SprinklerDevice.aspx/DelayRain",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input),
            dataType: "json",
            success: function (response) {
                var htmlData = response.d;
                $('#txtdelay').val("");
                //infoModal.find('#modal-body')[0].innerHTML = htmlData;
                //infoModal.modal();
                //var html;
                //html = "<input type=text ... /><br />";
                //$("#myContainerDiv").append(html);
            },
            failure: function (response) {
                //    alert(response.d);
                toastr.warning(response.d);
            }
        });
    });


});