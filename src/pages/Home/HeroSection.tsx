/* src/pages/Home/HeroSection.tsx */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import {
  ArrowRightIcon,
  AcademicCapIcon,
  TrophyIcon,
  GlobeAltIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import Container from '../../components/shared/Container';
import { Button } from '../../components/ui';

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <Container className="relative z-10 pt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Chap ustun */}
          <div className="space-y-7 max-w-xl" data-aos="fade-up">
            <h1 className="text-5xl font-bold leading-tight">
              Ilm – <span className="text-yellow-300">Kelajak kaliti</span>
            </h1>
            <p className="text-lg text-white/90">
              Namangan Davlat Texnika Universiteti – texnologiya, innovatsiya va liderlikning markazi.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Statistikalar */}
              {/* ...statistika kodlari... */}
            </div>
            <div className="flex gap-4">
              {/* CTA tugmalar */}
              {/* ...tugmalar kodlari... */}
            </div>
          </div>
          {/* O‘ng ustun */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-yellow-300" />
                Nima uchun NAMDTU?
              </h2>
              <ul className="space-y-2">
                <li>• Zamonaviy laboratoriyalar</li>
                <li>• Xalqaro almashinuv</li>
                <li>• 100% grant imkoniyati</li>
                <li>• Ish bilan ta’minlash</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;