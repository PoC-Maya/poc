// components/layout/menu-wrapper.js
'use client'

import { useMenuVisibility } from './MenuController';
import { Navbar } from '../general/Navbar';

export function MenuWrapper({ user, profile }) {
  const { showMenu } = useMenuVisibility();
  
  if (!showMenu) return null;
  
  return <Navbar user={user} profile={profile} />;
}