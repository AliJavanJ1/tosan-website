import {Box, FormControl, InputLabel, Select, Stack, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PriceTable from "./PriceTable/PriceTable";
import {useSelector} from "react-redux";
import _ from "lodash";
import {useMemo, useState} from "react";

const addSplit = (allProds) => {
    for (const product of allProds) {
        product["split"] = "شرکت"
        const allCompanies = [
            "فولاد خوزستان",
            "فولاد مبارکه",
            "فولاد سمنگان",
            "فولاد گوزان",
            "سنگ‌آهن بافق یزد",
            "ذوب آهن اصفهان",
            "مس کرمان"
        ]
        product["split_options"] = allCompanies.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * allCompanies.length) + 1)
    }
    return _.groupBy(allProds, ({main_name}) => main_name)
}

function QuickSearch() {
    const [allProducts, setAllProducts] = useState()
    const allProductsRaw = useSelector(store => store.app && store.app["all_products"])

    useMemo(() => {
        if (allProductsRaw)
            setAllProducts(addSplit(JSON.parse(JSON.stringify(allProductsRaw))))
    }, [allProductsRaw])

    const [productCategory, setProductCategory] = useState()
    const [productName, setProductName] = useState()
    const [splitName, setSplitName] = useState()

    return (
        <Stack
            width="100%"
            height={522}
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="nowrap"
            position="relative"
            paddingTop="124px"
            paddingBottom="76px"
            marginBottom="79px"
            bgcolor="white.main"
        >
            <Stack
                direction="row"
                alignItems="center"
                position="absolute"
                top={32}
                left={0}
                height={60}
                width={608}
                paddingLeft={13}
                borderRadius="0px 4px 4px 0px"
                bgcolor="secondary.shade3"
            >
                <Typography variant="bold" color="primary.shade4">
                    جست‌وجوی سریع قیمت آهن‌آلات
                </Typography>
            </Stack>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="nowrap"
                width={300}
                rowGap="31px"
            >
                <FormControl
                    fullWidth
                    sx={{
                        "& label": {
                            color: allProducts ? "primary.shade4" : "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-input, svg": {
                            color: "primary.shade4",
                        },
                        "& fieldset": {
                            borderColor: "primary.shade4",
                        },
                        "& .MuiInputBase-root > .MuiInputBase-input": {
                            color: "primary.shade4",
                            typography: "medium",
                        },
                        "& .MuiInputBase-root:hover svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root:hover fieldset": {
                            borderColor: "secondary.shade3",
                        },
                        "& label.MuiInputLabel-shrink.Mui-focused, .MuiInputBase-root.Mui-focused svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root.Mui-focused fieldset": {
                            borderColor: "secondary.shade3",
                            opacity: 0.7,
                        },
                        "& .MuiInputBase-root.Mui-disabled svg": {
                            color: "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-root.Mui-disabled fieldset": {
                            borderColor: "rgba(0, 0, 0, 0.25)",
                        }
                    }}
                >
                    <InputLabel id="product-category-label">نوع آهن‌آلات</InputLabel>
                    <Select
                        labelId="product-category-label"
                        value={productCategory || ""}
                        label="نوع آهن‌آلات"
                        onChange={(event) => {
                            setProductCategory(event.target.value)
                            setProductName(null)
                            setSplitName(null)
                        }}
                    >
                        {allProducts && Object.keys(allProducts).map(category => (
                            <MenuItem
                                key={category}
                                value={category}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{
                        "& label": {
                            color: productCategory ? "primary.shade4" : "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-input, svg": {
                            color: "primary.shade4",
                        },
                        "& fieldset": {
                            borderColor: "primary.shade4",
                        },
                        "& .MuiInputBase-root > .MuiInputBase-input": {
                            color: "primary.shade4",
                            typography: "medium",
                        },
                        "& .MuiInputBase-root:hover svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root:hover fieldset": {
                            borderColor: "secondary.shade3",
                        },
                        "& label.MuiInputLabel-shrink.Mui-focused, .MuiInputBase-root.Mui-focused svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root.Mui-focused fieldset": {
                            borderColor: "secondary.shade3",
                            opacity: 0.7,
                        },
                        "& .MuiInputBase-root.Mui-disabled svg": {
                            color: "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-root.Mui-disabled fieldset": {
                            borderColor: "rgba(0, 0, 0, 0.25)",
                        }
                    }}
                >
                    <InputLabel id="product-name-label">نام محصول</InputLabel>
                    <Select
                        labelId="product-name-label"
                        value={productName || ""}
                        disabled={!productCategory}
                        label="نام محصول"
                        onChange={(event) => {
                            setProductName(event.target.value)
                            setSplitName(null)
                        }}
                    >
                        {productCategory && allProducts[productCategory].map(({full_name}) => (
                            <MenuItem key={full_name} value={full_name}>{full_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{
                        "& label": {
                            color: productName ? "primary.shade4" : "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-input, svg": {
                            color: "primary.shade4",
                        },
                        "& fieldset": {
                            borderColor: "primary.shade4",
                        },
                        "& .MuiInputBase-root > .MuiInputBase-input": {
                            color: "primary.shade4",
                            typography: "medium",
                        },
                        "& .MuiInputBase-root:hover svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root:hover fieldset": {
                            borderColor: "secondary.shade3",
                        },
                        "& label.MuiInputLabel-shrink.Mui-focused, .MuiInputBase-root.Mui-focused svg": {
                            color: "secondary.shade3",
                        },
                        "& .MuiInputBase-root.Mui-focused fieldset": {
                            borderColor: "secondary.shade3",
                            opacity: 0.7,
                        },
                        "& .MuiInputBase-root.Mui-disabled svg": {
                            color: "rgba(0, 0, 0, 0.25)",
                        },
                        "& .MuiInputBase-root.Mui-disabled fieldset": {
                            borderColor: "rgba(0, 0, 0, 0.25)",
                        }
                    }}
                >
                    <InputLabel id="select-split-label">{productName ? allProducts[productCategory].find(prod => prod["full_name"] === productName).split : "نامشخص"}</InputLabel>
                    <Select
                        labelId="select-split-label"
                        value={splitName || ""}
                        disabled={!productName}
                        label={productName ? allProducts[productCategory].find(prod => prod["full_name"] === productName).split : "نامشخص"}
                        onChange={(event) => setSplitName(event.target.value)}
                    >
                        {productName && allProducts[productCategory].find(prod => prod["full_name"] === productName).split_options.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Box
                width={theme => "calc(100vw - 300px - " + theme.spacing(3*13) + ")"}
            >
                <PriceTable />
            </Box>
        </Stack>
    );
}

export default QuickSearch;