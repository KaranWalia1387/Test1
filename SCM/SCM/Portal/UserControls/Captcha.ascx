<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Captcha.ascx.cs" Inherits="CustomerPortal.UserControls.Captcha" %>
<script type="text/javascript">
    var RecaptchaOptions = {
        theme: 'custom',
        custom_theme_widget: 'recaptcha_widget'
    };</script>
<style>
    #recaptcha_image img {
        width:269px;
        height:49px !important;
    }

    #recaptcha_image {
        width:270px !important;
    }
</style>

                                <div style="width:310px" >
                                <div id="recaptcha_widget" style="display:none">

   <div id="recaptcha_image" style="float:left; width:270px !important;"></div>
   <div style="height:63px">
   <div><a href="javascript:Recaptcha.reload()"><img src="images/refresh.png" alt="Refresh"/></a></div>
   <div class="recaptcha_only_if_image"><a href="javascript:Recaptcha.switch_type('audio')" ><img src="images/audio.png" alt="Audio" /></a></div>
   <div class="recaptcha_only_if_audio"><a  href="javascript:Recaptcha.switch_type('image')"><img src="images/text.png" alt="Text" /></a></div>
   <div><a href="javascript:Recaptcha.showhelp()"><img src="images/help.png" alt="Help" /></a></div>
   </div>
<div>
 <input type="text" id="recaptcha_response_field" mandatory="1" title="Captcha Text" globalize="ML_CustomerRegistration_txt_captcha"  name="recaptcha_response_field" style="width:295px" />
</div>
 </div>
<asp:CustomValidator runat="server" ID="recaptchaValidator" OnServerValidate="OnRecaptchaValidate"/>
 </div>
                             <script type="text/javascript"
    src="https://www.google.com/recaptcha/api/challenge?k=6Lc2LtQSAAAAAB53ObHmeyVsGnFBP26Kww6Skfqg">
 </script>
 
    <noscript>
   <iframe src="https://www.google.com/recaptcha/api/noscript?k=6Lc2LtQSAAAAAB53ObHmeyVsGnFBP26Kww6Skfqg"
        height="300" width="500" frameborder="0"></iframe><br />
   <textarea name="recaptcha_challenge_field" rows="3" cols="40"  onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" >
   </textarea>
   <input type="hidden" name="recaptcha_response_field"" 
        value="manual_challenge" />
 </noscript> 
                        