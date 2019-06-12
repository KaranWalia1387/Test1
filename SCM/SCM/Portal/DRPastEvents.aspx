<%@ Page Title="DR Events" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DRPastEvents.aspx.cs" Inherits="CustomerPortal.DRPastEvents" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <title>DR Programs</title>
    <script src="js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="js/JsUtility.js" type="text/javascript"></script>
    <script src="js/DRPastEvents.js" type="text/javascript"></script>
    

    <script type="text/javascript">

        $(document).ready(function () {
            GetDREvents();
        });
        function printdr() {
            var printContents = document.getElementsByClassName('right_content_box')[0].innerHTML
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
        var cutomerno = "";
        var cutomerno = '<%= Session["Customernumber"] ?? "" %>';
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
            width: 100%;
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

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 
    <input type="hidden" class="activeli_list" value="usage" />
    <section class="inner_mid_section">
    <div class="container inner-mid-container">
        	<div class="energy_mid_box">
                <h1><img src="images/dr_pro_icon.png" style="padding-right:5px; margin-top: -3px; float: left;" />
                    <span>Demand Response</span>
                        <img src="images/print-icon.png" style="padding-right: 7px; margin-top: -1px; float: right;" onclick="printdr();"  />
                </h1>

                <div class="sidebar_toggle">Sidebar Navgatation</div>
                <div class="nav_left"> 
                	<ul>
                    	<%--<li class="icon_rebates"><a href="rebates.aspx" globalize="ML_Rebates_title_Rebates">Rebates</a></li>
                        <li class="icon_dr_programes"><a href="programs.aspx" globalize="ML_Programs_title_Programs">Programs</a></li>
                        <li class="icon_saving_tips"><a href="saving-tips.aspx" globalize="ML_SvngTips_h1_SavingTip">Savings Tips</a></li>
                        <li class="educational_tips"><a href="educational-tips.aspx" globalize="ML_SvngTips_li_ET">Educational Tips</a></li>
                        <li class="dr_tips"><a href="dr.aspx">DR Tips</a></li>--%>
                        <li class="sidebar_power"><asp:LinkButton ID="PU" runat="server" PostBackUrl="Usages.aspx?UsageType=PU" globalize="ML_POWERUSAGE_Navigation_Power" Visible="true">Power</asp:LinkButton></li>
                        <li class="sidebar_gas"><asp:LinkButton ID="GU" runat="server" PostBackUrl="Usages.aspx?UsageType=GU" globalize="ML_POWERUSAGE_Navigation_Gas" Visible="true">Gas</asp:LinkButton></li>
                        <li class="sidebar_water"><asp:LinkButton ID="WU" runat="server" PostBackUrl="Usages.aspx?UsageType=WU" globalize="ML_POWERUSAGE_Navigation_Water" Visible="true">Water</asp:LinkButton></li>
                        <li class="sidebar_solar"><asp:LinkButton ID="SU" runat="server" PostBackUrl="Usages.aspx?UsageType=SU" globalize="ML_WU_li_Solar" Visible="true">Solar</asp:LinkButton></li> 
                        <li class="dr-past-events active"><a href="DRPastEvents.aspx" id="IdResponse" globalize="ML_Settings_Span_DemandResp">Demand Response</a></li>                 
                       
                    </ul>
                   
                    <div class="banner_left_img">
                    <img src="images/banner_ads/image002.png" />
                    <img src="images/banner_ads/image004.png" />
                </div>
                </div>
                <div class="right_content_box">
                    <!-- right content body -->

                 <%--   <a href="#" onclick="GetDRPrograms();">DR Programs</a>
                    <br />
                    <a href="#" onclick="">Get Events</a>
                    <br />
                        --%>

                    <div id="dvTableContainer" class="table_dr_pro" style="overflow:auto;"></div>
                    

                </div><!-- End .right_content_box -->
        </div>
    </div>

    <!-- Register Modal starts -->
  <div class="modal fade" id="modelRegister" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style="padding:7px 15px;">
          <button type="button" id="btnclosepopup" class="close " data-dismiss="modal"><img src="images/cross-icon.png"></button>
          <h4 class="modal-title">Register</h4>
        </div>
        <div class="modal-body">

            <div id="dvRegisterDetails" class="popup_effecie" >
                
            </div>
            <div class="popup_button">
                   <button type="button" class="submit-button" onclick="GetCustomerSignedProgramDetails();" >Signup</button>
            <button type="button" class="cancel-button" data-dismiss="modal">Close</button>

            </div>

        </div>
        
      </div>
      
    </div>
  </div>
    <!-- Register Modal ends -->
</section>



</asp:Content>
