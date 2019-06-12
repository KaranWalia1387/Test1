<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RatePieChart.ascx.cs"
    Inherits="CustomerPortal.UserControls.RatePieChart" %>
<style type="text/css">
    .UsageRateImg
    {
        width: 220px;
        margin: 0px auto;
    }

        .UsageRateImg img
        {
            height: 29px;
            margin: 0px 10px;
            float: left;
        }

    .GraphClockBG
    {
        background: url('images/GraphBGNew.png') no-repeat;
        height: 101px;
        width: 103px;
        position: absolute;
        z-index: 20000;
        margin-left: 110px;
    }
</style>
<script type="text/javascript" src="www.google.com/jsapi"></script>
<script type="text/javascript" >



    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(drawRatePieChart);

    var cuurentTime = '';
    var dtAM;
    var dtPM;
    var arrAM;
    var arrPM;
    var amdiv = '';
    var pmdiv = '';

    var arrcolorAM;
    var arrcolorPM;

    var flag = 0;
    function getAMPMData() {
        if (flag == 0) {
            dtAM = RatePieChart.PieDataAM();
            dtPM = RatePieChart.PieDataPM();

            var rowsAM = dtAM.value.Rows.length;

            arrcolorAM = new Array(rowsAM); // for color array

            arrAM = new Array(rowsAM);
            arrAM[0] = new Array(2);
            arrAM[0][0] = 'Task';
            arrAM[0][1] = 'Hours per Day';
            var k = 0;
            for (var i = 1; i < rowsAM + 1; i++) {
                arrAM[i] = new Array(2);

                //arrAM[i][0] = (100 * parseFloat(dtAM.value.Rows[k].Rate.toString())).toFixed(0) + " ¢";
                arrAM[i][0] = "$" + dtAM.value.Rows[k].Rate.toString();
                arrAM[i][1] = dtAM.value.Rows[k].Percentage;
                arrcolorAM[k] = dtAM.value.Rows[k].Hexacolour.toString();

                amdiv = amdiv + '<span style="background-color: ' + dtAM.value.Rows[k].Hexacolour + '; width: 12px; height: 12px; float: left; margin-left: 5px;' +
                'margin-top: 25px;"></span><span style="float: left; color:Black; margin-left: 5px;' +
                    'font-size: 10px; margin-top: 25px; font-weight: bold;">' + '$ ' + dtAM.value.Rows[k].Rate.toFixed(2) + '</span>';

                k++;
            }

            $('#divam').html(amdiv);


            var rowsPM = dtPM.value.Rows.length;

            arrcolorPM = new Array(rowsPM); // for color array

            arrPM = new Array(rowsPM);
            arrPM[0] = new Array(2);
            arrPM[0][0] = 'Task';
            arrPM[0][1] = 'Hours per Day';
            var g = 0;
            for (var i = 1; i < rowsPM + 1; i++) {
                arrPM[i] = new Array(2);

                //arrPM[i][0] = (100 * parseFloat(dtPM.value.Rows[g].Rate.toString())).toFixed(0) + " ¢";
                arrPM[i][0] = "$" + dtPM.value.Rows[g].Rate.toString();
                arrPM[i][1] = dtPM.value.Rows[g].Percentage;
                arrcolorPM[g] = dtPM.value.Rows[g].Hexacolour.toString();

                pmdiv = pmdiv + '<span style="background-color: ' + dtPM.value.Rows[g].Hexacolour + '; width: 12px; height: 12px; float: left; margin-left: 5px;' +
                'margin-top: 25px;"></span><span style="float: left; color:Black ; margin-left: 5px;' +
                    'font-size: 10px; margin-top: 25px; font-weight: bold;">' + '$ ' + dtPM.value.Rows[g].Rate.toFixed(2) + '</span>';

                g++;
            }

            $('#divpm').html(pmdiv);
            cuurentTime = RatePieChart.GetAMPM().value;
            return (cuurentTime == 'AM') ? arrAM : arrPM;
            //return arrAM;
        }
        if (flag == 1) {
            $('#divam').html(amdiv);
            $('#divpm').html(pmdiv);
            return arrAM;
        }
        if (flag == 2) {
            $('#divam').html(amdiv);
            $('#divpm').html(pmdiv);
            return arrPM;
        }
    }

    function drawRatePieChart() {

        var arr = new Array();
        if (flag == 0) {
            arr = getAMPMData();
        }
        else {
            arr = getAMPMData();
        }

        //[['Task', 'Hours per Day'], ['Work', i], ['Eat', i], ['Commute', i], ['Watch TV', 5], ['Sleep', 2], ['hello', 3]]

        //arr = getAMPMData();

        var options;
        var data = google.visualization.arrayToDataTable(arr);

        //if (flag == 1 || flag == 0 ) {
        if (flag == 1 || cuurentTime == 'AM') {
            options = { chartArea: { width: '100%', height: '80%' }, height: '100', title: '', colors: arrcolorAM, legend: { position: 'none' }, pieSliceText: "none", chartArea: { left: 50 }, chartArea: { top: 40 } };
            BtnStateAM();
        }
        //if (flag == 2 ) {
        if (flag == 2 || cuurentTime == 'PM') {
            options = { chartArea: { width: '100%', height: '100%' }, height: '100', title: '', colors: arrcolorPM, legend: { position: 'none' }, pieSliceText: "none", chartArea: { left: 50 }, chartArea: { top: 40 } };
            BtnStatePM();
        }
        // var options = { title: '', colors: ['#0166ff', '#ffff01', '#feff99', '#8dc258'] };
        var chart = new google.visualization.PieChart(document.getElementById('DivPieChart'));
        chart.draw(data, options);

    }

    function BtnStateAM() {
        $('#divam').show();
        $('#divpm').hide();
        $("#btnAM").addClass('TabBtns_ro').removeClass('TabBtns');
        $("#btnPM").addClass('TabBtns').removeClass('TabBtns_ro');
        $("#imgMoon").attr('src', 'images/usage_moon.png');
        $("#imgSun").attr('src', 'images/usage_sun_ro.png');

    }

    function BtnStatePM() {
        $('#divpm').show();
        $('#divam').hide();
        $("#btnAM").addClass('TabBtns').removeClass('TabBtns_ro');
        $("#btnPM").addClass('TabBtns_ro').removeClass('TabBtns');
        $("#imgMoon").attr('src', 'images/usage_moon_ro.png');
        $("#imgSun").attr('src', 'images/usage_sun.png');
    }

    function AM() {
        cuurentTime = 'AM';
        BtnStateAM();
        flag = 1;
        drawRatePieChart();
    }

    function PM() {
        cuurentTime = 'PM';
        BtnStatePM();
        flag = 2;
        drawRatePieChart();
    }
</script>
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="BillRatesIcon">
            &nbsp;
        </div>
        <div class="TableCellHeaderTitle">
            Rates
        </div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div class="single">
            <br />
            <b>&nbsp;&nbsp;Current Time:</b> &nbsp;<label><%=CrTm%></label>&nbsp;&nbsp;<br />
            &nbsp;&nbsp;<b>Current Rate:</b> &nbsp;<label><%=CrRt%>
            </label>
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <%-- <div class="GraphClockBG" style="margin-top: 20px">
            &nbsp;</div>
        <div id="DivPieChart" style="text-align: center; margin-top: 0px; font-size: 1em;
            font-weight: bold;">--%>
    </div>
    <div class="TableCellContainerFooter TierCurrentRate2">
      <b>Current Plan :</b> Hourly
    </div>    
</div>

