<%@ Page Title="Budget My Bill" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="BudgetBill.aspx.cs" Inherits="CustomerPortal.BudgetBill" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <input type="hidden" class="activeli_list" value="billing" />
    <script type="text/javascript">
        var lowRange;
        var highRange;
        var range;
        var jsonData;
        var type;
        var mode;
        var highcolor = ''; //'#ea557b';
        var lowcolor = '';//'#4adea0';
        var avgcolor = '';//'#e9cc57';
        var setbudget = '';
        $(window).load(function () {
            var message = "<h5>Help</h5><div class='ui divider'></div>";
            message += '<%= Dtbudgetbill.Rows[0]["NotifyText"].ToString() %>';
            $('#budgethelplink').attr('data-html', message);
        });

        $(document).ready(function () {
            $.ajax({
                type: "POST",
                url: "Usages.aspx/BindColorCodes",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ 'Mode': 2 }),
                success: function (data) {
                    var result = $.parseJSON(data.d);
                    for (var i = 0; i < result.Table.length; i++) {
                        if (result.Table[i].ModuleName == 'BudgetMyBill') {
                            if (result.Table[i].ConfigOption == 'MyUsage') {
                                highcolor = result.Table[i].ConfigValue;
                                $('.GraphLegend_low').css({ "background-color": highcolor });
                            }
                            else if (result.Table[i].ConfigOption == 'ZipAverage') {
                                lowcolor = result.Table[i].ConfigValue;
                                $('.GraphLegend_High').css({ "background-color": lowcolor });
                            }
                            else if (result.Table[i].ConfigOption == 'MyBudget') {
                                avgcolor = result.Table[i].ConfigValue;
                                $('.GraphLegend_Avg').css({ "background-color": avgcolor });
                            }
                        }
                    }


                    setbudget = $('#SliderMax').text();
                    document.getElementById("btnSaveChanges").accessKey = "b";
                    $('.active').removeClass('active');
                    $('.icon_budget_bill').addClass('active');
                    changeactivelinkcolor();
                    $('.icon_budget_bill').click(function (e) {
                        e.preventDefault();
                    });

                    //This code is used to get the usertype.
                    var sessval = '<%=Session["Usertype"]%>';
                    if (sessval == "CCE") { $('#btnSaveChanges').hide(); }

                    //This code is used to get the usertype.
                    $('.toggle').click(function () {
                        if ($(this).attr('class') == 'toggle OnBtnClass') {
                            $(this).val($('#offtext').text());
                            $(this).addClass('OffBtnClass').removeClass('OnBtnClass');
                        }
                        else {
                            $(this).val($('#ontext').text());
                            $(this).addClass('OnBtnClass').removeClass('OffBtnClass');
                        }
                    });

                    $('#powercalculation').click(function () {
                        Popup.showModal('divpopuppower', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
                    });
                    $('#BtnClosepower').click(function () {
                        Popup.hide('divpopuppower');
                    });

                    function validateRange(ele) {
                        toastr.clear();
                        if (ele.val() != '') {
                            if (parseInt(ele.val()) < 1) {
                                $('#txtSetBudget').blur();
                                toastr.warning($('#MinBudgetErr').text())
                                $('#' + '<%=txtSetBudget.ClientID%>').val('1');
                            }
                            if (parseInt(ele.val()) > parseInt(setbudget)) {
                                $('#txtSetBudget').blur();
                                var MaxBudget = $('#MaxBudgetErr').text();
                                var str = MaxBudget.replace("XXXXX", parseInt(setbudget));
                                toastr.warning(str);
                                 
                                $('#' + '<%=txtSetBudget.ClientID%>').val(setbudget);
                            }
                        }
                    }

                    $('#' + '<%=txtSetBudget.ClientID%>').keyup(function (event) {
                        validateRange($(this));
                    });

                    $('#' + '<%=txtSetBudget.ClientID%>').attr({
                        "max": setbudget, // substitute your own
                        "min": 1 // values (or variables) here
                    });

                    $('#btnSaveChanges').click(function () {
                        toastr.clear();
                        if ($('#' + '<%=txtSetBudget.ClientID%>').val() == "") {
                            error.showerror('#' + '<%=txtSetBudget.ClientID%>', 'Please enter budget amount.');
                            $('#' + '<%=txtSetBudget.ClientID%>').focus();
                            return;
                        }

                        else {
                            var onoff = '';
                            if ($('.toggle').attr('class') == "toggle OnBtnClass")
                            { onoff = '1'; }
                            else
                            { onoff = '0'; }
                            var budgetAmt = $('#' + '<%=txtSetBudget.ClientID%>').val();
                            var parameter = "{amount:'" + budgetAmt + "',notify:'" + onoff + "'}";
                            function OnSuccess(data, status) {
                                if (onoff == '1') {
                                    toastr.success($('#NotifyErrMsg').text().replace('XX', budgetAmt));
                                }
                                else {
                                    var v = JSON.parse(data.d);
                                    if (v[0].Status > 0) {
                                        toastr.success(v[0].Message);
                                    }
                                    else if (v[0].Status <= 0) {
                                        toastr.error(v[0].Message);
                                    }
                                    else {
                                        toastr.error($('#dataNotAvailable').text());
                                    }
                                }
                            }
                            function OnError(request, status, error) {
                                toastr.clear();
                                toastr.error(request.statusText)
                            }
                            $.ajax({
                                type: "POST",
                                url: "BudgetBill.aspx/SaveBudgetBillAsync",
                                data: parameter,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: OnSuccess,
                                error: OnError
                            });
                        }
                    });
                    $('.addressDropdown').change(function () {
                        $('#' + '<%=hdnFlag.ClientID%>').val('1');
                    });

                    <% if (Session.Count != 0 && DtChartData != null)
                       { %>
                    jsonData = <%=Newtonsoft.Json.JsonConvert.SerializeObject(DtChartData, Newtonsoft.Json.Formatting.Indented)%>

                <%}%>

              yaxis = $('#yAxisText').text(); //'Cost of Units Consumed ($) ';

                    $.map(jsonData, function (obj, i) {
                        processed_json.push({
                            name: getMonthName(obj.MOD),
                            y: obj.CurrentConsumed,
                            color: highcolor
                        }),
                         processed_json2.push({
                             name: getMonthName(obj.MOD),
                             y: obj.MonthlyBudget,
                             color: avgcolor
                         }),
                         processed_json3.push({
                             name: getMonthName(obj.MOD),
                             y: obj.ZipConsumed,
                             color: lowcolor
                         })
                        ;
                    });

                    BindhighChart3Series('column', 'chartDiv');

                    // To Avoid White Space
                    $('input[type="text"],textarea').keyup(function () {
                        var valu = $(this).val();
                        var result = /[a-zA-Z0-9]/.test(valu);
                        if (result == false)
                            valu = $(this).val("");
                    });
                },
                error: function (response) {
                }
            });
        });


        function setcolor(usagevalue) {
            var color = '#FFFFFF';
            if (usagevalue <= lowRange) {
                color = lowcolor;
            }
            else if (usagevalue > lowRange && usagevalue <= highRange) {
                color = avgcolor;
            }
            else if (usagevalue > highRange) {
                color = highcolor;
            }
            return color;
        }

        function loadRange() {
            range = comUsage.LoadRange().value;
            lowRange = range.Rows[0]["LowRange"];
            highRange = range.Rows[0]["MiddleRange"];
        }

    </script>

    <style>
        .setting_save_box {
    padding-top: 6px !important;
    padding-bottom: 6px !important;
}
    </style>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssBudgetBill") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsBudgetBill") %>

    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />

    <div class="top_conte_box_mob" style="overflow: auto; height: 100%;">
        <asp:Label ID="lblNotify" runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
        <div style="background: #dedede; font-size: 14px; font-weight: bold; margin: 0px 0px 0 1px; padding: 9px 26px;" globalize="ML_Budget_My_Lbl_Budget_Vs_Usage_Comparison">
            <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Budget_Vs_Usage_Comparison") %>
        </div>
        <div class="compare_graph" style="width: 100% !important">

            <div id="chartDiv" class="chart budget_chart" style="overflow: hidden; width: 98%; margin-top: 10px; float: left;">
            </div>
            <div style="width: 100%; float: left; background: #f4f4f4; text-align: right; padding: 10px 10px 7px 10px;">
                <p style="margin-top: 0%; padding: 0px;">
                    <%-- BUG 5901 - Start --%>
                    <span class="GraphLegend_low" style="background-color: #4adea0;"></span>
                    <span class="GraphLegend_data_low" globalize="ML_Budget_My_Lbl_My_Usage"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_My_Usage") %></span>
                    <span class="GraphLegend_High" style="background-color: #ea557b;"></span>
                    <span class="GraphLegend_data_low" globalize="ML_Budget_My_Lbl_Zip_Avg"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Zip_Avg") %></span>
                    <span class="GraphLegend_Avg" style="background-color: #e9cc57;"></span>
                    <span class="GraphLegend_data_low" globalize="ML_Budget_My_Lbl_My_Budget"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_My_Budget") %></span>

                    <%-- BUG 5901 - End --%>
                </p>
            </div>
        </div>

        <div class="clear_both"></div>

        <div class="total_bills" style="width: 100% !important; border-top: 2px solid #f4f4f4; margin-left: 0;">
            <div class="Left_Bill_area" style="width: 100%; padding-top: 0px;">
                <div class="all_bill_box" style="overflow: hidden; width: 100%;">
                    <div class="white_div">
                        <div class="left-area-tabular-ev" globalize="ML_Budget_My_Lbl_Monthly_Budget"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Monthly_Budget") %></div>

                        <div class="right-area-tabular-ev">
                            <div class="SliderMin">1</div>
                            <asp:TextBox ID="txt_Slider" runat="server" ClientIDMode="Static" placeholder="Monthly Budget" Style="margin-top: 12px !important;" globalize="ML_BudgetBill_Txt_SetBudgetSlider"></asp:TextBox>
                            <div class="SliderMax" id="SliderMax" clientidmode="Static" runat="server"></div>
                        </div>

                        <div style="display: none;"></div>
                    </div>

                    <div class="gray_div">
                        <div class="left-area-tabular-ev"><span globalize="ML_BudgetBill_Lbl_ManualSet" style="font-weight: normal; color: #666;"><%= CustomerPortal.Translator.T("ML_BudgetBill_Lbl_ManualSet") %></span><span style="font-weight: normal; color: #666; padding-left: 6px;">($)</span></div>
                        <div class="right-area-tabular-ev ">
                            <asp:TextBox ID="txtSetBudget" runat="server" CssClass="TextBoxNoClass" Style="float: right; width: 60px; text-align: right; margin-right: 12px; margin-top: 2px;" ReadOnly="False" onkeypress="return IsNumeric(event);" MaxLength="4" ClientIDMode="Static" globalize="ML_BudgetBill_Txt_SetBudgetManual" />
                        </div>
                    </div>

                    <div class="white_div">
                        <div class="left-area-tabular-ev">
                            <span globalize="ML_BudgetBill_Lbl_NotifyMe" style="font-weight: normal; float: left; color: #53565a;"><%= CustomerPortal.Translator.T("ML_BudgetBill_Lbl_NotifyMe") %></span>
                            <span class="main container" style="width: 20px !important; float: left; margin: -3px 0 0 0;">
                                <i class="circle help link icon" id="budgethelplink" clientidmode="Static">
                                    <span style="margin-left: 8px; margin-top: -2px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                </i>
                            </span>
                        </div>

                        <div class="right-area-tabular-ev">
                            <% try
                               {
                                   if (!IsPostBack) { hdnFlag.Value = "1"; }
                                   if (hdnFlag.Value == "1")
                                   { %> <% if (Dtbudgetbill != null && Dtbudgetbill.Rows.Count > 0)
                                           {
                                               if (!string.IsNullOrEmpty(Dtbudgetbill.Rows[0]["Notify"].ToString()) && (bool)Dtbudgetbill.Rows[0]["Notify"])
                                               { %><input type="button" class="toggle OnBtnClass" style="float: right; margin-right: 12px; margin-top: 0px;" value="On" globalize="ML_BudgetBill_btn_ActiveNotification" /><%}
                                               else
                                               { %><input type="button" class="toggle OffBtnClass" style="float: right; margin-right: 12px; margin-top: 6px;" value="Off" globalize="ML_BudgetBill_btn_DeActiveNotification" /><%}
                                           }
                                           else
                                           {%><input type="button" class="toggle OffBtnClass" style="float: right; margin-right: 12px; margin-top: 6px;" value="Off" />
                        </div>
                        <%}
                                   }
                               }
                               catch { } %>
                        <div class="profile-details gray-box_rem_marg even">
                            <span class="main container" style="width: 20px !important; float: left; margin: 0">
                                <div class="ui dividing right rail">
                                    <div class="ui sticky">
                                        <h4 class="ui header"></h4>
                                        <div class="ui vertical following fluid accordion text menu"></div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
  <div class="setting_save_box">
      <div class="buttons_area">
          <input type="button" value="<%= CustomerPortal.Translator.T("ML_BudgetBill_Submit_SetBudget") %>" class="submit-button" id="btnSaveChanges" globalize="ML_BudgetBill_Submit_SetBudget" style="margin-bottom: 0px;"  />
      </div>
  </div>
    <ajaxToolkit:SliderExtender ID="SliderExtender1" Length="400" runat="server" BehaviorID="txt_Slider" TargetControlID="txt_Slider" Minimum="1" BoundControlID="txtSetBudget" />
    <span globalize="ML_Title_Budget_My_Bill" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Budget_My_Bill") %></span>
    <span globalize="ML_Billing_Span_ErrMsg_Submit-Success" id="submitsuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_ErrMsg_Submit-Success") %></span>
    <span globalize="ML_Billing_Span_ErrMsg_Submit_Failure" id="submitfailure" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_ErrMsg_Submit_Failure") %></span>
    <span globalize="ML_Billing_Span_ErrMsg_Submit_NotAvailable" id="dataNotAvailable" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_ErrMsg_Submit_NotAvailable") %></span>
    <span globalize="ML_Compare_Spending_alert_maximumbudget" id="MaxBudgetErr" style="display: none"><%= CustomerPortal.Translator.T("ML_Compare_Spending_alert_maximumbudget") %></span>
    <span globalize="ML_BudgetBill_Span_Msg_MinBudgetErr" id="MinBudgetErr" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_Span_Msg_MinBudgetErr") %></span>
    <span globalize="ML_BudgetBill_Span_Msg_OnNotifyMsg" id="NotifyErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_Span_Msg_OnNotifyMsg") %></span>
    <span globalize="ML_Graph_Lbl_Nrml_Dollar" id="yAxisText" style="display: none"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Dollar") %></span>
    <span globalize="ML_BudgetBill_btn_ActiveNotification" id="ontext" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_btn_ActiveNotification") %></span>
    <span globalize="ML_BudgetBill_btn_DeActiveNotification" id="offtext" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_btn_DeActiveNotification") %></span>
</asp:Content>
