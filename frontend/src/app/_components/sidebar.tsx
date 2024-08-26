"use client"

import { Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Para Next.js 13+ com App Directory
import { CheckCircle, CircleDotDashedIcon, CogIcon, Home } from 'lucide-react';

function Sidebar() {
  const pathname = usePathname(); // Pega a rota atual
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Professores", href: "/professores", icon: <CheckCircle /> },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-blue-700"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <div>
            <Image
              width={130}
              alt="Logo Unifor"
              src="https://utfs.io/f/f308a663-caff-464f-82e6-9125b8d56e4d-9pdpec.png"
            />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <div>
            <Image
              width={130}
              alt="Logo Unifor"
              src="https://utfs.io/f/f308a663-caff-464f-82e6-9125b8d56e4d-9pdpec.png"
            />
          </div>
        </NavbarBrand>

        <div className='ml-10 flex flex-row gap-5 '>
          {menuItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link className="text-white text-sm" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </div>

      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Sidebar;
