// components/layout/menu-controller.js
'use client'

import { usePathname } from 'next/navigation';

export function useMenuVisibility() {
  const pathname = usePathname();
  
  // Array de rotas onde o menu NÃO deve aparecer
  const hiddenMenuRoutes = [
    '/profile',       // Rota exata
    '/profile/'       // Com barra no final
  ];
  
  // Verificação para subpaths como /profile/settings, etc.
  const shouldHideMenu = hiddenMenuRoutes.some(route => 
    pathname === route || pathname.startsWith('/profile/')
  );
  
  return {
    showMenu: !shouldHideMenu
  };
}