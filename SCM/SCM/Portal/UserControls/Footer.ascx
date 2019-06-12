<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Footer.ascx.cs" Inherits="CustomerPortal.UserControls.Footer" %>
<%@ Register Src="~/VersionNumber.ascx" TagPrefix="uc1" TagName="VersionNumber" %>
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->

<footer>
	<div class="container">    
    	<div class="row">
             <div class="col-xs-12 col-sm-3 col-md-3">
                <%if(Session.Count>0){ %>
    			<div class="footlinks" style="display:none;">
                	<ul>
                    	<li><a href="#" globalize="ML_Title_Settings"><%= CustomerPortal.Translator.T("ML_Title_Settings") %></a></li>
                        <li><a href="#" globalize="ML_Footer_a_ConnectMe"><%= CustomerPortal.Translator.T("ML_Footer_a_ConnectMe") %></a></li>
                        <li><a href="#" globalize="ML_Footer_a_LogOut"><%= CustomerPortal.Translator.T("ML_Footer_a_LogOut") %></a></li>
                    </ul>
                </div>
                <% }%>
                 Server IP: <asp:Label ID="lblIP" runat="server" Text=""></asp:Label> Server Name: <asp:Label ID="lblAdr" runat="server" Text=""></asp:Label>
                <uc1:VersionNumber runat="server" id="VersionNumber" />
            </div>
         	<div class="col-xs-12 col-sm-3 col-md-4">
    			<div class="copy-right" ><%= CustomerPortal.Translator.T("ML_Footer_Div_CompanyInfo").Replace("YYYY",Convert.ToString(DateTime.Now.Year)) %>
    			</div>
            </div>
           <div class="col-xs-12 col-sm-3 col-md-3">
               <div class="term_condi_box">
                 <a href="#" data-toggle="modal" data-target="#myModal_terms"><span style="font-size: 10px"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></span></a>  |  <a href="#" data-toggle="modal" data-target="#myModal_privacy"><span style="font-size: 10px"><%= CustomerPortal.Translator.T("ML_Msg_PrivacyPolicy") %></span></a> 
              </div>
           </div>
            
            <div class="col-xs-12 col-sm-3 col-md-2">
    			<div class="footer-logo" style="cursor: pointer;">
                	<a onclick="javascript:window.open('http://smartenergywater.com')"><img src="<%=string.Format("{0}/images/logo-sus.png",CustomerPortal.SessionAccessor.BaseUrl)%>" /></a>
                </div>            
            </div>
        </div>
    </div>       
     <div id="myModal_terms" class="modal fade">
        <div class="modal-dialog" style="margin-top: 4%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal"><img src="images/cross-icon.png"></button>                    
                    <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></h4>
                </div>
                <div class="modal-body" style="height: 430px;overflow: auto;padding:0px;">
                     <div class="text_align_box" style="padding: 0 0px 5px;">
                   <asp:Literal ID="ltrlTermsAndCondition" runat="server"></asp:Literal>
                         </div>
                </div>
                <div class="modal-footer" style="display:none;">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                </div>
            </div>
        </div>
    </div>

         <!-- Modal HTML -->
    <div id="myModal_privacy" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content" style="padding-bottom:0">
                <div class="modal-header">
                     <button type="button" class="close " data-dismiss="modal"><img src="images/cross-icon.png"></button>   
                    <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_Msg_PrivacyPolicy") %></h4>
                </div>
                <div class="modal-body" style="height: 500px;overflow: auto;">
                    <div class="text_align_box">
                      <asp:Literal ID="ltrlPrivacyPolicy" runat="server"></asp:Literal>
                  </div>
                </div>
                <div class="modal-footer" style="display:none;">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                </div>
                
            </div>
        </div>
        </div> 
<span id="InvalidZipCode" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_EnterValidZip") %></span>   
</footer><!-- END footer --> 

