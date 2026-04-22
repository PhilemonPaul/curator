import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCircle, Phone, Mail, Briefcase } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { mockUser } from '../data/mockData';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <UserCircle color={colors.primary} size={80} style={styles.avatar} />
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.role}>{mockUser.role}</Text>
        </View>

        <Card style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Briefcase color={colors.textSecondary} size={20} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Role</Text>
              <Text style={styles.detailValue}>{mockUser.role}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Phone color={colors.textSecondary} size={20} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{mockUser.phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Mail color={colors.textSecondary} size={20} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{mockUser.email}</Text>
            </View>
          </View>
        </Card>

        <Button title="Edit Profile" variant="outline" style={styles.editBtn} />
        <Button title="Log Out" variant="danger" style={styles.logoutBtn} />

      </View>
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
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  avatar: {
    marginBottom: spacing.md,
  },
  name: {
    ...typography.header2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailsCard: {
    marginBottom: spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 36, // Align with text
  },
  editBtn: {
    marginBottom: spacing.md,
  },
  logoutBtn: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  }
});
