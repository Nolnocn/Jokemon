var mongoose = require( "mongoose" );
var _ = require( "underscore" );

var JokemonModel;

function setName( name )
{
    return _.escape( name ).trim();
}

var JokemonSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    
    typeId: {
        type: String,
        required: true,
        trim: true
    },
    
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Account"
    },
    
    happiness: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    
    level: {
        type: Number,
        min: 1,
        default: 1
    },
    
    xp: {
        type: Number,
        min: 0,
        default: 0
    },
    
    attack: {
        type: Number,
        min: 0,
        default: 10,
        required: true
    },
    
    defense: {
        type: Number,
        min: 0,
        default: 10,
        required: true
    },
    
    speed: {
        type: Number,
        min: 0,
        default: 10,
        required: true
    },
    
    createdData: {
        type: Date,
        default: Date.now
    }
} );

JokemonSchema.statics.findByOwner = function( ownerId, callback )
{
    var search = {
        owner: mongoose.Types.ObjectId( ownerId )
    };
    
    return JokemonModel.find( search ).select( "name typeId" ).exec( callback );
};

/*JokemonSchema.statics.removeByOwner = function( ownerId, callback )
{
    var search = {
        owner: mongoose.Types.ObjectId( ownerId )
    };
    
    JokemonModel.remove( search );
};*/

JokemonModel = mongoose.model( "Jokemon", JokemonSchema );

module.exports.JokemonModel = JokemonModel;
module.exports.JokemonSchema = JokemonSchema;