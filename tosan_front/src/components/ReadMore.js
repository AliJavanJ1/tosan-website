import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {ExpandLess, KeyboardArrowLeft} from "@mui/icons-material";
import parse from 'html-react-parser';


function ReadMore({content, maxlines, mainfontfamily, color, readmorefontfamily, readmorecolor, readmoresize, sx}) {
    const [open, setOpen] = useState(false);
    const final_sx = Object.assign({}, sx, {
        direction: "ltr"
    });

    return (
        <Box sx={final_sx}>
            <Typography variant={mainfontfamily} paragraph={true} color={color} sx={open ? {} : {
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: maxlines,
                WebkitBoxOrient: "vertical",
            }}>
                { parse(content.replaceAll("\r\n", "<br />")) }
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
                        <Typography color={readmorecolor} variant={readmorefontfamily} sx={{
                            cursor:'pointer'
                        }}>
                            بیشتر بخوانید
                        </Typography>
                        <KeyboardArrowLeft color={readmorecolor} sx={{ fontSize: readmoresize, cursor:'pointer' }}/>
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
                        <Typography color={readmorecolor} variant={readmorefontfamily} sx={{
                            cursor:'pointer'
                        }}>
                            بستن
                        </Typography>
                        <ExpandLess color={readmorecolor} sx={{ fontSize: readmoresize, cursor:'pointer' }}/>
                    </Grid>
                )
            }
        </Box>
    );
}

export default ReadMore;