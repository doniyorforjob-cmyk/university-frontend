import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-blue-50 dark:bg-gray-800">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7 text-center lg:text-left">
                        <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl text-gray-900 dark:text-white mx-auto lg:mx-0">
                            O'z orzuyingizdagi kasbni biz bilan egallang!
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg dark:text-gray-400 mx-auto lg:mx-0">
                            Innovatsion ta'lim dasturlari, zamonaviy laboratoriyalar va xalqaro aloqalar sizning muvaffaqiyatli karyerangiz uchun poydevor bo'ladi.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Yo'nalishlar
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Qabul komissiyasi
                            </a> 
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0 lg:col-span-5 flex justify-center">
                        <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop" alt="mockup" className="rounded-lg w-full max-w-md lg:max-w-full" />
                    </div>                
                </div>
            </div>
        </section>
    );
};

export default HeroSection;