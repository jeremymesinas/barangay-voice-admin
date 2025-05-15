import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserConcerns } from '@/scripts/account-actions';

interface Concern {
  id: string;
  concern_header: string;
  concern_content: string;
  created_at: string;
  status: 'PENDING' | 'RESOLVED';
}

export default function Report() {
const [reports, setReports] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const { user } = useAuth();

  const loadConcerns = async () => {
    if (user?.id) {
      setLoading(true);
      const data = await fetchUserConcerns(user.id);
      setReports(data);
      setLoading(false);
      setRefreshing(false); // Make sure to set refreshing to false when done
    }
  };

  useEffect(() => {
    loadConcerns();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadConcerns();
  };

  useEffect(() => {
    const loadConcerns = async () => {
      if (user?.id) {
        setLoading(true);
        const data = await fetchUserConcerns(user.id);
        setReports(data);
        setLoading(false);
      }
    };

    loadConcerns();
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA3A57" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.topHalf}>
        <View>
          <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
        </View>
        <Image
          source={require('@/assets/images/barangay-voice.png')}
          style={styles.topRightImage}
        />
      </View>

      <Text style={styles.headerTitle}>YOUR REPORTS</Text>

<SafeAreaView style={styles.contentWrapper}>
        <ScrollView 
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#EA3A57']} // Customize the loading indicator color
              tintColor="#EA3A57" // For iOS
            />
          }
        >
          {reports.length === 0 ? (
            <Text style={styles.emptyMessage}>No reports found</Text>
          ) : (
            reports.map((report) => (
              <View key={report.id} style={styles.card}>
                <Image 
                  source={require('@/assets/images/logo.png')} 
                  style={styles.avatar} 
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.title}>{report.concern_header}</Text>
                  <Text style={styles.meta}>{formatDate(report.created_at)}</Text>
                  <Text
                    style={[
                      styles.status,
                      report.status === 'PENDING' ? styles.pending : styles.resolved,
                    ]}
                  >
                    {report.status}
                  </Text>
                </View>
<TouchableOpacity 
  style={styles.viewButton} 
  onPress={() => router.push({
    pathname: '/ReportDetails',
    params: { 
      id: report.id,
      header: report.concern_header,
      content: report.concern_content,
      date: report.created_at,
      status: report.status
    }
  })}
>
  <Text style={styles.viewText}>VIEW</Text>
</TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
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
  
  redBanner: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: 285,
    height: 83,
    alignSelf: 'center',
    marginTop: 15, // Adjusted margin to account for different header height
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center',    
    flexDirection: 'row',    
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', 
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor: '#E4F1AC',
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8D5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FF748B',
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA3A57',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pending: {
    color: '#f32d5d',
  },
  resolved: {
    color: '#4CAF50',
  },
  viewButton: {
    backgroundColor: '#E4F1AC',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF748B',
  },
  viewText: {
    color: '#EA3A57',
    fontWeight: 'bold',
    fontSize: 14,
  },
});