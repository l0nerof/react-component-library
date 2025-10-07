# React Component Library

A modern React component library built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Storybook.

## 📦 Tech Stack

- **React 19** - Latest version of React
- **Next.js 15** - React framework
- **TypeScript** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework
- **Storybook** - Component development and documentation tool
- **Vitest** - Testing framework
- **Lucide React** - Icon library
- **clsx + tailwind-merge** - Class name utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd react-component-library
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Available Scripts

#### Development

```bash
# Run Next.js in development mode
npm run dev

# Run Storybook (recommended for component development)
npm run storybook
```

Storybook will be available at `http://localhost:6006`

#### Production

```bash
# Build Next.js application
npm run build

# Run production server
npm run start

# Build Storybook
npm run build-storybook
```

#### Other Commands

```bash
# Run linter
npm run lint
```

## 📚 Components

### Input

Universal input field component with support for various types, validation, and additional features.

<img width="3584" height="1898" alt="Input Component" src="https://github.com/user-attachments/assets/e174b2ca-d735-4d13-b0e1-af7e7590d52f" />

**Features:**

- 📝 Type support: text, password, number, email, tel
- 👁️ Password visibility toggle
- ❌ Clearable button
- 🏷️ Label and error messages
- ♿ Full accessibility support
- 🎨 Multiple states: default, focus, error, disabled
- 🔄 Controlled and uncontrolled modes

**Usage:**

```tsx
import Input from "@/components/Input";

// Basic usage
<Input placeholder="Enter text..." />

// With label and error
<Input
  label="Email"
  type="email"
  error="Invalid email format"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Password with visibility toggle
<Input
  type="password"
  placeholder="Password"
  clearable
/>
```

**Props:**

- `type` - input type (text, password, number, email, tel)
- `clearable` - show clear button
- `placeholder` - placeholder text
- `value` - value (for controlled mode)
- `onChange` - change handler
- `disabled` - disabled state
- `label` - label for the input
- `error` - error text
- `className` - additional CSS classes

---

### Toast

Notification component with support for different types, animations, and auto-dismiss.

<img width="3584" height="1902" alt="Toast Component" src="https://github.com/user-attachments/assets/b34b068c-5710-4bd9-b119-8093007a3d7f" />

**Features:**

- ✅ Types: success, error, warning, info
- 🎨 Icons and color indication for each type
- ⏱️ Auto-dismiss with configurable duration
- ❌ Option to disable close button
- 🎭 Smooth enter/exit animations
- 📝 Support for title and description
- ♿ ARIA attributes for accessibility

**Usage:**

```tsx
import Toast from "@/components/Toast";
import ToastContainer from "@/components/ToastContainer";

// In component
<Toast
  type="success"
  message="Successfully saved!"
  description="Your changes have been saved"
  duration={3000}
  closable={true}
  onClose={() => console.log("Toast closed")}
/>

// With ToastContainer to manage multiple toasts
<ToastContainer>
  {/* Your toast notifications */}
</ToastContainer>
```

**Props:**

- `type` - notification type (success, error, warning, info)
- `message` - main message (required)
- `description` - additional description
- `duration` - display time in milliseconds (0 = no auto-dismiss)
- `closable` - show close button
- `onClose` - callback on close
- `className` - additional CSS classes

---

### SidebarMenu

Responsive sidebar menu with support for nested items, animations, and keyboard navigation.

<img width="3584" height="1902" alt="SidebarMenu Component" src="https://github.com/user-attachments/assets/347f3218-c594-41ce-bb10-547b03076ee6" />

**Features:**

- 🎨 Backdrop overlay with animation
- 🌳 Nested menus with unlimited depth
- 🔽 Animated expand/collapse for submenus
- ⌨️ Keyboard navigation (Escape to close)
- 🔒 Body scroll lock when open
- 🖼️ Icon support for menu items
- 🎭 Smooth open/close animations
- ♿ ARIA attributes and semantic HTML

**Usage:**

```tsx
import SidebarMenu from "@/components/SidebarMenu";
import { Home, Settings, User } from "lucide-react";

const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "profile",
        label: "Profile",
        icon: <User size={16} />,
        onClick: () => console.log("Profile clicked"),
      },
    ],
  },
];

// In component
<SidebarMenu
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  items={menuItems}
  title="Menu"
/>;
```

**Props:**

- `isOpen` - whether the menu is open (required)
- `onClose` - callback to close the menu (required)
- `items` - array of menu items (required)
- `title` - menu title
- `className` - additional CSS classes

**MenuItem Interface:**

```typescript
interface MenuItem {
  id: string; // Unique identifier
  label: string; // Menu item text
  icon?: React.ReactNode; // Icon (optional)
  href?: string; // Link (optional)
  onClick?: () => void; // Click handler (optional)
  children?: MenuItem[]; // Nested items (optional)
}
```

---

### ToastContainer

Container for managing and displaying multiple toast notifications.

**Usage:**

```tsx
import ToastContainer from "@/components/ToastContainer";

<ToastContainer>
  {/* Automatic toast notification positioning */}
</ToastContainer>;
```

## 🎨 Styling

All components use Tailwind CSS and can be customized through:

- `className` prop for adding custom classes
- Modifying Tailwind configuration
- CSS variables for global settings

## 🛠️ Utilities

### cn (className utility)

Utility for combining classes with support for conditional classes and Tailwind class deduplication.

```tsx
import cn from "@/utils/cn";

<div
  className={cn(
    "base-class",
    condition && "conditional-class",
    "text-blue-500",
  )}
/>;
```

## 📖 Storybook

Each component has stories with usage examples and interactive controls.

Run Storybook:

```bash
npm run storybook
```

Stories include:

- All component variants
- Interactive controls for props
- Usage documentation
- A11y checks

## 🧪 Testing

The project uses Vitest for component testing.

```bash
# Run tests
npm run test

# Tests with coverage
npm run test:coverage
```

## 📝 Code Standards

- **TypeScript** - Strict typing for all components
- **ESLint** - For code quality assurance
- **Prettier** - For code formatting
- **Accessibility** - All components have ARIA attributes

## 🤝 Contributing

To add new components:

1. Create a component in `src/components/[ComponentName]/index.tsx`
2. Add TypeScript interfaces for props
3. Create stories in `src/stories/[ComponentName]/`
4. Add tests (if necessary)
5. Update README.md

## 👥 Author

Volodymyr Bondar
