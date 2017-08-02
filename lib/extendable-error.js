"use strict";

const utils = require( "util" );

function ExtendableError( message, extra ) {
    Error.captureStackTrace( this, this.constructor );
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

ExtendableError.prototype.inspect = function () {
    const message = [ this.name, this.message ].filter( function ( v ) {
        return !!v;
    } ).join( ": " );

    const result = [ message ];
    if ( this.extra )
        result.push( "\tExtra: " + ( ( typeof this.extra === "string" ) ? this.extra : JSON.stringify( this.extra ) ) );

    const stack = this.stack.split( "\n" );
    stack.shift();
    return result
        .concat( stack )
        .join( "\n" );
};

utils.inherits( ExtendableError, Error );

module.exports = ExtendableError;
