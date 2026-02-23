import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

export default function HomeScreen() {
  const router = useRouter();

  const featuredSong = {
    title: "Twinkle, Twinkle, Little Star",
    difficulty: "Beginner",
    description: "A classic children's song perfect for beginners",
  };

  const recentSongs = [
    { id: 1, title: "Amazing Grace", difficulty: "Beginner" },
    { id: 2, title: "House of the Rising Sun", difficulty: "Intermediate" },
    { id: 3, title: "Scarborough Fair", difficulty: "Beginner" },
  ];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="bg-primary px-6 py-8 pt-12">
          <Text className="text-4xl font-bold text-white mb-2">Guitar Learner</Text>
          <Text className="text-base text-white opacity-90">Master the basics with timeless songs</Text>
        </View>

        {/* Main Content */}
        <View className="px-6 py-8 gap-8">
          {/* Featured Song Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
            <Text className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Featured Song</Text>
            <Text className="text-2xl font-bold text-foreground mb-2">{featuredSong.title}</Text>
            <Text className="text-sm text-muted mb-4">{featuredSong.description}</Text>
            <View className="flex-row items-center justify-between">
              <View className="bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-primary">{featuredSong.difficulty}</Text>
              </View>
              <Pressable
                onPress={() => router.push("/(tabs)/song-detail")}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-base font-semibold text-primary">Learn →</Text>
              </Pressable>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-3xl font-bold text-primary">0</Text>
              <Text className="text-xs text-muted mt-1">Songs Learned</Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-3xl font-bold text-success">0</Text>
              <Text className="text-xs text-muted mt-1">Day Streak</Text>
            </View>
          </View>

          {/* Browse Songs Button */}
          <Pressable
            onPress={() => router.push("/(tabs)/songs")}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View className="bg-primary rounded-xl py-4 px-6 items-center">
              <Text className="text-base font-semibold text-white">Browse All Songs</Text>
            </View>
          </Pressable>

          {/* Recent Songs Section */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-4">Recently Viewed</Text>
            <View className="gap-3">
              {recentSongs.map((song) => (
                <Pressable
                  key={song.id}
                  onPress={() => router.push("/song-detail")}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{song.title}</Text>
                      <Text className="text-xs text-muted mt-1">{song.difficulty}</Text>
                    </View>
                    <Text className="text-primary">▶</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Deep Dive CTA */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
            <Text className="text-sm font-semibold text-foreground mb-2">Ready to go deeper?</Text>
            <Text className="text-xs text-muted mb-3">Learn chords, theory, and use our metronome in the Lessons tab.</Text>
            <Pressable
              onPress={() => router.push("/(tabs)/lessons")}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-sm font-semibold text-warning">Explore Lessons →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
