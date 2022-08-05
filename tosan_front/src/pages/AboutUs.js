import {useEffect, useState} from "react";
import parse from "html-react-parser";
import {CircularProgress, Stack} from "@mui/material";
import {useSelector} from "react-redux";


function AboutUs() {
    const [content, setContent] = useState()
    const wpDomain = useSelector(store => store.static.wpDomain)
    const wpPageURL = wpDomain + "/contact-us"

    useEffect(() => {
        console.log("before addEventListener")
        window.addEventListener('message', (event) => {
            if (event.origin !== wpDomain) {
                console.log("wrong_origin", event.origin)
                return
            }
            const fixedData = event.data.replaceAll("transition-duration: 0ms", "transition-duration: 1000ms").replaceAll("width: 0px", "width: 100%")
            console.log("data", fixedData)
            setContent(fixedData)
        })
        console.log("after addEventListener")
    }, [])


    return (
        <Stack direction="column" alignItems="center" justifyContent="center" height="fit-content" width="100%">
            {content ? parse(content) : <>
                <iframe
                    name="report"
                    src={wpPageURL}
                    onLoad={iframe => {
                        console.log("before postMessage", iframe.target)
                        iframe.target.contentWindow.postMessage('get html request', wpPageURL);
                        console.log("after postMessage")
                    }}
                    style={{
                        border: 0,
                        height: 0,
                        width: 0,
                    }}/>
                <CircularProgress
                    size="10vw"
                    sx={{
                        color: "primary.shade3",
                        marginY: "5vw",
                    }}
                />
            </>}
        </Stack>
    );
}

export default AboutUs;