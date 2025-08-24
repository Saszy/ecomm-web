import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { sampleCategories, sampleProducts } from '../data/sampleData';

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

// Function to get appropriate icon for product
const getProductIcon = (productName: string, categoryName: string) => {
  const name = productName.toLowerCase();
  const category = categoryName.toLowerCase();
  
  // Electronics
  if (category.includes('electronics')) {
    if (name.includes('phone') || name.includes('mobile')) return '📱';
    if (name.includes('laptop') || name.includes('computer')) return '💻';
    if (name.includes('headphone') || name.includes('earphone')) return '🎧';
    if (name.includes('camera')) return '📷';
    if (name.includes('tablet')) return '📱';
    return '💻';
  }
  
  // Fashion
  if (category.includes('fashion')) {
    if (name.includes('shirt') || name.includes('t-shirt')) return '👕';
    if (name.includes('dress')) return '👗';
    if (name.includes('shoe') || name.includes('sneaker')) return '👟';
    if (name.includes('jeans') || name.includes('pants')) return '👖';
    if (name.includes('jacket') || name.includes('coat')) return '🧥';
    return '👕';
  }
  
  // Home & Garden
  if (category.includes('home') || category.includes('garden')) {
    if (name.includes('plant')) return '🌱';
    if (name.includes('furniture') || name.includes('chair')) return '🪑';
    if (name.includes('lamp') || name.includes('light')) return '💡';
    if (name.includes('cookware') || name.includes('pan')) return '🍳';
    return '🏠';
  }
  
  // Sports
  if (category.includes('sports')) {
    if (name.includes('ball')) return '⚽';
    if (name.includes('racket')) return '🎾';
    if (name.includes('bike') || name.includes('bicycle')) return '🚴';
    if (name.includes('gym') || name.includes('fitness')) return '🏋️';
    return '⚽';
  }
  
  // Books
  if (category.includes('books')) {
    if (name.includes('novel') || name.includes('fiction')) return '📖';
    if (name.includes('cookbook')) return '📚';
    if (name.includes('magazine')) return '📰';
    return '📚';
  }
  
  // Beauty
  if (category.includes('beauty')) {
    if (name.includes('lipstick')) return '💄';
    if (name.includes('perfume')) return '🌸';
    if (name.includes('skincare') || name.includes('cream')) return '🧴';
    return '💄';
  }
  
  // Automotive
  if (category.includes('automotive')) {
    if (name.includes('car') || name.includes('vehicle')) return '🚗';
    if (name.includes('bike') || name.includes('motorcycle')) return '🏍️';
    if (name.includes('tire')) return '🛞';
    return '🚗';
  }
  
  return '🛍️';
};

export default function HomePage() {
  const { user, logout, trackEvent, getUserEvents } = useAuth();
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const toggleLike = (productId: number, productName: string, categoryName: string) => {
    const newLikedProducts = new Set(likedProducts);
    const isLiked = newLikedProducts.has(productId);
    
    if (isLiked) {
      newLikedProducts.delete(productId);
      // Track unlike event
      trackEvent({
        eventType: 'unlike',
        productId,
        productName,
        categoryName,
        metadata: { action: 'removed_from_favorites' }
      });
    } else {
      newLikedProducts.add(productId);
      // Track like event
      trackEvent({
        eventType: 'like',
        productId,
        productName,
        categoryName,
        metadata: { action: 'added_to_favorites' }
      });
    }
    
    setLikedProducts(newLikedProducts);
  };

  const shareProduct = (product: any, categoryName: string) => {
    // Track share event
    trackEvent({
      eventType: 'share',
      productId: product.id,
      productName: product.name,
      categoryName,
      metadata: { 
        shareMethod: 'web_share_api',
        productPrice: product.price,
        productBrand: product.brand
      }
    });

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `${window.location.origin}/product/${product.id}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = `${window.location.origin}/product/${product.id}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Product link copied to clipboard!');
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const userEvents = getUserEvents();
  const recentActivity = userEvents.slice(-3).reverse();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* User Header */}
        {user && (
          <div style={styles.userHeader}>
            <div style={styles.userInfo}>
              <span style={styles.welcomeText}>Welcome back,</span>
              <span style={styles.userName}>{user.username}!</span>
              <div style={styles.userDetails}>
                <span style={styles.userId}>ID: {user.id}</span>
                <span style={styles.userCreated}>Member since {formatDate(user.createdAt)}</span>
                {user.email && <span style={styles.userEmail}>📧 {user.email}</span>}
              </div>
            </div>
            <div style={styles.userActions}>
              <Link href="/profile" style={styles.profileLink}>
                <button style={styles.profileButton}>
                  👤 Profile
                </button>
              </Link>
              <button onClick={logout} style={styles.logoutButton}>
                Logout
              </button>
              {userEvents.length > 0 && (
                <div style={styles.activityBadge}>
                  📊 {userEvents.length} events tracked
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Activity (for logged-in users) */}
        {user && recentActivity.length > 0 && (
          <div style={styles.activitySection}>
            <h3 style={styles.activityTitle}>Recent Activity</h3>
            <div style={styles.activityList}>
              {recentActivity.map((event) => (
                <div key={event.id} style={styles.activityItem}>
                  <span style={styles.activityIcon}>
                    {event.eventType === 'like' ? '❤️' : 
                     event.eventType === 'unlike' ? '🤍' : 
                     event.eventType === 'share' ? '📤' : '👁️'}
                  </span>
                  <span style={styles.activityText}>
                    {event.eventType === 'like' ? 'Liked' : 
                     event.eventType === 'unlike' ? 'Unliked' : 
                     event.eventType === 'share' ? 'Shared' : 'Viewed'} {event.productName}
                  </span>
                  <span style={styles.activityTime}>
                    {formatDate(event.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Welcome to E-Commerce</h1>
          <p style={styles.subtitle}>Discover amazing products and categories</p>
        </header>

        {/* Categories Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
            <Link href="/categories" style={styles.viewAllLink}>
              View All Categories →
            </Link>
          </div>
          
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
                  <span style={styles.productCount}>{category.productCount} products</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
          </div>
          
          <div style={styles.productsGrid}>
            {sampleProducts.slice(0, 6).map((product) => {
              const category = sampleCategories.find(cat => cat.name === product.category);
              return (
                <div key={product.id} style={styles.productCard}>
                  <Link 
                    href={`/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={styles.productImage}>
                      <span style={styles.imagePlaceholder}>
                        {getProductIcon(product.name, category?.name || '')}
                      </span>
                    </div>
                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>{product.name}</h3>
                      <p style={styles.productDescription}>{product.description}</p>
                      <div style={styles.productMeta}>
                        <span style={styles.productPrice}>${product.price}</span>
                        <span style={styles.productBrand}>{product.brand}</span>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Like and Share Buttons */}
                  <div style={styles.productActions}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        ...styles.likeButton,
                        ...(likedProducts.has(product.id) && styles.likedButton)
                      }}
                      onClick={() => toggleLike(product.id, product.name, category?.name || '')}
                      title={likedProducts.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {likedProducts.has(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      style={{...styles.actionButton, ...styles.shareButton}}
                      onClick={() => shareProduct(product, category?.name || '')}
                      title="Share product"
                    >
                      📤
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Shop?</h2>
            <p style={styles.ctaText}>Explore our full collection of products</p>
            <div style={styles.ctaButtons}>
              <Link href="/categories" style={{ textDecoration: 'none' }}>
                <button style={styles.primaryButton}>Browse Categories</button>
              </Link>
              {!user && (
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <button style={styles.secondaryButton}>Sign In</button>
                </Link>
              )}
            </div>
          </div>
        </section>
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
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px 24px',
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
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
    marginTop: '8px',
  },
  userId: {
    fontSize: '12px',
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  userCreated: {
    fontSize: '12px',
    color: '#6b7280',
  },
  userEmail: {
    fontSize: '12px',
    color: '#6b7280',
  },
  userActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    alignItems: 'flex-end',
  },
  profileLink: {
    textDecoration: 'none',
  },
  profileButton: {
    backgroundColor: '#e0e7ff',
    color: '#3b82f6',
    border: '2px solid #bfdbfe',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  activityBadge: {
    fontSize: '12px',
    color: '#059669',
    backgroundColor: '#ecfdf5',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #a7f3d0',
  },
  activitySection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  activityTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 16px 0',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  activityIcon: {
    fontSize: '16px',
  },
  activityText: {
    fontSize: '14px',
    color: '#374151',
    flex: 1,
  },
  activityTime: {
    fontSize: '12px',
    color: '#6b7280',
  },
  header: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    margin: '0 0 16px 0',
    color: '#1e293b',
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '20px',
    color: '#64748b',
    margin: '0',
    fontWeight: '500',
  },
  section: {
    marginBottom: '60px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0',
  },
  viewAllLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
    fontSize: '48px',
    marginBottom: '16px',
  },
  categoryName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  categoryDescription: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 16px 0',
    lineHeight: '1.5',
  },
  productCount: {
    fontSize: '12px',
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#eff6ff',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
  },
  productImage: {
    height: '200px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: '64px',
  },
  productInfo: {
    padding: '20px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  productDescription: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 16px 0',
    lineHeight: '1.5',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#059669',
  },
  productBrand: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  productActions: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  actionButton: {
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },
  likedButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },
  shareButton: {
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    border: '2px solid #bfdbfe',
  },
  ctaSection: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '48px',
    textAlign: 'center' as const,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0 0 16px 0',
  },
  ctaText: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0 0 32px 0',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
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
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
