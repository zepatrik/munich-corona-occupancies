const fetch = require('node-fetch')

const fetcher = () => fetch('https://www.boulderwelt-muenchen-ost.de/wp-admin/admin-ajax.php', {
    headers: {
        accept: '*/*',
        'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        pragma: 'no-cache',
        'x-requested-with': 'XMLHttpRequest',
    },
    body: 'action=cxo_get_crowd_indicator',
    method: 'POST',
    mode: 'cors',
})
    .then((res) => res.json())
// .then(({ percent, queue }) => ({ percent, queue }))

module.exports = fetcher
