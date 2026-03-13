import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useSorteoStore } from "@/store/sorteoStore";
import { colors, spacing, borderRadius, typography, shadows } from "@/constants/theme";

export default function SorteoScreen() {
  const router = useRouter();
  const { participants, drawWinner, lastWinner } = useSorteoStore();
  const [isDrawing, setIsDrawing] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleDraw = () => {
    if (participants.length < 2) return;
    setIsDrawing(true);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
      ]),
    ]).start(() => {
      const winner = drawWinner();
      setIsDrawing(false);
      if (winner) {
        router.push("/resultado");
      }
    });
  };

  const canDraw = participants.length >= 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎰 Sorteo</Text>
        <Text style={styles.subtitle}>¡Que gane el mejor!</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{participants.length}</Text>
          <Text style={styles.statLabel}>Participantes</Text>
        </View>
        <View style={[styles.statCard, styles.statCardAccent]}>
          <Text style={styles.statNumber}>
            {participants.length > 0 ? `1/${participants.length}` : "—"}
          </Text>
          <Text style={styles.statLabel}>Premio</Text>
        </View>
      </View>

      {/* Draw Button */}
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.ballContainer,
            {
              transform: [
                { scale: scaleAnim },
                { translateX: shakeAnim },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.drawButton, !canDraw && styles.drawButtonDisabled]}
            onPress={handleDraw}
            disabled={!canDraw || isDrawing}
            activeOpacity={0.85}
          >
            <Text style={styles.drawEmoji}>{isDrawing ? "🎲" : "🎯"}</Text>
            <Text style={styles.drawButtonText}>
              {isDrawing ? "Sorteando..." : "¡SORTEAR!"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {!canDraw && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              {participants.length === 0
                ? "👥 Agregá participantes en la pestaña Participantes"
                : "⚠️ Necesitás al menos 2 participantes"}
            </Text>
          </View>
        )}
      </View>

      {/* Last Winner */}
      {lastWinner && (
        <View style={styles.lastWinnerBox}>
          <Text style={styles.lastWinnerLabel}>🏆 Último ganador</Text>
          <Text style={styles.lastWinnerName}>{lastWinner.name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  title: {
    ...typography.h1,
    fontSize: 36,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    ...shadows.sm,
  },
  statCardAccent: {
    backgroundColor: colors.primaryLight,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  ballContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  drawButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
    gap: spacing.sm,
  },
  drawButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  drawEmoji: {
    fontSize: 56,
  },
  drawButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 1,
  },
  warningBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    ...shadows.sm,
  },
  warningText: {
    ...typography.bodySmall,
    textAlign: "center",
  },
  lastWinnerBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    ...shadows.sm,
  },
  lastWinnerLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  lastWinnerName: {
    ...typography.h3,
    color: colors.primary,
  },
});
