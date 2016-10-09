import test from 'ava'
import sut from '../../lib/firebase-path'

test('should be a function', t => {
    t.is(typeof(sut.fromJson), 'function')
})

test('path is a function', t => {
    const root = sut.fromJson()

    t.is(typeof(root.path), 'function')
})

test('path of root is an empty string', t => {
    const root = sut.fromJson()

    t.is(root.path(), '')
})
