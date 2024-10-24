import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../common/AxiosInstance";

const WarehousesContext = createContext();

const WarehousesProvider = ({ children }) => {
    const [listWarehouses, setListWarehouses] = useState([]);

    const loadWarehousesData = async () => {
        try {
            const result = await axiosInstance.get('/warehouses/all');
            
            if (result) {
                setListWarehouses(result.data);
            }
        } catch (error) {
            console.error("Error loading warehouses data: ", error);
            toast.error("Không thể tải dữ liệu kho.");
        }
    };

    const addToListWarehouses = (newWarehouse) => {
        setListWarehouses(prevData => ([...prevData, newWarehouse]));
    };

    const updateValueOfWarehouseById = (id, key, value) => {
        listWarehouses.forEach(element => {
            if (element.id == id) {
                element[key] = value;
            };
        });
    };

    const deleteWarehouse = (warehouseDeletedId) => {
        setListWarehouses(prevData => prevData.filter(warehouse => warehouse.id !== warehouseDeletedId))
    };

    return (
        <WarehousesContext.Provider
            value={{ listWarehouses, loadWarehousesData, addToListWarehouses, updateValueOfWarehouseById, deleteWarehouse }}
        >
            { children }
        </WarehousesContext.Provider>
    );
}

export { WarehousesProvider, WarehousesContext };