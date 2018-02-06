/*
Script to handle the search functionality.

Functionality:
* If no search term, then dont render anything

* If search term present, display either results or
    - get parameters from url
    - intialise search function
    - ajax call to server using parameters from url
    - build up the html using templates
    - replace the html with the content
    - build the pagination with links
    - format data to present to the UI correctly
*/

var search = {

    /* init : initialisation of page */
    init: function() {
        "use strict";

        this.applySearch();
        this.bindUIEvents();
    },
    bindUIEvents : function(){
        $('.search-content input').on('keypress', function(e){
            if (e.which === 13) {
                window.location.href = '?query=' + $('.search-content input').val();
                return false;    //<---- Add this line
            }
        });
        $('.search-content .search-button').on('click', function(){
            window.location.href = '?query=' + $('.search-content input').val();
        });
        
        if($.urlParam('query') !== undefined && $.urlParam('query') !== 0 ){
            $('.search-content input').val($.urlParam('query'));
            this.updatePageResultsText();
        }else{
             $('.search-content input').val('');
        }
    },
    /*
    applySearch
    */
    applySearch : function(){

        var _self = this;

        //get the parameters to perform the search.
        var $query = $.urlParam('query');
        var $pageSize = $.urlParam('pageSize') === null ? 25 : $.urlParam('pageSize') ;
        var $pageNo = $.urlParam('pageNum') === null ? 1 : $.urlParam('pageNum') ;

        if($query !== null && $query.length > 0 ){

            $.ajax({
                url: '/database/api/certSummarySearch',
                //url  : '/data/results.json',
                data: {
                    query: $query,
                    pageNum : $pageNo,
                    limit : $pageSize
                },
                error: function(err) {
                    $('#count').text('0');
                    $('.error-message').html("An error occured. " + err).removeClass('hidden');
                },
                dataType: 'json',
                success: function(data) {
                    if(data.count > 0){
                        var $pages = Math.ceil(data.count/ $pageSize);

                        _self.renderResults($query, data);
                        //only show pagination if more than one page or results
                        if($pages > 1){
                            _self.renderPagination(data, $query, $pageNo, $pageSize, $pages);
                        }
                        $('.results-count').removeClass('hidden');
                        $('#count').text(data.count);
                    }else{
                        $('.no-results').removeClass('hidden');

                        $('.query-text').text($query);

                        if($query.length < 3){
                            $('.no-results div + span').html('<div>The search term "' + $query + '" is too broad.</div>Please try searching again with 3 or more characters.');
                        }
                    }
                   
                },
                type: 'GET'
            });
        }else{
            $('.results-count').addClass('hidden');
        }
    },
    /*
    renderPagination - render the results pagination
    */
    renderPagination : function(data, query, pageNo, pageSize, pages){
    
        //previous page link, if not the first page
        if(pageNo > 1){
           this.renderPaginationLink(query,parseInt(pageNo) - 1, pageSize, 'Prev', 'prev');
        }
        //code to work out the limited pagination - only show a few pages. 
        var maxNoOfPages = 7;
        var offsetPages = Math.floor(maxNoOfPages/2);
        var pageStart = pageNo > (offsetPages + 1) ? pageNo - offsetPages : 1;
        var currentMaxPagesToShow = maxNoOfPages + pageStart;
        
        if(parseInt(pageNo) >= pages || (pages - parseInt(pageNo)) < (maxNoOfPages - offsetPages)){
            pageStart = pages - maxNoOfPages + 1;
            currentMaxPagesToShow = pageStart + maxNoOfPages;
            if(parseInt(pageNo) >= pages){
                pageNo = pages;
            }
        }

        //one lnk for all of the available pages
        for(var i = pageStart ; i < currentMaxPagesToShow; i ++){
            var className = (i === pageNo) ? 'active' : '';
            this.renderPaginationLink(query, i, pageSize, i , className);
        }
        //pagination link - next - if its not the last item
        if(parseInt(pageNo) < pages){
            this.renderPaginationLink(query, parseInt(pageNo) + 1, pageSize, 'Next', 'next');
        }

    },
    /*
    renderPagingationLink - render the pagination links for all of the pages
    */
    renderPaginationLink : function (query, pageNo, pageSize, label, className){
        const paginationTemplate = this.getPaginationItemTemplate();
        var obj = {'class' : className, 'label': label, 'link': '?query=' + query + '&pageNum=' + pageNo + '&pageSize=' + pageSize};
        var output = paginationTemplate(obj);
        $(".search-pagination").append(output);
    },
    /*
    updatePageResultsText - update the text for the page title etc
    */
    updatePageResultsText : function(count){
        if(count === 1){
            $('.plural').hide();
        }
    },
    /*
    renderResults - render the results list
    */
    renderResults : function(query, data){
         var _self = this;
        $('.query-text').text(query);
        
        _self.updatePageResultsText(data.count);

        $.each(data.result, function(index, result){
            const resulttemplate = _self.getResultsItemTemplate();
            result.rdnId = Math.random().toString(36).substr(2, 10);
            const output = resulttemplate(result);
            $("#results-list").append(output);

            $("#results-list [data-detailsid='"+ result.rdnId  +"']").on('keypress', function(e){
                 if (e.which === 13) {
                    $(this).click();
                 }
            });

            $("#results-list [data-detailsid='"+ result.rdnId  +"']").click(function(){
                $('.search-results-list').find("[data-detailsid='" + result.rdnId + "']").closest('li').toggleClass('show-details');
                //update the text on show / hide details
                if($('.show-details .main-details .faux-link').length > 0){
                    $('.show-details .main-details .faux-link').text('hide');    
                }else{
                    $('.main-details .faux-link').text('details');
                }
            });
        });

        //Data correction
        //update undefined to not specified 
        $.each($( "#results-list li *:contains('null'), #results-list li *:contains('undefined')" ), function(index, result){
            if($(result).children().length === 0 ){
                $(result).text('Not specified');
            }
        });

        //update the date formats
        $.each($('.date'), function(index, result){
            $(result).text(_self.formatDate($(result).text()));
        });
    },
   
    /*
    the HTML template for the pagination items
    */
    getPaginationItemTemplate : function (){
        return this.templater`<li class="${'class'}"><a href="${'link'}">${'label'}</a></li>`;
    },
    /*
    the HTML template for the results list items
    */
    getResultsItemTemplate : function (){

        return this.templater` <li tabindex='0'>
        <div class="name">
        ${'CompanyName'}
        </div>
        <address>
        ${'CompanyAddress'}
        </address>
        <div class="sector">
            <label>Sector:</label>
            <span>${'Sector'}</span>
        </div>
        <div class="certificate-info">
            <div class="main-details">
                <label>Certificate no:</label>
                <span>${'ABCertificateReference'}</span>
                <span class="faux-link" data-detailsid="${'rdnId'}" tabindex='0' aria-polite='true' aria-description='Show and hide toggle the certificate details for ${'CompanyName'}'>details</span>
            </div>
            <div class="details-wrapper" id="${'rdnId'}">
                <div class="certification-level">
                <label>Certificate Level:</label>
                <span>${'CertificateLevel'}</span>
                </div>

                <div class="certification-date-issued">
                <label>Date issued:</label>
                <span class='date'>${'CertificationDate'}</span>
                </div>

                <div class="accreditor">
                <label>Accreditor:</label>
                <span>${'AccreditationBody'}</span>
                </div>

                <div class="scope">
                <label>Scope:</label>
                <span>${'Scope'}</span>
                </div>
            </div>
        </div>
    </li>`;

    },
    /*
    templater - function to replace template items with the object strings
    */
    templater : function(strings, ...keys) {
        return function(data) {
            let temp = strings.slice();
            keys.forEach((key, i) => {
                temp[i] = temp[i] + data[key];
            });
            return temp.join('');
        };
    },  
    /*
    padNumber - for formatting output - add 0's to the date where month or day is less than 10
    */
    padNumber : function (str, max) {
        str = str.toString();
        return str.length < max ? this.padNumber("0" + str, max) : str;
    }, 
    /*
    formatDate - for formatting output. Format JSON date as per the required designs. 
    */
    formatDate : function(dateToFormat){
        var formattedDate = new Date(dateToFormat);
        var d = formattedDate.getDate();
        var m =  formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        var y = formattedDate.getFullYear();

        return this.padNumber(d, 2) + '/' + this.padNumber(m, 2) + '/' + y;
    }
};

/* initialise the UI behaviour on page load */
(function() {
    search.init();
}());
