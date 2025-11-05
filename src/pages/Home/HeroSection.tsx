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
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Responsive background image */}
      <picture className="absolute inset-0 -z-10">
        <source media="(max-width:640px)" srcSet="/images/hero-sm.jpg" />
        <img
          src="/images/hero-lg.jpg"
          alt="NAMDTU kampusi"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* === KONTENT – TEPA YAQIYN === */}
      <Container className="relative z-10 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT – TEXT + CTA + STATISTIKA */}
          <div className="space-y-6 max-w-xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ilm – <span className="text-yellow-300">Kelajak kaliti</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Namangan Davlat Texnika Universiteti – texnologiya, innovatsiya va liderlikning markazi.
              50+ yo‘nalish, 200+ tajribali professor‑o‘qituvchilar,
              <CountUp end={10000} duration={2.5} suffix="+" className="inline font-bold text-yellow-300" />
              muvaffaqiyatli bitiruvchilar.
            </p>

            {/* STATISTIKA – 4 TA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: AcademicCapIcon, value: 50, label: "Yo‘nalish", color: "text-cyan-300" },
                { icon: TrophyIcon, value: 200, label: "Professor", color: "text-yellow-300" },
                { icon: GlobeAltIcon, value: 30, label: "Xalqaro", color: "text-purple-300" },
                { icon: LightBulbIcon, value: 95, label: "Ish topdi", color: "text-green-300" },
              ].map((stat, i) => (
                <div key={i} className="text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
                  <stat.icon className={`w-8 h-8 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-xl font-bold text-white">
                    <CountUp end={stat.value} duration={2} suffix="%" />
                  </div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA – IKKALASI OQ FONLI */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asLink
                to="/admission"
                variant="secondary"
                size="lg"
                className="group flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold"
              >
                Qabul 2025
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                asLink
                to="/virtual-tour"
                variant="secondary"
                size="lg"
                className="group flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold"
              >
                Virtual sayohat
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* RIGHT – AFZALLIKLAR + MINI CTA */}
          <div className="space-y-5" data-aos="fade-up" data-aos-delay="200">
            {/* Nima uchun NAMDTU? */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-yellow-300" />
                Nima uchun NAMDTU?
              </h2>
              <div className="grid gap-3">
                {[
                  { title: "Zamonaviy laboratoriyalar", desc: "AI, Robototexnika, IoT" },
                  { title: "Xalqaro almashinuv", desc: "Germaniya, Koreya, AQSh" },
                  { title: "100% grant imkoniyati", desc: "Davlat va xususiy stipendiyalar" },
                  { title: "Ish bilan ta’minlash", desc: "95% bitiruvchilar ish topadi" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 hover:bg-white/15 transition-all text-xs"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-white/70">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MINI CTA – Grant */}
            <div className="mt-4 flex justify-end">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 pr-4 gap-4 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs">
                  Oxirgi <strong className="text-white font-bold">150</strong> ta
                </span>

                {/* VARIANT 2 – XATOSIZ, KATTAROQ */}
                <Button
                  asLink
                  to="/apply"
                  size="sm"
                  className="bg-white text-black hover:bg-gray-100 font-bold text-sm px-6 py-2 rounded-full shadow-md transition-all"
                >
                  Ariza topshirish
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection; 