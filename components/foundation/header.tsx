import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import { Typography, Button } from '@mui/material'
import { NoSsr } from '@mui/base'
import { useEffect, useState } from 'react'

export default function Header(){
    const [ adminPage, setAdminPage ] = useState(false)

    useEffect(() => {
        if (process.browser){
            const locPath = document.location.pathname
            if(locPath.indexOf('admin') == -1) setAdminPage(true)
        }
    }, [])
    
    return (
        <header className={styles.header}>
            <div>
            <Link href="/products/">
                <>
                    <Typography variant="h4" component="h1">OrderSystem with Supabase</Typography>
                    <Typography>Next.js / React / TypeScript / Supabase / docker - Portforio - Leo.T</Typography>
                </>
            </Link>
            </div>
            <NoSsr>
            {
                adminPage
                ?
                    <Button variant="contained" href='/admin'><Typography>商品管理画面へ</Typography></Button>
                :
                    <Button variant="outlined" href='/products'><Typography>商品ページへ</Typography></Button>
            }
            
            </NoSsr>
        </header>
    )
}