import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CircularProgress, Stack} from "@mui/material";
import { useNavigate } from 'react-router-dom';


function WordPressPage({wpPath, preHeight, sx}) {
    const [contentHeight, setContentHeight] = useState()
    const wpDomain = useSelector(store => store.static.wpDomain)
    const wpPageURL = wpDomain + wpPath
    const preContentHeights = preHeight || "100vh"
    const navigate = useNavigate()

    useEffect(() => {
        // console.log("before addEventListener")
        window.addEventListener('message', (event) => {
            if (event.origin !== wpDomain) {
                // console.log("wrong_origin", event.origin)
                return
            }
            const data = event.data
            const unloadPrefix = "beforeunload"
            if (data instanceof String && data.startsWith(unloadPrefix)) {
                const url = data.slice(unloadPrefix.length)
                if (url.startsWith(wpDomain)) {
                    const path = url.slice(wpDomain.length)
                    console.log("navigate to internal link", path)
                    setContentHeight(null)
                    navigate(path)
                }
                else {
                    console.log("navigate to external link", url)
                    setContentHeight(null)
                    window.location.href = url
                }
            }
            else if (!(data instanceof String)) {
                // console.log("data: ", data, event.origin)
                setContentHeight(data)
            }
            else
                console.log("Wrong postMessage data")
        })
        // console.log("after addEventListener")
    }, [])


    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            height={contentHeight ? "fit-content" : preContentHeights}
            width="100%"
            position="relative"
            sx={sx}
        >
            <iframe
                id="content-iframe"
                name="report"
                src={wpPageURL}
                onLoad={() => {
                    setContentHeight(preContentHeights)
                    const iframe = document.getElementById("content-iframe")
                    console.log("before postMessage", iframe)
                    iframe.contentWindow.postMessage('start onresize', wpDomain)
                    console.log("after postMessage")
                }}
                scrolling="no"
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox	allow-presentation allow-same-origin allow-scripts allow-top-navigation"
                style={{
                    border: 0,
                    height: contentHeight || 0,
                    width: contentHeight ? "100%" : 0,
                    overflow: "hidden",
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

export default WordPressPage;