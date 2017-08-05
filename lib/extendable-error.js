"use strict";

const util = require( "util" );

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

module.exports = ExtendableError;
