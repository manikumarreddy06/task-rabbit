import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Status = 'confirmed' | 'pending' | 'in_progress' | 'cancelled' | 'completed' | 'upcoming';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { bg: string; text: string; label: string }> = {
  confirmed: {
    bg: COLORS.statusConfirmed,
    text: COLORS.statusConfirmedText,
    label: 'Confirmed',
  },
  pending: {
    bg: COLORS.statusPending,
    text: COLORS.statusPendingText,
    label: 'Pending',
  },
  in_progress: {
    bg: COLORS.statusInProgress,
    text: COLORS.statusInProgressText,
    label: 'In Progress',
  },
  cancelled: {
    bg: COLORS.statusCancelled,
    text: COLORS.statusCancelledText,
    label: 'Cancelled',
  },
  completed: {
    bg: COLORS.statusCompleted,
    text: COLORS.statusCompletedText,
    label: 'Completed',
  },
  upcoming: {
    bg: COLORS.statusInProgress,
    text: COLORS.statusInProgressText,
    label: 'Upcoming',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
