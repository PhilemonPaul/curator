import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Building2, ChevronRight, Activity } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

export default function TowersScreen({ route, navigation }) {
  const { project } = route.params;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.name,
    });
  }, [navigation, project]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('FloorsList', { tower: item, project })}
      style={styles.cardWrapper}
    >
      <LinearGradient
        colors={[colors.surface, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <Building2 color={colors.primary} size={28} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>Structure Block {index + 1}</Text>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.statsBadge}>
              <Activity color={colors.primary} size={14} />
              <Text style={styles.statsText}>{item.floors?.length || 0} Floors</Text>
            </View>
            <ChevronRight color={colors.textSecondary} size={24} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.headerTitle}>Select Structure</Text>
        <Text style={styles.headerSubtitle}>Tap a tower to inspect its floors</Text>
      </View>
      {project.towers && project.towers.length > 0 ? (
        <FlatList
          data={project.towers}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Building2 color={colors.border} size={64} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No structures found for this project.</Text>
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
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.header2,
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
    borderRadius: layout.borderRadiusLg,
    ...layout.shadow,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: layout.borderRadiusLg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.header3,
    color: colors.text,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statsText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
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
