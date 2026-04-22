import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { mockProjects } from '../data/mockData';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import Card from '../components/Card';

export default function ProjectsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => navigation.navigate('TowersList', { project: item })}
    >
      <Card style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.locationRow}>
            <MapPin color={colors.textSecondary} size={14} />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <ChevronRight color={colors.textSecondary} size={24} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockProjects}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    padding: 0,
    marginBottom: spacing.md,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: layout.borderRadius,
    borderBottomLeftRadius: layout.borderRadius,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  arrowContainer: {
    padding: spacing.md,
  }
});
