$(document).ready(function () {
   
    //  fill_dropdown();

    $(".dropdown img.flag").addClass("flagvisibility");
    $(".dropdown dt a").click(function () {
        $(".dropdown dd ul").toggle();
    });

    $(".dropdown dd ul li a").click(function () {
       
        var language = $($(this).children(":last")[0]).html();
        var param = { language: language }
            $.ajax({
                method: 'POST',
                url: "default.aspx/UpdateLanguageCode",
                data: JSON.stringify(param),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && JSON.parse(response.d).length > 0) {
                    }
                    else {

                    }
                },
                error: function errorCallback(response) {
                    console.log(response);
                }


            })        
        var text = $(this).html();
        $(".dropdown dt a span").html(text);
        $(".dropdown dd ul").hide();
        //$("#result").html("Selected value is: " + getSelectedValue("sample"));
        //*************************
        var user = getCookie("Language_code");
        if (user != "") {
            //alert("Welcome again " + user);
            user = getSelectedValue("sample");
            if (user != "" && user != null) {
                setCookie("Language_code", user, 7);
                setCookie("Language_Name", getSelectedValue_languageName("sample"), 7);
            }

        } else {
            //user = prompt("Please enter your name:", "");
            user = getSelectedValue("sample");
            if (user != "" && user != null) {
                setCookie("Language_code", user, 7);
                setCookie("Language_Name", getSelectedValue_languageName("sample"), 7);
            }
        }
      
        window.location = window.location.href.replace('#', '');
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    function getSelectedValue_languageName(id) {
        var kk = encodeURIComponent($(".preData a>span")[0].innerText);
        return kk;
     //   return $(".preData a>span")[0].innerText;
    }


    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });

    $(".dropdown img.flag").toggleClass("flagvisibility");
    
});

//************************Ajax Call for access data*********
function fill_dropdown()
{
    $.ajax({
        type: "POST",
        url: "default.aspx/GetData_language_json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(param),
        success: OnSuccess,
        error: OnError
    });

}

//function OnSuccess(data, status) {
//  //  loader.showloader();
//    data = data.d;
//    var k = JSON.parse(data);
//    if (getCookie("Language_code") != null && getCookie("Language_code") != "" && getCookie("Language_Name") && getCookie("Language_Name"))
//    {
//        $(".preData").append('<a href="#"><span><img class="flag" src="images/' + getCookie("Language_code") + '.svg" alt="" />' + getCookie("Language_Name") + '<span class="value">' + getCookie("Language_code") + '</span></span></a>')

//    }
//    else
//    {
//        $(".preData").append('<a href="#"><span><img class="flag" src="images/EN.svg" alt="" />English<span class="value">EN</span></span></a>')

//    }

//    $.each(JSON.parse(data), function (i, item) {
       
//            //$(".sizelist").append('<li class= "' + className + ' categ" onclick="ClickCtegory(' + item.CategoryId + ');" id=' + item.CategoryId + '><a href="#">' + item.Name + '</a></li>');
//            $(".dp_language").append('<li> <a href="#"><img class="flag" src="images/' + item.LanguageCode + '.svg" alt=""/>' + item.LanguageName + '<span class="value">' + item.LanguageCode + '</span></a></li>');

       
//    });
//    $(".dropdown img.flag").addClass("flagvisibility");
//    $(".dropdown dt a").click(function () {
//        $(".dropdown dd ul").toggle();
//    });

//    $(".dropdown dd ul li a").click(function () {
//        var language = $($(this).children(":last")[0]).html();
//        var param = { language: language }
//        $.ajax({
//            method: 'POST',
//            url: "default.aspx/UpdateLanguageCode",
//            data: JSON.stringify(param),
//            dataType: "json",
//            contentType: "application/json; charset=utf-8",
//            async: false,
//            success: function (response) {
//                if (response != null && JSON.parse(response.d).length > 0) {
//                }
//                else {

//                }
//            },
//            error: function errorCallback(response) {
//                console.log(response);
//            }


//        })

//        var text = $(this).html();
//        $(".dropdown dt a span").html(text);
//        $(".dropdown dd ul").hide();
//        //$("#result").html("Selected value is: " + getSelectedValue("sample"));
//        //*************************
//        var user = getCookie("Language_code");
//        if (user != "") {
//            //alert("Welcome again " + user);
//            user = getSelectedValue("sample");
//            if (user != "" && user != null) {
//                setCookie("Language_code", user, 7);
//                setCookie("Language_Name", getSelectedValue_languageName("sample"), 7);
//            }

//        } else {
//            //user = prompt("Please enter your name:", "");
//            user = getSelectedValue("sample");
//            if (user != "" && user != null) {
//                setCookie("Language_code", user, 7);
//                setCookie("Language_Name", getSelectedValue_languageName("sample"), 7);
//            }
//        }
//        //*************************
//       // alert("Selected value is: " + getSelectedValue("sample"));
//       // alert(window.location.href.replace('#', ''));
//        //location.reload(true);
//        //window.location.replace(window.location.href);
//       // window.location= window.location.href.replace('#', '');
//       // location.reload(true);
//        // $(location).attr('href', window.location.href.replace('#', ''));
//        window.location = window.location.href.replace('#', '');
//    });

//    function getSelectedValue(id) {
//        return $("#" + id).find("dt a span.value").html();
//    }

//    function getSelectedValue_languageName(id) {
//        return $(".preData a>span")[0].innerText;
//    }


//    $(document).bind('click', function (e) {
//        var $clicked = $(e.target);
//        if (!$clicked.parents().hasClass("dropdown"))
//            $(".dropdown dd ul").hide();
//    });

//    $(".dropdown img.flag").toggleClass("flagvisibility");
//}

function OnError(request, status, error) {
    loader.hideloader();
    alert(error + ',' + request.statusText);
    console.log('Error!! ' + request.statusText);
}
//************************End Ajax Call for acess data*********


 
 //********** Cookies Function***************
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//******************************************