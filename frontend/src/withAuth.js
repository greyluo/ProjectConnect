 // src/withAuth.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
      }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
