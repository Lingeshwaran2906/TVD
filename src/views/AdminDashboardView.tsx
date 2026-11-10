import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Search,
  Filter,
  Plus,
  Trash2,
  AlertCircle,
  Users,
  Calendar,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';
import { filterDarshanBookings, filterPoojaBookings } from '../utils/bookingLogic.ts';

export const AdminDashboardView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    isAdmin,
    adminLogin,
    adminLogout,
    darshanBookings,
    poojaBookings,
    darshanSlots,
    announcements,
    auditLogs,
    updateDarshanStatus,
    updatePoojaStatus,
    updateSlotCapacity,
    addAnnouncement,
    deleteAnnouncement,
  } = useDevasthanam();

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Sub-tab
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'darshan' | 'pooja' | 'slots' | 'announcements' | 'audit'
  >('overview');

  // Filters
  const [darshanFilterStatus, setDarshanFilterStatus] = useState<string>('all');
  const [darshanSearch, setDarshanSearch] = useState<string>('');
  const [poojaFilterStatus, setPoojaFilterStatus] = useState<string>('all');
  const [poojaSearch, setPoojaSearch] = useState<string>('');

  // Announcement modal / creator
  const [newAnnTitleEn, setNewAnnTitleEn] = useState('');
  const [newAnnTitleTa, setNewAnnTitleTa] = useState('');
  const [newAnnBodyEn, setNewAnnBodyEn] = useState('');
  const [newAnnBodyTa, setNewAnnBodyTa] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'normal' | 'urgent'>('normal');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passcode);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasscode('');
    }
  };

  const handleExportCSV = () => {
    // Generate CSV data for Darshan Bookings
    const headers = ['RefCode', 'DevoteeName', 'Email', 'Phone', 'Date', 'TimeSlot', 'Category', 'DevoteeCount', 'Status', 'CreatedAt'];
    const rows = darshanBookings.map((b) => [
      b.refCode,
      `"${b.devoteeName}"`,
      b.email,
      b.phone,
      b.date,
      `"${b.timeSlot}"`,
      `"${b.categoryName}"`,
      b.devoteeCount,
      b.status,
      b.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TVD_Darshan_Bookings_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitleEn || !newAnnBodyEn) return;

    addAnnouncement({
      titleEn: newAnnTitleEn,
      titleTa: newAnnTitleTa || newAnnTitleEn,
      bodyEn: newAnnBodyEn,
      bodyTa: newAnnBodyTa || newAnnBodyEn,
      priority: newAnnPriority,
      active: true,
    });

    setNewAnnTitleEn('');
    setNewAnnTitleTa('');
    setNewAnnBodyEn('');
    setNewAnnBodyTa('');
    setActiveAdminTab('announcements');
  };

  // Metrics
  const totalDarshan = darshanBookings.length;
  const pendingDarshan = darshanBookings.filter((b) => b.status === 'pending').length;
  const approvedDarshan = darshanBookings.filter((b) => b.status === 'approved').length;
  const totalPooja = poojaBookings.length;
  const pendingPooja = poojaBookings.filter((p) => p.status === 'pending').length;

  const filteredDarshan = filterDarshanBookings(darshanBookings, {
    status: darshanFilterStatus,
    search: darshanSearch,
  });

  const filteredPooja = filterPoojaBookings(poojaBookings, {
    status: poojaFilterStatus,
    search: poojaSearch,
  });

  // If not logged in, show secure login form
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-900 text-amber-200 mx-auto flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-stone-900">
            {t.adminPortalTitle}
          </h1>
          <p className="text-xs text-stone-600 font-sans">
            {t.adminLoginPrompt}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          {loginError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Invalid security passcode. Use demo key: tvd2026</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.adminPasscode}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter administrator passcode"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 pr-10"
                />
                <KeyRound className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
              </div>
              <div className="mt-1 text-[11px] text-stone-500 font-mono">
                Demo access passcode: <strong className="text-amber-800">tvd2026</strong>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold shadow-xs transition-colors"
            >
              {t.adminLoginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-widest font-sans">
            {language === 'ta' ? 'நிர்வாக தளம்' : 'Authenticated Administrator Portal'}
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
            TVD Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            title="Download CSV report of bookings"
          >
            <Download className="w-3.5 h-3.5 text-amber-800" />
            <span>{t.adminExportCsv}</span>
          </button>

          <button
            onClick={adminLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-stone-100 text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.adminSignOut}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'darshan', label: `Darshan Requests (${pendingDarshan} Pending)` },
          { id: 'pooja', label: `Pooja Bookings (${pendingPooja} Pending)` },
          { id: 'slots', label: 'Slot Capacity Manager' },
          { id: 'announcements', label: 'Announcements' },
          { id: 'audit', label: 'Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as typeof activeAdminTab)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeAdminTab === tab.id
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB: OVERVIEW
          ========================================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs text-stone-500 font-sans block">{t.adminTotalDarshan}</span>
              <div className="text-3xl font-bold font-mono text-stone-900">{totalDarshan}</div>
              <div className="text-[11px] text-stone-500">All registered Darshan requests</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-300/80 shadow-xs space-y-2 bg-amber-50/30">
              <span className="text-xs text-amber-800 font-sans block">{t.adminPendingDarshan}</span>
              <div className="text-3xl font-bold font-mono text-amber-900">{pendingDarshan}</div>
              <div className="text-[11px] text-amber-800/80">Awaiting administrative approval</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-300/80 shadow-xs space-y-2 bg-emerald-50/30">
              <span className="text-xs text-emerald-800 font-sans block">{t.adminApprovedDarshan}</span>
              <div className="text-3xl font-bold font-mono text-emerald-900">{approvedDarshan}</div>
              <div className="text-[11px] text-emerald-800/80">Confirmed & passes verified</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs text-stone-500 font-sans block">{t.adminPoojaBookings}</span>
              <div className="text-3xl font-bold font-mono text-stone-900">{totalPooja}</div>
              <div className="text-[11px] text-stone-500">{pendingPooja} pending review</div>
            </div>
          </div>

          {/* Recent Pending Actions Table */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-lg font-bold text-stone-900">
                Action Required: Pending Darshan Requests
              </h2>
              <button
                onClick={() => setActiveAdminTab('darshan')}
                className="text-xs text-amber-900 font-semibold hover:underline"
              >
                View all in Darshan tab
              </button>
            </div>

            {darshanBookings.filter((b) => b.status === 'pending').length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500">
                All Darshan booking requests are currently approved or processed.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Devotee Name</th>
                      <th className="p-3">Date & Slot</th>
                      <th className="p-3">Persons</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {darshanBookings
                      .filter((b) => b.status === 'pending')
                      .slice(0, 5)
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-stone-50/60">
                          <td className="p-3 font-mono font-bold text-amber-900">{b.refCode}</td>
                          <td className="p-3 font-medium text-stone-900">{b.devoteeName}</td>
                          <td className="p-3">
                            <div>{b.date}</div>
                            <div className="text-stone-500">{b.timeSlot}</div>
                          </td>
                          <td className="p-3 font-mono">{b.devoteeCount}</td>
                          <td className="p-3 space-x-2">
                            <button
                              onClick={() => updateDarshanStatus(b.id, 'approved', 'Approved by admin')}
                              className="px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateDarshanStatus(b.id, 'rejected', 'Capacity full')}
                              className="px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-semibold"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: DARSHAN BOOKINGS
          ========================================================================= */}
      {activeAdminTab === 'darshan' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              Darshan Bookings Management ({filteredDarshan.length} records)
            </h2>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={darshanSearch}
                  onChange={(e) => setDarshanSearch(e.target.value)}
                  placeholder="Search name, ref, phone..."
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs w-48 focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <select
                value={darshanFilterStatus}
                onChange={(e) => setDarshanFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Only</option>
                <option value="approved">Approved Only</option>
                <option value="rejected">Rejected Only</option>
                <option value="cancelled">Cancelled Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Devotee Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Persons</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDarshan.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/60">
                    <td className="p-3 font-mono font-bold text-amber-900">{b.refCode}</td>
                    <td className="p-3 font-medium text-stone-900">
                      <div>{b.devoteeName}</div>
                      <div className="text-[11px] text-stone-500">{b.city}</div>
                    </td>
                    <td className="p-3">
                      <div>{b.email}</div>
                      <div className="text-stone-500 font-mono">{b.phone}</div>
                    </td>
                    <td className="p-3 font-medium">{b.categoryName}</td>
                    <td className="p-3">
                      <div>{b.date}</div>
                      <div className="text-stone-500">{b.timeSlot}</div>
                    </td>
                    <td className="p-3 font-mono">{b.devoteeCount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          b.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : b.status === 'cancelled'
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-1.5 whitespace-nowrap">
                      {b.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateDarshanStatus(b.id, 'approved', 'Approved by admin')}
                            className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateDarshanStatus(b.id, 'rejected', 'Declined by admin')}
                            className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-semibold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {b.status === 'approved' && (
                        <button
                          onClick={() => updateDarshanStatus(b.id, 'cancelled', 'Cancelled by admin')}
                          className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px]"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: POOJA BOOKINGS
          ========================================================================= */}
      {activeAdminTab === 'pooja' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              Pooja & Seva Bookings ({filteredPooja.length} records)
            </h2>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={poojaSearch}
                onChange={(e) => setPoojaSearch(e.target.value)}
                placeholder="Search devotee or ref..."
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs w-48"
              />
              <select
                value={poojaFilterStatus}
                onChange={(e) => setPoojaFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Devotee</th>
                  <th className="p-3">Pooja Seva</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Gothram / Nakshatram</th>
                  <th className="p-3">Sankalpam Prayer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPooja.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/60">
                    <td className="p-3 font-mono font-bold text-amber-900">{p.refCode}</td>
                    <td className="p-3 font-medium text-stone-900">
                      <div>{p.devoteeName}</div>
                      <div className="text-[11px] text-stone-500">{p.phone}</div>
                    </td>
                    <td className="p-3 font-medium text-amber-950">{p.poojaName}</td>
                    <td className="p-3">{p.date}</td>
                    <td className="p-3">
                      <div>{p.gothram}</div>
                      <div className="text-stone-500">{p.nakshatram}</div>
                    </td>
                    <td className="p-3 max-w-xs truncate text-stone-600">
                      {p.sankalpamPrayer}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          p.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-1.5 whitespace-nowrap">
                      {p.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updatePoojaStatus(p.id, 'approved', 'Sankalpam registered')}
                            className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updatePoojaStatus(p.id, 'rejected', 'Slot unavailable')}
                            className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-semibold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: SLOT CAPACITY MANAGER
          ========================================================================= */}
      {activeAdminTab === 'slots' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6 animate-fade-in">
          <h2 className="font-cinzel text-lg font-bold text-stone-900">
            {t.adminSlotManage}
          </h2>

          <div className="space-y-4">
            {darshanSlots.map((slot) => {
              const remaining = slot.capacity - slot.bookedCount;
              return (
                <div
                  key={slot.id}
                  className="p-5 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-800" />
                      <span>{slot.timeSlot}</span>
                    </div>
                    <div className="text-xs text-stone-500 font-mono">
                      Booked: <strong className="text-amber-900">{slot.bookedCount}</strong> / Capacity: {slot.capacity} ({remaining} remaining)
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-stone-700">Capacity:</label>
                    <input
                      type="number"
                      min={slot.bookedCount}
                      max={500}
                      value={slot.capacity}
                      onChange={(e) =>
                        updateSlotCapacity(slot.id, parseInt(e.target.value) || slot.capacity, slot.isAvailable)
                      }
                      className="w-20 px-2 py-1 rounded border border-stone-300 text-xs font-mono"
                    />

                    <button
                      onClick={() => updateSlotCapacity(slot.id, slot.capacity, !slot.isAvailable)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        slot.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {slot.isAvailable ? 'Active' : 'Closed'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: ANNOUNCEMENTS
          ========================================================================= */}
      {activeAdminTab === 'announcements' && (
        <div className="space-y-8 animate-fade-in">
          {/* Creator Form */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              {t.adminNewAnnouncement}
            </h2>
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    English Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnnTitleEn}
                    onChange={(e) => setNewAnnTitleEn(e.target.value)}
                    placeholder="e.g. Special Deepam Darshan Timings"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={newAnnTitleTa}
                    onChange={(e) => setNewAnnTitleTa(e.target.value)}
                    placeholder="e.g. சிறப்பு தீப தரிசன நேரங்கள்"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-tamil"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    English Announcement Body *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newAnnBodyEn}
                    onChange={(e) => setNewAnnBodyEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tamil Announcement Body
                  </label>
                  <textarea
                    rows={3}
                    value={newAnnBodyTa}
                    onChange={(e) => setNewAnnBodyTa(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-tamil"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-stone-700">Priority:</label>
                  <select
                    value={newAnnPriority}
                    onChange={(e) => setNewAnnPriority(e.target.value as 'normal' | 'urgent')}
                    className="px-2 py-1 rounded border border-stone-300 text-xs bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold shadow-xs"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>

          {/* List of active announcements */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900">Current Announcements</h3>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl border border-stone-200 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                      <span>{ann.date}</span>
                      <span className="uppercase text-amber-800 font-bold">{ann.priority}</span>
                    </div>
                    <div className="font-bold text-sm text-stone-900">{ann.titleEn}</div>
                    <div className="text-xs text-stone-600">{ann.bodyEn}</div>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-stone-400 hover:text-red-700 p-1"
                    title="Delete announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: AUDIT LOGS
          ========================================================================= */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 animate-fade-in">
          <h2 className="font-cinzel text-lg font-bold text-stone-900">
            {t.adminRecentAudit} ({auditLogs.length} events logged)
          </h2>

          <div className="divide-y divide-stone-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono font-bold text-amber-900 mr-2">{log.action}</span>
                  <span className="text-stone-700">{log.details}</span>
                </div>
                <div className="text-stone-400 font-mono text-[11px] shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
