import { Route } from "react-router-dom";
import RequiredAdminAuth from "./RequiredAdminAuth";
import AdminDashboard from "../admin/pages/AdminDashboard";
import DoctorApplications from "../admin/pages/DoctorApplications";
import AddProduct from "../admin/pages/AddProduct";
import ProductList from "../admin/pages/ProductList";
import EditProduct from "../admin/pages/EditProduct";
import AdminOrders from "../admin/pages/AdminOrders";
import AdminOrderDetails from "../admin/pages/AdminOrderDetails";

export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <RequiredAdminAuth>
            <AdminDashboard />
          </RequiredAdminAuth>
        }
      />

      <Route
        path="/admin/doctor-applications"
        element={
          <RequiredAdminAuth>
            <DoctorApplications />
          </RequiredAdminAuth>
        }
      />
      <Route
        path="/admin/add-product"
        element={
          <RequiredAdminAuth>
            <AddProduct></AddProduct>
          </RequiredAdminAuth>
        }
      />

      <Route
        path="/admin/products"
        element={
          <RequiredAdminAuth>
            <ProductList></ProductList>
          </RequiredAdminAuth>
        }
      />


      <Route
        path="/admin/products/edit/:id"
        element = {
          <RequiredAdminAuth>
              <EditProduct></EditProduct>
          </RequiredAdminAuth>
        }
      />

      <Route
        path="/admin/orders"
        element = {
          <RequiredAdminAuth>
            <AdminOrders></AdminOrders>
          </RequiredAdminAuth>
        }
      />

      <Route
        path="/admin/orders/:id"
        element = {
          <RequiredAdminAuth>
              <AdminOrderDetails></AdminOrderDetails>
          </RequiredAdminAuth>
        }
      />
      
    </>
  );
}
