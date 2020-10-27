const writeOccupancy = require('./src/writeToFolder')
const { bwo, swm, b_ei } = require('./src/fetchers/index')
const swmMapping = require('./src/helpers/swm_mapping')

// run fetcher
async function run() {
  await bwo().then((data) => writeOccupancy(data, 'bwo'))
  await b_ei().then((data) => writeOccupancy(data, 'b_ei'))
  await swm().then((data) =>
    Promise.all(
      data.map(({ swmId, ...rest }) =>
        writeOccupancy(rest, swmMapping[swmId].short)
      )
    )
  )
  //...
}

run()
