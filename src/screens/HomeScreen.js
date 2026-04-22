import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, AlertCircle, PlusCircle } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { mockUser, mockTasks, mockIssues } from '../data/mockData';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import Card from '../components/Card';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.role}>{mockUser.role}</Text>
        </View>

        <View style={styles.actions}>
          <Button 
            title="New Inspection" 
            icon={PlusCircle} 
            style={styles.actionBtn} 
            onPress={() => navigation.navigate('ProjectsFlow')}
          />
          <Button 
            title="Raise NCR" 
            variant="danger" 
            icon={AlertCircle} 
            style={styles.actionBtn} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {mockTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onPress={() => {}} 
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Issues / NCRs</Text>
          {mockIssues.map(issue => (
            <Card key={issue.id} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <AlertCircle color={colors.danger} size={20} />
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

const styles = StyleSheet.create({
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
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
  },
  name: {
    ...typography.header1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
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
  sectionTitle: {
    ...typography.header3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  issueCard: {
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
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
