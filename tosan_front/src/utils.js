import _ from "lodash";
import {useParams} from "react-router-dom";

export function toFarsiNumber(num, addSplitter=false, minLen=null) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let res = num
        .toString()
        .split('')
        .map(x =>  farsiDigits.includes(x) ? x : farsiDigits[x])
        .join('')
    if (addSplitter)
        res = _.chunk(res.split("").reverse(), 3).map(element => element.reverse().join("")).reverse().join()
    if(minLen) {
        const extraLen = Math.max(0, minLen - String(num).length)
        res = farsiDigits[0].repeat(extraLen).concat("", res)
    }
    return res
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

export function getProductUrl(category, subname1, fullanme){
    return '/products/' + [category, subname1, fullanme]
        .reverse().join('/')
}

export function useProductParams(){
    let {main: currentCategory, sub1: currentSubCategory1, fullname: currentFull_name} = useParams()
    return [currentCategory, currentSubCategory1, currentFull_name]
}