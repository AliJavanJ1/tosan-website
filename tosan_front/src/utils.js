export function toFarsiNumber(num) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return num
        .toString()
        .split('')
        .map(x =>  farsiDigits.includes(x) ? x : farsiDigits[x])
        .join('');
}

export function objectToList(object) {
    let reordered_data = []
    for(let i in object[Object.keys(object)[0]]) {
        let row = {}
        for(let key in object)
            row[key] = object[key][i]
        reordered_data.push(row)
    }
    return reordered_data
}