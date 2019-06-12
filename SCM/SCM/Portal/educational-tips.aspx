<%@ Page Title="Educational Tips" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true"
    CodeBehind="educational-tips.aspx.cs" Inherits="CustomerPortal.educational_tips" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <title>Educational Tips</title>
    <%-- bundle js and css added--%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssEducationalTips") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsEducationalTips")%>
 

   
    <script type="text/javascript">
        $(document).ready(function ($) {
       
            var v = '<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike) %>'
            $('.like_area').attr('style', 'display:' + v);

        });

    </script>
    <input type="hidden" class="activeli_list" value="efficency" />

    <div class="right_content_box">
        <div class="efficiency_area">
         
                  
            <ul>
                        <li ng-repeat="education in Educations=(Educationaldata|filter:searchText)" ng-cloak>
                            <div class="top_div_img">
                            
                                <asp:Label ID="lblPromotionId" Text='{{education.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                <asp:Image Style="height: 105px; border-bottom: 1px solid #ccc;" runat="server" ng-src="{{education.ImageUrl==''?'images/no_img.png':attachmentpath+education.ImageUrl}}" />
                            </div>
                            <div class="content_energy_area">
                                <h1>{{education.Title}}  </h1>
                              
                                <p class="textDesc">
                                    
                                    <asp:Label ID="desctext" runat="server" ng-bind-html="education.Description|to_trusted" > </asp:Label>
                                    <a href="#" id="{{education.PromotionId}}" ng-click="increaseViews($index,education.PromotionId)" onclick="GetPopUpData(id);" data-toggle="modal" data-target="#showdetails_effi" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></a>
                                    <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>

                                </p>
                                <span class="descWithoutHtml" style="display:none;" id="{{education.PromotionId}}_Desc">{{education.Description|to_trusted1}}</span>
                                <div class="bottom_efficiency">
                                   
                                    <div class="added_vote_area added_view_sec">
                                        <ul>
                                              
                                            <li style="height:18px;display:<%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.EfficiencyLike)%>">
                                          <a href="#" class='{{education.PromotionLike=="1"?"like_lnk":"like_lnk_ro"}}' ng-click="IncreaseDecLikes(education.PromotionId,$event,$index)" id="LK_{{education.PromotionId}}">&nbsp;</a>
                                        <span  globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
                                        <span  id='LC_{{education.PromotionId}}'>{{education.LikeCount}}      </span>

                                            </li>
                                            <li><span style="padding-right:4px; font-weight: bold;" globalize="ML_SvngTips_li_Viewed"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span>&nbsp;
                                                <span id="VC_{{education.PromotionId}}" class=".cntviews .popup">{{education.VIEWS}}        </span>
                                            </li>  
                                        </ul>
                                    </div>
                                   
                                
                                </div>
                            </div>

                            <div class="desc" style="display:none" id="ST_{{education.PromotionId}}_Content">
                                {{education.Description}}
                            </div>
                        </li>

                    </ul>
            
             <div class="Nodatadiv" ng-="!Educationaldata" ng-cloak>{{NoDataDiv}}</div>  
             <div class="Nodatadiv" ng-show="!Educations.length" ng-style="!Educationaldata?hideObj:showObj"  globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" ng-cloak><%=CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></div>    
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
                            <img id="img_popimage"  onerror="imgError(this);" />

                        </div>
                    </div>
                    <div class="right_efficency">
                        <ul>
                           
                            <li><span style="font-weight: bold; padding-right:4px;" globalize="ML_SvngTips_li_Viewed" id="lblView"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span><span class="viwtxt" id="lbl_viewed"></span></li>

                          
                        </ul>
                        <h5>
                            <span class="titletxt">  </span>
                        </h5>
                    </div>
                    <div class="clearfix"></div>
                    <div class="discription_pro"></div>
                </div>

                <div class="row contact_pop" id="divConnectMe" style="float: left; width: 50%; background: #f4f4f4; margin: 0; display: none;">

                  
                </div>

            </div>

        </div>

    </div>
    <!-- End Section -->
    <span style="padding: 3px 0px 0; display:none;" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
    <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>
    <span style="font-weight: bold; display:none;"  globalize="ML_SvngTips_li_Viewed" id="Span1"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span>
    <span globalize="ML_Programs_Navigation_Educational_Tips" id="titletext" style="display: none"></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchNullErr" id="SearchNullErr" style="display: none"></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_Education" id="NoData" style="display:none">
    </span>

</asp:Content>
