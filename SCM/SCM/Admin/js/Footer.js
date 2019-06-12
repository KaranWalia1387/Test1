var dt_result;
var copyright = '';


$(document).ready(function () {
    loadfooterdata();
});
function loadfooterdata() {
    try {
      
        var Mode = 2;
        var param = { 'mode': Mode };
    
        $.ajax({
            type: "POST",
         
            url: $('#hdnCommonUrl').val()+"/Configuration/configure-socialmedia.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
            
                data = data.d;
                var result = $.parseJSON(data);
                dt_result = result.Table;
                var rbchecked = '';  //dt_ContactInformation = result.Table1;
                if (dt_result != null) {
                   copyright=(dt_result[0]["CopyRight"]);
                   $(".copy-right").html(copyright.replace('YYYY', $('.spanyear').text()));
                }
                

            },
            error: function (request, status, error) { //alert('Error!! ' + request.statusText);
            }
        });
    }
    catch (e) { }
}