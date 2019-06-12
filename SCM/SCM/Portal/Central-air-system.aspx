<%@ Page Title="Thermostat" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true"
    CodeBehind="Central-air-system.aspx.cs" Inherits="CustomerPortal.Central_air_system" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  

    <script type="text/javascript">
        $(document).ready(function () {
            if ($('#<%=hdncool.ClientID %>').val() != '0') { $('#<%=txt_SliderCT.ClientID  %>').val($('#<%=hdncool.ClientID %>').val()); }
            if ($('#<%=hdnheat.ClientID %>').val() != '0') { $('#<%=txt_SliderHT.ClientID %>').val($('#<%=hdnheat.ClientID %>').val()); }

            $('#<%=divFanCoolOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('on');
                $(this).attr('class', 'Fan_Heat_On');
               
                $('#<%=divFanCoolAutoOnff.ClientID %>').attr('class', 'Fan_Auto_Off');
            });
            $('#<%=divFanCoolAutoOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('auto');
                $(this).attr('class', 'Fan_Auto_On');
                $('#<%=divFanCoolOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                //$('#<%=divFanCoolOnff.ClientID %>').attr('value', 'Off');
            });
            $('#<%=divFanHeatOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('on');
                $(this).attr('class', 'Fan_Heat_On');
             
                $('#<%=divFanHeatAutoOnff.ClientID %>').attr('class', 'Fan_Auto_Off');
            });
            $('#<%=divFanHeatAutoOnff.ClientID %>').click(function () {
                $('#<%=hdnFan.ClientID %>').val('auto');
                $(this).attr('class', 'Fan_Auto_On');
                $('#<%=divFanHeatOnff.ClientID %>').attr('class', 'Fan_Heat_Off');
                //$('#<%=divFanHeatOnff.ClientID %>').attr('value', 'Off');
            });

            $('#<%=divSystemHeatonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Heat_On') {
                    $(this).attr('class', 'System_Heat_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('heat');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystem_onoff.ClientID %>').attr('value', 'On');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                    $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                    $('#<%=lblHeatSliderText.ClientID %>').text('Heat:');
                    $('#<%=sliderHT.ClientID %>').show();
                    $('#<%=divSlideHeat.ClientID %>').show();
                    $('#<%=sliderCT.ClientID %>').hide();
                    $('#<%=divSlideCool.ClientID %>').hide();
                    $('#<%=divFanHeat.ClientID %>').show();
                    $('#<%=divFanCool.ClientID %>').hide();
                }
            });

            $('#<%=divSystemcoolonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Cool_On') {
                    $(this).attr('class', 'System_Cool_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('cool');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystem_onoff.ClientID %>').attr('value', 'On');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                    $('#<%=lblCoolSliderText.ClientID %>').text('Cool:');
                    $('#<%=sliderHT.ClientID %>').hide();
                    $('#<%=divSlideHeat.ClientID %>').hide();
                    $('#<%=sliderCT.ClientID %>').show();
                    $('#<%=divSlideCool.ClientID %>').hide();
                    $('#<%=divFanHeat.ClientID %>').hide();
                    $('#<%=divFanCool.ClientID %>').show();
                }
            });
            $('#<%=divSystemautoonoff.ClientID %>').click(function () {
                if ($(this).attr('class') != 'System_Auto_On') {
                    $(this).attr('class', 'System_Auto_On');
                    $('#<%=hdnHvacmode.ClientID %>').val('auto');
                    $('#<%=divSystem_onoff.ClientID %>').attr('class', 'System_On');
                    $('#<%=divSystem_onoff.ClientID %>').attr('value', 'On');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=lblCoolSliderText.ClientID %>').text('Min:');
                    $('#<%=lblHeatSliderText.ClientID %>').text('Max:');
                    $('#<%=sliderHT.ClientID %>').show();
                    $('#<%=divSlideHeat.ClientID %>').show();
                    $('#<%=sliderCT.ClientID %>').show();
                    $('#<%=divSlideCool.ClientID %>').hide();
                    $('#<%=divFanHeat.ClientID %>').show();
                    $('#<%=divFanCool.ClientID %>').hide();
                }

            });

            $('#<%=divSystem_onoff.ClientID %>').click(function () {
                if ($(this).attr('class') == 'System_On') {
                    makeoff();
                    $(this).attr('class', 'System_Off');
                    $(this).attr('value', 'Off');
                    $('#<%=hdnHvacmode.ClientID %>').val('off');
                    $('#<%=divSystemHeatonoff.ClientID %>').attr('class', 'System_Heat_Off');
                    $('#<%=divSystemcoolonoff.ClientID %>').attr('class', 'System_Cool_Off');
                    $('#<%=divSystemautoonoff.ClientID %>').attr('class', 'System_Auto_Off');
                }
            });

            $('#<%=btnSaveHold.ClientID %>').click(function () {
                $('#<%=hdncool.ClientID %>').val($('#<%=txtSlider_ValCT.ClientID %>').val());
                $('#<%=hdnheat.ClientID %>').val($('#<%=txtSlider_ValHT.ClientID %>').val());
            });

        });

        function makeoff() {
            $('#<%=sliderHT.ClientID %>').hide();
            $('#<%=divSlideHeat.ClientID %>').hide();
            $('#<%=sliderCT.ClientID %>').hide();
            $('#<%=divSlideCool.ClientID %>').hide();
            $('#<%=divFanHeat.ClientID %>').show();
            $('#<%=divFanCool.ClientID %>').hide();
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
            var result = Central_air_system.setPlug(name, status, $('#<%=ddlThermostat.ClientID %>').val()).value;
            if (result == 'OK') {
               // toastr.success('Your request was successfully received and processed.');
                alert('Your request was successfully received and processed.');
                if (status == 'off') { $(obj).attr('class', 'Plug_off_button'); }
                else { $(obj).attr('class', 'Plug_on_button'); }
            }
            else { alert('Request did not submitted.');
           // toastr.error('Request did not submitted.');
        }
        }
    </script>
    <style type="text/css">
  
        #Smart_leftPanel
        {
            float: left;
            width: 230px;
            margin-right: 10px;
        }

        ul#Smart_leftPanel_Menu
        {
            list-style-type: none;
        }

            ul#Smart_leftPanel_Menu li
            {
                padding: 10px 5px 10px 20px;
                border-bottom: 1px solid #dadada;
            }

                ul#Smart_leftPanel_Menu li:hover
                {
                    cursor: pointer;
                    background: #f0f0f0;
                }

                ul#Smart_leftPanel_Menu li.Active
                {
                    background: #f0f0f0 url("images/SmartHome/SettingIcon/Opened.png") no-repeat center right;
                }

                ul#Smart_leftPanel_Menu li img
                {
                    float: left;
                }

                ul#Smart_leftPanel_Menu li span
                {
                    float: left;
                    padding: 4px 0px 4px 10px;
                }

        #Smart_RightPanel
        {
            float: left;
            width: 1060px;
        }

        .SmartContainer
        {
            width: 525px;
            float: left;
        }

        .TableCellHeaderIcon
        {
            padding-top: 2px;
            float: left;
            margin-right: 3px;
        }

        /*** Sysytem Detail Classes   ***/
        .SmartContainer h4
        {
            margin: 10px;
        }

        input[type="text"]
        {
            border: 0px;
            border-radius: 0px;
            box-shadow: none;
            padding: 0px;
        }

        .SystemDetail_Temperature
        {
            height: 40px;
            background: #f0f0f0;
            text-align: center;
        }

        .Curnttmp
        {
            width: 300px;
            float: left;
            border-right: 1px solid #dadada;
            padding-top: 7px;
            padding-bottom: 4px;
        }

        .Settmp
        {
            width: 205px;
            float: left;
            font-weight: bold;
            padding-top: 11px;
        }

        .Curnttmp label
        {
            font-size: 12px;
            font-weight: bold;
            padding-top: 10px;
        }

        .Curnttmp span
        {
            font-size: 18px;
        }

        .Curnttmp select
        {
            width: 202px;
            margin-left: 10px;
        }

        .SystemSlider
        {
            margin: 20px auto 5px;
            width: 480px;
            height: 100px;
        }

        .smartplugsContainer
        {
            margin: 0px auto;
            width: 450px;
            padding-bottom: 10px;
        }

        #li_SmartPlugs_Container h3
        {
            margin: 10px 0px;
            padding: 10px 20px;
        }

        .smartplugsContainer label
        {
            padding-left: 10px;
        }

        .smartplugsContainer .btnCont
        {
            width: 150px;
            margin-bottom: 5px;
        }

        .SystemSlider input[type="text"]
        {
            border: none;
        }

        .SystemDropDown label
        {
            float: left;
            width: 120px;
            margin-left: 20px;
            clear: left;
            padding-top: 10px;
            margin-top: 10px;
        }

        .SystemDropDown select
        {
            float: left;
            width: 150px;
            margin-top: 10px;
        }
        /*** Sysytem Detail Classes  Ends  ***/

        /*** Preferences Classes   ***/

        .PreferenceLabel
        {
            float: left;
            width: 190px;
            padding: 7px 5px 6px 15px;
            font-weight: bold;
            margin-top: 10px;
            clear: left;
        }

        .PreferenceData
        {
            float: left;
            width: 285px;
            margin-top: 10px;
            padding: 2px 5px 2px 5px;
        }

        .ajax__multi_slider_default input[type="text"]
        {
            float: left;
            margin-right: 5px;
        }

        .ajax__multi_slider_default
        {
            float: left;
            width: 175px;
            height: 22px;
            margin-right: 10px;
        }

        .ajax__slider_h_rail, .inner_rail_horizontal
        {
            float: left;
            margin-right: 10px;
            margin-top: 5px;
        }

        .PreferenceData input[type="text"]
        {
            margin-left: 0px;
            border: 1px solid #B5B5B5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            padding: 4px 0px 4px 5px;
            width: 215px;
            font-size: .9em;
        }

        .PreferenceData select
        {
            padding: 5px;
            width: 222px;
        }

        .PreferenceData input[type="radio"]
        {
            float: left;
            margin: 6px 10px 5px 0px;
        }

        .PreferenceData label
        {
            float: left;
            width: 80px;
            margin: 5px 10px 5px 0px;
        }
        /*** Preferences Classes   ***/

        .modalBackground
        {
            background: rgba(0,0,0,.5);
        }

        .ContinueBtn
        {
            background: #333;
            color: #fff;
            padding: 5px 10px;
            border: 0px;
            margin: 10px auto;
        }

        .modalPopup
        {
            text-align: left;
            line-height: 20px;
        }

        .WeatherTodayContainer
        {
            height: auto;
            float: left;
        }

        .WeatherTodayContainer_left, .WeatherTodayContainer_Mid
        {
            width: 129px;
            float: left;
            border-right: 1px solid #dadada;
            text-align: center;
        }

        .WeatherTodayContainer_Right
        {
            width: 130px;
            float: left;
            text-align: center;
        }

        .WeatherTodayContainer h3
        {
            padding: 10px 0px 10px 30px;
            text-align: left;
            clear: both;
            margin: 0px;
        }

        .WindFlow
        {
            clear: left;
            padding: 10px;
            text-align: center;
            border-bottom: 1px solid #333;
        }

            .WindFlow span
            {
                padding-right: 10px;
            }

        .WeatherTodayContainer_header
        {
            font-size: 12px;
            font-weight: bold;
            padding: 12px 0px 11px;
            background: #f0f0f0;
        }

        .WeatherTodayContainer_Content
        {
            padding: 20px 0px;
            font-size: 18px;
            font-weight: bold;
        }

        .WeatherTodayContainer_Footer
        {
            font-size: 11px;
            padding: 5px;
            border-top: 1px solid #dadada;
            height: 45px;
            vertical-align: middle;
            display: table-cell;
            width: 129px;
            border-bottom: 1px solid #dadada;
        }

        .WeatherTodayContainer_header_ForeCast
        {
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

        .WeatherTodayContainer_Content_ForeCast
        {
            font-size: 14px;
        }

        .HighTemp
        {
            padding: 15px 10px 10px;
            font-weight: bold;
        }

        .WeatherTodayContainer_Footer_ForeCast
        {
            font-size: 11px;
            padding: 5px;
            border-top: 1px solid #dadada;
            height: 45px;
            vertical-align: middle;
            display: table-cell;
            width: 129px;
        }

        #tblWeather td
        {
            width: 150px;
        }

        .DayHeader
        {
            background-color: #006699;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            padding: 2px 0;
            text-align: center;
            width: 100%;
        }

        .Condition
        {
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            font-size: 16px;
        }

        .DateHeader
        {
            text-align: center;
            padding: 3px 0px;
            color: black;
        }

        .MinMaxLabel
        {
            float: left;
            width: 34px;
            padding-top: 6px;
            text-align: center;
        }

        .hideme
        {
            display: none;
        }

        .current_area ul li span.thermo_icon_tem_on
        {
            background: url("images/system_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_tem_off
        {
            background: url("images/system_off.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_fan_on
        {
            background: url("images/fan_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_fan_auto
        {
            background: url("images/auto.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_heat
        {
            background: url("images/heat_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_cool
        {
            background: url("images/cool_on.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_auto
        {
            background: url("images/auto.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_off
        {
            background: url("images/thermostat_off.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_status_on
        {
            background: url("images/led_green.png") no-repeat 90% top;
        }

        .current_area ul li span.thermo_icon_status_off
        {
            background: url("images/led_grey.png") no-repeat 90% top;
        }


        .System_Heat_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;  
            /*background: url("images/heat_on.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Heat_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;   
            /*background: url("images/heat_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Cool_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/cool_on.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Cool_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;     
            /*background: url("images/cool_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Auto_On
        {
           background:#fff;
           font-weight:bold;
           border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/auto.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Auto_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/auto_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            display: block;
            outline: medium none;
            padding: 5px 22px;
            /*background: url("images/system_on.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .System_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            display: block;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 22px;
            /*background: url("images/system_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Cool_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 22px;
            /*background: url("images/fan_on.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Cool_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            display: block;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 22px;
            /*background: url("images/fan_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Auto_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/auto.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Auto_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            font-size:13px;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/auto_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Heat_On
        {
            background:#fff;
             font-weight:bold;
            border: 2px solid #418e40;
            font-size:14px;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/fan_on.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }

        .Fan_Heat_Off
        {
            background:#DDD;
            font-weight:normal;
            border: 1px solid #838383;
            color: #838383;
            float: right;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 5px 20px;
            /*background: url("images/fan_off.png") no-repeat center 50%;
            text-indent: -999px;
            height: 48px;
            width: 58px;
            outline: none;
            text-decoration: none;*/
        }
        .system_select_btn ul li {
            height:auto !important;
        }
        .Plug_on_button
        {
            background: url("images/button-on.png") no-repeat left top;
            border: 1px solid #418e40;
            color: #418e40;
            float: left;
            margin: 0px 0 0;
            outline: medium none;
            padding: 15px 28px;
        }

        .Plug_off_button
        {
            background: url("images/button-off.png") no-repeat left top;
            border: 1px solid rgb(255, 48, 25);
            color: #f00;
            float: left;
            margin: 0px 0 0 0px;
            outline: medium none;
            padding: 15px 28px;
        }

        .DayContainer
        {
            border: thin solid silver;
            float: left;
            margin: 2px 7px 10px;
            padding: 0;
            width: 18%;
        }

        #divSlideHeat
        {
            width: 119px !important;
        }

        .Temp
        {
            padding: 4px 5px 1px;
        }

        .Lowtemp
        {
            padding: 0px 5px 3px;
        }
    </style>
        <script type="text/javascript" src="js/detect-zoom.js"></script>
    <script type="text/javascript">
        function refresh() {
            //var zoom = $('#zoom');
            var device = $('#device');
            //zoom.text(window.detectZoom.zoom().toFixed(2));
            //device.text(window.detectZoom.device().toFixed(2));
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
            height: 97%;
        }

        .inner_mid_section_box1 {
            height: 80% !important;
        }

            .inner_mid_section_box1 .right_top_box-1 {
                height: 85% !important;
                overflow: auto;
            }

        .inner_uni1 {
            height: 80% !important;
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

        .inner_mid_section_box1 .energy_mid_box {
            padding-bottom: 12px;
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
            overflow:visible !important;
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
                    <%= CustomerPortal.Translator.T("ML_SmartHome_Thermostat") %> <div style="float:right;margin-top:-14px;"><a href="smart-dishwasher.aspx" style="padding-top:12px; padding-bottom: 12px;" class="thermostate" globalize="ML_SmartHm_div_SH"><%= CustomerPortal.Translator.T("ML_SmartHm_div_SH") %></a></div></h1>
                  
               	 <div class="nav_left"> 
                	<ul>
                    	<li id="li_Smart_Details" class="icon_system_details active" onclick="javascript:ShowContainer(id);" ><a globalize="ML_CentralAirSystem_anchor_SystemDet"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_anchor_SystemDet") %></a></li>
                        <li id="li_Preferences" class="icon_preferences " onclick="javascript:ShowContainer(id);" ><a globalize="ML_SmartHome_Preferences"><%= CustomerPortal.Translator.T("ML_SmartHome_Preferences") %></a></li>             
                        <li id="li_SmartPlugs" class="icon_smart_plugs" onclick="javascript:ShowContainer(id);" ><a globalize="ML_SmartHome_SmartPlugs"><%= CustomerPortal.Translator.T("ML_SmartHome_SmartPlugs") %></a></li>
                       
                    </ul>
                </div>
                <div class="right_content_box">
                       <div class="current_area thermo_area">
                        <ul>
                           <li><span id="systemTop" runat="server" class="" ><asp:Label runat="server" globalize="ML_CentralAirSystem_Lbl_CurrentTemp" ID="lblCurrentTemperatureTop" Text=""></asp:Label></span>
                                <i globalize="ML_SmartDry_b_temp"><%= CustomerPortal.Translator.T("ML_SmartDry_b_temp") %></i>
                            </li>
                            
                            <li><span id="fantop" runat="server" class="" ></span>
                                <i globalize="ML_Central_air_system_Msg_FanMode"><%= CustomerPortal.Translator.T("ML_Central_air_system_Msg_FanMode") %></i>
                            </li>

                           <li><span id="systemModeTop" runat="server" class="" ></span>
                                <i globalize="ML_Central_air_system_Msg_CurrentMode"><%= CustomerPortal.Translator.T("ML_Central_air_system_Msg_CurrentMode") %></i>
                            </li>

                            <li><span id="systemstatusTop" runat="server" class="" ></span>
                                <i globalize="ML_Outage_Lbl_Status"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Status") %></i>
                             </li>

                        </ul>
                    </div>
                    <%--li_Smart_Details_Container--%>
                    <div id="li_Smart_Details_Container" class="hideme" style="display: block;">

                		<div class="thermostat_heading_box">
                            <span globalize="ML_SmartHome_Thermostat"> <%= CustomerPortal.Translator.T("ML_SmartHome_Thermostat") %></span> 
                            <p><asp:DropDownList globalize="ML_CentralAirSystem_DDL_Thermostat" ID="ddlThermostat" runat="server" OnSelectedIndexChanged="ddlThermostat_SelectedIndexChanged" AutoPostBack="true"></asp:DropDownList></p>                      
                        </div>
                        
                       <%-- <div class="current_temperature">
                           <span globalize="ML_CentralAirSystem_span_CurrentTemp"> Current Temperature  </span>:&nbsp;<asp:Label runat="server" globalize="ML_CentralAirSystem_Lbl_CurrentTemp" ID="lblCurrentTemperature" Text=""></asp:Label>
                        </div>--%>
                        <div class="clearfix">&nbsp;</div>
                        <div class="set_temperature">
                        
                        	<h5 globalize="ML_SmartCAS_b_ST">  <%= CustomerPortal.Translator.T("ML_SmartCAS_b_ST") %></h5>
                            <div id="sliderCT" runat="server" style="display: none; " class="set_temperature_box1">
                                <div class="MinMaxLabel">
                                    <asp:Label ID="lblStartcool" runat="server" Text="" globalize="ML_CentralAirSystem_Lbl_StartCool"></asp:Label></div>
                                <div class="thermomap">
                                    <asp:TextBox ID="txt_SliderCT" runat="server" globalize="ML_CentralAirSystem_Txt_StartCool" placeholder="Start Cool"></asp:TextBox></div>
                                <div class="MinMaxLabel">
                                    <asp:Label ID="lblendcool" runat="server" Text="" globalize="ML_CentralAirSystem_Lbl_EndCool"></asp:Label></div>
                                <div id="divSlideCool" style="display: none; float: left;margin-left: 3px;padding-top: 6px;width: 107px;" runat="server">
                                    <asp:Label ID="lblCoolSliderText" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_CoolSlider") %>' globalize="ML_CentralAirSystem_Lbl_CoolSlider"></asp:Label>
                                    <asp:TextBox ID="txtSlider_ValCT" runat="server" Width="26px" placeholder="Cool Slider" ReadOnly="true" globalize="ML_CentralAirSystem_Txt_EndSlider"></asp:TextBox><asp:Label
                                        ID="lblcelCool" runat="server" globalize=""></asp:Label></div>
                            </div>

                            <div id="sliderHT" runat="server" style="display: none;" class="set_temperature_box1">
                                    <div class="MinMaxLabel">
                                        <asp:Label ID="lblHeatstart" runat="server" Text="" globalize="ML_CentralAirSystem_Lbl_HeadStart"></asp:Label></div>
                                    <div class="thermomap">
                                        <asp:TextBox ID="txt_SliderHT" runat="server" globalize="ML_CentralAirSystem_Txt_SliderHT" placeholder="Slider HT"></asp:TextBox></div>
                                    <div class="MinMaxLabel">
                                        <asp:Label ID="lblHeatend" runat="server" Text="" globalize="ML_CentralAirSystem_Lbl_HeatEnd"></asp:Label></div>
                                    <div id="divSlideHeat" style="display: none; float: left; margin-left: 10px; padding-top: 6px;
                                        width:119px !important;" runat="server">
                                        <asp:Label ID="lblHeatSliderText" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_SliderText") %>' globalize="ML_CentralAirSystem_Lbl_SliderText"></asp:Label>
                                        <asp:TextBox ID="txtSlider_ValHT" runat="server" Width="33px" ReadOnly="true" placeholder="Val HT" globalize="ML_CentralAirSystem_Txt_ValHT"></asp:TextBox><asp:Label
                                            ID="lblcelHeat" runat="server" globalize="ML_CentralAirSystem_Lbl_CelHeat" ></asp:Label></div>
                                </div>

                        </div>   

                        <div class="system_select_btn">
                       	<span globalize="ML_CentralAirSystem_Lbl_System"><%# CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_System") %></span>
                        <ul>
                        	<li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_b_On") %>' id="divSystem_onoff" runat="server" globalize="ML_SmartCAS_b_On" /></li> <%--globalize="ML_SmartCAS_b_On"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Heat") %>' id="divSystemHeatonoff" runat="server" globalize="ML_CentralAirSystem_Button_Heat"/></li><%--globalize="ML_CentralAirSystem_Button_Heat"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Cool") %>' id="divSystemcoolonoff" runat="server" globalize="ML_CentralAirSystem_Button_Cool" /></li><%--globalize="ML_CentralAirSystem_Button_Cool"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartJac_div_Auto") %>' id="divSystemautoonoff" runat="server" globalize="ML_SmartJac_div_Auto" /></li><%--globalize="ML_SmartJac_div_Auto"--%>
                        </ul>
                        </div> 

                        <div class="system_select_btn" id="divFanCool" runat="server">
                       	    <span style="padding-right: 23px;" globalize="ML_CentralAirSystem_Lbl_Fan"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_Fan") %></span>
                        <ul>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_b_On") %>' id="divFanCoolOnff" runat="server" globalize="ML_SmartCAS_b_On"/></li><%--globalize="ML_SmartCAS_b_On"--%>
                            <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartJac_div_Auto") %>' id="divFanCoolAutoOnff" runat="server" globalize="ML_SmartJac_div_Auto" /></li><%--globalize="ML_SmartJac_div_Auto"--%>
                        </ul>
                       </div>
                       
                        <div class="system_select_btn" id="divFanHeat" runat="server">
                            <span style="padding-right: 23px;" globalize="ML_CentralAirSystem_Lbl_Fan"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_Fan") %></span>
                            <ul>
                                <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartCAS_b_On") %>' id="divFanHeatOnff" runat="server" globalize="ML_SmartCAS_b_On" /></li> <%--globalize="ML_SmartCAS_b_On"--%>
                                <li><input type="button" class="on_off_btn" value='<%# CustomerPortal.Translator.T("ML_SmartJac_div_Auto") %>' id="divFanHeatAutoOnff" runat="server" globalize="ML_SmartJac_div_Auto" /></li><%--globalize="ML_SmartJac_div_Auto"--%>
                            </ul>
                       </div>

                            <div class="system_hold_input" style="margin-top:-52px;">
                            	<span globalize="ML_CentralAirSystem_Lbl_Hold"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_Hold") %></span>
                                <p> <asp:DropDownList ID="ddlHold" runat="server">
                               
                                  
                                      </asp:DropDownList>
                               </p>    
                            </div>  
                        <div class="buttons_area" style="padding-top:1%;">
                    	    <asp:Button Text='<%# CustomerPortal.Translator.T("ML_SmartTv_b_Sleep") %>' globalize="ML_SmartTv_b_Sleep" ID="d" runat="server" Style="display: none; margin-right: 10px;" OnClientClick="return false;" />
                            <asp:Button Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_Button_Save") %>' globalize="ML_CentralAirSystem_Button_Save" ID="btnSaveHold" runat="server" OnClick="btnSaveHold_Click" CssClass="submit-button" />
                        </div>

                    </div>

                    <%--li_Preferences_Container--%>
                    <div id="li_Preferences_Container" class="hideme">

                        <div class="inner-right-sub">
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_ThermostatName"><%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_ThermostatName") %></div>
                                <div class="power-plan-selector preferences_input">
                                   <asp:Label ID="txtThermostatName" globalize="ML_CentralAirSystem_Txt_ThermostatName" placeholder="Thermostat Name"  runat="server" MaxLength="20"></asp:Label>
                                </div>
                            </div>
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_TEmp"> <%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_TEmp") %></div>
                               <div class="system_temperature">
                               		<asp:RadioButton ID="rdoTD1" globalize="ML_CentralAirSystem_RBtn_Celcius" runat="server" GroupName="TD" Text="Celsius" />
                                    <asp:RadioButton ID="rdoTD2" globalize="ML_CentralAirSystem_RBtn_Fahrenheit" runat="server" GroupName="TD" Text="Fahrenheit" />
                               </div>
                            </div>
                             <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_TimeFormat"> <%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_TimeFormat") %> </div>
                                <div class="system_temperature">
                               		<asp:RadioButton ID="rdoTF1" globalize="ML_CentralAirSystem_RBtn_12hr" runat="server" GroupName="TF" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_RBtn_12hr") %>' />
                                    <asp:RadioButton ID="rdoTF2" globalize="ML_CentralAirSystem_RBtn_24hr" runat="server" GroupName="TF" Text='<%# CustomerPortal.Translator.T("ML_CentralAirSystem_RBtn_24hr") %>' />
                               </div>
                            </div>
                            <div class="profile-details">
                                <div class="selector-text preferences_text" globalize="ML_CentralAirSystem_Lbl_HoldAcion"> <%= CustomerPortal.Translator.T("ML_CentralAirSystem_Lbl_HoldAcion") %></div>
                                <div class="power-plan-selector">
                                    <asp:DropDownList ID="ddlHoldAction" runat="server">
                                     
                                                                                
                                    </asp:DropDownList>
                                </div>
                            </div>                                   
						</div>
                        <div class="buttons_area">
                    	    <asp:Button Text='<%# CustomerPortal.Translator.T("ML_ACCOUNT_Button_Update") %>' ID="btnUpdatePreference" globalize="ML_ACCOUNT_Button_Update" runat="server" OnClick="Button3_Click" CssClass="submit-button" />
                            <img src="images/popup_close_btn.png" style="height: 24px; display: none;" onclick="javascript:CloseMe('li_Preferences');" />
                    	</div>
                        <ajaxToolkit:SliderExtender ID="SliderExtender2" Length="300" runat="server" BehaviorID="txt_SliderHT" TargetControlID="txt_SliderHT" BoundControlID="txtSlider_ValHT" Decimals="1" />
                        <ajaxToolkit:SliderExtender ID="SliderExtender3" Length="300" runat="server" BehaviorID="txt_SliderCT" TargetControlID="txt_SliderCT" BoundControlID="txtSlider_ValCT" Decimals="1" />
                    
                    </div>

                   
                    <div id="li_SmartPlugs_Container" class="hideme" >
                		<div class="system_select_btn smart_plugs">
                            <ul>
                                <li><div id="smartplugs" runat="server"></div></li>
                            </ul>
                            
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

            var curntdisplay = $("#" + id + "_Container").css('display');
            if (curntdisplay == "none");
            {
                $("#" + id).addClass("active");
                $("#" + id + "_Container").fadeIn('fast');
            }
        }
    </script>
</asp:Content>
