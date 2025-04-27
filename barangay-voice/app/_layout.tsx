// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Maps to app/index.tsx */}
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
          <Stack.Screen name="LandingPage" options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} />
          <Stack.Screen name="SignUpOTP" options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="ongoingcall" options={{ headerShown: false }} />
          <Stack.Screen name="Report" options={{ headerShown: false }} />
          <Stack.Screen name="ReportDetails" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  );
}
