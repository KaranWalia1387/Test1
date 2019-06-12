<%@ Page Title="Electric Vehicle" Language="C#" MasterPageFile="ElectricVehicleNestedMaster.Master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="electric-vehicle.aspx.cs" Inherits="CustomerPortal.electric_vehicle" %>

<%@ Register Src="UserControls/Electric_bill_discount.ascx" TagName="Electric_bill_discount" TagPrefix="uc1" %>
<%@ Register Src="UserControls/NotificationUserControl.ascx" TagName="Notifications" TagPrefix="uc2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderSearch" runat="server">
     <%: System.Web.Optimization.Styles.Render("~/Content/cssElectricVehicle") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsElectricVehicle")%>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">


   <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/3.10/js/esri/css/esri.css" />
    <style>
        .closepopup {
        float:right}

    </style>
     <script type="text/javascript" src="https://js.arcgis.com/3.10/"></script>

    <asp:HiddenField ID="hdnflag" runat="server" Value="load" />
    <asp:HiddenField ID="hdnchargetime" runat="server" />
    <asp:HiddenField ID="hdninttemp" runat="server" />
    <asp:HiddenField ID="hdnonoff" runat="server" />
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

    <input type="hidden" class="activeli_list" value="ev" />
    <div class="right_content_box_1 top_conte_box_mob">
        <div id="nocontentdiv" runat="server">
        </div>
        <%-- <a id="lnk"  data-toggle="modal" data-target="#divAddEV" runat="server"  ><span class="add_account_btn" style="margin-top:2px;display: inline-block;">Add EV</span></a>--%>
         <span class="add_account_btn" style="margin-top:2px;display: inline-block;" runat="server" id ="lnkadnewEv">  <asp:LinkButton ID="lnk1" runat="server" data-toggle="modal" data-target="#divAddEV"  ClientIDMode="Static" globalize="ML_ACCOUNT_Button_Add"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Add") %> EV</asp:LinkButton></span>

                                
        <div id="tblElectricVehicle" class="tblElectricVehicle" runat="server">
            <div class="total_bills">
                <div class="Left_Bill_area">
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular-ev" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChooseCar"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_ChooseCar") %></div>
                            <div class="right-area-tabular-ev">

                                <asp:DropDownList globalize="ML_ELECTRIC_VEHICLE_DDL_ChooseCar" ID="ddlElectricVehicle" runat="server" Style="width: 148px;" class="vehicle_select"></asp:DropDownList>
                           
                                      <span class="add_account_btn" style="margin-top:2px;display: inline-block;    float: none;">  <asp:LinkButton ID="lnkbtnaddEV" runat="server" data-toggle="modal" data-target="#divAddEV"  ClientIDMode="Static" globalize="ML_ACCOUNT_Button_Add"><%= CustomerPortal.Translator.T("ML_ACCOUNT_Button_Add") %></asp:LinkButton></span>

                                 </div>
                           
                        </div>
                        <div class="gray_div">
                            <div class="left-area-tabular-ev" globalize="ML_SETTING_Lbl_ElectricVehiclePlan"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_ElectricVehiclePlan") %></div>
                            <div class="right-area-tabular-ev">
                                <asp:Label globalize="ML_ELECTRIC_VEHICLE_Lbl_EVPlanVal" ID="lblChargingOptions" runat="server" Style="color: #000;"></asp:Label>
                            </div>
                        </div>
                        <div class="white_div">
                            <div class="left-area-tabular-ev" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChargeStatus"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_ChargeStatus") %></div>
                            <div class="right-area-tabular-ev">

                                <asp:Label ID="lblchargstatus" runat="server" Text=""></asp:Label>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="right_Bill_area">
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular-ev">
                                <asp:Image ID="imgCar" runat="server" ImageUrl="" alt="car_image" Width="198px" />
                            </div>
                            <div class="right-area-tabular-ev">
                                <asp:HyperLink globalize="ML_ELECTRIC_VEHICLE_Navigation_EVURL" ID="lnkCarURL" runat="server" Target="_blank" CssClass="view_web"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Navigation_EVURL") %></asp:HyperLink>
                            </div>
                            <asp:Label ID="lblCarDesc" Style="float: left; padding: 5px 10px; width: 100%;" runat="server"></asp:Label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="total_bills" runat="server" id="totalbills">
                <div class="Left_Bill_area" style="padding: 10px 0px;">
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular-ev" globalize="ML_ELECTRIC_VEHICLE_Lbl_SetTemp">
                               <%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_SetTemp") %>
                            </div>

                            <div class="right-area-tabular-ev dv_slider_wrapper ">
                                <div id="dvSlider" globalize="ML_ElectricVehicle_div_slider"></div>
                                <asp:TextBox ID="txt_SliderVal" runat="server" ClientIDMode="Static" Text="0" globalize="ML_ELECTRIC_VEHICLE_Lbl_EVSliderVal" placeholder="Slider Value" CssClass="TextBoxNoClass" Style="float: left; width: 27px; padding-top: 2px; text-align: right; border: 0;" ReadOnly="true" /><span style="color: Black; display: block!important; padding-top: 0px;">&nbsp;&deg;F</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right_Bill_area" style="padding: 10px 0px; display:none;"><%--//made changes agaisnt bug id of base 6.3 0045049--%>
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular-ev" style="margin-top: 5px;" globalize="ML_ELECTRIC_VEHICLE_Lbl_ScheduleChargeTime">
                                <%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_ScheduleChargeTime") %>
                            </div>

                            <div class="right-area-tabular-ev customer_txt_name">
                                <asp:DropDownList ID="ddlHours" runat="server" ClientIDMode="Static" globalize="ML_ElectricVehicle_ddl_Hours">
                                    <%--<asp:ListItem Text="1" globalize="ML_ELECTRIC_VEHICLE_ListItem_1" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="2" globalize="ML_ELECTRIC_VEHICLE_ListItem_2" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="3" globalize="ML_ELECTRIC_VEHICLE_ListItem_3" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="4" globalize="ML_ELECTRIC_VEHICLE_ListItem_4" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="5" globalize="ML_ELECTRIC_VEHICLE_ListItem_5" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="6" globalize="ML_ELECTRIC_VEHICLE_ListItem_6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="7" globalize="ML_ELECTRIC_VEHICLE_ListItem_7" Value="7"></asp:ListItem>
                                    <asp:ListItem Text="8" globalize="ML_ELECTRIC_VEHICLE_ListItem_8" Value="8"></asp:ListItem>
                                    <asp:ListItem Text="9" globalize="ML_ELECTRIC_VEHICLE_ListItem_9" Value="9"></asp:ListItem>
                                    <asp:ListItem Text="10" globalize="ML_ELECTRIC_VEHICLE_ListItem_10" Value="10"></asp:ListItem>
                                    <asp:ListItem Text="11" globalize="ML_ELECTRIC_VEHICLE_ListItem_11" Value="11"></asp:ListItem>
                                    <asp:ListItem Text="12" globalize="ML_ELECTRIC_VEHICLE_ListItem_12" Value="12"></asp:ListItem>--%>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlMin" runat="server" ClientIDMode="Static" globalize="ML_ElectricVehicle_ddl_Minutes">
                                    <%--<asp:ListItem Text="00" globalize="ML_ELECTRIC_VEHICLE_ListItem_0min" Value="00"></asp:ListItem>
                                    <asp:ListItem Text="15" globalize="ML_ELECTRIC_VEHICLE_ListItem_15min" Value="15"></asp:ListItem>
                                    <asp:ListItem Text="30" globalize="ML_ELECTRIC_VEHICLE_ListItem_30min" Value="30"></asp:ListItem>
                                    <asp:ListItem Text="45" globalize="ML_ELECTRIC_VEHICLE_ListItem_45min" Value="45"></asp:ListItem>--%>
                                </asp:DropDownList>
                                <asp:DropDownList ID="ddlAmpm" runat="server" ClientIDMode="Static" globalize="ML_ElectricVehicle_ddl_AMPM">

                                   <%-- <asp:ListItem Text="AM" globalize="ML_ELECTRIC_VEHICLE_ListItem_AM" Value="AM"></asp:ListItem>
                                    <asp:ListItem Text="PM" globalize="ML_ELECTRIC_VEHICLE_ListItem_PM" Value="PM" Selected="True"></asp:ListItem>--%>
                                </asp:DropDownList>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="total_bills" runat="server" id="totalbills2">
                <div class="Left_Bill_area" style="padding-top: 10px; padding-bottom: 40px;">
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_CurRange"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_CurRange") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblAverageDaily" globalize="ML_ELECTRIC_VEHICLE_Lbl_AvgDaily" runat="server" Text='<%# CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_AvgDaily") %>'></asp:Label>
                            </div>
                        </div>

                        <div class="gray_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChrgeTime"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_ChrgeTime") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblchargeTime" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChrgeTimeVal" runat="server" Text=""></asp:Label>
                            </div>
                        </div>

                        <div class="white_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChrgeStat"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_ChrgeStat") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblbattryStatus" globalize="ML_ELECTRIC_VEHICLE_Lbl_ChrgeStatVal" runat="server" Text=""></asp:Label>
                            </div>
                        </div>


                    </div>
                </div>


                <div class="right_Bill_area" style="padding-top: 10px; padding-bottom: 40px;">
                    <div class="all_bill_box">
                        <div class="white_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_DailyChrgeTme"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_DailyChrgeTme") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblCurrentAverageTime" globalize="ML_ELECTRIC_VEHICLE_Lbl_AvgChrgeTme" runat="server" Text=""></asp:Label>
                            </div>
                        </div>

                        <div class="gray_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_CurrentMonthCost"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_CurrentMonthCost") %></div>
                            <div class="right-area-tabular">
                                <span>
                                    <asp:Label ID="lblCurrentAverage" globalize="ML_ELECTRIC_VEHICLE_Lbl_CurAvg" runat="server" Text=""></asp:Label></span>
                            </div>
                        </div>

                        <div class="white_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_RecommendedChargeTime"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_RecommendedChargeTime") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblRecommendAverageTime" globalize="ML_ELECTRIC_VEHICLE_Lbl_RecmndedChrgTmeVal" runat="server" Text=""></asp:Label>
                            </div>
                        </div>

                        <div class="gray_div">
                            <div class="left-area-tabular" globalize="ML_ELECTRIC_VEHICLE_Lbl_MonthlySavings"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Lbl_MonthlySavings") %></div>
                            <div class="right-area-tabular">
                                <asp:Label ID="lblRecommendAverage" globalize="ML_ELECTRIC_VEHICLE_Lbl_MonthlySavingsVal" runat="server" Text=""></asp:Label></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="tblElectricVehicle1" class="tblElectricVehicle1" runat="server">
        <asp:Button runat="server" ID="btnSaveChanges" globalize="ML_ELECTRIC_VEHICLE_Button_SaveChanges" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Button_SaveChanges") %>' Style="margin-top: 10px;" OnClientClick="return false;" />
    </div>



      <%--Add model pop up add EV--%>

    <asp:HiddenField ID="hidnfld_count" runat="server" Value=""  ClientIDMode="Static"/>
    <div id="divAddEV" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div id="divAddEVmodal" class="modal-content editMain">
                <div class="modal-header">
                   <%-- <button type="button" class="closepopup" data-dismiss="modal">
                        <img src="images/cross-icon.png" /></button>--%>
                    <asp:ImageButton ID="imgbtn_close" class="closepopup" runat="server" ImageUrl="images/cross-icon.png"  OnClick="imgbtn_close_Click" data-dismiss="modal"/>
                    <h4 class="modal-title" globalize="ML_DASHBOARD_Lbl_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Lbl_ElectricVehicle") %></h4>
                </div>
                <div class="modal-body" style="padding-bottom: 0px;">
                    <div id="divAccountPopup" class="registration-form" style="z-index: 9999999; width: 100%; margin: 9px;">

                        <div class="row">

                           <%-- <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">

                            </div>--%>
                             <div class="radio-button-box electric_vehicle_box ev_tbl_box">
                        <asp:CheckBoxList ID="chklstelectricvehicle" globalize="ML_MYACCOUNT_chkbx_Electric_Vehicle" title="" runat="server" RepeatDirection="Horizontal">
                        </asp:CheckBoxList>
                    </div>
                          </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <asp:Button globalize="ML_Master_btn_Submit" CssClass="submit-button" ID="SubmitBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Master_btn_Submit") %>' TabIndex="8" ClientIDMode="Static"
                        Style="display: inline-block; margin-right: 7px;"  OnClick="SubmitBtn_Click" />
<%--                    <asp:Button ID="btnclose" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' globalize="ML_Common_Navigation_cancel" CssClass="submit-button" data-dismiss="modal" TabIndex="7" Style="float: left !important; margin-left: 6px;"  />--%>
                       <asp:Button ID="btnclose" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Common_Navigation_cancel") %>' globalize="ML_Common_Navigation_cancel" CssClass="submit-button"  TabIndex="7" Style="float: left !important; margin-left: 6px;" OnClick="btnclose_Click" />

                </div>


            </div>

        </div>
    </div>


    
    <script type="text/javascript">
        $(document).ready(function () {
            
            //******************************
            if ($('#hidnfld_count').val() == "0")
            {
              
             // setTimeout(function(){ $('#lnk1').trigger("click"); }, 1000);
            }

            //******************************



            $('#' + '<%=ddlElectricVehicle.ClientID%>').change(function () {
                loader.showloader();
                $('#' + '<%=hdnflag.ClientID%>').val('save');
                //Asynchronous call start
                var index = $('#<%= ddlElectricVehicle.ClientID%>')[0].selectedIndex;
                var parameter = "{index:'" + index + "'}";
                $.ajax({
                    type: "POST",
                    url: "electric-vehicle.aspx/setDataAsync",
                    data: parameter,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessFun,
                    error: OnErrorFun
                });

                function OnSuccessFun(data, status) {
                    try {
                        var detail = JSON.parse(data.d);
                        $('#<%=lblAverageDaily.ClientID%>').html(detail.Table[index].DrivingRange);
                        $('#<%=lblchargeTime.ClientID%>').html(detail.Table[index].TimeRemainingCharge.toString().split('.')[0] + 'h ' + detail.Table[index].TimeRemainingCharge.toString().split('.')[1] + 'm');
                        $('#<%=lblbattryStatus.ClientID%>').html(detail.Table[index].BatteryStatus);
                        $('#<%=lblCurrentAverageTime.ClientID%>').html(detail.Table[index].CurrentChargeTime + "&nbsp;<span globalize=ML_EV_lblCurrentAverageTime> Hours</span>");
                        $('#<%=lblCurrentAverage.ClientID%>').html("$" + detail.Table[index].CurrentAverage);
                        $('#<%=lblRecommendAverageTime.ClientID%>').html(detail.Table[index].RecomendChargeTime);
                        $('#<%=lblRecommendAverage.ClientID%>').html("$" + detail.Table[index].AvgDailyCost);//Added $ for as a unit 
                        $('#<%=lnkCarURL.ClientID%>').attr('href', detail.Table[index].URL.toString());
                        $('#<%=imgCar.ClientID%>').attr('src', detail.Table[index].ImagePath.toString());
                        $('#<%=lblChargingOptions.ClientID%>').html(detail.Table[index].CurrentPlan);
                        $('#<%=lblchargstatus.ClientID%>').html((detail.Table[index].ChargeOn == true) ? $('#IDChargeStatusOn').text() : $('#IDChargeStatusOff').text());
                        $('#<%=hdnonoff.ClientID%>').val((detail.Table[index].ChargeOn == true) ? "1" : "0");
                        $('#<%=lblCarDesc.ClientID%>').html(detail.Table[index].Description);

                        if (detail.Table[index].InteriorTemprature == 0) {
                            $('#<%=txt_SliderVal.ClientID%>').val('45'); // bcoz 45 is the minimum value of slider

                        }
                        else {
                            $('#<%=txt_SliderVal.ClientID%>').val(detail.Table[index].InteriorTemprature);
                        }

                        ChangeSlider();

                        if (detail.Table[index].ScheduleChargeTime != null) {
                            var scheduleTime = detail.Table[index].ScheduleChargeTime.toString();
                            $('#<%=ddlHours.ClientID%>').val(scheduleTime.split(':')[0].trim());
                            $('#<%=ddlMin.ClientID%>').val(scheduleTime.split(':')[1].trim().substring(0, 2));
                            $('#<%=ddlAmpm.ClientID%>').val(scheduleTime.split(':')[1].trim().substring(2, 6).trim());
                        }
                        loader.hideloader();
                    }
                    catch (ex) {
                        console.log(ex.message);
                    }
                }

                function OnErrorFun(request, status, error) {
                    toastr.error('Error ' + request.statusText);
                    //toastr.error('Error ' + request.statusText)
                    //$.unblockUI();
                    loader.hideloader();
                }
                //Stop
            });

            $('.addressDropdown').change(function () {
                $('#' + '<%=hdnflag.ClientID%>').val('add');
            });

            $('#<%=btnSaveChanges.ClientID %>').click(function () {
                loader.showloader();

                var mins = $("#<%=ddlMin.ClientID%>").val();

                if ($("#<%=ddlMin.ClientID%>").val() == null) //Added '00' in place of null value for minutes as it was throwing exception. Bug # 6969
                    mins = '00';
                $('#<%=hdnchargetime.ClientID %>').val($("#<%=ddlHours.ClientID%>").val() + ':' + mins + ' ' + $("#<%=ddlAmpm.ClientID%>").val());

                $('#<%=hdninttemp.ClientID %>').val($('#<%=txt_SliderVal.ClientID %>').val());

                //Asynchronous call start
                var CarId = $('#<%= ddlElectricVehicle.ClientID%>').val();
                var IsOn = $('#<%= hdnonoff.ClientID %>').val();
                var InteriorTemp = $('#<%= hdninttemp.ClientID %>').val();
                var ScheduleChargeTime = $('#<%= hdnchargetime.ClientID %>').val();
                param = "{EVId:'" + CarId + "',IsOn:'" + IsOn + "',InteriorTemp:'" + InteriorTemp + "',ScheduleChargeTime:'" + ScheduleChargeTime + "'}";
                $.ajax({
                    type: "POST",
                    url: "electric-vehicle.aspx/SaveDataAsync",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
                function OnSuccess(data, status) {
                    if (JSON.parse(data.d).Table[0].Status == "1") {
                       //w2alert(JSON.parse(data.d).Table[0].Message);
                        toastr.success(JSON.parse(data.d).Table[0].Message)
                    }
                    else if (JSON.parse(data.d).Table[0].Status == "0" || data.d == 'null') {
                        //w2alert($('#DBFailed').text());
                        toastr.error($('#DBFailed').text())
                    }

                    loader.hideloader();
                }

                function OnError(request, status, error) {
                    //alert('Error ' + request.statusText);
                    toastr.error('Error ' + request.statusText);

                }
                //END

            });
            $("[id$=ChargeClass]").click(function () {
                var hdnvalue = $('[type="hidden"][id$=hdnonoff]');
                if ($(hdnvalue).val() == '1') {
                    $(this).addClass('OffBtnClass');
                    $(this).removeClass('OnBtnClass');
                    $(this).val($('#IDChargeStatusOff').text());
                    $(hdnvalue).val('0');
                }
                else {
                    $(this).addClass('OnBtnClass');
                    $(this).removeClass('OffBtnClass');
                    $(this).val($('#IDChargeStatusOn').text());
                    $(hdnvalue).val('1');
                }
                return false;
            });
        });

        function Showalert() {
            

        }



    </script>

    <span globalize="ML_EV_Errmsg_Settings_Saved" id="DBSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_EV_Errmsg_Settings_Saved") %></span>
    <span globalize="ML_EV_Errmsg_Settings_NotSaved" id="DBFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_EV_Errmsg_Settings_NotSaved") %></span>
    <span globalize="ML_EV_Errmsg_EV_NotFound" id="EvNotFound" style="display: none"><%= CustomerPortal.Translator.T("ML_EV_Errmsg_EV_NotFound") %></span>
    <span globalize="ML_ELECTRIC_VEHICLE_Title_ElectricVehicle" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_ELECTRIC_VEHICLE_Title_ElectricVehicle") %></span>
    <span globalize="ML_BudgetBill_btn_ActiveNotification" id="IDChargeStatusOn" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_btn_ActiveNotification") %></span>
    <span globalize="ML_BudgetBill_btn_DeActiveNotification" id="IDChargeStatusOff" style="display: none"><%= CustomerPortal.Translator.T("ML_BudgetBill_btn_DeActiveNotification") %></span>

</asp:Content>
