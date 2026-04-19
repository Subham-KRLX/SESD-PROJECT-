import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../utils/apiClient';

type AuthApiPayload = {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    brandName?: string;
    isVerified?: boolean;
  };
  error?: string;
};

async function parseJsonResponse(response: Response): Promise<AuthApiPayload> {
  const raw = await response.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as AuthApiPayload;
  } catch {
    return {};
  }
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const demoEmails = new Set(['demo-user-123@techspark.com', 'vendor@techspark.com']);
  const [isVendor, setIsVendor] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const response = await apiClient.fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            role: isVendor ? 'VENDOR' : 'CUSTOMER',
            brandName: isVendor ? brandName : undefined,
          }),
        });
        const payload = await parseJsonResponse(response);

        if (!response.ok) {
          if (demoEmails.has(email.trim().toLowerCase())) {
            throw new Error('This demo email already exists. Please use Sign In with the demo password shown on the left.');
          }
          throw new Error(payload.error || 'Registration failed. Please verify the form and try again.');
        }
      }

      const loginResponse = await apiClient.fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await parseJsonResponse(loginResponse);
      if (!loginResponse.ok) {
        throw new Error(payload.error || 'Login failed. Please check your credentials or backend connection.');
      }

      if (!payload.token || !payload.user) {
        throw new Error('Login failed because the server did not return a valid session payload.');
      }

      const session = { token: payload.token, user: payload.user };
      login(session);
      navigate(session.user.role === 'ADMIN' || session.user.role === 'VENDOR' ? '/dashboard' : '/browse');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl grid overflow-hidden rounded-[32px] border border-white/8 bg-[#121823]/90 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8 border-b border-white/8 bg-gradient-to-br from-[#171d2a] to-[#0f1419] p-10 md:p-14 lg:border-b-0 lg:border-r">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">Secure access</p>
            <h2 className="display-font text-4xl font-bold text-white md:text-5xl">Enter TechSpark</h2>
            <p className="max-w-xl leading-relaxed text-gray-400">
              Authenticate to manage your hardware cart, purchase history, and analytics dashboard.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="min-w-0 rounded-3xl border border-white/8 bg-white/5 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Demo Customer</p>
              <p className="text-white font-semibold text-sm leading-snug break-all">demo-user-123@techspark.com</p>
              <p className="text-gray-400 text-sm mt-1 break-all">Password: demo12345</p>
            </div>
            <div className="min-w-0 rounded-3xl border border-white/8 bg-white/5 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Demo Vendor</p>
              <p className="text-white font-semibold text-sm leading-snug break-all">vendor@techspark.com</p>
              <p className="text-gray-400 text-sm mt-1 break-all">Password: vendor12345</p>
            </div>
          </div>

          <p className="text-sm text-amber-200/90">
            Use these as existing demo accounts in <span className="font-semibold text-white">Sign In</span> mode.
          </p>

          <button
            type="button"
            onClick={() => setIsRegistering((current) => !current)}
            className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 transition-colors hover:bg-blue-500/20"
          >
            {isRegistering ? 'Switch to Sign In' : 'Create New Account'}
          </button>
        </div>

        <div className="space-y-6 bg-[#0f1419] p-10 md:p-14">
          <div className="flex rounded-2xl border border-white/8 bg-white/5 p-1">
            <button
              type="button"
              className={`flex-1 rounded-xl py-3 text-sm font-bold uppercase tracking-widest transition-colors ${!isRegistering ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsRegistering(false)}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`flex-1 rounded-xl py-3 text-sm font-bold uppercase tracking-widest transition-colors ${isRegistering ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsRegistering(true)}
            >
              Register
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  required
                  className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
                  placeholder="Alex Morgan"
                />
              </div>
            )}

            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${!isVendor ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setIsVendor(false)}
              >
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${isVendor ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setIsVendor(true)}
              >
                Tech Vendor
              </button>
            </div>

            {isRegistering && isVendor && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Brand Name</label>
                <input
                  value={brandName}
                  onChange={(event) => setBrandName(event.target.value)}
                  type="text"
                  required
                  className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
                  placeholder="QuantumTech"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 pr-24 text-white outline-none transition-all focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 transition-colors hover:bg-white/10"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/60 bg-red-500/15 px-4 py-3 text-sm font-medium text-red-100 shadow-[0_0_0_1px_rgba(248,113,113,0.2)]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Processing...' : isRegistering ? 'Create Session' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
