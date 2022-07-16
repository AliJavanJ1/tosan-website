export function toFarsiNumber(num) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return num
        .toString()
        .split('')
        .map(x =>  farsiDigits.includes(x) ? x : farsiDigits[x])
        .join('');
}