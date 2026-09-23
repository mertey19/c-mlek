/** Teklif kaydı tipleri — istemci bileşenleri de kullanır, bu yüzden sunucu kodu içermez. */

export type LeadStatus = 'yeni' | 'iletisimde' | 'teklif-verildi' | 'kazanildi' | 'kaybedildi';

export const LEAD_STATUSES: { value: LeadStatus; label: string }[] = [
  { value: 'yeni', label: 'Yeni' },
  { value: 'iletisimde', label: 'İletişimde' },
  { value: 'teklif-verildi', label: 'Teklif verildi' },
  { value: 'kazanildi', label: 'Kazanıldı' },
  { value: 'kaybedildi', label: 'Kaybedildi' },
];

export type Lead = {
  id: string;
  createdAt: string;
  language: 'tr' | 'en';
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  product: string;
  quantity: string;
  message: string;
  page: string;
  status: LeadStatus;
  note: string;
};

export const LEAD_FIELDS = ['name', 'company', 'phone', 'email', 'country', 'city', 'product', 'quantity', 'message'] as const;
