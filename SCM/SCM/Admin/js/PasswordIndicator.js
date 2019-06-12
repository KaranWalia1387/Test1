(function ($, window, document, undefined) {

    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: $('#ML_passwordmeter_lbl_show').text(), //'Show Password',
            strengthButtonTextToggle: $('#ML_passwordmeter_lbl_hide').text() //'Hide Password'
        };

    // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {


            // added for spanish text translation 
            // button for show/hide
            this.options.strengthButtonText = "Show Password";//$('#ML_passwordmeter_lbl_show').text();
            this.options.strengthButtonTextToggle = "Hide Password";// $('#ML_passwordmeter_lbl_hide').text();
            var isShown = false;
            var strengthButtonText = this.options.strengthButtonText;
            var strengthButtonTextToggle = this.options.strengthButtonTextToggle;


            thisid = this.$elem.attr('id');

            this.$elem.addClass(this.options.strengthClass).attr('data-password', thisid).after('<input style="display:none" class="' + this.options.strengthClass + '" data-password="' + thisid + '" id="txtpasswordmeter" title="New Password" globalize="ML_CHANGEPWDPOPUP_NEWPWD" type="text" name=""  mandatory="0" maxlength="16" value=""><div class=strengthdiv><a data-password-button="' + thisid + '" href="" class="' + this.options.strengthButtonClass + '">' + this.options.strengthButtonText + '</a></div>');

            function hidePwIndctrDiv() {
                $('#pswd_info').hide();
            }

            function showPwIndctrDiv(pswd) {
                $('.pswd_info_label').removeClass('valid').addClass('invalid');
                $('#pswd_info').show();
                setDivBelowTextBox();
                addValidInvalid(pswd)
            }
            function addValidInvalid(pswd) {
                try {


                    var specialchars = new RegExp('([@,#,$,&,%,*,!])');
                    if (pswd.length < 8) {
                        $('#length').removeClass('valid').addClass('invalid');
                    } else {
                        $('#length').removeClass('invalid').addClass('valid');
                    }

                    //validate letter
                    if (pswd.match(/[A-z]/)) {
                        $('#letter').removeClass('invalid').addClass('valid');
                    } else {
                        $('#letter').removeClass('valid').addClass('invalid');
                    }

                    //validate capital letter
                    if (pswd.match(/[A-Z]/)) {
                        $('#capital').removeClass('invalid').addClass('valid');
                    } else {
                        $('#capital').removeClass('valid').addClass('invalid');
                    }

                    //validate number
                    if (pswd.match(/\d/)) {
                        $('#number').removeClass('invalid').addClass('valid');
                    } else {
                        $('#number').removeClass('valid').addClass('invalid');
                    }

                    if (pswd.match(specialchars)) {
                        $('#specialChar').removeClass('invalid').addClass('valid');
                    } else {
                        $('#specialChar').removeClass('valid').addClass('invalid');
                    }

                }
                catch (e) {
                    console.log(e);
                }
            }
            this.$elem.bind('keyup keydown', function (event) {
                thisid = this.id;
                thisval = $('#' + thisid).val();
                $('input[type="text"][data-password="' + thisid + '"]').val(thisval);
                // check_strength(thisval, thisid);
                setDivBelowTextBox();
                addValidInvalid(thisval);
            }).focus(function () {
                //$('#pswd_info').show();
                thisid = this.id;
                thisval = $('#' + thisid).val();
                showPwIndctrDiv(thisval);
            }).blur(function () {
                hidePwIndctrDiv();
                //$('#pswd_info').hide();
            });;


            // if keypress or keydown event is performed in the textbox
            $('input[type="text"][data-password="' + thisid + '"]').bind('keyup keydown', function (event) {
                var idpass = this.id;
                thisid = $('#' + idpass).attr('data-password');
                thisval = $('#' + idpass).val();
                $('#' + thisid).val(thisval);
                // check_strength(thisval, thisid);
                setDivBelowTextBox();
                addValidInvalid(thisval);
            }).focus(function () {
                //$('#pswd_info').show();
                var idpass = this.id;
                thisid = $('#' + idpass).attr('data-password');
                thisval = $('#' + idpass).val();
                showPwIndctrDiv(thisval);
            }).blur(function () {
                hidePwIndctrDiv();
                //$('#pswd_info').hide();
            });

            function setDivBelowTextBox() {
                try {
                    var textbox = jQuery("#"+thisid);
                    var offset = textbox.offset();
                    $('#pswd_info').css({
                        "left": (offset.left-100)+"px",
                        "top": (offset.top + 40) + "px",
                        
                    })
                } catch (e) {
                    console.log(e);
                }
            }

            $(document.body).on('click', '.' + this.options.strengthButtonClass, function (e) {
                e.preventDefault();

                thisclass = 'hide_' + $(this).attr('class');
                thisid = $(this).attr('data-password-button');
                if (isShown) {
                    $('input[type="text"][data-password="' + thisid + '"]').hide();
                    $('input[type="password"][data-password="' + thisid + '"]').show().focus();
                    $('a[data-password-button="' + thisid + '"]').removeClass(thisclass).html(strengthButtonText);
                    isShown = false;

                } else {
                    $('input[type="text"][data-password="' + thisid + '"]').show().focus();
                    $('input[type="password"][data-password="' + thisid + '"]').hide();
                    $('a[data-password-button="' + thisid + '"]').addClass(thisclass).html(strengthButtonTextToggle);
                    isShown = true;

                }



            });


        },

        yourOtherFunction: function (el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);