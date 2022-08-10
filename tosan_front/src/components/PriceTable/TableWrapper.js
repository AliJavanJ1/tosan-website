import React, {useMemo} from 'react';
import {Stack} from "@mui/material";
import PriceTable from "./PriceTable";
import {useSelector} from "react-redux";
import {toFarsiNumberMix, toFarsiNumber, useProductFromURL} from "../../utils";
import _ from "lodash"
import SpecialOffer from "../SpecialOffer";

const TableWrapper = () => {
    const productObj = useProductFromURL()
    const selectedSplits = useSelector(store => store.filter.checkBoxFilter.split)
    // const selectedSplits = ['12']
    // const selectedSplits = ['18']
    // const selectedSplits = ['18', '12']
    // const selectedSplits = []
    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    const prices = useSelector(store => store.price ? store.price : [])
    const specialOffers = useMemo(() => {
        if (!productObj) {
            return []
        }
        const sameFullname = prices.filter(price => price.product_name === productObj.main_name && price.product_sub_name === productObj.sub_name1 && price.display_name === productObj.full_name && price.price !== price.offer_price)
        const sameSub1 = prices.filter(price => price.product_name === productObj.main_name && price.product_sub_name === productObj.sub_name1 && price.display_name !== productObj.full_name && price.price !== price.offer_price)
        const sameMainName = prices.filter(price => price.product_name === productObj.main_name && price.product_sub_name !== productObj.sub_name1 && price.display_name !== productObj.full_name && price.price !== price.offer_price)
        const sameNothing = prices.filter(price => price.product_name !== productObj.main_name && price.product_sub_name !== productObj.sub_name1 && price.display_name !== productObj.full_name && price.price !== price.offer_price)
        return _.concat(sameFullname, sameSub1, sameMainName, sameNothing).map(offer => {
            let offerProductObj = allProducts.filter(product => product.product_id === offer.product_id)
            console.assert(offerProductObj.length === 1)
            offerProductObj = offerProductObj[0]
            return {
                title: offer.display_name + ' ' + offer.attrs_vals[offerProductObj.split_by_attr],
                previousPrice: offer.price,
                currentPrice: offer.offer_price,
                image: offerProductObj.product_image_offer,
            }
        })
    }, [prices, prices.length]);
    const filteredGroupedPrices = useMemo(() => {
        if (!productObj) {
            return {}
        }
        return (_.chain(prices)
            .filter(price => (price.product_id === productObj.product_id && (!selectedSplits.length || selectedSplits.includes(price.attrs_vals[productObj.split_by_attr]))))
            .groupBy((price) => price.attrs_vals[productObj.split_by_attr])
            .value())
    }, [productObj, selectedSplits, selectedSplits.length, prices, prices.length])

    const filteredGroupedPricesSortedKeys = useMemo(() => {
        let keys = _.keys(filteredGroupedPrices)
        if (_.some(keys, isNaN)) {
            keys = _.sortBy(keys)
        } else {
            keys = _.sortBy(keys, parseInt)
        }
        // keys = _.map(keys, key => {
        //     return _.chain(key).map(char => {
        //         if (!isNaN(char)) {
        //             return toFarsiNumber(char)
        //         } else {
        //             return char
        //         }
        //     }).join('').value()
        // })
        return keys
    }, [filteredGroupedPrices])
    const displayFilteredGroupedPricesSortedKeys = useMemo(() => {
        const keys = filteredGroupedPricesSortedKeys
        const displayKeys = _.reduce(keys, (acc,key) => {
            let displayKey = toFarsiNumberMix(key)
            acc[key] = displayKey
            return acc
        }, {})
        return displayKeys
    }, [filteredGroupedPricesSortedKeys, filteredGroupedPricesSortedKeys.length]);

    // console.log(displayFilteredGroupedPricesSortedKeys)
    // console.log(filteredGroupedPricesSortedKeys)
    // console.log(filteredGroupedPrices)
    // console.log(specialOffers)

    return (<Stack
        boxShadow="1px 3px 12px rgba(0, 0, 0, 0.08)"
        borderRadius="8px"
        rowGap="76px"
        paddingX="15px"
        paddingY="52px"
        sx={{
            backgroundColor: "white.shade3"
        }}
    >
        {_.chain(filteredGroupedPricesSortedKeys).chunk(2).map((chunkKeys, index) => {
            const arr = chunkKeys.map(sliceKey => {
                return (<PriceTable key={sliceKey+productObj.full_name} raw_data={filteredGroupedPrices[sliceKey]}
                                    title={`${productObj.full_name} 
                                    ${productObj.split_by_attr} 
                                    ${displayFilteredGroupedPricesSortedKeys[sliceKey]}`}/>)
            })
            if (index < specialOffers.length) {
                arr.push(<SpecialOffer key={'offer' + index} specialOffer={specialOffers[index]}/>)
            }
            return arr
        }).value()}
    </Stack>);
}


export default TableWrapper;
