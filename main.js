const writeOccupancy = require('./src/writeToFolder')
const { bwo, swm, einstein, dav } = require('./src/fetchers/index')
const swmMapping = require('./src/helpers/swm_mapping')

// run fetcher
async function run() {
  await Promise.all([
    bwo().then((data) => writeOccupancy(data, 'boulder_welt_ost')),
    einstein().then((data) => writeOccupancy(data, 'boulder_einstein')),
    swm().then((data) =>
      Promise.all(
        data.map(({ swmId, ...rest }) =>
          writeOccupancy(rest, swmMapping[swmId].short)
        )
      )
    ),
    dav().then((data) =>
      Promise.all(data.map(({ davId, ...rest }) => writeOccupancy(rest, davId)))
    )
  ])
}

run()
