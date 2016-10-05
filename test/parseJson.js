import test from 'ava'
import sut from '../lib/firebase-path'

test('should be a function', t => {
    t.is(typeof(sut.parseJson), 'function')
})