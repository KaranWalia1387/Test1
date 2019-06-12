<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultiMeterDropDownUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.MultiMeterDropDownUserControl" %>
<script type="text/javascript">
    $(document).ready(function () {

        //Bind dropdown multimeter
        var metertype;
        if ($("#hdnUsageType").val() == "PU") {
            metertype = 'E';
        }
        else if ($("#hdnUsageType").val() == "WU") {
            metertype = 'W';
        }
        else {
            metertype = 'G';
        }
        var param = { MeterType: metertype };
        $.ajax({
            type: "POST",
            url: "Usages.aspx/BindMultiMeter",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                $("#ddlMultiMeter").empty();
                var ddlvalue = $.parseJSON(data.d);                
                $("#ddlMultiMeter").append($("<option></option>").val('').html($('#alltxt').text())).attr("Isami", "");
                $.each(ddlvalue, function () {
                    $("#ddlMultiMeter").append($("<option></option>").val(this['MeterNumber']).html(this['MeterNumber']).attr("Isami", this['IsAMI']));;
                });
            },
            error: function () {
                alert("Error");
            }
        });
    });

</script>
<div>
    <asp:DropDownList ID="ddlMultiMeter" CssClass="ddmultimeter_select1" runat="server" Style="padding-right: 7px; float: right; width: 150px; margin-right: 10px;" ClientIDMode="Static"></asp:DropDownList>  
</div>
