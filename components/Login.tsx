import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Paper from '@mui/material/Paper'

export default function UserLogin() {
  const supabase = useSupabaseClient()
  const session = useSession()

  return (
      !session &&
      <>
      <Paper elevation={1} sx={{padding: '1em', maxWidth: '400px', margin: 'auto'}}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      </Paper>
      </>
  )
}
