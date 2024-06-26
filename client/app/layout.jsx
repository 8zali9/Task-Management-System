import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Head/Header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenProvider } from './utils/TokenProvider'
import { SynaptronToggle } from './utils/SynaptronToggle'
import { ToggleForm } from './utils/ToggleForm'
import { ToggleNavBtns } from './utils/ToggleNavBtns';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TM',
  description: 'Engineered By: Zulfiqar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SynaptronToggle>
          <TokenProvider >
            <ToggleNavBtns>
              <ToggleForm>
                <Header />
                <ToastContainer />
                  {children}
              </ToggleForm>
            </ToggleNavBtns>
          </TokenProvider>
        </SynaptronToggle>
      </body>
    </html>
  )
}
