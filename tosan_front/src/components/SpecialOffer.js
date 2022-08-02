import React, {useEffect, useState} from 'react';
import RebarPNG from "../assets/rebar.png"
import {Box, Stack, Typography} from "@mui/material";
import { ReactComponent as OFF} from "../assets/icons/off.svg";
import SvgIcon from "@mui/material/SvgIcon";
import {toFarsiNumber} from "../utils";
import {AvTimer} from "@mui/icons-material";

function SpecialOffer({specialOffer}) {
    const [timerData, setTimerData] = useState()
    // const specialOffer =
    // {
    //     title: "میلگرد ۱۶ آجدار ظفر بناب",
    //     previousPrice: 16_270,
    //     currentPrice: 15_300,
    //     image: RebarPNG,
    // }

    useEffect(() => {
        const date = new Date()
        setTimerData({
            hour: 24 - date.getHours() - (date.getMinutes() === 0 ? 0 : 1),
            minute: (date.getMinutes() === 0 ? 0 : 60 - date.getMinutes()) - (date.getSeconds() === 0 ? 0 : 1),
            second: date.getSeconds() === 0 ? 0 : 60 - date.getSeconds(),
        })
    }, [])

    useEffect(() => {
            if (timerData) {
                const newTime = {
                    hour: timerData.hour,
                    minute: timerData.minute,
                    second: timerData.second - 1,
                }
                if (newTime.second < 0) {
                    newTime.second = 59
                    newTime.minute -= 1
                    if (newTime.minute < 0) {
                        newTime.minute = 59
                        newTime.hour -= 1
                        if (newTime.hour < 0)
                            newTime.hour = 24
                    }
                }
                setTimeout(() => setTimerData(newTime), 1000)
            }
    }, [timerData])

    return (
        <Box
            sx={{
                width: "100%",
                height: 172,
                backgroundColor: "primary.shade3",
                position: "relative",
                boxShadow: "1px 3px 12px rgba(56, 56, 56, 0.2)",
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    width: "100%",
                    height: 49,
                    top: 23,
                    position: "relative",
                    backgroundColor: "primary.main",
                }}
            >
                <Typography
                    variant="bold"
                    color="white.main"
                    sx={{
                        marginLeft: "233px"
                    }}
                >
                    {specialOffer.title}
                </Typography>
            </Stack>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    height: 172,
                    width: 107,
                    padding: 2,
                    boxShadow: "1px 3px 12px rgba(56, 56, 56, 0.2)",
                    backgroundColor: "secondary.shade3",
                    position: "absolute",
                    borderRadius: "4px",
                    bottom: 16,
                    left: 59,
                }}
            >
                <SvgIcon component={OFF} inheritViewBox sx={{
                    fontSize: 56,
                }}/>
                <Typography
                    variant="extraBold"
                    color="primary.shade4"
                    textAlign="center"
                >
                    پیشنهاد ویژه روز
                </Typography>
            </Stack>
            <Box
                sx={{
                    position: "absolute",
                    left: 233,
                    bottom: 19,
                    // width: 223,
                    width: 232,
                    height: 66,
                }}
            >
                <Typography
                    variant="demiBold"
                    color="primary.shade4"
                    noWrap={true}
                    sx={{
                        backgroundColor: "secondary.main",
                        height: 23,
                        paddingX: "11px",
                        paddingY: "1px",
                        width: "fit-content",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "4px",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    {toFarsiNumber(Math.round(100 - 100 * specialOffer.currentPrice / specialOffer.previousPrice))}%-
                </Typography>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 5,
                        left: 0,
                        width: "fit-content",
                        height: "fit-content",
                    }}
                >
                    <Typography
                        variant="demiBoldX"
                        color="#EB5757"
                        noWrap={true}
                        sx={{
                            width: "fit-content",
                            height: "fit-content",
                        }}
                    >
                        {toFarsiNumber(specialOffer.previousPrice, true)}
                    </Typography>
                    <Box sx={{
                        width: "101%",
                        height: "2px",
                        transform: "rotate(-17.04deg)",
                        bottom: "50%",
                        position: "absolute",
                        backgroundColor: "#EB5757",
                    }}/>
                </Box>
                <Typography
                    variant="extraBold"
                    color="white.main"
                    noWrap={true}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        // right: 37,
                        right: 46,
                    }}
                >
                    {toFarsiNumber(specialOffer.currentPrice, true)}
                </Typography>
                <Typography
                    variant="demiBold"
                    color="white.main"
                    noWrap={true}
                    sx={{
                        position: "absolute",
                        bottom: 9,
                        right: 0,
                    }}
                >
                    تومان
                </Typography>
            </Box>
            <Stack
                direction="row"
                sx={{
                    height: "100%",
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        height: 49,
                        width: 136,
                        backgroundColor: "white.main",
                        opacity: 0.7,
                        boxShadow: "1px 2px 15px rgba(0, 0, 0, 0.15)",
                        top: 23,
                        marginRight: 6,
                        position: "relative",
                    }}
                >
                    <AvTimer sx={{
                        color: "#9C0000",
                        fontSize: 27,
                        marginRight: "4px"
                    }}/>
                    {timerData && [toFarsiNumber(timerData.second, false, 2),
                               ":",
                               toFarsiNumber(timerData.minute, false, 2),
                               ":",
                               toFarsiNumber(timerData.hour, false, 2)].map((item, index) => (
                        <Typography
                            key={index}
                            variant="boldS"
                            color="#9C0000"
                            textAlign="center"
                            sx={{
                                marginTop: "3px",
                                width: item !== ":" ? 22 : 10,
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Stack>
                <img src={specialOffer.image} alt="rebar" height="100%" />
            </Stack>
        </Box>
    );
}

export default SpecialOffer;