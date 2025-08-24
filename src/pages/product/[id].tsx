import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { sampleCategories, sampleProducts } from '../../data/sampleData';

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

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, logout } = useAuth();
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  // Find product by ID
  const product = sampleProducts.find(p => p.id === Number(id));

  // Find category for this product
  const category = sampleCategories.find(cat => cat.name === product?.category);

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

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.errorSection}>
            <h1 style={styles.errorTitle}>Product Not Found</h1>
            <p style={styles.errorText}>The product you're looking for doesn't exist.</p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={styles.errorButton}>Back to Home</button>
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
          <Link href={category ? `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}` : '/'} style={styles.backLink}>
            ← Back to {category ? category.name : 'Home'}
          </Link>
        </header>

        {/* Product Details */}
        <section style={styles.productSection}>
          <div style={styles.productGrid}>
            {/* Product Image */}
            <div style={styles.imageSection}>
              <div style={styles.productImage}>
                <span style={styles.imagePlaceholder}>
                  {getProductIcon(product.name, category?.name || '')}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div style={styles.infoSection}>
              <div style={styles.productHeader}>
                <h1 style={styles.productTitle}>{product.name}</h1>
                <div style={styles.productMeta}>
                  <span style={styles.productPrice}>${product.price}</span>
                  <span style={styles.productBrand}>{product.brand}</span>
                </div>
              </div>

              <div style={styles.productDescription}>
                <h3 style={styles.descriptionTitle}>Description</h3>
                <p style={styles.descriptionText}>{product.description}</p>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div style={styles.tagsSection}>
                  <h3 style={styles.tagsTitle}>Tags</h3>
                  <div style={styles.tagsList}>
                    {product.tags.map((tag, index) => (
                      <span key={index} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

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
                  <span style={styles.actionText}>
                    {likedProducts.has(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                </button>
                <button 
                  style={{...styles.actionButton, ...styles.shareButton}}
                  onClick={() => shareProduct(product)}
                  title="Share product"
                >
                  📤
                  <span style={styles.actionText}>Share Product</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div style={styles.navigation}>
          {category && (
            <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
              <button style={styles.secondaryButton}>View More {category.name}</button>
            </Link>
          )}
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
    marginBottom: '32px',
  },
  backLink: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  productSection: {
    marginBottom: '40px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  imageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '400px',
    backgroundColor: '#f1f5f9',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: '120px',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  productHeader: {
    marginBottom: '8px',
  },
  productTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0 0 16px 0',
    lineHeight: '1.2',
  },
  productMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  productPrice: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#059669',
  },
  productBrand: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '600',
    backgroundColor: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '8px',
  },
  productDescription: {
    marginBottom: '8px',
  },
  descriptionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 12px 0',
  },
  descriptionText: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.6',
  },
  tagsSection: {
    marginBottom: '8px',
  },
  tagsTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 12px 0',
  },
  tagsList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  tag: {
    fontSize: '14px',
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    padding: '6px 12px',
    borderRadius: '8px',
    fontWeight: '500',
  },
  productActions: {
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  likeButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '2px solid #fecaca',
  },
  likedButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '2px solid #fecaca',
  },
  shareButton: {
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    border: '2px solid #bfdbfe',
  },
  actionText: {
    fontSize: '14px',
    fontWeight: '600',
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

