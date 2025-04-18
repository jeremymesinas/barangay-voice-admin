// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Maps to app/index.tsx */}
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LandingPage" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="SignUpOTP" options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" options={{ headerShown: false }} />
    </Stack>
  );
}