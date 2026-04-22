import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import Badge from './Badge';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';

export default function TaskCard({ task, onPress }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        </View>
        
        <Text style={styles.project}>{task.projectName}</Text>
        
        <View style={styles.footer}>
          <Badge label={task.status} type="status" />
          <Badge label={task.priority} type="priority" />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    flex: 1,
  },
  project: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
