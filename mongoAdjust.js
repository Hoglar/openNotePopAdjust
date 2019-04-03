'use strict';
const MongoClient = require('mongodb').MongoClient;

// So what is this?

// We need the program to go forever! so probably we need to make a loop.

// Infinite recursion?

const dbName = "notes";
const url = 'mongodb://localhost:27017';

function adjustPopularityEveryDay(i) {
    setTimeout(() => {
        console.log('Infinite Loop has been going for how many days?', i);

        (async function() {
  // Connection URL
          const client = new MongoClient(url, { useNewUrlParser: true });

          try {
            // Use connect method to connect to the Server
            await client.connect();
            console.log("Success conecting to database");

            const db = client.db(dbName);

            let collections = await db.listCollections().toArray();

            collections.forEach((collection) => {
                db.collection(collection.name).updateMany(
                    {"score.popularity": { $gt: 1 }},
                    {
                        $mul: {
                        "score.popularity": 0.5
                        }
                    }
                )
            })

            // Over we update the popularity. Under we can make the topic analytics.

            //We got the variable collections. this gives us all the collection names, but nothing more.

            // We need to get the size of all collections. lets see how we can do this.

            let collectionInfo = [];
            let processCounter = 0;
            collections.forEach((collection) => {
                db.collection(collection.name).stats({}, function(err, stats) {

                    let collectionSize = {
                        name: collection.name,
                        size: stats.size
                    }
                    collectionInfo.push(collectionSize)
                    if(collections.length === collectionInfo.length) {
                        let sortedCollections = letsSort(collectionInfo).splice(0,10);

                        console.log(sortedCollections)
                        // We write the created array to a fil

                    }
                })
            })
            // Then we need to put all collections with size intp an array and then sort it based on size.
            //We then need to save this somehow in a file i guess.
          } catch (err) {
            console.log(err.stack);
          }

          client.close();
})();
        adjustPopularityEveryDay(++i);
    }, 4000)
}

adjustPopularityEveryDay(0);


function letsSort(arrayToSort) {
    arrayToSort.sort(compare)
    return arrayToSort;
}

function compare(a,b) {
  if (a.size < b.size)
    return 1;
  if (a.size > b.size)
    return -1;
  return 0;
}
