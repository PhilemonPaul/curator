import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  icon: Icon,
  style,
  textStyle 
}) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary && styles.primary,
        isOutline && styles.outline,
        isDanger && styles.danger,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {Icon && <Icon color={isPrimary || isDanger ? colors.surface : colors.primary} size={20} style={styles.icon} />}
      <Text style={[
        styles.text,
        isPrimary && styles.primaryText,
        isOutline && styles.outlineText,
        isDanger && styles.dangerText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: layout.borderRadius,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  text: {
    ...typography.button,
  },
  primaryText: {
    color: colors.surface,
  },
  outlineText: {
    color: colors.text,
  },
  dangerText: {
    color: colors.surface,
  },
  icon: {
    marginRight: spacing.sm,
  }
});
