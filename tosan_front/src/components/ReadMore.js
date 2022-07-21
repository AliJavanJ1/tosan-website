import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {ExpandLess, KeyboardArrowLeft} from "@mui/icons-material";

function ReadMore({content, maxwords, mainfontfamily, color, readmorefontfamily, readmorecolor, readmoresize, sx}) {
    const [open, setOpen] = useState(false);
    const final_sx = Object.assign({}, sx, {
        direction: "ltr"
    });
    let maxWordsLeft = maxwords
    let maxChars
    for(let i in content) {
        i = parseInt(i)
        if (i === 0) continue
        if ("\r\n ".includes(content[i]) && !"\r\n ".includes(content[i - 1])) {
            maxWordsLeft--
        }
        if (maxWordsLeft === 0) {
            maxChars = i
            break
        }
    }

    return (
        <Box sx={final_sx}>
            <Typography variant={mainfontfamily} color={color}>
                {
                    open && content.split("\r\n").map((text, index) => (
                        <Typography key={index}>
                            {text}
                            <br />
                        </Typography>
                    ))
                }
                {
                    !open && (content.slice(0, maxChars) + "...").split("\r\n").map((text, index) => (
                        <Typography key={index}>
                            {text}
                            <br />
                        </Typography>
                    ))
                }
            </Typography>
            {
                !open && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        onClick={() => setOpen(true)}
                    >
                        <Typography color={readmorecolor} variant={readmorefontfamily} >
                            بیشتر بخوانید
                        </Typography>
                        <KeyboardArrowLeft color={readmorecolor} sx={{ fontSize: readmoresize }}/>
                    </Grid>
                )
            }
            {
                open && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        onClick={() => setOpen(false)}
                    >
                        <Typography color={readmorecolor} variant={readmorefontfamily} >
                            بستن
                        </Typography>
                        <ExpandLess color={readmorecolor} sx={{ fontSize: readmoresize }}/>
                    </Grid>
                )
            }
        </Box>
    );
}

export default ReadMore;