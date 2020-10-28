const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
const dav_mapping = require('../helpers/dav_mapping')
const davMapping = require('../helpers/dav_mapping')

const fetcher = () =>
  fetch(
    'https://tickboard.de/public/pos_manager/CustomerEntries/getEntriesLeft'
  )
    .then((res) => res.text())
    .then((html) => {
      const root = parse(html)
      return root
        .querySelectorAll('.sys-hall-limit-value .badge')
        .map((badge, i) => ({
          davId: dav_mapping[i].id,
          maximum: davMapping[i].maximum,
          currentFree: parseInt(badge.text)
        }))
        .map(({ maximum, currentFree, ...rest }) => ({
          maximum,
          count: maximum - currentFree,
          percent: 100 - Math.round((currentFree / maximum) * 100),
          ...rest
        }))
    })

module.exports = fetcher
