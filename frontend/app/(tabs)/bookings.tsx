import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Star,
  Clock,
  MapPin,
  Phone,
  RotateCcw,
  X,
  DollarSign,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { useApp } from '../../src/context/AppContext';
import { BOOKINGS, TASKER_EARNINGS } from '../../src/constants/mockData';
import StatusBadge from '../../src/components/StatusBadge';

// Rating Modal Component
function RatingModal({ visible, onClose, booking }: {
  visible: boolean;
  onClose: () => void;
  booking: typeof BOOKINGS[0] | null;
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!booking) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <X size={24} color={COLORS.textMuted} />
          </TouchableOpacity>
          
          <View style={styles.modalHeader}>
            <Image source={{ uri: booking.proImage }} style={styles.modalProImage} />
            <Text style={styles.modalProName}>{booking.proName}</Text>
            <Text style={styles.modalServiceName}>{booking.serviceName}</Text>
          </View>

          <Text style={styles.ratingLabel}>How was your experience?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Star
                  size={36}
                  color="#F59E0B"
                  fill={star <= rating ? '#F59E0B' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience..."
            placeholderTextColor={COLORS.textMuted}
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Customer Bookings View
function CustomerBookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof BOOKINGS[0] | null>(null);

  const filteredBookings = BOOKINGS.filter((booking) => {
    if (activeTab === 'upcoming') return booking.status === 'confirmed';
    if (activeTab === 'completed') return booking.status === 'completed';
    return booking.status === 'cancelled';
  });

  const handleRate = (booking: typeof BOOKINGS[0]) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No {activeTab} bookings</Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Image source={{ uri: booking.serviceImage }} style={styles.bookingImage} />
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingServiceName}>{booking.serviceName}</Text>
                  <Text style={styles.bookingPackage}>{booking.package} Package</Text>
                  <View style={styles.bookingProRow}>
                    <Image source={{ uri: booking.proImage }} style={styles.bookingProImage} />
                    <Text style={styles.bookingProName}>{booking.proName}</Text>
                  </View>
                </View>
                <StatusBadge status={booking.status as any} />
              </View>

              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Clock size={14} color={COLORS.textMuted} />
                  <Text style={styles.detailText}>
                    {new Date(booking.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    · {booking.time}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={14} color={COLORS.textMuted} />
                  <Text style={styles.detailText}>{booking.address}</Text>
                </View>
              </View>

              {activeTab === 'upcoming' && (
                <View style={styles.countdownRow}>
                  <Text style={styles.countdownText}>Pro arrives in 2 hrs 30 mins</Text>
                </View>
              )}

              <View style={styles.bookingActions}>
                {activeTab === 'upcoming' && (
                  <>
                    <TouchableOpacity style={styles.actionBtnOutline}>
                      <Text style={styles.actionBtnOutlineText}>Track Pro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnOutline}>
                      <Text style={styles.actionBtnOutlineText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtnOutline, styles.cancelBtn]}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <TouchableOpacity
                      style={styles.actionBtnFilled}
                      onPress={() => handleRate(booking)}
                    >
                      <Star size={16} color={COLORS.textWhite} />
                      <Text style={styles.actionBtnFilledText}>Rate & Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnOutline}>
                      <RotateCcw size={16} color={COLORS.textSecondary} />
                      <Text style={styles.actionBtnOutlineText}>Rebook</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Total Paid</Text>
                <Text style={styles.priceValue}>₹{booking.price}</Text>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        booking={selectedBooking}
      />
    </SafeAreaView>
  );
}

// Tasker Earnings View
function TaskerEarnings() {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('week');

  const transactions = [
    { id: '1', title: 'AC Service - Split AC', date: 'Today, 2:30 PM', amount: 599, status: 'paid' },
    { id: '2', title: 'AC Installation', date: 'Yesterday, 11:00 AM', amount: 1299, status: 'paid' },
    { id: '3', title: 'AC Repair', date: 'Jul 12, 3:00 PM', amount: 449, status: 'pending' },
    { id: '4', title: 'AC Service', date: 'Jul 11, 10:00 AM', amount: 599, status: 'paid' },
    { id: '5', title: 'AC Deep Cleaning', date: 'Jul 10, 4:00 PM', amount: 799, status: 'paid' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.earningsSummary}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Earned</Text>
              <Text style={styles.summaryValue}>₹{TASKER_EARNINGS.thisMonth.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pending</Text>
              <Text style={[styles.summaryValue, styles.pendingValue]}>₹449</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <DollarSign size={18} color={COLORS.textWhite} />
            <Text style={styles.withdrawButtonText}>Withdraw Earnings</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.earningsTabs}>
          {(['today', 'week', 'month'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.earningsTab, activeTab === tab && styles.earningsTabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.earningsTabText, activeTab === tab && styles.earningsTabTextActive]}>
                {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'This Month'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.transactionsTitle}>Transaction History</Text>
          {transactions.map((txn) => (
            <View key={txn.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{txn.title}</Text>
                <Text style={styles.transactionDate}>{txn.date}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.transactionValue,
                  txn.status === 'pending' && styles.pendingValue
                ]}>
                  +₹{txn.amount}
                </Text>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: txn.status === 'paid' ? COLORS.success : COLORS.warning }
                ]} />
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function BookingsScreen() {
  const { userType } = useApp();

  if (userType === 'tasker') {
    return <TaskerEarnings />;
  }

  return <CustomerBookings />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  // Tabs
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.accent,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.accent,
  },
  // Bookings List
  bookingsList: {
    flex: 1,
    padding: 16,
  },
  bookingCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.card,
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookingImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookingServiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  bookingPackage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bookingProRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  bookingProImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bookingProName: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  bookingDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  countdownRow: {
    backgroundColor: COLORS.statusInProgress,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  countdownText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.statusInProgressText,
    textAlign: 'center',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnOutlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  actionBtnFilled: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
  },
  actionBtnFilledText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  cancelBtn: {
    borderColor: COLORS.statusCancelledText,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.statusCancelledText,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  priceLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  // Rating Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalProImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  modalProName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  modalServiceName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  reviewInput: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 100,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  // Tasker Earnings
  earningsSummary: {
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  summaryLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  pendingValue: {
    color: COLORS.warning,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.success,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  withdrawButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  earningsTabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 12,
    padding: 4,
  },
  earningsTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  earningsTabActive: {
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  earningsTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  earningsTabTextActive: {
    color: COLORS.textPrimary,
  },
  transactionsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    ...SHADOWS.small,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  transactionDate: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  transactionAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
