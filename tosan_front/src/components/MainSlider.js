import {Box, Fade, Grid, Typography} from "@mui/material";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper';

import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import {useSelector} from "react-redux";
import {objectToList} from "../utils";
import {useEffect, useRef, useState} from "react";
import {useSpring, animated} from '@react-spring/web';


function MainSlider() {
    const transitionSpeed = 1000
    const serverURL = useSelector(store => store.static.domain)
    let slides = useSelector(store => (store.app && store.app.main_page_data.slide_show))
    if(slides) {
        slides = objectToList(slides)
        for (const slide of slides) {
            const spited = slide.value.split("\r\n")
            slide['title'] = spited[0]
            slide['content'] = spited[1]
        }
    }

    const swiperRef = useRef();

    const [slideInd, setSlideInd] = useState({'prev': -1, 'current': 0})
    const [transitionType, setTransitionType] = useState(0)
    const [duringTransition, setDuringTransition] = useState(false)

    useEffect(() => {
        if(transitionType === 1) {
            setDuringTransition(true)
            swiperRef.current.swiper.slideNext(transitionSpeed)
        }
        else if (transitionType === -1) {
            setDuringTransition(true)
            swiperRef.current.swiper.slidePrev(transitionSpeed)
        }
    }, [transitionType])

    useEffect(() => {
        if (!duringTransition) {
            setTransitionType(0)
        }
    }, [duringTransition])

    const marginTopAnim = useSpring({
            from: { marginTop: 0 },
            to: { marginTop: 34},
            config: { duration: transitionSpeed },
            reset: true,
        })
    const marginBotAnim = useSpring({
        from: { marginBottom: 0 },
        to: { marginBottom: 34},
        config: { duration: transitionSpeed },
        reset: true,
    })
    const selectAnim = useSpring({
        from: {
            width: 18,
            backgroundColor: '#C4C4C4',
        },
        to: {
            width: 20,
            backgroundColor: '#F2F2F2',
        },
        config: { duration: transitionSpeed },
        reset: true,
    })
    const unselectAnim = useSpring({
        from: {
            width: 20,
            backgroundColor: '#F2F2F2',
        },
        to: {
            width: 18,
            backgroundColor: '#C4C4C4',
        },
        config: { duration: transitionSpeed },
        reset: true,
    })

    const AnimatedBox = animated(Box)
    return (
        <Box
            position="relative"
            sx={{ paddingTop: slides ? 0 : "500px", marginBottom: 10 }}
        >
            {slides && <Swiper
                ref={swiperRef}
                slidesPerView={1}
                initialSlide={1}
                loop={true}
                effect={"fade"}
                speed={transitionSpeed}
                modules={[EffectFade, Autoplay]}
                allowTouchMove={false}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                style={{
                    zIndex: 0,
                }}
                onBeforeTransitionStart={() => setDuringTransition(true)}
                onSlideChangeTransitionEnd={() => setDuringTransition(false)}
                onSlideChangeTransitionStart={() => {
                    if (transitionType === 0) {
                        setSlideInd({
                            'prev': slideInd.current,
                            'current': (slideInd.current + 1) % slides.length
                        })
                    }
                    else {
                        setSlideInd({
                            'prev': slideInd.current,
                            'current': (slideInd.current + transitionType + slides.length) % slides.length
                        })
                    }
                }}
            >
                {slides && slides.reverse().map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            height: 500,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative"
                        }}
                    >
                        <img
                            src={serverURL + slide.file}
                            alt={slide.title}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>}
            <Box sx={{
                zIndex: 0,
                width: 579,
                height: 109,
                paddingY: 3,
                paddingRight: 3,
                position: "absolute",
                bottom: 74,
                left: 0,
                columnGap: "16px",
                rowGap: "20px",
                display: "grid",
                gridTemplateColumns: "544px 20px",
                gridTemplateRows: "60px 27px",
                background: "rgba(0, 27, 62, 0.7)",
                boxShadow: "1px 3px 12px rgba(56, 56, 56, 0.2)",
                borderRadius: "0px 4px 4px 0px",
                gridAutoFlow: "row",
            }}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{
                        backgroundColor: "secondary.shade3",
                        justifySelf: "stretch",
                        paddingLeft: 13,
                        display: "grid"
                    }}
                >
                    {slides && slides.map((slide, index) => (

                        Object.values(slideInd).includes(index) && <Fade
                            in={index === slideInd.current}
                            timeout={transitionSpeed}
                            key={index}
                            style={{
                                gridRow: "1/-1",
                                gridColumn: "1/-1",
                                // transitionDelay: `${(index === slideInd.current) * transitionSpeed / 2}ms`
                            }}>
                            <Typography variant="bold" color="primary.shade4" noWrap={true}>
                                {slide.title}
                            </Typography>
                        </Fade>
                    ))}
                </Grid>
                <Grid
                    alignSelf="center"
                    container
                    direction="column"
                    alignItems="center"
                    rowGap={duringTransition ? "12px" : "0"}
                    justifyContent="center"
                    flexWrap="nowrap"
                    overflow="hidden"
                    height={49}
                    sx={{ cursor: duringTransition ? "wait" : "default" }}
                >
                    {duringTransition && <>
                        <AnimatedBox
                            style={(duringTransition && transitionType === -1) ? {} : marginTopAnim}
                            sx={{
                                width: 18,
                                height: 5,
                                minHeight: 5,
                                backgroundColor: "grey.shade2",
                                borderRadius: 8,
                            }}/>
                        <AnimatedBox
                            style={{
                                width: (duringTransition && transitionType === -1) ? 18 : selectAnim.width,
                                backgroundColor: (duringTransition && transitionType === -1) ? "#C4C4C4" : selectAnim.backgroundColor
                            }}
                            sx={{
                                height: 5,
                                minHeight: 5,
                                borderRadius: 8,
                            }}/>
                        <AnimatedBox
                            style={{
                                width: duringTransition ? unselectAnim.width : 20,
                                backgroundColor: duringTransition ? unselectAnim.backgroundColor : "#F2F2F2"
                            }}
                            sx={{
                                height: 5,
                                minHeight: 5,
                                borderRadius: 8,
                            }}/>
                        <AnimatedBox
                            style={{
                                width: (duringTransition && transitionType === -1) ? selectAnim.width : 18,
                                backgroundColor: (duringTransition && transitionType === -1) ? selectAnim.backgroundColor : "#C4C4C4"
                            }}
                            sx={{
                                height: 5,
                                minHeight: 5,
                                borderRadius: 8,
                            }}/>
                        <AnimatedBox
                            style={(duringTransition && transitionType === -1) ? marginBotAnim : {}}
                            sx={{
                                width: 18,
                                height: 5,
                                minHeight: 5,
                                backgroundColor: "grey.shade2",
                                borderRadius: 8,
                            }}/>
                    </>}
                    {slides && !duringTransition && <>
                        <Box
                            onClick={() => setTransitionType(1)}
                            sx={{
                                width: 18,
                                height: 5,
                                cursor: "pointer",
                                paddingTop: "5px",
                                paddingBottom: "12px",
                            }}
                        >
                            <Box sx={{
                                width: 18,
                                height: 5,
                                backgroundColor: "grey.shade2",
                                borderRadius: 8,
                            }}/>
                        </Box>
                        <Box sx={{
                                width: 20,
                                height: 5,
                                backgroundColor: "white.main",
                                borderRadius: 8,
                        }}/>
                        <Box
                            onClick={() => setTransitionType(-1)}
                            sx={{
                                width: 18,
                                height: 5,
                                cursor: "pointer",
                                paddingTop: "12px",
                                paddingBottom: "5px",
                            }}
                        >
                            <Box sx={{
                                width: 18,
                                height: 5,
                                backgroundColor: "grey.shade2",
                                borderRadius: 8,
                            }}/>
                        </Box>
                    </>}
                </Grid>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{
                        justifySelf: "stretch",
                        paddingLeft: 13,
                        display: "grid"
                    }}
                >
                    {slides && slides.map((slide, index) => (
                        Object.values(slideInd).includes(index) && <Fade
                            in={index === slideInd.current}
                            timeout={transitionSpeed}
                            key={index}
                            style={{
                                gridRow: "1/-1",
                                gridColumn: "1/-1",
                                // transitionDelay: `${(index === slideInd.current) * transitionSpeed / 2}ms`

                            }}>
                            <Typography variant="demiBoldX" color="white.main" noWrap={true}>
                                {slide.content}
                            </Typography>
                        </Fade>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default MainSlider;