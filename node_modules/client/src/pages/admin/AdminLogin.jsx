import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { setAuth, getToken } from '../../utils/auth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('admin@xirpl.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Jika sudah login, redirect
  const existingToken = getToken();
  if (existingToken) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      setAuth(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login gagal:', err);
      setError(
        err?.response?.data?.message || 'Login gagal. Periksa email/password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-5 glass-card border border-white/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-text">
                Login Admin XI RPL
              </h1>
              <p className="text-xs text-text-muted">
                Masuk untuk mengelola data siswa, prestasi, dan galeri.
              </p>
            </div>
            <Badge variant="purple">
              Internal Only
            </Badge>
          </div>

          {error && (
            <div className="mb-3 rounded-xl bg-state-error/10 px-3 py-2 text-[11px] text-state-error border border-state-error/40">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-text-muted">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-text-muted">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk sebagai Admin'}
            </Button>
          </form>

          <p className="mt-3 text-[11px] text-text-muted">
            Email default: <span className="font-mono">admin@xirpl.com</span> •
            Password: <span className="font-mono">admin123</span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
