/*
  ISC License
  Copyright (c) [2016], [Jim Argeropoulos]
  
  Permission to use, copy, modify, and/or distribute this software for any 
  purpose with or without fee is hereby granted, provided that the above 
  copyright notice and this permission notice appear in all copies.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
  FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM 
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR 
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR 
  PERFORMANCE OF THIS SOFTWARE.
*/
import test from 'ava'
import sut from '../../lib/firebase-path'

test('should parse a named child', t => {
    const schema = sut.fromJson({foo: {}})

    t.is(typeof(schema.foo), 'object')
})

test('Named child should have path function', t => {
    const schema = sut.fromJson({foo: {}})

    t.is(typeof(schema.foo.path), 'function')
})

test('For top level node, path should be identity', t => {
    const schema = sut.fromJson({foo: {}})

    t.is(schema.foo.path(), 'foo')
})

test('Sould parse multiple nodes deep', t => {
    const schema = sut.fromJson({
                                    foo: { 
                                        bar: {}
                                    }
                                })
    
    t.is(typeof(schema.foo.bar), 'object')
})

test('Second level child should have correct path', t => {
    const schema = sut.fromJson({
                                    foo: { 
                                        bar: {}
                                    }
                                })
    
    t.is(typeof(schema.foo.bar), 'object')
})

test('Second level child path should include first', t => {
    const schema = sut.fromJson({
                                    foo: { 
                                        bar: {}
                                    }
                                })
    
    t.is(schema.foo.bar.path(), 'foo/bar')
})