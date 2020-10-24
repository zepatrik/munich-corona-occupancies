
const fs = require('fs')
const path = require('path')

// add json to correct Filepath
function writeOccupancy(occupancy, location) {
  date = JSON.stringify(occupancy)
  const timestamp = new Date(
    new Date().toLocaleString('en-us', { timeZone: 'Europe/Berlin' })
  )
  const day = timestamp.getDate()
  const month = timestamp.getMonth() + 1
  const year = timestamp.getFullYear()
  const filename = [year, month, day].join('-')
  const dir = path.join('data', location)
  const filepath = path.join(dir, filename + '.json')
  console.log(filepath)
  console.log(fs.existsSync(filepath))
  if (fs.existsSync(filepath)) {
    return fs.promises
      .readFile(filepath, 'utf-8')
      .then((data) => {
        const array = JSON.parse(data.toString())
        array.push({ ...occupancy, timestamp: timestamp })
        return JSON.stringify(array)
      })
      .then((data) => {
        fs.promises.writeFile(filepath, data)
      })
  } else {
    fs.promises.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err
    })
    const data = [{ ...occupancy, timestamp: timestamp }]
    console.log(JSON.stringify(data))
    return fs.promises.writeFile(filepath, JSON.stringify(data), 'utf8')
  }
}

module.exports = writeOccupancy
