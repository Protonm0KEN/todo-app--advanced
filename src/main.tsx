import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootPage from './RootPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path='*' element={<RootPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
