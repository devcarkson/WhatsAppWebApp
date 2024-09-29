import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const desktopUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  // Injected JavaScript to modify the viewport
  const injectedJS = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);

    // Disable body overflow and set width/height
    document.body.style.overflow = 'hidden';
    document.body.style.width = '200vw';
    document.body.style.height = '100vh';
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://web.whatsapp.com' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        userAgent={desktopUserAgent}
        injectedJavaScript={injectedJS}
        scalesPageToFit={false} // Disable default scaling
        startInLoadingState={true} // Show a loading indicator
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('HTTP error: ', nativeEvent);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
