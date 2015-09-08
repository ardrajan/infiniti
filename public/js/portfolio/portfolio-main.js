(function ($) {
    // Custom transform and opacity modifier for Stellar.js
    $.stellar.positionProperty.transfade = {
            setPosition: function(element, newLeft, originalLeft, newTop, originalTop) {
            var distance = newTop - originalTop;
            var rate = $(window).height() / 5;
            element.css('transform', 'translate3d(0, ' + distance + 'px, 0').css('opacity', 1 - (distance / rate));
        }
    };

    $.stellar({
        horizontalOffset: 50,
        verticalOffset: 150,
        positionProperty: 'transfade',
    });

    // Get the JSON
    var projectData;
    $.getJSON('public/data/projects.json', function(data) {
        projectData = data;
    });
    console.log(projectData);

    // Grab the template script
    var theTemplateScript = $("#project-card-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    // var context={
    // "city": "London",
    // "street": "Baker Street",
    // "number": "221B"
    // };

    // // Pass our data to the template
    // var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    // $('.content-placeholder').html(theCompiledHtml);
    $('.projects-grid').html(theTemplate);

}(jQuery));
