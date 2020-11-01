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
  const day = String(timestamp.getDate()).padStart(2, '0')
  const month = String(timestamp.getMonth() + 1).padStart(2, '0')
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
        return JSON.stringify(array)
      })
      .then((data) => fs.promises.writeFile(filepath, data))
  } else {
    const data = [{ ...defaultOccupancy, ...occupancy, timestamp: timestamp }]
    return fs.promises
      .mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err
      })
      .then(() => fs.promises.writeFile(filepath, JSON.stringify(data), 'utf8'))
  }
}

module.exports = writeOccupancy
