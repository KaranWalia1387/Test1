<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="VersionNumber.ascx.cs" Inherits="CustomerPortal.VersionNumber" %>
<style type="text/css">
    @media (min-width:1100px) and (max-width:1400px) {
        .iphone_contact {
            padding-left:90px !important;
        }
    }

</style>

<div style="font-size: 10px;margin: 7px 0 0;padding: 0;text-align: left;" class="iphone iphone_contact">
             <%= CustomerPortal.Translator.T("ML_Dashboard_Version") %>&nbsp; <%= CustomerPortal.common.AssemblyVersion() %>
      
     <span globalize="ML_Msg_AlphabetsOnly" id="AlphabetsOnly" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_AlphabetsOnly") %></span>
         <span globalize="ML_Msg_NumbersOnly" id=NumbersOnly" style="display: none"><%= CustomerPortal.Translator.T("ML_Msg_NumbersOnly") %></span>
      <span globalize="ML_CustomerRegistration_Msg_Captcha" id="spnValidation_Msg_Captcha" style="display: none"><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Msg_Captcha") %></span>
      <asp:HiddenField ID="hdnParamLanguageCode" runat="server" ClientIDMode="Static" />
          <asp:HiddenField ID="hdnParamZipCodeMessage" runat="server" ClientIDMode="Static" />
        <span  id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt").Replace("###",ConfigurationManager.AppSettings["FileExtension"].ToString()) %></span>

     </div>