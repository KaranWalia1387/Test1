<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Footer.ascx.cs" Inherits="AdminPanel.UserControl.Footer" %>
<%@ Register Src="~/UserControl/VersionNumber.ascx" TagPrefix="uc1" TagName="VersionNumber" %>
<style>
    footer .copy-right {
    font-size: 10px;
    margin: 5px 0 0;
    padding: 0;
    text-align: center;
}
</style>
 <script type="text/javascript" src="<%#string.Format("{0}/js/Footer.js",AdminPanel.Common.url)%>"></script>
<footer class="footer">
    <div class="container">
    	<div class="row">
             <div class="col-xs-12 col-sm-4 col-md-3">    
          <uc1:VersionNumber runat="server" id="VersionNumber" />
      </div>
        	<div class="col-xs-12 col-sm-4 col-md-6">            
                <div class="copy-right" style="font-family: MyriadPro-Regular;font-size: 12px; text-align:center;">
                    <asp:Label ID="lblCopyRight" runat="server" Text="© 2016 Smart Utility Systems | All rights reserved"></asp:Label>
                </div>
                </div>
            <div class="col-xs-12 col-sm-4 col-md-3">    
    <div class="footer-logo" style="float: right!important;cursor: pointer">
        
                	<a onclick="javascript:window.open('http://smartenergywater.com/')">
                	    <img src="<%=string.Format("{0}/images/logo-sus.png",AdminPanel.Common.url)%>" />
                	</a>
                </div>        
                </div>
         
            </div>
        </div>
      <input id="hdnCommonUrl" type="hidden" value="<%=AdminPanel.Common.url%>" />
    <span id="spnyear" runat="server" class="spanyear" style="display:none"></span>
</footer><!-- END footer -->  