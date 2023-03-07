import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Typography from '@mui/material/Typography'

export default function Header(){
    return (
        <header className={styles.header}>
            <Link href="/products/">
                <>
                    <Typography variant="h4" component="h1">OrderSystem Portfolio with Supabase</Typography>
                    <Typography>Next.js / React / TypeScript / Supabase / docker - Leo.T</Typography>
                </>
            </Link>
        </header>
    )
}