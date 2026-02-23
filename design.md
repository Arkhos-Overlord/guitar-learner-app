# Guitar Learner App - Interface Design

## Overview

**Guitar Learner** is a free, mobile-first app designed to help beginners learn guitar through copyright-free traditional songs. The app emphasizes simplicity, accessibility, and optional depth for learners who want to explore more.

## Design Principles

- **Mobile-first**: Portrait orientation (9:16), optimized for one-handed use
- **Minimal friction**: Quick access to songs and tabs without complex navigation
- **Progressive disclosure**: Core features are free and simple; advanced learning modules are optional
- **Apple HIG-aligned**: Feels like a first-party iOS app with clean typography and intuitive gestures

## Screen List

| Screen | Purpose | Key Content |
|--------|---------|-------------|
| **Home** | Entry point, quick access to learning | Welcome message, featured song, quick stats |
| **Song Library** | Browse all available songs | Searchable list, filter by difficulty/category |
| **Song Detail** | Learn a specific song | Tabs, chords, lyrics, audio playback, tempo control |
| **Lessons** | Optional deep-dive learning | Chord library, theory basics, metronome, practice tips |
| **Settings** | App preferences | Theme (light/dark), audio volume, about |

## Primary Content and Functionality

### Home Screen
- **Hero section**: "Start Learning Guitar" with featured beginner song
- **Quick stats**: Songs learned, practice streak (optional)
- **Call-to-action button**: "Browse Songs" → Song Library
- **Recent songs**: Quick access to last 3 songs viewed
- **Optional "Deep Dive" card**: Link to Lessons tab

### Song Library
- **Search bar**: Filter songs by name
- **Filter options** (optional): Difficulty (Beginner, Intermediate), Category (Folk, Christmas, Hymn, etc.)
- **Song cards**: Title, difficulty badge, play button preview
- **Tap to view**: Opens Song Detail screen

### Song Detail
- **Header**: Song title, difficulty, category
- **Audio player**: Play/pause, progress bar, tempo slider (0.5x–1.5x speed)
- **Tabs section**: Guitar tabs displayed as formatted text or SVG
- **Chords section**: Chord diagrams (optional, can be simple text like "G - D - Em - A")
- **Lyrics section**: Full lyrics with chords inline
- **Buttons**: "Practice Mode" (optional), "Share" (optional)

### Lessons (Deep Dive)
- **Chord Library**: Interactive chord diagrams with finger positions
- **Theory Basics**: 
  - Major/minor scales
  - Rhythm patterns
  - Fingerstyle vs. strumming
- **Metronome**: Adjustable BPM (40–240), visual tap indicator
- **Practice Tips**: Curated advice for beginners

### Settings
- **Theme toggle**: Light/dark mode
- **Audio settings**: Master volume, notification preferences
- **About**: App version, credits, links to sources

## Key User Flows

### Flow 1: Discover and Learn a Song
1. User opens app → Home screen
2. Taps "Browse Songs" → Song Library
3. Searches or browses songs → Taps a song card
4. Song Detail opens → Views tabs, reads lyrics
5. Taps play button → Audio plays with visual progress
6. Optionally adjusts tempo slider to slow down

### Flow 2: Practice with Metronome
1. User navigates to Lessons tab
2. Taps "Metronome"
3. Sets BPM (e.g., 80)
4. Taps start → Metronome plays
5. User practices along with the beat
6. Stops when done

### Flow 3: Learn a Chord
1. User navigates to Lessons tab
2. Taps "Chord Library"
3. Searches or browses chords (e.g., "G major")
4. Views chord diagram with finger positions
5. Reads description (e.g., "Place fingers on frets 1, 2, 3 of strings 1, 2, 3")

## Color Choices

| Element | Color | Usage |
|---------|-------|-------|
| **Primary** | `#0a7ea4` (Teal) | Buttons, accents, active states |
| **Background** | `#ffffff` (Light) / `#151718` (Dark) | Screen background |
| **Surface** | `#f5f5f5` (Light) / `#1e2022` (Dark) | Cards, elevated surfaces |
| **Foreground** | `#11181c` (Light) / `#ecedee` (Dark) | Primary text |
| **Muted** | `#687076` (Light) / `#9ba1a6` (Dark) | Secondary text, hints |
| **Success** | `#22c55e` (Green) | Practice milestones, completed badges |
| **Warning** | `#f59e0b` (Amber) | Difficulty indicators (intermediate) |

## Typography

- **Headings**: System font (SF Pro Display on iOS), 24–32pt, bold
- **Body text**: System font, 16pt, regular
- **Captions**: System font, 12–14pt, muted color
- **Tabs/code**: Monospace font (Monaco or similar), 13pt

## Interaction Patterns

- **Tap feedback**: Buttons scale to 0.97 with light haptic feedback
- **Swipe**: Swipe left/right on song cards to navigate between songs (optional)
- **Long press**: Long press a song to add to favorites (optional)
- **Scroll**: Smooth scroll for song lists and lyrics

## Accessibility

- **Minimum touch target**: 44pt × 44pt (iOS standard)
- **Color contrast**: All text meets WCAG AA standards
- **Font size**: Minimum 16pt for body text
- **Alt text**: Audio player has play/pause labels
