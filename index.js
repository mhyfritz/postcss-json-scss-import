var postcss = require('postcss');
var fs = require('fs');

function getType(x) {
    const type = Object.prototype.toString.call(x);
    return / (\w+)/.exec(type)[1];
}

function isString(x) {
    return getType(x) === 'String';
}

function isObject(x) {
    return getType(x) === 'Object';
}

function convert(fileName) {
    var styles = fs.readFileSync(fileName, 'utf8');
    styles = JSON.parse(styles);
    var scss = '';
    var prop, value, mapProps, mapProp, i;

    for (prop of Object.keys(styles)) {
        value = styles[prop];
        if (isString(value)) {
            scss += '$' + prop + ': ' + value + ';\n';
        } else if (isObject(value)) {
            scss += '$' + prop + ': (' + '\n';
            mapProps = Object.keys(value);
            for (i = 0; i < mapProps.length - 1; i++) {
                mapProp = mapProps[i];
                scss += '  ' + mapProp + ': ' + value[mapProp] + ',\n';
            }
            mapProp = mapProps[mapProps.length - 1];
            scss += '  ' + mapProp + ': ' + value[mapProp] + '\n);\n';
        }
    }

    return scss;
}

module.exports = postcss.plugin('postcss-json-scss-import', function (opts) {
    opts = opts || {};

    return function (css) {
        css.walkAtRules(function (rule) {
            var identifier = rule.params;
            var isImport = rule.name === 'import';
            var isJSON = /\.json['"]$/.test(identifier);
            if (isImport && isJSON) {
                var scss = convert(identifier.replace(/['"]/g, ''));
                rule.replaceWith(scss);
            }
        });
    };
});
