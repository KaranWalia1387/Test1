<%@ Page Title="Thermostat" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Central_air_system.aspx.cs" Inherits="CustomerPortal.Central_air_system_ladwp" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="js/weather-data_ladwp.js" type="text/javascript"></script>
    <script src="js/Thermostat.js" type="text/javascript"></script>
    <link href="css/thermostat.css" rel="stylesheet" />
    <script type="text/javascript">
        $(document).ready(function () {
            if ($("#ddlThermostat option").length > 0) {
               
            }
            else {
                $("#editthermostat").hide();
              
                $("#deletethermostat").hide();
                $("#ddlThermostat option:selected").text();
            }
            call($("#ddlThermostat option:selected").val().split(",")[1]);
            if ($('#<%=hdncool.ClientID %>').val() != '0') { $('#<%=txt_SliderCT.ClientID  %>').val($('#<%=hdncool.ClientID %>').val()); }
            if ($('#<%=hdnheat.ClientID %>').val() != '0') { $('#<%=txt_SliderHT.ClientID %>').val($('#<%=hdnheat.ClientID %>').val()); }

            $('#<%=divFanHeatOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('02');
                $(this).attr('class', 'Fan_Heat_On')
                $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_Off');
            });
            $('#<%=divFanHeatAutoOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('00');
                $(this).attr('class', 'Fan_Auto_On');
                $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
            });

            $('#<%=divSystemHeatonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Heat_On') {
                    $(this).attr('class', 'System_Heat_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('01');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystem_onoff.ClientID %>').attr('value', 'On');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                    $('#<%=lblHeatSliderText.ClientID %>').text('Heat:');
                    $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                    $('#<%=sliderHT.ClientID %>').show();
                    $('#<%=divSlideHeat.ClientID %>').show();
                    $('#<%=sliderCT.ClientID %>').hide();
                    $('#<%=divSlideCool.ClientID %>').hide();
                }
            });

            $('#<%=divSystemcoolonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Cool_On') {
                    $(this).attr('class', 'System_Cool_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('02');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystem_onoff.ClientID %>').attr('value', 'On');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                    $('#<%=lblCoolSliderText.ClientID %>').text('Cool:');
                    $('#<%=sliderHT.ClientID %>').hide();
                    $('#<%=divSlideHeat.ClientID %>').hide();
                    $('#<%=sliderCT.ClientID %>').show();
                    $('#<%=divSlideCool.ClientID %>').show();
                }
            });


            $('#<%=divSystemautoonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Auto_On') {
                    $(this).attr('class', 'System_Auto_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('03');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=lblCoolSliderText.ClientID %>').text('Min:');
                    $('#<%=lblHeatSliderText.ClientID %>').text('Max:');
                    $('#<%=sliderHT.ClientID %>').hide();
                    $('#<%=divSlideHeat.ClientID %>').hide();
                    $('#<%=sliderCT.ClientID %>').hide();
                    $('#<%=divSlideCool.ClientID %>').hide();
                }
            });

            $('#<%=divSystem_onoff.ClientID %>').click(function () {
                if ($(this).attr('class') == 'System_On') {
                    makeoff();
                    $(this).attr('class', 'System_Off');
                    $(this).attr('value', 'Off');
                    $('#<%=hdnHvacmode.ClientID %>').val('00');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                }
            });

            $('#<%=btnSaveHold.ClientID %>').click(function () {
                $('#<%=hdncool.ClientID %>').val($('#<%=txtSlider_ValCT.ClientID %>').val());
                $('#<%=hdnheat.ClientID %>').val($('#<%=txtSlider_ValHT.ClientID %>').val());
            });

            $("#ddlThermostat").change(function () {
                BindProgram();
                call($("#ddlThermostat option:selected").val().split(",")[1]);
            });
            $("#btnSaveHold").click(function () {
                setdata($("#ddlThermostat option:selected").val().split(",")[1])
            });


            //Edit link click
            $("#editthermostat").click(function () {
                $("#btnUpdate").val('Update');
                $("#txtMacId").val($("#ddlThermostat option:selected").val().split(',')[1]);
                $("#hdnthermostatid").val($("#ddlThermostat").val());
                //}
                $("#txtMacId").text(($("#ddlThermostat option:selected").text()));
            });


            //Add link click
            $('#addthermostat').click(function () {
                $("#btnUpdate").val('Add');
                $("#hdnthermostatid").val('0');
                $("#txtMacId").val('');
            });


            //Delete link click
            $("#deletethermostat").click(function () {
                var res = confirm('Are you sure you want to delete Thermostat?');
                if (res) {
                    var result = Central_air_system_ladwp.GetSetSmartApplianceAccount("4", $("#ddlThermostat").val().split(",")[0], $("#ddlThermostat option:selected").val().split(",")[1]).value;
                  alert(result.Rows[0].Message);
                  
                    if (result.Rows[0].Status == '1') {
                       
                        $("#ddlThermostat option[value='" + $("#ddlThermostat").val() + "']").remove();
                        if (!($("#ddlThermostat option").length > 0)) {
                            $("#editthermostat").hide(); $("#deletethermostat").hide();
                            $('#ProgramContainer').html('');
                        }
                        else {
                            BindProgram();
                            call($("#ddlThermostat option:selected").val().split(",")[1]);
                        }
                      
                    }
                }
            });

            //Update button click
            $("#btnUpdate").click(function () {
                if (ValidatePageFields('updateMacID')) {
                    var result = Central_air_system_ladwp.GetSetSmartApplianceAccount($("#hdnthermostatid").val() == 0 ? "1" : "3", $("#hdnthermostatid").val().split(",")[0], $("#txtMacId").val()).value;
                    alert(result.Rows[0].Message);
                    if (result.Rows[0].Status == '1') {
                        if ($("#hdnthermostatid").val() == 0) {
                            $("#ddlThermostat").append('<option value=' + result.Rows[0].ThermoStateID + '>' + $("#txtMacId").val() + '</option>');
                            $("#deletethermostat").show();
                            $("#editthermostat").show();
                           
                        }
                        else {
                            $("#ddlThermostat option:selected").text($("#txtMacId").val());
                        }
                        $("#ddlThermostat").val(result.Rows[0].ThermoStateID);
                        call($("#txtMacId").val());
                        BindProgram();
                        $("#btnclosepopup").trigger('click');
                    }
                }
            });
            $("#btnCancel").click(function () {
                $("#txtMacId").val('');
            });

        });

        function makeoff() {
            $('#<%=sliderHT.ClientID %>').hide();
            $('#<%=divSlideHeat.ClientID %>').hide();
            $('#<%=sliderCT.ClientID %>').hide();
            $('#<%=divSlideCool.ClientID %>').hide();
            $('#<%=divFanHeat.ClientID %>').show();
        }

        function saveplug(obj) {
            var name = obj.id.split('|')[1];
            var status = '';
            if ($(obj).attr('class') == "Plug_on_button") {
                status = "off";
            }
            else {
                status = "on";
            }
            var result = Central_air_system_ladwp.setPlug(name, status, $('#<%=ddlThermostat.ClientID %>').val()).value;
            if (result == 'OK') {
               // toastr.success('Your request was successfully received and processed.');
                alert('Your request was successfully received and processed.');
                if (status == 'off') { $(obj).attr('class', 'Plug_off_button'); }
                else { $(obj).attr('class', 'Plug_on_button'); }
            }
            else {
                alert('Request did not submitted.');
                //toastr.error('Request did not submitted.');
            }
        }
        function call(id) {
           
            $.ajax({
                type: "POST",
                url: "Central_air_system.aspx/GetdeviceDetail",
                data: '{id: "' + id + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                async: false,

                failure: function (response) {
                    return response.d;
                }
            });
        }

        function setdata(id) {
           
            var covalue = $('#<%=hdnHvacmode.ClientID %>').val();
            var cfvalue = $('#<%=hdnFan.ClientID %>').val();
            var chvalue = $('input[name=ch]:checked').val();
            var cevalue = $('input[name=ce]:checked').val();
            var ct = $('input[name=ce]:checked').val();
            if (covalue == '03') {
                ct = '62,85'
            }
            else {
                ct = parseInt($('#<%=txtSlider_ValCT.ClientID%>').val()) + ',' + parseInt($('#<%=txtSlider_ValHT.ClientID%>').val());
            }
            var request =
                {
                    mac: id,
                    cmds: {
                        CT: ct,
                        CO: covalue,
                        CF: cfvalue,
                        CH: chvalue,
                        CE: cevalue,
                        CU: '00'
                    }
                }
        
            var result = Central_air_system_ladwp.SetdeviceDetail(JSON.stringify(request)).value;
            OnSetSuccess(result);
           
        }
        function OnSetSuccess(response) {
          
            if (response == '') {
               alert('Your request was successfully recieved and will be reflected soon.');
                call($("#ddlThermostat option:selected").val().split(",")[1]);

            }
            else {
              
                alert(response);
            }

        }

        function OnSuccess(response) {
            try {
                var json = $.parseJSON(response.d);
                if (json.TStatRecord.TStatDataSet.TD.FMODE != undefined) {
                    switch (json.TStatRecord.TStatDataSet.TD.FMODE) {
                        case "0":
                            $('#fan').html('Auto'); $('#imgfan').attr('src', 'images/auto_c.png');
                            $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                            $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_On');
                            $('#<%=hdnFan.ClientID %>').val('00');
                            break;
                        case "1":
                            $('#fan').html('Auto/Circulate'); $('#imgfan').attr('src', 'images/auto_c.png');
                            $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                            $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_On');
                            $('#<%=hdnFan.ClientID %>').val('00');
                            break;
                        case "2":
                            $('#fan').html('On'); $('#imgfan').attr('src', 'images/fan-image.jpg');
                            $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_On');
                            $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_Off');
                            $('#<%=hdnFan.ClientID %>').val('02');
                            break;
                        case "-1": $('#fan').html('Off'); $('#imgfan').attr('src', 'images/Fan - Grey.png');
                            $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                            $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_On');
                            $('#<%=hdnFan.ClientID %>').val('00');
                            break;
                        default: $('#fan').html('Off'); $('#imgfan').attr('src', 'images/Fan - Grey.png');
                            $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                            $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_On');
                            $('#<%=hdnFan.ClientID %>').val('00');
                            break;
                    }
                }
                if (json.TStatRecord.TStatDataSet.TD.LED != undefined) {
                    switch (json.TStatRecord.TStatDataSet.TD.LED) {
                        case "1": $('#LStatus').html('Green'); $('#imgled').attr('src', 'images/LED - Green.png'); break;
                        case "2": $('#LStatus').html('Amber'); $('#imgled').attr('src', 'images/LED - Amber.png'); break;
                        case "4": $('#LStatus').html('Red'); $('#imgled').attr('src', 'images/LED - Red.png'); break;
                        default: $('#LStatus').html('N/A'); $('#imgled').removeAttr('src'); $('#LEDColor').css("background-color", "#FFFFFF"); $('#LEDColor').css("display", "block"); break;
                    }
                }
                if (json.TStatRecord.TStatDataSet.TD.CMODE != undefined) {
                    switch (json.TStatRecord.TStatDataSet.TD.CMODE) {
                        case "0":
                            $('#CThermoState').html("Off"); $('#imgCThermoState').attr('src', 'images/LED-Grey.png');
                            $('#<%=hdnHvacmode.ClientID %>').val('00');
                            $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_Off');
                            $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                            $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                            $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                            $('#<%=sliderHT.ClientID %>').hide();
                            $('#<%=sliderCT.ClientID %>').hide();
                            break;
                        case "1":
                            $('#CThermoState').html("Heat"); $('#imgCThermoState').attr('src', 'images/Heating-amber.png');
                            $('#<%=hdnHvacmode.ClientID %>').val('01');
                            $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                            $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                            $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_On');
                            $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                            $('#<%=sliderHT.ClientID %>').show();
                            $('#<%=sliderCT.ClientID %>').hide();
                            break;
                        case "2":
                            $('#CThermoState').html("Cool"); $('#imgCThermoState').attr('src', 'images/thermostat-target-mode-image.jpg');
                            $('#<%=hdnHvacmode.ClientID %>').val('02');
                            $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                            $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_On');
                            $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                            $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                            $('#<%=sliderHT.ClientID %>').hide();
                            $('#<%=sliderCT.ClientID %>').show();
                            break;
                        case "3":
                            $('#CThermoState').html("Auto"); $('#imgCThermoState').attr('src', 'images/auto.png');
                            $('#<%=hdnHvacmode.ClientID %>').val('03');
                            $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                            $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                            $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                            $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_On');
                            $('#<%=sliderHT.ClientID %>').hide();
                            $('#<%=sliderCT.ClientID %>').hide();
                            break;
                    }
                }
                if (json.TStatRecord.TStatDataSet.TD.TMODE != undefined) {
                    switch (json.TStatRecord.TStatDataSet.TD.TMODE) {
                        case "0": $('#CThermoStateTarget').html("Off"); $('#Thermotarget').attr('src', 'images/LED-Grey.png'); break;
                        case "1": $('#CThermoStateTarget').html("Heat"); $('#Thermotarget').attr('src', 'images/Heating-amber.png'); break;
                        case "2": $('#CThermoStateTarget').html("Cool"); $('#Thermotarget').attr('src', 'images/thermostat-target-mode-image.jpg'); break;
                        case "3": $('#CThermoStateTarget').html("Auto"); $('#Thermotarget').attr('src', 'images/auto_c.png'); break;
                    }
                }
                $('#temp').html(json.TStatRecord.TStatDataSet.TD.ZTEMP + "°F");
                if (json.TStatRecord.TStatDataSet.TD.CMODE == "1") {
                    $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                    $('#TTemp').html(json.TStatRecord.TStatDataSet.TD.HEAT + "°F");
                } else if (json.TStatRecord.TStatDataSet.TD.CMODE == "2") {
                    $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                    $('#TTemp').html(json.TStatRecord.TStatDataSet.TD.COOL + "°F");

                }
                else { $('#imgtargetTemp').attr('src', 'images/Target Temperature - Grey.png'); $('#TTemp').html("No Data"); }

                $('#<%=txt_SliderHT.ClientID%>').val(json.TStatRecord.TStatDataSet.TD.HEAT);
                $('#<%=txt_SliderCT.ClientID%>').val(json.TStatRecord.TStatDataSet.TD.COOL);
                return response.d;
            }
            catch (e) {
                console.log(e.message);
            }
        }
    </script>

    <style type="text/css">
        #Smart_leftPanel {
            float: left;
            width: 230px;
            margin-right: 10px;
        }

        ul#Smart_leftPanel_Menu {
            list-style-type: none;
        }

            ul#Smart_leftPanel_Menu li {
                padding: 10px 5px 10px 20px;
                border-bottom: 1px solid #dadada;
            }

                ul#Smart_leftPanel_Menu li:hover {
                    cursor: pointer;
                    background: #f0f0f0;
                }

                ul#Smart_leftPanel_Menu li.Active {
                    background: #f0f0f0 url("images/SmartHome/SettingIcon/Opened.png") no-repeat center right;
                }

                ul#Smart_leftPanel_Menu li img {
                    float: left;
                }

                ul#Smart_leftPanel_Menu li span {
                    float: left;
                    padding: 4px 0px 4px 10px;
                }

        #Smart_RightPanel {
            float: left;
            width: 1060px;
        }

        .SmartContainer {
            width: 525px;
            float: left;
        }

        .TableCellHeaderIcon {
            padding-top: 2px;
            float: left;
            margin-right: 3px;
        }

        /*** Sysytem Detail Classes   ***/
        .SmartContainer h4 {
            margin: 10px;
        }

        input[type="text"] {
            border: 0px;
            border-radius: 0px;
            box-shadow: none;
            padding: 0px;
        }

        .SystemDetail_Temperature {
            height: 40px;
            background: #f0f0f0;
            text-align: center;
        }

        .Curnttmp {
            width: 300px;
            float: left;
            border-right: 1px solid #dadada;
            padding-top: 7px;
            padding-bottom: 4px;
        }

        .Settmp {
            width: 205px;
            float: left;
            font-weight: bold;
            padding-top: 11px;
        }

        .Curnttmp label {
            font-size: 12px;
            font-weight: bold;
            padding-top: 10px;
        }

        .Curnttmp span {
            font-size: 18px;
        }

        .Curnttmp select {
            width: 202px;
            margin-left: 10px;
        }

        .SystemSlider {
            margin: 20px auto 5px;
            width: 480px;
            height: 100px;
        }

        .smartplugsContainer {
            margin: 0px auto;
            width: 450px;
            padding-bottom: 10px;
        }

        #li_SmartPlugs_Container h3 {
            margin: 10px 0px;
            padding: 10px 20px;
        }

        .smartplugsContainer label {
            padding-left: 10px;
        }

        .smartplugsContainer .btnCont {
            width: 150px;
            margin-bottom: 5px;
        }

        .SystemSlider input[type="text"] {
            border: none;
        }

        .SystemDropDown label {
            float: left;
            width: 120px;
            margin-left: 20px;
            clear: left;
            padding-top: 10px;
            margin-top: 10px;
        }

        .SystemDropDown select {
            float: left;
            width: 150px;
            margin-top: 10px;
        }
        /*** Sysytem Detail Classes  Ends  ***/

        /*** Preferences Classes   ***/

        .PreferenceLabel {
            float: left;
            width: 190px;
            padding: 7px 5px 6px 15px;
            font-weight: bold;
            margin-top: 10px;
            clear: left;
        }

        .PreferenceData {
            float: left;
            width: 285px;
            margin-top: 10px;
            padding: 2px 5px 2px 5px;
        }

        .ajax__multi_slider_default input[type="text"] {
            float: left;
            margin-right: 5px;
        }

        .ajax__multi_slider_default {
            float: left;
            width: 175px;
            height: 22px;
            margin-right: 10px;
        }

        .ajax__slider_h_rail, .inner_rail_horizontal {
            float: left;
            margin-right: 10px;
            margin-top: 5px;
        }

        .PreferenceData input[type="text"] {
            margin-left: 0px;
            border: 1px solid #B5B5B5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            padding: 4px 0px 4px 5px;
            width: 215px;
            font-size: .9em;
        }

        .PreferenceData select {
            padding: 5px;
            width: 222px;
        }

        .PreferenceData input[type="radio"] {
            float: left;
            margin: 6px 10px 5px 0px;
        }

        .PreferenceData label {
            float: left;
            width: 80px;
            margin: 5px 10px 5px 0px;
        }
        /*** Preferences Classes   ***/

        .modalBackground {
            background: rgba(0,0,0,.5);
        }

        .ContinueBtn {
            background: #333;
            color: #fff;
            padding: 5px 10px;
            border: 0px;
            margin: 10px auto;
        }

        .modalPopup {
            text-align: left;
            line-height: 20px;
        }

        .WeatherTodayContainer {
            height: auto;
            float: left;
        }

        .WeatherTodayContainer_left, .WeatherTodayContainer_Mid {
            width: 129px;
            float: left;
            border-right: 1px solid #dadada;
            text-align: center;
        }

        .WeatherTodayContainer_Right {
            width: 130px;
            float: left;
            text-align: center;
        }

        .WeatherTodayContainer h3 {
            padding: 10px 0px 10px 30px;
            text-align: left;
            clear: both;
            margin: 0px;
        }

        .WindFlow {
            clear: left;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #333;
        }

            .WindFlow span {
                padding-right: 10px;
            }

        .WeatherTodayContainer_header {
            font-size: 12px;
            font-weight: bold;
            padding: 12px 0px 11px;
            background: #f0f0f0;
        }

        .WeatherTodayContainer_Content {
            padding: 20px 0px;
            font-size: 18px;
            font-weight: bold;
        }

        .WeatherTodayContainer_Footer {
            font-size: 11px;
            padding: 5px;
            border-top: 1px solid #dadada;
            height: 45px;
            vertical-align: middle;
            display: table-cell;
            width: 129px;
            border-bottom: 1px solid #dadada;
        }

        .WeatherTodayContainer_header_ForeCast {
            font-size: 12px;
            font-weight: bold;
            padding: 0px 5px 0px;
            height: 38px;
            display: table-cell;
            vertical-align: middle;
            background: #f0f0f0;
            width: 119px;
            border-top: 1px solid #dadada;
        }

        .WeatherTodayContainer_Content_ForeCast {
            font-size: 14px;
        }

        .HighTemp {
            padding: 15px 10px 10px;
            font-weight: bold;
        }

        .WeatherTodayContainer_Footer_ForeCast {
            font-size: 11px;
            padding: 5px;
            border-top: 1px solid #dadada;
            height: 45px;
            vertical-align: middle;
            display: table-cell;
            width: 129px;
        }

        #tblWeather td {
            width: 150px;
        }

        .DayHeader {
            background-color: #006699;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            padding: 2px 0;
            text-align: center;
            width: 100%;
        }

        .Condition {
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            font-size: 16px;
        }

        .DateHeader {
            text-align: center;
            padding: 3px 0px;
            color: black;
        }

        .MinMaxLabel {
            float: left;
            width: 42px;
            padding-top: 6px;
            text-align: center;
        }

        .hideme {
            display: none;
        }

        .current_area ul li span.thermo_icon_tem_on {
            background: url("images/system_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_tem_off {
            background: url("images/system_off.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_fan_on {
            background: url("images/fan_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_fan_auto {
            background: url("images/auto.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_heat {
            background: url("images/heat_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_cool {
            background: url("images/cool_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_auto {
            background: url("images/auto.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_off {
            background: url("images/thermostat_off.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_status_on {
            background: url("images/led_green.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_status_off {
            background: url("images/led_grey.png") no-repeat 90% top;
        }


        .System_Heat_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
           
        }

        .System_Heat_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
         
        }

        .System_Cool_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .System_Cool_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
       
        }

        .System_Auto_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .System_Auto_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .System_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            display: block;
            outline: medium none;
            padding: 5px 22px;
          
        }

        .System_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            display: block;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 22px;
          
        }

        .Fan_Cool_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 22px;
           
        }

        .Fan_Cool_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            display: block;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 22px;
       
        }

        .Fan_Auto_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
        
        }

        .Fan_Auto_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            font-size: 13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .Fan_Heat_On {
            background: #fff;
            font-weight: bold;
            border: 2px solid #418e40;
            font-size: 14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .Fan_Heat_Off {
            background: #DDD;
            font-weight: normal;
            border: 1px solid #838383;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
          
        }

        .Plug_on_button {
            background: url("images/button-on.png") no-repeat left top;
            border: 1px solid #418e40;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 15px 28px;
        }

        .Plug_off_button {
            background: url("images/button-off.png") no-repeat left top;
            border: 1px solid rgb(255, 48, 25);
            color: #f00;
            float: left;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 15px 28px;
        }

        .DayContainer {
            border: thin solid silver;
            float: left;
            margin: 2px 7px 10px;
            padding: 0;
            width: 18%;
        }

        #divSlideHeat {
            width: 119px !important;
        }

        .Temp {
            padding: 4px 5px 1px;
        }

        .Lowtemp {
            padding: 0px 5px 3px;
        }

        .current_area ul li {
            width: 16.6%;
            padding: 7px 1%;
            position: relative;
            height: 108px !important;
        }

            .current_area ul li:first-child {
                padding: 7px 2%;
            }

        .thermo_area ul li span {
            padding-left: 0;
        }

        .current_area ul li span {
            font-size: 14px;
            text-align: center;
            height: auto;

            line-height:14px;
        }

        .current_area ul li strong {
            margin: auto;
            display: table;
            width: 100%;
        }

        .current_area ul li img {
            width: 55px;
            height: 55px;
            display: block;
            margin: auto;
        }

        a#editthermostat {
            margin-left: 12px;
        }

        .thermostat_heading_box select {
            margin-top: 4px;
        }

        input[type=radio], input[type=checkbox] {
            margin: 2px 7px 0;
            line-height: normal;
            vertical-align: top;
        }

        #addthermostat, #deletethermostat, #editthermostat {            
            border: medium none;
            border-radius: 2px;
            color: #f0f0f0;
            font-size: 13px;
            height: 26px;
            margin-left: 10px;
            padding: 3px 17px;
            text-align: center;
        }

            #addthermostat:hover, #deletethermostat:hover, #editthermostat:hover {
                text-decoration: none;
                background: #7c7c7c;
            }

        .popup_area .popup_area_home .popup_left_content_area_home {
            width: 32%;
        }

        .table-hover > tbody > tr:hover {
            background: none;
        }

        .table-hover > tbody > tr td:hover {
            background-color: #CBCBCB !important;
            color: #fff;
        }

        table.programtable tr:first-child td:hover, table.programtable tr td:hover:nth-child(1) {
            background-color: #069 !important;
            cursor: auto;
        }

        /*.popup_area {
            max-width: 26%;
        }*/
        .popup_area {
    height: auto;
    max-width: 100%;
    padding: 0 !important;
}
        .popup_right_content_area_home select {
            width: 87% !important;
        }
        @media (min-width:768px) and (max-width:1024px) {
            .current_area ul li span {
                font-size: 12px;
                height: auto;
                text-align: center;
            }
        }
        /* Edited by prashant starts for iphone*/
        @media (min-width:300px) and (max-width:767px) {
            .current_area > ul > li {
                height: 108px !important;
                padding: 7px 1%;
                position: relative;
                width: 33.33%;
            }
            .current_area > ul > li > span {
                font-size: 12px;
                height: auto;
                line-height: 12px;
                text-align: center;
            }
            .thermostat_heading_box span {
                float: left;
                width: 20%;
            }
            .thermostat_heading_box > a {
                margin-left: 5px !important;
                padding: 3px 10px !important;
            }
            #txtMacId
            {
                width:92%;
            }
            #updateMacID > .modal-header
            {
                padding:5px 10px;
            }
            #li_Smart_Details_Container
            {
                float:left;
                width:100%;
            }
            .MinMaxLabel {
                float: left;
                padding-top: 6px;
                text-align: center;
                width: 10%;
            }
            .thermomap {
                float: left;
                width: 55%;
            }
            .MinMaxLabel {
                float: left;
                padding-top: 6px;
                text-align: center;
                width: 10%;
            }
            .set_temperature_box1 {
                float: left;
                width: 100%;
            }
            #ContentPlaceHolder1_txtSlider_ValCT
            {
                margin-top:1px;
            }
            #ContentPlaceHolder1_divSlideCool {
                display: block;
                float: left;
                margin-left: 3px;
                padding-top: 6px;
                width: 20% !important;
            }
           .set_temperature_box1 > #ContentPlaceHolder1_divSlideHeat
            {
                width:20% !important;
            }
            .hideme {
                float: left;
                width: 100%;
            }
            .system_select_btn ul {
    float: left;
    list-style: outside none none;
    margin: 0;
    padding: 0 15px;
    width: 100%;
}
            .system_select_btn ul li {
    border-bottom: 0 none;
    float: left;
    padding-bottom: 0;
    padding-left: 10px;
    width: 25%;
}
            .system_select_btn span {
    display: block;
    float: left;
    margin: 0 0 5px;
    padding: 6px 0 0 17px;
}
            .system_hold_input span {
    float: left;
    margin-top: 0;
    width: 40%;
}
.system_hold_input p {
    float: left;
    width: 60%;
}
.weather_forecast_box {
    border-top: 2px solid #cacaca;
    clear: both;
    padding: 0 10px;
}
#divWeather
{
    float:left;
    width:100%;
}
.DayContainer {
    float: left;
    width: 44% !important;
    margin:10px;
}
.time
{
    width:100% !important;

}
.temperature
{
    width:100% !important;
}
        }
    </style>
    <script type="text/javascript" src="js/detect-zoom.js"></script>
    <script type="text/javascript">
        function refresh() {
          
            if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
                $("#device").addClass('inner_uni1');
                $("#device").removeClass('inner_mid_section_box1');
                $("#device").removeClass('inner_uni3');
                $("#device").removeClass('inner_uni5');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
                $("#device").removeClass('inner_uni1');
                $("#device").removeClass('inner_uni3');
                $("#device").removeClass('inner_uni5');
                $("#device").addClass('inner_mid_section_box1');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
                $("#device").removeClass('inner_uni1');
                $("#device").removeClass('inner_mid_section_box1');
                $("#device").removeClass('inner_uni5');
                $("#device").addClass('inner_uni3');
            }
            else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
                $("#device").removeClass('inner_uni1');
                $("#device").removeClass('inner_mid_section_box1');
                $("#device").removeClass('inner_uni3');
                $("#device").addClass('inner_uni5');
            }
            else {
                $("#device").removeClass('inner_uni1');
                $("#device").removeClass('inner_mid_section_box1');
                $("#device").removeClass('inner_uni3');
                $("#device").removeClass('inner_uni5');
            }

        }
        $("document").ready(function () {
            refresh();
            $(window).on('resize', refresh);
        });
    </script>
    <style type="text/css">
        .energy_mid_box .right_content_box {
            height: 97% !important;
        }

        .inner_mid_section_box1 {
            height: 80% !important;
        }

            .inner_mid_section_box1 .right_top_box-1 {
                height: 85% !important;
                overflow: auto;
            }

        .inner_uni1 {
            height: 82% !important;
            overflow: auto;
        }

        .inner_uni5 {
            height: 76% !important;
            overflow: auto;
        }

        .inner_uni3 {
            height: 78% !important;
            overflow: auto;
        }

        .inner_uni1 .setting_save_box {
            padding-top: 13px;
        }

        .inner_mid_section_box1 .setting_save_box {
            padding-top: 15px;
        }


        .inner_uni3 .setting_save_box {
            padding-top: 9px;
        }

        .inner_uni3 .energy_mid_box {
            padding-bottom: 36px;
        }

        .right_content_box_1 {
            height: 87%;
            overflow: auto;
            position: relative;
        }

        .inner_mid_section_box1 .right_content_box_1 {
            height: 84% !important;
        }

        @media (min-width:1400px) {
            .right_content_box_1 {
                height: 89% !important;
            }
        }

        .inner_uni1 .right_content_box_1 {
            height: 87% !important;
        }

        .inner_uni3 .right_content_box_1 {
            height: 87% !important;
        }

        .inner_uni5 .right_content_box_1 {
            height: 87% !important;
        }

        .energy_mid_box .right_content_box {
            overflow:auto !important;
        }
        @media (min-width:300px) and (max-width:767px) {
            .energy_mid_box .right_content_box {
                height: 88% !important;
            }
        }
        
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
    <asp:HiddenField ID="hdncool" runat="server" Value="0" />
    <asp:HiddenField ID="hdnheat" runat="server" Value="0" />
    <asp:HiddenField ID="hdnHvacmode" runat="server" Value="" />
    <asp:HiddenField ID="hdnFan" runat="server" Value="" />
    <asp:HiddenField ID="hdnisCelcius" runat="server" />
    <input type="hidden" class="activeli_list" value="sh" />

    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" ScriptMode="Release"></asp:ScriptManager>

    <section class="inner_mid_section" id="device">
    <div class="container inner-mid-container">
        	<div class="energy_mid_box">
            	<h1 globalize="ML_SmartHome_Thermostat" > 
                    <img src="images/thermostat_img.png" style="padding-right:7px; margin-top: -3px; float: left;" class="thermo_head"> 
                    <span class="head_icon_flat icon_thermodeg"></span>
                    <%= CustomerPortal.Translator.T("ML_SmartHome_Thermostat") %>
                     <div style="float:right;margin-top:-14px;"><a href="smart-dishwasher.aspx" style="padding-top:12px; padding-bottom: 12px;" class="thermostate" globalize="ML_SmartHm_div_SH"><%= CustomerPortal.Translator.T("ML_SmartHm_div_SH") %></a></div>

            	</h1>
                  
               	 <div class="nav_left" style="display:block;"> 
                	<ul>
                    	<li id="li_Smart_Details" class="icon_system_details active" onclick="javascript:ShowContainer(id);" ><a globalize="ML_CentralAirSystem_anchor_SystemDet"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_anchor_SystemDet") %></a></li>
                     <li id="li_Programs" class="programs icon_dr_programes" onclick="javascript:ShowContainer(id);" ><a globalize="ML_Programs_Navigation_Programs"><%= CustomerPortal.Translator.T("ML_Programs_Navigation_Programs") %></a></li>
                   </ul>
                </div>
                <div class="right_content_box">
         
                     <div id="inline1" class="thermo_area current_area">
        <ul>
            <li>
                
                <span>Temperature</span>    
                 <img src="images/temprature-image.jpg" />           
                <strong id="temp"></strong>
            </li>

            <li>
                <span>Fan Mode</span>
                <img id="imgfan" src="images/fan-image.jpg" />
                <strong id="fan"></strong>
            </li>

            <li>
                <span>Current Mode</span>
                <img id="imgCThermoState" src="images/current-thermostat-mode-image.jpg" />
                <strong id="CThermoState"></strong>
            </li>

            <li>
                <span>Target Mode</span>
                <img id="Thermotarget" src="images/thermostat-target-mode-image.jpg" />
                <strong id="CThermoStateTarget"></strong>
            </li>

            <li>
                <span>Target Temperature</span>
                <img id="imgtargetTemp" src="images/target-temprature-image.jpg" />
                <strong id="TTemp"></strong>
            </li>

            <li>
                <span>LED Status</span>
                <img id="imgled" src="images/LED - Green.png" />
                <div id="LEDColor" style="height: 96px; margin-left: 30px; margin-right: 15px; width: 100px; height: 100px; border-radius: 50px; font-size: 20px; color: #fff; line-height: 100px; text-align: center; display: none; }"></div>

                <strong id="LStatus"></strong>
            </li>

        </ul>
    </div>
                    <div class="thermostat_heading_box">
                            <span globalize="ML_SmartHome_Thermostat"> <%= CustomerPortal.Translator.T("ML_SmartHome_Thermostat") %></span> 
                            <p><asp:DropDownList globalize="ML_CentralAirSystem_DDL_Thermostat" ID="ddlThermostat" runat="server" ClientIDMode="Static">
                             </asp:DropDownList>
                            </p>
                        <a href="#" id="addthermostat" data-target="#change-pwd-divPopup" globalize="ML_CentralAirSystem_Btn_Add" data-toggle="modal"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Btn_Add") %></a> 
                        <a href="#" id="editthermostat" data-target="#change-pwd-divPopup" globalize="ML_CentralAirSystem_Btn_Edit"  data-toggle="modal"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Btn_Edit") %></a>   
                         <a href="#" id="deletethermostat" globalize="ML_CentralAirSystem_Btn_Delete" ><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Btn_Delete") %></a>                
                        </div>
                    <div id="li_Smart_Details_Container" class="hideme" style="display: block;">

                        <div class="clearfix">&nbsp;</div>
                        <div class="set_temperature">
                        
                        	<h5 globalize="ML_SmartCAS_b_ST"> <%= CustomerPortal.Translator.T("ML_SmartCAS_b_ST") %></h5>
                            <div id="sliderCT" runat="server" style="display: block; " class="set_temperature_box1">
                                <div class="MinMaxLabel">
                                    <asp:Label ID="lblStartcool" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_StartCool") %>' globalize="ML_CentralAirSystem_Lbl_StartCool"></asp:Label></div>
                                <div class="thermomap">
                                    <asp:TextBox ID="txt_SliderCT" runat="server" globalize="ML_CentralAirSystem_Txt_StartCool" placeholder="Start Cool"></asp:TextBox></div>
                                <div class="MinMaxLabel">
                                    <asp:Label ID="lblendcool" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_EndCool") %>' globalize="ML_CentralAirSystem_Lbl_EndCool"></asp:Label></div>
                                <div id="divSlideCool" style="display: block; float: left;margin-left: 3px;padding-top: 6px;width: 107px;" runat="server">
                                    <asp:Label ID="lblCoolSliderText" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_CoolSlider") %>' globalize="ML_CentralAirSystem_Lbl_CoolSlider"></asp:Label>
                                    <asp:TextBox ID="txtSlider_ValCT" runat="server" Width="26px" placeholder="Cool Slider" ReadOnly="true" globalize="ML_CentralAirSystem_Txt_EndSlider"></asp:TextBox><asp:Label
                                        ID="lblcelCool" runat="server" globalize=""></asp:Label></div>
                            </div>

                            <div id="sliderHT" runat="server" style="display: block;" class="set_temperature_box1">
                                    <div class="MinMaxLabel">
                                        <asp:Label ID="lblHeatstart" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_HeadStart") %>' globalize="ML_CentralAirSystem_Lbl_HeadStart"></asp:Label></div>
                                    <div class="thermomap">
                                        <asp:TextBox ID="txt_SliderHT" runat="server" globalize="ML_CentralAirSystem_Txt_SliderHT" placeholder="Slider HT"></asp:TextBox></div>
                                    <div class="MinMaxLabel">
                                        <asp:Label ID="lblHeatend" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_HeatEnd") %>' globalize="ML_CentralAirSystem_Lbl_HeatEnd"></asp:Label></div>
                                    <div id="divSlideHeat" style="display: block; float: left; margin-left: 10px; padding-top: 6px;
                                        width:119px" runat="server">
                                        <asp:Label ID="lblHeatSliderText" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_SliderText") %>' globalize="ML_CentralAirSystem_Lbl_SliderText"></asp:Label>
                                        <asp:TextBox ID="txtSlider_ValHT" runat="server" Width="33px" ReadOnly="true" placeholder="Val HT" globalize="ML_CentralAirSystem_Txt_ValHT"></asp:TextBox><asp:Label
                                            ID="lblcelHeat" runat="server" globalize="ML_CentralAirSystem_Lbl_CelHeat" ></asp:Label></div>
                                </div>

                        </div>   

                        <div class="system_select_btn">
                       	<span globalize="ML_CentralAirSystem_Lbl_System"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_System") %></span>
                        <ul>
                        	<li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_b_On") %>'  id="divSystem_onoff" globalize="ML_SmartCAS_b_On" runat="server" /></li> <%--globalize="ML_SmartCAS_b_On"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_Thermostat_btn_SystemHeating") %>'  id="divSystemHeatonoff" globalize="ML_Thermostat_btn_SystemHeating" runat="server" /></li><%--globalize="ML_CentralAirSystem_Button_Heat"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Cool") %>'  id="divSystemcoolonoff" globalize="ML_CentralAirSystem_Button_Cool" runat="server" /></li><%--globalize="ML_CentralAirSystem_Button_Cool"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartJac_div_Auto") %>'  id="divSystemautoonoff" globalize="ML_SmartJac_div_Auto" runat="server" /></li>
                        </ul>
                        </div> 
                        <div class="system_select_btn" id="divFanHeat" runat="server">
                            <span style="padding-right: 23px;" globalize="ML_CentralAirSystem_Lbl_Fan"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_Fan") %></span>
                            <ul>
                                <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_Thermostat_btn_FanOn") %>' id="divFanHeatOnff" globalize="ML_Thermostat_btn_FanOn" runat="server" /></li> <%--globalize="ML_SmartCAS_b_On"--%>
                                <li><input type="button" class="on_off_btn" value="Auto" id="divFanHeatAutoOnff" globalize="Retrieving data. Wait a few seconds and try to cut or copy again." runat="server" /></li><%--globalize="ML_SmartJac_div_Auto"--%>
                            </ul>
                       </div>

                          <div>
                        <div style="clear:both"></div>
                            <div class="system_hold_input" style="width: 98%;">
                            	<span globalize="ML_CentralAirSystem_Lbl_Hold"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_Hold") %></span>
                                <p>
                                   <input type="radio" value="01" name="ch" />Enable
                                    <input type="radio" value="00" name="ch" checked="checked"  />Disable
                                       
                               </p>    
                            </div>  
                         <div class="system_hold_input" style="width: 98%;">
                            	<span >Save energy mode</span>
                                <p>
                                   <input type="radio" value="01" name="ce" />Enable
                                    <input type="radio" value="00" name="ce" checked="checked"  />Disable
                                       
                               </p>    
                            </div>  </div>
                        <div class="buttons_area" style="padding-top:1%;">
                    	    <asp:Button Text='<%# CustomerPortal.Translator.T("ML_SmartTv_b_Sleep") %>' globalize="ML_SmartTv_b_Sleep" ID="d" runat="server" Style="display: none; margin-right: 10px;" OnClientClick="return false;" />
                            <asp:Button Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Save") %>' globalize="ML_CentralAirSystem_Button_Save" ID="btnSaveHold" runat="server" CssClass="submit-button" ClientIDMode="Static" OnClientClick="return false" />
                        </div>

                        </div>
                  

                    

                    <%--li_Preferences_Container--%>
                    <div id="li_Preferences_Container" class="hideme">

                        <div class="inner-right-sub">
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_ThermostatName"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_ThermostatName") %></div>
                                <div class="power-plan-selector preferences_input">
                                   <asp:TextBox ID="txtThermostatName" globalize="ML_CentralAirSystem_Txt_ThermostatName" placeholder="Thermostat Name"  runat="server" MaxLength="20"></asp:TextBox>
                                </div>
                            </div>
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_TEmp"> Temperature Display:</div>
                               <div class="system_temperature">
                               		<asp:RadioButton ID="rdoTD1" globalize="ML_CentralAirSystem_RBtn_Celcius" runat="server" GroupName="TD" Text="Celsius" />
                                    <asp:RadioButton ID="rdoTD2" globalize="ML_CentralAirSystem_RBtn_Fahrenheit" runat="server" GroupName="TD" Text="Fahrenheit" />
                               </div>
                            </div>
                             <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_TimeFormat"> Time Format: </div>
                                <div class="system_temperature">
                               		<asp:RadioButton ID="rdoTF1" globalize="ML_CentralAirSystem_RBtn_12hr" runat="server" GroupName="TF" Text="12 Hour" />
                                    <asp:RadioButton ID="rdoTF2" globalize="ML_CentralAirSystem_RBtn_24hr" runat="server" GroupName="TF" Text="24 Hour" />
                               </div>
                            </div>
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_HoldAcion"> Hold Action:</div>
                                <div class="power-plan-selector">
                                    <asp:DropDownList ID="ddlHoldAction" runat="server">
                                        <asp:ListItem Text="Hold 4 Hours" Value="useEndTime" globalize="ML_SmartHome_Hold4Hours"></asp:ListItem>
                                        <asp:ListItem Text="Hold 2 Hours" Value="useEndTime2hour" globalize="ML_SmartHome_Hold2Hours"></asp:ListItem>
                                        <asp:ListItem Text="Until Next Transition" Value="nextPeriod" globalize="ML_SmartHome_UntilNextTransition"></asp:ListItem>
                                        <asp:ListItem Text="Indefinite" Value="indefinite" globalize="ML_SmartHome_Indefinite"></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>                                   
						</div>
                        <div class="buttons_area">
                    	    <asp:Button Text='<%# CustomerPortal.Translator.T("ML_ACCOUNT_Button_Update") %>' ID="btnUpdatePreference" globalize="ML_ACCOUNT_Button_Update" runat="server" OnClick="Button3_Click" CssClass="submit-button" />
                            <img src="images/popup_close_btn.png" style="height: 24px; display: none;" onclick="javascript:CloseMe('li_Preferences');" />
                    	</div>
                        <ajaxToolkit:SliderExtender ID="SliderExtender2" Minimum="45" Maximum="120" Length="300" runat="server" BehaviorID="txt_SliderHT" TargetControlID="txt_SliderHT" BoundControlID="txtSlider_ValHT"  />
                        <ajaxToolkit:SliderExtender ID="SliderExtender3" Minimum="0" Maximum="100" Length="300" runat="server" BehaviorID="txt_SliderCT" TargetControlID="txt_SliderCT" BoundControlID="txtSlider_ValCT" />
                    
                    </div>

                    <%--li_SmartPlugs_Container--%>
                    <div id="li_SmartPlugs_Container" class="hideme" >
                		<div class="system_select_btn smart_plugs">
                            <ul>
                                <li><div id="smartplugs" runat="server"></div></li>
                            </ul>
                            
                       </div>
                        
                    </div>
                    <div id="li_Programs_Container" class="hideme" >
                    <div id="ProgramContainer">

                    </div>
                        <div>
                            <asp:Button Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Save") %>' globalize="ML_CentralAirSystem_Button_Save" ID="btnUpdateProgram" runat="server" CssClass="submit-button" ClientIDMode="Static" OnClientClick="return false" />
                        </div>
                    </div>

                </div><!-- End .right_content_box -->
        </div>
    </div>
</section>
    <!-- End Section -->

    <div style="width: 1300px; text-align: left;">
        <div id="Smart_leftPanel">
        </div>
        <div id="Smart_RightPanel">
        </div>
    </div>

    <asp:Panel runat="server" CssClass="modalPopup" ID="programmaticPopup" Style="display: none; width: 406px; padding: 10px; background: #fff;">
        <asp:Panel runat="Server" ID="programmaticPopupDragHandle" Style="border-bottom: solid 1px
    Gray; font-weight: bold; font-size: 14px; color: Black; text-align: left; padding-bottom: 5px; margin-bottom: 10px;"
            globalize="ML_CentralAirSystem_Lbl_AuthorizeThermoStat">
           <%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_AuthorizeThermoStat") %>
        </asp:Panel>
        <asp:Label ID="lblkey" runat="server" globalize="ML_CentralAirSystem_Lbl_Key"></asp:Label><br />
        <center>
            <asp:Button ID="btnContinue" runat="server" Text="Continue" CssClass="ContinueBtn"
                OnClick="btnContinue_Click" globalize="ML_CentralAirSystem_Button_Continue" /></center>
    </asp:Panel>
    <asp:Button runat="server" ID="hiddenTargetControlForModalPopup" Style="display: none" />
    <ajaxToolkit:ModalPopupExtender ID="ModalPopupExtender" runat="server" PopupControlID="programmaticPopup"
        BackgroundCssClass="modalBackground" DropShadow="true" TargetControlID="hiddenTargetControlForModalPopup" />
    <script type="text/javascript">
        function ShowContainer(id) {
            $(".hideme").each(function () {
                $(this).hide();
                $(".MenuList").removeClass("Active");
            });

            $("#li_Smart_Details").removeClass("active");
            $("#li_Preferences").removeClass("active");
            $("#li_SmartPlugs").removeClass("active");
            $("#li_Programs").removeClass("active");
            var curntdisplay = $("#" + id + "_Container").css('display');
            if (curntdisplay == "none");
            {
                $("#" + id).addClass("active");
                $("#" + id + "_Container").fadeIn('fast');
            }
        }
    </script>
    <div class="modal fade" id="change-pwd-divPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" id="updateMacID">
                <div class="modal-header">
                    <button type="button" id="btnclosepopup" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="myModalLabel">Add / Update MAC Id </h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div class="popup_left_content_area_home">MAC ID </div>
                        <div class="popup_right_content_area_home">
                            <input id="txtMacId" maxlength="16" title="MAC ID" globalize="ML_Thermostat_div_MACID" mandatory="1" />
                        </div>

                        <div style="clear: both;"></div>


                        <div class="bottom_area_home">
                            <input id="btnUpdate" type="button" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Submit") %>' globalize="ML_Master_btn_Submit" />
                            <input id="btnCancel" type="button" class="cancel-button" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Clear") %>' globalize="ML_Master_btn_Clear" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a id="lnkProgramtrigger" href="#" data-target="#change-program-popup" data-toggle="modal" style="display: none;"></a>
    <div class="modal fade" id="change-program-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" id="Div2">
                <div class="modal-header">
                    <button type="button" id="btnCloseProgram" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>
                    <h4 class="modal-title" id="H1">Update Program</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div class="popup_left_content_area_home">Time: </div>
                        <div class="popup_right_content_area_home">
                            <select id="ddltime">
                                <option value="00">00</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                            </select>
                        </div>
                        <div class="clearfix"></div>
                        <div class="popup_left_content_area_home">Cool: </div>
                        <div class="popup_right_content_area_home">
                            <input id="txtProgramCoolTemp" type="text" onkeypress="return IsNumeric(event);" maxlength="3" /><span> °F</span>
                        </div>
                         <div class="clearfix"></div>
                        <div class="popup_left_content_area_home">Heat: </div>
                        <div class="popup_right_content_area_home">
                            <input id="txtProgramHeatTemp" type="text" onkeypress="return IsNumeric(event);" maxlength="3" /><span> °F</span>
                        </div>
                       <div class="clearfix"></div>
                        <div class="bottom_area_home">
                            <input id="btnSubmitProgram" type="button" class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Master_btn_Submit") %>' globalize="ML_Master_btn_Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="hdnthermostatid" />
</asp:Content>
