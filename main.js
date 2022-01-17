const writeOccupancy = require('./src/writeToFolder')
const {
  boulderwelt,
  swm,
  einstein,
  dav,
  heavensgate,
  steinbock
} = require('./src/fetchers/index')
const swmMapping = require('./src/helpers/swm_mapping')

// run fetcher
async function run() {
  await Promise.all([
    boulderwelt().then((data) =>
      Promise.all(data.map(({ bwId, ...rest }) => writeOccupancy(rest, bwId)))
    ),
    einstein().then((data) => writeOccupancy(data, 'b_ei')),
    swm().then((data) =>
      Promise.all(
        data.map(({ swmId, ...rest }) =>
          writeOccupancy(rest, swmMapping[swmId].short)
        )
      )
    ),
    dav().then((data) =>
      Promise.all(data.map(({ davId, ...rest }) => writeOccupancy(rest, davId)))
    ),
    heavensgate().then((data) => writeOccupancy(data, 'heavensgate')),
    steinbock().then((data) => writeOccupancy(data, 'b_sb'))
  ])
}

run()
