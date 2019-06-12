<%@ Page Language="C#" Title="Role" AutoEventWireup="true" CodeBehind="RolesPermission.aspx.cs" MasterPageFile="~/Administration.master" Inherits="AdminPanel.RolesPermission" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_Role" />
     <script src="../js/rolespermission.js"></script>
    <style>
        .rollHead_class {
            border-bottom: 1px solid #DCDCDC;
            border-top: 1px solid #DCDCDC;
            background: #f7f7f7;
            PADDING-LEFT: 20PX;
            line-height: 23px;
            color: #069;
            font-weight: normal;
            font-size: 16px;
            padding-top: 5px;
        }

        @-moz-document url-prefix() {
            .outage_sbt_box {
                margin-bottom: 20px;
            }
        }

        @media (min-width:1500px) and (max-width:3500px) {
            .outage_sbt_box {
                margin-bottom: 22px;
            }
        }
    </style>
    <script>
        $(document).ready(function () {
            $('.rollHead_class').click(function () {
                var Parentid = this.children[0].id;
                if (this.children[0].checked) {
                    for (var i = 0; i < $('#' + Parentid + ' div input[type=checkbox]').length; i++) {
                        $("#" + $('#' + Parentid + ' div input[type=checkbox]')[i].id).prop("checked", true);
                    }
                }
                else {
                    for (var i = 0; i < $('#' + Parentid + ' div input[type=checkbox]').length; i++) {
                        $("#" + $('#' + Parentid + ' div input[type=checkbox]')[i].id).prop("checked", false);
                    }
                }
            });
            $('.checkbox_wrapper_box').click(function () {
                var Parentid = this.parentElement.parentElement.id;
                if (this.children[0].checked) {
                    $('.rollHead_class input[id=' + Parentid + ']').prop("checked", true);
                }
                else {
                    if($('#'+Parentid+ ' input[type=checkbox]:checked').length==1)
                    {
                        $('.rollHead_class input[id=' + Parentid + ']').prop("checked", false);
                    }
                }
            });
       
        });
    </script>
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Assign Rights</h2>
        </div>
    </div>
    <div>
       <div class="popup_left_content_area_home" style="padding-left: 2%;">
            
            Role Name:
        </div>
        <div class="popup_right_content_area_home">
            <input type="text" id="roleName" style="width: 30%" onkeypress="return isAlfa(event)"
                onkeyup="javascript:this.value=this.value.replace(/[<,>]/g,'');" maxlength="20" />
            <span class="required" style="color: #F30707; padding-left: 3px; font-size: 19px;">*</span>
        </div>
        <div style="clear: both;"></div>
        <div class="popup_left_content_area_home" style="padding-left: 2%;">
            Status:
        </div>
        <div class="popup_right_content_area_home">
            <select id="status" style="width: 30%">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div>
        <asp:Panel ID="pnlLevel1" runat="server" Style="width: 100%; clear: both">
        </asp:Panel>
    </div>
    <div class="outage_sbt_box">
        <button id="btnSave" type="button" class="submitBtn" value="">Save</button>
        <%--  <button id="btnSave" type="button" class="submitBtn" value="" >Save</button>--%>
    </div>
</asp:Content>

