/*
 * Author: Manoj Sharma
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

var usageDataDollarMonth = "", usageDataKwhMonth = "", KwhMonthlyAvg = "", KwhDailyAvg = "";
var waterUsageDollarMonth = "";
var sum;
var KwhMonthlyAvg = 0, KwhDailyAvg = 0, GallonMonthlyAvg = 0, GallonDailyAvg = 0;
var piechartdata_power = 0;
var piechartdata_water = 0;
var colorarrHEX = new Array();
colorarrHEX = ["#f1b274", "#ec625e", "#79d1b5", "#31afdb", "#990099", "#0099c6", "#DD4477", "#66AA00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#cccccc"];

$(function () {
    try {
        $(".resizable").resizable({
            animate: true
        });
    }
    catch (e)
    {
        console.log(e.message);
    }
	});
	
window.onload = function () {   
    EfficientChart();    
}


function PowerAverageValues() {
    sum = 0;
    DollarMonthlyAvg = 0;
    DollarDailyAvg = 0;
    usageDataDollarMonth = comUsage.LoadUsage('1', 'D', 'M', "", 'H', "", '0', "","").value;
    for (i = 0; i < usageDataDollarMonth.Rows.length; i++) {
        sum += usageDataDollarMonth.Rows[i].TotalValue;
    }
    DollarMonthlyAvg = sum / usageDataDollarMonth.Rows.length;
    DollarDailyAvg = DollarMonthlyAvg / 30;
    $('#dollarspermonth').html('$' + DollarMonthlyAvg.toFixed(2) + ' per month.');
    $('#dollarsperday').html('$' + DollarDailyAvg.toFixed(2) + ' per day.');

    sum = 0;
    KwhMonthlyAvg = 0;
    KwhDailyAvg=0
    usageDataKwhMonth = comUsage.LoadUsage('1', 'K', 'M', "", 'H', "", '0', "","").value;
    for (i = 0; i < usageDataKwhMonth.Rows.length; i++) {
        sum += usageDataKwhMonth.Rows[i].TotalValue;
    }
    KwhMonthlyAvg = sum / usageDataKwhMonth.Rows.length;
    KwhDailyAvg = KwhMonthlyAvg / 30;
    $('#kwhpermonth').html(KwhMonthlyAvg.toFixed(2) + 'KWh per month.');
    $('#kwhperday').html(KwhDailyAvg.toFixed(2) + 'KWh per day.');
}

$(document).ready(function () {
    PowerAverageValues();          
    GetPieChartData();

});

function EfficientChart() {

    $.ajax({
        type: "POST",
        url: "Energy_Report.aspx/DrawChartMeterwise",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            data = data.d;
            var result = $.parseJSON(data);           
            //FillData_HowYouCompare(result.Table);
            FillData_HowYouRank(result.Table1);
            DrawChart('D', 1);
        },
        error: function (request, status, error) {
            loader.hideloader();
            alert('Error!! ' + request.statusText);
        }
    }); 
  
}

function FillData_HowYouRank(data) {

    processed_json = new Array();
    $.map(data, function (obj, i) {
        processed_json.push({
            name: setname(0),
            y: obj.AboveMe,
            color: ((parseInt(obj.AboveMe)) > 0 ? '#79d1b5' : '#ec625e')
        }),         
         processed_json.push({
             name: setname(2),
             y: Math.abs(obj.BelowMe),
             color: ((parseInt(obj.BelowMe)) > 0 ? '#79d1b5' : '#ec625e')
         }),
        processed_json.push({
            name: setname(1),
            y: Math.abs(obj.MyDifference),
            color: ((parseInt(obj.MyDifference)) > 0 ? '#79d1b5' : '#ec625e')
        });
    });
    showindecimal = true;
    Bindheigh_Efficiency('column', 'chartDiv');
}

function setname(index) {
    var name = '';
    if (index == 0) {
        name = $('#Efficient').text();
    }
    else if (index == 1) {
        name = $('#Yourself').text();
    }
    else if (index == 2) {
        name = $('#Inefficient').text();
    }
    return name;

}

function DrawChart(Type, val) {
    try {
        //loader.showloader();
        var session = common.checksession().value;
        if (session) {
            w2alert('Your session has expired. Please re-login.');
            window.location.href = "default.aspx";
            return;
        }

        var selectedType, selectedCompareType, month;
        var selectedMode, selectedColor, selectedColor2, selectedColor3;

        selectedMode = 'M';
        selectedCompareType = "CsP";      

        function OnError(request, status, error) {
            //loader.hideloader();
            alert(request.statusText);
        }

        function OnSuccess(data, status) {
            
        
            if (data != null) {
                selectedType = "Cost of Units Consumed ($)";
                jsonData = JSON.parse(data.d);

                var newdata = JSON.parse(data.d);
                var odata = [];
                odata.push({ Name: "TblChartType", Rows: newdata.TblChartType });                
                var ldata = {}
                ldata["Tables"] = odata.valueOf();
                var currentMonth = '';
                var previousMonth = '';
                var currentyear = '';
                var previousyear = '';
            
                function GetMonthName(monthNumber) {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    return months[monthNumber - 1];
                }
                
                var monthvalue = (new Date).getMonth() + 2;
                var month = GetMonthName(monthvalue);               
               
                if (newdata.Table != null) {
                    for (var i = 0; i < newdata.Table.length; i++) {
                        if (parseInt(monthvalue) == parseInt(newdata.Table[i].MOD)) {
                            currentyear = newdata.Table[i].YOD;
                            break;
                        }
                    }
                }
                if (newdata.Table1 != null) {
                    for (var i = 0; i < newdata.Table1.length; i++) {
                        if (parseInt(monthvalue) == parseInt(newdata.Table1[i].MOD)) {
                            previousyear = newdata.Table1[i].YOD;
                            break;
                        }
                    }
                }
                currentMonth = month + " " + currentyear;
                previousMonth = month + " " + previousyear;

                if (selectedMode == "M") {
                    seriesname1 = previousMonth == '' ? 'Usage' : previousMonth;
                    seriesname2 = currentMonth == '' ? 'Usage' : currentMonth;
                    selectedColor = "#7bab91";
                    jsonDataMe = newdata.Table1;
                }              
            }
            yaxis = selectedType;
            processed_json = new Array();
            processed_json2 = new Array();
           
            $.map(newdata.Table, function (obj, i) {
                processed_json2.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: "#c66c6c",
                    year: obj.YOD
                });
            });
            //  }
            $.map(jsonDataMe, function (obj, i) {
                processed_json.push({
                    y: obj.Consumed,
                    name: getMonthName(obj.MOD),
                    color: selectedColor,
                    year: obj.YOD
                })
            });
            
            var mon = monthvalue;

            //x-axis marker
            var monStartIndex = getMonthValue(processed_json[0].name);               
            if (parseInt(mon) > monStartIndex) { mon = parseInt(mon) - monStartIndex; }
            else if (parseInt(mon) == monStartIndex) { mon = 0; }
            else { mon = (parseInt(mon) + 12) - monStartIndex; }
            //x-axis marker
            
            BindhighChart2SeriesLine_energyReport('line', 'chartNeighboursDiv', "#7bab91", "#c66c6c", seriesname1, seriesname2, "CsP", mon);
            setLabelsValue(processed_json, processed_json2, 'M');

        }

        var param = { type: Type }
        
        $.ajax({
            type: "POST",
            url: "Energy_Report.aspx/LoadData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

    }
    catch (ex) {
        loader.hideloader();
        var msg = ex.message;
    }
}

function getMonthName(monthIndex) {
    if ($('#hdnLanguageCode').val() == 'EN' || $('#hdnLanguageCode').val()=="") {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";
    }
    else {
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Diciembre";
        return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";
    }

}
//jsonData1 for Month, jsonData2 for prev
function setLabelsValue(jsonData1, jsonData2, selectedMode) {
    try {

        var month = (new Date).getMonth() +2;
        var mnth = getMonthName(month);    

        var monthlyAvg, PreviousAvg, Monthavglabel, lblPreveslabel, zipAvg, utilityAvg;

        $.each(jsonData1, function (i, obj) {
            if (obj.name == mnth) {
                PreviousAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                lblPreveslabel = obj.name + " " + obj.year;
            }
        });

        $.each(jsonData2, function (i, obj) {
            if (obj.name == mnth) {
                monthlyAvg = (obj.y == null) ? null : parseFloat(obj.y).toFixed(2);
                Monthavglabel = obj.name + " " + obj.year;
            }
        });
             
        $("#lblMonthavg").text(monthlyAvg == null ? 'N/A' : "$" + monthlyAvg);
        $("#lblMonthavglabel").text(Monthavglabel + ":");           
        $("#lblPreves").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);
        $("#lblPreveslabel").text(lblPreveslabel + ":");
        $("#lblZipcodeavg").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);
        $("#lblUtilityavg").text(PreviousAvg == null ? 'N/A' : "$" + PreviousAvg);           
    }
    catch (ex) {
        console.log(ex.message);
    }
}

function getMonthValue(monthname) {
    var month1 = monthname;
    month1 = month1.toLowerCase();
    if ($('#hdnLanguageCode').val() == 'EN') {
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        month1 = months.indexOf(month1);
        return month1 + 1;
    }
    else {
        var months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        month1 = months.indexOf(month1);
        return month1 + 1;
    }
}


function FillData_HowYouCompare(data)
{
    processed_json = new Array();
    $.map(data, function (obj, i) {
        processed_json.push({
            name: getMonthName(obj.Month),
            y: obj.RankNo
        });
    });

    showindecimal = false;
  
}

function GetPieChartData()
{
    $.ajax({
        type: "POST",
        url: "Energy_Report.aspx/PieChartData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",       
        success: OnSuccess,
        error: OnError
    });
}

function OnError(request, status, error) {
    loader.hideloader();
    alert('Error!! ' + request.statusText);
}

function OnSuccess(data, status) {
    data = data.d;
    var result = $.parseJSON(data);    
    piechartdata_power = result.Table1;    
    BindCSMDonut_Power(piechartdata_power);
}

function BindCSMDonut_Power(data) {
    try {
        processed_json = new Array();
        $.map(data, function (obj, i) {
            processed_json.push({
                name: obj.Percentage,
                y: parseInt(obj.Duration),
                color: setcolors(i),
                title: obj.PowerQuarter
            });
        })
        BindPieChart_EnergyRep('divPieChart1', 'Quarterly Usage', processed_json);
    }
    catch (e) {
        console.log(e.message);
    }
}

function setcolors(usagevalue) {
    var color = '';
    if (usagevalue ==0) {
        color = '#79d1b5';
    }
    else if (usagevalue==1) {
        color = '#f1b274';
    }
    else if (usagevalue == 2) {
        color = '#ec625e';
    }
    else if (usagevalue == 3) {
        color = '#31afdb';
    }
    return color;

}
function BindPieChart_EnergyRep(id, axisname, processed_json) {

    try
    {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',

        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> %',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true,

                }
            },
            pie: {
                innerSize: 100
            }
        },
        tooltip: {
            formatter: function () {

                return '<b>' + this.point.series.name + ' : </b>' + this.point.name +'%'+ '<br><b>Duration: </b>'+this.point.title;
               
            }
                      
        },
        legend: {
            enabled: true
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: ''
        },


        series: [{

            name: axisname,
            data: processed_json
            
        }]
    });
    }
    catch(e)
    {
        console.log(e.message);
    }

}




