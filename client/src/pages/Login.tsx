import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserPlus, LogIn, Loader2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminOption, setIsAdminOption] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!isLoginView && !name) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
      const bodyPayload = isLoginView 
        ? { email, password } 
        : { name, email, password, role: isAdminOption ? 'admin' : 'customer' };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        if (isLoginView) {
          login(data.token, data.user);
        } else {
          register(data.token, data.user);
        }
        navigate('/orders'); // Go to orders on successful login/signup
      } else {
        setErrorMsg(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg('Cannot contact server. Activating local sandbox mode.');
      // Mock login for sandbox testing if backend server not running
      setTimeout(() => {
        const mockUser = {
          id: 'sandbox-id-' + Math.random().toString(36).substring(2, 6),
          name: name || 'Sandbox Guest',
          email: email,
          role: (isAdminOption || email.includes('admin')) ? 'admin' as const : 'customer' as const
        };
        login('sandbox-jwt-token-key-112233', mockUser);
        navigate('/');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Visual spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cream/3 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Toggle headers */}
        <div className="text-center mb-8 space-y-2">
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
            your account
          </span>
          <h2 className="text-3xl font-bold text-cream">
            {isLoginView ? 'Welcome back 👋' : 'Join the crew.'}
          </h2>
          <p className="text-xs text-gray-500 font-light text-cream-dark">
            {isLoginView ? 'Sign in to manage your orders and commissions.' : 'Create an account to start commissioning work.'}
          </p>
        </div>

        {/* Auth card container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cream/15 space-y-6 shadow-2xl">
          {errorMsg && (
            <div className="flex gap-2 bg-rose-500/5 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl text-xs font-light leading-relaxed animate-pulse">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input (Only in signup view) */}
            {!isLoginView && (
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-semibold">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alexander Vance"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
                />
              </div>
            )}

            {/* Email input */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase font-semibold">Email Address</label>
              <input
                type="email"
                required
                placeholder="alexander@vancework.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
              />
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase font-semibold">Password Code</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
              />
            </div>

            {/* Admin option toggle in signup mode to test both roles easily */}
            {!isLoginView && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="adminCheck"
                  checked={isAdminOption}
                  onChange={e => setIsAdminOption(e.target.checked)}
                  className="rounded bg-black border-cream/15 text-cream focus:ring-0 focus:ring-offset-0 h-4 w-4"
                />
                <label htmlFor="adminCheck" className="text-[10px] text-gray-400 font-bold uppercase tracking-wider cursor-pointer">
                  Request Administrative privileges
                </label>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cream hover:bg-cream-light text-black font-bold text-sm py-5 rounded-full flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(222,219,200,0.25)] hover:shadow-[0_8px_32px_rgba(222,219,200,0.4)] transition-all duration-300 tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying handshake...
                </>
              ) : isLoginView ? (
                <>
                  <LogIn size={18} />
                  Login Securely
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Register Credentials
                </>
              )}
            </button>
          </form>

          {/* Toggle view text */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setErrorMsg('');
              }}
              className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold hover:text-cream hover:underline decoration-cream decoration-2 underline-offset-4 transition-colors"
            >
              {isLoginView ? "Create a new portfolio account" : "I have credentials, log in"}
            </button>
          </div>
        </div>

        {/* Demo Credentials Tip Box */}
        <div className="mt-4 bg-surface-dark border border-cream/10 p-3.5 rounded-2xl text-center space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-cream block flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} className="text-cream" />
            Sandbox Testing Guidelines
          </span>
          <p className="text-[10px] text-gray-500 font-light leading-relaxed">
            Log in with the pre-seeded admin user: <span className="text-cream font-bold">admin@flemlabs.com</span> and password: <span className="text-cream font-bold">admin123</span> to manage user reviews and edit/accept/cancel escrow orders instantly!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
