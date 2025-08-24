import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, logout, updateUserPreferences, getUserEvents } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || 'light',
    notifications: user?.preferences?.notifications || true,
  });

  // Redirect if not logged in
  if (!user) {
    router.push('/login');
    return null;
  }

  const userEvents = getUserEvents();
  
  // Calculate analytics
  const totalEvents = userEvents.length;
  const likes = userEvents.filter(e => e.eventType === 'like').length;
  const shares = userEvents.filter(e => e.eventType === 'share').length;
  const views = userEvents.filter(e => e.eventType === 'view').length;
  
  // Get unique products interacted with
  const uniqueProducts = new Set(userEvents.map(e => e.productId)).size;
  
  // Get favorite categories
  const categoryCounts = userEvents.reduce((acc, event) => {
    acc[event.categoryName] = (acc[event.categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const favoriteCategories = Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const handlePreferencesSave = () => {
    updateUserPreferences(preferences);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'like': return '❤️';
      case 'unlike': return '🤍';
      case 'share': return '📤';
      case 'view': return '👁️';
      default: return '📊';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <Link href="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 style={styles.title}>User Profile</h1>
        </div>

        {/* User Info Card */}
        <div style={styles.userCard}>
          <div style={styles.userAvatar}>
            <span style={styles.avatarText}>
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div style={styles.userInfo}>
            <h2 style={styles.userName}>{user.username}</h2>
            <div style={styles.userDetails}>
              <span style={styles.userId}>ID: {user.id}</span>
              <span style={styles.userCreated}>
                Member since {formatDate(user.createdAt)}
              </span>
              <span style={styles.userLastLogin}>
                Last login: {formatDate(user.lastLoginAt)}
              </span>
              {user.email && (
                <span style={styles.userEmail}>📧 {user.email}</span>
              )}
            </div>
          </div>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>

        {/* Analytics Overview */}
        <div style={styles.analyticsSection}>
          <h3 style={styles.sectionTitle}>Activity Overview</h3>
          <div style={styles.analyticsGrid}>
            <div style={styles.analyticsCard}>
              <div style={styles.analyticsIcon}>📊</div>
              <div style={styles.analyticsContent}>
                <span style={styles.analyticsNumber}>{totalEvents}</span>
                <span style={styles.analyticsLabel}>Total Events</span>
              </div>
            </div>
            <div style={styles.analyticsCard}>
              <div style={styles.analyticsIcon}>❤️</div>
              <div style={styles.analyticsContent}>
                <span style={styles.analyticsNumber}>{likes}</span>
                <span style={styles.analyticsLabel}>Likes</span>
              </div>
            </div>
            <div style={styles.analyticsCard}>
              <div style={styles.analyticsIcon}>📤</div>
              <div style={styles.analyticsContent}>
                <span style={styles.analyticsNumber}>{shares}</span>
                <span style={styles.analyticsLabel}>Shares</span>
              </div>
            </div>
            <div style={styles.analyticsCard}>
              <div style={styles.analyticsIcon}>👁️</div>
              <div style={styles.analyticsContent}>
                <span style={styles.analyticsNumber}>{views}</span>
                <span style={styles.analyticsLabel}>Views</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Preferences */}
        <div style={styles.preferencesSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Preferences</h3>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                style={styles.editButton}
              >
                Edit
              </button>
            ) : (
              <div style={styles.editActions}>
                <button 
                  onClick={() => setIsEditing(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePreferencesSave}
                  style={styles.saveButton}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          
          <div style={styles.preferencesContent}>
            <div style={styles.preferenceItem}>
              <label style={styles.preferenceLabel}>Theme</label>
              {isEditing ? (
                <select 
                  value={preferences.theme}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    theme: e.target.value as 'light' | 'dark'
                  })}
                  style={styles.preferenceSelect}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              ) : (
                <span style={styles.preferenceValue}>
                  {preferences.theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                </span>
              )}
            </div>
            
            <div style={styles.preferenceItem}>
              <label style={styles.preferenceLabel}>Notifications</label>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: e.target.checked
                  })}
                  style={styles.preferenceCheckbox}
                />
              ) : (
                <span style={styles.preferenceValue}>
                  {preferences.notifications ? '🔔 Enabled' : '🔕 Disabled'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Favorite Categories */}
        {favoriteCategories.length > 0 && (
          <div style={styles.categoriesSection}>
            <h3 style={styles.sectionTitle}>Favorite Categories</h3>
            <div style={styles.categoriesList}>
              {favoriteCategories.map(([category, count]) => (
                <div key={category} style={styles.categoryItem}>
                  <span style={styles.categoryName}>{category}</span>
                  <span style={styles.categoryCount}>{count} interactions</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {userEvents.length > 0 && (
          <div style={styles.activitySection}>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>
            <div style={styles.activityList}>
              {userEvents.slice(-10).reverse().map((event) => (
                <div key={event.id} style={styles.activityItem}>
                  <span style={styles.activityIcon}>
                    {getEventIcon(event.eventType)}
                  </span>
                  <div style={styles.activityContent}>
                    <span style={styles.activityText}>
                      {event.eventType === 'like' ? 'Liked' : 
                       event.eventType === 'unlike' ? 'Unliked' : 
                       event.eventType === 'share' ? 'Shared' : 'Viewed'} {event.productName}
                    </span>
                    <span style={styles.activityCategory}>
                      in {event.categoryName}
                    </span>
                  </div>
                  <span style={styles.activityTime}>
                    {formatDate(event.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Activity Message */}
        {userEvents.length === 0 && (
          <div style={styles.noActivitySection}>
            <div style={styles.noActivityIcon}>📊</div>
            <h3 style={styles.noActivityTitle}>No Activity Yet</h3>
            <p style={styles.noActivityText}>
              Start exploring products to see your activity here!
            </p>
            <Link href="/" style={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '32px',
  },
  backLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0',
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 12px 0',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  userId: {
    fontSize: '12px',
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  userCreated: {
    fontSize: '14px',
    color: '#64748b',
  },
  userLastLogin: {
    fontSize: '14px',
    color: '#64748b',
  },
  userEmail: {
    fontSize: '14px',
    color: '#64748b',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  analyticsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  },
  analyticsCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  analyticsIcon: {
    fontSize: '24px',
  },
  analyticsContent: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  analyticsNumber: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
  },
  analyticsLabel: {
    fontSize: '12px',
    color: '#64748b',
  },
  preferencesSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  editActions: {
    display: 'flex',
    gap: '8px',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  preferencesContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  preferenceLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
  },
  preferenceValue: {
    fontSize: '14px',
    color: '#64748b',
  },
  preferenceSelect: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  preferenceCheckbox: {
    width: '18px',
    height: '18px',
  },
  categoriesSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  categoriesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
  },
  categoryCount: {
    fontSize: '14px',
    color: '#64748b',
    backgroundColor: '#eff6ff',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  activityIcon: {
    fontSize: '20px',
  },
  activityContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  activityText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  activityCategory: {
    fontSize: '12px',
    color: '#6b7280',
  },
  activityTime: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  noActivitySection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  noActivityIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  noActivityTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 8px 0',
  },
  noActivityText: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0 0 24px 0',
  },
  browseButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    display: 'inline-block',
  },
};
