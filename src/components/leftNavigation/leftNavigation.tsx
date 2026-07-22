"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  Menu,
  Lock,
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  BarChart3,
  Sparkles,
  LogOut,
  ChevronDown,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import NavigationLabel from "../Overview/NavigationLabel";
import { useNewsroom } from "@/providers/NewsroomProvider";

const YoutubeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#FF0000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#E4405F" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#1DA1F2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LeftNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPlatform = searchParams.get("platform");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiSubmenuOpen, setAiSubmenuOpen] = useState(true);
  const { permissions, currentRole } = useNewsroom();

  useEffect(() => {
    if (pathname.startsWith("/ai-content")) {
      setAiSubmenuOpen(true);
    }
  }, [pathname]);

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
      label: "Web Scraper",
      icon: <Globe size={20} />,
      path: "/web-scraper",
      accessible: permissions.canAccessWebScraper !== false,
    },
    {
      label: "AI Content Review",
      icon: <Sparkles size={20} />,
      path: "/ai-content",
      accessible: permissions.canAccessAIContentReview,
      hasSubmenu: true,
      subItems: [
        {
          label: "YouTube",
          icon: <YoutubeIcon size={16} color="#FF0000" />,
          platformKey: "YouTube",
          path: "/ai-content/youtube",
        },
        {
          label: "Instagram",
          icon: <InstagramIcon size={16} color="#E4405F" />,
          platformKey: "Instagram",
          path: "/ai-content/instagram",
        },
        {
          label: "X (Twitter)",
          icon: <XIcon size={16} color="#1DA1F2" />,
          platformKey: "X",
          path: "/ai-content/x",
        },
      ],
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
        {navItems.map((item) => {
          const isParentActive = pathname === item.path;
          const isAIReview = item.hasSubmenu;

          return (
            <React.Fragment key={item.label}>
              <Tooltip
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
                  <Box
                    onClick={() => {
                      if (item.accessible) {
                        if (isAIReview) {
                          setAiSubmenuOpen((prev) => !prev);
                        } else {
                          router.push(item.path);
                        }
                        if (isMobile && !isAIReview) setMobileOpen(false);
                      }
                    }}
                    sx={{ position: "relative" }}
                  >
                    <NavigationLabel
                      label={item.label}
                      logo={item.icon}
                      isActive={isParentActive && !currentPlatform}
                    />
                    {isAIReview && item.accessible && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "text.secondary",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {aiSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </Box>
                    )}
                  </Box>
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

              {/* Sub-menu for AI Content Review */}
              {isAIReview && item.accessible && (
                <Collapse in={aiSubmenuOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 2, display: "flex", flexDirection: "column", gap: "4px", mt: 0.5, mb: 0.5 }}>
                    {item.subItems?.map((sub) => {
                      const isSubActive =
                        pathname === sub.path ||
                        (pathname === "/ai-content" &&
                          currentPlatform?.toLowerCase() === sub.platformKey.toLowerCase());

                      return (
                        <Box
                          key={sub.label}
                          onClick={() => {
                            router.push(sub.path);
                            if (isMobile) setMobileOpen(false);
                          }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            py: 0.75,
                            px: 1.5,
                            borderRadius: "8px",
                            cursor: "pointer",
                            backgroundColor: isSubActive ? (theme.palette.mode === "light" ? "#f0f0f0" : "#2a2a2a") : "transparent",
                            color: isSubActive ? "text.primary" : "text.secondary",
                            fontWeight: isSubActive ? 600 : 400,
                            fontSize: "0.78125rem",
                            transition: "all 0.15s ease",
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                              color: "text.primary",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                            {sub.icon}
                          </Box>
                          <Typography sx={{ fontSize: "0.78125rem", fontWeight: isSubActive ? 600 : 500 }}>
                            {sub.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
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
