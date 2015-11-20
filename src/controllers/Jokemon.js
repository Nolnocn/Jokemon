var _ = require( "underscore" );
var models = require( "../models" );

var Jokemon = models.Jokemon;
var baseJokemon = require( "../game/basejokemon.js" );

function myJokemonPage( req, res )
{
    Jokemon.JokemonModel.findByOwner( req.session.account._id, function( err, docs ) {
        if( err )
        {
            console.log( err );
            return res.statuse( 400 ).json( { error: "An error occurred" } );
        }
        res.render( 'app', { csrfToken: req.csrfToken(), jokemon: docs[ 0 ] } );
    } );
}

function jokemonSelectPage( req, res )
{    
    res.render( "jokeselect", { csrfToken: req.csrfToken(), jokemon: baseJokemon } );
}

function selectJokemon( req, res )
{
    /*if( req.session.jokemon )
    {
        Jokemon.JokemonModel.removeByOwner( req.session.account._id );
    }*/
    
    var body = req.body;
    
    var index = body.selectedIndex || 0;
    
    if( index >= baseJokemon.length || index <= 0 )
    {
        index = 0;
    }
    
    var selectedJokemon = baseJokemon[ index ];
    
    if( !selectedJokemon )
    {
        selectedJokemon = baseJokemon[ 0 ];
    }
    
    var jokemonData = {
        name: selectedJokemon.name,
        typeId: selectedJokemon.typeId,
        owner: req.session.account._id,
        attack: selectedJokemon.attack,
        defense: selectedJokemon.defense,
        speed: selectedJokemon.speed
    };
    
    var newJokemon = new Jokemon.JokemonModel( jokemonData );
    
    newJokemon.save( function( err ) {
        if( err )
        {
            console.log( err );
            return res.status( 400 ).json( { error: "An error occurred" } );
        }
        
        req.session.jokemon = newJokemon;
        
        res.json( { redirect: "/myjokemon" } );
    } );
}

module.exports.myJokemonPage = myJokemonPage;
module.exports.jokemonSelectPage = jokemonSelectPage;
module.exports.select = selectJokemon;
