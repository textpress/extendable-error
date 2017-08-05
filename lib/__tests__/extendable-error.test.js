import ExtendableError from "../extendable-error";

class MyError extends ExtendableError {
    constructor( name, extra ) {
        super( name, extra );
    }
}

describe( "ExtendableError", () => {

    it( "is instance of Error", () => {
        expect( new ExtendableError() ).toBeInstanceOf( Error );
    } );

    it( "instance of inherited class is instance of Error", () => {
        const error = new MyError();
        expect( error ).toBeInstanceOf( Error );
    } );

    it( "instance of inherited class is instance of ExtendableError", () => {
        const error = new MyError();
        expect( error ).toBeInstanceOf( ExtendableError );
    } );

    it( "instance of inherited class is instance of itself", () => {
        const error = new MyError();
        expect( error ).toBeInstanceOf( MyError );
    } );

    it( "instance of inherited class has correct name", () => {
        const error = new MyError();
        expect( error.name ).toBe( "MyError" );
    } );

    it( "instance of inherited class has correct message", () => {
        const error = new MyError( "test message" );
        expect( error.message ).toEqual( "test message" );
    } );

    it( "instance of inherited class has correct extra", () => {
        const error = new MyError( "test message", { extra: "value" } );
        expect( error.extra ).toEqual( { extra: "value" } );
    } );

    it( "instance of inherited class has exception stack", function stackTestFunction() {
        const error = new MyError();
        expect( error.stack ).toEqual( expect.stringMatching( /stackTestFunction \([^)]*__tests__\/extendable-error.test.js:\d+:\d+\)/ ) );
    } );

    it( "stack of instance of inherited class contains correct error type and message", function stackTestFunction() {
        const error = new MyError( "this is test" );
        expect( error.stack ).toEqual( expect.stringMatching( /^MyError: this is test\n\s+at\s+.*/ ) );
    } );

    it( "inspect returns correct string without extra", function stackTestFunction() {
        const error = new MyError( "this is test" );
        expect( error.inspect() ).toEqual( expect.stringMatching( /^MyError: this is test\n\s+at\s+.*/ ) );
    } );

    it( "inspect returns correct string with string extra", function stackTestFunction() {
        const error = new MyError( "this is test", "extra" );
        expect( error.inspect() ).toEqual( expect.stringMatching( /^MyError: this is test(\n\s+at\s+[^\n]+)+\nMyError extra:\n\s+'extra'$/ ) );
    } );

    it( "inspect returns correct string with object extra", function stackTestFunction() {
        const error = new MyError( "this is test", { extra: "object" } );
        expect( error.inspect() ).toEqual( expect.stringMatching( /^MyError: this is test(\n\s+at\s+[^\n]+)+\nMyError extra:\n\s+{ extra: 'object' }$/ ) );
    } );

    it( "inspect returns correct string with another error", function stackTestFunction() {
        const error = new MyError( "this is test", new Error( "test" ) );
        expect( error.inspect() ).toEqual( expect.stringMatching( /^MyError: this is test(\n\s+at\s+[^\n]+)+\nMyError extra:\n\s+Error: test\s+at\s+.*/ ) );
    } );

} );
