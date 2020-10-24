const fs = require('fs')
const path = require('path')

const defaultOccupancy = {
  count: 0,
  maximum: 0,
  percent: 0,
  queue: 0
}
// add json to correct Filepath
function writeOccupancy(occupancy, location) {
  const timestamp = new Date(
    new Date().toLocaleString('en-us', { timeZone: 'Europe/Berlin' })
  )
  const day = timestamp.getDate()
  const month = timestamp.getMonth() + 1
  const year = timestamp.getFullYear()
  const filename = [year, month, day].join('-')
  const dir = path.join('data', location)
  const filepath = path.join(dir, filename + '.json')
  if (fs.existsSync(filepath)) {
    return fs.promises
      .readFile(filepath, 'utf-8')
      .then((data) => {
        const array = JSON.parse(data.toString())
        array.push({ ...defaultOccupancy, ...occupancy, timestamp: timestamp })
        return JSON.stringify(array, null, 2)
      })
      .then((data) => {
        fs.promises.writeFile(filepath, data)
      })
  } else {
    fs.promises.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err
    })
    const data = [{ ...defaultOccupancy, ...occupancy, timestamp: timestamp }]
    return fs.promises.writeFile(
      filepath,
      JSON.stringify(data, null, 2),
      'utf8'
    )
  }
}

module.exports = writeOccupancy
