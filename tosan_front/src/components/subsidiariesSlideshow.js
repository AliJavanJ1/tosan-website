import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, Stack, SvgIcon, Typography} from "@mui/material";
import {ReactComponent as logo} from "../assets/logos/tosan-logo.svg"
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import {useSelector} from "react-redux";
import _ from 'lodash'
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {EffectFade} from "swiper";

function SubsidiariesSlideshow(props) {
    const subsidiaries = useSelector(store => store.app ? store.app.subsidiaries : [])
    const textSwipeRef = useRef()
    const imgSwipeRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    useEffect(() => {
        if (subsidiaries.length > 0) {
            textSwipeRef.current.swiper.update()
            setIsSwiperStart(textSwipeRef.current.swiper.isBeginning)
            setIsSwiperEnd(textSwipeRef.current.swiper.isEnd)
        }
    }, [subsidiaries])
    // useEffect(()=>{
    //     if(imgSwipeRef.current){
    //         imgSwipeRef.current.swiper.disable()
    //     }
    // }, imgSwipeRef.current)
    const onSwiperSlideChange = () => {
        imgSwipeRef.current.swiper.slideTo(textSwipeRef.current.swiper.realIndex)
        setIsSwiperStart(textSwipeRef.current.swiper.isBeginning)
        setIsSwiperEnd(textSwipeRef.current.swiper.isEnd)
    }
    return (
        <Stack sx={{
            bgcolor: 'white.shade2',
            position: 'relative',
            width: '100%',
            // paddingX: 5,
            boxSizing: 'border-box',
        }}>
            <Box sx={{
                bgcolor: 'secondary.shade3',
            }}>
                <Stack direction={'row'} spacing={2} sx={{
                    marginX: 13,
                    height: (theme) => theme.spacing(9),
                    alignItems: 'center',
                    width: 'max-content',
                }}>
                    <SvgIcon component={logo} inheritViewBox sx={{
                        fontSize: '51px',
                    }}/>
                    <Typography variant={'bold'} color={'priamry.shade4'}>
                        گروه شرکت‌های توسن
                    </Typography>
                </Stack>
            </Box>
            <Stack direction={'row'} sx={{
                paddingLeft: 13,
                boxSizing: 'border-box',
                width: '100%',
                height: 300,
                position: 'relative',
            }}>
                <Box sx={{
                    width: '40%',
                    paddingTop: 5.5,
                }}>
                    <Swiper ref={textSwipeRef} onSlideChange={onSwiperSlideChange}>
                        {
                            _.map(subsidiaries, (subsidiary, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Stack spacing={2.5}>
                                            <Typography variant={'demiBold'} lineHeight={'30px'} fontSize={'20px'}
                                                        color={'grey.main'}>
                                                {subsidiary.name}
                                            </Typography>
                                            <Typography variant={'regularX'} color={'grey.main'}>
                                                {subsidiary.main_page_description}
                                            </Typography>
                                        </Stack>
                                    </SwiperSlide>
                                )
                            })
                        }
                        <Stack direction={'row'} sx={{
                            position: 'absolute',
                            zIndex: 2,
                            top: 0,
                            right: 0,
                            height: '30px',
                            bgcolor: 'white.shade2',
                        }}>
                            <IconButton sx={{}} onClick={() => {
                                textSwipeRef.current.swiper.slidePrev()
                            }} disabled={isSwiperStart}>
                                <ChevronRight/>
                            </IconButton>
                            <IconButton sx={{}} onClick={() => {
                                textSwipeRef.current.swiper.slideNext()
                            }} disabled={isSwiperEnd}>
                                <ChevronLeft/>
                            </IconButton>
                        </Stack>
                    </Swiper>
                </Box>
                <Box sx={{
                    width: '60%',
                    position: 'relative',
                }}>
                    <Swiper allowTouchMove={false} ref={imgSwipeRef} style={{
                        height: '380px',
                        width: '100%',
                        position: 'relative',
                        top: '-36px',
                    }} modules={[EffectFade]} effect={'fade'} fadeEffect={{
                        'crossFade': true,
                    }} speed={700}>
                        {
                            _.map(subsidiaries, (subsidiary, index) => {
                                return (
                                    <SwiperSlide key={index} style={{
                                        width: '100%',
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}>
                                            <Box sx={{
                                                maxWidth: '632px',
                                                overflow: 'hidden',
                                                borderRadius: '4px',
                                                filter: 'drop-shadow(1px 3px 12px rgba(56, 56, 56, 0.2))',
                                            }}>
                                                <img src={subsidiary.main_page_image} style={{
                                                    height: '372px',
                                                    width: 'auto',
                                                }}/>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Box>
            </Stack>
            <Box sx={{
                bgcolor: 'primary.shade3',
                height: (theme) => theme.spacing(9),
            }}/>
        </Stack>
    );
}

export default SubsidiariesSlideshow;