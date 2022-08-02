import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox, Divider,
    FormControlLabel,
    Stack,
    Typography
} from "@mui/material";
import {ExpandMore, FilterAlt} from "@mui/icons-material";
import {setCheckBoxFilter} from "../redux/filterSlice";
import {useDispatch, useSelector} from "react-redux";
import {useProductFromURL} from "../utils";


function CheckBoxFilter() {
    const product = useProductFromURL()
    const fieldName = product && product["split_by_attr"]
    const  fieldOptions = product && product["attr_vals"][fieldName].slice(1)

    const selectedOptions = useSelector(store => store.filter.checkBoxFilter.split)
    const dispatch = useDispatch()

    return (
        fieldOptions && <Accordion disableGutters sx={{
            boxShadow: 0,
            border: '1px solid #C4C4C4',
            borderRadius: '4px',
            "& .MuiAccordionSummary-content": {
                margin: 0
            }
        }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                    display: "flex",
                    direction: "row",
                    alignItems: "center",
                    textAlign: "center",
                    height: 42,
                    minHeight: 42,
                }}
            >
                <FilterAlt sx={{
                    fontSize: '30px',
                    marginRight: '10px',
                    color: 'grey.shade4'
                }}/>
                <Typography
                    variant="regularX"
                    sx={{
                        color: 'grey.shade4',
                        opacity: 1,
                        marginTop: "3px",
                }}>
                    {fieldName}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    maxHeight: "227px",
                    overflowY: "scroll",
                }}
            >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {fieldOptions.map(option => (
                        <Box
                            key={option}
                            width="100%"
                            sx={{
                                marginTop: "2px",
                            }}
                        >
                            <FormControlLabel
                                sx={{
                                    "& span.MuiCheckbox-root": {
                                        color: "solid gray.shade3",
                                        opacity: 0.5,
                                    },
                                    "& span.MuiCheckbox-root.Mui-checked": {
                                        color: "primary.shade2",
                                        opacity: 1,
                                    },
                                }}
                                control={<Checkbox />}
                                label={option}
                                value={option}
                                labelPlacement="end"
                                checked={selectedOptions.includes(option)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch(setCheckBoxFilter("split", option, event.target.checked))
                                }}
                            />
                            {option !== fieldOptions[fieldOptions.length - 1] && <Divider
                                variant="middle"
                                sx={{
                                    backgroundColor: "1 solid grey.shade2",
                            }}/>}
                        </Box>
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default CheckBoxFilter;