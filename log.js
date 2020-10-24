
const fs= require('fs');


// add json to correct Filepath
function writeDate(occupancy,location){
    date= JSON.stringify(occupancy)
    const timestamp = new Date(new Date().toLocaleString("en-us", {timeZone: "Europe/Berlin"}))
    const day=timestamp.getDate()
    const month = timestamp.getMonth()+1
    const year = timestamp.getFullYear()
    const filename = [year,month,day].join("-")

    const filepath = path.join("data",location,filename+".json")
    if (fs.existsSync(filepath)) {
        return fs.promises.readFile(filepath ,"utf-8").then(data =>{
            const array = JSON.parse(data.toString());
            array.push({...occupancy, "timestamp": timestamp})
            return JSON.stringify(array)
        }).then(data=>{
            fs.promises.writeFile(filepath,data)
        })
    }else{
        const data = [{...occupancy, "timestamp": timestamp}]
        return fs.promises.writeFile(filepath,JSON.stringify(data))
    }
}