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
(function(){
    'use strict'

    const rootPrototype = {
        path: () => ''
    }

    const childPrototype = {
        path: function() { return buildPath(this) }
    }

    function buildPath(child) {
        // Walk up the tree to build the path to this child
        return isRoot(child.parent) ? child.key : `${buildPath(child.parent)}/${child.key}`
    }
    
    function fromJson(source){
        //Construct a tree of children from the sample schema layout
        const sourceJSON = source || {}
        return parseChildren(Object.create(rootPrototype), source)
    }

    function parseName(name) {
        //Strip template brackets if needed
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
        fromJson: fromJson
    }
}())
