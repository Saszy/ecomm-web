'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { sampleCategories } from '@/data/sampleData'

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products organized into convenient categories. 
            Find exactly what you're looking for with ease.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {/* Category Image */}
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 mb-3 opacity-90">
                      {category.description}
                    </p>
                    
                    {/* Product Count & Subcategories */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        {category.productCount} Products
                      </span>
                      
                      {/* Subcategories Preview */}
                      {category.subcategories && (
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.slice(0, 2).map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary-600/80 px-2 py-1 rounded-full"
                            >
                              {sub}
                            </span>
                          ))}
                          {category.subcategories.length > 2 && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                              +{category.subcategories.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary-600 text-white p-2 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-3 border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors duration-200 group"
          >
            View All Categories
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 