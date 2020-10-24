const { argv, exit } = require("process");
const { bwo } = require("./src/fetchers/index")

var allCases = []
const registerCase = (c) => {
    allCases = [...allCases, c]
    return c
}

const main = async () => {
    switch (argv[2]) {
        case registerCase("bwo"):
            await bwo().then(console.log)
            break
        default:
            console.error(`location ${argv[2]} is unknown, use one of ${JSON.stringify(allCases)}`)
            exit(1)
    }
}

main()
