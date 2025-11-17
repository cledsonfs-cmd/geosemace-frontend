import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { authRequest } from '@/redux/modules/auth/actions';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const authorization = useSelector((state: RootState) => state.auth);

  useEffect(() => {    
    let token = '123456789';
        localStorage.setItem("token", token);
        // Limpa a URL
        const cleanUrl =
          window.location.origin + window.location.pathname + window.location.search;
        window.history.replaceState({}, document.title, cleanUrl);    
  }, [dispatch]);



  
  
   return children;
  

  return <div>Verificando autorização...</div>;
}

