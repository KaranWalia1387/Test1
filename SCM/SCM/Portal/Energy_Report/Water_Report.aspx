<%@ Page Title="My Home Report" Language="C#" AutoEventWireup="true" CodeBehind="Water_Report.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Energy_Report.Water_Report" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">

    <title>SCM - Dashboard</title>
     <%: System.Web.Optimization.Styles.Render("~/Content/cssWater_Report") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsWater_Report")%>
   <%-- <script src="../js/Water_Report.js"></script>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/Water_Report.css" rel="stylesheet" />
    <script src="../js/highchart_js/common-chart.js"></script>
    <script src="../js/highchart_js/highcharts.js"></script>--%>
  
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script type="text/javascript">
       

        $(document).ready(function () {
            //WaterAverageValues();
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power, false) == false)
                { %>
            $('#li_power').attr('style', 'display: none');
            <% }%>
           
            // commented becouse this code already exist in its js
            //waterrange = comUsage.LoadWaterRange().value;

            //data_water = Water_Report.LoadSavingTips().value;
            //if (data_water.Rows.length > 0) {
            //    $('#water_title_1').text(data_water.Rows[0].Title);
            //    $('#water_desc_1').text(data_water.Rows[0].Description);
            //}
            //if (data_water.Rows.length > 1) {
            //    $('#water_title_2').text(data_water.Rows[1].Title);
            //    $('#water_desc_2').text(data_water.Rows[1].Description);
            //}
            //if ($("#hdnWUKWH").val() == "0")
            //    loadWaterusage('D', '$$');
            //else
            //    loadWaterusage('D', 'HCF');

        });


        // commented becouse this code already exist in its js
        //function BindPieChart_WaterRep(id, axisname, processed_json1) {

        //    try {
        //        $('#' + id).highcharts({
        //            credits: {
        //                enabled: false
        //            },
        //            chart: {
        //                type: 'pie',

        //            },

        //            plotOptions: {
        //                series: {
        //                    dataLabels: {
        //                        enabled: true,
        //                        format: '<b>{point.name}</b> %',
        //                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        //                        softConnector: true,

        //                    }
        //                },
        //                pie: {
        //                    innerSize: 100
        //                }
        //            },
        //            tooltip: {

        //                formatter: function () {

        //                    return '<b>' + this.point.series.name + ': </b>' + this.point.name + '%' + '<br><b>Duration: </b>' + this.point.title;

        //                }
        //            },
        //            legend: {
        //                enabled: true
        //            },
        //            title: {
        //                verticalAlign: 'middle',
        //                floating: true,
        //                text: ''
        //            },


        //            series: [{

        //                name: axisname,
        //                data: processed_json1

        //            }]
        //        });
        //    }
        //    catch (e) {
        //        console.log(e.message);
        //    }

        //}

        //function WaterAverageValues() {

        //    sum = 0;
        //    DollarMonthlyAvg = 0;
        //    DollarDailyAvg = 0;
        //    waterUsageDollarMonth = comUsage.LoadWaterUsage('D', 'M', "", 'H', "", '0', "").value;
        //    for (i = 0; i < waterUsageDollarMonth.Rows.length; i++) {
        //        sum += waterUsageDollarMonth.Rows[i].TotalValue;
        //    }
        //    DollarMonthlyAvg = sum / waterUsageDollarMonth.Rows.length;
        //    DollarDailyAvg = DollarMonthlyAvg / 30;
        //    $('#dollarpermonth').html('$' + DollarMonthlyAvg.toFixed(2) + ' per month.');
        //    $('#dollarperday').html('$' + DollarDailyAvg.toFixed(2) + ' per day.');

        //    sum = 0;
        //    GallonMonthlyAvg = 0;
        //    GallonDailyAvg = 0;
        //    usageDataGallonMonth = comUsage.LoadWaterUsage('G', 'M', "", 'H', "", '0', "").value;
        //    for (i = 0; i < usageDataGallonMonth.Rows.length; i++) {
        //        sum += usageDataGallonMonth.Rows[i].TotalValue;
        //    }
        //    GallonMonthlyAvg = sum / usageDataGallonMonth.Rows.length;
        //    GallonDailyAvg = GallonMonthlyAvg / 30;
        //    $('#gallonpermonth').html(GallonMonthlyAvg.toFixed(2) + 'Gallon per month.');
        //    $('#gallonperday').html(GallonDailyAvg.toFixed(2) + 'Gallon per day.');
        //}

        ////Creates dynamic date range
        //function createDateLabel(usageData) {
        //    var from = new Date(usageData.Rows[0].UsageDate);
        //    var to = new Date(usageData.Rows[usageData.Rows.length - 1].UsageDate);
        //    var dt;
        //    var month = new Array();
        //    month[0] = "January";
        //    month[1] = "February";
        //    month[2] = "March";
        //    month[3] = "April";
        //    month[4] = "May";
        //    month[5] = "June";
        //    month[6] = "July";
        //    month[7] = "August";
        //    month[8] = "September";
        //    month[9] = "October";
        //    month[10] = "November";
        //    month[11] = "December";
        //    var m1 = month[from.getMonth()];
        //    var m2 = month[to.getMonth()];
        //    if (from.getFullYear() == to.getFullYear()) {
        //        dt = m1 + " " + from.getDate() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
        //    }
        //    else {
        //        dt = m1 + " " + from.getDate() + ", " + from.getFullYear() + " to " + m2 + " " + to.getDate() + ", " + to.getFullYear();
        //    }
        //    $('#dvDateRange').text(dt);
        //}

        //function loadWaterusage(mode, Type) {
        //    try {
        //        var yaxisname = Type == "HCF" ? 'HCF' : '$';
        //        if (Type == 'G') {
        //            yaxisname = 'GL';
        //        }
        //        if (Type == "HCF")
        //            Type = "W";
        //        else
        //            Type = "D";
        //        loadRange(Type, mode, "E", waterrange);
        //        var usageData = comUsage.LoadWaterUsage(Type, "D", "", "H", "0", "0", "0").value;//added default houlytype "H" for 15 mins data
        //        if (!(usageData == null || usageData.Rows.length == 0)) {
        //            // drawgaugechart(usageData.Rows[usageData.Rows.length - 1].TotalValue, usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, "divWaterUsage", mode,'#0082cc');
        //            //drowDonutChart('#0082cc', usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2, usageData.Rows[usageData.Rows.length - 1].TotalValue, "divWaterUsage");
        //            //$('#divWaterUsageText').html('<b>' + usageData.Rows[usageData.Rows.length - 1].TotalValue.toFixed(TO_FIX) + '</b></br> of ' + (usageData.Rows[usageData.Rows.length - 1].TotalValue * 1.2).toFixed(OF_FIX));
        //            var startindex = 0;
        //            if (usageData.Rows.length > 7) {
        //                startindex = usageData.Rows.length - 7;
        //            }

        //            createDateLabel(usageData);

        //            processed_json = new Array();
        //            $.map(usageData.Rows, function (obj, i) {
        //                if (i >= startindex) {
        //                    processed_json.push({
        //                        name: obj.UsageDate.substring(0, obj.UsageDate.lastIndexOf('/')),
        //                        y: obj.TotalValue,
        //                        color: setcolor(obj.TotalValue)
        //                    });
        //                }
        //            });
        //            BindheighDashboard_EnergyRpt('column', 'divWaterUsage', '', yaxisname);
        //        }
        //    }
        //    catch (e) {
        //        console.log(e.message);
        //    }
        //}

        //function loadRange(type, mode, rangeType, range) {
        //    //type = type == "C" ? "K" : type;
        //    mode = mode == "$$" ? "D" : mode;
        //    //if (rangeType == 'E') {
        //    for (var r = 0; r < range.Rows.length; r++) {
        //        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
        //            lowRange = range.Rows[r]["LowRange"];
        //            highRange = range.Rows[r]["MiddleRange"];
        //            break;
        //        }
        //    }
        //    //}
        //}

        //function setcolor(usagevalue) {
        //    var color = '#FFFFFF';
        //    if (usagevalue <= lowRange) {
        //        color = '#94D60A';
        //    }
        //    else if (usagevalue > lowRange && usagevalue <= highRange) {
        //        color = '#F8A13F';
        //    }
        //    else if (usagevalue > highRange) {
        //        color = '#ba3d4b';
        //    }
        //    return color;

        //}

    </script>

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <span globalize="ML_Title_Efficiency_Rank" id="titletext" style="display: none"></span>
     <span globalize="ML_Budget_My_Lbl_Effecient_Neighbor" id="Efficient" style="display: none"></span>
    <span globalize="ML_Billing_Span_Inefficient" id="Inefficient" style="display: none"></span>
    <span globalize="ML_Budget_My_Lbl_You" id="Yourself" style="display: none"></span>
    <span globalize="ML_YearlyBudget_Span_Msg_YAXIS" id="yAxisMsg" style="display: none"></span>
    <span globalize="ML_Budget_My_Lbl_Rank" id="yAxisRank" style="display: none"></span>
    <div class="top_main_area">
        <ul class="nav nav-tabs fixed_tabs" role="tablist">
            <li id="li_power"><a href="Energy_Report.aspx" globalize="ML_POWERUSAGE_Navigation_Power"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Power") %></a></li>
            <li class="active2"><a href="Water_Report.aspx" globalize="ML_POWERUSAGE_Navigation_Water"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Water") %></a></li>
        </ul>
    </div>
    <div class="right_content_box">
        <div class="energy_mid_box_2_left">
            <div class="energy_mid_box-2">
                <div class="tab-content">
                    <div class="tab-pane fade active in" id="water">
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <div class="account_info">
                                <h1 ><span globalize="ML_div_Efficiency_ActSummry"><%= CustomerPortal.Translator.T("ML_div_Efficiency_ActSummry") %></span>  </h1>
                                <div class="bill_summary account_summry_main">
                                    <ul>
                                        <li>
                                            <p globalize="ML_BILLDASHBOARD_Lbl_TotalBilling"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_TotalBilling") %><span></span></p>
                                            <p globalize="ML_BILLING_Lbl_PreviousBalanceDue"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_PreviousBalanceDue") %><span></span></p>
                                        </li>
                                        <li>
                                            <p globalize="ML_BILLDASHBOARD_Lbl_PenalyCharges"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_PenalyCharges") %><span></span></p>
                                            <p globalize="ML_div_Efficiency_BillPeriod"><%= CustomerPortal.Translator.T("ML_div_Efficiency_BillPeriod") %> <span></span></p>
                                        </li>
                                        <li>
                                            <p globalize="ML_div_Efficiency_TotAmtOweBy"><%= CustomerPortal.Translator.T("ML_div_Efficiency_TotAmtOweBy") %><span></span></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- First Col End Here -->
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <div class="account_info" style="background: #f3f4f4; margin-top: 11px; padding: 3px 9px 14px; width: 100%;float:left;">
                                <h1 style="padding-bottom: 7px; background: none !important;"><span globalize="ML_div_Efficiency_HowYouRank"><%= CustomerPortal.Translator.T("ML_div_Efficiency_HowYouRank") %>                                 
                                    </span>
                                      <ul class="rating_box1">
                                        <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star_hover.png" /></li>
                                    </ul>
                                </h1>
                                <div class="new_rank">
                                    <b id="UsageDate"></b>
                                    <p globalize="ML_div_Efficiency_WaterUsgHigher"><%= CustomerPortal.Translator.T("ML_div_Efficiency_WaterUsgHigher") %>.</p>
                                </div>
                                <div class="rank_bottom_progress_bar">
                                    <div class="glns_per_day">
                                        <div id="chartDiv" style="width: 99%; height: 150px; float: left;margin-top: 17px;">
                                        </div>
                                       <%-- <ul>
                                            <li>
                                                <div class="heading_name">Efficient Use Target</div>
                                                <span class="line_gdp_gray"></span><span class="gdp_text_gray"></span>
                                            </li>
                                            <li>
                                                <div class="heading_name">Average Neighbors</div>
                                                <span class="line_gdp_blue"></span><span class="gdp_text_blue"></span>
                                            </li>

                                            <li>
                                                <div class="heading_name" style="color: #94c23b; font-size: 15px;">You</div>
                                                <span class="line_gdp_green"></span><span class="gdp_text_green"></span>
                                            </li>
                                        </ul>--%>
                                    </div>
                                                                       
                                </div>
                            </div>
                        </div>
                        <!-- Second Col End Here -->
                    </div>
                </div>
                <!-- tab End -->
            </div>
            <!--  First Energy End -->

            <!----Bottom Phase Start-->
            <div class="col-xs-12 col-md-12 col-sm-12">
                <div class="account_info" style="padding-left: 20px;width: 97.8%;">
                    <h1 style="padding-bottom: 7px; background: none !important;"><span globalize="ML_div_Efficiency_HowYouCmp"></span></h1>
                    <p globalize="ML_div_Efficiency_BelowYouWillWater"><%= CustomerPortal.Translator.T("ML_div_Efficiency_BelowYouWillWater") %></p>
                        <div class="lgnd_box">
                          <ul>
                              <li>
                                <span style="background-color: #c66c6c; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
                                <asp:Label ID="lblMonthavglabel" runat="server" Style="color:#c66c6c; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>&nbsp;
                                <asp:Label ID="lblMonthavg" Style="color: #c66c6c; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
                               </li>                           
                                <li>
                                <span style="background-color: #7bab91; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>
                                <asp:Label ID="lblPreveslabel" runat="server" Style="color: #7bab91; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>&nbsp;
                                <asp:Label ID="lblPreves" Style="color: #7bab91; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
                               </li>
  
                               
                           </ul>
                      
                       </div>
                     <div class="EfficiencyGraphContainer" style="width: 100%;padding: 1px 10px;background: #f4f4f4;float: left;margin-bottom: 15px;">
                        <div class="EfficiencyGraphdiv">
                            <b>
                                <div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px; display:none;" globalize="ML_Budget_My_Lbl_Less_Efficient">
                                   <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Less_Efficient") %>
                                </div>
                            </b>                                                   
                         
                            <div class="EfficiencyGraphRedColor">
                                &nbsp;
                            </div>
                            <div class="EfficiencyGraphData">
                            </div>
                        </div>
                        <div class="EfficiencyGraph">
                            <div id="chartNeighboursDiv" style="width: 98%; height: 170px">
                            </div>

                        </div>
                        <div class="EfficiencyGraphdiv" style="display:none;">
                            <b>
                                <div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px; display:none;" globalize="ML_Budget_My_Lbl_More_Efficient">
                                   <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_More_Efficient") %>
                                </div>
                            </b>
                            <div class="EfficiencyGraphGreenColor">
                                &nbsp;
                            </div>
                            <div class="EfficiencyGraphData">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="energy_mid_box-2">
                <div class="tab-content">
                    <div id="waters" class="tab-pane fade active in">
                        <div class="col-xs-12 col-md-6 col-sm-12 teat_styles">
                            <div class="account_info right_text_styles">
                                <h1><span globalize="ML_div_Efficiency_HowAmIUsingWater"><%= CustomerPortal.Translator.T("ML_div_Efficiency_HowAmIUsingWater") %></span></h1>
                                <p>An estimated 65% of your quaterly use is used inside of your home.</p>
                            </div>
                            <div class="right_chart_area use_power_box">
                                <div id="divPieChart2" style="width: 350px !important; height: 250px !important;"></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <h1><span globalize="ML_div_Efficiency_WaterSavingTips"><%= CustomerPortal.Translator.T("ML_div_Efficiency_WaterSavingTips") %></span></h1>
                            <div class="water_score_new_tips_area" id="water_tip1">
                                <p>
                                    <img src="images/replace-shower.png" align="left" />
                                    <div id="water_title_1"><b>Install a faucet aerator</b></div>
                                    <div id="water_desc_1">Aerators are small devices that attach to the faucet to reduce water flow. They often make the flow more forceful, giving you more effective wetting and rinsing.</div>
                                    <div class="water_score_new_gallon">
                                        <ul>

                                            <li>
                                                <img src="images/drop-small-icon.png" align="left" /><div id="gallonpermonth"></div>
                                            </li>

                                            <li>
                                                <img src="images/saving-icon.png" align="left" /><div id="dollarpermonth"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </p>

                            </div>
                            <div class="clearfix"></div>
                            <div class="water_score_new_tips_area not_points" id="water_tip2">
                                <p>
                                    <img src="images/save-money-clothes.png" />
                                    <div id="water_title_2"><b>Automated Sprinklers</b></div>
                                    <div id="water_desc_2">Install automatic sprinklers to regulate how much water you're using and how often you water.</div>
                                    <div class="water_score_new_gallon">
                                        <ul>

                                            <li>
                                                <img src="images/drop-small-icon.png" align="left" />
                                                <div id="gallonperday"></div>
                                            </li>

                                            <li>
                                                <img src="images/saving-icon.png" align="left" /><div id="dollarperday"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        <!----First Phase End-->
       <div class="energy_mid_box_right">
                <div class="energy_mid_box-2">
                    <div class="tab-content">
                        <div id="waters" class="tab-pane fade active in" style="background: #f3f4f4;    padding-bottom: 5px;">

                            <div class="col-xs-10 col-md-7 col-sm-10 teat_styles">
                                <h1 style="background: none;"><span globalize="ML_div_Efficiency_WantToKnowMore"><%= CustomerPortal.Translator.T("ML_div_Efficiency_WantToKnowMore") %></span></h1>
                                <div class="socail_media_icons">
                                    <p globalize="ML_div_Efficiency_DownloadTheApp"><%--Download the app for free from the Apple App Store or Google Play Store.--%>Download the mobile app to see more actions and sigh up for savings. Scan Here.</p>
                                </div>
                            </div>

                            <div class="col-xs-2 col-md-5 col-sm-2 teat_styles">
                                <div class="socail_media_icons" style="float:right;margin-top:5px;">
                                    <ul>
                                       <li><a href="#">
                                             <img src="images/captcha.png" /></a></li>
<%--                                        <li><a href="#">
                                            <img src="images/app-store.png" /></a></li>
                                        <li><a href="#">
                                            <img src="images/google-play.png" /></a></li>--%>
                                    </ul>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

   <%-- <script src="js/bootstrap.min.js"></script>--%>
    <script>
        //function setname(index) {
        //    var name = '';
        //    if (index == 0) {
        //        name = $('#Efficient').text();
        //    }
        //    else if (index == 1) {
        //        name = $('#Yourself').text();
        //    }
        //    else if (index == 2) {
        //        name = $('#Inefficient').text();
        //    }
        //    return name;

        //}
        $(document).ready(function () {
           
        });

        //$(document).ready(function () {
        //    processed_json = new Array();

        //    $.map(jsonData, function (obj, i) {
        //        processed_json.push({
        //            name: setname(0),
        //            y: obj.AboveMe,
        //            color: '#52c43a'
        //        }),
        //         processed_json.push({
        //             name: setname(1),
        //             y: Math.abs(obj.MyDifference),
        //             color: ((parseInt(obj.MyDifference)) > 0 ? "#52c43a" : "#d63d4e")
        //         }),
        //         processed_json.push({
        //             name: setname(2),
        //             y: Math.abs(obj.BelowMe),
        //             color: '#d63d4e'
        //         })
        //        ;
        //    });
        //    showindecimal = true;
        //    //  BindheighEff('column', 'chartDivs')
        //    Bindbarheigh('bar', 'chartDivs')
        //});

    </script>    
</asp:Content>
