
function RateProfessor () {

    // PRIVATE VARIABLES
        
    // The backend we'll use for Part 2. For Part 3, you'll replace this 
    // with your backend.
    var apiUrl = 'https://furukawa-warmup.herokuapp.com';
    //var apiUrl = 'http://localhost:5000';
    //var apiUrl = 'https://rateprofessor.herokuapp.com';

    var professorlist; // professors container, value set in the "start" method below
    var profTemplateHtml; // a template for creating reviews. Read from index.html
    // in the "start" method

    var reviews; // reviews container, value set in the "start" method below
    var reviewTemplateHtml; // a template for creating reviews. Read from index.html
    // in the "start" method
    
    var create_review; // create_review form, value set in the "start" method below
    var add_professor; // add_professor form, value set in the "start" method below

    //var profId;

    // PRIVATE METHODS
      
   /**
    * HTTP GET request 
    * @param  {string}   url       URL path, e.g. "/api/allprofs"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

    /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/allprofs"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
    
    /**
     * Insert professor into professorlist container in UI
     * @param  {Object}  professor       professor JSON
     * @param  {boolean} beginning   if true, insert professor at the beginning of the list of professorlist
     * @return {None}
     */
    var insertProfessor = function(professor, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(profTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute 
        newElem.attr('id', professor.id); 
        // Now fill in the data that we retrieved from the server
        newElem.find('.name').text(professor.name+" "+professor.lastname);
        // FINISH ME (Task 2): fill-in the rest of the data 

        newElem.find('.affiliate').text(professor.affiliate);
        newElem.find('.school').text(professor.school);

        if (professor.overall_rating < 0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_none');
        } else if (professor.overall_rating <= 1.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_1');
        } else if (professor.overall_rating > 1.0 && professor.overall_rating <= 2.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_2');
            //newElem.find('rating_3').removeClass('rating_3').addClass('rating_2');
        } else if (professor.overall_rating > 2.0 && professor.overall_rating <= 3.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_3');
            //newElem.find('rating_4').removeClass('rating_4').addClass('rating_3');
        } else if (professor.overall_rating > 3.0 && professor.overall_rating <= 4.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_4');
            //newElem.find('rating_5').removeClass('rating_5').addClass('rating_4');
        } else if (professor.overall_rating > 4.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_5');
        }
        /*
        if(professor.overall_rating < 0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_none');
        } else if(professor.overall_rating <= 1) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_1');
        } else if(professor.overall_rating > 1 && professor.overall_rating <= 2) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_2');
            //newElem.find('rating_3').removeClass('rating_3').addClass('rating_2');
        } else if (professor.overall_rating > 2 && professor.overall_rating <= 3) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_3');
            //newElem.find('rating_4').removeClass('rating_4').addClass('rating_3');
        } else if (professor.overall_rating > 3 && professor.overall_rating <= 4) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_4');
            //newElem.find('rating_5').removeClass('rating_5').addClass('rating_4');
        } else if (professor.overall_rating > 4) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_5');
        }
        */
        if (beginning) {
            professorlist.append(newElem);
        } else {
            professorlist.prepend(newElem);
        }
        
    };


     /**
     * Get all professors from API and display in alphabetical order by lastname
     * @return {None}
     */
    var displayProfessors = function () {
        //console.log('Test');
        // Prepare the AJAX handlers for success and failure
        var onSuccess = function(data) {
            /* FINISH ME (Task 2): display all professors from API and display in alphabetical orded by lastname */
            var jsondata = data.professors;
            /*
            console.log(jsondata.length);
            console.log('made it1');
            for (var x in jsondata) {
                console.log('made it');
                insertProfessor(x, true);
            }
            */

            //Object.keys().foreach(jsondata.professors[0
            
            for (var i = 0; i < jsondata.length; i++) {
                insertProfessor(jsondata[i], true);
            }
            
            console.log('List all professors - Success');
        };
        var onFailure = function() { 
            console.error('List all professors - Failed'); 
        };
        /* FINISH ME (Task 2): make a GET request to get recent professors */
        let requestUrl = '/api/allprofs?order_by=lastname';
        console.log(requestUrl);
        makeGetRequest(requestUrl, onSuccess, onFailure);
    };


    
    /**
     * Insert reviews into reviews container in UI
     * @param  {Object}  review       review JSON 
     * @param  {boolean} beginning   if true, insert review at the beginning of the list of reviews
     * @return {None}
     */
    var insertReview = function(review, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(reviewTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute 
        newElem.attr('id', review.id); 
        // Now fill in the data that we retrieved from the server
        // FINISH ME (Task 3): fill-in the rest of the data
        newElem.find('.review_text').text(review.review_text);
        var timeS = new Date(review.created_at);
        var timeArray = timeS.toString().split(' ');
        newElem.find('.timestamp').text('Posted at ' + timeArray[4] + ' ' + timeArray[1] + ' ' + timeArray[2] + ' ' + timeArray[3]);

        //console.log(review.rating);
        if (review.rating <= 0.0) {//had to change template to start with rating_none
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_none');
        } else if (review.rating <= 1.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_1');
        } else if (review.rating > 1.0 && review.rating <= 2.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_2');
        } else if (review.rating > 2.0 && review.rating <= 3.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_3');
        } else if (review.rating > 3.0 && review.rating <= 4.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_4');
        } else if (review.rating > 4.0) {
            newElem.find('.rating_none').removeClass('rating_none').addClass('rating_5');
            //console.log("here");
        }

        if (beginning) {
            reviews.append(newElem);
        } else {
            reviews.prepend(newElem);
        }
    };


     /**
     * Get recent reviews from API and display most recent 50 reviews
     * @return {None}
     */
    var displayReviews = function() {
        // Delete everything from .reviews
        reviews.html('');
        // Prepare the AJAX handlers for success and failure
        var onSuccess = function(data) {
            // FINISH ME (Task 3): display reviews with most recent reviews at the beginning
            var jsondata = data.reviews;
            for (var i = 0; i < jsondata.length; i++) {
                insertReview(jsondata[i], true);
            }
            
            console.log('List all professors - Success');
        };
        var onFailure = function() { 
            // FINISH ME (Task 3): display an alert box to notify that the reviews couldn't be retrieved ; print the errror message in the console. 
            console.error('Display Reviews - Failed');
        };
        // FINISH ME (Task 3): get the id of the selected professor from the header 
        var profId = $('.selected_prof').val();

        //console.log('ayy' + profId);
        // FINISH ME (Task 3): make a GET request to get reviews for the selected professor 
        let requestUrl = '/api/getreviews?profID=' + profId + '&count=20&order_by=created_at';
        console.log(requestUrl);
        makeGetRequest(requestUrl,onSuccess,onFailure);
    };

        /**
     * Add event handlers for clicking select.
     * @return {None}
     */
    var attachSelectHandler = function(e) {
        // Attach this handler to the 'click' action for elements with class 'select_prof'
        //console.log("made it4");
        professorlist.on('click', '.prof_button', function (e) {
            e.preventDefault();
           // console.log("made it5");
            // FINISH ME (Task 4): get the id, name, title, school of the selected professor (whose select button is clicked)

            //var prof = {};

            var profId= $(this).parents('article').attr('id');  //FINISH ME
            //var name = $(this).parents('article').children(' .prof_info').children(' .name');   //FINISH ME
            var name = $(this).parents('article').children('.prof_info').children('.name').text();
            var title = $(this).parents('article').children('.prof_info').children('.affiliate').text();   //FINISH ME
            var school = $(this).parents('article').children('.prof_info').children('.school').text(); //FINISH ME
            console.log(profId);
            console.log(name);
            console.log(title);
            console.log(school);
            
            // FINISH ME (Task 4):  update the selected_prof content in the header with these values. 
            /*
            $('#selected_prof' + ' .selected_name').html(idval);
            var onSuccess = function (data) {
                let idval = data.professors.name;
                //$('#'+profId+' .').attr('#id') = profId;
                $('#selected_prof' + ' .name').html(idval);

                $('#selected_prof').attr('#selected_affiliate') = title;
                $('#selected_prof').attr('#selected_school') = school;
                //console.log("madeit");
            }
            var onFailure = function () {
                console.error('select prof error');
                //console.log("madeit");
            }
            */

            //makePostRequest('/api/allprofs/' + profId +'/name', prof, onSuccess, onFailure);

            $('.selected_prof').val(profId);//set here to avoid using globals
            //console.log($('.selected_prof').val());
            $('.selected_prof').find('.selected_name').html(name);
            $('.selected_prof').find('.selected_title').html(title);
            $('.selected_prof').find('.selected_school').html(school);
            // FINISH ME (Task 4): display the reviews for the selected professor
            displayReviews();

            //activate and show the reviews tab

            $('.nav a[href="#showreview"]').tab('show');
            //console.log("madeit3");
        });
    };

    /**
     * Update the professors rating image based on the current rating.
     * @param  {Object}  prof       professor JSON ; includes updated professor data received from the backend
     * @return {None}
     */
    var updateProfessor = function (prof){

        // FINISH ME (Task 5):  get the "class" attribute value for the professor rating div (professors id is "prof.id")
        // remember that the rating class value can one of the following: rating_none or rating_1 or rating_2 or rating_3 or rating_4 or rating_5 
        // Hint: get the professor_box element with id 'prof.id'. Get the class attribute for the div inside '.overall_rating'.
        var profId = prof.id.toString();
        var rate = prof.overall_rating;
        console.log(rate);
        // FINISH ME (Task 5):  remove the current "class" attribute value for the professor rating


        //professorlist.find('#'+profId+' .rating_none').removeClass('rating_none');
        professorlist.find('#' + profId + ' .rating_1').removeClass('rating_1').addClass('rating_none');//had problems adding back separate, so making rating none default first
        professorlist.find('#' + profId + ' .rating_2').removeClass('rating_2').addClass('rating_none');
        professorlist.find('#' + profId + ' .rating_3').removeClass('rating_3').addClass('rating_none');
        professorlist.find('#' + profId + ' .rating_4').removeClass('rating_4').addClass('rating_none');
        professorlist.find('#' + profId + ' .rating_5').removeClass('rating_5').addClass('rating_none');
        // FINISH ME (Task 5):  add  the new "class" attribute value for the professor rating 
        if (rate == 1.0) {
            professorlist.find('#' + profId + ' .rating_none').removeClass('rating_none').addClass('rating_1');
            console.log("is 1");
        } else if (rate <= 2.0 && rate > 1.0) {
            professorlist.find('#' + profId + ' .rating_none').removeClass('rating_none').addClass('rating_2');
            console.log("is 2");
        } else if(rate <= 3.0 && rate > 2.0) {
            professorlist.find('#' + profId + ' .rating_none').removeClass('rating_none').addClass('rating_3');
            console.log("is 3");
        } else if (rate <= 4.0 && rate > 3.0) {
            professorlist.find('#' + profId + ' .rating_none').removeClass('rating_none').addClass('rating_4');
            console.log("is 4");
        } else if (rate > 4.0) {
            professorlist.find('#' + profId + ' .rating_none').removeClass('rating_none').addClass('rating_5');
            console.log("is 5");
        }
    }

    /**
     * Add event handlers for submitting the create review form.
     * @return {None}
     */
    var attachReviewHandler = function(e) {   
        // add a handler for the 'Cancel' button to cancel the review and go back to "FIND YOUR PROFESSOR" (#list) tab
        //e.preventDefault();

        create_review.on('click', '.cancel_review', function (e) {
            //activate and show the reviews tab
            $('.nav a[href="#showreview"]').tab('show');
        });
        
        // FINISH ME (Task 5): add a handler to the 'Post Review' (.submit_review_input) button to
        //                     post the review for the chosen professor
        // The handler for the Post button in the form
        create_review.on('click', '.submit_review_input', function (e) {
            e.preventDefault(); // Tell the browser to skip its default click action

            var review = {}; // Prepare the review object to send to the server
            review.prof_id =  $('.selected_prof').val();
            review.review_text = create_review.find('.review_input').val();
            // FINISH ME (Task 5): collect the rest of the data for the review
            review.rating = create_review.find('.review_rating_input').val();
            var onSuccess = function(data) {
                // FINISH ME (Task 5): update the professor's review rating based on the data received from backend
                // Hint: call updateProfessor
                updateProfessor(data.professor);
                // FINISH ME (Task 5): insert review at the beginning of the reviews container
                // Hint : call InsertReview
                insertReview(data.review, true);
                //activate and show the reviews tab
                $('.nav a[href="#showreview"]').tab('show');
            };
            var onFailure = function() { 
                //FINISH ME (Task 5): display an alert box to notify that the review could not be created ; print the errror message in the console. 
                console.error('Attach Review Handler - Failed');
            };
            
            // FINISH ME (Task 5): make a POST request to add the review
            let requestUrl = '/api/addreview';
            console.log(requestUrl);
            makePostRequest(requestUrl, review, onSuccess, onFailure);
        });
    };

    /**
     * Add event handlers for submitting the create review form.
     * @return {None}
     */
    var attachProfessorHandler = function(e) {   
        // FINISH ME (Task 6): add a handler for the 'Cancel' button to cancel the review and go back to "FIND YOUR PROFESSOR" (#list) tab
        add_professor.on('click', '.cancel_prof', function (e) {
            //activate and show the #list tab
            $('.nav a[href="#list"]').tab('show');
        });
        
        // add a handler to the 'Add Professor' (.submit_prof_input) button to
        // create a new professor

        // The handler for the Post button in the form
        add_professor.on('click', '.submit_prof_input', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var prof = {}; // Prepare the review object to send to the server
            // FINISH ME (Task 6): collect the rest of the data for the professor
            prof.name = add_professor.find('.name_input').val();
            prof.lastname = add_professor.find('.lastname_input').val();
            prof.affiliate = add_professor.find('.title_input').val();
            prof.school = add_professor.find('.school_input').val();
            console.log(prof.school);

            var onSuccess = function(data) {
                // FINISH ME (Task 6): insert professor at the beginning of the professorlist container
                // Hint : call insertProfessor
                insertProfessor(prof,true)
                // FINISH ME (Task 6): activate and show the #list tab
                $('.nav a[href="#list"]').tab('show');
                location.reload();//Cannot get ID assigned to new prof without refreshing here, Preventing adding prof and review one after the other
            };
            var onFailure = function() { 
                //FINISH ME (Task 6): display an alert box to notify that the professor could not be created ; print the errror message in the console. 
                console.error('Attach Professor Handler - Faliure');
            };
            
            // FINISH ME (Task 6): make a POST request to add the professor
            var requestUrl = '/api/newprofessor';
            makePostRequest(requestUrl, prof, onSuccess, onFailure);
            
        });

    };
    
    /**
     * Start the app by displaying the list of the professors and attaching event handlers.
     * @return {None}
     */
    var start = function() {
        //get the professor HTML template
        professorlist = $(".professorlist");
        // Grab the first professor div element, to use as a template
        profTemplateHtml = $(".professorlist .professor_box")[0].outerHTML;
        // Delete everything from .professorlist
        professorlist.html('');
        displayProfessors();

        reviews = $(".reviews");
        // Grab the first review, to use as a template
        reviewTemplateHtml = $(".reviews .review")[0].outerHTML;
        // Delete everything from .reviews
        reviews.html('');
        
        //get the reference to the <form> element with id "addReviewForm" and store it in create_review valiable. We will use this variable to access "addReviewForm" element in DOM. 
        create_review = $("form#addReviewForm");
        attachSelectHandler();
        attachReviewHandler();

        add_professor = $("form#addProfForm");
        attachProfessorHandler();
    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via RateProfessor.key_name, e.g. RateProfessor.start()
    return {
        start: start
    };
    
};
