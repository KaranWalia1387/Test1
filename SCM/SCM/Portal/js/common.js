var googleApiKey = 'AIzaSyBDgYVNgToR6YSwvF3Dh7zBQyW2V_gJUCg';
var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var full_monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var AttachmentUrl = "";

function changeactivelinkcolor() {

    try{
    if ($(".activeli_list").val() != null && $(".activeli_list").val() != undefined) {
        var objli = $(".activeli_list").val().split(',');
        $(objli).each(function (i, obj) {
            $("." + obj + ' a').addClass('active');
        });
    }
    }
    catch (ex) {
        var msg = ex.message;
        console.log(msg);
    }
}


function ValidateBuiltyear() {
    if ($('#divPower').css('display') != 'none') {
        if ($('[id$=txtYearbuilt]').val() != '') {
            var currYear = new Date().toString().match(/(\d{4})/)[1];
            var msg_invalidyr = $('#spinvalidkey').text();
            if ($('[id$=txtYearbuilt]').val() <= 1900 || $('[id$=txtYearbuilt]').val() > currYear) {
                error.showerror($('[id$=txtYearbuilt]'), msg_invalidyr);
                return false;
            }           
        }
     
        return true;
    }
    else
        return true;
}

function HideAllSubmitButton()
{
    $('input[type=button],input[type=submit]').each(function () {
      //  $(this).hide();
    })
}

$(document).ready(function () {
    changeactivelinkcolor();

    $('input[type=text]').bind("drop", function (e) {
        e.preventDefault();
    });

    $('input[type=password]').bind("drop", function (e) {
        e.preventDefault();
    });

    AttachmentUrl = "Upload.ashx?";
    //AttachmentPdfUrl = Master.GetPdfAttachmentURL().value;
 //   AttachmentPdfUrl="Upload.ashx?"
    toastrNotify();
    var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
    $('input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"]').each(function () {
        $(this).after(mandatoryHtml);
    });
    var v = 0;
    $('#BtnSubmitComment').click(function () {
        if (flag == true) {
            //$.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
            return true;
        }
        else {
            return false;
        }
    });


    $('.roImages img').bind('mouseover mouseout', (function () {
        if (this.src.indexOf('_ro.png') > 0) {
            this.src = this.src.replace('_ro.png', '.png');
        } else {
            this.src = this.src.replace('.png', '_ro.png');
        }
    }));


    if ($('#searchGoogleMap')[0]) {

        $('#searchGoogleMap').bind('click', (function () {
            searchMap();
        }));
    }
    changeactivelinkcolor();
});

var lastClickedDivVal = null;

function markMandatory(tblId,legendId)
{
    var mandatoryCtrlcnt=$('#'+tblId+' input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"]').length;
    var totalCtrlcnt = $('#'+tblId+' input[type="Text"],textarea,select').length
    if (mandatoryCtrlcnt == totalCtrlcnt) {
        $('#' + legendId).html('All fields are mandatory.');
        $('.required').hide();
    }
    else
    {
        $('#' + legendId).html('');
        $('#' + legendId).hide();
        $('#required').show();
    }
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "*" + s;
    return s;
}

//This method is used for googlemap searching for both cases(i.e on enter press and on mouse click)
function searchMap() {
    var nodes = comMessages.searchGoogleMap($.trim($('#txtGoogleSearch').val())).value;
    var xml = nodes,
            xmlDoc = $.parseXML(xml),
            $xml = $(xmlDoc),
            $status = $xml.find("status");
    if ($status.text() == "OK") {
        loadSearchedMap(nodes);

        $('#txtGoogleSearch').focus();
    }
    else {
        toastr.warning('Please enter a City Name or ZIP Code.');

        $('#txtGoogleSearch').focus();
        return false;
    }
    if (getPageName($(location).attr('pathname')) == "chargingstations") {
        $('#LeftPanel').find('div[class^="MessageContainer"]').click(function () {
            lastClickedDivVal = $(this).find('input[type="hidden"]').val();
            getCurrentLoc(PEVLocations, true);
        });
    }
}

//This function is used to check the enter key press in case of google map searching.
function chkKey(e) {
    var code = e.which || event.keyCode;
    if (code == 13) {
        searchMap();

        $('#txtGoogleSearch').focus();
        return false;
    }
}

function getPageName(url) {
    url = url.substring(url.lastIndexOf('/') + 1);
    url = url.substring(0, url.lastIndexOf('.'));
    return url.toLowerCase();
}

function GetCurrentTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    if (minutes < 10)
        minutes = "0" + minutes

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }

    return hours + ":" + minutes + " " + suffix;
}

function getMonthName(monthIndex) {
    if ($('#hdnLanguageCode').val() == 'EN') {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";
    }
    else {
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Diciembre";
        return monthIndex > 0 || monthIndex < 13 ? month[monthIndex - 1] : "error in index";
    }

}

function loadSearchedMap(xmlString) {
    var mapOptions = {
        zoom: 12,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($('.map_canvas')[0], mapOptions);


    var parsedNodes = $.parseXML(xmlString);

    var pos;
    var index = 0;
    $(parsedNodes).find('result').each(function () {

        pos = new google.maps.LatLng($(this).find('geometry>location>lat').text(), $(this).find('geometry>location>lng').text());

        var marker = new Array();
        var infowindow = new Array();
        marker[index] = new google.maps.Marker({
            position: pos,
            map: map,
            icon: 'images/pin.svg',
            zIndex: index
        });

        infowindow[index] = new google.maps.InfoWindow({
            content: '<div class="markerwindow" style="width:230px;text-align: -webkit-center;">' + $.trim($('#txtGoogleSearch').val()) + '</div>'
        });

        var lastIndex = 0;
        google.maps.event.addListener(marker[index], 'click', function () {
            var currentIndex = this.getZIndex();
            //infowindow[lastIndex].close();
            // Calling the open method of the infoWindow 
            infowindow[currentIndex].open(map, marker[currentIndex]);
            lastIndex = currentIndex;
        });
        index++;
    });
    map.setCenter(pos);
}

//This method is using for EnergyEfficiency module search functionality feature. 
function chksearchkey(e) {
    var code = e.which || event.keyCode;
    if (!(code == 13))
    { return true; }
    return LoadSearchData();
}

function checkQueryString() {
    var field = 'pid';
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1)
        return true;
    else if (url.indexOf('&' + field + '=') != -1)
        return true;
    return false
}

function imgErrorBanner(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    return true;
}
// for dashboards banner 
function imgErrorBanner1(image) {
    image.onerror = "";
    image.src = "images/no_img.png";
    image.className = "no_img_css";
    return true;
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            if (input.files[0].type.split('/')[0].indexOf('image') > -1) {
                $('.imgPrev')[0].src = e.target.result;
                $(".imgPrev").show();
            }
            else {
                $(".imgPrev").hide();
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function validatePhone(phoneField, format) {
    var num = phoneField.value.replace(/[^\d]/g, '');

    switch (format) {
        case '0': //Format (xxx)-xxx-xxxx
            phoneField.value = "(" + num.substring(0, 3) + ")-" + num.substring(3, 6) + "-" + num.substring(6);
            break;
        case '1': //Format xxx-xxx-xxxx
            if (phoneField.value.length > 9) {
                phoneField.value = num.substring(0, 3) + "-" + num.substring(3, 6) + "-" + num.substring(6);

            }
            break;
        default: //Format xxxxxxxxxx
            phoneField.value = num;
            break;
    }
    //}
}


function BannerClick(Banner) {
    var BannerId = '';
    switch (Banner) {
        case 'BannerDashboard':
            BannerId = 1;
            break;
        case 'IDBannerSettings':
            BannerId = 2;
            break;
        case 'IDBannerUsage':
            BannerId = 8;
            break;
        case 'IDBannerCompare':
            BannerId = 4;
            break;
        case 'IDBannerCompareI':
            BannerId = 8;
            break;
        case 'IDBannerConnectMe':
            BannerId = 5;
            break;
        case 'IDBannerBilling':
            BannerId = 3;
            break;
        case 'IDBannerEV':
            BannerId = 6;
            break;
        case 'IDBannerEVI':
            BannerId = 7;
            break;
            
    }

    var param = {
        BannerID: BannerId,
        IsShow: 1,
        ISclick: 1,
        Page: jQuery(location).attr('href'),
    }
    $('#IDBannerHref').removeAttr("href");
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/SetbannersCount",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var URL = "#";
            var target = "";
            var JSONRes = $.parseJSON(response.d).Table;
            
            if (JSONRes[0].Status)
                URL = JSONRes[0].LinkURL;
            if (URL != "#") {
                if (!JSONRes[0].NavigationMode)
                    target = "_parent";
                else
                    target = "_blank";
            }
            $('#IDBannerHref').attr('href', "http://" + URL);
            $('#IDBannerHref').attr('target', target);
            window.open(URL, target);
            loader.hideloader();
            return false;
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    });
}
// added to show confirm popup toastr in the middle
function toastrConfirmPopup() {
    try{
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "onclick": null,
            "positionClass": "toast-middle-center",
            "preventDuplicates": true,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "5000",
            "showEasing": "swing",
            "hideEasing": "swing",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    } catch (e) {

    }
}
// to simple messages through toastr
function toastrNotify() {
    try{
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "onclick": null,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": true,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "5000",
            "showEasing": "swing",
            "hideEasing": "swing",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    } catch (e) {

    }
}

function GetFileTypeIcon(attachmentExtension) {
    try {
        var classExten = '';
        switch (attachmentExtension) {
            case "gif": case "png": case "bmp": case "jpeg": case 'jpg':
                classExten = "fa-file-image-o";
                break;
            case "pdf":
                classExten = "fa-file-pdf-o "
                break;
            case "doc": case "docx":
                classExten = "fa-file-word-o";
                break;

            case "txt": case "rtf":
                classExten = "fa-file-text";
                break;
            case "xls": case "xlsx":
                classExten = "fa-file-excel-o ";
                break;
            default:
                classExten = "fa-paperclip";


        }
        return classExten;

    } catch (e) {
        console.log(e.message);
    }
}
//$(document).ready(function () {
//    $('#ddlAddress').change(function () {
//        $(this).val().split(':')[7].trim();
//        //common.SetMeterType($(this).val().split(':')[7].trim());
//        $.ajax({
//            type: "POST",
//            url : "Master.Master/SetMeterType",
//            contentType: "application/json; charset=utf-8",
//            datatype: "json",
//            data: '{MeterType: "' + $(this).val().split(':')[7].trim()+ '" }',
//            success: function (data) { },
//            error: function () { }
//        });
//        alert("test message" + $(this).val());
//    });

//});