<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Attributeautocomplete.ascx.cs" Inherits="AdminPanel.CRM.UserControl.Attributeautocomplete" %>
<script src="../js/ui/jquery-ui.js"></script>
    <script src="../js/ui/jquery.ui.core.js"></script>
	<script src="../js/ui/jquery.ui.widget.js"></script>
	<script src="../js/ui/jquery.ui.position.js"></script>
	<script src="../js/ui/jquery.ui.autocomplete.js"></script>

<style>
.ui-menu{

z-index:9999 !important;
}

.ui-autocomplete-loading { background:url('../images/loader.gif') no-repeat center center; background-size:35px 25px; }
</style>

<script type="text/javascript" >
    $(document).ready(function () {
        function validateTextBox() {
            // added to check valid characters are entered or not
            var regx = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            if (!regx.test($("#txtAttributeName").val()))
                return false;
            else
                return true;
        }
      
        $("#txtAttributeName").autocomplete({
            source: function (request, response) {
                debugger

                $.ajax({
                  
                    url: 'crm-add-segmentations.aspx/GetAutoFillAttributeNameList',
                    data: "{ 'prefixText': '" + request.term +"','SegmentType': '" +   $('#ddlType').val()+ "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                
                    //search: function () {
                    //    // $("#loading2").show();
                    //    loader.showloader();
                    //},
                    //response: function () {
                    //    // $("#loading2").hide();
                    //    loader.hideloader();
                    //},
                    success: function (data) {
                   
                        response($.map(data.d, function (item) {
                            return {
                                label: item.split('/')[0],
                                val: item.split('/')[1]

                            }
                            
                        }))
                    },
                    error: function (response) {
                        loader.hideloader();
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        loader.hideloader();
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                $("#AttributeId").val(i.item.val.split('/')[0]);
              
            },
            minLength: 1
        });
    });
    </script>


  <asp:HiddenField ID="AttributeId" runat="server" ClientIDMode="Static" />
<asp:TextBox ID="txtAttributeName" runat="server"  title="Attribute Name" ClientIDMode="Static" placeholder=""  mandatory="1" style="width:89%;"></asp:TextBox>
