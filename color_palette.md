# Color Palette Analysis Report

## Overview
The project uses `oklch` color space for modern, vibrant colors with standard hex fallbacks for compatibility. The system is built on Tailwind CSS with CSS variables, integrated with `shadcn/ui`.

## 1. Primary Palette (Brand Colors)
**Role**: The core brand color, used for main actions, highlights, and branding.

| Mode | Variable | Value (OKLCH) | Fallback (Hex) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--primary` | `oklch(0.74 0.16 75)` | `#c5a035` | Rich Gold |
| | `--primary-foreground` | `oklch(0 0 0)` | `#000000` | Black text |
| **Dark** | `--primary` | `oklch(0.74 0.16 75)` | `#d4af37` | Rich Gold (Glowing) |
| | `--primary-foreground` | `oklch(0.1 0.02 80)` | `#000000` | Dark text on gold |

**Common Usage:**
- **Buttons**: Main Call-to-Action buttons (default variant).
- **Badges**: Highlights and tags.
- **Icons**: Key icons in `Hero`, `Why-Choose-Oskaz`, `Innovation-Section`, and `Products-Dropdown` (e.g., Star, CheckCircle, Users).
- **Text Highlights**: "Why Choose Oskaz®" trademark symbol, active filters in generic headers.
- **Backgrounds (Subtle)**: Used with opacity (`bg-primary/10`, `bg-primary/20`) for section backgrounds in `Hero`, `Testimonials`, and `Get-Started`.
- **Gradients**: Used in product card placeholders (`from-primary/20`).
- **Selection**: Text selection highlight.

## 2. Secondary Palette
**Role**: Supporting color, often used for alternative actions or subtle backgrounds.

| Mode | Variable | Value (OKLCH) | Fallback (Hex) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--secondary` | `oklch(0.96 0.03 85)` | `#f6f3ea` | Subtle Champagne/Sand |
| | `--secondary-foreground` | `oklch(0.2 0.04 80)` | `#111827` | Dark Grey |
| **Dark** | `--secondary` | `oklch(0.18 0.04 75)` | `#2a2620` | Dark Metallic |
| | `--secondary-foreground` | `oklch(0.95 0.02 85)` | `#f8f6f3` | Platinum White |

**Common Usage:**
- **Buttons**: Secondary action buttons (`variant="secondary"`).
- **Badges**: Secondary badges.
- **Close Buttons**: Sheet/Modal close buttons.
- **Backgrounds**: Used as an alternative subtle background in `Hero` and `Testimonials` (often `bg-secondary/10` or `/20`).
- **Gradients**: Secondary stop in product card placeholders (`to-secondary/20`).

## 3. Muted Palette
**Role**: Neutral color for de-emphasized elements, backgrounds, and placeholders.

| Mode | Variable | Value (OKLCH) | Fallback (Hex) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--muted` | `oklch(0.96 0.03 85)` | `#f3f4f6` | Light Grey/Sand |
| | `--muted-foreground` | `oklch(0.55 0.04 80)` | `#6b7280` | Medium Grey text |
| **Dark** | `--muted` | `oklch(0.18 0.04 75)` | `#2a2620` | Dark Grey |
| | `--muted-foreground` | `oklch(0.7 0.04 80)` | `#a19d99` | Lighter Grey text |

**Common Usage:**
- **Navigation**: Hover state for navbar items (`hover:bg-muted`).
- **Tabs**: Background for switching tabs.
- **Loading**: Skeleton loaders (`bg-muted`, `animate-pulse`).
- **Sliders**: Track background.
- **Forms**: Placeholder text (`text-muted-foreground`), input backgrounds in specific contexts.
- **Blog**: Sidebar item hover states (`hover:bg-muted`).
- **Text**: Subtitles, captions, and descriptions throughout the app.

## 4. Accent Palette
**Role**: Used for interactive states (hover, focus, selection) and specific highlights.

| Mode | Variable | Value (OKLCH) | Fallback (Hex) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--accent` | `oklch(0.95 0.05 75)` | `#f6f3ea` | Pale Gold |
| | `--accent-foreground` | `oklch(0.2 0.05 75)` | `#111827` | Dark text |
| **Dark** | `--accent` | `oklch(0.25 0.08 75)` | `#3d362b` | Dark Gold Accent |
| | `--accent-foreground` | `oklch(0.95 0.02 85)` | `#f8f6f3` | Light text |

**Common Usage:**
- **Dropdowns/Menus**: Hover and focus states for items in `DropdownMenu`, `Select`, and `Menubar`.
- **Language Toggle**: Active language highlight.
- **Buttons**: Ghost and Outline button hover states (`hover:bg-accent`).
- **Interactive Lists**: Selected or focused items in lists.

## 5. Background & Surfaces
**Role**: Base layers for the application.

| Mode | Variable | Value (OKLCH) | Fallback (Hex) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--background` | `oklch(1 0 0)` | `#ffffff` | Pure White |
| | `--foreground` | `oklch(0.15 0.02 80)` | `#242424` | Warm Deep Grey |
| | `--card` | `oklch(1 0 0)` | `#ffffff` | White |
| **Dark** | `--background` | `oklch(0.05 0.01 80)` | `#121110` | Deep Warm Black |
| | `--foreground` | `oklch(0.95 0.02 85)` | `#f8f6f3` | Platinum White |
| | `--card` | `oklch(0.1 0.02 80)` | `#1c1a18` | Dark Bronze/Charcoal |

**Common Usage:**
- **Body**: Main page background.
- **Cards**: `Card` component background.
- **Popovers/Dialogs**: Modal backgrounds.
- **Inputs**: Default input background (often transparent or same as background).

## 6. Functional Colors (Destructive, Border, Input, Ring)

| Name | Light (OKLCH) | Dark (OKLCH) | Usage |
| :--- | :--- | :--- | :--- |
| **Destructive** | `0.6 0.18 30` (Red) | `0.6 0.18 30` (Red) | Errors, delete actions (Buttons, Form errors). |
| **Border** | `0.92 0.02 85` | `0.2 0.03 75` | Dividers, card borders, input borders. |
| **Input** | `0.92 0.02 85` | `0.2 0.03 75` | Input field borders/backgrounds. |
| **Ring** | `0.74 0.16 75` (Gold) | `0.74 0.16 75` (Gold) | Focus rings on interactive elements. |

## 7. Gradients & Special Effects
These are custom classes defined in `globals.css` or Tailwind config.

### Dark Mode Gradients
- **`.gradient-modern-dark`**:
  `linear-gradient(135deg, oklch(0.05 0.01 80) 0%, oklch(0.08 0.02 80) 50%, oklch(0.12 0.03 80) 100%)`
  *Usage*: Modern dark backgrounds.

- **`.gradient-modern-subtle`**:
  `linear-gradient(135deg, oklch(0.1 0.02 80) 0%, oklch(0.15 0.03 80) 100%)`
  *Usage*: Subtle card or section backgrounds in dark mode.

- **`.btn-modern` (Dark Mode)**:
  `linear-gradient(135deg, oklch(0.74 0.16 75) 0%, oklch(0.7 0.15 70) 100%)`
  *Usage*: Special "Modern" buttons in dark mode.

- **`.divider-modern` (Dark Mode)**:
  `linear-gradient(90deg, transparent 0%, oklch(0.2 0.03 75) 50%, transparent 100%)`
  *Usage*: Faded separators.

### Tailwind Config Gradients
- **`gradient-radial`**: `radial-gradient(var(--tw-gradient-stops))`
- **`gradient-conic`**: `conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))`
