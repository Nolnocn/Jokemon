"use strict";

var application = application || {};

(function() {
    function handleError( message )
    {
        $( "#errorMessage" ).text( message );

        if( $( "#jopusMessage" ).queue().length === 0 )
        {
            $( "#jopusMessage" ).animate( { "left": "0px" }, 'slow' );
            $( "#jopusMessage" ).delay( 3000 );
            $( "#jopusMessage" ).animate( { "left": "-256px" }, 'slow' );
        }
    }

    function sendAjax( action, data )
    {
        $.ajax( {
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function( result, status, xhr ) {
                window.location = result.redirect;
            },
            error: function( xhr, status, error ) {
                var messageObj = JSON.parse( xhr.responseText );

                handleError( messageObj.error );
            }
        } );        
    }
    
    application.handleError = handleError;
    application.sendAjax = sendAjax;
})();