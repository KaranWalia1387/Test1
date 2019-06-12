<%@ Page Title="Rebates" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true"
    CodeBehind="rebates.aspx.cs" Inherits="CustomerPortal.rebates" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <title globalize="ML_Rebates_title_Rebates">Rebates</title>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssRebates") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsRebates")%>
    <script type="text/javascript">
        $(document).ready(function ($) {
            var v = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>';
            $('.like_area').attr('style', 'display:' + v);
        });

    </script>
    <style>
        .efficiency_area ul li .content_energy_area .like_area.like_area_width {
            border: none !important;
        }
    </style>
    <input type="hidden" class="activeli_list" value="efficency" />

    <div class="right_content_box">
        <div class="efficiency_area">
         <div class="Nodatadiv" ng-show="!RebatesData" ng-cloak>{{NoDataDiv}}</div>
            <div class="Nodatadiv" ng-show="!Rebates.length" ng-style="!RebatesData?hideObj:showObj" globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" ng-cloak><%=CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></div>

            <ul>
                <li ng-repeat="rebate in Rebates=(RebatesData|filter:searchText)" ng-cloak>
                    <div class="top_div_img">

                        <asp:Label ID="lblRebateId" Text='' ng-bind="{{rebate.PromotionId}}" runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                        <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src="{{rebate.ImageUrl==''?'images/no_img.png':attachmentpath+rebate.ImageUrl}}"></asp:Image>
                    </div>
                    <div class="content_energy_area">
                        <h1>{{rebate.Title}}  </h1>
                        <p class="textDesc">
                            <asp:Label ID="desctext" ng-bind-html="rebate.Description|to_trusted" runat="server" ClientIDMode="Static"></asp:Label>
                            <a href="#" id="{{rebate.PromotionId}}" class="readMore" onclick="ShowContent(id);" ng-click="increaseViews($index,rebate.PromotionId)" data-toggle="modal" data-target="#showdetails_effi" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></a>
                        </p>
                        <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>

                        <span class="desc" style="display: none" id="{{rebate.PromotionId}}_Desc" ng-bind-html="rebate.Description"></span>
                        <span class="descWithoutHtml" style="display: none;" id="{{rebate.PromotionId}}_Desc">{{rebate.Description|to_trusted1}}</span>
                        <div class="bottom_efficiency">

                            <div class="added_vote_area added_view_sec">
                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike)%>">
                                        <a href="#" class='{{rebate.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id="LK_{{rebate.PromotionId}}" ng-click="IncreaseDecLikes(rebate.PromotionId,$event,$index)">&nbsp;</a>
                                        <span style="padding: 3px 0px 0;" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                        <span style="padding: 6px 0px 0;" id='LC_{{rebate.PromotionId}}'>{{rebate.LikeCount}}</span>
                                    </li>
                                    <li style="display: none;"><span style="display: none" class="popup">{{rebate.RebateProgramDesc}}</span></li>
                                    <li style="display: none;"><span style="display: none" class="popup">{{rebate.SavingValue}}</span></li>
                                </ul>
                            </div>
                            <div class="added_vote_area registered_box">
                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRegister)%>" class="eff_register"><span style="padding-right: 5px; font-weight: bold;" globalize="ML_BILLDASHBOARD_Navigation_Enrolled"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %>:</span><span style="font-weight: normal;" class="popup">{{rebate.AddedCount}}</span></li>
                                    <li><span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span style="font-weight: normal;" id="VC_{{rebate.PromotionId}}" class="popup">{{rebate.VIEWS}}</span> </li>
                                </ul>
                            </div>
                            <div class="register" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRegister)%>">
                                <a href="connect-me.aspx?pid=r&q={{rebate.Title}}&id={{rebate.PromotionId}}" id="{{rebate.PromotionId}}" data-ng-show="rebate.program_status=='0'" data-ng-hide="rebate.program_status=='1'" style="display: {{rebate.program_status=='1'?'none':'block'}};" globalize="ML_RecurringBill_Btn_SaveAll"><%= CustomerPortal.Translator.T("ML_RecurringBill_Btn_SaveAll") %></a>
                                <a href="" id="{{rebate.PromotionId}}" style="background: #BBBFB4; display: {{rebate.program_status=='0'?'none':'block'}};" class="btn-disable" data-ng-show="rebate.program_status=='1'" data-ng-hide="rebate.program_status=='0'" globalize="ML_BILLDASHBOARD_Navigation_Enrolled"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %></a>

                            </div>

                        </div>

                    </div>

                </li>
            </ul>



        </div>
    </div>
    <!-- End .right_content_box -->
    <div class="modal fade" id="showdetails_effi" role="dialog">
        <div class="modal-dialog modal-lg" style="width: 460px;">
            <div class="modal-content modal-lg" style="float: left; padding-bottom: 0;">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png"></button>

                    <h4 class="modal-title" id="modaltitle">Details </h4>
                </div>
                <div class="modal-body cust_pop" style="float: left; width: 100%;">

                    <div class="img_area">
                        <div class="img">
                            <img id="img_popimage" src="images/efficiency-icons/cpp.png" onerror="imgError(this);" />
                        </div>
                    </div>
                    <div class="right_efficency">
                        <ul>
                            <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRegister)%>"><span style="font-weight: bold; padding-right: 4px;" id="lblAdd"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %>:</span><span class="addtxt" id="lbl_added"></span></li>
                            <li><span style="font-weight: bold; padding-right: 4px;" globalize="ML_SvngTips_li_Viewed" id="lblView"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span class="viwtxt" id="lbl_viewed"></span></li>
                            <li><span globalize="ML_EnergyEfficiency_Lbl_SaveUpto" style="font-weight: bold;" id="lblSave"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_Lbl_SaveUpto") %></span>&nbsp;$<span class="savtxt" id="lbl_saveupto"></span></li>
                        </ul>
                        <h5>
                            <span class="titletxt"></span>
                        </h5>
                    </div>
                    <div class="clearfix"></div>
                    <div class="discription_pro" id="div_description"></div>
                </div>

                <div class="row contact_pop" id="divConnectMe" style="float: left; width: 50%; background: #f4f4f4; margin: 0;">
                </div>

            </div>

        </div>

    </div>
    <span id="lblRegister" style="display: none;" globalize="ML_RecurringBill_Btn_SaveAll"><%= CustomerPortal.Translator.T("ML_RecurringBill_Btn_SaveAll") %></span>
    <span id="lblRegistered" style="display: none;" globalize="ML_BILLDASHBOARD_Navigation_Enrolled"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %></span>
    <span style="padding: 3px 0px 0; display: none" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
    <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></span>
    <span globalize="ML_Rebates_title_Rebates" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Rebates_title_Rebates") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchNullErr" id="SearchNullErr" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchNullErr") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_Rebates" id="NoData" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Rebates") %></span>
    <asp:HiddenField ID="hdnPid" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLike" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnRegister" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnRegisterCount" Value="load" runat="server" ClientIDMode="Static" />
</asp:Content>
