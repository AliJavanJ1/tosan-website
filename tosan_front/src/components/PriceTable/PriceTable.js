import React, {useRef} from 'react';
import {Box, IconButton, Stack, SvgIcon} from "@mui/material";
import PriceTableGrid from "./PriceTableGrid";
import Typography from "@mui/material/Typography";
import PrintIcon from '@mui/icons-material/Print';
import { ReactComponent as excelIcon } from '../../assets/icons/excel.svg';

const PriceTable = (props) => {
    // product_name + split_name
    const tableName = 'میلگرد آجدار ذوب‌آهن اصفهان'

    // get from datetime in the data
    const lastUpdate = 'دیروز'
    const gridRef = useRef()

    const onExcelClick = () => {
        gridRef.current.csv(tableName)
    }
    const onPrintClick = () => {
        gridRef.current.print(tableName)
    }

    return (
        <Stack>
            <Stack sx={{
                height: '99px',
                bgcolor: '#002149',
                borderRadius: '4px 4px 0px 0px',
            }}>
                <Typography variant={'demiBold'} sx={{
                    color: 'white.shade3',
                    fontSize: '22px',
                    marginLeft: '40px',
                    marginTop: '19px',
                }}>
                    {tableName}
                </Typography>
                <Stack direction={'row'} sx={{
                    height: '27px',
                    bgcolor: 'secondary.shade3',
                    boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                    marginTop: 2,
                    position: 'relative',
                }}>
                    <Typography variant={'regularX'} sx={{
                        fontSize: '14px',
                        marginLeft: '40px',
                        color: 'grey.shade4',
                    }}>
                        {'آخرین به‌روزرسانی: ' + lastUpdate}
                    </Typography>
                    <Box sx={{
                        bgcolor: 'white.shade3',
                        borderRadius: '4px',
                        boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                        position: 'absolute',
                        width: '36px',
                        height: '36px',
                        right: '76px',
                        top: '-4.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <IconButton onClick={onPrintClick}>
                            <PrintIcon sx={{
                                color: 'grey.shade4',
                                fontSize: '28px',
                            }}/>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        bgcolor: 'white.shade3',
                        borderRadius: '4px',
                        boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                        position: 'absolute',
                        width: '36px',
                        height: '36px',
                        right: '27px',
                        top: '-4.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <IconButton onClick={onExcelClick}>
                            <SvgIcon component={excelIcon} inheritViewBox />
                        </IconButton>
                    </Box>
                </Stack>
            </Stack>
            <PriceTableGrid ref={gridRef}/>
        </Stack>
    );
};

export default PriceTable;
