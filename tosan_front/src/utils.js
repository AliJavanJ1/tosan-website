import _ from "lodash";
import {useParams} from "react-router-dom";
import {useMemo} from "react";
import {useSelector} from "react-redux";

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

export function useProductFromURL(){
    const {main: currentCategory, sub1: currentSubCategory1, fullname: currentFull_name} = useParams()
    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    const product = useMemo(() => {
        if(allProducts.length) {
            const tmpProducts = allProducts.filter((product) =>
                product.main_name === currentCategory &&
                product.sub_name1 === currentSubCategory1 &&
                product.full_name === currentFull_name)
            if (tmpProducts.length !== 1) {
                console.warn('two products with the same main_name, sub1, fullname')
            }
            return tmpProducts[0]
        } else{
            return null
        }
    }, [currentCategory, currentSubCategory1, currentFull_name, allProducts, allProducts.length]);
    return product
}

export function useProductFromId(id){
    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    const product = useMemo(() => {
        if(allProducts.length){
            const filteredById = allProducts.filter((product)=>product.product_id === id)
            console.assert(filteredById.length===1)
            return(filteredById[0])
        }
    }, [id, allProducts, allProducts.length]);
    return product
}

export function combinedToFarsi(str){
    let farsiStr = _.chain(str).map(char => {
        if (!isNaN(char)) {
            return toFarsiNumber(char)
        } else {
            return char
        }
    }).join('').value()
    return farsiStr
}
