import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCircle, Phone, Mail, Briefcase, Camera, Moon, Sun } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import { mockUser } from '../data/mockData';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ProfileScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);
  
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    loadProfilePhoto();
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const uri = await AsyncStorage.getItem('@profile_photo');
      if (uri) {
        setProfilePhoto(uri);
      }
    } catch (e) {
      console.error('Failed to load profile photo', e);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to change your profile photo!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePhoto(uri);
      try {
        await AsyncStorage.setItem('@profile_photo', uri);
      } catch (e) {
        console.error('Failed to save profile photo', e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
            ) : (
              <UserCircle color={colors.primary} size={80} style={styles.avatar} />
            )}
            <View style={styles.cameraIconContainer}>
              <Camera color={colors.surface} size={14} />
            </View>
          </TouchableOpacity>
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

        <Card style={styles.detailsCard}>
          <View style={styles.detailRow}>
            {isDarkMode ? (
              <Moon color={colors.textSecondary} size={20} />
            ) : (
              <Sun color={colors.textSecondary} size={20} />
            )}
            <View style={styles.detailContent}>
              <Text style={styles.detailValue}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>
        </Card>

        <Button title="Log Out" variant="danger" style={styles.logoutBtn} />

      </View>
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
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  avatarContainer: {
    marginBottom: spacing.md,
    position: 'relative',
  },
  avatar: {
    // Default avatar style
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
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
  logoutBtn: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  }
});
