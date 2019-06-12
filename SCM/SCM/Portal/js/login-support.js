$(document).ready(function () {
    $('#btnSubmitForgotUserName').click(function () {
        var res = (ValidateAllPageFieldsSingleMessage('ForgotUserNameContainer') && EmailValidator($('#txtEmailForgotUserName')[0]));
        if (res) {
            loader.showloader();
            var param = {
                Email: $('#txtEmailForgotUserName').val(),
                type: 2
            }

            function OnSuccess(data, status) {
                toastr.clear();
                loader.hideloader();
                var status = JSON.parse(data.d);
                if (status != null) {
                    if (status[0].Status == 1) {
                        //w2alert(status[0].Message, 'Notification', function () {
                        w2alert(status[0].Message, $("#Notificationtxt").text(), function () {
                         window.location.href = 'default.aspx'; })
                        $('.w2ui-popup-btn').focus();
                    }
                    else if (status[0].Status == 0) {
                        // toastr.error(status[0].Message);
                        //w2alert(status[0].Message, 'Notification', function (obj) {
                        w2alert(status[0].Message, $("#Notificationtxt").text(), function () {
                            if (status[0].AttemptLeft == "0") {
                                //window.location = "signout.aspx";
                                $.fn.idleTimeout().logout();
                            }
                        });
                        $('.w2ui-popup-btn').focus();
                    }
                }
                else
                    toastr.error($('#idErrMsg')[0].title);
            }

            function OnError(request, status, error) {
                toastr.clear();
                loader.hideloader();
                //toastr.error(request.statusText);
                toastr.error($('#idErrMsg')[0].title);
            }

            $.ajax({
                type: "POST",
                url: "LoginSupport.aspx/btnSubmitForgotUserNameClick",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }
    });

    $('#btnSubmitForgotPassword').click(function () {
        var res = (ValidateAllPageFieldsSingleMessage('ForgotPswdContainer'));// && EmailValidator($('#txtEmailForgotPassword')[0]));
        if (res) {
            loader.showloader();

            var param = {
                Email: $('#txtEmailForgotPassword').val(),
                type: 1
            }

            function OnSuccess(data, status) {
                loader.hideloader();
                var status = JSON.parse(data.d);
                if (status != null) {
                    if (status[0].Status == 1) {
                        //w2alert(status[0].Message, 'Notification', function () {
                        w2alert(status[0].Message, $("#Notificationtxt").text(), function () {
                         window.location.href = 'default.aspx'; })
                        $('.w2ui-popup-btn').focus();
                    }
                    else if (status[0].Status == 0) {
                       // toastr.error(status[0].Message);
                        ////w2confirm(status[0].Message, function (obj) {
                        ////    if (obj == 'Yes') {
                        ////        if (status[0].AttemptLeft == "0") {
                        ////            window.location = "signout.aspx";
                        ////        }
                        ////    }

                        ////});
                        //w2alert(status[0].Message, 'Notification', function (obj) {
                        w2alert(status[0].Message, $("#Notificationtxt").text(), function () {
                          
                                if (status[0].AttemptLeft == "0") {
                                    window.location.href = 'default.aspx';
                                            }
                          

                        });
                        $('.w2ui-popup-btn').focus();
                        
                    }
                }
                else
                    toastr.error($('#idErrMsg')[0].title);
                    //toastr.error("we apologize for the inconvenience but the service is currently unavailable, please try again later.");
            }

            function OnError(request, status, error) {
                loader.hideloader();
                toastr.error($('#idErrMsg')[0].title);
                //toastr.error(request.statusText)
            }

            $.ajax({
                type: "POST",
                url: "LoginSupport.aspx/btnSubmitForgotPasswordClick",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });

        }
    });

    $('#btnSubmitOtherLogin').click(function () {
        var res = (ValidateAllPageFieldsSingleMessage('OtherLoginProblemsContainer')); //&& EmailValidator($('#txtEmailOtherLogin')[0]));
        if (res) {
            loader.showloader();
            var param = {
                Email: $('#txtEmailOtherLogin').val(),
                type: 3,
                comments: $('#txtComments').val(),
                placeholderId: 6
            }

            function OnSuccess(data, status) {
                loader.hideloader();
                var status = JSON.parse(data.d);
                if (status != null) {
                    if (status[0].Status == 1) {
                        //w2alert(status[0].Message, 'Notification', function () {
                        w2alert(status[0].Message, $("#Notificationtxt").text(), function () {
                         window.location.href = 'default.aspx'; })
                        $('.w2ui-popup-btn').focus();
                    }
                    else if (status[0].Status == 0) {
                        toastr.error(status[0].Message);
                    }
                }
                else
                    toastr.error($('#idErrMsg')[0].title);
                    //toastr.error("we apologize for the inconvenience but the service is currently unavailable, please try again later.");
            }


            function OnError(request, status, error) {
                loader.hideloader();
                toastr.error($('#idErrMsg')[0].title);
                //toastr.error(request.statusText);
            }

            $.ajax({
                type: "POST",
                url: "LoginSupport.aspx/btnSubmitOtherLoginClick",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }

    });

    $('#txtEmailForgotPassword').keypress(function (e) {
        if (e.keyCode == 13) {
            $('#btnSubmitForgotPassword').trigger('click');
            return false;
        }
    });
    $('#txtEmailForgotUserName').keypress(function (e) {
        if (e.keyCode == 13) {
            $('#btnSubmitForgotUserName').trigger('click');
            return false;
        }
    });
    $('#txtEmailOtherLogin').keypress(function (e) {
        if (e.keyCode == 13) {
            $('#btnSubmitOtherLogin').trigger('click');
            return false;
        }
    });
});

function ValidatePassword3(password) {
    var re = '';
    var f = 0;
    if (password.length == 0) {
        return false;
    }
    if (password.length < 8) {
        f = 1;
    }
    re = /[0-9]/;
    if (!re.test(password)) {
        f = 1;
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        f = 1;
    }
    if (/^[a-zA-Z0-9 ]*$/.test(password) == true) {
        f = 1;
    }
    if (!(/^[a-zA-Z0-9@#$&%*!]*$/g.test(password) == true)) {
        // check if it contains special characters other than mentioned
        f = 1;
    }
    if (f == 1) {
        toastr.warning($('#ML_Registration_Span_ErrMsg_Valid-Password').text());
        return false;
    }
    return true;
}