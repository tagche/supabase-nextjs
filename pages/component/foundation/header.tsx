import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Typography from '@mui/material/Typography'

export default function Header(){
    return (
        <header className={styles.header}>
            <Typography variant="h4" component="h1"><Link href="/">OrderSystem Portfolio</Link></Typography>
            <Typography><Link href="/">Next.js / React / TypeScript - L.T</Link></Typography>
        </header>
    )
}