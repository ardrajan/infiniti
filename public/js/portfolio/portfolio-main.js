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

    console.log("hi");
    // Get the JSON
    var projectData;
    $.getJSON('public/data/projects.json', function(data) {
        // Render the template for the projects grid
        projectData = data;
        console.log(projectData);

        // Grab the template script
        var theTemplateScript = $("#project-card-template").html();

        // Compile the template
        var theTemplate = Handlebars.compile(theTemplateScript);

        // // Pass our data to the template
        var theCompiledHtml = theTemplate(projectData);

        // Add the compiled html to the page
        $('.projects-grid').html(theCompiledHtml);
    });
}(jQuery));
