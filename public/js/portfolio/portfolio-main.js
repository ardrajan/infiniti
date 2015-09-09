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
    // Get the JSON data
    var projectData;
    $.getJSON('public/data/projects.json', function(data) {
        // Render the template for the projects grid
        projectData = data;
        console.log(projectData.portfolioProjects[0]);

        // Grab the template script
        var projectCardTemplateScript = $("#project-card-template").html();

        // Compile the template
        var projectCardTemplate = Handlebars.compile(projectCardTemplateScript);

        // // Pass our data to the template
        var projectCardCompiledHtml = projectCardTemplate(projectData);

        // Add the compiled html to the page
        $('.projects-grid').html(projectCardCompiledHtml);

        // On click event for getting JSON data corresponding clicked element
        $('.projects-grid').on('click', '.project-card', function(e){
            // Get the index of the parent of the clicked element
            var index = $(this).parent().index();
            // Get data corresponding to the clicked element
            var clickedCardData = projectData.portfolioProjects[index];
             // Project title
            $('.modal-title').text(clickedCardData.title);
            // Project description
            $('.project-description').text(clickedCardData.description);
            // Role on project
            $('.role').text(clickedCardData.role);

            // Grab the template script
            var projectCardDetailsTemplateScript = $("#project-card-details-template").html();
            console.log(projectCardDetailsTemplateScript);

            // Compile the template
            var projectCardDetailsTemplate = Handlebars.compile(projectCardDetailsTemplateScript);

            // // Pass our data to the template
            var projectCardDetailsCompiledHtml = projectCardDetailsTemplate(clickedCardData);

            // Add the compiled html to the page
            $('.project-details').html(projectCardDetailsCompiledHtml);
        });
    });
}(jQuery));
