<%@ Page Title="DR Programs" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true" CodeBehind="DRPrograms.aspx.cs" Inherits="CustomerPortal.DRPrograms" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">

    <title>DR Programs</title>
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/DRPrograms.js"></script>

    <script type="text/javascript">

        $(document).ready(function () {
            $('.active').removeClass('active');
            $('.icon_dr_pro_icon').addClass('active');
            $('.efficency').addClass('active');
            var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
            var cutomerno = "";
            cutomerno = utlitynum;
            GetCustomerSignedProgramDetails(cutomerno);
            GetDRPrograms();

            $("#btnOptDrPrograms").click(function () {
                checkEnroll(cutomerno);
            });
        });

    </script>

    <style type="text/css">

        .register_eff_lnk {
            display: block !important;
            margin-top: 37px !important;
            position: absolute !important;
            float: right !important;
            right: 16px;
            background: none !important;
            line-height: 16px !important;
        }

        .profile_img {
            width: 2%;
        }
        .details_box .register_lnk ul li {
            background:none !important;
        }
        .register_eff_lnk a {
           color: #069 !important;
            display: block;
            padding: 2px 6px 8px !important;
            font-size: 14px !important;
            text-decoration: none;
            width: 128px;
            text-align: center;
            background: none !important;
            text-transform: capitalize;
            float: right;
            }
       .details_box .register_eff_lnk a:hover {
      color: #069 !important;
        }


        .details_box {
            width: 98%;
        }

        .view_details {
            padding-left: 0;
        }

        .right_content_box .view_details ul li {
            padding-left: 0 !important;
            padding-top: 3px !important;
            border-bottom: 0 !important;
        }

        .show_hide_details {
            width: 30%;
            float: left;
            white-space:nowrap;
        }

        .register_eff_lnk {
            margin-top: 0px;
            position:static;
        }

        .details_box a { 
background: #2d1a6e none repeat scroll 0 0;
    border-radius: 3px;
    color: #fff;
    float: right;
    font-size: 14px;
    padding: 4px 14px 6px;
    text-decoration: none;
}
            .details_box a:hover {
            
    color: #fff !important;
             } 

            .details_box .register_lnk ul li {
                background-position:left 9px;
            }


        .register_lnk ul {
               margin-top: -10px !important;
               margin-bottom: 9px !important;
             }

    .table_dr_pro > ul:hover {
        background:#f9f9f9;
    }
    
    .table_dr_pro > ul:nth-child(even) {
            background: #FDFDFD;
            margin: 1px 0px;
    }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            /* Safari only override */
            ::i-block-chrome, .right_content_box ul li {
                height: 70px;
            }

            ::i-block-chrome, .details_box .register_lnk ul li, ::i-block-chrome, .details_box .view_details li {
                height: auto;
            }

            ::i-block-chrome, .details_box .register_lnk ul li {
                float: left;
                padding: 0 10px 0 10px;
                border-bottom: 0px;
                margin-bottom: 0px;
                background: url(../images/divider_like_lnk.png) no-repeat left 14px !important;
            }

            ::i-block-chrome, .details_box .register_lnk span {
                margin-top: 9px !important;
                display: inline-block;
                padding-left: 5px;
                padding-right: 5px;
            }

            ::i-block-chrome, details_box .register_lnk .like_lnk {
                margin-top: -20px;
            }

            ::i-block-chrome, .details_box .register_lnk ul li:first-child {
                background: none !important;
            }
        }

        .table_dr_pro table {
            width: 100%;
            border: 1px solid #ccc;
        }

            .table_dr_pro table tr td {
                padding: 6px 5px;
                border: 1px solid #EAEAEA;
                text-align: center;
                width: auto !important;
            }

            .table_dr_pro table tr:first-child {
                background: #ccc;
                font-size: 13px;
                font-weight: bold;
            }

            .table_dr_pro table tr:nth-child(2n+1) td {
                background: #F3F3F3;
            }

        .popup_effecie table tr td {
            padding: 7px 15px;
        }

            .popup_effecie table tr td:first-child {
                font-weight: bold;
                width: 30%;
            }

        .popup_effecie table tr:nth-child(2n+2) td {
            background: #F3F3F3;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            border-bottom: 1px solid #ECECEC;
            border-top: 0px;
        }

        .popup_button {
            padding-bottom: 18px;
        }

        .discription_pro {
    padding: 16px 16px 16px 16px;
    font-size: 13px;
    line-height: 23px;
    text-align: justify;
    color: #797979;
}
.modal-header .close {
    margin-top: 0px;
}
    button.close {
    border: 0px solid #ccc;
    /*border-radius: 50%;*/
    padding: 0px;
    background-color: #ccc;
    color: #fff !important;
    font-weight: normal;
    opacity: 99 !important;
}
    .submit-button {
    background: none repeat scroll 0 0 #2d1a6e !important;
    border: medium none !important;
    border-radius: 0px !important;
    color: #f0f0f0 !important;
    float: right;
    font-size: 16px;
    height: 30px !important;
    margin-bottom: 15px;
    margin-right: 10px;
    padding: 3px 27px !important;
    text-align: center;
    width: 195px !important;
    font-weight: bold;
}
    .cancel-button{
        width: 195px !important;
    }
    .details_box .register_lnk {
    float: right;
    padding-bottom: 0;
}
    </style>


    <input type="hidden" class="activeli_list" value="efficency" />
   

                <div class="right_content_box">
                    <!-- right content body -->

                    <div id="dvTableContainer" class="table_dr_pro">
                                  
                    </div>
                    

                </div><!-- End .right_content_box -->
    

    <!-- Register Modal starts -->
  <div class="modal fade" id="modelRegister" role="dialog" >
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style="padding:7px 15px;">
          <button type="button" id="btnclosepopup" class="close " data-dismiss="modal"><img src="images/cross-icon.png" /></button>
          <h4 class="modal-title">Register</h4>
        </div>
        <div class="modal-body">

            <div id="dvRegisterDetails" class="popup_effecie" >
                
            </div>
            <div class="popup_button">
                   <button id="btnOptDrPrograms" type="button" class="submit-button">Signup</button>
            <button type="button" class="cancel-button" data-dismiss="modal">Close</button>

            </div>

        </div>
        
      </div>
      
    </div>
  </div>
    <!-- Register Modal ends -->
</section>



 <!-- Show Details Modal Popup -->
        <div class="modal fade"  id="showdetails_dr_prog" role="dialog"  >
          <div class="modal-dialog ">

            <div class="modal-content" >
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><img src="images/cross-icon.png" /></button>
                <h4 class="modal-title">Details </h4>
              </div>
              <div class="modal-body  cust_pop">
               <div class="discription_pro">
                  

               </div>
              </div>

             
            
            </div>

          </div>
           
        </div>
    <!-- End Section -->     

</asp:Content>
