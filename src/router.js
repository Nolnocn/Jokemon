var controllers = require( "./controllers" );
var mid = require( "./middleware" );

var router = function( app )
{
    app.get( "/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage );
    app.post( "/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login );
    
    app.get( "/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage );
    app.post( "/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup );
    
    app.get( "/logout", mid.requiresLogin, controllers.Account.logout );
    
    app.get( "/myjokemon", mid.requiresLogin, mid.requireSelectedJokemon, controllers.Jokemon.myJokemonPage );
    app.get( "/jokemonselect", mid.requiresLogin, mid.requireNotSelectedJokemon, controllers.Jokemon.jokemonSelectPage );
    app.post( "/selected", mid.requiresLogin, mid.requireNotSelectedJokemon, controllers.Jokemon.select );
    
    app.get( "/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage );
};

module.exports = router;