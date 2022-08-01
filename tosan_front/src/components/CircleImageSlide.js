import {useSelector} from "react-redux";
import {
    Box
} from "@mui/material";
import {useEffect, useState} from "react";
import parse from 'html-react-parser';


const CircleImageSlide = () => {
    const middle_circle = useSelector(store => (store.app && store.app.main_page_data.middle_circle));

    const [imageIndex, setImageIndex] = useState(3);
    const [middleCircle1, setMiddleCircle1] = useState(get_dict_to_array(middle_circle))
    const [firstMiddleImage, setFirstMiddleImage] = useState(middle_circle ? middle_circle.file[imageIndex] : null);
    const [lastMiddleImage, setLastMiddleImage] = useState(middle_circle ? middle_circle.file[imageIndex] : null);
    const [middleText, setMiddleText] = useState(middle_circle ? middle_circle.value[imageIndex] : null);
    const [lastMiddleText, setLastMiddleText] = useState(middle_circle ? middle_circle.value[imageIndex] : null);

    const [FirstMiddleImageUp, setFirstMiddleImageUp] = useState(true);
    const [circleRotate, setCircleRotate] = useState(0);

    useEffect(() => {
        if (middle_circle) {
            setFirstMiddleImage(middle_circle ? 'http://127.0.0.1:8000' + middle_circle.file[imageIndex] : null);
            setLastMiddleImage(middle_circle ? 'http://127.0.0.1:8000' + middle_circle.file[imageIndex] : null);
            setMiddleText(middle_circle ? middle_circle.value[imageIndex] : null);
            setLastMiddleText(middle_circle ? middle_circle.value[imageIndex] : null);
            setMiddleCircle1(get_dict_to_array(middle_circle));
        }
    }, [middle_circle]);

    const change_vars = (index) => {
        let keyy = middleCircle1[index];
        if (FirstMiddleImageUp) {
            setLastMiddleText(keyy.text);
            setLastMiddleImage('http://127.0.0.1:8000' + keyy.file);
        } else {
            setMiddleText(keyy.text);
            setFirstMiddleImage('http://127.0.0.1:8000' + keyy.file)
        }
        setFirstMiddleImageUp(!FirstMiddleImageUp);

        const howRotate = calcRotateValue(circleRotate, index);
        setCircleRotate(howRotate);
        setImageIndex(index);
    };

    const [currentCount, setCount] = useState(0);
    const [timerId, setTimerId] = useState(null)

    useEffect(() => {
        if (middleCircle1[0].file) {
            const id = setInterval(timer, 4000);
            setTimerId(id)
            return () => {
                clearInterval(id);
            }
        }
    }, [currentCount, middleCircle1[0].file]);

    const timer = () => {
        setCount(currentCount + 1);
        change_vars((imageIndex + 1) % 4);
    };

    const onCircleClick = (index) => {
        change_vars(index);
        clearInterval(timerId)
        setCount(currentCount + 1)
    }

    return (
        <div>
            {!middle_circle && <p></p>}
            {middle_circle &&
                <Box
                    sx={{
                        width: '100%',
                        height: '550px',
                        marginBottom: 10,
                        overflow:'hidden',
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '100%',
                            gridTemplateRows: '100%',
                            maxHeight: '550px',
                            width: '100%',
                            height: 'auto',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                            opacity: .99
                        }}>
                        <Box
                            sx={
                                {
                                    gridRow: 1,
                                    gridColumn: 1,
                                    display: 'grid',
                                    gridTemplateColumns: '100%',
                                    gridTemplateRows: '100%',
                                    alignItems: 'center',
                                    justifyItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    boxSizing: 'border-box',
                                    opacity: 0.99,
                                }}
                        >
                            <img
                                onTransitionEnd={() => {
                                    if (!FirstMiddleImageUp) {
                                        setFirstMiddleImage(lastMiddleImage);
                                    }
                                }}
                                style={{
                                    gridRow: 1,
                                    gridColumn: 1,
                                    minWidth: "100%",
                                    minHeight: "100%",
                                    maxHeight: "300%",
                                    transition: "opacity 1.5s",
                                    opacity: FirstMiddleImageUp ? 1 : 0,
                                    zIndex: -1,
                                }}
                                src={firstMiddleImage}
                            />
                            <img
                                onTransitionEnd={() => {
                                    if (FirstMiddleImageUp) {
                                        setLastMiddleImage(firstMiddleImage);
                                    }
                                }}

                                style={{
                                    gridRow: 1,
                                    gridColumn: 1,
                                    minWidth: "100%",
                                    minHeight: "100%",
                                    maxHeight: "300%",
                                    transition: "opacity 1.5s",
                                    opacity: !FirstMiddleImageUp ? 1 : 0,
                                    zIndex: -1,
                                }}
                                src={lastMiddleImage}
                            />
                            <Box
                                sx={
                                    {
                                        gridRow: 1,
                                        gridColumn: 1,
                                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
                                        height: '100%',
                                        width: '100%',
                                    }}
                            ></Box>
                            <Box sx={{
                                gridColumn: 1,
                                gridRow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                boxSizing: 'border-box',
                                paddingTop: '3%',
                                paddingBottom: '3%'
                            }}>
                                <Box
                                    sx={{
                                        aspectRatio: '1 / 1',
                                        display: 'grid',
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                        gridTemplateColumns: '13% 1fr 13% 1fr 13%',
                                        gridTemplateRows: '13% 1fr 13% 1fr 13%',
                                        height: '100%',
                                        transition: 'transform 1.5s',
                                        transformOrigin: 'center',
                                        transform: 'rotate(' + circleRotate + 'deg)'
                                    }}>
                                    <Box
                                        borderRadius="50%" sx={{
                                        borderColor: "white",
                                        gridColumn: "1 / 6",
                                        gridRow: "1 / 6",
                                        width: "87%",
                                        height: "87%",
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 66% 1fr',
                                        gridTemplateRows: '1fr 66% 1fr',
                                        alignItems: 'center',
                                        justifyItems: 'center',
                                        background: "rgba(242, 242, 242, 0.4)",
                                        border: "3px solid #F2F2F2",
                                        transition: 'transform 1.5s',
                                        transformOrigin: 'center',
                                        transform: 'rotate(' + -circleRotate + 'deg)'
                                    }}
                                    >
                                        <Box
                                            onTransitionEnd={() => {
                                                if (!FirstMiddleImageUp) {
                                                    setMiddleText(lastMiddleText);
                                                }
                                            }}

                                            sx={{
                                                gridColumn: 2,
                                                gridRow: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-evenly',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                transition: "opacity 1.5s",
                                                opacity: !FirstMiddleImageUp ? 1 : 0,
                                                zIndex: -1,
                                            }}
                                        >
                                            {lastMiddleText && parse(lastMiddleText)}
                                        </Box>

                                        <Box
                                            onTransitionEnd={() => {
                                                if (FirstMiddleImageUp) {
                                                    setLastMiddleText(middleText);
                                                }
                                            }}

                                            sx={{
                                                gridColumn: 2,
                                                gridRow: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-evenly',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                transition: "opacity 1.5s",
                                                opacity: FirstMiddleImageUp ? 1 : 0,
                                                zIndex: -1,
                                            }}
                                        >
                                            {middleText && parse(middleText)}
                                        </Box>
                                    </Box>
                                    {
                                        middleCircle1.map((keyy, index) =>
                                            <Box
                                                borderRadius="50%"
                                                key={index}
                                                onClick={() => onCircleClick(index)}
                                                sx={{
                                                    borderColor: "white",
                                                    gridColumn: calcGridIndexCol(index),
                                                    gridRow: calcGridIndexRow(index),
                                                    width: "100%",
                                                    height: "100%",
                                                    border: "3px solid #F2F2F2",
                                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + 'http://127.0.0.1:8000' + keyy.file + ')',
                                                    backgroundSize: 'cover !important',
                                                    cursor: 'pointer',
                                                    transition: 'transform 1.5s',
                                                    transformOrigin: 'center',
                                                    transform: 'rotate(' + -circleRotate + 'deg)'
                                                }
                                                }>
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </div>
    )
};

function calcGridIndexCol(index) {
    if (index === 0) {
        return '1 / 2';
    } else if (index === 1) {
        return '3 / 4';
    } else if (index === 2) {
        return '5 / 6';
    } else if (index === 3) {
        return '3 / 4';
    }
    return '1 / 2';
}

function calcGridIndexRow(index) {
    if (index === 0) {
        return '3 / 4';
    } else if (index === 1) {
        return '1 / 2';
    } else if (index === 2) {
        return '3 / 4';
    } else if (index === 3) {
        return '5 / 6';
    }
    return '3 / 4';
}

function calcRotateValue(totalRotated, index) {
    let howRotate = (((index + 1) * 90)) % 360;
    const addValue = [0, 90, -90, 180];
    let totalRotatedTemp = totalRotated;
    for (let i = 0; i < 4; i++) {
        totalRotatedTemp = totalRotated;
        totalRotatedTemp += addValue[i];
        if (((totalRotatedTemp) % 360 + 360) % 360 === howRotate) {
            return (totalRotatedTemp);
        }
    }
    return 0;
}

function get_dict_to_array(middle_circle_inp) {
    let middle_circle_res = [{}, {}, {}, {}]
    for (let i = 0; middle_circle_inp && i < middle_circle_inp.file.length; i++) {
        middle_circle_res[i] = {"file": middle_circle_inp.file[i], "text": middle_circle_inp.value[i]}
    }
    return (middle_circle_res);
}

export default CircleImageSlide;