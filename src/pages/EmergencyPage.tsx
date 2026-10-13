import React, { useState } from 'react';
import { EMERGENCY_CONTACTS, OFFICIAL_STATE_HELPLINES } from '../data/emergency';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  Clock,
  HeartPulse,
  Shield,
  Search,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { showToast } = useApp();
  const [districtFilter, setDistrictFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const districts = ['all', 'Madurai', 'The Nilgiris', 'Dindigul', 'Thanjavur', 'Chennai', 'Kanyakumari'];

  const filteredContacts = EMERGENCY_CONTACTS.filter((c) => {
    if (districtFilter !== 'all' && c.district !== districtFilter) return false;
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    return true;
  });

  const handleCall = (name: string, phone: string) => {
    showToast(`Simulated emergency call initiated to ${name} (${phone})`, 'warning');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Tourist Safety & Emergency Response</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          Emergency Services & Helplines
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Immediate 24/7 assistance directory across Tamil Nadu tourist destinations
        </p>
      </div>

      {/* Prominent State Helpline Strip */}
      <div className="bg-rose-950 text-white p-6 sm:p-8 rounded-3xl border border-rose-900 shadow-lg space-y-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold font-display text-white">
            Official 24/7 Tamil Nadu Emergency Helplines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {OFFICIAL_STATE_HELPLINES.map((hl, i) => (
            <div
              key={i}
              className="p-4 bg-rose-900/60 rounded-2xl border border-rose-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-amber-300 font-mono tracking-tight">
                  {hl.number}
                </span>
                <h3 className="text-xs font-bold text-white mt-1 leading-snug">{hl.name}</h3>
                <p className="text-[11px] text-rose-200 mt-1">{hl.description}</p>
              </div>
              <button
                onClick={() => handleCall(hl.name, hl.number)}
                className="mt-4 w-full py-1.5 px-2 rounded-lg bg-rose-800 hover:bg-rose-700 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call ({hl.number})</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Filter by District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Districts' : d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Category:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800"
          >
            <option value="all">All Services</option>
            <option value="Hospital">Hospitals & Trauma</option>
            <option value="Tourist Police">Tourist Police Posts</option>
            <option value="Police">Local Police</option>
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-teal-800 uppercase tracking-wider">{contact.type}</span>
                <span className="text-slate-400">{contact.district}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">{contact.name}</h3>

              <div className="space-y-2 text-xs text-slate-600 mb-4">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{contact.timing}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-slate-700 truncate">
                {contact.phoneDemo}
              </span>

              <button
                onClick={() => handleCall(contact.name, contact.phoneDemo)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Help Desk</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
