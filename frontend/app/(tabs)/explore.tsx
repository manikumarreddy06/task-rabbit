import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  Star,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { useApp } from '../../src/context/AppContext';
import { SERVICES, TASKER_ACTIVE_JOBS } from '../../src/constants/mockData';
import StatusBadge from '../../src/components/StatusBadge';

const CATEGORIES = ['All', 'Salon', 'Cleaning', 'AC & Appliances', 'Electrician', 'Plumber', 'Beauty'];

// Customer Explore View
function CustomerExplore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredServices = SERVICES.filter((service) => {
    if (selectedCategory !== 'All') {
      const categoryMatch = service.name.toLowerCase().includes(selectedCategory.toLowerCase());
      if (!categoryMatch) return false;
    }
    if (searchQuery) {
      return service.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Services</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Search size={20} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryPillText,
                selectedCategory === cat && styles.categoryPillTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <ScrollView style={styles.servicesList} showsVerticalScrollIndicator={false}>
        {filteredServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => router.push({ pathname: '/service/[id]', params: { id: service.id } })}
            activeOpacity={0.8}
          >
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceProviders}>{service.providers}+ providers</Text>
              <View style={styles.serviceFooter}>
                <Text style={styles.servicePrice}>From ₹{service.startingPrice}</Text>
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                </View>
              </View>
            </View>
            <ChevronRight size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Tasker My Jobs View
function TaskerMyJobs() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Jobs</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Jobs List */}
      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        {TASKER_ACTIVE_JOBS.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCustomer}>{job.customerName}</Text>
              </View>
              <StatusBadge status={job.status as any} />
            </View>
            <View style={styles.jobDetails}>
              <Text style={styles.jobAddress}>{job.address}</Text>
              <Text style={styles.jobTime}>
                {job.date} · {job.scheduledTime}
              </Text>
            </View>
            <View style={styles.jobFooter}>
              <Text style={styles.jobEarnings}>₹{job.earnings}</Text>
              <View style={styles.jobActions}>
                <TouchableOpacity style={styles.actionBtnOutline}>
                  <Text style={styles.actionBtnOutlineText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnFilled}>
                  <Text style={styles.actionBtnFilledText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ExploreScreen() {
  const { userType } = useApp();

  if (userType === 'tasker') {
    return <TaskerMyJobs />;
  }

  return <CustomerExplore />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  // Category Pills
  categoryScroll: {
    marginTop: 16,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundAlt,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryPillTextActive: {
    color: COLORS.textWhite,
  },
  // Services List
  servicesList: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...SHADOWS.card,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 14,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  serviceProviders: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  // Tabs
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
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
  // Jobs List
  jobsList: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  jobCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.card,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  jobCustomer: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  jobDetails: {
    marginBottom: 12,
  },
  jobAddress: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  jobTime: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  jobEarnings: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.success,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtnOutline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnOutlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  actionBtnFilled: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
  },
  actionBtnFilledText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
});
