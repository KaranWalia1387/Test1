$(document).ready(function () {
    //TranslateMultiLingualControls();
    $('#txtphone1').mask('(000) 000-0000');
    $('#btnSubmitPayment').click(function () {       
        var ispagevalid = ValidateAllPageFieldsSingleMessage('logincredentials');
        if (ispagevalid) {  
                var result = Onetimepayment.validateonetimepayment($(".txtPhone").val(), $("#txtAccountNumber").val()).value;
                if (result.Rows[0]["STATUS"] == "0") {
                    toastr.error(result.Rows[0]["Message"])
                  // w2alert(result.Rows[0]["Message"]);
                    return false;
                }
                else
                {
                    return true;
                }
        }
        else {
            return false;
        }
    });

});

window.onload = function () {
    var seconds = 3;
    setTimeout(function () {
        document.getElementById('lblMsg').style.display = "none";
    }, seconds * 1000);
    $('#txtPhoneNumber').mask('(000) 000-0000');
};

//This method is created to validate different phone number format.
//BUG ID 5363 STARTS
//function validatePhone(phoneField, format) {
//    var num = phoneField.value.replace(/[^\d]/g, '');
//    //if(num.length != 10) {
//    //    //Alert the user that the phone number entered was invalid.
//    //    alert('Please enter a valid phone number including area code');                   
//    //} else {
//    //Email was valid.  If format type is set, format the Phone to the desired style.
//    switch (format) {
//        case '0': //Format (xxx)-xxx-xxxx
//            phoneField.value = "(" + num.substring(0, 3) + ")-" + num.substring(3, 6) + "-" + num.substring(6);
//            break;
//        case '1': //Format xxx-xxx-xxxx
//            if (phoneField.value.length > 9) {
//                phoneField.value = num.substring(0, 3) + "-" + num.substring(3, 6) + "-" + num.substring(6);

//            }
//            break;
//        default: //Format xxxxxxxxxx
//            phoneField.value = num;
//            break;
//    }
//    //}
//}