import { useSession } from '@supabase/auth-helpers-react'
import Login from '@/components/Login'

import ProductLayout from '@/components/product/layout'


const Home = () => {
  const session = useSession()

  return (
    <div className="container" style={{ padding: '50px 50px' }}>
      {!session ? (
        <Login />
      ) : (
        <ProductLayout />
      )}
    </div>
  )
}

export default Home