import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Check, X, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import { mockChecklist } from '../data/mockData';
import Card from '../components/Card';
import Button from '../components/Button';

export default function InspectionDetailScreen({ route, navigation }) {
  const { unit, floor, tower } = route.params;
  const [checklist, setChecklist] = useState(mockChecklist);
  const [comments, setComments] = useState('');
  const [images, setImages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${unit.name} Inspection`,
    });
  }, [navigation, unit]);

  const toggleCheck = (id, status) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, passed: status } : item
    ));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.headerInfo}>
        <Text style={styles.subtitle}>Location</Text>
        <Text style={styles.locationText}>{tower.name}, {floor.name}, {unit.name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Checklist</Text>
      {checklist.map(item => (
        <Card key={item.id} style={styles.checkItem}>
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

      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photoActions}>
        <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
          <Camera color={colors.primary} size={24} />
          <Text style={styles.photoBtnText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
          <ImageIcon color={colors.primary} size={24} />
          <Text style={styles.photoBtnText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 && (
        <ScrollView horizontal style={styles.imagesScroll} showsHorizontalScrollIndicator={false}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.attachedImage} />
          ))}
        </ScrollView>
      )}

      <View style={styles.submitSection}>
        <Button 
          title="Raise NCR" 
          variant="outline" 
          icon={AlertCircle}
          style={styles.ncrBtn}
          textStyle={{ color: colors.danger }}
        />
        <Button 
          title="Submit Inspection" 
          style={styles.submitBtn}
          onPress={() => navigation.goBack()}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  checkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
  },
  checkText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    marginRight: spacing.md,
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
  photoActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  photoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: layout.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  photoBtnText: {
    ...typography.button,
    color: colors.primary,
  },
  imagesScroll: {
    marginBottom: spacing.md,
  },
  attachedImage: {
    width: 100,
    height: 100,
    borderRadius: layout.borderRadius,
    marginRight: spacing.sm,
  },
  submitSection: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  ncrBtn: {
    borderColor: colors.danger,
  },
  submitBtn: {
    // Primary by default
  }
});
