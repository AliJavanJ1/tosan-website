import _ from "lodash";
import {useParams} from "react-router-dom";
import {useMemo} from "react";
import {useSelector} from "react-redux";

export function toFarsiNumber(num, addSplitter = false, minLen = null) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    let res = num
        .toString()
        .split('')
        .map(x => farsiDigits.includes(x) ? x : farsiDigits[x])
        .join('')
    if (addSplitter)
        res = _.chunk(res.split("").reverse(), 3).map(element => element.reverse().join("")).reverse().join()
    if (minLen) {
        const extraLen = Math.max(0, minLen - String(num).length)
        res = farsiDigits[0].repeat(extraLen).concat("", res)
    }
    return res
}

export function toFarsiNumberE(num, addSplitter = false) {
    if (isNaN(num)) {
        console.assert(!isNaN(num), `num ${num} is NaN`)
        return num
    }
    const translateMap = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '.': '/',
    }
    let res = num
        .toString()
        .split('')
        .map(x => {
            // console.log(x, x in translateMap, translateMap[x])
            return x in translateMap ? translateMap[x] : x
        })
        .join('')
    if (addSplitter) {
        let parts = res.split('/')
        let part1 = _.chunk(parts[0].split("").reverse(), 3).map(element => element.reverse().join("")).reverse().join()
        res = parts.length > 1 ? [part1, parts[1]].join('/') : part1
    }
    return res
}

export function toFarsiNumberMix(str) {
    let farsiStr = _.chain(str)
        .split(' ').map(part => isNaN(part) ? part : toFarsiNumberE(part)).join(' ')
        .map(char => {
            if (!isNaN(char) && char !== ' ') {
                return toFarsiNumberE(char)
            } else {
                return char
            }
        }).join('').value()
    return farsiStr
}

export function objectToList(object) {
    let reordered_data = []
    for (let i in object[Object.keys(object)[0]]) {
        let row = {}
        for (let key in object)
            row[key] = object[key][i]
        reordered_data.push(row)
    }
    return reordered_data
}

export function getProductUrl(category, subname1, fullanme) {
    return '/products/' + [category, subname1, fullanme]
        .reverse().join('/')
}

export function useProductFromURL() {
    const {main: currentCategory, sub1: currentSubCategory1, fullname: currentFull_name} = useParams()
    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    const product = useMemo(() => {
        if (allProducts.length) {
            const tmpProducts = allProducts.filter((product) =>
                product.main_name === currentCategory &&
                product.sub_name1 === currentSubCategory1 &&
                product.full_name === currentFull_name)
            if (tmpProducts.length > 1) {
                console.warn('two products with the same main_name, sub1, fullname')
            }
            if (tmpProducts.length === 0) {
                console.warn('no product with these specs found')
            }
            return tmpProducts[0]
        } else {
            return null
        }
    }, [currentCategory, currentSubCategory1, currentFull_name, allProducts, allProducts.length]);
    return product
}

export function useProductFromId(id) {
    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    const product = useMemo(() => {
        if (allProducts.length) {
            const filteredById = allProducts.filter((product) => product.product_id === id)
            console.assert(filteredById.length === 1)
            return (filteredById[0])
        }
    }, [id, allProducts, allProducts.length]);
    return product
}
