<%@ Page Title="Saving Tips" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true"
    CodeBehind="saving-tips.aspx.cs" Inherits="CustomerPortal.saving_tips" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
  <%: System.Web.Optimization.Styles.Render("~/Content/cssSavingTips") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsSavingTips")%>
     <input type="hidden" class="activeli_list" value="icon_saving_tips" />
    <div class="right_content_box" id="ST_Content" style="position: relative;">
        <div class="top_conte_box_mob" style="height: 87%; overflow: auto;">
            <div class="efficiency_area">
                <div class="right_content_box_1">
                    <div class="Nodatadiv" ng-show="!SavingData" ng-cloak>{{NoDataDiv}}</div>
                     <div class="Nodatadiv" ng-show="!Savings.length" ng-style="!SavingData?hideObj:showObj" globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" ng-cloak><%=CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></div>


                        <ul>
                                <li ng-repeat="saving in Savings=(SavingData|filter:searchText)" ng-cloak>
                                    <div class="top_div_img">
                                        
                                        <asp:Label ID="lblRebateId" Text='{{saving.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static" globalize="ML_SvngTips_Lbl_PromoId"></asp:Label>
                                        <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" ng-src="{{saving.ImageUrl==''?'images/no_img.png':attachmentpath+saving.ImageUrl}}"  globalize="ML_SvngTips_Img_Attachment" />
                                    </div>
                                    <div class="content_energy_area">
                                        <h1 globalize="ML_SvngTips_div_Title">{{saving.Title}}  </h1>
                                      
                                        <p globalize="ML_SvngTips_div_Desc" class="textDesc">
                                            <asp:Label ID="desctext" runat="server" ng-bind-html="saving.Description|to_trusted"> </asp:Label>
                                            <a href="#" id="{{saving.PromotionId}}" ng-click="increaseViews($index,saving.PromotionId)" onclick="GetPopUpData(id);" data-toggle="modal" data-target="#showdetails_effi" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></a>
                                        </p>
                                        <span class="descWithoutHtml" style="display:none;" id="{{saving.PromotionId}}_Desc">{{saving.Description|to_trusted1}}</span>
                                        <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>

                                        <div class="bottom_efficiency">
                                            
                                              <div class="added_vote_area added_view_sec">
                                                <ul><li
                                                     style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike)%>">
                                                <a href="#" class='{{saving.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' ng-click="IncreaseDecLikes(saving.PromotionId,$event,$index)" id="LK_{{saving.PromotionId}}" globalize="ML_SvngTips_a_Promo">&nbsp;</a>
                                                <span globalize="ML_SvngTips_span_Likes" id="lblLikes" style="padding: 3px 0px 0;"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                                <span style="padding: 6px 0px 0;" id='LC_{{saving.PromotionId}}' globalize="ML_SvngTips_LikeCount">{{saving.LikeCount}}     </span>

                                            
                                                    </li>
                                                       <%--<li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal) %>" class="eff_register"><span style="padding-right:5px; font-weight: bold;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span><span class=".cntadded .popup">{{saving.AddedCount}}    </span>
                                                    </li>--%>
                                                    <li style="border-left: 1px solid;"><span style="padding-right:5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{saving.PromotionId}}" globalize="ML_SvngTips_Views" class=".cntviews .popup">{{saving.VIEWS}}      
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>                                             
                                            <div style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal) %>">
                                                <div style="float: right; display:{{saving.program_status=='1'?'none':'block'}};margin-right: -10px; margin-top: 5px;" ng-hide="saving.program_status=='1'">
                                                    <input type="checkbox" id="{{saving.PromotionId}}" style="float: right;" globalize="ML_SvngTips_chk_PromoId" style="float: right;">
                                                    <span id="{{saving.PromotionId}}_chk" globalize="ML_SvngTips_Button_AddTip"><%= CustomerPortal.Translator.T("ML_SvngTips_Button_AddTip") %></span>
                                                </div>
                                            </div>
                                      
                                        </div>
                                    </div>

                                    <div class="desc" style="display:none" id="{{saving.PromotionId}}_Content">
                                        {{saving.Description}}
                                    </div>
                                </li>

                            </ul>
                    <div class="clearfix">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
        <div class="setting_save_box" style="display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal)%>">
            <input id="addTips" type="button" class="submit-button" globalize="ML_SvngTips_Button_AddTip" value='<%# CustomerPortal.Translator.T("ML_SvngTips_Button_AddTip") %>' style="float: right; font-size: 16px;F" />
        </div>
    </div>
    <!-- End .right_content_box -->

    <!-- Show Details Modal Popup -->
    <div class="modal fade" id="showdetails_effi" role="dialog">
        <div class="modal-dialog" style="width: 460px;">
            <div class="modal-content" style="float: left; padding-bottom: 0; width: 100%;">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal">
                        <img src="images/cross-icon.png"></button>
                   
                    <h4 class="modal-title" id="modaltitle">Details </h4>
                </div>
                <div class="modal-body cust_pop" style="float: left; width: 100%;">

                    <div class="img_area">
                        <div class="img">
                            <img id="img_popimage" src="images/efficiency-icons/cpp.png" />
                        </div>
                    </div>
                    <div class="right_efficency">
                        <ul>
                            <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyGoal) %>"><span style="font-weight: bold; padding-right:4px;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added" id="lblAdd"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span><span class="addtxt" id="lbl_added"></span></li>
                            <li><span style="font-weight: bold; padding-right:4px;" globalize="ML_SvngTips_li_Viewed" id="lblView"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span class="viwtxt" id="lbl_viewed"></span></li>
                            <li><span globalize="ML_EnergyEfficiency_Lbl_SaveUpto" style="font-weight: bold; padding-right:4px;" id="lblSave"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_Lbl_SaveUpto") %></span><span class="typtxt" id="lbl_saveupto"></span></li>

                          
                        </ul>
                        <h5>
                            <span class="titletxt" globalize="ML_SvngTips_div_Title">    </span>
                        </h5>
                    </div>
                    <div class="clearfix"></div>
                    <div class="discription_pro" id="div_description"></div>
                </div>
            </div>

        </div>

    </div>
    <!-- End Section -->
    <span globalize="ML_SvngTips_span_Likes" style="display: none;" id="lblLikes" style="padding: 3px 0px 0;"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
    <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></span>
    <span globalize="ML_SvngTips_h1_SavingTip" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_SvngTips_h1_SavingTip") %></span>
    <span globalize="ML_savingtips_ErrMsg_SelectTip" id="IDSelectTip" style="display: none"><%= CustomerPortal.Translator.T("ML_savingtips_ErrMsg_SelectTip") %></span>
    <span globalize="ML_savingtips_ErrMsg_MaxLimit" id="IDMaxlimit" style="display: none"><%= CustomerPortal.Translator.T("ML_savingtips_ErrMsg_MaxLimit") %></span>
    <span globalize="ML_savingtips_ErrMsg_Success" id="IDSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_savingtips_ErrMsg_Success") %></span>
     <span globalize="ML_EnergyEfficiency_ErrMsg_Savings" id="NoData" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Savings") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchNullErr" id="SearchNullErr" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchNullErr") %></span>
    <asp:HiddenField ID="hdnPid" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLike" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnRegister" Value="load" runat="server" ClientIDMode="Static" />
</asp:Content>

