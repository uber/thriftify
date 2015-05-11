// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

var grammar = require('./grammar');
var _compile = require('./compiled').compile;

function compileFileSync(specFile) {
    var syntax = grammar.parseFileSync(specFile);
    return _compile(syntax);
}

function compileFile(specFile, callback) {
    grammar.parseFile(specFile, handleSource);
    function handleSource(err, syntax) {
        if (err) {
            return callback(err);
        }
        var scope = _compile(syntax);
        callback(null, scope);
    }
}

function compile(source) {
    var syntax = grammar.parse(source);
    return _compile(syntax);
}

module.exports.compileFileSync = compileFileSync;
module.exports.compileFile = compileFile;
module.exports.compile = compile;
