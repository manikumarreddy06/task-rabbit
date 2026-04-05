import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  Clock,
  Check,
  ChevronRight,
  Lock,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { SERVICES, SERVICE_PACKAGES, REVIEWS, PROS } from '../../src/constants/mockData';

const { width } = Dimensions.get('window');

const STEPS = [
  { title: 'Pro arrives', description: 'At your scheduled time' },
  { title: 'Work begins', description: 'Professional service starts' },
  { title: 'Quality check', description: 'Review the work done' },
  { title: 'Payment', description: 'Pay securely after satisfaction' },
];

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');

  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];
  const pro = PROS[0]; // Using first pro as example
  const currentPackage = SERVICE_PACKAGES[selectedPackage];

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: service.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />
        <SafeAreaView style={styles.heroContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.textWhite} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Provider Card */}
        <View style={styles.providerCard}>
          <View style={styles.providerHeader}>
            <Image source={{ uri: pro.image }} style={styles.providerImage} />
            <View style={styles.providerInfo}>
              <View style={styles.providerNameRow}>
                <Text style={styles.providerName}>{pro.name}</Text>
                {pro.verified && <BadgeCheck size={18} color="#3B82F6" />}
              </View>
              <View style={styles.providerStats}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statText}>{pro.rating} ({pro.jobs} ratings)</Text>
                <Text style={styles.statDivider}>·</Text>
                <Text style={styles.statText}>{pro.jobs}+ bookings</Text>
              </View>
            </View>
          </View>
          <View style={styles.availabilityChip}>
            <Clock size={14} color={COLORS.success} />
            <Text style={styles.availabilityText}>Starts in 3 hrs</Text>
          </View>
        </View>

        {/* Service Title */}
        <Text style={styles.serviceTitle}>{service.name}</Text>

        {/* Package Tabs */}
        <View style={styles.packageTabs}>
          {(['basic', 'standard', 'premium'] as const).map((pkg) => (
            <TouchableOpacity
              key={pkg}
              style={[
                styles.packageTab,
                selectedPackage === pkg && styles.packageTabActive,
              ]}
              onPress={() => setSelectedPackage(pkg)}
            >
              <Text
                style={[
                  styles.packageTabText,
                  selectedPackage === pkg && styles.packageTabTextActive,
                ]}
              >
                {SERVICE_PACKAGES[pkg].name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Package Details */}
        <View style={styles.packageDetails}>
          <View style={styles.packageHeader}>
            <Text style={styles.packagePrice}>₹{currentPackage.price}</Text>
            <Text style={styles.packageDuration}>{currentPackage.duration}</Text>
          </View>
          <Text style={styles.includesTitle}>What's Included:</Text>
          {currentPackage.includes.map((item, index) => (
            <View key={index} style={styles.includeItem}>
              <View style={styles.checkCircle}>
                <Check size={12} color={COLORS.success} />
              </View>
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* What to Expect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Expect</Text>
          <View style={styles.stepsContainer}>
            {STEPS.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
                {index < STEPS.length - 1 && <View style={styles.stepLine} />}
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={COLORS.accent} />
            </TouchableOpacity>
          </View>

          {/* Rating Summary */}
          <View style={styles.ratingSummary}>
            <View style={styles.ratingBig}>
              <Text style={styles.ratingBigNumber}>{pro.rating}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color="#F59E0B"
                    fill={star <= Math.floor(pro.rating) ? '#F59E0B' : 'transparent'}
                  />
                ))}
              </View>
              <Text style={styles.totalReviews}>{pro.jobs} reviews</Text>
            </View>
          </View>

          {/* Review Cards */}
          {REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomPrice}>₹{currentPackage.price}</Text>
          <TouchableOpacity>
            <Text style={styles.customizeText}>Customize →</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.bookNowBtn}
          onPress={() => router.push({ pathname: '/booking/[id]', params: { id: service.id } })}
        >
          <Lock size={16} color={COLORS.textWhite} />
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Hero
  heroContainer: {
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  // Content
  content: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  // Provider Card
  providerCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    ...SHADOWS.card,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  providerName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statDivider: {
    color: COLORS.textMuted,
  },
  availabilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.success + '15',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  availabilityText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
  },
  // Service Title
  serviceTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 20,
  },
  // Package Tabs
  packageTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    marginTop: 20,
  },
  packageTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  packageTabActive: {
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  packageTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  packageTabTextActive: {
    color: COLORS.primary,
  },
  // Package Details
  packageDetails: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  packagePrice: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  packageDuration: {
    fontSize: 14,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  includesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  includeText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  // Section
  section: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  // Steps
  stepsContainer: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 16,
    padding: 16,
  },
  stepItem: {
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  stepDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  stepLine: {
    position: 'absolute',
    left: 13,
    top: 32,
    bottom: 4,
    width: 2,
    backgroundColor: COLORS.border,
  },
  // Reviews
  ratingSummary: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBig: {
    alignItems: 'center',
  },
  ratingBigNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  totalReviews: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  reviewCard: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  bottomLeft: {},
  bottomPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  customizeText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  bookNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
