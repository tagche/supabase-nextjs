import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '@/components/foundation/header'
import styles from '@/styles/Home.module.css'
import HeadMeta from '@/components/foundation/headMeta'
import ProductsTable from '@/components/admin/table'
import Footer from '@/components/foundation/footer'



const Admin = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  
  return (
    <>
      <HeadMeta />
      <Header />
      <main className={styles.adminMain}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <ProductsTable />
      )}
      </main>
      <Footer />
    </>
  )
}

export default Admin