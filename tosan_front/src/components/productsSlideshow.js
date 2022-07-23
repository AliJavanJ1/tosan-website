import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {IconButton, Stack, Typography} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

function ProductsSlideshow(props) {
    const mainProducts = useSelector(store=>store.app ? store.app.main_products : [])
    const swiperRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    const onSwiperSlideChange = () => {
        setIsSwiperStart(swiperRef.current.swiper.isBeginning)
        setIsSwiperEnd(swiperRef.current.swiper.isEnd)
    }
    return (
        <Stack sx={{
            marginX: 13,
        }}>
            <Stack spacing={4} direction={'row'}>
                <Typography variant={'bold'} color={'primary.shade4'}>
                    محصولات
                </Typography>
                <Stack direction={'row'} sx={{
                    // position: 'absolute',
                    // zIndex: 2,
                    // top: 0,
                    // right: 0,
                    // height: '30px',
                    // bgcolor: 'white.shade2',
                }}>
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
            </Stack>
            <Swiper onSlideChange={onSwiperSlideChange} ref={swiperRef}>

            </Swiper>
        </Stack>
    );
}

export default ProductsSlideshow;