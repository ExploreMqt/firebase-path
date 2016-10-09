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

test('isRoot is false for first child', t => {
    const children = sut.parseJson({foo:{}})

    t.falsy(sut.isRoot(children.foo))
})



test('has isChild function', t => {
    t.is(typeof(sut.isChild), 'function')
})

test('isChild is false for root', t => {
    t.falsy(sut.isChild(sut.parseJson()))
})

test('isChild is true for first child', t => {
    const children = sut.parseJson({foo:{}})

    t.truthy(sut.isChild(children.foo))
})



test('has isPath function', t => {
    t.is(typeof(sut.isPath), 'function')
})

test('isPath is true for root', t => {
    const children = sut.parseJson({foo:{}})

    t.truthy(sut.isPath(children))
})

test('isPath is true for child', t => {
    const children = sut.parseJson({foo:{}})

    t.truthy(sut.isPath(children.foo))
})