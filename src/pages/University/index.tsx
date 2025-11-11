import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Sidebar from '../../components/shared/Sidebar';
import {
  BuildingLibraryIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  BookOpenIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { observeWebVitals, reportPerformance } from '../../utils/performance';
import { setupResourceHints } from '../../utils/preload';

const UniversityPage: React.FC = () => {
  useEffect(() => {
    // Performance monitoring
    observeWebVitals((metrics) => {
      reportPerformance(metrics);
    });

    // Resource hints for performance
    setupResourceHints();

    // Preload critical images
    const criticalImages = [
      '/logo192.png',
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];
    // preloadImages(criticalImages);
  }, []);


  const leadership = [
    {
      name: 'Dr. Alimov Azizbek',
      position: 'Rektor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Universitet rektori, texnika fanlari doktori'
    },
    {
      name: 'Dr. Karimova Gulnora',
      position: 'Birinchi prorektor',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Ta\'lim va ilmiy ishlar bo\'yicha prorektor'
    },
    {
      name: 'Dr. Tursunov Bakhtiyor',
      position: 'Ilmiy ishlar prorektori',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Ilmiy tadqiqotlar va innovatsiyalar bo\'yicha prorektor'
    },
    {
      name: 'Dr. Saidova Malika',
      position: 'O\'quv ishlar prorektori',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'O\'quv jarayoni va talabalar ishlari bo\'yicha prorektor'
    }
  ];

  const famousGraduates = [
    {
      name: 'Dr. Rustamov Sardor',
      achievement: 'Google Engineering Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
      year: '2005'
    },
    {
      name: 'Dr. Abdullayeva Nilufar',
      achievement: 'Microsoft AI Research Lead',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
      year: '2008'
    },
    {
      name: 'Dr. Qodirov Jasur',
      achievement: 'Tesla Software Engineer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face',
      year: '2012'
    },
    {
      name: 'Dr. Xasanova Madina',
      achievement: 'Amazon Cloud Architect',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
      year: '2015'
    },
    {
      name: 'Dr. Yusupov Farruh',
      achievement: 'Meta AI Scientist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
      year: '2018'
    },
    {
      name: 'Dr. Rahimova Sevara',
      achievement: 'Apple iOS Developer',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face',
      year: '2020'
    }
  ];

  const historyMilestones = [
    { year: '2000', event: 'Universitet tashkil etildi' },
    { year: '2005', event: 'Birinchi bitiruvchilar' },
    { year: '2010', event: 'Yangi kampus qurildi' },
    { year: '2015', event: 'Xalqaro akkreditatsiya' },
    { year: '2020', event: 'Onlayn ta\'lim platformasi' },
    { year: '2025', event: '25 yillik yubiley' }
  ];
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">

    {/* Breadcrumbs */}
    <Container className="pt-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-2"
      >
        <Breadcrumbs items={[{ label: 'Universitet' }]} />
      </motion.div>
    </Container>


    {/* Main Content */}
    <Container>
      <div className="space-y-20">
          {/* University Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Namangan Davlat Texnika Universiteti"
              className="w-full h-80 lg:h-96 object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white">
                <BuildingLibraryIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Innovatsion talim markazi</h2>
                <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                  Kelajakni shakllantiramiz - zamonaviy texnologiyalar va innovatsion yondashuvlar bilan
                </p>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 lg:p-8"
          >
            <div className="max-w-screen-xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">Universitet haqida</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-6">
                  <p className="text-black leading-relaxed text-lg">
                    Namangan Davlat Texnika Universiteti O&apos;zbekiston Respublikasining yetakchi oliy ta&apos;lim muassasalaridan biri hisoblanadi. Universitet 2000-yilda tashkil etilgan bo&apos;lib, o&apos;z faoliyatini texnika sohasida yuqori malakali mutaxassislarni tayyorlashga bag&apos;ishlagan.
                  </p>
                  <p className="text-black leading-relaxed text-lg">
                    Bizning universitetda zamonaviy talim standartlari asosida ta&apos;lim beriladi. Talabalar nafaqat nazariy bilimlarni, balki amaliy ko&apos;nikmalarni ham egallaydi. Universitetda 15 dan ortiq fakultet va 50 ga yaqin kafedra mavjud bo&apos;lib, 5000 dan ortiq talaba tahsil oladi.
                  </p>
                  <p className="text-black leading-relaxed text-lg">
                    Universitetning asosiy maqsadi - innovatsion texnologiyalar va zamonaviy o&apos;qitish usullarini qo&apos;llagan holda, kelajakda yetakchi mutaxassislar tayyorlash. Biz talabalarga eng yaxshi ta&apos;lim berish uchun doimo yangilanib, rivojlanib boramiz.
                  </p>
                  <p className="text-black leading-relaxed text-lg">
                    Universitetda xalqaro hamkorliklar keng rivojlangan bo&apos;lib, talabalar va o&apos;qituvchilar uchun almashinuv dasturlari mavjud. Bizning bitiruvchilar dunyoning yetakchi kompaniyalarida muvaffaqiyatli faoliyat yuritmoqda.
                  </p>
                </div>

                <Sidebar />
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Missiya va Vizyon
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Universitetimizning asosiy maqsad va kelajakdagi rivojlanish yoli
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                    <GlobeAltIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Missiya</h3>
                </div>
                <p className="text-black leading-relaxed text-lg">
                  Yuqori malakali mutaxassislarni tayyorlash, ilmiy-tadqiqot ishlarini olib borish
                  va jamiyat rivojiga hissa qoshish. Biz talabalarga nafaqat nazariy bilim, balki
                  amaliy konikmalar ham beramiz.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary mr-4">
                    <BookOpenIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Vizyon</h3>
                </div>
                <p className="text-black leading-relaxed text-lg">
                  Markaziy Osiyoda yetakchi texnika universiteti bolish va xalqaro miqyosda
                  tan olingan talim muassasasi. Innovatsion texnologiyalar va zamonaviy
                  talim usullarini joriy etish.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Leadership Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Rahbariyat</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Universitetimizning yetakchi jamoasi - tajribali mutaxassislar va rahbarlar
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-primary/20">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {leader.position.split(' ')[0]}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-3 uppercase tracking-wide">
                      {leader.position}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* History Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Universitet Solnomasi</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Universitetimizning rivojlanish yoli va muhim bosqichlari
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6"></div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2 opacity-30"></div>

              {/* Timeline items - flowing from right to left */}
              <div className="flex justify-between items-center relative">
                {historyMilestones.slice().reverse().map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full shadow-xl border-4 border-white flex items-center justify-center mb-8 hover:scale-110 transition-all duration-500">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 max-w-sm text-center border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <ClockIcon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-black text-sm leading-relaxed font-medium">
                        {milestone.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Aloqa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Manzil</h4>
                  <p className="text-gray-600">Namangan shahri, Kosonsoy kochasi, 12</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Telefon</h4>
                  <p className="text-gray-600">+998 69 227 00 00</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@namdtu.uz</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Famous Graduates Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mashhur bitiruvchilar</h2>
            <div className="overflow-hidden">
              <motion.div
                className="flex space-x-6"
                animate={{
                  x: [0, -1200]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...famousGraduates, ...famousGraduates].map((graduate, index) => (
                  <div key={`${graduate.name}-${index}`} className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-4 shadow-md">
                    <img
                      src={graduate.image}
                      alt={graduate.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{graduate.name}</h3>
                    <p className="text-primary text-sm text-center mb-2">{graduate.achievement}</p>
                    <p className="text-gray-600 text-sm text-center">Bitirgan yili: {graduate.year}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default UniversityPage;