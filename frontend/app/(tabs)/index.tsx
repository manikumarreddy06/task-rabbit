import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  MapPin,
  Search,
  Mic,
  ChevronRight,
  Briefcase,
  DollarSign,
  TrendingUp,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { useApp } from '../../src/context/AppContext';
import { SERVICES, TASKS, PROS, PROMO_BANNERS, TASKER_EARNINGS, TASKER_ACTIVE_JOBS } from '../../src/constants/mockData';
import ServiceIcon from '../../src/components/ServiceIcon';
import ProCard from '../../src/components/ProCard';
import TaskCard from '../../src/components/TaskCard';
import PromoBanner from '../../src/components/PromoBanner';
import StatusBadge from '../../src/components/StatusBadge';

// Tasker Dashboard Component
function TaskerDashboard() {
  const { user, isTaskerOnline, setIsTaskerOnline } = useApp();
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');
  const [distanceFilter, setDistanceFilter] = useState(5);

  const earnings = {
    today: TASKER_EARNINGS.today,
    week: TASKER_EARNINGS.thisWeek,
    month: TASKER_EARNINGS.thisMonth,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {user.name} 👋</Text>
            <Text style={styles.earningsSubtext}>
              ₹{TASKER_EARNINGS.today.toLocaleString()} earned today
            </Text>
          </View>
          <View style={styles.onlineToggle}>
            <Text style={[styles.onlineText, isTaskerOnline && styles.onlineTextActive]}>
              {isTaskerOnline ? 'Online' : 'Offline'}
            </Text>
            <TouchableOpacity
              style={[styles.toggleSwitch, isTaskerOnline && styles.toggleSwitchActive]}
              onPress={() => setIsTaskerOnline(!isTaskerOnline)}
            >
              <View style={[styles.toggleKnob, isTaskerOnline && styles.toggleKnobActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsTabs}>
            {(['today', 'week', 'month'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.earningsTab, activeTab === tab && styles.earningsTabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.earningsTabText, activeTab === tab && styles.earningsTabTextActive]}
                >
                  {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'This Month'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.earningsContent}>
            <Text style={styles.earningsAmount}>₹{earnings[activeTab].toLocaleString()}</Text>
            <View style={styles.earningsStats}>
              <View style={styles.statItem}>
                <Briefcase size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.statText}>
                  {activeTab === 'today'
                    ? TASKER_EARNINGS.tasksToday
                    : activeTab === 'week'
                    ? TASKER_EARNINGS.tasksWeek
                    : TASKER_EARNINGS.tasksWeek * 4}{' '}
                  tasks
                </Text>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.statText}>{TASKER_EARNINGS.acceptanceRate}% rate</Text>
              </View>
            </View>
            {/* Mini Chart */}
            <View style={styles.miniChart}>
              {TASKER_EARNINGS.weeklyData.map((day, index) => (
                <View key={day.day} style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartBarFill,
                      { height: (day.amount / 2000) * 50 },
                    ]}
                  />
                  <Text style={styles.chartLabel}>{day.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Distance Filter */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks Near You</Text>
            <View style={styles.distanceFilters}>
              {[2, 5, 10].map((km) => (
                <TouchableOpacity
                  key={km}
                  style={[
                    styles.distanceChip,
                    distanceFilter === km && styles.distanceChipActive,
                  ]}
                  onPress={() => setDistanceFilter(km)}
                >
                  <Text
                    style={[
                      styles.distanceChipText,
                      distanceFilter === km && styles.distanceChipTextActive,
                    ]}
                  >
                    {km} km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Task Feed */}
          {TASKS.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant="vertical"
              showActions
              onSkip={() => {}}
              onMakeOffer={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Customer Home Component
function CustomerHome() {
  const { user } = useApp();
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>TaskNest</Text>
          <TouchableOpacity style={styles.locationPill}>
            <MapPin size={14} color={COLORS.accent} />
            <Text style={styles.locationText}>Hyderabad</Text>
          </TouchableOpacity>
          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={22} color={COLORS.textPrimary} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>
          {getGreeting()}, {user.name} 👋
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services..."
            placeholderTextColor={COLORS.textMuted}
          />
          <TouchableOpacity>
            <Mic size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Promo Banners */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.promoBanners}
          contentContainerStyle={styles.promoContent}
        >
          {PROMO_BANNERS.map((banner) => (
            <PromoBanner key={banner.id} banner={banner} />
          ))}
        </ScrollView>

        {/* Popular Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <ServiceIcon
                key={service.id}
                name={service.name}
                icon={service.icon}
                color={service.color}
                onPress={() => router.push('/explore')}
              />
            ))}
          </View>
        </View>

        {/* Tasks Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks Posted Near You</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taskScroll}
          >
            {TASKS.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </ScrollView>
        </View>

        {/* Top Rated Pros */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Pros</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.prosScroll}
          >
            {PROS.map((pro) => (
              <ProCard key={pro.id} pro={pro} />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  const { userType } = useApp();

  if (userType === 'tasker') {
    return <TaskerDashboard />;
  }

  return <CustomerHome />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginLeft: 4,
    fontWeight: '500',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  // Greeting
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  // Promo Banners
  promoBanners: {
    marginTop: 20,
  },
  promoContent: {
    paddingHorizontal: 16,
  },
  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
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
  // Services Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  // Task Scroll
  taskScroll: {
    paddingRight: 16,
  },
  // Pros Scroll
  prosScroll: {
    paddingRight: 16,
  },
  // Tasker Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  earningsSubtext: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: 4,
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  onlineTextActive: {
    color: COLORS.success,
  },
  toggleSwitch: {
    width: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: COLORS.success,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.background,
  },
  toggleKnobActive: {
    marginLeft: 'auto',
  },
  // Earnings Card
  earningsCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    ...SHADOWS.card,
  },
  earningsTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 4,
  },
  earningsTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  earningsTabActive: {
    backgroundColor: COLORS.background,
  },
  earningsTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  earningsTabTextActive: {
    color: COLORS.primary,
  },
  earningsContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  earningsStats: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  // Mini Chart
  miniChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  chartBar: {
    alignItems: 'center',
    gap: 4,
  },
  chartBarFill: {
    width: 24,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
  // Distance Filters
  distanceFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  distanceChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundAlt,
  },
  distanceChipActive: {
    backgroundColor: COLORS.accent,
  },
  distanceChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  distanceChipTextActive: {
    color: COLORS.textWhite,
  },
});
