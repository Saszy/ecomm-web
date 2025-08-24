import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      login(username.trim(), email.trim() || undefined);
      setIsLoading(false);
      router.push('/');
    }, 1000);
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.loginCard}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>
                Username *
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div style={styles.emailToggle}>
              <button
                type="button"
                onClick={() => setShowEmail(!showEmail)}
                style={styles.toggleButton}
                disabled={isLoading}
              >
                {showEmail ? 'Remove Email' : 'Add Email (Optional)'}
              </button>
            </div>

            {showEmail && (
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={styles.input}
                  disabled={isLoading}
                />
              </div>
            )}

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isLoading || !username.trim()}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <span style={styles.linkText}>Just enter any username to continue</span>
            </p>
            {showEmail && (
              <p style={styles.emailInfo}>
                💡 Adding an email helps with account recovery and notifications
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.5',
  },
  form: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: 'white',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const,
  },
  emailToggle: {
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  toggleButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  },
  footer: {
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 12px 0',
  },
  linkText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  emailInfo: {
    fontSize: '12px',
    color: '#059669',
    backgroundColor: '#ecfdf5',
    padding: '8px 12px',
    borderRadius: '6px',
    margin: '0',
    border: '1px solid #a7f3d0',
  },
};
