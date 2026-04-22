import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Layers, ChevronRight } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import Card from '../components/Card';

export default function FloorsScreen({ route, navigation }) {
  const { tower, project } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${project.name} > ${tower.name}`,
    });
  }, [navigation, project, tower]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => navigation.navigate('UnitsList', { floor: item, tower, project })}
    >
      <Card style={styles.card}>
        <View style={styles.row}>
          <Layers color={colors.primary} size={20} style={styles.icon} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <ChevronRight color={colors.textSecondary} size={20} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Floor</Text>
      {tower.floors && tower.floors.length > 0 ? (
        <FlatList
          data={tower.floors}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No floors found for this tower.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
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
