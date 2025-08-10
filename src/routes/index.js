import React, { useContext } from 'react';

import AuthRoutes from './auth-routes';
import AppRoutes from './app-routes';
import { AuthContext } from '../contexts/auth';

export default function Routes() {
  const { userSigned } = useContext(AuthContext);

  const signed = userSigned;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
