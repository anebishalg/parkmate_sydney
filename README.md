# ParkMate Sydney 🚗

**Smart Parking Finder for Sydney Drivers**

ParkMate Sydney is a comprehensive mobile application designed to help Sydney drivers find legal parking spots, avoid costly fines, and navigate the city's complex parking regulations with confidence.

## 🎯 Problem Statement

Sydney drivers face significant challenges:
- **Time waste**: Circling blocks looking for legal parking
- **Financial risk**: Parking fines ranging from $200-$400
- **Complex rules**: T-section 10m rule, school zones, clearway times
- **Limited information**: No real-time parking availability data

## 💡 Solution

ParkMate Sydney provides:
- **Real-time parking availability** with crowd-sourced updates
- **Smart alerts** for parking rules and restrictions
- **Interactive map** showing legal parking spots
- **Community reporting** for accurate, up-to-date information
- **Sydney-specific regulations** built into the app

## 🚀 Features

### 📍 Interactive Map
- Real-time parking spot availability
- Color-coded indicators (Available/Limited/Full)
- Distance and walking time to spots
- Pricing and time limit information

### 🔍 Smart Search
- Location-based search with autocomplete
- Popular destinations and landmarks
- Recent searches and favorites
- Quick action filters (CBD, Stations, Hospitals, Shopping)

### 🔔 Intelligent Alerts
- **T-Section Rule**: 10m parking restriction warnings
- **School Zones**: Active time notifications
- **Meter Expiry**: Countdown reminders
- **Construction**: Temporary parking changes
- **Peak Hours**: Clearway and restriction alerts

### 👤 User Profile
- Parking session history
- Fines avoided counter
- Spending analytics
- Saved favorite locations

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based architecture
- **Icons**: Lucide React Native
- **Styling**: StyleSheet with responsive design
- **Platform**: Cross-platform (iOS, Android, Web)

## 📱 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parkmate-sydney
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   - Scan QR code with Expo Go app (mobile)
   - Press 'w' to open in web browser
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## 📂 Project Structure

```
parkmate-sydney/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Map screen (home)
│   │   ├── search.tsx     # Search functionality
│   │   ├── alerts.tsx     # Parking alerts & settings
│   │   ├── profile.tsx    # User profile & history
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── hooks/                 # Custom React hooks
├── assets/                # Images and static assets
└── components/            # Reusable UI components
```

## 🎨 Design System

### Color Palette
- **Primary**: Sydney Harbor Blue (#1E88E5)
- **Secondary**: Sunset Orange (#FF9800)
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Error**: Red (#F44336)
- **Background**: Light Gray (#F8F9FA)

### Typography
- **Headers**: 700 weight, clear hierarchy
- **Body**: 400-500 weight, 16px base size
- **Captions**: 14px, muted colors

### Spacing
- **Base unit**: 8px
- **Consistent margins**: 16px, 20px
- **Card padding**: 16px
- **Section spacing**: 32px

## 🗺️ Sydney-Specific Features

### Parking Rules Integration
- **T-Section Rule**: 10-meter restriction enforcement
- **School Zones**: Time-based parking restrictions
- **Clearways**: Peak hour no-parking zones
- **Loading Zones**: Commercial vehicle restrictions
- **Meter Zones**: Council parking meter integration

### Location Coverage
- **Sydney CBD**: Full street-level coverage
- **North Strathfield**: Station and residential areas
- **Parramatta**: CBD and surrounding suburbs
- **Major Landmarks**: Opera House, Harbour Bridge, etc.

## 📊 App Screens

### 1. Map Screen (Home)
- Interactive map with parking spot markers
- Real-time availability indicators
- Quick stats dashboard
- Nearby parking recommendations

### 2. Search Screen
- Location search with autocomplete
- Recent searches and popular destinations
- Quick action categories
- Filter options for parking type

### 3. Alerts Screen
- Active parking alerts and warnings
- Notification settings management
- Alert history and status
- Customizable alert preferences

### 4. Profile Screen
- User statistics and achievements
- Parking session history
- Payment and vehicle management
- App settings and preferences

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build:web` - Build for web deployment
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Modular component architecture

## 🚀 Deployment

The app supports multiple deployment targets:
- **Web**: Static site generation
- **iOS**: App Store distribution
- **Android**: Google Play Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and feedback:
- Create an issue on GitHub
- Contact: support@parkmate.sydney
- Documentation: [docs.parkmate.sydney](https://docs.parkmate.sydney)

## 🙏 Acknowledgments

- Sydney City Council for parking regulation data
- NSW Transport for public transport integration
- Community contributors for crowd-sourced updates

---

**Made with ❤️ for Sydney drivers**

*Helping you park smart, save money, and avoid fines in beautiful Sydney.*