import '@/styles/globals.scss'
import { createContext, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'

export const loginContext = createContext<Boolean>(false)
export const cartContext = createContext<Object>([])
export const counterContext = createContext<Number>(0)

function MyApp({ Component, pageProps,}: AppProps<{ initialSession: Session,}>) {

  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [cart, setCart] = useState([])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <cartContext.Provider value={{cart, setCart}}>
          <Component {...pageProps} />
      </cartContext.Provider>
    </SessionContextProvider>
  )
}
export default MyApp