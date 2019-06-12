$(document).ready(function () {
    GetMdahsboard();
    $("#SaveMDashboardBtn").click(function () {
        SaveMdahsboard();
    });
    $('#rdFullView').click(function () {
        if ($(this).is(':checked')) {
            $('#chkEfficiency').prop('checked', false);
            $('#chkNotification').prop('checked', false);
            $('#chkWeather').prop('checked', false);
            $('#chkOutage').prop('checked', false);
            $('#chkBilling').prop('checked', false);
            $('#chkUsage').prop('checked', false);
            $('#chkNotification').attr('disabled', 'disabled');
            $('#chkOutage').attr('disabled', 'disabled');
            $('#chkBilling').attr('disabled', 'disabled');
            $('#chkUsage').attr('disabled', 'disabled');
            $('#chkEfficiency').attr('disabled', 'disabled');
            $('#chkWeather').attr('disabled', 'disabled');
        } 
    });
        $('#rdHalfView').click(function () {
            if ($(this).is(':checked')) {
                $('#chkNotification').removeAttr('disabled');
                $('#chkOutage').removeAttr('disabled');
                $('#chkBilling').removeAttr('disabled');
                $('#chkUsage').removeAttr('disabled');
                $('#chkEfficiency').removeAttr('disabled');
                $('#chkWeather').removeAttr('disabled');
        }
    });
    $('#chkNotification').click(function () {
        
        if ($(this).is(':checked')) {
            $('#chkOutage').prop('checked', true);
            $('#chkBilling').prop('checked',true);
            $('#chkUsage').prop('checked',true);
        }
        else
        {
            $('#chkOutage').prop('checked', false);
            $('#chkBilling').prop('checked', false);
            $('#chkUsage').prop('checked', false);
        }
    });
    $('#chkOutage').click(function () {
        if ($(this).is(':checked')) {
            $('#chkNotification').prop('checked', true);
        }
        else
        {
            if ($('#chkUsage').prop('checked') || $('#chkBilling').prop('checked')) {
                $('#chkNotification').prop('checked', true);
            }
            else
            {
                $('#chkNotification').prop('checked', false);
            }

        }
    });
    $('#chkUsage').click(function () {
        if ($(this).is(':checked')) {
            $('#chkNotification').prop('checked', true);
        }
        else {
            if ($('#chkOutage').prop('checked') || $('#chkBilling').prop('checked')) {
                $('#chkNotification').prop('checked', true);
            }
            else {
                $('#chkNotification').prop('checked', false);
            }

        }
    });
    $('#chkBilling').click(function () {
        if ($(this).is(':checked')) {
            $('#chkNotification').prop('checked', true);
        }
        else {
            if ($('#chkUsage').prop('checked') || $('#chkOutage').prop('checked')) {
                $('#chkNotification').prop('checked', true);
            }
            else {
                $('#chkNotification').prop('checked', false);
            }

        }
    });
});

function GetMdahsboard() {
    try {
        loader.showloader();
        var param = { mode: 0 };
        $.ajax({
            type: "POST",
            url: "configure-mobiledashboard.aspx/GetMdahsboard",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              
                var res = JSON.parse(data.d);
                for (var i = 0; i < res.length; i++) {
                    switch(res[i].Name)
                    {
                        case "DashboardView":
                            if (res[i].Value == true) {
                                $('#rdFullView').prop('checked', true);
                                $('#chkEfficiency').prop('checked', false);
                                $('#chkNotification').prop('checked', false);
                                $('#chkWeather').prop('checked', false);
                                $('#chkOutage').prop('checked', false);
                                $('#chkBilling').prop('checked', false);
                                $('#chkUsage').prop('checked', false);
                                $('#chkNotification').attr('disabled', 'disabled');
                                $('#chkOutage').attr('disabled', 'disabled');
                                $('#chkBilling').attr('disabled', 'disabled');
                                $('#chkUsage').attr('disabled', 'disabled');
                                $('#chkEfficiency').attr('disabled', 'disabled');
                                $('#chkWeather').attr('disabled', 'disabled');
                            } else
                            {
                                $('#rdHalfView').prop('checked', true);
                                $('#chkNotification').removeAttr('disabled');
                                $('#chkOutage').removeAttr('disabled');
                                $('#chkBilling').removeAttr('disabled');
                                $('#chkUsage').removeAttr('disabled');
                                $('#chkEfficiency').removeAttr('disabled');
                                $('#chkWeather').removeAttr('disabled');
                            }
                            break;
                        case "Efficiency":
                            $('#chkEfficiency').prop('checked', res[i].Value);
                            break;
                        case "Weather":
                            $('#chkWeather').prop('checked', res[i].Value);
                            break;
                        case "Notification":
                            $('#chkNotification').prop('checked', res[i].Value);
                            break;
                        case "Outage":
                            $('#chkOutage').prop('checked', res[i].Value);
                            break;
                        case "Billing":
                            $('#chkBilling').prop('checked', res[i].Value);
                            break;
                        case "Usage":
                            $('#chkUsage').prop('checked', res[i].Value);
                            break;
                    }
                }
                loader.hideloader();
            },
            failure: function (response) {
                loader.hideloader();
                console.log(response.responseText);
            }
        });
    } catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}
function xml() {
    var xml, ischk;
    xml = '<DashboardSettings>';
    if ($('#rdFullView').prop('checked')) {
        xml += '<DashboardSetting><Name>DashboardView</Name><Value>1</Value></DashboardSetting>';
    }
    else
    {
        xml += '<DashboardSetting><Name>DashboardView</Name><Value>0</Value></DashboardSetting>';
    }
    ischk = (($('#chkWeather').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Weather</Name><Value>' + ischk + '</Value></DashboardSetting>';
    ischk = (($('#chkEfficiency').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Efficiency</Name><Value>' + ischk + '</Value></DashboardSetting>';
    ischk = (($('#chkNotification').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Notification</Name><Value>' + ischk + '</Value></DashboardSetting>';
    ischk = (($('#chkOutage').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Outage</Name><Value>' + ischk + '</Value></DashboardSetting>';
    ischk = (($('#chkBilling').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Billing</Name><Value>' + ischk + '</Value></DashboardSetting>';
    ischk = (($('#chkUsage').prop('checked')) ? "1" : "0");
    xml += '<DashboardSetting><Name>Usage</Name><Value>' + ischk + '</Value></DashboardSetting>';
    xml += '</DashboardSettings>';
    return xml;
}
function SaveMdahsboard() {
    try {
        if ($('#rdHalfView').prop('checked')) {
            var chkval = 0;
            chkval += (($('#chkEfficiency').prop('checked')) ? 1 : 0);
            chkval += (($('#chkWeather').prop('checked')) ? 1 : 0);
            chkval += (($('#chkNotification').prop('checked')) ? 1 : 0);
            if (chkval < 1) {
                alert('Please select atleast 1 Dashboard Report type');
                return false;
            }
        }

        if ($('#chkNotification').prop('checked')) {
            var chkval = 0;
            chkval += (($('#chkOutage').prop('checked')) ? 1 : 0);
            chkval += (($('#chkBilling').prop('checked')) ? 1 : 0);
            chkval += (($('#chkUsage').prop('checked')) ? 1 : 0);
            if (chkval<1) {
                alert('Please select atleast 1 notification type');
                return false;
            }
        }
               
        loader.showloader();
        var param = { xml: xml() };
        $.ajax({
            type: "POST",
            url: "configure-mobiledashboard.aspx/SaveMdahsboard",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessEdit,
            failure: function (response) {
                loader.hideloader();
                console.log(response.responseText);
            }
        });
    } catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

function OnSuccessEdit(data, status) {
    var res = JSON.parse(data.d);
    alert('Mobile Dashboard Settings has been updated successfully');
    loader.hideloader();
}