<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ZipCode.ascx.cs" Inherits="CustomerPortal.UserControls.ZipCode" %>
  
	
<script type="text/javascript" >
    $(document).ready(function () {
        function IsNumeric(e) {
            var code = e.which || event.keyCode;
            if (!((code >= 48 && code <= 57) || code == 8 || code == 127))
            { return false; }
            return true;
        }
     
        $(".ZipCode").keypress(function (e) {
            return (IsNumeric(this));
        });

        $(".ZipCode").autocomplete({
            
            source: function (request, response) {
                
                $.ajax({
                    url: '../usermanagement/AddCustomer.aspx/GetAutoFillZipCodeList',
                    data: "{ 'input': '" + $(".ZipCode").val() + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var array = $.parseJSON(data.d).Table;
                        if (array.length == 0) {
                            var result = [
                             {
                                 label: 'No matches found',
                                 value: response.term
                             }
                            ];
                            response(result);
                        }
                        else{
                            response($.map(array,
                            function (item) {
                                
                                    return {
                                        label: item.ZipCode,
                                        val: item.ZipCode
                                    }
                               
                            }));
                        }
                       
                    },
                    error: function (response) {
                        
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
              
                $("#AccountId").val(i.item.val.split('~')[0]);
                
            },
            minLength: 1
        });
    });
    </script>

<%--<asp:TextBox ID="txtZipCode" runat="server" title="Zip Code"   ClientIDMode="Static" placeholder="Mandatory" MaxLength="5"  ></asp:TextBox>--%>
<asp:HiddenField ID="AccountId" ClientIDMode="Static"  runat="server" />



