"use client";

import { Box, Typography, Chip, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  FileText,
  Send,
  Pencil,
  ClipboardList,
} from "lucide-react";
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
} from "recharts";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";

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

const PIE_COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"];

const NewsroomDashboard: React.FC = () => {
  const { metrics, stories, aiContent, engagement, activity } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const categoryData = stories.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const statusData = stories.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const barData = Object.entries(statusData).map(([name, value]) => ({ name: name.replace("_", " "), count: value }));

  const weeklyData = [
    { day: "Mon", stories: 3, ai: 5 },
    { day: "Tue", stories: 5, ai: 8 },
    { day: "Wed", stories: 4, ai: 6 },
    { day: "Thu", stories: 7, ai: 10 },
    { day: "Fri", stories: 6, ai: 9 },
    { day: "Sat", stories: 2, ai: 4 },
    { day: "Sun", stories: 1, ai: 3 },
  ];

  const metricCards = [
    { label: "Stories Pending", value: metrics.storiesPending, icon: <Clock size={18} color="#ffc107" />, bg: "#FFF8E1" },
    { label: "Stories Approved", value: metrics.storiesApproved, icon: <CheckCircle size={18} color="#28a745" />, bg: "#E8F5E9" },
    { label: "Stories Rejected", value: metrics.storiesRejected, icon: <XCircle size={18} color="#dc3545" />, bg: "#FFEBEE" },
    { label: "AI Generated Posts", value: metrics.aiGeneratedPosts, icon: <Sparkles size={18} color="#9b59b6" />, bg: "#F3E5F5" },
    { label: "Pending AI Approval", value: metrics.pendingAIApproval, icon: <ClipboardList size={18} color="#3498db" />, bg: "#E3F2FD" },
    { label: "Published Today", value: metrics.publishedToday, icon: <FileText size={18} color="#00A656" />, bg: "#E9FBF0" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
      {/* Metrics Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" }, gap: 2 }}>
        {metricCards.map((card) => (
          <Box
            key={card.label}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500 }}>
                {card.label}
              </Typography>
              <Box sx={{ backgroundColor: card.bg, borderRadius: "8px", p: 0.75, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {card.icon}
              </Box>
            </Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "text.primary" }}>
              <AnimatedCounter value={card.value} />
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Charts Row */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 2 }}>
        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Weekly Activity</Typography>
          <Box sx={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b59b6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9b59b6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === "light" ? "#eee" : "#333"} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="stories" stroke="#3498db" fillOpacity={1} fill="url(#colorStories)" strokeWidth={2} />
                <Area type="monotone" dataKey="ai" stroke="#9b59b6" fillOpacity={1} fill="url(#colorAI)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Stories by Category</Typography>
          <Box sx={{ height: 240, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {pieData.map((entry, i) => (
              <Chip
                key={entry.name}
                label={`${entry.name} (${entry.value})`}
                size="small"
                sx={{
                  fontSize: "0.6875rem",
                  height: 24,
                  backgroundColor: PIE_COLORS[i % PIE_COLORS.length] + "20",
                  color: PIE_COLORS[i % PIE_COLORS.length],
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Status Bar Chart + Recent Activity */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Story Status Distribution</Typography>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === "light" ? "#eee" : "#333"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 2 }}>Recent Activity</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 260, overflowY: "auto" }}>
            {activity.slice(0, 8).map((item) => (
              <Box key={item.id} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Box sx={{
                  width: 8, height: 8, borderRadius: "50%", mt: 0.75, flexShrink: 0,
                  backgroundColor: item.action === "approved" ? "#28a745" : item.action === "rejected" ? "#dc3545" : item.action === "generated" ? "#9b59b6" : "#3498db",
                }} />
                <Box>
                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4 }}>
                    <strong>{item.actor}</strong> {item.action} <strong>{item.target}</strong>
                  </Typography>
                  <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsroomDashboard;
