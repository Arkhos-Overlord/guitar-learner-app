import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useEffect } from "react";

import { ScreenContainer } from "@/components/screen-container";

const SONG_DETAILS: Record<number, any> = {
  1: {
    title: "Twinkle, Twinkle, Little Star",
    difficulty: "Beginner",
    category: "Children",
    tabs: "e|---0---0---0---0---\nB|---0---0---0---0---\nG|---0---0---0---0---\nD|---2---2---2---2---\nA|---2---2---2---2---\nE|---0---0---0---0---",
    chords: "G - D - G - D - G",
    lyrics: "Twinkle, twinkle, little star,\nHow I wonder what you are.\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  2: {
    title: "Amazing Grace",
    difficulty: "Beginner",
    category: "Hymn",
    tabs: "e|---0---0---0---0---\nB|---0---0---0---0---\nG|---0---0---0---0---\nD|---2---2---2---2---\nA|---2---2---2---2---\nE|---0---0---0---0---",
    chords: "G - D - G - D",
    lyrics: "Amazing grace, how sweet the sound,\nThat saved a wretch like me.\nI once was lost but now am found,\nWas blind but now I see.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
};

export default function SongDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [tempo, setTempo] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const songId = typeof id === "string" ? parseInt(id) : 1;
  const song = SONG_DETAILS[songId] || SONG_DETAILS[1];

  const player = useAudioPlayer(song.audioUrl);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    return () => {
      player.release();
    };
  }, [player]);

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await player.pause();
        setIsPlaying(false);
      } else {
        await player.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="bg-primary px-6 py-6 pt-8">
          <Pressable onPress={() => router.back()}>
            <Text className="text-white text-lg mb-4">← Back</Text>
          </Pressable>
          <Text className="text-3xl font-bold text-white">{song.title}</Text>
          <View className="flex-row gap-2 mt-3">
            <View className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-white">{song.difficulty}</Text>
            </View>
            <View className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-white">{song.category}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-6 py-8 gap-8">
          {/* Audio Player */}
          <View className="bg-surface rounded-xl p-6 border border-border">
            <View className="items-center gap-4">
              <Pressable
                onPress={handlePlayPause}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
                  <Text className="text-3xl text-white">{isPlaying ? "⏸" : "▶"}</Text>
                </View>
              </Pressable>

              {/* Tempo Control */}
              <View className="w-full gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-foreground">Tempo</Text>
                  <Text className="text-sm text-primary font-semibold">{(tempo * 100).toFixed(0)}%</Text>
                </View>
                <View className="flex-row gap-2">
                  <Pressable onPress={() => setTempo(Math.max(0.5, tempo - 0.1))}>
                    <View className="bg-primary px-4 py-2 rounded">
                      <Text className="text-white font-semibold">−</Text>
                    </View>
                  </Pressable>
                  <View className="flex-1 bg-surface border border-border rounded px-4 py-2 items-center justify-center">
                    <Text className="text-foreground font-semibold">{tempo.toFixed(1)}x</Text>
                  </View>
                  <Pressable onPress={() => setTempo(Math.min(1.5, tempo + 0.1))}>
                    <View className="bg-primary px-4 py-2 rounded">
                      <Text className="text-white font-semibold">+</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Chords */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-3">Chords</Text>
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-base font-mono text-primary">{song.chords}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-3">Tabs</Text>
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-xs font-mono text-muted leading-relaxed">{song.tabs}</Text>
            </View>
          </View>

          {/* Lyrics */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-3">Lyrics</Text>
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-foreground leading-relaxed">{song.lyrics}</Text>
            </View>
          </View>

          {/* Practice Tips */}
          <View className="bg-success bg-opacity-10 rounded-lg p-4 border border-success border-opacity-30">
            <Text className="text-sm font-semibold text-foreground mb-2">💡 Practice Tip</Text>
            <Text className="text-xs text-muted">Start slowly and focus on clean chord transitions. Use the tempo slider to practice at a comfortable pace.</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
