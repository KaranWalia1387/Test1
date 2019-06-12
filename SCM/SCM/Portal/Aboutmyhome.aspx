<%@ Page Title="About My Home" Language="C#" MasterPageFile="MyAccount.master" AutoEventWireup="true"
    CodeBehind="Aboutmyhome.aspx.cs" Inherits="CustomerPortal.Aboutmyhome" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssMyAccountAboutMyHome") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyAccountAboutMyHome")%>
    <link rel="stylesheet/less" type="text/css" href="//semantic-ui.com/src/definitions/elements/container.less">

    <script type="text/javascript">
        $(document).ready(function () {
            $(".acc_inner_box_1").bind("rowchange", function () {
                $(this).find(".profile-details:visible").removeClass("even").filter(":even").addClass("even");
            }).trigger("rowchange");

            //$(".help_popup_link .glyphicon-question-sign").click(function (e) {
            //    $(".help_popup_box").toggle();
            //    e.stopPropagation();
            //});
            //$(document).click(function (e) {
            //    if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
            //        $(".help_popup_box").hide();
            //    }
            //});

            //$(".help_popup_link_1 .glyphicon-question-sign").click(function (e) {
            //    $(".help_popup_box_1").toggle();
            //    e.stopPropagation();
            //});
            //$(document).click(function (e) {
            //    if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
            //        $(".help_popup_box_1").hide();
            //    }
            //});

        });
        $(window).load(function () {
            var solarMessage = $('#solarPanelMessage').text();
            $('#solarhelplink').attr('data-html', solarMessage);
            $('#homeSizehelplink').attr('data-html', $('#homeSizeMessage').text());
            $('#electricVehiclehelplink').attr('data-html', $('#electricVehicleMessage').text());
            $('#numberofhighefficiencyhelplink').attr('data-html', $('#noOfAppliancesMessage').text());
            $('#lotSizehelplink').attr('data-html', $('#lotSizeMessage').text());
            $('#landscapeAreahelplink').attr('data-html', $('#landscapAreaMessage').text());
            $('#speciallandscapeAreahelplink').attr('data-html', $('#specialLandscapAreaMessage').text());
            $(".acc_inner_box_1").bind("rowchange", function () {
                $(this).find(".profile-details:visible").removeClass("even").filter(":even").addClass("even");
            }).trigger("rowchange");

        });

    </script>
    <style type="text/css">
        #changeUserId {
            width: 600px;
        }

       #changeUserId div.popup_left_content_area_home {
            width: 36% !important;
        }

      #changeUserId  div.popup_right_content_area_home {
            width: 64% !important;
        }
        .popup_area .popup_area_home .popup_right_content_area_home input[type="text"] {
    width: 96%;
}
        #change-userid-divPopup .modal-dialog.popup_area{
            width:100%;
        }
 #change-userid-divPopup .popup_area .popup_area_home .popup_right_content_area_home {

    margin: 0px 0px 10px;
}
 #change-userid-divPopup #errorMsg {
    top: 10px !important;
    right: 18% !important;
}
        @media only screen and (min-width : 1700px) and (max-width :2200px) {
            #change-userid-divPopup #errorMsg {
                right: 27% !important;
            }
        }
    </style>
    <input type="hidden" class="activeli_list" value="myaccount,icon_aboutmyhome" />
    <div class="about_my_home" id="RegisteredHomeContainer">
        <div class="right_content_box" style="position: relative;">
            <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
                <div class="inner-right-right-section">
                    <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border: 0px;">
                        <div class="inner-right-sub" style="background: #dedede; padding-bottom: 7px; padding-top: 7px; border: 0px;">
                            <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%; background: none;">
                                <div class="inner-address"><b><span globalize="ML_MyAccount_div_Aboutmyhome"><% =CustomerPortal.Translator.T("ML_MyAccount_div_Aboutmyhome")%></span></b></div>
                            </div>
                        </div>

                        <div class="profile-details" style="display: none;">
                            <div class="name-feild" globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></div>
                            <div class="sub-name">
                                <select id="ddlUserAddress" title="Address">
                                </select>
                            </div>
                        </div>
                        <div class="profile-details pro_txt_lbl">

                            <div class="name-feild" globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></div>
                            <div class="sub-name">
                                <asp:Label runat="server" ID="lblAccountNumber" title="Service Account Number"></asp:Label>
                            </div>
                        </div>
                        <div class="profile-details ">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Default_Lbl_HomeType"><%= CustomerPortal.Translator.T("ML_Default_Lbl_HomeType") %></span><span></span></div>
                            <div class="sub-name">
                                <asp:DropDownList ID="ddlHomeType" runat="server" title="Home type" globalize="ML_Default_Lbl_HomeType">
                                </asp:DropDownList>
                            </div>
                        </div>

                        <div class="profile-details">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Default_Lbl_NoOfResidents"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfResidents") %> </span></div>
                            <div class="sub-name">
                                <asp:DropDownList ID="ddlNoOfResidents" runat="server" title="No of Residents" globalize="ML_Default_Txt_NoOfResidentsVal"></asp:DropDownList>
                            </div>
                        </div>

                        <div id="divPower" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power) %>">

                            <div class="profile-details">
                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Default_Lbl_SolarPanels"><%= CustomerPortal.Translator.T("ML_Default_Lbl_SolarPanels") %> </span><span></span></div>
                                <div class="sub-name">
                                    <asp:DropDownList runat="server" ID="ddlSolarPanel">
                                    </asp:DropDownList>


                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="solarhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_Icon_Msg_SolanPanels") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                            </div>

                            <div id="div_Noofsolarpanels" runat="server">
                                <div class="profile-details">

                                    <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Default_Lbl_NoOfSolPan"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfSolPan") %> </span></div>
                                    <div class="sub-name">
                                        <asp:TextBox runat="server" CssClass="txtAmount" type="text" globalize="ML_Default_Txt_NoOfSolPanVal" ClientIDMode="Static" placeholder="Number of Solar Panels" mandatory="0" ID="txtSolarPanel" MaxLength="2" onkeypress="return IsNumeric1(event,this);"
                                            title="Number of Solar Panels" />

                                    </div>

                                </div>
                            </div>


                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_Default_Lbl_NoOfHomeSize"><%= CustomerPortal.Translator.T("ML_Default_Lbl_NoOfHomeSize") %> </span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_NoOfHomeSizeVal" MaxLength="5" mandatory="0" placeholder="Home size in sq ft" type="text" ID="txtHomesize" onkeypress="return IsNumeric(event,this);"
                                        title="Home size in sq ft" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="homeSizehelplink" data-html="&lt;<%= CustomerPortal.Translator.T("ML_Icon_Msg_HomeSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                            </div>

                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_floors"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_floors") %> </span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_Floors" MaxLength="2" mandatory="0" placeholder="Floors" type="text" ID="txtFloors" onkeypress="return IsNumeric1(event,this);"
                                        title="Floors" />
                                </div>
                            </div>

                            <div class="profile-details pro_txt_lbl">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Electricvehicle"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_Electricvehicle") %> </span></div>
                                <div class="sub-name">
                                    <asp:RadioButton GroupName="e" runat="server" globalize="ML_EFFICIENCY_Yes" ID="rdbEVyes" />&nbsp;<span globalize="ML_EFFICIENCY_Yes" style="margin: 0;"><%= CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %></span>
                                    <asp:RadioButton GroupName="e" Checked="true" Style="margin-left: 20px" runat="server" globalize="ML_CustomerRegistration_rdb_Poolno" ID="rdbEVNo" />&nbsp;<span globalize="ML_CustomerRegistration_rdb_Poolno" style="margin: 0;"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_rdb_Poolno") %></span>
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="electricVehiclehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarElectric'&gt; <%= CustomerPortal.Translator.T("ML_Icon_Msg_ElectricVehicle") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                            </div>

                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_yearbuilt"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_yearbuilt") %> </span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_Yearbuilt" MaxLength="4" mandatory="0" placeholder="Year Built" type="text" ID="txtYearbuilt" onkeypress="return IsNumeric1(event,this);"
                                        title="Year Built" />
                                </div>
                            </div>
                        </div>

                        <div id="divWater" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Water) %>">



                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofbathrooms"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofbathrooms") %> </span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_NoOfBathromms" MaxLength="2" mandatory="0" placeholder="Number of bathrooms" type="text" ID="txtNumberofbathrooms" onkeypress="return IsNumeric1(event,this);"
                                        title="Number of bathrooms" />
                                </div>
                            </div>

                            <div class="profile-details" style="display: none;">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp") %></span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_numberofhigheffiencyapp" MaxLength="2" mandatory="0" placeholder="Number of high-efficiency appliances" type="text" ID="txtNumberofhigheffapp" onkeypress="return IsNumeric1(event,this);"
                                        title="Number of high-efficiency appliances" />
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="numberofhighefficiencyhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarEfficiency'&gt; Energy efficient appliances use less electricity to achieve the same level of performance to similar models with the same size or capacity. e. Add up the square feet of each section to find the total square footage of the house. Round your total off to the nearest square foot. &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                            </div>


                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_lotsize"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_lotsize") %></span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_Lotsizep" MaxLength="5" mandatory="0" placeholder="Lot Size" type="text" ID="txtLotsize" onkeypress="return IsNumeric1(event,this);"
                                        title="Lot Size" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="lotSizehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='lotSizehelp'&gt; <%= CustomerPortal.Translator.T("ML_Icon_Msg_LotSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                            </div>

                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_landscapearea"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_landscapearea") %></span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_Landscape" MaxLength="5" mandatory="0" placeholder="Landscape Area" type="text" ID="txtLandscapearea" onkeypress="return IsNumeric1(event,this);"
                                        title="Landscape Area" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="landscapeAreahelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='landscapeAreahelp'&gt; <%= CustomerPortal.Translator.T("ML_Icon_Msg_LandscapArea") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                            </div>

                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Splandscapearea"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_Splandscapearea") %></span></div>
                                <div class="sub-name">
                                    <asp:TextBox runat="server" CssClass="txtAmount" globalize="ML_Default_Txt_slandscape" MaxLength="5" mandatory="0" placeholder="Special Landscape Area" type="text" ID="txtsplandscapearea" onkeypress="return IsNumeric1(event,this);"
                                        title="Special Landscape Area" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;<%= CustomerPortal.Translator.T("ML_Default_Txt_NoOfHomeSizeVal") %></span>
                                </div>
                                <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="speciallandscapeAreahelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='specialLandscapeAreahelp'&gt; <%= CustomerPortal.Translator.T("ML_Icon_Msg_SpecialLandscapArea") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                            </div>


                            <div class="profile-details">

                                <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_pool"><%= CustomerPortal.Translator.T("ML_NewAboutmyhome_Lbl_pool") %></span></div>
                                <div class="sub-name" style="margin-top: 7px;">
                                    <asp:RadioButton GroupName="a" runat="server" ID="rdbPoolYes" />&nbsp;<span globalize="ML_EFFICIENCY_Yes" style="margin: 0;"><%= CustomerPortal.Translator.T("ML_EFFICIENCY_Yes") %></span>
                                    <asp:RadioButton GroupName="a" Checked="true" Style="margin-left: 20px;" globalize="ML_CustomerRegistration_rdb_Poolno" runat="server" ID="rdbPoolNo" />&nbsp;<span globalize="ML_CustomerRegistration_rdb_Poolno" style="margin: 0;"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_rdb_Poolno") %></span>
                                </div>
                            </div>


                        </div>
                    </div>




                </div>
            </div>
            <div class="setting_save_box">
                <div class="buttons_area">
                    <input class="submit-button" value='<%# CustomerPortal.Translator.T("ML_Default_Button_Submit") %>' id="btnSaveHomeInfo" type="button" globalize="ML_Default_Button_Submit">
                </div>
            </div>
        </div>

    </div>
    <script type="text/javascript">

        $(document).ready(function () {

            $(".icon_aboutmyhome").addClass('active');

        });
    </script>

    <asp:HiddenField ID="hdnflag" runat="server" />
    <asp:HiddenField ID="hdnCustomerid" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnIsValid" runat="server" ClientIDMode="Static" />
    <div id="page_loader">
    </div>

    <span id="spinvalidkey" style="display: none;" globalize="ML_AblouMyHome_InvalidYear"><%= CustomerPortal.Translator.T("ML_AblouMyHome_InvalidYear") %>'</span>
    <span id="solarPanelMessage" style="display: none;" globalize="ML_Icon_Msg_SolanPanels"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SolanPanels") %>'</span>
    <span id="homeSizeMessage" style="display: none;" globalize="ML_Icon_Msg_HomeSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_HomeSize") %>'</span>
    <span id="electricVehicleMessage" style="display: none;" globalize="ML_Icon_Msg_ElectricVehicle"><%= CustomerPortal.Translator.T("ML_Icon_Msg_ElectricVehicle") %>'</span>
    <span id="noOfAppliancesMessage" style="display: none;" globalize="ML_Icon_Msg_NoOfAppliances"><%= CustomerPortal.Translator.T("ML_Icon_Msg_NoOfAppliances") %>'</span>
    <span id="lotSizeMessage" style="display: none;" globalize="ML_Icon_Msg_LotSize"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LotSize") %>'</span>
    <span id="landscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_LandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_LandscapArea") %>'</span>
    <span id="specialLandscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_SpecialLandscapArea"><%= CustomerPortal.Translator.T("ML_Icon_Msg_SpecialLandscapArea") %>'</span>
    <span id="ZeroNotAllowed" globalize="ML_Msz_Valid_Information" style="display: none"><%= CustomerPortal.Translator.T("ML_Msz_Valid_Information") %></span>
</asp:Content>
