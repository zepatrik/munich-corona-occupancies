const boulderado = require('./boulderado')

const fetcher = () =>
  boulderado(
    'eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IlN0ZWluYm9ja1Bhc3NhdTE3In0.jlrNfNWhp0xGk3YDJNN__j4rtMUKhd_B8sdi_93MThY'
  )

module.exports = fetcher
