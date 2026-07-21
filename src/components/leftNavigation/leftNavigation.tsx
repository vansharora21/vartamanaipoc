"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Menu, Lock, LayoutDashboard, ClipboardList, CheckCircle, BarChart3, Sparkles, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NavigationLabel from "../Overview/NavigationLabel";
import { useNewsroom } from "@/providers/NewsroomProvider";


const LeftNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { permissions, currentRole } = useNewsroom();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      accessible: permissions.canAccessDashboard,
    },
    {
      label: "Assignment Desk",
      icon: <ClipboardList size={20} />,
      path: "/assignments",
      accessible: permissions.canAccessAssignmentDesk,
    },
    {
      label: "Approval Portal",
      icon: <CheckCircle size={20} />,
      path: "/approval",
      accessible: permissions.canAccessApprovalPortal,
    },
    {
      label: "Digital Dashboard",
      icon: <BarChart3 size={20} />,
      path: "/digital",
      accessible: permissions.canAccessDigitalDashboard,
    },
    {
      label: "AI Content Review",
      icon: <Sparkles size={20} />,
      path: "/ai-content",
      accessible: permissions.canAccessAIContentReview,
    },
  ];

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Box sx={{ px: 1, py: 1.5, display: "flex", justifyContent: "center" }}>
        <img
          src="/vartaman-logo.png"
          alt="VARTAMAN AI Logo"
          style={{
            height: "36px",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
        {navItems.map((item) => (
          <Tooltip
            key={item.label}
            title={!item.accessible ? `${item.label} - Not available for ${currentRole.replace("_", " ")}` : ""}
            placement="right"
            arrow
          >
            <Box
              sx={{
                opacity: item.accessible ? 1 : 0.45,
                pointerEvents: item.accessible ? "auto" : "none",
                position: "relative",
              }}
            >
              <NavigationLabel
                label={item.label}
                logo={item.icon}
                isActive={pathname === item.path}
                onClick={() => {
                  if (item.accessible) {
                    router.push(item.path);
                    if (isMobile) setMobileOpen(false);
                  }
                }}
              />
              {!item.accessible && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Lock size={14} />
                </Box>
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px solid",
          borderColor: theme.palette.divider,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1.25,
          borderRadius: "8px",
          "&:hover": { backgroundColor: theme.palette.action.hover }
        }}
        onClick={handleLogoutClick}
      >
        <LogOut size={20} style={{ marginRight: 10, color: theme.palette.text.secondary }} />
        <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem", color: theme.palette.text.secondary }}>
          Logout
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 1201, backgroundColor: "#fff", boxShadow: 1, "&:hover": { backgroundColor: "#f5f5f5" } }}
        >
          <Menu size={20} />
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            margin: "24px",
            borderRadius: "12px",
            backgroundColor: theme.palette.background.paper,
            width: "188px",
            minWidth: "188px",
            height: "calc(100vh - 48px)",
            position: "sticky",
            top: "24px",
            flexShrink: 0,
            boxShadow: theme.palette.mode === "light" ? "0px 4px 20px rgba(0, 0, 0, 0.05)" : "0px 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {drawerContent}
        </Box>
      )}
    </>
  );
};

export default LeftNavigation;
