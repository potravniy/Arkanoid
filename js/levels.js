﻿define([], function () {
    //  It is just a visual map of bricks. Number corresponds the type ob brick. Apply for manual level construction.
    //  Valid values - number of brick type or for brick absence - 0, space, empty string, NaN, undefined and so on.
    var levels = [];        //  Index of variable means level number.
    levels[0] = undefined;  //  Level 0 is absent.
    levels[1] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 3, 1, 1, 1, 1, 3, 1, 1,  ],
            [ , 1, 1, 1, 3, 1, 1, 3, 1, 1, 1,  ],
            [ , 1, 1, 1, 2, 1, 1, 2, 1, 1, 1,  ],
            [ , 1, 1, 1, 1, 2, 2, 1, 1, 1, 1,  ],
            [ , 1, 1, 3, 1, 1, 1, 1, 3, 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[2] = [  
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 1,  ,  ,  , 1, 1,  ,  ,  , 1,  ],
            [ , 1, 1,  , 1, 1, 1, 1,  , 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 1, 3, 1, 1, 3, 1, 1, 1,  ],
            [ , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,  ],
            [ , 1, 1, 1, 2, 1, 1, 2, 1, 1, 1,  ],
            [ , 1, 1, 2, 1, 1, 1, 1, 2, 1, 1,  ],
            [ , 1, 4, 1, 1, 4, 4, 1, 1, 4, 1,  ],
            [ , 2, 1, 1, 1, 1, 1, 1, 1, 1, 2,  ],
            [2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 2],
    ];
    levels[3] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 2, 2,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  , 4, 3, 1, 1, 3, 4,  ,  ,  ],
            [ , 1, 1, 3, 1, 1, 1, 1, 3, 1, 1,  ],
            [ , 2, 1, 1, 2, 1, 1, 2, 1, 1, 2,  ],
            [ ,  , 2, 2, 1, 1, 1, 1, 2, 2,  ,  ],
            [ ,  ,  , 2, 1, 1, 1, 1, 2,  ,  ,  ],
            [ ,  ,  ,  , 2, 1, 1, 2,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[4] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 1,  ,  ,  ,  ,  ,  ,  ,  , 1,  ],
            [ , 1, 1,  ,  ,  ,  ,  ,  , 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 1, 3, 1, 1, 3, 1, 1, 1,  ],
            [ , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,  ],
            [ , 1, 1, 1, 2, 1, 1, 2, 1, 1, 1,  ],
            [ , 1, 1, 3, 1, 1, 1, 1, 3, 1, 1,  ],
            [ , 1, 3, 4, 1, 1, 1, 1, 4, 3, 1,  ],
            [ , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[5] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1,  ,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1, 1,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1,  , 1,  ,  ],
            [ , 2, 3, 3, 3, 2, 2, 3,  ,  , 1,  ],
            [ , 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,  ],
            [ , 4, 1, 1, 4, 1, 1, 4, 1, 1, 4,  ],
            [ , 1, 1, 2, 1, 1, 1, 1, 2, 1, 1,  ],
            [ , 1, 2, 3, 2, 1, 1, 2, 3, 2, 1,  ],
            [ ,  ,  , 2,  ,  ,  ,  , 2,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[6] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 1,  ,  ,  ,  ,  , 1,  ,  ,  ,  ],
            [ , 1, 1,  ,  ,  , 1, 1, 1,  ,  ,  ],
            [ , 1, 1, 1,  , 1, 1, 1, 1, 1,  ,  ],
            [ ,  , 1, 1, 2, 1, 1, 1, 2, 3, 1,  ],
            [ ,  , 1, 1, 2, 1, 1, 1, 2, 2, 1,  ],
            [ , 1, 1, 1,  , 1, 1, 1, 1, 1,  ,  ],
            [ , 1, 1,  ,  ,  , 1, 1, 1,  ,  ,  ],
            [ , 3,  ,  ,  ,  ,  , 3,  ,  ,  ,  ],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    levels[7] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 2, 2,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , 1, 1,  ,  ,  ,  ,  ],
            [ ,  ,  ,  , 3, 1, 1, 3,  ,  ,  ,  ],
            [ , 1, 1, 3, 4, 1, 1, 4, 3, 1, 1,  ],
            [ , 4, 1, 1, 2, 1, 1, 2, 1, 1, 4,  ],
            [ ,  , 2, 2, 1, 1, 1, 1, 2, 2,  ,  ],
            [ ,  ,  , 4, 1, 1, 1, 1, 4,  ,  ,  ],
            [ ,  ,  ,  , 2, 4, 4, 2,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[8] = [
            [2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [1, 2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [1, 1, 2,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [1, 1, 1, 2,  ,  ,  ,  ,  ,  ,  ,  ],
            [1, 2, 3, 1, 2,  ,  ,  ,  ,  ,  ,  ],
            [1, 2, 1, 2, 3, 2,  ,  ,  ,  ,  ,  ],
            [1, 1, 1, 3, 4, 1, 2,  ,  ,  ,  ,  ],
            [1, 4, 1, 1, 2, 1, 1, 2,  ,  ,  ,  ],
            [1, 3, 2, 2, 1, 1, 1, 1, 2,  ,  ,  ],
            [1, 1, 1, 3, 1, 1, 1, 3, 1, 2,  ,  ],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,  ],
            [4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4,  ],
    ];

    return levels;
})