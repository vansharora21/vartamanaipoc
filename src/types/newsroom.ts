// ─── Roles & Permissions ───────────────────────────────────────────────────────
export type UserRole = "admin" | "editor" | "assignment_desk" | "digital_team" | "viewer";

export interface RolePermissions {
  canAccessDashboard: boolean;
  canAccessAssignmentDesk: boolean;
  canAccessApprovalPortal: boolean;
  canAccessDigitalDashboard: boolean;
  canAccessAIContentReview: boolean;
  canAccessWebScraper: boolean;
  canAccessSettings: boolean;
  canApproveNews: boolean;
  canRejectNews: boolean;
  canEditContent: boolean;
  canCreateAssignments: boolean;
  canSendStories: boolean;
  canEditNewsroomStories: boolean;
  canApproveSocialContent: boolean;
  canViewOnly: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canAccessDashboard: true,
    canAccessAssignmentDesk: true,
    canAccessApprovalPortal: true,
    canAccessDigitalDashboard: true,
    canAccessAIContentReview: true,
    canAccessWebScraper: true,
    canAccessSettings: true,
    canApproveNews: true,
    canRejectNews: true,
    canEditContent: true,
    canCreateAssignments: true,
    canSendStories: true,
    canEditNewsroomStories: true,
    canApproveSocialContent: true,
    canViewOnly: false,
  },
  editor: {
    canAccessDashboard: true,
    canAccessAssignmentDesk: false,
    canAccessApprovalPortal: true,
    canAccessDigitalDashboard: false,
    canAccessAIContentReview: false,
    canAccessWebScraper: true,
    canAccessSettings: false,
    canApproveNews: true,
    canRejectNews: true,
    canEditContent: true,
    canCreateAssignments: false,
    canSendStories: false,
    canEditNewsroomStories: true,
    canApproveSocialContent: false,
    canViewOnly: false,
  },
  assignment_desk: {
    canAccessDashboard: true,
    canAccessAssignmentDesk: true,
    canAccessApprovalPortal: false,
    canAccessDigitalDashboard: false,
    canAccessAIContentReview: false,
    canAccessWebScraper: true,
    canAccessSettings: false,
    canApproveNews: false,
    canRejectNews: false,
    canEditContent: false,
    canCreateAssignments: true,
    canSendStories: true,
    canEditNewsroomStories: false,
    canApproveSocialContent: false,
    canViewOnly: false,
  },
  digital_team: {
    canAccessDashboard: true,
    canAccessAssignmentDesk: false,
    canAccessApprovalPortal: false,
    canAccessDigitalDashboard: true,
    canAccessAIContentReview: true,
    canAccessWebScraper: true,
    canAccessSettings: false,
    canApproveNews: false,
    canRejectNews: false,
    canEditContent: false,
    canCreateAssignments: false,
    canSendStories: false,
    canEditNewsroomStories: false,
    canApproveSocialContent: true,
    canViewOnly: false,
  },
  viewer: {
    canAccessDashboard: true,
    canAccessAssignmentDesk: false,
    canAccessApprovalPortal: false,
    canAccessDigitalDashboard: false,
    canAccessAIContentReview: false,
    canAccessWebScraper: true,
    canAccessSettings: false,
    canApproveNews: false,
    canRejectNews: false,
    canEditContent: false,
    canCreateAssignments: false,
    canSendStories: false,
    canEditNewsroomStories: false,
    canApproveSocialContent: false,
    canViewOnly: true,
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin (Full Access)",
  editor: "Chief Editor",
  assignment_desk: "Assignment Desk Manager",
  digital_team: "Digital Content Team",
  viewer: "Read-Only Viewer",
};

// ─── Data Models ──────────────────────────────────────────────────────────────
export type StoryPriority = "low" | "medium" | "high" | "urgent";

export type StoryStatus =
  | "draft"
  | "assigned"
  | "pending_review"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "published";

export type StoryCategory =
  | "Politics"
  | "Sports"
  | "Business"
  | "Technology"
  | "Entertainment"
  | "Health"
  | "International";

export interface Reporter {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  beat: string;
}

export interface Story {
  id: string;
  title: string;
  reporter: string;
  category: StoryCategory;
  priority: StoryPriority;
  status: StoryStatus;
  createdAt: string;
  updatedAt: string;
  body: string;
  aiSummary: string;
  aiSuggestedHeadline: string;
  tags: string[];
}

export type Platform = "YouTube" | "Instagram" | "X (Twitter)" | "Facebook" | "LinkedIn";

export type AIContentStatus = "pending" | "approved" | "rejected";

export interface AIContent {
  id: string;
  caption: string;
  imageUrl: string;
  platform: Platform;
  generatedAt: string;
  campaign: string;
  confidenceScore: number;
  status: AIContentStatus;
  storyId?: string;
}

export interface PlatformEngagement {
  platform: Platform;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
  growth: number;
  icon: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  action: "approved" | "rejected" | "generated" | "assigned" | "published" | "edited";
  actor: string;
  target: string;
  timestamp: string;
  details?: string;
}

export interface Notification {
  id: string;
  type:
    | "story_approved"
    | "ai_caption_edited"
    | "instagram_post_ready"
    | "story_returned"
    | "new_assignment"
    | "ai_content_approved";
  message: string;
  timestamp: string;
  read: boolean;
}

// ─── Web Scraper Data Interfaces ──────────────────────────────────────────────
export type ScraperType = "topics" | "articles" | "hashtags";

export interface ScraperItem {
  id: string;
  rank: number; // 1 to 20
  title: string; // Topic name / Article title / #hashtag
  type: ScraperType;
  platform: "X (Twitter)" | "YouTube" | "Instagram" | "Google News" | "Reddit" | "Web Scraper";
  url: string;
  engagementStats: {
    viewsOrVolume: string; // e.g., "1.8M Mentions" or "450K Reads"
    growthRate: string; // e.g., "+340% in 2h"
    sharesOrPosts: string; // e.g., "124K Shares"
  };
  reasonWhy: string; // 1-2 liner explaining WHY it is trending
  superTag: string; // Superset category tag (e.g. "Rajasthan Infrastructure")
  subTag: string; // Subset topic tag (e.g. "Jaipur Metro Phase 2")
  timeFrame: "24h" | "12h" | "7d"; // Default "24h"
  scrapedAt: string;
}
