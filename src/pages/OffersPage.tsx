import React, { useState } from 'react';
import { OFFERS } from '../data/offers';
import { useApp } from '../context/AppContext';
import { OfferDeal } from '../types';
import { Tag, Copy, Check, Info, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOfferModal, setSelectedOfferModal] = useState<OfferDeal | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Promo code ${code} copied to clipboard! (Sample demo code)`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider mb-1">
          <Tag className="w-4 h-4" />
          <span>Curated Promotions & Travel Deals</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          Exclusive Tourism Offers
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Special demonstration savings on heritage hotels, food trails, and travel circuits
        </p>
      </div>

      {/* Demo Disclaimer */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-950">Demonstration Vouchers Notice</p>
          <p className="mt-0.5 text-slate-600">
            All offers, discount codes, and promotions shown below are sample demonstration models created for UI showcase and prototype evaluation.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {OFFERS.map((deal) => {
          const isCopied = copiedCode === deal.promoCode;
          return (
            <div
              key={deal.id}
              className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-teal-700/40 hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {deal.discountLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{deal.validity}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">{deal.title}</h3>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {deal.terms}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Code:</span>
                  <button
                    onClick={() => handleCopyCode(deal.promoCode)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-xs font-mono font-bold text-slate-800 transition-colors"
                  >
                    <span>{deal.promoCode}</span>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setSelectedOfferModal(deal)}
                  className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 font-display text-base">
                {selectedOfferModal.title}
              </h3>
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p><strong>Discount:</strong> {selectedOfferModal.discountLabel}</p>
              <p><strong>Validity:</strong> {selectedOfferModal.validity}</p>
              <p><strong>Terms:</strong> {selectedOfferModal.terms}</p>
              <div className="p-3 bg-stone-100 rounded-xl font-mono text-center text-sm font-bold text-slate-900">
                PROMO CODE: {selectedOfferModal.promoCode}
              </div>
            </div>

            <button
              onClick={() => {
                handleCopyCode(selectedOfferModal.promoCode);
                setSelectedOfferModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider"
            >
              Copy Code & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
