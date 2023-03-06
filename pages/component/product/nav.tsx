import Link from 'next/link'

import { List, ListItemButton, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categoryList } from '../../api/connect'


//商品カテゴリをアコーディオン出力
export default function Nav(){
    
    const style = {
        width: '100%',
        bgcolor: 'background.paper',
        padding: '0'
    };

    return (
        <>
            <List sx={style} component="nav" aria-label="mailbox folders">
                {/* <ListItemButton component={Link} href="/">
                    <ListItemText primary="Top" />
                </ListItemButton> */}
                <Divider />
            </List>
            {
                Object.values(categoryList).map((e) => (
                    <Accordion key={e.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content">
                        <Typography>{e.ja}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {
                            Object.values(e.child).map((el) => (
                                <List key={el.id} component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} prefetch={false}>
                                        <Link href={`/category/${el.id}`}>
                                            <a><ListItemText primary={el.subCategoryJa} /></a>
                                        </Link>
                                    </ListItemButton>
                                    {/* <ListItemButton component={Link} href={`/category/${el.id}`} sx={{ pl: 4 }} prefetch={false}>
                                        <ListItemText primary={el.subCategoryJa} />
                                    </ListItemButton> */}
                                </List>
                            ))
                        }
                        
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            
        </>
    )
}
