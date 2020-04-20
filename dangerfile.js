// docs at https://github.com/vtex/danger
const { verify } = require('@vtex/danger')

verify({
  keepachangelog: {
    // set to 'true' to require a new version defined in the changelog change
    changeVersion: false,
  },
})



// docs at https://github.com/vtex/danger
const { assert } = require('@vtex/danger');

assert();