import test from 'ava'
import sut from '../lib/firebase-path'

test('has isRootFunction', t => {
    t.is(typeof(sut.isRoot), 'function')
})

test('isRoot is true for undefined', t => {
    t.truthy(sut.isRoot(sut.parseJson()))
})

test('isRoot is true for empty', t => {
    t.truthy(sut.isRoot(sut.parseJson({})))
})

test('isRoot is true for empty', t => {
    t.truthy(sut.isRoot(sut.parseJson({foo:{}})))
})