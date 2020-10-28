const { argv, exit } = require('process')
const { bwo, swm, b_ei, dav } = require('./src/fetchers/index')

const swmMappings = require('./src/helpers/swm_mapping')

var allCases = []
const registerCase = (c) => {
  allCases = [...allCases, c]
  return c
}

const main = async () => {
  switch (argv[2]) {
    case registerCase('bwo'):
      await bwo().then(console.log)
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
    case registerCase('b_ei'):
      await b_ei().then(console.log)
      break
    case registerCase('dav'):
      await dav().then(console.log)
      break
    default:
      console.error(
        `location ${argv[2]} is unknown, use one of ${JSON.stringify(allCases)}`
      )
      exit(1)
  }
}

main()
