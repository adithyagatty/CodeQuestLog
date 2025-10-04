# Design Guidelines: CodeTrack PWA

## Design Approach

**System-Based with Linear/Notion Inspiration**  
Utility-focused productivity app requiring clean data visualization, intuitive interactions, and persistent dark mode. Drawing from Linear's typography and spatial rhythm combined with Notion's organizational clarity.

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (default and only mode)
- Background Base: 220 20% 8%
- Surface Elevated: 220 18% 12%
- Surface Interactive: 220 16% 16%
- Border Subtle: 220 14% 20%
- Border Interactive: 220 12% 28%

**Text Colors**
- Primary Text: 220 8% 95%
- Secondary Text: 220 8% 70%
- Tertiary/Muted: 220 8% 50%

**Accent Colors**
- Primary Action: 210 100% 58% (vibrant blue for CTAs, active states)
- Success/Easy: 142 76% 45% (green for easy problems)
- Warning/Medium: 38 92% 58% (amber for medium problems)
- Critical/Hard: 0 84% 60% (red for hard problems)
- Timer Active: 270 70% 60% (purple for running timer)

**Data Visualization**
- Chart Colors: Use primary action blue with opacity variations (50%, 70%, 100%)
- Progress bars: Gradient from primary action to lighter variant

### B. Typography

**Font Stack**  
Primary: 'Inter' from Google Fonts  
Monospace: 'JetBrains Mono' for counters and timer display

**Hierarchy**
- Dashboard Title: 32px (text-3xl), 600 weight, tight tracking
- Section Headers: 20px (text-xl), 600 weight
- Card Titles: 16px (text-base), 500 weight
- Body/Labels: 14px (text-sm), 400 weight
- Timer Display: 48px (text-5xl), 700 weight, monospace
- Counter Numbers: 24px (text-2xl), 600 weight, monospace

### C. Layout System

**Spacing Primitives**  
Use Tailwind units: **2, 4, 6, 8, 12, 16, 24** for consistent rhythm

- Component Padding: p-6 or p-8 for cards
- Section Spacing: gap-6 between cards, gap-8 between major sections
- Grid Gaps: gap-4 for dense grids, gap-6 for spacious layouts
- Icon Spacing: gap-2 for icon + text combos

**Responsive Grid**
- Mobile: Single column, full width with px-4 container padding
- Tablet (md:): 2-column grid for data structure cards
- Desktop (lg:): 3-column grid, max-width container (max-w-7xl)

### D. Component Library

**Dashboard Header**
- Full-width bar with gradient overlay (from background to transparent)
- Left: App logo/icon + "CodeTrack" title
- Center: Current streak count with flame icon
- Right: Total problems solved counter
- Height: h-16, sticky positioning

**Data Structure Cards**
- Rounded corners: rounded-xl
- Background: Surface Elevated color
- Border: 1px solid Border Subtle
- Hover state: Border changes to Border Interactive, subtle lift (shadow-lg)
- Layout: Title at top, 3-column grid below (Easy/Medium/Hard)
- Each difficulty: Large counter number, +/- buttons, label below
- Icon for each data structure (use Heroicons)

**Counter Buttons**
- Size: 40px × 40px (w-10 h-10)
- Shape: Rounded-lg
- Style: Background Surface Interactive, hover brightens
- Icons: Plus/Minus from Heroicons
- Active state: Scale down slightly (scale-95)

**Timer Component**
- Centered card, larger than data structure cards
- Timer presets as pill-shaped buttons (20/30/45/60 min)
- Large monospace display for countdown
- Circle progress indicator around timer (SVG stroke)
- Session counter below: "Session 3 of continuous practice"
- Start/Pause/Reset buttons with clear visual states
- Running state: Border pulses with Timer Active color

**Progress Analytics Section**
- Full-width section with dark background card
- Top metrics row: Total solved, Current streak, Best streak, Avg/day
- Chart area: Bar chart showing daily activity (last 30 days)
- Heatmap calendar view (GitHub contribution style)
- Topic breakdown: Horizontal bar chart showing distribution across data structures
- Insights panel: AI-generated suggestions ("Focus on Trees - only 12% solved")

**Navigation/Tabs**
- Sticky tab bar below header
- Tabs: Dashboard | Timer | Progress | History
- Active tab: Primary Action color underline, bold text
- Inactive: Secondary Text color

**History List**
- Table view with columns: Date/Time | Topic | Difficulty | Duration
- Alternating row background (subtle)
- Sortable headers
- Filter chips at top (by topic, by difficulty, by date range)

**Empty States**
- Centered content with icon
- Message: "Start solving to see your progress!"
- Subtle animation on icon

### E. Interactions & Micro-animations

**Minimize Animations** - Only where functionally helpful:

- Counter increment: Number scales up briefly (scale-110 for 150ms)
- Card hover: Smooth border transition (transition-colors duration-200)
- Button press: Scale feedback (active:scale-95)
- Timer progress: Smooth stroke animation
- Chart bars: Animate height on load (stagger 50ms each)

**NO gratuitous animations**: No floating elements, no parallax, no complex scroll effects

---

## Images

**No hero images** - This is a utility app focused on data and functionality.

**Icons Only**
- Data structure icons from Heroicons (outline style)
- Trophy/flame icons for achievements
- Chart icons for analytics section
- All icons: 24px size, Secondary Text color, hover to Primary Text

---

## Special Considerations

**Touch Targets**  
All interactive elements minimum 44px × 44px for mobile usability

**Data Density**  
Embrace information density on desktop - users want to see their data  
Mobile: Prioritize most important metrics, allow scrolling for details

**Offline Functionality**  
Visual indicator when offline (small dot in header)  
All data persists locally, syncs when online

**Performance**  
Instant counter updates (no loading states)  
Lazy load analytics charts
Minimize re-renders with proper state management

**Accessibility**  
High contrast maintained in dark mode (WCAG AAA)  
All interactive elements keyboard accessible  
Screen reader labels for all counters and charts  
Focus indicators: 2px solid Primary Action color with offset