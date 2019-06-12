<%@ Page Title="" Language="C#" MasterPageFile="~/MyAccount.master" AutoEventWireup="true" CodeBehind="AboutMyBusiness.aspx.cs" Inherits="CustomerPortal.AboutMyBusiness" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssMyAccountAboutMyBusiness") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyAccountAboutMyBusiness")%>
    <link rel="stylesheet/less" type="text/css" href="//semantic-ui.com/src/definitions/elements/container.less">

    <script type="text/javascript">
        $(document).ready(function () {
            $(".help_popup_link .glyphicon-question-sign").click(function (e) {
                $(".help_popup_box").toggle();
                e.stopPropagation();
            });
            $(document).click(function (e) {
                if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
                    $(".help_popup_box").hide();
                }
            });

            $(".help_popup_link_1 .glyphicon-question-sign").click(function (e) {
                $(".help_popup_box_1").toggle();
                e.stopPropagation();
            });
            $(document).click(function (e) {
                if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
                    $(".help_popup_box_1").hide();
                }
            });

        });
        $(window).load(function () {
            var LotSizeMessage = $('#LotSizeMessage').text();
            $('#LotSizehelplink').attr('data-html', LotSizeMessage);
            $('#Landscapehelplink').attr('data-html', $('#LandscapeMessage').text());
            $('#HVAChelplink').attr('data-html', $('#HVACMessage').text());
            $('#Electricalhelplink').attr('data-html', $('#ElectricalMessage').text());
            $('#PlumingWaterhelplink').attr('data-html', $('#PlumingWaterMessage').text());
            $('#ServerRoomhelplink').attr('data-html', $('#ServerRoomMessage').text());

        });
    </script>
    <input type="hidden" class="activeli_list" value="myaccount,icon_aboutmyhome" />
    <div class="about_my_home" id="RegisteredHomeContainer">
        <div class="right_content_box" style="position: relative;">
            <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
                <div class="inner-right-right-section">
                    <div id="accountdetails" class="inner-right-sub acc_inner_box_1" style="border: 0px;">
                        <div class="inner-right-sub" style="background: #dedede; padding-bottom: 7px; padding-top: 7px; border: 0px;">
                            <div class="profile-details" style="padding: 0.3% 0 0.3% 2.2%; background: none;">
                                <div class="inner-address"><b><span globalize="">About my business</span></b></div>
                            </div>
                        </div>

                        <%--<div class="profile-details" style="display: none;">
                            <div class="name-feild" globalize="ML_Default_Lbl_Address"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Address") %></div>
                            <div class="sub-name">
                                <select id="ddlUserAddress" title="Address">
                                </select>
                            </div>
                        </div>--%>
                        <div class="profile-details pro_txt_lbl">
                            <%--<div class="name-feild" globalize="ML_MYACCOUNT_Lbl_CustomerAccount">Customer Account #</div>--%>
                            <div class="name-feild" globalize="ML_AboutMyBusiness_Lbl_ServiceAccountNo"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_ServiceAccountNo") %></div>
                            <div class="sub-name">
                                <asp:Label runat="server" ID="lblAccountNumber" ClientIDMode="Static" title="Service Account Number"></asp:Label>
                            </div>
                        </div>
                        <div class="profile-details  gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_BusinessSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_BusinessSize") %></span><span></span></div>
                            <div class="sub-name">
                                <asp:DropDownList ID="ddlBusinessSize" runat="server" ClientIDMode="Static" title="Business Size" globalize="ML_AboutMyBusiness_Lbl_BusinessSize">
                                </asp:DropDownList>
                            </div>
                        </div>

                         <div class="profile-details  gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_BusinessType"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_BusinessType") %></span><span></span></div>
                            <div class="sub-name">
                                <asp:DropDownList ID="ddlBusinessType" runat="server" ClientIDMode="Static" title="Business Size" globalize="ML_AboutMyBusiness_Lbl_BusinessType">
                                </asp:DropDownList>
                            </div>
                        </div>

                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_NoOfEmployees"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_NoOfEmployees") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" ClientIDMode="Static" globalize="ML_Default_Txt_NoOfResidentsVal" type="text" placeholder="Number of Residents" mandatory="0" ID="txtNoofResidents" MaxLength="3" onkeypress="return IsNumeric(event);"
                                    title="Number of residents" />
                            </div>
                        </div>

                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_OfficeArea"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_OfficeArea") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Office Area" mandatory="0" ID="txtOfficeArea" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="Office Area" />
                            </div>
                        </div>  
                         <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_LotSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_LotSize") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Lot Size" mandatory="0" ID="txtLotSize" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="Lot Size" />
                            </div>
                              <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="LotSizehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LotSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                        </div>
                         <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_NoOfFloors"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_NoOfFloors") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="No of Floors" mandatory="0" ID="txtNoofFloors" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="No of Floors" />
                            </div>
                        </div>

                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_NoOfRestrooms"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_NoOfRestrooms") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="No of RestRooms" mandatory="0" ID="txtNoOfRestrooms" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="No of RestRooms" />
                            </div>
                        </div>

                         <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_LandcapeArea"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_LandcapeArea") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" ClientIDMode="Static" globalize="" type="text" placeholder="Landscape Area" mandatory="0" ID="txtlandscapearea" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="Landscape Area" />
                            </div>
                             <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="Landscapehelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LandscapeAreaSize") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                        </div>

                         <div style="display:none;" class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasSolarPanels"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasSolarPanels") %> </span></div>
                            <div class="sub-name">
                              <asp:RadioButtonList ID ="rdbSolarPanels" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal" >
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>

                         <div class="profile-details gray-box_rem_marg" style="display:none;">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_GeneratingCapacity"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_GeneratingCapacity") %> </span></div>
                            <div class="sub-name">
                                <asp:TextBox runat="server" globalize="" ClientIDMode="Static" type="text" placeholder="Generating Capacity" mandatory="0" ID="txtGeneratingCapacity" MaxLength="8" onkeypress="return IsNumeric(event);"
                                    title="Generating Capacity" />
                            </div>
                        </div>

                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasElevator"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasElevator") %> </span></div>
                            <div class="sub-name">
                                <asp:RadioButtonList ID ="rdbElevator" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasHVACSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasHVACSystem") %> </span></div>
                            <div class="sub-name">
                               <asp:RadioButtonList ID ="rdbHVACSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                            <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="HVAChelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_HVACSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                        </div>

                         <div class="profile-details gray-box_rem_marg" style="display:none;">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasElectricalSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasElectricalSystem") %> </span></div>
                            <div class="sub-name">
                               <asp:RadioButtonList ID ="rdbElectricalSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                               <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="Electricalhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ElectricalSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                        </div>
                      
                              <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasPlumingWaterSystem") %> </span></div>
                            <div class="sub-name">
                               <asp:RadioButtonList ID ="rdbPlumingWaterSystem" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                                    <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">

                                    <i class="circle help link icon" id="PlumingWaterhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_PlumbingWaterSystem") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                </span>
                        </div>

                         <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasServerRoom"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasServerRoom") %> </span></div>
                            <div class="sub-name">
                               <asp:RadioButtonList ID ="rdbServerRoom" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                              <span class="main container" style="width: 20px !important; float: left; margin: 0 0 0 -50px">
                                    <i class="circle help link icon" id="ServerRoomhelplink" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; <%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ServerRoom") %> &lt;/span&gt">
                                        <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                    </i>
                                  </span>
                        </div>

                        <div class="profile-details gray-box_rem_marg">
                            <div class="name-feild" style="padding-top: 5px;"><span globalize="ML_AboutMyBusiness_Lbl_HasSwimmingPool"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Lbl_HasSwimmingPool") %> </span></div>
                            <div class="sub-name">
                               <asp:RadioButtonList ID ="rdbSwimmingPool" ClientIDMode="Static" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Yes" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="No"  Value="0"></asp:ListItem>
                                </asp:RadioButtonList>
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
        //var k = jQuery.noConflict(); as script removed 
        $(document).ready(function () {

            $(".icon_aboutmyhome").addClass('active');

        });
    </script>

    <asp:HiddenField ID="hdnflag" runat="server" />
    <asp:HiddenField ID="hdnCustomerid" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnIsValid" runat="server" ClientIDMode="Static" />
    <div id="page_loader">
    </div>

    <span id="LotSizeMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_LotSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LotSize") %></span>
    <span id="LandscapeMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_LandscapeAreaSize"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_LandscapeAreaSize") %></span>
    <span id="HVACMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_HVACSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_HVACSystem") %></span>
    <span id="ElectricalMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_ElectricalSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ElectricalSystem") %></span>
    <span id="PlumingWaterMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_PlumbingWaterSystem"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_PlumbingWaterSystem") %></span>
    <span id="ServerRoomMessage" style="display: none;" globalize="ML_AboutMyBusiness_Info_ServerRoom"><%= CustomerPortal.Translator.T("ML_AboutMyBusiness_Info_ServerRoom") %></span>
    
</asp:Content>
