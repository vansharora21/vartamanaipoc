"use client";

import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { Search, Send, Lock } from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";
import { StoryStatus, StoryCategory, StoryPriority } from "@/types/newsroom";

const STATUS_COLORS: Record<StoryStatus, { bg: string; text: string }> = {
  draft: { bg: "#F5F5F5", text: "#666" },
  assigned: { bg: "#E3F2FD", text: "#1565C0" },
  pending_review: { bg: "#FFF3E0", text: "#E65100" },
  pending_approval: { bg: "#FFF8E1", text: "#F57F17" },
  approved: { bg: "#E8F5E9", text: "#2E7D32" },
  rejected: { bg: "#FFEBEE", text: "#C62828" },
  published: { bg: "#E0F2F1", text: "#00695C" },
};

const PRIORITY_COLORS: Record<StoryPriority, { bg: string; text: string }> = {
  low: { bg: "#F5F5F5", text: "#666" },
  medium: { bg: "#E3F2FD", text: "#1565C0" },
  high: { bg: "#FFF3E0", text: "#E65100" },
  urgent: { bg: "#FFEBEE", text: "#C62828" },
};

const AssignmentDesk: React.FC = () => {
  const { stories, assignStory, permissions } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StoryStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<StoryCategory | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<StoryPriority | "all">("all");

  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || s.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const handleSendForReview = (storyId: string) => {
    assignStory(storyId);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
          Assignment Desk
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
          {filteredStories.length} stories
        </Typography>
      </Box>

      {/* Search & Filters */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} style={{ color: "#6D6E6F" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: 200 },
              "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "0.8125rem" },
            }}
          />
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {(["all", "assigned", "pending_review", "pending_approval", "approved", "rejected", "draft"] as const).map((status) => (
              <Chip
                key={status}
                label={status === "all" ? "All" : status.replace("_", " ")}
                size="small"
                onClick={() => setStatusFilter(status)}
                sx={{
                  fontSize: "0.6875rem",
                  height: 26,
                  fontWeight: statusFilter === status ? 600 : 400,
                  backgroundColor: statusFilter === status ? "text.primary" : "action.hover",
                  color: statusFilter === status ? (mode === "light" ? "#fff" : "#000") : "text.secondary",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.75, mt: 1, flexWrap: "wrap" }}>
          {(["all", "Politics", "Sports", "Business", "Technology", "Entertainment", "Health", "International"] as const).map((cat) => (
            <Chip
              key={cat}
              label={cat === "all" ? "All Categories" : cat}
              size="small"
              onClick={() => setCategoryFilter(cat)}
              sx={{
                fontSize: "0.6875rem",
                height: 24,
                fontWeight: categoryFilter === cat ? 600 : 400,
                backgroundColor: categoryFilter === cat ? "text.primary" : "transparent",
                color: categoryFilter === cat ? (mode === "light" ? "#fff" : "#000") : "text.secondary",
                borderRadius: "8px",
                border: categoryFilter === cat ? "none" : "1px solid",
                borderColor: "divider",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Story Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2 }}>
        {filteredStories.map((story) => (
          <Box
            key={story.id}
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.3, flex: 1 }}>
                {story.title}
              </Typography>
              <Chip
                label={story.status.replace("_", " ")}
                size="small"
                sx={{
                  fontSize: "0.625rem",
                  height: 22,
                  fontWeight: 600,
                  backgroundColor: STATUS_COLORS[story.status].bg,
                  color: STATUS_COLORS[story.status].text,
                  borderRadius: "6px",
                  textTransform: "capitalize",
                  flexShrink: 0,
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              <Chip
                label={story.category}
                size="small"
                sx={{ fontSize: "0.625rem", height: 20, backgroundColor: "action.hover", color: "text.secondary", borderRadius: "6px" }}
              />
              <Chip
                label={story.priority}
                size="small"
                sx={{
                  fontSize: "0.625rem",
                  height: 20,
                  fontWeight: 600,
                  backgroundColor: PRIORITY_COLORS[story.priority].bg,
                  color: PRIORITY_COLORS[story.priority].text,
                  borderRadius: "6px",
                  textTransform: "capitalize",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                {story.reporter}
              </Typography>
              <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                {new Date(story.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Tooltip title={!permissions.canSendStories ? "You don't have permission to send stories for review" : ""}>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={permissions.canSendStories ? <Send size={14} /> : <Lock size={14} />}
                  disabled={!permissions.canSendStories || story.status === "approved" || story.status === "rejected" || story.status === "published"}
                  onClick={() => handleSendForReview(story.id)}
                  sx={{
                    backgroundColor: "text.primary",
                    color: mode === "light" ? "#fff" : "#000",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    mt: 0.5,
                    "&:hover": { backgroundColor: mode === "light" ? "#333" : "#eee" },
                    "&.Mui-disabled": {
                      backgroundColor: mode === "light" ? "#f5f5f5" : "#333",
                      color: "text.secondary",
                    },
                  }}
                >
                  {story.status === "pending_approval" ? "Pending Approval" : story.status === "approved" ? "Approved" : story.status === "rejected" ? "Rejected" : story.status === "published" ? "Published" : "Send for Review"}
                </Button>
              </Box>
            </Tooltip>
          </Box>
        ))}
      </Box>

      {filteredStories.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
          <Typography sx={{ fontSize: "0.875rem" }}>No stories match your filters</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AssignmentDesk;
