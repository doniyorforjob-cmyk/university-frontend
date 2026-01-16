import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    children,
    isOpen,
    onToggle,
    className
}) => {
    return (
        <div className={cn("border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow", className)}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                type="button"
            >
                <span className="text-xl font-bold text-black">{title}</span>
                <ChevronDownIcon
                    className={cn(
                        "w-6 h-6 text-gray-400 transition-transform duration-300",
                        isOpen ? "transform rotate-180" : ""
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 pt-0 border-t border-gray-50">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface AccordionProps {
    items: {
        id: string | number;
        title: string;
        content: React.ReactNode;
    }[];
    allowMultiple?: boolean;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
    items,
    allowMultiple = false,
    className
}) => {
    const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

    const toggle = (id: string | number) => {
        const newOpenIds = new Set(openIds);
        if (newOpenIds.has(id)) {
            newOpenIds.delete(id);
        } else {
            if (!allowMultiple) {
                newOpenIds.clear();
            }
            newOpenIds.add(id);
        }
        setOpenIds(newOpenIds);
    };

    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    title={item.title}
                    isOpen={openIds.has(item.id)}
                    onToggle={() => toggle(item.id)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};
