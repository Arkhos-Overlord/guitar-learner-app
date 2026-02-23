import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";

import { ScreenContainer } from "@/components/screen-container";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Theme switching would be handled by the theme provider context
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="bg-primary px-6 py-6 pt-8">
          <Text className="text-3xl font-bold text-white">Settings</Text>
          <Text className="text-sm text-white opacity-90 mt-1">Customize your experience</Text>
        </View>

        {/* Settings Content */}
        <View className="px-6 py-8 gap-6">
          {/* Display Section */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-4">Display</Text>

            {/* Dark Mode Toggle */}
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Dark Mode</Text>
                <Text className="text-xs text-muted mt-1">Use dark theme for reduced eye strain</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: "#E5E7EB", true: "#0a7ea4" }}
              />
            </View>
          </View>

          {/* Audio Section */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-4">Audio</Text>

            {/* Notifications */}
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Notifications</Text>
                <Text className="text-xs text-muted mt-1">Get reminders to practice</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E5E7EB", true: "#0a7ea4" }}
              />
            </View>
          </View>

          {/* About Section */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-4">About</Text>

            {/* App Version */}
            <View className="bg-surface rounded-lg p-4 border border-border mb-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-foreground">App Version</Text>
                <Text className="text-sm text-muted">1.0.0</Text>
              </View>
            </View>

            {/* Credits */}
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-base font-semibold text-foreground mb-3">Credits</Text>
              <Text className="text-xs text-muted leading-relaxed mb-3">
                Guitar Learner features copyright-free traditional songs sourced from public domain collections.
              </Text>
              <Text className="text-xs text-muted leading-relaxed">
                Songs are provided by Traditionalsongs.org and similar public domain music repositories.
              </Text>
            </View>
          </View>

          {/* Help Section */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-4">Help</Text>

            {/* Getting Started */}
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
                <Text className="text-base font-semibold text-foreground">Getting Started Guide</Text>
                <Text className="text-primary">→</Text>
              </View>
            </Pressable>

            {/* FAQ */}
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className="mt-3"
            >
              <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
                <Text className="text-base font-semibold text-foreground">Frequently Asked Questions</Text>
                <Text className="text-primary">→</Text>
              </View>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center py-6 border-t border-border mt-4">
            <Text className="text-xs text-muted">Guitar Learner © 2026</Text>
            <Text className="text-xs text-muted mt-1">Free and open for all learners</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
