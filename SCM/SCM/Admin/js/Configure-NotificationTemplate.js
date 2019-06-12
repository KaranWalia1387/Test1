var mode;
var databindtogrid;
var topicid;
var mode = 0;
var xml = '';

$(document).ready(function () {
    loader.showloader();

    mode = 0;
    xml = '';
    // bind(0, '');
    loader.hideloader();

    $('#btnUpdate').click(function () {
        var flag = 0;
        var rowCount = $('#tblDetails tr').length;

        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        $('.emailtxt').removeClass('errorbox');
        for (var i = 0; i < rowCount - 1; i++) {

            var TextBoxID = "txtemailid_" + i;
            var Chkbx = "chkbxemailstatus_" + i;

            var TextBoxValue = document.getElementById(TextBoxID).value;
            var isChecked = $('#' + Chkbx + ':checked').val();

            if (isChecked) {
                if (TextBoxValue == '') {
                    flag = 1;
                    $('#' + TextBoxID).addClass('errorbox');
                    $('#' + TextBoxID).text(''); $('#' + TextBoxID).focus();
                }
                else { $('#' + TextBoxID).removeClass('errorbox'); }
                if (filter.test(TextBoxValue)) { $('#' + TextBoxID).removeClass('errorbox'); }
                else {
                    flag = 1;

                    $('#' + TextBoxID).text('');
                    $('#' + TextBoxID).focus();
                    $('#' + TextBoxID).addClass('errorbox');

                }
            }
            if (TextBoxValue != '') {
                if (filter.test(TextBoxValue)) { $('#' + TextBoxID).removeClass('errorbox'); }
                else {
                    flag = 1;
                    $('#' + TextBoxID).addClass('errorbox');
                    $('#' + TextBoxID).text(''); $('#' + TextBoxID).focus();
                }
            }
        }
        if (flag == 1) {
            alert('Please enter a valid Email.');
        }
        else {
            var xml; var chk;
            xml = '<root>';
            for (var i = 0; i < rowCount - 1; i++) {
                var LabelID = "lblemailtype_" + i;
                var LabelIDTypeID = "lblEmailTypeID_" + i;
                var TextBoxID = "txtemailid_" + i;
                var Chkbx = "chkbxemailstatus_" + i;
                var LabelValue = document.getElementById(LabelID).innerText;
                var LabelValueTypeID = document.getElementById(LabelIDTypeID).innerText;
                var TextBoxValue = document.getElementById(TextBoxID).value;
                var isChecked = $('#' + Chkbx + ':checked').val() ? "True" : "False";

                xml += '<Email><EmailType>' + LabelValue + '</EmailType>';
                xml += '<EmailTypeID>' + LabelValueTypeID + '</EmailTypeID>';
                xml += '<EmailStatus>' + isChecked + '</EmailStatus>';
                xml += '<EMailId>' + TextBoxValue + '</EMailId></Email>';
            }
            xml += '</root>';
            SaveData(1, xml);
        }


    });


});

$(document).on("change", "#tblDetails tbody input[type='checkbox']", function () {
    $(this).closest("tr").find("input").not(this).prop("readOnly", !this.checked);
});

function SaveData(Mode, XML) {
    loader.showloader();
    var param = { Mode: Mode, XML: XML };
    $.ajax({
        type: "POST",
        url: "configure-notificationtemplate.aspx/SaveData",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            if (JSON.parse(data.d).Table[0].STATUS == 1) {
                //bind(0, '');
                alert('Notification workflow has been updated successfully');
            }
            else {
                alert('Data not updated.');
            }
        }
    });
    loader.hideloader();
}

function bind(Mode, XML) {
    loader.showloader();
    var param = { Mode: Mode, sb: XML };
    $.ajax({
        type: "POST",
        url: "configure-notificationtemplate.aspx/LoadGrid",                                                                                            
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,

        error: function (response) {
            // alert(response.d);
        }
    });
    loader.hideloader();
}



function OnSuccess(response) {
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var customers = xml.find("Table");
    var table = $("#tblDetails table").eq(0).clone(true);
    $("#tblDetails table").eq(0).remove();
    customers.each(function () {
        var customer = $(this);
        $(".lblemail", table).html(customer.find("EmailType").text());
        $(".lblemailtypeid", table).html(customer.find("EmailTypeID").text());
        $(".chkstatus", table).html(customer.find("City").text());
        $(".emailtxt", table).html(customer.find("EMailId").text());
        $("#tblDetails").append(table).append("<br />");
        table = $("#tblDetails table").eq(0).clone(true);

    });
}


























