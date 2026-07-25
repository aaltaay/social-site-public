import { useState } from 'react';
import { LogOut, Rocket, Hash, Sparkles, Loader2, CheckCircle, Coffee, Calendar } from 'lucide-react';
import {
  DEMO_BRAND,
  DEMO_CAMPAIGN,
  DEMO_POSTS,
  type DemoPost,
} from '../fixtures/acmeCoffeeCampaign';
import { clearSession } from '../lib/auth';
import { runGeneratePost } from '../lib/generatePost';

const API_URL = import.meta.env.VITE_API_URL ?? '';
const isLiveMode = Boolean(API_URL.trim());

export default function Dashboard({ setAuth }: { setAuth: (auth: boolean) => void }) {
  const [topic, setTopic] = useState(DEMO_POSTS[0]?.topic ?? '');
  const [hashtags, setHashtags] = useState(DEMO_POSTS[0]?.hashtags ?? '');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [result, setResult] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleLogout = () => {
    clearSession();
    setAuth(false);
  };

  const loadPost = (post: DemoPost) => {
    setSelectedPostId(post.id);
    setTopic(post.topic);
    setHashtags(post.hashtags);
    setStatus('idle');
    setResult('');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !hashtags) return;

    setStatus('running');
    const outcome = await runGeneratePost(topic, hashtags, API_URL);
    setResult(outcome.result);
    setStatus(outcome.status);
  };

  const submitLabel = isLiveMode ? 'Generate with Crew' : 'Run demo pipeline';
  const modeBadge = isLiveMode
    ? { label: 'Live backend', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
    : { label: 'Demo mode', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };

  return (
    <div className="min-h-screen bg-background text-text-main">
      <nav className="border-b border-white/10 bg-surface/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
              <Sparkles className="text-primary w-4 h-4" />
            </div>
            <span className="font-semibold tracking-wide text-white">Social AI Poster</span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${modeBadge.className}`}
            >
              {modeBadge.label}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30 shrink-0">
              <Coffee className="text-amber-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted">Demo campaign</p>
              <h2 className="text-2xl font-bold text-white">{DEMO_BRAND.name}</h2>
              <p className="text-text-muted text-sm mt-1">{DEMO_CAMPAIGN.name} — {DEMO_CAMPAIGN.objective}</p>
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 self-start sm:self-center">
            Fixture data only
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Generate Content</h2>
              <p className="text-text-muted mt-2">
                {isLiveMode
                  ? 'Submit a brief to the connected CrewAI backend for research, draft, and review.'
                  : 'Explore the operator UI with Acme Coffee fixtures. Set VITE_API_URL to connect a live backend.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Sample posts</h3>
              {DEMO_POSTS.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => loadPost(post)}
                  className={`w-full text-left glass rounded-xl p-4 transition-all hover:border-primary/30 ${
                    selectedPostId === post.id ? 'border-primary/40 ring-1 ring-primary/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-medium text-white line-clamp-1">{post.topic}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                        post.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.platform} · {new Date(post.scheduledAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerate} className="glass rounded-2xl p-8 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Target Topic / Audience
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px] resize-none"
                  placeholder="e.g. Seasonal single-origin launch for Acme Coffee..."
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Hash className="w-4 h-4 text-primary" />
                  Hashtags
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="#AcmeCoffee #SingleOrigin"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'running'}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {status === 'running' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isLiveMode ? 'Agents working...' : 'Running demo pipeline...'}
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    {submitLabel}
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex flex-col h-full min-h-[420px]">
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Execution Log</h3>
            </div>
            <div className="glass flex-1 rounded-2xl p-6 overflow-hidden relative group">
              {status === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                  <Sparkles className="w-8 h-8 mb-3 opacity-20" />
                  <p>Select a sample post or submit a brief...</p>
                </div>
              )}

              {status === 'running' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary">
                  <Loader2 className="w-8 h-8 mb-3 animate-spin" />
                  <p className="animate-pulse">
                    {isLiveMode ? 'Research → Draft → Review...' : 'Replaying demo fixtures...'}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    {isLiveMode
                      ? 'Connected to VITE_API_URL backend.'
                      : 'No backend connected — demo fixtures will be used.'}
                  </p>
                </div>
              )}

              {status === 'success' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 text-emerald-400 mb-6">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{isLiveMode ? 'Pipeline complete' : 'Demo pipeline complete'}</span>
                  </div>
                  <div className="bg-surface/50 rounded-xl p-4 flex-1 overflow-y-auto font-mono text-sm whitespace-pre-wrap text-white/80 border border-white/5">
                    {result}
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 text-red-400 mb-6">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Execution Failed</span>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4 flex-1 overflow-y-auto font-mono text-sm text-red-300 border border-red-500/20">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
