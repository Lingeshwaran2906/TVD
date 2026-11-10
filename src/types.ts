export type Language = 'en' | 'ta';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface DarshanCategory {
  id: string;
  nameEn: string;
  nameTa: string;
  descEn: string;
  descTa: string;
  priceNoteEn: string;
  priceNoteTa: string;
  durationMinutes: number;
  badgeEn: string;
  badgeTa: string;
}

export interface DarshanSlot {
  id: string;
  timeSlot: string; // e.g. "07:00 AM - 08:30 AM"
  period: 'morning' | 'noon' | 'evening';
  capacity: number;
  bookedCount: number;
  isAvailable: boolean;
}

export interface DarshanBooking {
  id: string;
  refCode: string; // e.g. "TVD-DAR-89241"
  devoteeName: string;
  email: string;
  phone: string;
  city: string;
  date: string; // YYYY-MM-DD
  slotId: string;
  timeSlot: string;
  categoryId: string;
  categoryName: string;
  devoteeCount: number;
  specialRequirements?: string;
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface PoojaCategory {
  id: string;
  nameEn: string;
  nameTa: string;
  descEn: string;
  descTa: string;
  timingEn: string;
  timingTa: string;
  availableDaysEn: string;
  availableDaysTa: string;
  isSpecial?: boolean;
}

export interface PoojaBooking {
  id: string;
  refCode: string; // e.g. "TVD-POO-43812"
  devoteeName: string;
  email: string;
  phone: string;
  poojaId: string;
  poojaName: string;
  date: string;
  timeSlot: string;
  gothram: string;
  rasi: string;
  nakshatram: string;
  sankalpamPrayer: string;
  prasadamDelivery: boolean;
  postalAddress?: string;
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface FestivalEvent {
  id: string;
  titleEn: string;
  titleTa: string;
  dateEn: string;
  dateTa: string;
  timeEn: string;
  timeTa: string;
  descEn: string;
  descTa: string;
  image?: string;
  isUpcoming: boolean;
}

export interface Announcement {
  id: string;
  titleEn: string;
  titleTa: string;
  bodyEn: string;
  bodyTa: string;
  date: string;
  priority: 'normal' | 'urgent';
  active: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

export interface TempleInfo {
  organizationNameEn: string;
  organizationNameTa: string;
  shortName: string;
  deityNameEn: string;
  deityNameTa: string;
  deityTamilName: string;
  mantraEn: string;
  mantraTa: string;
  locationConceptEn: string;
  locationConceptTa: string;
  email: string;
  phone: string;
}
