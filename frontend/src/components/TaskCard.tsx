import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, User } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../constants/colors';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    budget: number;
    location: string;
    distance?: string;
    timeAgo: string;
    category: string;
    offers: number;
    customerRating?: number;
  };
  onPress?: () => void;
  variant?: 'horizontal' | 'vertical';
  showActions?: boolean;
  onSkip?: () => void;
  onMakeOffer?: () => void;
}

const categoryColors: Record<string, string> = {
  Cleaning: '#10B981',
  Plumbing: '#6366F1',
  Beauty: '#EC4899',
  Moving: '#F59E0B',
  'AC Repair': '#06B6D4',
  Electrician: '#F59E0B',
};

export default function TaskCard({
  task,
  onPress,
  variant = 'horizontal',
  showActions = false,
  onSkip,
  onMakeOffer,
}: TaskCardProps) {
  const categoryColor = categoryColors[task.category] || COLORS.accent;

  if (variant === 'vertical') {
    return (
      <TouchableOpacity style={styles.verticalContainer} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.verticalHeader}>
          <View style={[styles.categoryTag, { backgroundColor: categoryColor + '20' }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>{task.category}</Text>
          </View>
          <Text style={styles.timeAgo}>{task.timeAgo}</Text>
        </View>
        <Text style={styles.verticalTitle} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color={COLORS.textSecondary} />
          <Text style={styles.location}>
            {task.location} {task.distance && `· ${task.distance}`}
          </Text>
        </View>
        <View style={styles.verticalFooter}>
          <Text style={styles.budget}>₹{task.budget}</Text>
          {task.customerRating && (
            <View style={styles.ratingBadge}>
              <User size={12} color={COLORS.textSecondary} />
              <Text style={styles.ratingText}>⭐ {task.customerRating}</Text>
            </View>
          )}
        </View>
        {showActions && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offerButton} onPress={onMakeOffer}>
              <Text style={styles.offerText}>Make Offer</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={[styles.categoryTag, { backgroundColor: categoryColor + '20' }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{task.category}</Text>
        </View>
        <Text style={styles.budget}>₹{task.budget}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {task.title}
      </Text>
      <View style={styles.footer}>
        <View style={styles.locationRow}>
          <MapPin size={12} color={COLORS.textMuted} />
          <Text style={styles.locationSmall}>{task.location}</Text>
        </View>
        <View style={styles.metaRow}>
          <Clock size={12} color={COLORS.textMuted} />
          <Text style={styles.meta}>{task.timeAgo}</Text>
        </View>
      </View>
      <View style={styles.offersRow}>
        <Text style={styles.offers}>{task.offers} offers</Text>
        <TouchableOpacity style={styles.makeOfferBtn}>
          <Text style={styles.makeOfferText}>Make Offer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    ...SHADOWS.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  budget: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSmall: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  location: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  offersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offers: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  makeOfferBtn: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  makeOfferText: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '600',
  },
  // Vertical variant
  verticalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.card,
  },
  verticalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeAgo: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 22,
  },
  verticalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  skipButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  offerButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
});
