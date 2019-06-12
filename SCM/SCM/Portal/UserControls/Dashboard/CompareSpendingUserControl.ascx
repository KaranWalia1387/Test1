<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompareSpendingUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.Dashboard.CompareSpendingUserControl" %>
<style type="text/css">
    .compare_text_mob > a img {
            margin-right: 8px
    }
</style>      

 <div class="preLoader col-xs-12 col-sm-6 col-md-3 padding_L inner-dashboard-area connectedSortable ui-widget-content " id="CompareSpendingModule" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Compare) %>" >
                   <div class="tablet-view">
                    <h3 class="compare_text_mob"><a href="Compare-Spending.aspx"><img src="images/icon_dashboard_heading/icon_compare_spending_heading.svg" /><span class="icon icon-icon-cs-sidebar"></span><span globalize="ML_DASHBOARD_Lbl_CompareSpending"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_CompareSpending") %></span></a> </h3>
                                        	
                        <div class="right-dolar-top-area" style="margin-right: 3px;">
                            <div class="SpanRight" style="max-width:65px;">
                            <a href="#" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareMe,true,"inline") %>"><img id="imgCompareSpendingPrev" src="images/utility-icon.svg" title="Compare with previous month" globalize="ML_COMPAREME_DASHWIDGET"  style="float: left;    height: 22px;padding: 5px 0 0 2px;display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareMe) %>"/></a>
                            <a href="#" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareUtility,true,"inline") %>"><img id="imgCompareSpendingUtl" src="images/neighbour-icon.svg" title="Compare with neighbour" globalize="ML_COMPNEIGHBOUR_DASHWIDGET"  style="float: left;padding: 5px 0 0 2px;height:21px;" /></a>
                            <a href="#" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareZip,true,"inline") %>"><img id="imgCompareSpendingZip" src="images/zip-icon.svg"  title="Compare with zip " globalize="ML_COMPAREZIP_DASHWIDGET"  style="float: left;padding: 5px 0 0 2px;    height: 22px;"/></a>
                            </div>
                        </div>
                        <div>                                    
                            <asp:DropDownList ID="drpCompare" runat="server" CssClass="compare_select_1"  ClientIDMode="Static"  globalize="ML_COMPARE_SERVICETYPE_DASHWIDGET">
                            </asp:DropDownList>
                        </div>
                        <div class="compare-area divCompareSpendingPrev" id="divCompareSpendingPrev" style="display:none;">
                        
                        </div>

                        <div class="compare-area divCompareSpendingUtl" id="divCompareSpendingUtl" style="display:none;" ></div>

                        <div class="compare-area divCompareSpendingZip" id="divCompareSpendingZip" style="display:none;" ></div>
                
                        </div></div>
<span id="LessUsage" style="display: none" globalize="ML_Dashboard_Msg_LessUsage"><%= CustomerPortal.Translator.T("ML_Dashboard_Msg_LessUsage") %></span>
<span id="MoreUsage" style="display: none" globalize="ML_Dashboard_Msg_MoreUsage"><%= CustomerPortal.Translator.T("ML_Dashboard_Msg_MoreUsage") %></span>
    
<script type="text/javascript">
    $(document).ready(function () {
        setDropdowns();
        loadcomparespending();
        $('#imgCompareSpendingPrev').click(function () {
            $('#imgCompareSpendingPrev').attr('src', 'images/utility-icon_hover.svg');
            $('#imgCompareSpendingUtl').attr('src', 'images/neighbour-icon.svg');
            $('#imgCompareSpendingZip').attr('src', 'images/zip-icon_hover.svg');
            $('#divCompareSpendingPrev').show();
            $('#divCompareSpendingUtl').hide();
            $('#divCompareSpendingZip').hide();
            return false;
        });

        $('#imgCompareSpendingUtl').click(function () {
            $('#imgCompareSpendingPrev').attr('src', 'images/utility-icon.svg');
            $('#imgCompareSpendingUtl').attr('src', 'images/neighbour-icon_hover.svg');
            $('#imgCompareSpendingZip').attr('src', 'images/zip-icon_hover.svg');
            $('#divCompareSpendingPrev').hide();
            $('#divCompareSpendingUtl').show();
            $('#divCompareSpendingZip').hide();
            return false;
        });
        $('#imgCompareSpendingZip').click(function () {

            $('#imgCompareSpendingPrev').attr('src', 'images/utility-icon.svg');
            $('#imgCompareSpendingUtl').attr('src', 'images/neighbour-icon.svg');
            $('#imgCompareSpendingZip').attr('src', 'images/zip-icon.svg');

            $('#divCompareSpendingPrev').hide();
            $('#divCompareSpendingUtl').hide();
            $('#divCompareSpendingZip').show();
            return false;
        });
    })

    function loadcomparespending() {
        var utility = $("#drpCompare").val();
        var unit = 'kWh';
        var unittype = 'K';
        var responses = null;
        switch (utility) {
            case 'Water':
                if ($("#hdnWUKWH").val() == "1") {
                    unit = ' HCF';
                    unittype = 'K';
                } else { unit = ' Gal'; unittype = 'G'; }
                $.ajax({
                    type: "POST",
                    url: "dashboard.aspx/GetPercentageDifferenceCSWater",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({ 'Type': unittype }),
                    success: function OnSuccess(response) {
                        loadData(response, unit);
                    },
                    error: OnErrorCS,
                });
                break;
            case 'Power': unit = ' kWh';
                $.ajax({
                    type: "POST",
                    url: "dashboard.aspx/GetPercentageDifferenceCS",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function OnSuccess(response) {
                        loadData(response, unit);
                    },
                    error: OnErrorCS,
                });
                break;
            case 'Gas':
                unit = ' CCF';
                $.ajax({
                    type: "POST",
                    url: "dashboard.aspx/GetPercentageDifferenceCSGas",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",                   
                    success: function OnSuccess(response) {
                        loadData(response, unit);
                    },
                    error: OnErrorCS,
                });
        };
    }



    function loadData(fnResponses, unit) {
        try {
            var JSONDoc = fnResponses.d;
            if (JSONDoc != null) {
                if (JSONDoc != undefined)
                    var current = Number(JSONDoc.me);
                var previous = Number(JSONDoc.previous);
                var utility = Number(JSONDoc.utiltiy);
                var zip = Number(JSONDoc.zip);
                var diffPerCurrent = previous == 0 ? 0 : (Math.abs(((previous - current) * 100) / previous));

                if ($('#hdnCompareMe').val() == "True") {
                    var strTextCurrent = "";
                    if (current == 0 && previous == 0) {
                        strTextCurrent = $('#lblusageequalto').text();

                    }
                    else if (diffPerCurrent != 0) {

                        strTextCurrent = (Math.abs(diffPerCurrent).toFixed(0) + '% ' + (current < previous ? $('#LessUsage').text() : $('#MoreUsage').text()));
                    }
                    else {
                        strTextCurrent = $('#lblusageequalto').text();
                    }

                    var perMe = current < previous ? 100 - diffPerCurrent : 100;
                    if (current == 0) {
                        perMe = 0;
                    }
                    var perPrev = current < previous ? 100 : 100 - diffPerCurrent;
                    if (previous == 0) {
                        perPrev = 0;
                    }
                    $(".divCompareSpendingPrev").html(NoCompareDiv);
                    $(".divCompareSpendingPrev").html("<strong><span>" + strTextCurrent + "</span></strong>"
                                                + "<i>" + $('#CheckPrevMnth').text() + "</i>"
                                                    + "<div class='compare_section'>"
                                                    + "<div title='" + changetoK(current) + unit + " ' style='height:" + perMe + "%;' class='" + "green_compare" + "' ></div>"
                                                    + "<div title='" + changetoK(previous) + unit + " ' style='height:" + perPrev + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                                    + "</div>");
                }
                else {
                    $("#imgCompareSpendingPrev").hide();
                }

                if ($('#hdnCompareUtility').val() == "True") {
                    var diffPerUtility =utility==0? 0:Math.abs(((utility - current) * 100) / utility);
                    var strTextUtility = "";
                    if (diffPerUtility != 0) {
                        strTextUtility = (Math.abs(diffPerUtility).toFixed(0) + '% ' + (current < utility ? $('#LessUsage').text() : $('#MoreUsage').text()));
                    }
                    else {
                        strTextUtility = $('#lblusageequalto').text();
                    }
                    if (current == 0 && utility == 0) {
                        strTextUtility = $('#lblusageequalto').text();
                    }
                    if (current == 0) {
                        perMe = 0;
                    }
                    perMe = current < utility ? 100 - diffPerUtility : 100;
                    if (current == 0) {
                        perMe = 0;
                    }
                    var perUtility = current < utility ? 100 : 100 - diffPerUtility;
                    if (utility == 0) {
                        perUtility = 0;
                    }
                    $(".divCompareSpendingUtl").html(NoCompareDiv);
                    $(".divCompareSpendingUtl").html("<strong><span>" + strTextUtility + "</span></strong>"
                                                + "<i>" + $('#CompNeighbourhood').text() + "</i>"
                                                    + "<div class='compare_section'>"
                                                    + "<div title='" + changetoK(current) + unit + " ' style='height:" + perMe + "%;'  class='" + "green_compare" + "' ></div>"
                                                    + "<div title='" + changetoK(utility) + unit + "' style='height:" + perUtility + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                                    + "</div>");
                }
                else {
                    $("#imgCompareSpendingUtl").hide();
                }

                // Zip
                if ($('#hdnCompareZip').val() == "True") {
                    var diffPerZip =zip==0?0 : Math.abs(((current - zip) * 100) / zip);
                    // bug id -16578
                    var strTextZip = "";
                    if (diffPerZip != 0) {
                        strTextZip = (Math.abs(diffPerZip).toFixed(0) + '% ' + (current < zip ? $('#LessUsage').text() : $('#MoreUsage').text()));
                    }
                    else {
                        strTextZip = $('#lblusageequalto').text();
                    }
                    if (current == 0 && zip == 0) {
                        strTextZip = $('#lblusageequalto').text();
                    }
                    perMe = current < zip ? 100 - diffPerZip : 100;
                    if (current == 0) {
                        perMe = 0;
                    }
                    var perZip = current < zip ? 100 : 100 - diffPerZip;
                    if (zip == 0) {
                        perZip = 0;
                    }
                    $(".divCompareSpendingZip").html(NoCompareDiv);
                    $(".divCompareSpendingZip").html("<strong><span>" + strTextZip + "</span></strong>"
                                                + "<i>" + $('#CompZip').text() + "</i>"
                                                    + "<div class='compare_section'>"
                                                    + "<div title='" + changetoK(current) + unit + " ' style='height:" + perMe + "%;'  class='" + "green_compare" + "' ></div>"
                                                    + "<div  title='" + changetoK(zip) + unit + " ' style='height:" + perZip + "%;' class='compare_margin " + "gray_compare" + "' ></div>"
                                                    + "</div>");

                }
                else {
                    $("#imgCompareSpendingZip").hide();

                }

            }
            else {

                $(".divCompareSpendingZip").html(NoCompareDiv);
                $(".divCompareSpendingPrev").html(NoCompareDiv);
                $(".divCompareSpendingUtl").html(NoCompareDiv);

            }
        }
        catch (e) {

            console.log(e.message);
        }
        $("#CompareSpendingModule").removeClass("preLoader");
    }


    function OnErrorCS(response) {
   
        $("#CompareSpendingModule").removeClass("preLoader");
        $(".divCompareSpendingZip").html(NoCompareDiv);
        $(".divCompareSpendingUtl").html(NoCompareDiv);
        $(".divCompareSpendingPrev").html(NoCompareDiv);

        console.log(e);
    }
</script>