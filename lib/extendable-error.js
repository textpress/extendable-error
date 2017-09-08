"use strict";

const util = require( "util" );
const _ = require( "lodash" );


function ExtendableError( message, extra ) {
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace( this, this.constructor );
    this.extra = extra;
}

ExtendableError.prototype.inspect = function ( dept, opt ) {
    return this.stack
        + ( this.extra ? "\n" + this.name + " extra:\n\t" + util.inspect( this.extra, opt ).split( "\n" ).join( "\n\t" ) : "" );

};

util.inherits( ExtendableError, Error );



function match( error, matchers ) {
    if ( !matchers )
        return false;

    return !!Object
        .keys( matchers )
        .find( prop => {
            const errorProp = error[prop];
            if ( !_.isString( errorProp ) )
                return false;

            return matchers[prop].find( r => !!errorProp.match( r ) );
        } )
    ;
}

function matchError( err, errorsDict ) {
    const errorName = Object.keys( errorsDict ).find( errorName => match( err, errorsDict[ errorName ].matchers ) );
    return errorName && errorsDict[ errorName ];
}


exports.matchError = matchError;
exports.ExtendableError = exports.default = ExtendableError;

Object.defineProperty( exports, "__esModule", {
    value: true
} );
