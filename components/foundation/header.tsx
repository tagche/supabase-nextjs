import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import { Typography, Button } from '@mui/material'

export default function Header(){
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
            <Link href="/admin">
                <Button variant="contained"><Typography>商品管理画面へ</Typography></Button>
            </Link>
            </div>
        </header>
    )
}