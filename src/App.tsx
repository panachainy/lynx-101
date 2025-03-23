import { MemoryRouter, Route, Routes } from 'react-router'
import { Example } from './Example/Index.jsx'
import { Home } from './Home/Index.jsx'

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
