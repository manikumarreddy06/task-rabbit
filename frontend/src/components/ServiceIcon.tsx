import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Scissors,
  User,
  Sparkles,
  Wind,
  Zap,
  Wrench,
  Brush,
  Bug,
  Hammer,
} from 'lucide-react-native';
import { COLORS, SHADOWS } from '../constants/colors';

interface ServiceIconProps {
  name: string;
  icon: string;
  color: string;
  onPress?: () => void;
  selected?: boolean;
}

const iconMap: Record<string, any> = {
  Scissors,
  User,
  Sparkles,
  Wind,
  Zap,
  Wrench,
  Brush,
  Bug,
  Hammer,
};

export default function ServiceIcon({ name, icon, color, onPress, selected }: ServiceIconProps) {
  const IconComponent = iconMap[icon] || Sparkles;

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <IconComponent size={24} color={color} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    padding: 8,
  },
  selected: {
    backgroundColor: COLORS.accent + '10',
    borderRadius: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
