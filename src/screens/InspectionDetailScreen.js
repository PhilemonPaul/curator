import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import { mockChecklist } from '../data/mockData';
import Card from '../components/Card';
import Button from '../components/Button';
import { useProjects } from '../context/ProjectContext';

export default function InspectionDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { unit, floor, tower, project } = route.params;
  const { projects, updateUnitChecklist } = useProjects();
  const [comments, setComments] = useState('');

  const currentProject = projects.find(p => p.id === project.id);
  const currentTower = currentProject?.towers?.find(t => t.id === tower.id);
  const currentFloor = currentTower?.floors?.find(f => f.id === floor.id);
  const currentUnit = currentFloor?.units?.find(u => u.id === unit.id);
  const checklist = currentUnit?.checklist || [];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${unit.name} Inspection`,
    });
  }, [navigation, unit]);

  const toggleCheck = (id, status) => {
    const newChecklist = checklist.map(item => 
      item.id === id ? { ...item, passed: status } : item
    );
    updateUnitChecklist(project.id, tower.id, floor.id, unit.id, newChecklist);
  };

  const updateRemark = (id, remark) => {
    const newChecklist = checklist.map(item => 
      item.id === id ? { ...item, remark } : item
    );
    updateUnitChecklist(project.id, tower.id, floor.id, unit.id, newChecklist);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.headerInfo}>
        <Text style={styles.subtitle}>Location</Text>
        <Text style={styles.locationText}>{tower.name}, {floor.name}, {unit.name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Checklist</Text>
      {checklist.map(item => (
        <Card key={item.id} style={styles.checkItemContainer}>
          <View style={styles.checkItemHeader}>
            <Text style={styles.checkText}>{item.text}</Text>
            <View style={styles.checkActions}>
              <TouchableOpacity 
                style={[styles.checkBtn, item.passed === true && styles.passedBtn]}
                onPress={() => toggleCheck(item.id, true)}
              >
                <Check color={item.passed === true ? colors.surface : colors.textSecondary} size={20} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.checkBtn, item.passed === false && styles.failedBtn]}
                onPress={() => toggleCheck(item.id, false)}
              >
                <X color={item.passed === false ? colors.surface : colors.textSecondary} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.itemRemarkInput}
            placeholder="Add a remark..."
            placeholderTextColor={colors.textSecondary}
            value={item.remark || ''}
            onChangeText={(text) => updateRemark(item.id, text)}
          />
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Comments</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Add any specific observations or comments..."
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
        value={comments}
        onChangeText={setComments}
      />

    </ScrollView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  headerInfo: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  locationText: {
    ...typography.header3,
    color: colors.text,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  checkItemContainer: {
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: 'column',
  },
  checkItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    marginRight: spacing.md,
  },
  itemRemarkInput: {
    backgroundColor: colors.background,
    borderRadius: layout.borderRadius,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  checkBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.statusPending,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passedBtn: {
    backgroundColor: colors.success,
  },
  failedBtn: {
    backgroundColor: colors.danger,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
});
