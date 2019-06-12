<%@ Page Title="DR Upcoming" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true" CodeBehind="DRUpcoming.aspx.cs" Inherits="CustomerPortal.DRUpcoming" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">

    <title>DR Upcomming</title>
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/DRUpcoming.js"></script>

    <script type="text/javascript">

        $(document).ready(function () {
            $('.active').removeClass('active');
            $('.dr-up-coming-events').addClass('active');
            $('.efficency').addClass('active');
            var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
            var cutomerno = "";
            cutomerno = utlitynum;

            GetDRPrograms(cutomerno);
            //GetCustomerSignedProgramDetails();

            $("#btnOptDrPrograms").click(function () {
                checkEnroll();
            });

            $('.lnkopt').click(function () {
                Opt(cutomerno, $(this).attr('optid').split(',')[0], $(this).attr('optid').split(',')[1]);
            });
        });

    </script>

    <style type="text/css">

        .profile_img {
                 width: 2%;
        }
        .details_box {
             width: 98%;
        }

        .view_details {
            padding-left:0;
        }

        .right_content_box .view_details ul li {
            padding-left:0 !important;
            padding-top:3px !important;
            border-bottom:0 !important;
        }
        .show_hide_details {
    width: 30%;
    float: left;
        }

        .register_eff_lnk a {    
       background: #2d1a6e none repeat scroll 0 0;
    border-radius: 3px;
    color: #fff;
    float: right;
    font-size: 14px;
    padding: 6px 14px 8px;
    text-decoration: none;
    width:118px;
}
        .register_eff_lnk {
            margin-top: 27px;
        }
        

        .details_box .register_lnk ul {
            float:left;
                WIDTH: 100%;
        }
        .details_box .register_lnk ul li:first-child {
                float: left;
        }
        .details_box .register_lnk ul li {
            position:static;
            float:right;
            padding-left:0px;
                margin: 0;
        }

        .details_box .register_lnk {
                padding-bottom: 1px !important;
        }
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

        .table_dr_pro table {
            width: 100%;
            border: 1px solid #ccc;
        }

            .table_dr_pro table tr td {
                padding: 6px 5px;
                border: 1px solid #EAEAEA;
                text-align: center;
                width: auto !important;
            }

            .table_dr_pro table tr:first-child {
                background: #ccc;
                font-size: 13px;
                font-weight: bold;
            }

            .table_dr_pro table tr:nth-child(2n+1) td {
                background: #F3F3F3;
            }

        .popup_effecie table tr td {
            padding: 7px 15px;
        }

            .popup_effecie table tr td:first-child {
                font-weight: bold;
                width: 30%;
            }

        .popup_effecie table tr:nth-child(2n+2) td {
            background: #F3F3F3;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            border-bottom: 1px solid #ECECEC;
            border-top: 0px;
        }

        .popup_button {
            padding-bottom: 18px;
        }
        .details_box h5 {
    color: #2d1a6e;
    font-size: 14px;
    font-weight: bold;
    margin: 0px;
    float: left;
}
        .profile_img span{
            font-size:14px;
        }
        .view_details ul li span{
            font-size:12px;
                color: #53565a;
        }
        .register_lnk ul li{
            font-size:12px;
                color: #53565a;
        }
        .details_box{
            margin-top:3px;
        }
        .register_eff_lnk{
            margin-top: -11px !important;
        }
        .right_content_box ul:hover{
            background: #f9f9f9;
        }
        .right_content_box ul:nth-child(even) {
    background: #FDFDFD;
    margin: 1px 0px;
}
        .details_box ul:hover{
            background:none;
        }
    </style>


    <input type="hidden" class="activeli_list" value="dr-up-coming-events" />
   <%-- <section class="inner_mid_section">
    <div class="container inner-mid-container">
        	<div class="energy_mid_box">
                <h1><img src="images/dr_pro_icon.png" style="padding-right:5px; margin-top: -3px; float: left;" />
                    <span>DR Programs</span></h1>
                <div class="sidebar_toggle">Sidebar Navgatation</div>
                <div class="nav_left"> 
                	<ul>
                    	<li class="icon_rebates"><a href="rebates.aspx" globalize="ML_ENERGY_EFFICIENCY_Anchor_Rebates">Rebates</a></li>
                        <li class="icon_dr_programes"><a href="programs.aspx" globalize="ML_ENERGY_EFFICIENCY_Anchor_Programs">Programs</a></li>
                        <li class="icon_saving_tips"><a href="saving-tips.aspx" globalize="ML_ENERGY_EFFICIENCY_Anchor_SavingTips">Savings Tips</a></li>
                        <li class="educational_tips"><a href="educational-tips.aspx" globalize="ML_ENERGY_EFFICIENCY_Anchor_EducationalTips">Educational Tips</a></li>
                        <li class="icon_dr_pro_icon"><a href="DRPrograms.aspx" globalize="ML_Programs_Navigation_DR_Response">DR Programs</a></li>
                        <li class="dr-up-coming-events active"><a href="DRUpcoming.aspx">DR Upcoming Events</a></li>
                    </ul>
                    <div class="banner_left_img">
                    <img src="images/banner_ads/image002.png" />
                   <!-- <img src="images/banner_ads/image004.png" />-->
                </div>
                </div>--%>
                <div class="right_content_box">
                    <!-- right content body -->

                    <div id="dvTableContainer" class="table_dr_pro_1">
                                  
                    </div>
                    

                </div><!-- End .right_content_box -->
      <%--  </div>
    </div>--%>

    <!-- Register Modal starts -->
  <div class="modal fade" id="modelRegister" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style="padding:7px 15px;">
          <button type="button" id="btnclosepopup" class="close " data-dismiss="modal"><img src="images/cross-icon.png" /></button>
          <h4 class="modal-title">Register</h4>
        </div>
        <div class="modal-body">

            <div id="dvRegisterDetails" class="popup_effecie" >
                
            </div>
            <div class="popup_button">
                   <button id="btnOptDrPrograms" type="button" class="submit-button">Signup</button>
            <button type="button" class="cancel-button" data-dismiss="modal">Close</button>

            </div>

        </div>
        
      </div>
      
    </div>
  </div>
    <!-- Register Modal ends -->
</section>



</asp:Content>
