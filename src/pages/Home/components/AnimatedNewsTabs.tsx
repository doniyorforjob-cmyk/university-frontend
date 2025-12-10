"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedNewsTabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
  className?: string;
}

export const AnimatedNewsTabs: React.FC<AnimatedNewsTabsProps> = ({
  tabs,
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  if (!tabs.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-8", className)}>
      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-3 p-4 bg-surface backdrop-blur-sm border border-border rounded-2xl w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-7 py-3.5 rounded-full text-base font-medium",
                "transition-colors duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {/* ACTIVE INDICATOR – bounce yo'q, faqat silliq joy almashish */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{
                    type: "tween",       // spring emas → liqqilash yo'q
                    ease: "easeInOut",
                    duration: 0.22,      // juda tez va toza
                  }}
                />
              )}

              {/* Matn */}
              <span
                className={cn(
                  "relative z-10 transition-colors duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="min-h-60">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 12,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};