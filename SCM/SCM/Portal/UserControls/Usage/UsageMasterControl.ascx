<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UsageMasterControl.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.UsageMasterControl" %>

<style type="text/css">
    @media (min-width:768px) and (max-width:991px) {
        .ratest_box_mob {
            width: 66% !important;
            height: 36px !important;
        }

        #UsagesID {
            width: 100% !important;
            float: left !important;
            padding-left: 9px !important;
        }
    }
         .cust_measure1 {
        
    float: left;
    width: 100%;
    padding-left: 22px;
    }
    .cust_measure1 h5 {
        font-weight:bold;
    }
    .cust_measure_left1 {
            float: left;
    width: 42%;
    font-weight:bold;
    }
    .cust_measure_right1 {
           float: left;
    width: 12%;
     font-weight:bold;
    }
    .row_values_tables {
            width: 100%;
          float: left;
          margin-bottom:-10px;
    }
    #txtIncentive {
            width: 65%;
    }
    #txtUnit.ClassNumbersOnly {
            width: 80px;
               margin-left: 30px; 
}
        .row_values_tables #txtIncentive{
                width: 149%;
              float: left;
              margin-bottom:10px;
            }
        .row_values_tables #txtUnit{
             width: 40%;
              float: left;
              margin-bottom:10px;
                  margin-left: 80%;
        }
        .row_values_tables #txtMax{
             width: 40%;
    float: left;
    margin-bottom: 15px;
    margin-left:53px;
        }
        #txtMax {
            padding-left:32%;
        }

    .disbledBtn {
    background:#ddd !important}

    @-moz-document url-prefix() { 
  .cust_measure_left1 {
    float: left;
    width: 42%;
    font-weight:bold;
    }
  .cust_measure_right1 {
    float: left;
    width: 16%;
    font-weight:bold;
    }
  .row_values_tables #txtMeterID {
    width: 149%;
    float: left;
    margin-bottom: 10px;
}
  .row_values_tables #txtUnit {
    width: 40%;
    float: left;
    margin-bottom: 10px;
    margin-left: 46%;
}
  .row_values_tables #txtMax {
    width: 40%;
    float: left;
    margin-bottom: 15px;
    margin-left: 0px;
}
    }
    .jqx-widget-header{
        height:35px!important;
    }
     .JqxcheckboxCR{
            float: left;
    margin-top: 11px;
    }
    @media (min-width:768px) and (max-width:991px) {
        .ratest_box_mob {
            width: 66% !important;
            height: 36px !important;
        }
        .JqxcheckboxCR{
            float: left;
    margin-top: 11px;
    }

        #UsagesID {
            width: 100% !important;
            float: left !important;
            padding-left: 9px !important;
        }
    }
    .JqxcheckboxCR{
            float: left;
    margin-top: 11px;
    }
 
    .banner_left_img img {
        padding-top: 8px;
    }

    ::i-block-chrome, .power_graph_heading {
        width: 40% !important;
    }

    .compare_graph {
        margin-bottom: 18px;
    }

    .ratest_box_mob {
        margin-top: -3px;
    }

    .curent_usage_line #UsagesID p {
        text-align: right;
        float: right;
        margin-bottom: 0px;
    }

    .inner_uni1 {
        height: 98% !important;
    }

        .inner_uni1 .setting_save_box .connect_email_box {
            margin-top: 19px !important;
            padding-top: 5px !important;
        }

    .inner_uni2 {
        height: 96% !important;
    }

        .inner_uni2 .setting_save_box {
            padding-top: 12px !important;
        }

            .inner_uni2 .setting_save_box .connect_email_box {
                margin-top: 19px !important;
                padding-top: 5px !important;
            }


    .inner_uni3 {
        height: 102% !important;
    }

        .inner_uni3 .setting_save_box {
            padding-top: 4px !important;
        }

            .inner_uni3 .setting_save_box .connect_email_box {
                margin-top: 10px !important;
                padding-top: 5px !important;
            }


    .inner_uni4 {
        height: 100% !important;
    }



        .inner_uni4 .setting_save_box .connect_email_box {
            margin-top: 5px !important;
            padding-top: 5px !important;
        }

    .currency {
        float: left;
        margin-bottom: 10px;
            padding-top: 5px;
    }

    .currency_1 ul.calender_usages li a {
        margin-top: 6px !important;
    }

    /*.current_area ul li {
        min-height: 60px;
    }*/

    @media (min-width:320px) and (max-width:767px) {
        #disclaimer {
            padding-top: 7px !important;
            margin-top: 12px !important;
            border-top: 1px solid #ccc;
        }

        .top_conte_box_mob {
            height: 85% !important;
        }

        .energy_mid_box .right_content_box {
            height: 96%;
            margin-bottom: 0;
            padding-bottom: 0px;
        }
    }
</style>

<script>
    var usageType = '';
    var currentHeader, prevHeader;
    $(document).ready(function () {
        try {
            $('.nav_left ul li').click(function () {
                usageType = $(this).attr('usageType');
                $('#hdnUsageType').val(usageType);
                $('#hdnGetExportValue').val('0');
                $('#hdnAddress').val('0');
            });


            $.ajax({
                type: "POST",
                url: "Dashboard.aspx/Setbanners",
                data: '{PlaceHolderID: "' + 7 + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    JSON.parse(response.d) == null ? $('#IDBannerUsage').attr('src', "images/no_img.png") : $('#IDBannerUsage').attr('src', JSON.parse(response.d));
                    $('#IDBannerUsage').error(function () {
                        $(this).attr('src', 'images/no_img.png');
                    });
                },
                error: function (request, status, error) {
                    loader.hideloader();
                }
            });
        }
        catch (ex)
        { }

    });
    function printarea() {
        var printContents = document.getElementsByClassName('current_area')[0].innerHTML
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    $('#ddlAddress').change(function () {
        try {
            $('#hdnAddress').val('1');
            $('#hdnGetExportValue').val('0');
        }
        catch (ex) { }
    });

</script>

<script src="js/detect-zoom.js"></script>

<script type="text/javascript">
    function refresh() {
        var device = $('#devices');

        if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
            $("#devices").addClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
            $("#devices").addClass('inner_uni2');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
            $("#devices").addClass('inner_uni3');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni4');
        }
        else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
            $("#devices").addClass('inner_uni4');
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
        }
        else {
            $("#devices").removeClass('inner_uni1');
            $("#devices").removeClass('inner_uni2');
            $("#devices").removeClass('inner_uni3');
            $("#devices").removeClass('inner_uni4');
        }
    }
    $(document).ready(function () {
        refresh();
        $(window).on('resize', refresh);
    });

</script>

<section class="inner_mid_section" id="TableBill">
    <div class="container inner-mid-container" id="devices">
        <div class="energy_mid_box">
            <h1>
                <img src="images/icon_usage_sidebar.svg" style="padding-right: 7px; margin-top: -1px; float: left;" />
                 <span class="head_icon_flat icon_usage"></span>
                <span globalize="ML_USAGE"><%= CustomerPortal.Translator.T("ML_USAGE") %></span>
                <%--<div class="compare_month solar_css" style="float: right; padding-left: 0px; width: auto;">
                    <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="~/images/table-export.svg" ClientIDMode="Static" Style="cursor: auto" />--%>
                    <%--<a  href="#" >
                    <img src="images/table-export.svg"   Style="margin-top: -1px; cursor:default" /></a>--%>
                    <%--<div style="margin-top: -22px; margin-left: 29px;">
                        <asp:LinkButton ID="lnkExporttoExcel" runat="server" globalize="ML_POWERUSAGE_LBL_ExporttoExcel" Text="Export to Excel" ClientIDMode="Static" OnClick="lnkExporttoExcel_Click" Style="text-decoration: none !important; color: #4a7eb6 !important;"></asp:LinkButton>
                    </div>
                </div>--%>
                <div style="float: right;    margin-top: -7px;">
                     
                    <asp:DropDownList ID="ddlMultiMeter" runat="server" Style="padding-right: 7px;    font-size: 11px; margin-top: -0px; display: none; float: right; width: 130px; margin-right: 10px;" ClientIDMode="Static"></asp:DropDownList>
                     <span id="MeterNumlabel" style="float: right; padding-right: 13px; margin-top: 3px; display: none; font-size: 12px; font-style: normal;" globalize="ML_ErrMsg_MeterNumber"><%= CustomerPortal.Translator.T("ML_ErrMsg_MeterNumber") %></span>
                </div>
            </h1>
          

              
            <span class="spans"><a id="gridreload"  type="button" class="btn btn-lg pagerlink" globalize="ML_Set_Notification" title="Set Usage Notification" data-toggle="modal" data-target="#myModal">
  <i><img src="images/notif-icon.png" /></i><%= CustomerPortal.Translator.TT_ProductName("ML_Set_Notification") %></a></span>

            <div id="headerDResponse" style="display: none">
                <h1>
                    <img src="images/icon-demand-response.png" style="padding-right: 7px; margin-top: -3px; float: left;" />
                    <span globalize="ML_Settings_Span_DemandResp"><%= CustomerPortal.Translator.TT_ProductName("ML_Settings_Span_DemandResp") %></span>

                </h1>
            </div>
            <div class="sidebar_toggle">Sidebar Navgatation</div>
            <div class="nav_left">
                <ul>
                    <li class="sidebar_power" usagetype="PU">
                        <asp:LinkButton ID="PU" OnClick="Common_Click" runat="server" globalize="ML_POWERUSAGE_Navigation_Power" Visible="false"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Power") %></asp:LinkButton></li>
                    <li class="sidebar_water" usagetype="WU">
                        <asp:LinkButton ID="WU" runat="server" OnClick="Common_Click" globalize="ML_POWERUSAGE_Navigation_Water" Visible="false"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Water") %></asp:LinkButton></li>
                    <li class="sidebar_gas" usagetype="GU">
                        <asp:LinkButton ID="GU" runat="server" OnClick="Common_Click" globalize="ML_POWERUSAGE_Navigation_Gas" Visible="false"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Gas") %></asp:LinkButton></li>
                    <li class="sidebar_solar" usagetype="SU">
                        <asp:LinkButton ID="SU" runat="server" OnClick="Common_Click" globalize="ML_SolarGen_h1_Solar" Visible="false"><%= CustomerPortal.Translator.T("ML_SolarGen_h1_Solar") %></asp:LinkButton></li>
                    <% if (CustomerPortal.SessionAccessor.IsDResponse)
                       { %>
                        <li class="sidebar_dresponse" usagetype="DR">
                        <asp:LinkButton ID="DR" runat="server" OnClick="Common_Click" globalize="ML_USAGE_Navigation_Demand_Response" Visible="true">Demand Response</asp:LinkButton>
                        </li>
                    <% } %>
                </ul>

                <div class="banner_left_img" globalize="ML_POWERUSAGE_img_addBanner">
                    <a href="#"><%--programs.aspx--%>
                        <img id="IDBannerUsage" src="" alt="" clientidmode="Static" onclick="BannerClick(this.id);" /></a>
                </div>
            </div>

            <div class="right_content_box preLoader">

                <div class="top_conte_box_mob" style="height: 88%; overflow: auto;">

                    <div runat="server" id="divUsage"></div>
                </div>

                <div id="disclaimer" style="float: left; margin-bottom: 0px; padding-left: 22px;    padding-bottom: 0px;    margin-top: 7px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageDisclaimer) %>!important;">
                    <b><span style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %>:</span> </b>
                    <span id="DisclaimerText" runat="server" style="color: black;" globalize="ML_WU_li_Water"><%= CustomerPortal.Translator.T("ML_WU_li_Water") %></span>
                    <span id="spnWaterMonthly" globalize="ML_Usage_Disclaimer_Water_AllocationMonthly"  style="color:black;display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_Water_AllocationMonthly") %></span>
                    <span id="spnWaterDaily" globalize="ML_Usage_Disclaimer_AllocationDaily"  style="color:black; display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_AllocationDaily") %></span>
                    <span id="spnWaterHourly" globalize="ML_Usage_Disclaimer_AllocationHourly"  style="color:black; display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_AllocationHourly") %></span>

                    <span id="spnPowerMonthly" globalize="ML_Usage_Disclaimer_Power_AllocationMonthly"  style="color:black;display:none;none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_Power_AllocationMonthly") %></span>
                    <span id="spnPowerDaily" globalize="ML_Usage_Disclaimer_PowerAllocationDaily"  style="color:black; display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_PowerAllocationDaily") %></span>
                    <span id="spnPowerHourly" globalize="ML_Usage_Disclaimer_PowerAllocationHourly"  style="color:black; display:none;"><%= CustomerPortal.Translator.T("ML_Usage_Disclaimer_PowerAllocationHourly") %></span>
                
                        </div>
            </div>
        </div>
    </div>
   <%--<----Modal----->--%>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="float: left;width: 100%;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:#fff;font-size:27px;font-weight: normal;">
          <span aria-hidden="true" style="    background-color: #999;border-radius: 50%;padding: 0 8px;">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel" style="color:#446ab3;"><%= CustomerPortal.Translator.TT_ProductName("ML_UsageNotifications") %></h4>
      </div>
      <div class="modal-body">
    <div class="cust_measure1" style="width:100% !important; padding-left:0;    height: 340px;overflow: auto;">
                            <div class="usagetopheader">
                                    <div class="setusagenotif_meter">
                                        <h5><%= CustomerPortal.Translator.TT_ProductName("ML_Meter_No") %></h5>
                                    </div>
                                    <div class="setusagenotif">
                                        <h5><%= CustomerPortal.Translator.TT_ProductName("ML_DailyAlert") %></h5>
                                    </div>
                                    <div class="setusagenotif">
                                        <h5 style="margin-left: 5px"><%= CustomerPortal.Translator.TT_ProductName("ML_MonthlyAlert") %></h5>
                                    </div>
                                </div>
                                </div>
      </div>
      <div class="modal-footer" style="float: left;width: 100%;padding:16px 20px 0;border-top-width:1px;">
          <button type="button" class="btn btn-primary submit-button" id="btnSave" style="border-color: #357ebd;border-radius: 4px!important;">Save</button>
        <button type="button" class="btn btn-secondary submit-button" data-dismiss="modal" style="border-color: #357ebd;border-radius: 4px!important;">Close</button>
        
      </div>
    </div>
  </div>
</div>
</section>
<style>

    .setusagenotif_top {
       padding: 0px 0px;
    width: 100%;
    float: left;
    border-bottom: 1px solid #ececec;
    }

    .setusagenotif_top:hover {
    background:#f7f7f7;
    }

    .setusagenotif_top:nth-child(2n+1){
    background:#f7f7f7;
    }

   .setusagenotif_top label {
    color:#446ab3;
        padding-top: 6px;
    padding-bottom: 6px;
    }

    .setusagenotif_meter h5 {
    color:#446ab3 !important;
    }


    .setusagenotif {
        padding:8px 0px 0 19px;
        width:37.33%;
        float:left;
    }

     .setusagenotif_meter {
        padding:8px 0px 0 19px;
        width:25%;
        float:left;
    }

    .usagetopheader {
        background:#ececec;
    border-bottom:1px solid #ccc;
    float:left;
    width:100%;
        }

    #myModal .modal-body {
        float:left;
    width:100%;
    }


    .setusagenotif_top select {
    border: 1px solid #d6d6d6;
    padding: 5px 0;
    width: 27%;
    height: 27px;
    margin-left: 10px;
}

     .setusagenotif input[type="checkbox"] {
            width: 20px!important;
            margin: 7px 0px;
    }


</style>
<asp:HiddenField runat="server" ID="hdnUsageType" ClientIDMode="Static" EnableViewState="false" />
<asp:HiddenField runat="server" ID="hdnGetExportValue" ClientIDMode="Static" Value="0" />
<asp:HiddenField runat="server" ID="hdnAddress" ClientIDMode="Static" Value="0" />
<span globalize="ML_Usage_Lbl_Period" id="periodtext" style="display: none"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_Period") %></span>
<span globalize="ML_Settings_Lbl_To" id="totext" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_To") %></span>
<span globalize="ML_Usage_Hourly_Usage_For" id="textHourlyUsage" style="display: none"><%= CustomerPortal.Translator.T("ML_Usage_Hourly_Usage_For") %></span>
<span globalize="ML_Usage_Lbl_15MinUsageFor" id="text15MinUsage" style="display: none"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_15MinUsageFor") %></span>
<span id="lblUDollar" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Dollar") %> </span>
<span id="lblUGDollar" style="display: none;" globalize="ML_Graph_Lbl_Gen_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Dollar") %></span>
<span id="lblPKWH" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Kwh") %></span>
<span id="lblGCCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Gas"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Gas") %> </span>
<span id="lblWGL" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Galon"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Galon") %> </span>
<span id="lblWHCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_HCF"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_HCF") %> </span>
<span id="lblPUKWH" style="display: none;" globalize="ML_Graph_Lbl_Gen_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Kwh") %> </span>
<span id="ML_Dashboard_Lbl_NoUsageData" style="display: none;" globalize="ML_Dashboard_Lbl_NoUsageData"><%= CustomerPortal.Translator.T("ML_Dashboard_Lbl_NoUsageData") %> </span>
