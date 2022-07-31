import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Button, IconButton, Stack, Typography} from "@mui/material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import {FreeMode} from "swiper";
import _ from "lodash";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {useParams} from "react-router-dom";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

const StyledButton = ({product, currentFull_name, href}) => {
    return (
        <Button sx={{
            bgcolor: product === currentFull_name ? 'primary.shade4' : 'white.shade1',
            borderRadius: '4px',
            paddingY: 1.5,
            paddingX: 3,
            marginY: 30 / 8,
            cursor: product === currentFull_name ? 'default' : 'pointer',
            '&:hover': {
                bgcolor: product === currentFull_name ? 'primary.shade4' : 'white.shade1',
                ...(
                    product !== currentFull_name &&
                    {
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
                    }
                )
            },
        }} href={href}>
            <Typography variant={'bold'} sx={{
                fontSize: '16px',
                lineHeight: '24px',
                color: product === currentFull_name ? 'secondary.shade3' : 'primary.shade4',
            }}>
                {product}
            </Typography>
        </Button>
    )
}

const SubproductsSwiper = () => {
    const {main: currentCategory, sub1: currentSubCategory1, fullname: currentFull_name} = useParams()
    // const currentCategory = decodeURI(_.chain(pathname).split('/').reverse().filter(part=>part !== '').nth(1).value())
    // const currentCategory = 'میلگرد'
    // const currentSubCategory1 = decodeURI(_.chain(pathname).split('/').reverse().filter(part=>part !== '').nth(2).value())
    // const currentSubCategory1 = 'آجدار'
    // const currentFull_name = decodeURI(_.chain(pathname).split('/').reverse().filter(part => part !== '').nth(3).value())
    // const currentFull_name = 'میلگرد آجدار'

    // console.log('******')
    // console.log(currentCategory)
    // console.log(currentSubCategory1)
    // console.log(currentFull_name)

    const allProducts = useSelector(store => store.app ? store.app.all_products : [])
    let grouped = _.chain(allProducts)
        .groupBy((product) => product['main_name'])
        .get(currentCategory)
        .groupBy((product) => product['sub_name1'])
        .mapValues((value) => _.groupBy(value, (product) => product['full_name']))
        .value()
    const sameSub1Leafs = _.chain(grouped)
        .get(currentSubCategory1)
        .keys()
        .value()
    const sameCategoryLeafs = _.chain(grouped)
        .pickBy((value, key) => {
            return key !== currentSubCategory1
        })
        .mapValues((value, key) => _.keys(value))
        .value()

    const swiperRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    useEffect(() => {
        if (allProducts.length > 0) {
            swiperRef.current.swiper.update()
            setIsSwiperStart(swiperRef.current.swiper.isBeginning)
            setIsSwiperEnd(swiperRef.current.swiper.isEnd)
        }
    }, [allProducts])
    const onSwiperSlideChange = () => {
        setIsSwiperStart(swiperRef.current.swiper.isBeginning)
        setIsSwiperEnd(swiperRef.current.swiper.isEnd)
    }

    // console.log(allProducts)
    // console.log(grouped)
    // console.log(sameSub1Leafs)
    // console.log(sameCategoryLeafs)

    return (
        <Stack direction={'row'} sx={{
            // paddingY: 30 / 8,
            boxShadow: '1px 3px 12px rgba(0, 0, 0, 0.08)',
            zIndex: 1,
            position: 'relative',
            paddingX: 103 / 8,
            alignItems: 'center',
        }}>
            {
                !(isSwiperEnd && isSwiperStart) &&
                <IconButton sx={{
                    position: 'relative',
                }} onClick={() => {
                    swiperRef.current.swiper.slidePrev()
                }} disabled={isSwiperStart}>
                    <ChevronRight/>
                </IconButton>
            }
            <Swiper
                onSlideChange={onSwiperSlideChange}
                onToEdge={onSwiperSlideChange}
                ref={swiperRef}
                modules={[FreeMode]}
                freeMode={{
                    enabled: true,
                }}
                slidesPerView={'auto'}
                // slidesPerView={3}
                spaceBetween={35}
                centerInsufficientSlides={true}
                style={{width: '100%'}}
            >
                {
                    _.map(sameSub1Leafs, (product, index) => {
                        return (
                            <SwiperSlide key={index} style={{
                                width: 'max-content',
                            }}>
                                <StyledButton product={product} currentFull_name={currentFull_name}
                                              href={'/products/' + [currentCategory, currentSubCategory1, product]
                                                  .reverse().join('/')}/>
                            </SwiperSlide>
                        )
                    })
                }
                {
                    _.chain(sameCategoryLeafs).mapValues((fullnames, subCategory1) => (
                        _.map(fullnames, product => {
                            return (
                                <SwiperSlide key={product} style={{
                                    width: 'max-content',
                                }}>
                                    <StyledButton product={product} currentFull_name={currentFull_name}
                                                  href={'/products/' + [currentCategory, subCategory1, product]
                                                      .reverse().join('/')}/>
                                </SwiperSlide>
                            )
                        })
                    )).values().flatten().value()
                }
            </Swiper>
            {
                !(isSwiperEnd && isSwiperStart) &&
                <IconButton sx={{
                    position: 'relative',
                }} onClick={() => {
                    swiperRef.current.swiper.slideNext()
                }} disabled={isSwiperEnd}>
                    <ChevronLeft/>
                </IconButton>
            }
        </Stack>
    );
};

export default SubproductsSwiper;
