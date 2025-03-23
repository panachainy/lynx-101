import { MemoryRouter, Route, Routes } from 'react-router'
import { Home } from './Home'

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>
  )
}
