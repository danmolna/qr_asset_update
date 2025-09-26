# Android APK Build Útmutató

## Előfeltételek telepítése:

### 1. Java Development Kit (JDK)
```bash
# Windows (Chocolatey-vel)
choco install openjdk11

# Vagy letöltés: https://adoptium.net/
```

### 2. Android Studio vagy Android SDK
```bash
# Android Studio letöltése:
# https://developer.android.com/studio

# Vagy SDK csak:
# https://developer.android.com/studio#command-tools
```

### 3. Környezeti változók beállítása
```bash
# Windows
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-11.0.x.x-hotspot
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

## APK build parancsok:

```bash
# Debug APK
cd android
./gradlew assembleDebug

# Release APK (aláírt)
./gradlew assembleRelease
```

## APK fájl helye:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

## Gyors telepítés Androidra:
1. PWA verzió: Nyisd meg a böngészőben, majd "Add to Home Screen"
2. Vagy használj online APK builder szolgáltatást