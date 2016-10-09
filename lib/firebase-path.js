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

    function parseName(name) {
        return (/^<\w+>$/.test(name)) ? name.substr(1, name.length-2) : name
    }

    function parseChildren(parent, node){
        Object.keys(node || {})
        .forEach(child => {
            const childName = parseName(child)
            parent[childName] = Object.create(childPrototype)
            if (childName !== child) 
                parent[childName] = key => {
                    //This is a template node being completed at run time
                    const templateChild = Object.create(childPrototype)
                    templateChild.key = key
                    templateChild.parent = parent
                    return parseChildren(templateChild, node[child])
                }
            else
                parent[childName].key = child
            parent[childName].parent = parent
            parseChildren(parent[childName], node[child])
        })
        return parent
    }

    function buildPath(child) {
        return isRoot(child.parent) ? child.key : `${buildPath(child.parent)}/${child.key}`
    }

    function isRoot(obj){
        return rootPrototype.isPrototypeOf(obj)
    }

    function isChild(obj){
        return childPrototype.isPrototypeOf(obj)
    }

    module.exports = {
        isChild: isChild,
        isPath: obj => isRoot(obj) || isChild(obj),
        isRoot: isRoot,
        parseJson: parseJson
    }
}())
