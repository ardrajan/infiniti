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

    // Variables for optimization
    var projectsGrid = $('.projects-grid');
    var modalTitle = $('.modal-title');
    var modalBody = $('.modal-body');

    // Get the JSON data
    var projectData;

    $.getJSON('public/data/projects.json', function(data) {
        // Render the template for the projects grid
        projectData = data;

        // Grab the template script
        var projectCardTemplateScript = $("#project-card-template").html();

        // Compile the template
        var projectCardTemplate = Handlebars.compile(projectCardTemplateScript);

        // // Pass our data to the template
        var projectCardCompiledHtml = projectCardTemplate(projectData);

        // Add the compiled html to the page
        projectsGrid.html(projectCardCompiledHtml);

        // On click event for getting JSON data corresponding clicked element
        projectsGrid.on('click', '.project-card', function(e){
            // Get the index of the parent of the clicked element
            var index = $(this).parent().index();
            // Get data corresponding to the clicked element
            var clickedCardData = projectData.portfolioProjects[index];
             // Project title
            modalTitle.text(clickedCardData.title);

            // Grab the template script for the modal body
            var projectCardDetailsTemplateScript = $("#project-card-details-template").html();

            // Compile the template
            var projectCardDetailsTemplate = Handlebars.compile(projectCardDetailsTemplateScript);

            // // Pass our data to the template (corresponding to clicked card)
            var projectCardDetailsCompiledHtml = projectCardDetailsTemplate(clickedCardData);

            // Add the compiled html to the modal body
            modalBody.html(projectCardDetailsCompiledHtml);
        });
    });
}(jQuery));
