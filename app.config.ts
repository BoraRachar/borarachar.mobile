import { ConfigContext, ExpoConfig } from 'expo/config'

type Environment = 'development' | 'preview' | 'production'

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = '4cd46f24-936d-4ef9-8432-dfff6b8d1c3d'
const PROJECT_SLUG = 'borarachar-mobile'
const OWNER = 'rachaconta'

// App production config
const APP_NAME = 'Bora Rachar'
const BUNDLE_IDENTIFIER = 'com.rachaconta.borarachar.mobile'
const PACKAGE_NAME = 'com.rachaconta.borarachar.mobile'
const SCHEME = 'app-scheme'

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.APP_ENV)
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig((process.env.APP_ENV as Environment) || 'development')

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version: '1.0.6',
    orientation: 'portrait',
    icon,
    scheme,
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier,
    },
    android: {
      adaptiveIcon,
      package: packageName,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-secure-store',
      [
        'expo-image-picker',
        {
          photosPermission: 'custom photos permission',
          cameraPermission: 'Allow $(PRODUCT_NAME) to open the camera',
          '//': 'Disables the microphone permission',
          microphonePermission: false,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: OWNER,
  }
}

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production',
) => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      scheme: SCHEME,
      icon: './assets/images/ios-prod.png',
      adaptiveIcon: {
        foregroundImage: './assets/images/android-prod.png',
        backgroundColor: '#ffffff',
      },
    }
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      scheme: `${SCHEME}-prev`,
      icon: './assets/images/ios-prev.png',
      adaptiveIcon: {
        foregroundImage: './assets/images/android-prev.png',
        backgroundColor: '#ffffff',
      },
    }
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    scheme: `${SCHEME}-dev`,
    icon: './assets/images/ios-dev.png',
    adaptiveIcon: {
      foregroundImage: './assets/images/android-dev.png',
      backgroundColor: '#ffffff',
    },
  }
}
