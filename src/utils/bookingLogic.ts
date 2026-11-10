/**
 * Pure business logic for Darshan and Pooja bookings at TVD – Thilagavishnu Devasthanam.
 * Decoupled from UI components for deterministic unit testing.
 */

import { DarshanBooking, DarshanSlot, PoojaBooking } from '../types.ts';

/**
 * Generate unique 6-digit prefixed booking reference code.
 * Example: TVD-DAR-749215 or TVD-POO-182943
 */
export function generateBookingRef(prefix: 'DAR' | 'POO'): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `TVD-${prefix}-${randomDigits}`;
}

/**
 * Validates devotee personal details.
 */
export function validateDevoteeDetails(details: {
  devoteeName?: string;
  email?: string;
  phone?: string;
  devoteeCount?: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!details.devoteeName || details.devoteeName.trim().length < 2) {
    errors.push('Devotee name must be at least 2 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!details.email || !emailRegex.test(details.email.trim())) {
    errors.push('A valid email address is required.');
  }

  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
  if (!details.phone || !phoneRegex.test(details.phone.trim())) {
    errors.push('A valid contact phone number is required (7-15 digits).');
  }

  if (details.devoteeCount !== undefined) {
    if (details.devoteeCount < 1 || details.devoteeCount > 10) {
      errors.push('Devotee count must be between 1 and 10 per booking.');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a Darshan slot has enough capacity for requested visitors.
 */
export function checkSlotAvailability(
  slot: Pick<DarshanSlot, 'capacity' | 'bookedCount' | 'isAvailable'>,
  requestedCount: number
): boolean {
  if (!slot.isAvailable) return false;
  if (requestedCount <= 0) return false;
  const remaining = slot.capacity - slot.bookedCount;
  return remaining >= requestedCount;
}

/**
 * Update booked count for a slot.
 */
export function updateSlotCount(
  slots: DarshanSlot[],
  slotId: string,
  delta: number
): DarshanSlot[] {
  return slots.map((slot) => {
    if (slot.id === slotId) {
      const newBooked = Math.max(0, Math.min(slot.capacity, slot.bookedCount + delta));
      return {
        ...slot,
        bookedCount: newBooked,
      };
    }
    return slot;
  });
}

/**
 * Check eligibility for cancellation.
 * Only pending or approved bookings in the future can be cancelled.
 */
export function canCancelBooking(booking: {
  status: string;
  date: string;
}): { eligible: boolean; reason?: string } {
  if (booking.status === 'cancelled') {
    return { eligible: false, reason: 'Booking is already cancelled.' };
  }
  if (booking.status === 'rejected') {
    return { eligible: false, reason: 'Rejected bookings cannot be cancelled.' };
  }

  const bookingDate = new Date(booking.date);
  bookingDate.setHours(23, 59, 59, 999);
  const now = new Date();

  if (bookingDate.getTime() < now.getTime()) {
    return { eligible: false, reason: 'Past bookings cannot be cancelled.' };
  }

  return { eligible: true };
}

/**
 * Filter bookings by search term and status.
 */
export function filterDarshanBookings(
  bookings: DarshanBooking[],
  filters: { status?: string; search?: string }
): DarshanBooking[] {
  return bookings.filter((b) => {
    if (filters.status && filters.status !== 'all' && b.status !== filters.status) {
      return false;
    }
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const matchName = b.devoteeName.toLowerCase().includes(q);
      const matchRef = b.refCode.toLowerCase().includes(q);
      const matchPhone = b.phone.includes(q);
      const matchEmail = b.email.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchPhone && !matchEmail) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Filter pooja bookings by search and status.
 */
export function filterPoojaBookings(
  bookings: PoojaBooking[],
  filters: { status?: string; search?: string }
): PoojaBooking[] {
  return bookings.filter((b) => {
    if (filters.status && filters.status !== 'all' && b.status !== filters.status) {
      return false;
    }
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const matchName = b.devoteeName.toLowerCase().includes(q);
      const matchRef = b.refCode.toLowerCase().includes(q);
      const matchPooja = b.poojaName.toLowerCase().includes(q);
      const matchEmail = b.email.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchPooja && !matchEmail) {
        return false;
      }
    }
    return true;
  });
}
