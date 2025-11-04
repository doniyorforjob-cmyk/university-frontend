// Faculty interfeysi
export type Faculty = {
  id: string | number;
  name: string;
  icon?: any;               // agar icon komponent ishlatilsa
  color?: string;
  shortDescription?: string; // <-- qo'shildi
  image?: string;            // <-- ixtiyoriy: karta rasmi uchun
  iconImage?: string;        // <-- ixtiyoriy: ikonka rasmi uchun
}
