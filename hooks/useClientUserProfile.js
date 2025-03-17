'use client';

import { useState, useEffect } from 'react';
import { getUserInfo } from "@/app/actions/auth/getUserInfo";

// Client-side hook para uso em componentes
export function useUser() {
  const [userData, setUserData] = useState({
    user: null,
    profile: null,
    isGuide: false,
    isTourist: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      try {
        // Chamar a Server Action para obter os dados do usuário
        const result = await getUserInfo();
        
        if (isMounted) {
          if (result.success) {
            setUserData({
              user: result.user,
              profile: result.profile,
              isGuide: result.isGuide || false,
              isTourist: result.isTourist || false,
              isLoading: false,
              error: null
            });
          } else {
            setUserData({
              user: null,
              profile: null,
              isGuide: false,
              isTourist: false,
              isLoading: false,
              error: result.error
            });
          }
        }
      } catch (error) {
        if (isMounted) {
          setUserData({
            user: null,
            profile: null,
            isGuide: false,
            isTourist: false,
            isLoading: false,
            error: error.message || "Erro ao obter dados do usuário"
          });
        }
      }
    }

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return userData;
}