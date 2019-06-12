<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ThermostatUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.ThermostatUserControl" %>

<asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
<asp:HiddenField ID="hdncool" runat="server" Value="0" />
<asp:HiddenField ID="hdnheat" runat="server" Value="0" />
<asp:HiddenField ID="hdnHvacmode" runat="server" Value="" />
<asp:HiddenField ID="hdnFan" runat="server" Value="" />
<asp:HiddenField ID="hdnisCelcius" runat="server" />
<style type="text/css">
    .thermo_temp {
        width: 50%;
  float: left;
   padding: 2px 10px 0px;
    }

.thermo_temp .temp_thermo_heading {
      font-size: 50px;
    color:#7a7a7a;

}
.button_thermo, .thermo_icon_status_on {
      background: #94D60A;
      padding: 7px 0%;
      font-size: 16px;
      color: #fff !important;
      width: 100%;
      display: block;
      text-align: center;
}

.thermo_temp_1 {
    width: 50%;
  float: left;
  padding: 10px 10px;
}

.thermo_temp ul {
    list-style:none;
    margin:0;
    padding:0;
}
    .thermo_temp ul li.auto_thermo span, .thermo_temp ul li.cool_thermo span {
         display: block;
          background: #ececec;
          padding: 8px 7px 8px 19px;
          width: 99px;
          font-size: 16px;
        }

li.auto_thermo {
    background:#ececec url("images/auto_thermo_ico.png") no-repeat 10px 9px;
     display: block;  width: 100% !important;
  padding: 10px 14px !important;
  margin-bottom:12px !important;
    margin-top: 16px !important;

}
li.cool_thermo {
    background:#ececec url("images/cool_thermo_ico.png") no-repeat 10px 9px;
     display: block;  width: 100% !important;
  padding: 10px 14px !important;
}
.text_thermo {
      font-size: 12px;
      /* line-height: 9px; */
      display: block;
      margin-bottom: 13px;
      width: 100%;
        margin-top: -5px;
}

@media (min-width:991px) and (max-width:1024px) {
    .text_thermo {
        font-size:9px;
    }

    .thermo_temp .temp_thermo_heading {
        font-size:37px;
        display:block;
        padding-top:32px;
        line-height:16px;
    }
}

</style>
<asp:ScriptManager ID="ScriptManager" runat="server">
</asp:ScriptManager>

<asp:Label ID="lblkey" runat="server" globalize="ML_CentralAirSystem_Lbl_Key"></asp:Label>
<asp:UpdatePanel ID="upThermostat" runat="server" UpdateMode="Conditional">
    <ContentTemplate>
        <div class="thermo_temp" id="thermo1" runat="server" ClientIDMode="static">
            <span id="systemTop" runat="server">
                <asp:Label runat="server" globalize="ML_CentralAirSystem_Lbl_CurrentTemp" ID="lblCurrentTemperatureTop" Text="" class="temp_thermo_heading"></asp:Label></span><br />
             <asp:DropDownList ClientIDMode="Static" ID="ddlThermostat" class="text_thermo" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlThermostat_SelectedIndexChanged">
        </asp:DropDownList>
          <span id="systemstatusTop" runat="server" class="button_thermo thermo_icon_status_on"></span>
            <br />
        </div>

       

        <div class="thermo_temp_1" id="thermo2" runat="server" ClientIDMode="static">
            <ul>
                <li class="auto_thermo"><span id="fantop" globalize="ML_SmartJac_div_Auto" runat="server" class=""></span></li>
                <li class="cool_thermo"><span id="systemModeTop" globalize="ML_CentralAirSystem_Button_Cool" runat="server" class=""></span></li>

            </ul>
        </div>

    </ContentTemplate>
    <Triggers>
        <asp:AsyncPostBackTrigger ControlID="ddlThermostat" />
    </Triggers>
</asp:UpdatePanel>
