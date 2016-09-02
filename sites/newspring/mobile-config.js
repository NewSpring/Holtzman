App.info({
  id: 'cc.newspring.newspringapp',
  name: 'NewSpring',
  description: 'App for NewSpring Church',
  author: 'NewSpring Church',
  email: 'web@newspring.cc',
  website: 'https://newspring.cc',
  version: '0.0.3',
  buildNumber: '133'
});

App.icons({
  // iOS
  'iphone_2x': 'assets/icons/ios/icon-60x60@2x.png',
  'iphone_3x': 'assets/icons/ios/icon-60x60@3x.png',
  'ipad': 'assets/icons/ios/icon-76x76.png',
  'ipad_2x': 'assets/icons/ios/icon-76x76@2x.png',
  'ipad_pro': 'assets/icons/ios/icon-83.5x83.5@2x.png',
  'ios_settings': 'assets/icons/ios/icon-29x29.png',
  'ios_settings_2x': 'assets/icons/ios/icon-29x29@2x.png',
  'ios_settings_3x': 'assets/icons/ios/icon-29x29@3x.png',
  'ios_spotlight': 'assets/icons/ios/icon-40x40.png',
  'ios_spotlight_2x': 'assets/icons/ios/icon-40x40@2x.png',

  // Android
  'android_mdpi': 'assets/icons/android/icon-48x48-mdpi.png',
  'android_hdpi': 'assets/icons/android/icon-72x72-hdpi.png',
  'android_xhdpi': 'assets/icons/android/icon-96x96-xhdpi.png',
  'android_xxhdpi': 'assets/icons/android/icon-144x144-xxhdpi.png',
  'android_xxxhdpi': 'assets/icons/android/icon-192x192-xxxhpdi.png'
});

App.launchScreens({
  // iOS
  'iphone_2x': 'assets/splash/ios/splash-320x480@2x.png',
  'iphone5': 'assets/splash/ios/splash-320x568@2x.png',
  'iphone6': 'assets/splash/ios/splash-667h.png',
  'iphone6p_portrait': 'assets/splash/ios/splash-1242h-portrait.png',
  'iphone6p_landscape': 'assets/splash/ios/splash-1242h-landscape.png',
  'ipad_portrait': 'assets/splash/ios/splash-768x1024.png',
  'ipad_portrait_2x': 'assets/splash/ios/splash-768x1024@2x.png',
  'ipad_landscape': 'assets/splash/ios/splash-1024x768.png',
  'ipad_landscape_2x': 'assets/splash/ios/splash-1024x768@2x.png',

  // Android
  'android_mdpi_portrait': 'assets/splash/android/splash-320x470.png',
  'android_mdpi_landscape': 'assets/splash/android/splash-470x320.png',
  'android_hdpi_portrait': 'assets/splash/android/splash-480x640.png',
  'android_hdpi_landscape': 'assets/splash/android/splash-640x480.png',
  'android_xhdpi_portrait': 'assets/splash/android/splash-720x960.png',
  'android_xhdpi_landscape': 'assets/splash/android/splash-960x720.png',
  'android_xxhdpi_portrait': 'assets/splash/android/splash-1080x1440.png',
  'android_xxhdpi_landscape': 'assets/splash/android/splash-1440x1080.png'
});

App.accessRule('*');

App.setPreference('EnableBitcode', false);
App.setPreference('ShowSplashScreenSpinner', false);
App.setPreference('SplashMaintainAspectRatio', true);

App.setPreference("StatusBarBackgroundColor", "#202020");
App.setPreference("StatusBarStyle", "lightcontent");

App.setPreference("Orientation", "portrait");
