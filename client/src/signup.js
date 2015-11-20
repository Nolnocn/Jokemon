"use strict";

var application = application || {};

$( document ).ready( function() {
    $( "#signupSubmit" ).on( "click", function( e ) {
        e.preventDefault();
    
        if( $( "#user" ).val() == '' || $( "#pass" ).val() == '' || $( "#pass2" ).val() == '' )
        {
            application.handleError( "All fields are required" );
            return false;
        }
        
        if( $( "#pass" ).val() !== $( "#pass2" ).val() )
        {
            application.handleError( "The passwords do not match" );
            return false;           
        }

        application.sendAjax( $( "#signupForm" ).attr( "action" ), $( "#signupForm" ).serialize() );
        
        return false;
    } );
});