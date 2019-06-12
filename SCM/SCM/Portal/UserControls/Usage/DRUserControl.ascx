<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DRUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.DRUserControl" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<%@ Register Src="~/UserControls/Usage/HeaderUsageUI.ascx" TagPrefix="uc1" TagName="HeaderUsageUI" %>
<%@ Register Src="~/UserControls/Usage/ChartUsageUI.ascx" TagPrefix="uc1" TagName="ChartUsageUI" %>






<title>DR Programs</title>
    <script src="js/highchart_js/highcharts.js"></script>
    <script src="js/JsUtility.js" type="text/javascript"></script>
    <script src="js/DRPastEvents.js" type="text/javascript"></script>
   <%--   <script src="js/usage-demand-response.js" type="text/javascript"></script>--%>
   
    <script type="text/javascript">

        $(document).ready(function () {
            $('.right_content_box').removeClass('preLoader');
            $('.nav_left ul li').removeClass("active");
            $('.sidebar_dresponse').addClass("active");
            var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
            var cutomerno = "";
            cutomerno = utlitynum;
            GetDREvents(cutomerno);
            $('.sidebar_dresponse').addClass("active");

        });
        function printdr() {
            var printContents = document.getElementsByClassName('right_content_box')[0].innerHTML
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
      
    </script>

    <style type="text/css">


        @media screen and (-webkit-min-device-pixel-ratio:0) {
            /* Safari only override */
            ::i-block-chrome, .right_content_box ul li {
                height: 70px;
            }

            ::i-block-chrome, .details_box .register_lnk ul li, ::i-block-chrome, .details_box .view_details li {
                height: auto;
            }

            ::i-block-chrome, .details_box .register_lnk ul li {
                float: left;
                padding: 0 10px 0 10px;
                border-bottom: 0px;
                margin-bottom: 0px;
                background: url(../images/divider_like_lnk.png) no-repeat left 14px !important;
            }

            ::i-block-chrome, .details_box .register_lnk span {
                margin-top: 9px !important;
                display: inline-block;
                padding-left: 5px;
                padding-right: 5px;
            }

            ::i-block-chrome, details_box .register_lnk .like_lnk {
                margin-top: -20px;
            }

            ::i-block-chrome, .details_box .register_lnk ul li:first-child {
                background: none !important;
            }
        }
        .table_dr_pro {
            margin:1%;
        }
       .table_dr_pro table
        {
            width: 98%;
            border: 1px solid #c7c7c7;
        }

            .table_dr_pro table tr td
            {
                padding: 5px 5px 5px 14px;
                border: 1px solid #aaa;
                text-align: left;
                width: auto !important;
                color: #000;
                font-size: 13px;
                white-space: nowrap;
            }

           

            .table_dr_pro table tbody tr:nth-child(odd) td
            {
                background: #fff;
            }
          
             .table_dr_pro table tbody tr:nth-child(even) td{
                background: #fff;
                }
               .table_dr_pro table tbody tr:hover td
            {
                background: #e8e8e8;
            }
             .table_dr_pro table tbody tr:first-child td
            {
              
               border-color: #aaa;
              background: #e8e8e8;
                color:#000;
                   line-height: 25px;
                    font-family: Verdana,Arial,sans-serif;
                    font-weight: bold;
                    font-size: 12px;
            }

        .popup_effecie table tr td {
            padding: 7px 15px;
        }

           

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            border-bottom: 1px solid #ECECEC;
            border-top: 0px;
        }

        .popup_button {
            padding-bottom: 18px;
        }
    </style>
<style type="text/css">
        .GraphLegend_DR {
            background-color: #7cb5ec;
            float: left;
            height: 15px;
            margin-left: 5px;
            text-indent: -9999px;
            width: 15px;
        }

        .TableCellHeaderTitle img {
            height: auto;
        }

        .divam svg {
            width: 100% !important;
        }

        #usageMapType .compare_month {
            float: right;
            margin: 6px 0 0;
            width: 18%;
        }

        .currency ul li {
            height: auto;
        }

        .currency_1 ul {
            margin: 0px !important;
            padding: 0px !important;
            list-style: none;
        }

            .currency_1 ul li {
                margin: 0px !important;
                padding: 0px 3px !important;
                float: left !important;
            }

                .currency_1 ul li a {
                    padding: 33px 0px 8px !important;
                    text-indent: 0px !important;
                }


        .power_rates_popup rect {
            width: 100%;
            height: 150px;
        }

        .all_bill_box {
            width: 100% !important;
        }

        .currency {
            border-bottom: 0px;
        }

        .all_bill_box .white_div {
            border-radius: 6px !important;
        }


        @media (max-width:991px) {
            #usageMapType .compare_month {
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
    </style>

 <%--   <input type="hidden" class="activeli_list" value="usage" />--%>
              
<%--<uc1:HeaderUsageUI runat="server" ID="HeaderUsageUI" />--%>
<div id="dvTableContainer" class="table_dr_pro" style="overflow:auto;"></div>
                    

         <div id="chartDiv" style="display:none;"> 
            <%-- <uc1:ChartUsageUI runat="server" ID="ChartUsageUI" />--%>
             <div class="current_area" id="DRDiv" style="display:none;">
                        <ul>
                            <li><span id="averagevalues" text="N/a"></span>
                               
                               <i><i  id="averagevaltexts" ></i> &nbsp;<i id="glbizeAverage">INCENTIVE RATE</i></i> 
                            </li>

                             <li><span  id="highestvalues" text="N/a"></span>
                                 <i><i >TOTAL CURTAILMENT</i>&nbsp;<i id="ModeText" >
                                </i> </i>
                            </li>

                           <li><span><asp:Label ID="lblCurntDr" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
                            <i >BASELINE AVERAGE</i>
                            </li>

                            <li><span><asp:Label ID="lblEstDR" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
                            <i >INTERVAL AVERAGE</i>
                             </li>
                        </ul>
                    </div>
             <div class="current_area">                    
                     <div class="power_graph_heading" style="text-align: center; margin: 0px auto; float: left; width:47%; padding:9px 0px 0px;">
                               <asp:Label ID="lblCharttitle" ClientIDMode="Static" runat="server" Text="" 
                                   Style="font-weight: bold;float: left;margin-top: 12px;margin-left:20px;" globalize="ML_POWERUSAGE_LBL_ChartTitle"></asp:Label>   
                        </div>
                     <div class="compare_graph"  style="width:100%; overflow:auto;">
                     
                      <div id="chart" class="radius"  >
                         </div>

                     </div>
                     <div class="low_hight_box" style="float: right; width: 50%;">
                                    <p>
                                        <span class="GraphLegend_low" style="display:block;color:ActiveBorder"></span>
                                        <span class="GraphLegend_data_low" style="display:block;" >Curtail</span>
                                        <span class="GraphLegend_Avg"></span>
                                        <span class="GraphLegend_data_low" >Baseline</span>
                                        <span class="GraphLegend_High" style="display:block;background-color:black"></span>
                                        <span class="GraphLegend_data_low" style="display:block;" >Baseline Avg</span>
                                        <span id="drlegend" class="GraphLegend_DR" style="background-color:#FF0000"></span>
                                        <span id="drlegendtext" class="GraphLegend_data_low" >Interval Avg</span>
                                        <span id="dresponse" class="GraphLegend_DR" style="background-color:#7cb5ec"></span>
                                        <span id="dresponsetext" class="GraphLegend_data_low" >DR</span>
                                    </p>
                                </div>                     
                </div>
  </div>  



