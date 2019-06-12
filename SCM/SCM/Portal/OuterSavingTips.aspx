<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OuterSavingTips.aspx.cs" Inherits="CustomerPortal.OuterSavingTips" %>
<%--25523--%>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head> <%--25533 bug id--%>
    <title globalize="ML_DASHBOARD_Anchor_Efficiency"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Efficiency") %> </title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link href="css/print.css" rel="stylesheet" />
    <!-- Message for disable javascript in Browser -->
    <noscript>
    For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
    </noscript>
    
    <script>
        var attachmentpath = '<%= CustomerPortal.SessionAccessor.BaseUrl %>';
        var IsRegisterPrelogin = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPreLoginRegister)%>'
    </script>
    
    <%: System.Web.Optimization.Styles.Render("~/Content/cssOuterSavingTips") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsOuterSavingTips")%>

     <link id="stylecss1" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link id="stylecss2" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    
    <script type="text/javascript">
        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
       
        
        $(window).load(function () {
            //alert();
            if ($(".registered_box ul li:first-child").css('display') == 'block') {
                $(".registered_box ul li:last-child").addClass('showborder');

            } else {
                $(".registered_box ul li:last-child").addClass('hideborder');
            }

            // added for saving tips hide/show of border on hide/show on like 
            if ($("#dvSavingTipsContainer ul li .like_area_width").css('display') == 'block') {
                $("#dvSavingTipsContainer ul li .added_view_sec ul li:first-child").addClass('showborder');

            }
            else {
                $("#dvSavingTipsContainer ul li .added_view_sec ul li:first-child").addClass('hideborder');

            }

            // added for educational tips hide/show of border on hide/show on like 
            if ($("#dvEducationalTipsContainer ul li .like_area_width").css('display') == 'block') {
                $("#dvEducationalTipsContainer ul li .added_view_sec ul li:first-child").addClass('showborder');

            }
            else {
                $("#dvEducationalTipsContainer ul li .added_view_sec ul li:first-child").addClass('hideborder');

            }

        });
        function getDefaultEffLoadTab() {

            var prg = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPrograms)%>';
            var rbts = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate)%>';
            var savTips = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips)%>';
            var eduTips = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyEducationTips)%>';


            if (prg.toLocaleLowerCase() == 'none' && rbts.toLocaleLowerCase() == 'none' && savTips.toLocaleLowerCase() == 'none' && eduTips.toLocaleLowerCase() == 'none') {
                $('#liEff').hide();
            }
            else {
                if (rbts != 'none') {
                    $('.icon_rebates a').trigger('click');
                    $('.icon_rebates').addClass('active');
                    $('.dis_programs').hide();
                    $('.dis_rebates').show();
                    $('.div_disclaimer').show();
                }
                else if (prg != 'none') {
                    $('.icon_dr_programes a').trigger('click');
                    $('.icon_dr_programes').addClass('active');
                    $('.dis_rebates').hide();
                    $('.dis_programs').show();
                    $('.div_disclaimer').show();

                }

                else if (savTips != 'none') {
                    $('.icon_saving_tips a').trigger('click');
                    $('.icon_saving_tips').addClass('active');
                    $('.dis_programs').hide();
                    $('.dis_rebates').hide();
                    $('.div_disclaimer').hide();
                }
                else if (eduTips != 'none') {
                    $('.educational_tips a').trigger('click');
                    $('.educational_tips').addClass('active');
                    $('.dis_programs').hide();
                    $('.dis_rebates').hide();
                    $('.div_disclaimer').hide();
                }
            }
        }

        $(document).ready(function () {
            if ("<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal)%>" == "none")
                $('.addtxt').hide();
            else $('.addtxt').show();

            getDefaultEffLoadTab();

        });

    </script>

    <style>
        .registered_box {
    clear: none;
	
}
 .efficiency_area ul li .content_energy_area .like_area {
    float: left;
    margin: 0px!important; 
    padding: 0;
    max-width: 31%!important;
}
.efficiency_area ul li .content_energy_area .added_vote_area ul li{    
    padding-left: 5px!important;
    border-left: 1px solid #666666!important;
    height:18px;
}

 .added_vote_area.added_view_sec {
    margin-top: 0px !important;
}
 .text_align_box .clearfix{
     margin-left: 0px!important;
    margin-right: 0px!important;
 }
    </style>
</head>
<body>
    <form id="form1" runat="server">

        <!-- Header starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header ends -->
        <asp:HiddenField ID="hdnPidContact" Value="load" runat="server" ClientIDMode="Static" />
        <!-- Section Starts-->
        <section class="inner_mid_section" id="devices" ng-app="OuterSavingsApp" ng-controller="OuterSavingController" ng-cloak>
            <div class="container inner-mid-container">
                <div class="energy_mid_box">

                    <h1 class="headEfficiency">
                        <img src="images/icon_efficiency_sidebar.svg" style="padding-right: 5px; margin-top: -1px; float: left; width: 28px;" />
                        <span class="head_icon_flat icon_efficiency"></span>
                        <span id="spnEfficiency" globalize="ML_DASHBOARD_Anchor_Efficiency"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_Efficiency") %></span>

                        <div style="float: right; padding: 0px; margin-top: -7px;display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySearch)%>"">
                            <div class="TableCellHeaderSearch"  style="padding-top: 0px;">
                                <input id="txtSearch" globalize="ML_Efficiency_txtBox_SearchKeyword" type="text" ng-model="searchText" maxlength="100" placeholder="Search Keyword" />
                                <span class="SearchIcon" id="btnSearch" style="display: none">&nbsp;</span>
                            </div>
                        </div>
                        <img src="images/print-icon.png" style="padding-right: 7px; margin-top: -5px; float: right; display: block; cursor: pointer;" onclick="printarea();" class="printbtn" />
                    </h1>
                    <div class="sidebar_toggle">Sidebar Navigation</div>
                    <div class="nav_left" ng-click="clearSearch()">
                        <ul>
                            <li class="active icon_rebates" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRebate) %>"><a href="#" globalize="ML_Rebates_title_Rebates"><%= CustomerPortal.Translator.T("ML_Rebates_title_Rebates") %></a></li>
                            <li class="icon_dr_programes" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPrograms) %>"><a href="#" globalize="ML_Programs_title_Programs"><%= CustomerPortal.Translator.T("ML_Programs_title_Programs") %></a></li>
                            <li class="icon_saving_tips" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencySavingTips) %>"><a href="#" globalize="ML_Programs_Navigation_Savings_Tips"><%= CustomerPortal.Translator.T("ML_Programs_Navigation_Savings_Tips") %></a></li>
                            <li class="educational_tips" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyEducationTips) %>"><a href="#" globalize="ML_SvngTips_li_ET"><%= CustomerPortal.Translator.T("ML_SvngTips_li_ET") %></a></li>
                        </ul>
                        <div class="banner_left_img">
                            <img src="images/banner_ads/image002.png" class="padding_banner" />
                           
                        </div>
                    </div>
                    <div class="right_content_box">
                        <div class="top_conte_box_mob" style="height: 89%; overflow: auto;"> 
                        <div id="dvRebateContainer" style="display: block;">
                            <div class="efficiency_area">
                                
                                <ul ng-repeat="x in Rebates=(RebatesTips|filter:searchText)">
                                    <li class="repeat">
                                        <div class="top_div_img">

                                            <asp:Label ID="lblPromotionId" Text='{{x.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                            <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src='{{x.ImageUrl.toString().trim().length==0?"images/no_img.png": attachmentpath+ x.ImageUrl}}' onerror="imgError(this);" />
                                        </div>
                                        <div class="content_energy_area">
                                            <h1>{{x.Title}}  </h1>
                                            <h2 style="display:none"><span globalize="ML_Programs_li_Type" style="padding-right: 2px; font-weight: bold;" class=".typ"><%= CustomerPortal.Translator.T("ML_Programs_li_Type") %> </span><span class=".cnttype .popup">{{x.RebateProgramDesc}}</span></h2>
                                            <p class="textDesc">
                                                <asp:Label ID="Rebatedesctext" runat="server" Text='{{x.Description|to_trusted}}'> </asp:Label>
                                                <a href="#" id="{{x.PromotionId}}" title="" globalize="ML_OuterSavingTip_lnk_ReadMoreRebates" ng-click="IncreaseViewCount($index,x.PromotionId,x.CategoryName)" onclick="ShowContent(id,'3');" data-toggle="modal" data-target="#showdetails_effi"><%= CustomerPortal.Translator.T("ML_OuterSavingTip_lnk_ReadMoreRebates") %></a>

                                            </p>
                                            <span class="desc" ng-hide="true" style="display: none; visibility: hidden" id="{{x.PromotionId}}_Desc">{{x.Description}}</span>
                                            <span class="descWithoutHtml" style="display: none;" id="{{x.PromotionId}}_Desc">{{x.Description|to_trusted1}}</span>
                                            <div class="bottom_efficiency">
                                                <div class="like_area like_area_width" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>">
                                                    <a href="#" class='{{x.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id="LK_{{x.PromotionId}}"></a>
                                                    <span globalize="ML_SvngTips_span_Likes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                                    <span style="padding: 6px 1px 0 !important;font-weight:normal !important" id='LC_{{x.PromotionId}}'>{{x.LikeCount}}      </span>

                                                </div>
                                                 <div class="added_vote_area added_view_sec">
                                                    <ul>
                                                    </ul>
                                                </div>
                                                <div class="added_vote_area registered_box">
                                                    <ul>
                                                        <li  style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPreLoginRegister) %>" ><span style="padding-right: 5px; font-weight: bold;" globalize="ML_BILLDASHBOARD_Navigation_Enrolled" ><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %>:</span><span class="cntadded popup" style="font-weight: normal;">{{x.AddedCount}}    </span>  </li>
                                                       
                                                        <li style="display: none;" class="enroll_none"><span style="display: none" class="popup">{{x.SavingValue}}</span></li>
                                                          <li><span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed" class="viw"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{x.PromotionId}}" class="cntviews popup" style="font-weight: normal;">{{x.Views}}</span> </li>

                                                    </ul>
                                                </div>
                                                <div class="register" style="display:none"><a href="contact-us-connect-me.aspx?pid=r&q={{x.Title}}&id={{x.PromotionId}}" id="{{x.PromotionId}}" style="display: block;" globalize="ML_Register_Btn_SignUp"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></a></div>
                                            </div>
                                        </div>

                                        <div class="ShowDetailsDiv" style="display: none" id="ST_{{x.PromotionId}}_Content">
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div id="no_rebates" runat="server" ng-hide="RebatesTips.length>0" class="Nodatadiv">{{NoRebate}}</div>
                            <div id="no_searchresult" ng-show="!Rebates.length" ng-style="!RebatesTips?hideObj:showObj" class="Nodatadiv">{{NoSearch}}</div>
                        </div>

                        <div id="dvDrProgramsContainer" style="display: none;">
                            <div class="efficiency_area">
                                
                                <ul ng-repeat="x in Programs=(ProgramTips|filter:searchText)">
                                    <li class="repeat">
                                        <div class="top_div_img">

                                            <asp:Label ID="Label2" Text='{{x.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                            <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src='{{x.ImageUrl.toString().trim().length==0?"images/no_img.png": attachmentpath+ x.ImageUrl}}' onerror="imgError(this);" />
                                        </div>
                                        <div class="content_energy_area">
                                            <h1>{{x.Title}}  </h1>
                                            <h2 style="display:none;"><span globalize="ML_Programs_li_Type" style="padding-right: 2px; font-weight: bold;" class=".typ">Type: </span><span class=".cnttype .popup">{{x.RebateProgramDesc}}</span></h2>
                                            <p class="textDesc">
                                                <asp:Label ID="Programdesctext" runat="server" Text='{{x.Description|to_trusted}}'> </asp:Label>
                                                <a href="#" id="{{x.PromotionId}}" title="" globalize="ML_OuterSavingTip_lnk_ReadMorePrograms" ng-click="IncreaseViewCount($index,x.PromotionId,x.CategoryName)" onclick="ShowContent(id,'4');" data-toggle="modal" data-target="#showdetails_effi"><%= CustomerPortal.Translator.T("ML_OuterSavingTip_lnk_ReadMorePrograms") %></a>



                                            </p>
                                            <span class="desc" ng-hide="true" style="display: none; visibility: hidden" id="{{x.PromotionId}}_Desc">{{x.Description}}</span>
                                            <span class="descWithoutHtml" style="display: none;" id="{{x.PromotionId}}_Desc">{{x.Description|to_trusted1}}</span>
                                            <div class="bottom_efficiency">
                                                <div class="like_area like_area_width" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>">
                                                    <a href="#" class='{{x.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id="LK_{{x.PromotionId}}"></a>
                                                    <span globalize="ML_SvngTips_span_Likes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                                    <span style="padding: 6px 1px 0 !important;font-weight:normal !important" id='LC_{{x.PromotionId}}'>{{x.LikeCount}}      </span>

                                                </div>
                                                <div class="added_vote_area added_view_sec">
                                                 <%--   <ul>
                                                        </li>
                                                    </ul>--%>
                                                </div>
                                                <div class="added_vote_area registered_box">
                                                    <ul>
                                                        <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPreLoginRegister) %>" ><span style="padding-right: 5px; font-weight: bold;" globalize="ML_BILLDASHBOARD_Navigation_Enrolled" ><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %></span><span class="cntadded popup" style="font-weight: normal;">{{x.AddedCount}}    </span>
                                                        </li>
                                                       
                                                        <li style="display: none;" class="enroll_none"><span style="display: none" class="popup">{{x.SavingValue}}</span></li>
                                                          <li><span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed" class="viw"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{x.PromotionId}}" class="cntviews popup" style="font-weight: normal;">{{x.Views}}         </span>
                                                    </ul>
                                                </div>
                                                <div class="register enroll_none" style="display:none"><a href="contact-us-connect-me.aspx?pid=p&q={{x.Title}}&id={{x.PromotionId}}" id="{{x.PromotionId}}" style="display: block;" globalize="ML_Register_Btn_SignUp"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></a></div>
                                            </div>
                                        </div>

                                        <div class="ShowDetailsDiv" style="display: none" id="ST_{{x.PromotionId}}_Content">
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div id="no_programs" runat="server" ng-hide="ProgramTips.length>0" class="Nodatadiv" style="display: {{ProgramTips.length>0?'none':'block'}};">{{NoProgram}}</div>
                            <div id="no_searchresult1" ng-show="!Programs.length" ng-style="!ProgramTips?hideObj:showObj" style="display: {{!ProgramTips?'none':'block'}}" class="Nodatadiv">{{NoSearch}}</div>

                        </div>

                        <div id="dvSavingTipsContainer" style="display: none;">
                            <div class="efficiency_area">
                              <ul ng-repeat="x in Savings=(SavingTips|filter:searchText)">
                                    <li class="repeat">
                                        <div class="top_div_img">
                                            <asp:Label ID="Label1" Text='{{x.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                            <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src="{{x.ImageUrl==''?'images/no_img.png':attachmentpath+x.ImageUrl}}" onerror="imgError(this);" />
                                        </div>
                                        <div class="content_energy_area">
                                            <h1>{{x.Title}}  </h1>
                                     
                                            <p class="textDesc">
                                                <asp:Label ID="Savingdesctext" runat="server" Text='{{x.Description|to_trusted}}'> </asp:Label>
                                                <a href="#" id="{{x.PromotionId}}" title="" globalize="ML_OuterSavingTip_lnk_ReadMoreSaving" ng-click="IncreaseViewCount($index,x.PromotionId,x.CategoryName)" onclick="ShowContent(id,'1');" data-toggle="modal" data-target="#showdetails_effi"><%= CustomerPortal.Translator.T("ML_OuterSavingTip_lnk_ReadMoreSaving") %></a>



                                            </p>
                                            <span class="desc" ng-hide="true" style="display: none; visibility: hidden" id="{{x.PromotionId}}_Desc">{{x.Description}}</span>
                                            <span class="descWithoutHtml" style="display: none;" id="{{x.PromotionId}}_Desc">{{x.Description|to_trusted1}}</span>
                                            <div class="bottom_efficiency">
                                                <div class="like_area like_area_width" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>">
                                                    <a href="#" class='{{x.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id="LK_{{x.PromotionId}}"></a>
                                                    <span globalize="ML_SvngTips_span_Likes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                                    <span style="padding: 6px 1px 0 !important;font-weight:normal !important" id='LC_{{x.PromotionId}}'>{{x.LikeCount}}      </span>

                                                </div>
                                                <div class="added_vote_area added_view_sec">
                                                    <ul>
                                                        <li class="enroll_none"><span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed" class="viw"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{x.PromotionId}}" class="cntviews popup" style="font-weight: normal;">{{x.Views}}         </span>
                                                        </li>
                                                        <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal) %>" class="enroll_none"><span style="display:none;padding-right: 5px; font-weight: bold;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added" class="add"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span><span class="cntadded popup" style="display:none;font-weight: normal;">{{x.AddedCount}}    </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="added_vote_area registered_box">
                                                    <ul>
                                                        <li style="display: none;" class="enroll_none"><span style="display: none" class="popup">{{x.SavingValue}}</span></li>
                                                    </ul>
                                                </div>
                                              
                                                <div class="register enroll_none" style="display: none"><a href="contact-us-connect-me.aspx?pid=s&q={{x.Title}}&id={{x.PromotionId}}" id="{{x.PromotionId}}" style="display: block;" globalize="ML_Register_Btn_SignUp"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></a></div>
                                            </div>
                                        </div>

                                        <div class="ShowDetailsDiv enroll_none" style="display: none" id="ST_{{x.PromotionId}}_Content">
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div id="no_save_tips" runat="server" class="Nodatadiv" ng-hide="SavingTips.length>0" style="display: {{SavingTips.length>0?'none':'block'}};">{{NoSaving}}</div>
                            <div id="no_searchresult2" ng-show="!Savings.length" style="display: {{!SavingTips?'none':'block'}}" ng-style="!SavingTips?hideObj:showObj" class="Nodatadiv">{{NoSearch}}</div>

                        </div>

                        <div id="dvEducationalTipsContainer" style="display: none;">
                            <div class="efficiency_area">
                                <ul ng-repeat="x in Educations=(EducationTips|filter:searchText)">
                                    <li class="repeat">
                                        <div class="top_div_img">

                                            <asp:Label ID="Label3" Text='{{x.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                            <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src="{{x.ImageUrl==''?'images/no_img.png':attachmentpath+x.ImageUrl}}" onerror="imgError(this);" />
                                        </div>
                                        <div class="content_energy_area">
                                            <h1>{{x.Title}}  </h1>
                                          
                                            <p class="textDesc">
                                                <asp:Label ID="Edudesctext" runat="server" Text='{{x.Description|to_trusted}}'> </asp:Label>
                                                <a href="#" id="{{x.PromotionId}}" title="" globalize="ML_OuterSavingTip_lnk_ReadMoreEducationalTips" ng-click="IncreaseViewCount($index,x.PromotionId,x.CategoryName)" onclick="ShowContent(id,'2');" data-toggle="modal" data-target="#showdetails_effi"><%= CustomerPortal.Translator.T("ML_OuterSavingTip_lnk_ReadMoreEducationalTips") %></a>



                                            </p>
                                            <span class="desc" ng-hide="true" style="display: none; visibility: hidden" id="{{x.PromotionId}}_Desc">{{x.Description}}</span>
                                            <span class="descWithoutHtml" style="display: none;" id="{{x.PromotionId}}_Desc">{{x.Description|to_trusted1}}</span>
                                            <div class="bottom_efficiency">
                                                <div class="like_area like_area_width" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>">
                                                    <a href="#" class='{{x.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id="LK_{{x.PromotionId}}"></a>
                                                    <span globalize="ML_SvngTips_span_Likes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                                    <span style="padding: 6px 1px 0 !important;font-weight:normal !important" id='LC_{{x.PromotionId}}'>{{x.LikeCount}}      </span>

                                                </div>
                                                 <div class="added_vote_area added_view_sec">
                                                    <ul>
                                                         <li>
                                                            <span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed" class="viw"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{x.PromotionId}}" class="cntviews popup" style="font-weight: normal;">{{x.Views}}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                               
                                            </div>
                                        </div>

                                        <div class="ShowDetailsDiv" style="display: none" id="ST_{{x.PromotionId}}_Content">
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div id="no_edu_tips" runat="server" class="Nodatadiv" ng-hide="EducationTips.length>0" style="display: {{EducationTips.length>0?'none':'block'}}">{{NoEducation }}</div>
                            <div id="no_searchresult3" ng-show="!Educations.length" style="display: {{!Educations?'none':'block'}}" ng-style="!Educations?hideObj:showObj" class="Nodatadiv">{{NoSearch}}</div>

                        </div>
                        <div id="SearchContainer" class="SearchContainer" style="display: none;">
                        </div>

                        </div>

                    <div class="setting_save_box">
                            <div class="buttons_area">
                                 <div class="div_disclaimer" style="float: left; display:block">
                                    <b><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red; float: left;" inputtype="" validatemessage="Disclaimer" title="Disclaimer"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span>
                                        <span style="color: red;">:</span></b>
                                    <span class="cls_disclaimer dis_rebates" globalize="ML_PreLogin_EnergyEfficiency_Rebates_Disclaimer"><%= CustomerPortal.Translator.T("ML_PreLogin_EnergyEfficiency_Rebates_Disclaimer") %></span>
                                    <span class="cls_disclaimer dis_programs" globalize="ML_PreLogin_EnergyEfficiency_Programs_Disclaimer"><%= CustomerPortal.Translator.T("ML_PreLogin_EnergyEfficiency_Programs_Disclaimer") %></span>                                
                                 </div>
                               <!-- <asp:Button ID="btnSaveAll" runat="server" ClientIDMode="Static" CssClass="submit-button" Text='<%# CustomerPortal.Translator.T("ML_MYACCOUNT_Button_SaveAll") %>' OnClientClick="return false;" globalize="ML_MYACCOUNT_Button_SaveAll" />-->
                            </div>
                        </div>
                    </div>
                    <!-- End .right_content_box -->
                </div>
            </div>
        </section>
        <div id="page_loader">
        </div>
      <%--  <%#Eval("Title") %>--%>
        <!-- Show Details Modal Popup -->
        <div class="modal fade" id="showdetails_effi" role="dialog">
            <div class="modal-dialog modal-lg" style="width: 460px!important;">
                <div class="modal-content" style="float: left; padding-bottom: 0; width: 460px!important;">
                    <div class="modal-header">
                        <button type="button" class="close " data-dismiss="modal">
                            <img src="images/cross-icon.png"></button>
                        <h4 class="modal-title" id="modaltitle">Details </h4>
                    </div>
                    <div class="modal-body cust_pop" style="float: left;">

                        <div class="img_area">
                            <div class="img">
                                <img src="images/efficiency-icons/cpp.png" />
                            </div>
                        </div>
                        <div class="right_efficency">
                            <ul>
                                <li style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyPreLoginRegister)%>" class='addhide'><span class="addtxt" id="lbl_added"></span></li>
                                <li><b><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Viewed") %>:</b><span class="viwtxt" id="lbl_viewed"></span></li>
                                <li class='savhide'>
                                    <span globalize="ML_EnergyEfficiency_Lbl_SaveUpto" style="font-weight: bold;" id="lblSave"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_Lbl_SaveUpto") %></span> <span class="savtxt" id="lbl_saveupto"></span>
                                </li>

                            </ul>
                            <h5>
                                <span class="titletxt"></span>
                            </h5>
                        </div>
                        <div class="clearfix"></div>
                        <div class="discription_pro"></div>
                    </div>
                </div>

            </div>

        </div>

        <!-- End Section -->
        <!-- Footer starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- Footer ends -->
        <asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnType" Value="1" />
        <span globalize="ML_Efficiency_error_NoTips" id="NoData" style="display: none"></span>
        <asp:HiddenField ID="hdnAttachmentPath" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnLike" Value="load" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnRegister" Value="load" runat="server" ClientIDMode="Static" />
        <span globalize="ML_Connectme_ErrMsg_FileFailed" id="IDFileFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileFailed") %></span>
        <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></span>
         <span globalize="ML_EnergyEfficiency_ErrMsg_Rebates" id="NoDataRebates" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Rebates") %></span>
     <span id="NoDataPrograms" style="display: none;" globalize="ML_EnergyEfficiency_ErrMsg_Programs"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Programs") %></span>
        <span globalize="ML_EnergyEfficiency_ErrMsg_Education" id="NoDataEducation" style="display:none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Education") %></span>
             <span globalize="ML_EnergyEfficiency_ErrMsg_Savings" id="NoDataSaving" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Savings") %></span>
            <span globalize="ML_BILLDASHBOARD_Navigation_Enrolled" id="ML_Enroled_id" style="display: none"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %></span>
                <span globalize="ML_ENERGY_EFFICIENCY_Lbl_Added" id="ML_Added_id" style="display: none"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span>

    </form>
</body>

</html>
