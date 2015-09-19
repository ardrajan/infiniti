(function ($) {
    // Variables for optimization
    var projectsGrid = $('.projects-grid');
    var modalTitle = $('.modal-title');
    var modalBody = $('.modal-body');
    var caseStudySection = $('#case-study');
    var modalCloseButton = $('.close');
    var breathePreloader = $('#preloader-container');

    // Show preloader image while images are being downloaded
    $('body').imagesLoaded()
    .always( function( instance ) {
        console.log('All images loaded');
    })
    .done( function( instance ) {
        breathePreloader.hide();
        $('#portfolio-wrapper').show();
    })
    .fail( function() {
        console.log('All images loaded, at least one is broken');
    })
    .progress( function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'Image is ' + result + ' for ' + image.img.src );
    });

    // Get the JSON data
    var jsonURL = 'public/data/projects.json';

    $.getJSON(jsonURL, function(){})
    // JSON fetch is unsuccessful
    .fail(function() {
        console.log('JSON fetch failed');
    })
    // JSON fetch is successful
    .done(function(projectData) {
        console.log('JSON fetch successful');

        // Grab the template script
        var projectCardTemplateScript = $("#project-card-template").html();

        // Compile the template
        var projectCardTemplate = Handlebars.compile(projectCardTemplateScript);

        //Pass our data to the template
        var projectCardCompiledHtml = projectCardTemplate(projectData);

        // Add the compiled html to the page
        projectsGrid.html(projectCardCompiledHtml);

        // Click event for getting JSON data corresponding clicked element
        projectsGrid.on('click', '.project-card', function(e) {
            // Get the index of the parent of the clicked element
            var index = $(this).parent().index();
            // Get data corresponding to the clicked element
            var clickedCardData = projectData.portfolioProjects[index];
             // Set project title
            modalTitle.text(clickedCardData.title);

            // Grab the template script for the modal body
            var projectCardDetailsTemplateScript = $("#project-card-details-template").html();

            // Compile the template
            var projectCardDetailsTemplate = Handlebars.compile(projectCardDetailsTemplateScript);

            // Pass our data to the template (corresponding to clicked card)
            var projectCardDetailsCompiledHtml = projectCardDetailsTemplate(clickedCardData);

            // Add the compiled html to the modal body
            modalBody.html(projectCardDetailsCompiledHtml);
        });
    });

    // Click event for attaching the case study details when the case study button is clicked
    $('#case-study-button').on('click', function() {
        modalTitle.text('mCLASS:CIRCLE');
        caseStudySection.show();
        modalBody.html(caseStudySection);
        modalCloseButton.on('click', function() {
            caseStudySection.hide();
            $(this).off('click');
        });
    });
}(jQuery));
