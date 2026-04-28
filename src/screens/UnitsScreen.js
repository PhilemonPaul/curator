import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { DoorClosed } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import Card from '../components/Card';
import { useProjects } from '../context/ProjectContext';

export default function UnitsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { floor, tower, project } = route.params;
  const { projects } = useProjects();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${tower.name} > ${floor.name}`,
    });
  }, [navigation, tower, floor]);

  // Find the current floor's units from the context
  const currentProject = projects.find(p => p.id === project.id);
  const currentTower = currentProject?.towers?.find(t => t.id === tower.id);
  const currentFloor = currentTower?.floors?.find(f => f.id === floor.id);
  const units = currentFloor?.units || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return colors.success;
      case 'Not Completed': return colors.statusInProgress;
      case 'Not Inspected': return colors.statusPending;
      default: return colors.statusPending;
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Completed': return colors.surface;
      case 'Not Completed': return colors.statusInProgressText;
      case 'Not Inspected': return colors.statusPendingText;
      default: return colors.statusPendingText;
    }
  };

  const renderItem = ({ item }) => {
    const isCompleted = item.checklist && item.checklist.length > 0 && item.checklist.every(c => c.passed === true);
    const hasAnyCheck = item.checklist && item.checklist.some(c => c.passed !== null);
    const status = isCompleted ? 'Completed' : (hasAnyCheck ? 'Not Completed' : 'Not Inspected');

    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => navigation.navigate('InspectionDetail', { unit: item, floor, tower, project })}
        style={styles.cardContainer}
      >
        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            <DoorClosed color={colors.textSecondary} size={24} />
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={[styles.statusText, { color: getStatusTextColor(status) }]}>
              {status}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Unit for Inspection</Text>
      {units.length > 0 ? (
        <FlatList
          data={units}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No units found for this floor.</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
  },
  headerTitle: {
    ...typography.header3,
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: spacing.md,
  },
  card: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.header3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  }
});
