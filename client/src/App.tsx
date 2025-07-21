// client/src/App.tsx

import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
