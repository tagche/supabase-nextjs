import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'

import { TextField, Button, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type Categories = Database['public']['Tables']['categories']['Row']
type Products = Database['public']['Tables']['products']['Row']

export default function Admin({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [categorySlug, setCategorySlug] = useState<Categories['slug']>(null)
  const [categoryJa, setCategoryJa] = useState<Categories['ja']>(null)
//  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  //console.log(session);
  
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('categories')
        .select(`slug, ja`)
        //.eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCategorySlug(data.slug)
        setCategoryJa(data.ja)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

 
  return (
    <div className="form-widget">
      <Button
          className="button block"
          onClick={() => 
            supabase.auth.signOut()
          }
          variant="outlined"
          sx={{ mt: '1em'}}>
            ログアウト
          </Button>
    </div>
  
   )
}