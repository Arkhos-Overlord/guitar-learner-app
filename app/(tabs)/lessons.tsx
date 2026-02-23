import { ScrollView, Text, View, TouchableOpacity, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

const CHORDS = [
  { id: 1, name: "G Major", fingers: "1st fret: B, high E strings\n2nd fret: A, D strings\n3rd fret: B string", difficulty: "Beginner" },
  { id: 2, name: "D Major", fingers: "1st fret: B, high E strings\n2nd fret: D, G strings\n3rd fret: B string", difficulty: "Beginner" },
  { id: 3, name: "A Major", fingers: "1st fret: B, G strings\n2nd fret: D, high E strings", difficulty: "Beginner" },
  { id: 4, name: "E Major", fingers: "1st fret: G, D, A strings\n2nd fret: B, high E strings", difficulty: "Beginner" },
  { id: 5, name: "C Major", fingers: "1st fret: B, D, high E strings\n3rd fret: A, G strings", difficulty: "Intermediate" },
  { id: 6, name: "Em", fingers: "2nd fret: A, D strings", difficulty: "Beginner" },
];

export default function LessonsScreen() {
  const [activeTab, setActiveTab] = useState<"chords" | "metronome" | "theory">("chords");
  const [bpm, setBpm] = useState(80);
  const [isMetronomeRunning, setIsMetronomeRunning] = useState(false);

  const handleMetronomeToggle = async () => {
    if (isMetronomeRunning) {
      setIsMetronomeRunning(false);
    } else {
      setIsMetronomeRunning(true);
      // Simulate metronome tick
      for (let i = 0; i < 4; i++) {
        if (isMetronomeRunning) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          await new Promise((resolve) => setTimeout(resolve, (60000 / bpm) * 1000));
        }
      }
      setIsMetronomeRunning(false);
    }
  };

  const renderChordItem = ({ item }: { item: (typeof CHORDS)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-lg p-4 border border-border mb-3">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-semibold text-foreground">{item.name}</Text>
          <View className={`${item.difficulty === "Beginner" ? "bg-success" : "bg-warning"} bg-opacity-20 px-2 py-1 rounded`}>
            <Text className={`text-xs font-semibold ${item.difficulty === "Beginner" ? "text-success" : "text-warning"}`}>
              {item.difficulty}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-muted font-mono leading-relaxed">{item.fingers}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="bg-primary px-6 py-6 pt-8">
          <Text className="text-3xl font-bold text-white">Lessons</Text>
          <Text className="text-sm text-white opacity-90 mt-1">Deepen your guitar knowledge</Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row border-b border-border px-6 bg-background">
          {(["chords", "metronome", "theory"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className="flex-1"
            >
              <View
                className={`py-4 border-b-2 items-center ${
                  activeTab === tab ? "border-primary" : "border-transparent"
                }`}
              >
                <Text
                  className={`text-sm font-semibold capitalize ${
                    activeTab === tab ? "text-primary" : "text-muted"
                  }`}
                >
                  {tab}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Content */}
        {activeTab === "chords" && (
          <FlatList
            data={CHORDS}
            renderItem={renderChordItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
            scrollEnabled={true}
          />
        )}

        {activeTab === "metronome" && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8">
            <View className="flex-1 items-center justify-center gap-8">
              {/* BPM Display */}
              <View className="items-center gap-2">
                <Text className="text-6xl font-bold text-primary">{bpm}</Text>
                <Text className="text-base text-muted">BPM</Text>
              </View>

              {/* Metronome Toggle */}
              <Pressable
                onPress={handleMetronomeToggle}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                <View className={`w-24 h-24 rounded-full items-center justify-center ${isMetronomeRunning ? "bg-warning" : "bg-primary"}`}>
                  <Text className="text-5xl text-white">{isMetronomeRunning ? "⏸" : "▶"}</Text>
                </View>
              </Pressable>

              {/* BPM Controls */}
              <View className="w-full gap-4">
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() => setBpm(Math.max(40, bpm - 10))}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                    className="flex-1"
                  >
                    <View className="bg-primary px-4 py-3 rounded-lg items-center">
                      <Text className="text-white font-semibold">− 10</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => setBpm(Math.min(240, bpm + 10))}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                    className="flex-1"
                  >
                    <View className="bg-primary px-4 py-3 rounded-lg items-center">
                      <Text className="text-white font-semibold">+ 10</Text>
                    </View>
                  </Pressable>
                </View>

                {/* BPM Presets */}
                <View className="flex-row gap-2 flex-wrap">
                  {[60, 80, 100, 120].map((preset) => (
                    <Pressable
                      key={preset}
                      onPress={() => setBpm(preset)}
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <View
                        className={`px-4 py-2 rounded-lg border ${
                          bpm === preset ? "bg-primary border-primary" : "bg-surface border-border"
                        }`}
                      >
                        <Text className={`text-sm font-semibold ${bpm === preset ? "text-white" : "text-foreground"}`}>
                          {preset} BPM
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Info */}
              <View className="bg-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30 w-full">
                <Text className="text-sm font-semibold text-foreground mb-2">💡 How to Use</Text>
                <Text className="text-xs text-muted">
                  Tap play to start the metronome. Adjust BPM to practice at your desired tempo. Use this to build rhythm and consistency.
                </Text>
              </View>
            </View>
          </ScrollView>
        )}

        {activeTab === "theory" && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8">
            <View className="gap-6">
              {/* Major Scales */}
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-lg font-bold text-foreground mb-2">Major Scales</Text>
                <Text className="text-sm text-muted mb-3">
                  A major scale consists of 8 notes (octave). The pattern is: Whole, Whole, Half, Whole, Whole, Whole, Half.
                </Text>
                <Text className="text-xs font-mono text-primary">C Major: C - D - E - F - G - A - B - C</Text>
              </View>

              {/* Strumming Patterns */}
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-lg font-bold text-foreground mb-2">Basic Strumming Patterns</Text>
                <Text className="text-sm text-muted mb-3">
                  Down-Down-Up-Up-Down-Up is a common beginner pattern. Practice slowly with a metronome.
                </Text>
                <Text className="text-xs font-mono text-primary">D D U U D U</Text>
              </View>

              {/* Fingerstyle */}
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-lg font-bold text-foreground mb-2">Fingerstyle Basics</Text>
                <Text className="text-sm text-muted">
                  Use your thumb for bass strings (E, A, D) and fingers (index, middle, ring) for treble strings (G, B, high E).
                </Text>
              </View>

              {/* Practice Tips */}
              <View className="bg-success bg-opacity-10 rounded-lg p-4 border border-success border-opacity-30">
                <Text className="text-sm font-semibold text-foreground mb-2">🎯 Practice Tips</Text>
                <Text className="text-xs text-muted">
                  Start slow, focus on accuracy, then gradually increase speed. Consistency beats intensity—practice a little every day.
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ScreenContainer>
  );
}
