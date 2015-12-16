import postcss from 'postcss';
import test from 'ava';

import plugin from '../';

function run(t, input, output, opts = {}) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('SASS map', t => {
    let input  = `@import 'test.json';\n` +
                 '.foo { }';
    let output = '$white: #fff;\n' +
                 '$black: #000;\n' +
                 '$profiles: (\n' +
                 '  facebook: #3b5998,\n' +
                 '  flickr: #0063db,\n' +
                 '  github: #4183c4\n' +
                 ');\n' +
                 '.foo { }';
    return run(t, input, output, {});
});
