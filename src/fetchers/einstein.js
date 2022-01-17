const boulderado = require('./boulderado')

const fetcher = () =>
  boulderado(
    'eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkVpbnN0ZWluTSJ9.uH9xRoVykz5fzofHc-JGigeHreaeTayel49o3FR6cNA'
  )

module.exports = fetcher
