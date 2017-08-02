"use strict";

const util = require( "util" );

function ExtendableError( message, extra ) {
    Error.captureStackTrace( this, this.constructor );
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

ExtendableError.prototype.inspect = function ( dept, opt ) {
    const message = [ this.name, this.message ].filter( function ( v ) {
        return !!v;
    } ).join( ": " );


    const result = [ message ];
    if ( this.extra ) {
        result.push( "\t" + util.inspect( this.extra, opt ).split( "\n" ).join( "\n\t" ) );
    }

    const stack = this.stack.split( "\n" );
    stack.shift();

    return result
        .concat( stack )
        .join( "\n" );
};

util.inherits( ExtendableError, Error );

module.exports = ExtendableError;
