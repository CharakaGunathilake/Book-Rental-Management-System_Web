import { Book, Inbox, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(
    location.pathname.split("/")[1] || "books"
  );

  const handleRouting = (name: string) => {
    setActiveLink(name);
    navigate(`/${name}`);
  };

  return (
    <div className="flex p-2 top-0 left-0 h-full ">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-md font-semibold my-2">
              Book Rental System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Books Section */}
                <SidebarMenuButton
                  isActive={activeLink === "books"}
                  onClick={() => handleRouting("books")}
                >
                  <Book className="mr-2 h-4 w-4" />
                  Books
                </SidebarMenuButton>
                {/* Users Section */}
                <SidebarMenuButton
                  isActive={activeLink === "users"}
                  onClick={() => handleRouting("users")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Users
                </SidebarMenuButton>
                {/* <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton
                      isActive={activeLink === "admin"}
                      onClick={() => handleRouting("admin")}
                    >
                      <UserCog2 className="mr-2 h-4 w-4" />
                      Admin
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/users">
                        <UserRoundCheck className="mr-2 h-4 w-4" />
                        Librarian
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/users">
                        <User2Icon className="mr-2 h-4 w-4" />
                        Member
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub> */}

                {/* Rentals Section */}
                <SidebarMenuButton
                  isActive={activeLink === "rentals"}
                  onClick={() => handleRouting("rentals")}
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Rentals
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </div>
  );
}
