import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContextProviders from './context/ContextProviders';
import {
    Login,
    Home,
    Dashboard,
    Customers,
    CustomersRestore,
    Staffs,
    StaffDetails,
    StaffsRestore,
    Warehouses,
    WarehouseDetails,
    WarehousesRestore,
    Riceplants,
    AddBillPage,
    ReceiveBills,
    DispatchBills,
    PageNotFound,
} from './views/index';
import './styles/index.scss';

function App() {
    return (
        <div className='App'>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Poppins:300&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
                rel="stylesheet"
            />
            <link
                href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
                rel="stylesheet"
            />

            <ContextProviders>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route path='/login' element={<Login />} />
                        <Route element={<Home />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/customers/restore" element={<CustomersRestore />} />
                            <Route path="/warehouses" element={<Warehouses />} />
                            <Route path="/warehouses/:id" element={<WarehouseDetails />} />
                            <Route path="/warehouses/restore" element={<WarehousesRestore />} />
                            <Route path="/staffs" element={<Staffs />} />
                            <Route path="/staffs/:id" element={<StaffDetails />} />
                            <Route path="/staffs/restore" element={<StaffsRestore />} />
                            <Route path="/riceplants" element={<Riceplants />} />
                            <Route path="/bills-receive" element={<ReceiveBills />} />
                            <Route path="/bills-dispatch" element={<DispatchBills />} />
                            <Route path="/bills/add" element={<AddBillPage />} />
                        </Route>
                        <Route path="/*" exact element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </ContextProviders>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={3}
            />

            <script src="https://kit.fontawesome.com/a81368914c.js"></script>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
                integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
                integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
                crossorigin="anonymous"
            ></script>
        </div>
    )
}

export default App;