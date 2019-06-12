<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CoomonJSCSSFile.ascx.cs" Inherits="CustomerPortal.CoomonJSCSSFile" %>
<script src="js/jquery-1.7.js" type="text/javascript"></script>
<script type="text/javascript">
    var k = jQuery.noConflict();
</script>
<script src="js/jquery-1.12.3.min.js" type="text/javascript"></script>
<%: System.Web.Optimization.Scripts.Render("~/Bundles/jsCommonJSCSS")%>
<%: System.Web.Optimization.Styles.Render("~/Content/cssCommonJSCSS") %>

