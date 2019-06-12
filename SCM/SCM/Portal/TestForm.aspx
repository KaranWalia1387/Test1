<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestForm.aspx.cs" Inherits="CustomerPortal.TestForm" %>

<%@ Register Src="~/UserControls/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="js/1.11.1jquery.min.js"></script>
    <script src="js/Translator.js"></script>
    <script src="js/common.js"></script>

    <script src="js/ui/jquery-ui.js"></script>
    <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
    <script src="js/ui/jquery.ui.core.js"></script>
    <script src="js/ui/jquery.ui.widget.js"></script>
    <script src="js/ui/jquery.ui.position.js"></script>
    <script src="js/ui/jquery.ui.autocomplete.js"></script>
</head>

<body>
    <script>
        // Load the SDK Asynchronously
        //(function (d) {
        //    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        //    if (d.getElementById(id)) { return; }
        //    js = d.createElement('script'); js.id = id; js.async = true;
        //    js.src = "//connect.facebook.net/en_US/all.js";
        //    ref.parentNode.insertBefore(js, ref);
        //}(document));

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Init the SDK upon load
        window.fbAsyncInit = function () {
            FB.init({
                appId: '513760458812940', // App ID,
                app_secret: '9a07257894dfdfd7e51981325804b150',
               // channelUrl: '//' + window.location.hostname + '/channel', // Path to your Channel File
                channelUrl: '//d.smartusys.net/channel/channel', // Path to your Channel File
                status: true, // check login status
                cookie: true, // enable cookies to allow the server to access the session
                xfbml: true, // parse XFBML
                version: 'v2.7'
            });

            // Specify the extended permissions needed to view user data
            // The user will be asked to grant these permissions to the app (so only pick those that are needed)
            var permissions = [
              'email',
              'user_likes',
              'friends_likes',
              'user_about_me',
              'friends_about_me',
              'user_birthday',
              'friends_birthday',
              'user_education_history',
              'friends_education_history',
              'user_hometown',
              'friends_hometown',
              'user_relationships',
              'friends_relationships',
              'user_relationship_details',
              'friends_relationship_details',
              'user_location',
              'friends_location',
              'user_religion_politics',
              'friends_religion_politics',
              'user_website',
              'friends_website',
              'user_work_history',
              'friends_work_history'
            ].join(',');

            // Some values are dependent on the user granting certain permissions
            var fields = [
              'id',
              'name',
              'first_name',
              'middle_name',
              'last_name',
              'gender',
              'locale',
              'languages',
              'link',
              'username',
              'third_party_id',
              'installed',
              'timezone',
              'updated_time',
              'verified',
              'age_range',
              'bio',
              'birthday',
              'cover',
              'currency',
              'devices',
              'education',
              'email',
              'hometown',
              'interested_in',
              'location',
              'political',
              'payment_pricepoints',
              'favorite_athletes',
              'favorite_teams',
              'picture',
              'quotes',
              'relationship_status',
              'religion',
             'significant_other',
              'video_upload_limits',
                'website',
                'work'].join(',');
            // listen for and handle auth.statusChange events
            FB.Event.subscribe('auth.statusChange', function (response) {
                if (response.authResponse) {
                    // user has auth'd your app and is logged into Facebook
                    FB.api('/me',{fields: fields}, function (me) {
                        if (me.name) {
                            document.getElementById('auth-displayname').innerHTML = me.name;
                            $('#userdata').html(JSON.stringify(details, null, '\t'));
                        }
                    })
                    var userid = response.authResponse.userID

                    FB.api(
                       "/" + userid,
                       function (response) {
                           if (response && !response.error) {
                               /* handle the result */
                           }
                       }
                   );

                    document.getElementById('auth-loggedout').style.display = 'none';
                    document.getElementById('auth-loggedin').style.display = 'block';
                } else {
                    // user has not auth'd your app, or is not logged into Facebook
                    document.getElementById('auth-loggedout').style.display = 'block';
                    document.getElementById('auth-loggedin').style.display = 'none';
                }
            }, { scope: permissions });

            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                    /* make the API call */

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
            $("#auth-logoutlink").click(function () { FB.logout(function () { window.location.reload(); }); });
        }
    </script>
    <form id="form1" runat="server">
        <div>
            <div globalize="ML_Aboutmyhome_Lbl_Hometype">Home Type</div>
            <asp:TextBox runat="server" ID="txtComment" ClientIDMode="Static" Rows="7" globalize="ML_ConnectMe_TxtComments" TextMode="MultiLine"
                mandatory="1" title="Comments" onKeyUp="Count(this,500)" onChange="Count(this,500)"></asp:TextBox>
            <input id="hdnCommonUrl" type="hidden" value="<%=CustomerPortal.SessionAccessor.BaseUrl%>" /><asp:Button ID="Button1" runat="server" Text="Button" OnClick="Button1_Click" />
            <uc1:ZipCode runat="server" ID="ZipCode" />
        </div>
        <div id="auth-status">
            <div id="auth-loggedout">

                <div class="fb-login-button" autologoutlink="true" scope="email,public_profile,user_likes,user_birthday">Login with Facebook</div>
            </div>
            <div id="auth-loggedin" style="display: none">
                Hi, <span id="auth-displayname"></span>(<a href="#" id="auth-logoutlink">logout</a>)
                <span id="userdata"></span>
            </div>
        </div>
    </form>
</body>
</html>
