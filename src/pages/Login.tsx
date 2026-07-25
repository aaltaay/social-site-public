import { useState } from 'react';
import { Lock, AlertTriangle } from 'lucide-react';
import { setSessionAuthenticated, validateDemoCredentials } from '../lib/auth';

export default function Login({ setAuth }: { setAuth: (auth: boolean) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDemoCredentials(username, password)) {
      setSessionAuthenticated();
      setAuth(true);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="glass p-10 rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Social AI Poster</h1>
          <p className="text-text-muted mt-2">Frontend demo dashboard</p>
        </div>

        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex gap-3 text-left">
          <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-100/90">
            <span className="font-semibold text-amber-200">Demo credentials only</span> — use{' '}
            <code className="text-amber-100">admin</code> / <code className="text-amber-100">admin</code>.
            This is not production auth and must not be reused for real data.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98]"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
