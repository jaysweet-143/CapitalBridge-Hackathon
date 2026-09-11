import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  Smartphone,
  ShieldCheck,
  Lock,
  Bell,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { profileService } from '../services/profileService';
import { mockMomoService } from '../services/mockMomoService';
import { authService } from '../services/authService';
import { Button } from '../components/common/Button';

export const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(profileService.getProfile());
  const [momoState, setMomoState] = useState(mockMomoService.getConnectionState());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    profileService.saveProfile(profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleToggleAutoSync = () => {
    const updated = { ...momoState, autoSyncEnabled: !momoState.autoSyncEnabled };
    setMomoState(updated);
    localStorage.setItem('cb_momo_connected', JSON.stringify(updated));
  };

  const handleDisconnect = () => {
    mockMomoService.disconnect();
    setMomoState(mockMomoService.getConnectionState());
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Account Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Profile & Settings
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your personal data, business verification, and connected Mobile Money bridges.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
          leftIcon={<LogOut className="w-4 h-4" />}
        >
          Logout
        </Button>
      </div>

      {/* Connected Financial Sources Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Connected Financial Sources
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Prototype Simulation
          </span>
        </div>

        {momoState.isConnected ? (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-xs">
                MoMo
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{momoState.providerName}</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono">
                  {momoState.phoneNumber} &bull; Last synced: {momoState.lastSyncedAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleToggleAutoSync}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                {momoState.autoSyncEnabled ? 'Auto-Sync: ON' : 'Auto-Sync: OFF'}
              </button>
              <button
                onClick={handleDisconnect}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Disconnect bridge"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-3">
            <p className="text-xs text-slate-500">
              No active Mobile Money source connected right now.
            </p>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/connect-momo')}
            >
              Connect Mobile Money Now
            </Button>
          </div>
        )}
      </div>

      {/* Form: Personal & Business Information */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Personal & Business Information
            </h2>
          </div>
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Changes saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Business Name</label>
            <input
              type="text"
              value={profile.businessName}
              onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Business Type</label>
            <input
              type="text"
              value={profile.businessType}
              onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={profile.isWomanOwnedBusiness}
              onChange={(e) => setProfile({ ...profile, isWomanOwnedBusiness: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Registered as Woman-Owned Business</span>
          </label>

          <Button type="submit" size="sm" variant="primary">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};
