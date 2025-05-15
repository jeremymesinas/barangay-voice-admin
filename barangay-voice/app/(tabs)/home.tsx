import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'expo-router';
import { useFonts } from "expo-font";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  RefreshControl, 
  ActivityIndicator 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { fetchConcerns, markConcernAsRead, deleteConcern } from '@/scripts/account-actions';

interface LocalConcern {
  id: string;
  concern_header: string;
  concern_content: string;
  created_at: string;
  read: boolean;
}

export default function AdminNotificationDashboard() {
  const router = useRouter();
    const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../../assets/fonts/Anton.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins.ttf"),
  });
  const [concerns, setConcerns] = useState<LocalConcern[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const loadConcerns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await fetchConcerns();

      if (fetchError) {
        throw new Error(fetchError);
      }

      const formattedConcerns: LocalConcern[] = (data || []).map(concern => ({
        ...concern,
        read: false
      }));

      setConcerns(formattedConcerns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadConcerns();
  }, [loadConcerns]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadConcerns();
  }, [loadConcerns]);

const handleViewDetails = (concern: LocalConcern) => {
  router.push({
    pathname: '/ReportDetails',
    params: {
      header: concern.concern_header,
      content: concern.concern_content,
      date: concern.created_at,
      id: concern.id,
      status: 'PENDING' // You might want to add status to your concern interface
    }
  });
};

  const handleDeleteConcern = async (id: string) => {
    const { error: deleteError } = await deleteConcern(id);
    if (!deleteError) {
      setConcerns(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleMarkAllAsRead = () => {
    setConcerns(prev => prev.map(c => ({ ...c, read: true })));
  };

  const handleClearAllRead = () => {
    setConcerns(prev => prev.filter(c => !c.read));
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA3A57" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.topHalf}>
          <View>
            <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
          </View>
          <Image
            source={require('@/assets/images/barangay-voice.png')}
            style={styles.topRightImage}
          />
        </View>
        <Text style={styles.errorText}>Error loading concerns: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadConcerns}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.topHalf}>
        <View>
          <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
        </View>
        <Image
          source={require('@/assets/images/barangay-voice.png')}
          style={styles.topRightImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Concern Notifications</Text>
          <TouchableOpacity onPress={loadConcerns}>
            <Ionicons name="refresh" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#EA3A57']}
              tintColor="#EA3A57"
            />
          }
        >
          {concerns.filter(c => !c.read).map(concern => (
<TouchableOpacity
  key={concern.id}
  style={styles.concernCard}
  onPress={() => handleViewDetails(concern)}
  onLongPress={() => handleDeleteConcern(concern.id)}
>
              <View style={styles.concernIcon}>
                <Ionicons name="alert-circle" size={24} color="#FF9800" />
              </View>
              
              <View style={styles.concernContent}>
                <Text style={styles.concernTitle}>{concern.concern_header}</Text>
                <Text style={styles.concernMessage}>{concern.concern_content}</Text>
                <Text style={styles.concernTime}>{formatTime(concern.created_at)}</Text>
              </View>
              
              {!concern.read && <View style={styles.unreadBadge} />}
            </TouchableOpacity>
          ))}

          {concerns.some(c => c.read) && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Previously Read</Text>
              </View>
              {concerns.filter(c => c.read).map(concern => (
                <TouchableOpacity
                  key={concern.id}
                  style={[styles.concernCard, styles.readConcern]}
                  onPress={() => handleDeleteConcern(concern.id)}
                >
                  <View style={styles.concernIcon}>
                    <Ionicons name="alert-circle" size={24} color="#9E9E9E" />
                  </View>
                  
                  <View style={styles.concernContent}>
                    <Text style={[styles.concernTitle, styles.readText]}>{concern.concern_header}</Text>
                    <Text style={[styles.concernMessage, styles.readText]}>{concern.concern_content}</Text>
                    <Text style={[styles.concernTime, styles.readText]}>{formatTime(concern.created_at)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>

        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleMarkAllAsRead}
          >
            <Ionicons name="checkmark-done" size={20} color="#333" />
            <Text style={styles.controlText}>Mark All Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleClearAllRead}
          >
            <Ionicons name="trash" size={20} color="#333" />
            <Text style={styles.controlText}>Clear Read</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentContainer: {
    flex: 1,
  },
  topHalf: {
    backgroundColor: "#A7D477",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  topLeftText: {
    fontFamily: "Anton-Regular",
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    paddingLeft: 10,
  },
  topRightImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#EA3A57',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingVertical: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 15,
  },
  sectionHeaderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  concernCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#EA3A57',
  },
  readConcern: {
    borderLeftColor: '#ddd',
    opacity: 0.8,
  },
  readText: {
    color: '#999',
  },
  concernIcon: {
    marginRight: 15,
  },
  concernContent: {
    flex: 1,
  },
  concernTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  concernMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  concernTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EA3A57',
    marginLeft: 10,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlText: {
    marginLeft: 5,
    color: '#333',
  },
});