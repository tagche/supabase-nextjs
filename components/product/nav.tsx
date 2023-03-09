import Link from 'next/link'

import { List, ListItemButton, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getNav } from '../getApi'
import { useEffect, useState } from 'react'

//商品カテゴリをアコーディオン出力
export default function Nav(){
    const [ navList, setNaviList ] = useState<Object>(0)
    
    useEffect(() => {
        const fetchData = async () => {
          const resNav = await getNav()
          setNaviList(resNav)
        }
        fetchData()
    }, [])

    return (
        Object.values(navList).map((e) => (
            <Accordion key={e.parent_slug}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content">
                <Typography>{e.parent_ja}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                {
                    Object.values(e.categories).map((el) => (
                        <List key={el.slug} component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link href={`/products/${el.slug}`} passHref>
                                    <ListItemText primary={el.ja} />
                                </Link>
                            </ListItemButton>
                        </List>
                    ))
                }
                </AccordionDetails>
            </Accordion>
        ))
    )
}
