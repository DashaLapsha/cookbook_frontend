import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkSession } from '../../services/authn';
import { logout } from '../../store/sessionSlice';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface WithAuthProps {
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const HOC: React.FC<P & WithAuthProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<{}, {}, Action>>();

    useEffect(() => {
      const verifySession = async () => {
        try {
          await checkSession(); 
        } catch (error: any) {
          if (error.response && error.response.status === 403) {
            dispatch(logout());
            navigate('/auth');
          }
        }
      };

      verifySession();
    }, [navigate, dispatch]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withAuth;
