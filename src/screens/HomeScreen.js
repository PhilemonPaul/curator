import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, AlertTriangle, PlusCircle, HardHat, Building2, Ruler } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { mockUser, mockTasks, mockIssues } from '../data/mockData';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import Card from '../components/Card';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
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
            <Text style={styles.metricValue}>12</Text>
            <Text style={styles.metricLabel}>Active Sites</Text>
          </Card>
          <Card style={styles.metricCard}>
            <ClipboardList color={colors.primary} size={24} style={styles.metricIcon} />
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>Tasks Today</Text>
          </Card>
          <Card style={styles.metricCard}>
            <AlertTriangle color={colors.danger} size={24} style={styles.metricIcon} />
            <Text style={[styles.metricValue, { color: colors.danger }]}>1</Text>
            <Text style={styles.metricLabel}>Open NCRs</Text>
          </Card>
        </View>

        <View style={styles.actions}>
          <Button 
            title="New Inspection" 
            icon={Ruler} 
            style={styles.actionBtn} 
            onPress={() => navigation.navigate('ProjectsFlow')}
          />
          <Button 
            title="Raise NCR" 
            variant="danger" 
            icon={AlertTriangle} 
            style={styles.actionBtn} 
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Inspections</Text>
          </View>
          {mockTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onPress={() => {}} 
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Critical Issues / NCRs</Text>
          {mockIssues.map(issue => (
            <Card key={issue.id} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <AlertTriangle color={colors.danger} size={20} />
                <Text style={styles.issueTitle}>{issue.title}</Text>
              </View>
              <Text style={styles.issueProject}>{issue.projectName}</Text>
              <Text style={styles.issueLocation}>{issue.location}</Text>
              <Text style={styles.issueDate}>{issue.date}</Text>
            </Card>
          ))}
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
  issueCard: {
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    backgroundColor: colors.surface,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  issueTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  issueProject: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  issueLocation: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  issueDate: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
