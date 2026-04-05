import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

interface PromoBannerProps {
  banner: {
    id: string;
    title: string;
    subtitle: string;
    code: string;
    gradient: string[];
    image?: string;
  };
  onPress?: () => void;
}

export default function PromoBanner({ banner, onPress }: PromoBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.gradient, { backgroundColor: banner.gradient[0] }]}>
        <View style={styles.content}>
          <Text style={styles.title}>{banner.title}</Text>
          <Text style={styles.subtitle}>{banner.subtitle}</Text>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{banner.code}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 140,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  codeBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textWhite,
    letterSpacing: 1,
  },
});
