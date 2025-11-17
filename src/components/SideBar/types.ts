import { ReactNode } from "react";

export interface MenuItem {
  label: string;
  path: string;
  icon: ReactNode; // pode ser JSX.Element também
}

export interface SideBarProps {
  menuItems: MenuItem[];
}
