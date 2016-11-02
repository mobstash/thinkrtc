/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {

		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

 "use strict";
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*! carousel-3d - v0.2.0 - 2015-03-13
 * Copyright (c) 2015 PAIO co.,Ltd.; Licensed MIT */

"use strict";
! function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function(a) {
        ! function() {
            "use strict";
            var b = window.jQuery,
                c = a("./ChildrenWrapper"),
                d = a("./Child"),
                e = function(a) {
                    this.el = a, this._makeOption();
                    var d = b(a).children(),
                        e = new c(this),
                        f = 0;
                    this.appendChildrenWrapper(e), d.each(function(a, c) {
                        b(c).attr("selected") && (f = a), this.appendChild(c)
                    }.bind(this)), this._prevButton = b("<div data-prev-button></div>")[0], b(this.el).append(this._prevButton), b(this._prevButton).click(this.prev.bind(this)), this._nextButton = b("<div data-next-button></div>")[0], b(this.el).append(this._nextButton), b(this._nextButton).click(this.next.bind(this)), this.rotate(f)
                };
            e.prototype.el = null, e.prototype.option = {
                animationDuration: 1e3
            }, e.prototype._makeOption = function() {
                (function() {
                    var a = b("<div data-children-wrapper></div>").hide().appendTo(this.el),
                        c = b("<div data-child></div>").hide().appendTo(a).css("transition-duration");
                    a.remove(), c && (c.indexOf("ms") > 0 ? this.option.animationDuration = parseInt(c) : c.indexOf("s") > 0 && (this.option.animationDuration = 1e3 * parseInt(c)))
                }).bind(this)()
            }, e.prototype.appendChild = function(a) {
                this._childrenWrapperObj.appendChild(new d(this._childrenWrapperObj, a))
            }, e.prototype.appendChildrenWrapper = function(a) {
                this._childrenWrapperObj = a, b(this.el).append(a.el)
            }, e.prototype.rotate = function(a) {
                for (var c = this._childrenWrapperObj.numChildren(), d = Math.floor(this._childrenWrapperObj.currentIndex() - c / 2), e = Math.ceil(this._childrenWrapperObj.currentIndex() + c / 2); d > a;) a += c;
                for (; a > e;) a -= c;
                this._childrenWrapperObj.rotate(a), window.setTimeout(function() {
                    for (var c = a; 0 > c;) c += this._childrenWrapperObj.numChildren();
                    b(this.el).trigger("select", c % this._childrenWrapperObj.numChildren())
                }.bind(this), this.option.animationDuration)
            }, e.prototype.prev = function() {
                this.rotate(this._childrenWrapperObj.currentIndex() - 1)
            }, e.prototype.next = function() {
                this.rotate(this._childrenWrapperObj.currentIndex() + 1)
            }, b.fn.Carousel3d = function() {
                var a, b = this,
                    c = arguments[0],
                    d = Array.prototype.slice.call(arguments, 1),
                    f = b.length,
                    g = 0;
                for (g; f > g; g += 1)
                    if ("object" == typeof c || "undefined" == typeof c ? b[g].Carousel3d = new e(b[g], c) : a = b[g].Carousel3d[c].apply(b[g].Carousel3d, d), void 0 !== a) return a;
                return b
            }, b(function() {
                b("[data-carousel-3d]").Carousel3d()
            })
        }()
    }, {
        "./Child": 2,
        "./ChildrenWrapper": 3
    }],
    2: [function(a, b) {
        ! function() {
            "use strict";
            var a = window.jQuery,
                c = window.Modernizr,
                d = function(b, c) {
                    this._childrenWrapperObj = b, this._content = c, this.el = a("<div data-child />")[0], this._frame = a("<div data-child-frame />")[0], this._contentWrapper = a("<div data-content-wrapper />")[0], a(this.el).append(this._frame), a(this._frame).append(this._contentWrapper), a(this._contentWrapper).append(c), this._hideUntilLoad()
                };
            d.prototype._childrenWrapperObj = null, d.prototype._content = null, d.prototype.el = null, d.prototype._contentWrapper = null, d.prototype._hideUntilLoad = function() {
                a(this._content).css("visibility", "hidden"), a(this._contentWrapper).waitForImages(function() {
                    setTimeout(function() {
                        this._resize(), a(this._content).resize(this._resize.bind(this)), a(this.el).resize(this._resize.bind(this)), a(this._content).css("visibility", "visible")
                    }.bind(this), 1)
                }.bind(this))
            }, d.prototype._resize = function() {
                a(this._contentWrapper).width(a(this._content).outerWidth()), a(this._contentWrapper).height(a(this._content).outerHeight());
                var b = a(this._frame).outerWidth() - a(this._frame).innerWidth(),
                    d = a(this._frame).outerHeight() - a(this._frame).innerHeight(),
                    e = (a(this.el).innerWidth() - b) / a(this._content).outerWidth(),
                    f = (a(this.el).innerHeight() - d) / a(this._content).outerHeight(),
                    g = Math.min(e, f),
                    h = Math.floor((a(this.el).innerWidth() - b - a(this._content).outerWidth() * g) / 2),
                    i = Math.floor((a(this.el).innerHeight() - d - a(this._content).outerHeight() * g) / 2);
                a(this._frame).width(a(this._content).outerWidth() * g), a(this._frame).height(a(this._content).outerHeight() * g), a(this.el).css("padding-left", h + "px"), a(this.el).css("padding-top", i + "px"), c.csstransforms ? (a(this._contentWrapper).css("transform", "scale(" + g + ")"), a(this._contentWrapper).css("-ms-transform", "scale(" + g + ")"), a(this._contentWrapper).css("-moz-transform", "scale(" + g + ")"), a(this._contentWrapper).css("-webkit-transform", "scale(" + g + ")")) : (a(this._contentWrapper).css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + g + ", M12=0, M21=0, M22=" + g + ', SizingMethod="auto expand")'), a(this._contentWrapper).css("-ms-filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + g + ", M12=0, M21=0, M22=" + g + ', SizingMethod="auto expand")'))
            }, b.exports = d
        }()
    }, {}],
    3: [function(a, b) {
        ! function() {
            "use strict";
            var a = window.jQuery,
                c = function(b) {
                    this._carousel3dObj = b, this.el = a("<div data-children-wrapper></div>")[0], a(b.el).resize(this._resize.bind(this))
                };
            c.prototype.el = null, c.prototype._carousel3dObj = null, c.prototype._childObjArray = [], c.prototype._currentIndex = 0, c.prototype._tz = 0, c.prototype._spacing = .05, c.prototype.currentIndex = function(a) {
                return "undefined" == typeof a || "object" == typeof a || isNaN(a) || (this._currentIndex = a), this._currentIndex
            }, c.prototype._resize = function() {
                this._tz = a(this.el).outerWidth() / 2 / Math.tan(Math.PI / this._childObjArray.length), this.rotate(this._currentIndex)
            }, c.prototype.appendChild = function(b) {
                this._childObjArray.push(b), a(this.el).append(b.el), this._resize()
            }, c.prototype.numChildren = function() {
                return this._childObjArray.length
            }, c.prototype.rotate = function(b) {
                this.currentIndex(b);
                var c = 360 / this._childObjArray.length,
                    d = 0,
                    e = 0;
                if (Modernizr.csstransforms3d)
                    for (d = 0; d < this._childObjArray.length; d += 1) {
                        e = c * (d - b);
                        var f = "";
                        f += " translateZ(" + -this._tz * (1 + this._spacing) + "px)", f += " rotateY(" + e + "deg)", f += " translateZ(" + this._tz * (1 + this._spacing) + "px)", a(this._childObjArray[d].el).css("transform", f), a(this._childObjArray[d].el).css("-ms-transform", f), a(this._childObjArray[d].el).css("-moz-transform", f), a(this._childObjArray[d].el).css("-webkit-transform", f), a(this._childObjArray[d].el).css("opacity", Math.cos(Math.PI / 180 * e)), a(this._childObjArray[d].el).css("z-index", Math.floor(100 * (Math.cos(Math.PI / 180 * e) + 1)))
                    } else {
                        var g = a(this.el).width(),
                            h = a(this.el).height(),
                            i = function(b, d) {
                                if ("_degree" === d.prop) {
                                    var e = Math.sin(Math.PI / 180 * b),
                                        f = Math.cos(Math.PI / 180 * b),
                                        i = c / 2,
                                        j = Math.abs(Math.sin(Math.PI / 180 * (b + i)) - Math.sin(Math.PI / 180 * (b - i))) / (2 * Math.sin(Math.PI / 180 * i)) * f,
                                        k = (f + 1) / 2,
                                        l = (j + 1) / 2,
                                        m = (e * g / 2 + g * l / 2 * e) / 2;
                                    a(d.elem).css("z-index", Math.floor(100 * (f + 1))), Modernizr.csstransforms ? (a(d.elem).css("left", m + "px"), a(d.elem).css("opacity", f), a(d.elem).css("transform", "scale(" + l + ", " + k + ")"), a(d.elem).css("-ms-transform", "scale(" + l + ", " + k + ")"), a(d.elem).css("-moz-transform", "scale(" + l + ", " + k + ")"), a(d.elem).css("-webkit-transform", "scale(" + l + ", " + k + ")")) : (a(d.elem).css("top", Math.floor((h - h * k) / 2) + "px"), a(d.elem).css("left", (g - g * l) / 2 + m + "px"), a(d.elem).css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + l + ", M12=0, M21=0, M22=" + k + "), progid:DXImageTransform.Microsoft.Alpha(Opacity=" + 100 * f + ")"), a(d.elem).css("-ms-filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + l + ", M12=0, M21=0, M22=" + k + "), progid:DXImageTransform.Microsoft.Alpha(Opacity=" + 100 * f + ")"))
                                }
                            };
                        for (d = 0; d < this._childObjArray.length; d += 1) e = c * (d - b), a(this._childObjArray[d].el).animate({
                            _degree: e
                        }, {
                            duration: this._carousel3dObj.option.animationDuration,
                            step: i.bind(this)
                        })
                    }
            }, b.exports = c
        }()
    }, {}]
}, {}, [1]),
function() {
    "use strict";
    var a = jQuery.fn.resize;
    jQuery.fn.resize = function(b) {
        var c = jQuery(this).width(),
            d = jQuery(this).height();
        a.call(this, function() {
            (jQuery(this).width() !== c || jQuery(this).height() !== d) && (c = jQuery(this).width(), d = jQuery(this).height(), b(this))
        }.bind(this))
    }
}();
/* Work Flow -coatFlow */

"use strict";
! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function y(e) {
        var t = e.length,
            n = p.type(e);
        return "function" === n || p.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function x(e, t, n) {
        if (p.isFunction(t)) return p.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return p.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (S.test(t)) return p.filter(t, e, n);
            t = p.filter(t, e)
        }
        return p.grep(e, function(e) {
            return p.inArray(e, t) >= 0 !== n
        })
    }

    function O(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function D(e) {
        var t = _[e] = {};
        return p.each(e.match(M) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function H() {
        N.addEventListener ? (N.removeEventListener("DOMContentLoaded", B, !1), e.removeEventListener("load", B, !1)) : (N.detachEvent("onreadystatechange", B), e.detachEvent("onload", B))
    }

    function B() {
        (N.addEventListener || "load" === event.type || "complete" === N.readyState) && (H(), p.ready())
    }

    function R(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(q, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : I.test(n) ? p.parseJSON(n) : n
                } catch (i) {}
                p.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function U(e) {
        var t;
        for (t in e)
            if (("data" !== t || !p.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function z(e, t, r, i) {
        if (p.acceptData(e)) {
            var s, o, u = p.expando,
                a = e.nodeType,
                f = a ? p.cache : e,
                l = a ? e[u] : e[u] && u;
            if (l && f[l] && (i || f[l].data) || void 0 !== r || "string" != typeof t) return l || (l = a ? e[u] = n.pop() || p.guid++ : u), f[l] || (f[l] = a ? {} : {
                toJSON: p.noop
            }), ("object" == typeof t || "function" == typeof t) && (i ? f[l] = p.extend(f[l], t) : f[l].data = p.extend(f[l].data, t)), o = f[l], i || (o.data || (o.data = {}), o = o.data), void 0 !== r && (o[p.camelCase(t)] = r), "string" == typeof t ? (s = o[t], null == s && (s = o[p.camelCase(t)])) : s = o, s
        }
    }

    function W(e, t, n) {
        if (p.acceptData(e)) {
            var r, i, s = e.nodeType,
                o = s ? p.cache : e,
                u = s ? e[p.expando] : p.expando;
            if (o[u]) {
                if (t && (r = n ? o[u] : o[u].data)) {
                    p.isArray(t) ? t = t.concat(p.map(t, p.camelCase)) : t in r ? t = [t] : (t = p.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    while (i--) delete r[t[i]];
                    if (n ? !U(r) : !p.isEmptyObject(r)) return
                }(n || (delete o[u].data, U(o[u]))) && (s ? p.cleanData([e], !0) : c.deleteExpando || o != o.window ? delete o[u] : o[u] = null)
            }
        }
    }

    function tt() {
        return !0
    }

    function nt() {
        return !1
    }

    function rt() {
        try {
            return N.activeElement
        } catch (e) {}
    }

    function it(e) {
        var t = st.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length) n.createElement(t.pop());
        return n
    }

    function Et(e, t) {
        var n, r, i = 0,
            s = typeof e.getElementsByTagName !== j ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== j ? e.querySelectorAll(t || "*") : void 0;
        if (!s)
            for (s = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || p.nodeName(r, t) ? s.push(r) : p.merge(s, Et(r, t));
        return void 0 === t || t && p.nodeName(e, t) ? p.merge([e], s) : s
    }

    function St(e) {
        K.test(e.type) && (e.defaultChecked = e.checked)
    }

    function xt(e, t) {
        return p.nodeName(e, "table") && p.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function Tt(e) {
        return e.type = (null !== p.find.attr(e, "type")) + "/" + e.type, e
    }

    function Nt(e) {
        var t = mt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Ct(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) p._data(n, "globalEval", !t || p._data(t[r], "globalEval"))
    }

    function kt(e, t) {
        if (1 === t.nodeType && p.hasData(e)) {
            var n, r, i, s = p._data(e),
                o = p._data(t, s),
                u = s.events;
            if (u) {
                delete o.handle, o.events = {};
                for (n in u)
                    for (r = 0, i = u[n].length; i > r; r++) p.event.add(t, n, u[n][r])
            }
            o.data && (o.data = p.extend({}, o.data))
        }
    }

    function Lt(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !c.noCloneEvent && t[p.expando]) {
                i = p._data(t);
                for (r in i.events) p.removeEvent(t, r, i.handle);
                t.removeAttribute(p.expando)
            }
            "script" === n && t.text !== e.text ? (Tt(t).text = e.text, Nt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), c.html5Clone && e.innerHTML && !p.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && K.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function Mt(t, n) {
        var r = p(n.createElement(t)).appendTo(n.body),
            i = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(r[0]).display : p.css(r[0], "display");
        return r.detach(), i
    }

    function _t(e) {
        var t = N,
            n = Ot[e];
        return n || (n = Mt(e, t), "none" !== n && n || (At = (At || p("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (At[0].contentWindow || At[0].contentDocument).document, t.write(), t.close(), n = Mt(e, t), At.detach()), Ot[e] = n), n
    }

    function Ft(e, t) {
        return {
            get: function() {
                var n = e();
                if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function $t(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Vt.length;
        while (i--)
            if (t = Vt[i] + n, t in e) return t;
        return r
    }

    function Jt(e, t) {
        for (var n, r, i, s = [], o = 0, u = e.length; u > o; o++) r = e[o], r.style && (s[o] = p._data(r, "olddisplay"), n = r.style.display, t ? (s[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && $(r) && (s[o] = p._data(r, "olddisplay", _t(r.nodeName)))) : s[o] || (i = $(r), (n && "none" !== n || !i) && p._data(r, "olddisplay", i ? n : p.css(r, "display"))));
        for (o = 0; u > o; o++) r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? s[o] || "" : "none"));
        return e
    }

    function Kt(e, t, n) {
        var r = Ut.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Qt(e, t, n, r, i) {
        for (var s = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > s; s += 2) "margin" === n && (o += p.css(e, n + V[s], !0, i)), r ? ("content" === n && (o -= p.css(e, "padding" + V[s], !0, i)), "margin" !== n && (o -= p.css(e, "border" + V[s] + "Width", !0, i))) : (o += p.css(e, "padding" + V[s], !0, i), "padding" !== n && (o += p.css(e, "border" + V[s] + "Width", !0, i)));
        return o
    }

    function Gt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            s = Ht(e),
            o = c.boxSizing() && "border-box" === p.css(e, "boxSizing", !1, s);
        if (0 >= i || null == i) {
            if (i = Bt(e, t, s), (0 > i || null == i) && (i = e.style[t]), Pt.test(i)) return i;
            r = o && (c.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Qt(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function Yt(e, t, n, r, i) {
        return new Yt.prototype.init(e, t, n, r, i)
    }

    function un() {
        return setTimeout(function() {
            Zt = void 0
        }), Zt = p.now()
    }

    function an(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = V[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function fn(e, t, n) {
        for (var r, i = (on[t] || []).concat(on["*"]), s = 0, o = i.length; o > s; s++)
            if (r = i[s].call(n, t, e)) return r
    }

    function ln(e, t, n) {
        var r, i, s, o, u, a, f, l, h = this,
            d = {},
            v = e.style,
            m = e.nodeType && $(e),
            g = p._data(e, "fxshow");
        n.queue || (u = p._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
            u.unqueued || a()
        }), u.unqueued++, h.always(function() {
            h.always(function() {
                u.unqueued--, p.queue(e, "fx").length || u.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = p.css(e, "display"), l = _t(e.nodeName), "none" === f && (f = l), "inline" === f && "none" === p.css(e, "float") && (c.inlineBlockNeedsLayout && "inline" !== l ? v.zoom = 1 : v.display = "inline-block")), n.overflow && (v.overflow = "hidden", c.shrinkWrapBlocks() || h.always(function() {
            v.overflow = n.overflow[0], v.overflowX = n.overflow[1], v.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], tn.exec(i)) {
                if (delete t[r], s = s || "toggle" === i, i === (m ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r]) continue;
                    m = !0
                }
                d[r] = g && g[r] || p.style(e, r)
            }
        if (!p.isEmptyObject(d)) {
            g ? "hidden" in g && (m = g.hidden) : g = p._data(e, "fxshow", {}), s && (g.hidden = !m), m ? p(e).show() : h.done(function() {
                p(e).hide()
            }), h.done(function() {
                var t;
                p._removeData(e, "fxshow");
                for (t in d) p.style(e, t, d[t])
            });
            for (r in d) o = fn(m ? g[r] : 0, r, h), r in g || (g[r] = o.start, m && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function cn(e, t) {
        var n, r, i, s, o;
        for (n in e)
            if (r = p.camelCase(n), i = t[r], s = e[n], p.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = p.cssHooks[r], o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
    }

    function hn(e, t, n) {
        var r, i, s = 0,
            o = sn.length,
            u = p.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                if (i) return !1;
                for (var t = Zt || un(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length; a > o; o++) f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]), 1 > s && a ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: p.extend({}, t),
                opts: p.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Zt || un(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = p.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        for (cn(l, f.opts.specialEasing); o > s; s++)
            if (r = sn[s].call(f, e, l, f.opts)) return r;
        return p.map(l, fn, f), p.isFunction(f.opts.start) && f.opts.start.call(e, f), p.fx.timer(p.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function In(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(M) || [];
            if (p.isFunction(n))
                while (r = s[i++]) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function qn(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, p.each(e[u] || [], function(e, u) {
                var f = u(t, n, r);
                return "string" != typeof f || s || i[f] ? s ? !(a = f) : void 0 : (t.dataTypes.unshift(f), o(f), !1)
            }), a
        }
        var i = {},
            s = e === Bn;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function Rn(e, t) {
        var n, r, i = p.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && p.extend(!0, e, n), e
    }

    function Un(e, t, n) {
        var r, i, s, o, u = e.contents,
            a = e.dataTypes;
        while ("*" === a[0]) a.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in u)
                if (u[o] && u[o].test(i)) {
                    a.unshift(o);
                    break
                }
        if (a[0] in n) s = a[0];
        else {
            for (o in n) {
                if (!a[0] || e.converters[o + " " + a[0]]) {
                    s = o;
                    break
                }
                r || (r = o)
            }
            s = s || r
        }
        return s ? (s !== a[0] && a.unshift(s), n[s]) : void 0
    }

    function zn(e, t, n, r) {
        var i, s, o, u, a, f = {},
            l = e.dataTypes.slice();
        if (l[1])
            for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s)
            if (e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift())
                if ("*" === s) s = a;
                else if ("*" !== a && a !== s) {
            if (o = f[a + " " + s] || f["* " + s], !o)
                for (i in f)
                    if (u = i.split(" "), u[1] === s && (o = f[a + " " + u[0]] || f["* " + u[0]])) {
                        o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                        break
                    }
            if (o !== !0)
                if (o && e["throws"]) t = o(t);
                else try {
                    t = o(t)
                } catch (c) {
                    return {
                        state: "parsererror",
                        error: o ? c : "No conversion from " + a + " to " + s
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function Kn(e, t, n, r) {
        var i;
        if (p.isArray(t)) p.each(t, function(t, i) {
            n || Xn.test(e) ? r(e, i) : Kn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== p.type(t)) r(e, t);
        else
            for (i in t) Kn(e + "[" + i + "]", t[i], n, r)
    }

    function Zn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function er() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function sr(e) {
        return p.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var n = [],
        r = n.slice,
        i = n.concat,
        s = n.push,
        o = n.indexOf,
        u = {},
        a = u.toString,
        f = u.hasOwnProperty,
        l = "".trim,
        c = {},
        h = "1.11.0",
        p = function(e, t) {
            return new p.fn.init(e, t)
        },
        d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        v = /^-ms-/,
        m = /-([\da-z])/gi,
        g = function(e, t) {
            return t.toUpperCase()
        };
    p.fn = p.prototype = {
        jquery: h,
        constructor: p,
        selector: "",
        length: 0,
        toArray: function() {
            return r.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : r.call(this)
        },
        pushStack: function(e) {
            var t = p.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return p.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(p.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(r.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: s,
        sort: n.sort,
        splice: n.splice
    }, p.extend = p.fn.extend = function() {
        var e, t, n, r, i, s, o = arguments[0] || {},
            u = 1,
            a = arguments.length,
            f = !1;
        for ("boolean" == typeof o && (f = o, o = arguments[u] || {}, u++), "object" == typeof o || p.isFunction(o) || (o = {}), u === a && (o = this, u--); a > u; u++)
            if (null != (i = arguments[u]))
                for (r in i) e = o[r], n = i[r], o !== n && (f && n && (p.isPlainObject(n) || (t = p.isArray(n))) ? (t ? (t = !1, s = e && p.isArray(e) ? e : []) : s = e && p.isPlainObject(e) ? e : {}, o[r] = p.extend(f, s, n)) : void 0 !== n && (o[r] = n));
        return o
    }, p.extend({
        expando: "jQuery" + (h + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === p.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === p.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return e - parseFloat(e) >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== p.type(e) || e.nodeType || p.isWindow(e)) return !1;
            try {
                if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (c.ownLast)
                for (t in e) return f.call(e, t);
            for (t in e);
            return void 0 === t || f.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[a.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && p.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(v, "ms-").replace(m, g)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = y(e);
            if (n) {
                if (o) {
                    for (; s > i; i++)
                        if (r = t.apply(e[i], n), r === !1) break
                } else
                    for (i in e)
                        if (r = t.apply(e[i], n), r === !1) break
            } else if (o) {
                for (; s > i; i++)
                    if (r = t.call(e[i], i, e[i]), r === !1) break
            } else
                for (i in e)
                    if (r = t.call(e[i], i, e[i]), r === !1) break; return e
        },
        trim: l && !l.call("﻿ ") ? function(e) {
            return null == e ? "" : l.call(e)
        } : function(e) {
            return null == e ? "" : (e + "").replace(d, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (y(Object(e)) ? p.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (o) return o.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, t) {
            var n = +t.length,
                r = 0,
                i = e.length;
            while (n > r) e[i++] = t[r++];
            if (n !== n)
                while (void 0 !== t[r]) e[i++] = t[r++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], s = 0, o = e.length, u = !n; o > s; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
            return i
        },
        map: function(e, t, n) {
            var r, s = 0,
                o = e.length,
                u = y(e),
                a = [];
            if (u)
                for (; o > s; s++) r = t(e[s], s, n), null != r && a.push(r);
            else
                for (s in e) r = t(e[s], s, n), null != r && a.push(r);
            return i.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, s;
            return "string" == typeof t && (s = e[t], t = e, e = s), p.isFunction(e) ? (n = r.call(arguments, 2), i = function() {
                return e.apply(t || this, n.concat(r.call(arguments)))
            }, i.guid = e.guid = e.guid || p.guid++, i) : void 0
        },
        now: function() {
            return +(new Date)
        },
        support: c
    }), p.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    });
    var b = function(e) {
        function rt(e, t, r, i) {
            var s, o, u, a, f, h, v, m, w, E;
            if ((t ? t.ownerDocument || t : b) !== c && l(t), t = t || c, r = r || [], !e || "string" != typeof e) return r;
            if (1 !== (a = t.nodeType) && 9 !== a) return [];
            if (p && !i) {
                if (s = G.exec(e))
                    if (u = s[1]) {
                        if (9 === a) {
                            if (o = t.getElementById(u), !o || !o.parentNode) return r;
                            if (o.id === u) return r.push(o), r
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(u)) && g(t, o) && o.id === u) return r.push(o), r
                    } else {
                        if (s[2]) return _.apply(r, t.getElementsByTagName(e)), r;
                        if ((u = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return _.apply(r, t.getElementsByClassName(u)), r
                    }
                if (n.qsa && (!d || !d.test(e))) {
                    if (m = v = y, w = t, E = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        h = dt(e), (v = t.getAttribute("id")) ? m = v.replace(Z, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", f = h.length;
                        while (f--) h[f] = m + vt(h[f]);
                        w = Y.test(e) && ht(t.parentNode) || t, E = h.join(",")
                    }
                    if (E) try {
                        return _.apply(r, w.querySelectorAll(E)), r
                    } catch (S) {} finally {
                        v || t.removeAttribute("id")
                    }
                }
            }
            return xt(e.replace(R, "$1"), t, r, i)
        }

        function it() {
            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            var e = [];
            return t
        }

        function st(e) {
            return e[y] = !0, e
        }

        function ot(e) {
            var t = c.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ut(e, t) {
            var n = e.split("|"),
                i = e.length;
            while (i--) r.attrHandle[n[i]] = t
        }

        function at(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || k) - (~e.sourceIndex || k);
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function ft(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function lt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function ct(e) {
            return st(function(t) {
                return t = +t, st(function(n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function ht(e) {
            return e && typeof e.getElementsByTagName !== C && e
        }

        function pt() {}

        function dt(e, t) {
            var n, i, s, o, u, a, f, l = x[e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = r.preFilter;
            while (u) {
                (!n || (i = U.exec(u))) && (i && (u = u.slice(i[0].length) || u), a.push(s = [])), n = !1, (i = z.exec(u)) && (n = i.shift(), s.push({
                    value: n,
                    type: i[0].replace(R, " ")
                }), u = u.slice(n.length));
                for (o in r.filter) !(i = $[o].exec(u)) || f[o] && !(i = f[o](i)) || (n = i.shift(), s.push({
                    value: n,
                    type: o,
                    matches: i
                }), u = u.slice(n.length));
                if (!n) break
            }
            return t ? u.length : u ? rt.error(e) : x(e, a).slice(0)
        }

        function vt(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function mt(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                s = E++;
            return t.first ? function(t, n, s) {
                while (t = t[r])
                    if (1 === t.nodeType || i) return e(t, n, s)
            } : function(t, n, o) {
                var u, a, f = [w, s];
                if (o) {
                    while (t = t[r])
                        if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                } else
                    while (t = t[r])
                        if (1 === t.nodeType || i) {
                            if (a = t[y] || (t[y] = {}), (u = a[r]) && u[0] === w && u[1] === s) return f[2] = u[2];
                            if (a[r] = f, f[2] = e(t, n, o)) return !0
                        }
            }
        }

        function gt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function yt(e, t, n, r, i) {
            for (var s, o = [], u = 0, a = e.length, f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
            return o
        }

        function bt(e, t, n, r, i, s) {
            return r && !r[y] && (r = bt(r)), i && !i[y] && (i = bt(i, s)), st(function(s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || St(t || "*", u.nodeType ? [u] : u, []),
                    m = !e || !s && t ? v : yt(v, h, e, u, a),
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                if (n && n(m, g, u, a), r) {
                    f = yt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c))
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? P.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = yt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : _.apply(o, g)
            })
        }

        function wt(e) {
            for (var t, n, i, s = e.length, o = r.relative[e[0].type], a = o || r.relative[" "], f = o ? 1 : 0, l = mt(function(e) {
                    return e === t
                }, a, !0), c = mt(function(e) {
                    return P.call(t, e) > -1
                }, a, !0), h = [function(e, n, r) {
                    return !o && (r || n !== u) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                }]; s > f; f++)
                if (n = r.relative[e[f].type]) h = [mt(gt(h), n)];
                else {
                    if (n = r.filter[e[f].type].apply(null, e[f].matches), n[y]) {
                        for (i = ++f; s > i; i++)
                            if (r.relative[e[i].type]) break;
                        return bt(f > 1 && gt(h), f > 1 && vt(e.slice(0, f - 1).concat({
                            value: " " === e[f - 2].type ? "*" : ""
                        })).replace(R, "$1"), n, i > f && wt(e.slice(f, i)), s > i && wt(e = e.slice(i)), s > i && vt(e))
                    }
                    h.push(n)
                }
            return gt(h)
        }

        function Et(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                s = function(s, o, a, f, l) {
                    var h, p, d, v = 0,
                        m = "0",
                        g = s && [],
                        y = [],
                        b = u,
                        E = s || i && r.find.TAG("*", l),
                        S = w += null == b ? 1 : Math.random() || .1,
                        x = E.length;
                    for (l && (u = o !== c && o); m !== x && null != (h = E[m]); m++) {
                        if (i && h) {
                            p = 0;
                            while (d = e[p++])
                                if (d(h, o, a)) {
                                    f.push(h);
                                    break
                                }
                            l && (w = S)
                        }
                        n && ((h = !d && h) && v--, s && g.push(h))
                    }
                    if (v += m, n && m !== v) {
                        p = 0;
                        while (d = t[p++]) d(g, y, o, a);
                        if (s) {
                            if (v > 0)
                                while (m--) g[m] || y[m] || (y[m] = O.call(f));
                            y = yt(y)
                        }
                        _.apply(f, y), l && !s && y.length > 0 && v + t.length > 1 && rt.uniqueSort(f)
                    }
                    return l && (w = S, u = b), g
                };
            return n ? st(s) : s
        }

        function St(e, t, n) {
            for (var r = 0, i = t.length; i > r; r++) rt(e, t[r], n);
            return n
        }

        function xt(e, t, i, s) {
            var u, a, f, l, c, h = dt(e);
            if (!s && 1 === h.length) {
                if (a = h[0] = h[0].slice(0), a.length > 2 && "ID" === (f = a[0]).type && n.getById && 9 === t.nodeType && p && r.relative[a[1].type]) {
                    if (t = (r.find.ID(f.matches[0].replace(et, tt), t) || [])[0], !t) return i;
                    e = e.slice(a.shift().value.length)
                }
                u = $.needsContext.test(e) ? 0 : a.length;
                while (u--) {
                    if (f = a[u], r.relative[l = f.type]) break;
                    if ((c = r.find[l]) && (s = c(f.matches[0].replace(et, tt), Y.test(a[0].type) && ht(t.parentNode) || t))) {
                        if (a.splice(u, 1), e = s.length && vt(a), !e) return _.apply(i, s), i;
                        break
                    }
                }
            }
            return o(e, h)(s, t, !p, i, Y.test(e) && ht(t.parentNode) || t), i
        }
        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y = "sizzle" + -(new Date),
            b = e.document,
            w = 0,
            E = 0,
            S = it(),
            x = it(),
            T = it(),
            N = function(e, t) {
                return e === t && (f = !0), 0
            },
            C = "undefined",
            k = 1 << 31,
            L = {}.hasOwnProperty,
            A = [],
            O = A.pop,
            M = A.push,
            _ = A.push,
            D = A.slice,
            P = A.indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            },
            H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            B = "[\\x20\\t\\r\\n\\f]",
            j = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            F = j.replace("w", "w#"),
            I = "\\[" + B + "*(" + j + ")" + B + "*(?:([*^$|!~]?=)" + B + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + F + ")|)|)" + B + "*\\]",
            q = ":(" + j + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + I.replace(3, 8) + ")*)|.*)\\)|)",
            R = new RegExp("^" + B + "+|((?:^|[^\\\\])(?:\\\\.)*)" + B + "+$", "g"),
            U = new RegExp("^" + B + "*," + B + "*"),
            z = new RegExp("^" + B + "*([>+~]|" + B + ")" + B + "*"),
            W = new RegExp("=" + B + "*([^\\]'\"]*?)" + B + "*\\]", "g"),
            X = new RegExp(q),
            V = new RegExp("^" + F + "$"),
            $ = {
                ID: new RegExp("^#(" + j + ")"),
                CLASS: new RegExp("^\\.(" + j + ")"),
                TAG: new RegExp("^(" + j.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + I),
                PSEUDO: new RegExp("^" + q),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + B + "*(even|odd|(([+-]|)(\\d*)n|)" + B + "*(?:([+-]|)" + B + "*(\\d+)|))" + B + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + H + ")$", "i"),
                needsContext: new RegExp("^" + B + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + B + "*((?:-\\d)?\\d*)" + B + "*\\)|)(?=[^-]|$)", "i")
            },
            J = /^(?:input|select|textarea|button)$/i,
            K = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            G = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Y = /[+~]/,
            Z = /'|\\/g,
            et = new RegExp("\\\\([\\da-f]{1,6}" + B + "?|(" + B + ")|.)", "ig"),
            tt = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            };
        try {
            _.apply(A = D.call(b.childNodes), b.childNodes), A[b.childNodes.length].nodeType
        } catch (nt) {
            _ = {
                apply: A.length ? function(e, t) {
                    M.apply(e, D.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        n = rt.support = {}, s = rt.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, l = rt.setDocument = function(e) {
            var t, i = e ? e.ownerDocument || e : b,
                o = i.defaultView;
            return i !== c && 9 === i.nodeType && i.documentElement ? (c = i, h = i.documentElement, p = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
                l()
            }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
                l()
            })), n.attributes = ot(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ot(function(e) {
                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Q.test(i.getElementsByClassName) && ot(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), n.getById = ot(function(e) {
                return h.appendChild(e).id = y, !i.getElementsByName || !i.getElementsByName(y).length
            }), n.getById ? (r.find.ID = function(e, t) {
                if (typeof t.getElementById !== C && p) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function(e) {
                var t = e.replace(et, tt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function(e) {
                var t = e.replace(et, tt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== C && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== C ? t.getElementsByTagName(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    s = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = s[i++]) 1 === n.nodeType && r.push(n);
                    return r
                }
                return s
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== C && p ? t.getElementsByClassName(e) : void 0
            }, v = [], d = [], (n.qsa = Q.test(i.querySelectorAll)) && (ot(function(e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + B + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || d.push("\\[" + B + "*(?:value|" + H + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
            }), ot(function(e) {
                var t = i.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && d.push("name" + B + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
            })), (n.matchesSelector = Q.test(m = h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ot(function(e) {
                n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), v.push("!=", q)
            }), d = d.length && new RegExp(d.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), g = t || Q.test(h.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !!r && 1 === r.nodeType && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, N = t ? function(e, t) {
                if (e === t) return f = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === b && g(b, e) ? -1 : t === i || t.ownerDocument === b && g(b, t) ? 1 : a ? P.call(a, e) - P.call(a, t) : 0 : 4 & r ? -1 : 1)
            } : function(e, t) {
                if (e === t) return f = !0, 0;
                var n, r = 0,
                    s = e.parentNode,
                    o = t.parentNode,
                    u = [e],
                    l = [t];
                if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : a ? P.call(a, e) - P.call(a, t) : 0;
                if (s === o) return at(e, t);
                n = e;
                while (n = n.parentNode) u.unshift(n);
                n = t;
                while (n = n.parentNode) l.unshift(n);
                while (u[r] === l[r]) r++;
                return r ? at(u[r], l[r]) : u[r] === b ? -1 : l[r] === b ? 1 : 0
            }, i) : c
        }, rt.matches = function(e, t) {
            return rt(e, null, null, t)
        }, rt.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== c && l(e), t = t.replace(W, "='$1']"), !(!n.matchesSelector || !p || v && v.test(t) || d && d.test(t))) try {
                var r = m.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return rt(t, c, null, [e]).length > 0
        }, rt.contains = function(e, t) {
            return (e.ownerDocument || e) !== c && l(e), g(e, t)
        }, rt.attr = function(e, t) {
            (e.ownerDocument || e) !== c && l(e);
            var i = r.attrHandle[t.toLowerCase()],
                s = i && L.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !p) : void 0;
            return void 0 !== s ? s : n.attributes || !p ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }, rt.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, rt.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                s = 0;
            if (f = !n.detectDuplicates, a = !n.sortStable && e.slice(0), e.sort(N), f) {
                while (t = e[s++]) t === e[s] && (i = r.push(s));
                while (i--) e.splice(r[i], 1)
            }
            return a = null, e
        }, i = rt.getText = function(e) {
            var t, n = "",
                r = 0,
                s = e.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                } else if (3 === s || 4 === s) return e.nodeValue
            } else
                while (t = e[r++]) n += i(t);
            return n
        }, r = rt.selectors = {
            cacheLength: 50,
            createPseudo: st,
            match: $,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(et, tt), e[3] = (e[4] || e[5] || "").replace(et, tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || rt.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && rt.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[5] && e[2];
                    return $.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && X.test(n) && (t = dt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(et, tt).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = S[e + " "];
                    return t || (t = new RegExp("(^|" + B + ")" + e + "(" + B + "|$)")) && S(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== C && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = rt.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var s = "nth" !== e.slice(0, 3),
                        o = "last" !== e.slice(-4),
                        u = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(),
                            b = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])
                                        if (u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                    d = v = "only" === e && !d && "nextSibling"
                                }
                                return !0
                            }
                            if (d = [o ? m.firstChild : m.lastChild], o && b) {
                                l = m[y] || (m[y] = {}), f = l[e] || [], p = f[0] === w && f[1], h = f[0] === w && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if (1 === c.nodeType && ++h && c === t) {
                                        l[e] = [w, p, h];
                                        break
                                    }
                            } else if (b && (f = (t[y] || (t[y] = {}))[e]) && f[0] === w) h = f[1];
                            else
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if ((u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++h && (b && ((c[y] || (c[y] = {}))[e] = [w, h]), c === t)) break; return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || rt.error("unsupported pseudo: " + e);
                    return i[y] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? st(function(e, n) {
                        var r, s = i(e, t),
                            o = s.length;
                        while (o--) r = P.call(e, s[o]), e[r] = !(n[r] = s[o])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: st(function(e) {
                    var t = [],
                        n = [],
                        r = o(e.replace(R, "$1"));
                    return r[y] ? st(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--)(s = o[u]) && (e[u] = !(t[u] = s))
                    }) : function(e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop()
                    }
                }),
                has: st(function(e) {
                    return function(t) {
                        return rt(e, t).length > 0
                    }
                }),
                contains: st(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }),
                lang: st(function(e) {
                    return V.test(e || "") || rt.error("unsupported lang: " + e), e = e.replace(et, tt).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = p ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === c.activeElement && (!c.hasFocus || c.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return K.test(e.nodeName)
                },
                input: function(e) {
                    return J.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: ct(function() {
                    return [0]
                }),
                last: ct(function(e, t) {
                    return [t - 1]
                }),
                eq: ct(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: ct(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: ct(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: ct(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: ct(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = ft(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = lt(t);
        return pt.prototype = r.filters = r.pseudos, r.setFilters = new pt, o = rt.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = T[e + " "];
            if (!s) {
                t || (t = dt(e)), n = t.length;
                while (n--) s = wt(t[n]), s[y] ? r.push(s) : i.push(s);
                s = T(e, Et(i, r))
            }
            return s
        }, n.sortStable = y.split("").sort(N).join("") === y, n.detectDuplicates = !!f, l(), n.sortDetached = ot(function(e) {
            return 1 & e.compareDocumentPosition(c.createElement("div"))
        }), ot(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || ut("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ot(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || ut("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), ot(function(e) {
            return null == e.getAttribute("disabled")
        }) || ut(H, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), rt
    }(e);
    p.find = b, p.expr = b.selectors, p.expr[":"] = p.expr.pseudos, p.unique = b.uniqueSort, p.text = b.getText, p.isXMLDoc = b.isXML, p.contains = b.contains;
    var w = p.expr.match.needsContext,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^.[^:#\[\.,]*$/;
    p.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? p.find.matchesSelector(r, e) ? [r] : [] : p.find.matches(e, p.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, p.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(p(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (p.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) p.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? p.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(x(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(x(this, e || [], !0))
        },
        is: function(e) {
            return !!x(this, "string" == typeof e && w.test(e) ? p(e) : e || [], !1).length
        }
    });
    var T, N = e.document,
        C = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        k = p.fn.init = function(e, t) {
            var n, r;
            if (!e) return this;
            if ("string" == typeof e) {
                if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : C.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || T).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof p ? t[0] : t, p.merge(this, p.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : N, !0)), E.test(n[1]) && p.isPlainObject(t))
                        for (n in t) p.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                if (r = N.getElementById(n[2]), r && r.parentNode) {
                    if (r.id !== n[2]) return T.find(e);
                    this.length = 1, this[0] = r
                }
                return this.context = N, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : p.isFunction(e) ? "undefined" != typeof T.ready ? T.ready(e) : e(p) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), p.makeArray(e, this))
        };
    k.prototype = p.fn, T = p(N);
    var L = /^(?:parents|prev(?:Until|All))/,
        A = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    p.extend({
        dir: function(e, t, n) {
            var r = [],
                i = e[t];
            while (i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !p(i).is(n))) 1 === i.nodeType && r.push(i), i = i[t];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), p.fn.extend({
        has: function(e) {
            var t, n = p(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++)
                    if (p.contains(this, n[t])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, s = [], o = w.test(e) || "string" != typeof e ? p(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && p.find.matchesSelector(n, e))) {
                        s.push(n);
                        break
                    }
            return this.pushStack(s.length > 1 ? p.unique(s) : s)
        },
        index: function(e) {
            return e ? "string" == typeof e ? p.inArray(this[0], p(e)) : p.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(p.unique(p.merge(this.get(), p(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), p.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return p.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return p.dir(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return p.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return p.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return p.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return p.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return p.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return p.sibling(e.firstChild)
        },
        contents: function(e) {
            return p.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : p.merge([], e.childNodes)
        }
    }, function(e, t) {
        p.fn[e] = function(n, r) {
            var i = p.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = p.filter(r, i)), this.length > 1 && (A[e] || (i = p.unique(i)), L.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var M = /\S+/g,
        _ = {};
    p.Callbacks = function(e) {
        e = "string" == typeof e ? _[e] || D(e) : p.extend({}, e);
        var t, n, r, i, s, o, u = [],
            a = !e.once && [],
            f = function(c) {
                for (n = e.memory && c, r = !0, s = o || 0, o = 0, i = u.length, t = !0; u && i > s; s++)
                    if (u[s].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                t = !1, u && (a ? a.length && f(a.shift()) : n ? u = [] : l.disable())
            },
            l = {
                add: function() {
                    if (u) {
                        var r = u.length;
                        ! function s(t) {
                            p.each(t, function(t, n) {
                                var r = p.type(n);
                                "function" === r ? e.unique && l.has(n) || u.push(n) : n && n.length && "string" !== r && s(n)
                            })
                        }(arguments), t ? i = u.length : n && (o = r, f(n))
                    }
                    return this
                },
                remove: function() {
                    return u && p.each(arguments, function(e, n) {
                        var r;
                        while ((r = p.inArray(n, u, r)) > -1) u.splice(r, 1), t && (i >= r && i--, s >= r && s--)
                    }), this
                },
                has: function(e) {
                    return e ? p.inArray(e, u) > -1 : !!u && !!u.length
                },
                empty: function() {
                    return u = [], i = 0, this
                },
                disable: function() {
                    return u = a = n = void 0, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return a = void 0, n || l.disable(), this
                },
                locked: function() {
                    return !a
                },
                fireWith: function(e, n) {
                    return !u || r && !a || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? a.push(n) : f(n)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    }, p.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", p.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", p.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", p.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return p.Deferred(function(n) {
                            p.each(t, function(t, s) {
                                var o = p.isFunction(e[t]) && e[t];
                                i[s[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && p.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? p.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, p.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[1 ^ e][2].disable, t[2][2].lock), i[s[0]] = function() {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = r.call(arguments),
                i = n.length,
                s = 1 !== i || e && p.isFunction(e.promise) ? i : 0,
                o = 1 === s ? e : p.Deferred(),
                u = function(e, t, n) {
                    return function(i) {
                        t[e] = this, n[e] = arguments.length > 1 ? r.call(arguments) : i, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                    }
                },
                a, f, l;
            if (i > 1)
                for (a = new Array(i), f = new Array(i), l = new Array(i); i > t; t++) n[t] && p.isFunction(n[t].promise) ? n[t].promise().done(u(t, l, n)).fail(o.reject).progress(u(t, f, a)) : --s;
            return s || o.resolveWith(l, n), o.promise()
        }
    });
    var P;
    p.fn.ready = function(e) {
        return p.ready.promise().done(e), this
    }, p.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? p.readyWait++ : p.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--p.readyWait : !p.isReady) {
                if (!N.body) return setTimeout(p.ready);
                p.isReady = !0, e !== !0 && --p.readyWait > 0 || (P.resolveWith(N, [p]), p.fn.trigger && p(N).trigger("ready").off("ready"))
            }
        }
    }), p.ready.promise = function(t) {
        if (!P)
            if (P = p.Deferred(), "complete" === N.readyState) setTimeout(p.ready);
            else if (N.addEventListener) N.addEventListener("DOMContentLoaded", B, !1), e.addEventListener("load", B, !1);
        else {
            N.attachEvent("onreadystatechange", B), e.attachEvent("onload", B);
            var n = !1;
            try {
                n = null == e.frameElement && N.documentElement
            } catch (r) {}
            n && n.doScroll && ! function i() {
                if (!p.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    H(), p.ready()
                }
            }()
        }
        return P.promise(t)
    };
    var j = "undefined",
        F;
    for (F in p(c)) break;
    c.ownLast = "0" !== F, c.inlineBlockNeedsLayout = !1, p(function() {
            var e, t, n = N.getElementsByTagName("body")[0];
            n && (e = N.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = N.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== j && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (c.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
        }),
        function() {
            var e = N.createElement("div");
            if (null == c.deleteExpando) {
                c.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    c.deleteExpando = !1
                }
            }
            e = null
        }(), p.acceptData = function(e) {
            var t = p.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        };
    var I = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        q = /([A-Z])/g;
    p.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? p.cache[e[p.expando]] : e[p.expando], !!e && !U(e)
        },
        data: function(e, t, n) {
            return z(e, t, n)
        },
        removeData: function(e, t) {
            return W(e, t)
        },
        _data: function(e, t, n) {
            return z(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return W(e, t, !0)
        }
    }), p.fn.extend({
        data: function(e, t) {
            var n, r, i, s = this[0],
                o = s && s.attributes;
            if (void 0 === e) {
                if (this.length && (i = p.data(s), 1 === s.nodeType && !p._data(s, "parsedAttrs"))) {
                    n = o.length;
                    while (n--) r = o[n].name, 0 === r.indexOf("data-") && (r = p.camelCase(r.slice(5)), R(s, r, i[r]));
                    p._data(s, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                p.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                p.data(this, e, t)
            }) : s ? R(s, e, p.data(s, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                p.removeData(this, e)
            })
        }
    }), p.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = p._data(e, t), n && (!r || p.isArray(n) ? r = p._data(e, t, p.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = p.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = p._queueHooks(e, t),
                o = function() {
                    p.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return p._data(e, n) || p._data(e, n, {
                empty: p.Callbacks("once memory").add(function() {
                    p._removeData(e, t + "queue"), p._removeData(e, n)
                })
            })
        }
    }), p.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? p.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = p.queue(this, e, t);
                p._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && p.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                p.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = p.Deferred(),
                s = this,
                o = this.length,
                u = function() {
                    --r || i.resolveWith(s, [s])

                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (o--) n = p._data(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var X = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        V = ["Top", "Right", "Bottom", "Left"],
        $ = function(e, t) {
            return e = t || e, "none" === p.css(e, "display") || !p.contains(e.ownerDocument, e)
        },
        J = p.access = function(e, t, n, r, i, s, o) {
            var u = 0,
                a = e.length,
                f = null == n;
            if ("object" === p.type(n)) {
                i = !0;
                for (u in n) p.access(e, t, u, n[u], !0, s, o)
            } else if (void 0 !== r && (i = !0, p.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                    return f.call(p(e), n)
                })), t))
                for (; a > u; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)));
            return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
        },
        K = /^(?:checkbox|radio)$/i;
    ! function() {
        var e = N.createDocumentFragment(),
            t = N.createElement("div"),
            n = N.createElement("input");
        if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", c.leadingWhitespace = 3 === t.firstChild.nodeType, c.tbody = !t.getElementsByTagName("tbody").length, c.htmlSerialize = !!t.getElementsByTagName("link").length, c.html5Clone = "<:nav></:nav>" !== N.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), c.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", c.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", c.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, c.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
                c.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == c.deleteExpando) {
            c.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                c.deleteExpando = !1
            }
        }
        e = t = n = null
    }(),
    function() {
        var t, n, r = N.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (c[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), c[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var Q = /^(?:input|select|textarea)$/i,
        G = /^key/,
        Y = /^(?:mouse|contextmenu)|click/,
        Z = /^(?:focusinfocus|focusoutblur)$/,
        et = /^([^.]*)(?:\.(.+)|)$/;
    p.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, d, v, m, g = p._data(e);
            if (g) {
                n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = p.guid++), (o = g.events) || (o = g.events = {}), (l = g.handle) || (l = g.handle = function(e) {
                    return typeof p === j || e && p.event.triggered === e.type ? void 0 : p.event.dispatch.apply(l.elem, arguments)
                }, l.elem = e), t = (t || "").match(M) || [""], u = t.length;
                while (u--) s = et.exec(t[u]) || [], d = m = s[1], v = (s[2] || "").split(".").sort(), d && (f = p.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = p.event.special[d] || {}, c = p.extend({
                    type: d,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && p.expr.match.needsContext.test(i),
                    namespace: v.join(".")
                }, a), (h = o[d]) || (h = o[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, r, v, l) !== !1 || (e.addEventListener ? e.addEventListener(d, l, !1) : e.attachEvent && e.attachEvent("on" + d, l))), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, c) : h.push(c), p.event.global[d] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, d, v, m, g = p.hasData(e) && p._data(e);
            if (g && (l = g.events)) {
                t = (t || "").match(M) || [""], f = t.length;
                while (f--)
                    if (u = et.exec(t[f]) || [], d = m = u[1], v = (u[2] || "").split(".").sort(), d) {
                        c = p.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, h = l[d] || [], u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = h.length;
                        while (s--) o = h[s], !i && m !== o.origType || n && n.guid !== o.guid || u && !u.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (h.splice(s, 1), o.selector && h.delegateCount--, c.remove && c.remove.call(e, o));
                        a && !h.length && (c.teardown && c.teardown.call(e, v, g.handle) !== !1 || p.removeEvent(e, d, g.handle), delete l[d])
                    } else
                        for (d in l) p.event.remove(e, d + t[f], n, r, !0);
                p.isEmptyObject(l) && (delete g.handle, p._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var s, o, u, a, l, c, h, d = [r || N],
                v = f.call(t, "type") ? t.type : t,
                m = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (u = c = r = r || N, 3 !== r.nodeType && 8 !== r.nodeType && !Z.test(v + p.event.triggered) && (v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), o = v.indexOf(":") < 0 && "on" + v, t = t[p.expando] ? t : new p.Event(v, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : p.makeArray(n, [t]), l = p.event.special[v] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !p.isWindow(r)) {
                    for (a = l.delegateType || v, Z.test(a + v) || (u = u.parentNode); u; u = u.parentNode) d.push(u), c = u;
                    c === (r.ownerDocument || N) && d.push(c.defaultView || c.parentWindow || e)
                }
                h = 0;
                while ((u = d[h++]) && !t.isPropagationStopped()) t.type = h > 1 ? a : l.bindType || v, s = (p._data(u, "events") || {})[t.type] && p._data(u, "handle"), s && s.apply(u, n), s = o && u[o], s && s.apply && p.acceptData(u) && (t.result = s.apply(u, n), t.result === !1 && t.preventDefault());
                if (t.type = v, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && p.acceptData(r) && o && r[v] && !p.isWindow(r)) {
                    c = r[o], c && (r[o] = null), p.event.triggered = v;
                    try {
                        r[v]()
                    } catch (g) {}
                    p.event.triggered = void 0, c && (r[o] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = p.event.fix(e);
            var t, n, i, s, o, u = [],
                a = r.call(arguments),
                f = (p._data(this, "events") || {})[e.type] || [],
                l = p.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                u = p.event.handlers.call(this, e, f), t = 0;
                while ((s = u[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = s.elem, o = 0;
                    while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((p.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, s, o = [],
                u = t.delegateCount,
                a = e.target;
            if (u && a.nodeType && (!e.button || "click" !== e.type))
                for (; a != this; a = a.parentNode || this)
                    if (1 === a.nodeType && (a.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], s = 0; u > s; s++) r = t[s], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? p(n, this).index(a) >= 0 : p.find(n, this, null, [a]).length), i[n] && i.push(r);
                        i.length && o.push({
                            elem: a,
                            handlers: i
                        })
                    }
            return u < t.length && o.push({
                elem: this,
                handlers: t.slice(u)
            }), o
        },
        fix: function(e) {
            if (e[p.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = Y.test(i) ? this.mouseHooks : G.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new p.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = s.srcElement || N), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, s) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button,
                    o = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || N, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== rt() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === rt() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return p.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return p.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = p.extend(new p.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? p.event.trigger(i, null, t) : p.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, p.removeEvent = N.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === j && (e[r] = null), e.detachEvent(r, n))
    }, p.Event = function(e, t) {
        return this instanceof p.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? tt : nt) : this.type = e, t && p.extend(this, t), this.timeStamp = e && e.timeStamp || p.now(), void(this[p.expando] = !0)) : new p.Event(e, t)
    }, p.Event.prototype = {
        isDefaultPrevented: nt,
        isPropagationStopped: nt,
        isImmediatePropagationStopped: nt,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = tt, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = tt, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = tt, this.stopPropagation()
        }
    }, p.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        p.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj;
                return (!i || i !== r && !p.contains(r, i)) && (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), c.submitBubbles || (p.event.special.submit = {
        setup: function() {
            return p.nodeName(this, "form") ? !1 : void p.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target,
                    n = p.nodeName(t, "input") || p.nodeName(t, "button") ? t.form : void 0;
                n && !p._data(n, "submitBubbles") && (p.event.add(n, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), p._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && p.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return p.nodeName(this, "form") ? !1 : void p.event.remove(this, "._submit")
        }
    }), c.changeBubbles || (p.event.special.change = {
        setup: function() {
            return Q.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (p.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), p.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), p.event.simulate("change", this, e, !0)
            })), !1) : void p.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Q.test(t.nodeName) && !p._data(t, "changeBubbles") && (p.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || p.event.simulate("change", this.parentNode, e, !0)
                }), p._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return p.event.remove(this, "._change"), !Q.test(this.nodeName)
        }
    }), c.focusinBubbles || p.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            p.event.simulate(t, e.target, p.event.fix(e), !0)
        };
        p.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = p._data(r, t);
                i || r.addEventListener(e, n, !0), p._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = p._data(r, t) - 1;
                i ? p._data(r, t, i) : (r.removeEventListener(e, n, !0), p._removeData(r, t))
            }
        }
    }), p.fn.extend({
        on: function(e, t, n, r, i) {
            var s, o;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (s in e) this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = nt;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return p().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = p.guid++)), this.each(function() {
                p.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, p(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = nt), this.each(function() {
                p.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                p.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? p.event.trigger(e, t, n, !0) : void 0
        }
    });
    var st = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ot = / jQuery\d+="(?:null|\d+)"/g,
        ut = new RegExp("<(?:" + st + ")[\\s/>]", "i"),
        at = /^\s+/,
        ft = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        lt = /<([\w:]+)/,
        ct = /<tbody/i,
        ht = /<|&#?\w+;/,
        pt = /<(?:script|style|link)/i,
        dt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        vt = /^$|\/(?:java|ecma)script/i,
        mt = /^true\/(.*)/,
        gt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        yt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: c.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        bt = it(N),
        wt = bt.appendChild(N.createElement("div"));
    yt.optgroup = yt.option, yt.tbody = yt.tfoot = yt.colgroup = yt.caption = yt.thead, yt.th = yt.td, p.extend({
        clone: function(e, t, n) {
            var r, i, s, o, u, a = p.contains(e.ownerDocument, e);
            if (c.html5Clone || p.isXMLDoc(e) || !ut.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (wt.innerHTML = e.outerHTML, wt.removeChild(s = wt.firstChild)), !(c.noCloneEvent && c.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || p.isXMLDoc(e)))
                for (r = Et(s), u = Et(e), o = 0; null != (i = u[o]); ++o) r[o] && Lt(i, r[o]);
            if (t)
                if (n)
                    for (u = u || Et(e), r = r || Et(s), o = 0; null != (i = u[o]); o++) kt(i, r[o]);
                else kt(e, s);
            return r = Et(s, "script"), r.length > 0 && Ct(r, !a && Et(e, "script")), r = u = i = null, s
        },
        buildFragment: function(e, t, n, r) {
            for (var i, s, o, u, a, f, l, h = e.length, d = it(t), v = [], m = 0; h > m; m++)
                if (s = e[m], s || 0 === s)
                    if ("object" === p.type(s)) p.merge(v, s.nodeType ? [s] : s);
                    else if (ht.test(s)) {
                u = u || d.appendChild(t.createElement("div")), a = (lt.exec(s) || ["", ""])[1].toLowerCase(), l = yt[a] || yt._default, u.innerHTML = l[1] + s.replace(ft, "<$1>") + l[2], i = l[0];
                while (i--) u = u.lastChild;
                if (!c.leadingWhitespace && at.test(s) && v.push(t.createTextNode(at.exec(s)[0])), !c.tbody) {
                    s = "table" !== a || ct.test(s) ? "<table>" !== l[1] || ct.test(s) ? 0 : u : u.firstChild, i = s && s.childNodes.length;
                    while (i--) p.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
                }
                p.merge(v, u.childNodes), u.textContent = "";
                while (u.firstChild) u.removeChild(u.firstChild);
                u = d.lastChild
            } else v.push(t.createTextNode(s));
            u && d.removeChild(u), c.appendChecked || p.grep(Et(v, "input"), St), m = 0;
            while (s = v[m++])
                if ((!r || -1 === p.inArray(s, r)) && (o = p.contains(s.ownerDocument, s), u = Et(d.appendChild(s), "script"), o && Ct(u), n)) {
                    i = 0;
                    while (s = u[i++]) vt.test(s.type || "") && n.push(s)
                }
            return u = null, d
        },
        cleanData: function(e, t) {
            for (var r, i, s, o, u = 0, a = p.expando, f = p.cache, l = c.deleteExpando, h = p.event.special; null != (r = e[u]); u++)
                if ((t || p.acceptData(r)) && (s = r[a], o = s && f[s])) {
                    if (o.events)
                        for (i in o.events) h[i] ? p.event.remove(r, i) : p.removeEvent(r, i, o.handle);
                    f[s] && (delete f[s], l ? delete r[a] : typeof r.removeAttribute !== j ? r.removeAttribute(a) : r[a] = null, n.push(s))
                }
        }
    }), p.fn.extend({
        text: function(e) {
            return J(this, function(e) {
                return void 0 === e ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || N).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = xt(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = xt(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? p.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || p.cleanData(Et(n)), n.parentNode && (t && p.contains(n.ownerDocument, n) && Ct(Et(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                1 === e.nodeType && p.cleanData(Et(e, !1));
                while (e.firstChild) e.removeChild(e.firstChild);
                e.options && p.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return p.clone(this, e, t)
            })
        },
        html: function(e) {
            return J(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(ot, "") : void 0;
                if (!("string" != typeof e || pt.test(e) || !c.htmlSerialize && ut.test(e) || !c.leadingWhitespace && at.test(e) || yt[(lt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(ft, "<$1>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (p.cleanData(Et(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, p.cleanData(Et(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = i.apply([], e);
            var n, r, s, o, u, a, f = 0,
                l = this.length,
                h = this,
                d = l - 1,
                v = e[0],
                m = p.isFunction(v);
            if (m || l > 1 && "string" == typeof v && !c.checkClone && dt.test(v)) return this.each(function(n) {
                var r = h.eq(n);
                m && (e[0] = v.call(this, n, r.html())), r.domManip(e, t)
            });
            if (l && (a = p.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                for (o = p.map(Et(a, "script"), Tt), s = o.length; l > f; f++) r = a, f !== d && (r = p.clone(r, !0, !0), s && p.merge(o, Et(r, "script"))), t.call(this[f], r, f);
                if (s)
                    for (u = o[o.length - 1].ownerDocument, p.map(o, Nt), f = 0; s > f; f++) r = o[f], vt.test(r.type || "") && !p._data(r, "globalEval") && p.contains(u, r) && (r.src ? p._evalUrl && p._evalUrl(r.src) : p.globalEval((r.text || r.textContent || r.innerHTML || "").replace(gt, "")));
                a = n = null
            }
            return this
        }
    }), p.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        p.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = p(e), u = o.length - 1; u >= r; r++) n = r === u ? this : this.clone(!0), p(o[r])[t](n), s.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var At, Ot = {};
    ! function() {
        var e, t, n = N.createElement("div"),
            r = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", c.opacity = /^0.5/.test(e.style.opacity), c.cssFloat = !!e.style.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", c.clearCloneStyle = "content-box" === n.style.backgroundClip, e = n = null, c.shrinkWrapBlocks = function() {
            var e, n, i, s;
            if (null == t) {
                if (e = N.getElementsByTagName("body")[0], !e) return;
                s = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", n = N.createElement("div"), i = N.createElement("div"), e.appendChild(n).appendChild(i), t = !1, typeof i.style.zoom !== j && (i.style.cssText = r + ";width:1px;padding:1px;zoom:1", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", t = 3 !== i.offsetWidth), e.removeChild(n), e = n = i = null
            }
            return t
        }
    }();
    var Dt = /^margin/,
        Pt = new RegExp("^(" + X + ")(?!px)[a-z%]+$", "i"),
        Ht, Bt, jt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (Ht = function(e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, Bt = function(e, t, n) {
        var r, i, s, o, u = e.style;
        return n = n || Ht(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== o || p.contains(e.ownerDocument, e) || (o = p.style(e, t)), Pt.test(o) && Dt.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), void 0 === o ? o : o + ""
    }) : N.documentElement.currentStyle && (Ht = function(e) {
        return e.currentStyle
    }, Bt = function(e, t, n) {
        var r, i, s, o, u = e.style;
        return n = n || Ht(e), o = n ? n[t] : void 0, null == o && u && u[t] && (o = u[t]), Pt.test(o) && !jt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = "fontSize" === t ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)), void 0 === o ? o : o + "" || "auto"
    }), ! function() {
        function l() {
            var t, n, u = N.getElementsByTagName("body")[0];
            u && (t = N.createElement("div"), n = N.createElement("div"), t.style.cssText = a, u.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", p.swap(u, null != u.style.zoom ? {
                zoom: 1
            } : {}, function() {
                r = 4 === n.offsetWidth
            }), i = !0, s = !1, o = !0, e.getComputedStyle && (s = "1%" !== (e.getComputedStyle(n, null) || {}).top, i = "4px" === (e.getComputedStyle(n, null) || {
                width: "4px"
            }).width), u.removeChild(t), n = u = null)
        }
        var t, n, r, i, s, o, u = N.createElement("div"),
            a = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
            f = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        u.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", t = u.getElementsByTagName("a")[0], t.style.cssText = "float:left;opacity:.5", c.opacity = /^0.5/.test(t.style.opacity), c.cssFloat = !!t.style.cssFloat, u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", c.clearCloneStyle = "content-box" === u.style.backgroundClip, t = u = null, p.extend(c, {
            reliableHiddenOffsets: function() {
                if (null != n) return n;
                var e, t, r, i = N.createElement("div"),
                    s = N.getElementsByTagName("body")[0];
                if (s) return i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = N.createElement("div"), e.style.cssText =
                    a, s.appendChild(e).appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = i.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", r = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", n = r && 0 === t[0].offsetHeight, s.removeChild(e), i = s = null, n
            },
            boxSizing: function() {
                return null == r && l(), r
            },
            boxSizingReliable: function() {
                return null == i && l(), i
            },
            pixelPosition: function() {
                return null == s && l(), s
            },
            reliableMarginRight: function() {
                var t, n, r, i;
                if (null == o && e.getComputedStyle) {
                    if (t = N.getElementsByTagName("body")[0], !t) return;
                    n = N.createElement("div"), r = N.createElement("div"), n.style.cssText = a, t.appendChild(n).appendChild(r), i = r.appendChild(N.createElement("div")), i.style.cssText = r.style.cssText = f, i.style.marginRight = i.style.width = "0", r.style.width = "1px", o = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(n)
                }
                return o
            }
        })
    }(), p.swap = function(e, t, n, r) {
        var i, s, o = {};
        for (s in t) o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t) e.style[s] = o[s];
        return i
    };
    var It = /alpha\([^)]*\)/i,
        qt = /opacity\s*=\s*([^)]*)/,
        Rt = /^(none|table(?!-c[ea]).+)/,
        Ut = new RegExp("^(" + X + ")(.*)$", "i"),
        zt = new RegExp("^([+-])=(" + X + ")", "i"),
        Wt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Xt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Vt = ["Webkit", "O", "Moz", "ms"];
    p.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Bt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, s, o, u = p.camelCase(t),
                    a = e.style;
                if (t = p.cssProps[u] || (p.cssProps[u] = $t(a, u)), o = p.cssHooks[t] || p.cssHooks[u], void 0 === n) return o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : a[t];
                if (s = typeof n, "string" === s && (i = zt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(p.css(e, t)), s = "number"), null != n && n === n && ("number" !== s || p.cssNumber[u] || (n += "px"), c.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (a[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, r))))) try {
                    a[t] = "", a[t] = n
                } catch (f) {}
            }
        },
        css: function(e, t, n, r) {
            var i, s, o, u = p.camelCase(t);
            return t = p.cssProps[u] || (p.cssProps[u] = $t(e.style, u)), o = p.cssHooks[t] || p.cssHooks[u], o && "get" in o && (s = o.get(e, !0, n)), void 0 === s && (s = Bt(e, t, r)), "normal" === s && t in Xt && (s = Xt[t]), "" === n || n ? (i = parseFloat(s), n === !0 || p.isNumeric(i) ? i || 0 : s) : s
        }
    }), p.each(["height", "width"], function(e, t) {
        p.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && Rt.test(p.css(e, "display")) ? p.swap(e, Wt, function() {
                    return Gt(e, t, r)
                }) : Gt(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && Ht(e);
                return Kt(e, n, r ? Qt(e, t, r, c.boxSizing() && "border-box" === p.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), c.opacity || (p.cssHooks.opacity = {
        get: function(e, t) {
            return qt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = p.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === p.trim(s.replace(It, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = It.test(s) ? s.replace(It, i) : s + " " + i)
        }
    }), p.cssHooks.marginRight = Ft(c.reliableMarginRight, function(e, t) {
        return t ? p.swap(e, {
            display: "inline-block"
        }, Bt, [e, "marginRight"]) : void 0
    }), p.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        p.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, s = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + V[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, Dt.test(e) || (p.cssHooks[e + t].set = Kt)
    }), p.fn.extend({
        css: function(e, t) {
            return J(this, function(e, t, n) {
                var r, i, s = {},
                    o = 0;
                if (p.isArray(t)) {
                    for (r = Ht(e), i = t.length; i > o; o++) s[t[o]] = p.css(e, t[o], !1, r);
                    return s
                }
                return void 0 !== n ? p.style(e, t, n) : p.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return Jt(this, !0)
        },
        hide: function() {
            return Jt(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                $(this) ? p(this).show() : p(this).hide()
            })
        }
    }), p.Tween = Yt, Yt.prototype = {
        constructor: Yt,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (p.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Yt.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Yt.propHooks[this.prop];
            return this.pos = t = this.options.duration ? p.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yt.propHooks._default.set(this), this
        }
    }, Yt.prototype.init.prototype = Yt.prototype, Yt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = p.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                p.fx.step[e.prop] ? p.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[p.cssProps[e.prop]] || p.cssHooks[e.prop]) ? p.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Yt.propHooks.scrollTop = Yt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, p.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, p.fx = Yt.prototype.init, p.fx.step = {};
    var Zt, en, tn = /^(?:toggle|show|hide)$/,
        nn = new RegExp("^(?:([+-])=|)(" + X + ")([a-z%]*)$", "i"),
        rn = /queueHooks$/,
        sn = [ln],
        on = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = nn.exec(t),
                    s = i && i[3] || (p.cssNumber[e] ? "" : "px"),
                    o = (p.cssNumber[e] || "px" !== s && +r) && nn.exec(p.css(n.elem, e)),
                    u = 1,
                    a = 20;
                if (o && o[3] !== s) {
                    s = s || o[3], i = i || [], o = +r || 1;
                    do u = u || ".5", o /= u, p.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && 1 !== u && --a)
                }
                return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    p.Animation = p.extend(hn, {
            tweener: function(e, t) {
                p.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, r = 0, i = e.length; i > r; r++) n = e[r], on[n] = on[n] || [], on[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? sn.unshift(e) : sn.push(e)
            }
        }), p.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? p.extend({}, e) : {
                complete: n || !n && t || p.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !p.isFunction(t) && t
            };
            return r.duration = p.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in p.fx.speeds ? p.fx.speeds[r.duration] : p.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                p.isFunction(r.old) && r.old.call(this), r.queue && p.dequeue(this, r.queue)
            }, r
        }, p.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter($).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = p.isEmptyObject(e),
                    s = p.speed(t, n, r),
                    o = function() {
                        var t = hn(this, p.extend({}, e), s);
                        (i || p._data(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        s = p.timers,
                        o = p._data(this);
                    if (i) o[i] && o[i].stop && r(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && rn.test(i) && r(o[i]);
                    for (i = s.length; i--;) s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                    (t || !n) && p.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = p._data(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        s = p.timers,
                        o = r ? r.length : 0;
                    for (n.finish = !0, p.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                    for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), p.each(["toggle", "show", "hide"], function(e, t) {
            var n = p.fn[t];
            p.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(an(t, !0), e, r, i)
            }
        }), p.each({
            slideDown: an("show"),
            slideUp: an("hide"),
            slideToggle: an("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            p.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), p.timers = [], p.fx.tick = function() {
            var e, t = p.timers,
                n = 0;
            for (Zt = p.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || p.fx.stop(), Zt = void 0
        }, p.fx.timer = function(e) {
            p.timers.push(e), e() ? p.fx.start() : p.timers.pop()
        }, p.fx.interval = 13, p.fx.start = function() {
            en || (en = setInterval(p.fx.tick, p.fx.interval))
        }, p.fx.stop = function() {
            clearInterval(en), en = null
        }, p.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, p.fn.delay = function(e, t) {
            return e = p.fx ? p.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var e, t, n, r, i = N.createElement("div");
            i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = i.getElementsByTagName("a")[0], n = N.createElement("select"), r = n.appendChild(N.createElement("option")), t = i.getElementsByTagName("input")[0], e.style.cssText = "top:1px", c.getSetAttribute = "t" !== i.className, c.style = /top/.test(e.getAttribute("style")), c.hrefNormalized = "/a" === e.getAttribute("href"), c.checkOn = !!t.value, c.optSelected = r.selected, c.enctype = !!N.createElement("form").enctype, n.disabled = !0, c.optDisabled = !r.disabled, t = N.createElement("input"), t.setAttribute("value", ""), c.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), c.radioValue = "t" === t.value, e = t = n = r = i = null
        }();
    var pn = /\r/g;
    p.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            if (arguments.length) return r = p.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, p(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : p.isArray(i) && (i = p.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), t = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            });
            if (i) return t = p.valHooks[i.type] || p.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(pn, "") : null == n ? "" : n)
        }
    }), p.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = p.find.attr(e, "value");
                    return null != t ? t : p.text(e)
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, s = "select-one" === e.type || 0 > i, o = s ? null : [], u = s ? i + 1 : r.length, a = 0 > i ? u : s ? i : 0; u > a; a++)
                        if (n = r[a], !(!n.selected && a !== i || (c.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && p.nodeName(n.parentNode, "optgroup"))) {
                            if (t = p(n).val(), s) return t;
                            o.push(t)
                        }
                    return o
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        s = p.makeArray(t),
                        o = i.length;
                    while (o--)
                        if (r = i[o], p.inArray(p.valHooks.option.get(r), s) >= 0) try {
                            r.selected = n = !0
                        } catch (u) {
                            r.scrollHeight
                        } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), p.each(["radio", "checkbox"], function() {
        p.valHooks[this] = {
            set: function(e, t) {
                return p.isArray(t) ? e.checked = p.inArray(p(e).val(), t) >= 0 : void 0
            }
        }, c.checkOn || (p.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var dn, vn, mn = p.expr.attrHandle,
        gn = /^(?:checked|selected)$/i,
        yn = c.getSetAttribute,
        bn = c.input;
    p.fn.extend({
        attr: function(e, t) {
            return J(this, p.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                p.removeAttr(this, e)
            })
        }
    }), p.extend({
        attr: function(e, t, n) {
            var r, i, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === j ? p.prop(e, t, n) : (1 === s && p.isXMLDoc(e) || (t = t.toLowerCase(), r = p.attrHooks[t] || (p.expr.match.bool.test(t) ? vn : dn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = p.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void p.removeAttr(e, t))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                s = t && t.match(M);
            if (s && 1 === e.nodeType)
                while (n = s[i++]) r = p.propFix[n] || n, p.expr.match.bool.test(n) ? bn && yn || !gn.test(n) ? e[r] = !1 : e[p.camelCase("default-" + n)] = e[r] = !1 : p.attr(e, n, ""), e.removeAttribute(yn ? n : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!c.radioValue && "radio" === t && p.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), vn = {
        set: function(e, t, n) {
            return t === !1 ? p.removeAttr(e, n) : bn && yn || !gn.test(n) ? e.setAttribute(!yn && p.propFix[n] || n, n) : e[p.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, p.each(p.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = mn[t] || p.find.attr;
        mn[t] = bn && yn || !gn.test(t) ? function(e, t, r) {
            var i, s;
            return r || (s = mn[t], mn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, mn[t] = s), i
        } : function(e, t, n) {
            return n ? void 0 : e[p.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), bn && yn || (p.attrHooks.value = {
        set: function(e, t, n) {
            return p.nodeName(e, "input") ? void(e.defaultValue = t) : dn && dn.set(e, t, n)
        }
    }), yn || (dn = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, mn.id = mn.name = mn.coords = function(e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, p.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: dn.set
    }, p.attrHooks.contenteditable = {
        set: function(e, t, n) {
            dn.set(e, "" === t ? !1 : t, n)
        }
    }, p.each(["width", "height"], function(e, t) {
        p.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), c.style || (p.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var wn = /^(?:input|select|textarea|button|object)$/i,
        En = /^(?:a|area)$/i;
    p.fn.extend({
        prop: function(e, t) {
            return J(this, p.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = p.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {}
            })
        }
    }), p.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, s, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !p.isXMLDoc(e), s && (t = p.propFix[t] || t, i = p.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = p.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : wn.test(e.nodeName) || En.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), c.hrefNormalized || p.each(["href", "src"], function(e, t) {
        p.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), c.optSelected || (p.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), p.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        p.propFix[this.toLowerCase()] = this
    }), c.enctype || (p.propFix.enctype = "encoding");
    var Sn = /[\t\r\n\f]/g;
    p.fn.extend({
        addClass: function(e) {
            var t, n, r, i, s, o, u = 0,
                a = this.length,
                f = "string" == typeof e && e;
            if (p.isFunction(e)) return this.each(function(t) {
                p(this).addClass(e.call(this, t, this.className))
            });
            if (f)
                for (t = (e || "").match(M) || []; a > u; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Sn, " ") : " ")) {
                        s = 0;
                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o = p.trim(r), n.className !== o && (n.className = o)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, s, o, u = 0,
                a = this.length,
                f = 0 === arguments.length || "string" == typeof e && e;
            if (p.isFunction(e)) return this.each(function(t) {
                p(this).removeClass(e.call(this, t, this.className))
            });
            if (f)
                for (t = (e || "").match(M) || []; a > u; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Sn, " ") : "")) {
                        s = 0;
                        while (i = t[s++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        o = e ? p.trim(r) : "", n.className !== o && (n.className = o)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(p.isFunction(e) ? function(n) {
                p(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n) {
                    var t, r = 0,
                        i = p(this),
                        s = e.match(M) || [];
                    while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else(n === j || "boolean" === n) && (this.className && p._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : p._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Sn, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        p.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), p.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var xn = p.now(),
        Tn = /\?/,
        Nn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    p.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, r = null,
            i = p.trim(t + "");
        return i && !p.trim(i.replace(Nn, function(e, t, i, s) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !s - !i, "")
        })) ? Function("return " + i)() : p.error("Invalid JSON: " + t)
    }, p.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || p.error("Invalid XML: " + t), n
    };
    var Cn, kn, Ln = /#.*$/,
        An = /([?&])_=[^&]*/,
        On = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Mn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        _n = /^(?:GET|HEAD)$/,
        Dn = /^\/\//,
        Pn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Hn = {},
        Bn = {},
        jn = "*/".concat("*");
    try {
        kn = location.href
    } catch (Fn) {
        kn = N.createElement("a"), kn.href = "", kn = kn.href
    }
    Cn = Pn.exec(kn.toLowerCase()) || [], p.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: kn,
            type: "GET",
            isLocal: Mn.test(Cn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": jn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": p.parseJSON,
                "text xml": p.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Rn(Rn(e, p.ajaxSettings), t) : Rn(p.ajaxSettings, e)
        },
        ajaxPrefilter: In(Hn),
        ajaxTransport: In(Bn),
        ajax: function(e, t) {
            function x(e, t, n, r) {
                var f, g, y, w, S, x = t;
                2 !== b && (b = 2, o && clearTimeout(o), a = void 0, s = r || "", E.readyState = e > 0 ? 4 : 0, f = e >= 200 && 300 > e || 304 === e, n && (w = Un(l, E, n)), w = zn(l, w, E, f), f ? (l.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (p.lastModified[i] = S), S = E.getResponseHeader("etag"), S && (p.etag[i] = S)), 204 === e || "HEAD" === l.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, f = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), E.status = e, E.statusText = (t || x) + "", f ? d.resolveWith(c, [g, x, E]) : d.rejectWith(c, [E, x, y]), E.statusCode(m), m = void 0, u && h.trigger(f ? "ajaxSuccess" : "ajaxError", [E, l, f ? g : y]), v.fireWith(c, [E, x]), u && (h.trigger("ajaxComplete", [E, l]), --p.active || p.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, r, i, s, o, u, a, f, l = p.ajaxSetup({}, t),
                c = l.context || l,
                h = l.context && (c.nodeType || c.jquery) ? p(c) : p.event,
                d = p.Deferred(),
                v = p.Callbacks("once memory"),
                m = l.statusCode || {},
                g = {},
                y = {},
                b = 0,
                w = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!f) {
                                f = {};
                                while (t = On.exec(s)) f[t[1].toLowerCase()] = t[2]
                            }
                            t = f[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? s : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, g[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return b || (l.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > b)
                                for (t in e) m[t] = [m[t], e[t]];
                            else E.always(e[E.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return a && a.abort(t), x(0, t), this
                    }
                };
            if (d.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, l.url = ((e || l.url || kn) + "").replace(Ln, "").replace(Dn, Cn[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = p.trim(l.dataType || "*").toLowerCase().match(M) || [""], null == l.crossDomain && (n = Pn.exec(l.url.toLowerCase()), l.crossDomain = !(!n || n[1] === Cn[1] && n[2] === Cn[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Cn[3] || ("http:" === Cn[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = p.param(l.data, l.traditional)), qn(Hn, l, t, E), 2 === b) return E;
            u = l.global, u && 0 === p.active++ && p.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !_n.test(l.type), i = l.url, l.hasContent || (l.data && (i = l.url += (Tn.test(i) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = An.test(i) ? i.replace(An, "$1_=" + xn++) : i + (Tn.test(i) ? "&" : "?") + "_=" + xn++)), l.ifModified && (p.lastModified[i] && E.setRequestHeader("If-Modified-Since", p.lastModified[i]), p.etag[i] && E.setRequestHeader("If-None-Match", p.etag[i])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && E.setRequestHeader("Content-Type", l.contentType), E.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + jn + "; q=0.01" : "") : l.accepts["*"]);
            for (r in l.headers) E.setRequestHeader(r, l.headers[r]);
            if (!l.beforeSend || l.beforeSend.call(c, E, l) !== !1 && 2 !== b) {
                w = "abort";
                for (r in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) E[r](l[r]);
                if (a = qn(Bn, l, t, E)) {
                    E.readyState = 1, u && h.trigger("ajaxSend", [E, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
                        E.abort("timeout")
                    }, l.timeout));
                    try {
                        b = 1, a.send(g, x)
                    } catch (S) {
                        if (!(2 > b)) throw S;
                        x(-1, S)
                    }
                } else x(-1, "No Transport");
                return E
            }
            return E.abort()
        },
        getJSON: function(e, t, n) {
            return p.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return p.get(e, void 0, t, "script")
        }
    }), p.each(["get", "post"], function(e, t) {
        p[t] = function(e, n, r, i) {
            return p.isFunction(n) && (i = i || r, r = n, n = void 0), p.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), p.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        p.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), p._evalUrl = function(e) {
        return p.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, p.fn.extend({
        wrapAll: function(e) {
            if (p.isFunction(e)) return this.each(function(t) {
                p(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = p(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(p.isFunction(e) ? function(t) {
                p(this).wrapInner(e.call(this, t))
            } : function() {
                var t = p(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = p.isFunction(e);
            return this.each(function(n) {
                p(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                p.nodeName(this, "body") || p(this).replaceWith(this.childNodes)
            }).end()
        }
    }), p.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !c.reliableHiddenOffsets() && "none" === (e.style && e.style.display || p.css(e, "display"))
    }, p.expr.filters.visible = function(e) {
        return !p.expr.filters.hidden(e)
    };
    var Wn = /%20/g,
        Xn = /\[\]$/,
        Vn = /\r?\n/g,
        $n = /^(?:submit|button|image|reset|file)$/i,
        Jn = /^(?:input|select|textarea|keygen)/i;
    p.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = p.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = p.ajaxSettings && p.ajaxSettings.traditional), p.isArray(e) || e.jquery && !p.isPlainObject(e)) p.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) Kn(n, e[n], t, i);
        return r.join("&").replace(Wn, "+")
    }, p.fn.extend({
        serialize: function() {
            return p.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = p.prop(this, "elements");
                return e ? p.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !p(this).is(":disabled") && Jn.test(this.nodeName) && !$n.test(e) && (this.checked || !K.test(e))
            }).map(function(e, t) {
                var n = p(this).val();
                return null == n ? null : p.isArray(n) ? p.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Vn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Vn, "\r\n")
                }
            }).get()
        }
    }), p.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zn() || er()
    } : Zn;
    var Qn = 0,
        Gn = {},
        Yn = p.ajaxSettings.xhr();
    e.ActiveXObject && p(e).on("unload", function() {
        for (var e in Gn) Gn[e](void 0, !0)
    }), c.cors = !!Yn && "withCredentials" in Yn, Yn = c.ajax = !!Yn, Yn && p.ajaxTransport(function(e) {
        if (!e.crossDomain || c.cors) {
            var t;
            return {
                send: function(n, r) {
                    var i, s = e.xhr(),
                        o = ++Qn;
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (i in e.xhrFields) s[i] = e.xhrFields[i];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) void 0 !== n[i] && s.setRequestHeader(i, n[i] + "");
                    s.send(e.hasContent && e.data || null), t = function(n, i) {
                        var u, a, f;
                        if (t && (i || 4 === s.readyState))
                            if (delete Gn[o], t = void 0, s.onreadystatechange = p.noop, i) 4 !== s.readyState && s.abort();
                            else {
                                f = {}, u = s.status, "string" == typeof s.responseText && (f.text = s.responseText);
                                try {
                                    a = s.statusText
                                } catch (l) {
                                    a = ""
                                }
                                u || !e.isLocal || e.crossDomain ? 1223 === u && (u = 204) : u = f.text ? 200 : 404
                            }
                        f && r(u, a, f, s.getAllResponseHeaders())
                    }, e.async ? 4 === s.readyState ? setTimeout(t) : s.onreadystatechange = Gn[o] = t : t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }), p.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return p.globalEval(e), e
            }
        }
    }), p.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), p.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = N.head || p("head")[0] || N.documentElement;
            return {
                send: function(r, i) {
                    t = N.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var tr = [],
        nr = /(=)\?(?=&|$)|\?\?/;
    p.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = tr.pop() || p.expando + "_" + xn++;
            return this[e] = !0, e
        }
    }), p.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, s, o, u = t.jsonp !== !1 && (nr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && nr.test(t.data) && "data");
        return u || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = p.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(nr, "$1" + i) : t.jsonp !== !1 && (t.url += (Tn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return o || p.error(i + " was not called"), o[0]
        }, t.dataTypes[0] = "json", s = e[i], e[i] = function() {
            o = arguments
        }, r.always(function() {
            e[i] = s, t[i] && (t.jsonpCallback = n.jsonpCallback, tr.push(i)), o && p.isFunction(s) && s(o[0]), o = s = void 0
        }), "script") : void 0
    }), p.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || N;
        var r = E.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = p.buildFragment([e], t, i), i && i.length && p(i).remove(), p.merge([], r.childNodes))
    };
    var rr = p.fn.load;
    p.fn.load = function(e, t, n) {
        if ("string" != typeof e && rr) return rr.apply(this, arguments);
        var r, i, s, o = this,
            u = e.indexOf(" ");
        return u >= 0 && (r = e.slice(u, e.length), e = e.slice(0, u)), p.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (s = "POST"), o.length > 0 && p.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, o.html(r ? p("<div>").append(p.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, i || [e.responseText, t, e])
        }), this
    }, p.expr.filters.animated = function(e) {
        return p.grep(p.timers, function(t) {
            return e === t.elem
        }).length
    };
    var ir = e.document.documentElement;
    p.offset = {
        setOffset: function(e, t, n) {
            var r, i, s, o, u, a, f, l = p.css(e, "position"),
                c = p(e),
                h = {};
            "static" === l && (e.style.position = "relative"), u = c.offset(), s = p.css(e, "top"), a = p.css(e, "left"), f = ("absolute" === l || "fixed" === l) && p.inArray("auto", [s, a]) > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), p.isFunction(t) && (t = t.call(e, n, u)), null != t.top && (h.top = t.top - u.top + o), null != t.left && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, p.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                p.offset.setOffset(this, e, t)
            });
            var t, n, r = {
                    top: 0,
                    left: 0
                },
                i = this[0],
                s = i && i.ownerDocument;
            if (s) return t = s.documentElement, p.contains(t, i) ? (typeof i.getBoundingClientRect !== j && (r = i.getBoundingClientRect()), n = sr(s), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === p.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), p.nodeName(e[0], "html") || (n = e.offset()), n.top += p.css(e[0], "borderTopWidth", !0), n.left += p.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - p.css(r, "marginTop", !0),
                    left: t.left - n.left - p.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || ir;
                while (e && !p.nodeName(e, "html") && "static" === p.css(e, "position")) e = e.offsetParent;
                return e || ir
            })
        }
    }), p.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        p.fn[e] = function(r) {
            return J(this, function(e, r, i) {
                var s = sr(e);
                return void 0 === i ? s ? t in s ? s[t] : s.document.documentElement[r] : e[r] : void(s ? s.scrollTo(n ? p(s).scrollLeft() : i, n ? i : p(s).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null)
        }
    }), p.each(["top", "left"], function(e, t) {
        p.cssHooks[t] = Ft(c.pixelPosition, function(e, n) {
            return n ? (n = Bt(e, t), Pt.test(n) ? p(e).position()[t] + "px" : n) : void 0
        })
    }), p.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        p.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            p.fn[r] = function(r, i) {
                var s = arguments.length && (n || "boolean" != typeof r),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return J(this, function(t, n, r) {
                    var i;
                    return p.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? p.css(t, n, o) : p.style(t, n, r, o)
                }, t, s ? r : void 0, s, null)
            }
        })
    }), p.fn.size = function() {
        return this.length
    }, p.fn.andSelf = p.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return p
    });
    var or = e.jQuery,
        ur = e.$;
    return p.noConflict = function(t) {
        return e.$ === p && (e.$ = ur), t && e.jQuery === p && (e.jQuery = or), p
    }, typeof t === j && (e.jQuery = e.$ = p), p
}),
function(e, t, n) {
    "use strict";
    var r, i;
    e.uaMatch = function(e) {
        e = e.toLowerCase();
        var t = /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
            n = /(ipad)/.exec(e) || /(iphone)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || [];
        return {
            browser: t[1] || "",
            version: t[2] || "0",
            platform: n[0] || ""
        }
    }, r = e.uaMatch(t.navigator.userAgent), i = {}, r.browser && (i[r.browser] = !0, i.version = r.version), r.platform && (i[r.platform] = !0), i.chrome || i.opr ? i.webkit = !0 : i.webkit && (i.safari = !0), i.rv && (i.msie = !0), i.opr && (i.opera = !0), e.browser = i
}(jQuery, window), window.Modernizr = function(e, t, n) {
        function r(e) {
            m.cssText = e
        }

        function i(e, t) {
            return r(b.join(e + ";") + (t || ""))
        }

        function s(e, t) {
            return typeof e === t
        }

        function o(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function u(e, t) {
            for (var r in e) {
                var i = e[r];
                if (!o(i, "-") && m[i] !== n) return t == "pfx" ? i : !0
            }
            return !1
        }

        function a(e, t, r) {
            for (var i in e) {
                var o = t[e[i]];
                if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o
            }
            return !1
        }

        function f(e, t, n) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                i = (e + " " + E.join(r + " ") + r).split(" ");
            return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + S.join(r + " ") + r).split(" "), a(i, t, n))
        }
        var l = "2.7.1",
            c = {},
            h = !0,
            p = t.documentElement,
            d = "modernizr",
            v = t.createElement(d),
            m = v.style,
            g, y = {}.toString,
            b = " -webkit- -moz- -o- -ms- ".split(" "),
            w = "Webkit Moz O ms",
            E = w.split(" "),
            S = w.toLowerCase().split(" "),
            x = {},
            T = {},
            N = {},
            C = [],
            k = C.slice,
            L, A = {}.hasOwnProperty,
            O;
        !s(A, "undefined") && !s(A.call, "undefined") ? O = function(e, t) {
            return A.call(e, t)
        } : O = function(e, t) {
            return t in e && s(e.constructor.prototype[t], "undefined")
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if (typeof t != "function") throw new TypeError;
            var n = k.call(arguments, 1),
                r = function() {
                    if (this instanceof r) {
                        var i = function() {};
                        i.prototype = t.prototype;
                        var s = new i,
                            o = t.apply(s, n.concat(k.call(arguments)));
                        return Object(o) === o ? o : s
                    }
                    return t.apply(e, n.concat(k.call(arguments)))
                };
            return r
        }), x.canvas = function() {
            var e = t.createElement("canvas");
            return !!e.getContext && !!e.getContext("2d")
        }, x.csscolumns = function() {
            return f("columnCount")
        }, x.cssgradients = function() {
            var e = "background-image:",
                t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                n = "linear-gradient(left top,#9f9, white);";
            return r((e + "-webkit- ".split(" ").join(t + e) + b.join(n + e)).slice(0, -e.length)), o(m.backgroundImage, "gradient")
        }, x.csstransitions = function() {
            return f("transition")
        };
        for (var M in x) O(x, M) && (L = M.toLowerCase(), c[L] = x[M](), C.push((c[L] ? "" : "no-") + L));
        return c.addTest = function(e, t) {
                if (typeof e == "object")
                    for (var r in e) O(e, r) && c.addTest(r, e[r]);
                else {
                    e = e.toLowerCase();
                    if (c[e] !== n) return c;
                    t = typeof t == "function" ? t() : t, typeof h != "undefined" && h && (p.className += " " + (t ? "" : "no-") + e), c[e] = t
                }
                return c
            }, r(""), v = g = null,
            function(e, t) {
                function n(e, t) {
                    var n = e.createElement("p"),
                        r = e.getElementsByTagName("head")[0] || e.documentElement;
                    return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
                }

                function r() {
                    var e = y.elements;
                    return typeof e == "string" ? e.split(" ") : e
                }

                function i(e) {
                    var t = m[e[d]];
                    return t || (t = {}, v++, e[d] = v, m[v] = t), t
                }

                function s(e, n, r) {
                    n || (n = t);
                    if (g) return n.createElement(e);
                    r || (r = i(n));
                    var s;
                    return r.cache[e] ? s = r.cache[e].cloneNode() : h.test(e) ? s = (r.cache[e] = r.createElem(e)).cloneNode() : s = r.createElem(e), s.canHaveChildren && !c.test(e) && !s.tagUrn ? r.frag.appendChild(s) : s
                }

                function o(e, n) {
                    e || (e = t);
                    if (g) return e.createDocumentFragment();
                    n = n || i(e);
                    var s = n.frag.cloneNode(),
                        o = 0,
                        u = r(),
                        a = u.length;
                    for (; o < a; o++) s.createElement(u[o]);
                    return s
                }

                function u(e, t) {
                    t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                        return y.shivMethods ? s(n, e, t) : t.createElem(n)
                    }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-]+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(y, t.frag)
                }

                function a(e) {
                    e || (e = t);
                    var r = i(e);
                    return y.shivCSS && !p && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), g || u(e, r), e
                }
                var f = "3.7.0",
                    //l = e.html5 || {},
                    c = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    p, d = "_html5shiv",
                    v = 0,
                    m = {},
                    g;
                (function() {
                    try {
                        var e = t.createElement("a");
                        e.innerHTML = "<xyz></xyz>", p = "hidden" in e, g = e.childNodes.length == 1 || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                        }()
                    } catch (n) {
                        p = !0, g = !0
                    }
                })();
                var y = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: f,
                    shivCSS: l.shivCSS !== !1,
                    supportsUnknownElements: g,
                    shivMethods: l.shivMethods !== !1,
                    type: "default",
                    shivDocument: a,
                    createElement: s,
                    createDocumentFragment: o
                };
                //e.html5 = y, a(t)
            }(this, t), c._version = l, c._prefixes = b, c._domPrefixes = S, c._cssomPrefixes = E, c.testProp = function(e) {
                return u([e])
            }, c.testAllProps = f, c.prefixed = function(e, t, n) {
                return t ? f(e, t, n) : f(e, "pfx")
            }, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + C.join(" ") : ""), c
    }(this, this.document),
    function() {
        var e = 0,
            t = ["ms", "moz", "webkit", "o"];
        for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
            var r = (new Date).getTime(),
                i = Math.max(0, 16 - (r - e)),
                s = window.setTimeout(function() {
                    t(r + i)
                }, i);
            return e = r + i, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(),
    function() {
        var e, t, n, r, i, s;
        t = {
            isMobile: function() {
                return $(window).width() <= 479
            },
            isTablet: function() {
                return $(window).width() <= 1024
            }
        }, n = function(e, t, n) {
            var r, i, s, o, u, a, f, l, c;
            n == null && (n = !0), s = 0, u = [], f = window.pixelRatio() > 1, c = [];
            for (a = 0, l = e.length; a < l; a++) i = e[a], r = new Image, o = f && n ? window.imagePathForRatio(i, 2) : i, u.push(o), $(r).on("load error", function(n) {
                return function() {
                    s += 1;
                    if (s === e.length) return typeof t == "function" ? t(u) : void 0
                }
            }(this)), c.push(r.src = o);
            return c
        }, i = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            transition: "transitionend",
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            animation: "animationend"
        }, r = function(e) {
            return function(e, t, n) {
                return n == null && (n = "transition"), e.one(i[Modernizr.prefixed(n)], function(e) {
                    return e.stopPropagation(), typeof t == "function" ? t(e) : void 0
                })
            }
        }(this), s = function(e) {
            var t;
            return e == null && (e = $(window)), t = e.scrollTop(), {
                top: t,
                bottom: t + e.height()
            }
        }, e = function(e, t) {
            var n, r;
            return r = e.position().top, n = r + e.outerHeight(), n >= t.top && r <= t.bottom
        }, window.environment = t, window.preload = n, window.transitionEnd = r, window.windowViewport = s, window.elementInViewport = e
    }.call(this),
    function() {
        var e, t, n, r;
        n = function() {
            return window["devicePixelRatio"] != null ? Math.round(window.devicePixelRatio) : 1
        }, e = function(e, t) {
            var n;
            return t || (t = window.pixelRatio(), t > 2 && (t = 2)), t < 1.5 ? e : /@\d+x/.test(e) ? e : n = e.replace(/\.(jpg|png)/, function(e) {
                return "@" + t + "x" + e
            })
        }, r = function(t, r) {
            var i, s;
            return i = $(t), r || (r = n()), i.attr("data-2x") || (i.attr("data-1x", t.src), s = e(t.src, 2), i.attr("data-2x", s), i.attr("data-3x", s)), t.src = i.attr("data-" + r + "x") || i.attr("data-1x")
        }, window["matchMedia"] != null && (t = "(-webkit-min-device-pixel-ratio: 1.5),\n(min--moz-device-pixel-ratio: 1.5),\n(-o-min-device-pixel-ratio: 3/2),\n(min-resolution: 1.5dppx)", window.matchMedia(t).addListener(function() {
            return $(window).trigger("device-pixel-ratio")
        })), $(function() {
            var e, t;
            return e = $("img[data-hires]"), t = function() {
                return e.each(function(e, t) {
                    return r(t)
                })
            }, t(), $(window).on("device-pixel-ratio", t)
        }), window.pixelRatio = n, window.imagePathForRatio = e, window.updateImageRatio = r
    }.call(this),
    function() {
        $(function() {
            //if ($.browser.msie) return $("html").addClass("ie")
        })
    }.call(this),
    function() {
        $(function() {
            return $.ajaxPrefilter(function(e, t, n) {
                var r, i;
                return i = $("meta[name=csrf-token]"), r = i ? i.attr("content") : "", n.setRequestHeader("x-stripe-csrf-token", r)
            })
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, r, i, s, o, u, a, f, l;
            if (typeof document == "undefined" || document === null || document.domain !== "127.0.0.1") return;
            u = function(e) {
                var t;
                return t = "debug", e ? ($("#grid").show(), $("*").addClass("dev-debug")) : ($("#grid").hide(), $("*").removeClass("dev-debug"))
            }, a = function() {
                return localStorage.FolsomShowingDebug != null ? (delete localStorage.FolsomShowingDebug, u(!1)) : (localStorage.FolsomShowingDebug = !0, u(!0))
            }, $(window).keyup(function(e) {
                return function(e) {
                    if (e.keyCode === 27) return a()
                }
            }(this)), u(localStorage.FolsomShowingDebug != null);
            return
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, r, i, s, o, u;
            return o = function(e, t) {
                return setTimeout(function() {
                    return $(document).one("click", function(n) {
                        return $(n.target).closest(e).length > 0 ? o(e, t) : typeof t == "function" ? t() : void 0
                    })
                })
            }, n = $("header#main-header"), t = $("li.more", n), e = $("span", t), s = $("ul", t), r = "hidden-animation-state", u = function() {
                return s.addClass(r), s.show(), setTimeout(function() {
                    return s.removeClass(r)
                })
            }, i = function() {
                var e;
                return e = function() {
                    return s.removeClass(r), s.hide()
                }, window.transitionEnd(s, e), s.addClass(r)
            }, e.click(function() {
                return s.is(":visible") ? i() : (o(s, i), u())
            }), setTimeout(function() {
                //return window.preload(["/img/popover/arrow_top.png", "/img/popover/arrow_bottom.png"])
            }, 1e3)
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w;
            return e = $("header#main-header"), l = e.find("nav"), r = $("body"), b = $(window), w = null, y = $(document), a = "mobile-nav-button", t = $("<div />").addClass(a), e.append(t), n = null, d = function() {
                var t;
                return $(".nav-animation-element").removeClass("nav-animation-element"), n = e, t = window.windowViewport(), $("div#main-content >").each(function() {
                    var e;
                    e = $(this);
                    if (window.elementInViewport(e, t)) return n = n.add(this), e.addClass("nav-animation-element")
                })
            }, p = function(e) {
                var t;
                return t = e === "open", s(t), r[t ? "addClass" : "removeClass"]("nav-shown"), n.css("transform", "none")
            }, c = function(e) {
                return e.pageX || e.originalEvent.pageX || e.originalEvent.touches[0].pageX
            }, h = function(e) {
                var t, i, s;
                return i = {
                    down: "mousedown.nav touchstart.nav",
                    move: "mousemove.nav touchmove.nav",
                    up: "mouseup.nav touchend.nav",
                    scroll: "scroll.nav"
                }, e ? (s = null, t = function() {
                    if (!s) return;
                    return s = clearTimeout(s)
                }, $("a", l).on(i.down, function() {
                    return s = setTimeout(function(e) {
                        return function() {
                            return $(e).addClass("active")
                        }
                    }(this), 100)
                }), $("a", l).on(i.up, function() {
                    return t(), $(this).removeClass("active")
                }), l.on(i.scroll, function() {
                    return t(), $("a.active", l).removeClass("active")
                }), y.on(i.down, function(e) {
                    var t, s, o, u, h, v, m, g;
                    if (r.hasClass("is-animating")) return;
                    if ($(e.target).closest(l).length > 0) return;
                    d(), v = !l.is(":visible"), t = Math.floor(w * .8), s = 0, h = -t, g = v ? s : h, m = c(e), o = 0, u = null;
                    if (v) {
                        if (e.target.className !== a) return;
                        p("open"), l.css("left", w - 10), l.width(w), l.height(b.height())
                    } else if (!(m < w * .2)) return;
                    return e.preventDefault(), y.on(i.move, function(e) {
                        return e.preventDefault(), u = c(e), o = m - u, f(n, g - o)
                    }), y.one(i.up, function(e) {
                        var t, a;
                        if (r.hasClass("is-animating")) return;
                        return y.off(i.move), a = function() {
                            return f(n, h, !0)
                        }, t = function() {
                            var e;
                            return e = function() {
                                return p("closed")
                            }, f(n, s, !0, e)
                        }, o === 0 ? g >= 0 ? a() : t() : u < w * .5 ? a() : t()
                    })
                })) : ($("a", l).off(i.down), $("a", l).off(i.up), l.off(i.scroll), y.off(i.down), y.off(i.move), y.off(i.up))
            }, s = function(e) {
                return $("div#main").css("height", e ? b.height() : "auto")
            }, i = "nav-current-translate-x", u = !1, m = null, f = function(e, t, n, s) {
                var o, a;
                n == null && (n = !1), a = -Math.floor(w * .8), t < a && (t = a), t > 0 && (t = 0), n && (r.addClass("is-animating"), e.addClass("nav-animatable"), o = function() {
                    return r.removeClass("is-animating"), e.removeClass("nav-animatable"), typeof s == "function" ? s() : void 0
                }, window.transitionEnd(e.first(), o), t === e.data(i) && o()), m = t;
                if (u) return;
                return u = !0, window.requestAnimationFrame(function() {
                    return e.css("transform", "translateX(" + m + "px)"), e.data(i, m), u = !1
                })
            }, o = !1, v = function() {
                var e;
                d(), e = window.environment.isMobile() && $("html").hasClass("mobile");
                if (e === o) return;
                return h(e), o = e, f(n, 0, !1), l.css({
                    left: "auto",
                    width: "auto",
                    height: "auto"
                }), p("closed")
            }, g = function() {
                return w = b.width(), v()
            }, g(), $(window).resize(g)
        })
    }.call(this),
    function() {
        $(function() {
            var e, t, n, r, i, s, o, u;
            r = function(e, t) {
                return setTimeout(function(n) {
                    return function() {
                        return $(document).one("click", function(n) {
                            return $(n.target).closest(e).length > 0 ? r(e, t) : typeof t == "function" ? t() : void 0
                        })
                    }
                }(this))
            }, e = 23, n = "hidden-animation-state", o = $(".footer-popover"), u = [];
            for (i = 0, s = o.length; i < s; i++) t = o[i], u.push(function(t) {
                var i, s, o, u, a, f, l;
                return i = $(".select", t), a = $("ul", t), f = a.outerHeight(), a.css("top", -(f + e) + 4), u = {
                    x: 27,
                    y: f + 10
                }, s = "" + u.x + "px " + u.y + "px", a.css({
                    "-webkit-transform-origin": s,
                    "-moz-transform-origin": s,
                    "transform-origin": s
                }), l = function(e) {
                    return function() {
                        return a.addClass(n), a.show(), setTimeout(function() {
                            return a.removeClass(n)
                        })
                    }
                }(this), o = function(e) {
                    return function() {
                        var e;
                        return e = function() {
                            return a.removeClass(n), a.hide()
                        }, a.one("webkitTransitionEnd", e), a.one("transitionend", e), a.addClass(n)
                    }
                }(this), i.click(function(e) {
                    return function() {
                        return a.is(":visible") ? o() : (r(a, o), l())
                    }
                }(this))
            }(t));
            return u
        })
    }.call(this),
    function() {}.call(this);
(function() {


}).call(this);
/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

"use strict";
(function ($) {
	function sc_setScroll(a, b, c) {
		return "transition" == c.transition && "swing" == b && (b = "ease"), {
			anims: [],
			duration: a,
			orgDuration: a,
			easing: b,
			startTime: getTime()
		}
	}

	function sc_startScroll(a, b) {
		for (var c = 0, d = a.anims.length; d > c; c++) {
			var e = a.anims[c];
			e && e[0][b.transition](e[1], a.duration, a.easing, e[2])
		}
	}

	function sc_stopScroll(a, b) {
		is_boolean(b) || (b = !0), is_object(a.pre) && sc_stopScroll(a.pre, b);
		for (var c = 0, d = a.anims.length; d > c; c++) {
			var e = a.anims[c];
			e[0].stop(!0), b && (e[0].css(e[1]), is_function(e[2]) && e[2]())
		}
		is_object(a.post) && sc_stopScroll(a.post, b)
	}

	function sc_afterScroll(a, b, c) {
		switch (b && b.remove(), c.fx) {
			case"fade":
			case"crossfade":
			case"cover-fade":
			case"uncover-fade":
				a.css("opacity", 1), a.css("filter", "")
		}
	}

	function sc_fireCallbacks(a, b, c, d, e) {
		if (b[c] && b[c].call(a, d), e[c].length)for (var f = 0, g = e[c].length; g > f; f++)e[c][f].call(a, d);
		return []
	}

	function sc_fireQueue(a, b, c) {
		return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()), b
	}

	function sc_hideHiddenItems(a) {
		a.each(function () {
			var a = $(this);
			a.data("_cfs_isHidden", a.is(":hidden")).hide()
		})
	}

	function sc_showHiddenItems(a) {
		a && a.each(function () {
			var a = $(this);
			a.data("_cfs_isHidden") || a.show()
		})
	}

	function sc_clearTimers(a) {
		return a.auto && clearTimeout(a.auto), a.progress && clearInterval(a.progress), a
	}

	function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
		return {
			width: g.width,
			height: g.height,
			items: {old: a, skipped: b, visible: c},
			scroll: {items: d, direction: e, duration: f}
		}
	}

	function sc_getDuration(a, b, c, d) {
		var e = a.duration;
		return "none" == a.fx ? 0 : ("auto" == e ? e = b.scroll.duration / b.scroll.items * c : 10 > e && (e = d / e), 1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e)))
	}

	function nv_showNavi(a, b, c) {
		var d = is_number(a.items.minimum) ? a.items.minimum : a.items.visible + 1;
		if ("show" == b || "hide" == b)var e = b; else if (d > b) {
			debug(c, "Not enough items (" + b + " total, " + d + " needed): Hiding navigation.");
			var e = "hide"
		} else var e = "show";
		var f = "show" == e ? "removeClass" : "addClass", g = cf_c("hidden", c);
		a.auto.button && a.auto.button[e]()[f](g), a.prev.button && a.prev.button[e]()[f](g), a.next.button && a.next.button[e]()[f](g), a.pagination.container && a.pagination.container[e]()[f](g)
	}

	function nv_enableNavi(a, b, c) {
		if (!a.circular && !a.infinite) {
			var d = "removeClass" == b || "addClass" == b ? b : !1, e = cf_c("disabled", c);
			if (a.auto.button && d && a.auto.button[d](e), a.prev.button) {
				var f = d || 0 == b ? "addClass" : "removeClass";
				a.prev.button[f](e)
			}
			if (a.next.button) {
				var f = d || b == a.items.visible ? "addClass" : "removeClass";
				a.next.button[f](e)
			}
		}
	}

	function go_getObject(a, b) {
		return is_function(b) ? b = b.call(a) : is_undefined(b) && (b = {}), b
	}

	function go_getItemsObject(a, b) {
		return b = go_getObject(a, b), is_number(b) ? b = {visible: b} : "variable" == b ? b = {
			visible: b,
			width: b,
			height: b
		} : is_object(b) || (b = {}), b
	}

	function go_getScrollObject(a, b) {
		return b = go_getObject(a, b), is_number(b) ? b = 50 >= b ? {items: b} : {duration: b} : is_string(b) ? b = {easing: b} : is_object(b) || (b = {}), b
	}

	function go_getNaviObject(a, b) {
		if (b = go_getObject(a, b), is_string(b)) {
			var c = cf_getKeyCode(b);
			b = -1 == c ? $(b) : c
		}
		return b
	}

	function go_getAutoObject(a, b) {
		return b = go_getNaviObject(a, b), is_jquery(b) ? b = {button: b} : is_boolean(b) ? b = {play: b} : is_number(b) && (b = {timeoutDuration: b}), b.progress && (is_string(b.progress) || is_jquery(b.progress)) && (b.progress = {bar: b.progress}), b
	}

	function go_complementAutoObject(a, b) {
		return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_boolean(b.play) || (b.play = !0), is_number(b.delay) || (b.delay = 0), is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0), is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0), is_number(b.timeoutDuration) || (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration), b.progress && (is_function(b.progress.bar) && (b.progress.bar = b.progress.bar.call(a)), is_string(b.progress.bar) && (b.progress.bar = $(b.progress.bar)), b.progress.bar ? (is_function(b.progress.updater) || (b.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(b.progress.interval) || (b.progress.interval = 50)) : b.progress = !1), b
	}

	function go_getPrevNextObject(a, b) {
		return b = go_getNaviObject(a, b), is_jquery(b) ? b = {button: b} : is_number(b) && (b = {key: b}), b
	}

	function go_complementPrevNextObject(a, b) {
		return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_string(b.key) && (b.key = cf_getKeyCode(b.key)), b
	}

	function go_getPaginationObject(a, b) {
		return b = go_getNaviObject(a, b), is_jquery(b) ? b = {container: b} : is_boolean(b) && (b = {keys: b}), b
	}

	function go_complementPaginationObject(a, b) {
		return is_function(b.container) && (b.container = b.container.call(a)), is_string(b.container) && (b.container = $(b.container)), is_number(b.items) || (b.items = !1), is_boolean(b.keys) || (b.keys = !1), is_function(b.anchorBuilder) || is_false(b.anchorBuilder) || (b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(b.deviation) || (b.deviation = 0), b
	}

	function go_getSwipeObject(a, b) {
		return is_function(b) && (b = b.call(a)), is_undefined(b) && (b = {onTouch: !1}), is_true(b) ? b = {onTouch: b} : is_number(b) && (b = {items: b}), b
	}

	function go_complementSwipeObject(a, b) {
		return is_boolean(b.onTouch) || (b.onTouch = !0), is_boolean(b.onMouse) || (b.onMouse = !1), is_object(b.options) || (b.options = {}), is_boolean(b.options.triggerOnTouchEnd) || (b.options.triggerOnTouchEnd = !1), b
	}

	function go_getMousewheelObject(a, b) {
		return is_function(b) && (b = b.call(a)), is_true(b) ? b = {} : is_number(b) ? b = {items: b} : is_undefined(b) && (b = !1), b
	}

	function go_complementMousewheelObject(a, b) {
		return b
	}

	function gn_getItemIndex(a, b, c, d, e) {
		if (is_string(a) && (a = $(a, e)), is_object(a) && (a = $(a, e)), is_jquery(a) ? (a = e.children().index(a), is_boolean(c) || (c = !1)) : is_boolean(c) || (c = !0), is_number(a) || (a = 0), is_number(b) || (b = 0), c && (a += d.first), a += b, d.total > 0) {
			for (; a >= d.total;)a -= d.total;
			for (; 0 > a;)a += d.total
		}
		return a
	}

	function gn_getVisibleItemsPrev(a, b, c) {
		for (var d = 0, e = 0, f = c; f >= 0; f--) {
			var g = a.eq(f);
			if (d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0, d > b.maxDimension)return e;
			0 == f && (f = a.length), e++
		}
	}

	function gn_getVisibleItemsPrevFilter(a, b, c) {
		return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c)
	}

	function gn_getScrollItemsPrevFilter(a, b, c, d) {
		return gn_getItemsPrevFilter(a, b.items.filter, d, c)
	}

	function gn_getItemsPrevFilter(a, b, c, d) {
		for (var e = 0, f = 0, g = d, h = a.length; g >= 0; g--) {
			if (f++, f == h)return f;
			var i = a.eq(g);
			if (i.is(b) && (e++, e == c))return f;
			0 == g && (g = h)
		}
	}

	function gn_getVisibleOrg(a, b) {
		return b.items.visibleConf.org || a.children().slice(0, b.items.visible).filter(b.items.filter).length
	}

	function gn_getVisibleItemsNext(a, b, c) {
		for (var d = 0, e = 0, f = c, g = a.length - 1; g >= f; f++) {
			var h = a.eq(f);
			if (d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0, d > b.maxDimension)return e;
			if (e++, e == g + 1)return e;
			f == g && (f = -1)
		}
	}

	function gn_getVisibleItemsNextTestCircular(a, b, c, d) {
		var e = gn_getVisibleItemsNext(a, b, c);
		return b.circular || c + e > d && (e = d - c), e
	}

	function gn_getVisibleItemsNextFilter(a, b, c) {
		return gn_getItemsNextFilter(a, b.items.filter, b.items.visibleConf.org, c, b.circular)
	}

	function gn_getScrollItemsNextFilter(a, b, c, d) {
		return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1
	}

	function gn_getItemsNextFilter(a, b, c, d) {
		for (var f = 0, g = 0, h = d, i = a.length - 1; i >= h; h++) {
			if (g++, g >= i)return g;
			var j = a.eq(h);
			if (j.is(b) && (f++, f == c))return g;
			h == i && (h = -1)
		}
	}

	function gi_getCurrentItems(a, b) {
		return a.slice(0, b.items.visible)
	}

	function gi_getOldItemsPrev(a, b, c) {
		return a.slice(c, b.items.visibleConf.old + c)
	}

	function gi_getNewItemsPrev(a, b) {
		return a.slice(0, b.items.visible)
	}

	function gi_getOldItemsNext(a, b) {
		return a.slice(0, b.items.visibleConf.old)
	}

	function gi_getNewItemsNext(a, b, c) {
		return a.slice(c, b.items.visible + c)
	}

	function sz_storeMargin(a, b, c) {
		b.usePadding && (is_string(c) || (c = "_cfs_origCssMargin"), a.each(function () {
			var a = $(this), d = parseInt(a.css(b.d.marginRight), 10);
			is_number(d) || (d = 0), a.data(c, d)
		}))
	}

	function sz_resetMargin(a, b, c) {
		if (b.usePadding) {
			var d = is_boolean(c) ? c : !1;
			is_number(c) || (c = 0), sz_storeMargin(a, b, "_cfs_tempCssMargin"), a.each(function () {
				var a = $(this);
				a.css(b.d.marginRight, d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin"))
			})
		}
	}

	function sz_storeOrigCss(a) {
		a.each(function () {
			var a = $(this);
			a.data("_cfs_origCss", a.attr("style") || "")
		})
	}

	function sz_restoreOrigCss(a) {
		a.each(function () {
			var a = $(this);
			a.attr("style", a.data("_cfs_origCss") || "")
		})
	}

	function sz_setResponsiveSizes(a, b) {
		var d = (a.items.visible, a.items[a.d.width]), e = a[a.d.height], f = is_percentage(e);
		b.each(function () {
			var b = $(this), c = d - ms_getPaddingBorderMargin(b, a, "Width");
			b[a.d.width](c), f && b[a.d.height](ms_getPercentage(c, e))
		})
	}

	function sz_setSizes(a, b) {
		var c = a.parent(), d = a.children(), e = gi_getCurrentItems(d, b), f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1);
		if (c.css(f), b.usePadding) {
			var g = b.padding, h = g[b.d[1]];
			b.align && 0 > h && (h = 0);
			var i = e.last();
			i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h), a.css(b.d.top, g[b.d[0]]), a.css(b.d.left, g[b.d[3]])
		}
		return a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")), a.css(b.d.height, ms_getLargestSize(d, b, "height")), f
	}

	function ms_getSizes(a, b, c) {
		return [ms_getTotalSize(a, b, "width", c), ms_getLargestSize(a, b, "height", c)]
	}

	function ms_getLargestSize(a, b, c, d) {
		return is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d ? b[b.d[c]] : is_number(b.items[b.d[c]]) ? b.items[b.d[c]] : (c = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(a, b, c))
	}

	function ms_getTrueLargestSize(a, b, c) {
		for (var d = 0, e = 0, f = a.length; f > e; e++) {
			var g = a.eq(e), h = g.is(":visible") ? g[b.d[c]](!0) : 0;
			h > d && (d = h)
		}
		return d
	}

	function ms_getTotalSize(a, b, c, d) {
		if (is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d)return b[b.d[c]];
		if (is_number(b.items[b.d[c]]))return b.items[b.d[c]] * a.length;
		for (var e = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", f = 0, g = 0, h = a.length; h > g; g++) {
			var i = a.eq(g);
			f += i.is(":visible") ? i[b.d[e]](!0) : 0
		}
		return f
	}

	function ms_getParentSize(a, b, c) {
		var d = a.is(":visible");
		d && a.hide();
		var e = a.parent()[b.d[c]]();
		return d && a.show(), e
	}

	function ms_getMaxDimension(a, b) {
		return is_number(a[a.d.width]) ? a[a.d.width] : b
	}

	function ms_hasVariableSizes(a, b, c) {
		for (var d = !1, e = !1, f = 0, g = a.length; g > f; f++) {
			var h = a.eq(f), i = h.is(":visible") ? h[b.d[c]](!0) : 0;
			d === !1 ? d = i : d != i && (e = !0), 0 == d && (e = !0)
		}
		return e
	}

	function ms_getPaddingBorderMargin(a, b, c) {
		return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]()
	}

	function ms_getPercentage(a, b) {
		if (is_percentage(b)) {
			if (b = parseInt(b.slice(0, -1), 10), !is_number(b))return a;
			a *= b / 100
		}
		return a
	}

	function cf_e(a, b, c, d, e) {
		return is_boolean(c) || (c = !0), is_boolean(d) || (d = !0), is_boolean(e) || (e = !1), c && (a = b.events.prefix + a), d && (a = a + "." + b.events.namespace), d && e && (a += b.serialNumber), a
	}

	function cf_c(a, b) {
		return is_string(b.classnames[a]) ? b.classnames[a] : a
	}

	function cf_mapWrapperSizes(a, b, c) {
		is_boolean(c) || (c = !0);
		var d = b.usePadding && c ? b.padding : [0, 0, 0, 0], e = {};
		return e[b.d.width] = a[0] + d[1] + d[3], e[b.d.height] = a[1] + d[0] + d[2], e
	}

	function cf_sortParams(a, b) {
		for (var c = [], d = 0, e = a.length; e > d; d++)for (var f = 0, g = b.length; g > f; f++)if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) {
			c[f] = a[d];
			break
		}
		return c
	}

	function cf_getPadding(a) {
		if (is_undefined(a))return [0, 0, 0, 0];
		if (is_number(a))return [a, a, a, a];
		if (is_string(a) && (a = a.split("px").join("").split("em").join("").split(" ")), !is_array(a))return [0, 0, 0, 0];
		for (var b = 0; 4 > b; b++)a[b] = parseInt(a[b], 10);
		switch (a.length) {
			case 0:
				return [0, 0, 0, 0];
			case 1:
				return [a[0], a[0], a[0], a[0]];
			case 2:
				return [a[0], a[1], a[0], a[1]];
			case 3:
				return [a[0], a[1], a[2], a[1]];
			default:
				return [a[0], a[1], a[2], a[3]]
		}
	}

	function cf_getAlignPadding(a, b) {
		var c = is_number(b[b.d.width]) ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width")) : 0;
		switch (b.align) {
			case"left":
				return [0, c];
			case"right":
				return [c, 0];
			case"center":
			default:
				return [Math.ceil(c / 2), Math.floor(c / 2)]
		}
	}

	function cf_getDimensions(a) {
		for (var b = [["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3], ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]], c = b[0].length, d = "right" == a.direction || "left" == a.direction ? 0 : 1, e = {}, f = 0; c > f; f++)e[b[0][f]] = b[d][f];
		return e
	}

	function cf_getAdjust(a, b, c, d) {
		var e = a;
		if (is_function(c))e = c.call(d, e); else if (is_string(c)) {
			var f = c.split("+"), g = c.split("-");
			if (g.length > f.length)var h = !0, i = g[0], j = g[1]; else var h = !1, i = f[0], j = f[1];
			switch (i) {
				case"even":
					e = 1 == a % 2 ? a - 1 : a;
					break;
				case"odd":
					e = 0 == a % 2 ? a - 1 : a;
					break;
				default:
					e = a
			}
			j = parseInt(j, 10), is_number(j) && (h && (j = -j), e += j)
		}
		return (!is_number(e) || 1 > e) && (e = 1), e
	}

	function cf_getItemsAdjust(a, b, c, d) {
		return cf_getItemAdjustMinMax(cf_getAdjust(a, b, c, d), b.items.visibleConf)
	}

	function cf_getItemAdjustMinMax(a, b) {
		return is_number(b.min) && b.min > a && (a = b.min), is_number(b.max) && a > b.max && (a = b.max), 1 > a && (a = 1), a
	}

	function cf_getSynchArr(a) {
		is_array(a) || (a = [[a]]), is_array(a[0]) || (a = [a]);
		for (var b = 0, c = a.length; c > b; b++)is_string(a[b][0]) && (a[b][0] = $(a[b][0])), is_boolean(a[b][1]) || (a[b][1] = !0), is_boolean(a[b][2]) || (a[b][2] = !0), is_number(a[b][3]) || (a[b][3] = 0);
		return a
	}

	function cf_getKeyCode(a) {
		return "right" == a ? 39 : "left" == a ? 37 : "up" == a ? 38 : "down" == a ? 40 : -1
	}

	function cf_setCookie(a, b, c) {
		if (a) {
			var d = b.triggerHandler(cf_e("currentPosition", c));
			$.fn.carouFredSel.cookie.set(a, d)
		}
	}

	function cf_getCookie(a) {
		var b = $.fn.carouFredSel.cookie.get(a);
		return "" == b ? 0 : b
	}

	function in_mapCss(a, b) {
		for (var c = {}, d = 0, e = b.length; e > d; d++)c[b[d]] = a.css(b[d]);
		return c
	}

	function in_complementItems(a, b, c, d) {
		return is_object(a.visibleConf) || (a.visibleConf = {}), is_object(a.sizesConf) || (a.sizesConf = {}), 0 == a.start && is_number(d) && (a.start = d), is_object(a.visible) ? (a.visibleConf.min = a.visible.min, a.visibleConf.max = a.visible.max, a.visible = !1) : is_string(a.visible) ? ("variable" == a.visible ? a.visibleConf.variable = !0 : a.visibleConf.adjust = a.visible, a.visible = !1) : is_function(a.visible) && (a.visibleConf.adjust = a.visible, a.visible = !1), is_string(a.filter) || (a.filter = c.filter(":hidden").length > 0 ? ":visible" : "*"), a[b.d.width] || (b.responsive ? (debug(!0, "Set a " + b.d.width + " for the items!"), a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")) : a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth") ? "variable" : c[b.d.outerWidth](!0)), a[b.d.height] || (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight") ? "variable" : c[b.d.outerHeight](!0)), a.sizesConf.width = a.width, a.sizesConf.height = a.height, a
	}

	function in_complementVisibleItems(a, b) {
		return "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0), a.items.visibleConf.variable || (is_number(a[a.d.width]) ? a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]) : (a.items.visible = Math.floor(b / a.items[a.d.width]), a[a.d.width] = a.items.visible * a.items[a.d.width], a.items.visibleConf.adjust || (a.align = !1)), ("Infinity" == a.items.visible || 1 > a.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), a.items.visibleConf.variable = !0)), a
	}

	function in_complementPrimarySize(a, b, c) {
		return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")), a
	}

	function in_complementSecondarySize(a, b, c) {
		return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")), a || (a = b.items[b.d.height]), a
	}

	function in_getAlignPadding(a, b) {
		var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a);
		return a.padding[a.d[1]] = c[1], a.padding[a.d[3]] = c[0], a
	}

	function in_getResponsiveValues(a, b) {
		var d = cf_getItemAdjustMinMax(Math.ceil(a[a.d.width] / a.items[a.d.width]), a.items.visibleConf);
		d > b.length && (d = b.length);
		var e = Math.floor(a[a.d.width] / d);
		return a.items.visible = d, a.items[a.d.width] = e, a[a.d.width] = d * e, a
	}

	function bt_pauseOnHoverConfig(a) {
		if (is_string(a))var b = a.indexOf("immediate") > -1 ? !0 : !1, c = a.indexOf("resume") > -1 ? !0 : !1; else var b = c = !1;
		return [b, c]
	}

	function bt_mousesheelNumber(a) {
		return is_number(a) ? a : null
	}

	function is_null(a) {
		return null === a
	}

	function is_undefined(a) {
		return is_null(a) || a === void 0 || "" === a || "undefined" === a
	}

	function is_array(a) {
		return a instanceof Array
	}

	function is_jquery(a) {
		return a instanceof jQuery
	}

	function is_object(a) {
		return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a)
	}

	function is_number(a) {
		return (a instanceof Number || "number" == typeof a) && !isNaN(a)
	}

	function is_string(a) {
		return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a)
	}

	function is_function(a) {
		return a instanceof Function || "function" == typeof a
	}

	function is_boolean(a) {
		return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
	}

	function is_true(a) {
		return a === !0 || "true" === a
	}

	function is_false(a) {
		return a === !1 || "false" === a
	}

	function is_percentage(a) {
		return is_string(a) && "%" == a.slice(-1)
	}

	function getTime() {
		return (new Date).getTime()
	}

	function deprecated(a, b) {
		debug(!0, a + " is DEPRECATED, support for it will be removed. Use " + b + " instead.")
	}

	function debug(a, b) {
		if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
			if (is_object(a)) {
				var c = " (" + a.selector + ")";
				a = a.debug
			} else var c = "";
			if (!a)return !1;
			b = is_string(b) ? "carouFredSel" + c + ": " + b : ["carouFredSel" + c + ":", b], window.console.log(b)
		}
		return !1
	}

	$.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function (options, configs) {
		if (0 == this.length)return debug(!0, 'No element found for "' + this.selector + '".'), this;
		if (this.length > 1)return this.each(function () {
			$(this).carouFredSel(options, configs)
		});
		var $cfs = this, $tt0 = this[0], starting_position = !1;
		$cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
		var FN = {};
		FN._init = function (a, b, c) {
			a = go_getObject($tt0, a), a.items = go_getItemsObject($tt0, a.items), a.scroll = go_getScrollObject($tt0, a.scroll), a.auto = go_getAutoObject($tt0, a.auto), a.prev = go_getPrevNextObject($tt0, a.prev), a.next = go_getPrevNextObject($tt0, a.next), a.pagination = go_getPaginationObject($tt0, a.pagination), a.swipe = go_getSwipeObject($tt0, a.swipe), a.mousewheel = go_getMousewheelObject($tt0, a.mousewheel), b && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, a), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
			var d = $cfs.children(), e = ms_getParentSize($wrp, opts, "width");
			if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, e), opts.items = in_complementItems(opts.items, opts, d, c), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, d), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, d), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(e, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, e)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive)opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, d, e); else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
				case"center":
				case"left":
				case"right":
					"variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, d), opts.usePadding = !0);
					break;
				default:
					opts.align = !1, opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0
			}
			is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
		}, FN._build = function () {
			$cfs.data("_cfs_isCarousel", !0);
			var a = $cfs.children(), b = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]), c = "relative";
			switch (b.position) {
				case"absolute":
				case"fixed":
					c = b.position
			}
			"parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(b), $wrp.css({
				overflow: "hidden",
				position: c
			}), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", b.zIndex), $cfs.css({
				textAlign: "left",
				"float": "none",
				position: "absolute",
				top: 0,
				right: "auto",
				bottom: "auto",
				left: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0,
				marginLeft: 0
			}), sz_storeMargin(a, opts), sz_storeOrigCss(a), opts.responsive && sz_setResponsiveSizes(opts, a)
		}, FN._bind_events = function () {
			FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function (a, b) {
				return a.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), b)), !0
			}), $cfs.bind(cf_e("finish", conf), function (a) {
				return a.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
			}), $cfs.bind(cf_e("pause", conf), function (a, b, c) {
				if (a.stopPropagation(), tmrs = sc_clearTimers(tmrs), b && crsl.isScrolling) {
					scrl.isStopped = !0;
					var d = getTime() - scrl.startTime;
					scrl.duration -= d, scrl.pre && (scrl.pre.duration -= d), scrl.post && (scrl.post.duration -= d), sc_stopScroll(scrl, !1)
				}
				if (crsl.isPaused || crsl.isScrolling || c && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
					var e = opts.auto.timeoutDuration - tmrs.timePassed, f = 100 - Math.ceil(100 * e / opts.auto.timeoutDuration);
					opts.auto.onTimeoutPause.call($tt0, f, e)
				}
				return !0
			}), $cfs.bind(cf_e("play", conf), function (a, b, c, d) {
				a.stopPropagation(), tmrs = sc_clearTimers(tmrs);
				var e = [b, c, d], f = ["string", "number", "boolean"], g = cf_sortParams(e, f);
				if (b = g[0], c = g[1], d = g[2], "prev" != b && "next" != b && (b = crsl.direction), is_number(c) || (c = 0), is_boolean(d) || (d = !1), d && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play)return a.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
				crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
				var h = opts.auto.timeoutDuration + c;
				return dur2 = h - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / h), opts.auto.progress && (tmrs.progress = setInterval(function () {
					var a = getTime() - tmrs.startTime + tmrs.timePassed, b = Math.ceil(100 * a / h);
					opts.auto.progress.updater.call(opts.auto.progress.bar[0], b)
				}, opts.auto.progress.interval)), tmrs.auto = setTimeout(function () {
					opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), b) : $cfs.trigger(cf_e(b, conf), opts.auto)
				}, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
			}), $cfs.bind(cf_e("resume", conf), function (a) {
				return a.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
			}), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function (a, b, c, d, e) {
				if (a.stopPropagation(), crsl.isStopped || $cfs.is(":hidden"))return a.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
				var f = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
				if (f > itms.total)return a.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + f + " needed): Not scrolling.");
				var g = [b, c, d, e], h = ["object", "number/string", "function", "boolean"], i = cf_sortParams(g, h);
				b = i[0], c = i[1], d = i[2], e = i[3];
				var j = a.type.slice(conf.events.prefix.length);
				if (is_object(b) || (b = {}), is_function(d) && (b.onAfter = d), is_boolean(e) && (b.queue = e), b = $.extend(!0, {}, opts[j], b), b.conditions && !b.conditions.call($tt0, j))return a.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
				if (!is_number(c)) {
					if ("*" != opts.items.filter)c = "visible"; else for (var k = [c, b.items, opts[j].items], i = 0, l = k.length; l > i; i++)if (is_number(k[i]) || "page" == k[i] || "visible" == k[i]) {
						c = k[i];
						break
					}
					switch (c) {
						case"page":
							return a.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(j + "Page", conf), [b, d]);
						case"visible":
							opts.items.visibleConf.variable || "*" != opts.items.filter || (c = opts.items.visible)
					}
				}
				if (scrl.isStopped)return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]]), a.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
				if (b.duration > 0 && crsl.isScrolling)return b.queue && ("last" == b.queue && (queu = []), ("first" != b.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]])), a.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
				if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + j, conf), [b, c]), opts.synchronise)for (var m = opts.synchronise, n = [b, c], o = 0, l = m.length; l > o; o++) {
					var p = j;
					m[o][2] || (p = "prev" == p ? "next" : "prev"), m[o][1] || (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", ["configuration", p])), n[1] = c + m[o][3], m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n])
				}
				return !0
			}), $cfs.bind(cf_e("slide_prev", conf), function (a, b, c) {
				a.stopPropagation();
				var d = $cfs.children();
				if (!opts.circular && 0 == itms.first)return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), a.stopImmediatePropagation();
				if (sz_resetMargin(d, opts), !is_number(c)) {
					if (opts.items.visibleConf.variable)c = gn_getVisibleItemsPrev(d, opts, itms.total - 1); else if ("*" != opts.items.filter) {
						var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
						c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e)
					} else c = opts.items.visible;
					c = cf_getAdjust(c, opts, b.items, $tt0)
				}
				if (opts.circular || itms.total - c < itms.first && (c = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
					var f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0);
					f >= opts.items.visible + c && itms.total > c && (c++, f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = f
				} else if ("*" != opts.items.filter) {
					var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
					opts.items.visible = cf_getItemsAdjust(f, opts, opts.items.visibleConf.adjust, $tt0)
				}
				if (sz_resetMargin(d, opts, !0), 0 == c)return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
				for (debug(conf, "Scrolling " + c + " items backward."), itms.first += c; itms.first >= itms.total;)itms.first -= itms.total;
				opts.circular || (0 == itms.first && b.onEnd && b.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - c, itms.total).prependTo($cfs), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
				var d = $cfs.children(), g = gi_getOldItemsPrev(d, opts, c), h = gi_getNewItemsPrev(d, opts), i = d.eq(c - 1), j = g.last(), k = h.last();
				sz_resetMargin(d, opts);
				var l = 0, m = 0;
				if (opts.align) {
					var n = cf_getAlignPadding(h, opts);
					l = n[0], m = n[1]
				}
				var o = 0 > l ? opts.padding[opts.d[3]] : 0, p = !1, q = $();
				if (c > opts.items.visible && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
					var r = opts.items[opts.d.width];
					p = q, i = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
				}
				var s = !1, t = ms_getTotalSize(d.slice(0, c), opts, "width"), u = cf_mapWrapperSizes(ms_getSizes(h, opts, !0), opts, !opts.usePadding), v = 0, w = {}, x = {}, y = {}, z = {}, A = {}, B = {}, C = {}, D = sc_getDuration(b, opts, c, t);
				switch (b.fx) {
					case"cover":
					case"cover-fade":
						v = ms_getTotalSize(d.slice(0, opts.items.visible), opts, "width")
				}
				p && (opts.items[opts.d.width] = r), sz_resetMargin(d, opts, !0), m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]), l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = m, opts.padding[opts.d[3]] = l), B[opts.d.left] = -(t - o), C[opts.d.left] = -(v - o), x[opts.d.left] = u[opts.d.width];
				var E = function () {
				}, F = function () {
				}, G = function () {
				}, H = function () {
				}, I = function () {
				}, J = function () {
				}, K = function () {
				}, L = function () {
				}, M = function () {
				}, N = function () {
				}, O = function () {
				};
				switch (b.fx) {
					case"crossfade":
					case"cover":
					case"cover-fade":
					case"uncover":
					case"uncover-fade":
						s = $cfs.clone(!0).appendTo($wrp)
				}
				switch (b.fx) {
					case"crossfade":
					case"uncover":
					case"uncover-fade":
						s.children().slice(0, c).remove(), s.children().slice(opts.items.visibleConf.old).remove();
						break;
					case"cover":
					case"cover-fade":
						s.children().slice(opts.items.visible).remove(), s.css(C)
				}
				if ($cfs.css(B), scrl = sc_setScroll(D, b.easing, conf), w[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (E = function () {
						$wrp.css(u)
					}, F = function () {
						scrl.anims.push([$wrp, u])
					}), opts.usePadding) {
					switch (k.not(i).length && (y[opts.d.marginRight] = i.data("_cfs_origCssMargin"), 0 > l ? i.css(y) : (K = function () {
						i.css(y)
					}, L = function () {
						scrl.anims.push([i, y])
					})), b.fx) {
						case"cover":
						case"cover-fade":
							s.children().eq(c - 1).css(y)
					}
					k.not(j).length && (z[opts.d.marginRight] = j.data("_cfs_origCssMargin"), G = function () {
						j.css(z)
					}, H = function () {
						scrl.anims.push([j, z])
					}), m >= 0 && (A[opts.d.marginRight] = k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], I = function () {
						k.css(A)
					}, J = function () {
						scrl.anims.push([k, A])
					})
				}
				O = function () {
					$cfs.css(w)
				};
				var P = opts.items.visible + c - itms.total;
				N = function () {
					if (P > 0 && ($cfs.children().slice(itms.total).remove(), g = $($cfs.children().slice(itms.total - (opts.items.visible - P)).get().concat($cfs.children().slice(0, P).get()))), sc_showHiddenItems(p), opts.usePadding) {
						var a = $cfs.children().eq(opts.items.visible + c - 1);
						a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
					}
				};
				var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u);
				switch (M = function () {
					sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", Q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
				}, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", Q, clbk), b.fx) {
					case"none":
						$cfs.css(w), E(), G(), I(), K(), O(), N(), M();
						break;
					case"fade":
						scrl.anims.push([$cfs, {opacity: 0}, function () {
							E(), G(), I(), K(), O(), N(), scrl = sc_setScroll(D, b.easing, conf), scrl.anims.push([$cfs, {opacity: 1}, M]), sc_startScroll(scrl, conf)
						}]);
						break;
					case"crossfade":
						$cfs.css({opacity: 0}), scrl.anims.push([s, {opacity: 0}]), scrl.anims.push([$cfs, {opacity: 1}, M]), F(), G(), I(), K(), O(), N();
						break;
					case"cover":
						scrl.anims.push([s, w, function () {
							G(), I(), K(), O(), N(), M()
						}]), F();
						break;
					case"cover-fade":
						scrl.anims.push([$cfs, {opacity: 0}]), scrl.anims.push([s, w, function () {
							G(), I(), K(), O(), N(), M()
						}]), F();
						break;
					case"uncover":
						scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
						break;
					case"uncover-fade":
						$cfs.css({opacity: 0}), scrl.anims.push([$cfs, {opacity: 1}]), scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
						break;
					default:
						scrl.anims.push([$cfs, w, function () {
							N(), M()
						}]), F(), H(), J(), L()
				}
				return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
			}), $cfs.bind(cf_e("slide_next", conf), function (a, b, c) {
				a.stopPropagation();
				var d = $cfs.children();
				if (!opts.circular && itms.first == opts.items.visible)return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), a.stopImmediatePropagation();
				if (sz_resetMargin(d, opts), !is_number(c)) {
					if ("*" != opts.items.filter) {
						var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
						c = gn_getScrollItemsNextFilter(d, opts, 0, e)
					} else c = opts.items.visible;
					c = cf_getAdjust(c, opts, b.items, $tt0)
				}
				var f = 0 == itms.first ? itms.total : itms.first;
				if (!opts.circular) {
					if (opts.items.visibleConf.variable)var g = gn_getVisibleItemsNext(d, opts, c), e = gn_getVisibleItemsPrev(d, opts, f - 1); else var g = opts.items.visible, e = opts.items.visible;
					c + g > f && (c = f - e)
				}
				if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
					for (var g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - c >= g && itms.total > c;)c++, g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0);
					opts.items.visible = g
				} else if ("*" != opts.items.filter) {
					var g = gn_getVisibleItemsNextFilter(d, opts, c);
					opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, $tt0)
				}
				if (sz_resetMargin(d, opts, !0), 0 == c)return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
				for (debug(conf, "Scrolling " + c + " items forward."), itms.first -= c; 0 > itms.first;)itms.first += itms.total;
				opts.circular || (itms.first == opts.items.visible && b.onEnd && b.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
				var d = $cfs.children(), h = gi_getOldItemsNext(d, opts), i = gi_getNewItemsNext(d, opts, c), j = d.eq(c - 1), k = h.last(), l = i.last();
				sz_resetMargin(d, opts);
				var m = 0, n = 0;
				if (opts.align) {
					var o = cf_getAlignPadding(i, opts);
					m = o[0], n = o[1]
				}
				var p = !1, q = $();
				if (c > opts.items.visibleConf.old && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
					var r = opts.items[opts.d.width];
					p = q, j = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
				}
				var s = !1, t = ms_getTotalSize(d.slice(0, c), opts, "width"), u = cf_mapWrapperSizes(ms_getSizes(i, opts, !0), opts, !opts.usePadding), v = 0, w = {}, x = {}, y = {}, z = {}, A = {}, B = sc_getDuration(b, opts, c, t);
				switch (b.fx) {
					case"uncover":
					case"uncover-fade":
						v = ms_getTotalSize(d.slice(0, opts.items.visibleConf.old), opts, "width")
				}
				p && (opts.items[opts.d.width] = r), opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0), sz_resetMargin(d, opts, !0), sz_resetMargin(k, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = n, opts.padding[opts.d[3]] = m), A[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
				var C = function () {
				}, D = function () {
				}, E = function () {
				}, F = function () {
				}, G = function () {
				}, H = function () {
				}, I = function () {
				}, J = function () {
				}, K = function () {
				};
				switch (b.fx) {
					case"crossfade":
					case"cover":
					case"cover-fade":
					case"uncover":
					case"uncover-fade":
						s = $cfs.clone(!0).appendTo($wrp), s.children().slice(opts.items.visibleConf.old).remove()
				}
				switch (b.fx) {
					case"crossfade":
					case"cover":
					case"cover-fade":
						$cfs.css("zIndex", 1), s.css("zIndex", 0)
				}
				if (scrl = sc_setScroll(B, b.easing, conf), w[opts.d.left] = -t, x[opts.d.left] = -v, 0 > m && (w[opts.d.left] += m), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (C = function () {
						$wrp.css(u)
					}, D = function () {
						scrl.anims.push([$wrp, u])
					}), opts.usePadding) {
					var L = l.data("_cfs_origCssMargin");
					n >= 0 && (L += opts.padding[opts.d[1]]), l.css(opts.d.marginRight, L), j.not(k).length && (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")), E = function () {
						k.css(z)
					}, F = function () {
						scrl.anims.push([k, z])
					};
					var M = j.data("_cfs_origCssMargin");
					m > 0 && (M += opts.padding[opts.d[3]]), y[opts.d.marginRight] = M, G = function () {
						j.css(y)
					}, H = function () {
						scrl.anims.push([j, y])
					}
				}
				K = function () {
					$cfs.css(A)
				};
				var N = opts.items.visible + c - itms.total;
				J = function () {
					N > 0 && $cfs.children().slice(itms.total).remove();
					var a = $cfs.children().slice(0, c).appendTo($cfs).last();
					if (N > 0 && (i = gi_getCurrentItems(d, opts)), sc_showHiddenItems(p), opts.usePadding) {
						if (itms.total < opts.items.visible + c) {
							var b = $cfs.children().eq(opts.items.visible - 1);
							b.css(opts.d.marginRight, b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
						}
						a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
					}
				};
				var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u);
				switch (I = function () {
					$cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", O, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
				}, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", O, clbk), b.fx) {
					case"none":
						$cfs.css(w), C(), E(), G(), K(), J(), I();
						break;
					case"fade":
						scrl.anims.push([$cfs, {opacity: 0}, function () {
							C(), E(), G(), K(), J(), scrl = sc_setScroll(B, b.easing, conf), scrl.anims.push([$cfs, {opacity: 1}, I]), sc_startScroll(scrl, conf)
						}]);
						break;
					case"crossfade":
						$cfs.css({opacity: 0}), scrl.anims.push([s, {opacity: 0}]), scrl.anims.push([$cfs, {opacity: 1}, I]), D(), E(), G(), K(), J();
						break;
					case"cover":
						$cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
						break;
					case"cover-fade":
						$cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([s, {opacity: 0}]), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
						break;
					case"uncover":
						scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
						break;
					case"uncover-fade":
						$cfs.css({opacity: 0}), scrl.anims.push([$cfs, {opacity: 1}]), scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
						break;
					default:
						scrl.anims.push([$cfs, w, function () {
							K(), J(), I()
						}]), D(), F(), H()
				}
				return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
			}), $cfs.bind(cf_e("slideTo", conf), function (a, b, c, d, e, f, g) {
				a.stopPropagation();
				var h = [b, c, d, e, f, g], i = ["string/number/object", "number", "boolean", "object", "string", "function"], j = cf_sortParams(h, i);
				return e = j[3], f = j[4], g = j[5], b = gn_getItemIndex(j[0], j[1], j[2], itms, $cfs), 0 == b ? !1 : (is_object(e) || (e = !1), "prev" != f && "next" != f && (f = opts.circular ? itms.total / 2 >= b ? "next" : "prev" : 0 == itms.first || itms.first > b ? "next" : "prev"), "prev" == f && (b = itms.total - b), $cfs.trigger(cf_e(f, conf), [e, b, g]), !0)
			}), $cfs.bind(cf_e("prevPage", conf), function (a, b, c) {
				a.stopPropagation();
				var d = $cfs.triggerHandler(cf_e("currentPage", conf));
				return $cfs.triggerHandler(cf_e("slideToPage", conf), [d - 1, b, "prev", c])
			}), $cfs.bind(cf_e("nextPage", conf), function (a, b, c) {
				a.stopPropagation();
				var d = $cfs.triggerHandler(cf_e("currentPage", conf));
				return $cfs.triggerHandler(cf_e("slideToPage", conf), [d + 1, b, "next", c])
			}), $cfs.bind(cf_e("slideToPage", conf), function (a, b, c, d, e) {
				a.stopPropagation(), is_number(b) || (b = $cfs.triggerHandler(cf_e("currentPage", conf)));
				var f = opts.pagination.items || opts.items.visible, g = Math.ceil(itms.total / f) - 1;
				return 0 > b && (b = g), b > g && (b = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [b * f, 0, !0, c, d, e])
			}), $cfs.bind(cf_e("jumpToStart", conf), function (a, b) {
				if (a.stopPropagation(), b = b ? gn_getItemIndex(b, 0, !0, itms, $cfs) : 0, b += itms.first, 0 != b) {
					if (itms.total > 0)for (; b > itms.total;)b -= itms.total;
					$cfs.prepend($cfs.children().slice(b, itms.total))
				}
				return !0
			}), $cfs.bind(cf_e("synchronise", conf), function (a, b) {
				if (a.stopPropagation(), b)b = cf_getSynchArr(b); else {
					if (!opts.synchronise)return debug(conf, "No carousel to synchronise.");
					b = opts.synchronise
				}
				for (var c = $cfs.triggerHandler(cf_e("currentPosition", conf)), d = !0, e = 0, f = b.length; f > e; e++)b[e][0].triggerHandler(cf_e("slideTo", conf), [c, b[e][3], !0]) || (d = !1);
				return d
			}), $cfs.bind(cf_e("queue", conf), function (a, b, c) {
				return a.stopPropagation(), is_function(b) ? b.call($tt0, queu) : is_array(b) ? queu = b : is_undefined(b) || queu.push([b, c]), queu
			}), $cfs.bind(cf_e("insertItem", conf), function (a, b, c, d, e) {
				a.stopPropagation();
				var f = [b, c, d, e], g = ["string/object", "string/number/object", "boolean", "number"], h = cf_sortParams(f, g);
				if (b = h[0], c = h[1], d = h[2], e = h[3], is_object(b) && !is_jquery(b) ? b = $(b) : is_string(b) && (b = $(b)), !is_jquery(b) || 0 == b.length)return debug(conf, "Not a valid object.");
				is_undefined(c) && (c = "end"), sz_storeMargin(b, opts), sz_storeOrigCss(b);
				var i = c, j = "before";
				"end" == c ? d ? (0 == itms.first ? (c = itms.total - 1, j = "after") : (c = itms.first, itms.first += b.length), 0 > c && (c = 0)) : (c = itms.total - 1, j = "after") : c = gn_getItemIndex(c, e, d, itms, $cfs);
				var k = $cfs.children().eq(c);
				return k.length ? k[j](b) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(b)), "end" == i || d || itms.first > c && (itms.first += b.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
			}), $cfs.bind(cf_e("removeItem", conf), function (a, b, c, d) {
				a.stopPropagation();
				var e = [b, c, d], f = ["string/number/object", "boolean", "number"], g = cf_sortParams(e, f);
				if (b = g[0], c = g[1], d = g[2], b instanceof $ && b.length > 1)return i = $(), b.each(function () {
					var e = $cfs.trigger(cf_e("removeItem", conf), [$(this), c, d]);
					e && (i = i.add(e))
				}), i;
				if (is_undefined(b) || "end" == b)i = $cfs.children().last(); else {
					b = gn_getItemIndex(b, d, c, itms, $cfs);
					var i = $cfs.children().eq(b);
					i.length && itms.first > b && (itms.first -= i.length)
				}
				return i && i.length && (i.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), i
			}), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function (a, b) {
				a.stopPropagation();
				var c = a.type.slice(conf.events.prefix.length);
				return is_array(b) && (clbk[c] = b), is_function(b) && clbk[c].push(b), clbk[c]
			}), $cfs.bind(cf_e("currentPosition", conf), function (a, b) {
				if (a.stopPropagation(), 0 == itms.first)var c = 0; else var c = itms.total - itms.first;
				return is_function(b) && b.call($tt0, c), c
			}), $cfs.bind(cf_e("currentPage", conf), function (a, b) {
				a.stopPropagation();
				var e, c = opts.pagination.items || opts.items.visible, d = Math.ceil(itms.total / c - 1);
				return e = 0 == itms.first ? 0 : itms.first < itms.total % c ? 0 : itms.first != c || opts.circular ? Math.round((itms.total - itms.first) / c) : d, 0 > e && (e = 0), e > d && (e = d), is_function(b) && b.call($tt0, e), e
			}), $cfs.bind(cf_e("currentVisible", conf), function (a, b) {
				a.stopPropagation();
				var c = gi_getCurrentItems($cfs.children(), opts);
				return is_function(b) && b.call($tt0, c), c
			}), $cfs.bind(cf_e("slice", conf), function (a, b, c, d) {
				if (a.stopPropagation(), 0 == itms.total)return !1;
				var e = [b, c, d], f = ["number", "number", "function"], g = cf_sortParams(e, f);
				if (b = is_number(g[0]) ? g[0] : 0, c = is_number(g[1]) ? g[1] : itms.total, d = g[2], b += itms.first, c += itms.first, items.total > 0) {
					for (; b > itms.total;)b -= itms.total;
					for (; c > itms.total;)c -= itms.total;
					for (; 0 > b;)b += itms.total;
					for (; 0 > c;)c += itms.total
				}
				var i, h = $cfs.children();
				return i = c > b ? h.slice(b, c) : $(h.slice(b, itms.total).get().concat(h.slice(0, c).get())), is_function(d) && d.call($tt0, i), i
			}), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function (a, b) {
				a.stopPropagation();
				var c = a.type.slice(conf.events.prefix.length), d = crsl[c];
				return is_function(b) && b.call($tt0, d), d
			}), $cfs.bind(cf_e("configuration", conf), function (e, a, b, c) {
				e.stopPropagation();
				var reInit = !1;
				if (is_function(a))a.call($tt0, opts); else if (is_object(a))opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a); else if (!is_undefined(a))if (is_function(b)) {
					var val = eval("opts." + a);
					is_undefined(val) && (val = ""), b.call($tt0, val)
				} else {
					if (is_undefined(b))return jQuery.globalEval("opts." + a);
					"boolean" != typeof c && (c = !0), jQuery.globalEval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : jQuery.globalEval("opts." + a + " = b")
				}
				if (reInit) {
					sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
					var sz = sz_setSizes($cfs, opts);
					$cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
				}
				return opts
			}), $cfs.bind(cf_e("linkAnchors", conf), function (a, b, c) {
				return a.stopPropagation(), is_undefined(b) ? b = $("body") : is_string(b) && (b = $(b)), is_jquery(b) && 0 != b.length ? (is_string(c) || (c = "a.caroufredsel"), b.find(c).each(function () {
					var a = this.hash || "";
					a.length > 0 && -1 != $cfs.children().index($(a)) && $(this).unbind("click").click(function (b) {
						b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), a)
					})
				}), !0) : debug(conf, "Not a valid object.")
			}), $cfs.bind(cf_e("updatePageStatus", conf), function (a, b) {
				if (a.stopPropagation(), opts.pagination.container) {
					var d = opts.pagination.items || opts.items.visible, e = Math.ceil(itms.total / d);
					b && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function () {
						for (var a = 0; e > a; a++) {
							var b = $cfs.children().eq(gn_getItemIndex(a * d, 0, !0, itms, $cfs));
							$(this).append(opts.pagination.anchorBuilder.call(b[0], a + 1))
						}
					})), opts.pagination.container.each(function () {
						$(this).children().unbind(opts.pagination.event).each(function (a) {
							$(this).bind(opts.pagination.event, function (b) {
								b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [a * d, -opts.pagination.deviation, !0, opts.pagination])
							})
						})
					}));
					var f = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
					return f >= e && (f = 0), 0 > f && (f = e - 1), opts.pagination.container.each(function () {
						$(this).children().removeClass(cf_c("selected", conf)).eq(f).addClass(cf_c("selected", conf))
					}), !0
				}
			}), $cfs.bind(cf_e("updateSizes", conf), function () {
				var b = opts.items.visible, c = $cfs.children(), d = ms_getParentSize($wrp, opts, "width");
				if (itms.total = c.length, crsl.primarySizePercentage ? (opts.maxDimension = d, opts[opts.d.width] = ms_getPercentage(d, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, d), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, c, d), b = opts.items.visible, sz_setResponsiveSizes(opts, c)) : opts.items.visibleConf.variable ? b = gn_getVisibleItemsNext(c, opts, 0) : "*" != opts.items.filter && (b = gn_getVisibleItemsNextFilter(c, opts, 0)), !opts.circular && 0 != itms.first && b > itms.first) {
					if (opts.items.visibleConf.variable)var e = gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first; else if ("*" != opts.items.filter)var e = gn_getVisibleItemsPrevFilter(c, opts, itms.first) - itms.first; else var e = opts.items.visible - itms.first;
					debug(conf, "Preventing non-circular: sliding " + e + " items backward."), $cfs.trigger(cf_e("prev", conf), e)
				}
				opts.items.visible = cf_getItemsAdjust(b, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, c);
				var f = sz_setSizes($cfs, opts);
				return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, f]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), f
			}), $cfs.bind(cf_e("destroy", conf), function (a, b) {
				return a.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), b && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
			}), $cfs.bind(cf_e("debug", conf), function () {
				return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
			}), $cfs.bind("_cfs_triggerEvent", function (a, b, c) {
				return a.stopPropagation(), $cfs.triggerHandler(cf_e(b, conf), c)
			})
		}, FN._unbind_events = function () {
			$cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
		}, FN._bind_buttons = function () {
			if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
				var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
				$wrp.bind(cf_e("mouseenter", conf, !1), function () {
					$cfs.trigger(cf_e("pause", conf), a)
				}).bind(cf_e("mouseleave", conf, !1), function () {
					$cfs.trigger(cf_e("resume", conf))
				})
			}
			if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function (a) {
					a.preventDefault();
					var b = !1, c = null;
					crsl.isPaused ? b = "play" : opts.auto.pauseOnEvent && (b = "pause", c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), b && $cfs.trigger(cf_e(b, conf), c)
				}), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function (a) {
					a.preventDefault(), $cfs.trigger(cf_e("prev", conf))
				}), opts.prev.pauseOnHover)) {
				var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
				opts.prev.button.bind(cf_e("mouseenter", conf, !1), function () {
					$cfs.trigger(cf_e("pause", conf), a)
				}).bind(cf_e("mouseleave", conf, !1), function () {
					$cfs.trigger(cf_e("resume", conf))
				})
			}
			if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function (a) {
					a.preventDefault(), $cfs.trigger(cf_e("next", conf))
				}), opts.next.pauseOnHover)) {
				var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
				opts.next.button.bind(cf_e("mouseenter", conf, !1), function () {
					$cfs.trigger(cf_e("pause", conf), a)
				}).bind(cf_e("mouseleave", conf, !1), function () {
					$cfs.trigger(cf_e("resume", conf))
				})
			}
			if (opts.pagination.container && opts.pagination.pauseOnHover) {
				var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
				opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function () {
					$cfs.trigger(cf_e("pause", conf), a)
				}).bind(cf_e("mouseleave", conf, !1), function () {
					$cfs.trigger(cf_e("resume", conf))
				})
			}
			if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) {
					var b = a.keyCode;
					b == opts.next.key && (a.preventDefault(), $cfs.trigger(cf_e("next", conf))), b == opts.prev.key && (a.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
				}), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function (a) {
					var b = a.keyCode;
					b >= 49 && 58 > b && (b = (b - 49) * opts.items.visible, itms.total >= b && (a.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [b, 0, !0, opts.pagination])))
				}), $.fn.swipe) {
				var b = "ontouchstart"in window;
				if (b && opts.swipe.onTouch || !b && opts.swipe.onMouse) {
					var c = $.extend(!0, {}, opts.prev, opts.swipe), d = $.extend(!0, {}, opts.next, opts.swipe), e = function () {
						$cfs.trigger(cf_e("prev", conf), [c])
					}, f = function () {
						$cfs.trigger(cf_e("next", conf), [d])
					};
					switch (opts.direction) {
						case"up":
						case"down":
							opts.swipe.options.swipeUp = f, opts.swipe.options.swipeDown = e;
							break;
						default:
							opts.swipe.options.swipeLeft = f, opts.swipe.options.swipeRight = e
					}
					crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
				}
			}
			if ($.fn.mousewheel && opts.mousewheel) {
				var g = $.extend(!0, {}, opts.prev, opts.mousewheel), h = $.extend(!0, {}, opts.next, opts.mousewheel);
				crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function (a, b) {
					a.preventDefault(), b > 0 ? $cfs.trigger(cf_e("prev", conf), [g]) : $cfs.trigger(cf_e("next", conf), [h])
				}), crsl.mousewheel = !0
			}
			if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
				var i = function () {
					$cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
				}, j = $(window), k = null;
				if ($.debounce && "debounce" == conf.onWindowResize)k = $.debounce(200, i); else if ($.throttle && "throttle" == conf.onWindowResize)k = $.throttle(300, i); else {
					var l = 0, m = 0;
					k = function () {
						var a = j.width(), b = j.height();
						(a != l || b != m) && (i(), l = a, m = b)
					}
				}
				j.bind(cf_e("resize", conf, !1, !0, !0), k)
			}
		}, FN._unbind_buttons = function () {
			var b = (cf_e("", conf), cf_e("", conf, !1));
			ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(b), opts.auto.button && opts.auto.button.unbind(b), opts.prev.button && opts.prev.button.unbind(b), opts.next.button && opts.next.button.unbind(b), opts.pagination.container && (opts.pagination.container.unbind(b), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
		}, is_boolean(configs) && (configs = {debug: configs});
		var crsl = {
			direction: "next",
			isPaused: !0,
			isScrolling: !1,
			isStopped: !1,
			mousewheel: !1,
			swipe: !1
		}, itms = {total: $cfs.children().length, first: 0}, tmrs = {
			auto: null,
			progress: null,
			startTime: getTime(),
			timePassed: 0
		}, scrl = {isStopped: !1, duration: 0, startTime: 0, easing: "", anims: []}, clbk = {
			onBefore: [],
			onAfter: []
		}, queu = [], conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs), opts = {}, opts_orig = $.extend(!0, {}, options), $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
		if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start))var start_arr = opts.items.start; else {
			var start_arr = [];
			0 != opts.items.start && start_arr.push(opts.items.start)
		}
		if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)for (var a = 0, l = start_arr.length; l > a; a++) {
			var s = start_arr[a];
			if (0 != s) {
				if (s === !0) {
					if (s = window.location.hash, 1 > s.length)continue
				} else"random" === s && (s = Math.floor(Math.random() * itms.total));
				if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {fx: "none"}]))break
			}
		}
		var siz = sz_setSizes($cfs, opts), itm = gi_getCurrentItems($cfs.children(), opts);
		return opts.onCreate && opts.onCreate.call($tt0, {
			width: siz.width,
			height: siz.height,
			items: itm
		}), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
	}, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
		synchronise: !1,
		infinite: !0,
		circular: !0,
		responsive: !1,
		direction: "left",
		items: {start: 0},
		scroll: {easing: "swing", duration: 500, pauseOnHover: !1, event: "click", queue: !1}
	}, $.fn.carouFredSel.configs = {
		debug: !1,
		transition: !1,
		onWindowResize: "throttle",
		events: {prefix: "", namespace: "cfs"},
		wrapper: {element: "div", classname: "caroufredsel_wrapper"},
		classnames: {}
	}, $.fn.carouFredSel.pageAnchorBuilder = function (a) {
		return '<a href="#"><span>' + a + "</span></a>"
	}, $.fn.carouFredSel.progressbarUpdater = function (a) {
		$(this).css("width", a + "%")
	}, $.fn.carouFredSel.cookie = {
		get: function (a) {
			a += "=";
			for (var b = document.cookie.split(";"), c = 0, d = b.length; d > c; c++) {
				for (var e = b[c]; " " == e.charAt(0);)e = e.slice(1);
				if (0 == e.indexOf(a))return e.slice(a.length)
			}
			return 0
		}, set: function (a, b, c) {
			var d = "";
			if (c) {
				var e = new Date;
				e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), d = "; expires=" + e.toGMTString()
			}
			document.cookie = a + "=" + b + d + "; path=/"
		}, remove: function (a) {
			$.fn.carouFredSel.cookie.set(a, "", -1)
		}
	}, $.extend($.easing, {
		quadratic: function (a) {
			var b = a * a;
			return a * (-b * a + 4 * b - 6 * a + 4)
		}, cubic: function (a) {
			return a * (4 * a * a - 9 * a + 6)
		}, elastic: function (a) {
			var b = a * a;
			return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15)
		}
	}))
})(jQuery);
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'data-gal';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));
/* Custome Js */

jQuery(function($) {
	"use strict";
	
    $('#offcanvas_toggler').on('click', function(event) {
        event.preventDefault();
        $('body').addClass('offcanvas');
		$('.offcanvas_menu').addClass('bodycanvas');
    });
    $('.close_offcanvas, .offcanvas_overlay').on('click', function(event) {
        event.preventDefault();
        $('body').removeClass('offcanvas');
		$('.offcanvas_menu').removeClass('bodycanvas');
    });
	
	/* Brand Slider */
	$("#brand_slider .slider-items").owlCarousel({
		items: 5, //10 items above 1000px browser width
		itemsDesktop: [1024, 4], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
		itemsTablet: [640, 2], //2 items between 600 and 0;
		itemsMobile: [360, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: false,
		autoPlay: 6000
	});
	
	/* Brand Slider Design 3 */
	$("#brand_slider_d3 .slider-items").owlCarousel({
		items: 4, //10 items above 1000px browser width
		itemsDesktop: [1024, 4], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
		itemsTablet: [640, 2], //2 items between 600 and 0;
		itemsMobile: [360, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: false,
		autoPlay: 6000
	});
	
	/* Sticky */
	$(window).scroll(function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.mainnav').addClass("sticky");			
        } else {
            jQuery('.mainnav').removeClass("sticky");
        }
    });
	
	/* Testimonials Slider */
	$("#testimonials_slider .slider-items").owlCarousel({
		items: 1, //10 items above 1000px browser width
		itemsDesktop: [1024, 1], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 1], // 3 items betweem 900px and 601px
		itemsTablet: [640, 1], //2 items between 600 and 0;
		itemsMobile: [480, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: true,
		autoPlay: 6000
	});
	
	/* Team Slider */
	$("#team_slider .slider-items").owlCarousel({
		items: 3, //10 items above 1000px browser width
		itemsDesktop: [1024, 3], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 2], // 3 items betweem 900px and 601px
		itemsTablet: [640, 1], //2 items between 600 and 0;
		itemsMobile: [480, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: true,
		autoPlay: 6000
	});
	
	/* Team Slider Design 2 */
	$("#team_slider_d2 .slider-items").owlCarousel({
		items: 1, //10 items above 1000px browser width
		itemsDesktop: [1024, 1], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 1], // 3 items betweem 900px and 601px
		itemsTablet: [640, 1], //2 items between 600 and 0;
		itemsMobile: [480, 1],
		navigation: false,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: false,
		autoPlay: 6000
	});
	
	/* Screenshot Slider */
	$("#screenshot_slider .slider-items").owlCarousel({
		items: 4, //10 items above 1000px browser width
		itemsDesktop: [1024, 3], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 2], // 3 items betweem 900px and 601px
		itemsTablet: [640, 1], //2 items between 600 and 0;
		itemsMobile: [480, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: true,
		autoPlay: 6000
	});
	
	/* Screenshot Slider Design 3 */
	$("#screenshot_slider_d3 .slider-items").owlCarousel({
		items: 3, //10 items above 1000px browser width
		itemsDesktop: [1024, 3], //5 items between 1024px and 901px
		itemsDesktopSmall: [900, 2], // 3 items betweem 900px and 601px
		itemsTablet: [640, 1], //2 items between 600 and 0;
		itemsMobile: [480, 1],
		navigation: true,
		navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		slideSpeed: 500,
		pagination: true,
		autoPlay: 6000
	});
	
	/* Fancybox */
	jQuery('.fancybox-media').fancybox({
		helpers : {
			media : {},
			overlay : {
				speedOut : 0,
				locked: false
			}
		}, // helpers
		beforeShow : function() {
			this.title = (this.title ? '' + this.title + '' : '') + 'Image ' + (this.index + 1) + ' of ' + this.group.length;
		}
	});
	
	/* Navigation */
	$('.main_navigation li a, .offcanvas_menu li a').click(function(e){
		"use strict"; 
		if ( $(this).hasClass('h_menu') ) {
			e.preventDefault();
			var $this = $($(this).attr('href'));
			$('html,body').animate({
			'scrollTop': $this.offset().top+'px'
		}, 1000);
			return false;
		}
	});
	
	/* Text Logo */
	$('.text_logo').click(function(e){
		"use strict"; 
		if ( $(this).hasClass('text_logo') ) {
		  e.preventDefault();
		  var $this = $($(this).attr('href'));
		  $('html,body').animate({
			'scrollTop': $this.offset().top+'px'
		  }, 1000);	//easeInOutCirc
		  return false;
		}
    });
	
	/* UItoTop */
    (function(jQuery) {
        jQuery.fn.UItoTop = function(options) {
            var defaults = {
                text: '',
                min: 200,
                inDelay: 600,
                outDelay: 400,
                containerID: 'toTop',
                containerHoverID: 'toTopHover',
                scrollSpeed: 1200,
                easingType: 'linear'
            };

            var settings = jQuery.extend(defaults, options);
            var containerIDhash = '#' + settings.containerID;
            var containerHoverIDHash = '#' + settings.containerHoverID;
            jQuery('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');
            jQuery(containerIDhash).hide().click(function() {
                    jQuery('html, body').animate({
                        scrollTop: 0
                    }, settings.scrollSpeed, settings.easingType);
                    jQuery('#' + settings.containerHoverID, this).stop().animate({
                        'opacity': 0
                    }, settings.inDelay, settings.easingType);
                    return false;
                })
                .prepend('<span id="' + settings.containerHoverID + '"></span>')
                .hover(function() {
                    jQuery(containerHoverIDHash, this).stop().animate({
                        'opacity': 1
                    }, 600, 'linear');
                }, function() {
                    jQuery(containerHoverIDHash, this).stop().animate({
                        'opacity': 0
                    }, 700, 'linear');
                });


            jQuery(window).scroll(function() {
                var sd = $(window).scrollTop();
                if (typeof document.body.style.maxHeight === "undefined") {
                    jQuery(containerIDhash).css({
                        'position': 'absolute',
                        'top': $(window).scrollTop() + $(window).height() - 50
                    });
                }
                if (sd > settings.min)
                    jQuery(containerIDhash).fadeIn(settings.inDelay);
                else
                    jQuery(containerIDhash).fadeOut(settings.Outdelay);
            });

        };
    })(jQuery);
	
	/* Input Form */
	$('#full_name, #d2_full_name').blur(function(){
		var test = $('#full_name, #d2_full_name').val();
		if(test == '' || test == null){
			$('#full_name, #d2_full_name').val('Full Name');
		}
	});
	$('#comp_name, #d2_comp_name').blur(function(){
		var test = $('#comp_name, #d2_comp_name').val();
		if(test == '' || test == null){
			$('#comp_name, #d2_comp_name').val('Company Name');
		}
	});
	$('#email, #d2_email, d3_email').blur(function(){
		var test = $('#email, #d2_email, d3_email').val();
		if(test == '' || test == null){
			$('#email, #d2_email, d3_email').val('E-mail Address');
		}
	});
	
});
if (typeof Object.create !== "function") {
	"use strict";
    Object.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t
    }
}(function(e, t, n, r) {
	"use strict";
    var i = {
        init: function(t, n) {
            var r = this;
            r.$elem = e(n);
            r.options = e.extend({}, e.fn.owlCarousel.options, r.$elem.data(), t);
            r.userOptions = t;
            r.loadContent()
        },
        loadContent: function() {
            var t = this;
            if (typeof t.options.beforeInit === "function") {
                t.options.beforeInit.apply(this, [t.$elem])
            }
            if (typeof t.options.jsonPath === "string") {
                var n = t.options.jsonPath;

                //function r(e) {
                    //if (typeof t.options.jsonSuccess === "function") {
                       // t.options.jsonSuccess.apply(this, [e])
                    //} else {
                        //var n = "";
                        //for (var r in e["owl"]) {
                           // n += e["owl"][r]["item"]
                        //}
                        //t.$elem.html(n)
                    //}
                   // t.logIn()
                //}
                //e.getJSON(n, r)
            } else {
                t.logIn()
            }
        },
        logIn: function(e) {
            var t = this;
            t.$elem.data("owl-originalStyles", t.$elem.attr("style")).data("owl-originalClasses", t.$elem.attr("class"));
            t.$elem.css({
                opacity: 0
            });
            t.orignalItems = t.options.items;
            t.checkBrowser();
            t.wrapperWidth = 0;
            t.checkVisible;
            t.setVars()
        },
        setVars: function() {
            var e = this;
            if (e.$elem.children().length === 0) {
                return false
            }
            e.baseClass();
            e.eventTypes();
            e.$userItems = e.$elem.children();
            e.itemsAmount = e.$userItems.length;
            e.wrapItems();
            e.$owlItems = e.$elem.find(".owl-item");
            e.$owlWrapper = e.$elem.find(".owl-wrapper");
            e.playDirection = "next";
            e.prevItem = 0;
            e.prevArr = [0];
            e.currentItem = 0;
            e.customEvents();
            e.onStartup()
        },
        onStartup: function() {
            var e = this;
            e.updateItems();
            e.calculateAll();
            e.buildControls();
            e.updateControls();
            e.response();
            e.moveEvents();
            e.stopOnHover();
            e.owlStatus();
            if (e.options.transitionStyle !== false) {
                e.transitionTypes(e.options.transitionStyle)
            }
            if (e.options.autoPlay === true) {
                e.options.autoPlay = 5e3
            }
            e.play();
            e.$elem.find(".owl-wrapper").css("display", "block");
            if (!e.$elem.is(":visible")) {
                e.watchVisibility()
            } else {
                e.$elem.css("opacity", 1)
            }
            e.onstartup = false;
            e.eachMoveUpdate();
            if (typeof e.options.afterInit === "function") {
                e.options.afterInit.apply(this, [e.$elem])
            }
        },
        eachMoveUpdate: function() {
            var e = this;
            if (e.options.lazyLoad === true) {
                e.lazyLoad()
            }
            if (e.options.autoHeight === true) {
                e.autoHeight()
            }
            e.onVisibleItems();
            if (typeof e.options.afterAction === "function") {
                e.options.afterAction.apply(this, [e.$elem])
            }
        },
        updateVars: function() {
            var e = this;
            if (typeof e.options.beforeUpdate === "function") {
                e.options.beforeUpdate.apply(this, [e.$elem])
            }
            e.watchVisibility();
            e.updateItems();
            e.calculateAll();
            e.updatePosition();
            e.updateControls();
            e.eachMoveUpdate();
            if (typeof e.options.afterUpdate === "function") {
                e.options.afterUpdate.apply(this, [e.$elem])
            }
        },
        reload: function(e) {
            var t = this;
            setTimeout(function() {
                t.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var e = this;
            if (e.$elem.is(":visible") === false) {
                e.$elem.css({
                    opacity: 0
                });
                clearInterval(e.autoPlayInterval);
                clearInterval(e.checkVisible)
            } else {
                return false
            }
            e.checkVisible = setInterval(function() {
                if (e.$elem.is(":visible")) {
                    e.reload();
                    e.$elem.animate({
                        opacity: 1
                    }, 200);
                    clearInterval(e.checkVisible)
                }
            }, 500)
        },
        wrapItems: function() {
            var e = this;
            e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            e.wrapperOuter = e.$elem.find(".owl-wrapper-outer");
            e.$elem.css("display", "block")
        },
        baseClass: function() {
            var e = this;
            var t = e.$elem.hasClass(e.options.baseClass);
            var n = e.$elem.hasClass(e.options.theme);
            if (!t) {
                e.$elem.addClass(e.options.baseClass)
            }
            if (!n) {
                e.$elem.addClass(e.options.theme)
            }
        },
        updateItems: function() {
            var t = this;
            if (t.options.responsive === false) {
                return false
            }
            if (t.options.singleItem === true) {
                t.options.items = t.orignalItems = 1;
                t.options.itemsCustom = false;
                t.options.itemsDesktop = false;
                t.options.itemsDesktopSmall = false;
                t.options.itemsTablet = false;
                t.options.itemsTabletSmall = false;
                t.options.itemsMobile = false;
                return false
            }
            var n = e(t.options.responsiveBaseWidth).width();
            if (n > (t.options.itemsDesktop[0] || t.orignalItems)) {
                t.options.items = t.orignalItems
            }
            if (typeof t.options.itemsCustom !== "undefined" && t.options.itemsCustom !== false) {
                t.options.itemsCustom.sort(function(e, t) {
                    return e[0] - t[0]
                });
                for (var r in t.options.itemsCustom) {
                    if (typeof t.options.itemsCustom[r] !== "undefined" && t.options.itemsCustom[r][0] <= n) {
                        t.options.items = t.options.itemsCustom[r][1]
                    }
                }
            } else {
                if (n <= t.options.itemsDesktop[0] && t.options.itemsDesktop !== false) {
                    t.options.items = t.options.itemsDesktop[1]
                }
                if (n <= t.options.itemsDesktopSmall[0] && t.options.itemsDesktopSmall !== false) {
                    t.options.items = t.options.itemsDesktopSmall[1]
                }
                if (n <= t.options.itemsTablet[0] && t.options.itemsTablet !== false) {
                    t.options.items = t.options.itemsTablet[1]
                }
                if (n <= t.options.itemsTabletSmall[0] && t.options.itemsTabletSmall !== false) {
                    t.options.items = t.options.itemsTabletSmall[1]
                }
                if (n <= t.options.itemsMobile[0] && t.options.itemsMobile !== false) {
                    t.options.items = t.options.itemsMobile[1]
                }
            }
            if (t.options.items > t.itemsAmount && t.options.itemsScaleUp === true) {
                t.options.items = t.itemsAmount
            }
        },
        response: function() {
            var n = this,
                r;
            if (n.options.responsive !== true) {
                return false
            }
            var i = e(t).width();
            n.resizer = function() {
                if (e(t).width() !== i) {
                    if (n.options.autoPlay !== false) {
                        clearInterval(n.autoPlayInterval)
                    }
                    clearTimeout(r);
                    r = setTimeout(function() {
                        i = e(t).width();
                        n.updateVars()
                    }, n.options.responsiveRefreshRate)
                }
            };
            e(t).resize(n.resizer)
        },
        updatePosition: function() {
            var e = this;
            e.jumpTo(e.currentItem);
            if (e.options.autoPlay !== false) {
                e.checkAp()
            }
        },
        appendItemsSizes: function() {
            var t = this;
            var n = 0;
            var r = t.itemsAmount - t.options.items;
            t.$owlItems.each(function(i) {
                var s = e(this);
                s.css({
                    width: t.itemWidth
                }).data("owl-item", Number(i));
                if (i % t.options.items === 0 || i === r) {
                    if (!(i > r)) {
                        n += 1
                    }
                }
                s.data("owl-roundPages", n)
            })
        },
        appendWrapperSizes: function() {
            var e = this;
            var t = 0;
            var t = e.$owlItems.length * e.itemWidth;
            e.$owlWrapper.css({
                width: t * 2,
                left: 0
            });
            e.appendItemsSizes()
        },
        calculateAll: function() {
            var e = this;
            e.calculateWidth();
            e.appendWrapperSizes();
            e.loops();
            e.max()
        },
        calculateWidth: function() {
            var e = this;
            e.itemWidth = Math.round(e.$elem.width() / e.options.items)
        },
        max: function() {
            var e = this;
            var t = (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth) * -1;
            if (e.options.items > e.itemsAmount) {
                e.maximumItem = 0;
                t = 0;
                e.maximumPixels = 0
            } else {
                e.maximumItem = e.itemsAmount - e.options.items;
                e.maximumPixels = t
            }
            return t
        },
        min: function() {
            return 0
        },
        loops: function() {
            var t = this;
            t.positionsInArray = [0];
            t.pagesInArray = [];
            var n = 0;
            var r = 0;
            for (var i = 0; i < t.itemsAmount; i++) {
                r += t.itemWidth;
                t.positionsInArray.push(-r);
                if (t.options.scrollPerPage === true) {
                    var s = e(t.$owlItems[i]);
                    var o = s.data("owl-roundPages");
                    if (o !== n) {
                        t.pagesInArray[n] = t.positionsInArray[i];
                        n = o
                    }
                }
            }
        },
        buildControls: function() {
            var t = this;
            if (t.options.navigation === true || t.options.pagination === true) {
                t.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !t.browser.isTouch).appendTo(t.$elem)
            }
            if (t.options.pagination === true) {
                t.buildPagination()
            }
            if (t.options.navigation === true) {
                t.buildButtons()
            }
        },
        buildButtons: function() {
            var t = this;
            var n = e('<div class="owl-buttons"/>');
            t.owlControls.append(n);
            t.buttonPrev = e("<div/>", {
                "class": "owl-prev",
                html: t.options.navigationText[0] || ""
            });
            t.buttonNext = e("<div/>", {
                "class": "owl-next",
                html: t.options.navigationText[1] || ""
            });
            n.append(t.buttonPrev).append(t.buttonNext);
            n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) {
                e.preventDefault()
            });
            n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(n) {
                n.preventDefault();
                if (e(this).hasClass("owl-next")) {
                    t.next()
                } else {
                    t.prev()
                }
            })
        },
        buildPagination: function() {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>');
            t.owlControls.append(t.paginationWrapper);
            t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(n) {
                n.preventDefault();
                if (Number(e(this).data("owl-page")) !== t.currentItem) {
                    t.goTo(Number(e(this).data("owl-page")), true)
                }
            })
        },
        updatePagination: function() {
            var t = this;
            if (t.options.pagination === false) {
                return false
            }
            t.paginationWrapper.html("");
            var n = 0;
            var r = t.itemsAmount - t.itemsAmount % t.options.items;
            for (var i = 0; i < t.itemsAmount; i++) {
                if (i % t.options.items === 0) {
                    n += 1;
                    if (r === i) {
                        var s = t.itemsAmount - t.options.items
                    }
                    var o = e("<div/>", {
                        "class": "owl-page"
                    });
                    var u = e("<span></span>", {
                        text: t.options.paginationNumbers === true ? n : "",
                        "class": t.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    o.append(u);
                    o.data("owl-page", r === i ? s : i);
                    o.data("owl-roundPages", n);
                    t.paginationWrapper.append(o)
                }
            }
            t.checkPagination()
        },
        checkPagination: function() {
            var t = this;
            if (t.options.pagination === false) {
                return false
            }
            t.paginationWrapper.find(".owl-page").each(function(n, r) {
                if (e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages")) {
                    t.paginationWrapper.find(".owl-page").removeClass("active");
                    e(this).addClass("active")
                }
            })
        },
        checkNavigation: function() {
            var e = this;
            if (e.options.navigation === false) {
                return false
            }
            if (e.options.rewindNav === false) {
                if (e.currentItem === 0 && e.maximumItem === 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem === 0 && e.maximumItem !== 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.removeClass("disabled")
                } else if (e.currentItem === e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem !== 0 && e.currentItem !== e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.removeClass("disabled")
                }
            }
        },
        updateControls: function() {
            var e = this;
            e.updatePagination();
            e.checkNavigation();
            if (e.owlControls) {
                if (e.options.items >= e.itemsAmount) {
                    e.owlControls.hide()
                } else {
                    e.owlControls.show()
                }
            }
        },
        destroyControls: function() {
            var e = this;
            if (e.owlControls) {
                e.owlControls.remove()
            }
        },
        next: function(e) {
            var t = this;
            if (t.isTransition) {
                return false
            }
            t.currentItem += t.options.scrollPerPage === true ? t.options.items : 1;
            if (t.currentItem > t.maximumItem + (t.options.scrollPerPage == true ? t.options.items - 1 : 0)) {
                if (t.options.rewindNav === true) {
                    t.currentItem = 0;
                    e = "rewind"
                } else {
                    t.currentItem = t.maximumItem;
                    return false
                }
            }
            t.goTo(t.currentItem, e)
        },
        prev: function(e) {
            var t = this;
            if (t.isTransition) {
                return false
            }
            if (t.options.scrollPerPage === true && t.currentItem > 0 && t.currentItem < t.options.items) {
                t.currentItem = 0
            } else {
                t.currentItem -= t.options.scrollPerPage === true ? t.options.items : 1
            }
            if (t.currentItem < 0) {
                if (t.options.rewindNav === true) {
                    t.currentItem = t.maximumItem;
                    e = "rewind"
                } else {
                    t.currentItem = 0;
                    return false
                }
            }
            t.goTo(t.currentItem, e)
        },
        goTo: function(e, t, n) {
            var r = this;
            if (r.isTransition) {
                return false
            }
            if (typeof r.options.beforeMove === "function") {
                r.options.beforeMove.apply(this, [r.$elem])
            }
            if (e >= r.maximumItem) {
                e = r.maximumItem
            } else if (e <= 0) {
                e = 0
            }
            r.currentItem = r.owl.currentItem = e;
            if (r.options.transitionStyle !== false && n !== "drag" && r.options.items === 1 && r.browser.support3d === true) {
                r.swapSpeed(0);
                if (r.browser.support3d === true) {
                    r.transition3d(r.positionsInArray[e])
                } else {
                    r.css2slide(r.positionsInArray[e], 1)
                }
                r.afterGo();
                r.singleItemTransition();
                return false
            }
            var i = r.positionsInArray[e];
            if (r.browser.support3d === true) {
                r.isCss3Finish = false;
                if (t === true) {
                    r.swapSpeed("paginationSpeed");
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.paginationSpeed)
                } else if (t === "rewind") {
                    r.swapSpeed(r.options.rewindSpeed);
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.rewindSpeed)
                } else {
                    r.swapSpeed("slideSpeed");
                    setTimeout(function() {
                        r.isCss3Finish = true
                    }, r.options.slideSpeed)
                }
                r.transition3d(i)
            } else {
                if (t === true) {
                    r.css2slide(i, r.options.paginationSpeed)
                } else if (t === "rewind") {
                    r.css2slide(i, r.options.rewindSpeed)
                } else {
                    r.css2slide(i, r.options.slideSpeed)
                }
            }
            r.afterGo()
        },
        jumpTo: function(e) {
            var t = this;
            if (typeof t.options.beforeMove === "function") {
                t.options.beforeMove.apply(this, [t.$elem])
            }
            if (e >= t.maximumItem || e === -1) {
                e = t.maximumItem
            } else if (e <= 0) {
                e = 0
            }
            t.swapSpeed(0);
            if (t.browser.support3d === true) {
                t.transition3d(t.positionsInArray[e])
            } else {
                t.css2slide(t.positionsInArray[e], 1)
            }
            t.currentItem = t.owl.currentItem = e;
            t.afterGo()
        },
        afterGo: function() {
            var e = this;
            e.prevArr.push(e.currentItem);
            e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2];
            e.prevArr.shift(0);
            if (e.prevItem !== e.currentItem) {
                e.checkPagination();
                e.checkNavigation();
                e.eachMoveUpdate();
                if (e.options.autoPlay !== false) {
                    e.checkAp()
                }
            }
            if (typeof e.options.afterMove === "function" && e.prevItem !== e.currentItem) {
                e.options.afterMove.apply(this, [e.$elem])
            }
        },
        stop: function() {
            var e = this;
            e.apStatus = "stop";
            clearInterval(e.autoPlayInterval)
        },
        checkAp: function() {
            var e = this;
            if (e.apStatus !== "stop") {
                e.play()
            }
        },
        play: function() {
            var e = this;
            e.apStatus = "play";
            if (e.options.autoPlay === false) {
                return false
            }
            clearInterval(e.autoPlayInterval);
            e.autoPlayInterval = setInterval(function() {
                e.next(true)
            }, e.options.autoPlay)
        },
        swapSpeed: function(e) {
            var t = this;
            if (e === "slideSpeed") {
                t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed))
            } else if (e === "paginationSpeed") {
                t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed))
            } else if (typeof e !== "string") {
                t.$owlWrapper.css(t.addCssSpeed(e))
            }
        },
        addCssSpeed: function(e) {
            var t = this;
            return {
                "-webkit-transition": "all " + e + "ms ease",
                "-moz-transition": "all " + e + "ms ease",
                "-o-transition": "all " + e + "ms ease",
                transition: "all " + e + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(e) {
            return {
                "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                transform: "translate3d(" + e + "px, 0px,0px)"
            }
        },
        transition3d: function(e) {
            var t = this;
            t.$owlWrapper.css(t.doTranslate(e))
        },
        css2move: function(e) {
            var t = this;
            t.$owlWrapper.css({
                left: e
            })
        },
        css2slide: function(e, t) {
            var n = this;
            n.isCssFinish = false;
            n.$owlWrapper.stop(true, true).animate({
                left: e
            }, {
                duration: t || n.options.slideSpeed,
                complete: function() {
                    n.isCssFinish = true
                }
            })
        },
        checkBrowser: function() {
            var e = this;
            var r = "translate3d(0px, 0px, 0px)",
                i = n.createElement("div");
            i.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r;
            var s = /translate3d\(0px, 0px, 0px\)/g,
                o = i.style.cssText.match(s),
                u = o !== null && o.length === 1;
            var a = "ontouchstart" in t || navigator.msMaxTouchPoints;
            e.browser = {
                support3d: u,
                isTouch: a
            }
        },
        moveEvents: function() {
            var e = this;
            if (e.options.mouseDrag !== false || e.options.touchDrag !== false) {
                e.gestures();
                e.disabledEvents()
            }
        },
        eventTypes: function() {
            var e = this;
            var t = ["s", "e", "x"];
            e.ev_types = {};
            if (e.options.mouseDrag === true && e.options.touchDrag === true) {
                t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"]
            } else if (e.options.mouseDrag === false && e.options.touchDrag === true) {
                t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"]
            } else if (e.options.mouseDrag === true && e.options.touchDrag === false) {
                t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]
            }
            e.ev_types["start"] = t[0];
            e.ev_types["move"] = t[1];
            e.ev_types["end"] = t[2]
        },
        disabledEvents: function() {
            var t = this;
            t.$elem.on("dragstart.owl", function(e) {
                e.preventDefault()
            });
            t.$elem.on("mousedown.disableTextSelect", function(t) {
                return e(t.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function o(e) {
                if (e.touches) {
                    return {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                } else {
                    if (e.pageX !== r) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        }
                    } else {
                        return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }
            }

            function u(t) {
                if (t === "on") {
                    e(n).on(i.ev_types["move"], f);
                    e(n).on(i.ev_types["end"], l)
                } else if (t === "off") {
                    e(n).off(i.ev_types["move"]);
                    e(n).off(i.ev_types["end"])
                }
            }

            function a(n) {
                var n = n.originalEvent || n || t.event;
                if (n.which === 3) {
                    return false
                }
                if (i.itemsAmount <= i.options.items) {
                    return
                }
                if (i.isCssFinish === false && !i.options.dragBeforeAnimFinish) {
                    return false
                }
                if (i.isCss3Finish === false && !i.options.dragBeforeAnimFinish) {
                    return false
                }
                if (i.options.autoPlay !== false) {
                    clearInterval(i.autoPlayInterval)
                }
                if (i.browser.isTouch !== true && !i.$owlWrapper.hasClass("grabbing")) {
                    i.$owlWrapper.addClass("grabbing")
                }
                i.newPosX = 0;
                i.newRelativeX = 0;
                e(this).css(i.removeTransition());
                var r = e(this).position();
                s.relativePos = r.left;
                s.offsetX = o(n).x - r.left;
                s.offsetY = o(n).y - r.top;
                u("on");
                s.sliding = false;
                s.targetElement = n.target || n.srcElement
            }

            function f(r) {
                var r = r.originalEvent || r || t.event;
                i.newPosX = o(r).x - s.offsetX;
                i.newPosY = o(r).y - s.offsetY;
                i.newRelativeX = i.newPosX - s.relativePos;
                if (typeof i.options.startDragging === "function" && s.dragging !== true && i.newRelativeX !== 0) {
                    s.dragging = true;
                    i.options.startDragging.apply(i, [i.$elem])
                }
                if (i.newRelativeX > 8 || i.newRelativeX < -8 && i.browser.isTouch === true) {
                    r.preventDefault ? r.preventDefault() : r.returnValue = false;
                    s.sliding = true
                }
                if ((i.newPosY > 10 || i.newPosY < -10) && s.sliding === false) {
                    e(n).off("touchmove.owl")
                }
                var u = function() {
                    return i.newRelativeX / 5
                };
                var a = function() {
                    return i.maximumPixels + i.newRelativeX / 5
                };
                i.newPosX = Math.max(Math.min(i.newPosX, u()), a());
                if (i.browser.support3d === true) {
                    i.transition3d(i.newPosX)
                } else {
                    i.css2move(i.newPosX)
                }
            }

            function l(n) {
                var n = n.originalEvent || n || t.event;
                //n.target = n.target || n.srcElement;
                s.dragging = false;
                if (i.browser.isTouch !== true) {
                    i.$owlWrapper.removeClass("grabbing")
                }
                if (i.newRelativeX < 0) {
                    i.dragDirection = i.owl.dragDirection = "left"
                } else {
                    i.dragDirection = i.owl.dragDirection = "right"
                }
                if (i.newRelativeX !== 0) {
                    var r = i.getNewPosition();
                    i.goTo(r, false, "drag");
                    if (s.targetElement === n.target && i.browser.isTouch !== true) {
                        e(n.target).on("click.disable", function(t) {
                            t.stopImmediatePropagation();
                            t.stopPropagation();
                            t.preventDefault();
                            e(n.target).off("click.disable")
                        });
                        var o = e._data(n.target, "events")["click"];
                        var a = o.pop();
                        o.splice(0, 0, a)
                    }
                }
                u("off")
            }
            var i = this;
            var s = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            i.isCssFinish = true;
            i.$elem.on(i.ev_types["start"], ".owl-wrapper", a)
        },
        getNewPosition: function() {
            var e = this,
                t;
            t = e.closestItem();
            if (t > e.maximumItem) {
                e.currentItem = e.maximumItem;
                t = e.maximumItem
            } else if (e.newPosX >= 0) {
                t = 0;
                e.currentItem = 0
            }
            return t
        },
        closestItem: function() {
            var t = this,
                n = t.options.scrollPerPage === true ? t.pagesInArray : t.positionsInArray,
                r = t.newPosX,
                i = null;
            e.each(n, function(s, o) {
                if (r - t.itemWidth / 20 > n[s + 1] && r - t.itemWidth / 20 < o && t.moveDirection() === "left") {
                    i = o;
                    if (t.options.scrollPerPage === true) {
                        t.currentItem = e.inArray(i, t.positionsInArray)
                    } else {
                        t.currentItem = s
                    }
                } else if (r + t.itemWidth / 20 < o && r + t.itemWidth / 20 > (n[s + 1] || n[s] - t.itemWidth) && t.moveDirection() === "right") {
                    if (t.options.scrollPerPage === true) {
                        i = n[s + 1] || n[n.length - 1];
                        t.currentItem = e.inArray(i, t.positionsInArray)
                    } else {
                        i = n[s + 1];
                        t.currentItem = s + 1
                    }
                }
            });
            return t.currentItem
        },
        moveDirection: function() {
            var e = this,
                t;
            if (e.newRelativeX < 0) {
                t = "right";
                e.playDirection = "next"
            } else {
                t = "left";
                e.playDirection = "prev"
            }
            return t
        },
        customEvents: function() {
            var e = this;
            e.$elem.on("owl.next", function() {
                e.next()
            });
            e.$elem.on("owl.prev", function() {
                e.prev()
            });
            e.$elem.on("owl.play", function(t, n) {
                e.options.autoPlay = n;
                e.play();
                e.hoverStatus = "play"
            });
            e.$elem.on("owl.stop", function() {
                e.stop();
                e.hoverStatus = "stop"
            });
            e.$elem.on("owl.goTo", function(t, n) {
                e.goTo(n)
            });
            e.$elem.on("owl.jumpTo", function(t, n) {
                e.jumpTo(n)
            })
        },
        stopOnHover: function() {
            var e = this;
            if (e.options.stopOnHover === true && e.browser.isTouch !== true && e.options.autoPlay !== false) {
                e.$elem.on("mouseover", function() {
                    e.stop()
                });
                e.$elem.on("mouseout", function() {
                    if (e.hoverStatus !== "stop") {
                        e.play()
                    }
                })
            }
        },
        lazyLoad: function() {
            var t = this;
            if (t.options.lazyLoad === false) {
                return false
            }
            for (var n = 0; n < t.itemsAmount; n++) {
                var i = e(t.$owlItems[n]);
                if (i.data("owl-loaded") === "loaded") {
                    continue
                }
                var s = i.data("owl-item"),
                    o = i.find(".lazyOwl"),
                    u;
                if (typeof o.data("src") !== "string") {
                    i.data("owl-loaded", "loaded");
                    continue
                }
                if (i.data("owl-loaded") === r) {
                    o.hide();
                    i.addClass("loading").data("owl-loaded", "checked")
                }
                if (t.options.lazyFollow === true) {
                    u = s >= t.currentItem
                } else {
                    u = true
                }
                if (u && s < t.currentItem + t.options.items && o.length) {
                    t.lazyPreload(i, o)
                }
            }
        },
        lazyPreload: function(e, t) {
            function s() {
                r += 1;
                if (n.completeImg(t.get(0)) || i === true) {
                    o()
                } else if (r <= 100) {
                    setTimeout(s, 100)
                } else {
                    o()
                }
            }

            function o() {
                e.data("owl-loaded", "loaded").removeClass("loading");
                t.removeAttr("data-src");
                n.options.lazyEffect === "fade" ? t.fadeIn(400) : t.show();
                if (typeof n.options.afterLazyLoad === "function") {
                    n.options.afterLazyLoad.apply(this, [n.$elem])
                }
            }
            var n = this,
                r = 0;
            if (t.prop("tagName") === "DIV") {
                t.css("background-image", "url(" + t.data("src") + ")");
                var i = true
            } else {
                t[0].src = t.data("src")
            }
            s()
        },
        autoHeight: function() {
            function s() {
                i += 1;
                if (t.completeImg(n.get(0))) {
                    o()
                } else if (i <= 100) {
                    setTimeout(s, 100)
                } else {
                    t.wrapperOuter.css("height", "")
                }
            }

            function o() {
                var n = e(t.$owlItems[t.currentItem]).height();
                t.wrapperOuter.css("height", n + "px");
                if (!t.wrapperOuter.hasClass("autoHeight")) {
                    setTimeout(function() {
                        t.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }
            }
            var t = this;
            var n = e(t.$owlItems[t.currentItem]).find("img");
            if (n.get(0) !== r) {
                var i = 0;
                s()
            } else {
                o()
            }
        },
        completeImg: function(e) {
            if (!e.complete) {
                return false
            }
            if (typeof e.naturalWidth !== "undefined" && e.naturalWidth == 0) {
                return false
            }
            return true
        },
        onVisibleItems: function() {
            var t = this;
            if (t.options.addClassActive === true) {
                t.$owlItems.removeClass("active")
            }
            t.visibleItems = [];
            for (var n = t.currentItem; n < t.currentItem + t.options.items; n++) {
                t.visibleItems.push(n);
                if (t.options.addClassActive === true) {
                    e(t.$owlItems[n]).addClass("active")
                }
            }
            t.owl.visibleItems = t.visibleItems
        },
        transitionTypes: function(e) {
            var t = this;
            t.outClass = "owl-" + e + "-out";
            t.inClass = "owl-" + e + "-in"
        },
        singleItemTransition: function() {
            function u(e, t) {
                return {
                    position: "relative",
                    left: e + "px"
                }
            }
            var e = this;
            e.isTransition = true;
            var t = e.outClass,
                n = e.inClass,
                r = e.$owlItems.eq(e.currentItem),
                i = e.$owlItems.eq(e.prevItem),
                s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                o = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
            e.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": o + "px",
                "-moz-perspective-origin": o + "px",
                "perspective-origin": o + "px"
            });
            var a = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            i.css(u(s, 10)).addClass(t).on(a, function() {
                e.endPrev = true;
                i.off(a);
                e.clearTransStyle(i, t)
            });
            r.addClass(n).on(a, function() {
                e.endCurrent = true;
                r.off(a);
                e.clearTransStyle(r, n)
            })
        },
        clearTransStyle: function(e, t) {
            var n = this;
            e.css({
                position: "",
                left: ""
            }).removeClass(t);
            if (n.endPrev && n.endCurrent) {
                n.$owlWrapper.removeClass("owl-origin");
                n.endPrev = false;
                n.endCurrent = false;
                n.isTransition = false
            }
        },
        owlStatus: function() {
            var e = this;
            e.owl = {
                userOptions: e.userOptions,
                baseElement: e.$elem,
                userItems: e.$userItems,
                owlItems: e.$owlItems,
                currentItem: e.currentItem,
                prevItem: e.prevItem,
                visibleItems: e.visibleItems,
                isTouch: e.browser.isTouch,
                browser: e.browser,
                dragDirection: e.dragDirection
            }
        },
        clearEvents: function() {
            var r = this;
            r.$elem.off(".owl owl mousedown.disableTextSelect");
            e(n).off(".owl owl");
            e(t).off("resize", r.resizer)
        },
        unWrap: function() {
            var e = this;
            if (e.$elem.children().length !== 0) {
                e.$owlWrapper.unwrap();
                e.$userItems.unwrap().unwrap();
                if (e.owlControls) {
                    e.owlControls.remove()
                }
            }
            e.clearEvents();
            e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            var e = this;
            e.stop();
            clearInterval(e.checkVisible);
            e.unWrap();
            e.$elem.removeData()
        },
        reinit: function(t) {
            var n = this;
            var r = e.extend({}, n.userOptions, t);
            n.unWrap();
            n.init(r, n.$elem)
        },
        addItem: function(e, t) {
            var n = this,
                i;
            if (!e) {
                return false
            }
            if (n.$elem.children().length === 0) {
                n.$elem.append(e);
                n.setVars();
                return false
            }
            n.unWrap();
            if (t === r || t === -1) {
                i = -1
            } else {
                i = t
            }
            if (i >= n.$userItems.length || i === -1) {
                n.$userItems.eq(-1).after(e)
            } else {
                n.$userItems.eq(i).before(e)
            }
            n.setVars()
        },
        removeItem: function(e) {
            var t = this,
                n;
            if (t.$elem.children().length === 0) {
                return false
            }
            if (e === r || e === -1) {
                n = -1
            } else {
                n = e
            }
            t.unWrap();
            t.$userItems.eq(n).remove();
            t.setVars()
        }
    };
    e.fn.owlCarousel = function(t) {
        return this.each(function() {
            if (e(this).data("owl-init") === true) {
                return false
            }
            e(this).data("owl-init", true);
            var n = Object.create(i);
            n.init(t, this);
            e.data(this, "owlCarousel", n)
        })
    };
    e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: false,
        stopOnHover: false,
        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,
        pagination: true,
        paginationNumbers: false,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",
        autoHeight: false,
        jsonPath: false,
        jsonSuccess: false,
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,
        addClassActive: false,
        transitionStyle: false,
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    }
})(jQuery, window, document)
;
/*!
 * jQuery Migrate - 1.2.1
 * https://github.com/jquery/jquery-migrate
 */

jQuery.globalEval(function(p, a, c, k, e, r) {
	"use strict";
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('B.16===2p 0&&(B.16=!0),9(e,t,n){9 r(n){D r=t.17;i[n]||(i[n]=!0,e.1n.1K(n),r&&r.1L&&!e.16&&(r.1L("1o: "+n),e.1p&&r.1M&&r.1M()))}9 a(t,a,i,o){1q(1N.1O)2q{z 1N.1O(t,a,{2r:!0,2s:!0,18:9(){z r(o),i},19:9(e){r(o),i=e}}),n}2t(s){}e.2u=!0,t[a]=i}D i={};e.1n=[],!e.16&&t.17&&t.17.1P&&t.17.1P("1o: 2v F 2w"),e.1p===n&&(e.1p=!0),e.2x=9(){i={},e.1n.Z=0},"2y"===K.2z&&r("B F 2A 1Q 1r 2B 2C");D o=e("<13/>",{1R:1}).U("1R")&&e.1s,s=e.U,u=e.V.L&&e.V.L.18||9(){z 10},c=e.V.L&&e.V.L.19||9(){z n},l=/^(?:13|1a)jQuery/i,d=/^[2D]jQuery/,p=/^(?:2E|2F|2G|1S|2H|2I|2J|2K|2L|2M|2N|2O|2P|2Q|1T)jQuery/i,f=/^(?:1S|1T)jQuery/i;a(e,"1s",o||{},"B.1s F I"),e.U=9(t,a,i,u){D c=a.11(),g=t&&t.1U;z u&&(4>s.Z&&r("B.q.U( 1b, 2R ) F I"),t&&!d.O(g)&&(o?a 1c o:e.1t(e.q[a])))?e(t)[a](i):("1d"===a&&i!==n&&l.O(t.1e)&&t.1u&&r("2S\'t 2T 2U \'1d\' 1v 2V 13 2W 1a 1c 2X 6/7/8"),!e.V[c]&&p.O(c)&&(e.V[c]={18:9(t,r){D a,i=e.2Y(t,r);z i===!0||"2Z"!=1w i&&(a=t.30(r))&&a.31!==!1?r.11():n},19:9(t,n,r){D a;z n===!1?e.32(t,r):(a=e.33[r]||r,a 1c t&&(t[a]=!0),t.34(r,r.11())),r}},f.O(c)&&r("B.q.U(\'"+c+"\') 35 1V 36 37 1v 38")),s.X(e,t,a,i))},e.V.L={18:9(e,t){D n=(e.1e||"").11();z"1a"===n?u.J(5,G):("13"!==n&&"1W"!==n&&r("B.q.U(\'L\') 1X 1Y 39 1Z"),t 1c e?e.L:10)},19:9(e,t){D a=(e.1e||"").11();z"1a"===a?c.J(5,G):("13"!==a&&"1W"!==a&&r("B.q.U(\'L\', 3a) 1X 1Y 3b 1Z"),e.L=t,n)}};D g,h,v=e.q.Y,m=e.1f,y=/^([^<]*)(<[\\w\\W]+>)([^>]*)jQuery/;e.q.Y=9(t,n,a){D i;z t&&"14"==1w t&&!e.3c(n)&&(i=y.12(e.3d(t)))&&i[0]&&("<"!==t.20(0)&&r("jQuery(21) 1x 3e 3f 22 1r \'<\' 23"),i[3]&&r("jQuery(21) 1x 24 3g 3h 3i F 3j"),"#"===i[0].20(0)&&(r("1x 14 3k 22 1r a \'#\' 23"),e.1g("1o: 3l 1y 14 (3m)")),n&&n.1h&&(n=n.1h),e.25)?v.X(5,e.25(i[2],n,!0),n,a):v.J(5,G)},e.q.Y.1i=e.q,e.1f=9(e){z e||10===e?m.J(5,G):(r("B.1f 3n a 3o 3p 14"),10)},e.26=9(e){e=e.11();D t=/(27)[ \\/]([\\w.]+)/.12(e)||/(1z)[ \\/]([\\w.]+)/.12(e)||/(3q)(?:.*1j|)[ \\/]([\\w.]+)/.12(e)||/(3r) ([\\w.]+)/.12(e)||0>e.3s("1Q")&&/(3t)(?:.*? 3u:([\\w.]+)|)/.12(e)||[];z{P:t[1]||"",1j:t[2]||"0"}},e.P||(g=e.26(3v.3w),h={},g.P&&(h[g.P]=!0,h.1j=g.1j),h.27?h.1z=!0:h.1z&&(h.3x=!0),e.P=h),a(e,"P",e.P,"B.P F I"),e.1k=9(){9 t(e,n){z 3y t.q.Y(e,n)}e.3z(!0,t,5),t.3A=5,t.q=t.1i=5(),t.q.3B=t,t.1k=5.1k,t.q.Y=9(r,a){z a&&a 28 e&&!(a 28 t)&&(a=t(a)),e.q.Y.X(5,r,a,n)},t.q.Y.1i=t.q;D n=t(K);z r("B.1k() F I"),t},e.3C({3D:{"24 3E":e.1f}});D b=e.q.1l;e.q.1l=9(t){D a,i,o=5[0];z!o||"1m"!==t||1!==G.Z||(a=e.1l(o,t),i=e.15(o,t),a!==n&&a!==i||i===n)?b.J(5,G):(r("3F 1v B.q.1l(\'1m\') F I"),i)};D j=/\\/(3G|3H)1A/i,w=e.q.1B||e.q.29;e.q.1B=9(){z r("B.q.1B() 3I 3J B.q.29()"),w.J(5,G)},e.1C||(e.1C=9(t,a,i,o){a=a||K,a=!a.1U&&a[0]||a,a=a.3K||a,r("B.1C() F I");D s,u,c,l,d=[];1q(e.2a(d,e.3L(t,a).3M),i)2b(c=9(e){z!e.1d||j.O(e.1d)?o?o.1K(e.1u?e.1u.3N(e):e):i.2c(e):n},s=0;10!=(u=d[s]);s++)e.1e(u,"1A")&&c(u)||(i.2c(u),u.2d!==n&&(l=e.3O(e.2a([],u.2d("1A")),c),d.2e.J(d,[s+1,0].3P(l)),s+=l.Z));z d});D Q=e.E.1D,x=e.E.1E,k=e.E.1F,N=e.q.1G,T=e.q.1H,M=e.q.1I,S="3Q|3R|3S|3T|3U|3V",C=3W("\\\\b(?:"+S+")\\\\b"),H=/(?:^|\\s)1J(\\.\\S+|)\\b/,A=9(t){z"14"!=1w t||e.E.2f.1J?t:(H.O(t)&&r("\'1J\' 3X-E F I, 1V \'2g 2h\'"),t&&t.3Y(H,"2g$1 2h$1"))};e.E.1b&&"2i"!==e.E.1b[0]&&e.E.1b.3Z("2i","40","41","42"),e.E.2j&&a(e.E,"2k",e.E.2j,"B.E.2k F 2l 2m I"),e.E.1D=9(e,t,n,a,i){e!==K&&C.O(t)&&r("43 1m 44 45 46 47 K: "+t),Q.X(5,e,A(t||""),n,a,i)},e.E.1E=9(e,t,n,r,a){x.X(5,e,A(t)||"",n,r,a)},e.q.1g=9(){D e=48.1i.49.X(G,0);z r("B.q.1g() F I"),e.2e(0,0,"1g"),G.Z?5.4a.J(5,e):(5.4b.J(5,e),5)},e.q.1G=9(t,n){1q(!e.1t(t)||!e.1t(n))z N.J(5,G);r("B.q.1G(2n, 2n...) F I");D a=G,i=t.R||e.R++,o=0,s=9(n){D r=(e.15(5,"2o"+t.R)||0)%o;z e.15(5,"2o"+t.R,r+1),n.4c(),a[r].J(5,G)||!1};2b(s.R=i;a.Z>o;)a[o++].R=i;z 5.4d(s)},e.q.1H=9(t,n,a){z r("B.q.1H() F I"),T?T.J(5,G):(e(5.1h).4e(t,5.1y,n,a),5)},e.q.1I=9(t,n){z r("B.q.1I() F I"),M?M.J(5,G):(e(5.1h).4f(t,5.1y||"**",n),5)},e.E.1F=9(e,t,n,a){z n||C.O(e)||r("4g 1m 4h 2l 2m I"),k.X(5,e,t,n||K,a)},e.4i(S.4j("|"),9(t,n){e.E.2f[n]={4k:9(){D t=5;z t!==K&&(e.E.1D(K,n+"."+e.R,9(){e.E.1F(n,10,t,!0)}),e.15(5,n,e.R++)),!1},4l:9(){z 5!==K&&e.E.1E(K,n+"."+e.15(5,n)),!1}}})}(B,4m);', 62, 271, '|||||this||||function|||||||||||||||||fn|||||||||return||jQuery||var|event|is|arguments||deprecated|apply|document|value|||test|browser||guid|||attr|attrHooks||call|init|length|null|toLowerCase|exec|input|string|_data|migrateMute|console|get|set|button|props|in|type|nodeName|parseJSON|error|context|prototype|version|sub|data|events|migrateWarnings|JQMIGRATE|migrateTrace|if|with|attrFn|isFunction|parentNode|of|typeof|HTML|selector|webkit|script|andSelf|clean|add|remove|trigger|toggle|live|die|hover|push|warn|trace|Object|defineProperty|log|compatible|size|checked|selected|nodeType|use|option|no|longer|properties|charAt|html|start|character|text|parseHTML|uaMatch|chrome|instanceof|addBack|merge|for|appendChild|getElementsByTagName|splice|special|mouseenter|mouseleave|attrChange|dispatch|handle|undocumented|and|handler|lastToggle|void|try|configurable|enumerable|catch|_definePropertyBroken|Logging|active|migrateReset|BackCompat|compatMode|not|Quirks|Mode|238|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|pass|Can|change|the|an|or|IE|prop|boolean|getAttributeNode|nodeValue|removeAttr|propFix|setAttribute|may|property|instead|attribute|gets|val|sets|isPlainObject|trim|strings|must|after|last|tag|ignored|cannot|Invalid|XSS|requires|valid|JSON|opera|msie|indexOf|mozilla|rv|navigator|userAgent|safari|new|extend|superclass|constructor|ajaxSetup|converters|json|Use|java|ecma|replaced|by|ownerDocument|buildFragment|childNodes|removeChild|grep|concat|ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess|RegExp|pseudo|replace|unshift|attrName|relatedNode|srcElement|AJAX|should|be|attached|to|Array|slice|bind|triggerHandler|preventDefault|click|on|off|Global|are|each|split|setup|teardown|window'.split('|'), 0, {}));

/*!
 * CSS Browser Selector - 0.4.0
 * http://rafael.adm.br/css_browser_selector
 */
"use strict";
function css_browser_selector(u) {
    var ua = u.toLowerCase(),
        is = function(t) {
            return ua.indexOf(t) > -1
        },
        g = 'gecko',
        w = 'webkit',
        s = 'safari',
        o = 'opera',
        m = 'mobile',
        h = document.documentElement,
        b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3.6') ? g + ' ff3 ff3_6' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? m + ' j2me' : is('iphone') ? m + ' iphone' : is('ipod') ? m + ' ipod' : is('ipad') ? m + ' ipad' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js'];
    c = b.join(' ');
    h.className += ' ' + c;
    return c;
};
css_browser_selector(navigator.userAgent);

/*!
 * jQuery.browser.mobile
 * http://detectmobilebrowser.com
 */
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

/*!
 * css3pie - 1.0.0
 * http://css3pie.com
 */
if(jQuery.browser.msie && parseInt(jQuery.browser.version,10) < 9){(function(){var doc = document;var f=window.PIE;if(!f){f=window.PIE={F:"-pie-",nb:"Pie",La:"pie_",Ac:{TD:1,TH:1},cc:{TABLE:1,THEAD:1,TBODY:1,TFOOT:1,TR:1,INPUT:1,TEXTAREA:1,SELECT:1,OPTION:1,IMG:1,HR:1},fc:{A:1,INPUT:1,TEXTAREA:1,SELECT:1,BUTTON:1},Gd:{submit:1,button:1,reset:1},aa:function(){}};try{doc.execCommand("BackgroundImageCache",false,true)}catch(aa){}for(var ba=4,Z=doc.createElement("div"),ca=Z.getElementsByTagName("i"),ga;Z.innerHTML="<!--[if gt IE "+ ++ba+"]><i></i><![endif]--\>",ca[0];);f.O=ba;if(ba===6)f.F=f.F.replace(/^-/,"");f.ja=doc.documentMode||f.O;Z.innerHTML='<v:shape adj="1"/>';ga=Z.firstChild;ga.style.behavior="url(#default#VML)";f.zc=typeof ga.adj==="object";(function(){var a,b=0,c={};f.p={Za:function(d){if(!a){a=doc.createDocumentFragment();a.namespaces.add("css3vml","urn:schemas-microsoft-com:vml")}return a.createElement("css3vml:"+d)},Ba:function(d){return d&&d._pieId||(d._pieId="_"+ ++b)},Eb:function(d){var e,g,j,i,h=arguments;e=1;for(g=h.length;e<g;e++){i=h[e];for(j in i)if(i.hasOwnProperty(j))d[j]=i[j]}return d},Rb:function(d,e,g){var j=c[d],i,h;if(j)Object.prototype.toString.call(j)==="[object Array]"?j.push([e,g]):e.call(g,j);else{h=c[d]=[[e,g]];i=new Image;i.onload=function(){j=c[d]={h:i.width,f:i.height};for(var k=0,n=h.length;k<n;k++)h[k][0].call(h[k][1],j);i.onload=null};i.src=d}}}})();f.Na={gc:function(a,b,c,d){function e(){k=j>=90&&j<270?b:0;n=j<180?c:0;m=b-k;p=c-n}function g(){for(;j<0;)j+=360;j%=360}var j=d.sa;d=d.zb;var i,h,k,n,m,p,r,t;if(d){d=d.coords(a,b,c);i=d.x;h=d.y}if(j){j=j.jd();g();e();if(!d){i=k;h=n}d=f.Na.tc(i,h,j,m,p);a=d[0];d=d[1]}else if(d){a=b-i;d=c-h}else{i=h=a=0;d=c}r=a-i;t=d-h;if(j===void 0){j=!r?t<0?90:270:!t?r<0?180:0:-Math.atan2(t,r)/Math.PI*180;g();e()}return{sa:j,xc:i,yc:h,td:a,ud:d,Wd:k,Xd:n,rd:m,sd:p,kd:r,ld:t,rc:f.Na.dc(i,h,a,d)}},tc:function(a,b,c,d,e){if(c===0||c===180)return[d,b];else if(c===90||c===270)return[a,e];else{c=Math.tan(-c*Math.PI/180);a=c*a-b;b=-1/c;d=b*d-e;e=b-c;return[(d-a)/e,(c*d-b*a)/e]}},dc:function(a,b,c,d){a=c-a;b=d-b;return Math.abs(a===0?b:b===0?a:Math.sqrt(a*a+b*b))}};f.ea=function(){this.Gb=[];this.oc={}};f.ea.prototype={ba:function(a){var b=f.p.Ba(a),c=this.oc,d=this.Gb;if(!(b in c)){c[b]=d.length;d.push(a)}},Ha:function(a){a=f.p.Ba(a);var b=this.oc;if(a&&a in b){delete this.Gb[b[a]];delete b[a]}},xa:function(){for(var a=this.Gb,b=a.length;b--;)a[b]&&a[b]()}};f.Oa=new f.ea;f.Oa.Rd=function(){var a=this,b;if(!a.Sd){b=doc.documentElement.currentStyle.getAttribute(f.F+"poll-interval")||250;(function c(){a.xa();setTimeout(c,b)})();a.Sd=1}};(function(){function a(){f.L.xa();window.detachEvent("onunload",a);window.PIE=null}f.L=new f.ea;window.attachEvent("onunload",a);f.L.ta=function(b,c,d){b.attachEvent(c,d);this.ba(function(){b.detachEvent(c,d)})}})();f.Qa=new f.ea;f.L.ta(window,"onresize",function(){f.Qa.xa()});(function(){function a(){f.mb.xa()}f.mb=new f.ea;f.L.ta(window,"onscroll",a);f.Qa.ba(a)})();(function(){function a(){c=f.kb.md()}function b(){if(c){for(var d=0,e=c.length;d<e;d++)f.attach(c[d]);c=0}}var c;if(f.ja<9){f.L.ta(window,"onbeforeprint",a);f.L.ta(window,"onafterprint",b)}})();f.lb=new f.ea;f.L.ta(doc,"onmouseup",function(){f.lb.xa()});f.he=function(){function a(h){this.Y=h}var b=doc.createElement("length-calc"),c=doc.body||doc.documentElement,d=b.style,e={},g=["mm","cm","in","pt","pc"],j=g.length,i={};d.position="absolute";d.top=d.left="-9999px";for(c.appendChild(b);j--;){d.width="100"+g[j];e[g[j]]=b.offsetWidth/100}c.removeChild(b);d.width="1em";a.prototype={Kb:/(px|em|ex|mm|cm|in|pt|pc|%)jQuery/,ic:function(){var h=this.Jd;if(h===void 0)h=this.Jd=parseFloat(this.Y);return h},yb:function(){var h=this.ae;if(!h)h=this.ae=(h=this.Y.match(this.Kb))&&h[0]||"px";return h},a:function(h,k){var n=this.ic(),m=this.yb();switch(m){case "px":return n;case "%":return n*(typeof k==="function"?k():k)/100;case "em":return n*this.xb(h);case "ex":return n*this.xb(h)/2;default:return n*e[m]}},xb:function(h){var k=h.currentStyle.fontSize,n,m;if(k.indexOf("px")>0)return parseFloat(k);else if(h.tagName in f.cc){m=this;n=h.parentNode;return f.n(k).a(n,function(){return m.xb(n)})}else{h.appendChild(b);k=b.offsetWidth;b.parentNode===h&&h.removeChild(b);return k}}};f.n=function(h){return i[h]||(i[h]=new a(h))};return a}();f.Ja=function(){function a(e){this.X=e}var b=f.n("50%"),c={top:1,center:1,bottom:1},d={left:1,center:1,right:1};a.prototype={zd:function(){if(!this.ac){var e=this.X,g=e.length,j=f.v,i=j.qa,h=f.n("0");i=i.na;h=["left",h,"top",h];if(g===1){e.push(new j.ob(i,"center"));g++}if(g===2){i&(e[0].k|e[1].k)&&e[0].d in c&&e[1].d in d&&e.push(e.shift());if(e[0].k&i)if(e[0].d==="center")h[1]=b;else h[0]=e[0].d;else if(e[0].W())h[1]=f.n(e[0].d);if(e[1].k&i)if(e[1].d==="center")h[3]=b;else h[2]=e[1].d;else if(e[1].W())h[3]=f.n(e[1].d)}this.ac=h}return this.ac},coords:function(e,g,j){var i=this.zd(),h=i[1].a(e,g);e=i[3].a(e,j);return{x:i[0]==="right"?g-h:h,y:i[2]==="bottom"?j-e:e}}};return a}();f.Ka=function(){function a(b,c){this.h=b;this.f=c}a.prototype={a:function(b,c,d,e,g){var j=this.h,i=this.f,h=c/d;e=e/g;if(j==="contain"){j=e>h?c:d*e;i=e>h?c/e:d}else if(j==="cover"){j=e<h?c:d*e;i=e<h?c/e:d}else if(j==="auto"){i=i==="auto"?g:i.a(b,d);j=i*e}else{j=j.a(b,c);i=i==="auto"?j/e:i.a(b,d)}return{h:j,f:i}}};a.Kc=new a("auto","auto");return a}();f.Ec=function(){function a(b){this.Y=b}a.prototype={Kb:/[a-z]+jQuery/i,yb:function(){return this.ad||(this.ad=this.Y.match(this.Kb)[0].toLowerCase())},jd:function(){var b=this.Vc,c;if(b===undefined){b=this.yb();c=parseFloat(this.Y,10);b=this.Vc=b==="deg"?c:b==="rad"?c/Math.PI*180:b==="grad"?c/400*360:b==="turn"?c*360:0}return b}};return a}();f.Jc=function(){function a(c){this.Y=c}var b={};a.Qd=/\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+|\d*\.\d+)\s*\)\s*/;a.Fb={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"0FF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000",blanchedalmond:"FFEBCD",blue:"00F",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"0FF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"F0F",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgreen:"90EE90",lightgrey:"D3D3D3",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"789",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"0F0",limegreen:"32CD32",linen:"FAF0E6",magenta:"F0F",maroon:"800000",mediumauqamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"688E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",red:"F00",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFF",whitesmoke:"F5F5F5",yellow:"FF0",yellowgreen:"9ACD32"};a.prototype={parse:function(){if(!this.Ua){var c=this.Y,d;if(d=c.match(a.Qd)){this.Ua="rgb("+d[1]+","+d[2]+","+d[3]+")";this.Yb=parseFloat(d[4])}else{if((d=c.toLowerCase())in a.Fb)c="#"+a.Fb[d];this.Ua=c;this.Yb=c==="transparent"?0:1}}},U:function(c){this.parse();return this.Ua==="currentColor"?c.currentStyle.color:this.Ua},fa:function(){this.parse();return this.Yb}};f.ha=function(c){return b[c]||(b[c]=new a(c))};return a}();f.v=function(){function a(c){this.$a=c;this.ch=0;this.X=[];this.Ga=0}var b=a.qa={Ia:1,Wb:2,z:4,Lc:8,Xb:16,na:32,K:64,oa:128,pa:256,Ra:512,Tc:1024,URL:2048};a.ob=function(c,d){this.k=c;this.d=d};a.ob.prototype={Ca:function(){return this.k&b.K||this.k&b.oa&&this.d==="0"},W:function(){return this.Ca()||this.k&b.Ra}};a.prototype={de:/\s/,Kd:/^[\+\-]?(\d*\.)?\d+/,url:/^url\(\s*("([^"]*)"|'([^']*)'|([!#jQuery%&*-~]*))\s*\)/i,nc:/^\-?[_a-z][\w-]*/i,Yd:/^("([^"]*)"|'([^']*)')/,Bd:/^#([\da-f]{6}|[\da-f]{3})/i,be:{px:b.K,em:b.K,ex:b.K,mm:b.K,cm:b.K,"in":b.K,pt:b.K,pc:b.K,deg:b.Ia,rad:b.Ia,grad:b.Ia},fd:{rgb:1,rgba:1,hsl:1,hsla:1},next:function(c){function d(p,r){p=new a.ob(p,r);if(!c){k.X.push(p);k.Ga++}return p}function e(){k.Ga++;return null}var g,j,i,h,k=this;if(this.Ga<this.X.length)return this.X[this.Ga++];for(;this.de.test(this.$a.charAt(this.ch));)this.ch++;if(this.ch>=this.$a.length)return e();j=this.ch;g=this.$a.substring(this.ch);i=g.charAt(0);switch(i){case "#":if(h=g.match(this.Bd)){this.ch+=h[0].length;return d(b.z,h[0])}break;case '"':case "'":if(h=g.match(this.Yd)){this.ch+=h[0].length;return d(b.Tc,h[2]||h[3]||"")}break;case "/":case ",":this.ch++;return d(b.pa,i);case "u":if(h=g.match(this.url)){this.ch+=h[0].length;return d(b.URL,h[2]||h[3]||h[4]||"")}}if(h=g.match(this.Kd)){i=h[0];this.ch+=i.length;if(g.charAt(i.length)==="%"){this.ch++;return d(b.Ra,i+"%")}if(h=g.substring(i.length).match(this.nc)){i+=h[0];this.ch+=h[0].length;return d(this.be[h[0].toLowerCase()]||b.Lc,i)}return d(b.oa,i)}if(h=g.match(this.nc)){i=h[0];this.ch+=i.length;if(i.toLowerCase()in f.Jc.Fb||i==="currentColor"||i==="transparent")return d(b.z,i);if(g.charAt(i.length)==="("){this.ch++;if(i.toLowerCase()in this.fd){g=function(p){return p&&p.k&b.oa};h=function(p){return p&&p.k&(b.oa|b.Ra)};var n=function(p,r){return p&&p.d===r},m=function(){return k.next(1)};if((i.charAt(0)==="r"?h(m()):g(m()))&&n(m(),",")&&h(m())&&n(m(),",")&&h(m())&&(i==="rgb"||i==="hsa"||n(m(),",")&&g(m()))&&n(m(),")"))return d(b.z,this.$a.substring(j,this.ch));return e()}return d(b.Xb,i)}return d(b.na,i)}this.ch++;return d(b.Wb,i)},D:function(){return this.X[this.Ga-- -2]},all:function(){for(;this.next(););return this.X},ma:function(c,d){for(var e=[],g,j;g=this.next();){if(c(g)){j=true;this.D();break}e.push(g)}return d&&!j?null:e}};return a}();var ha=function(a){this.e=a};ha.prototype={Z:0,Od:function(){var a=this.qb,b;return!a||(b=this.o())&&(a.x!==b.x||a.y!==b.y)},Td:function(){var a=this.qb,b;return!a||(b=this.o())&&(a.h!==b.h||a.f!==b.f)},hc:function(){var a=this.e,b=a.getBoundingClientRect(),c=f.ja===9,d=f.O===7,e=b.right-b.left;return{x:b.left,y:b.top,h:c||d?a.offsetWidth:e,f:c||d?a.offsetHeight:b.bottom-b.top,Hd:d&&e?a.offsetWidth/e:1}},o:function(){return this.Z?this.Va||(this.Va=this.hc()):this.hc()},Ad:function(){return!!this.qb},cb:function(){++this.Z},hb:function(){if(!--this.Z){if(this.Va)this.qb=this.Va;this.Va=null}}};(function(){function a(b){var c=f.p.Ba(b);return function(){if(this.Z){var d=this.$b||(this.$b={});return c in d?d[c]:(d[c]=b.call(this))}else return b.call(this)}}f.B={Z:0,ka:function(b){function c(d){this.e=d;this.Zb=this.ia()}f.p.Eb(c.prototype,f.B,b);c.$c={};return c},j:function(){var b=this.ia(),c=this.constructor.$c;return b?b in c?c[b]:(c[b]=this.la(b)):null},ia:a(function(){var b=this.e,c=this.constructor,d=b.style;b=b.currentStyle;var e=this.wa,g=this.Fa,j=c.Yc||(c.Yc=f.F+e);c=c.Zc||(c.Zc=f.nb+g.charAt(0).toUpperCase()+g.substring(1));return d[c]||b.getAttribute(j)||d[g]||b.getAttribute(e)}),i:a(function(){return!!this.j()}),H:a(function(){var b=this.ia(),c=b!==this.Zb;this.Zb=b;return c}),va:a,cb:function(){++this.Z},hb:function(){--this.Z||delete this.$b}}})();f.Sb=f.B.ka({wa:f.F+"background",Fa:f.nb+"Background",cd:{scroll:1,fixed:1,local:1},fb:{"repeat-x":1,"repeat-y":1,repeat:1,"no-repeat":1},sc:{"padding-box":1,"border-box":1,"content-box":1},Pd:{top:1,right:1,bottom:1,left:1,center:1},Ud:{contain:1,cover:1},eb:{Ma:"backgroundClip",z:"backgroundColor",da:"backgroundImage",Pa:"backgroundOrigin",S:"backgroundPosition",T:"backgroundRepeat",Sa:"backgroundSize"},la:function(a){function b(s){return s&&s.W()||s.k&k&&s.d in t}function c(s){return s&&(s.W()&&f.n(s.d)||s.d==="auto"&&"auto")}var d=this.e.currentStyle,e,g,j,i=f.v.qa,h=i.pa,k=i.na,n=i.z,m,p,r=0,t=this.Pd,v,l,q={M:[]};if(this.wb()){e=new f.v(a);for(j={};g=e.next();){m=g.k;p=g.d;if(!j.P&&m&i.Xb&&p==="linear-gradient"){v={ca:[],P:p};for(l={};g=e.next();){m=g.k;p=g.d;if(m&i.Wb&&p===")"){l.color&&v.ca.push(l);v.ca.length>1&&f.p.Eb(j,v);break}if(m&n){if(v.sa||v.zb){g=e.D();if(g.k!==h)break;e.next()}l={color:f.ha(p)};g=e.next();if(g.W())l.db=f.n(g.d);else e.D()}else if(m&i.Ia&&!v.sa&&!l.color&&!v.ca.length)v.sa=new f.Ec(g.d);else if(b(g)&&!v.zb&&!l.color&&!v.ca.length){e.D();v.zb=new f.Ja(e.ma(function(s){return!b(s)},false))}else if(m&h&&p===","){if(l.color){v.ca.push(l);l={}}}else break}}else if(!j.P&&m&i.URL){j.Ab=p;j.P="image"}else if(b(g)&&!j.jQuery){e.D();j.jQuery=new f.Ja(e.ma(function(s){return!b(s)},false))}else if(m&k)if(p in this.fb&&!j.bb)j.bb=p;else if(p in this.sc&&!j.Wa){j.Wa=p;if((g=e.next())&&g.k&k&&g.d in this.sc)j.ub=g.d;else{j.ub=p;e.D()}}else if(p in this.cd&&!j.bc)j.bc=p;else return null;else if(m&n&&!q.color)q.color=f.ha(p);else if(m&h&&p==="/"&&!j.Xa&&j.jQuery){g=e.next();if(g.k&k&&g.d in this.Ud)j.Xa=new f.Ka(g.d);else if(g=c(g)){m=c(e.next());if(!m){m=g;e.D()}j.Xa=new f.Ka(g,m)}else return null}else if(m&h&&p===","&&j.P){j.Hb=a.substring(r,e.ch-1);r=e.ch;q.M.push(j);j={}}else return null}if(j.P){j.Hb=a.substring(r);q.M.push(j)}}else this.Bc(f.ja<9?function(){var s=this.eb,o=d[s.S+"X"],u=d[s.S+"Y"],x=d[s.da],y=d[s.z];if(y!=="transparent")q.color=f.ha(y);if(x!=="none")q.M=[{P:"image",Ab:(new f.v(x)).next().d,bb:d[s.T],jQuery:new f.Ja((new f.v(o+" "+u)).all())}]}:function(){var s=this.eb,o=/\s*,\s*/,u=d[s.da].split(o),x=d[s.z],y,z,B,E,D,C;if(x!=="transparent")q.color=f.ha(x);if((E=u.length)&&u[0]!=="none"){x=d[s.T].split(o);y=d[s.S].split(o);z=d[s.Pa].split(o);B=d[s.Ma].split(o);s=d[s.Sa].split(o);q.M=[];for(o=0;o<E;o++)if((D=u[o])&&D!=="none"){C=s[o].split(" ");q.M.push({Hb:D+" "+x[o]+" "+y[o]+" / "+s[o]+" "+z[o]+" "+B[o],P:"image",Ab:(new f.v(D)).next().d,bb:x[o],jQuery:new f.Ja((new f.v(y[o])).all()),Wa:z[o],ub:B[o],Xa:new f.Ka(C[0],C[1])})}}});return q.color||q.M[0]?q:null},Bc:function(a){var b=f.ja>8,c=this.eb,d=this.e.runtimeStyle,e=d[c.da],g=d[c.z],j=d[c.T],i,h,k,n;if(e)d[c.da]="";if(g)d[c.z]="";if(j)d[c.T]="";if(b){i=d[c.Ma];h=d[c.Pa];n=d[c.S];k=d[c.Sa];if(i)d[c.Ma]="";if(h)d[c.Pa]="";if(n)d[c.S]="";if(k)d[c.Sa]=""}a=a.call(this);if(e)d[c.da]=e;if(g)d[c.z]=g;if(j)d[c.T]=j;if(b){if(i)d[c.Ma]=i;if(h)d[c.Pa]=h;if(n)d[c.S]=n;if(k)d[c.Sa]=k}return a},ia:f.B.va(function(){return this.wb()||this.Bc(function(){var a=this.e.currentStyle,b=this.eb;return a[b.z]+" "+a[b.da]+" "+a[b.T]+" "+a[b.S+"X"]+" "+a[b.S+"Y"]})}),wb:f.B.va(function(){var a=this.e;return a.style[this.Fa]||a.currentStyle.getAttribute(this.wa)}),qc:function(){var a=0;if(f.O<7){a=this.e;a=""+(a.style[f.nb+"PngFix"]||a.currentStyle.getAttribute(f.F+"png-fix"))==="true"}return a},i:f.B.va(function(){return(this.wb()||this.qc())&&!!this.j()})});f.Vb=f.B.ka({wc:["Top","Right","Bottom","Left"],Id:{thin:"1px",medium:"3px",thick:"5px"},la:function(){var a={},b={},c={},d=false,e=true,g=true,j=true;this.Cc(function(){for(var i=this.e.currentStyle,h=0,k,n,m,p,r,t,v;h<4;h++){m=this.wc[h];v=m.charAt(0).toLowerCase();k=b[v]=i["border"+m+"Style"];n=i["border"+m+"Color"];m=i["border"+m+"Width"];if(h>0){if(k!==p)g=false;if(n!==r)e=false;if(m!==t)j=false}p=k;r=n;t=m;c[v]=f.ha(n);m=a[v]=f.n(b[v]==="none"?"0":this.Id[m]||m);if(m.a(this.e)>0)d=true}});return d?{J:a,Zd:b,gd:c,ee:j,hd:e,$d:g}:null},ia:f.B.va(function(){var a=this.e,b=a.currentStyle,c;a.tagName in f.Ac&&a.offsetParent.currentStyle.borderCollapse==="collapse"||this.Cc(function(){c=b.borderWidth+"|"+b.borderStyle+"|"+b.borderColor});return c}),Cc:function(a){var b=this.e.runtimeStyle,c=b.borderWidth,d=b.borderColor;if(c)b.borderWidth="";if(d)b.borderColor="";a=a.call(this);if(c)b.borderWidth=c;if(d)b.borderColor=d;return a}});(function(){f.jb=f.B.ka({wa:"border-radius",Fa:"borderRadius",la:function(b){var c=null,d,e,g,j,i=false;if(b){e=new f.v(b);var h=function(){for(var k=[],n;(g=e.next())&&g.W();){j=f.n(g.d);n=j.ic();if(n<0)return null;if(n>0)i=true;k.push(j)}return k.length>0&&k.length<5?{tl:k[0],tr:k[1]||k[0],br:k[2]||k[0],bl:k[3]||k[1]||k[0]}:null};if(b=h()){if(g){if(g.k&f.v.qa.pa&&g.d==="/")d=h()}else d=b;if(i&&b&&d)c={x:b,y:d}}}return c}});var a=f.n("0");a={tl:a,tr:a,br:a,bl:a};f.jb.Dc={x:a,y:a}})();f.Ub=f.B.ka({wa:"border-image",Fa:"borderImage",fb:{stretch:1,round:1,repeat:1,space:1},la:function(a){var b=null,c,d,e,g,j,i,h=0,k=f.v.qa,n=k.na,m=k.oa,p=k.Ra;if(a){c=new f.v(a);b={};for(var r=function(l){return l&&l.k&k.pa&&l.d==="/"},t=function(l){return l&&l.k&n&&l.d==="fill"},v=function(){g=c.ma(function(l){return!(l.k&(m|p))});if(t(c.next())&&!b.fill)b.fill=true;else c.D();if(r(c.next())){h++;j=c.ma(function(l){return!l.W()&&!(l.k&n&&l.d==="auto")});if(r(c.next())){h++;i=c.ma(function(l){return!l.Ca()})}}else c.D()};a=c.next();){d=a.k;e=a.d;if(d&(m|p)&&!g){c.D();v()}else if(t(a)&&!b.fill){b.fill=true;v()}else if(d&n&&this.fb[e]&&!b.repeat){b.repeat={f:e};if(a=c.next())if(a.k&n&&this.fb[a.d])b.repeat.Ob=a.d;else c.D()}else if(d&k.URL&&!b.src)b.src=e;else return null}if(!b.src||!g||g.length<1||g.length>4||j&&j.length>4||h===1&&j.length<1||i&&i.length>4||h===2&&i.length<1)return null;if(!b.repeat)b.repeat={f:"stretch"};if(!b.repeat.Ob)b.repeat.Ob=b.repeat.f;a=function(l,q){return{t:q(l[0]),r:q(l[1]||l[0]),b:q(l[2]||l[0]),l:q(l[3]||l[1]||l[0])}};b.slice=a(g,function(l){return f.n(l.k&m?l.d+"px":l.d)});if(j&&j[0])b.J=a(j,function(l){return l.W()?f.n(l.d):l.d});if(i&&i[0])b.Da=a(i,function(l){return l.Ca()?f.n(l.d):l.d})}return b}});f.Ic=f.B.ka({wa:"box-shadow",Fa:"boxShadow",la:function(a){var b,c=f.n,d=f.v.qa,e;if(a){e=new f.v(a);b={Da:[],Bb:[]};for(a=function(){for(var g,j,i,h,k,n;g=e.next();){i=g.d;j=g.k;if(j&d.pa&&i===",")break;else if(g.Ca()&&!k){e.D();k=e.ma(function(m){return!m.Ca()})}else if(j&d.z&&!h)h=i;else if(j&d.na&&i==="inset"&&!n)n=true;else return false}g=k&&k.length;if(g>1&&g<5){(n?b.Bb:b.Da).push({fe:c(k[0].d),ge:c(k[1].d),blur:c(k[2]?k[2].d:"0"),Vd:c(k[3]?k[3].d:"0"),color:f.ha(h||"currentColor")});return true}return false};a(););}return b&&(b.Bb.length||b.Da.length)?b:null}});f.Uc=f.B.ka({ia:f.B.va(function(){var a=this.e.currentStyle;return a.visibility+"|"+a.display}),la:function(){var a=this.e,b=a.runtimeStyle;a=a.currentStyle;var c=b.visibility,d;b.visibility="";d=a.visibility;b.visibility=c;return{ce:d!=="hidden",nd:a.display!=="none"}},i:function(){return false}});f.u={R:function(a){function b(c,d,e,g){this.e=c;this.s=d;this.g=e;this.parent=g}f.p.Eb(b.prototype,f.u,a);return b},Cb:false,Q:function(){return false},Ea:f.aa,Lb:function(){this.m();this.i()&&this.V()},ib:function(){this.Cb=true},Mb:function(){this.i()?this.V():this.m()},sb:function(a,b){this.vc(a);for(var c=this.ra||(this.ra=[]),d=a+1,e=c.length,g;d<e;d++)if(g=c[d])break;c[a]=b;this.I().insertBefore(b,g||null)},za:function(a){var b=this.ra;return b&&b[a]||null},vc:function(a){var b=this.za(a),c=this.Ta;if(b&&c){c.removeChild(b);this.ra[a]=null}},Aa:function(a,b,c,d){var e=this.rb||(this.rb={}),g=e[a];if(!g){g=e[a]=f.p.Za("shape");if(b)g.appendChild(g[b]=f.p.Za(b));if(d){c=this.za(d);if(!c){this.sb(d,doc.createElement("group"+d));c=this.za(d)}}c.appendChild(g);a=g.style;a.position="absolute";a.left=a.top=0;a.behavior="url(#default#VML)"}return g},vb:function(a){var b=this.rb,c=b&&b[a];if(c){c.parentNode.removeChild(c);delete b[a]}return!!c},kc:function(a){var b=this.e,c=this.s.o(),d=c.h,e=c.f,g,j,i,h,k,n;c=a.x.tl.a(b,d);g=a.y.tl.a(b,e);j=a.x.tr.a(b,d);i=a.y.tr.a(b,e);h=a.x.br.a(b,d);k=a.y.br.a(b,e);n=a.x.bl.a(b,d);a=a.y.bl.a(b,e);d=Math.min(d/(c+j),e/(i+k),d/(n+h),e/(g+a));if(d<1){c*=d;g*=d;j*=d;i*=d;h*=d;k*=d;n*=d;a*=d}return{x:{tl:c,tr:j,br:h,bl:n},y:{tl:g,tr:i,br:k,bl:a}}},ya:function(a,b,c){b=b||1;var d,e,g=this.s.o();e=g.h*b;g=g.f*b;var j=this.g.G,i=Math.floor,h=Math.ceil,k=a?a.Jb*b:0,n=a?a.Ib*b:0,m=a?a.tb*b:0;a=a?a.Db*b:0;var p,r,t,v,l;if(c||j.i()){d=this.kc(c||j.j());c=d.x.tl*b;j=d.y.tl*b;p=d.x.tr*b;r=d.y.tr*b;t=d.x.br*b;v=d.y.br*b;l=d.x.bl*b;b=d.y.bl*b;e="m"+i(a)+","+i(j)+"qy"+i(c)+","+i(k)+"l"+h(e-p)+","+i(k)+"qx"+h(e-n)+","+i(r)+"l"+h(e-n)+","+h(g-v)+"qy"+h(e-t)+","+h(g-m)+"l"+i(l)+","+h(g-m)+"qx"+i(a)+","+h(g-b)+" x e"}else e="m"+i(a)+","+i(k)+"l"+h(e-n)+","+i(k)+"l"+h(e-n)+","+h(g-m)+"l"+i(a)+","+h(g-m)+"xe";return e},I:function(){var a=this.parent.za(this.N),b;if(!a){a=doc.createElement(this.Ya);b=a.style;b.position="absolute";b.top=b.left=0;this.parent.sb(this.N,a)}return a},mc:function(){var a=this.e,b=a.currentStyle,c=a.runtimeStyle,d=a.tagName,e=f.O===6,g;if(e&&(d in f.cc||d==="FIELDSET")||d==="BUTTON"||d==="INPUT"&&a.type in f.Gd){c.borderWidth="";d=this.g.w.wc;for(g=d.length;g--;){e=d[g];c["padding"+e]="";c["padding"+e]=f.n(b["padding"+e]).a(a)+f.n(b["border"+e+"Width"]).a(a)+(f.O!==8&&g%2?1:0)}c.borderWidth=0}else if(e){if(a.childNodes.length!==1||a.firstChild.tagName!=="ie6-mask"){b=doc.createElement("ie6-mask");d=b.style;d.visibility="visible";for(d.zoom=1;d=a.firstChild;)b.appendChild(d);a.appendChild(b);c.visibility="hidden"}}else c.borderColor="transparent"},ie:function(){},m:function(){this.parent.vc(this.N);delete this.rb;delete this.ra}};f.Rc=f.u.R({i:function(){var a=this.ed;for(var b in a)if(a.hasOwnProperty(b)&&a[b].i())return true;return false},Q:function(){return this.g.Pb.H()},ib:function(){if(this.i()){var a=this.jc(),b=a,c;a=a.currentStyle;var d=a.position,e=this.I().style,g=0,j=0;j=this.s.o();var i=j.Hd;if(d==="fixed"&&f.O>6){g=j.x*i;j=j.y*i;b=d}else{do b=b.offsetParent;while(b&&b.currentStyle.position==="static");if(b){c=b.getBoundingClientRect();b=b.currentStyle;g=(j.x-c.left)*i-(parseFloat(b.borderLeftWidth)||0);j=(j.y-c.top)*i-(parseFloat(b.borderTopWidth)||0)}else{b=doc.documentElement;g=(j.x+b.scrollLeft-b.clientLeft)*i;j=(j.y+b.scrollTop-b.clientTop)*i}b="absolute"}e.position=b;e.left=g;e.top=j;e.zIndex=d==="static"?-1:a.zIndex;this.Cb=true}},Mb:f.aa,Nb:function(){var a=this.g.Pb.j();this.I().style.display=a.ce&&a.nd?"":"none"},Lb:function(){this.i()?this.Nb():this.m()},jc:function(){var a=this.e;return a.tagName in f.Ac?a.offsetParent:a},I:function(){var a=this.Ta,b;if(!a){b=this.jc();a=this.Ta=doc.createElement("css3-container");a.style.direction="ltr";this.Nb();b.parentNode.insertBefore(a,b)}return a},ab:f.aa,m:function(){var a=this.Ta,b;if(a&&(b=a.parentNode))b.removeChild(a);delete this.Ta;delete this.ra}});f.Fc=f.u.R({N:2,Ya:"background",Q:function(){var a=this.g;return a.C.H()||a.G.H()},i:function(){var a=this.g;return a.q.i()||a.G.i()||a.C.i()||a.ga.i()&&a.ga.j().Bb},V:function(){var a=this.s.o();if(a.h&&a.f){this.od();this.pd()}},od:function(){var a=this.g.C.j(),b=this.s.o(),c=this.e,d=a&&a.color,e,g;if(d&&d.fa()>0){this.lc();a=this.Aa("bgColor","fill",this.I(),1);e=b.h;b=b.f;a.stroked=false;a.coordsize=e*2+","+b*2;a.coordorigin="1,1";a.path=this.ya(null,2);g=a.style;g.width=e;g.height=b;a.fill.color=d.U(c);c=d.fa();if(c<1)a.fill.opacity=c}else this.vb("bgColor")},pd:function(){var a=this.g.C.j(),b=this.s.o();a=a&&a.M;var c,d,e,g,j;if(a){this.lc();d=b.h;e=b.f;for(j=a.length;j--;){b=a[j];c=this.Aa("bgImage"+j,"fill",this.I(),2);c.stroked=false;c.fill.type="tile";c.fillcolor="none";c.coordsize=d*2+","+e*2;c.coordorigin="1,1";c.path=this.ya(0,2);g=c.style;g.width=d;g.height=e;if(b.P==="linear-gradient")this.bd(c,b);else{c.fill.src=b.Ab;this.Nd(c,j)}}}for(j=a?a.length:0;this.vb("bgImage"+j++););},Nd:function(a,b){var c=this;f.p.Rb(a.fill.src,function(d){var e=c.e,g=c.s.o(),j=g.h;g=g.f;if(j&&g){var i=a.fill,h=c.g,k=h.w.j(),n=k&&k.J;k=n?n.t.a(e):0;var m=n?n.r.a(e):0,p=n?n.b.a(e):0;n=n?n.l.a(e):0;h=h.C.j().M[b];e=h.jQuery?h.jQuery.coords(e,j-d.h-n-m,g-d.f-k-p):{x:0,y:0};h=h.bb;p=m=0;var r=j+1,t=g+1,v=f.O===8?0:1;n=Math.round(e.x)+n+0.5;k=Math.round(e.y)+k+0.5;i.position=n/j+","+k/g;i.size.x=1;i.size=d.h+"px,"+d.f+"px";if(h&&h!=="repeat"){if(h==="repeat-x"||h==="no-repeat"){m=k+1;t=k+d.f+v}if(h==="repeat-y"||h==="no-repeat"){p=n+1;r=n+d.h+v}a.style.clip="rect("+m+"px,"+r+"px,"+t+"px,"+p+"px)"}}})},bd:function(a,b){var c=this.e,d=this.s.o(),e=d.h,g=d.f;a=a.fill;d=b.ca;var j=d.length,i=Math.PI,h=f.Na,k=h.tc,n=h.dc;b=h.gc(c,e,g,b);h=b.sa;var m=b.xc,p=b.yc,r=b.Wd,t=b.Xd,v=b.rd,l=b.sd,q=b.kd,s=b.ld;b=b.rc;e=h%90?Math.atan2(q*e/g,s)/i*180:h+90;e+=180;e%=360;v=k(r,t,h,v,l);g=n(r,t,v[0],v[1]);i=[];v=k(m,p,h,r,t);n=n(m,p,v[0],v[1])/g*100;k=[];for(h=0;h<j;h++)k.push(d[h].db?d[h].db.a(c,b):h===0?0:h===j-1?b:null);for(h=1;h<j;h++){if(k[h]===null){m=k[h-1];b=h;do p=k[++b];while(p===null);k[h]=m+(p-m)/(b-h+1)}k[h]=Math.max(k[h],k[h-1])}for(h=0;h<j;h++)i.push(n+k[h]/g*100+"% "+d[h].color.U(c));a.angle=e;a.type="gradient";a.method="sigma";a.color=d[0].color.U(c);a.color2=d[j-1].color.U(c);if(a.colors)a.colors.value=i.join(",");else a.colors=i.join(",")},lc:function(){var a=this.e.runtimeStyle;a.backgroundImage="url(about:blank)";a.backgroundColor="transparent"},m:function(){f.u.m.call(this);var a=this.e.runtimeStyle;a.backgroundImage=a.backgroundColor=""}});f.Gc=f.u.R({N:4,Ya:"border",Q:function(){var a=this.g;return a.w.H()||a.G.H()},i:function(){var a=this.g;return a.G.i()&&!a.q.i()&&a.w.i()},V:function(){var a=this.e,b=this.g.w.j(),c=this.s.o(),d=c.h;c=c.f;var e,g,j,i,h;if(b){this.mc();b=this.wd(2);i=0;for(h=b.length;i<h;i++){j=b[i];e=this.Aa("borderPiece"+i,j.stroke?"stroke":"fill",this.I());e.coordsize=d*2+","+c*2;e.coordorigin="1,1";e.path=j.path;g=e.style;g.width=d;g.height=c;e.filled=!!j.fill;e.stroked=!!j.stroke;if(j.stroke){e=e.stroke;e.weight=j.Qb+"px";e.color=j.color.U(a);e.dashstyle=j.stroke==="dashed"?"2 2":j.stroke==="dotted"?"1 1":"solid";e.linestyle=j.stroke==="double"&&j.Qb>2?"ThinThin":"Single"}else e.fill.color=j.fill.U(a)}for(;this.vb("borderPiece"+i++););}},wd:function(a){var b=this.e,c,d,e,g=this.g.w,j=[],i,h,k,n,m=Math.round,p,r,t;if(g.i()){c=g.j();g=c.J;r=c.Zd;t=c.gd;if(c.ee&&c.$d&&c.hd){if(t.t.fa()>0){c=g.t.a(b);k=c/2;j.push({path:this.ya({Jb:k,Ib:k,tb:k,Db:k},a),stroke:r.t,color:t.t,Qb:c})}}else{a=a||1;c=this.s.o();d=c.h;e=c.f;c=m(g.t.a(b));k=m(g.r.a(b));n=m(g.b.a(b));b=m(g.l.a(b));var v={t:c,r:k,b:n,l:b};b=this.g.G;if(b.i())p=this.kc(b.j());i=Math.floor;h=Math.ceil;var l=function(o,u){return p?p[o][u]:0},q=function(o,u,x,y,z,B){var E=l("x",o),D=l("y",o),C=o.charAt(1)==="r";o=o.charAt(0)==="b";return E>0&&D>0?(B?"al":"ae")+(C?h(d-E):i(E))*a+","+(o?h(e-D):i(D))*a+","+(i(E)-u)*a+","+(i(D)-x)*a+","+y*65535+","+2949075*(z?1:-1):(B?"m":"l")+(C?d-u:u)*a+","+(o?e-x:x)*a},s=function(o,u,x,y){var z=o==="t"?i(l("x","tl"))*a+","+h(u)*a:o==="r"?h(d-u)*a+","+i(l("y","tr"))*a:o==="b"?h(d-l("x","br"))*a+","+i(e-u)*a:i(u)*a+","+h(e-l("y","bl"))*a;o=o==="t"?h(d-l("x","tr"))*a+","+h(u)*a:o==="r"?h(d-u)*a+","+h(e-l("y","br"))*a:o==="b"?i(l("x","bl"))*a+","+i(e-u)*a:i(u)*a+","+i(l("y","tl"))*a;return x?(y?"m"+o:"")+"l"+z:(y?"m"+z:"")+"l"+o};b=function(o,u,x,y,z,B){var E=o==="l"||o==="r",D=v[o],C,F;if(D>0&&r[o]!=="none"&&t[o].fa()>0){C=v[E?o:u];u=v[E?u:o];F=v[E?o:x];x=v[E?x:o];if(r[o]==="dashed"||r[o]==="dotted"){j.push({path:q(y,C,u,B+45,0,1)+q(y,0,0,B,1,0),fill:t[o]});j.push({path:s(o,D/2,0,1),stroke:r[o],Qb:D,color:t[o]});j.push({path:q(z,F,x,B,0,1)+q(z,0,0,B-45,1,0),fill:t[o]})}else j.push({path:q(y,C,u,B+45,0,1)+s(o,D,0,0)+q(z,F,x,B,0,0)+(r[o]==="double"&&D>2?q(z,F-i(F/3),x-i(x/3),B-45,1,0)+s(o,h(D/3*2),1,0)+q(y,C-i(C/3),u-i(u/3),B,1,0)+"x "+q(y,i(C/3),i(u/3),B+45,0,1)+s(o,i(D/3),1,0)+q(z,i(F/3),i(x/3),B,0,0):"")+q(z,0,0,B-45,1,0)+s(o,0,1,0)+q(y,0,0,B,1,0),fill:t[o]})}};b("t","l","r","tl","tr",90);b("r","t","b","tr","br",0);b("b","r","l","br","bl",-90);b("l","b","t","bl","tl",-180)}}return j},m:function(){if(this.ec||!this.g.q.i())this.e.runtimeStyle.borderColor="";f.u.m.call(this)}});f.Tb=f.u.R({N:5,Md:["t","tr","r","br","b","bl","l","tl","c"],Q:function(){return this.g.q.H()},i:function(){return this.g.q.i()},V:function(){this.I();var a=this.g.q.j(),b=this.g.w.j(),c=this.s.o(),d=this.e,e=this.uc;f.p.Rb(a.src,function(g){function j(s,o,u,x,y){s=e[s].style;var z=Math.max;s.width=z(o,0);s.height=z(u,0);s.left=x;s.top=y}function i(s,o,u){for(var x=0,y=s.length;x<y;x++)e[s[x]].imagedata[o]=u}var h=c.h,k=c.f,n=f.n("0"),m=a.J||(b?b.J:{t:n,r:n,b:n,l:n});n=m.t.a(d);var p=m.r.a(d),r=m.b.a(d);m=m.l.a(d);var t=a.slice,v=t.t.a(d),l=t.r.a(d),q=t.b.a(d);t=t.l.a(d);j("tl",m,n,0,0);j("t",h-m-p,n,m,0);j("tr",p,n,h-p,0);j("r",p,k-n-r,h-p,n);j("br",p,r,h-p,k-r);j("b",h-m-p,r,m,k-r);j("bl",m,r,0,k-r);j("l",m,k-n-r,0,n);j("c",h-m-p,k-n-r,m,n);i(["tl","t","tr"],"cropBottom",(g.f-v)/g.f);i(["tl","l","bl"],"cropRight",(g.h-t)/g.h);i(["bl","b","br"],"cropTop",(g.f-q)/g.f);i(["tr","r","br"],"cropLeft",(g.h-l)/g.h);i(["l","r","c"],"cropTop",v/g.f);i(["l","r","c"],"cropBottom",q/g.f);i(["t","b","c"],"cropLeft",t/g.h);i(["t","b","c"],"cropRight",l/g.h);e.c.style.display=a.fill?"":"none"},this)},I:function(){var a=this.parent.za(this.N),b,c,d,e=this.Md,g=e.length;if(!a){a=doc.createElement("border-image");b=a.style;b.position="absolute";this.uc={};for(d=0;d<g;d++){c=this.uc[e[d]]=f.p.Za("rect");c.appendChild(f.p.Za("imagedata"));b=c.style;b.behavior="url(#default#VML)";b.position="absolute";b.top=b.left=0;c.imagedata.src=this.g.q.j().src;c.stroked=false;c.filled=false;a.appendChild(c)}this.parent.sb(this.N,a)}return a},Ea:function(){if(this.i()){var a=this.e,b=a.runtimeStyle,c=this.g.q.j().J;b.borderStyle="solid";if(c){b.borderTopWidth=c.t.a(a)+"px";b.borderRightWidth=c.r.a(a)+"px";b.borderBottomWidth=c.b.a(a)+"px";b.borderLeftWidth=c.l.a(a)+"px"}this.mc()}},m:function(){var a=this.e.runtimeStyle;a.borderStyle="";if(this.ec||!this.g.w.i())a.borderColor=a.borderWidth="";f.u.m.call(this)}});f.Hc=f.u.R({N:1,Ya:"outset-box-shadow",Q:function(){var a=this.g;return a.ga.H()||a.G.H()},i:function(){var a=this.g.ga;return a.i()&&a.j().Da[0]},V:function(){function a(C,F,O,H,M,P,I){C=b.Aa("shadow"+C+F,"fill",d,j-C);F=C.fill;C.coordsize=n*2+","+m*2;C.coordorigin="1,1";C.stroked=false;C.filled=true;F.color=M.U(c);if(P){F.type="gradienttitle";F.color2=F.color;F.opacity=0}C.path=I;l=C.style;l.left=O;l.top=H;l.width=n;l.height=m;return C}var b=this,c=this.e,d=this.I(),e=this.g,g=e.ga.j().Da;e=e.G.j();var j=g.length,i=j,h,k=this.s.o(),n=k.h,m=k.f;k=f.O===8?1:0;for(var p=["tl","tr","br","bl"],r,t,v,l,q,s,o,u,x,y,z,B,E,D;i--;){t=g[i];q=t.fe.a(c);s=t.ge.a(c);h=t.Vd.a(c);o=t.blur.a(c);t=t.color;u=-h-o;if(!e&&o)e=f.jb.Dc;u=this.ya({Jb:u,Ib:u,tb:u,Db:u},2,e);if(o){x=(h+o)*2+n;y=(h+o)*2+m;z=x?o*2/x:0;B=y?o*2/y:0;if(o-h>n/2||o-h>m/2)for(h=4;h--;){r=p[h];E=r.charAt(0)==="b";D=r.charAt(1)==="r";r=a(i,r,q,s,t,o,u);v=r.fill;v.focusposition=(D?1-z:z)+","+(E?1-B:B);v.focussize="0,0";r.style.clip="rect("+((E?y/2:0)+k)+"px,"+(D?x:x/2)+"px,"+(E?y:y/2)+"px,"+((D?x/2:0)+k)+"px)"}else{r=a(i,"",q,s,t,o,u);v=r.fill;v.focusposition=z+","+B;v.focussize=1-z*2+","+(1-B*2)}}else{r=a(i,"",q,s,t,o,u);q=t.fa();if(q<1)r.fill.opacity=q}}}});f.Pc=f.u.R({N:6,Ya:"imgEl",Q:function(){var a=this.g;return this.e.src!==this.Xc||a.G.H()},i:function(){var a=this.g;return a.G.i()||a.C.qc()},V:function(){this.Xc=j;this.Cd();var a=this.Aa("img","fill",this.I()),b=a.fill,c=this.s.o(),d=c.h;c=c.f;var e=this.g.w.j(),g=e&&e.J;e=this.e;var j=e.src,i=Math.round,h=e.currentStyle,k=f.n;if(!g||f.O<7){g=f.n("0");g={t:g,r:g,b:g,l:g}}a.stroked=false;b.type="frame";b.src=j;b.position=(d?0.5/d:0)+","+(c?0.5/c:0);a.coordsize=d*2+","+c*2;a.coordorigin="1,1";a.path=this.ya({Jb:i(g.t.a(e)+k(h.paddingTop).a(e)),Ib:i(g.r.a(e)+k(h.paddingRight).a(e)),tb:i(g.b.a(e)+k(h.paddingBottom).a(e)),Db:i(g.l.a(e)+k(h.paddingLeft).a(e))},2);a=a.style;a.width=d;a.height=c},Cd:function(){this.e.runtimeStyle.filter="alpha(opacity=0)"},m:function(){f.u.m.call(this);this.e.runtimeStyle.filter=""}});f.Oc=f.u.R({ib:f.aa,Mb:f.aa,Nb:f.aa,Lb:f.aa,Ld:/^,+|,+jQuery/g,Fd:/,+/g,gb:function(a,b){(this.pb||(this.pb=[]))[a]=b||void 0},ab:function(){var a=this.pb,b;if(a&&(b=a.join(",").replace(this.Ld,"").replace(this.Fd,","))!==this.Wc)this.Wc=this.e.runtimeStyle.background=b},m:function(){this.e.runtimeStyle.background="";delete this.pb}});f.Mc=f.u.R({ua:1,Q:function(){return this.g.C.H()},i:function(){var a=this.g;return a.C.i()||a.q.i()},V:function(){var a=this.g.C.j(),b,c,d=0,e,g;if(a){b=[];if(c=a.M)for(;e=c[d++];)if(e.P==="linear-gradient"){g=this.vd(e.Wa);g=(e.Xa||f.Ka.Kc).a(this.e,g.h,g.f,g.h,g.f);b.push("url(data:image/svg+xml,"+escape(this.xd(e,g.h,g.f))+") "+this.dd(e.jQuery)+" / "+g.h+"px "+g.f+"px "+(e.bc||"")+" "+(e.Wa||"")+" "+(e.ub||""))}else b.push(e.Hb);a.color&&b.push(a.color.Y);this.parent.gb(this.ua,b.join(","))}},dd:function(a){return a?a.X.map(function(b){return b.d}).join(" "):"0 0"},vd:function(a){var b=this.e,c=this.s.o(),d=c.h;c=c.f;var e;if(a!=="border-box")if((e=this.g.w.j())&&(e=e.J)){d-=e.l.a(b)+e.l.a(b);c-=e.t.a(b)+e.b.a(b)}if(a==="content-box"){a=f.n;e=b.currentStyle;d-=a(e.paddingLeft).a(b)+a(e.paddingRight).a(b);c-=a(e.paddingTop).a(b)+a(e.paddingBottom).a(b)}return{h:d,f:c}},xd:function(a,b,c){var d=this.e,e=a.ca,g=e.length,j=f.Na.gc(d,b,c,a);a=j.xc;var i=j.yc,h=j.td,k=j.ud;j=j.rc;var n,m,p,r,t;n=[];for(m=0;m<g;m++)n.push(e[m].db?e[m].db.a(d,j):m===0?0:m===g-1?j:null);for(m=1;m<g;m++)if(n[m]===null){r=n[m-1];p=m;do t=n[++p];while(t===null);n[m]=r+(t-r)/(p-m+1)}b=['<svg width="'+b+'" height="'+c+'" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="'+a/b*100+'%" y1="'+i/c*100+'%" x2="'+h/b*100+'%" y2="'+k/c*100+'%">'];for(m=0;m<g;m++)b.push('<stop offset="'+n[m]/j+'" stop-color="'+e[m].color.U(d)+'" stop-opacity="'+e[m].color.fa()+'"/>');b.push('</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>');return b.join("")},m:function(){this.parent.gb(this.ua)}});f.Nc=f.u.R({T:"repeat",Sc:"stretch",Qc:"round",ua:0,Q:function(){return this.g.q.H()},i:function(){return this.g.q.i()},V:function(){var a=this,b=a.g.q.j(),c=a.g.w.j(),d=a.s.o(),e=b.repeat,g=e.f,j=e.Ob,i=a.e,h=0;f.p.Rb(b.src,function(k){function n(Q,R,U,V,W,Y,X,S,w,A){K.push('<pattern patternUnits="userSpaceOnUse" id="pattern'+G+'" x="'+(g===l?Q+U/2-w/2:Q)+'" y="'+(j===l?R+V/2-A/2:R)+'" width="'+w+'" height="'+A+'"><svg width="'+w+'" height="'+A+'" viewBox="'+W+" "+Y+" "+X+" "+S+'" preserveAspectRatio="none"><image xlink:href="'+v+'" x="0" y="0" width="'+r+'" height="'+t+'" /></svg></pattern>');J.push('<rect x="'+Q+'" y="'+R+'" width="'+U+'" height="'+V+'" fill="url(#pattern'+G+')" />');G++}var m=d.h,p=d.f,r=k.h,t=k.f,v=a.Dd(b.src,r,t),l=a.T,q=a.Sc;k=a.Qc;var s=Math.ceil,o=f.n("0"),u=b.J||(c?c.J:{t:o,r:o,b:o,l:o});o=u.t.a(i);var x=u.r.a(i),y=u.b.a(i);u=u.l.a(i);var z=b.slice,B=z.t.a(i),E=z.r.a(i),D=z.b.a(i);z=z.l.a(i);var C=m-u-x,F=p-o-y,O=r-z-E,H=t-B-D,M=g===q?C:O*o/B,P=j===q?F:H*x/E,I=g===q?C:O*y/D;q=j===q?F:H*u/z;var K=[],J=[],G=0;if(g===k){M-=(M-(C%M||M))/s(C/M);I-=(I-(C%I||I))/s(C/I)}if(j===k){P-=(P-(F%P||P))/s(F/P);q-=(q-(F%q||q))/s(F/q)}k=['<svg width="'+m+'" height="'+p+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'];n(0,0,u,o,0,0,z,B,u,o);n(u,0,C,o,z,0,O,B,M,o);n(m-x,0,x,o,r-E,0,E,B,x,o);n(0,o,u,F,0,B,z,H,u,q);if(b.fill)n(u,o,C,F,z,B,O,H,M||I||O,q||P||H);n(m-x,o,x,F,r-E,B,E,H,x,P);n(0,p-y,u,y,0,t-D,z,D,u,y);n(u,p-y,C,y,z,t-D,O,D,I,y);n(m-x,p-y,x,y,r-E,t-D,E,D,x,y);k.push("<defs>"+K.join("\n")+"</defs>"+J.join("\n")+"</svg>");a.parent.gb(a.ua,"url(data:image/svg+xml,"+escape(k.join(""))+") no-repeat border-box border-box");h&&a.parent.ab()},a);h=1},Dd:function(){var a={};return function(b,c,d){var e=a[b],g;if(!e){e=new Image;g=doc.createElement("canvas");e.src=b;g.width=c;g.height=d;g.getContext("2d").drawImage(e,0,0);e=a[b]=g.toDataURL()}return e}}(),Ea:f.Tb.prototype.Ea,m:function(){var a=this.e.runtimeStyle;this.parent.gb(this.ua);a.borderColor=a.borderStyle=a.borderWidth=""}});f.kb=function(){function a(l,q){l.className+=" "+q}function b(l){var q=v.slice.call(arguments,1),s=q.length;setTimeout(function(){if(l)for(;s--;)a(l,q[s])},0)}function c(l){var q=v.slice.call(arguments,1),s=q.length;setTimeout(function(){if(l)for(;s--;){var o=q[s];o=t[o]||(t[o]=new RegExp("\\b"+o+"\\b","g"));l.className=l.className.replace(o,"")}},0)}function d(l){function q(){if(!U){var w,A,L=f.ja,T=l.currentStyle,N=T.getAttribute(g)==="true",da=T.getAttribute(i)!=="false",ea=T.getAttribute(h)!=="false";S=T.getAttribute(j);S=L>7?S!=="false":S==="true";if(!R){R=1;l.runtimeStyle.zoom=1;T=l;for(var fa=1;T=T.previousSibling;)if(T.nodeType===1){fa=0;break}fa&&a(l,p)}J.cb();if(N&&(A=J.o())&&(w=doc.documentElement||doc.body)&&(A.y>w.clientHeight||A.x>w.clientWidth||A.y+A.f<0||A.x+A.h<0)){if(!Y){Y=1;f.mb.ba(q)}}else{U=1;Y=R=0;f.mb.Ha(q);if(L===9){G={C:new f.Sb(l),q:new f.Ub(l),w:new f.Vb(l)};Q=[G.C,G.q];K=new f.Oc(l,J,G);w=[new f.Mc(l,J,G,K),new f.Nc(l,J,G,K)]}else{G={C:new f.Sb(l),w:new f.Vb(l),q:new f.Ub(l),G:new f.jb(l),ga:new f.Ic(l),Pb:new f.Uc(l)};Q=[G.C,G.w,G.q,G.G,G.ga,G.Pb];K=new f.Rc(l,J,G);w=[new f.Hc(l,J,G,K),new f.Fc(l,J,G,K),new f.Gc(l,J,G,K),new f.Tb(l,J,G,K)];l.tagName==="IMG"&&w.push(new f.Pc(l,J,G,K));K.ed=w}I=[K].concat(w);if(w=l.currentStyle.getAttribute(f.F+"watch-ancestors")){w=parseInt(w,10);A=0;for(N=l.parentNode;N&&(w==="NaN"||A++<w);){H(N,"onpropertychange",C);H(N,"onmouseenter",x);H(N,"onmouseleave",y);H(N,"onmousedown",z);if(N.tagName in f.fc){H(N,"onfocus",E);H(N,"onblur",D)}N=N.parentNode}}if(S){f.Oa.ba(o);f.Oa.Rd()}o(1)}if(!V){V=1;L<9&&H(l,"onmove",s);H(l,"onresize",s);H(l,"onpropertychange",u);ea&&H(l,"onmouseenter",x);if(ea||da)H(l,"onmouseleave",y);da&&H(l,"onmousedown",z);if(l.tagName in f.fc){H(l,"onfocus",E);H(l,"onblur",D)}f.Qa.ba(s);f.L.ba(M)}J.hb()}}function s(){J&&J.Ad()&&o()}function o(w){if(!X)if(U){var A,L=I.length;F();for(A=0;A<L;A++)I[A].Ea();if(w||J.Od())for(A=0;A<L;A++)I[A].ib();if(w||J.Td())for(A=0;A<L;A++)I[A].Mb();K.ab();O()}else R||q()}function u(){var w,A=I.length,L;w=event;if(!X&&!(w&&w.propertyName in r))if(U){F();for(w=0;w<A;w++)I[w].Ea();for(w=0;w<A;w++){L=I[w];L.Cb||L.ib();L.Q()&&L.Lb()}K.ab();O()}else R||q()}function x(){b(l,k)}function y(){c(l,k,n)}function z(){b(l,n);f.lb.ba(B)}function B(){c(l,n);f.lb.Ha(B)}function E(){b(l,m)}function D(){c(l,m)}function C(){var w=event.propertyName;if(w==="className"||w==="id")u()}function F(){J.cb();for(var w=Q.length;w--;)Q[w].cb()}function O(){for(var w=Q.length;w--;)Q[w].hb();J.hb()}function H(w,A,L){w.attachEvent(A,L);W.push([w,A,L])}function M(){if(V){for(var w=W.length,A;w--;){A=W[w];A[0].detachEvent(A[1],A[2])}f.L.Ha(M);V=0;W=[]}}function P(){if(!X){var w,A;M();X=1;if(I){w=0;for(A=I.length;w<A;w++){I[w].ec=1;I[w].m()}}S&&f.Oa.Ha(o);f.Qa.Ha(o);I=J=G=Q=l=null}}var I,K,J=new ha(l),G,Q,R,U,V,W=[],Y,X,S;this.Ed=q;this.update=o;this.m=P;this.qd=l}var e={},g=f.F+"lazy-init",j=f.F+"poll",i=f.F+"track-active",h=f.F+"track-hover",k=f.La+"hover",n=f.La+"active",m=f.La+"focus",p=f.La+"first-child",r={background:1,bgColor:1,display:1},t={},v=[];d.yd=function(l){var q=f.p.Ba(l);return e[q]||(e[q]=new d(l))};d.m=function(l){l=f.p.Ba(l);var q=e[l];if(q){q.m();delete e[l]}};d.md=function(){var l=[],q;if(e){for(var s in e)if(e.hasOwnProperty(s)){q=e[s];l.push(q.qd);q.m()}e={}}return l};return d}();f.supportsVML=f.zc;f.attach=function(a){f.ja<10&&f.zc&&f.kb.yd(a).Ed()};f.detach=function(a){f.kb.m(a)}};})();};
/*!
 * ltIE9 placeholder - 2.0.8
 * https://github.com/mathiasbynens/jquery-placeholder
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('!2(a){"2"==T v&&v.U?v(["V"],a):a(F)}(2(a){2 b(b){4 c={},d=/^F\\d+jQuery/;n a.t(b.W,2(a,b){b.X&&!d.Y(b.w)&&(c[b.w]=b.3)}),c}2 c(b,c){4 d=7,f=a(d);o(d.3==f.p("1")&&f.x(m.6))o(f.5("1-q")){o(f=f.G().Z(\'8[r="q"]:H\').I().p("9",f.y("9").5("1-9")),b===!0)n f[0].3=c;f.z()}A d.3="",f.J(m.6),d==e()&&d.11()}2 d(){4 d,e=7,f=a(e),g=7.9;o(""===e.3){o("q"===e.r){o(!f.5("1-K")){L{d=f.12().p({r:"B"})}M(h){d=a("<8>").p(a.N(b(7),{r:"B"}))}d.y("w").5({"1-q":f,"1-9":g}).C("z.1",c),f.5({"1-K":d,"1-9":g}).13(d)}f=f.y("9").G().14(\'8[r="B"]:H\').p("9",g).I()}f.15(m.6),f[0].3=f.p("1")}A f.J(m.6)}2 e(){L{n u.16}M(a){}}4 f,g,h="[17 18]"==19.1a.1b.D(O.1c),i="1"P u.Q("8")&&!h,j="1"P u.Q("s")&&!h,k=a.1d,l=a.1e;o(i&&j)g=a.R.1=2(){n 7},g.8=g.s=!0;A{4 m={};g=a.R.1=2(b){4 e={6:"1"};m=a.N({},e,b);4 f=7;n f.1f((i?"s":":8")+"[1]").1g("."+m.6).C({"z.1":c,"S.1":d}).5("1-E",!0).1h("S.1"),f},g.8=i,g.s=j,f={1i:2(b){4 c=a(b),d=c.5("1-q");n d?d[0].3:c.5("1-E")&&c.x("1")?"":b.3},1j:2(b,f){4 g=a(b),h=g.5("1-q");n h?h[0].3=f:g.5("1-E")?(""===f?(b.3=f,b!=e()&&d.D(b)):g.x(m.6)?c.D(b,!0,f)||(b.3=f):b.3=f,g):b.3=f}},i||(k.8=f,l.3=f),j||(k.s=f,l.3=f),a(2(){a(u).1k("1l","1m.1",2(){4 b=a("."+m.6,7).t(c);1n(2(){b.t(d)},10)})}),a(O).C("1o.1",2(){a("."+m.6).t(2(){7.3=""})})}});', 62, 87, '|placeholder|function|value|var|data|customClass|this|input|id||||||||||||||return|if|attr|password|type|textarea|each|document|define|name|hasClass|removeAttr|focus|else|text|bind|call|enabled|jQuery|hide|first|show|removeClass|textinput|try|catch|extend|window|in|createElement|fn|blur|typeof|amd|jquery|attributes|specified|test|nextAll||select|clone|before|prevAll|addClass|activeElement|object|OperaMini|Object|prototype|toString|operamini|valHooks|propHooks|filter|not|trigger|get|set|delegate|form|submit|setTimeout|beforeunload'.split('|'), 0, {}));
/*!
 * Semantic Select
 * http://wisniowski.pro
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(8(jQuery){jQuery.F.S=8(){jQuery(0).q(8(){jQuery(0).j(\'z\').T(\'<k l="2-1-b"></k>\').U(\'<k l="2-1"><k l="G"><k l="h">\'+jQuery(0).6().A().o()+\'</k><k l="V"></k></k><c l="1-\'+jQuery(0).i(\'W\')+\'"></c></k>\').3(\'m\').q(8(){jQuery(0).H().I(jQuery(0).d(\'.2-1-b\').3(\'c\'))});f(jQuery(0).6(\'m\').y()>7){jQuery(0).d(\'.2-1-b\').3(\'.2-1\').j(\'J\')}});jQuery(\'.2-1\').q(8(){f(jQuery(0).3(\'[n]\').y()){K=jQuery(0).3(\'[n]\').o();jQuery(0).3(\'.h\').o(K)}});jQuery(\'.2-1\').6(\'.G\').r(\'s\',8(){f(jQuery(0).9().X(\'4\')){jQuery(0).9().p(\'4\')}x{jQuery(\'.2-1.4\').p(\'4\');jQuery(0).9().j(\'4\')}}).L().6(\'m\').q(8(){f(jQuery(0).t(\'[B]\')){jQuery(0).u(\'<5 l="z" v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}x f(jQuery(0).t(\'[n]\')){jQuery(0).u(\'<5 l="4" v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}x{jQuery(0).u(\'<5 v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}});jQuery(\'M\').r(\'s N\',\'.2-1\',8(e){e.Y()});jQuery(\'M\').r(\'s\',\'.2-1 c a\',8(){jQuery(0).9(\'5\').9(\'c\').3(\'.4\').p(\'4\');jQuery(0).9().j(\'4\').d(\'.2-1\').p(\'4\').3(\'.h\').h(jQuery(0).h()).d(\'.2-1\').j(\'n\').d(\'.2-1-b\').3(\'1\').i(\'g\',jQuery(0).d(\'.2-1-b\').3(\'1\').6(\'m\').i(\'n\',O).P(\'n\',O).9().6(\':C(\'+jQuery(0).d(\'c\').6(\'5\').D(jQuery(0).9())+\')\').i(\'g\')).6(\':C(\'+jQuery(0).d(\'c\').6(\'5\').D(jQuery(0).9())+\')\').i(\'n\',Q).P(\'n\',Q).Z()}).d(\'.2-1\').3(\'c\').q(8(){f(!jQuery(0).6(\'.4\').y()){jQuery(0).6(\'5:A-E\').j(\'4\')}});jQuery(\'o\').r(\'s N\',8(){jQuery(\'.2-1.4\').p(\'4\')});jQuery(\'.2-1-b 1\').r(\'10\',8(){jQuery(0).9().6(\'.2-1\').j(\'4\')}).r(\'11\',8(){jQuery(0).9().6(\'.2-1\').p(\'4\')});jQuery(\'.2-1-b 1\').R(8(e){f(e.w==12){f(!jQuery(0).9().3(\'c\').6(\'5.4\').t(\':A-E\')){jQuery(0).9().3(\'c\').6(\'5.4\').p(\'4\').13().j(\'4\')}jQuery(0).9().3(\'.h\').o(jQuery(0).d(\'.2-1-b\').3(\'5.4\').o())}f(e.w==14){f(!jQuery(0).9().3(\'c\').6(\'5.4\').t(\':15-E\')){jQuery(0).9().3(\'c\').6(\'5.4\').p(\'4\').L().j(\'4\')}jQuery(0).9().3(\'.h\').o(jQuery(0).d(\'.2-1-b\').3(\'5.4\').o())}});jQuery(\'.2-1-b 1\').R(8(e){f(e.w>=16&&e.w<=17||e.w>=18&&e.w<=19){jQuery(0).6(\'m:1a\').s()}});jQuery(\'.2-1-b 1 m:1b([B])\').r(\'s\',8(){jQuery(0).d(\'.2-1-b\').3(\'c\').6(\':C(\'+jQuery(0).D()+\')\').6(\'a\').s()})};jQuery.F.1c=8(){jQuery(0).d(\'.2-1-b\').3(\'c\').3(\'5\').1d();jQuery(0).3(\'m\').q(8(){jQuery(0).H().I(jQuery(0).d(\'.2-1-b\').3(\'c\'))});jQuery(0).d(\'.2-1-b\').3(\'c\').3(\'m\').q(8(){f(jQuery(0).t(\'[B]\')){jQuery(0).u(\'<5 l="z" v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}x f(jQuery(0).t(\'[n]\')){jQuery(0).u(\'<5 l="4" v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}x{jQuery(0).u(\'<5 v-g="\'+jQuery(0).i(\'g\')+\'"><a>\'+jQuery(0).h()+\'</a></5>\')}});f(jQuery(0).6(\'m\').y()>7){jQuery(0).d(\'.2-1-b\').3(\'.2-1\').j(\'J\')}}})(1e);', 62, 77, 'this|select|semantic|find|active|li|children||function|parent||wrapper|ul|parents||if|value|text|attr|addClass|div|class|option|selected|html|removeClass|each|on|click|is|replaceWith|data|keyCode|else|size|hidden|first|disabled|eq|index|child|fn|input|clone|appendTo|scrolled|selectedText|next|body|touchstart|false|prop|true|keyup|semanticSelect|wrap|after|ticker|id|hasClass|stopPropagation|change|focus|blur|38|prev|40|last|48|57|65|90|checked|not|semanticSelectReload|remove|jQuery'.split('|'), 0, {}));
/*!
 * jQuery bxSlider - 4.1.2
 * http://bxslider.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('!4(t){8 e={},s={j:"10",2t:"",1r:!0,2Z:!1,1u:30,1P:1s,1q:0,1J:0,31:!1,32:!1,1v:!1,33:!1,1W:!1,2u:30,34:!1,35:!0,2v:"36",2w:!0,2d:37,38:!0,2x:37,39:!0,3a:!0,3b:!1,19:!0,3c:"3O",3d:" / ",2y:1s,2e:1s,2f:1s,6:!0,3e:"3P",3f:"3Q",2g:1s,2h:1s,1Q:!1,3g:"3R",3h:"3S",2z:!1,2A:1s,1l:!1,3i:3T,2B:!0,2i:"14",3j:!1,2C:0,1a:1,11:1,1w:0,1m:0,3k:4(){},3l:4(){},3m:4(){},3n:4(){},3o:4(){},3p:4(){}};t.3U.3q=4(n){F(0==G.K)17 G;F(G.K>1)17 G.1x(4(){t(G).3q(n)}),G;8 o={},r=G;e.1z=G;8 a=t(1R).1g(),l=t(1R).1A(),d=4(){o.2=t.3V({},s,n),o.2.1m=1X(o.2.1m),o.5=r.5(o.2.2t),o.5.K<o.2.1a&&(o.2.1a=o.5.K),o.5.K<o.2.11&&(o.2.11=o.5.K),o.2.31&&(o.2.1J=1n.3r(1n.3W()*o.5.K)),o.7={9:o.2.1J},o.1K=o.2.1a>1||o.2.11>1,o.1K&&(o.2.2v="3s"),o.2D=o.2.1a*o.2.1m+(o.2.1a-1)*o.2.1q,o.2E=o.2.11*o.2.1m+(o.2.11-1)*o.2.1q,o.1Y=!1,o.6={},o.1B=1s,o.1L="1h"==o.2.j?"1d":"1b",o.2j=o.2.35&&"1S"!=o.2.j&&4(){8 t=3X.3Y("15"),e=["3Z","40","41","42"];2k(8 i 43 e)F(1y 0!==t.1M[e[i]])17 o.1Z=e[i].44("45","").46(),o.1L="-"+o.1Z+"-47",!0;17!1}(),"1h"==o.2.j&&(o.2.11=o.2.1a),r.1C("1T",r.1U("1M")),r.5(o.2.2t).1x(4(){t(G).1C("1T",t(G).1U("1M"))}),c()},c=4(){r.48(\'<15 18="B-49"><15 18="B-J"></15></15>\'),o.J=r.2F(),o.2G=t(\'<15 18="B-4a" />\'),o.J.2H(o.2G),r.R({1g:"10"==o.2.j?2I*o.5.K+4b+"%":"1l",12:"2J"}),o.2j&&o.2.1P?r.R("-"+o.1Z+"-2K-3t-4",o.2.1P):o.2.1P||(o.2.1P="4c"),f(),o.J.R({1g:"2I%",4d:"4e",12:"2J"}),o.J.2F().R({4f:p()}),o.2.19||o.J.2F().R({4g:"0 1l 4h"}),o.5.R({"4i":"10"==o.2.j?"1b":"2L",4j:"2L",12:"2J"}),o.5.R("1g",u()),"10"==o.2.j&&o.2.1q>0&&o.5.R("4k",o.2.1q),"1h"==o.2.j&&o.2.1q>0&&o.5.R("4l",o.2.1q),"1S"==o.2.j&&(o.5.R({12:"4m",20:0,3u:"2L"}),o.5.Q(o.2.1J).R({20:o.2.2d,3u:"4n"})),o.6.1z=t(\'<15 18="B-6" />\'),o.2.32&&P(),o.7.1o=o.2.1J==x()-1,o.2.34&&r.4o();8 e=o.5.Q(o.2.1J);"3s"==o.2.2v&&(e=o.5),o.2.1v?o.2.19=!1:(o.2.19&&T(),o.2.6&&C(),o.2.1l&&o.2.1Q&&E(),(o.2.6||o.2.1Q||o.2.19)&&o.J.4p(o.6.1z)),g(e,h)},g=4(e,i){8 s=e.1t("2M, 3v").K;F(0==s)17 i(),1y 0;8 n=0;e.1t("2M, 3v").1x(4(){t(G).4q("3w",4(){++n==s&&i()}).1x(4(){G.4r&&t(G).3w()})})},h=4(){F(o.2.1r&&"1S"!=o.2.j&&!o.2.1v){8 e="1h"==o.2.j?o.2.1a:o.2.11,i=o.5.3x(0,e).1i().1c("B-1i"),s=o.5.3x(-e).1i().1c("B-1i");r.1j(i).2H(s)}o.2G.1D(),S(),"1h"==o.2.j&&(o.2.1W=!0),o.J.1A(v()),r.2N(),o.2.3k(o.7.9),o.2O=!0,o.2.2w&&t(1R).1E("3y",Z),o.2.1l&&o.2.2B&&H(),o.2.1v&&L(),o.2.19&&q(o.2.1J),o.2.6&&W(),o.2.38&&!o.2.1v&&O()},v=4(){8 e=0,s=t();F("1h"==o.2.j||o.2.1W)F(o.1K){8 n=1==o.2.1w?o.7.9:o.7.9*m();2k(s=o.5.Q(n),i=1;i<=o.2.11-1;i++)s=n+i>=o.5.K?s.2P(o.5.Q(i-1)):s.2P(o.5.Q(n+i))}13 s=o.5.Q(o.7.9);13 s=o.5;17"1h"==o.2.j?(s.1x(4(){e+=t(G).2Q()}),o.2.1q>0&&(e+=o.2.1q*(o.2.1a-1))):e=1n.4s.4t(1n,s.4u(4(){17 t(G).2Q(!1)}).4v()),e},p=4(){8 t="2I%";17 o.2.1m>0&&(t="10"==o.2.j?o.2.11*o.2.1m+(o.2.11-1)*o.2.1q:o.2.1m),t},u=4(){8 t=o.2.1m,e=o.J.1g();17 0==o.2.1m||o.2.1m>e&&!o.1K||"1h"==o.2.j?t=e:o.2.11>1&&"10"==o.2.j&&(e>o.2E||e<o.2D&&(t=(e-o.2.1q*(o.2.1a-1))/o.2.1a)),t},f=4(){8 t=1;F("10"==o.2.j&&o.2.1m>0)F(o.J.1g()<o.2D)t=o.2.1a;13 F(o.J.1g()>o.2E)t=o.2.11;13{8 e=o.5.21().1g();t=1n.3r(o.J.1g()/e)}13"1h"==o.2.j&&(t=o.2.1a);17 t},x=4(){8 t=0;F(o.2.1w>0)F(o.2.1r)t=o.5.K/m();13 2k(8 e=0,i=0;e<o.5.K;)++t,e=i+f(),i+=o.2.1w<=f()?o.2.1w:f();13 t=1n.3z(o.5.K/f());17 t},m=4(){17 o.2.1w>0&&o.2.1w<=f()?o.2.1w:f()},S=4(){F(o.5.K>o.2.11&&o.7.1o&&!o.2.1r){F("10"==o.2.j){8 t=o.5.1o(),e=t.12();b(-(e.1b-(o.J.1g()-t.1g())),"1e",0)}13 F("1h"==o.2.j){8 i=o.5.K-o.2.1a,e=o.5.Q(i).12();b(-e.1d,"1e",0)}}13{8 e=o.5.Q(o.7.9*m()).12();o.7.9==x()-1&&(o.7.1o=!0),1y 0!=e&&("10"==o.2.j?b(-e.1b,"1e",0):"1h"==o.2.j&&b(-e.1d,"1e",0))}},b=4(t,e,i,s){F(o.2j){8 n="1h"==o.2.j?"3A(0, "+t+"3B, 0)":"3A("+t+"3B, 0, 0)";r.R("-"+o.1Z+"-2K-4w",i/4x+"s"),"22"==e?(r.R(o.1L,n),r.1E("2l 2m 2n 2o",4(){r.23("2l 2m 2n 2o"),D()})):"1e"==e?r.R(o.1L,n):"1v"==e&&(r.R("-"+o.1Z+"-2K-3t-4","3C"),r.R(o.1L,n),r.1E("2l 2m 2n 2o",4(){r.23("2l 2m 2n 2o"),b(s.2R,"1e",0),N()}))}13{8 a={};a[o.1L]=t,"22"==e?r.2p(a,i,o.2.1P,4(){D()}):"1e"==e?r.R(o.1L,t):"1v"==e&&r.2p(a,1u,"3C",4(){b(s.2R,"1e",0),N()})}},w=4(){2k(8 e="",i=x(),s=0;i>s;s++){8 n="";o.2.2e&&t.4y(o.2.2e)?(n=o.2.2e(s),o.1k.1c("B-4z-19")):(n=s+1,o.1k.1c("B-4A-19")),e+=\'<15 18="B-19-2S"><a 24="" 1C-22-9="\'+s+\'" 18="B-19-4B">\'+n+"</a></15>"}o.1k.25(e)},T=4(){o.2.2f?o.1k=t(o.2.2f):(o.1k=t(\'<15 18="B-19" />\'),o.2.2y?t(o.2.2y).25(o.1k):o.6.1z.1c("B-2T-19").1j(o.1k),w()),o.1k.2U("26","a",I)},C=4(){o.6.14=t(\'<a 18="B-14" 24="">\'+o.2.3e+"</a>"),o.6.1f=t(\'<a 18="B-1f" 24="">\'+o.2.3f+"</a>"),o.6.14.1E("26",y),o.6.1f.1E("26",z),o.2.2g&&t(o.2.2g).1j(o.6.14),o.2.2h&&t(o.2.2h).1j(o.6.1f),o.2.2g||o.2.2h||(o.6.2V=t(\'<15 18="B-6-3D" />\'),o.6.2V.1j(o.6.1f).1j(o.6.14),o.6.1z.1c("B-2T-6-3D").1j(o.6.2V))},E=4(){o.6.16=t(\'<15 18="B-6-1l-2S"><a 18="B-16" 24="">\'+o.2.3g+"</a></15>"),o.6.1N=t(\'<15 18="B-6-1l-2S"><a 18="B-1N" 24="">\'+o.2.3h+"</a></15>"),o.6.1p=t(\'<15 18="B-6-1l" />\'),o.6.1p.2U("26",".B-16",k),o.6.1p.2U("26",".B-1N",M),o.2.2z?o.6.1p.1j(o.6.16):o.6.1p.1j(o.6.16).1j(o.6.1N),o.2.2A?t(o.2.2A).25(o.6.1p):o.6.1z.1c("B-2T-6-1l").1j(o.6.1p),A(o.2.2B?"1N":"16")},P=4(){o.5.1x(4(){8 e=t(G).1t("2M:21").1U("4C");1y 0!=e&&(""+e).K&&t(G).1j(\'<15 18="B-3E"><3F>\'+e+"</3F></15>")})},y=4(t){o.2.1l&&r.1F(),r.27(),t.1G()},z=4(t){o.2.1l&&r.1F(),r.28(),t.1G()},k=4(t){r.29(),t.1G()},M=4(t){r.1F(),t.1G()},I=4(e){o.2.1l&&r.1F();8 i=t(e.4D),s=1X(i.1U("1C-22-9"));s!=o.7.9&&r.2q(s),e.1G()},q=4(e){8 i=o.5.K;17"4E"==o.2.3c?(o.2.11>1&&(i=1n.3z(o.5.K/o.2.11)),o.1k.25(e+1+o.2.3d+i),1y 0):(o.1k.1t("a").1V("7"),o.1k.1x(4(i,s){t(s).1t("a").Q(e).1c("7")}),1y 0)},D=4(){F(o.2.1r){8 t="";0==o.7.9?t=o.5.Q(0).12():o.7.9==x()-1&&o.1K?t=o.5.Q((x()-1)*m()).12():o.7.9==o.5.K-1&&(t=o.5.Q(o.5.K-1).12()),t&&("10"==o.2.j?b(-t.1b,"1e",0):"1h"==o.2.j&&b(-t.1d,"1e",0))}o.1Y=!1,o.2.3m(o.5.Q(o.7.9),o.2a,o.7.9)},A=4(t){o.2.2z?o.6.1p.25(o.6[t]):(o.6.1p.1t("a").1V("7"),o.6.1p.1t("a:4F(.B-"+t+")").1c("7"))},W=4(){1==x()?(o.6.1f.1c("1H"),o.6.14.1c("1H")):!o.2.1r&&o.2.2Z&&(0==o.7.9?(o.6.1f.1c("1H"),o.6.14.1V("1H")):o.7.9==x()-1?(o.6.14.1c("1H"),o.6.1f.1V("1H")):(o.6.1f.1V("1H"),o.6.14.1V("1H")))},H=4(){o.2.2C>0?4G(r.29,o.2.2C):r.29(),o.2.3j&&r.3G(4(){o.1B&&(r.1F(!0),o.2W=!0)},4(){o.2W&&(r.29(!0),o.2W=1s)})},L=4(){8 e=0;F("14"==o.2.2i)r.1j(o.5.1i().1c("B-1i"));13{r.2H(o.5.1i().1c("B-1i"));8 i=o.5.21().12();e="10"==o.2.j?-i.1b:-i.1d}b(e,"1e",0),o.2.19=!1,o.2.6=!1,o.2.1Q=!1,o.2.33&&!o.2j&&o.J.3G(4(){r.1N()},4(){8 e=0;o.5.1x(4(){e+="10"==o.2.j?t(G).2X(!0):t(G).2Q(!0)});8 i=o.2.1u/e,s="10"==o.2.j?"1b":"1d",n=i*(e-1n.2b(1X(r.R(s))));N(n)}),N()},N=4(t){1u=t?t:o.2.1u;8 e={1b:0,1d:0},i={1b:0,1d:0};"14"==o.2.2i?e=r.1t(".B-1i").21().12():i=o.5.21().12();8 s="10"==o.2.j?-e.1b:-e.1d,n="10"==o.2.j?-i.1b:-i.1d,a={2R:n};b(s,"1v",1u,a)},O=4(){o.U={16:{x:0,y:0},1O:{x:0,y:0}},o.J.1E("4H",X)},X=4(t){F(o.1Y)t.1G();13{o.U.2c=r.12();8 e=t.2Y;o.U.16.x=e.1I[0].2r,o.U.16.y=e.1I[0].2s,o.J.1E("3H",Y),o.J.1E("3I",V)}},Y=4(t){8 e=t.2Y,i=1n.2b(e.1I[0].2r-o.U.16.x),s=1n.2b(e.1I[0].2s-o.U.16.y);F(3*i>s&&o.2.3a?t.1G():3*s>i&&o.2.3b&&t.1G(),"1S"!=o.2.j&&o.2.39){8 n=0;F("10"==o.2.j){8 r=e.1I[0].2r-o.U.16.x;n=o.U.2c.1b+r}13{8 r=e.1I[0].2s-o.U.16.y;n=o.U.2c.1d+r}b(n,"1e",0)}},V=4(t){o.J.23("3H",Y);8 e=t.2Y,i=0;F(o.U.1O.x=e.1I[0].2r,o.U.1O.y=e.1I[0].2s,"1S"==o.2.j){8 s=1n.2b(o.U.16.x-o.U.1O.x);s>=o.2.2x&&(o.U.16.x>o.U.1O.x?r.27():r.28(),r.1F())}13{8 s=0;"10"==o.2.j?(s=o.U.1O.x-o.U.16.x,i=o.U.2c.1b):(s=o.U.1O.y-o.U.16.y,i=o.U.2c.1d),!o.2.1r&&(0==o.7.9&&s>0||o.7.1o&&0>s)?b(i,"1e",3J):1n.2b(s)>=o.2.2x?(0>s?r.27():r.28(),r.1F()):b(i,"1e",3J)}o.J.23("3I",V)},Z=4(){8 e=t(1R).1g(),i=t(1R).1A();(a!=e||l!=i)&&(a=e,l=i,r.2N(),o.2.3p.4I(r,o.7.9))};17 r.2q=4(e,i){F(!o.1Y&&o.7.9!=e)F(o.1Y=!0,o.2a=o.7.9,o.7.9=0>e?x()-1:e>=x()?0:e,o.2.3l(o.5.Q(o.7.9),o.2a,o.7.9),"14"==i?o.2.3n(o.5.Q(o.7.9),o.2a,o.7.9):"1f"==i&&o.2.3o(o.5.Q(o.7.9),o.2a,o.7.9),o.7.1o=o.7.9>=x()-1,o.2.19&&q(o.7.9),o.2.6&&W(),"1S"==o.2.j)o.2.1W&&o.J.1A()!=v()&&o.J.2p({1A:v()},o.2.2u),o.5.4J(":36").4K(o.2.1u).R({20:0}),o.5.Q(o.7.9).R("20",o.2.2d+1).4L(o.2.1u,4(){t(G).R("20",o.2.2d),D()});13{o.2.1W&&o.J.1A()!=v()&&o.J.2p({1A:v()},o.2.2u);8 s=0,n={1b:0,1d:0};F(!o.2.1r&&o.1K&&o.7.1o)F("10"==o.2.j){8 a=o.5.Q(o.5.K-1);n=a.12(),s=o.J.1g()-a.2X()}13{8 l=o.5.K-o.2.1a;n=o.5.Q(l).12()}13 F(o.1K&&o.7.1o&&"1f"==i){8 d=1==o.2.1w?o.2.11-m():(x()-1)*m()-(o.5.K-o.2.11),a=r.5(".B-1i").Q(d);n=a.12()}13 F("14"==i&&0==o.7.9)n=r.1t("> .B-1i").Q(o.2.11).12(),o.7.1o=!1;13 F(e>=0){8 c=e*m();n=o.5.Q(c).12()}F("4M"!=4N n){8 g="10"==o.2.j?-(n.1b-s):-n.1d;b(g,"22",o.2.1u)}}},r.27=4(){F(o.2.1r||!o.7.1o){8 t=1X(o.7.9)+1;r.2q(t,"14")}},r.28=4(){F(o.2.1r||0!=o.7.9){8 t=1X(o.7.9)-1;r.2q(t,"1f")}},r.29=4(t){o.1B||(o.1B=4O(4(){"14"==o.2.2i?r.27():r.28()},o.2.3i),o.2.1Q&&1!=t&&A("1N"))},r.1F=4(t){o.1B&&(3K(o.1B),o.1B=1s,o.2.1Q&&1!=t&&A("16"))},r.4P=4(){17 o.7.9},r.4Q=4(){17 o.5.Q(o.7.9)},r.4R=4(){17 o.5.K},r.2N=4(){o.5.2P(r.1t(".B-1i")).2X(u()),o.J.R("1A",v()),o.2.1v||S(),o.7.1o&&(o.7.9=x()-1),o.7.9>=x()&&(o.7.1o=!0),o.2.19&&!o.2.2f&&(w(),q(o.7.9))},r.3L=4(){o.2O&&(o.2O=!1,t(".B-1i",G).1D(),o.5.1x(4(){1y 0!=t(G).1C("1T")?t(G).1U("1M",t(G).1C("1T")):t(G).3M("1M")}),1y 0!=t(G).1C("1T")?G.1U("1M",t(G).1C("1T")):t(G).3M("1M"),t(G).3N().3N(),o.6.1z&&o.6.1z.1D(),o.6.14&&o.6.14.1D(),o.6.1f&&o.6.1f.1D(),o.1k&&o.2.6&&o.1k.1D(),t(".B-3E",G).1D(),o.6.1p&&o.6.1p.1D(),3K(o.1B),o.2.2w&&t(1R).23("3y",Z))},r.4S=4(t){1y 0!=t&&(n=t),r.3L(),d()},d(),G}}(4T);', 62, 304, '||settings||function|children|controls|active|var|index||||||||||mode||||||||||||||||||bx||||if|this|||viewport|length||||||eq|css|||touch||||||horizontal|maxSlides|position|else|next|div|start|return|class|pager|minSlides|left|addClass|top|reset|prev|width|vertical|clone|append|pagerEl|auto|slideWidth|Math|last|autoEl|slideMargin|infiniteLoop|null|find|speed|ticker|moveSlides|each|void|el|height|interval|data|remove|bind|stopAuto|preventDefault|disabled|changedTouches|startSlide|carousel|animProp|style|stop|end|easing|autoControls|window|fade|origStyle|attr|removeClass|adaptiveHeight|parseInt|working|cssPrefix|zIndex|first|slide|unbind|href|html|click|goToNextSlide|goToPrevSlide|startAuto|oldIndex|abs|originalPos|slideZIndex|buildPager|pagerCustom|nextSelector|prevSelector|autoDirection|usingCSS|for|transitionend|webkitTransitionEnd|oTransitionEnd|MSTransitionEnd|animate|goToSlide|pageX|pageY|slideSelector|adaptiveHeightSpeed|preloadImages|responsive|swipeThreshold|pagerSelector|autoControlsCombine|autoControlsSelector|autoStart|autoDelay|minThreshold|maxThreshold|parent|loader|prepend|100|relative|transition|none|img|redrawSlider|initialized|add|outerHeight|resetValue|item|has|on|directionEl|autoPaused|outerWidth|originalEvent|hideControlOnEnd|500|randomStart|captions|tickerHover|video|useCSS|visible|50|touchEnabled|oneToOneTouch|preventDefaultSwipeX|preventDefaultSwipeY|pagerType|pagerShortSeparator|nextText|prevText|startText|stopText|pause|autoHover|onSliderLoad|onSlideBefore|onSlideAfter|onSlideNext|onSlidePrev|onSliderResize|bxSlider|floor|all|timing|display|iframe|load|slice|resize|ceil|translate3d|px|linear|direction|caption|span|hover|touchmove|touchend|200|clearInterval|destroySlider|removeAttr|unwrap|full|Next|Prev|Start|Stop|4e3|fn|extend|random|document|createElement|WebkitPerspective|MozPerspective|OPerspective|msPerspective|in|replace|Perspective|toLowerCase|transform|wrap|wrapper|loading|215|swing|overflow|hidden|maxWidth|margin|0px|float|listStyle|marginRight|marginBottom|absolute|block|fitVids|after|one|complete|max|apply|map|get|duration|1e3|isFunction|custom|default|link|title|currentTarget|short|not|setTimeout|touchstart|call|filter|fadeOut|fadeIn|undefined|typeof|setInterval|getCurrentSlide|getCurrentSlideElement|getSlideCount|reloadSlider|jQuery'.split('|'), 0, {}));
/*!
 * MouseWheel - 3.0.6
 * http://brandonaaron.net
 */
(function(d) {
    function e(a) {
        var b = a || window.event,
            c = [].slice.call(arguments, 1),
            f = 0,
            e = 0,
            g = 0,
            a = d.event.fix(b);
        a.type = "mousewheel";
        b.wheelDelta && (f = b.wheelDelta / 120);
        b.detail && (f = -b.detail / 3);
        g = f;
        b.axis !== void 0 && b.axis === b.HORIZONTAL_AXIS && (g = 0, e = -1 * f);
        b.wheelDeltaY !== void 0 && (g = b.wheelDeltaY / 120);
        b.wheelDeltaX !== void 0 && (e = -1 * b.wheelDeltaX / 120);
        c.unshift(a, f, e, g);
        return (d.event.dispatch || d.event.handle).apply(this, c)
    }
    var c = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks)
        for (var h = c.length; h;) d.event.fixHooks[c[--h]] = d.event.mouseHooks;
    d.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = c.length; a;) this.addEventListener(c[--a], e, false);
            else this.onmousewheel = e
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = c.length; a;) this.removeEventListener(c[--a], e, false);
            else this.onmousewheel = null
        }
    };
    d.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);
/*!
 * FancyBox - 2.1.5
 * http://fancyapps.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(9(g,h,jQuery,j){"6h 6i";u H=jQuery("1F"),W=jQuery(g),D=jQuery(h),F=jQuery.l=9(){F.2V.45(m,46)},3w=6j.6k.3x(/6l/i),2B=B,1s=h.6m!==j,2p=9(a){C a&&a.6n&&a 6o jQuery},1G=9(a){C a&&jQuery.n(a)==="6p"},28=9(a){C 1G(a)&&a.6q(\'%\')>0},4U=9(a){C(a&&!(a.2q.2C&&a.2q.2C===\'47\')&&((a.48&&a.6r>a.48)||(a.49&&a.6s>a.49)))},G=9(a,b){u c=6t(a,10)||0;4(b&&28(a)){c=F.2D()[b]/1t*c}C Z.6u(c)},1u=9(a,b){C G(a,b)+\'2E\'};jQuery.T(F,{6v:\'2.1.5\',1H:{1c:15,E:20,6:6w,k:6x,17:1t,18:1t,1d:4a,1e:4a,4b:1,4V:r,1I:t,29:t,4W:r,4c:!1s,2W:r,2X:t,3y:0.5,3z:0.5,1a:\'1v\',4X:\'\',4d:r,2Y:r,2r:t,4e:t,4f:r,4g:t,4Y:6y,2F:3,4Z:t,2G:r,2s:{6z:\'1F\',6A:{\'X-6B\':r}},N:{1a:\'1v\',2F:r},2t:{6C:\'6D\',6E:\'r\',6F:\'6G\'},1w:{1n:{13:\'12\',34:\'2H\',39:\'12\',40:\'2H\'},1J:{8:\'2u\',33:\'2I\',37:\'2u\',38:\'2I\'},1K:[27],3A:[32],51:[70]},11:{1n:\'12\',1J:\'2u\'},52:r,1f:0,n:B,z:B,A:B,L:B,2a:{q:\'<M 1g="l-q" 6H="-1"><M 1g="l-O"><M 1g="l-1X"><M 1g="l-J"></M></M></M></M>\',1L:\'<4h 1g="l-1L" 2J="{z}" 6I="" />\',N:\'<N 4i="l-53{4j}" 4k="l-53{4j}" 1g="l-N" 6J="0" 6K="0" 6L="0" 6M 6N 6O\'+(3w?\' 6P="r"\':\'\')+\'></N>\',3B:\'<p 1g="l-3B">6Q 6R A 6S 6T 6U.<6V/>6W 4l 6X 6Y.</p>\',2Y:\'<a L="6Z" 1g="l-1Y l-1K" z="4m:;"></a>\',1n:\'<a L="71" 1g="l-2Z l-1n" z="4m:;"><2K></2K></a>\',1J:\'<a L="72" 1g="l-2Z l-1J" z="4m:;"><2K></2K></a>\'},54:\'4n\',55:3C,56:\'3D\',57:r,58:\'59\',5a:\'4n\',5b:3C,5c:\'3D\',5d:r,5e:\'5f\',5g:\'1x\',5h:3C,5i:\'3D\',5j:\'5k\',5l:\'1x\',5m:3C,5n:\'3D\',4o:\'5o\',1M:{K:r,L:r},4p:jQuery.2b,4q:jQuery.2b,5p:jQuery.2b,30:jQuery.2b,5q:jQuery.2b,5r:jQuery.2b,4r:jQuery.2b,4s:jQuery.2b},V:{},1S:{},1N:B,P:B,7:B,1y:t,2c:t,2L:t,q:B,O:B,1X:B,J:B,1o:{4t:B,1y:t},31:B,35:B,36:{},1M:{},2V:9(c,d){4(!c){C}4(!jQuery.73(d)){d={}}4(t===F.1K(r)){C}4(!jQuery.74(c)){c=2p(c)?jQuery(c).5s():[c]}jQuery.3a(c,9(i,a){u b={},z,L,A,n,S,3E,1p;4(jQuery.n(a)==="4u"){4(a.75){a=jQuery(a)}4(2p(a)){b={z:a.1z(\'l-z\')||a.2M(\'z\'),L:a.1z(\'l-L\')||a.2M(\'L\'),3b:r,2v:a};4(jQuery.5t){jQuery.T(r,b,a.5t())}}I{b=a}}z=d.z||b.z||(1G(a)?a:B);L=d.L!==j?d.L:b.L||\'\';A=d.A||b.A;n=A?\'1F\':(d.n||b.n);4(!n&&b.3b){n=a.1z(\'l-n\');4(!n){S=a.1T(\'1g\').3x(/l\\.(\\w+)/);n=S?S[1]:B}}4(1G(z)){4(!n){4(F.5u(z)){n=\'1L\'}I 4(F.5v(z)){n=\'2t\'}I 4(z.76(0)===\'#\'){n=\'3c\'}I 4(1G(a)){n=\'1F\';A=a}}4(n===\'2s\'){3E=z.77(/\\s+/,2);z=3E.5w();1p=3E.5w()}}4(!A){4(n===\'3c\'){4(z){A=jQuery(1G(z)?z.3F(/.*(?=#[^\\s]+jQuery)/,\'\'):z)}I 4(b.3b){A=a}}I 4(n===\'1F\'){A=z}I 4(!n&&!z&&b.3b){n=\'3c\';A=a}}jQuery.T(b,{z:z,n:n,A:A,L:L,1p:1p});c[i]=b});F.1S=jQuery.T(r,{},F.1H,d);4(d.1w!==j){F.1S.1w=d.1w?jQuery.T({},F.1H.1w,d.1w):t}F.V=c;C F.4v(F.1S.1f)},3d:9(){u a=F.P;4(!a||t===F.Q(\'4p\')){C}F.3e();4(F.31){F.31.5x()}F.31=B;4(F.35){F.35.3G=F.35.3H=B}4(a.q){a.q.1O(r,r).Q(\'2d\').1A()}F.P=B;4(!F.7){F.3I(a)}},1K:9(a){F.3d();4(t===F.Q(\'4r\')){C}F.4w();4(!F.1y){C}4(!F.2c||a===r){jQuery(\'.l-q\').1O(r).Q(\'2d\').1A();F.3I()}I{F.2c=F.2L=t;F.3J=r;jQuery(\'.l-1Y, .l-2Z\').1A();F.q.1O(r,r).1Z(\'l-4x\');F.36[F.7.5e]()}},3A:9(a){u b=9(){5y(F.1o.4t)},4y=9(){b();4(F.7&&F.1o.1y){F.1o.4t=5z(F.1n,F.7.4Y)}},1O=9(){b();D.2e(\'.1o\');F.1o.1y=t;F.Q(\'78\')},1U=9(){4(F.7&&(F.7.2G||F.7.1f<F.V.1b-1)){F.1o.1y=r;D.1h({\'4p.1o 4r.1o\':1O,\'3K.1o\':4y,\'4q.1o\':b});4y();F.Q(\'79\')}};4(a===r||(!F.1o.1y&&a!==t)){1U()}I{1O()}},1n:9(a){u b=F.7;4(b){4(!1G(a)){a=b.11.1n}F.3f(b.1f+1,a,\'1n\')}},1J:9(a){u b=F.7;4(b){4(!1G(a)){a=b.11.1J}F.3f(b.1f-1,a,\'1J\')}},3f:9(a,b,c){u d=F.7;4(!d){C}a=G(a);F.11=b||d.11[(a>=d.1f?\'1n\':\'1J\')];F.3g=c||\'3f\';4(d.2G){4(a<0){a=d.V.1b+(a%d.V.1b)}a=a%d.V.1b}4(d.V[a]!==j){F.3d();F.4v(a)}},4z:9(e,a){u b=F.7,q=b?b.q:B,Y;4(q){Y=F.5A(a);4(e&&e.n===\'3h\'){5B Y.1V;q.1O(r,r).3i(Y,3L)}I{q.14(Y);b.Y=jQuery.T({},b.5C,Y)}}},21:9(e){u b=(e&&e.n),3M=!b||b===\'5D\';4(3M){5y(2B);2B=B}4(!F.2c||2B){C}2B=5z(9(){u a=F.7;4(!a||F.3J){C}F.q.1Z(\'l-2w\');4(3M||b===\'4A\'||(b===\'3N\'&&a.4W)){F.4B()}4(!(b===\'3h\'&&a.2N)){F.4z(e)}F.Q(\'3K\');2B=B},(3M&&!1s?0:7a))},51:9(a){4(F.2c){F.7.2W=jQuery.n(a)==="7b"?a:!F.7.2W;4(1s){F.q.7c(\'2q\').22(\'l-2w\');F.Q(\'3K\')}F.21()}},3e:9(){D.2e(\'.3O\');jQuery(\'#l-3O\').1A()},3P:9(){u a,U;F.3e();a=jQuery(\'<M 4i="l-3O"><M></M></M>\').1P(F.3d).1B(\'1C\');D.1h(\'5E.3O\',9(e){4((e.5F||e.5G)===27){e.2x();F.3d()}});4(!F.1H.R){U=F.2D();a.14({1V:\'5H\',1j:(U.h*0.5)+U.y,12:(U.w*0.5)+U.x})}},2D:9(){u a=(F.7&&F.7.2f)||t,S={x:W.3j(),y:W.3k()};4(a){S.w=a[0].48;S.h=a[0].49}I{S.w=1s&&g.3Q?g.3Q:W.6();S.h=1s&&g.5I?g.5I:W.k()}C S},4w:9(){4(F.q&&2p(F.q)){F.q.2e(\'.16\')}D.2e(\'.16\');W.2e(\'.16\')},5J:9(){u f=F.7,1w;4(!f){C}W.1h(\'5D.16\'+(1s?\'\':\' 3N.16\')+(f.4c&&!f.2f?\' 3h.16\':\'\'),F.21);1w=f.1w;4(1w){D.1h(\'5E.16\',9(e){u b=e.5F||e.5G,1i=e.1i||e.7d;4(b===27&&F.P){C t}4(!e.5K&&!e.5L&&!e.5M&&!e.5N&&!(1i&&(1i.n||jQuery(1i).23(\'[7e]\')))){jQuery.3a(1w,9(i,a){4(f.V.1b>1&&a[b]!==j){F[i](a[b]);e.2x();C t}4(jQuery.7f(b,a)>-1){F[i]();e.2x();C t}})}})}4(jQuery.5O.5P&&f.4f){F.q.1h(\'5P.16\',9(e,a,b,c){u d=e.1i||B,1k=jQuery(d),3R=t;5Q(1k.1b){4(3R||1k.23(\'.l-O\')||1k.23(\'.l-q\')){24}3R=4U(1k[0]);1k=jQuery(1k).1k()}4(a!==0&&!3R){4(F.V.1b>1&&!f.2N){4(c>0||b>0){F.1J(c>0?\'2I\':\'12\')}I 4(c<0||b<0){F.1n(c<0?\'2H\':\'2u\')}e.2x()}}})}},Q:9(c,o){u d,1D=o||F.P||F.7;4(!1D){C}4(jQuery.4C(1D[c])){d=1D[c].45(1D,7g.7h.7i.5R(46,1))}4(d===t){C t}4(1D.1M){jQuery.3a(1D.1M,9(a,b){4(b&&F.1M[a]&&jQuery.4C(F.1M[a][c])){F.1M[a][c](jQuery.T(r,{},F.1M[a].1H,b),1D)}})}D.Q(c)},5u:9(a){C 1G(a)&&a.3x(/(^1z:1L\\/.*,)|(\\.(7j(e|g|7k)|7l|7m|7n|7o|7p)((\\?|#).*)?jQuery)/i)},5v:9(a){C 1G(a)&&a.3x(/\\.(2t)((\\?|#).*)?jQuery/i)},4v:9(a){u b={},1D,z,n,E,1c;a=G(a);1D=F.V[a]||B;4(!1D){C t}b=jQuery.T(r,{},F.1S,1D);E=b.E;1c=b.1c;4(jQuery.n(E)===\'5S\'){b.E=[E,E,E,E]}4(jQuery.n(1c)===\'5S\'){b.1c=[1c,1c,1c,1c]}4(b.4Z){jQuery.T(r,b,{2Y:t,2r:t,4e:t,4d:t,4f:t,1w:B,1M:{K:{2r:t}}})}4(b.4V){b.29=b.1I=r}4(b.6===\'1v\'){b.29=r}4(b.k===\'1v\'){b.1I=r}b.V=F.V;b.1f=a;F.P=b;4(t===F.Q(\'4q\')){F.P=B;C}n=b.n;z=b.z;4(!n){F.P=B;4(F.7&&F.3g&&F.3g!==\'3f\'){F.7.1f=a;C F[F.3g](F.11)}C t}F.1y=r;4(n===\'1L\'||n===\'2t\'){b.1I=b.29=t;b.1a=\'4D\'}4(n===\'1L\'){b.2X=r}4(n===\'N\'&&1s){b.1a=\'3h\'}b.q=jQuery(b.2a.q).22(\'l-\'+(1s?\'7q\':\'7r\')+\' l-n-\'+n+\' l-2w \'+b.4X).1B(b.1k||\'1C\');jQuery.T(b,{O:jQuery(\'.l-O\',b.q),1X:jQuery(\'.l-1X\',b.q),J:jQuery(\'.l-J\',b.q)});jQuery.3a(["7s","7t","7u","7v"],9(i,v){b.O.14(\'1c\'+v,1u(b.1c[i]))});F.Q(\'5T\');4(n===\'3c\'||n===\'1F\'){4(!b.A||!b.A.1b){C F.3l(\'A\')}}I 4(!z){C F.3l(\'z\')}4(n===\'1L\'){F.5U()}I 4(n===\'2s\'){F.5V()}I 4(n===\'N\'){F.5W()}I{F.2y()}},3l:9(a){jQuery.T(F.P,{n:\'1F\',29:r,1I:r,17:0,18:0,1a:\'5X\',7w:a,A:F.P.2a.3B});F.2y()},5U:9(){u a=F.35=4E 5Y();a.3G=9(){m.3G=m.3H=B;F.P.6=m.6/F.1S.4b;F.P.k=m.k/F.1S.4b;F.2y()};a.3H=9(){m.3G=m.3H=B;F.3l(\'1L\')};a.2J=F.P.z;4(a.3m!==r){F.3P()}},5V:9(){u c=F.P;F.3P();F.31=jQuery.2s(jQuery.T({},c.2s,{7x:c.z,3B:9(a,b){4(F.P&&b!==\'5x\'){F.3l(\'2s\',a)}I{F.3e()}},5Z:9(a,b){4(b===\'5Z\'){c.A=a;F.2y()}}}))},5W:9(){u a=F.P,N=jQuery(a.2a.N.3F(/\\{4j\\}/g,4E 7y().7z())).2M(\'1a\',1s?\'1v\':a.N.1a).2M(\'2J\',a.z);jQuery(a.q).1h(\'2d\',9(){4l{jQuery(m).2O(\'N\').3S().2M(\'2J\',\'//7A:7B\').4F().7C()}60(e){}});4(a.N.2F){F.3P();N.7D(\'4A\',9(){jQuery(m).1z(\'4G\',1);4(!1s){jQuery(m).1h(\'4A.16\',F.21)}jQuery(m).7E(\'.l-q\').6(\'1t%\').1Z(\'l-2w\').4H();F.2y()})}a.A=N.1B(a.J);4(!a.N.2F){F.2y()}},61:9(){u a=F.V,7=F.7,4I=a.1b,62=7.2F?Z.2g(7.2F,4I-1):0,1Y,i;7F(i=1;i<=62;i+=1){1Y=a[(7.1f+i)%4I];4(1Y.n===\'1L\'&&1Y.z){4E 5Y().2J=1Y.z}}},2y:9(){u c=F.P,1N=F.7,2z=\'l-2z\',7,A,n,1a,z,2P;F.3e();4(!c||F.1y===t){C}4(t===F.Q(\'5p\',c,1N)){c.q.1O(r).Q(\'2d\').1A();F.P=B;C}4(1N){F.Q(\'5r\',1N);1N.q.1O(r).1Z(\'l-4x\').2O(\'.l-1Y, .l-2Z\').1A()}F.4w();7=c;A=c.A;n=c.n;1a=c.1a;jQuery.T(F,{q:7.q,O:7.O,1X:7.1X,J:7.J,7:7,1N:1N});z=7.z;63(n){2h\'3c\':2h\'2s\':2h\'1F\':4(7.1p){A=jQuery(\'<M>\').1F(A).2O(7.1p)}I 4(2p(A)){4(!A.1z(2z)){A.1z(2z,jQuery(\'<M 1g="\'+2z+\'"></M>\').7G(A).3S())}A=A.4H().7H();7.q.1h(\'2d\',9(){4(jQuery(m).2O(A).1b){A.3S().7I(A.1z(2z)).1z(2z,t)}})}24;2h\'1L\':A=7.2a.1L.3F(\'{z}\',z);24;2h\'2t\':A=\'<4u 4i="l-2t" 7J="7K:7L-7M-7N-7O-7P" 6="1t%" k="1t%"><3T 4k="7Q" 2i="\'+z+\'"></3T>\';2P=\'\';jQuery.3a(7.2t,9(a,b){A+=\'<3T 4k="\'+a+\'" 2i="\'+b+\'"></3T>\';2P+=\' \'+a+\'="\'+b+\'"\'});A+=\'<2P 2J="\'+z+\'" n="7R/x-7S-7T" 6="1t%" k="1t%"\'+2P+\'></2P></4u>\';24}4(!(2p(A)&&A.1k().23(7.J))){7.J.64(A)}F.Q(\'30\');7.J.14(\'2C\',1a===\'7U\'?\'3h\':(1a===\'5X\'?\'47\':1a));F.4B();F.4z();F.2c=t;F.P=B;F.5J();4(!F.2L){jQuery(\'.l-q\').65(7.q).1O(r).Q(\'2d\').1A()}I 4(1N.4o){F.36[1N.4o]()}F.36[F.2L?7.5j:7.58]();F.61()},4B:9(){u a=F.2D(),66=0,2N=t,3n=t,q=F.q,O=F.O,J=F.J,7=F.7,6=7.6,k=7.k,17=7.17,18=7.18,1d=7.1d,1e=7.1e,1a=7.1a,3o=7.52?7.3p:0,E=7.E,4J=G(E[1]+E[3]),4K=G(E[0]+E[2]),1l,1W,2Q,2R,1Q,1E,3U,3V,25,2j,26,2S,3q,N,1C;q.67(O).67(J).6(\'1v\').k(\'1v\').1Z(\'l-2w\');1l=G(O.68(r)-O.6());1W=G(O.3W(r)-O.k());2Q=4J+1l;2R=4K+1W;1Q=28(6)?(a.w-2Q)*G(6)/1t:6;1E=28(k)?(a.h-2R)*G(k)/1t:k;4(7.n===\'N\'){N=7.A;4(7.1I&&N.1z(\'4G\')===1){4l{4(N[0].7V.69.7W){J.6(1Q).k(4a);1C=N.7X().2O(\'1C\');4(3o){1C.14(\'2C-x\',\'47\')}1E=1C.3W(r)}}60(e){}}}I 4(7.29||7.1I){J.22(\'l-2w\');4(!7.29){J.6(1Q)}4(!7.1I){J.k(1E)}4(7.29){1Q=J.6()}4(7.1I){1E=J.k()}J.1Z(\'l-2w\')}6=G(1Q);k=G(1E);25=1Q/1E;17=G(28(17)?G(17,\'w\')-2Q:17);1d=G(28(1d)?G(1d,\'w\')-2Q:1d);18=G(28(18)?G(18,\'h\')-2R:18);1e=G(28(1e)?G(1e,\'h\')-2R:1e);3U=1d;3V=1e;4(7.2W){1d=Z.2g(a.w-2Q,1d);1e=Z.2g(a.h-2R,1e)}2S=a.w-4J;3q=a.h-4K;4(7.2X){4(6>1d){6=1d;k=G(6/25)}4(k>1e){k=1e;6=G(k*25)}4(6<17){6=17;k=G(6/25)}4(k<18){k=18;6=G(k*25)}}I{6=Z.2k(17,Z.2g(6,1d));4(7.1I&&7.n!==\'N\'){J.6(6);k=J.k()}k=Z.2k(18,Z.2g(k,1e))}4(7.2W){J.6(6).k(k);q.6(6+1l);2j=q.6();26=q.k();4(7.2X){5Q((2j>2S||26>3q)&&6>17&&k>18){4(66++>19){24}k=Z.2k(18,Z.2g(1e,k-10));6=G(k*25);4(6<17){6=17;k=G(6/25)}4(6>1d){6=1d;k=G(6/25)}J.6(6).k(k);q.6(6+1l);2j=q.6();26=q.k()}}I{6=Z.2k(17,Z.2g(6,6-(2j-2S)));k=Z.2k(18,Z.2g(k,k-(26-3q)))}}4(3o&&1a===\'1v\'&&k<1E&&(6+1l+3o)<2S){6+=3o}J.6(6).k(k);q.6(6+1l);2j=q.6();26=q.k();2N=(2j>2S||26>3q)&&6>17&&k>18;3n=7.2X?(6<3U&&k<3V&&6<1Q&&k<1E):((6<3U||k<3V)&&(6<1Q||k<1E));jQuery.T(7,{5C:{6:1u(2j),k:1u(26)},1Q:1Q,1E:1E,2N:2N,3n:3n,1l:1l,1W:1W,3r:26-O.3W(r),3X:O.k()-k});4(!N&&7.1I&&k>18&&k<1e&&!3n){J.k(\'1v\')}},5A:9(a){u b=F.7,U=F.2D(),E=b.E,6=F.q.6()+E[1]+E[3],k=F.q.k()+E[0]+E[2],S={1V:\'5H\',1j:E[0],12:E[3]};4(b.4c&&b.R&&!a&&k<=U.h&&6<=U.w){S.1V=\'R\'}I 4(!b.2f){S.1j+=U.y;S.12+=U.x}S.1j=1u(Z.2k(S.1j,S.1j+((U.h-k)*b.3y)));S.12=1u(Z.2k(S.12,S.12+((U.w-6)*b.3z)));C S},3Y:9(){u a=F.7;4(!a){C}F.2c=F.2L=r;F.q.14(\'2C\',\'4D\').22(\'l-4x\');F.21();4(a.2r||(a.4e&&F.V.1b>1)){F.J.14(\'7Y\',\'7Z\').1h(\'1P.16\',9(e){4(!jQuery(e.1i).23(\'a\')&&!jQuery(e.1i).1k().23(\'a\')){e.2x();F[a.2r?\'1K\':\'1n\']()}})}4(a.2Y){jQuery(a.2a.2Y).1B(F.O).1h(\'1P.16\',9(e){e.2x();F.1K()})}4(a.4d&&F.V.1b>1){4(a.2G||a.1f>0){jQuery(a.2a.1J).1B(F.1X).1h(\'1P.16\',F.1J)}4(a.2G||a.1f<F.V.1b-1){jQuery(a.2a.1n).1B(F.1X).1h(\'1P.16\',F.1n)}}F.Q(\'5q\');4(!a.2G&&a.1f===a.V.1b-1){F.3A(t)}I 4(F.1S.4g&&!F.1o.1y){F.1S.4g=t;F.3A()}},3I:9(a){a=a||F.7;jQuery(\'.l-q\').Q(\'2d\').1A();jQuery.T(F,{V:{},1S:{},3g:t,7:B,1y:t,2L:t,2c:t,3J:t,q:B,O:B,1X:B,J:B});F.Q(\'4s\',a)}});F.36={4L:9(){u a=F.7,2v=a.2v,1R=a.1R,Y={},6=50,k=50,1W=a.1W,1l=a.1l,U=F.2D();4(!1R&&a.3b&&2v.23(\':4D\')){1R=2v.2O(\'4h:80\');4(!1R.1b){1R=2v}}4(2p(1R)){Y=1R.81();4(1R.23(\'4h\')){6=1R.68();k=1R.3W()}}I{Y.1j=U.y+(U.h-k)*a.3y;Y.12=U.x+(U.w-6)*a.3z}4(F.q.14(\'1V\')===\'R\'||a.2f){Y.1j-=U.y;Y.12-=U.x}Y={1j:1u(Y.1j-1W*a.3y),12:1u(Y.12-1l*a.3z),6:1u(6+1l),k:1u(k+1W)};C Y},3s:9(a,b){u c,1c,2i,1T=b.1T,7=F.7,3r=7.3r,3X=7.3X;4(1T===\'6\'||1T===\'k\'){c=b.4F===b.1U?1:(a-b.1U)/(b.4F-b.1U);4(F.3J){c=1-c}1c=1T===\'6\'?7.1l:7.1W;2i=a-1c;F.O[1T](G(1T===\'6\'?2i:2i-(3r*c)));F.J[1T](G(1T===\'6\'?2i:2i-(3r*c)-(3X*c)))}},59:9(){u a=F.7,1q=a.Y,1r=a.54,1x=1r===\'1x\',1m=jQuery.T({2l:1},1q);5B 1m.1V;4(1x){1q=m.4L();4(a.57){1q.2l=0.1}}I 4(1r===\'4n\'){1q.2l=0.1}F.q.14(1q).3i(1m,{3Z:1r===\'41\'?0:a.55,42:a.56,3s:1x?m.3s:B,3m:F.3Y})},5f:9(){u a=F.7,1r=a.5a,1x=1r===\'1x\',1m={2l:0.1};4(1x){1m=m.4L();4(a.5d){1m.2l=0.1}}F.q.3i(1m,{3Z:1r===\'41\'?0:a.5b,42:a.5c,3s:1x?m.3s:B,3m:F.3I})},5k:9(){u a=F.7,1r=a.5g,1q=a.Y,1m={2l:1},11=F.11,2A=3L,2m;1q.2l=0.1;4(1r===\'1x\'){2m=11===\'2I\'||11===\'2H\'?\'1j\':\'12\';4(11===\'2I\'||11===\'2u\'){1q[2m]=1u(G(1q[2m])-2A);1m[2m]=\'+=\'+2A+\'2E\'}I{1q[2m]=1u(G(1q[2m])+2A);1m[2m]=\'-=\'+2A+\'2E\'}}4(1r===\'41\'){F.3Y()}I{F.q.14(1q).3i(1m,{3Z:a.5h,42:a.5i,3m:F.3Y})}},5o:9(){u a=F.1N,1r=a.5l,1m={2l:0.1},11=F.11,2A=3L;4(1r===\'1x\'){1m[11===\'2I\'||11===\'2H\'?\'1j\':\'12\']=(11===\'2H\'||11===\'12\'?\'-\':\'+\')+\'=\'+2A+\'2E\'}a.q.3i(1m,{3Z:1r===\'41\'?0:a.5m,42:a.5n,3m:9(){jQuery(m).Q(\'2d\').1A()}})}};F.1M.K={1H:{2r:r,6a:3L,6b:r,14:{},2f:!1s,R:r},K:B,R:t,3t:jQuery(\'1F\'),4M:9(a){a=jQuery.T({},m.1H,a);4(m.K){m.1K()}m.K=jQuery(\'<M 1g="l-K"></M>\').1B(F.P?F.P.1k:a.1k);m.R=t;4(a.R&&F.1H.R){m.K.22(\'l-K-R\');m.R=r}},2V:9(a){u b=m;a=jQuery.T({},m.1H,a);4(m.K){m.K.2e(\'.K\').6(\'1v\').k(\'1v\')}I{m.4M(a)}4(!m.R){W.1h(\'3N.K\',jQuery.6c(m.21,m));m.21()}4(a.2r){m.K.1h(\'1P.K\',9(e){4(jQuery(e.1i).43(\'l-K\')){4(F.1y){F.1K()}I{b.1K()}C t}})}m.K.14(a.14).4H()},1K:9(){u a,2T;W.2e(\'3N.K\');4(m.3t.43(\'l-3u\')){jQuery(\'.l-E\').1Z(\'l-E\');a=W.3k();2T=W.3j();m.3t.1Z(\'l-3u\');W.3k(a).3j(2T)}jQuery(\'.l-K\').1A().3S();jQuery.T(m,{K:B,R:t})},21:9(){u a=\'1t%\',3v;m.K.6(a).k(\'1t%\');4(3w){3v=Z.2k(h.82.3v,h.1C.3v);4(D.6()>3v){a=D.6()}}I 4(D.6()>W.6()){a=D.6()}m.K.6(a).k(D.k())},5T:9(a,b){u c=m.K;jQuery(\'.l-K\').1O(r,r);4(!c){m.4M(a)}4(a.2f&&m.R&&b.R){4(!c){m.E=D.k()>W.k()?jQuery(\'1F\').14(\'E-2u\').3F("2E",""):t}b.2f=m.K.64(b.q);b.R=t}4(a.6b===r){m.30.45(m,46)}},30:9(a,b){u c,2T;4(b.2f){4(m.E!==t){jQuery(\'*\').4N(9(){C(jQuery(m).14(\'1V\')===\'R\'&&!jQuery(m).43("l-K")&&!jQuery(m).43("l-q"))}).22(\'l-E\');m.3t.22(\'l-E\')}c=W.3k();2T=W.3j();m.3t.22(\'l-3u\');W.3k(c).3j(2T)}m.2V(a)},3K:9(){4(!m.R){m.21()}},4s:9(a){4(m.K&&!F.P){m.K.83(a.6a,jQuery.6c(m.1K,m))}}};F.1M.L={1H:{n:\'84\',1V:\'6d\'},30:9(a){u b=F.7,2n=b.L,n=a.n,L,1i;4(jQuery.4C(2n)){2n=2n.5R(b.2v,b)}4(!1G(2n)||jQuery.85(2n)===\'\'){C}L=jQuery(\'<M 1g="l-L l-L-\'+n+\'-q">\'+2n+\'</M>\');63(n){2h\'86\':1i=F.O;24;2h\'87\':1i=F.q;24;2h\'88\':1i=F.J;24;89:1i=F.O;L.1B(\'1C\');4(3w){L.6(L.6())}L.8a(\'<2K 1g="44"></2K>\');F.7.E[2]+=Z.8b(G(L.14(\'E-6d\')));24}L[(a.1V===\'1j\'?\'8c\':\'1B\')](1i)}};jQuery.5O.l=9(b){u c,4O=jQuery(m),1p=m.1p||\'\',4P=9(e){u a=jQuery(m).8d(),4Q=c,2U,2o;4(!(e.5K||e.5L||e.5M||e.5N)&&!a.23(\'.l-q\')){2U=b.8e||\'1z-l-V\';2o=a.2M(2U);4(!2o){2U=\'8f\';2o=a.5s(0)[2U]}4(2o&&2o!==\'\'&&2o!==\'8g\'){a=1p.1b?jQuery(1p):4O;a=a.4N(\'[\'+2U+\'="\'+2o+\'"]\');4Q=a.1f(m)}b.1f=4Q;4(F.2V(a,b)!==t){e.2x()}}};b=b||{};c=b.1f||0;4(!1p||b.8h===t){4O.2e(\'1P.16-1U\').1h(\'1P.16-1U\',4P)}I{D.8i(1p,\'1P.16-1U\').8j(1p+":65(\'.l-1Y, .l-2Z\')",\'1P.16-1U\',4P)}m.4N(\'[1z-l-1U=1]\').Q(\'1P\');C m};D.4G(9(){u b,4R;4(jQuery.3p===j){jQuery.3p=9(){u a=jQuery(\'<M 2q="6:6e;k:6e;2C:1v"><M/></M>\').1B(\'1C\'),44=a.8k(),6=44.3Q()-44.k(8l).3Q();a.1A();C 6}}4(jQuery.4S.4T===j){jQuery.4S.4T=(9(){u a=jQuery(\'<M 2q="1V:R;1j:8m;"></M>\').1B(\'1C\'),R=(a[0].6f===20||a[0].6f===15);a.1A();C R}())}jQuery.T(F.1H,{3p:jQuery.3p(),R:jQuery.4S.4T,1k:jQuery(\'1C\')});b=jQuery(g).6();H.22(\'l-3u-6g\');4R=jQuery(g).6();H.1Z(\'l-3u-6g\');jQuery("<2q n=\'2n/14\'>.l-E{E-2u:"+(4R-b)+"2E;}</2q>").1B("8n")})}(8o,69,8p));', 62, 522, '||||if||width|current||function|||||||||||height|fancybox|this|type|||wrap|true||false|var|||||href|content|null|return||margin||getScalar||else|inner|overlay|title|div|iframe|skin|coming|trigger|fixed|rez|extend|viewport|group|||pos|Math||direction|left||css||fb|minWidth|minHeight||scrolling|length|padding|maxWidth|maxHeight|index|class|bind|target|top|parent|wPadding|endPos|next|player|selector|startPos|effect|isTouch|100|getValue|auto|keys|elastic|isActive|data|remove|appendTo|body|obj|origHeight|html|isString|defaults|autoHeight|prev|close|image|helpers|previous|stop|click|origWidth|orig|opts|prop|start|position|hPadding|outer|item|removeClass||update|addClass|is|break|ratio|height_||isPercentage|autoWidth|tpl|noop|isOpen|onReset|unbind|locked|min|case|value|width_|max|opacity|field|text|relVal|isQuery|style|closeClick|ajax|swf|right|element|tmp|preventDefault|_afterLoad|placeholder|distance|didUpdate|overflow|getViewport|px|preload|loop|up|down|src|span|isOpened|attr|canShrink|find|embed|wSpace|hSpace|maxWidth_|scrollH|relType|open|fitToView|aspectRatio|closeBtn|nav|beforeShow|ajaxLoad||||imgPreload|transitions||||each|isDom|inline|cancel|hideLoading|jumpto|router|scroll|animate|scrollLeft|scrollTop|_error|complete|canExpand|scrollOut|scrollbarWidth|maxHeight_|wrapSpace|step|el|lock|offsetWidth|IE|match|topRatio|leftRatio|play|error|250|swing|hrefParts|replace|onload|onerror|_afterZoomOut|isClosing|onUpdate|200|anyway|resize|loading|showLoading|innerWidth|canScroll|hide|param|origMaxWidth|origMaxHeight|outerHeight|skinSpace|_afterZoomIn|duration||none|easing|hasClass|child|apply|arguments|hidden|clientWidth|clientHeight|9999|pixelRatio|autoCenter|arrows|nextClick|mouseWheel|autoPlay|img|id|rnd|name|try|javascript|fade|prevMethod|onCancel|beforeLoad|beforeClose|afterClose|timer|object|_start|unbindEvents|opened|set|reposition|load|_setDimension|isFunction|visible|new|end|ready|show|len|wMargin|hMargin|getOrigPosition|create|filter|that|run|idx|w2|support|fixedPosition|isScrollable|autoSize|autoResize|wrapCSS|playSpeed|modal||toggle|scrollOutside|frame|openEffect|openSpeed|openEasing|openOpacity|openMethod|zoomIn|closeEffect|closeSpeed|closeEasing|closeOpacity|closeMethod|zoomOut|nextEffect|nextSpeed|nextEasing|nextMethod|changeIn|prevEffect|prevSpeed|prevEasing|changeOut|afterLoad|afterShow|beforeChange|get|metadata|isImage|isSWF|shift|abort|clearTimeout|setTimeout|_getPosition|delete|dim|orientationchange|keydown|which|keyCode|absolute|innerHeight|bindEvents|ctrlKey|altKey|shiftKey|metaKey|fn|mousewheel|while|call|number|onReady|_loadImage|_loadAjax|_loadIframe|no|Image|success|catch|_preloadImages|cnt|switch|append|not|steps|add|outerWidth|document|speedOut|showEarly|proxy|bottom|50px|offsetTop|test|use|strict|navigator|userAgent|msie|createTouch|hasOwnProperty|instanceof|string|indexOf|scrollWidth|scrollHeight|parseInt|ceil|version|800|600|3000|dataType|headers|fancyBox|wmode|transparent|allowfullscreen|allowscriptaccess|always|tabIndex|alt|frameborder|vspace|hspace|webkitAllowFullScreen|mozallowfullscreen|allowFullScreen|allowtransparency|The|requested|cannot|be|loaded|br|Please|again|later|Close||Next|Previous|isPlainObject|isArray|nodeType|charAt|split|onPlayEnd|onPlayStart|300|boolean|removeAttr|srcElement|contenteditable|inArray|Array|prototype|slice|jp|eg|gif|png|bmp|webp|svg|mobile|desktop|Top|Right|Bottom|Left|hasError|url|Date|getTime|about|blank|empty|one|parents|for|insertAfter|detach|replaceAll|classid|clsid|D27CDB6E|AE6D|11cf|96B8|444553540000|movie|application|shockwave|flash|yes|contentWindow|location|contents|cursor|pointer|first|offset|documentElement|fadeOut|float|trim|inside|outside|over|default|wrapInner|abs|prependTo|blur|groupAttr|rel|nofollow|live|undelegate|delegate|children|99|20px|head|window|jQuery'.split('|'), 0, {}));
/*!
 * Buttons helper for fancyBox - 1.0.5
 * http://fancyapps.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(9(jQuery){p F=jQuery.u;F.v.4={S:{w:x,q:\'T\',y:\'<z U="u-4"><A><5><a g="B" d="V" h="i:;"></a></5><5><a g="C" d="D r" h="i:;"></a></5><5><a g="E" d="W" h="i:;"></a></5><5><a g="G" d="X Y" h="i:;"></a></5><5><a g="H" d="Z" h="i:;"></a></5></A></z>\'},6:m,4:m,10:9(a,b){7(a.w&&b.I.J<2){b.v.4=x;b.11=12;K}b.13[a.q===\'14\'?2:0]+=15},16:9(){7(3.4){3.4.f.L(\'d\',\'17 r\').e(\'M\')}},18:9(){7(3.4){3.4.f.L(\'d\',\'D r\').j(\'M\')}},19:9(a,b){p c=3.4;7(!c){3.6=jQuery(a.y).e(a.q).1a(\'1b\');c={n:3.6.k(\'.B\').l(F.n),o:3.6.k(\'.E\').l(F.o),f:3.6.k(\'.C\').l(F.f),s:3.6.k(\'.G\').l(F.s),N:3.6.k(\'.H\').l(F.N)}}7(b.O>0||b.P){c.n.j(\'8\')}t{c.n.e(\'8\')}7(b.P||b.O<b.I.J-1){c.o.j(\'8\');c.f.j(\'8\')}t{c.o.e(\'8\');c.f.e(\'8\')}3.4=c;3.Q(a,b)},Q:9(a,b){p c;7(!3.4){K}c=3.4.s.j(\'8 R\');7(b.1c){c.e(\'R\')}t 7(!b.1d){c.e(\'8\')}},1e:9(){7(3.6){3.6.1f()}3.6=m;3.4=m}}}(1g));', 62, 79, '|||this|buttons|li|list|if|btnDisabled|function||||title|addClass|play|class|href|javascript|removeClass|find|click|null|prev|next|var|position|slideshow|toggle|else|fancybox|helpers|skipSingle|false|tpl|div|ul|btnPrev|btnPlay|Start|btnNext||btnToggle|btnClose|group|length|return|attr|btnPlayOn|close|index|loop|onUpdate|btnToggleOn|defaults|top|id|Previous|Next|Toggle|size|Close|beforeLoad|closeBtn|true|margin|bottom|30|onPlayStart|Pause|onPlayEnd|afterShow|appendTo|body|canShrink|canExpand|beforeClose|remove|jQuery'.split('|'), 0, {}));
/*!
 * Thumbnail helper for fancyBox - 1.0.7
 * http://fancyapps.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(9(jQuery){f F=jQuery.t;F.D.u={11:{4:E,6:E,v:\'12\',G:9(a){f b;8(a.H){b=jQuery(a.H).I(\'J\').K(\'L\')}8(!b&&a.13===\'14\'&&a.w){b=a.w}q b}},g:r,7:r,4:0,M:9(c,d){f e=3,7,h=c.4,j=c.6,N=c.G;7=\'\';16(f n=0;n<d.m.x;n++){7+=\'<O><a 17="4:\'+h+\'P;6:\'+j+\'P;" w="18:Q.t.19(\'+n+\');"></a></O>\'}3.g=jQuery(\'<R 1a="t-u"></R>\').S(c.v).y(\'1b\');3.7=jQuery(\'<T>\'+7+\'</T>\').y(3.g);jQuery.1c(d.m,9(i){f b=N(d.m[i]);8(!b){q}jQuery("<J />").1d(9(){f a=3.4,6=3.6,o,p,s;8(!e.7||!a||!6){q}o=a/h;p=6/j;s=e.7.z().A(i).I(\'a\');8(o>=1&&p>=1){8(o>p){a=k.l(a/p);6=j}U{a=h;6=k.l(6/o)}}jQuery(3).V({4:a,6:6,W:k.l(j/2-6/2),B:k.l(h/2-a/2)});s.4(h).6(j);jQuery(3).1e().y(s).1f(1g)}).K(\'L\',b)});3.4=3.7.z().A(0).1h(X);3.7.4(3.4*(d.m.x+1)).V(\'B\',k.l(jQuery(Y).4()*0.5-(d.C*3.4+3.4*0.5)))},1i:9(a,b){8(b.m.x<2){b.D.u=1j;q}b.1k[a.v===\'W\'?0:2]+=((a.6)+15)},1l:9(a,b){8(3.7){3.Z(a,b)}U{3.M(a,b)}3.7.z().1m(\'10\').A(b.C).S(\'10\')},Z:9(a,b){8(3.7){3.7.1n(X).1o({\'B\':k.l(jQuery(Y).4()*0.5-(b.C*3.4+3.4*0.5))},1p)}},1q:9(){8(3.g){3.g.1r()}3.g=r;3.7=r;3.4=0}}}(Q));', 62, 90, '|||this|width||height|list|if|function||||||var|wrap|thumbWidth||thumbHeight|Math|floor|group||widthRatio|heightRatio|return|null|parent|fancybox|thumbs|position|href|length|appendTo|children|eq|left|index|helpers|50||source|element|find|img|attr|src|init|thumbSource|li|px|jQuery|div|addClass|ul|else|css|top|true|window|onUpdate|active|defaults|bottom|type|image||for|style|javascript|jumpto|id|body|each|load|hide|fadeIn|300|outerWidth|beforeLoad|false|margin|afterShow|removeClass|stop|animate|150|beforeClose|remove'.split('|'), 0, {}));
/*!
 * Media helper for fancyBox - 1.0.6
 * http://fancyapps.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(h(jQuery){"Z 12";K F=jQuery.13,L=h(c,d,e){e=e||\'\';k(jQuery.5(e)==="14"){e=jQuery.M(e,t)}jQuery.15(d,h(a,b){c=c.16(\'jQuery\'+a,b||\'\')});k(e.17){c+=(c.N(\'?\')>0?\'&\':\'?\')+e}x c};F.18.O={19:{o:{f:/(o\\.6|1a\\.1b|o-1c\\.6)\\/(P\\?v=|v\\/|u\\/|q\\/?)?(1d\\?Q=(.*)|[\\w-]{11}|\\?1e=(.*)&Q=(.*)).*/i,7:{y:1,1f:1,1g:1,1h:0,R:1,1i:\'1j\',1k:1},5:\'r\',8:\'//s.o.6/q/$3\'},A:{f:/(?:A(?:1l)?.6)\\/(?:[^\\d]+)?(\\d+)(?:.*)/,7:{y:1,R:1,1m:1,1n:1,1o:0,1p:1},5:\'r\',8:\'//1q.A.6/B/$1\'},C:{f:/C.6\\/(?:P|S)\\/([\\w\\-]{1,10})/,7:{1r:\'1s\'},5:\'m\',8:h(a,b,c){c.m.1t=\'1u=\'+jQuery.M(b,t);x\'//s.C.6/S/\'+a[1]+\'/.m\'}},D:{f:/D.6\\/B\\/(.*)\\/?(.*)/,7:{1v:0,1w:1},5:\'m\',8:\'//s.D.6/m/B/$1\'},E:{f:/E\\.6\\/([a-G-H-T\\-\\?\\=]+)/i,7:{y:0},5:\'r\',8:\'//s.E.6/q.1x?1y=$1\'},I:{f:/I\\.6\\/(?!(?:1z|1A|1B)\\/)([a-G-H-9\\?\\=\\-]+)/i,5:\'U\',8:\'//I.6/1C/1D/$1/\'},V:{f:/(1E\\.1F|V\\.6)\\/p\\/([a-G-H-T\\-]+)\\/?/i,5:\'U\',8:\'//$1/p/$2/O/?1G=l\'},1H:{f:/J\\.W\\.([a-z]{2,3}(\\.[a-z]{2})?)\\/(\\?1I=|J\\?)(.*)/i,5:\'r\',8:h(a){x\'//J.W.\'+a[1]+\'/\'+a[3]+\'\'+a[4]+\'&1J=\'+(a[4].N(\'1K=c\')>0?\'1L\':\'q\')}}},1M:h(a,b){K c=b.X||\'\',5=Y,j,g,n,7;1N(j 1O a){k(a.1P(j)){g=a[j];n=c.1Q(g.f);k(n){5=g.5;7=jQuery.1R(t,{},g.7,b[j]||(jQuery.1S(a[j])?a[j].7:1T));c=jQuery.5(g.8)==="h"?g.8.1U(1V,n,7,b):L(g.8,n,7);1W}}}k(5){b.X=c;b.5=5;b.1X=Y}}}}(1Y));', 62, 123, '|||||type|com|params|url|||||||matcher|item|function||what|if||swf|rez|youtube||embed|iframe|www|true||||return|autoplay||vimeo|video|metacafe|dailymotion|twitvid||zA|Z0|twitpic|maps|var|format|param|indexOf|media|watch|list|hd|fplayer|9_|image|instagram|google|href|false|use|||strict|fancybox|object|each|replace|length|helpers|defaults|youtu|be|nocookie|videoseries|listType|autohide|fs|rel|wmode|opaque|enablejsapi|pro|show_title|show_byline|show_portrait|fullscreen|player|autoPlay|yes|flashVars|playerVars|additionalInfos|autoStart|php|guid|place|photos|events|show|full|instagr|am|size|google_maps|ll|output|layer|svembed|beforeLoad|for|in|hasOwnProperty|match|extend|isPlainObject|null|call|this|break|autoHeight|jQuery'.split('|'), 0, {}));
/*!
 * jQuery Waypoints - 2.0.3
 * http://imakewebthings.com/jquery-waypoints/
 */
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);
/*!
 * Lettering.js - 0.7.0
 * https://github.com/davatron5000/Lettering.js
 */
(function(jQuery) {
    function injector(t, splitter, klass, after) {
        var text = t.text(),
            a = text.split(splitter),
            inject = '';
        if (a.length) {
            jQuery(a).each(function(i, item) {
                inject += '<span class="' + klass + (i + 1) + '" aria-hidden="true">' + item + '</span>' + after
            });
            t.attr('aria-label', text).empty().append(inject)
        }
    }
    var methods = {
        init: function() {
            return this.each(function() {
                injector(jQuery(this), '', 'char', '')
            })
        },
        words: function() {
            return this.each(function() {
                injector(jQuery(this), ' ', 'word', ' ')
            })
        },
        lines: function() {
            return this.each(function() {
                var r = "eefec303079ad17405c889e092e105b0";
                injector(jQuery(this).children("br").replaceWith(r).end(), r, 'line', '')
            })
        }
    };
    jQuery.fn.lettering = function(method) {
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1))
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 0))
        }
        jQuery.error('Method ' + method + ' does not exist on jQuery.lettering');
        return this
    }
})(jQuery);
/*!
 * jQuery animateNumber - 0.0.9
 * https://github.com/aishek/jquery-animateNumber
 */
(function(d) {
    var p = function(b) {
            return b.split("").reverse().join("")
        },
        l = {
            numberStep: function(b, a) {
                var e = Math.floor(b);
                d(a.elem).text(e)
            }
        },
        h = function(b) {
            var a = b.elem;
            a.nodeType && a.parentNode && (a = a._animateNumberSetter, a || (a = l.numberStep), a(b.now, b))
        };
    d.Tween && d.Tween.propHooks ? d.Tween.propHooks.number = {
        set: h
    } : d.fx.step.number = h;
    d.animateNumber = {
        numberStepFactories: {
            append: function(b) {
                return function(a, e) {
                    var k = Math.floor(a);
                    d(e.elem).prop("number", a).text(k + b)
                }
            },
            separator: function(b, a) {
                b = b || " ";
                a = a || 3;
                return function(e, k) {
                    var c = Math.floor(e).toString(),
                        s = d(k.elem);
                    if (c.length > a) {
                        for (var f = c, g = a, l = f.split("").reverse(), c = [], m, q, n, r = 0, h = Math.ceil(f.length / g); r < h; r++) {
                            m = "";
                            for (n = 0; n < g; n++) {
                                q = r * g + n;
                                if (q === f.length) break;
                                m += l[q]
                            }
                            c.push(m)
                        }
                        f = c.length - 1;
                        g = p(c[f]);
                        c[f] = p(parseInt(g, 10).toString());
                        c = (void 0).join(b);
                        c = p(c)
                    }
                    s.prop("number", e).text(c)
                }
            }
        }
    };
    d.fn.animateNumber = function() {
        for (var b = arguments[0], a = d.extend({}, l, b), e = d(this), k = [a], c = 1, h = arguments.length; c < h; c++) k.push(arguments[c]);
        if (b.numberStep) {
            var f = this.each(function() {
                    this._animateNumberSetter = b.numberStep
                }),
                g = a.complete;
            a.complete = function() {
                f.each(function() {
                    delete this._animateNumberSetter
                });
                g && g.apply(this, arguments)
            }
        }
        return e.animate.apply(e, k)
    }
})(jQuery);
/*!
 * jQuery Lens
 * http://www.dailycoding.com/ 
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(n(jQuery){jQuery.M.N=n(k){3 l={p:O,r:4,x:"#P"};3 k=jQuery.Q(l,k);3 m="y-z: A A;8: "+5(k.p)+"6;9: "+5(k.p)+"6;R: q;B: C;D-S: "+5(k.p/2+k.r)+"6;D: "+5(k.r)+"6 T "+k.x+";y-E: U-E;z: V;";W 7.X(n(){o=jQuery(7);3 c=jQuery(7).Y();3 d=jQuery("<F  G=\'"+m+"\' Z=\'10\'>&11;</F>").H(jQuery("12"));3 f=d.13();3 g=k.I?k.I:jQuery(7).14("J");3 h="<15 G=\'B:C;\' J=\'"+g+"\' />";3 i=0;3 j=0;jQuery(h).16(n(){i=jQuery(7).8()/o.8();j=jQuery(7).9()/o.9()}).H(jQuery(7).17());d.s({18:"19(\'"+g+"\')"});d.K(t);jQuery(7).K(t);n t(e){3 a=L(e.u-c.q);3 b=L(e.v-c.w);1a(a<0||b<0||a>o.8()||b>o.9()){d.1b()}1c{d.1d();a=5(((e.u-c.q)*i-d.8()/2)*(-1));b=5(((e.v-c.w)*j-d.9()/2)*(-1));d.s({1e:a+\'6 \'+b+\'6\'});a=5(e.u-d.8()/2);b=5(e.v-d.9()/2);d.s({q:a+\'6\',w:b+\'6\'})}}})}})(1f);', 62, 78, '|||var||String|px|this|width|height||||||||||||||function|obj|lensSize|left|borderSize|css|setPosition|pageX|pageY|top|borderColor|background|position|0px|display|none|border|repeat|div|style|appendTo|imageSrc|src|mousemove|parseInt|fn|imageLens|100|888|extend|float|radius|solid|no|absolute|return|each|offset|class|lens|nbsp|body|size|attr|img|load|parent|backgroundImage|url|if|hide|else|show|backgroundPosition|jQuery'.split('|'), 0, {}));
/*!
 * Detect Element Resize - 0.5.3
 * https://github.com/sdecima/javascript-detect-element-resize
 */
(function() {
    var attachEvent = document.attachEvent,
        stylesCreated = false;
    if (!attachEvent) {
        var requestFrame = (function() {
            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
                return window.setTimeout(fn, 20)
            };
            return function(fn) {
                return raf(fn)
            }
        })();
        var cancelFrame = (function() {
            var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
            return function(id) {
                return cancel(id)
            }
        })();

        function resetTriggers(element) {
            var triggers = element.__resizeTriggers__,
                expand = triggers.firstElementChild,
                contract = triggers.lastElementChild,
                expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + 'px';
            expandChild.style.height = expand.offsetHeight + 1 + 'px';
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight
        };

        function checkTriggers(element) {
            return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height
        }

        function scrollListener(e) {
            var element = this;
            resetTriggers(this);
            if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
            this.__resizeRAF__ = requestFrame(function() {
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function(fn) {
                        fn.call(element, e)
                    })
                }
            })
        };
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            animationstartevent = 'animationstart',
            domPrefixes = 'Webkit Moz O ms'.split(' '),
            startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
            pfx = ''; {
            var elm = document.createElement('fakeelement');
            if (elm.style.animationName !== undefined) {
                animation = true
            }
            if (animation === false) {
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                        pfx = domPrefixes[i];
                        animationstring = pfx + 'Animation';
                        keyframeprefix = '-' + pfx.toLowerCase() + '-';
                        animationstartevent = startEvents[i];
                        animation = true;
                        break
                    }
                }
            }
        }
        var animationName = 'resizeanim';
        var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
        var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; '
    }

    function createStyles() {
        if (!stylesCreated) {
            var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css
            } else {
                style.appendChild(document.createTextNode(css))
            }
            head.appendChild(style);
            stylesCreated = true
        }
    }
    window.addResizeListener = function(element, fn) {
        if (attachEvent) element.attachEvent('onresize', fn);
        else {
            if (!element.__resizeTriggers__) {
                if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
                createStyles();
                element.__resizeLast__ = {};
                element.__resizeListeners__ = [];
                (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
                element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
                element.appendChild(element.__resizeTriggers__);
                resetTriggers(element);
                element.addEventListener('scroll', scrollListener, true);
                animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
                    if (e.animationName == animationName) resetTriggers(element)
                })
            }
            element.__resizeListeners__.push(fn)
        }
    };
    window.removeResizeListener = function(element, fn) {
        if (attachEvent) element.detachEvent('onresize', fn);
        else {
            element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
            if (!element.__resizeListeners__.length) {
                element.removeEventListener('scroll', scrollListener);
                element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)
            }
        }
    }
})();
/*! 
 * waitForImages - 2.0.0
 * https://github.com/alexanderdickson/waitForImages
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}(';(5(jQuery){3 r=\'v\';jQuery.v={B:[\'S\',\'T\',\'U\',\'V\',\'W\'],C:[\'X\']};jQuery.Y[\':\'].x=5(a){6(!jQuery(a).D(\'y[4][4!=""]\')){9 E}3 b=z F();b.4=a.4;9!b.Z};jQuery.10.v=5(){3 l=0;3 m=0;3 n=jQuery.11();3 o;3 p;3 q;6(jQuery.12(7[0])){q=7[0].13;p=7[0].8;o=7[0].14}A{6(7.G===1&&jQuery.H(7[0])===\'15\'){q=7[0]}A{o=7[0];p=7[1];q=7[2]}}o=o||jQuery.I;p=p||jQuery.I;q=!!q;6(!jQuery.J(o)||!jQuery.J(p)){16 z 17(\'18 19 1a 1b 1c.\');}t.8(5(){3 f=jQuery(t);3 g=[];3 h=jQuery.v.B||[];3 j=jQuery.v.C||[];3 k=/1d\\(\\s*([\'"]?)(.*?)\\1\\s*\\)/g;6(q){f.K(\'*\').1e().8(5(){3 e=jQuery(t);6(e.D(\'y:x\')){g.w({4:e.L(\'4\'),u:e[0]})}jQuery.8(h,5(i,a){3 b=e.1f(a);3 c;6(!b){9 M}1g(c=k.1h(b)){g.w({4:c[2],u:e[0]})}});jQuery.8(j,5(i,b){3 c=e.L(b);3 d;6(!c){9 M}d=c.N(\',\');jQuery.8(d,5(i,a){a=jQuery.1i(a).N(\' \')[0];g.w({4:a,u:e[0]})})})})}A{f.K(\'y:x\').8(5(){g.w({4:t.4,u:t})})}l=g.G;m=0;6(l===0){o.O(f[0]);n.P(f[0])}jQuery.8(g,5(i,c){3 d=z F();3 e=\'Q.\'+r+\' 1j.\'+r;jQuery(d).1k(e,5 R(a){3 b=[m,l,a.H==\'Q\'];m++;p.1l(c.u,b);n.1m(c.u,b);jQuery(t).1n(e,R);6(m==l){o.O(f[0]);n.P(f[0]);9 E}});d.4=c.4})});9 n.1o()}}(1p));', 62, 88, '|||var|src|function|if|arguments|each|return||||||||||||||||||||this|element|waitForImages|push|uncached|img|new|else|hasImageProperties|hasImageAttributes|is|false|Image|length|type|noop|isFunction|find|attr|true|split|call|resolveWith|load|me|backgroundImage|listStyleImage|borderImage|borderCornerImage|cursor|srcset|expr|complete|fn|Deferred|isPlainObject|waitForAll|finished|boolean|throw|TypeError|An|invalid|callback|was|supplied|url|addBack|css|while|exec|trim|error|one|apply|notifyWith|off|promise|jQuery'.split('|'), 0, {}));
/*!
 * Modernizr - .8.3
 * http://modernizr.com
 */
jQuery.globalEval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('3T.D=(4(u,v,w){z x=\'2.8.3\',D={},1J=15,N=v.2H,J=\'24\',25=v.C(J),W=25.K,L=v.C(\'1k\'),1K=\':)\',1L={}.1L,1l=\' -26- -3U- -o- -2I- \'.R(\' \'),27=\'3V 3W O 2I\',28=27.R(\' \'),29=27.2a().R(\' \'),1m={\'X\':\'3X://3Y.3Z.41/42/X\'},A={},2b={},1n={},1M=[],16=1M.16,1o,17=4(a,b,c,d){z e,2c,1N,2e,H=v.C(\'H\'),18=v.18,12=18||v.C(\'18\');B(43(c,10)){44(c--){1N=v.C(\'H\');1N.2f=d?d[c]:J+(c+1);H.1p(1N)}}e=[\'&#45;\',\'<K 2f="s\',J,\'">\',a,\'</K>\'].P(\'\');H.2f=J;(18?H:12).1O+=e;12.1p(H);B(!18){12.K.19=\'\';12.K.1P=\'1q\';2e=N.K.1P;N.K.1P=\'1q\';N.1p(12)}2c=b(H,a);B(!18){12.2J.2g(12);N.K.1P=2e}M{H.2J.2g(H)}6!!2c},2K=4(b){z c=u.46||u.47;B(c){6 c(b)&&c(b).48||Q}z d;17(\'@2h \'+b+\' { #\'+J+\' { 1r: 1s; } }\',4(a){d=(u.1Q?1Q(a,1R):a.49)[\'1r\']==\'1s\'});6 d},1t=(4(){z d={\'2L\':\'1k\',\'4a\':\'1k\',\'4b\':\'2M\',\'4c\':\'2M\',\'4d\':\'2i\',\'4e\':\'2i\',\'4f\':\'2i\'};4 1t(a,b){b=b||v.C(d[a]||\'H\');a=\'4g\'+a;z c=a I b;B(!c){B(!b.1S){b=v.C(\'H\')}B(b.1S&&b.2N){b.1S(a,\'\');c=S(b[a],\'4\');B(!S(b[a],\'Y\')){b[a]=w}b.2N(a)}}b=1R;6 c}6 1t})(),1T=({}).4h,1u;B(!S(1T,\'Y\')&&!S(1T.1a,\'Y\')){1u=4(a,b){6 1T.1a(a,b)}}M{1u=4(a,b){6((b I a)&&S(a.4i.1v[b],\'Y\'))}}B(!2j.1v.1U){2j.1v.1U=4 1U(c){z d=1w;B(Z d!="4"){4j 1V 4k();}z e=16.1a(2k,1),2l=4(){B(1w 2O 2l){z F=4(){};F.1v=d.1v;z a=1V F();z b=d.2P(a,e.2Q(16.1a(2k)));B(4l(b)===b){6 b}6 a}M{6 d.2P(c,e.2Q(16.1a(2k)))}};6 2l}}4 1b(a){W.1c=a}4 2R(a,b){6 1b(1l.P(a+\';\')+(b||\'\'))}4 S(a,b){6 Z a===b}4 1g(a,b){6!!~(\'\'+a).2S(b)}4 2m(a,b){1d(z i I a){z c=a[i];B(!1g(c,"-")&&W[c]!==w){6 b==\'2T\'?c:15}}6 Q}4 2U(a,b,c){1d(z i I a){z d=b[a[i]];B(d!==w){B(c===Q)6 a[i];B(S(d,\'4\')){6 d.1U(c||b)}6 d}}6 Q}4 G(a,b,c){z d=a.4m(0).4n()+a.16(1),1W=(a+\' \'+28.P(d+\' \')+d).R(\' \');B(S(b,"2V")||S(b,"Y")){6 2m(1W,b)}M{1W=(a+\' \'+(29).P(d+\' \')+d).R(\' \');6 2U(1W,b,c)}}A[\'4o\']=4(){6 G(\'4p\')};A[\'4q\']=4(){6 G(\'4r\')};A[\'1x\']=4(){z a=v.C(\'1x\');6!!(a.2n&&a.2n(\'2d\'))};A[\'4s\']=4(){6!!(D[\'1x\']&&S(v.C(\'1x\').2n(\'2d\').4t,\'4\'))};A[\'4u\']=4(){6!!u.4v};A[\'2W\']=4(){z b;B((\'4w\'I u)||u.2X&&v 2O 2X){b=15}M{17([\'@2h (\',1l.P(\'2W-4x),(\'),J,\')\',\'{#24{2o:2Y;1r:1s}}\'].P(\'\'),4(a){b=a.4y===9})}6 b};A[\'2Z\']=4(){6\'2Z\'I 4z};A[\'4A\']=4(){6!!u.4B};A[\'4C\']=4(){6!!u.4D};A[\'30\']=4(){6!!G("30",u)};A[\'31\']=4(){6 1t(\'31\',u)&&(v.32===w||v.32>7)};A[\'2p\']=4(){6!!(u.2p&&2p.4E)};A[\'4F\']=4(){z a=v.C(\'H\');6(\'4G\'I a)||(\'4H\'I a&&\'4I\'I a)};A[\'4J\']=4(){6\'4K\'I u||\'4L\'I u};A[\'1X\']=4(){1b(\'19-1Y:1X(33,4M,33,.5)\');6 1g(W.2q,\'1X\')};A[\'2r\']=4(){1b(\'19-1Y:2r(4N,40%,4O%,.5)\');6 1g(W.2q,\'1X\')||1g(W.2q,\'2r\')};A[\'4P\']=4(){1b(\'19:1e(1Z://),1e(1Z://),4Q 1e(1Z://)\');6(/(1e\\s*\\(.*?){3}/).T(W.19)};A[\'4R\']=4(){6 G(\'4S\')};A[\'4T\']=4(){6 G(\'4U\')};A[\'4V\']=4(){6 G(\'4W\')};A[\'4X\']=4(){6 G(\'4Y\')};A[\'4Z\']=4(){6 v.C(\'H\').K.50===\'\'};A[\'2s\']=4(){2R(\'2s:.55\');6(/^0.55$/).T(W.2s)};A[\'51\']=4(){6 G(\'52\')};A[\'53\']=4(){6 G(\'54\')};A[\'56\']=4(){z a=\'19-57:\',34=\'2t(35,2u 2o,58 59,5a(#36),5b(37));\',38=\'35-2t(2u 2o,#36, 37);\';1b((a+\'-26- \'.R(\' \').P(34+a)+1l.P(38+a)).16(0,-a.1y));6 1g(W.5c,\'2t\')};A[\'5d\']=4(){6 G(\'5e\')};A[\'5f\']=4(){6!!G(\'2v\')};A[\'5g\']=4(){z c=!!G(\'5h\');B(c&&\'5i\'I N.K){17(\'@2h (2v-3d),(-26-2v-3d){#24{2u:2Y;1r:1s;5j:39;}}\',4(a,b){c=a.5k===9&&a.2w===3})}6 c};A[\'5l\']=4(){6 G(\'5m\')};A[\'5n\']=4(){z d;17(\'@1z-5o {1z-5p:"1z";3a:1e("1Z://")}\',4(a,b){z c=v.5q(\'5r\'),1f=c.1f||c.5s,1c=1f?(1f.2x&&1f.2x[0]?1f.2x[0].1c:1f.1c||\'\'):\'\';d=/3a/i.T(1c)&&1c.2S(b.R(\' \')[0])===0});6 d};A[\'5t\']=4(){z b;17([\'#\',J,\'{1z:0/0 a}#\',J,\':5u{5v:"\',1K,\'";3b:1q;1z:39/1 a}\'].P(\'\'),4(a){b=a.2w>=3});6 b};A[\'1h\']=4(){z a=v.C(\'1h\'),E=Q;1A{B(E=!!a.U){E=1V 3c(E);E.20=a.U(\'1h/20; 1B="5w"\').11(/^V$/,\'\');E.5x=a.U(\'1h/5y; 1B="5z.5A"\').11(/^V$/,\'\');E.3e=a.U(\'1h/3e; 1B="5B, 3f"\').11(/^V$/,\'\')}}1C(e){}6 E};A[\'13\']=4(){z a=v.C(\'13\'),E=Q;1A{B(E=!!a.U){E=1V 3c(E);E.20=a.U(\'13/20; 1B="3f"\').11(/^V$/,\'\');E.5C=a.U(\'13/5D;\').11(/^V$/,\'\');E.3g=a.U(\'13/3g; 1B="1"\').11(/^V$/,\'\');E.3h=(a.U(\'13/x-3h;\')||a.U(\'13/5E;\')).11(/^V$/,\'\')}}1C(e){}6 E};A[\'5F\']=4(){1A{3i.3j(J,J);3i.3k(J);6 15}1C(e){6 Q}};A[\'5G\']=4(){1A{3l.3j(J,J);3l.3k(J);6 15}1C(e){6 Q}};A[\'5H\']=4(){6!!u.5I};A[\'5J\']=4(){6!!u.5K};A[\'X\']=4(){6!!v.1i&&!!v.1i(1m.X,\'X\').5L};A[\'5M\']=4(){z a=v.C(\'H\');a.1O=\'<X/>\';6(a.2y&&a.2y.5N)==1m.X};A[\'5O\']=4(){6!!v.1i&&/5P/.T(1L.1a(v.1i(1m.X,\'5Q\')))};A[\'5R\']=4(){6!!v.1i&&/5S/.T(1L.1a(v.1i(1m.X,\'5T\')))};4 3m(){D[\'1k\']=(4(a){1d(z i=0,21=a.1y;i<21;i++){1n[a[i]]=!!(a[i]I L)}B(1n.2z){1n.2z=!!(v.C(\'3n\')&&u.5U)}6 1n})(\'5V 5W 2z 5X 5Y 5Z 60 61 62 63\'.R(\' \'));D[\'64\']=(4(a){1d(z i=0,E,1D,1E,21=a.1y;i<21;i++){L.1S(\'2A\',1D=a[i]);E=L.2A!==\'65\';B(E){L.3o=1K;L.K.1c=\'1r:1s;3b:1q;\';B(/^3p$/.T(1D)&&L.K.3q!==w){N.1p(L);1E=v.1E;E=1E.1Q&&1E.1Q(L,1R).3q!==\'66\'&&(L.2w!==0);N.2g(L)}M B(/^(3r|3s)jQuery/.T(1D)){}M B(/^(1e|3t)jQuery/.T(1D)){E=L.3u&&L.3u()===Q}M{E=L.3o!=1K}}2b[a[i]]=!!E}6 2b})(\'3r 3s 1e 3t 3v 67 68 69 3w 3v-6a 6b 3p 1Y\'.R(\' \'))}1d(z y I A){B(1u(A,y)){1o=y.2a();D[1o]=A[y]();1M.6c((D[1o]?\'\':\'V-\')+1o)}}D.1k||3m();D.3x=4(a,b){B(Z a==\'3y\'){1d(z c I a){B(1u(a,c)){D.3x(c,a[c])}}}M{a=a.2a();B(D[a]!==w){6 D}b=Z b==\'4\'?b():b;B(Z 1J!=="Y"&&1J){N.2B+=\' \'+(b?\'\':\'V-\')+a}D[a]=b}6 D};1b(\'\');25=L=1R;(4(f,g){z h=\'3.7.0\';z j=f.3z||{};z k=/^<|^(?:6d|6e|2L|6f|3y|6g|6h|6i)jQuery/i;z m=/^(?:a|b|6j|H|6k|6l|6m|6n|6o|6p|6q|i|6r|6s|6t|p|q|6u|6v|K|6w|6x|6y|6z|6A|6B)jQuery/i;z n;z o=\'6C\';z q=0;z r={};z s;(4(){1A{z a=g.C(\'a\');a.1O=\'<3A></3A>\';n=(\'1q\'I a);s=a.6D.1y==1||(4(){(g.C)(\'a\');z a=g.14();6(Z a.1F==\'Y\'||Z a.14==\'Y\'||Z a.C==\'Y\')}())}1C(e){n=15;s=15}}());4 3B(a,b){z p=a.C(\'p\'),2C=a.6E(\'6F\')[0]||a.2H;p.1O=\'x<K>\'+b+\'</K>\';6 2C.6G(p.6H,2C.2y)}4 2D(){z a=t.2E;6 Z a==\'2V\'?a.R(\' \'):a}4 22(a){z b=r[a[o]];B(!b){b={};q++;a[o]=q;r[q]=b}6 b}4 C(a,b,c){B(!b){b=g}B(s){6 b.C(a)}B(!c){c=22(b)}z d;B(c.1G[a]){d=c.1G[a].1F()}M B(m.T(a)){d=(c.1G[a]=c.1H(a)).1F()}M{d=c.1H(a)}6 d.6I&&!k.T(a)&&!d.6J?c.1I.1p(d):d}4 14(a,b){B(!a){a=g}B(s){6 a.14()}b=b||22(a);z c=b.1I.1F(),i=0,2F=2D(),l=2F.1y;1d(;i<l;i++){c.C(2F[i])}6 c}4 1j(b,c){B(!c.1G){c.1G={};c.1H=b.C;c.3C=b.14;c.1I=c.3C()}b.C=4(a){B(!t.1j){6 c.1H(a)}6 C(a,b,c)};b.14=2j(\'h,f\',\'6 4(){\'+\'z n=f.1F(),c=n.C;\'+\'h.1j&&(\'+2D().P().11(/[\\w\\-]+/g,4(a){c.1H(a);c.1I.C(a);6\'c("\'+a+\'")\'})+\');6 n}\')(t,c.1I)}4 23(a){B(!a){a=g}z b=22(a);B(t.2G&&!n&&!b.3D){b.3D=!!3B(a,\'3E,3F,3G,3H,3I,3J,3K,3L,3M,3N,3O{3P:6K}\'+\'3Q{19:#6L;1Y:#6M}\'+\'3R{3P:6N}\')}B(!s){1j(a,b)}6 a}z t={\'2E\':j.2E||\'6O 3E 3F 13 6P 1x 6Q 3n 6R 3G 3H 3I 3J 3K 3L 3M 3Q 6S 3N 6T 6U 3O 6V 3R 3w 1h\',\'6W\':h,\'2G\':(j.2G!==Q),\'6X\':s,\'1j\':(j.1j!==Q),\'2A\':\'6Y\',\'23\':23,C:C,14:14};f.3z=t;23(g)}(1w,v));D.6Z=x;D.70=1l;D.71=29;D.72=28;D.73=2K;D.74=1t;D.75=4(a){6 2m([a])};D.76=G;D.77=17;D.78=4(a,b,c){B(!b){6 G(a,\'2T\')}M{6 G(a,b,c)}};N.2B=N.2B.11(/(^|\\s)V-3S(\\s|jQuery)/,\'$1$2\')+(1J?\' 3S \'+1M.P(\' \'):\'\');6 D})(1w,1w.79);', 62, 444, '||||function||return|||||||||||||||||||||||||||||var|tests|if|createElement|Modernizr|bool||testPropsAll|div|in|mod|style|inputElem|else|docElement||join|false|split|is|test|canPlayType|no|mStyle|svg|undefined|typeof||replace|fakeBody|audio|createDocumentFragment|true|slice|injectElementWithStyles|body|background|call|setCss|cssText|for|url|sheet|contains|video|createElementNS|shivMethods|input|prefixes|ns|attrs|featureName|appendChild|hidden|position|absolute|isEventSupported|hasOwnProp|prototype|this|canvas|length|font|try|codecs|catch|inputElemType|defaultView|cloneNode|cache|createElem|frag|enableClasses|smile|toString|classes|node|innerHTML|overflow|getComputedStyle|null|setAttribute|_hasOwnProperty|bind|new|props|rgba|color|https|ogg|len|getExpandoData|shivDocument|modernizr|modElem|webkit|omPrefixes|cssomPrefixes|domPrefixes|toLowerCase|inputs|ret||docOverflow|id|removeChild|media|img|Function|arguments|bound|testProps|getContext|top|history|backgroundColor|hsla|opacity|gradient|left|transform|offsetHeight|cssRules|firstChild|list|type|className|parent|getElements|elements|elems|shivCSS|documentElement|ms|parentNode|testMediaQuery|select|form|removeAttribute|instanceof|apply|concat|setCssAll|indexOf|pfx|testDOMProps|string|touch|DocumentTouch|9px|geolocation|indexedDB|hashchange|documentMode|150|str2|linear|9f9|white|str3|3px|src|visibility|Boolean||webm|vorbis|wav|m4a|localStorage|setItem|removeItem|sessionStorage|webforms|datalist|value|range|WebkitAppearance|search|tel|email|checkValidity|datetime|time|addTest|object|html5|xyz|addStyleSheet|createFrag|hasCSS|article|aside|dialog|figcaption|figure|footer|header|hgroup|main|nav|section|display|mark|template|js|window|moz|Webkit|Moz|http|www|w3||org|2000|parseInt|while|173|matchMedia|msMatchMedia|matches|currentStyle|change|submit|reset|error|load|abort|on|hasOwnProperty|constructor|throw|TypeError|Object|charAt|toUpperCase|flexbox|flexWrap|flexboxlegacy|boxDirection|canvastext|fillText|webgl|WebGLRenderingContext|ontouchstart|enabled|offsetTop|navigator|postmessage|postMessage|websqldatabase|openDatabase|pushState|draganddrop|draggable|ondragstart|ondrop|websockets|WebSocket|MozWebSocket|255|120|100|multiplebgs|red|backgroundsize|backgroundSize|borderimage|borderImage|borderradius|borderRadius|boxshadow|boxShadow|textshadow|textShadow|cssanimations|animationName|csscolumns|columnCount||cssgradients|image|right|bottom|from|to|backgroundImage|cssreflections|boxReflect|csstransforms|csstransforms3d|perspective|webkitPerspective|height|offsetLeft|csstransitions|transition|fontface|face|family|getElementById|smodernizr|styleSheet|generatedcontent|after|content|theora|h264|mp4|avc1|42E01E|vp8|mp3|mpeg|aac|localstorage|sessionstorage|webworkers|Worker|applicationcache|applicationCache|createSVGRect|inlinesvg|namespaceURI|smil|SVGAnimate|animate|svgclippaths|SVGClipPath|clipPath|HTMLDataListElement|autocomplete|autofocus|placeholder|max|min|multiple|pattern|required|step|inputtypes|text|textfield|date|month|week|local|number|push|button|map|textarea|iframe|option|optgroup|code|fieldset|h1|h2|h3|h4|h5|h6|label|li|ol|span|strong|table|tbody|td|th|tr|ul|_html5shiv|childNodes|getElementsByTagName|head|insertBefore|lastChild|canHaveChildren|tagUrn|block|FF0|000|none|abbr|bdi|data|details|meter|output|progress|summary|version|supportsUnknownElements|default|_version|_prefixes|_domPrefixes|_cssomPrefixes|mq|hasEvent|testProp|testAllProps|testStyles|prefixed|document'.split('|'), 0, {}));
/*!
 * jQuery Easing - 1.3
 * http://gsgd.co.uk/sandbox/jquery/easing/
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
/*!
 * Scripts
 */
jQuery.ready(function() {
    (function(globals) {
        "use strict";
        globals.GLOB = {};
    }((1, jQuery.globalEval)('this')));
    var Default = {
        utils: {
            links: function() {
                jQuery('a[rel*=external]').on('click', function(e) {
                    e.preventDefault();
                    window.open(jQuery(this).attr('href'));
                });
            },
            mails: function() {
                jQuery('.email').each(function(index) {
                    em = jQuery(this).text().replace('//', '@').replace(/\//g, '.');
                    jQuery(this).text(em).attr('href', 'mailto:' + em);
                });
            },
            forms: function() {
                jQuery('.comment-form input, .comment-form textarea, .search-a input, .form-b input').each(function() {
                    if (jQuery(this).val() !== '') jQuery(this).parent().children('label').css('margin-top', '-3000em');
                }).on('focus', function() {
                    jQuery(this).parent().children('label').css('margin-top', '-3000em');
                }).on('blur', function() {
                    if (jQuery(this).val() === '') jQuery(this).parent().children('label').css('margin-top', 0);
                });

                jQuery('#contact input, #contact textarea').each(function() {
                    if (jQuery(this).val() !== '') jQuery(this).parent().parent().children('label').css('margin-top', '-3000em');
                }).on('focus', function() {
                    jQuery(this).parent().parent().children('label').css('margin-top', '-3000em');
                }).on('blur', function() {
                    if (jQuery(this).val() === '') jQuery(this).parent().parent().children('label').css('margin-top', 0);
                });

                xa = jQuery('fieldset > *, .nav-a');
                xb = parseInt(xa.size());
                xa.each(function() {
                    jQuery(this).css({
                        'z-index': xb
                    });
                    xb--;
                });

                jQuery('.comment-form [required]').each(function() {
                    jQuery(this).prev('label').append('<span class="scheme-a"> *</span>');
                });
            },
            date: function() {
                jQuery('#footer .date').text((new Date).getFullYear());
            },
            maps: function() {
                jQuery('#contact').append('<div class="map" id="mapa"></div>');

                if (jQuery('#mapa').size()) {
                    var zoom = jQuery('.contact-form').attr('data-zoom');
                    var lat = jQuery('.contact-form').attr('data-lat');
                    var long = jQuery('.contact-form').attr('data-long');

                    if (zoom.length === 0 && lat.length === 0 && long.length === 0) return;

                    var mapa, styledMap, mapOptions, styles, markerOpts, infowindow;
                    var styles = [{
                        featureType: 'landscape',
                        stylers: [{
                            saturation: -100
                        }, {
                            lightness: 65
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'poi',
                        stylers: [{
                            saturation: -100
                        }, {
                            lightness: 51
                        }, {
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'road.highway',
                        stylers: [{
                            saturation: -100
                        }, {
                            visibility: 'simplified'
                        }]
                    }, {
                        featureType: 'road.arterial',
                        stylers: [{
                            saturation: -100
                        }, {
                            lightness: 30
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'road.local',
                        stylers: [{
                            saturation: -100
                        }, {
                            lightness: 40
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'transit',
                        stylers: [{
                            saturation: -100
                        }, {
                            visibility: 'simplified'
                        }]
                    }, {
                        featureType: 'administrative.province',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'water',
                        elementType: 'labels',
                        stylers: [{
                            visibility: 'on'
                        }, {
                            lightness: -25
                        }, {
                            saturation: -100
                        }]
                    }, {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{
                            hue: '#ffff00'
                        }, {
                            lightness: -25
                        }, {
                            saturation: -97
                        }]
                    }];
                    styledMap = new google.maps.StyledMapType(styles, {
                        name: 'Styled Map'
                    });
                    mapOptions = {
                        zoom: +zoom,
                        center: new google.maps.LatLng(lat, long),
                        mapTypeId: google.maps.MapTypeId.SATELLITE,
                        disableDefaultUI: true,
                        draggable: true,
                        zoomControl: false,
                        scrollwheel: false,
                        disableDoubleClickZoom: false,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                        }
                    };
                    mapa = new google.maps.Map(document.getElementById('mapa'), mapOptions);

                    mapa.mapTypes.set('map_style', styledMap);
                    mapa.setMapTypeId('map_style');
                    markerOpts = {
                        position: new google.maps.LatLng(lat, long),
                        map: mapa,
                        icon: jQuery('.contact-form').attr('data-src') + "/images/pin.png"
                    }
                    new google.maps.Marker(markerOpts);
                }
            },
            responsive: function() {
                if (!jQuery.browser.mobile) {
                    jQuery('select').semanticSelect();
                    jQuery('.module-a, .list-b').addClass('unscrolled').each(function() {
                        jQuery(this).waypoint(function() {
                            jQuery(this).addClass('shown');
                        }, {
                            offset: '65%'
                        });
                    });
                    jQuery('[class*="mobile"], figure').parents('article').addClass('unscrolled').each(function() {
                        jQuery(this).waypoint(function() {
                            jQuery(this).addClass('shown');
                        }, {
                            offset: '65%'
                        });
                    });
                    jQuery(window).each(function() {
                        jQuery(this).waypoint(function() {
                            jQuery('#clone').toggleClass('active');

                            if (jQuery('#wpadminbar').length !== 0) {
                                if (jQuery('header#clone').hasClass('active'))
                                    jQuery('header#clone.active').css('top', '32px');
                                else
                                    jQuery('header#clone').css('top', '-75px');
                            }

                        }, {
                            offset: -jQuery('#featured, #welcome').outerHeight()
                        });
                    });
                    jQuery('html.csstransitions .counter').parents('article').each(function() {
                        jQuery(this).waypoint(function() {
                            jQuery('.counter .v').each(function() {
                                jQuery(this).animateNumber({
                                    easing: 'easeOutSine',
                                    number: parseInt(jQuery(this).parents('.counter').text()),
                                    numberStep: function(now, tween) {
                                        var floored_number = Math.floor(now) / 1000,
                                            floored_number = floored_number.toFixed(3);
                                        floored_number = floored_number.toString().replace('.', '');
                                        jQuery(tween.elem).html(floored_number).lettering();
                                    }
                                }, 4000).removeClass('v');
                            });
                        }, {
                            offset: '75%'
                        });
                    });
                };
            },
            miscellaneous: function() {
                jQuery('#top, #content.a .vid figure a, .gallery-b > li').append('<div class="fit-a"><div></div></div>');
                jQuery('#nav li > ul').parent().addClass('sub');
                jQuery('#top').each(function() {
                    jQuery(this).clone().attr('id', 'clone').insertAfter('#featured, #welcome').find('#nav').removeAttr('id').parent().find('#skip').remove();
                });

                jQuery('#top > .fit-a, #clone > .fit-a, .gallery-a > li > a').on('click', function() {
                    jQuery(this).parent().toggleClass('active');
                });

                jQuery('.list-a li').wrapInner('<span class="inner"></span>');
                jQuery('.list-b').each(function() {
                    tn = 1;
                    jQuery(this).children('li:not([class*=mobile])').each(function() {
                        jQuery(this).addClass('c' + tn).prepend('<span class="no">' + tn + '</span> ');
                        tn++;
                    });
                });
                jQuery('.gallery-a, .gallery-b').each(function() {
                    jQuery(this).addClass('mobile-hide').clone().removeClass('mobile-hide').addClass('mobile-only').insertAfter(jQuery(this));
                });
                jQuery('.gallery-c ul, .news-d').each(function() {
                    jQuery(this).addClass('regular-hide').clone().removeClass('regular-hide').addClass('regular-only').insertAfter(jQuery(this));
                    jQuery(this).addClass('regular-hide').clone().removeClass('regular-hide').addClass('tablet-only').insertAfter(jQuery(this));
                    jQuery(this).addClass('regular-hide').clone().removeClass('regular-hide').addClass('mobile-only').insertAfter(jQuery(this));
                });
                jQuery('.slider-a, .news-c > div, .gallery-c ul, .news-d').wrapInner('<div class="inner"></div>');
                jQuery('.slider-a li .news-c > div article, .gallery-c li, .news-d article, .slider-a li').wrap('<div></div>');
                jQuery('.slider-a > .inner').each(function() {
                    jQuery(this).bxSlider({
                        pager: false,
                        controls: true,
                        useCSS: false,
                        adaptiveHeight: true
                    });
                });
                jQuery('.news-c > div .inner').each(function() {
                    jQuery(this).bxSlider({
                        pager: false,
                        controls: true,
                        useCSS: false,
                        adaptiveHeight: true
                    });
                });
                jQuery('.gallery-c ul > .inner').each(function() {
                    if (jQuery(this).parent().hasClass('regular-hide')) {
                        jQuery(this).bxSlider({
                            pager: true,
                            controls: false,
                            useCSS: false,
                            adaptiveHeight: true,
                            minSlides: 1,
                            maxSlides: 3,
                            moveSlides: 3,
                            slideWidth: jQuery(window).width() / 3
                        });
                    }
                    if (jQuery(this).parent().hasClass('regular-only')) {
                        jQuery(this).bxSlider({
                            pager: true,
                            controls: false,
                            useCSS: false,
                            adaptiveHeight: true,
                            minSlides: 1,
                            maxSlides: 2,
                            moveSlides: 2,
                            slideWidth: jQuery(window).width() / 2
                        });
                    }
                    if (jQuery(this).parent().hasClass('tablet-only') || jQuery(this).parent().hasClass('mobile-only')) {
                        jQuery(this).bxSlider({
                            pager: true,
                            controls: false,
                            useCSS: false,
                            adaptiveHeight: true
                        });
                    }
                });
                jQuery('.news-d').each(function() {
                    if (jQuery(this).hasClass('regular-hide')) {
                        jQuery(this).children('.inner').each(function() {
                            jQuery(this).bxSlider({
                                pager: true,
                                controls: false,
                                useCSS: false,
                                adaptiveHeight: true,
                                minSlides: 1,
                                maxSlides: 3,
                                moveSlides: 3,
                                slideWidth: 310,
                                slideMargin: 34
                            });
                        });
                    }
                    if (jQuery(this).hasClass('regular-only')) {
                        jQuery(this).children('.inner').each(function() {
                            jQuery(this).bxSlider({
                                pager: true,
                                controls: false,
                                useCSS: false,
                                adaptiveHeight: true,
                                minSlides: 1,
                                maxSlides: 3,
                                moveSlides: 3,
                                slideWidth: 297,
                                slideMargin: 34
                            });
                        });
                    }
                    if (jQuery(this).hasClass('tablet-only')) {
                        jQuery(this).children('.inner').each(function() {
                            jQuery(this).bxSlider({
                                pager: true,
                                controls: false,
                                useCSS: false,
                                adaptiveHeight: true,
                                minSlides: 1,
                                maxSlides: 2,
                                moveSlides: 2,
                                slideWidth: 342,
                                slideMargin: 34
                            });
                        });
                    }
                    if (jQuery(this).hasClass('mobile-only')) {
                        jQuery(this).children('.inner').each(function() {
                            jQuery(this).bxSlider({
                                pager: true,
                                controls: false,
                                useCSS: false,
                                adaptiveHeight: true,
                                slideMargin: 10
                            });
                        });
                    }
                });
                jQuery('.gallery-a.mobile-only, .gallery-b.mobile-only').wrapInner('<div class="inner"></div>').children('.inner').each(function() {
                    jQuery(this).bxSlider({
                        pager: true,
                        controls: false,
                        useCSS: false,
                        adaptiveHeight: true,
                        slideMargin: 10
                    });
                });

                jQuery('a[href*=youtube], a[href*=vimeo], a[href*=metacafe], a[href*=dailymotion]').click(function() {
                    jQuery.fancybox({
                        'padding': 0,
                        'autoScale': false,
                        'transitionIn': 'none',
                        'transitionOut': 'none',
                        'title': this.title,
                        'width': 680,
                        'height': 495,
                        'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                        'type': 'swf',
                        'swf': {
                            'wmode': 'transparent',
                            'allowfullscreen': 'true'
                        }
                    });

                    return false;
                });

                jQuery('.counter > span').addClass('v');
                jQuery('#content.a .vid figure a > .fit-a').each(function() {
                    jQuery(this).css({
                        'background-image': 'url("' + jQuery(this).parents('figure').find('img').attr('src') + '")'
                    });
                });
                // jQuery('html.csstransitions .slider-b').attr('data-carousel-3d',true);
                jQuery('html.lt-ie9 .slider-b').removeClass('slider-b').addClass('slider-bb').wrapInner('<div class="inner"></div>');
                jQuery('.gallery-b li > a > img').parent('a').each(function() {
                    jQuery(this).clone().addClass('link').appendTo(jQuery(this).parents('li').find('div:not(.fit-a)'));
                    jQuery(this).clone().addClass('link').appendTo(jQuery(this).parents('li'));
                });
                jQuery('.gallery-c ul li > a').each(function() {
                    jQuery(this).clone().wrap('<div class="link"></div>').parent().insertAfter(jQuery(this));
                    jQuery(this).clone().addClass('main').insertAfter(jQuery(this));
                });
                jQuery('.gallery-b li > div:not(.fit-a), .gallery-c ul li > div a, #top h1 a img, #clone h1 a img').each(function() {
                    jQuery(this).css('margin-top', -jQuery(this).outerHeight() * .5);
                });

                jQuery('.slider-b').addClass('mobile-hide').after('<div class="slider-ba mobile-only"><div class="inner"></div></div>').find('li').each(function() {
                    jQuery(this).clone().removeAttr('style').appendTo(jQuery(this).parents('.slider-b').next('.slider-ba').children('.inner'));
                });
                jQuery('.slider-ba  .inner, .slider-bb  .inner').each(function() {
                    jQuery(this).bxSlider({
                        pager: false,
                        controls: true,
                        useCSS: false,
                        adaptiveHeight: true
                    });
                });

                jQuery('img.zoomin, .zoomin img').imageLens({
                    lensSize: 333,
                    borderSize: 5,
                    borderColor: "#fff"
                });
                jQuery('.news-d').parent().addClass('has-news-d');
                jQuery('.nav-a :header [class*="icon"], .nav-a > ul li [class*="icon"]').parent().addClass('has-icon');
                jQuery('.nav-a li span:not(.scheme-a)').parents('li').addClass('has-span');
                jQuery('.news-e article').each(function() {
                    jQuery(this).find('a:first').clone().addClass('link').appendTo(jQuery(this));
                }).find('a').parents('article').addClass('has-link');
                jQuery('html[data-pattern]').each(function() {
                    jQuery(this).find('#welcome, #featured, #content.a > .vb').addClass('data-pattern').css('background-image', 'url(' + jQuery(this).attr('data-pattern') + ')')
                });
                jQuery('.counter .v').lettering();
                jQuery('.gallery-a li').each(function() {
                    if (!jQuery(this).find('img').size()) {
                        jQuery(this).addClass('plain');
                    }
                });

                // jQuery('header#clone h1 a').removeAttr('style').css('background-image', 'url(' + jQuery('header#clone h1 a').attr('data-scrollbar-logo') + ')');

                if (jQuery('.page-template ').length !== 0) {
                    if (jQuery('.page-template .header-static').length === 0) {
                        jQuery('.page-template').prepend('<article id="featured" class="header-static no-image header-single"></article>');
                    }
                }

                //add custom colors to url
                if (jQuery('#nav > ul > li > ul li, #clone nav > ul > li > ul li').hasClass('custom_color')) {
                    jQuery('#nav > ul > li > ul li.custom_color, #clone nav > ul > li > ul li.custom_color').each(function() {
                        jQuery(this).children('a').attr('href', function() {
                            return jQuery(this).attr('href') + '&color=' + jQuery(this).attr('title');
                        });
                    });
                }

            }
        },
        ie: {
            css: function() {
                if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9) {
                    jQuery('body').append('<p class="lt-ie9">You are using an outdated browser. Please <a target="_blank" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>').css('padding-top', '28px');
                    jQuery('input[placeholder], textarea[placeholder]').placeholder();
                    jQuery(':last-child').addClass('last-child');
                }
            },
            pie: function() {
                if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9) {
                    if (window.PIE) {
                        jQuery('input[type="color"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="range"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"], .news-a img, .news-a header ul li img, textarea, #clone nav > ul > li.a > a, .nav-a, .nav-a ul li a span, .social-a li a, .download-a li a, .list-a li i, .slider-a li img, .list-c > li, .comments-a li > span, .comments-a img, .gallery-c ul li a > span .link, .news-d article, .link-a.a a, .list-c > li > span span, .list-b li .no').each(function() {
                            PIE.attach(this);
                        });
                    }
                }
                if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 8) {
                    if (window.PIE) {
                        jQuery('button, input[type="button"], input[type="reset"], input[type="submit"]').each(function() {
                            PIE.attach(this);
                        });
                    }
                }
            }
        }

    };

    Default.utils.links();
    Default.utils.mails();
    Default.utils.forms();
    Default.utils.date();
    Default.utils.miscellaneous();
    Default.utils.responsive();
    Default.ie.css();
    Default.ie.pie();

    window.initialize = function() {
        Default.utils.maps();
    }

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://maps.google.com/maps/api/js?sensor=false&language=en&callback=initialize';
        document.body.appendChild(script);
    }
    window.onload = loadScript;
});
/* Flow Switcher */

"use strict";
function startFlowSwitcher() {
    function e(e) {
        var t = 0;
        while (e = e.previousElementSibling) ++t;
        return t
    }
    var t = document.querySelectorAll("#flow-switcher > li"),
        n = document.querySelectorAll("#flow-boxes .codebox-container .codebox"),
        r = document.querySelectorAll("#flow-boxes .text"),
        i = document.querySelector("#flow-boxes .codebox-container"),
        s = document.querySelector("#flow-boxes .boxes"),
        o = document.querySelector("#flow-boxes .end");
    for (var u = 0; u < t.length; ++u) t[u].addEventListener("mouseover", function(u) {
        u.stopPropagation();
        var a = document.querySelector("#flow-switcher .active"),
            f = u.target.nodeName == "SPAN" ? u.target.parentNode : u.target;
        if (a == f) return;
        var l = e(a),
            c = e(f);
        $(s).toggleClass("active", c != t.length - 1), $(o).toggleClass("active", c == t.length - 1), c == t.length - 1 ? ($(i).removeClass("active"), $(i).addClass("hiddenLeft")) : ($(i).removeClass("hiddenLeft"), $(i).addClass("active"));
        for (var h = 0; h < t.length; ++h) h < t.length - 1 && $(n[h]).removeClass("hiddenLeft active hiddenRight"), $(r[h]).removeClass("hiddenLeft active hiddenRight"), h < c ? (t[h].className = "done", h < t.length - 1 && $(n[h]).addClass("hiddenLeft"), $(r[h]).addClass("hiddenLeft")) : h == c ? (t[h].className = "active", h < t.length - 1 && $(n[h]).addClass("active"), $(r[h]).addClass("active")) : h > c && (t[h].className = "", h < t.length - 1 && $(n[h]).addClass("hiddenRight"), $(r[h]).addClass("hiddenRight"))
    })
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
