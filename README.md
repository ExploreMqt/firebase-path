firebase-path helps you get rid of magic strings when addresing nodes of your database. 

You supply firebase-path with a JSON model of your document structure and then you can use a JSON path like API 
to create the compound paths you need to interact with the firebase API.

## Quick Overview
The Firebase API takes a path built of node names separated by slashes. Take the following database 
for example: 
```
crackling-fire-1555  
 |-- books
     |-- -KNoPkHeKNH4M2vogoWG
     |   |-- author: "Wells, H.G." 
     |   |-- title: "The Time Machine" 
     |
     |-- -KNwSOCCgPxnJr_lfdPR
     |   |-- author: "Azimov, Isaac"
     |   |-- title: "Caves of Steel"
     |
     |-- -KNwrrfKCZQU2z303jsj
         |-- author: "Verne, Jules"
         |-- title: "Mysterious Island"
```
It is made up of both well defined nodes and some that were created with the Firebase push API. 
To create a reference to the book by Jules Verne you would need this path ```"books/-KNwrrfKCZQU2z303jsj"```
There are multiple ways to construct a path using constants, but all seemed lacking. 

firebase-path lets you define a simple json schema
```
const schema = {
                    books: {
                        '<bookId>': {
                            author: {},
                            title: {}
                        }
                    }
                }
``` 
And convert that to an object tree
```
const children = firebasePath.fromJson(schema)
```
Using that tree, you can request a path
```
const authorPath = children
                    .books
                    .bookId('-KNwrrfKCZQU2z303jsj')
                    .author
                    .path()
// 'books/-KNwrrfKCZQU2z303jsj/author'
const ref = firebase.database().ref(authorPath)
``` 

## Types of children
There are two types of children in the object tree; named and template.
A named child is created when the name of the document key is designed ahead of time. In our example the 
named children are *books*, *author*, and *title*.

A template child is created where you don't know what the key name in the database will be until after the
the completion of calling firebase's push operation. In other words you can't know the key name until after 
the data has been added to firebase. You specify a template node by wrapping a meaningful name in less than 
and greater than symbols. In our example *bookId* is the only template node.

## API
Each node has the following properties:

**key** the name of the current child within the path.

**path** a function that returns a full path string needed to interact with the firebase API.

There are also three static API functions:

**isRoot** a function that returns true if the object passed to it is the root of the firebase-path 
object tree. In our example isRoot would return true when it is pased the *children* variable.

**isChild** a function that returns true if the object passed to it is a decendent of the root element. 

**isPath** a function that returns true if theh object passed is either a root or a child element.

These API will be useful if you are building tools that expect a path element to be passed to it.