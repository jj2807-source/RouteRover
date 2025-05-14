import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './../configs/FirebaseConfig';

export default function FindSchools() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'UserSchools'), where('userEmail', '==', auth.currentUser?.email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log('No search results found.');
        setSearchResults([]);
      } else {
        const results = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setSearchResults(results.reverse());
      }
    } catch (err) {
      console.error('Failed to fetch search results:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    let schoolSearchData = item.schoolSearchData;
    try {
      if (typeof schoolSearchData === 'string') {
        schoolSearchData = JSON.parse(schoolSearchData);
      }
    } catch (error) {
      console.error("Error parsing schoolSearchData", error);
      schoolSearchData = {};
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push({ pathname: '/viewschoolresult', params: { docId: item.docId } })}
      >
        <Text style={styles.cardTitle}>{schoolSearchData.location || 'Unknown Location'}</Text>
        <Text style={styles.cardSubtitle}>
          Age: {schoolSearchData.age || 'N/A'}, Disability: {schoolSearchData.disability || 'N/A'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/homepage')}>
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schools</Text>
      </View>

      {/* "Find Schools" Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/fillingdetails')}>
        <Ionicons name="add-circle-outline" size={30} color="#111" />
        <Text style={styles.addText}>Find Schools</Text>
      </TouchableOpacity>

      {/* Results or Loading */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : searchResults.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 16 }}>No searches found. Start a new one!</Text>
      ) : (
        <FlatList data={searchResults} keyExtractor={(item) => item.docId} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  addText: { fontSize: 18, fontWeight: '600', marginLeft: 10 },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: '#4b5563', marginTop: 4 },
});
