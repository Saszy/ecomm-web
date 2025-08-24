import { Category, Product } from '../types/product';

export const sampleCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    productCount: 8,
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Cameras']
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    productCount: 6,
    subcategories: ['Clothing', 'Shoes', 'Accessories', 'Jewelry']
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    productCount: 5,
    subcategories: ['Furniture', 'Decor', 'Garden', 'Kitchen']
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Equipment for active lifestyle',
    productCount: 4,
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga']
  },
  {
    id: 5,
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Books, magazines, and digital content',
    productCount: 3,
    subcategories: ['Fiction', 'Non-Fiction', 'Magazines']
  },
  {
    id: 6,
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Beauty products and personal care items',
    productCount: 4,
    subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Hair Care']
  },
  {
    id: 7,
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car parts and accessories',
    productCount: 3,
    subcategories: ['Parts', 'Accessories', 'Maintenance']
  },
  {
    id: 8,
    name: 'Garden & Outdoor',
    slug: 'garden-outdoor',
    description: 'Garden tools and outdoor equipment',
    productCount: 4,
    subcategories: ['Tools', 'Plants', 'Outdoor Living', 'Landscaping']
  }
];

export const sampleProducts: Product[] = [
  // Electronics (8 products)
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    category: 'Electronics',
    brand: 'Apple',
    tags: ['smartphone', 'camera', '5G', 'wireless charging'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip for ultimate performance',
    price: 1199.99,
    category: 'Electronics',
    brand: 'Apple',
    tags: ['laptop', 'ultrabook', 'M2 chip', 'retina display'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling headphones with exceptional sound quality',
    price: 399.99,
    category: 'Electronics',
    brand: 'Sony',
    tags: ['headphones', 'noise-canceling', 'bluetooth', 'premium audio'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 4,
    name: 'Canon EOS R6',
    description: 'Full-frame mirrorless camera for professional photography',
    price: 2499.99,
    category: 'Electronics',
    brand: 'Canon',
    tags: ['camera', 'mirrorless', 'full-frame', '4K video'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 5,
    name: 'iPad Air',
    description: 'Powerful tablet with M1 chip and stunning display',
    price: 599.99,
    category: 'Electronics',
    brand: 'Apple',
    tags: ['tablet', 'iPad', 'M1 chip', 'pencil support'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 6,
    name: 'Samsung Galaxy S24',
    description: 'Android flagship with AI features and stunning display',
    price: 799.99,
    category: 'Electronics',
    brand: 'Samsung',
    tags: ['smartphone', 'Android', 'AI', '5G'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 7,
    name: 'Dell XPS 13',
    description: 'Premium ultrabook with InfinityEdge display',
    price: 1299.99,
    category: 'Electronics',
    brand: 'Dell',
    tags: ['laptop', 'ultrabook', 'Windows', 'premium'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 8,
    name: 'AirPods Pro',
    description: 'Wireless earbuds with active noise cancellation',
    price: 249.99,
    category: 'Electronics',
    brand: 'Apple',
    tags: ['earbuds', 'wireless', 'noise-canceling', 'bluetooth'],
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22'
  },

  // Fashion (6 products)
  {
    id: 9,
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt with perfect fit',
    price: 29.99,
    category: 'Fashion',
    brand: 'Premium Basics',
    tags: ['t-shirt', 'cotton', 'basic', 'casual'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 10,
    name: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer',
    price: 89.99,
    category: 'Fashion',
    brand: 'Summer Style',
    tags: ['dress', 'floral', 'summer', 'casual'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 11,
    name: 'Nike Air Max Sneakers',
    description: 'Comfortable sneakers with iconic Air Max design',
    price: 129.99,
    category: 'Fashion',
    brand: 'Nike',
    tags: ['sneakers', 'athletic', 'comfortable', 'stylish'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 12,
    name: 'Premium Denim Jeans',
    description: 'High-quality denim jeans with perfect stretch',
    price: 79.99,
    category: 'Fashion',
    brand: 'Denim Co.',
    tags: ['jeans', 'denim', 'stretch', 'premium'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 13,
    name: 'Leather Jacket',
    description: 'Classic leather jacket with modern styling',
    price: 199.99,
    category: 'Fashion',
    brand: 'Leather Craft',
    tags: ['jacket', 'leather', 'classic', 'stylish'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 14,
    name: 'Silk Scarf',
    description: 'Elegant silk scarf with beautiful patterns',
    price: 49.99,
    category: 'Fashion',
    brand: 'Silk Elegance',
    tags: ['scarf', 'silk', 'elegant', 'accessory'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },

  // Home & Garden (5 products)
  {
    id: 15,
    name: 'Modern Coffee Table',
    description: 'Sleek coffee table with storage shelf',
    price: 299.99,
    category: 'Home & Garden',
    brand: 'Modern Home',
    tags: ['furniture', 'coffee table', 'modern', 'storage'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 16,
    name: 'LED Floor Lamp',
    description: 'Adjustable LED lamp with warm lighting',
    price: 89.99,
    category: 'Home & Garden',
    brand: 'Light Co.',
    tags: ['lamp', 'LED', 'adjustable', 'modern'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 17,
    name: 'Indoor Plant Set',
    description: 'Set of 3 low-maintenance indoor plants',
    price: 59.99,
    category: 'Home & Garden',
    brand: 'Green Thumb',
    tags: ['plants', 'indoor', 'low-maintenance', 'decor'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 18,
    name: 'Non-Stick Cookware Set',
    description: 'Complete cookware set with non-stick coating',
    price: 199.99,
    category: 'Home & Garden',
    brand: 'Kitchen Pro',
    tags: ['cookware', 'non-stick', 'kitchen', 'complete set'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 19,
    name: 'Garden Tool Set',
    description: 'Essential garden tools for every gardener',
    price: 79.99,
    category: 'Home & Garden',
    brand: 'Garden Master',
    tags: ['garden', 'tools', 'essential', 'durable'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },

  // Sports & Fitness (4 products)
  {
    id: 20,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap',
    price: 39.99,
    category: 'Sports & Fitness',
    brand: 'Yoga Life',
    tags: ['yoga', 'mat', 'non-slip', 'premium'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 21,
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set for home workouts',
    price: 149.99,
    category: 'Sports & Fitness',
    brand: 'Fitness Pro',
    tags: ['dumbbells', 'fitness', 'adjustable', 'home gym'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 22,
    name: 'Basketball',
    description: 'Official size basketball for indoor/outdoor use',
    price: 29.99,
    category: 'Sports & Fitness',
    brand: 'Sports Co.',
    tags: ['basketball', 'sports', 'official size', 'durable'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 23,
    name: 'Tennis Racket',
    description: 'Professional tennis racket with premium grip',
    price: 89.99,
    category: 'Sports & Fitness',
    brand: 'Tennis Pro',
    tags: ['tennis', 'racket', 'professional', 'premium grip'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },

  // Books & Media (3 products)
  {
    id: 24,
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'Books & Media',
    brand: 'Classic Books',
    tags: ['novel', 'classic', 'fiction', 'literature'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 25,
    name: 'Cooking Masterclass',
    description: 'Comprehensive cookbook with 500+ recipes',
    price: 34.99,
    category: 'Books & Media',
    brand: 'Culinary Arts',
    tags: ['cookbook', 'recipes', 'cooking', 'comprehensive'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 26,
    name: 'Tech Magazine',
    description: 'Monthly technology magazine with latest trends',
    price: 8.99,
    category: 'Books & Media',
    brand: 'Tech Media',
    tags: ['magazine', 'technology', 'monthly', 'trends'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },

  // Beauty & Personal Care (4 products)
  {
    id: 27,
    name: 'Anti-Aging Cream',
    description: 'Advanced anti-aging formula with retinol',
    price: 79.99,
    category: 'Beauty & Personal Care',
    brand: 'Beauty Science',
    tags: ['skincare', 'anti-aging', 'retinol', 'premium'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 28,
    name: 'Matte Lipstick Set',
    description: 'Set of 6 long-lasting matte lipsticks',
    price: 49.99,
    category: 'Beauty & Personal Care',
    brand: 'Color Cosmetics',
    tags: ['lipstick', 'matte', 'long-lasting', 'set'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 29,
    name: 'Luxury Perfume',
    description: 'Exclusive fragrance with notes of jasmine and vanilla',
    price: 129.99,
    category: 'Beauty & Personal Care',
    brand: 'Luxury Scents',
    tags: ['perfume', 'luxury', 'fragrance', 'exclusive'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 30,
    name: 'Hair Care Kit',
    description: 'Complete hair care set for all hair types',
    price: 69.99,
    category: 'Beauty & Personal Care',
    brand: 'Hair Essentials',
    tags: ['hair care', 'complete set', 'all hair types', 'nourishing'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },

  // Automotive (3 products)
  {
    id: 31,
    name: 'Car Phone Mount',
    description: 'Universal phone holder for dashboard',
    price: 24.99,
    category: 'Automotive',
    brand: 'Auto Accessories',
    tags: ['phone mount', 'car', 'universal', 'dashboard'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 32,
    name: 'LED Headlight Bulbs',
    description: 'Bright LED replacement bulbs for better visibility',
    price: 89.99,
    category: 'Automotive',
    brand: 'Auto Lighting',
    tags: ['headlights', 'LED', 'bright', 'replacement'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 33,
    name: 'Car Wash Kit',
    description: 'Professional car washing and detailing kit',
    price: 59.99,
    category: 'Automotive',
    brand: 'Auto Care',
    tags: ['car wash', 'detailing', 'professional', 'complete kit'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },

  // Garden & Outdoor (4 products)
  {
    id: 34,
    name: 'Garden Hose',
    description: 'Heavy-duty garden hose with spray nozzle',
    price: 39.99,
    category: 'Garden & Outdoor',
    brand: 'Garden Tools',
    tags: ['garden hose', 'heavy-duty', 'spray nozzle', 'durable'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 35,
    name: 'Outdoor Patio Set',
    description: 'Comfortable patio furniture for outdoor living',
    price: 299.99,
    category: 'Garden & Outdoor',
    brand: 'Outdoor Living',
    tags: ['patio furniture', 'outdoor', 'comfortable', 'durable'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 36,
    name: 'Solar Garden Lights',
    description: 'Solar-powered lights for garden pathways',
    price: 49.99,
    category: 'Garden & Outdoor',
    brand: 'Solar Lighting',
    tags: ['garden lights', 'solar-powered', 'pathway', 'eco-friendly'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 37,
    name: 'Bird Feeder',
    description: 'Attractive bird feeder to attract garden birds',
    price: 29.99,
    category: 'Garden & Outdoor',
    brand: 'Wildlife Garden',
    tags: ['bird feeder', 'wildlife', 'garden', 'attractive'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
];

export const getProductsByCategory = (categoryName: string): Product[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

export const getProductById = (productId: string): Product | undefined => {
  return sampleProducts.find(product => product.id === productId);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return sampleCategories.find(category => 
    category.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  );
}; 