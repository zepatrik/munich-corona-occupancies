const writeOccupancy = require('./src/writeToFolder')

// fetcher imports
const { bwo } = require('./src/fetchers/index')

// run fetcher
async function run() {
  await bwo().then((data) => writeOccupancy(data, 'bwo'))

  //...
}

run()
