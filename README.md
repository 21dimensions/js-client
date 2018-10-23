# easyeasy-client

## How to use

### Install
```
npm install easyeasy-client
```

### Initialize

```js
var client = require('easyeasy-client')({
    key:"YOUR_APP_KEY"
});
```

### Examples

```js

var cat = {
        name: "Sam",
        age: 1.1,
        interests: ["play", "run", "eat"]
    }

    // add new object
    var id = await client.add("cat", cat);

    // get object by id
    cat = await client.getOne("cat", id);

    // update object
    cat.age = 1.5;
    await client.update("cat", cat);

    // get filtered array of objects.
    var allcats = await client.get("cat"); // return all cats
    var cats = await client.get("cat", { age: 1.5 }); // 1.5 years old cats
    cats = await client.get("cat", { age_gt: 1.0 }); // cats older than 1 year
    cats = await client.get("cat", { name_like: "Sa*" });

    //Learn more about filtering operators at: http://easyeasy.io/docs#/operators

    // paging

    cats = await client.get("cat", { _start: 20, _count: 20 });

    // ordering
    cats = await client.get("cat", { _orderby: "age" });
    cats = await client.get("cat", { _orderbydesc: "age" });

    //delete

    await client.del('cat', id);
```

# Licence
ISC
