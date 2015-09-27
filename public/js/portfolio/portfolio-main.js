(function ($) {
    // Variables for optimization
    var projectsGrid = $('.projects-grid');
    var modalTitle = $('.modal-title');
    var modalBody = $('.modal-body');
    var caseStudySection = $('#case-study');
    var modalCloseButton = $('.close');
    var breathePreloader = $('#preloader-container');
    var projectData;
    var manifest;
    var preload;

    // Function to setup the assets manifest
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

        var index;

        // Load main images
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

    function startPreload() {
        preload = new createjs.LoadQueue(true);      
        preload.on("fileload", handleFileLoad);
        preload.on("progress", handleFileProgress);
        preload.on("complete", loadComplete);
        preload.on("error", loadError);
        preload.loadManifest(manifest);
    }

    function handleFileLoad(event) {
        console.log("A file has loaded of type: " + event.item.type);
        if(event.item.id === 'jsonFile') {
            projectData = jQuery.parseJSON(event.rawResult);
            console.log(projectData);
        }
    }

    function loadError(evt) {
        console.log("Error!",evt.text);
    }


    function handleFileProgress(event) {
    
    }

    function loadComplete(event) {
        console.log("Finished Loading Assets");
        breathePreloader.fadeOut(1000, function() {
            $('#portfolio-wrapper').fadeIn(500);
            setupRecentProjects();
        });
    }
    setupManifest();
    startPreload();

    function setupRecentProjects () {
        console.log('JSON fetch successful');

        // Grab the template script
        var projectCardTemplateScript = $("#project-card-template").html();

        // Compile the template
        var projectCardTemplate = Handlebars.compile(projectCardTemplateScript);

        //Pass our data to the template
        var projectCardCompiledHtml = projectCardTemplate(projectData);

        // Add the compiled html to the page
        projectsGrid.html(projectCardCompiledHtml);

        // Hover state to show the project info
        $('.project-card').hover(function () {
            $(this).find('.project-info').toggleClass('show');
        });

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
    
        // Click event for attaching the case study details when the case study button or image is clicked
        $('#case-study-button').on('click', caseStudyModal);
        $('#case-study-image').on('click', caseStudyModal);

        // Function to show the modal with case study details
        function caseStudyModal () {
            modalTitle.text('mCLASS:CIRCLE');
            caseStudySection.show();
            modalBody.html(caseStudySection);
            modalCloseButton.on('click', function() {
                caseStudySection.hide();
                $(this).off('click');
            });
        }
    }
}(jQuery));
