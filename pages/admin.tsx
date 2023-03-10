import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '@/components/foundation/header'
import styles from '@/styles/Home.module.css'
import HeadMeta from '@/components/foundation/headMeta'
//import { getAdminControlPanel } from '@/components/getApi'
import { useEffect, useState } from 'react'
import ProductsTable from '@/components/admin/table'
import { Paper } from '@mui/material'



const Admin = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  
  return (
    <>
      <HeadMeta />
      <Header />
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <main className={styles.adminMain}>
          <ProductsTable />
        </main>
      )}
    </>
  )
}

export default Admin