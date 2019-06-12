<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PasswordIndicator.ascx.cs" Inherits="CustomerPortal.UserControls.PasswordIndicator" %>
<style type="text/css">

    ul, li {
    margin:0;
    padding:0;
    list-style-type:none;
}
    #pswd_info > ul > li {
        margin: 0px 0px;
        border-bottom: 1px solid #f1f1f1;
        padding: 3px 33px;
        background-position: 10px;
    }

    #pswd_info {
    position:absolute;
    top:42px;
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
    content: "\25b2"!important;
    position:absolute;
    top:-12px!important;
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
    <h4><%=CustomerPortal.Translator.T("ML_PasswordIndctr_heading") %></h4>
    <ul>
        <li id="letter" class="invalid"><%=CustomerPortal.Translator.T("ML_PasswordIndctr_Atleast") %><strong>&nbsp<%=CustomerPortal.Translator.T("ML_PasswordIndctr_Letter") %></strong></li>
        <li id="capital" class="invalid"><%=CustomerPortal.Translator.T("ML_PasswordIndctr_Atleast") %><strong>&nbsp<%=CustomerPortal.Translator.T("ML_PasswordIndctr_CapsLetter") %></strong></li>
        <li id="number" class="invalid"><%=CustomerPortal.Translator.T("ML_PasswordIndctr_Atleast") %><strong>&nbsp<%=CustomerPortal.Translator.T("ML_PasswordIndctr_Number") %></strong></li>
        <li id="specialChar" class="invalid"><%=CustomerPortal.Translator.T("ML_PasswordIndctr_Atleast") %><strong>&nbsp<%=CustomerPortal.Translator.T("ML_PasswordIndctr_SpclChar") %></strong></li>
        <li id="length" class="invalid"><%=CustomerPortal.Translator.T("ML_PasswordIndctr_Atleast") %><strong>&nbsp<%=CustomerPortal.Translator.T("ML_PasswordIndctr_MinChar") %></strong></li>
    </ul>
</div>
