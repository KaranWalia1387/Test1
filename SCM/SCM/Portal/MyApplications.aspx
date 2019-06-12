<%@ Page Title="Conservation" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true" CodeBehind="MyApplications.aspx.cs" Inherits="CustomerPortal.MyApplications" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<%@ Register Src="~/UserControls/ConnectMeUserControl.ascx" TagPrefix="uc1" TagName="ConnectMeUserControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <title globalize="ML_Programs_title_Programs">My Applications</title>
       <%-- bundle js and css added--%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssMyApplication") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsMyApplication")%>

   <%-- <script src="js/angular/angular.js"></script>--%>
   <%-- <link href="css/MyApplications.css" rel="stylesheet" />
    <script src="js/myapplication.js" type="text/javascript"></script>--%>

       <%-- <script type="text/javascript">
            $(document).ready(function ($) {
          
            });

       
        </script>--%>

    

    <input type="hidden" class="activeli_list" value="efficency" />



    <div class="right_content_box">
        <div class="efficiency_area">
        
             <div class="Nodatadiv" ng-show="!MyApplicationsData" ng-cloak>{{NoDataDiv}}</div>
              <div class="Nodatadiv" ng-show="!applications.length" ng-style="!MyApplicationsData?hideObj:showObj" globalize="ML_EnergyEfficiency_ErrMsg_SearchErr"  ng-cloak><%=CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></div>

                       <ul ng-repeat="app in applications=(MyApplicationsData|filter:searchText)" ng-cloak>
                        <li>
                            <div class="top_div_img">
                                
                                <asp:Label ID="lblPromotionId" Text='{{app.PromotionId}}' runat="server" Visible="false" ClientIDMode="Static"></asp:Label>
                                <asp:Image Style=" height: 105px; border-bottom: 1px solid #ccc;" runat="server" CssClass=".imgurl" ng-src="{{app.ImageUrl==''?'images/no_img.png':attachmentpath+app.ImageUrl}}"  onerror="imgError(this);" />
                            </div>
                            <div class="content_energy_area">
                                <h1>{{app.Title}}  </h1>
                                <%--<h2><span globalize="ML_Programs_li_Type" style="padding-right: 2px; font-weight: bold;">Type: </span><span class=".cnttype .popup"><%#Eval("RebateProgramDesc") %></span></h2>--%>
                                 <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"></span>
                                <p class="textDesc">
                                    <asp:Label ID="desctext" runat="server"  ng-bind-html="app.Description|to_trusted"> </asp:Label>
                                      <a href="#" id="{{app.PromotionId}}" onclick="ShowContent(id);" data-toggle="modal" data-target="#showdetails_effi" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></a>



                                </p><span class=".desc" style="display:none" id="{{app.PromotionId}}_Desc">{{app.Description}}</span>
                                <span class="descWithoutHtml" style="display:none;" id="{{app.PromotionId}}_Desc">{{app.Description|to_trusted1}}</span>  
                                <div class="bottom_efficiency"> 
                                    <div class="register" >
                                        <a href="#" globalize="ML_Outage_Lbl_Status" data-toggle="modal" data-target="#showdetails_Status" onclick="ShowStatusContent(id);" id="{{app.PromotionId}}"><%= CustomerPortal.Translator.T("ML_Outage_Lbl_Status") %></a>
                                      
                                    </div>                           
                                </div>
                            </div>

                            <div class="ShowDetailsDiv" style="display:none" id="ST_{{app.PromotionId}}_Content">
                                {{app.Description}}
                            </div>
                        </li>

                    </ul>
        </div>
    </div>
    <!-- End .right_content_box -->
    <span style="padding: 3px 0px 0;display:none" globalize="ML_SvngTips_span_Likes" id="lblLikes"><%= CustomerPortal.Translator.T("ML_SvngTips_span_Likes") %></span>
    <span globalize="ML_Programs_title_Programs" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Programs_title_Programs") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchErr" id="SearchErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchErr") %></span>
    <span globalize="ML_EnergyEfficiency_ErrMsg_SearchNullErr" id="SearchNullErr" style="display: none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_SearchNullErr") %></span>
     <span id="lblRegister" style="display: none;" globalize="ML_Register_Btn_SignUp"><%= CustomerPortal.Translator.T("ML_Register_Btn_SignUp") %></span>
     <span id="lblRegistered" style="display: none;" globalize="ML_ENERGY_EFFICIENCY_Btn_Registered"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Btn_Registered") %></span>
     <span id="lblReadmore" style="display: none;" globalize="ML_Efficiency_lnk_ReadMore"><%= CustomerPortal.Translator.T("ML_Efficiency_lnk_ReadMore") %></span>
    <asp:HiddenField ID="hidAttachmentPath" runat="server" Value="" />

    <!-- Show Details Modal Popup -->
    <div class="modal fade" id="showdetails_effi" role="dialog">
        <div class="modal-dialog modal-lg" style="width: 460px;">
            <div class="modal-content modal-lg" style="float: left; padding-bottom: 0;">
                <div class="modal-header">
                     <button type="button" class="close " data-dismiss="modal">
                    <img src="images/cross-icon.png"></button>
                   <%-- <button type="button" class="close" data-dismiss="modal">&times;</button>--%>
                    <h4 class="modal-title">Details </h4>
                </div>
                <div class="modal-body cust_pop" style="float: left; width: 100%;">

                    <div class="img_area">
                        <div class="img">
                            <img id="img_popimage" src="images/efficiency-icons/cpp.png" onerror="imgError(this);" />
                        </div>
                    </div>
                    
                    <div class="clearfix"></div>
                    <div class="discription_pro" id="div_description"></div>
                </div>

                <div class="row contact_pop" id="divConnectMe" style="float: left; width: 50%; background: #f4f4f4; margin: 0; display:none;" >
                
                </div>

            </div>

        </div>

    </div>
    <div class="modal fade" id="showdetails_Status" role="dialog">
        <div class="modal-dialog modal-lg" style="width: 650px;">
            <div class="modal-content modal-lg" style="float: left; padding-bottom: 0;">
                <div class="modal-header">
                     <button type="button" class="close " data-dismiss="modal">
                    <img src="images/cross-icon.png"></button>
                   <%-- <button type="button" class="close" data-dismiss="modal">&times;</button>--%>
                    <h4 class="modal-title">Details </h4>
                </div>
                <div class="modal-body cust_pop" style="float: left; width: 100%;">

                    <div class="img_area">
                        <div class="img">
                            <img id="img_pop" src="images/efficiency-icons/cpp.png" onerror="imgError(this);" />
                        </div>
                        <div class="breadcrumb_wrapper">
                           <ul class="breadcrumb12">
	                            <li><a href="#">Applied </a></li>
	                            <li><a href="#">Pre-Inspections</a></li>
	                            <li><a href="#">Authorized</a></li>
	                            <li class="inactive1"><a href="#">Post-Inspections</a></li>
	                            <li class="inactive1"><a href="#" style="padding-top: 9px;height: 44px;">Approve for <br /> payment</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>

           

        </div>

    </div>
    <!-- End Section -->
    <asp:HiddenField ID="hdnPid" Value="load" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnLike" Value="load" runat="server" ClientIDMode="Static" />
       <asp:HiddenField ID="hdnRegister" Value="load" runat="server" ClientIDMode="Static" />
       <asp:HiddenField ID="hdnRegisterCount" Value="load" runat="server" ClientIDMode="Static" />
    <span globalize="ML_EnergyEfficiency_ErrMsg_Application" id="NoData" style="display:none"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_ErrMsg_Application") %></span>

</asp:Content>
