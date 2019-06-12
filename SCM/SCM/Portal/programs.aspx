<%@ Page Title="Programs" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true"
    CodeBehind="programs.aspx.cs" Inherits="CustomerPortal.programs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <title globalize="ML_Programs_title_Programs">Programs</title>

    <%: System.Web.Optimization.Styles.Render("~/Content/cssPrograms") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsPrograms")%>
    <input type="hidden" class="activeli_list" value="efficency" />
    <div class="right_content_box">
        <div class="efficiency_area">
            <div class="Nodatadiv" ng-show="!ProgramData" ng-cloak>{{NoDataDiv}}</div>
            <div class="Nodatadiv" ng-show="!Programs.length" ng-style="!ProgramData?hideObj:showObj" ng-cloak globalize="ML_EnergyEfficiency_ErrMsg_SearchErr"><%=CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></div>

            <ul>
                <li ng-repeat="program in Programs=(ProgramData|filter:searchText)" ng-cloak>
                    <div class="top_div_img">

                        <asp:Label ID="lblPromotionId" ng-bind="{{program.PromotionId}}" runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                        <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src="{{program.ImageUrl==''?'images/no_img.png':attachmentpath+program.ImageUrl}}" />
                    </div>
                    <div class="content_energy_area">
                        <h1>{{program.Title}}  </h1>

                        <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>
                        <p class="textDesc">
                            <asp:Label ID="desctext" runat="server" ng-bind-html="program.Description|to_trusted" style="word-wrap: break-word;"> </asp:Label>
                            <a href="#" id="{{program.PromotionId}}" onclick="ShowContent(id);" ng-click="increaseViews($index,program.PromotionId)" data-toggle="modal" data-target="#showdetails_effi" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></a>



                        </p>
                        <span class=".desc" style="display: none" id="{{program.PromotionId}}_Desc">{{program.Description}}</span>
                        <span class="descWithoutHtml" style="display: none;" id="{{program.PromotionId}}_Desc">{{program.Description|to_trusted1}}</span>
                        <div class="bottom_efficiency">

                            <div class="added_vote_area added_view_sec">
                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike)%>">
                                        <a href="#" class='{{program.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' id=" LK_{{program.PromotionId}}" ng-click="IncreaseDecLikes(program.PromotionId,$event,$index)">&nbsp;</a>
                                        <span style="padding: 3px 0px 0;" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                        <span style="padding: 6px 0px 0;" id='LC_{{program.PromotionId}}'>{{program.LikeCount}}</span>
                                    </li>

                                </ul>
                            </div>
                            <div class="added_vote_area registered_box">
                                <ul>
                                    <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRegister)%>" class="eff_register">
                                        <span style="padding-right: 5px; font-weight: bold;" globalize="ML_BILLDASHBOARD_Navigation_Enrolled"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %>:</span><span class="cntadded popup" style="font-weight: normal;">{{program.AddedCount}}    </span>
                                    </li>
                                    <li><span style="padding-right: 5px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span id="VC_{{program.PromotionId}}" class="cntviews popup" style="font-weight: normal;"> {{program.VIEWS}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="register" style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyRegister)%>">
                                <a href="connect-me.aspx?pid=p&q={{program.Title}}&id={{program.PromotionId}}" id="{{program.PromotionId}}" style="display: {{program.program_status=='1'?'none':'block'}};" data-ng-show="program.program_status=='0'" data-ng-hide="program.program_status=='1'" globalize="ML_RecurringBill_Btn_SaveAll"><%= CustomerPortal.Translator.T("ML_RecurringBill_Btn_SaveAll") %></a>
                                <a href="" id="{{program.PromotionId}}" style="background: #BBBFB4; display: {{(program.program_status=='0'?'none':'block')}}" class="btn-disable" data-ng-show="program.program_status=='1'" data-ng-hide="program.program_status=='0'" globalize="ML_BILLDASHBOARD_Navigation_Enrolled"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Navigation_Enrolled") %></a>


                            </div>

                            <div class="submit_after_add" id="SU_{{program.Program_status}}">
                            </div>
                        </div>

                        <div class="ShowDetailsDiv" style="display: none" id="ST_{{program.PromotionId}}_Content">
                            {{program.Description}}
                        </div>
                </li>

            </ul>



        </div>
    </div>
    <!-- End .right_content_box -->
    <span style="padding: 3px 0px 0; display: none" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
    <span globalize="ML_Programs_title_Programs" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Programs_title_Programs") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchNullErr" id="SearchNullErr" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchNullErr") %></span>
    <span id="lblRegister" style="display: none;" globalize="ML_Register_Btn_SignUp"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></span>
    <span id="lblRegistered" style="display: none;" globalize="ML_ENERGY_EFFICIENCY_Btn_Registered"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Btn_Registered") %></span>
    <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></span>
    <span id="NoData" style="display: none;" globalize="ML_EnergyEfficiency_ErrMsg_Programs"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Programs") %></span>
    <asp:HiddenField ID="hidAttachmentPath" runat="server" Value="" />

    <!-- Show Details Modal Popup -->
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

                        </ul>
                        <h5>
                            <span class="titletxt"> </span>
                        </h5>
                    </div>
                    <div class="clearfix"></div>
                    <div class="discription_pro" id="div_description"></div>
                </div>

                <div class="row contact_pop" id="divConnectMe" style="float: left; width: 50%; background: #f4f4f4; margin: 0; display: none;">
                </div>

            </div>

        </div>

    </div>
    <!-- End Section -->
    <asp:HiddenField ID="hdnPid" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLike" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnRegister" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnRegisterCount" Value="load" runat="server" ClientIDMode="Static" />
</asp:Content>
