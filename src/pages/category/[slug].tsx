import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { sampleCategories, sampleProducts } from '../../data/sampleData';

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

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { user, logout } = useAuth();
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  // Find category by slug
  const category = sampleCategories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  // Filter products by category
  const categoryProducts = sampleProducts.filter(product => 
    product.category === category?.name
  );

  const toggleLike = (productId: number) => {
    const newLikedProducts = new Set(likedProducts);
    if (newLikedProducts.has(productId)) {
      newLikedProducts.delete(productId);
    } else {
      newLikedProducts.add(productId);
    }
    setLikedProducts(newLikedProducts);
  };

  const shareProduct = (product: any) => {
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

  if (!category) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.errorSection}>
            <h1 style={styles.errorTitle}>Category Not Found</h1>
            <p style={styles.errorText}>The category you're looking for doesn't exist.</p>
            <Link href="/categories" style={{ textDecoration: 'none' }}>
              <button style={styles.errorButton}>Browse All Categories</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <Link href="/categories" style={styles.backLink}>← Back to Categories</Link>
          <div style={styles.categoryInfo}>
            <div style={styles.categoryIcon}>{getCategoryIcon(category.name)}</div>
            <div>
              <h1 style={styles.title}>{category.name}</h1>
              <p style={styles.description}>{category.description}</p>
              <span style={styles.productCount}>{categoryProducts.length} products available</span>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <section style={styles.productsSection}>
          <h2 style={styles.sectionTitle}>Products in {category.name}</h2>
          
          {categoryProducts.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No products found in this category.</p>
              <Link href="/categories" style={{ textDecoration: 'none' }}>
                <button style={styles.emptyButton}>Browse Other Categories</button>
              </Link>
            </div>
          ) : (
            <div style={styles.productsGrid}>
              {categoryProducts.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <Link 
                    href={`/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={styles.productImage}>
                      <span style={styles.imagePlaceholder}>
                        {getProductIcon(product.name, category.name)}
                      </span>
                    </div>
                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>{product.name}</h3>
                      <p style={styles.productDescription}>{product.description}</p>
                      <div style={styles.productMeta}>
                        <span style={styles.productPrice}>${product.price}</span>
                        <span style={styles.productBrand}>{product.brand}</span>
                      </div>
                      <div style={styles.productTags}>
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} style={styles.tag}>{tag}</span>
                        ))}
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
                      onClick={() => toggleLike(product.id)}
                      title={likedProducts.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {likedProducts.has(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      style={{...styles.actionButton, ...styles.shareButton}}
                      onClick={() => shareProduct(product)}
                      title="Share product"
                    >
                      📤
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Navigation */}
        <div style={styles.navigation}>
          <Link href="/categories" style={{ textDecoration: 'none' }}>
            <button style={styles.secondaryButton}>All Categories</button>
          </Link>
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
  categoryInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  categoryIcon: {
    fontSize: '64px',
    flexShrink: 0,
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    margin: '0 0 12px 0',
    color: '#1e293b',
  },
  description: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0 0 16px 0',
    lineHeight: '1.6',
  },
  productCount: {
    fontSize: '16px',
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#eff6ff',
    padding: '8px 16px',
    borderRadius: '12px',
  },
  productsSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 24px 0',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
  },
  emptyText: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0 0 24px 0',
  },
  emptyButton: {
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
    marginBottom: '12px',
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
  productTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  tag: {
    fontSize: '12px',
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: '500',
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
  navigation: {
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
  errorSection: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  errorTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#dc2626',
    margin: '0 0 16px 0',
  },
  errorText: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0 0 24px 0',
  },
  errorButton: {
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
