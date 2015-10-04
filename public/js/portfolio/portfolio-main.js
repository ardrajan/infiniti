(function ($) {
    // Variables for optimization
    var projectsGrid = $('.projects-grid');
    var modalTitle = $('.modal-title');
    var modalBody = $('.modal-body');
    var caseStudySection = $('#case-study');
    var modalCloseButton = $('.close');
    var breathePreloader = $('#preloader-container');

    // Variable for holding JSON data
    var projectData;

    // Variables for preloading
    var manifest;
    var preload;

    // Function to setup the assets manifest
    setupManifest();
    // Function to begin preloading
    startPreload();

    // Click event for the case study button to show the case study details
    $('#case-study-button').on('click', caseStudyModal);
    // Click event for the case study image to show the case study details
    $('#case-study-image').on('click', caseStudyModal);

    /*
     * Function to setup the assets manifest
     */
    function setupManifest() {
        manifest = [{
            src: 'public/data/projects.json',
            id: "jsonFile"
        },
        {
            src: 'public/img/case/000.gif',
            id: "protoGifFile"
        }
        ];

        // Load main images
        var index;
        for(index=1; index<=3; index++) {
            manifest.push({src:"public/img/00"+index+".png"});
        }

        // Load images for case study
        for(index=1; index<=6; index++) {
            manifest.push({src:"public/img/case/00"+index+".png"});
        }

        // Load large images for individual projects
        for(index=1; index<=11; index++) {
            manifest.push({src:"public/img/large/lg_00"+index+".png"});
        }

        // Load small images for individual projects
        for(index=1; index<=4; index++) {
            manifest.push({src:"public/img/small/sm_00"+index+".png"});
        }

        // Load case study gif
        manifest.push({src:"public/img/case/000.gif"});
    }

    /*
     * Function to begin preloading
     */  
    function startPreload() {
        preload = new createjs.LoadQueue(true);      
        preload.on("fileload", handleFileLoad);
        preload.on("complete", loadComplete);
        preload.on("error", loadError);
        preload.loadManifest(manifest);
    }

    /*
     * Function to handling file load
     */
    function handleFileLoad(event) {
        // If the preloaded item is the JSON file, assign it to projectData 
        if(event.item.id === 'jsonFile') {
            projectData = jQuery.parseJSON(event.rawResult);
        }
    }

    /*
     * Function to handling file load errors
     */
    function loadError(evt) {
        console.log("Error!",evt.text);
    }

    /*
     * Function to handling file load completion
     */
    function loadComplete(event) {
        // Hide the preloader animation and show the portfolio
        breathePreloader.fadeOut(1000, function() {
            $('#portfolio-wrapper').fadeIn(500);
            setupRecentProjects();
        });
    }

    /*
     * Function to setup the project cards in the 'Recent Projects' section using Handlebars template
     * and assign click events to each of the cards
     */
    function setupRecentProjects () {
        // Grab the template script 'project-card-template'
        var projectCardTemplateScript = $("#project-card-template").html();

        // Compile the template 'project-card-template'
        var projectCardTemplate = Handlebars.compile(projectCardTemplateScript);

        //Pass the JSON data to the template 'project-card-template'
        var projectCardCompiledHtml = projectCardTemplate(projectData);

        // Add the compiled html to the 'project-grid' div
        projectsGrid.html(projectCardCompiledHtml);

        // Show the project info on hover state of each project card
        $('.project-card').hover(function () {
            $(this).find('.project-info').toggleClass('show');
        });

        // Click event for the project-card for showing that project's details
        projectsGrid.on('click', '.project-card', function(e) {
            // Get the index of the parent of the clicked element
            var index = $(this).parent().index();
            // Get data corresponding to the clicked element
            var clickedCardData = projectData.portfolioProjects[index];
             // Set project title
            modalTitle.text(clickedCardData.title);

            // Grab the template script 'project-card-details-template'
            var projectCardDetailsTemplateScript = $("#project-card-details-template").html();

            // Compile the template 'project-card-details-template'
            var projectCardDetailsTemplate = Handlebars.compile(projectCardDetailsTemplateScript);

            // Pass the JSON data (corresponding to clicked card) to the template 
            var projectCardDetailsCompiledHtml = projectCardDetailsTemplate(clickedCardData);

            // Add the compiled html to the modal body
            modalBody.html(projectCardDetailsCompiledHtml);
        });
    }

    /*
     * Function to show the modal with case study details
     */
    function caseStudyModal () {
        // Set the modal title
        modalTitle.text('mCLASS:CIRCLE');
        // Show the case study section and attach it to the modal body
        // Not using Handlebars since all the info is static text
        caseStudySection.show();
        modalBody.html(caseStudySection);
        // Click event for the close icon to hide the case study section, and remove the click event
        // for the close button since this click event is used only when attaching the case study
        modalCloseButton.on('click', function() {
            caseStudySection.hide();
            $(this).off('click');
        });
    }
}(jQuery));
