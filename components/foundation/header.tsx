import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Typography from '@mui/material/Typography'

export default function Header(){
    return (
        <header className={styles.header}>
            <Typography variant="h4" component="h1"><Link href="/">OrderSystem Portfolio with Supabase</Link></Typography>
            <Typography><Link href="/">Next.js / React / TypeScript / Supabase / docker - Leo.T</Link></Typography>
        </header>
    )
}