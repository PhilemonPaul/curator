import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Layers, ChevronRight, Activity } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

export default function FloorsScreen({ route, navigation }) {
  const { tower, project } = route.params;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${tower.name} Floors`,
    });
  }, [navigation, tower]);

  const renderItem = ({ item, index }) => (
    <View style={styles.timelineItem}>
      {/* Structural Spine */}
      <View style={styles.spineContainer}>
        <View style={styles.spineDot} />
        {index !== (tower.floors?.length || 0) - 1 && <View style={styles.spineLine} />}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('UnitsList', { floor: item, tower, project })}
        style={styles.cardContainer}
      >
        <View style={styles.card}>
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <Layers color={colors.primary} size={20} />
            </View>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>Level {index}</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <View style={styles.statsBadge}>
              <Text style={styles.statsText}>{item.units?.length || 0} Units</Text>
            </View>
            <ChevronRight color={colors.textSecondary} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.headerTitle}>Structural Levels</Text>
      </View>
      
      {tower.floors && tower.floors.length > 0 ? (
        <FlatList
          data={tower.floors}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Layers color={colors.border} size={64} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No floors mapped for this structure.</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerArea: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.header2,
    color: colors.text,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  spineContainer: {
    alignItems: 'center',
    width: 30,
    marginRight: spacing.sm,
  },
  spineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
    marginTop: 24, // Align with card center
    zIndex: 1,
  },
  spineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: -8, // Connect smoothly behind dot
    marginBottom: -24, // Reach next item
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadiusLg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    ...layout.shadow,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statsBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    marginBottom: spacing.md,
    opacity: 0.5,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  }
});
