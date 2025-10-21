import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface PrivateRouteProps {
    element: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, ...rest }) => {
    const token = useSelector((state: RootState) => state.dataStorage.token);

    return ( token) ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
