import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../shared/Container';

const MiddleHeader: React.FC = () => {
    return (
        <div className="bg-white py-8">
            <Container>
                {/* Katta ekranlar uchun layout */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Chap tomon: Logotip va Universitet nomi */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://placehold.co/150x150/EFEFEF/333?text=LOGO"
                            alt="Universitet Logosi"
                            className="h-20 w-20 rounded-full mr-4"
                        />
                        <div>
                            <h1 className="text-4xl font-bold text-[#0E104B]">NamDTU</h1>
                            <p className="text-base text-gray-500">Rasmiy web sahifasi</p>
                        </div>
                    </Link>

                    {/* O'ng tomon: Kontakt ma'lumotlari */}
                    <div className="flex items-center space-x-6">
                        {/* Telefon raqami */}
                        <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-3">
                                <svg
                                    className="h-6 w-6 text-[#0E104B]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Ishonch telefoni</p>
                                <a
                                    href="tel:+998692288433"
                                    className="text-[#0E104B] font-bold hover:underline text-lg"
                                >
                                    +998 (69) 228-84-33
                                </a>
                            </div>
                        </div>

                        {/* Manzil */}
                        <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-3">
                                <svg
                                    className="h-6 w-6 text-[#0E104B]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-base font-semibold text-gray-600">Manzil</p>
                                <p className="text-[#0E104B] font-bold text-lg">Namangan sh, Boburshox k, 1-uy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kichik ekranlar uchun layout */}
                <div className="md:hidden">
                    <Link to="/" className="flex items-center justify-center mb-4">
                        <img
                            src="https://placehold.co/100x100/EFEFEF/333?text=LOGO"
                            alt="Universitet Logosi"
                            className="h-16 w-16 rounded-full mr-3"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-[#0E104B] text-center">NamDTU</h1>
                            <p className="text-sm text-gray-500 text-center">Rasmiy web sahifasi</p>
                        </div>
                    </Link>
                    <div className="flex items-center justify-center space-x-4">
                        {/* Telefon raqami */}
                        <div className="flex items-center text-base">
                            <div className="bg-primary/10 p-3 rounded-full mr-3">
                                <svg
                                    className="h-6 w-6 text-[#0E104B]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Ishonch telefoni</p>
                                <a
                                    href="tel:+998692288433"
                                    className="text-[#0E104B] font-bold hover:underline"
                                >
                                    +998 (69) 228-84-33
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default MiddleHeader;