# 📱 E-Commerce Mobile App

A modern, responsive e-commerce mobile application built with React Native, featuring product browsing, category management, and a beautiful user interface optimized for mobile devices.

## ✨ Features

- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interactions
- **Product Management**: Browse products by categories with detailed product pages
- **Category System**: Organized product categorization with dedicated category pages
- **Navigation**: Smooth navigation between screens using React Navigation
- **Responsive UI**: Adaptive layouts for different screen sizes
- **Touch Interactions**: Native mobile gestures and interactions
- **TypeScript**: Full type safety and better development experience

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+ 
- **npm** 9+ or **yarn**
- **React Native CLI** (for development)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd EcommMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/emulator**

   **Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```

   **iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📱 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |

## 🏗️ Project Structure

```
EcommMobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── ProductScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── navigation/         # Navigation configuration
│   ├── data/              # Sample data and API functions
│   │   └── sampleData.ts
│   └── types/             # TypeScript type definitions
│       └── navigation.ts
├── App.tsx                 # Main app component
├── index.js               # App entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
└── metro.config.js        # Metro bundler configuration
```

## 🎯 Key Components

### **Screens**
- **HomeScreen**: Main dashboard with categories and featured products
- **CategoryScreen**: Products filtered by category
- **ProductScreen**: Detailed product information with image gallery
- **CategoriesScreen**: Browse all available categories
- **LoginScreen**: User authentication (login/signup)

### **Navigation**
- Stack-based navigation between screens
- Dynamic screen titles based on route parameters
- Smooth transitions and animations

### **Data Management**
- Sample product and category data
- Helper functions for data filtering and retrieval
- Type-safe data structures

## 🛠️ Technology Stack

- **Framework**: React Native 0.72.6
- **Language**: TypeScript 4.8.4
- **Navigation**: React Navigation 6
- **State Management**: React Hooks (useState, useCallback)
- **Styling**: React Native StyleSheet
- **Development**: Metro bundler, Babel

## 📱 Mobile-Specific Features

### **Touch Interactions**
- TouchableOpacity for button interactions
- ScrollView for scrollable content
- FlatList for optimized list rendering
- Image handling with proper sizing

### **Responsive Design**
- Dynamic dimensions using Dimensions API
- Flexible layouts with flexbox
- Platform-specific styling considerations
- Safe area handling for notches and status bars

### **Performance**
- Optimized image loading
- Efficient list rendering with FlatList
- Minimal re-renders with proper state management

## 🔧 Configuration

### **Metro Configuration**
- Optimized for React Native development
- Support for TypeScript and modern JavaScript features

### **Babel Configuration**
- React Native preset
- Reanimated plugin for smooth animations

### **TypeScript Configuration**
- Strict type checking
- React Native specific optimizations
- Path aliases for clean imports

## 📱 Platform Support

- **Android**: API level 21+ (Android 5.0+)
- **iOS**: iOS 12.0+
- **Cross-platform**: Shared codebase with platform-specific optimizations

## 🚀 Development Workflow

1. **Start development server**: `npm start`
2. **Run on device**: `npm run android` or `npm run ios`
3. **Make changes**: Edit files in `src/` directory
4. **Hot reload**: Changes automatically reflect on device
5. **Debug**: Use React Native Debugger or Chrome DevTools

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.tsx
```

## 📦 Building for Production

### **Android APK**
```bash
cd android
./gradlew assembleRelease
```

### **iOS Archive**
```bash
cd ios
xcodebuild -workspace EcommMobile.xcworkspace -scheme EcommMobile archive
```

## 🔍 Troubleshooting

### **Common Issues**

1. **Metro bundler issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean
   ```

3. **iOS build issues**
   ```bash
   cd ios && rm -rf build && pod install
   ```

### **Performance Tips**

- Use `FlatList` instead of `ScrollView` for long lists
- Optimize images with proper dimensions
- Minimize re-renders with `useCallback` and `useMemo`
- Use `React.memo` for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review React Native documentation

---

**Happy coding! 🎉** 