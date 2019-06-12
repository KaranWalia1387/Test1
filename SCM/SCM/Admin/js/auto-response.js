$(document).ready(function () {
    $('#summernote').summernote();

    LoadData();

    $('#SendResponse').click(function () {
        if ($('#ContentPlaceHolder1_rightpanel_AutoResp').prop('checked') == true && $('#summernote').summernote('code') == '<p></p>')
        {
            alert('Please enter auto response message');
            return false;
        }

        var param = { mode: "1", ischk: $('#ContentPlaceHolder1_rightpanel_AutoResp').prop('checked') == true ? "1" : "0", content: $('#summernote').summernote('code'), AutoResponseType: "123" };

        $.ajax({
            type: "POST",
            url: "autoresponse.aspx/SubmitResponse",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                var result = JSON.parse(data.d);
                loader.hideloader();
                if (result > 0) {
                    alert('Your settings have been saved successfully');
                }
                else { alert('Please Try Again'); }
            },
            failure: function (response) {
                console.log(response.responseText);
            }
        });
    });

    function LoadData() {
        loader.showloader();
        var param = { mode: "0", AutoResponseType: "123" };
        $.ajax({
            type: "POST",
            url: "autoresponse.aspx/GetResponseData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                debugger;
                var result = JSON.parse(data.d).Table;
                if (result != null) {
                    $('#summernote').summernote('code', result[0].AutoResponseMsg);
                    if (result[0].IsActive)
                        $('#ContentPlaceHolder1_rightpanel_AutoResp').attr('checked', true);
                    else
                        $('#ContentPlaceHolder1_rightpanel_AutoResp').attr('checked', false);
                }
                loader.hideloader();
            },
            failure: function (response) {
                console.log(response.responseText);
                loader.hideloader();
            }
        });

    };

})

$('#outbox').click(function () {
    window.location.href = "Notification-outbox.aspx";
});

$('#outage').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=outage&name=Outage&type=1";
});

$('#connectme').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=connectme&name=Connect Me&type=2";
});

$('#service').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=service&name=Service&type=3";
});

$('#billing').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=billing&name=Billing&type=4";
});

$('#demandresponse').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=demandresponse&name=Demand Response&type=5";
});

$('#sentitem').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=sent&name=Sent&type=8";
});

$('#trash').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=trash&name=Trash&type=9";
});

$('#saved').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=saved&name=Saved&type=12";
});

$('#allmail').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=allMail&name=All Mail&type=11";
});
