import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useSorteoStore, Participant } from "@/store/sorteoStore";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/constants/theme";

function ParticipantItem({
  item,
  index,
  onRemove,
}: {
  item: Participant;
  index: number;
  onRemove: (id: string) => void;
}) {
  return (
    <View style={styles.participantCard}>
      <View style={styles.participantBadge}>
        <Text style={styles.participantIndex}>{index + 1}</Text>
      </View>
      <Text style={styles.participantName} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => onRemove(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.removeBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ParticipantesScreen() {
  const { participants, addParticipant, removeParticipant, clearParticipants } =
    useSorteoStore();
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addParticipant(inputValue);
    setInputValue("");
  };

  const handleClearAll = () => {
    if (participants.length === 0) return;
    Alert.alert(
      "Eliminar todos",
      "¿Seguro que querés eliminar todos los participantes?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: clearParticipants,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>👥 Participantes</Text>
            <Text style={styles.subtitle}>
              {participants.length} participante
              {participants.length !== 1 ? "s" : ""} en el sorteo
            </Text>
          </View>
          {participants.length > 0 && (
            <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Limpiar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Nombre del participante..."
            placeholderTextColor={colors.textSecondary}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[
              styles.addBtn,
              !inputValue.trim() && styles.addBtnDisabled,
            ]}
            onPress={handleAdd}
            disabled={!inputValue.trim()}
          >
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        {participants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🙈</Text>
            <Text style={styles.emptyTitle}>No hay nadie todavía</Text>
            <Text style={styles.emptySubtitle}>
              Agregá los nombres de los participantes arriba
            </Text>
          </View>
        ) : (
          <FlatList
            data={participants}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ParticipantItem
                item={item}
                index={index}
                onRemove={removeParticipant}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: { flex: 1, padding: spacing.md },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h2,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
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
  inputRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    ...shadows.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.md,
  },
  addBtnDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  addBtnText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  listContent: {
    gap: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  participantCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.sm,
  },
  participantBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  participantIndex: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  participantName: {
    flex: 1,
    ...typography.body,
    fontWeight: "500",
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: "700",
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
