<%@ Page Title="Sprinkler Zones" Language="C#" MasterPageFile="~/SmartHomeMaster.master" AutoEventWireup="true" CodeBehind="SprinklerZones.aspx.cs" Inherits="CustomerPortal.SprinklerZones" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <%: System.Web.Optimization.Styles.Render("~/Content/cssSprinklerZones") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSprinklerZones")%>
     
    
    <script src="<%=string.Format("{0}/js/bootstrap-toggle.min.js",CustomerPortal.SessionAccessor.BaseUrl)%>" type="text/javascript"></script>
    <link href="<%=string.Format("{0}/js/bootstrap-toggle.min.css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" />
        
        
             <div class="inner_mid_con">
             <ul class="tab_nav_1 navbar-nav">
                <li class="device" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinkerDevice)%>"> <a href="<%=string.Format("{0}/SprinklerDevice.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerDevice">Sprinkler Device</a></li>
                <li class="zone active" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerZones)%>"> <a href="<%=string.Format("{0}/SprinklerZones.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerZones">Sprinkler Zones</a></li>
                <li class="schedule" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.SmartHomeSprinklerSchedule)%>"> <a href="<%=string.Format("{0}/SprinklerSchedule.aspx",CustomerPortal.SessionAccessor.BaseUrl)%>"  globalize="ML_Efficiency_Header_SprinklerSchedule">Sprinkler Schedule</a></li>
            </ul> 
                 
              <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style="padding-bottom:0;float:left;">
                                    <div class="modal-header">
                                        <button type="button" class="close " data-dismiss="modal">
                                         <img src="images/cross-icon.png"></button>
                                       <%-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--%>
                                        <h4 class="modal-title-changepwd"></h4>
                                    </div>
                                    <div class="modal-body" id="modal-body"></div>
                                     <button type="button" class="cancel-button" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>



            <div class="my_yard_wrapper">
                <asp:DropDownList ID="deviceListDd" Visible="false" runat="server" Font-Size="Small" ForeColor="Black" Width="80%"></asp:DropDownList>
                 <div id="zoneInformation" runat="server" class="my_yard_wrapper" >
                      <h2>My Yard</h2>
                     </div>
                 
            </div>
    </div>
     <div id="backgrounddiv"></div>


    <div class="remote_area">
     
    <h2>Remote</h2>
    <div class="remote_area_inner" clientidmode="Static" id="remoteZone" runat="server">
    </div>
    <div class="buttons">
        <input type="button" value="Run" class="submit_new" style="width:100px;" />
    </div>
    <span class="arrow"></span>
</div>

<div class="remote_icon">
      
    <a href="#"><img src="images/sprinkler/remote-icon.png" /></a>
</div>

    <div class="modal fade" id="myModal121" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
<div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <h4 class="modal-title " id="myModalLabel">Zone</h4>
                          </div>
                          <div class="modal-body">
						  <div class="mod-wrapper">
						<div class="img-sector">
						<img src="images/sprinkler/lbl1.png"/>
						</div>
						<div class="heading-sector">
						<h3 class="head-zone">Zone 1</h3>
						<input type="text" class="form-control" placeholder="Zone 1"/>
						</div>
                      </div>
					  <div class="mod-wrapper2">
					  <div class="txt-sect"><p>Growing Cool Season Grass in Loam on a Flat</p></div>
					  <div class="txt-sect"><p>It gets lots of sun and uses Fixed spray head</p></div>
					  </div>
					   <div class="mod-wrapper2 padder-main">
					  <h3 class="head-zone2">Advanced</h3>
					  <div class="form-group">
					  <label>Area<small>(ftxft)</small></label>
					  <input type="text" class="form-control" style="width:84%;"/>
					  </div>
					  </div>
					  
					  <div class="mod-wrapper2 padder-main">
					  <h3 class="head-zone2">Available Water<small>(in)</small></h3>
					  <div class="form-group">
					  <input type="text" class="form-control"/>
					  </div>
					  </div>
					  
					  <div class="mod-wrapper2 padder-main">
					  <h3 class="head-zone2">Root Depth<small>(in)</small></h3>
					  <div class="form-group">
					 
					  <input type="text" class="form-control"/>
					  </div>
					  </div>
					  
					    <div class="mod-wrapper2 padder-main">
					  <h3 class="head-zone2">Allowed Depletion<small>(%)</small></h3>
					  <div class="box_centered_area">
							 <div class="input-ranger">
							
							<input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="50"/>
							<p><span id="ex1SliderVal">50</span>%</p>
							</div>
						 </div>
					  </div>
					  
					    <div class="mod-wrapper2 padder-main">
					  <h3 class="head-zone2">Efficiency<small>(%)</small></h3>
					  <div class="box_centered_area">
							 <div class="input-ranger">
							 
							<input id="ex2" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="80"/>
							<p><span id="ex2SliderVal">80</span>%</p>
							</div>
						 </div>
					  </div>
					  
					  
                        </div>
						
						<div class="modal-footer text-center">
        <button type="button" class="btn btn-default btn-cls" data-dismiss="modal">Close</button>
      </div>
						
                      </div>
  </div>
</div>

</asp:Content>
