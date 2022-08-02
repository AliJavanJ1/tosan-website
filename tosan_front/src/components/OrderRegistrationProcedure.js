import {Link, Stack, Typography} from "@mui/material";
import {objectToList, toFarsiNumber} from "../utils";
import {useSelector} from "react-redux";
import SvgIcon from "@mui/material/SvgIcon";

function OrderRegistrationProcedure() {
    const orderRegistrationProcedure = useSelector(store => (store.app && objectToList(store.app["products_page_data"]["order_registration_procedure"]).map(item => {
        const splitData = item.value.split("\r\n")
        return {
            icon: item.file,
            title: splitData[0],
            description: splitData[1],
        }
    })))

    const number = useSelector(store => (store.app && store.app.general_data.phone_number.value))

    const serverURL = useSelector(store => store.static.domain)

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                paddingY: "76px",
                paddingX: "67px",
                backgroundColor: "white.shade3",
                boxShadow: "1px 3px 12px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px 4px 0px 0px",
                height: "246px",
            }}
        >
            <Typography
                variant="demiBoldX"
                color="primary.shade4"
                marginBottom="8px"
            >
                رویه ثبت سفارش و دریافت محصولات
            </Typography>
            {number && <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexWrap="nowrap"
                columnGap={1}
            >
                <Typography
                    variant="demiBold"
                    color="primary.shade2"
                >
                    برای دریافت مشاوره خرید و ثبت سفارش کافی‌ست با شماره
                </Typography>
                <Link
                    variant="demiBold"
                    color="primary.shade4"
                    dir="ltr"
                    href={"&&tel:" + number}
                    underline="none"
                >
                    {toFarsiNumber(number.slice(0, 3))+" - "+toFarsiNumber(number.slice(3))}
                </Link>
                <Typography
                    variant="demiBold"
                    color="primary.shade2"
                >
                    تماس بگیرید.
                </Typography>
            </Stack>}
            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                flexWrap="nowrap"
                width="100%"
            >
                {orderRegistrationProcedure && orderRegistrationProcedure.map((item, index) => (
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        marginTop="42px"
                        key={index}
                    >
                        <SvgIcon inheritViewBox sx={{
                            fontSize: 60,
                        }}>
                            <image href={serverURL + item.icon} width={60} />
                        </SvgIcon>
                        <Typography variant="demiBoldS" color="gray.shade5" sx={{ marginTop: "22px" }}>
                            {item.title}
                        </Typography>
                        <Typography variant="regular" color="gray.shade5">
                            {item.description}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}

export default OrderRegistrationProcedure;