const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

const fetcher = (token) =>
  fetch(
    `https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=${token}`
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
