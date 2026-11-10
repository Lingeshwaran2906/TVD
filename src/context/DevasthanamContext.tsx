import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Announcement,
  AuditLog,
  BookingStatus,
  DarshanBooking,
  DarshanCategory,
  DarshanSlot,
  FestivalEvent,
  PoojaBooking,
  PoojaCategory,
  TempleInfo,
} from '../types.ts';
import {
  canCancelBooking,
  checkSlotAvailability,
  generateBookingRef,
  updateSlotCount,
  validateDevoteeDetails,
} from '../utils/bookingLogic.ts';

interface DevasthanamContextType {
  templeInfo: TempleInfo;
  darshanCategories: DarshanCategory[];
  darshanSlots: DarshanSlot[];
  darshanBookings: DarshanBooking[];
  poojaCategories: PoojaCategory[];
  poojaBookings: PoojaBooking[];
  festivals: FestivalEvent[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
  isAdmin: boolean;

  // Actions
  createDarshanBooking: (booking: Omit<DarshanBooking, 'id' | 'refCode' | 'status' | 'createdAt'>) => {
    success: boolean;
    booking?: DarshanBooking;
    error?: string;
  };
  createPoojaBooking: (booking: Omit<PoojaBooking, 'id' | 'refCode' | 'status' | 'createdAt'>) => {
    success: boolean;
    booking?: PoojaBooking;
    error?: string;
  };
  cancelDarshanBooking: (refCode: string) => { success: boolean; message: string };
  cancelPoojaBooking: (refCode: string) => { success: boolean; message: string };
  findBookingByRef: (refCode: string) => { darshan?: DarshanBooking; pooja?: PoojaBooking };

  // Admin Actions
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  updateDarshanStatus: (id: string, status: BookingStatus, adminNotes?: string) => void;
  updatePoojaStatus: (id: string, status: BookingStatus, adminNotes?: string) => void;
  updateSlotCapacity: (slotId: string, newCapacity: number, isAvailable: boolean) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;
  addFestival: (festival: Omit<FestivalEvent, 'id'>) => void;
  deleteFestival: (id: string) => void;
  updateTempleInfo: (info: Partial<TempleInfo>) => void;
  submitContactEnquiry: (enquiry: { name: string; email: string; phone: string; message: string }) => void;
}

const DevasthanamContext = createContext<DevasthanamContextType | undefined>(undefined);

// Initial Seed Data
const initialTempleInfo: TempleInfo = {
  organizationNameEn: 'TVD – Thilagavishnu Devasthanam',
  organizationNameTa: 'திலகவிஷ்ணு தேவஸ்தானம்',
  shortName: 'TVD',
  deityNameEn: 'THILAGA VISHNU',
  deityNameTa: 'திலகா விஷ்ணு',
  deityTamilName: 'திலகா விஷ்ணு',
  mantraEn: 'OM THILAGAYA NAMAHA',
  mantraTa: 'ஓம் திலகாய நமஹா',
  locationConceptEn: 'Celestial World / Heaven (Celestial Realm)',
  locationConceptTa: 'தேவலோகம் / விண் உலகம்',
  email: 'devotees@thilagavishnu.org',
  phone: '+91 (0) 44 2835 1008',
};

const initialDarshanCategories: DarshanCategory[] = [
  {
    id: 'darshan-sarva',
    nameEn: 'Sarva Darshan (General Queue)',
    nameTa: 'சர்வ தரிசனம் (பொது வரிசை)',
    descEn: 'Traditional devotional darshan open to all pilgrims seeking the divine blessings of Sri Thilaga Vishnu.',
    descTa: 'ஸ்ரீ திலகா விஷ்ணுவின் அருள் பெற அனைத்து பக்தர்களுக்கும் திறக்கப்பட்ட புனித பொது தரிசனம்.',
    priceNoteEn: 'Free of Cost / Complimentary',
    priceNoteTa: 'இலவச ஆன்மீக தரிசனம்',
    durationMinutes: 45,
    badgeEn: 'Universal Access',
    badgeTa: 'அனைவருக்கும் அனுமதி',
  },
  {
    id: 'darshan-special',
    nameEn: 'Special Celestial Darshan',
    nameTa: 'சிறப்பு தேவலோக தரிசனம்',
    descEn: 'Priority access through the celestial corridor with sacred consecrated flowers and blessed theertham.',
    descTa: 'தேவலோக சிறப்பு வரிசை மூலம் உடனடி தரிசனம், புனித தீர்த்தம் மற்றும் மலர் பிரசாதம்.',
    priceNoteEn: 'Token Seva Registration',
    priceNoteTa: 'சிறப்பு பதிவு டோக்கன்',
    durationMinutes: 20,
    badgeEn: 'Priority Lane',
    badgeTa: 'முன்னுரிமை தரிசனம்',
  },
  {
    id: 'darshan-senior',
    nameEn: 'Senior Citizens & Divyangjan Darshan',
    nameTa: 'முதியோர் மற்றும் மாற்றுத்திறனாளிகள் தரிசனம்',
    descEn: 'Dedicated ease-of-access darshan with wheelchair assistance and comfortable seating for elders.',
    descTa: 'முதியவர்கள் மற்றும் மாற்றுத்திறனாளி பக்தர்களுக்கு சக்கர நாற்காலி உதவி மற்றும் சௌகரியமான தரிசன ஏற்பாடு.',
    priceNoteEn: 'Complimentary Priority',
    priceNoteTa: 'இலவச சிறப்பு உதவி',
    durationMinutes: 15,
    badgeEn: 'Assisted Access',
    badgeTa: 'சிறப்பு உதவி பிரிவு',
  },
];

const initialDarshanSlots: DarshanSlot[] = [
  {
    id: 'slot-m1',
    timeSlot: '06:30 AM – 08:00 AM',
    period: 'morning',
    capacity: 100,
    bookedCount: 42,
    isAvailable: true,
  },
  {
    id: 'slot-m2',
    timeSlot: '08:30 AM – 10:00 AM',
    period: 'morning',
    capacity: 120,
    bookedCount: 68,
    isAvailable: true,
  },
  {
    id: 'slot-m3',
    timeSlot: '10:30 AM – 12:00 PM',
    period: 'morning',
    capacity: 120,
    bookedCount: 89,
    isAvailable: true,
  },
  {
    id: 'slot-e1',
    timeSlot: '04:30 PM – 06:30 PM',
    period: 'evening',
    capacity: 150,
    bookedCount: 94,
    isAvailable: true,
  },
  {
    id: 'slot-e2',
    timeSlot: '07:00 PM – 08:30 PM',
    period: 'evening',
    capacity: 150,
    bookedCount: 112,
    isAvailable: true,
  },
];

const initialPoojaCategories: PoojaCategory[] = [
  {
    id: 'pooja-nithya',
    nameEn: 'Nithya Archana & Deepa Aradhana',
    nameTa: 'நித்ய அர்ச்சனை & தீப ஆராதனை',
    descEn: 'Daily sacred recital of divine names and offering of fragrant celestial blossoms before Sri Thilaga Vishnu.',
    descTa: 'ஸ்ரீ திலகா விஷ்ணுவிற்கு நறுமண மலர்களால் அர்ச்சனை செய்து தீபாராதனை சமர்ப்பிக்கும் அன்றாட வழிபாடு.',
    timingEn: 'Daily at 07:30 AM & 06:30 PM',
    timingTa: 'தினமும் காலை 07:30 & மாலை 06:30',
    availableDaysEn: 'All Days',
    availableDaysTa: 'அனைத்து நாட்களும்',
  },
  {
    id: 'pooja-sahasranama',
    nameEn: 'Thilaga Sahasranama Archana',
    nameTa: 'திலக சகஸ்ரநாம அர்ச்சனை',
    descEn: 'Detailed chanting of 1008 divine sacred names with family Sankalpam for health, longevity, and prosperity.',
    descTa: 'குடும்ப நலன், ஆயுள், ஆரோக்கியம் மற்றும் சகல நன்மைகள் வேண்டி 1008 திருநாமங்கள் ஓதி செய்யப்படும் சங்கல்ப அர்ச்சனை.',
    timingEn: 'Every Morning 09:00 AM',
    timingTa: 'தினமும் காலை 09:00',
    availableDaysEn: 'Daily',
    availableDaysTa: 'தினசரி',
    isSpecial: true,
  },
  {
    id: 'pooja-pournami',
    nameEn: 'Celestial Pournami Maha Pooja',
    nameTa: 'தேவலோக பௌர்ணமி மகா பூஜை',
    descEn: 'Special full moon night worship with celestial milk abhishekham and sacred offering of payasam prasadam.',
    descTa: 'பௌர்ணமி தினத்தில் நடைபெறும் தேவலோக பால் அபிஷேகம், விசேஷ அர்ச்சனை மற்றும் பாயாச நைவேத்திய பிரசாத பூஜை.',
    timingEn: 'Pournami Tithi at 07:00 PM',
    timingTa: 'பௌர்ணமி திதியில் மாலை 07:00',
    availableDaysEn: 'Full Moon Days',
    availableDaysTa: 'பௌர்ணமி நாட்கள்',
    isSpecial: true,
  },
  {
    id: 'pooja-kalyanam',
    nameEn: 'Celestial Thirukalyana Utsava Seva',
    nameTa: 'தேவலோக திருக்கல்யாண உத்ஸவ சேவை',
    descEn: 'Auspicious celestial wedding ceremony ritual symbolizing cosmic harmony, spiritual union, and eternal bliss.',
    descTa: 'அண்டசராசரங்களின் அமைதிக்காகவும் தம்பதிகள் மற்றும் குடும்ப ஒற்றுமைக்காகவும் நடைபெறும் திருக்கல்யாண வைபவம்.',
    timingEn: 'Every Friday & Utsavam Days 10:30 AM',
    timingTa: 'ஒவ்வொரு வெள்ளிக்கிழமை & விழா நாட்களில் காலை 10:30',
    availableDaysEn: 'Fridays & Auspicious Muhurtham',
    availableDaysTa: 'வெள்ளிக்கிழமைகள் & சுப முகூர்த்த நாட்கள்',
    isSpecial: true,
  },
];

const initialFestivals: FestivalEvent[] = [
  {
    id: 'fest-brahmotsavam',
    titleEn: 'Celestial Brahmotsavam Festival',
    titleTa: 'தேவலோக பிரம்மோத்ஸவ பெருவிழா',
    dateEn: 'December 14 – 23, 2026',
    dateTa: 'மார்கழி 14 – 23, 2026',
    timeEn: 'All Day Ceremonies & Evening Procession',
    timeTa: 'நாள் முழுவதும் வழிபாடுகள் & மாலை வாகன சேவை',
    descEn: 'The flagship 10-day celestial festival celebrating the supreme grace of Sri Thilaga Vishnu with divine vahanas, flower showers, and celestial music.',
    descTa: 'ஸ்ரீ திலகா விஷ்ணுவின் அருட்பெருக்கை போற்றி 10 நாட்கள் தேவலோக வாத்தியங்கள், புஷ்ப பல்லாக்கு மற்றும் வாகன சேவைகளுடன் கொண்டாடப்படும் மகா உத்ஸவம்.',
    isUpcoming: true,
  },
  {
    id: 'fest-pournami',
    titleEn: 'Chitra Pournami Celestial Deepam',
    titleTa: 'சித்ரா பௌர்ணமி தேவலோக தீபம்',
    dateEn: 'May 02, 2026',
    dateTa: 'சித்திரை பௌர்ணமி 2026',
    timeEn: '06:00 PM – 10:00 PM',
    timeTa: 'மாலை 06:00 – இரவு 10:00',
    descEn: 'Lighting of 1008 golden ghee lamps across the celestial water sanctum in homage to peace and enlightenment.',
    descTa: 'தேவலோக நீர்நிலையில் 1008 நெய் தீபங்கள் ஏற்றி உலக அமைதிக்காகவும் பக்தர்களின் மன அமைதிக்காகவும் நடத்தப்படும் தீப தரிசனம்.',
    isUpcoming: true,
  },
  {
    id: 'fest-thaipoosam',
    titleEn: 'Celestial Thai Poosam Utsavam',
    titleTa: 'தேவலோக தைப்பூச பெருவிழா',
    dateEn: 'February 01, 2027',
    dateTa: 'தைப்பூசம் 2027',
    timeEn: '05:30 AM – 09:30 PM',
    timeTa: 'விடியற்காலை 05:30 – இரவு 09:30',
    descEn: 'Auspicious celebrations with special honey and sandal paste anointing ceremony in the sanctum.',
    descTa: 'சந்தனக் காப்பு, வாசனை திரவிய அலங்காரம் மற்றும் விசேஷ தேவலோக ஆராதனைகளுடன் நடைபெறும் புண்ணிய உத்ஸவம்.',
    isUpcoming: true,
  },
];

const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    titleEn: 'Online Darshan Slot Bookings Open for Upcoming Months',
    titleTa: 'வரவிருக்கும் மாதங்களுக்கான ஆன்லைன் தரிசன முன்பதிவு துவங்கியது',
    bodyEn: 'Devotees are requested to reserve their darshan slots online in advance to ensure smooth queue management and tranquility in the celestial hall.',
    bodyTa: 'பக்தர்கள் நெரிசலின்றி அமைதியான முறையில் தரிசனம் செய்ய தங்களின் தரிசன நேரங்களை முன்கூட்டியே பதிவு செய்து கொள்ளுமாறு கேட்டுக்கொள்ளப்படுகிறார்கள்.',
    date: '2026-11-08',
    priority: 'urgent',
    active: true,
  },
  {
    id: 'ann-2',
    titleEn: 'Official Deity Identity Reminder',
    titleTa: 'ஸ்ரீ திலகா விஷ்ணுவின் அதிகாரப்பூர்வ திருவுருவ அறிவிப்பு',
    bodyEn: 'TVD – Thilagavishnu Devasthanam honors the authoritative original photograph of Sri Thilaga Vishnu (திலகா விஷ்ணு). Devotees are requested to maintain traditional decorum.',
    bodyTa: 'திலகவிஷ்ணு தேவஸ்தானத்தில் அருளும் ஸ்ரீ திலகா விஷ்ணுவின் அதிகாரப்பூர்வ திருவுருவ படமே முழுமையான அடையாளமாகும். பாரம்பரிய முறைப்படி பக்தர்கள் வழிபட வேண்டுகிறோம்.',
    date: '2026-11-05',
    priority: 'normal',
    active: true,
  },
  {
    id: 'ann-3',
    titleEn: 'Donation Advisory: Online Payment Collection Pending Authorization',
    titleTa: 'காணிக்கை அறிவிப்பு: நேரடி ஆன்லைன் பணப்பரிவர்த்தனை நிறுத்தம்',
    bodyEn: 'Devotees are informed that online payment processing is kept disabled until official statutory clearances are complete. Beware of any unauthorized intermediaries.',
    bodyTa: 'அதிகாரப்பூர்வ அனுமதிகள் நிறைவடையும் வரை ஆன்லைன் நிதி வசூல் தற்காலிகமாக நிறுத்தி வைக்கப்பட்டுள்ளது. போலியான இடைத்தரகர்களை நம்ப வேண்டாம்.',
    date: '2026-11-02',
    priority: 'normal',
    active: true,
  },
];

const initialDarshanBookings: DarshanBooking[] = [
  {
    id: 'db-1',
    refCode: 'TVD-DAR-109245',
    devoteeName: 'Ramesh Balasubramanian',
    email: 'ramesh.bala@example.com',
    phone: '+91 98401 23456',
    city: 'Chennai',
    date: '2026-11-20',
    slotId: 'slot-m1',
    timeSlot: '06:30 AM – 08:00 AM',
    categoryId: 'darshan-special',
    categoryName: 'Special Celestial Darshan',
    devoteeCount: 3,
    status: 'approved',
    createdAt: '2026-11-08T10:15:00Z',
    adminNotes: 'Verified devotee pass issued.',
  },
  {
    id: 'db-2',
    refCode: 'TVD-DAR-284910',
    devoteeName: 'Kavitha Natarajan',
    email: 'kavitha.n@example.com',
    phone: '+91 94440 98765',
    city: 'Coimbatore',
    date: '2026-11-22',
    slotId: 'slot-m2',
    timeSlot: '08:30 AM – 10:00 AM',
    categoryId: 'darshan-sarva',
    categoryName: 'Sarva Darshan (General Queue)',
    devoteeCount: 2,
    status: 'pending',
    createdAt: '2026-11-09T14:30:00Z',
  },
  {
    id: 'db-3',
    refCode: 'TVD-DAR-394812',
    devoteeName: 'Dr. S. Sundararajan',
    email: 'sundar.dr@example.com',
    phone: '+91 98840 55443',
    city: 'Bengaluru',
    date: '2026-11-25',
    slotId: 'slot-e1',
    timeSlot: '04:30 PM – 06:30 PM',
    categoryId: 'darshan-senior',
    categoryName: 'Senior Citizens & Divyangjan Darshan',
    devoteeCount: 2,
    specialRequirements: 'Elderly assistance wheelchair requested at celestial gateway.',
    status: 'pending',
    createdAt: '2026-11-10T07:20:00Z',
  },
];

const initialPoojaBookings: PoojaBooking[] = [
  {
    id: 'pb-1',
    refCode: 'TVD-POO-642109',
    devoteeName: 'Venkatesh Raghavan',
    email: 'venkat.raghav@example.com',
    phone: '+91 98410 88776',
    poojaId: 'pooja-sahasranama',
    poojaName: 'Thilaga Sahasranama Archana',
    date: '2026-11-18',
    timeSlot: '09:00 AM',
    gothram: 'Koushika',
    rasi: 'Kumbha (Aquarius)',
    nakshatram: 'Sathayam',
    sankalpamPrayer: 'Family well-being, peace, and spiritual growth.',
    prasadamDelivery: true,
    postalAddress: 'Flat 4B, Celestial Residency, Anna Nagar, Chennai 600040',
    status: 'approved',
    createdAt: '2026-11-07T11:00:00Z',
    adminNotes: 'Sankalpam registered for daily prayer.',
  },
];

const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'SYSTEM_INIT',
    target: 'TVD System Platform',
    timestamp: '2026-11-05 09:00:00',
    details: 'System initialized with official brand identity: TVD – Thilagavishnu Devasthanam.',
  },
  {
    id: 'log-2',
    action: 'APPROVE_DARSHAN',
    target: 'TVD-DAR-109245',
    timestamp: '2026-11-08 11:30:00',
    details: 'Approved Darshan request for Ramesh Balasubramanian (3 persons).',
  },
];

export const DevasthanamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templeInfo, setTempleInfoState] = useState<TempleInfo>(() => {
    try {
      const saved = localStorage.getItem('tvd_temple_info');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialTempleInfo;
  });

  const [darshanCategories] = useState<DarshanCategory[]>(initialDarshanCategories);
  const [darshanSlots, setDarshanSlots] = useState<DarshanSlot[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_darshan_slots');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialDarshanSlots;
  });

  const [darshanBookings, setDarshanBookings] = useState<DarshanBooking[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_darshan_bookings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialDarshanBookings;
  });

  const [poojaCategories] = useState<PoojaCategory[]>(initialPoojaCategories);
  const [poojaBookings, setPoojaBookings] = useState<PoojaBooking[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_pooja_bookings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialPoojaBookings;
  });

  const [festivals, setFestivals] = useState<FestivalEvent[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_festivals');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialFestivals;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_announcements');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAnnouncements;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('tvd_audit_logs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAuditLogs;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tvd_admin_session') === 'active';
    } catch {}
    return false;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tvd_temple_info', JSON.stringify(templeInfo));
    } catch {}
  }, [templeInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_darshan_slots', JSON.stringify(darshanSlots));
    } catch {}
  }, [darshanSlots]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_darshan_bookings', JSON.stringify(darshanBookings));
    } catch {}
  }, [darshanBookings]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_pooja_bookings', JSON.stringify(poojaBookings));
    } catch {}
  }, [poojaBookings]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_festivals', JSON.stringify(festivals));
    } catch {}
  }, [festivals]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_announcements', JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('tvd_audit_logs', JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  const addAuditLog = (action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      action,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const createDarshanBooking = (
    data: Omit<DarshanBooking, 'id' | 'refCode' | 'status' | 'createdAt'>
  ) => {
    // Validation
    const validation = validateDevoteeDetails({
      devoteeName: data.devoteeName,
      email: data.email,
      phone: data.phone,
      devoteeCount: data.devoteeCount,
    });

    if (!validation.valid) {
      return { success: false, error: validation.errors.join(' ') };
    }

    const slot = darshanSlots.find((s) => s.id === data.slotId);
    if (!slot) {
      return { success: false, error: 'Selected time slot not found.' };
    }

    if (!checkSlotAvailability(slot, data.devoteeCount)) {
      return {
        success: false,
        error: `Selected slot does not have sufficient capacity. Only ${slot.capacity - slot.bookedCount} seats remaining.`,
      };
    }

    const refCode = generateBookingRef('DAR');
    const newBooking: DarshanBooking = {
      ...data,
      id: 'db-' + Date.now(),
      refCode,
      status: 'pending', // Per requirements: initially pending approval until admin confirms
      createdAt: new Date().toISOString(),
    };

    setDarshanBookings((prev) => [newBooking, ...prev]);
    // update slot count
    setDarshanSlots((slots) => updateSlotCount(slots, data.slotId, data.devoteeCount));

    addAuditLog('NEW_DARSHAN_REQUEST', refCode, `Devotee ${data.devoteeName} requested ${data.devoteeCount} seats on ${data.date}.`);

    return { success: true, booking: newBooking };
  };

  const createPoojaBooking = (
    data: Omit<PoojaBooking, 'id' | 'refCode' | 'status' | 'createdAt'>
  ) => {
    const validation = validateDevoteeDetails({
      devoteeName: data.devoteeName,
      email: data.email,
      phone: data.phone,
    });

    if (!validation.valid) {
      return { success: false, error: validation.errors.join(' ') };
    }

    const refCode = generateBookingRef('POO');
    const newBooking: PoojaBooking = {
      ...data,
      id: 'pb-' + Date.now(),
      refCode,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setPoojaBookings((prev) => [newBooking, ...prev]);
    addAuditLog('NEW_POOJA_REQUEST', refCode, `Devotee ${data.devoteeName} booked pooja ${data.poojaName} for ${data.date}.`);

    return { success: true, booking: newBooking };
  };

  const cancelDarshanBooking = (refCode: string) => {
    const booking = darshanBookings.find((b) => b.refCode.toUpperCase() === refCode.trim().toUpperCase());
    if (!booking) {
      return { success: false, message: 'No Darshan booking found with this reference code.' };
    }

    const eligibility = canCancelBooking(booking);
    if (!eligibility.eligible) {
      return { success: false, message: eligibility.reason || 'This booking cannot be cancelled.' };
    }

    setDarshanBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: 'cancelled' } : b))
    );
    // release slot capacity
    setDarshanSlots((slots) => updateSlotCount(slots, booking.slotId, -booking.devoteeCount));

    addAuditLog('CANCEL_DARSHAN', booking.refCode, `Devotee cancelled Darshan booking ${booking.refCode}.`);

    return { success: true, message: 'Your Darshan booking has been successfully cancelled.' };
  };

  const cancelPoojaBooking = (refCode: string) => {
    const booking = poojaBookings.find((b) => b.refCode.toUpperCase() === refCode.trim().toUpperCase());
    if (!booking) {
      return { success: false, message: 'No Pooja booking found with this reference code.' };
    }

    const eligibility = canCancelBooking(booking);
    if (!eligibility.eligible) {
      return { success: false, message: eligibility.reason || 'This booking cannot be cancelled.' };
    }

    setPoojaBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: 'cancelled' } : b))
    );

    addAuditLog('CANCEL_POOJA', booking.refCode, `Devotee cancelled Pooja booking ${booking.refCode}.`);

    return { success: true, message: 'Your Pooja booking has been successfully cancelled.' };
  };

  const findBookingByRef = (refCode: string) => {
    const cleanRef = refCode.trim().toUpperCase();
    const darshan = darshanBookings.find((b) => b.refCode.toUpperCase() === cleanRef);
    const pooja = poojaBookings.find((b) => b.refCode.toUpperCase() === cleanRef);
    return { darshan, pooja };
  };

  const adminLogin = (passcode: string) => {
    // Official admin passcode
    if (passcode.trim() === 'tvd2026' || passcode.trim() === 'thilagavishnu') {
      setIsAdmin(true);
      try {
        localStorage.setItem('tvd_admin_session', 'active');
      } catch {}
      addAuditLog('ADMIN_LOGIN', 'Admin Session', 'Administrator logged into TVD portal.');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('tvd_admin_session');
    } catch {}
    addAuditLog('ADMIN_LOGOUT', 'Admin Session', 'Administrator logged out.');
  };

  const updateDarshanStatus = (id: string, status: BookingStatus, adminNotes?: string) => {
    setDarshanBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, adminNotes: adminNotes || b.adminNotes } : b))
    );
    const target = darshanBookings.find((b) => b.id === id);
    if (target) {
      addAuditLog(`DARSHAN_${status.toUpperCase()}`, target.refCode, `Status changed to ${status}. Notes: ${adminNotes || 'None'}`);
    }
  };

  const updatePoojaStatus = (id: string, status: BookingStatus, adminNotes?: string) => {
    setPoojaBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, adminNotes: adminNotes || b.adminNotes } : b))
    );
    const target = poojaBookings.find((b) => b.id === id);
    if (target) {
      addAuditLog(`POOJA_${status.toUpperCase()}`, target.refCode, `Status changed to ${status}. Notes: ${adminNotes || 'None'}`);
    }
  };

  const updateSlotCapacity = (slotId: string, newCapacity: number, isAvailable: boolean) => {
    setDarshanSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, capacity: Math.max(1, newCapacity), isAvailable } : slot
      )
    );
    addAuditLog('SLOT_UPDATED', slotId, `Updated slot capacity to ${newCapacity}, available: ${isAvailable}`);
  };

  const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...data,
      id: 'ann-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    addAuditLog('ANNOUNCEMENT_ADDED', newAnn.titleEn, 'Published new announcement.');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    addAuditLog('ANNOUNCEMENT_DELETED', id, 'Deleted announcement.');
  };

  const addFestival = (data: Omit<FestivalEvent, 'id'>) => {
    const newFest: FestivalEvent = {
      ...data,
      id: 'fest-' + Date.now(),
    };
    setFestivals((prev) => [newFest, ...prev]);
    addAuditLog('FESTIVAL_ADDED', newFest.titleEn, 'Added new festival calendar entry.');
  };

  const deleteFestival = (id: string) => {
    setFestivals((prev) => prev.filter((f) => f.id !== id));
    addAuditLog('FESTIVAL_DELETED', id, 'Deleted festival.');
  };

  const updateTempleInfo = (info: Partial<TempleInfo>) => {
    setTempleInfoState((prev) => ({ ...prev, ...info }));
    addAuditLog('TEMPLE_INFO_UPDATED', 'Settings', 'Updated temple core details.');
  };

  const submitContactEnquiry = (enquiry: { name: string; email: string; phone: string; message: string }) => {
    addAuditLog('DEVOTEE_ENQUIRY', enquiry.name, `Message received from ${enquiry.email}: ${enquiry.message.substring(0, 40)}...`);
  };

  return (
    <DevasthanamContext.Provider
      value={{
        templeInfo,
        darshanCategories,
        darshanSlots,
        darshanBookings,
        poojaCategories,
        poojaBookings,
        festivals,
        announcements,
        auditLogs,
        isAdmin,
        createDarshanBooking,
        createPoojaBooking,
        cancelDarshanBooking,
        cancelPoojaBooking,
        findBookingByRef,
        adminLogin,
        adminLogout,
        updateDarshanStatus,
        updatePoojaStatus,
        updateSlotCapacity,
        addAnnouncement,
        deleteAnnouncement,
        addFestival,
        deleteFestival,
        updateTempleInfo,
        submitContactEnquiry,
      }}
    >
      {children}
    </DevasthanamContext.Provider>
  );
};

export function useDevasthanam() {
  const context = useContext(DevasthanamContext);
  if (!context) {
    throw new Error('useDevasthanam must be used within a DevasthanamProvider');
  }
  return context;
}
