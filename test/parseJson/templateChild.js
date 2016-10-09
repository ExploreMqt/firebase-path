import test from 'ava'
import sut from '../../lib/firebase-path'

test('template child is a function', t => {
    const children = sut.fromJson({'<fruit>': {}})

    t.is(typeof(children.fruit), 'function')
})

test('template child path is filled in at path', t => {
    const children = sut.fromJson({'<fruit>': {}})

    t.is(children.fruit('bannana').path(), 'bannana')
})

test('template child followed by named node path', t => {
    const children = sut.fromJson({'<foo>': {bar:{}}})

    t.is(children.foo('phoo').bar.path(), 'phoo/bar')    
})