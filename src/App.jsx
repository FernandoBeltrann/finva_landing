import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AppTestPage from './pages/AppTestPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppTestPage />} />
    </Routes>
  )
}
