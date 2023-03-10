import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import { Typography, Button } from '@mui/material'

export default function Header(){
    let adminPage = false
    if (process.browser){
        const locPath = document.location.pathname
        if(locPath.indexOf('admin') == -1) adminPage = true
    }
    

    return (
        <header className={styles.header}>
            <div>
            <Link href="/products/">
                <>
                    <Typography variant="h4" component="h1">OrderSystem Portfolio with Supabase</Typography>
                    <Typography>Next.js / React / TypeScript / Supabase / docker - Leo.T</Typography>
                </>
            </Link>
            </div>
            <div>
            {
                adminPage
                ?
                <a href="/admin">
                    <Button variant="contained"><Typography>商品管理画面へ</Typography></Button>
                </a>
                :
                <a href="/products">
                    <Button variant="outlined"><Typography>商品ページへ</Typography></Button>
                </a>
            }
            
            </div>
        </header>
    )
}