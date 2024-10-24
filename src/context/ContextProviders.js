import { PopupMapProvider } from './PopupMapContext';
import { WarehousesProvider } from './WarehousesContext';

const ContextProviders = ({ children }) => {
    return (
        <WarehousesProvider>
            <PopupMapProvider>
                {children}
            </PopupMapProvider>
        </WarehousesProvider>
    )
}

export default ContextProviders;