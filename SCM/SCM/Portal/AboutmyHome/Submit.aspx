<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Submit.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Submit"  %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
    <title>:: SCM - Submit Profile</title>
    <script type="text/javascript">
        $(document).ready(function () {
            $('.active').removeClass('active');
            $('.icon_energy_audit').addClass('active');
            $('.efficency').addClass('active');
        });
    </script>
    <!-- Bootstrap -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="css/login.css" rel="stylesheet" type="text/css">
    <style>
        .SearchIcon {
            background: url("../images/SearchIcon.png") no-repeat scroll left top;
            cursor: pointer;
            height: 28px;
            display: inline-block;
            margin: 0 5px 3px 0;
            width: 27px;
            float: left;
        }

        .TableCellHeaderSearch input[type="text"], input[type="password"], textarea {
            padding: 5px 10px 5px;
            border-radius: 0;
            width: 80%;
            border: 1px solid #d6d6d6;
            float: left;
            font-size: 13px;
            font-weight: normal;
        }

        .TableCellHeaderSearch {
            float: right;
            padding: 0px 0px 0px;
            width: 197px;
            display: none;
        }
    </style>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <div class="right_content_box">
        <div class="bot_scroll" style="border-bottom: 1px solid #ccc;">
            <div class="wrap_container_inner">
                <div class="energy_section">
                    <div class="energy_section_left" style="width: 57%;">
                        <h1>Your Home Energy Profile</h1>
                        <h2>You're almost there</h2>
                        <p>Just complete the information below and we'll be in touch to get you on your way to saving money and energy.</p>

                        <div class="profie_list">
                            <span class="fields">* All fields required</span>
                            <form>
                                <div class="row form_section">
                                    <div class="col-xs-4">
                                        <div class="input-group">
                                            <label>First Name</label>
                                            <input type="text" class="form-control" placeholder="First Name">
                                        </div>
                                    </div>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <label>Last Name</label>
                                            <input type="text" class="form-control" placeholder="Last Name">
                                        </div>
                                    </div>

                                </div>

                                <div class="row form_section">

                                    <div class="col-xs-4">
                                        <div class="input-group">
                                            <label>City</label>
                                            <input type="text" class="form-control" placeholder="City">
                                        </div>
                                    </div>

                                    <div class="col-xs-4">
                                        <div class="input-group">
                                            <label>State</label>
                                            <input type="text" class="form-control" placeholder="State">
                                            <%-- <select class="selectpicker">
                        <option>Mustard</option>
                        <option>Ketchup</option>
                        <option>Relish</option>
                      </select>--%>
                                        </div>
                                    </div>

                                    <div class="col-xs-4">
                                        <div class="input-group">
                                            <label>Zip</label>
                                            <input type="text" class="form-control" placeholder="Zip" onkeypress="javascript:return (IsNumeric(event))" maxlength="5">
                                        </div>
                                    </div>

                                </div>


                                <div class="row form_section">

                                    <div class="col-xs-4">
                                        <div class="input-group">
                                            <label>Email</label>
                                            <input type="text" class="form-control" placeholder="Email">
                                        </div>
                                    </div>

                                    <div class="col-xs-6">
                                        <div class="input-group">
                                            <label>Contact No</label>
                                            <input type="text" class="form-control" placeholder="Contact No" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" maxlength="12">
                                        </div>
                                    </div>



                                </div>
                                <div class="row form_section">
                                    <div class="col-xs-12">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" checked="" value="option1" id="optionsCheckbox1" name="optionsRadios">
                                                You indicate 2 people live in your household. If your annual income is under $58,00 or your monthly income is under $4,000 you may qualify for additional savings measure. If you would like someone connect to you about this opportunity, please check this box.
                                            </label>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" checked="" value="option1" id="optionsCheckbox1" name="optionsRadios">
                                                I would like to recieve information from SUS including time and money saving offering by email.
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </form>


                        </div>


                        <div class="clearfix"></div>

                    </div>
                    <div class="energy_section_right" style="width: 40%; margin-top: 12px; float: right; margin-right: 1%;">
                        <div class="energy_section_right_img_area">
                            <img src="images/energy-efficiency2.png" alt="SCM Banner" />
                        </div>
                        <div class="energy_section_right_content_area">

                            <div class="energy_section_right_content_area_left" style="font-size: 14px;">
                                Your home in Upload, CA is one or the least efficient single-family homes in your neighborhood
                            </div>
                            <div class="energy_section_right_content_area_right" style="padding: 6px 15px;">
                                <h1 style="font-size: 38px;">$ 1,450</h1>
                                <span>Potential 3-year savings</span>
                            </div>

                        </div>

                    </div>
                    <span class="fields">
                        <img src="images/savings-image.png" width="330px" />
                    </span>
                    <span class="clearfix"></span>
                    <hr>
                </div>
                <!----Energy Savings Top div-->
            </div>

        </div>
        <div class="start_savings setting_save_box">
            <a href="#">Send Request</a>
        </div>
    </div>
    <div class="clearfix"></div>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->

</asp:Content>
