import test from 'ava'
import sut from '../../lib/firebase-path'

test('should be a function', t => {
    t.is(typeof(sut.parseJson), 'function')
})

test('should give back just a root if given undefined', t => {
    const root = sut.parseJson()

    t.deepEqual(Object.keys(root), ['parent', 'path', 'reference'])
})

test('path is a function', t => {
    const root = sut.parseJson()

    t.is(typeof(root.path), 'function')
})

test('path of root is an empty string', t => {
    const root = sut.parseJson()

    t.is(root.path(), '')
})

test('empty object gives root with path as an empty string', t => {
    const root = sut.parseJson({})

    t.is(root.path(), '')
})