const commonColors = {
  primary: '#D97706',    // Premium Bronze/Gold
  accent: '#B45309',     // Darker Gold for active states
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Amber
  danger: '#EF4444',     // Red
  info: '#3B82F6',       // Blue
};

export const darkColors = {
  ...commonColors,
  background: '#121212', // Deep architectural charcoal black
  surface: '#1E1E24',    // Slightly lighter charcoal for cards
  text: '#F3F4F6',       // Off-white for high readability
  textSecondary: '#9CA3AF', // Steel Grey
  border: '#374151',     // Dark grey border

  // Priority Colors
  priorityHigh: '#7F1D1D',
  priorityHighText: '#FCA5A5',
  priorityMedium: '#78350F',
  priorityMediumText: '#FCD34D',
  priorityLow: '#0C4A6E',
  priorityLowText: '#7DD3FC',

  // Status Colors
  statusPending: '#374151',
  statusPendingText: '#D1D5DB',
  statusInProgress: '#1E3A8A',
  statusInProgressText: '#93C5FD',
  statusCompleted: '#064E3B',
  statusCompletedText: '#6EE7B7',
  statusIssue: '#7F1D1D',
  statusIssueText: '#FCA5A5',
};

export const lightColors = {
  ...commonColors,
  background: '#F8FAFC', // Very light greyish blue
  surface: '#FFFFFF',    // White for cards
  text: '#1E293B',       // Dark text
  textSecondary: '#64748B', // Muted text
  border: '#E2E8F0',     // Light border

  // Priority Colors
  priorityHigh: '#FEE2E2',
  priorityHighText: '#EF4444',
  priorityMedium: '#FEF3C7',
  priorityMediumText: '#D97706',
  priorityLow: '#E0F2FE',
  priorityLowText: '#0284C7',

  // Status Colors
  statusPending: '#F1F5F9',
  statusPendingText: '#475569',
  statusInProgress: '#DBEAFE',
  statusInProgressText: '#2563EB',
  statusCompleted: '#D1FAE5',
  statusCompletedText: '#059669',
  statusIssue: '#FEE2E2',
  statusIssueText: '#DC2626',
};

// Fallback for backwards compatibility while migrating
export const colors = darkColors;
