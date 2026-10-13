import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/destinations';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('demo.traveler@tnstories.in');
  const [password, setPassword] = useState('ExploreTN2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    // Successful demo login
    loginUser(email, 'Tamil Nadu Traveler');
    navigate('/language');
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast('Demo Mode: Password reset link simulated for your email address.', 'info');
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
          Welcome to Tamil Nadu
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Sign in to access your curated itineraries, saved gems, and stories
        </p>
      </div>

      <div className="relative z-10 mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg border border-slate-200/80 rounded-2xl">
          {/* Demo Alert Box */}
          <div className="mb-6 p-3 rounded-xl bg-teal-50 border border-teal-200/70 text-xs text-teal-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-teal-950">Demonstration Credentials Pre-filled</p>
              <p className="text-slate-600 mt-0.5">
                Click <strong>Log In</strong> below to continue directly without creating an external account.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLoginSubmit}>
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
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-800 focus:ring-teal-700"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-semibold text-teal-800 hover:text-teal-950 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-teal-800 hover:bg-teal-900 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Log In & Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Don&apos;t have an account yet? </span>
            <Link to="/register" className="font-bold text-teal-800 hover:text-teal-950 transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
