import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { MapPin, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockProjects } from '../data/mockData';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

export default function ProjectsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => navigation.navigate('TowersList', { project: item })}
      style={styles.cardContainer}
    >
      <ImageBackground 
        source={{ uri: item.image }} 
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(18, 18, 18, 0.95)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.locationRow}>
                <MapPin color={colors.primary} size={14} />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.actionCircle}>
              <ArrowRight color={colors.background} size={20} />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
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

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  cardContainer: {
    marginBottom: spacing.lg,
    borderRadius: layout.borderRadiusLg,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageBackground: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: layout.borderRadiusLg,
  },
  gradient: {
    height: '60%',
    justifyContent: 'flex-end',
    borderRadius: layout.borderRadiusLg,
    padding: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.header2,
    color: '#F3F4F6', // Forced light for dark gradient
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    ...typography.body,
    color: '#D1D5DB', // Forced light grey for dark gradient
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
