# 🛍️ E-Commerce Web App

A modern, cross-platform e-commerce application built with **React Native Web** and **Next.js**, featuring product browsing, category management, user authentication, and a beautiful responsive interface that works on web, Android, and iOS.

## ✨ Features

- **🌐 Cross-Platform**: Single codebase for Web, Android, and iOS
- **🔐 User Authentication**: Username-based login with persistent sessions
- **🛍️ Product Catalog**: Browse products by categories with dynamic routing
- **❤️ Like & Share**: Heart icons for favorites and share functionality
- **📱 Responsive Design**: Modern UI that works on all screen sizes
- **🎨 Dynamic Icons**: Smart emoji icons based on product/category names
- **⚡ Fast Performance**: Next.js optimization with React Native Web
- **🔒 Type Safety**: Full TypeScript support throughout the application

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+ 
- **npm** 9+ or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saszy/ecomm-web.git
   cd ecomm-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run web
   # or
   yarn web
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run web` | Start Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |

## 🏗️ Project Structure

```
ecomm-web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── home/           # Home page components
│   │   ├── layout/         # Layout components
│   │   └── products/       # Product-related components
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx # Authentication state management
│   ├── data/               # Sample data and API functions
│   │   └── sampleData.ts   # Product and category data
│   ├── pages/              # Next.js pages (file-based routing)
│   │   ├── _app.tsx        # Custom App component
│   │   ├── _document.tsx   # Custom Document component
│   │   ├── index.tsx       # Home page
│   │   ├── login.tsx       # Login page
│   │   ├── categories.tsx  # Categories listing
│   │   ├── category/       # Dynamic category routes
│   │   │   └── [slug].tsx  # Category detail page
│   │   └── product/        # Dynamic product routes
│   │       └── [id].tsx    # Product detail page
│   ├── screens/            # React Native screen components
│   ├── styles/             # Global styles
│   │   └── globals.css     # Global CSS
│   └── types/              # TypeScript type definitions
│       ├── navigation.ts   # Navigation types
│       └── product.ts      # Product and category types
├── App.tsx                 # React Native main app component
├── index.js               # React Native entry point
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration for React Native
└── metro.config.js        # Metro bundler configuration
```

## 🎯 Key Features

### **User Authentication**
- **Login System**: Username-based authentication (no password required)
- **Session Management**: Persistent login state with localStorage
- **User Header**: Personalized welcome message with logout functionality
- **Protected Routes**: Automatic redirects for authenticated users

### **Product Management**
- **Smart Icons**: Dynamic emoji icons based on product names and categories
- **Category System**: 8 main categories with subcategories
- **Product Details**: Rich product information with tags and descriptions
- **Like & Share**: Heart icons for favorites and share functionality

### **Navigation & Routing**
- **File-based Routing**: Next.js automatic route generation
- **Dynamic Routes**: `/category/[slug]` and `/product/[id]` pages
- **Breadcrumb Navigation**: Easy navigation between pages
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.5.0
- **Cross-Platform**: React Native Web
- **Language**: TypeScript 5.0+
- **Styling**: Inline CSS with modern design patterns
- **State Management**: React Context API + Hooks
- **Authentication**: Custom AuthContext with localStorage
- **Build Tools**: Babel, Metro bundler
- **Package Manager**: npm

## 🌐 Web Development

### **Next.js Features**
- File-based routing system
- Server-side rendering capabilities
- Automatic code splitting
- Hot reloading for development
- Production build optimization

### **React Native Web**
- Native mobile components on web
- Touch interactions and gestures
- Responsive mobile-first design
- Cross-platform component library

## 📱 Mobile Development

### **React Native Setup**
- Metro bundler configuration
- Babel configuration for React Native
- Platform-specific optimizations
- Native navigation support

### **Cross-Platform Benefits**
- Single codebase for all platforms
- Consistent UI/UX across devices
- Shared business logic
- Platform-specific enhancements

## 🔧 Configuration

### **Next.js Configuration**
```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    // React Native Web support
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };
    return config;
  },
};
```

### **TypeScript Configuration**
- Strict type checking enabled
- React Native Web types included
- Path aliases for clean imports
- Modern ES6+ features support

## 🚀 Development Workflow

1. **Start development server**: `npm run web`
2. **Make changes**: Edit files in `src/` directory
3. **Hot reload**: Changes automatically reflect in browser
4. **Test on mobile**: Use `npm run android` or `npm run ios`
5. **Build for production**: `npm run build`

## 📦 Building for Production

### **Web Build**
```bash
npm run build
npm run start
```

### **Mobile Builds**
```bash
# Android
npm run android

# iOS
npm run ios
```

## 🔍 Troubleshooting

### **Common Issues**

1. **Port already in use**
   ```bash
   # Kill existing processes
   pkill -f "next dev"
   npm run web
   ```

2. **Build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install
   npm run web
   ```

3. **TypeScript errors**
   ```bash
   # Check for type issues
   npx tsc --noEmit
   ```

### **Performance Tips**

- Use React.memo for expensive components
- Optimize images with proper dimensions
- Implement lazy loading for large lists
- Use proper key props for list items

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the [GitHub repository](https://github.com/Saszy/ecomm-web)
- Check the troubleshooting section above
- Review Next.js and React Native Web documentation

## 🌟 What's Next?

- [ ] Shopping cart functionality
- [ ] User profiles and preferences
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Multi-language support

---

**Happy coding! 🎉**

*Built with ❤️ using React Native Web + Next.js* 