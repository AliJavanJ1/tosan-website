import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Box, IconButton, Link, Paper, Stack, Typography, alpha} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import "swiper/css";
import "swiper/css/free-mode"
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import _ from 'lodash'
import {getProductUrl} from "../utils";


const ProductSlide = ({product}) => {
    const serverURL = useSelector(store => store.static.domain)
    const firstProduct = useSelector(store => store.app && store.app["all_products"].find(prod => prod["main_name"] === product["product_main_name"]))

    return (
        <Link href={firstProduct ? getProductUrl(firstProduct["main_name"], firstProduct["sub_name1"], firstProduct["full_name"]) : '#'} underline={'none'}>
            <Paper sx={{
                bgcolor: 'primary.shade4',
                boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                borderRadius: '8px',
                '&:hover': {
                    bgcolor: 'secondary.shade1',
                },
                '&:hover .MuiTypography-root': {
                    color: (theme) => alpha(theme.palette.primary.shade4, .7),
                },
            }}>
                <Stack sx={{
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        height: '127px',
                        width: '160px',
                        overflow: 'hidden',
                        margin: 1.5,
                        filter: 'drop-shadow(1px 3px 12px rgba(56, 56, 56, 0.2))',
                        borderRadius: '8px',
                    }}>
                        <img
                            src={serverURL + product.image + "?h=500"}
                            alt={product.product_main_name}
                            style={{
                                // minHeight: "100%",
                                // minWidth: "100%",
                                height: '127px',
                                width: '160px',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                    <Typography variant={'demiBoldX'} sx={{
                        color: 'white.shade1',
                        paddingTop: 1,
                        paddingBottom: 1.5,
                    }}>
                        {product.product_main_name}
                    </Typography>
                </Stack>
            </Paper>
        </Link>
    )
}

function ProductsSlideshow() {
    const mainProducts = useSelector(store => store.app ? store.app.main_product : [])
    const swiperRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    useEffect(() => {
        if (mainProducts.length > 0) {
            swiperRef.current.swiper.update()
            setIsSwiperStart(swiperRef.current.swiper.isBeginning)
            setIsSwiperEnd(swiperRef.current.swiper.isEnd)
        }
    }, [mainProducts])
    const onSwiperSlideChange = () => {
        // console.log(swiperRef.current.swiper.isBeginning, swiperRef.current.swiper.isEnd)
        setIsSwiperStart(swiperRef.current.swiper.isBeginning)
        setIsSwiperEnd(swiperRef.current.swiper.isEnd)
    }

    return (
        <Stack spacing={5} sx={{
            marginX: 13,
            marginBottom: 10,
        }}>
            <Stack spacing={4} direction={'row'} sx={{
                ...((isSwiperEnd && isSwiperStart) && {
                    justifyContent: 'center',
                })
            }}>
                <Typography variant={'bold'} color={'primary.shade4'}>
                    محصولات
                </Typography>
                {
                    !(isSwiperEnd && isSwiperStart) &&
                    <Stack direction={'row'}>
                        <IconButton sx={{}} onClick={() => {
                            swiperRef.current.swiper.slidePrev()
                        }} disabled={isSwiperStart}>
                            <ChevronRight/>
                        </IconButton>
                        <IconButton sx={{}} onClick={() => {
                            swiperRef.current.swiper.slideNext()
                        }} disabled={isSwiperEnd}>
                            <ChevronLeft/>
                        </IconButton>
                    </Stack>
                }
            </Stack>
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
                spaceBetween={76}
                centerInsufficientSlides={true}
            >
                {
                    _.map(mainProducts, (product, index) => {
                        return (
                            <SwiperSlide key={index} style={{
                                width: 'max-content',
                            }}>
                                <ProductSlide product={product}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Stack>
    );
}

export default ProductsSlideshow;