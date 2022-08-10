import {Box, FormControl, InputLabel, Select, Stack, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PriceTable from "./PriceTable/PriceTable";
import {useSelector} from "react-redux";
import _ from "lodash";
import {useEffect, useState} from "react";

function QuickSearch() {
    const allProducts = useSelector(store => store.app && _.groupBy(store.app["all_products"], ({main_name}) => main_name))
    const allRawPriceData = useSelector(({price}) => price)

    const [productCategory, setProductCategory] = useState()
    const [productDetails, setProductDetails] = useState()
    const [splitName, setSplitName] = useState()
    const [tableTitle, setTableTitle] = useState()
    const [initialize, setInitialize] = useState(true);

    const [rawFilteredPriceData, setRawFilteredPriceData] = useState()
    const primaryCategory = "میلگرد"

    useEffect(() => {
        if (initialize)
            if (allProducts && !productCategory)
                if (Object.keys(allProducts).includes(primaryCategory))
                    setProductCategory(primaryCategory)
                else
                    setProductCategory(Object.keys(allProducts)[0])
            else if (productCategory && !productDetails)
                setProductDetails({
                    name: allProducts[productCategory][0]["full_name"],
                    splitAttr: allProducts[productCategory][0]["split_by_attr"]
                })
            else if (productDetails && !splitName)
                setSplitName(allProducts[productCategory][0]["attr_vals"][productDetails["splitAttr"]].slice(1)[0])
            else if (splitName)
                setInitialize(false)

    }, [allProducts, productCategory, productDetails, splitName]);


    useEffect(() => {
        if (allRawPriceData && splitName) {
            setTableTitle(`${productDetails["name"]} ${productDetails["splitAttr"]} ${splitName}`)
            setRawFilteredPriceData(allRawPriceData.filter(product =>
                product["display_name"] === productDetails["name"]
                && Object.keys(product["attrs_vals"]).includes(productDetails["splitAttr"])
                && product["attrs_vals"][productDetails["splitAttr"]] === splitName))
        }
    }, [splitName, allRawPriceData])

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
                            setProductDetails(null)
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
                        value={(productDetails && productDetails["name"]) || ""}
                        disabled={!productCategory}
                        label="نام محصول"
                        onChange={(event) => {
                            setProductDetails({
                                name: event.target.value,
                                splitAttr: allProducts[productCategory].find(prod => prod["full_name"] === event.target.value)["split_by_attr"]
                            })
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
                            color: productDetails ? "primary.shade4" : "rgba(0, 0, 0, 0.25)",
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
                    <InputLabel
                        id="select-split-label">{productDetails ? productDetails["splitAttr"] : "نامشخص"}</InputLabel>
                    <Select
                        labelId="select-split-label"
                        value={splitName || ""}
                        disabled={!productDetails}
                        label={productDetails ? productDetails["splitAttr"] : "نامشخص"}
                        onChange={(event) => setSplitName(event.target.value)}
                    >
                        {productDetails && allProducts[productCategory].find(prod => prod["full_name"] === productDetails["name"])["attr_vals"][productDetails["splitAttr"]].slice(1).map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Box
                width={theme => "calc(100vw - 300px - " + theme.spacing(3 * 13) + ")"}
            >
                {rawFilteredPriceData && <PriceTable
                    raw_data={rawFilteredPriceData}
                    scroll={true}
                    title={tableTitle}
                />}
            </Box>
        </Stack>
    );
}

export default QuickSearch;