(function(){
    'use strict'

    const root = {
        parent: undefined,
        path: () => '',
        reference: () => {},
    }

    const childPrototype = {
        path: function() { return this.key },
    }

    function parseJson(source){
        const sourceJSON = source || {}
        return parseChildren(Object.assign({}, root), source)
    }

    function parseChildren(parent, node){
        Object.keys(node || {})
        .forEach(child => {
            parent[child] = Object.assign({key: child}, childPrototype)
            // parseChildren(child, parent[child])
        })
        return parent
    }

    module.exports = {
        parseJson: parseJson
    }
}())
