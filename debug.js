(function(){
    'use strict'
const sut = require('./lib/firebase-path')

const schema = {
                    foo: {
                        bar: {}
                    },
                    '<fruit>': {
                        peel: {}
                    }
                }
const children = sut.fromJson(schema)

const template = children.fruit('apple')

console.log(template.path())
}())
