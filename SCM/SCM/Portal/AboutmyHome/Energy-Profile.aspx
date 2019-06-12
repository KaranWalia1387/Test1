<%@ Page Title="About My Home : Energy Profile" Language="C#" AutoEventWireup="true" CodeBehind="Energy-Profile.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Energy_Profile" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
     <%: System.Web.Optimization.Styles.Render("~/Content/cssEnergy-Profile") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsEnergy-Profile")%>
   
      <script type="text/javascript">
         $(document).ready(function () {
             $('.active').removeClass('active');
             $('.icon_energy_audit').addClass('active');
             $('.efficency').addClass('active');
         });
         var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {
         })
			</script>
  <%--<link href="css/login.css" rel="stylesheet" type="text/css">
    <link href="css/Energy-Profile.css" rel="stylesheet" />--%>
     
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
<div class="right_content_box">
     <div class="bot_scroll" style="height:99%;">
        	<div class="wrap_container_inner">
            	<div class="energy_section">
                	<div class="energy_section_left" style="width:57%;">
                    	<h1>Your Home Energy Profile</h1>
                        <h2>Your next steps to lower energy bills</h2>
                        <p>Your home energy profile shows that cutting energy waste can slash your energy bills. But there's even more good news. You can:</p>
                        <div class="energy_section_left_listing">
                        	<ul>
                            	<li><span>Qualify for up to $2,000 in PSEG long Island rebates</span> to help pay for energy efficiency improvements to your home.</li>
                                <li><span>Take advantage of affordable financing</span> that makes it easy to upgrade your home on a budget.</li>
                                <li><span>Have an expert uncover the energy waste in your home - for free.</span> Most new Yorkers quality for a home energy assessment at no cost.</li>
                               
                            </ul>
                        </div>
                        
                        <div class="clearfix"></div>       
                      <div class="start_savings">
                        <a href="../rebates.aspx">Start Saving</a>
                      </div> 
                      <div class="clearfix"></div>  
                       
                    </div>
                    <div class="energy_section_right" style="width:40%; margin-top:12px; float:right; margin-right:1%;">
                   		 <div class="energy_section_right_img_area">
                    		<img src="images/energy-efficiency.png" alt="SCM Banner" />
                        </div>
                        <div class="energy_section_right_content_area">
                        	
                            <div class="energy_section_right_content_area_left">
                            	Your Home Energy Profile in Upload, CA is one or the least efficient single-family homes in your neighborhood
                            </div>
                            <div class="energy_section_right_content_area_right" style="padding: 6px 15px;">
                            	<h1 id="hdgSaving" runat="server">$0.00</h1>
                                <span>Potential 3-year savings</span>
                            </div>
                        	
                        </div>
                    </div>
                    
               
            	<div class="clearfix"></div>
                
                <div class="energy_section_bottom">
                	
                    <div class="energy_section_bottom_left">
                    	<h2 class="b_head_energy">More Energy Savings Opportunities</h2>
                        <div class="savings_opport">
                        	<ul>
                            	<li><a href="#">Upgrade atic insulation to modern standards</a></li>
                                <li><a href="#">Upgrade to efficient lighting</a></li>
                                <li><a href="#">Consider high-efficiency air conditioning units</a></li>
                                <li><a href="#">If considering replacing, get high-efficiency windows</a></li>
                                <li><a href="#">If replacing your water heater. cosider a tankless model</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="energy_section_bottom_right">
                    	<h2 class="b_head_energy">Potential 3-Year Efficiency Savings: <span id="hdgSaving1" runat="server" style="float: right;">$0.00</span></h2>
                        <img src="images/air-chart.png" width="400" />
                    </div>
                
                </div>
                
                
                 <div class="energy_section_bottom">
                	<h2 class="b_head_energy">Understanding Your Results</h2>
                    <div class="energy_section_bottom_left">
                    	<div class="energy_section_left_listing energy_section_left_listing_bot">
                        	<ul>
                            	<li><span>Your home energy profile shows how much energy your home uses</span> compared to single-family homes in your area that are similar to yours. The savings estimate is a tool to help you understand how you use energy in your single - family homes</li>
                                <li><span>The recommended energy savings opportunities are improvements</span> that will cut your energy costs and make your home feel more comfortable.</li>
                                <li><span>Energy prices are calculated as an average</span> of actual prices in the region over the last 12 months. Because future energy prices are unpredictable, your savings will be higher or lower than expected.</li>
                               
                            </ul>
                        </div>
                    </div>
                    <div class="energy_section_bottom_right">
                    	<img src="images/chart-weather.png" width="400" />
                    </div>
                 </div>
                
                
                
                </div><!----Energy Savings Top div--> 
            </div>
            
        </div>
  </div>
    <div class="clearfix"></div>

   <%-- <script type="text/javascript" src="../js/jquery-1.12.3.min.js"></script>--%>
  <%--  <script  type="text/javascript" src="js/bootstrap.min.js"></script>--%>
    
</asp:Content>