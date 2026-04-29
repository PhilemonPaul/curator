import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, PlusCircle, HardHat, Building2, Ruler, Download } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { mockUser } from '../data/mockData';
import { useProjects } from '../context/ProjectContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { generateProjectPDF } from '../utils/pdfGenerator';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { projects } = useProjects();

  const getProjectStatus = (project) => {
    if (!project.towers || project.towers.length === 0) return 'No Units';
    
    let allCompleted = true;
    let hasUnits = false;
    
    for (const tower of project.towers) {
      if (!tower.floors) continue;
      for (const floor of tower.floors) {
        if (!floor.units) continue;
        for (const unit of floor.units) {
          hasUnits = true;
          const isComplete = unit.checklist && unit.checklist.every(item => item.passed === true);
          if (!isComplete) {
            allCompleted = false;
          }
        }
      }
    }
    
    if (!hasUnits) return 'No Units';
    return allCompleted ? 'Completed' : 'In Progress';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.greeting}>Engineer Dashboard</Text>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.role}>{mockUser.role}</Text>
        </View>

        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <HardHat color={colors.primary} size={24} style={styles.metricIcon} />
            <Text style={styles.metricValue}>{projects.length}</Text>
            <Text style={styles.metricLabel}>Active Sites</Text>
          </Card>
          <Card style={styles.metricCard}>
            <ClipboardList color={colors.primary} size={24} style={styles.metricIcon} />
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>Tasks Today</Text>
          </Card>
        </View>

        <View style={styles.actions}>
          <Button 
            title="New Inspection" 
            icon={Ruler} 
            style={styles.actionBtn} 
            onPress={() => navigation.navigate('ProjectsFlow')}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Project Completion Status</Text>
          </View>
          {projects.map(project => {
            const status = getProjectStatus(project);
            return (
              <Card key={project.id} style={styles.projectCard}>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectLocation}>{project.location}</Text>
                </View>
                <View style={styles.projectActions}>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: status === 'Completed' ? colors.success : 
                                    status === 'In Progress' ? colors.statusInProgress : 
                                    colors.surface
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: status === 'Completed' ? colors.surface : 
                             status === 'In Progress' ? colors.statusInProgressText : 
                             colors.textSecondary 
                    }]}>
                      {status}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.downloadBtn} 
                    onPress={() => generateProjectPDF(project, status)}
                  >
                    <Download color={colors.primary} size={20} />
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  greeting: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  name: {
    ...typography.header1,
    color: colors.text,
    marginBottom: 2,
  },
  role: {
    ...typography.body,
    color: colors.textSecondary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  metricIcon: {
    marginBottom: spacing.sm,
  },
  metricValue: {
    ...typography.header2,
    color: colors.text,
    marginBottom: 2,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionBtn: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.header3,
    color: colors.text,
  },
  projectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 4,
  },
  projectLocation: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  projectActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  downloadBtn: {
    padding: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  }
});
