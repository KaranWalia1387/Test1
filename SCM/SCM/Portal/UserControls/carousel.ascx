﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="carousel.ascx.cs" Inherits="CustomerPortal.UserControls.carousel" %>
<script src="js/jssor.slider.mini.js"></script>

<!-- Arrow Navigator Skin Begin -->
<style type="text/css">
    /* jssor slider arrow navigator skin 11 css */
    /*
                .jssora11l              (normal)
                .jssora11r              (normal)
                .jssora11l:hover        (normal mouseover)
                .jssora11r:hover        (normal mouseover)
                .jssora11ldn            (mousedown)
                .jssora11rdn            (mousedown)
                */
    .jssora11l, .jssora11r, .jssora11ldn, .jssora11rdn
    {
        position: absolute;
        cursor: pointer;
        display: block;
        background: url(images/a11.png) no-repeat;
        overflow: hidden;
    }

    .jssora11l
    {
        background-position: -16px -34px;
    }

    .jssora11r
    {
        background-position: -66px -34px;
    }

    .jssora11l:hover
    {
        background-position: -136px -34px;
    }

    .jssora11r:hover
    {
        background-position: -186px -34px;
    }

    .jssora11ldn
    {
        background-position: -251px -34px;
    }

    .jssora11rdn
    {
        background-position: -311px -34px;
    }
</style>
<!-- Arrow Navigator Skin End -->
<!-- Bullet Navigator Skin Begin -->
<style type="text/css">
    /* jssor slider bullet navigator skin 05 css */
    /*
                .jssorb05 div           (normal)
                .jssorb05 div:hover     (normal mouseover)
                .jssorb05 .av           (active)
                .jssorb05 .av:hover     (active mouseover)
                .jssorb05 .dn           (mousedown)
                */
    .jssorb05 div, .jssorb05 div:hover, .jssorb05 .av
    {
        background: url(images/b05.png) no-repeat;
        overflow: hidden;
        cursor: pointer;
    }

    .jssorb05 div
    {
        background-position: -7px -7px;
    }

        .jssorb05 div:hover, .jssorb05 .av:hover
        {
            background-position: -37px -7px;
        }

    .jssorb05 .av
    {
        background-position: -67px -7px;
    }

    .jssorb05 .dn, .jssorb05 .dn:hover
    {
        background-position: -97px -7px;
    }

    .jssorb05
    {
        bottom: 1px !important;
    }

    #slider1_container
    {
        position:relative;
    }

    #slider2_container
    {
        overflow:visible !important;
        position:relative;
    }
</style>
<!-- bullet navigator container -->


<script type="text/javascript">
    jQuery(document).ready(function ($) {
        var options = {
            $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
            $AutoPlayInterval: 3000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            $PauseOnHover: 1,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
            $SlideEasing: $JssorEasing$.$EaseOutQuint,          //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
            $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
            $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
            //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
            //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
            $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
            $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
            $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

            $ArrowNavigatorOptions: {                           //[Optional] Options to specify and enable arrow navigator or not
                $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                $Scale: false                                   //Scales bullets navigator or not while slider scale
            },

            $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 12,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 4,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1,                                //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                $Scale: false                                   //Scales bullets navigator or not while slider scale
            }
        };

        var arrcarosuel = new Array;

        for (var i = 0; i < arrcarosuelid.length; i++) {
            //Make the element 'slider1_container' visible before initialize jssor slider.
            $("#" + arrcarosuelid[i]).css("display", "block");
            var jssor_slider1 = new $JssorSlider$(arrcarosuelid[i], options);
            arrcarosuel.push(jssor_slider1);
        }


        //Make the element 'slider1_container' visible before initialize jssor slider.
        //$("#slider1_container").css("display", "block");
        //var jssor_slider1 = new $JssorSlider$("slider1_container", options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizes
        function ScaleSlider() {
            for (var i = 0; i < arrcarosuel.length; i++) {
                var parentWidth = arrcarosuel[i].$Elmt.parentNode.clientWidth;
                if (parentWidth) {
                    arrcarosuel[i].$ScaleWidth(parentWidth - 30);
                }
                else
                    window.setTimeout(ScaleSlider, 30);
            }
        }
        ScaleSlider();

        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    });
</script>
