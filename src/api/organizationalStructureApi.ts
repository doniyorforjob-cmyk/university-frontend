/**
 * Organizational Structure API
 * Tashkiliy tuzilma sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';

interface OrganizationalStructureData {
  blocks: ContentBlock[];
}

/**
 * Mock API - Tashkiliy tuzilma ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * Tashkiliy tuzilma ma'lumotlarini olish
 */
export const fetchOrganizationalStructureData = async (): Promise<OrganizationalStructureData> => {
  const data: OrganizationalStructureData = {
    blocks: [
      {
        id: 'structure-tree',
        type: 'rich-text',
        data: {
          content: `
            <div class="space-y-8">
              <!-- Rektorat -->
              <div class="text-center relative">
                <div class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg relative">
                  <div class="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white bg-gray-300 flex items-center justify-center text-black font-bold">R</div>
                  Rektor
                </div>
                <div class="mt-2 text-base text-gray-700 font-medium">Universitet rahbari</div>
                <div class="mt-1 text-sm text-gray-500">Prof. Dr. [Ism Familiya]</div>
                <!-- Vertical line down -->
                <div class="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-8 bg-blue-400 mt-4"></div>
              </div>

              <!-- Prorektorlar -->
              <div class="relative">
                <!-- Horizontal line above -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-green-400"></div>
                <!-- Vertical line down from center -->
                <div class="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-8 bg-green-400 mt-4"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                  <div class="text-center min-h-[120px] flex flex-col justify-center">
                    <div class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-sm relative">
                      <div class="w-12 h-12 rounded-full mx-auto mb-1 border-2 border-white bg-gray-300 flex items-center justify-center text-black font-bold">P1</div>
                      O'quv ishlari bo'yicha prorektor
                    </div>
                    <div class="mt-2 text-sm text-gray-600">Prof. Dr. [Ism Familiya]</div>
                  </div>
                  <div class="text-center min-h-[120px] flex flex-col justify-center">
                    <div class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-sm relative">
                      <div class="w-12 h-12 rounded-full mx-auto mb-1 border-2 border-white bg-gray-300 flex items-center justify-center text-black font-bold">P2</div>
                      Ilmiy ishlar bo'yicha prorektor
                    </div>
                    <div class="mt-2 text-sm text-gray-600">Prof. Dr. [Ism Familiya]</div>
                  </div>
                  <div class="text-center min-h-[120px] flex flex-col justify-center">
                    <div class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-sm relative">
                      <div class="w-12 h-12 rounded-full mx-auto mb-1 border-2 border-white bg-gray-300 flex items-center justify-center text-black font-bold">P3</div>
                      Ma'naviy-ma'rifiy ishlar bo'yicha prorektor
                    </div>
                    <div class="mt-2 text-sm text-gray-600">Prof. Dr. [Ism Familiya]</div>
                  </div>
                </div>
              </div>

              <!-- Dekanlar -->
              <div class="relative">
                <!-- Horizontal line above -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-1 bg-yellow-400"></div>
                <!-- Vertical line down from center -->
                <div class="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-8 bg-yellow-400 mt-4"></div>
                <h3 class="text-2xl font-bold text-center mb-8 text-gray-800 pt-8">Fakultetlar</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F1</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Muhandislik va texnologiya fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F2</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Axborot texnologiyalari fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F3</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Iqtisodiyot va menejment fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F4</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Qurilish va arxitektura fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F5</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Elektrotexnika va energetika fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                    <div class="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-yellow-600 bg-gray-300 flex items-center justify-center text-black font-bold text-xs">F6</div>
                    <div class="bg-yellow-600 text-white px-3 py-2 rounded font-bold mb-2 text-sm">
                      Tayyorgarlik va malaka oshirish fakulteti
                    </div>
                    <div class="text-sm text-gray-700 font-medium">Dekan</div>
                    <div class="text-sm text-gray-600">Prof. Dr. [Ism]</div>
                  </div>
                </div>
              </div>

              <!-- Kafedralar -->
              <div class="relative">
                <!-- Horizontal line above -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-1 bg-gray-400"></div>
                <h3 class="text-2xl font-bold text-center mb-8 text-gray-800 pt-8">Kafedralar</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Matematika va fizika</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Dasturiy ta'minot muhandisligi</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Kompyuter tizimlari</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Muhandislik grafikasi</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Dots. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Elektronika va avtomatika</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Iqtisodiyot</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Dots. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Xorijiy tillar</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Dots. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Tarix va falsafa</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Kimyo va biologiya</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Dots. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Mexanika</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Energetika</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Prof. Dr. [Ism]</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Qurilish materiallari</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: Dots. [Ism]</div>
                  </div>
                </div>
              </div>

              <!-- Yordamchi bo'limlar -->
              <div class="mt-12">
                <h3 class="text-2xl font-bold text-center mb-8 text-gray-800">Yordamchi bo'limlar va markazlar</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Axborot xizmatlari markazi</div>
                    <div class="text-xs text-gray-600 mt-1">Direktor: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Kutubxona</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Sport majmualari</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Yotoqxonalar</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Raqamli ta'lim texnologiyalari markazi</div>
                    <div class="text-xs text-gray-600 mt-1">Direktor: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Axborot resurs markazi</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Innovatsiya markazi</div>
                    <div class="text-xs text-gray-600 mt-1">Direktor: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Xalqaro hamkorlik bo'limi</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Talabalar turar joylari</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">O'quv-uslubiy bo'lim</div>
                    <div class="text-xs text-gray-600 mt-1">Mudir: [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Xavfsizlik xizmati</div>
                    <div class="text-xs text-gray-600 mt-1">Boshlig': [Ism]</div>
                  </div>
                  <div class="bg-purple-50 border border-purple-300 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div class="font-semibold text-gray-800 text-sm">Buxgalteriya</div>
                    <div class="text-xs text-gray-600 mt-1">Bosh buxgalter: [Ism]</div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      }
    ]
  };

  return simulateApiCall(data, 300);
};