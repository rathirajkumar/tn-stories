import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, User, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { HERO_IMAGE } from '../data/destinations';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [prefLanguage, setPrefLanguage] = useState<Language>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loginUser, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Set demo user
    setLanguage(prefLanguage);
    loginUser(email, fullName, prefLanguage);
    navigate('/language');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src={HERO_IMAGE}
          alt="Tamil Nadu background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs"
        />
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-teal-800 text-amber-300 font-extrabold flex items-center justify-center text-lg shadow-md">
              TN
            </span>
            <span className="text-2xl font-bold text-slate-900 font-display">TN Stories</span>
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 font-display">
          Create Traveler Account
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Join explorers discovering the authentic heritage of Tamil Nadu
        </p>
      </div>

      <div className="relative z-10 mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg border border-slate-200/80 rounded-2xl">
          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>Demo registration: All profile details are saved locally in your browser storage.</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
                  placeholder="e.g. Anand Sundaram"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
                  placeholder="anand@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
                    placeholder="Min 6 chars"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
                    placeholder="Confirm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Interface Language
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <select
                  value={prefLanguage}
                  onChange={(e) => setPrefLanguage(e.target.value as Language)}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
                >
                  <option value="en">English (English)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-teal-800 hover:bg-teal-900 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-teal-800 hover:text-teal-950 transition-colors">
              Log In instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
