import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootPage from './RootPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
const persistor = persistStore(store)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter >
          <Routes>
            <Route path='*' element={<RootPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
