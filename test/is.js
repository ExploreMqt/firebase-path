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
import sut from '../lib/firebase-path'

test('has isRootFunction', t => {
    t.is(typeof(sut.isRoot), 'function')
})

test('isRoot is true for undefined', t => {
    t.truthy(sut.isRoot(sut.fromJson()))
})

test('isRoot is true for empty', t => {
    t.truthy(sut.isRoot(sut.fromJson({})))
})

test('isRoot is true for empty', t => {
    t.truthy(sut.isRoot(sut.fromJson({foo:{}})))
})

test('isRoot is false for first child', t => {
    const children = sut.fromJson({foo:{}})

    t.falsy(sut.isRoot(children.foo))
})



test('has isChild function', t => {
    t.is(typeof(sut.isChild), 'function')
})

test('isChild is false for root', t => {
    t.falsy(sut.isChild(sut.fromJson()))
})

test('isChild is true for first child', t => {
    const children = sut.fromJson({foo:{}})

    t.truthy(sut.isChild(children.foo))
})



test('has isPath function', t => {
    t.is(typeof(sut.isPath), 'function')
})

test('isPath is true for root', t => {
    const children = sut.fromJson({foo:{}})

    t.truthy(sut.isPath(children))
})

test('isPath is true for child', t => {
    const children = sut.fromJson({foo:{}})

    t.truthy(sut.isPath(children.foo))
})