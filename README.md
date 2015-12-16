# PostCSS JSON SCSS Import [![Build Status][ci-img]][ci]

[PostCSS] plugin to import JSON into SCSS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mhyfritz/postcss-json-scss-import.svg
[ci]:      https://travis-ci.org/mhyfritz/postcss-json-scss-import

WORK IN PROGRESS

## Example

### Input

SCSS:
```scss
@import 'test.json';
.foo { }
```

test.json:
```JSON
{
  "white": "#fff",
  "black": "#000",
  "profiles": {
    "facebook": "#3b5998",
    "flickr": "#0063db",
    "github": "#4183c4"
  }
}
```

### Output

SCSS:
```scss
$white: #fff;
$black: #000;
$profiles: (
  facebook: #3b5998,
  flickr: #0063db,
  github: #4183c4
);
.foo { }
```

## Usage

```js
postcss([ require('postcss-json-scss-import') ])
```

See [PostCSS] docs for examples for your environment.
