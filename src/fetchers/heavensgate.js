const fetch = require('node-fetch')

const climbUrl =
  'https://210.webclimber.de/de/trafficlight?callback=WebclimberTrafficlight.insertTrafficlight&key=b8cab21X5BEfm2g8zr32eX1kgfwg1EQx&hid=210&container=trafficlightContainer_2&type=2&area=2'
const boulderUrl =
  'https://210.webclimber.de/de/trafficlight?callback=WebclimberTrafficlight.insertTrafficlight&key=b8cab21X5BEfm2g8zr32eX1kgfwg1EQx&hid=210&container=trafficlightContainer_1&type=2&area=1'

const mapping = [
  { url: boulderUrl, heavensId: 'b_heavens' },
  { url: climbUrl, heavensId: 'k_heavens' }
]

const occupancyPattern = /width:\s*(\d*)%/

const fetcher = () =>
  Promise.all(
    mapping.map(({ heavensId, url }) =>
      fetch(url)
        .then((res) => res.text())
        .then((html) => ({
          heavensId,
          percent: Number(html.match(occupancyPattern)[1])
        }))
    )
  )

module.exports = fetcher
