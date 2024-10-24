import { createContext, useContext, useState } from 'react';

const PopupMapContext = createContext();

export const PopupMapProvider = ({ children }) => {
    const [activeMarkerId, setActiveMarkerId] = useState(null);

    const updatePopupContext = (id) => {
        setActiveMarkerId(id);
    };

    return (
        <PopupMapContext.Provider value={{ activeMarkerId, updatePopupContext }}>
            {children}
        </PopupMapContext.Provider>
    )
}

export const usePopupContext = () => useContext(PopupMapContext);