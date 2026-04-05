// TaskNest Color System - Urban Company inspired
export const COLORS = {
  // Primary colors
  primary: '#1B1F3B',      // Deep indigo/navy for headers and CTAs
  accent: '#FF4757',       // Coral/red-orange for active states
  success: '#2ECC71',      // Success green
  warning: '#F1C40F',      // Warning yellow
  
  // Background colors
  background: '#FFFFFF',   // Pure white base
  backgroundAlt: '#F7F8FA', // Light gray for section fills
  
  // Text colors
  textPrimary: '#1B1F3B',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Status colors
  statusConfirmed: '#D1FAE5',
  statusConfirmedText: '#059669',
  statusPending: '#FEF3C7',
  statusPendingText: '#D97706',
  statusInProgress: '#DBEAFE',
  statusInProgressText: '#2563EB',
  statusCancelled: '#FEE2E2',
  statusCancelledText: '#DC2626',
  statusCompleted: '#F3F4F6',
  statusCompletedText: '#374151',
  
  // Gradients (for banner backgrounds)
  gradientCoral: ['#FF4757', '#FF6B7A'],
  gradientBlue: ['#3B82F6', '#60A5FA'],
  gradientPink: ['#EC4899', '#F472B6'],
  gradientNavy: ['#1B1F3B', '#374151'],
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
};
