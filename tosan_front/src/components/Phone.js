import {Grid, Link, Typography} from "@mui/material";
import {toFarsiNumber} from "../utils";

function Phone({number, color}) {
    const pre_number = number.slice(0, 3)
    const main_number = number.slice(3)
    return (
        <Link href={"call/" + number} underline="none">
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                    color: color
                }}
            >
                <Typography variant="demiBold1X" sx={{
                    marginBottom: 0.7,
                }}>
                    {toFarsiNumber(pre_number) + "-"}
                </Typography>
                <Typography variant="extraBold" sx={{
                    marginRight: 0.5,
                }}>
                    {toFarsiNumber(main_number)}
                </Typography>

            </Grid>
        </Link>
    );
}

export default Phone;