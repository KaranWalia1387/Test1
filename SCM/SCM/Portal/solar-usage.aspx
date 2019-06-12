<%@ Page Title="Solar Generation" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="solar-usage.aspx.cs" Inherits="CustomerPortal.solar_usage" %>

<%@ Register Src="UserControls/power-usage.ascx" TagName="power" TagPrefix="uc5" %>
<%@ Register Src="UserControls/RatePieChart.ascx" TagName="RatePieChart" TagPrefix="uc1" %>
<%@ Register TagPrefix="uc2" TagName="TitleBar2" Src="UserControls/RatePieChart.ascx" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://www.google.com/jsapi" type="text/javascript"></script>
    <script src="js/WeatherAPIPowerGenration.js" type="text/javascript"></script>
    <script src="js/highchart_js/highcharts.js"></script>
    <script src="js/highchart_js/common-chart.js"></script>
    <script type="text/javascript">
        var mode = 'D';
        $(document).ready(function () {
            $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
                try {
                    $('#' + '<%=hdnunit.ClientID %>').val(Gtype);
                    $('#' + '<%=hdntime.ClientID %>').val(Gmode);
                    $('#' + '<%=hdnTitle.ClientID %>').val(mainTitle);
                }
                catch (e) { }
            });

        });
    </script>
    <style type="text/css">
        .ajax__calendar .ajax__calendar_container {
            margin-left: 362px;
            !important;
            margin-top: 30px !important;
        }

        .currency ul li {
            height: auto;
        }

        .right_content_box ul li a[mode="D"] {
            background: url("./images/icon_currency.png") no-repeat scroll left top rgba(0, 0, 0, 0) !important;
            display: block;
            margin: 12px 8px 7px 4px;
            text-indent: -999px;
            width: 35px;
            height: 31px;
        }

        .right_content_box ul li a.active[mode="D"] {
            background: url("./images/icon_currency_hover.png") no-repeat left top !important;
            display: block;
        }


        .right_content_box ul li a[mode="K"] {
            background: url("./images/icon_kwh.png") no-repeat scroll left top rgba(0, 0, 0, 0) !important;
            display: block;
            margin: 12px 8px 7px 4px;
            text-indent: -999px;
            width: 35px;
            height: 31px;
        }

        .right_content_box ul li a.active[mode="K"] {
            background: url("./images/icon_kwh_hover.png") no-repeat scroll left top rgba(0, 0, 0, 0) !important;
            display: block;
        }

        .GridTableLabel {
            width: 199px !important;
        }

        .DayContainer {
            border: thin solid silver;
            float: left;
            margin: 2px 7px 10px;
            padding: 0;
            width: 18%;
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

        .DateHeader {
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            color: Black;
        }

        .Condition {
            height: 30px;
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            font-size: 12px;
            color: Black;
        }

        .Temp {
            font-weight: normal;
            padding-bottom: 4px;
            color: Black;
        }

        #GenrationType .compare_month {
            float: right;
            margin: 6px 0 0;
            width: 19%;
        }

        .Lowtemp {
            font-weight: normal;
            color: Black;
        }

        span.notext {
            margin: 46% 38%;
            top: 37%;
            position: relative;
            font-weight: bold;
        }

        #ContentPlaceHolder1_Cal_Date_container {
            left: 52% !important;
        }

        @media (max-width:991px) {
            #GenrationType .compare_month {
                float: right;
                margin: 6px 0 0;
                width: 22.3%;
            }
        }
        /*#5368-start*/
        .ajax__calendar_year, .ajax__calendar_months, .ajax__calendar_days {
            overflow: visible !important;
            line-height: normal !important;
        }

        .ajax__calendar_days, .ajax__calendar_months, .ajax__calendar_years {
            left: -6px !important;
        }

        .ajax__calendar_header {
            height: 27px !important;
        }
        /*#5368-end*/

        #GenrationMode {
            text-align: center;
        }

            #GenrationMode ul {
                text-align: center;
                display: table;
                margin: auto;
            }

                #GenrationMode ul li {
                    float: left;
                    border-bottom: 0px !important;
                }

                    #GenrationMode ul li a {
                        background: none !important;
                        background-color: #006699 !important;
                        text-indent: 0px !important;
                        padding: 6px;
                        color: #fff;
                        border-radius: 69%;
                        height: 55px;
                        width: 57px;
                        text-decoration: none !important;
                        line-height: 18px;
                        display: block;
                    }

                        #GenrationMode ul li a p {
                            margin: 0px;
                            padding: 5px 0 0 0;
                            font-size: 17px;
                            text-transform: lowercase;
                        }

        @media (max-width:1024px) {
            .power_graph_heading_solar {
                width: 56% !important;
            }
        }

        @media (max-width:767px) {
            #GenrationType {
                width: 35% !important;
            }

            #GenrationMode {
                text-align: left;
                width: 170px !important;
            }

            .power_graph_heading_solar {
                width: 59% !important;
            }

                .power_graph_heading_solar span {
                    margin-left: 0% !important;
                }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager runat="server"></asp:ScriptManager>
    <asp:HiddenField ID="hdnunit" runat="server" />
    <asp:HiddenField ID="hdntime" runat="server" />
    <asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnType" runat="server" />
    <asp:HiddenField ID="hdnMode" runat="server" />
    <input type="hidden" class="activeli_list" value="usage" />
    <asp:HiddenField ID="hdnUnitThisMonth" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnUnitPrediction" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnDollarThisMonth" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnDollarPredicted" ClientIDMode="Static" runat="server" />

    <section class="inner_mid_section" id="TableBill">
    <div class="container inner-mid-container">
        	<div class="energy_mid_box">
            	<h1 globalize="ML_USAGE"><img src="images/icon_usage_sidebar_heading.png"  style="padding-right:7px; margin-top: -3px; float: left;" />Usage</h1>
               	<div class="sidebar_toggle">Sidebar Navigation</div>
                 <div class="nav_left"> 
                	<ul>
                    	<li id="power_usage_li" class="sidebar_power" runat="server"><a href="power-usage.aspx" globalize="ML_WU_li_Power"><%= CustomerPortal.Translator.T("ML_WU_li_Power") %></a></li>
                        <li id="gas_usage_li" class="sidebar_gas" runat="server"><a href="gas-usage.aspx" globalize="ML_WU_li_Gas"><%= CustomerPortal.Translator.T("ML_WU_li_Gas") %></a></li>
                        <li id="water_usage_li" class="sidebar_water" runat="server"><a href="water-usage.aspx" globalize="ML_WU_li_Water"><%= CustomerPortal.Translator.T("ML_WU_li_Water") %></a></li>
                        <li id="solar_usage_li" class="sidebar_solar active" runat="server"><a href="#" globalize="ML_SolarGen_a_Solar"><%= CustomerPortal.Translator.T("ML_SolarGen_a_Solar") %></a></li>   
                    </ul>
                     <div class="banner_left_img">
                         <a href="MyAccount.aspx">
                             <img src="images/banner_ads/image001.png" class="padding_banner" />
                         </a>
                         <img src="images/banner_ads/image002.png" class="padding_banner" />
                     </div>     
                </div>             
                <div class="right_content_box">
                      <div class="current_area">
                            <ul>
                                <li><span id="averageval"></span>
                                <i  globalize="ML_Solar_SPAN_AVERAGE"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_AVERAGE") %></i>
                                </li>

                                <li><span  id="highestval"></span>
                                 <i globalize="ML_Solar_SPAN_HIGHEST_THIS"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_HIGHEST_THIS") %> </i> 
                                </li>
                            
                               <li><span> <asp:Label ID="lblCurrentUsage" runat="server" Text="N/a"  ClientIDMode="Static"></asp:Label></span>
                                <i  globalize="ML_WU_SPAN_SO_FAR_THIS_MONTH"> <%= CustomerPortal.Translator.T("ML_WU_SPAN_SO_FAR_THIS_MONTH") %></i>
                                </li>

                                <li> <span><asp:Label ID="lblEstimatedUsage" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
                                <i globalize="ML_Solar_SPAN_PREDICTED_THIS"><%= CustomerPortal.Translator.T("ML_Solar_SPAN_PREDICTED_THIS") %></i>
                                 </li>
                            </ul>
                        </div>
                    	 <div class="currency" style="padding:0px 10px;">
                             <div  id="GenrationType" style="float: left; width: 22%; ">
                    	            <ul>
                                      <li id="li_kwh" runat="server"><a mode="K" href="#">  kWh </a></li>
                                      <li id="li_dollar" runat="server"><a  mode="D" href="#"> Currency  </a></li>
                                    </ul>
                            </div>

                             <div class="power_graph_heading_solar" style="text-align: center; margin: 0px auto; float: left; width:51%; padding:15px 0px 0px;">
                               <asp:Label ID="lblUsageDate" ClientIDMode="Static" runat="server" Text="" 
                                   Style="font-weight: bold;float: left;margin-top: 12px;margin-left:15px;"></asp:Label>
                              <span id="divCalender" class="cal" style="line-height:43px; margin-right: 24px;">
                                   <asp:TextBox runat="server" id="btnCalender" style="width:0px; height:0px;visibility:hidden" globalize="ML_SolarGen_txt_Calender" placeholder="Choose Date"></asp:TextBox>
                                   <label><strong><span globalize="ML_WU_Lbl_SelectDate"><%= CustomerPortal.Translator.T("ML_WU_Lbl_SelectDate") %></span></strong></label>
                                    <asp:ImageButton runat="server" id="imgbtnCalender" ImageUrl="images/icon-cal.png" style="vertical-align:middle;"></asp:ImageButton> <asp:CalendarExtender  ID="Cal_Date" runat="server" TargetControlID="btnCalender" Format="MM/dd/yyyy"
                                        Enabled="True" OnClientDateSelectionChanged="UsageDataHourly" PopupButtonID="imgbtnCalender"></asp:CalendarExtender> 
                                </span>
                        </div>
                        <div  id="GenrationMode" style="float: right;width:21%;">
                     	 <ul style="float:right; margin-right:10px;"> 
                            <li> <a href="#" mode="L"><p><span globalize="ML_SolarGen_Last10"><%= CustomerPortal.Translator.T("ML_SolarGen_Last10") %></span></p> <span globalize="ML_SolarGen_10DAYS"><%= CustomerPortal.Translator.T("ML_SolarGen_10DAYS") %></span>  </a> </li>           
                              <%--globalize="ML_Usage_Solar_Lbl_Last10Days"--%>
                            <li> <a href="#" mode="N"><p><span globalize="ML_SolarGen_Next10"><%= CustomerPortal.Translator.T("ML_SolarGen_Next10") %></span></p><span globalize="ML_SolarGen_10DAYS"> <%= CustomerPortal.Translator.T("ML_SolarGen_10DAYS") %></span>  </a> </li>
                              <%--globalize="ML_Usage_Solar_Lbl_Next10Days"--%>
                         </ul>
                     </div>

                     
                    </div>
                   
                     <div class="compare_graph" style="width:97%;">
                          
                        <div id="chart_div" class="radius" >
                         </div>

                                  <div id="divWether" style="margin-left: 15px; width:100%;">
                                   </div>
                               
                     </div>
                   
                     <div class="clearfix">
                        &nbsp;
                    </div>
                     
                          <div class="compare_month" style=" background:#f4f4f4;float: left;margin-top: 3px;padding: 8px 30px;width: 100% !important;">
                         <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="~/images/table-export.png" OnClick="btnExporttoExcel_Click" ClientIDMode="Static" />
                            <div style="margin-top: -25px;margin-left: 35px;"><asp:LinkButton ID="lnkExporttoExcel" runat="server" ClientIDMode="Static" OnClick="lnkExporttoExcel_Click" globalize="ML_WU_Btn_Export"><%= CustomerPortal.Translator.T("ML_WU_Btn_Export") %></asp:LinkButton></div>
                        </div>
                     
                     
                     <div class="total_bills" style="width:97%">
                             <div class="Left_Bill_area" style="border-right:2px solid #f4f4f4; position:relative;" id="RateDiv" runat="server">
                                 <div id="RateDivHide" runat="server" visible="false" class="right-area-tabular" style="width:34%; position:absolute; left:65%; top:17%; z-index:99;">
                                		        <p><span class="GraphLegend_Avg" globalize="ML_SolarGen_span1"></span>
                                                <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1"><%= CustomerPortal.Translator.T("ML_WU_AverageUsage1") %></span></p>
                                                <div class="clearfix">&nbsp;</div>
                                                <p>
                                                <span class="GraphLegend_High" globalize="ML_SolarGen_span2"></span>
                                                <span class="GraphLegend_data_low" globalize="ML_WU_HighUsage1"><%= CustomerPortal.Translator.T("ML_WU_HighUsage1") %></span>
                                                </p>
                                        
                                    </div>
                             
                                  <div class="all_bill_box" id="divgasUsage" runat="server"></div>
                                 <div class="all_bill_box" id="divpowerUsage" runat="server"></div>
                                 <div class="all_bill_box" id="divusagewatericon" runat="server"></div>
                             </div>
                     
<%--                             <div class="right_Bill_area" style="padding-bottom:50px; border:none;">
                                          <uc5:power ID="power2" runat="server" />
                                     </div>--%>
                         </div>
                </div><!-- End .right_content_box -->
                      </div>  
        </div>
</section>

    <script src="js/popup.js" type="text/javascript"></script>
    <asp:HiddenField ID="hdnstrDate" runat="server" ClientIDMode="Static" />
</asp:Content>
