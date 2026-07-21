import {
  Story,
  AIContent,
  Reporter,
  PlatformEngagement,
  ActivityItem,
  Notification,
  StoryCategory,
  StoryPriority,
  StoryStatus,
  Platform,
  AIContentStatus,
} from "@/types/newsroom";

// ─── Reporters ─────────────────────────────────────────────────────────────────
export const DEMO_REPORTERS: Reporter[] = [
  { id: "r1", name: "Sarah Mitchell", avatar: "", email: "sarah@newsroom.ai", beat: "Politics" },
  { id: "r2", name: "James Rodriguez", avatar: "", email: "james@newsroom.ai", beat: "Technology" },
  { id: "r3", name: "Emily Chen", avatar: "", email: "emily@newsroom.ai", beat: "Business" },
  { id: "r4", name: "Michael Okafor", avatar: "", email: "michael@newsroom.ai", beat: "Sports" },
  { id: "r5", name: "Priya Sharma", avatar: "", email: "priya@newsroom.ai", beat: "Health" },
];

// ─── Categories & Helpers ──────────────────────────────────────────────────────
const CATEGORIES: StoryCategory[] = [
  "Politics", "Sports", "Business", "Technology", "Entertainment", "Health", "International",
];
const PRIORITIES: StoryPriority[] = ["low", "medium", "high", "urgent"];
const STATUSES: StoryStatus[] = [
  "draft", "assigned", "pending_review", "pending_approval", "approved", "rejected", "published",
];
const PLATFORMS: Platform[] = ["YouTube", "Instagram", "X (Twitter)", "Facebook", "LinkedIn"];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── Stories ───────────────────────────────────────────────────────────────────
const STORY_TITLES: string[] = [
  "Senate Passes New Infrastructure Bill After Marathon Debate",
  "Champions League Final: Underdog Team Stuns World Champions",
  "Federal Reserve Signals Potential Rate Cut Amid Economic Slowdown",
  "AI Startup Raises $500M in Record Series C Round",
  "Blockbuster Summer Movie Breaks Opening Weekend Records",
  "WHO Issues New Guidelines on Mental Health in Workplace",
  "G7 Leaders Agree on Coordinated Climate Action Plan",
  "Local Community Rallies to Support Flood Victims",
  "Tech Giants Face New Antitrust Regulations in Europe",
  "Olympic Committee Announces Three New Sports for 2028 Games",
  "Major Bank Reports Surprising Q2 Earnings Beat",
  "New Study Links Sleep Quality to Cognitive Performance",
  "International Space Station Celebrates 25 Years of Operation",
  "Celebrity Chef Opens Revolutionary Zero-Waste Restaurant",
  "Cybersecurity Alert: New Vulnerability Discovered in Popular Software",
];

const STORY_BODIES: string[] = [
  "In a groundbreaking development that has captured the attention of experts and civilians alike, the implications of this story extend far beyond what was initially anticipated. Sources close to the matter confirm that multiple stakeholders have been working behind the scenes to bring this to fruition. The announcement marks a significant turning point in the ongoing narrative, with analysts predicting lasting effects on the industry and public discourse. Further details are expected to emerge in the coming days as additional parties weigh in on the situation.",
  "The decision comes after months of deliberation and intense negotiations between key parties. Industry observers note that this move represents a paradigm shift in how organizations approach similar challenges. Critics and supporters alike have voiced their perspectives, creating a rich tapestry of viewpoints that underscores the complexity of the issue. The ripple effects are already being felt across related sectors, with early indicators suggesting profound long-term consequences.",
  "Experts in the field have long predicted a moment like this, though few anticipated it would arrive with such speed and magnitude. The convergence of technological innovation, regulatory changes, and shifting consumer preferences has created a perfect storm of opportunity. Leaders in the space are now scrambling to adapt their strategies, while newcomers see an opening to disrupt established players. The next six months will be critical in determining the ultimate impact.",
];

const AI_HEADLINES: string[] = [
  "Breaking: Major Development Reshapes Industry Landscape",
  "Exclusive: Inside the Story That Could Change Everything",
  "Analysis: What This Means for the Future of the Sector",
  "Update: Key Players Respond to Unfolding Situation",
  "Investigation: The Hidden Factors Behind the Headlines",
];

const AI_SUMMARIES: string[] = [
  "This story covers a significant development with broad implications across multiple sectors. Key stakeholders have responded with a mix of optimism and caution, reflecting the complexity of the situation. Our analysis suggests this marks a turning point that will influence policy and market behavior for months to come.",
  "A comprehensive look at the forces driving this change, from technological innovation to regulatory shifts. The piece examines multiple perspectives and provides context for understanding the broader implications. Expert commentary adds depth to the reporting.",
  "An in-depth examination of a rapidly evolving situation that touches on economics, politics, and social dynamics. The reporting draws on multiple sources and data points to construct a nuanced picture of what happened and what it means going forward.",
];

const CAMPAIGNS: string[] = [
  "Election Coverage 2026",
  "Tech Innovation Series",
  "Market Watch Daily",
  "Health & Wellness Weekly",
  "Sports Season Highlights",
  "Global Affairs Report",
  "Entertainment Tonight",
];

function generateStories(): Story[] {
  return STORY_TITLES.map((title, i) => {
    const reporter = DEMO_REPORTERS[i % DEMO_REPORTERS.length];
    const daysAgo = randInt(0, 14);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      id: `story-${i + 1}`,
      title,
      reporter: reporter.name,
      category: CATEGORIES[i % CATEGORIES.length],
      priority: PRIORITIES[i % PRIORITIES.length],
      status: STATUSES[i % STATUSES.length],
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      body: STORY_BODIES[i % STORY_BODIES.length],
      aiSummary: AI_SUMMARIES[i % AI_SUMMARIES.length],
      aiSuggestedHeadline: AI_HEADLINES[i % AI_HEADLINES.length],
      tags: [CATEGORIES[i % CATEGORIES.length].toLowerCase(), reporter.beat.toLowerCase()],
    };
  });
}

// ─── AI Content ────────────────────────────────────────────────────────────────
const AI_CAPTIONS: string[] = [
  "Breaking news coverage that matters. Stay informed with our latest investigative report. #News #Breaking",
  "Behind the scenes of today's top story. Our reporters bring you the full picture. #Journalism #Truth",
  "What you need to know about today's biggest development. Full analysis in our latest piece. #Analysis",
  "Exclusive interview reveals new details about the ongoing situation. Watch the full segment. #Exclusive",
  "Data-driven insights into the stories shaping our world. Numbers don't lie. #Data #Insights",
  "Community voices at the center of the story. Real people, real impact. #Community #Impact",
  "The future of news is here. AI-powered insights meet human journalism. #AI #Innovation",
  "Global perspectives on local stories. Connecting the dots across borders. #Global #News",
  "Investigative journalism at its finest. Uncovering what others miss. #Investigation #Truth",
  "Breaking down complex stories into digestible insights. Stay ahead of the curve. #Explained",
];

const AI_IMAGE_URLS: string[] = [
  "https://picsum.photos/seed/news1/800/600",
  "https://picsum.photos/seed/news2/800/600",
  "https://picsum.photos/seed/news3/800/600",
  "https://picsum.photos/seed/news4/800/600",
  "https://picsum.photos/seed/news5/800/600",
  "https://picsum.photos/seed/news6/800/600",
  "https://picsum.photos/seed/news7/800/600",
  "https://picsum.photos/seed/news8/800/600",
  "https://picsum.photos/seed/news9/800/600",
  "https://picsum.photos/seed/news10/800/600",
];

const AI_CONTENT_STATUSES: AIContentStatus[] = ["pending", "approved", "rejected"];

function generateAIContent(): AIContent[] {
  return Array.from({ length: 20 }, (_, i) => {
    const daysAgo = randInt(0, 7);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      id: `ai-${i + 1}`,
      caption: AI_CAPTIONS[i % AI_CAPTIONS.length],
      imageUrl: AI_IMAGE_URLS[i % AI_IMAGE_URLS.length],
      platform: PLATFORMS[i % PLATFORMS.length],
      generatedAt: date.toISOString(),
      campaign: CAMPAIGNS[i % CAMPAIGNS.length],
      confidenceScore: randInt(72, 98),
      status: AI_CONTENT_STATUSES[i % AI_CONTENT_STATUSES.length],
      storyId: `story-${(i % 15) + 1}`,
    };
  });
}

// ─── Engagement ────────────────────────────────────────────────────────────────
function generateEngagement(): PlatformEngagement[] {
  return [
    {
      platform: "YouTube",
      views: randInt(120000, 890000),
      likes: randInt(8000, 45000),
      shares: randInt(2000, 18000),
      comments: randInt(1500, 12000),
      engagementRate: parseFloat((Math.random() * 5 + 2).toFixed(1)),
      growth: parseFloat((Math.random() * 20 - 5).toFixed(1)),
      icon: "YouTube",
      color: "#FF0000",
    },
    {
      platform: "Instagram",
      views: randInt(200000, 1200000),
      likes: randInt(15000, 80000),
      shares: randInt(5000, 30000),
      comments: randInt(3000, 20000),
      engagementRate: parseFloat((Math.random() * 6 + 3).toFixed(1)),
      growth: parseFloat((Math.random() * 25 - 5).toFixed(1)),
      icon: "Instagram",
      color: "#E4405F",
    },
    {
      platform: "X (Twitter)",
      views: randInt(300000, 2000000),
      likes: randInt(10000, 60000),
      shares: randInt(8000, 50000),
      comments: randInt(2000, 15000),
      engagementRate: parseFloat((Math.random() * 4 + 1.5).toFixed(1)),
      growth: parseFloat((Math.random() * 15 - 8).toFixed(1)),
      icon: "X",
      color: "#000000",
    },
    {
      platform: "Facebook",
      views: randInt(80000, 500000),
      likes: randInt(5000, 30000),
      shares: randInt(3000, 20000),
      comments: randInt(1000, 8000),
      engagementRate: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      growth: parseFloat((Math.random() * 10 - 6).toFixed(1)),
      icon: "Facebook",
      color: "#1877F2",
    },
    {
      platform: "LinkedIn",
      views: randInt(40000, 250000),
      likes: randInt(3000, 15000),
      shares: randInt(1000, 8000),
      comments: randInt(500, 4000),
      engagementRate: parseFloat((Math.random() * 4 + 2).toFixed(1)),
      growth: parseFloat((Math.random() * 18 - 3).toFixed(1)),
      icon: "LinkedIn",
      color: "#0A66C2",
    },
  ];
}

// ─── Activity Timeline ─────────────────────────────────────────────────────────
function generateActivity(): ActivityItem[] {
  const items: ActivityItem[] = [
    { id: "a1", action: "approved", actor: "Sarah Mitchell", target: "Senate Infrastructure Bill", timestamp: new Date(Date.now() - 300000).toISOString(), details: "Story approved for publication" },
    { id: "a2", action: "generated", actor: "AI System", target: "Instagram caption for Tech Startup story", timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: "a3", action: "edited", actor: "James Rodriguez", target: "Champions League Final recap", timestamp: new Date(Date.now() - 900000).toISOString(), details: "Updated headline and added quotes" },
    { id: "a4", action: "approved", actor: "Digital Team", target: "YouTube thumbnail for Federal Reserve analysis", timestamp: new Date(Date.now() - 1200000).toISOString() },
    { id: "a5", action: "assigned", actor: "Michael Okafor", target: "Olympic Committee announcement", timestamp: new Date(Date.now() - 1800000).toISOString(), details: "Assigned to Emily Chen" },
    { id: "a6", action: "rejected", actor: "Sarah Mitchell", target: "Draft: Celebrity gossip piece", timestamp: new Date(Date.now() - 2400000).toISOString(), details: "Does not meet editorial standards" },
    { id: "a7", action: "published", actor: "Editorial Team", target: "G7 Climate Action Plan", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "a8", action: "generated", actor: "AI System", target: "LinkedIn post for Bank Earnings report", timestamp: new Date(Date.now() - 4200000).toISOString() },
  ];
  return items;
}

// ─── Notifications ─────────────────────────────────────────────────────────────
function generateNotifications(): Notification[] {
  return [
    { id: "n1", type: "story_approved", message: "Senate Infrastructure Bill approved by Editorial", timestamp: new Date(Date.now() - 300000).toISOString(), read: false },
    { id: "n2", type: "ai_caption_edited", message: "AI caption edited for Tech Startup story", timestamp: new Date(Date.now() - 600000).toISOString(), read: false },
    { id: "n3", type: "instagram_post_ready", message: "Instagram post ready for Champions League coverage", timestamp: new Date(Date.now() - 900000).toISOString(), read: true },
    { id: "n4", type: "story_returned", message: "Draft returned: Celebrity gossip piece needs revision", timestamp: new Date(Date.now() - 1200000).toISOString(), read: true },
    { id: "n5", type: "new_assignment", message: "New assignment: Olympic Committee story assigned to Emily Chen", timestamp: new Date(Date.now() - 1800000).toISOString(), read: false },
    { id: "n6", type: "ai_content_approved", message: "AI-generated LinkedIn post approved for publication", timestamp: new Date(Date.now() - 2400000).toISOString(), read: true },
  ];
}

// ─── Master Generator ──────────────────────────────────────────────────────────
export interface NewsroomData {
  stories: Story[];
  aiContent: AIContent[];
  engagement: PlatformEngagement[];
  activity: ActivityItem[];
  notifications: Notification[];
  reporters: Reporter[];
}

const STORAGE_KEY = "newsroom_data";

export function generateAndStoreData(): NewsroomData {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Regenerate if corrupted
    }
  }

  const data: NewsroomData = {
    stories: generateStories(),
    aiContent: generateAIContent(),
    engagement: generateEngagement(),
    activity: generateActivity(),
    notifications: generateNotifications(),
    reporters: DEMO_REPORTERS,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function loadData(): NewsroomData | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveData(data: NewsroomData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData(): NewsroomData {
  localStorage.removeItem(STORAGE_KEY);
  return generateAndStoreData();
}
