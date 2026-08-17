# KaroOnline - Mobile Dashboard & Views

A high-fidelity React Native (Expo) mobile application implementing a fluid split-view dashboard: **Map View** and **Content View**, equipped with dynamic bottom drawers (slide-up overlays) for location selection, city directory browsing, search radius configurations, quick links, and sharing rewards.

---

## 🛠️ Setup & Installation

Follow these steps to run the application locally:

### 1. Prerequisites
Ensure you have **Node.js** and **Expo CLI** installed.

### 2. Installation
Install the necessary React Native & Expo packages:

```bash
# Clone the repository (or navigate to your root directory)
cd Karo_Online

# Install standard dependencies
npm install

# Install specific required Expo modules
npx expo install react-native-safe-area-context expo-linear-gradient @expo/vector-icons expo-status-bar
```

### 3. Running the App
Start the Metro bundler to run the application in an emulator or web preview:

```bash
# Start Metro bundler
npm start

# Or specifically run on web
npm run web
```

---

## 📊 Design & Implementation Flowchart

Here is the flowchart representing the views, user interactions, and drawer overlay state routing in `HomeScreen.js`:

```mermaid
graph TD
    %% Base Entry Point
    A[App.js] --> B[HomeScreen.js]
    
    %% View Toggling
    B -->|selectedView state| C{selectedView}
    C -->|'map'| D[Map View Dashboard Layout]
    C -->|'content'| E[Content View Split-Map Layout]
    
    %% Map View Layout Parts
    D --> D1[Header.js - Top Profile & Location]
    D --> D2[BannerCarousel.js - Sliding Banners]
    D --> D3[PillSelector.js - View Switcher]
    D --> D4[ServiceIcon.js - Persistent Category Ribbon]
    
    %% Content View Layout Parts
    E --> E1[ContentViewHeader.js - Top Split-Map]
    E1 -->|Contains| E2[Inline Transparent Services Ribbon]
    E1 -->|Contains| E3[View Switcher]
    E --> E4[Standalone Refer & Earn Button]
    
    %% Shared Scrolling Lists
    D --> F[Common ScrollView content]
    E --> F
    F --> F1[VideoCard.js - Recommended Videos]
    F --> F2[VendorCard.js - Recommended for You]
    F --> F3[AllCategories.js - Categories Grid]
    
    %% Location Selection Triggers
    D1 -->|Clicks Location Dropdown| LocTrigger[onOpenLocation]
    E1 -->|Clicks Location Dropdown| LocTrigger
    LocTrigger --> LocDrawer[ChooseLocationModal.js]
    
    %% Inside Location Drawer
    LocDrawer -->|Clicks City Pill| CityTrigger[onOpenCity]
    LocDrawer -->|Clicks Distance Pill| DistTrigger[onOpenDistance]
    
    CityTrigger --> CityDrawer[CityModal.js - Pick a City]
    DistTrigger --> DistDrawer[DistanceModal.js - Search Radius]
    
    %% Bottom Bar & Quick Menu
    B --> BottomBar[BottomBar.js - Persistent Orange Bar]
    BottomBar -->|Clicks Center Pill| QuickMenuTrigger[onOpenQuickMenu]
    QuickMenuTrigger --> QuickMenu[DigitalShopeModal.js - Quick Menu]
    
    %% Refer & Earn Triggers
    D4 -->|Clicks Refer Pill| ReferTrigger[onOpenRefer]
    E4 -->|Clicks Refer Button| ReferTrigger
    ReferTrigger --> ReferDrawer[ReferModal.js - Share & Earn]
    
    %% Hiding Rules
    ReferDrawer -->|When Open| HideBottom[Hides BottomBar & Services Ribbon]
    QuickMenu -->|When Open| HideBottom
    LocDrawer -->|When Open| HideRibbonOnly[Hides Left Categories scrollbar only, keeping Refer pill]
    CityDrawer -->|When Open| HideRibbonOnly
    DistDrawer -->|When Open| HideRibbonOnly
```

---

## 📂 Project Structure Map

Here is a map of the file layout created for the implementation:

```text
Karo_Online/
├── src/
│   ├── theme/
│   │   └── colors.js                 # Branding color tokens (Primary Orange, Cream Background)
│   ├── constants/
│   │   └── data.js                   # Mock data, cartoon icons Twemoji URLs, fallback emojis
│   ├── components/
│   │   ├── Header.js                 # Standard Header with Profile & Location selector
│   │   ├── BannerCarousel.js         # Auto-scrolling horizontal banner cards
│   │   ├── PillSelector.js           # Floating View Switcher pill (Content / Map)
│   │   ├── VideoCard.js              # Video card layout with duration and tailors info
│   │   ├── VendorCard.js             # Vendor card supporting text emojis & cartoon graphic modes
│   │   ├── AllCategories.js          # Categories Grid (4 columns percentage-based)
│   │   ├── ServiceIcon.js            # Floating categories ribbon bar (supports transparent/floating/hiding modes)
│   │   ├── CategoriesModal.js         # Slide-up All Categories drawer (height limited to 65% of screen)
│   │   ├── BottomBar.js              # Orange custom bottom navigation bar
│   │   ├── ChooseLocationModal.js    # Legacy location drawer refactored under search folder
│   │   ├── ContentView/
│   │   │   └── ContentViewHeader.js  # Top split-map header containing inline categories ribbon
│   │   ├── digitalShope/
│   │   │   └── digitalShope.js       # Quick Menu drawer modal (contains horizontal scrollable list of 5 apps)
│   │   ├── Refer/
│   │   │   └── Refer.js              # Refer & Earn drawer modal (QR, Sharing action buttons, Wallet link)
│   │   ├── search/
│   │   │   └── ChooseLocationModal.js # Refactored Location drawer (City & distance triggers)
│   │   └── city/
│   │       ├── city.js               # Pick a City modal drawer grid
│   │       └── distance.js           # Search Radius drawer modal grid
│   └── screens/
│       └── HomeScreen.js             # Root page coordinating modal toggles & lifted states
└── App.js                            # Injects Metro root HTML/Body reset styles on web
```

---

## ⚙️ Key State Management

### 1. View Toggling (`selectedView`)
Maintained inside `HomeScreen.js`. Toggles between standard Map Dashboard (`'map'`) and Split-Screen layout (`'content'`).

### 2. Search Radius Lifting (`selectedRadius`)
Lifeted up to `HomeScreen.js` (`const [selectedRadius, setSelectedRadius] = useState(2)`). 
- Modifying a radius option in `DistanceModal` updates the root state.
- Updates the blue pill inside `ChooseLocationModal` dynamically (`{selectedRadius} km`), resolving any mismatch errors.

### 3. Drawer Visibility Triggers
All drawer models render at the root level of `HomeScreen.js` to ensure proper `zIndex` layering:
- `categoriesModalVisible`
- `quickMenuVisible`
- `referModalVisible`
- `locationModalVisible`
- `cityModalVisible`
- `distanceModalVisible`
