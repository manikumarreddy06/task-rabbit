import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Gift,
  LogOut,
  ChevronRight,
  BadgeCheck,
  Star,
  Briefcase,
  FileText,
  GraduationCap,
  Repeat,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { useApp } from '../../src/context/AppContext';

// Customer Profile
function CustomerProfile() {
  const { user, setUserType } = useApp();

  const menuItems = [
    { icon: MapPin, label: 'My Addresses', color: '#3B82F6' },
    { icon: CreditCard, label: 'Payment Methods', color: '#10B981' },
    { icon: Bell, label: 'Notifications', color: '#F59E0B' },
    { icon: HelpCircle, label: 'Help & Support', color: '#8B5CF6' },
    { icon: Gift, label: 'Refer & Earn', color: '#EC4899' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.tasksPosted}</Text>
            <Text style={styles.statLabel}>Tasks Posted</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.bookingsDone}</Text>
            <Text style={styles.statLabel}>Bookings Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.reviewsGiven}</Text>
            <Text style={styles.statLabel}>Reviews Given</Text>
          </View>
        </View>

        {/* Switch to Tasker */}
        <TouchableOpacity
          style={styles.switchModeCard}
          onPress={() => setUserType('tasker')}
        >
          <View style={styles.switchModeIcon}>
            <Repeat size={24} color={COLORS.accent} />
          </View>
          <View style={styles.switchModeText}>
            <Text style={styles.switchModeTitle}>Switch to Tasker View</Text>
            <Text style={styles.switchModeSubtitle}>Earn money by completing tasks</Text>
          </View>
          <ChevronRight size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <View style={styles.referralInfo}>
            <Text style={styles.referralTitle}>Your Referral Code</Text>
            <View style={styles.referralCodeBox}>
              <Text style={styles.referralCode}>ARJUN2024</Text>
            </View>
            <Text style={styles.referralSubtext}>Share & earn ₹100 for each friend</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn}>
          <LogOut size={20} color={COLORS.statusCancelledText} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Tasker Profile
function TaskerProfile() {
  const { user, setUserType, isTaskerOnline, setIsTaskerOnline } = useApp();
  const taskerUser = user as typeof import('../../src/constants/mockData').USER_PROFILE.tasker;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            {taskerUser.verified && (
              <View style={styles.verifiedBadge}>
                <BadgeCheck size={18} color={COLORS.textWhite} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.taskerSpecialty}>{taskerUser.specialty}</Text>
          <View style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{taskerUser.rating}</Text>
            <Text style={styles.jobsText}>({taskerUser.totalJobs} jobs)</Text>
          </View>
        </View>

        {/* Online Toggle */}
        <View style={styles.onlineToggleCard}>
          <View>
            <Text style={styles.toggleTitle}>Accept New Tasks</Text>
            <Text style={styles.toggleSubtitle}>
              {isTaskerOnline ? 'You are visible to customers' : 'You are hidden from customers'}
            </Text>
          </View>
          <Switch
            value={isTaskerOnline}
            onValueChange={setIsTaskerOnline}
            trackColor={{ false: COLORS.border, true: COLORS.success + '50' }}
            thumbColor={isTaskerOnline ? COLORS.success : COLORS.textMuted}
          />
        </View>

        {/* Skills */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>My Skills</Text>
          <View style={styles.skillsGrid}>
            {taskerUser.skills.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.verificationSection}>
          <Text style={styles.sectionTitle}>Verification Status</Text>
          <View style={styles.verificationList}>
            <View style={styles.verificationItem}>
              <View style={[styles.verificationIcon, { backgroundColor: COLORS.success + '15' }]}>
                <FileText size={18} color={COLORS.success} />
              </View>
              <Text style={styles.verificationLabel}>ID Verified</Text>
              <View style={styles.verifiedCheck}>
                <BadgeCheck size={18} color={COLORS.success} />
              </View>
            </View>
            <View style={styles.verificationItem}>
              <View style={[styles.verificationIcon, { backgroundColor: COLORS.success + '15' }]}>
                <GraduationCap size={18} color={COLORS.success} />
              </View>
              <Text style={styles.verificationLabel}>Training Completed</Text>
              <View style={styles.verifiedCheck}>
                <BadgeCheck size={18} color={COLORS.success} />
              </View>
            </View>
            <View style={styles.verificationItem}>
              <View style={[styles.verificationIcon, { backgroundColor: COLORS.success + '15' }]}>
                <CreditCard size={18} color={COLORS.success} />
              </View>
              <Text style={styles.verificationLabel}>Bank Account Linked</Text>
              <View style={styles.verifiedCheck}>
                <BadgeCheck size={18} color={COLORS.success} />
              </View>
            </View>
          </View>
        </View>

        {/* Switch to Customer */}
        <TouchableOpacity
          style={styles.switchModeCard}
          onPress={() => setUserType('customer')}
        >
          <View style={styles.switchModeIcon}>
            <Repeat size={24} color={COLORS.accent} />
          </View>
          <View style={styles.switchModeText}>
            <Text style={styles.switchModeTitle}>Switch to Customer View</Text>
            <Text style={styles.switchModeSubtitle}>Book services for yourself</Text>
          </View>
          <ChevronRight size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn}>
          <LogOut size={20} color={COLORS.statusCancelledText} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ProfileScreen() {
  const { userType } = useApp();

  if (userType === 'tasker') {
    return <TaskerProfile />;
  }

  return <CustomerProfile />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 12,
    right: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userPhone: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  taskerSpecialty: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  jobsText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundAlt,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  // Switch Mode Card
  switchModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '10',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
  },
  switchModeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchModeText: {
    flex: 1,
    marginLeft: 12,
  },
  switchModeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  switchModeSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  // Menu Section
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginLeft: 12,
  },
  // Referral Card
  referralCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
  },
  referralInfo: {
    alignItems: 'center',
  },
  referralTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  referralCodeBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  referralCode: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 2,
  },
  referralSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 12,
  },
  // Sign Out
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.statusCancelledText,
    borderRadius: 12,
    gap: 8,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.statusCancelledText,
  },
  // Tasker Styles
  onlineToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.backgroundAlt,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  toggleSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  skillsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  verificationSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  verificationList: {
    gap: 12,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    padding: 14,
    borderRadius: 12,
  },
  verificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginLeft: 12,
  },
  verifiedCheck: {
    marginLeft: 'auto',
  },
});
