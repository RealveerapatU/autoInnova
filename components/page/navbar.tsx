"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
async function logout() {
  localStorage.setItem("logout", "1");
  window.location.href = "/signin";
}
type SearchIconProps = {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
  [key: string]: any;
};

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: SearchIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function App() {
  const router = useRouter();

  const [username, setusername] = React.useState<string | string>("");
  const [userprofile, setuserprofile] = React.useState<string | string>("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  useEffect(() => {
    const getusername = localStorage.getItem("petfeederdisplayname");
    const getprofile = localStorage.getItem("petfeederuserprofile");
    if (getusername === null || getusername === undefined) {
      setusername("undefined");
      setuserprofile("");
      return;
    }
    setusername(getusername);
    setuserprofile(getprofile || "");
  }, []);

  const menuItems = ["Dashboard", "shop"];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="center">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <a href="/">
            <p className="sm:block font-bold text-inherit">AutoInnova</p>
          </a>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex flex-1 justify-center gap-3">
          <NavbarItem>
            <Link color="foreground" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/">
              Shop
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          {username === "undefined" ? (
            <>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://tinyurl.com/38cx6btk"
                />
              </DropdownTrigger>
            </>
          ) : (
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={userprofile}
              />
            </DropdownTrigger>
          )}

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {username === "undefined" ? (
              <DropdownItem key="signin" className="h-14 gap-2">
                <a href="/signin">
                  <p className="font-semibold">Sign in</p>
                </a>
              </DropdownItem>
            ) : (
              <>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as {username}</p>
                </DropdownItem>

                <DropdownItem
                  key="settings"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </DropdownItem>
                {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem> */}
                <DropdownItem key="logout" color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
