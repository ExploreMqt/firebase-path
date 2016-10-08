(function(){
    'use strict'
const sut = require('./lib/firebase-path')

const schema = {
                    foo: {
                        bar: {}
                    }
                }
const children = sut.parseJson(undefined)

console.log(Object.keys(children))
}())
