<%@ Page Title="Sprinkler Device" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true" CodeBehind="SprinklerDevice.aspx.cs" Inherits="CustomerPortal.SprinklerDevice" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <%: System.Web.Optimization.Styles.Render("~/Content/cssSprinklerDevice") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSprinklerDevice")%>
    <%--<title globalize="ML_SmartHome_SprinklerDevice">Sprinkler Device</title>--%>
  
    <link href="gitcdn.github.io/bootstrap-toggle/2.2.0/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js"></script>
   <style>
       ul.tab_nav_1 li.active a {
    height: 46px;
}

   </style>
         <div class="inner_mid_con">
             <ul class="tab_nav_1 navbar-nav">
                <li class="device active" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinkerDevice)%>"> <a href="<%=string.Format("{0}/SprinklerDevice.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerDevice"><%= CustomerPortal.Translator.T("ML_Efficiency_Header_SprinklerDevice") %></a></li>
                <li class="zone" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerZones)%>"> <a href="<%=string.Format("{0}/SprinklerZones.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerZones"><%= CustomerPortal.Translator.T("ML_Efficiency_Header_SprinklerZones") %></a></li>
                <li class="schedule" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerSchedule)%>"> <a href="<%=string.Format("{0}/SprinklerSchedule.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerSchedule"><%= CustomerPortal.Translator.T("ML_Efficiency_Header_SprinklerSchedule") %></a></li>
            </ul>     
            <div class="type_zone_area">

                <div class="type_area">
                    <h2>Type</h2>
                   <%-- <select>
                        <option>--Select--</option>
                        <option>Rachio</option>
                    </select>--%>
                     <asp:DropDownList ID="deviceListDd" runat="server" Font-Size="Small" ForeColor="Black"></asp:DropDownList>

                    <div class="clearfix"></div>

                    <div class="type_area_left">

                        <div class="type_area_left_img">
                            <img src="images/sprinkler/sprinkler-image.png" />
                            <div class="type_on">
                               
                                <input type="image" id="rachioIro" src="images/sprinkler/on-button.png" alt="Get Device Info" value="Off" runat="server" />
                                <%--<input type="image" onserverclick="rachioIro_ServerClick" id="Image1" src="/images/device_iro_on.jpg" alt="Get Device Info" value="Off" runat="server" />--%>
                            </div>
                        </div>

                    </div>
                    <div class="type_area_right">
                        <asp:Label ID="deviceStatusLb" runat="server" Text="" Font-Size="Small" ForeColor="Black"></asp:Label>
                        
                        <div class="toggle_on_off">
                            <%--<input checked data-toggle="toggle" data-size="small" type="checkbox">--%>
                             <input type="image"  clientidmode="Static" id="deviceSwitch" src="images/sprinkler/On_Switch.png" alt="Device Switch" runat="server" />
                             <%--<input type="image" onserverclick="deviceSwitch_ServerClick" clientidmode="Static" id="Image1" src="/images/sprinkler/on_button.png" alt="Device Switch" runat="server" />--%>
                        </div>

                    </div>

                </div>
                <div class="zone_area">
                    <h2>Zones</h2>
                    <div class="zone_area_top">
                    <asp:DropDownList ID="startZonedd" runat="server"></asp:DropDownList>
                        <div class="clearfix"></div>
                     <%--   <input type="button" value="Stop Water" class="submit_new" />--%>
                        <asp:Button ID="stopWater" CssClass="submit_new" runat="server" Text="Stop Water" OnClick="stopWater_Click"/>
                        </div>
                    <div class="clearfix"></div>
                    <div class="zone_area_bottom">
                        <input type="text" id="txtdelay" placeholder="Enter here..." /> <i globalize="ML_SprinklerDevice_Msg_Duration"><%= CustomerPortal.Translator.T("ML_SprinklerDevice_Msg_Duration") %></i>
                        <div class="clearfix"></div>
                        <input type="button" id="ActivatRain" globalize="ML_SprinklerDevice_Msg_ActivateRainDelay" value='<%# CustomerPortal.Translator.T("ML_SprinklerDevice_Msg_ActivateRainDelay") %>' class="submit_new" />
                    </div>
                </div>

            </div>
         </div>
    <div id="backgrounddiv"></div>
<div class="remote_area">
     
    <h2 globalize="ML_SprinklerDevice_Msg_Remote"><%= CustomerPortal.Translator.T("ML_SprinklerDevice_Msg_Remote") %></h2>
    <div class="remote_area_inner" clientidmode="Static" id="remoteZone" runat="server">
    </div>
    <div class="buttons">
        <input type="button" globalize="ML_SprinklerDevice_Msg_Run" value='<%# CustomerPortal.Translator.T("ML_SprinklerDevice_Msg_Run") %>' class="submit_new" style="width:100px;" />
    </div>
    <span class="arrow"></span>
</div>

<div class="remote_icon">
      
    <a href="#"><img src="images/sprinkler/remote-icon.png" /></a>
</div>

</asp:Content>
