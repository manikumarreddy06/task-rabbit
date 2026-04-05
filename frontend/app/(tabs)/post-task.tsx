import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MapPin,
  Camera,
  Calendar,
  Clock,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { SERVICES } from '../../src/constants/mockData';
import ServiceIcon from '../../src/components/ServiceIcon';

const BUDGET_OPTIONS = [
  { label: '₹200-500', min: 200, max: 500 },
  { label: '₹500-1000', min: 500, max: 1000 },
  { label: '₹1000-2500', min: 1000, max: 2500 },
];

const WHEN_OPTIONS = ['Today', 'This Week', 'Flexible'];

export default function PostTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [customBudget, setCustomBudget] = useState('');
  const [selectedWhen, setSelectedWhen] = useState<string>('This Week');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post a Task</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Task Title */}
          <View style={styles.section}>
            <Text style={styles.label}>What do you need done?</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="e.g., Deep clean my 2BHK apartment"
              placeholderTextColor={COLORS.textMuted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Select Category</Text>
            <View style={styles.categoryGrid}>
              {SERVICES.slice(0, 6).map((service) => (
                <ServiceIcon
                  key={service.id}
                  name={service.name}
                  icon={service.icon}
                  color={service.color}
                  selected={selectedCategory === service.id}
                  onPress={() => setSelectedCategory(service.id)}
                />
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Describe your task</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Provide more details about what you need..."
              placeholderTextColor={COLORS.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          {/* Image Upload */}
          <View style={styles.section}>
            <Text style={styles.label}>Add photos (optional)</Text>
            <TouchableOpacity style={styles.imageUpload}>
              <Camera size={32} color={COLORS.textMuted} />
              <Text style={styles.imageUploadText}>Tap to add photos</Text>
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.label}>Where do you need it?</Text>
            <View style={styles.locationInput}>
              <MapPin size={20} color={COLORS.accent} />
              <TextInput
                style={styles.locationTextInput}
                placeholder="Enter location or address"
                placeholderTextColor={COLORS.textMuted}
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Budget */}
          <View style={styles.section}>
            <Text style={styles.label}>Your budget</Text>
            <View style={styles.budgetTypeToggle}>
              <TouchableOpacity
                style={[
                  styles.budgetTypeBtn,
                  budgetType === 'fixed' && styles.budgetTypeBtnActive,
                ]}
                onPress={() => setBudgetType('fixed')}
              >
                <Text
                  style={[
                    styles.budgetTypeBtnText,
                    budgetType === 'fixed' && styles.budgetTypeBtnTextActive,
                  ]}
                >
                  Fixed Price
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.budgetTypeBtn,
                  budgetType === 'hourly' && styles.budgetTypeBtnActive,
                ]}
                onPress={() => setBudgetType('hourly')}
              >
                <Text
                  style={[
                    styles.budgetTypeBtnText,
                    budgetType === 'hourly' && styles.budgetTypeBtnTextActive,
                  ]}
                >
                  Hourly Rate
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.budgetOptions}>
              {BUDGET_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.budgetChip,
                    selectedBudget === index && styles.budgetChipActive,
                  ]}
                  onPress={() => {
                    setSelectedBudget(index);
                    setCustomBudget('');
                  }}
                >
                  <Text
                    style={[
                      styles.budgetChipText,
                      selectedBudget === index && styles.budgetChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.customBudgetInput}>
              <Text style={styles.rupeeSymbol}>₹</Text>
              <TextInput
                style={styles.customBudgetTextInput}
                placeholder="Or enter custom amount"
                placeholderTextColor={COLORS.textMuted}
                value={customBudget}
                onChangeText={(text) => {
                  setCustomBudget(text);
                  setSelectedBudget(null);
                }}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* When */}
          <View style={styles.section}>
            <Text style={styles.label}>When do you need it?</Text>
            <View style={styles.whenOptions}>
              {WHEN_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.whenChip,
                    selectedWhen === option && styles.whenChipActive,
                  ]}
                  onPress={() => setSelectedWhen(option)}
                >
                  {option === 'Today' && <Clock size={16} color={selectedWhen === option ? COLORS.textWhite : COLORS.textSecondary} />}
                  {option === 'This Week' && <Calendar size={16} color={selectedWhen === option ? COLORS.textWhite : COLORS.textSecondary} />}
                  <Text
                    style={[
                      styles.whenChipText,
                      selectedWhen === option && styles.whenChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Post Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Post Task — Get Offers</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  descriptionInput: {
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginTop: 4,
  },
  imageUpload: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundAlt,
  },
  imageUploadText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  locationTextInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  budgetTypeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  budgetTypeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  budgetTypeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  budgetTypeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  budgetTypeBtnTextActive: {
    color: COLORS.textWhite,
  },
  budgetOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  budgetChip: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  budgetChipActive: {
    backgroundColor: COLORS.accent + '15',
    borderColor: COLORS.accent,
  },
  budgetChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  budgetChipTextActive: {
    color: COLORS.accent,
  },
  customBudgetInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rupeeSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  customBudgetTextInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  whenOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  whenChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  whenChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  whenChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  whenChipTextActive: {
    color: COLORS.textWhite,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  postButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
