"use client";

import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  Tooltip,
  Select,
  MenuItem,
  Modal,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  Send,
  Lock,
  Filter,
  RotateCcw,
  X,
  LayoutGrid,
  List,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Clock,
  User,
  Sparkles,
} from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";
import { Story, StoryStatus, StoryCategory, StoryPriority } from "@/types/newsroom";

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
  const { stories, updateStoryStatus, assignStory, permissions, addActivity } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StoryStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<StoryCategory | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<StoryPriority | "all">("all");
  const [dateFilter, setDateFilter] = useState<"today" | "yesterday" | "week" | "month" | "all">("all");

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || s.priority === priorityFilter;

    // Date Filter Logic (Default: Today)
    let matchesDate = true;
    const storyDate = new Date(s.createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);

    if (dateFilter === "today") {
      matchesDate = storyDate >= today;
    } else if (dateFilter === "yesterday") {
      matchesDate = storyDate >= yesterday && storyDate < today;
    } else if (dateFilter === "week") {
      matchesDate = storyDate >= lastWeek;
    } else if (dateFilter === "month") {
      matchesDate = storyDate >= lastMonth;
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesDate;
  });

  const handleOpenStoryPopup = (story: Story) => {
    setSelectedStory(story);
    setModalOpen(true);
  };

  const handleSendForApproval = (storyId: string, title: string) => {
    assignStory(storyId);
    addActivity("assigned", "Assignment Desk Manager", title, "Sent story to Approval Portal");
    if (selectedStory?.id === storyId) setModalOpen(false);
  };

  const handleReject = (storyId: string, title: string) => {
    updateStoryStatus(storyId, "rejected");
    addActivity("rejected", "Assignment Desk Manager", title, "Story rejected from Assignment Desk");
    if (selectedStory?.id === storyId) setModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Header with Title, Count & View Toggle */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
            Assignment Desk
          </Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
            {filteredStories.length} stories
          </Typography>
        </Box>

        {/* View Switcher Toggle CTA */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500 }}>
            View:
          </Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            size="small"
            sx={{
              height: 36,
              "& .MuiToggleButton-root": {
                px: 1.25,
                py: 0.5,
                borderRadius: "8px",
                borderColor: "divider",
                "&.Mui-selected": {
                  backgroundColor: mode === "light" ? "#000" : "#fff",
                  color: mode === "light" ? "#fff" : "#000",
                  "&:hover": { backgroundColor: mode === "light" ? "#222" : "#eee" },
                },
              },
            }}
          >
            <ToggleButton value="cards">
              <Tooltip title="Cards View"><Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><LayoutGrid size={15} /><Typography sx={{ fontSize: "0.75rem", textTransform: "none", fontWeight: 600 }}>Cards</Typography></Box></Tooltip>
            </ToggleButton>
            <ToggleButton value="list">
              <Tooltip title="List View"><Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><List size={15} /><Typography sx={{ fontSize: "0.75rem", textTransform: "none", fontWeight: 600 }}>List</Typography></Box></Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Search & Dropdown Filters Bar */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 1.75, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search Input */}
          <TextField
            placeholder="Search stories by headline, reporter, topic..."
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
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <X size={14} style={{ cursor: "pointer", color: "#999" }} onClick={() => setSearchQuery("")} />
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: 220 },
              "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.8125rem", height: 38 },
            }}
          />

          {/* Dropdown Filters Group */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
            {/* Date Filter Dropdown (Default: Today) */}
            <Select
              size="small"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              displayEmpty
              sx={{
                borderRadius: "10px",
                fontSize: "0.8125rem",
                height: 38,
                minWidth: 130,
                backgroundColor: dateFilter !== "all" ? (mode === "light" ? "#f3f4f6" : "#2a2a2a") : "transparent",
                fontWeight: 600,
              }}
            >
              <MenuItem value="today" sx={{ fontSize: "0.8125rem" }}>📅 Today</MenuItem>
              <MenuItem value="yesterday" sx={{ fontSize: "0.8125rem" }}>Yesterday</MenuItem>
              <MenuItem value="week" sx={{ fontSize: "0.8125rem" }}>Last 7 Days</MenuItem>
              <MenuItem value="month" sx={{ fontSize: "0.8125rem" }}>Last 30 Days</MenuItem>
              <MenuItem value="all" sx={{ fontSize: "0.8125rem" }}>All Time</MenuItem>
            </Select>

            {/* Status Dropdown */}
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StoryStatus | "all")}
              displayEmpty
              sx={{
                borderRadius: "10px",
                fontSize: "0.8125rem",
                height: 38,
                minWidth: 140,
                backgroundColor: statusFilter !== "all" ? (mode === "light" ? "#f3f4f6" : "#2a2a2a") : "transparent",
                fontWeight: statusFilter !== "all" ? 600 : 400,
              }}
            >
              <MenuItem value="all" sx={{ fontSize: "0.8125rem" }}>All Statuses</MenuItem>
              <MenuItem value="draft" sx={{ fontSize: "0.8125rem" }}>Draft</MenuItem>
              <MenuItem value="assigned" sx={{ fontSize: "0.8125rem" }}>Assigned</MenuItem>
              <MenuItem value="pending_review" sx={{ fontSize: "0.8125rem" }}>Pending Review</MenuItem>
              <MenuItem value="pending_approval" sx={{ fontSize: "0.8125rem" }}>Pending Approval</MenuItem>
              <MenuItem value="approved" sx={{ fontSize: "0.8125rem" }}>Approved</MenuItem>
              <MenuItem value="rejected" sx={{ fontSize: "0.8125rem" }}>Rejected</MenuItem>
            </Select>

            {/* Category Dropdown */}
            <Select
              size="small"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as StoryCategory | "all")}
              displayEmpty
              sx={{
                borderRadius: "10px",
                fontSize: "0.8125rem",
                height: 38,
                minWidth: 150,
                backgroundColor: categoryFilter !== "all" ? (mode === "light" ? "#f3f4f6" : "#2a2a2a") : "transparent",
                fontWeight: categoryFilter !== "all" ? 600 : 400,
              }}
            >
              <MenuItem value="all" sx={{ fontSize: "0.8125rem" }}>All Categories</MenuItem>
              <MenuItem value="Politics" sx={{ fontSize: "0.8125rem" }}>Politics</MenuItem>
              <MenuItem value="Sports" sx={{ fontSize: "0.8125rem" }}>Sports</MenuItem>
              <MenuItem value="Business" sx={{ fontSize: "0.8125rem" }}>Business</MenuItem>
              <MenuItem value="Technology" sx={{ fontSize: "0.8125rem" }}>Technology</MenuItem>
              <MenuItem value="Entertainment" sx={{ fontSize: "0.8125rem" }}>Entertainment</MenuItem>
              <MenuItem value="Health" sx={{ fontSize: "0.8125rem" }}>Health</MenuItem>
              <MenuItem value="International" sx={{ fontSize: "0.8125rem" }}>International</MenuItem>
            </Select>

            {/* Priority Dropdown */}
            <Select
              size="small"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as StoryPriority | "all")}
              displayEmpty
              sx={{
                borderRadius: "10px",
                fontSize: "0.8125rem",
                height: 38,
                minWidth: 130,
                backgroundColor: priorityFilter !== "all" ? (mode === "light" ? "#f3f4f6" : "#2a2a2a") : "transparent",
                fontWeight: priorityFilter !== "all" ? 600 : 400,
              }}
            >
              <MenuItem value="all" sx={{ fontSize: "0.8125rem" }}>All Priorities</MenuItem>
              <MenuItem value="urgent" sx={{ fontSize: "0.8125rem" }}>Urgent</MenuItem>
              <MenuItem value="high" sx={{ fontSize: "0.8125rem" }}>High</MenuItem>
              <MenuItem value="medium" sx={{ fontSize: "0.8125rem" }}>Medium</MenuItem>
              <MenuItem value="low" sx={{ fontSize: "0.8125rem" }}>Low</MenuItem>
            </Select>

            {/* Reset Button */}
            {(statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all" || dateFilter !== "all" || searchQuery) && (
              <Button
                size="small"
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setPriorityFilter("all");
                  setDateFilter("all");
                  setSearchQuery("");
                }}
                startIcon={<RotateCcw size={13} />}
                sx={{ textTransform: "none", fontSize: "0.75rem", height: 38, borderRadius: "10px", color: "error.main", px: 1.25 }}
              >
                Reset
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* VIEW MODE 1: CARDS VIEW */}
      {viewMode === "cards" && (
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
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
              }}
              onClick={() => handleOpenStoryPopup(story)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.35, flex: 1 }}>
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
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500 }}>
                  ✍️ {story.reporter}
                </Typography>
                <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                  {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>

              {/* Assignment Desk Actions: Send for Approval & Reject */}
              <Box
                sx={{ display: "flex", gap: 1, mt: "auto", pt: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="small"
                  variant="contained"
                  disabled={story.status === "pending_approval" || story.status === "approved" || story.status === "rejected"}
                  onClick={() => handleSendForApproval(story.id, story.title)}
                  startIcon={<Send size={14} />}
                  sx={{
                    flex: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: mode === "light" ? "#111827" : "#374151",
                    color: "#FFF",
                    "&:hover": { backgroundColor: mode === "light" ? "#1F2937" : "#4B5563" },
                  }}
                >
                  {story.status === "pending_approval" ? "Sent to Approval" : "Send for Approval"}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  disabled={story.status === "rejected"}
                  onClick={() => handleReject(story.id, story.title)}
                  startIcon={<XCircle size={14} />}
                  sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.75rem", px: 1.25 }}
                >
                  Reject
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleOpenStoryPopup(story)}
                  sx={{ border: "1px solid", borderColor: "divider", borderRadius: "8px" }}
                >
                  <Eye size={15} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* VIEW MODE 2: LIST VIEW TABLE */}
      {viewMode === "list" && (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", border: "1px solid", borderColor: "divider", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: mode === "light" ? "#f9fafb" : "#1a1a1a" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Headline / Story</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Reporter</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Time</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Actions (Send / Reject)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStories.map((story) => (
                <TableRow
                  key={story.id}
                  hover
                  onClick={() => handleOpenStoryPopup(story)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ fontWeight: 600, fontSize: "0.8125rem", maxWidth: 280 }}>
                    {story.title}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8125rem" }}>{story.reporter}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    <Chip label={story.category} size="small" sx={{ fontSize: "0.65rem", height: 20 }} />
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    <Chip
                      label={story.priority}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: 20,
                        backgroundColor: PRIORITY_COLORS[story.priority].bg,
                        color: PRIORITY_COLORS[story.priority].text,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={story.status.replace("_", " ")}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: 20,
                        fontWeight: 600,
                        backgroundColor: STATUS_COLORS[story.status].bg,
                        color: STATUS_COLORS[story.status].text,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ display: "flex", gap: 0.75, justifyContent: "flex-end", alignItems: "center" }}>
                      <Button
                        size="small"
                        variant="contained"
                        disabled={story.status === "pending_approval" || story.status === "approved" || story.status === "rejected"}
                        onClick={() => handleSendForApproval(story.id, story.title)}
                        startIcon={<Send size={13} />}
                        sx={{
                          borderRadius: "6px",
                          textTransform: "none",
                          fontSize: "0.7rem",
                          py: 0.25,
                          px: 1,
                          backgroundColor: mode === "light" ? "#111827" : "#374151",
                          color: "#FFF",
                        }}
                      >
                        {story.status === "pending_approval" ? "Sent" : "Send for Approval"}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        disabled={story.status === "rejected"}
                        onClick={() => handleReject(story.id, story.title)}
                        startIcon={<XCircle size={13} />}
                        sx={{ borderRadius: "6px", textTransform: "none", fontSize: "0.7rem", py: 0.25, px: 1 }}
                      >
                        Reject
                      </Button>
                      <IconButton size="small" onClick={() => handleOpenStoryPopup(story)}>
                        <Eye size={15} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {filteredStories.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, color: "text.secondary", backgroundColor: "background.paper", borderRadius: "12px" }}>
          <Typography sx={{ fontSize: "0.875rem" }}>No stories match your search or date filter</Typography>
        </Box>
      )}

      {/* POPUP MODAL: STORY HEADLINE & REPORTER CONTENT */}
      {selectedStory && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92vw", sm: 620 },
              maxHeight: "88vh",
              backgroundColor: "background.paper",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Modal Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Chip
                  label={selectedStory.category}
                  size="small"
                  sx={{ fontSize: "0.7rem", height: 22, fontWeight: 600 }}
                />
                <Chip
                  label={selectedStory.priority}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: 22,
                    fontWeight: 600,
                    backgroundColor: PRIORITY_COLORS[selectedStory.priority].bg,
                    color: PRIORITY_COLORS[selectedStory.priority].text,
                  }}
                />
              </Box>
              <IconButton size="small" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </IconButton>
            </Box>

            {/* Reporter Headline */}
            <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.35 }}>
              {selectedStory.title}
            </Typography>

            {/* Reporter Meta Line */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "text.secondary", fontSize: "0.8125rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <User size={15} />
                <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem" }}>
                  {selectedStory.reporter}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Clock size={15} />
                <span>{new Date(selectedStory.createdAt).toLocaleString()}</span>
              </Box>
            </Box>

            {/* AI Summary Box */}
            <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: mode === "light" ? "#F3E8FF" : "#2A153B", border: "1px solid", borderColor: "#E9D5FF" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                <Sparkles size={16} color="#9333EA" />
                <Typography sx={{ fontWeight: 700, fontSize: "0.8125rem", color: "#7E22CE" }}>
                  AI Summary & Headline Suggestion
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.4, mb: 1 }}>
                {selectedStory.aiSummary}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B21A8" }}>
                Suggested Headline: "{selectedStory.aiSuggestedHeadline}"
              </Typography>
            </Box>

            {/* Full Content Sent by Reporter */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "text.secondary" }}>
                Reporter Draft Body:
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: mode === "light" ? "#F9FAFB" : "#1E1E1E",
                  border: "1px solid",
                  borderColor: "divider",
                  whiteSpace: "pre-line",
                }}
              >
                {selectedStory.body}
              </Typography>
            </Box>

            {/* Action CTAs in Popup: Send for Approval & Reject */}
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", mt: 1, pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
              <Button
                variant="outlined"
                color="error"
                disabled={selectedStory.status === "rejected"}
                onClick={() => handleReject(selectedStory.id, selectedStory.title)}
                startIcon={<XCircle size={16} />}
                sx={{ borderRadius: "10px", textTransform: "none", px: 2 }}
              >
                Reject Story
              </Button>
              <Button
                variant="contained"
                disabled={selectedStory.status === "pending_approval" || selectedStory.status === "approved"}
                onClick={() => handleSendForApproval(selectedStory.id, selectedStory.title)}
                startIcon={<Send size={16} />}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 2.5,
                  fontWeight: 700,
                  backgroundColor: mode === "light" ? "#111827" : "#374151",
                  color: "#FFF",
                  "&:hover": { backgroundColor: mode === "light" ? "#1F2937" : "#4B5563" },
                }}
              >
                {selectedStory.status === "pending_approval" ? "Sent to Approval Portal" : "Send for Approval"}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default AssignmentDesk;
