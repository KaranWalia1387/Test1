//Program Schedule
var sampleschedule = '{"1":["360,70,600,72,1080,68,1320,72", "360,70,600,64,1080,70,1320,68  "],' +
'"2":["360,70,600,72,1080,68,1320,72", "360,70,600,64,1080,70,1320,68"],' +
'"3":["400,68,550,68,980,68,1200,70", "380,70,630,58,1100,70,1300,70"],' +
'"4":["420,60,550,70,950,68,1250,68", "400,55,630,45,1100,70,1280,65"],' +
'"5":["360,70,600,72,1080,68,1320,72", "360,70,600,64,1080,70,1320,68"],' +
'"6":["400,67,600,58,1100,65,1250,70", "400,78,620,68,1020,70,1280,58"],' +
'"7":["400,68,550,68,980,68,1200,70", "380,70,630,58,1100,70,1300,70"]}';

var parsedSchedule = '';
var str = '&deg;F';
var arrDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var strtable = '';
var cellno;
$(document).ready(function () {
    BindProgram();
    $('#btnSubmitProgram').click(function () {
        try {

            if (!validateTemperature($('#txtProgramCoolTemp').val().trim(), 0, 120)) {
                alert('Cool temperature should be in between 0°F and 120°F.');
                $('#txtProgramCoolTemp').focus();
                return false;
            }
            if (!validateTemperature($('#txtProgramHeatTemp').val().trim(), 45, 120)) {
                alert('Heat temperature should be in between 45°F and 120°F.');
                $('#txtProgramHeatTemp').focus();
                return false;
            }


            var tdobj = $('td[cellno="' + cellno + '"]');
            $(tdobj).find('.hour').html($('#ddltime').val())
            $(tdobj).find('.coolvalue').html($('#txtProgramCoolTemp').val().trim())
            $(tdobj).find('.heatvalue').html($('#txtProgramHeatTemp').val().trim())

            var x = cellno.split('~')[0];
            var y = cellno.split('~')[1];

            var arrupdatecool = parsedSchedule[x][0].split(',');
            var arrupdateheat = parsedSchedule[x][1].split(',');

            arrupdatecool[(y * 2) - 2] = ($('#ddltime').val() * 60);
            arrupdateheat[(y * 2) - 2] = ($('#ddltime').val() * 60);

            arrupdatecool[(y * 2) - 1] = $('#txtProgramCoolTemp').val().trim();
            arrupdateheat[(y * 2) - 1] = $('#txtProgramHeatTemp').val().trim();

            parsedSchedule[x][0] = arrupdatecool.toString();
            parsedSchedule[x][1] = arrupdateheat.toString();

            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true);
            document.getElementById('btnCloseProgram').dispatchEvent(evt);



        }
        catch (e) { }
    });


    $('#btnUpdateProgram').click(function () {
        try {
            var id = $("#ddlThermostat option:selected").text();
            var programjson = JSON.stringify(parsedSchedule);
            var request = '{"mac":"' + id + '","cmds":{"CP":"01",' + programjson.substring(1, programjson.length - 1) + '}}';
            var result = Central_air_system_ladwp.SetdeviceDetail(request).value;
            OnSetSuccessProgram(result);
        }
        catch (e) { }
    });
});

function BindProgram() {
    try {
        parsedSchedule = jQuery.parseJSON(sampleschedule);
        var coolslot;
        var heatslot;
        var arrcoolslot;
        var arrheatslot;
        var formatedtime;
        strtable = '';
        strtable += '<table id="programschedule" class="programtable table-striped table-hover"><tr><td></td><td>Wake</td><td>Leave</td><td>Return</td><td>Sleep</td></tr>';

        for (var i = 0; i < 7; i++) {

            coolslot = parsedSchedule[i + 1][0];
            heatslot = parsedSchedule[i + 1][1];

            arrcoolslot = coolslot.split(',');
            arrheatslot = heatslot.split(',');

            formatedtimearr = GetFormattedTime(arrcoolslot[0]).split('|');

            strtable += '<tr><td class="days">' + arrDays[i] + '</td>';

            strtable += '<td cellno="' + (i + 1) + '~1">' +
            '<div class="time"><div class="hour">' + formatedtimearr[0] + '</div>:<div class="minute">' + formatedtimearr[1] + '</div><div class="meridian"></div></div>' +
            '<div class="temperature"><div class="coolvalue">' + arrcoolslot[1] + '</div>'+str+'<div class="heatvalue">' + arrheatslot[1] + '</div>'+str+'</div></td>';

            formatedtimearr = GetFormattedTime(arrcoolslot[2]).split('|');

            strtable += '<td cellno="' + (i + 1) + '~2">' +
            '<div class="time"><div class="hour">' + formatedtimearr[0] + '</div>:<div class="minute">' + formatedtimearr[1] + '</div><div class="meridian"></div></div>' +
            '<div class="temperature"><div class="coolvalue">' + arrcoolslot[3] + '</div>'+str+'<div class="heatvalue">' + arrheatslot[3] + '</div>'+str+'</div></td>';

            formatedtimearr = GetFormattedTime(arrcoolslot[4]).split('|');

            strtable += '<td cellno="' + (i + 1) + '~3">' +
            '<div class="time"><div class="hour">' + formatedtimearr[0] + '</div>:<div class="minute">' + formatedtimearr[1] + '</div><div class="meridian"></div></div>' +
            '<div class="temperature"><div class="coolvalue">' + arrcoolslot[5] + '</div>'+str+'<div class="heatvalue">' + arrheatslot[5] + '</div>'+str+'</div></td>';

            formatedtimearr = GetFormattedTime(arrcoolslot[6]).split('|');

            strtable += '<td cellno="' + (i + 1) + '~4">' +
            '<div class="time"><div class="hour">' + formatedtimearr[0] + '</div>:<div class="minute">' + formatedtimearr[1] + '</div><div class="meridian"></div></div>' +
            '<div class="temperature"><div class="coolvalue">' + arrcoolslot[7] + '</div>'+str+'<div class="heatvalue">' + arrheatslot[7] + '</div>'+str+'</div></td>';

            '</tr>';
        }
        strtable += '</table>';
        $('#ProgramContainer').html('');
        $('#ProgramContainer').html(strtable);

        $('#programschedule').on('click', 'tr td', function () {
            try {
                if ($(this).parent().index() > 0 && $(this).index() > 0) {
                    cellno = $(this).parent().index() + '~' + $(this).index();
                    $('#ddltime').val($(this).find('.hour').html());
                    $('#txtProgramCoolTemp').val($(this).find('.coolvalue').html());
                    $('#txtProgramHeatTemp').val($(this).find('.heatvalue').html());
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("click", true, true);
                    document.getElementById('lnkProgramtrigger').dispatchEvent(evt);
                }
            }
            catch (e) { }
        });
        

    }
    catch (e) { }
}

function OnSetSuccessProgram(response) {
    //var json = $.parseJSON(response.d);
    if (response == '') {
        alert('Your request was successfully recieved and will be reflected soon.');
    }
    else {
        alert(response);
    }

}

function GetFormattedTime(minutes) {
    try {
        var strtime;
        var result = (minutes / 60);
        var integerPart = Math.floor(result);
        var floatingPointPart = result - integerPart;
        strtime = (integerPart > 9 ? "" + integerPart : "0" + integerPart) + '|00|' + ((minutes > 720) ? 'PM' : 'AM');
        return strtime;
    }
    catch (e) { }
}

function validateTemperature(value, min, max) {
    return (value >= min && value <= max)
}

