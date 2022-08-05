import {useEffect, useState} from "react";
import {CircularProgress, Stack} from "@mui/material";
import {useSelector} from "react-redux";


function AboutUs() {
    const [contentHeight, setContentHeight] = useState()
    const wpDomain = useSelector(store => store.static.wpDomain)
    const wpPageURL = wpDomain + "/contact-us"
    const preContentHeights = ["50vh", "calc(50vh - 1px + 1px)"]

    useEffect(() => {
        console.log("before addEventListener")
        window.addEventListener('message', (event) => {
            if (event.origin !== wpDomain) {
                console.log("wrong_origin", event.origin)
                return
            }
            // const fixedData = event.data.replaceAll("transition-duration: 0ms", "transition-duration: 1000ms").replaceAll("width: 0px", "width: 100%")
            const fixedData = event.data
            console.log("data: ", fixedData, event.origin)
            setContentHeight(fixedData)
        })
        console.log("after addEventListener")
    }, [])

    useEffect(() => {
        if (preContentHeights.includes(contentHeight)) {
            const iframe = document.getElementById("content-iframe")
            console.log("before postMessage", iframe)
            iframe.contentWindow.postMessage('start onresize', wpPageURL)
            console.log("after postMessage")
            if (contentHeight === preContentHeights[0])
                setContentHeight(preContentHeights[1])
            else
                setContentHeight(preContentHeights[0])
        }
    }, [contentHeight]);


    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="fit-content"
            width="100%"
        >
            <iframe
                id="content-iframe"
                name="report"
                src={wpPageURL}
                onLoad={() => {
                    setContentHeight(preContentHeights[0])
                }}
                style={{
                    border: 0,
                    height: contentHeight || 0,
                    width: contentHeight ? "100%" : 0,
                    overflow: contentHeight ? "scroll" : "hidden",
                }}
            />
            {!contentHeight && <CircularProgress
                size="10vw"
                sx={{
                    color: "primary.shade3",
                    marginY: "5vw",
                }}
            />}
        </Stack>
    );
}

export default AboutUs;