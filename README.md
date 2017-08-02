## Example

```
import ExtendableError from "@textpress/extendable-error"

class MyError extends ExtendableError {
    constructor( name, extra ) {
        super( name, extra );
    }
}

const error = new MyError( "this is test", { extra: "data" }  )
console.error( error ); 
```

## Output

```
MyError: this is test
	{ extra: 'data' }
    at ...
```

