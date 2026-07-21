"use client";

import {
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Eye,
  ThumbsUp,
  Share2,
  MessageCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";

const PLATFORM_COLORS: Record<string, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
  "X (Twitter)": "#000000",
  Facebook: "#1877F2",
  LinkedIn: "#0A66C2",
};

const PIE_COLORS = ["#FF0000", "#E4405F", "#000000", "#1877F2", "#0A66C2"];

function AnimatedCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

const DigitalDashboard: React.FC = () => {
  const { engagement } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    views: Math.floor(Math.random() * 50000 + 10000),
    engagement: Math.floor(Math.random() * 5000 + 1000),
  }));

  const platformComparison = engagement.map((p) => ({
    name: p.platform.replace(" (Twitter)", ""),
    views: p.views,
    likes: p.likes,
    shares: p.shares,
  }));

  const engagementPieData = engagement.map((p) => ({
    name: p.platform.replace(" (Twitter)", ""),
    value: p.engagementRate,
  }));

  const contentPerformance = [
    { type: "Video", count: 45, engagement: 4.2 },
    { type: "Image", count: 78, engagement: 3.8 },
    { type: "Text", count: 32, engagement: 2.1 },
    { type: "Carousel", count: 23, engagement: 5.1 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
          Digital Dashboard
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
          Engagement monitoring across platforms
        </Typography>
      </Box>

      {/* Platform Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }, gap: 2 }}>
        {engagement.map((platform) => (
          <Box
            key={platform.platform}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "12px",
              p: 2,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                {platform.platform}
              </Typography>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: PLATFORM_COLORS[platform.platform] }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Eye size={14} color="#999" />
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Views</Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, ml: "auto" }}>
                  <AnimatedCounter value={platform.views} />
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ThumbsUp size={14} color="#999" />
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Likes</Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, ml: "auto" }}>
                  <AnimatedCounter value={platform.likes} />
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Share2 size={14} color="#999" />
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Shares</Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, ml: "auto" }}>
                  <AnimatedCounter value={platform.shares} />
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <MessageCircle size={14} color="#999" />
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Comments</Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, ml: "auto" }}>
                  <AnimatedCounter value={platform.comments} />
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                Engagement: {platform.engagementRate}%
              </Typography>
              <Chip
                icon={platform.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                label={`${platform.growth >= 0 ? "+" : ""}${platform.growth}%`}
                size="small"
                sx={{
                  fontSize: "0.625rem",
                  height: 20,
                  fontWeight: 600,
                  backgroundColor: platform.growth >= 0 ? "#E8F5E9" : "#FFEBEE",
                  color: platform.growth >= 0 ? "#2E7D32" : "#C62828",
                  borderRadius: "6px",
                  "& .MuiChip-icon": { color: platform.growth >= 0 ? "#2E7D32" : "#C62828" },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Charts */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 2 }}>
        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>24-Hour Engagement Trend</Typography>
          <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28a745" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#28a745" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === "light" ? "#eee" : "#333"} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} fontSize={10} interval={3} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(v) => formatNumber(v)} />
                <Tooltip formatter={(value) => formatNumber(Number(value))} />
                <Area type="monotone" dataKey="views" stroke="#3498db" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="engagement" stroke="#28a745" fillOpacity={1} fill="url(#colorEng)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Engagement Rate by Platform</Typography>
          <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engagementPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {engagementPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value)}%`} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: "0.75rem" }}>{value}</span>}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Platform Comparison Bar Chart */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Platform Comparison</Typography>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformComparison} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === "light" ? "#eee" : "#333"} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(v) => formatNumber(v)} />
              <Tooltip formatter={(value) => formatNumber(Number(value))} />
              <Bar dataKey="views" fill="#3498db" radius={[4, 4, 0, 0]} />
              <Bar dataKey="likes" fill="#28a745" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#ffc107" radius={[4, 4, 0, 0]} />
              <Legend
                formatter={(value) => <span style={{ fontSize: "0.75rem" }}>{value}</span>}
                iconType="circle"
                iconSize={8}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Content Performance */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Content Type Performance</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }, gap: 2 }}>
          {contentPerformance.map((item) => (
            <Box key={item.type} sx={{ textAlign: "center", p: 2, backgroundColor: "action.hover", borderRadius: "8px" }}>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 0.5 }}>{item.type}</Typography>
              <Typography sx={{ fontSize: "1.25rem", fontWeight: 700 }}>{item.count}</Typography>
              <Typography sx={{ fontSize: "0.6875rem", color: "#28a745", fontWeight: 500 }}>{item.engagement}% engagement</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DigitalDashboard;
