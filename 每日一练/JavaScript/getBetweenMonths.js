// getBetweenMonths('2018-08', '2018-12'); // ['2018-9', '2018-10', '2018-11']

function getBetweenMonths(start, end) {
    let [startYear, startMon] = start.split('-')
    let [endYear, endMon] = end.split('-')
    const res = []
    while (startYear <= endYear) {
        if (+startMon === 12) {
            startYear = +startYear + 1
            startMon = 1
        } else {
            startMon = +startMon + 1
        }
        if (+startMon === +endMon) {
            if (+startYear === +endYear) {
                return res
            }
        }
        res.push(`${startYear}-${startMon >= 10 ? startMon : '0' + startMon}`)
    }
    console.log(res)
    return res
}

console.log(getBetweenMonths('2018-08', '2019-8'))