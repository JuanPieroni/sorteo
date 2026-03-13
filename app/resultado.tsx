import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useSorteoStore } from "@/store/sorteoStore";
import { colors, spacing, borderRadius, typography, shadows } from "@/constants/theme";

export default function ResultadoScreen() {
  const router = useRouter();
  const { lastWinner, participants } = useSorteoStore();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -8, duration: 700, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (!lastWinner) {
    router.back();
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Confetti emoji row */}
        <Text style={styles.confetti}>🎉 🎊 🎉</Text>

        {/* Winner Card */}
        <Animated.View
          style={[
            styles.winnerCard,
            {
              transform: [
                { scale: scaleAnim },
                { translateY: bounceAnim },
              ],
            },
          ]}
        >
          <Text style={styles.trophyEmoji}>🏆</Text>
          <Text style={styles.winnerLabel}>¡El ganador es!</Text>
          <Text style={styles.winnerName}>{lastWinner.name}</Text>
        </Animated.View>

        <Animated.View style={[styles.info, { opacity: fadeAnim }]}>
          <Text style={styles.infoText}>
            🎯 Elegido entre {participants.length} participantes
          </Text>
        </Animated.View>

        {/* Actions */}
        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryBtnText}>🎰 Sortear de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push("/(tabs)/historial")}
          >
            <Text style={styles.secondaryBtnText}>📋 Ver historial</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.xl,
  },
  confetti: {
    fontSize: 36,
    letterSpacing: 8,
  },
  winnerCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: "center",
    width: "100%",
    ...shadows.lg,
    gap: spacing.md,
  },
  trophyEmoji: {
    fontSize: 72,
  },
  winnerLabel: {
    ...typography.bodySmall,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "600",
  },
  winnerName: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
  },
  info: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  infoText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
  actions: {
    width: "100%",
    gap: spacing.md,
  },
  primaryBtn: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    ...shadows.md,
  },
  primaryBtnText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  secondaryBtnText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
