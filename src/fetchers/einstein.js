const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

const fetcher = () =>
  fetch(
    'https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkVpbnN0ZWluTSJ9.uH9xRoVykz5fzofHc-JGigeHreaeTayel49o3FR6cNA'
  )
    .then((res) => res.text())
    .then((html) => {
      const root = parse(html)
      const count = parseInt(
        root.querySelector('div.actcounter-content').childNodes[0].text
      )
      const free = parseInt(
        root.querySelector('div.freecounter-content').childNodes[0].text
      )

      const maximum = count + free
      const percent = Math.round((count / maximum) * 100)
      return { count, percent, maximum }
    })

module.exports = fetcher
