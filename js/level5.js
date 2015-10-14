define([], function () {
    //  It is just a visual map of bricks. Number corresponds the type ob brick. Apply for manual level construction.
    //  Valid values - number of brick type or for brick absence - 0, space, empty string, NaN, undefined and so on.
    var bricks = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1,  ,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1, 1,  ,  ,  ],
            [ , 2, 2, 2, 2, 2, 2, 1,  , 1,  ,  ],
            [ , 2, 3, 3, 3, 2, 2, 3,  ,  , 1,  ],
            [ , 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,  ],
            [ , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ],
            [ , 1, 1, 2, 1, 1, 1, 1, 2, 1, 1,  ],
            [ , 1, 2, 3, 2, 1, 1, 2, 3, 2, 1,  ],
            [ ,  ,  , 2,  ,  ,  ,  , 2,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    return bricks;
})
