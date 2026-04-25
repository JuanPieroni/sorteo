import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useSorteoStore, DrawResult } from "@/store/sorteoStore";
import { colors, spacing, borderRadius, typography, shadows } from "@/constants/theme";

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryCard({ item }: { item: DrawResult }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.trophyBadge}>
          <Text style={styles.trophyEmoji}>🎲</Text>
        </View>
        <View style={styles.cardHeaderInfo}>
          <Text style={styles.winnerName}>
            {item.mesas.length} Mesa{item.mesas.length !== 1 ? "s" : ""}
          </Text>
          <Text style={styles.cardDate}>{formatDate(item.drawnAt)}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.participantsLabel}>
        {item.participants.length} participantes:
      </Text>
      {item.mesas.map((mesa) => (
        <View key={mesa.mesaNumber} style={styles.mesaHistoryItem}>
          <Text style={styles.mesaHistoryTitle}>Mesa {mesa.mesaNumber}:</Text>
          <Text style={styles.mesaHistoryPlayers}>
            {mesa.players.map((p) => p.name).join(", ")}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function HistorialScreen() {
  const { history, clearHistory } = useSorteoStore();

  const handleClear = () => {
    if (history.length === 0) return;
    Alert.alert("Borrar historial", "¿Querés borrar todo el historial?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: clearHistory },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>📋 Historial</Text>
          <Text style={styles.subtitle}>
            {history.length} sorteo{history.length !== 1 ? "s" : ""} realizados
          </Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Borrar</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎱</Text>
          <Text style={styles.emptyTitle}>Sin historial todavía</Text>
          <Text style={styles.emptySubtitle}>
            Realizá tu primer sorteo y acá vas a ver los resultados
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
  },
  title: { ...typography.h2 },
  subtitle: { ...typography.bodySmall, marginTop: spacing.xs },
  clearBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "#FEE2E2",
    borderRadius: borderRadius.full,
  },
  clearBtnText: {
    color: colors.error,
    fontWeight: "600",
    fontSize: 13,
  },
  listContent: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  trophyBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: "#FEF9C3",
    alignItems: "center",
    justifyContent: "center",
  },
  trophyEmoji: { fontSize: 24 },
  cardHeaderInfo: { flex: 1 },
  winnerName: { ...typography.h3, color: colors.primary },
  cardDate: { ...typography.caption, marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  participantsLabel: { ...typography.caption, marginBottom: 2 },
  participantsList: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
  },
  mesaHistoryItem: {
    marginTop: spacing.xs,
  },
  mesaHistoryTitle: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.primary,
  },
  mesaHistoryPlayers: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { ...typography.h3, textAlign: "center" },
  emptySubtitle: {
    ...typography.bodySmall,
    textAlign: "center",
    maxWidth: 240,
  },
});
