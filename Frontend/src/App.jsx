
import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import HomeRoute from './routes/HomeRoute'
import ProductRoutes from './routes/ProductRoutes'
import UserRoutes from './routes/UserRoutes'

function App() {


  return (
    <>
      <AdminRoutes></AdminRoutes>
      <HomeRoute></HomeRoute>
      <UserRoutes></UserRoutes>
      <ProductRoutes></ProductRoutes>
    </>
  )
}

export default App
