import { ScrollView, Text, View, TextInput, TouchableOpacity, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

const SONGS_DATA = [
  { id: 1, title: "Twinkle, Twinkle, Little Star", difficulty: "Beginner", category: "Children" },
  { id: 2, title: "Amazing Grace", difficulty: "Beginner", category: "Hymn" },
  { id: 3, title: "House of the Rising Sun", difficulty: "Intermediate", category: "Folk" },
  { id: 4, title: "Scarborough Fair", difficulty: "Beginner", category: "Folk" },
  { id: 5, title: "Jingle Bells", difficulty: "Beginner", category: "Christmas" },
  { id: 6, title: "Silent Night", difficulty: "Beginner", category: "Christmas" },
  { id: 7, title: "When the Saints Go Marching In", difficulty: "Beginner", category: "Spiritual" },
  { id: 8, title: "Oh My Darling, Clementine", difficulty: "Beginner", category: "Folk" },
  { id: 9, title: "500 Miles", difficulty: "Intermediate", category: "Folk" },
  { id: 10, title: "Auld Lang Syne", difficulty: "Beginner", category: "Traditional" },
];

export default function SongsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Beginner" | "Intermediate">("All");

  const filteredSongs = SONGS_DATA.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || song.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    return difficulty === "Beginner" ? "bg-success" : "bg-warning";
  };

  const renderSongItem = ({ item }: { item: (typeof SONGS_DATA)[0] }) => (
    <Pressable
      onPress={() => router.push({ pathname: "/(tabs)/song-detail", params: { id: item.id, title: item.title } })}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-lg p-4 border border-border mb-3 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{item.title}</Text>
          <View className="flex-row items-center gap-2 mt-2">
            <View className={`${getDifficultyColor(item.difficulty)} bg-opacity-20 px-2 py-1 rounded`}>
              <Text className={`text-xs font-semibold ${getDifficultyColor(item.difficulty).replace("bg-", "text-")}`}>
                {item.difficulty}
              </Text>
            </View>
            <Text className="text-xs text-muted">{item.category}</Text>
          </View>
        </View>
        <Text className="text-primary text-lg">▶</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="bg-primary px-6 py-6 pt-8">
          <Text className="text-3xl font-bold text-white">Song Library</Text>
          <Text className="text-sm text-white opacity-90 mt-1">Browse copyright-free songs</Text>
        </View>

        {/* Search and Filters */}
        <View className="px-6 py-4 gap-4 bg-background border-b border-border">
          {/* Search Bar */}
          <TextInput
            placeholder="Search songs..."
            placeholderTextColor="#9BA1A6"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
          />

          {/* Difficulty Filter */}
          <View className="flex-row gap-2">
            {(["All", "Beginner", "Intermediate"] as const).map((difficulty) => (
              <Pressable
                key={difficulty}
                onPress={() => setSelectedDifficulty(difficulty)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={`px-4 py-2 rounded-full border ${
                    selectedDifficulty === difficulty
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedDifficulty === difficulty ? "text-white" : "text-foreground"
                    }`}
                  >
                    {difficulty}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Songs List */}
        {filteredSongs.length > 0 ? (
          <FlatList
            data={filteredSongs}
            renderItem={renderSongItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted text-base">No songs found</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
