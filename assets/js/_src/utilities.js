"use strict";

function initialiseEmbeddedSearch(){

    if($('.search-content input').length > 0){
         $('.search-content input').on('keypress', function(e){
            if (e.which === 13) {
                window.location.href = '/cert-search/?query=' + $('.search-content input').val();
                return false;    //<---- Add this line
            }
        });
        $('.search-content .search-button').on('click', function(){
            window.location.href = '/cert-search/?query=' + $('.search-content input').val();
        });
    }
}
function initialiseResponsiveTables(){
    if($('table').length > 0){
        $.each($('table'), function(index, table){
            var headers =  $(table).find(' > thead > tr > th');
            var rows =  $(table).find(' > tbody > tr');
            var thArray = [];
            headers.each(function(){
                thArray.push($(this).text());
            });

            rows.each(function(){
                $(this).find('td').each(function(index){
                    if(thArray[index] !== undefined){
                        $(this).prepend("<b class='ui-table-cell-label'>" + thArray[index] + "</b>");
                    }
                    
                    if($(this).text().trim().length === 0){
                        $(this).addClass('unspecified').text().trim();
                    }
                });
            });
        });
    }
}
function createCookie(name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";";

    if (expires) {
      // If it's a date
      if(expires instanceof Date) {
        // If it isn't a valid date
        if (isNaN(expires.getTime()))
         expires = new Date();
      }
      else
        expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

      cookie += "expires=" + expires.toGMTString() + ";";
    }

    if (path)
      cookie += "path=" + path + ";";
    if (domain)
      cookie += "domain=" + domain + ";";

    document.cookie = cookie;
  }

  function getCookie(cookieName) {
    var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
    var sMatch = (' '+document.cookie).match(re);
    if (cookieName && sMatch) return unescape(sMatch[1]);
    return '';

    //var result = regexp.exec(document.cookie);
    //return (result === null) ? null : result[1];
  }


function initialiseFeedbackBanner(){

    $('.page + #feedback-banner').removeClass('hidden');

    var cookie  = getCookie("cookie_feedback");
    if(!cookie){
        $('#feedback-banner').removeClass('hidden');
    }
}

function initialiseCookieBanner(){
    var cookie  = getCookie("cookie_consent");
    if(!cookie){
        $('.cookie-consent-container').toggleClass('show-cookie-consent');
    }else{
        $('.cookie-consent-container').addClass('hidden')    ;
    }
}
function gotoPost(url){
    window.location.href = url;
}
function dismissFeedback(){
    createCookie('cookie_feedback', 'hide', null, '/', document.domain);
   $('#feedback-banner').remove();
}

function acceptCookies(){
    createCookie('cookie_consent', '1505749976', null, '/', document.domain);
    $('.cookie-consent-container').addClass('hidden').removeClass('show-cookie-consent'); 
}


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results===null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
};

function redirect(){
    var $link = $.urlParam('link') ;
    window.setTimeout(function() {
        window.location.href = $link;
    });
}

$('#redirectModal').on('hidden.bs.modal', function () {
    var modal = $('.modal');
    modal.find('.subtitle .name').text('');  
    modal.find('.modal-title .name').text('');
    
    modal.find('.header-image-wrapper .no-image-text').text('');
    modal.find('.header-image-wrapper .no-image-text').show();
    modal.find('img').hide();
    modal.find('a.continue').attr('href', '');

});

$('#redirectModal').on('shown.bs.modal', function (event) {

    var modal = $(this);

    var el = $(event.relatedTarget); // Button that triggered the modal
    //get the variables
    var title = el.data('affiliate-name');
    var link = el.data('affiliate-link');
    var image = el.data('affiliate-image'); 

    if(image === undefined || image === ''){        
        modal.find('.header-image-wrapper .no-image-text').show().text(title);
        modal.find('img').hide();
    }else{
        modal.find('img').show().attr('src', image).attr('alt', title + ' logo');
        modal.find('.header-image-wrapper .no-image-text').hide();
    }

    modal.find('.modal-title .name').text(title);
    modal.find('.subtitle .name').text(title);    
    modal.find('a.continue').attr('href', link);
 
    //delay to avoid jumpiness
    setTimeout(function(){
        modal.find('.modal-dialog').css('opacity', 1);
    }, 500);
    
    $('#redirectModal').focus();
});



function triggerBrowserDetect(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}

function callBrowserDetect(){
    triggerBrowserDetect(function(){
        outdatedBrowser({
            bgColor: '#1b1b1b',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: './assets/outdatedbrowser/lang/en.html'
        });
    });
}

//Detects whether the user is using IE, and which version.
//Not best practice but required to tweak slight graphical differences.
function ieDetect(){
    var uA = navigator.userAgent;

    if(uA.indexOf("Edge/") >0 ){
        $('html').addClass('ms_edge');
    }
    else if (uA.indexOf("rv:") > 0){
        $('html').addClass("ie-11");
    }
    else if (uA.indexOf("MSIE 10.") > 0){
        $('html').addClass("ie-10");
    }
    else if (uA.indexOf("MSIE 9.")> 0){
        $('html').addClass("ie-9");
    }
    else if (uA.indexOf("MSIE 8.") > 0 ){
        $('html').addClass("ie-8");
        callBrowserDetect();
    }
    else if (uA.indexOf("MSIE 7.") > 0 ){
        $('html').addClass("ie-7");
        callBrowserDetect();
    }
    else if (uA.indexOf("MSIE") > 0){
        $('html').addClass("ie-old");
        callBrowserDetect();
    }
}

//run the functions on page ready

$(document).ready(function() {
    
    ieDetect();  
    initialiseCookieBanner();
    initialiseFeedbackBanner();
    initialiseResponsiveTables();
    initialiseEmbeddedSearch();
    if($('#redirect').length > 0 ){
        redirect();
    }
});