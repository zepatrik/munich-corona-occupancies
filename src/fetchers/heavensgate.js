const fetch = require('node-fetch')

const occupancyPattern = /width:\s*(\d*)%/

const fetcher = () =>
  fetch(
    'https://210.webclimber.de/de/trafficlight?callback=WebclimberTrafficlight.insertTrafficlight&key=b8cab21X5BEfm2g8zr32eX1kgfwg1EQx&hid=210&container=trafficlightContainer_3&type=2&area=3'
  )
    .then((res) => res.text())
    .then((html) => ({
      percent: Number(html.match(occupancyPattern)[1])
    }))

module.exports = fetcher
