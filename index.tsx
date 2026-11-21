import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { supabase, supabaseConfigured } from '../src/lib/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Your device is not sharing location.');
  const [busy, setBusy] = useState(false);

  async function sendLoginCode() {
    if (!supabaseConfigured || !supabase) {
      Alert.alert('Setup needed', 'Connect your Supabase project first. See SETUP-GUIDE.md.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Email required', 'Enter your email address.');
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim() });
    if (error) Alert.alert('Could not send code', error.message);
    else Alert.alert('Check your email', 'A sign-in link/code has been sent if email authentication is enabled.');
  }

  async function getCurrentLocation() {
    setBusy(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setStatus('Location permission was not granted.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setStatus(`Location permission works. Latitude: ${location.coords.latitude.toFixed(5)}, longitude: ${location.coords.longitude.toFixed(5)}. This is a local test only; it has not been uploaded.`);
    } catch (e) {
      setStatus('Could not read location. Check that Location is enabled on this phone.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logo}><Text style={styles.logoText}>PG</Text></View>
        <Text style={styles.title}>PHONEGUARD AI</Text>
        <Text style={styles.subtitle}>Your phone. Your account. Your control.</Text>
        <View style={styles.panel}>
          <Text style={styles.heading}>Owner sign-in</Text>
          <Text style={styles.copy}>Use your own email account to begin setting up a secure owner profile.</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Your email address" placeholderTextColor="#8792a6" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
          <TouchableOpacity style={styles.button} onPress={sendLoginCode}><Text style={styles.buttonText}>Send sign-in link</Text></TouchableOpacity>
        </View>
        <View style={styles.panel}>
          <Text style={styles.heading}>Test this phone's location</Text>
          <Text style={styles.copy}>Location is requested only after you tap the button. Nothing is uploaded in this starter test.</Text>
          <TouchableOpacity style={[styles.button, styles.secondary]} disabled={busy} onPress={getCurrentLocation}><Text style={styles.buttonText}>{busy ? 'Checking…' : 'Check my location permission'}</Text></TouchableOpacity>
          <Text style={styles.status}>{status}</Text>
        </View>
        <Text style={styles.notice}>Privacy first: tracking must be enabled by the registered owner. PHONEGUARD AI cannot locate a powered-off phone or retrieve GPS from a phone number or SIM alone.</Text>
        <Text style={styles.footer}>Starter build • Not ready for public release</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#08111f' },
  container: { padding: 24, paddingTop: 42, alignItems: 'stretch' },
  logo: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#d6ad55', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 14 },
  logoText: { color: '#08111f', fontSize: 25, fontWeight: '900' },
  title: { color: '#f7f4ec', fontSize: 27, fontWeight: '900', textAlign: 'center', letterSpacing: 1 },
  subtitle: { color: '#aeb9ca', textAlign: 'center', marginTop: 8, marginBottom: 28 },
  panel: { backgroundColor: '#121f32', borderColor: '#263650', borderWidth: 1, borderRadius: 16, padding: 18, marginBottom: 16 },
  heading: { color: '#f7f4ec', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  copy: { color: '#aeb9ca', lineHeight: 21, marginBottom: 14 },
  input: { backgroundColor: '#f7f4ec', borderRadius: 10, padding: 13, color: '#08111f', marginBottom: 12 },
  button: { backgroundColor: '#d6ad55', padding: 14, borderRadius: 10, alignItems: 'center' },
  secondary: { backgroundColor: '#34516f' },
  buttonText: { color: '#08111f', fontWeight: '800' },
  status: { color: '#dbe4f1', marginTop: 13, lineHeight: 20 },
  notice: { color: '#d9c28e', lineHeight: 21, marginTop: 8 },
  footer: { color: '#718097', textAlign: 'center', marginTop: 24, marginBottom: 18 }
});
