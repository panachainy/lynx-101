import { MemoryRouter, Route, Routes } from 'react-router'
import { Example } from './Example'
import { Home } from './Home'

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </MemoryRouter>
  )
}
