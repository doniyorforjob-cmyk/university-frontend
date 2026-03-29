import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import OptimizedImage from '../OptimizedImage';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface TeacherCardProps {
    teacher: {
        id: string | number;
        name: string;
        image?: string;
        position?: string;
        degree?: string;
        phone?: string;
        slug?: string;
    };
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const { t } = useTranslation('common');
    const { locale } = useLocale();

    const detailLink = locale === 'uz'
        ? `/leadership/${teacher.slug || teacher.id}`
        : `/${locale}/leadership/${teacher.slug || teacher.id}`;

    return (
        <Card className="mx-auto w-full max-w-sm overflow-hidden flex flex-col group h-full transition-all duration-300 hover:shadow-xl border-gray-100 shadow-md rounded-2xl bg-white">
            {/* Image Section - Square aspect ratio is safe for portraits while keeping height in check */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100/50">
                {teacher.image ? (
                    <OptimizedImage
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <User size={64} strokeWidth={1} />
                    </div>
                )}
            </div>

            <CardHeader className="p-4 space-y-2">
                {teacher.degree && (
                    <div className="flex flex-wrap">
                        <Badge variant="secondary" className="bg-gray-100 text-[#003B5C] border-none font-semibold px-2.5 py-1 rounded-full text-[10px] leading-tight max-w-full truncate">
                            {teacher.degree}
                        </Badge>
                    </div>
                )}

                <CardTitle className="text-base font-bold leading-tight text-[#003B5C] group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {teacher.name}
                </CardTitle>

                <CardDescription className="text-xs font-medium text-gray-500 line-clamp-2 italic leading-relaxed">
                    {teacher.position}
                </CardDescription>
            </CardHeader>

            <CardFooter className="px-4 pb-4 mt-auto border-t border-gray-50 pt-4">
                <Button
                    asLink
                    to={detailLink}
                    className="w-full h-10 rounded-lg font-bold text-sm bg-[#0F172A] hover:bg-black text-white transition-all shadow-md active:scale-[0.98]"
                >
                    {t('leadership.details', 'Batafsil')}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TeacherCard;
