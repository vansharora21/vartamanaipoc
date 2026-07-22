"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AIContentPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ai-content/youtube");
  }, [router]);

  return null;
};

export default AIContentPage;
