import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {

  return (
    <ClerkProvider tokenCache={tokenCache}>  {/* 15. add tokenCache prop */}
    <Stack screenOptions={{ headerShown: false }}> {/* 1. hide header */}
      <Stack.Screen name="index"/>


    </Stack>

     </ClerkProvider>
  );
}
