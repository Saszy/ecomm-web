import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { sampleCategories } from '../data/sampleData';

// Function to get appropriate icon for category
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('electronics')) return '💻';
  if (name.includes('fashion')) return '👗';
  if (name.includes('home')) return '🏠';
  if (name.includes('sports')) return '⚽';
  if (name.includes('books')) return '📚';
  if (name.includes('beauty')) return '💄';
  if (name.includes('automotive')) return '🚗';
  if (name.includes('garden')) return '🌱';
  return '🛍️';
};

export default function CategoriesPage() {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* User Header */}
        {user && (
          <div style={styles.userHeader}>
            <div style={styles.userInfo}>
              <span style={styles.welcomeText}>Welcome back,</span>
              <span style={styles.userName}>{user.username}!</span>
            </div>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}

        {/* Header */}
        <header style={styles.header}>
          <Link href="/" style={styles.backLink}>← Back to Home</Link>
          <h1 style={styles.title}>All Categories</h1>
          <p style={styles.subtitle}>Browse our complete collection of product categories</p>
        </header>

        {/* Categories Grid */}
        <section style={styles.categoriesSection}>
          <div style={styles.categoriesGrid}>
            {sampleCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={styles.categoryCard}>
                  <div style={styles.categoryIcon}>{getCategoryIcon(category.name)}</div>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                  <p style={styles.categoryDescription}>{category.description}</p>
                  <div style={styles.categoryMeta}>
                    <span style={styles.productCount}>{category.productCount} products</span>
                                         <div style={styles.subcategories}>
                       {category.subcategories?.slice(0, 3).map((sub, index) => (
                         <span key={index} style={styles.subcategoryTag}>{sub}</span>
                       ))}
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div style={styles.navigation}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={styles.primaryButton}>Back to Home</button>
          </Link>
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
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px 24px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  welcomeText: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  userName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  header: {
    marginBottom: '40px',
  },
  backLink: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '24px',
    transition: 'color 0.2s ease',
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    margin: '0 0 12px 0',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.6',
  },
  categoriesSection: {
    marginBottom: '40px',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  categoryIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  categoryName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 12px 0',
  },
  categoryDescription: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  },
  categoryMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    alignItems: 'center',
  },
  productCount: {
    fontSize: '14px',
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#eff6ff',
    padding: '6px 16px',
    borderRadius: '12px',
  },
  subcategories: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  subcategoryTag: {
    fontSize: '12px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: '500',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
