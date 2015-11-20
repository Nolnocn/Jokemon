"use strict";

var application = application || {};

$( document ).ready( function() {
    $( "#selectSubmit" ).on( "click", function( e ) {
        e.preventDefault();
    
        var selectedIndex = $( "div.active" ).index();
        $( "#index" ).attr( "value", selectedIndex );
        application.sendAjax( $( "#selectForm" ).attr( "action" ), $( "#selectForm" ).serialize() );

        return false;
    });
});