import { MemoryRouter, Route, Routes } from 'react-router'
import { Home } from './Home'
import { Example } from './Example'

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
