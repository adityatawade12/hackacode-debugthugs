const Fuse = require('fuse.js')
const NGO = require('../models/Ngo')

module.exports = {
    search: async (param) => {
        try {
            const ngo = await NGO.find({})

            const options = {
                // isCaseSensitive: false,
                // includeScore: false,
                // shouldSort: true,
                // includeMatches: false,
                // findAllMatches: false,
                // minMatchCharLength: 1,
                // location: 0,
                // threshold: 0.6,
                // distance: 100,
                // useExtendedSearch: false,
                // ignoreLocation: false,
                // ignoreFieldNorm: false,

                keys: [
                    "NgoName",
                    "owner",
                ]
            };

            const fuse = new Fuse(ngo, options);

            // Change the pattern
            const pattern = param
            const searchresults = fuse.search(pattern)
            return searchresults;
        }
        catch (err) {
            console.log(err)
        }

    },
}