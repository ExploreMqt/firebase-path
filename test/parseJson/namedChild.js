import test from 'ava'
import sut from '../../lib/firebase-path'

test('should parse a named child', t => {
    const schema = sut.parseJson({foo: {}})

    t.is(typeof(schema.foo), 'object')
})

test('Named child should have path function', t => {
    const schema = sut.parseJson({foo: {}})

    t.is(typeof(schema.foo.path), 'function')
})

test('For top level node, path should be identity', t => {
    const schema = sut.parseJson({foo: {}})

    t.is(schema.foo.path(), 'foo')
})

// test('Sould parse multiple nodes deep', t => {
//     const schema = sut.parseJson({
//                                     foo: { 
//                                         bar: {}
//                                     }
//                                 })
    
//     t.is(typeof(schema.foo.bar), 'object')
// })

// test('Second level child should have correct path', t => {
//     const schema = sut.parseJson({
//                                     foo: { 
//                                         bar: {}
//                                     }
//                                 })
    
//     t.is(typeof(schema.foo.bar), 'object')
// })