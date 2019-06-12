

<%@ Page Title="Registration" Language="C#"  AutoEventWireup="true"  MasterPageFile="~/Efficiency.master" CodeBehind="Registration.aspx.cs" Inherits="CustomerPortal.Registration"  %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc" %>

<%--<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


</asp:Content>--%>
  

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="css/style_frd.css" rel="stylesheet" />
    <title globalize="ML_CustomerRegistration_Lbl_Registration">Registration</title>
    <style type="text/css">
        a:visited , a:active{
        text-decoration:none;
        }

        .w2ui-tag .w2ui-tag-body {
            background-color: rgba(60,60,60,.82);
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            padding: 4px 10px;
            margin-left: 0px !important;
            margin-top: 0;
            color: #fff !important;
            box-shadow: 1px 1px 3px #000;
            line-height: 100%;
            left: -106px;
            bottom: 9px;
            font-size: 11px;
            font-family: Verdana,Arial,sans-serif;
        }
        .w2ui-tag.w2ui-tag .w2ui-tag-body:before {
            border-left: 5px solid transparent;
            border-top: 5px solid rgba(60,60,60,.82);
            border-right: 5px solid transparent;
            margin: 16px 0 0 -7px;
        }

        .ajax__calendar .ajax__calendar_container {
                margin-left: 0px !important;
                 margin-top: 0px !important;
        }
        .registration-form div {
            position: static;
        }

        .reg_button {
            margin-bottom: 28px;
        }

        .divider_register_box {
            background: url("../images/divider_img_register.gif") repeat-y 48% top;
            display: table;
            width: 100%;
        }

      .applicant_content table.add_member_table_earned tr:nth-child(even){
                background:#fff;   
            }
      .income_dtl_box {
            padding:10px 10px 5px 10px; border:0px solid #ccc; border-top:0px; display:table; width:100%; margin-bottom:10px;

        }
        .income_dtl_box p {
            float:left; padding-right:10px;
        }

        @media (max-width:767px) {
            .divider_register_box {
                background: none;
            }
        }

        .add_digits {
            font-size: 12px;
        }

        @-moz-document url-prefix() {
            #recaptcha_widget #recaptcha_image {
                width: 80% !important;
            }
        }

        #errorMsg {
            float: right;
            position: absolute;
            top: 8px;
            right: 0px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display: none;
        }

        #legend {
            float: left;
            position: relative;
            top: -47px;
            right: -209px;
            background: rgba(60,60,60,.82);
            color: white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            margin: 0px -169px 0px 0px;
        }

        .applicant_content table {
            margin-left: 0%;
            width: 100%;
        }

            .applicant_content table tr td {
                width: 25%;
                font-weight:normal;
            }

                .applicant_content table tr td select {
                    width: 92% !important;
                    border-radius:3px !important;
                }

        .withouttable {
            margin-left: 0% !important;
            width: 92% !important;
            border-radius:3px !important;
        }

        .applicant_content input[type="text"] {
            padding: 5px 0px 5px 10px !important;
            width: 90% !important;
            border-radius: 0;
            border: 1px solid #ccc;
            margin: 0px;
            border-radius:3px !important;
        }

    .applicant_content table.input_tbl_align tr:nth-child(odd) {
          background: none;
    }
        .registration_btn {
                  background: #88be1c !important;
            }
         /* ---------------------------  Registration Page Css ---------------------------*/


/* Login page Style */

.registration-page {
	background: #ffffff; /* Old browsers */	
	position:relative;
	display:table;
	font-size:14px;
    width:100%;
	}

.loginpage-form  {
	padding: 0 10% 0 23px;
	}
	
.registration-form h1  {
	color:#87c301;
	font-size:170.8%;
	font-weight:normal;
	padding:0 0 10px 0;
	margin-top:0px;
	}
	
.loginpage-form h3 {
	font-size:141.7%;
	color:#5e5e5e;
	padding: 5px 0 7px 0;
	margin:0px;
	}
	
.registration-form input[type="text"], .registration-form input[type="password"]{
	width: 87%;
	padding: 5px 5px;
	margin-bottom: 16px;
	border: 1px solid#ccc;
	color:#999;
	}
/*BUG 6196 - Start*/
.registration-form select {
	width: 86.9%;
	padding: 5px 5px;
	margin-bottom: 16px;
	border: 1px solid#ccc;
	color:#999;
	}
/*BUG 6196 - end*/
.registration-form .user_id input[type="text"]{
	width: 33%;
	}
	
.registration_btn{
	float:right;
	width:120px!important;
	padding:6px 0!important;
	background:#88be1c !important;
	color:#fff!important;
	border-radius:2px;
	text-align:center;
	font-size:16px!important;
    font-weight:bold;
    margin-right: 48px;
	border:0px !important;	
    text-transform:capitalize !important;
    line-height:normal;
     border-radius:0px !important;
	}

.registration_btn:hover {
     background:#7c7c7c !important;
     color:#fff ;
     text-decoration:none;
}



a.registration_btn:hover {
	color:#fff;
    text-decoration:none;
    background:#7c7c7c;
}

.reg_button {
    border-top: 2px solid #ccc;
    float: left;
    padding:13px 0 2px;
    width: 100%;
}
	
.cancel_btn_1 {
	}
.ajax__calendar_container TABLE {
      padding: 0px;
  margin: 0px !important;
  font-size: 11px;
  border: 0px !important;
  width: 97% !important;
}
.ajax__calendar_container TABLE tr {
    background:none !important;

}
.ajax__calendar_container td {
      font-size: 9px;
    width: auto !important;
  padding: 0px !important;
  border: 0px !important;
  margin: 0px !important;
}

@media (max-width:991px) {
.registration-form .user_id input[type="text"]{
	width: 87%;
	}
}

.form-group ul
{
    margin: 0px 0px 0px 15px;
    padding: 0px;
}

.form-group ul li
{
    margin: 0px;
    list-style-type:none;
    padding: 0px;
}

    .form-group ul li a
    {
        text-decoration: none;
        font-size: 14px;
        display: block;
    }

#lblMsg {
    background: none repeat scroll 0 0 #fff;
    border-left: 3px solid #f00;
    box-shadow: 1px 0 4px #ccc;
    color: Red;
    font-size: 14px;
    left: 47%;
    padding: 12px 15px;
    position: absolute;
    top: 0;
    width: 40%;
    z-index: 9999;
    display:none;
}

.ul_listing ul {
    margin:0px;
    padding:0px;
    list-style-type:none;
}

.ul_listing ul li {
    margin:0px;
    padding:0px;
    background:url("../images/login-support-icon.png") no-repeat left 7px;
}

.ul_listing ul li a {
    margin:0px;
    padding:3px 21px;
    display:block;
}


/*-- Iphone Device Css */
    @media (max-width:767px) {
        .connect_with_us ul li{
            padding: 23px 8px 17px;
        }


        .connect_with_us {
            height: 31px;
            display:none;
        }
        .connect_with_us p {
            padding: 13px 0 0;
        }

        .connect_with_us ul li {
            padding: 8px 8px 2px;
        }
        .login-page {
            padding-top: 11px;
            padding-bottom: 14px;
            margin-top: 16px;
        }

        .logo img {
            padding: 7px 0 7px 4px;
            display:none;
        }
        .logo a {
            background:url("../images/logo-scm_mobile.png") no-repeat center 50%;
            height:70px;
             background-size: 59% !important;
        }

        .loginpage-form {
            padding: 0px 0px 0 0px;
        }

        .loginpage-form h1 {
            padding: 0 0 0px 0;
        }

        .btn-default-login {
            margin: 0px 0 3px 0;
        }
    }

    @media (max-width:474px) {
        .logo a {
            background-size: 95% !important;
        }

         .registration_btn {
                width:80px;
                margin-right: 18px;
            }

         .forgot-password {
    color: #6f6f6f;
    display: block;
    margin-top: 10px;
    text-align: left;
    width: 340px;
}
.forgot-password {
    float: left;
}


    }

    .applicant_info {
        margin:0px auto;
        padding:0px;
        width:100%;
    }

     .applicant_info h2 {
         margin:0px;
         padding:10px 15px;
         color:#000;
         background:#ececec;
         font-size:14px;
         display:block;
         font-weight:normal;
         border: 0px solid #ccc;
     }

     .applicant_info .applicant_content {
         margin:0px;
         padding:0px 0px;
         float:left;
         width:100%;
         font-size:13px;
         color:#56565a;
         }
#LoginboxContainer.row {
        margin-left: 0px;
          margin-right: 0px;
}

    .applicant_content ul {
        margin:0px;
        padding:0px;
        list-style:none;
    }

     .applicant_content ul li {
        margin:0px;
        padding:0px 0px 0px 0px;
        width:100%;
        display:block;
    }

    .sub_heading_regis {
          margin: 0px;
          padding: 4px 0px;
          font-weight: bold;       
    }
     .applicant_content ul li span {
         
         padding:0px;
         font-weight:bold;
         margin:0px 12px 0px 0px;
     }

        .applicant_content table {
            width: 100%;
            margin-bottom: 0px;
            border-bottom: 0px solid #ccc;
            /*background:url("../images/divider_register_page.gif") repeat-y center top;*/
            z-index: 999;
            border-right: 0px solid #ccc;
            border-left: 0px solid #ccc;
            border-color: #ccc;
        }
     .applicant_content table td {
         padding:4px 15px;
         border:0px solid;
         position:relative;
     }
     table.add_member_table > tbody > tr > th > table > tbody > tr > td
     {
         padding:0;
     }
    .applicant_content table td:nth-child(2n+1) {
        border-left:0px solid #ccc;
        }
    input[type="text"], input[type="password"], textarea {
    border-radius: 3px;
}
     .applicant_content table tr:nth-child(odd) {
            background:#fff;         
        }   
     .applicant_content table tr:nth-child(even) {
         background:#fff;         
     }

        .applicant_content  table.add_member_table table tr:nth-child(even) {
         background:#fff;
         }
        .applicant_content  table.add_member_table table {
            border-left:0px;
            border-right:0px;
        }
        .applicant_content table.add_member_table table tr table {
             border-left: 0px solid #ccc;
             border-right: 0px solid #ccc;
               margin-bottom: 0px;
            }

        .applicant_content table.add_member_table td:nth-child(2n+1){
            border-left: 0px solid #ccc;
             border-right: 0px solid #ccc;
            }

         .applicant_content table.add_member_table table td:nth-child(2n+1){
            border-left: 0px solid #ccc;
            }
         .applicant_content table.add_member_table table tr table.input_tbl_align, .applicant_content table.add_member_table table tr table.input_tbl_align td
                {
            border-left: 0px solid #ccc;
              border-right: 0px solid #ccc;
            }

         .applicant_content table.add_member_table table tr table.input_tbl_align tr {
             background:none !important;
         }

        .applicant_content  table.add_member_table table tr table tr:nth-child(even) {
         background:#fff;   
         }

     

    .add_row_1 {
        padding:5px 15px;
        display:block;
        background:#fff;
    }


        .applicant_content table.input_tbl_align {
            border: 0px;
            width: 70%;
            margin: 0px;
            background: none;
        }

.applicant_content table.input_tbl_align td {
    border:0px;
    padding-left:0px;
    padding:0;
}

    .applicant_content table.input_tbl_align td input {
        margin-right:8px;
    }   


     .applicant_content  input[type="text"] {
        padding: 5px 0px 4px 10px !important;
        width: 92% !important;
        border-radius:0;
        border:1px solid #ccc;
        margin:0px;
    }

     .applicant_content  select {
        padding: 5px 0px 4px 10px !important;
        width: 28% !important;
        border-radius:0;
        border:1px solid #ccc;
        margin:0px 2% 0px 0px;
    }

        .sbt_button_regi {
            width: 100%;
            padding: 10px 15px;
            float: left;
        }
        .sbt_button_regi > a, .sbt_button_regi > input
        {
            margin:0 !important;
        }
     .canc_btn_reg {
         float:left;
     }

     
     .container.low_inc_container {
             height: 88%;
           overflow: auto;
               border-bottom: 1px solid #ccc;
     }

     span.required {
        margin-right: 0px !important;

     }
.energy_mid_box .right_content_box {
    height: 97%;
}
.MessageContainer table td, th {
    border: medium none;
    padding-right: 0;
    vertical-align: top;
}
        @media only screen and (min-width : 1400px) and (max-width : 3000px) {
            .right_content_box > .container.low_inc_container {
                border-bottom: 1px solid #ccc !important;
                height: 93% !important;
            }

            .applicant_content > ul > li {
                border-bottom: 0 solid #fff;
                display: block;
                margin: 0;
                padding: 5px 0 10px;
                width: 100%;
            }

            .applicant_info h2 {
                border: 0 solid #ccc;
                margin: 0 0 10px;
            }
        }
    </style>

    <script type="text/javascript">
        var step = 1;
        $(document).ready(function () {
            $(".low_income_icon").addClass("active");
            $('#ddlHomeCity').attr("readonly", "readonly");
            $('#ddlHomeState').attr("readonly", "readonly");
            $('#ddlHomeCountry').attr("readonly", "readonly");
            if ($('#rdoEarn :checked').val() == 'True') {
                $("#gvUnearned").show();
            } else {
                $("#gvUnearned").hide();
                $('#txtNameOfPerson').val('');
                $('#txtEmployer').val('');
                $('#txtTypeOfWork').val('');
                $('#drpOftenPaid option:selected').val('1');
                $('#txtDateOfHire').val('');
                $('#txtGrossPerCheck').val('');
            }
            if ($('#rdoUneranedIncome :checked').val() == 'True') {
                $("#tblUnearned").show();
            } else {
                $("#tblUnearned").hide();
            }
            $('#txtLandlordsMobileNo').mask('(000) 000-0000');
            $('#txtPhoneNumber').mask('(000) 000-0000');
            $('#txtAlternateNumber').mask('(000) 000-0000');
            if ($('#ddlOwner').val() == "1") {
                //$('#txtLandlordsName').val('');
                //$('#txtLandlordAddress').val('');
                //$('#txtLandlordsMobileNo').val('');
                RemoveMandatoryAttributeFromElement($('#txtLandlordsName'));
                RemoveMandatoryAttributeFromElement($('#txtLandlordsMobileNo'));
                RemoveMandatoryAttributeFromElement($('#txtLandlordAddress'));
                $('#txtLandlordsName').attr("readonly", "readonly");
                $('#txtLandlordAddress').attr("readonly", "readonly");
                $('#txtLandlordsMobileNo').attr("readonly", "readonly");
            }
            else
            {
                //$('#txtLandlordsName').val('');
                //$('#txtLandlordAddress').val('');
                //$('#txtLandlordsMobileNo').val('');
                AddMandatoryAttributeToElement($('#txtLandlordsName'));
                AddMandatoryAttributeToElement($('#txtLandlordsMobileNo'));
                AddMandatoryAttributeToElement($('#txtLandlordAddress'));
                $('#txtLandlordsName').removeAttr("readonly");
                $('#txtLandlordAddress').removeAttr("readonly");
                $('#txtLandlordsMobileNo').removeAttr("readonly");
            }

            $('#LandlordsNameman').css("display", "none");
            $('#LandlordAddressman').css("display", "none");
            $('#LandlordsMobileNoman').css("display", "none");
            $("#rdoEarn").click(function () {
                if ($('#rdoEarn :checked').val()== 'True') {
                    $("#gvUnearned").show();
                } else {                    
                    $("#gvUnearned").hide();
                    $('#txtNameOfPerson').val('');
                    $('#txtEmployer').val('');
                    $('#txtTypeOfWork').val('');
                    $('#drpOftenPaid option:selected').val('1');
                    $('#txtDateOfHire').val('');
                    $('#txtGrossPerCheck').val('');
                }
            });

            $("#rdoUneranedIncome").click(function () {
                if ($('#rdoUneranedIncome :checked').val() == 'True') {
                    $("#tblUnearned").show();
                } else {
                    $("#tblUnearned").hide();
                }
            });

            $("#chkAutofill").click(function () {
                if (this.checked) {

                    $('#txtMailingAddress1').val($('#HomeAddressLine1').val());
                    $('#txtMailingAddress2').val($('#HomeAddressLine2').val());
                    $('#txtMailingZipCode').val($('#txtZip').val());
                    $('#ddlMailingCity').val($('#ddlHomeCity').val());
                    $('#ddlMailingCountry').val($('#ddlHomeCountry').val());
                    $('#ddlMailingState').val($('#ddlHomeState').val());
                    $('#txtMailingAddress1').attr('readonly', 'readonly');
                    $('#txtMailingAddress2').attr('readonly', 'readonly');
                    $('#txtMailingZipCode').attr('readonly', 'readonly');
                    $('#ddlMailingCity').attr('readonly', 'readonly');
                    $('#ddlMailingCountry').attr('readonly', 'readonly');
                    $('#ddlMailingState').attr('readonly', 'readonly');
                }
                else
                {
                    $('#txtMailingAddress1').val('');
                    $('#txtMailingAddress2').val('');
                    $('#txtMailingZipCode').val('');
                    $('#ddlMailingCity').val(0);
                    $('#ddlMailingCountry').val(0);
                    $('#ddlMailingState').val(0);
                    $('#txtMailingAddress1').removeAttr('readonly');
                    $('#txtMailingAddress2').removeAttr('readonly');
                    $('#txtMailingZipCode').removeAttr('readonly');
                    $('#ddlMailingCity').removeAttr('readonly');
                    $('#ddlMailingCountry').removeAttr('readonly');
                    $('#ddlMailingState').removeAttr('readonly');
                }
            });

            $('#ddlOwner').change(function () {
                if (this.value == "1") {
                    $('#txtLandlordsName').val('');
                    $('#txtLandlordAddress').val('');
                    $('#txtLandlordsMobileNo').val('');
                    RemoveMandatoryAttributeFromElement($('#txtLandlordsName'));
                    RemoveMandatoryAttributeFromElement($('#txtLandlordsMobileNo'));
                    RemoveMandatoryAttributeFromElement($('#txtLandlordAddress'));
                    $('#txtLandlordsName').attr("readonly", "readonly");
                    $('#txtLandlordAddress').attr("readonly", "readonly");
                    $('#txtLandlordsMobileNo').attr("readonly", "readonly");
                   
                }
                else
                {
                    $('#txtLandlordsName').val('');
                    $('#txtLandlordAddress').val('');
                    $('#txtLandlordsMobileNo').val('');
                    AddMandatoryAttributeToElement($('#txtLandlordsName'));
                    AddMandatoryAttributeToElement($('#txtLandlordsMobileNo'));
                    AddMandatoryAttributeToElement($('#txtLandlordAddress'));
                    $('#txtLandlordsName').removeAttr("readonly");
                    $('#txtLandlordAddress').removeAttr("readonly");
                    $('#txtLandlordsMobileNo').removeAttr("readonly");
                    //$('#LandlordsNameman').css("display", "block");
                    //$('#LandlordAddressman').css("display", "block");
                    //$('#LandlordsMobileNoman').css("display", "block");
                }
            });
          
        });
        function AddMandatoryAttributeToElement(elemet) {
            var attr = $(elemet).attr('mandatory');
            // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
            if (typeof attr == typeof undefined || attr == false) {
                var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
                $(elemet).attr('mandatory', '1');
                $(elemet).after(mandatoryHtml);
            }
        }
        function RemoveMandatoryAttributeFromElement(elemet) {
            $(elemet).removeAttr('mandatory');
            $(elemet).next('span').remove();
        }
        function checkRange() {
            if (parseInt($('#txtGrossPerCheck').val()) > 99999) {
                alert('Value greater than 99999 not allowed.');
                $('#txtGrossPerCheck').val('');
                return false;
            }
            return true;
        }
    </script>   
      <input type="hidden" class="activeli_list" value="efficency" />
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
   
   <asp:HiddenField ID="hdnApplicantId" runat="server" Value="" />
    <div class="right_content_box">
        <section class="container low_inc_container">
            <div class="row" id="LoginboxContainer">
                <div class="col-lg-12" style="padding:0;">
                    <div class="registration-page" id="tblNewUser">

                        <div class="applicant_info">
                           <%-- <span id="legend">All fields are mandatory.</span>
                            <span id="errorMsg"></span>--%>
                            <asp:MultiView ID="MultiView1" runat="server">
                                <asp:View runat="server" ID="View1">
                                    <div class="applicant_content" id="div1">
                                        <h2><b><%= CustomerPortal.Translator.T("ML_LWINCReg_lblAppHousHold") %></b>    </h2>
                                        <ul>
                                            <li>
                                                <asp:GridView ID="gvApplicant" runat="server" AutoGenerateColumns="false" OnRowEditing="gvApplicant_RowEditing" OnRowDeleting="gvApplicant_RowDeleting" ShowFooter="true" OnRowDataBound="gvApplicant_RowDataBound" CssClass="add_member_table" border="0" style="border-bottom:0px solid #fff; border-left:0px solid #fff;">
                                                    <Columns>
                                                        <asp:TemplateField>
                                                            <HeaderTemplate>
                                                                <table>
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <table>

                                                                    <tr>
                                                                        <td><%= CustomerPortal.Translator.T("ML_MakeOTP_txt_FirstName") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtfisrstname" ClientIDMode="Static" globalize="ML_MakeOTP_txt_FirstName"  runat="server" title="First Name" MaxLength="30" TabIndex="1" mandatory="1" onkeypress="return IsAlpha(event);" Text='<%# Eval("firstname") %>'></asp:TextBox></td>
                                                                        <td><%= CustomerPortal.Translator.T("ML_Register_Lbl_MiddleName") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtmiddlename"  runat="server"  TextMode="SingleLine" MaxLength="30" TabIndex="2" globalize="ML_SrvcRqust_txtbx_MiddleName"  title="Middle Name" Text='<%# Eval("middlename") %>' onkeypress="return IsAlpha(event);"></asp:TextBox></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><%= CustomerPortal.Translator.T("ML_CustomerRegistration_Txt_LastName") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtlastname" runat="server" TextMode="SingleLine" MaxLength="30" globalize="ML_CustomerRegistration_Txt_LastName" title="Last Name" Text='<%# Eval("lastname") %>' mandatory="1" TabIndex="3" onkeypress="return IsAlpha(event);"></asp:TextBox></td>
                                                                        <td><%= CustomerPortal.Translator.T("ML_LWINCReg_lblRelationship") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtrelationship" runat="server" MaxLength="20" mandatory="1" globalize="ML_LWINCReg_lblRelationship" TabIndex="4" Text='<%# Eval("RelationshipToYou") %>' TextMode="SingleLine"  title="Relationship" onkeypress="return IsAlpha(event);"></asp:TextBox></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><%= CustomerPortal.Translator.T("ML_LWINCReg_lblSex") %></td>
                                                                        <td>
                                                                            <asp:RadioButtonList runat="server" ID="rdGeneder" class="input_tbl_align" RepeatDirection="Horizontal" TabIndex="5">
                                                                                <asp:ListItem Text="Male" Value="1" Selected="True"></asp:ListItem>
                                                                                <asp:ListItem Text="Female" Value="2"></asp:ListItem>
                                                                            </asp:RadioButtonList>
                                                                        </td>

                                                                        <td><%= CustomerPortal.Translator.T("ML_LWINCReg_lblDob") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtDob" runat="server" MaxLength="50" mandatory="1" Style="width: 77% !important; float: left;" globalize="ML_LWINCReg_lblDob"  Text='<%# Eval("DateOfBirth") %>' title="Date of Birth" CssClass="futuredate"></asp:TextBox>
                                                                            <asp:ImageButton runat="server" ID="imgbtnCalender" ImageUrl="~/images/Icon-Calendar.png" Style="vertical-align: middle; border: 0px; margin: 1px 0 0 5px; float:left;" TabIndex="6"></asp:ImageButton>
                                                                            <cc:CalendarExtender ID="Cal_Date" runat="server" TargetControlID="txtDob" Format="MM/dd/yyyy"
                                                                                Enabled="True" PopupButtonID="imgbtnCalender"></cc:CalendarExtender>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><%= CustomerPortal.Translator.T("ML_LWINCReg_lblUsCitizen") %></td>
                                                                        <td>
                                                                            <asp:RadioButtonList runat="server" ID="rd_Eligible" class="input_tbl_align" RepeatDirection="Horizontal" TabIndex="7">
                                                                                <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                                                <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                                                            </asp:RadioButtonList></td>

                                                                        <td><%= CustomerPortal.Translator.T("ML_LWINCReg_lblHandicap") %>
                                                                        </td>
                                                                        <td>
                                                                            <asp:RadioButtonList runat="server" ID="rd_Disable" class="input_tbl_align" RepeatDirection="Horizontal" TabIndex="8">
                                                                                <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                                                <asp:ListItem Text="No" Value="False" Selected="True"></asp:ListItem>
                                                                            </asp:RadioButtonList></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><%= CustomerPortal.Translator.T("ML_lowincome_Social_Security_number") %></td>
                                                                        <td>
                                                                            <asp:TextBox ID="txtSecuritNumber" TextMode="Password"  runat="server" title="SSN" globalize="ML_lowincome_Social_Security_number" Text='<%# Eval("SocialSecurityNumber") %>' MaxLength="9" mandatory="1" onkeypress="javascript:return(IsNumeric(event))" TabIndex="9" AutoCompleteType="None"></asp:TextBox></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                </table>
                                                                 <asp:LinkButton ID="DeleteRow" Text="Delete Member" runat="server" CommandName="Delete" style="text-align:right;  padding-right: 4px;  float: right;" OnClientClick="javascript:if(confirm('Are you sure want to delete ?')){return true;}else{return false;}"></asp:LinkButton>
                                                            </ItemTemplate>
                                                            <FooterTemplate>
                                                                <asp:UpdatePanel ID="up1" runat="server">
                                                                    <ContentTemplate>
                                                                        <asp:LinkButton ID="AddRow" Text="Add Family Member" runat="server" CommandName="Edit" class="add_row_1"></asp:LinkButton>
                                                                    </ContentTemplate>
                                                                </asp:UpdatePanel>
                                                                </table>
                                                            </FooterTemplate>
                                                        </asp:TemplateField>
                                                    </Columns>
                                                </asp:GridView>
                                            </li>
                                            <li>
                                                <h2><b><%= CustomerPortal.Translator.T("ML_lowincome_homeaddress") %></b></h2>
                                                <table>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine1") %></td>
                                                        <td>
                                                            <asp:TextBox runat="server" TextMode="SingleLine" globalize="ML_MyAccount_Msg_AddLine1" CssClass="withouttable txtarea" ID="HomeAddressLine1"  class="box" title="Address 1" value=""    Maxlength="50" TabIndex="10" mandatory="1" ClientIDMode="Static" ></asp:TextBox></td>
                                                        <td><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine2") %></td>
                                                        <td>
                                                            <asp:TextBox runat="server" TextMode="SingleLine" globalize="ML_MyAccount_Msg_AddLine2"  CssClass="withouttable" ID="HomeAddressLine2"  class="box" title="Address 2" value="" MaxLength="50" TabIndex="11" ClientIDMode="Static"></asp:TextBox></td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Zip") %></td>
                                                        <td>
                                                            <asp:TextBox onkeypress="javascript:return(IsNumeric(event))" ClientIDMode="Static" runat="server" title="Zip Code" ReadOnly="true" value="" MaxLength="5" CssClass="withouttable" class="box" ID="txtZip"  TabIndex="12"></asp:TextBox></td>
                                                        <td><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %></td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlHomeCity" ClientIDMode="Static" runat="server" TabIndex="13"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlHomeState" runat="server"  ClientIDMode="Static" TabIndex="14"></asp:DropDownList>
                                                        </td>
                                                        <td><%= CustomerPortal.Translator.T("ML_lowincome_country") %></td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlHomeCountry" runat="server" ClientIDMode="Static" TabIndex="15"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_lowincome_mailinghomeaddress") %></td>
                                                        <td>&nbsp;<asp:CheckBox ID="chkAutofill" runat="server" ClientIDMode="Static"  TabIndex="16" />
                                                        </td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                    </tr>

                                                </table>
                                            </li>
                                            <li>
                                                <h2><b><%= CustomerPortal.Translator.T("ML_SrvcRqust_div_MailAdd") %></b></h2>
                                                <table>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine1") %></td>
                                                        <td>
                                                            <asp:TextBox runat="server" TextMode="SingleLine"  CssClass="withouttable" ID="txtMailingAddress1"  class="box" title="Address 1" value="" MaxLength="50" TabIndex="17" ClientIDMode="Static"></asp:TextBox>
                                                        </td>
                                                        <td><%= CustomerPortal.Translator.T("ML_MyAccount_Msg_AddLine2") %></td>
                                                        <td>
                                                            <asp:TextBox runat="server" TextMode="SingleLine" CssClass="withouttable" ID="txtMailingAddress2"  class="box" title="Address 2" value="" MaxLength="50" TabIndex="18" ClientIDMode="Static"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Zip") %></td>
                                                        <td>
                                                            <asp:TextBox runat="server" MaxLength="5" class="box" CssClass="withouttable" globalize="ML_SrvcRqust_txtbx_ZipCode1" ClientIDMode="Static" ID="txtMailingZipCode" title="Zip Code" value="" onkeypress="javascript:return(IsNumeric(event))" TabIndex="19"></asp:TextBox>
                                                        </td>
                                                        <td><%= CustomerPortal.Translator.T("ML_Register_Lbl_City") %> </td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlMailingCity" runat="server" ClientIDMode="Static" TabIndex="20"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_SrvcRqust_p_State") %></td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlMailingState" ClientIDMode="Static" runat="server" TabIndex="21"></asp:DropDownList>
                                                        </td>
                                                        <td><%= CustomerPortal.Translator.T("ML_lowincome_country") %></td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlMailingCountry" ClientIDMode="Static" runat="server" TabIndex="22"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_Contact") %></td>
                                                        <td>
                                                            <asp:TextBox ID="txtPhoneNumber" runat="server" TabIndex="23"  title="Mobile number" globalize="ML_SrvcRqust_txtbx_Contact" value="" ClientIDMode="Static" MaxLength="14"></asp:TextBox>
                                                        </td>
                                                        <td><%= CustomerPortal.Translator.T("ML_CustomerRistration_AlternateNum") %></td>
                                                        <td>
                                                            <asp:TextBox ID="txtAlternateNumber" runat="server" title="Alternate Number"  globalize="ML_CustomerRistration_AlternateNum" TabIndex="24" class="box" ClientIDMode="Static"  MaxLength="14" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><%= CustomerPortal.Translator.T("ML_SrvcRqust_txtbx_emailAdd") %></td>
                                                        <td>
                                                            <asp:TextBox ID="txtEmailID" runat="server"  class="box" title="Email ID" globalize="ML_SrvcRqust_txtbx_emailAdd" value="" MaxLength="50" TabIndex="25"></asp:TextBox>
                                                            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmailID" ErrorMessage="Invalid Email" ForeColor="Red" SetFocusOnError="True" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </table>

                                            </li>
                                        </ul>
                                    </div>
                                </asp:View>
                                <div class="clearfix"></div>
                                <asp:View runat="server" ID="View2">
                                    <div class="applicant_content" id="div2">
                                        <h2><b><%= CustomerPortal.Translator.T("ML_lowincomeReg_Dwellinfo") %></b></h2>
                                        <table>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_dwellingtype") %></td>
                                                <td>
                                                    <asp:DropDownList ID="ddlDwelling" globalize="ML_lowincome_dwellingtype" runat="server" mandatory="1" TabIndex="26" ClientIDMode="Static" title="Dwelling Type"></asp:DropDownList>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_ownership") %></td>
                                                <td>
                                                    <asp:DropDownList ID="ddlOwner" runat="server" globalize="ML_lowincome_ownership" mandatory="1" TabIndex="27" title="Owner Type" ClientIDMode="Static"></asp:DropDownList>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_landlordsname") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtLandlordsName" runat="server" onkeypress="return IsAlpha(event);" TabIndex="28" globalize="ML_lowincome_landlordsname" ClientIDMode="Static"  title="Landlord's Name" Text="" MaxLength="60"></asp:TextBox>
                                                    <span class="required" id="LandlordsNameman" style="color:#950202; padding-left:3px; font-size: 19px; display:none;">*</span>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_landlordsmobile") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtLandlordsMobileNo" runat="server" title="Mobile number" globalize="ML_lowincome_landlordsmobile"  value="" MaxLength="14" ClientIDMode="Static" TabIndex="29"></asp:TextBox>
                                                        <span class="required" id="LandlordsMobileNoman" style="color:#950202; padding-left:3px; font-size: 19px; display:none;">*</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_landlordsaddress") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtLandlordAddress" CssClass="withouttable" runat="server" class="box" globalize="ML_lowincome_landlordsaddress"  title="Landlord's Address" value="" MaxLength="100" TabIndex="30" ClientIDMode="Static" ></asp:TextBox>
                                                    <span class="required" id="LandlordAddressman" style="color:#950202; padding-left:3px; font-size: 19px; display:none;">*</span>


                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_includedintherent") %></td>
                                                <td>
                                                   <%-- <asp:DropDownList ID="ddlIsIncludeElec" runat="server" mandatory="1" TabIndex="31" title="Subsidize Option">
                                                        <asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="0"></asp:ListItem>
                                                    </asp:DropDownList>--%>
                                                    <asp:RadioButtonList ID="rdoIsIncludeElec" runat="server" mandatory="1" TabIndex="31" title="Subsidize Option" RepeatDirection="Horizontal" class="input_tbl_align">
                                                        <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                                    </asp:RadioButtonList>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_incomerentalassistance") %></td>
                                                <td>
                                                    <%--<asp:DropDownList ID="ddlIsLowincomeAssist" runat="server" mandatory="1" TabIndex="32"  title="Low Income Assistant">
                                                        <asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="0"></asp:ListItem>
                                                    </asp:DropDownList>--%>

                                                    <asp:RadioButtonList ID="rdoIsLowincomeAssist" runat="server" mandatory="1" TabIndex="32"  title="Low Income Assistant" RepeatDirection="Horizontal" class="input_tbl_align">
                                                         <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                                    </asp:RadioButtonList>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_healthcarefacility") %></td>
                                                <td>
                                                  <%--  <asp:DropDownList ID="ddlIsResidentHCare" runat="server" mandatory="1" TabIndex="33"  title="is Resident Care">
                                                        <asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="0"></asp:ListItem>
                                                    </asp:DropDownList>--%>

                                                    <asp:RadioButtonList ID="rdoIsResidentHCare" runat="server" mandatory="1" TabIndex="33"  title="is Resident Care" RepeatDirection="Horizontal" class="input_tbl_align">
                                                        <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                        <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                                    </asp:RadioButtonList>
                                                </td>
                                            </tr>
                                        </table>

                                      
                                    </div>
                                </asp:View>
                                <div class="clearfix"></div>
                                <asp:View runat="server" ID="View3">
                                    <div class="applicant_content" id="div3">
                                        <h2><b><%= CustomerPortal.Translator.T("ML_lowincomeReg_incomeinfo") %></b></h2>
                                      
                                      <div class="income_dtl_box"> <p > <%= CustomerPortal.Translator.T("ML_lowincomeReg_lblAgeWork") %></p>
                                         <%--  <asp:DropDownList ID="ddlEarn" runat="server" mandatory="1" TabIndex="34"  title="Earn" AutoPostBack="true" OnSelectedIndexChanged="ddlEarn_SelectedIndexChanged">
                                                <asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem>
                                                <asp:ListItem Text="No" Value="0"></asp:ListItem>
                                            </asp:DropDownList>--%>
                                          <asp:RadioButtonList ID="rdoEarn" runat="server" mandatory="1" TabIndex="34"  title="Earn" ClientIDMode="Static" RepeatDirection="Horizontal" class="input_tbl_align" style="float:left; width:200px;" >
                                                <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                          </asp:RadioButtonList>

                                          </div>
                                        <asp:GridView ID="gvUnearned" ClientIDMode="Static" runat="server" AutoGenerateColumns="false" OnRowEditing="gvUnearned_RowEditing" OnRowDeleting="gvUnearned_RowDeleting" ShowFooter="true" class="add_member_table_earned" OnRowDataBound="gvUnearned_RowDataBound" >
                                           
                                            <Columns>
                                                
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <h2><b><%= CustomerPortal.Translator.T("ML_lowincome_earnedincome") %></b></h2>
                                                        <table>                                                            
                                                            <tr>
                                                                <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_lblPersonName") %></td>
                                                                <td>
                                                                    <asp:TextBox ID="txtNameOfPerson" runat="server" title="Name" Text='<%# Eval("nameofperson") %>' MaxLength="60" TabIndex="35" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                                </td>
                                                                 <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_OftenPaid") %></td>
                                                                <td>
                                                                    <%--<asp:TextBox ID="txtOftenPaid" placeholder="Often Paid period" runat="server" title="Often Paid period" Text='<%# Eval("howoftenpaid") %>' MaxLength="100" TabIndex="40" onkeypress="return IsAlpha(event);"></asp:TextBox>--%>
                                                                    <asp:DropDownList ID="drpOftenPaid" runat="server">
                                                                        <asp:ListItem Text="Weekly" Value="1"></asp:ListItem>
                                                                        <asp:ListItem Text="Monthly" Value="2"></asp:ListItem>
                                                                        <asp:ListItem Text="Biweekly" Value="3"></asp:ListItem>
                                                                        <asp:ListItem Text="Annually" Value="4"></asp:ListItem>
                                                                    </asp:DropDownList>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_Empolyer") %></td>
                                                                <td>
                                                                    <asp:TextBox ID="txtEmployer"  runat="server" title="Employer Name" Text='<%# Eval("employer") %>' MaxLength="60" TabIndex="36" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                                </td>

                                                                <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_Doh") %></td>
                                                                <td>
                                                                    <asp:TextBox ID="txtDateOfHire" runat="server" MaxLength="20" Style="width: 70% !important; float: left;" CssClass="futuredate"  TabIndex="37" Text='<%# Eval("dateofhire") %>'></asp:TextBox>
                                                                    <asp:ImageButton runat="server" ID="ImageButton1" ImageUrl="~/images/Icon-Calendar.png" Style="vertical-align: middle; border: 0px; margin: 1px 0 0 5px;" TabIndex="37"></asp:ImageButton>
                                                                    <cc:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateOfHire" Format="MM/dd/yyyy"
                                                                        Enabled="True" PopupButtonID="ImageButton1"></cc:CalendarExtender>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_TypeWork") %></td>
                                                                <td>
                                                                    <asp:TextBox ID="txtTypeOfWork" runat="server" title="Type of work" Text='<%# Eval("typeofwork") %>' MaxLength="50" TabIndex="38" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                                </td>

                                                                <td><%= CustomerPortal.Translator.T("ML_lowincomeReg_grosspay") %></td>
                                                                <td>
                                                                    <asp:TextBox  ID="txtGrossPerCheck" runat="server" TextMode="SingleLine" Text='<%# Eval("grosspercheck") %>' title="Gross Pay per check" value="" MaxLength="5" TabIndex="39" onkeypress="return IsNumeric(event);"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <asp:LinkButton ID="DeleteRowIncome" Text="Delete " runat="server" CommandName="Delete"  style="text-align:right;float:right; padding-right:4px;" OnClientClick="javascript:if(confirm('Are you sure want to delete ?')){return true;}else{return false;}"></asp:LinkButton>
                                                    </ItemTemplate>
                                                    <FooterTemplate>
                                                        <asp:LinkButton ID="AddRowIncome" Text="Add New" runat="server" CommandName="Edit" class="add_row_1"></asp:LinkButton>
                                                    </FooterTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                        </asp:GridView>
                                    <table class="add_member_table_earned">
                                        <tr>
                                           <th scope="col">&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <td>

                                        <h2><b><%= CustomerPortal.Translator.T("ML_lowincome_unearnedincome") %></b></h2>
                                  <div class="income_dtl_box"  ><p style="padding-left:10px;padding-top:10px;"><%= CustomerPortal.Translator.T("ML_lowincome_sourceofunearnedincome") %> </p>
                                       <%-- <asp:DropDownList ID="ddlUneranedIncome" runat="server" mandatory="1" TabIndex="42" title="Earned Income" AutoPostBack="true" OnSelectedIndexChanged="ddlUneranedIncome_SelectedIndexChanged">
                                                            <asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem>
                                                            <asp:ListItem Text="No" Value="0"></asp:ListItem>
                                                        </asp:DropDownList>--%>

                                          <asp:RadioButtonList ID="rdoUneranedIncome" runat="server" mandatory="1" TabIndex="42" title="Earned Income" ClientIDMode="Static"  RepeatDirection="Horizontal"  class="input_tbl_align" style="float:left; width:200px; margin-top:10px;" >
                                                            <asp:ListItem Text="Yes" Value="True" Selected="True"></asp:ListItem>
                                                            <asp:ListItem Text="No" Value="False"></asp:ListItem>
                                          </asp:RadioButtonList>
                                     </div>  
                                        <table runat="server" id="tblUnearned" clientidmode="Static">
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_Frequency") %></td>
                                                <td>
                                                    <asp:DropDownList ID="ddlFrequency" runat="server" TabIndex="46">
                                                    </asp:DropDownList>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_IncomeType") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtIncomeType" runat="server" MaxLength="50"  TabIndex="43" Text="" title="Income Type"></asp:TextBox>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_PersonReceiving") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtPersonReceiving" runat="server" MaxLength="60" onkeypress="return IsAlpha(event);"  TabIndex="44" Text="" title="Person Receiving"></asp:TextBox>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_GrossAmount") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtGrossAmount" globalize="ML_lowincome_GrossAmount" onkeypress="return IsNumeric(event);" runat="server" MaxLength="5"  TabIndex="45" Text="" title="GrossAmount"></asp:TextBox>
                                                </td>
                                            </tr>
                                         
                                        </table>
                                            </td>

                                        </tr>
                                        </table>
                                    </div>
                                </asp:View>
                                <div class="clearfix"></div>
                                <asp:View runat="server" ID="View4">
                                    <div class="applicant_content" id="div4">
                                        <h2><b><%= CustomerPortal.Translator.T("ML_lowincomeReg_utilityinfo") %></b></h2>
                                        <table>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_FuelType") %></td>
                                                <td>
                                                    <asp:DropDownList ID="ddlPrimaryFuelType" globalize="ML_lowincome_FuelType" runat="server" mandatory="1" TabIndex="47"  title="Primary Fuel Type"></asp:DropDownList>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_Fuel_Supplier_Name") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtPrimaryHeat"  runat="server" globalize="ML_lowincome_Fuel_Supplier_Name" title="Primary Fuel Supplier Name" Text="" MaxLength="60" TabIndex="48" mandatory="1" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_Fuel_Heating_fuel_Account") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtAccNo"  runat="server" globalize="ML_lowincome_Fuel_Heating_fuel_Account" title="Primary Accout Number" Text="" MaxLength="12" mandatory="1" onkeypress="javascript:return(IsNumeric(event))" TabIndex="49"></asp:TextBox></td>

                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>                                                
                                            </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_second_Fuel_Type") %></td>
                                                <td>
                                                    <asp:DropDownList ID="ddlSecondryFuelType" runat="server"  title="Secondary Heat Fuel Type"></asp:DropDownList>
                                                </td>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_second_Supplier_Name") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtSecSuppNm"  runat="server" title="Secondary Fuel Supplier Name" Text="" MaxLength="60" TabIndex="50" onkeypress="return IsAlpha(event);"></asp:TextBox>
                                                </td>
                                                </tr>
                                            <tr>
                                                <td><%= CustomerPortal.Translator.T("ML_lowincome_second_Heating_fuel_Account") %></td>
                                                <td>
                                                    <asp:TextBox ID="txtSecFuelAcc" runat="server" title="Secondary Accout Number" Text="" MaxLength="12" onkeypress="javascript:return(IsNumeric(event))" TabIndex="49"></asp:TextBox></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        </table>
                                    </div>
                                </asp:View>
                                <div class="clearfix"></div>
                            </asp:MultiView>
                        </div>
                      
                        <div class="clearfix"></div>




                    </div>
                </div>
            </div>

        </section>
          <div class="sbt_button_regi">
            <asp:Button globalize="ML_UserRegistration_Btn_Next"  ClientIDMode="Static" CssClass="registration_btn" ID="AddUserSaveBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_UserRegistration_Btn_Next") %>' TabIndex="18"
                Style="display: inline-block; margin-right:30px;" CausesValidation="false" OnClick="AddUserSaveBtn_Click" />
            <asp:Button globalize="ML_UserRegistration_Btn_Previous" ClientIDMode="Static" CssClass="registration_btn" ID="prevBtn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_UserRegistration_Btn_Previous") %>'
                Style="display: inline-block; float: left; margin-right:20px !important;" CausesValidation="false" TabIndex="16" OnClick="prevBtn_Click" />
            <a href="AssisatanceSelection.aspx" globalize="ML_Register_Btn_Cancel" class="registration_btn canc_btn_reg" tabindex="17"><%= CustomerPortal.Translator.T("ML_FORGOTPASSWORD_BTN_Cancel") %></a>

        </div>
        </div>
    
    
   
  <div class="modal" id="phy">
	<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_lowincome_Physically_Challenged") %></h4>
        </div>
        <div class="modal-body">
         <%= CustomerPortal.Translator.T("ML_lowincomeReg_yesphyschall") %>
        </div>
      
      </div>
    </div>
</div>
   </asp:Content>
