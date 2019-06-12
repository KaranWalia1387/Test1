//For weather API

$(document).ready(function () {
    
    getapidata();
});
function getapidata() {
    var type = "D";
    var zip = $("#ddlAddress option:selected").val().split(':')[5];
    var fromDate = new Date(); fromDate.setDate(fromDate.getDate() + (-1));
    var toDate = new Date(); toDate.setDate(toDate.getDate() + 10);
    var from = fromDate.getMonth() + 1 + '/' + fromDate.getDate() + '/' + fromDate.getFullYear();
    var to = toDate.getMonth() + 1 + '/' + toDate.getDate() + '/' + toDate.getFullYear();
    var result = '';
    var param = "{ 'wType': '" + type + "',  'zip': '" + zip + "' , 'fromDate':'" + from + "' , 'toDate': '" + to + "' }";
    $.ajax({
        type: "POST",
        url: "Central_air_system.aspx/GetWeatherData",
        data: param,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            result = $.parseJSON(response.d);
        },
        error: function () { },
    });
    plotapilocations(result);
}

function plotapilocations(data) {
    var s = '';
    var humidity = '';
    if (data != null) {
        
        for (var i = 0; i < data.length; i++) {
            var date = new Date();
            var date = new Date(data[i].WeatherDate);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;

            if (parseFloat(data[i].humidity) > 0) {
                humidity = ' Humidity ' + data[i].humidity;
            }
            else { humidity = '&nbsp;'; }
            s += "<div class='DayContainer'> <div class='DayHeader'>" + date + "</div>" +
            "<div class='DateHeader'>" + humidity + "</div>" +
            "<div class='Weather'><img src='" + data[i].Icon_url + "' alt='WeatherIcon' title='" + data[i].Clear + "'></div>" +
            "<div class='Temp'>Max " + data[i].High_fahrenheit + "</div>" +
            "<div class='Lowtemp'>Min " + data[i].Low_fahrenheit + "</div></div>";
        }
    }
    $('#divWeather').html(s);
}