import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Avatar,
    Button,
    IconButton,
    Link,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import _ from "lodash"
import {WhatsApp, ChevronLeft, ChevronRight} from '@mui/icons-material';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {toFarsiNumber} from "../utils";

const SalesPerson = (props) => {
    const {salesPerson} = props
    const number = useSelector(store => (store.app && store.app.general_data.phone_number.value))

    return (
        <Stack spacing={2.5}>
            <Stack direction={'row'} spacing={5} alignItems={'center'}>
                <Stack spacing={.5} alignItems={'center'} justifyContent={"center"} sx={{
                    width: (theme) => theme.spacing(21),
                    height: (theme) => theme.spacing(15),
                    textAlign: 'center'
                }}>
                    <Typography variant={'mediumX'} color={'primary.shade4'}>
                        {salesPerson.first_name + " " + salesPerson.last_name}
                    </Typography>
                    <Typography variant={'regular'} lineHeight={'26px'} color={'primary.shade1'}>
                        {salesPerson.job_category + " " + _.join(salesPerson.fields_name, ' و ')}
                    </Typography>
                </Stack>
                <Avatar src={'http://localhost:8000' + salesPerson.image + '?h=300'} sx={{
                    height: salesPerson.image ? '120px' : '100px',
                    width: salesPerson.image ? '120px' : '100px',
                }}/>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1.5} sx={{

            }}>
                {
                    salesPerson.whats_app_link &&
                    <Link href={"/redirect/?url=" + salesPerson.whats_app_link}>
                        <WhatsApp sx={{
                            color: '#007231',
                            fontSize: '40px',
                            height: '36px',
                        }}/>
                    </Link>
                }
                {
                    salesPerson.inner_company_prefix_phone &&
                    <Link href={"call/" + number} underline={'none'}>
                        <Stack direction={'row'} sx={{
                            bgcolor: 'primary.shade3',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingY: .75,
                            paddingRight: 1,
                            borderRadius: '4px',
                            width: (theme) => theme.spacing(14),
                        }} spacing={1}>
                            <PhoneEnabledOutlinedIcon sx={{
                                color: 'white.shade1'
                            }}/>
                            <Typography variant={'mediumS'} color={'white.shade1'}>
                                داخلی
                            </Typography>
                            <Typography variant={'mediumS'} color={'white.shade1'}>
                                {
                                    toFarsiNumber(salesPerson.inner_company_prefix_phone)
                                }
                            </Typography>
                        </Stack>
                    </Link>
                }
            </Stack>
        </Stack>
    )
}

const SalesSlide = (props) => {
    const {salesPeopleSlice} = props
    return (
        <Stack direction={'row'} spacing={10}>
            {
                _.map(salesPeopleSlice, (salesPerson, index) => {
                    return (
                        <SalesPerson salesPerson={salesPerson} key={index}/>
                    )
                })
            }
        </Stack>
    )
}

const SalesPeople = () => {
    const people = useSelector(store => store.app ? store.app.employees : [])
    const chunkSize = 2
    const categories = useMemo(() => {
        // console.log('categ ' + people.length)
        return _.chain(people).flatMap('fields_name').uniq().value()
    }, [people.length])
    const grouped = useMemo(() => {
        // console.log('grouped '+categories.length)
        return _.chain(categories)
            .keyBy()
            .mapValues((value, key) => _.filter(people, person => person.fields_name.includes(key)))
            .value()
    }, [categories.length])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [mustUpdateSwiper, setMustUpdateSwiper] = useState(false)
    const swipeRef = useRef()
    const [isSwiperStart, setIsSwiperStart] = useState(true);
    const [isSwiperEnd, setIsSwiperEnd] = useState(true);
    useEffect(() => {
        if (categories.length !== 0) {
            setSelectedCategory(categories[0])
            setMustUpdateSwiper(true)
        }
    }, [categories])
    const onTabChange = (event, newValue) => {
        setSelectedCategory(newValue)
        setMustUpdateSwiper(true)
    }
    useEffect(()=>{
        if(mustUpdateSwiper) {
            // swipeRef.current.swiper.update()
            swipeRef.current.swiper.slideTo(0)
            setIsSwiperStart(swipeRef.current.swiper.isBeginning)
            setIsSwiperEnd(swipeRef.current.swiper.isEnd)
            setMustUpdateSwiper(false)
        }
    })
    const onSwiperSlideChange = () => {
        setIsSwiperStart(swipeRef.current.swiper.isBeginning)
        setIsSwiperEnd(swipeRef.current.swiper.isEnd)
    }
    return (
        <Box sx={{
            margin: 18,
        }}>
            <Paper sx={{
                boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <Stack alignItems={'center'} spacing={4} sx={{
                    marginBottom: 4,
                }}>
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{
                        height: (theme) => theme.spacing(7),
                        bgcolor: 'primary.shade4',
                        alignSelf: 'stretch'
                    }}>
                        <Typography variant={'bold'} sx={{
                            color: 'secondary.shade3'
                        }}>
                            ارتباط با کارشناسان فروش
                        </Typography>
                    </Stack>
                    {
                        selectedCategory &&
                        <Tabs value={selectedCategory} onChange={onTabChange} sx={{
                            // marginY: 4,
                            '& 	.MuiTabs-indicator': {
                                bgcolor: 'secondary.shade3',
                                // width: '90px !important',
                            }
                        }}>
                            {
                                _.map(categories, (category) => {
                                    return (
                                        <Tab label={category} value={category} key={category} sx={{
                                            width: (theme) => theme.spacing(19),
                                            color: (selectedCategory === category ?
                                                (theme) => theme.palette.primary.shade4 + ' !important' :
                                                (theme) => theme.palette.primary.shade3 + ' !important'),
                                            typography: selectedCategory === category ? 'boldS' : 'demiBoldX',
                                        }}/>
                                    )
                                })
                            }
                        </Tabs>
                    }
                </Stack>
                <Swiper style={{
                    width: '60%',
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                }} ref={swipeRef} onSlideChange={onSwiperSlideChange}>
                    {
                        (!isSwiperStart || !isSwiperEnd) &&
                        <IconButton slot={'container-start'} sx={{
                            position: 'relative',
                            left: '48px',
                            zIndex: 2,
                        }} onClick={() => {
                            swipeRef.current.swiper.slidePrev()
                        }} disabled={isSwiperStart}>
                            <ChevronRight/>
                        </IconButton>
                    }
                    {
                        selectedCategory &&
                        _.chain(grouped[selectedCategory]).chunk(chunkSize).map((salesPeopleSlice, index) => {
                            return (
                                <SwiperSlide key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <SalesSlide salesPeopleSlice={salesPeopleSlice}/>
                                </SwiperSlide>
                            )
                        }).value()
                    }
                    {
                        (!isSwiperStart || !isSwiperEnd) &&
                        <IconButton slot={'container-end'} sx={{
                            position: 'relative',
                            right: '48px',
                            zIndex: 2,
                        }} onClick={() => {
                            swipeRef.current.swiper.slideNext()
                        }} disabled={isSwiperEnd}>
                            <ChevronLeft/>
                        </IconButton>
                    }
                </Swiper>
                <Stack alignItems={'center'} sx={{
                    marginY: 4,
                }}>
                    <Button variant="outlined" endIcon={<ChevronLeft/>} sx={{
                        color: 'grey.shade3',
                        paddingY: 1,
                    }}>
                        <Typography variant={'demiBoldS'} color={'grey.shade3'}>
                            {
                                'لیست قیمت'
                                +
                                ' '
                                +
                                selectedCategory
                            }
                        </Typography>
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SalesPeople;