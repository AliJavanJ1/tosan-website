import React from 'react';
import {Stack, Typography} from "@mui/material";
import parse from "html-react-parser";
import {useSelector} from "react-redux";

function OrderRegistrationDescriptions() {

    const orderRegistrationDescriptions = useSelector(store => (store.app && store.app["products_page_data"]["order_registration_descriptions"]["value"].map(data => {
        const splitData =  data.split("\r\n")
        return {
            title: splitData[0],
            content: splitData.slice(1).join("")
        }
    })))

    return (
        <Stack
            direction="column"
            alignItems="flex-start"
            sx={{
                paddingY: "76px",
                paddingX: "67px",
                backgroundColor: "white.shade3",
                boxShadow: "1px 3px 12px rgba(0, 0, 0, 0.08)",
                borderRadius: "0px 0px 4px 4px",
                rowGap: "66px",
                "& ol": {
                    listStyleType: "persian",
                    margin: 0,
                    paddingLeft: "19px",
                },
                "& p": {
                    margin: 0,
                }
            }}
        >
            {orderRegistrationDescriptions && orderRegistrationDescriptions.map((item, index) => (
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    key={index}
                >
                    <Typography
                        variant="demiBold"
                        color="gray.shade5"
                        sx={{
                            marginBottom: "12px",
                        }}
                    >
                        {item.title}
                    </Typography>
                    <Typography
                        variant="regular"
                        color="gray.shade5"
                    >
                        {parse(item.content)}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
}

export default OrderRegistrationDescriptions;