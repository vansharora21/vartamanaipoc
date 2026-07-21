// ─── Roles & Permissions ───────────────────────────────────────────────────────
export type UserRole = "admin" | "editor" | "assignment_desk" | "digital_team" | "viewer";

export interface RolePermissions {
  canAccessDashboard: boolean;
  canAccessAssignmentDesk: boolean;
  canAccessApprovalPortal: boolean;
  canAccessDigitalDashboard: boolean;
  canAccessAIContentReview: boolean;
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
  admin: "Admin",
  editor: "Editor",
  assignment_desk: "Assignment Desk",
  digital_team: "Digital Team",
  viewer: "Viewer",
};

// ─── Stories ───────────────────────────────────────────────────────────────────
export type StoryStatus =
  | "draft"
  | "assigned"
  | "pending_review"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "published";

export type StoryPriority = "low" | "medium" | "high" | "urgent";

export type StoryCategory =
  | "Politics"
  | "Sports"
  | "Business"
  | "Technology"
  | "Entertainment"
  | "Health"
  | "International";

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

// ─── AI Content ────────────────────────────────────────────────────────────────
export type AIContentStatus = "pending" | "approved" | "rejected";
export type Platform = "YouTube" | "Instagram" | "X (Twitter)" | "Facebook" | "LinkedIn";

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

// ─── Engagement ────────────────────────────────────────────────────────────────
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

// ─── Notifications ─────────────────────────────────────────────────────────────
export type NotificationType =
  | "story_approved"
  | "story_rejected"
  | "ai_caption_edited"
  | "instagram_post_ready"
  | "story_returned"
  | "new_assignment"
  | "ai_content_approved";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

// ─── Activity ──────────────────────────────────────────────────────────────────
export type ActivityAction = "approved" | "rejected" | "edited" | "generated" | "assigned" | "published";

export interface ActivityItem {
  id: string;
  action: ActivityAction;
  actor: string;
  target: string;
  timestamp: string;
  details?: string;
}

// ─── Reporters ─────────────────────────────────────────────────────────────────
export interface Reporter {
  id: string;
  name: string;
  avatar: string;
  email: string;
  beat: string;
}
