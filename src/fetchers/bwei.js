const fetch = require('node-fetch')
const $ = require('cheerio')

const fetcher = () =>
  fetch(
    'https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkVpbnN0ZWluTSJ9.uH9xRoVykz5fzofHc-JGigeHreaeTayel49o3FR6cNA'
  )
    .then((res) => res.text())
    .then((html) => {
      const count = parseInt(
        $('div.actcounter-content', html).children().text()
      )
      const free = parseInt(
        $('div.freecounter-content', html).children().text()
      )
      const maximum = count + free
      const percent = (count / maximum) * 100
      return { count, percent, maximum }
    })
    .then((data) => data)
module.exports = fetcher
