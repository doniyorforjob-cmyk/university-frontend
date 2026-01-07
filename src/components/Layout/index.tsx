import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import useFontSizeStore from '../../store/fontSizeStore'; // 1. Store import qilinadi

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const fontSize = useFontSizeStore((state) => state.fontSize); // 2. Shrift o'lchami olinadi

    // 3. Shrift o'lchami o'zgarganda `html` elementiga qo'llaniladi
    useEffect(() => {
        if (fontSize) {
            document.documentElement.style.fontSize = `${fontSize}px`;
        } else {
            // Agar null bo'lsa (default), CSS dagi responsive o'lchamlarni ishlatish uchun tozalaymiz
            document.documentElement.style.removeProperty('font-size');
        }
    }, [fontSize]);

    return (
        <div className="flex flex-col">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;