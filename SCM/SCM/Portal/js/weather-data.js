//For weather API

$(document).ready(function () {
    getapidata();
});
function getapidata() {
    var zip = $("#ddlAddress option:selected").val().split(':')[5];
    var result = Central_air_system.GetApiLocations(zip).value;
    //var result = Central_air_system.GetWeatherData.value;
    var parsedjson = jQuery.parseJSON(result);
    plotapilocations(parsedjson);
}

function plotapilocations(data) {
    var s = '';
    var Avehumidity = '';
    for (var i = 0; i < data.length; i++) {
        //var date = new Date();
        //var date = new Date((data.list[i].dt) * 1000);
        //var dd = date.getDate();
        //var mm = date.getMonth() + 1;
        //var yyyy = date.getFullYear();
        var date = data[i].WeatherDate;

        if (parseFloat(data[i].Avehumidity) > 0) {
            Avehumidity = ' Humidity ' + data[i].Avehumidity;
        }
        else { Avehumidity = '&nbsp;'; }

        s += "<div class='DayContainer'> <div class='DayHeader'>" + date + "</div>" +
        "<div class='DateHeader'>" + Avehumidity + "</div>" +
        "<div class='Weather'><img src='"+data[i].Icon_url + "' alt='WeatherIcon' title='" + "'></div>" +
        "<div class='Temp'>Max " + (parseFloat(data[i].High_fahrenheit))+ "</div>" +
        "<div class='Lowtemp'>Min " + (parseFloat(data[i].Low_fahrenheit)) + "</div></div>";
    }
    $('#divWeather').html(s);
}