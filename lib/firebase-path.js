(function(){
    'use strict'

    const rootPrototype = {
        parent: undefined,
        path: () => '',
        reference: () => {},
    }

    const childPrototype = {
        path: function() { return buildPath(this) }
    }

    function parseJson(source){
        const sourceJSON = source || {}
        return parseChildren(Object.create(rootPrototype), source)
    }

    function parseChildren(parent, node){
        Object.keys(node || {})
        .forEach(child => {
            parent[child] = Object.create(childPrototype)
            parent[child].key = child
            parent[child].parent = parent
            parseChildren(parent[child], node[child])
        })
        return parent
    }

    function buildPath(child) {
        return isRoot(child.parent) ? child.key : `${buildPath(child.parent)}/${child.key}`
    }

    function isRoot(obj){
        return rootPrototype.isPrototypeOf(obj)
    }

    // function isNamedChild(obj){
    //     return childPrototype.isPrototypeOf(obj)
    // }

    module.exports = {
        isRoot: isRoot,
        parseJson: parseJson
    }
}())
