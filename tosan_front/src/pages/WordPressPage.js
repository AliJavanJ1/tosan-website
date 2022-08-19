import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function WordPressPage({wpPath, preHeight}) {
    const [contentHeight, setContentHeight] = useState()
    const wpDomain = useSelector(store => store.static.wpDomain)
    const wpPageURL = wpDomain + wpPath
    const preContentHeights = [preHeight || "100vh", `calc(${preHeight || "100vh"} - 1px + 1px)`]

    useEffect(() => {
        // console.log("before addEventListener")
        window.addEventListener('message', (event) => {
            if (event.origin !== wpDomain) {
                // console.log("wrong_origin", event.origin)
                return
            }
            // const fixedData = event.data.replaceAll("transition-duration: 0ms", "transition-duration: 1000ms").replaceAll("width: 0px", "width: 100%")
            const fixedData = event.data
            // console.log("data: ", fixedData, event.origin)
            setContentHeight(fixedData)
        })
        // console.log("after addEventListener")
    }, [])

    // useEffect(() => {
    //     if (preContentHeights.includes(contentHeight)) {
    //         const iframe = document.getElementById("content-iframe")
    //         // console.log("before postMessage", iframe)
    //         iframe.contentWindow.postMessage('start onresize', wpDomain)
    //         // console.log("after postMessage")
    //         if (contentHeight === preContentHeights[0])
    //             setContentHeight(preContentHeights[1])
    //         else
    //             setContentHeight(preContentHeights[0])
    //     }
    // }, [contentHeight]);


    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            height={contentHeight ? "fit-content" : preContentHeights[0]}
            width="100%"
            position="relative"
        >
            <iframe
                id="content-iframe"
                name="report"
                src={wpPageURL}
                onLoad={() => {
                    setContentHeight(preContentHeights[0])
                    const iframe = document.getElementById("content-iframe")
                    console.log("before postMessage", iframe)
                    iframe.contentWindow.postMessage('start onresize', wpDomain)
                    console.log("after postMessage")
                }}
                scrolling="no"
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                style={{
                    border: 0,
                    height: contentHeight || 0,
                    width: contentHeight ? "100%" : 0,
                    overflow: "hidden",
                    // position: (!contentHeight || preContentHeights.includes(contentHeight)) ? "absolute" : "static",
                    // right: 0,
                    // top: 0,
                    // zIndex: contentHeight ? 1 : -1,
                    // opacity: (!contentHeight || preContentHeights.includes(contentHeight)) ? 0 : 1
                }}
            />
            {!contentHeight && <CircularProgress
                size="10vw"
                sx={{
                    color: "primary.shade3",
                    marginY: "5vw",
                    // zIndex: !contentHeight ? 1 : -1
                }}
            />}
        </Stack>
    );
}

export default WordPressPage;