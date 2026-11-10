import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateBookingRef,
  validateDevoteeDetails,
  checkSlotAvailability,
  updateSlotCount,
  canCancelBooking,
  filterDarshanBookings,
} from './bookingLogic';

test('generateBookingRef creates correct format for DAR and POO', () => {
  const darRef = generateBookingRef('DAR');
  const pooRef = generateBookingRef('POO');

  assert.match(darRef, /^TVD-DAR-\d{6}$/);
  assert.match(pooRef, /^TVD-POO-\d{6}$/);
  assert.notEqual(darRef, pooRef);
});

test('validateDevoteeDetails validates names, emails, phones, and counts', () => {
  // Valid case
  const validResult = validateDevoteeDetails({
    devoteeName: 'Anantharaman',
    email: 'ananth@example.com',
    phone: '9840123456',
    devoteeCount: 3,
  });
  assert.equal(validResult.valid, true);
  assert.equal(validResult.errors.length, 0);

  // Invalid empty details
  const invalidResult = validateDevoteeDetails({
    devoteeName: '',
    email: 'bad-email',
    phone: '12',
    devoteeCount: 15,
  });
  assert.equal(invalidResult.valid, false);
  assert.equal(invalidResult.errors.length, 4);
});

test('checkSlotAvailability evaluates slot capacity correctly', () => {
  const slot = {
    capacity: 50,
    bookedCount: 45,
    isAvailable: true,
  };

  // 5 remaining -> requesting 3 should pass
  assert.equal(checkSlotAvailability(slot, 3), true);
  // requesting 5 should pass
  assert.equal(checkSlotAvailability(slot, 5), true);
  // requesting 6 should fail
  assert.equal(checkSlotAvailability(slot, 6), false);

  // unavailable slot
  assert.equal(checkSlotAvailability({ ...slot, isAvailable: false }, 1), false);
  // 0 requested count
  assert.equal(checkSlotAvailability(slot, 0), false);
});

test('updateSlotCount increments and decrements safely within bounds', () => {
  const initialSlots = [
    {
      id: 'slot-1',
      timeSlot: '07:00 AM - 08:30 AM',
      period: 'morning' as const,
      capacity: 20,
      bookedCount: 5,
      isAvailable: true,
    },
    {
      id: 'slot-2',
      timeSlot: '09:00 AM - 10:30 AM',
      period: 'morning' as const,
      capacity: 30,
      bookedCount: 29,
      isAvailable: true,
    },
  ];

  // increment slot-1 by 3
  const afterInc = updateSlotCount(initialSlots, 'slot-1', 3);
  assert.equal(afterInc[0].bookedCount, 8);
  assert.equal(afterInc[1].bookedCount, 29);

  // increment slot-2 beyond capacity clamps at 30
  const afterOverflow = updateSlotCount(afterInc, 'slot-2', 5);
  assert.equal(afterOverflow[1].bookedCount, 30);

  // decrement slot-1 below 0 clamps at 0
  const afterUnderflow = updateSlotCount(afterOverflow, 'slot-1', -15);
  assert.equal(afterUnderflow[0].bookedCount, 0);
});

test('canCancelBooking allows future active bookings and rejects past/cancelled ones', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  const futureDateStr = futureDate.toISOString().split('T')[0];

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 5);
  const pastDateStr = pastDate.toISOString().split('T')[0];

  // Pending future booking is eligible
  assert.deepEqual(canCancelBooking({ status: 'pending', date: futureDateStr }), {
    eligible: true,
  });

  // Approved future booking is eligible
  assert.deepEqual(canCancelBooking({ status: 'approved', date: futureDateStr }), {
    eligible: true,
  });

  // Already cancelled
  const alreadyCancelled = canCancelBooking({
    status: 'cancelled',
    date: futureDateStr,
  });
  assert.equal(alreadyCancelled.eligible, false);

  // Past booking
  const pastBooking = canCancelBooking({
    status: 'approved',
    date: pastDateStr,
  });
  assert.equal(pastBooking.eligible, false);
});

test('filterDarshanBookings filters by status and search queries', () => {
  const sampleBookings = [
    {
      id: '1',
      refCode: 'TVD-DAR-100001',
      devoteeName: 'Karthik Subramanian',
      email: 'karthik@example.com',
      phone: '9840011111',
      city: 'Chennai',
      date: '2026-12-01',
      slotId: 'slot-1',
      timeSlot: '07:00 AM - 08:30 AM',
      categoryId: 'cat-1',
      categoryName: 'Sarva Darshan',
      devoteeCount: 2,
      status: 'pending' as const,
      createdAt: '2026-11-01',
    },
    {
      id: '2',
      refCode: 'TVD-DAR-100002',
      devoteeName: 'Meenakshi Sundaram',
      email: 'meenakshi@example.com',
      phone: '9840022222',
      city: 'Madurai',
      date: '2026-12-02',
      slotId: 'slot-2',
      timeSlot: '09:00 AM - 10:30 AM',
      categoryId: 'cat-2',
      categoryName: 'Special Darshan',
      devoteeCount: 4,
      status: 'approved' as const,
      createdAt: '2026-11-02',
    },
  ];

  // Filter by status
  const approvedOnly = filterDarshanBookings(sampleBookings, { status: 'approved' });
  assert.equal(approvedOnly.length, 1);
  assert.equal(approvedOnly[0].id, '2');

  // Filter by search name
  const searchedName = filterDarshanBookings(sampleBookings, { search: 'karthik' });
  assert.equal(searchedName.length, 1);
  assert.equal(searchedName[0].id, '1');

  // Filter by search ref
  const searchedRef = filterDarshanBookings(sampleBookings, { search: '100002' });
  assert.equal(searchedRef.length, 1);
  assert.equal(searchedRef[0].id, '2');
});
