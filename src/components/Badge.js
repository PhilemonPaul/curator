import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export default function Badge({ label, type = 'status' }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  let bgColor = colors.border;
  let textColor = colors.textSecondary;

  if (type === 'status') {
    switch (label) {
      case 'Pending':
        bgColor = colors.statusPending;
        textColor = colors.statusPendingText;
        break;
      case 'In Progress':
        bgColor = colors.statusInProgress;
        textColor = colors.statusInProgressText;
        break;
      case 'Completed':
        bgColor = colors.statusCompleted;
        textColor = colors.statusCompletedText;
        break;
      case 'Issue':
      case 'Issue Found':
        bgColor = colors.statusIssue;
        textColor = colors.statusIssueText;
        break;
    }
  } else if (type === 'priority') {
    switch (label) {
      case 'High':
        bgColor = colors.priorityHigh;
        textColor = colors.priorityHighText;
        break;
      case 'Medium':
        bgColor = colors.priorityMedium;
        textColor = colors.priorityMediumText;
        break;
      case 'Low':
        bgColor = colors.priorityLow;
        textColor = colors.priorityLowText;
        break;
    }
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});
