<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PasswordIndicator.ascx.cs" Inherits="AdminPanel.UserControl.PasswordIndicator" %>

<%--<script src="../js/PasswordIndicator.js"></script>--%>
<style type="text/css">

    ul, li {
    margin:0;
    padding:0;
    list-style-type:none;
}
    #pswd_info > ul li {
    margin:10px 20px;

}
    #pswd_info {
    position:absolute;
    top:-30px;
    left:10px;
    width:335px;
    padding:0px;
    background:#fefefe;
    font-size:.875em;
    border-radius:5px;
    box-shadow:0 1px 3px #ccc;
    border:1px solid #ddd;
    z-index:9999999;
}
    #pswd_info h4 {
    margin:0;
       background: #dedede;
    font-size: 13px;
    font-weight: bold;
    padding: 7px 0px 7px 8px;
}
#pswd_info::before {
    content: "\25B2";
    position:absolute;
    top:-12px;
    left:45%;
    font-size:14px;
    line-height:14px;
    color:#ddd;
    text-shadow:none;
    display:block;
}
#pswd_info > ul {
    margin:0px;
}
#pswd_info ul li {
     padding:3px 23px;
}
/*#pswd_info ul li:nth-child(2n+1) {
    background:#f4f4f4;
   
}*/

.invalid {
    background:url(../images/invalid.png) no-repeat 0 50%;
    padding-left:22px;
    line-height:24px;
    color:#ec3f41;
}
.valid {
    background:url(../images/valid.png) no-repeat 0 50%;
    padding-left:22px;
    line-height:24px;
    color:#3a7d34;
}

    #pswd_info {
    display:none;
}
</style>


<div id="pswd_info">
    <h4>Password must meet the following requirements:</h4>
    <ul>
        <li id="letter" class="invalid pswd_info_label">At least<strong>&nbsp  one letter</strong></li>
        <li id="capital" class="invalid pswd_info_label">At least<strong>&nbsp  one capital letter</strong></li>
        <li id="number" class="invalid pswd_info_label">At least<strong>&nbsp one number</strong></li>
        <li id="specialChar" class="invalid pswd_info_label">At least<strong>&nbsp one special characters</strong></li>
        <li id="length" class="invalid pswd_info_label">At least<strong>&nbsp 8 characters</strong></li>
    </ul>
</div>