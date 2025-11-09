import { Navigate } from 'react-router-dom';
import React, { type JSX } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface PrivateRouteProps {
    element: React.ComponentType<any>;
    children : JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element  ,children, ...rest }) => {
    const token = useSelector((state: RootState) => state.dataStorage.token);

    return ( token) ? <Element children={children} {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
