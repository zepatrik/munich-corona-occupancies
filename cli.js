const { argv, exit } = require('process')
const {
  boulderwelt,
  swm,
  einstein,
  dav,
  heavensgate,
  steinbock
} = require('./src/fetchers/index')

const swmMappings = require('./src/helpers/swm_mapping')

var allCases = []
const registerCase = (c) => {
  allCases = [...allCases, c]
  return c
}

const main = async () => {
  switch (argv[2]) {
    case registerCase('boulderwelt'):
      await boulderwelt().then(console.log)
      break
    case registerCase('swm'):
      await swm()
        .then((data) =>
          data.map(({ swmId, ...rest }) => ({
            ...swmMappings[swmId],
            ...rest
          }))
        )
        .then(console.log)
      break
    case registerCase('einstein'):
      await einstein().then(console.log)
      break
    case registerCase('dav'):
      await dav().then(console.log)
      break
    case registerCase('heavensgate'):
      await heavensgate().then(console.log)
      break
    case registerCase('steinbock'):
      await steinbock().then(console.log)
      break
    default:
      console.error(
        `location ${argv[2]} is unknown, use one of ${JSON.stringify(allCases)}`
      )
      exit(1)
  }
}

main()
