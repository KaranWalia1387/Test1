<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="rate-piechart.ascx.cs"
    Inherits="CustomerPortal.UserControls.rate_piechart" %>
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

        .currency ul li a {
            background:none;

        }

    /*  .GraphClockBG {
       
        height: 102px;
        width: 103px;
        z-index: 20000;
        margin-left: 141px;
        background-size: 100% 100%;
        position:relative;
    }*/

    svg
    {
        /*height:100px;*/
    }

    #DivPieChart
    {
        width:333px !important;
        height: 123px !Important;
        position: relative;
        left: 0px;
        top: 0px;
        background: url('images/GraphBGNew.png') no-repeat center 48%;
    }

        #DivPieChart svg rect
        {
            fill: none !important;
        }
</style>
<%--<script src="js/HighChart.js"></script>--%>
<script type="text/javascript">
    //4260,61,62 - START
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
            var dsAM = rate_piechart.PieDataAM().value;
            var dsPM = rate_piechart.PieDataPM().value;
            dtAM = dsAM.Tables[0];
            dtPM = dsPM.Tables[0];
            var rowsAM = dtAM.Rows.length;
            arrcolorAM = new Array(rowsAM); // for color array
            arrAM = new Array(rowsAM);
            arrAM[0] = new Array(2);
            arrAM[0][0] = 'Task';
            arrAM[0][1] = 'Hours per Day';
            var k = 0;
            for (var i = 1; i < rowsAM + 1 ; i++) {
                arrAM[i] = new Array(2);
                arrAM[i][0] = "$" + dtAM.Rows[k].Rate.toFixed(2).toString();
                arrAM[i][1] = 1;
                arrcolorAM[k] = dtAM.Rows[k].colour;
                k++;
            }

            $(dsAM.Tables[1].Rows).each(function () {
                amdiv = amdiv + '<span style="background-color:' + $(this)[0].colour + ' ; width: 12px; height: 12px; float: left; margin-left: 5px;' +
               'margin-top: 10px;"></span><span style="float: left; color:Black; margin-left: 5px;' +
                   'font-size: 10px; margin-top: 10px; font-weight: bold;">' + ' $ ' + parseFloat($(this)[0].Rate).toFixed(2) + '</span>';
            });
            $('#divam').html(amdiv);
            var rowsPM = dtPM.Rows.length;
            arrcolorPM = new Array(rowsPM); // for color array
            arrPM = new Array(rowsPM);
            arrPM[0] = new Array(2);
            arrPM[0][0] = 'Task';
            arrPM[0][1] = 'Hours per Day';
            var g = 0;
            var hourDiffPM = 0;
            for (var i = 1; i < rowsPM + 1; i++) {
                arrPM[i] = new Array(2);
                arrPM[i][0] = "$" + dtPM.Rows[g].Rate.toString();
                arrPM[i][1] = 1;
                arrcolorPM[g] = dtPM.Rows[g].colour;
                g++;
            }

            $(dsPM.Tables[1].Rows).each(function () {
                pmdiv = pmdiv + '<span style="background-color:' + $(this)[0].colour + ' ; width: 12px; height: 12px; float: left; margin-left: 5px;' +
               'margin-top: 10px;"></span><span style="float: left; color:Black; margin-left: 5px;' +
                   'font-size: 10px; margin-top: 10px; font-weight: bold;">' + ' $ ' + parseFloat($(this)[0].Rate).toFixed(2) + '</span>';
            });
            $('#divpm').html(pmdiv);
            cuurentTime = rate_piechart.GetAMPM().value;
            return (cuurentTime == 'AM') ? arrAM : arrPM;
            //4260,61,62 - END
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
            options = { chartArea: { left: 80, top: 30, 'width': '50%', 'height': '50%' }, height: '50px', title: '', colors: arrcolorAM, legend: { position: 'none' }, pieSliceText: "none", pieSliceBorderColor: "transparent", sliceVisibilityThreshold: 0.005 };//, pieSliceText: "none", chartArea: { left: 50 }, chartArea: { top: 40 } };
            BtnStateAM();
        }
        //if (flag == 2 ) {
        if (flag == 2 || cuurentTime == 'PM') {

            options = { chartArea: { left: 80, top: 30, 'width': '50%', 'height': '50%' }, height: '50px', title: '', colors: arrcolorPM, legend: { position: 'none' }, pieSliceText: "none", pieSliceBorderColor: "transparent", sliceVisibilityThreshold: 0.005 };//, pieSliceText: "none", chartArea: { left: 50 }, chartArea: { top: 40 } };
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
<div class="all_bill_box">
    <div class="white_div">
        <asp:HiddenField ID="hdnmax" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnmin" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnavg" runat="server" ClientIDMode="Static" />
        <asp:Label ID="lblRate" runat="server"></asp:Label>
        <div id="DivPieChart">
        </div>


        <div class="currency am_nav">
            <div id="divam">
            </div>
            <div id="divpm">
            </div>
            <ul style="float:right;">

                <li>
                    <a href="#" id="btnAM" onclick="AM()"><img id="imgSun" src="images/usage_sun_ro.png" /></a></li>
                <li>
                    <a href="#" id="btnPM" onclick="PM()"><img id="imgMoon" src="images/usage_moon.png" /></a></li>
            </ul>


        </div>
    </div>
</div>
