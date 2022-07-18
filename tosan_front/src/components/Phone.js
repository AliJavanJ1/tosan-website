import {Grid, Link, Typography} from "@mui/material";
import {toFarsiNumber} from "../utils";
import {useSelector} from "react-redux";

function Phone({color}) {
    const number = useSelector(store => (store.app && store.app.general_data.phone_number.value))
    let pre_number = null
    let main_number = null
    if (number) {
        pre_number = number.slice(0, 3)
        main_number = number.slice(3)
    }
    return (
        number && <Link href={"call/" + number} underline="none">
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                    color: color
                }}
            >
                <Typography variant="demiBoldX" sx={{
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