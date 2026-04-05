import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Check,
  MapPin,
  Tag,
  Lock,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { SERVICES, SERVICE_PACKAGES, USER_PROFILE } from '../../src/constants/mockData';

const DATES = [
  { day: 'Today', date: '15', month: 'Jul' },
  { day: 'Wed', date: '16', month: 'Jul' },
  { day: 'Thu', date: '17', month: 'Jul' },
  { day: 'Fri', date: '18', month: 'Jul' },
  { day: 'Sat', date: '19', month: 'Jul' },
  { day: 'Sun', date: '20', month: 'Jul' },
  { day: 'Mon', date: '21', month: 'Jul' },
];

const TIME_SLOTS = ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'];

const COUPONS = [
  { code: 'FIRST100', discount: 100, description: 'First booking discount' },
  { code: 'SUMMER50', discount: 50, description: 'Summer special offer' },
];

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof COUPONS[0] | null>(null);

  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];
  const currentPackage = SERVICE_PACKAGES[selectedPackage];
  const address = USER_PROFILE.customer.addresses[0];

  const applyCoupon = () => {
    const coupon = COUPONS.find((c) => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
    }
  };

  const basePrice = currentPackage.price;
  const discount = appliedCoupon?.discount || 0;
  const platformFee = 29;
  const total = basePrice - discount + platformFee;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Booking</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Section 1: Choose Package */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Choose Package</Text>
            <View style={styles.packageOptions}>
              {(['basic', 'standard', 'premium'] as const).map((pkg) => (
                <TouchableOpacity
                  key={pkg}
                  style={[
                    styles.packageOption,
                    selectedPackage === pkg && styles.packageOptionActive,
                  ]}
                  onPress={() => setSelectedPackage(pkg)}
                >
                  <View style={styles.packageRadio}>
                    {selectedPackage === pkg && <View style={styles.packageRadioInner} />}
                  </View>
                  <View style={styles.packageInfo}>
                    <Text style={styles.packageName}>{SERVICE_PACKAGES[pkg].name}</Text>
                    <Text style={styles.packageDuration}>{SERVICE_PACKAGES[pkg].duration}</Text>
                  </View>
                  <Text style={styles.packagePrice}>₹{SERVICE_PACKAGES[pkg].price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 2: Select Date & Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Select Date & Time</Text>
            
            {/* Date Strip */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.dateStrip}
              contentContainerStyle={styles.dateStripContent}
            >
              {DATES.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    selectedDate === index && styles.dateItemActive,
                  ]}
                  onPress={() => setSelectedDate(index)}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      selectedDate === index && styles.dateDayActive,
                    ]}
                  >
                    {date.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      selectedDate === index && styles.dateNumberActive,
                    ]}
                  >
                    {date.date}
                  </Text>
                  <Text
                    style={[
                      styles.dateMonth,
                      selectedDate === index && styles.dateMonthActive,
                    ]}
                  >
                    {date.month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time Slots */}
            <View style={styles.timeSlots}>
              {TIME_SLOTS.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    selectedTime === index && styles.timeSlotActive,
                  ]}
                  onPress={() => setSelectedTime(index)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === index && styles.timeTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 3: Your Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Your Address</Text>
            <View style={styles.addressCard}>
              <View style={styles.addressIcon}>
                <MapPin size={20} color={COLORS.accent} />
              </View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressType}>{address.type}</Text>
                <Text style={styles.addressText}>{address.address}</Text>
                <Text style={styles.addressCity}>
                  {address.city} - {address.pincode}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addAddressBtn}>
              <Text style={styles.addAddressText}>+ Add new address</Text>
            </TouchableOpacity>
          </View>

          {/* Section 4: Apply Coupon */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Apply Coupon</Text>
            <View style={styles.couponInputRow}>
              <View style={styles.couponInput}>
                <Tag size={18} color={COLORS.textMuted} />
                <TextInput
                  style={styles.couponTextInput}
                  placeholder="Enter coupon code"
                  placeholderTextColor={COLORS.textMuted}
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
              </View>
              <TouchableOpacity style={styles.applyBtn} onPress={applyCoupon}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            
            {appliedCoupon && (
              <View style={styles.appliedCoupon}>
                <Check size={16} color={COLORS.success} />
                <Text style={styles.appliedCouponText}>
                  {appliedCoupon.code} applied! You save ₹{appliedCoupon.discount}
                </Text>
              </View>
            )}

            {/* Available Coupons */}
            <View style={styles.availableCoupons}>
              <Text style={styles.availableCouponsTitle}>Available Offers:</Text>
              {COUPONS.map((coupon) => (
                <TouchableOpacity
                  key={coupon.code}
                  style={styles.couponItem}
                  onPress={() => {
                    setCouponCode(coupon.code);
                    setAppliedCoupon(coupon);
                  }}
                >
                  <View style={styles.couponCodeBadge}>
                    <Text style={styles.couponCodeText}>{coupon.code}</Text>
                  </View>
                  <Text style={styles.couponDescription}>
                    Save ₹{coupon.discount} — {coupon.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section 5: Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Order Summary</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryService}>{service.name}</Text>
              <Text style={styles.summaryPackage}>
                {currentPackage.name} Package · {DATES[selectedDate].day}, {DATES[selectedDate].date} {DATES[selectedDate].month} · {TIME_SLOTS[selectedTime]}
              </Text>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Base Price</Text>
                <Text style={styles.summaryValue}>₹{basePrice}</Text>
              </View>
              {appliedCoupon && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabelGreen}>Discount ({appliedCoupon.code})</Text>
                  <Text style={styles.summaryValueGreen}>-₹{discount}</Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Platform Fee</Text>
                <Text style={styles.summaryValue}>₹{platformFee}</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotalValue}>₹{total}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.confirmBtn}>
            <Lock size={18} color={COLORS.textWhite} />
            <Text style={styles.confirmBtnText}>Confirm Booking — ₹{total}</Text>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  // Package Options
  packageOptions: {
    gap: 10,
  },
  packageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: COLORS.backgroundAlt,
  },
  packageOptionActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '08',
  },
  packageRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  packageRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  packageDuration: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  packagePrice: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  // Date Strip
  dateStrip: {
    marginBottom: 16,
  },
  dateStripContent: {
    gap: 8,
  },
  dateItem: {
    width: 60,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    marginRight: 8,
  },
  dateItemActive: {
    backgroundColor: COLORS.accent,
  },
  dateDay: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dateDayActive: {
    color: COLORS.textWhite,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dateNumberActive: {
    color: COLORS.textWhite,
  },
  dateMonth: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  dateMonthActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  // Time Slots
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeSlotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  timeTextActive: {
    color: COLORS.textWhite,
  },
  // Address
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 14,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  addressCity: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
  },
  addAddressBtn: {
    marginTop: 12,
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Coupon
  couponInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  couponTextInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  appliedCoupon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  appliedCouponText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
  },
  availableCoupons: {
    marginTop: 16,
  },
  availableCouponsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  couponItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    gap: 10,
  },
  couponCodeBadge: {
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  couponCodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  couponDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  // Summary
  summaryCard: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 16,
    padding: 16,
  },
  summaryService: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  summaryPackage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  summaryLabelGreen: {
    fontSize: 14,
    color: COLORS.success,
  },
  summaryValueGreen: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.success,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  // Bottom Bar
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
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
});
