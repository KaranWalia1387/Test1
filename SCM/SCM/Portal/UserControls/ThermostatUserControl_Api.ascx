<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ThermostatUserControl_Api.ascx.cs" Inherits="CustomerPortal.UserControls.ThermostatUserControl_Api" %>

<asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
<asp:HiddenField ID="hdncool" runat="server" Value="0" />
<asp:HiddenField ID="hdnheat" runat="server" Value="0" />
<asp:HiddenField ID="hdnHvacmode" runat="server" Value="" />
<asp:HiddenField ID="hdnFan" runat="server" Value="" />
<asp:HiddenField ID="hdnisCelcius" runat="server" />
<style type="text/css">
    .thermo_temp {
        width: 100%;
        float: left;
        padding: 17px 10px 0px;
        text-align:center;
    }

        .thermo_temp .temp_thermo_heading {
               font-size: 40px;
                color: #30afda;
                font-weight: bold;
        }
    .smarthome-area .image-listing ul li {
            width:33%;
            margin:0;
            text-align:center;
            padding: 8px 0px;
        }
.smarthome-area .image-listing ul li span {
    font-size:14px;
    padding-top:25px;
    color:#5f5f63;
    display:block;

}
    .button_thermo, .thermo_icon_status_on {
        background: #94D60A;
        padding: 3px 0%;
        font-size: 16px;
        color: #fff !important;
        width: 100%;
        display: block;
        text-align: center;
        margin-top: 17px;
        display:none;
    }

    #ddlThermostat {
           position: absolute;
            top: 8px;
            width: 100px;
            right: 2px;
            height: 21px;
            font-size: 11px;
    }

    .thermo_temp_1 {
        width:100%;
        float: left;
        padding: 5px 10px;
    }

    .thermo_temp ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

        .thermo_temp ul li.auto_thermo span, .thermo_temp ul li.cool_thermo span {
            display: block;
            background: #ececec;
            padding: 8px 7px 8px 19px;
            width: 99px;
            font-size: 16px;
        }

    li.auto_thermo {
        background: url("images/auto_thermo_ico.png") no-repeat center 9px;
           display: block;
    }
        li.auto_thermo > span {
                display: block;
            }

     li.auto_thermo.auto_thermo_inactive {
        background: url("images/auto_thermo_ico_off.png") no-repeat center 9px;
         display: block;
    }
        li.auto_thermo.auto_thermo_inactive span {
           color: #969696 !important;
            }


    li.cool_thermo {
        background: url("images/cool_thermo_ico.png") no-repeat center 9px;
        display: block;
    }

     li.cool_thermo.cool_thermo_inactive {
        background: url("images/cool_thermo_ico_off.png") no-repeat center 9px;
         display: block;
    }
        li.cool_thermo.cool_thermo_inactive span {
           color: #969696 !important;
            }

    .text_thermo {
        font-size: 12px;
        /* line-height: 9px; */
        display: block;
        margin-bottom: 13px;
         width: 30% !important;
        margin-top: -5px;
    }
     li.cool_thermo > span {
                display: block;
            }

     li.fan1_thermo {
        background: url("images/fan_smart_home_box.png") no-repeat center 9px;
         display: block;
    }

    li.fan1_thermo.fan1_thermo_inactive {
        background: url("images/fan_smart_home_box_off.png") no-repeat center 9px;
         display: block;
    }
        li.fan1_thermo.fan1_thermo_inactive span {
           color: #969696 !important;
            }


    
</style>

<script type="text/javascript">
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
    $(document).ready(function () {
        try {
            
            call($("#ddlThermostat option:selected").val().split(",")[1]);
        }
        catch (e) { }

        $("#ddlThermostat").change(function () {
            try {
              
                call($("#ddlThermostat option:selected").val().split(",")[1]);
            }
            catch (e) { }
        });
    });

  

    function OnSuccess(response) {
        try {
            var json = $.parseJSON(response.d);
            var fanS = '';
            var LEDS = '';
            if (json.DataInput != undefined) {
                if (json.DataInput.Message != undefined && json.TStatRecord == undefined) {
                    $('#thermo1').hide();
                    $('#thermo2').hide();
                    $('#thermo3').css('display', 'block');
                    $('#thermo3').html(json.DataInput.Message);
                    return;
                }
            }
            if (json.TStatRecord.TStatDataSet.TD.FMODE != undefined) {
                $('#thermo1').show();
                $('#thermo2').show();
                $('#thermo3').css('display', 'none');
                switch (json.TStatRecord.TStatDataSet.TD.FMODE) {
                    case "0":
                        $('#<%=fantop.ClientID %>').attr('class', 'thermo_icon_fan_auto');
                        $('#<%=fantop.ClientID %>').html('Auto');
                        $('#<%=fantop.ClientID %>').attr('title', 'Auto');
                        break;
                    case "1":
                        $('#<%=fantop.ClientID %>').attr('class', 'thermo_icon_fan_auto');
                        $('#<%=fantop.ClientID %>').html('Auto');
                        $('#<%=fantop.ClientID %>').attr('title', 'Auto');
                        break;
                    case "2":
                        $('#<%=fantop.ClientID %>').attr('class', 'thermo_icon_fan_auto');
                        $('#<%=fantop.ClientID %>').html('On');
                        $('#<%=fantop.ClientID %>').attr('title', 'On');
                        break;
                    case "-1":
                        $('#<%=fantop.ClientID %>').attr('class', 'thermo_icon_fan_auto');
                        $('#<%=fantop.ClientID %>').html('Auto');
                        $('#<%=fantop.ClientID %>').attr('title', 'Auto');
                        break;
                    default:
                        $('#<%=fantop.ClientID %>').attr('class', 'thermo_icon_fan_auto');
                        $('#<%=fantop.ClientID %>').html('Auto');
                        $('#<%=fantop.ClientID %>').attr('title', 'Auto');
                        break;
                }
            }

            if (json.TStatRecord.TStatDataSet.TD.CMODE != undefined) {
                switch (json.TStatRecord.TStatDataSet.TD.CMODE) {
                    case "0":

                        $('#<%=systemModeTop.ClientID %>').attr('class', 'thermo_icon_off');
                        $('#<%=systemModeTop.ClientID %>').html('Off');
                        $('#<%=systemModeTop.ClientID %>').attr('title', 'Off');

                        $('#<%=systemstatusTop.ClientID %>').attr('class', 'thermo_icon_status_off');
                        $('#<%=systemstatusTop.ClientID %>').html('Off');
                        $('#<%=systemstatusTop.ClientID %>').attr('title', 'Off');

                        $('#<%=systemTop.ClientID %>').attr('class', 'thermo_icon_tem_off');
                        $('#<%=systemTop.ClientID %>').attr('title', 'Off');

                        break;
                    case "1":


                        $('#<%=systemModeTop.ClientID %>').attr('class', 'thermo_icon_heat');
                        $('#<%=systemModeTop.ClientID %>').html('Heat');
                        $('#<%=systemModeTop.ClientID %>').attr('title', 'Heat');

                        $('#<%=systemstatusTop.ClientID %>').attr('class', 'thermo_icon_status_on');
                        $('#<%=systemstatusTop.ClientID %>').html('On');
                        $('#<%=systemstatusTop.ClientID %>').attr('title', 'On');

                        $('#<%=systemTop.ClientID %>').attr('class', 'thermo_icon_tem_on');
                        $('#<%=systemTop.ClientID %>').attr('title', 'On');
                        break;
                    case "2":

                        $('#<%=systemModeTop.ClientID %>').attr('class', 'thermo_icon_cool');
                        $('#<%=systemModeTop.ClientID %>').html('Cool');
                        $('#<%=systemModeTop.ClientID %>').attr('title', 'Cool');

                        $('#<%=systemstatusTop.ClientID %>').attr('class', 'thermo_icon_status_on');
                        $('#<%=systemstatusTop.ClientID %>').html('On');
                        $('#<%=systemstatusTop.ClientID %>').attr('title', 'On');
                        $('#<%=systemTop.ClientID %>').attr('class', 'thermo_icon_tem_on');
                        $('#<%=systemTop.ClientID %>').attr('title', 'On');
                        break;
                    case "3":

                        $('#<%=systemModeTop.ClientID %>').attr('class', 'thermo_icon_auto');
                        $('#<%=systemModeTop.ClientID %>').html('Auto');
                        $('#<%=systemModeTop.ClientID %>').attr('title', 'Auto');

                        $('#<%=systemstatusTop.ClientID %>').attr('class', 'thermo_icon_status_on');
                        $('#<%=systemstatusTop.ClientID %>').html('On');
                        $('#<%=systemstatusTop.ClientID %>').attr('title', 'On');
                        $('#<%=systemTop.ClientID %>').attr('class', 'thermo_icon_tem_on');
                        $('#<%=systemTop.ClientID %>').attr('title', 'On');
                        break;
                }
            }



            $('#<%=lblCurrentTemperatureTop.ClientID %>').html(json.TStatRecord.TStatDataSet.TD.ZTEMP + "°F");

            return response.d;
        }
        catch (e) {
            console.log(e.message);
        }
    }

</script>
<asp:Label ID="lblkey" runat="server" globalize="ML_CentralAirSystem_Lbl_Key"></asp:Label>

 <asp:DropDownList globalize="ML_CentralAirSystem_DDL_Thermostat" ID="ddlThermostat" runat="server" ClientIDMode="Static">
    </asp:DropDownList>
<div class="thermo_temp" id="thermo1" runat="server" clientidmode="static">
    <span id="systemTop" runat="server">
        <asp:Label runat="server" ID="lblCurrentTemperatureTop"  class="temp_thermo_heading"></asp:Label></span><br />
    
    <span id="systemstatusTop" runat="server" class="button_thermo thermo_icon_status_on"></span>
</div>
<div class="thermo_temp_1" id="thermo2" runat="server" clientidmode="static">
    <ul>
      
       
        <li class="cool_thermo"><span id="systemModeTop" globalize="ML_CentralAirSystem_Button_Cool" runat="server" class=""></span></li>
          <li class="fan1_thermo fan1_thermo_inactive"><span   runat="server" class="">Fan off</span></li>
          <li class="auto_thermo"><span id="fantop" globalize="ML_SmartJac_div_Auto" runat="server" class=""></span></li>
        

    </ul>
</div>
<div class="thermo_temp_1" id="thermo3" runat="server" clientidmode="static" style="display:none;">
   
</div>
