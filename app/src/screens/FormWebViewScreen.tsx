import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { LoadingOverlay } from '@/components/LoadingOverlay';

type Props = NativeStackScreenProps<RootStackParamList, 'FormWebView'>;

export function FormWebViewScreen({ route }: Props) {
  const { form } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: form.enketo_url || 'https://enke.to' }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
      />
      {isLoading && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  webview: { flex: 1 },
});