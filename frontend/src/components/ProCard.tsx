import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, BadgeCheck } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../constants/colors';

interface ProCardProps {
  pro: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    jobs: number;
    hourlyRate: number;
    image: string;
    verified: boolean;
    availability: string;
  };
  onPress?: () => void;
}

export default function ProCard({ pro, onPress }: ProCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pro.image }} style={styles.image} />
        {pro.verified && (
          <View style={styles.verifiedBadge}>
            <BadgeCheck size={14} color={COLORS.textWhite} />
          </View>
        )}
      </View>
      <Text style={styles.name}>{pro.name}</Text>
      <Text style={styles.specialty}>{pro.specialty}</Text>
      <View style={styles.ratingRow}>
        <Star size={12} color="#F59E0B" fill="#F59E0B" />
        <Text style={styles.rating}>{pro.rating}</Text>
        <Text style={styles.jobs}>({pro.jobs} jobs)</Text>
      </View>
      <Text style={styles.rate}>₹{pro.hourlyRate}/hr</Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  jobs: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
  rate: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bookText: {
    color: COLORS.textWhite,
    fontSize: 12,
    fontWeight: '600',
  },
});
