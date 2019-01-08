'use strict';


// So what is this?

// We need the program to go forever! so probably we need to make a loop.

// It needs to make contact with the right database.

// Infinite recursion?

function adjustPopularityEveryDay(i) {
    setTimeout(() => {
        console.log('Infinite Loop has been going for how many days?', i);
        adjustPopularityEveryDay(++i);
    }, 2000)
}

adjustPopularityEveryDay(0);
