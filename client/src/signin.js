"use strict";

var application = application || {};

$( document ).ready( function() {
    $( "#loginSubmit" ).on( "click", function( e ) {
        e.preventDefault();
    
        if( $( "#user" ).val() == '' || $( "#pass" ).val() == '' )
        {
            application.handleError( "Username or password is empty" );
            return false;
        }
        
        application.sendAjax( $( "#loginForm" ).attr( "action" ), $( "#loginForm" ).serialize() );

        return false;
    });
});