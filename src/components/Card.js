import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { layout, spacing } from '../theme/spacing';

export default function Card({ children, style }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...layout.shadow,
  },
});
