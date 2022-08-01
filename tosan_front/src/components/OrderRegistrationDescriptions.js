import React from 'react';
import {Stack, Typography} from "@mui/material";
import parse from "html-react-parser";

function OrderRegistrationDescriptions() {
    const orderRegistrationDescriptions = [
        {
            title: "نکات پیش از خرید:",
            content:
                "<span>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</span>\n" +
                "<ol >\n" +
                "<li>لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر.</li>\n" +
                "<li>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</li>\n" +
                "<li>این یک نوشته آزمایشی است که به طراحان و برنامه نویسان کمک میکند تا این عزیزان.</li>\n" +
                "</ol>",
        },
        {
            title: "یک عنوان آزمایشی:",
            content:
                "<span>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</span>\n" +
                "<ol >\n" +
                "<li>لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر.</li>\n" +
                "<li>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</li>\n" +
                "<li>این یک نوشته آزمایشی است که به طراحان و برنامه نویسان کمک میکند تا این عزیزان.</li>\n" +
                "</ol>",
        },
    ]

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