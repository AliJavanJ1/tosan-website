import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Avatar, Box, IconButton, Link, Paper, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import _ from "lodash";
import {ChevronLeft, ChevronRight, WhatsApp} from "@mui/icons-material";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import {toFarsiNumber, useProductFromURL} from "../utils";

const SalesPerson = ({domain, person, category, number}) => {
    return (
        <Stack alignItems={"center"} sx={{
            width: '100%',
        }}>
            <Avatar src={domain + person.image + '?h=300'} sx={{
                height: person.image ? '80px' : '65px',
                width: person.image ? '80px' : '65px',
                marginBottom: 1.5,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            }}/>
            <Typography variant={'mediumX'} fontSize={14} color={'primary.shade4'}>
                {person.first_name + ' ' + person.last_name}
            </Typography>
            <Typography variant={'regular'} sx={{
                fontWeight: 300,
                color: 'primary.shade4',
                lineHeight: '26px',
            }}>
                {
                    'کارشناس فروش ' +
                    category
                }
            </Typography>
            <Stack direction={'row'} sx={{
                // width: '222px',
                paddingX: '22.5px',
                height: '51px',
                bgcolor: 'white.shade1',
                boxShadow: '1px 3px 12px rgba(0, 0, 0, 0.08)',
                borderRadius: '4px',
                marginTop: 3,
                marginBottom: 2,
                alignItems: 'center',
                justifyContent: 'center',
            }} spacing={1.5}>
                {
                    person.whats_app_link &&
                    <Link href={"&&" + person.whats_app_link}
                          underline={'none'} sx={{
                        fontSize: 0,
                    }}>
                        <Box sx={{
                            bgcolor: 'primary.shade4',
                            height: '38px',
                            width: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                        }}>
                            <WhatsApp sx={{
                                color: 'white.shade1',
                                fontSize: '28px',
                            }}/>
                        </Box>
                    </Link>
                }
                {
                    person.inner_company_prefix_phone &&
                    <Link href={"&&tel:" + number} underline={'none'}>
                        <Stack direction={'row'} sx={{
                            alignItems: 'center'
                        }} spacing={1.5}>
                            <Box sx={{
                                bgcolor: 'primary.shade4',
                                height: '38px',
                                width: '38px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                            }}>
                                <PhoneEnabledOutlinedIcon sx={{
                                    color: 'white.shade1',
                                    fontSize: '28px',
                                }}/>
                            </Box>
                            <Stack sx={{
                                alignItems: 'center',
                            }}>
                                <Typography variant={'demiBoldS'} color={'primary.shade4'}>
                                    {
                                        'داخلی ' +
                                        toFarsiNumber(person.inner_company_prefix_phone)
                                    }
                                </Typography>
                                <Typography variant={'mediumS'} color={'primary.shade4'}>
                                    {_.chain(number).split('-')
                                        .map(part => toFarsiNumber(part))
                                        .reverse().join(' - ').value()}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Link>
                }
            </Stack>
        </Stack>
    )
}

function MiniSalesPeople() {
    // const category = _.chain(window.location.pathname).split('/').filter(part=>part !== '').nth(1).value()
    // const category = 'میلگرد'
    const product = useProductFromURL()
    const category = product ? product.main_name : null
    const domain = useSelector(store => store.static.domain)
    const number = useSelector(store => (store.app && store.app.general_data.phone_number.value))
    let people = useSelector(store => store.app ? store.app.employees : [])
    people = useMemo(() => {
        if(category){
            return (_.chain(people).filter(person => person.fields_name.includes(category)).value())
        }else{
            return []
        }
    }, [people.length, category])

    const swiperRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    useEffect(() => {
        if (people.length > 0) {
            swiperRef.current.swiper.update()
            setIsSwiperStart(swiperRef.current.swiper.isBeginning)
            setIsSwiperEnd(swiperRef.current.swiper.isEnd)
        }
    }, [people.length])
    const onSwiperSlideChange = () => {
        setIsSwiperStart(swiperRef.current.swiper.isBeginning)
        setIsSwiperEnd(swiperRef.current.swiper.isEnd)
    }

    // console.log(people)

    return (
        <Paper sx={{
            boxShadow: '1px 3px 12px rgba(0, 0, 0, 0.08)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <Stack>
                <Stack alignItems={'center'} sx={{
                    bgcolor: 'primary.shade4',
                    marginBottom: 2,
                }}>
                    <Typography variant={'bold'} sx={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'secondary.shade3',
                        marginY: 1,
                    }}>
                        {
                            'کارشناسان فروش ' +
                            category
                        }
                    </Typography>
                </Stack>
                <Swiper
                    onSlideChange={onSwiperSlideChange}
                    ref={swiperRef}
                    modules={[]}
                    slidesPerView={1}
                    style={{
                        width: '100%',
                    }}
                >
                    {
                        _.map(people, (person, index) => {
                            return (
                                <SwiperSlide key={index} style={{}}>
                                    <SalesPerson domain={domain} person={person} category={category} number={number}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Stack>
            {
                people.length > 1 &&
                <>
                    <IconButton sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '5%',
                        zIndex: 1,
                    }} onClick={() => {
                        swiperRef.current.swiper.slidePrev()
                    }} disabled={isSwiperStart}>
                        <ChevronRight/>
                    </IconButton>
                    <IconButton sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '5%',
                        zIndex: 1,
                    }} onClick={() => {
                        swiperRef.current.swiper.slideNext()
                    }} disabled={isSwiperEnd}>
                        <ChevronLeft/>
                    </IconButton>
                </>
            }
        </Paper>
    );
}

export default MiniSalesPeople;