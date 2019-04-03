'use strict';
const MongoClient = require('mongodb').MongoClient;

// So what is this?

// We need the program to go forever! so probably we need to make a loop.

// It needs to make contact with the right database.

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

          } catch (err) {
            console.log(err.stack);
          }

          client.close();
})();
        adjustPopularityEveryDay(++i);
    }, 86400000)
}

adjustPopularityEveryDay(0);
