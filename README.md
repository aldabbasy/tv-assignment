# TV Video Player App - تطبيق مشغل الفيديو للتلفاز

A modern React Native TV application built with Expo Router, featuring HLS video streaming, atomic design components, and robust TV remote navigation.

## 🚀 Getting Started / البدء

### Prerequisites / المتطلبات المسبقة

- Node.js 18+
- pnpm (recommended) or yarn/npm
- Android Studio (for Android TV emulator)
- Xcode (for Apple TV Simulator - macOS only)

### Installation / التثبيت

```bash
# Clone the repository / استنساخ المستودع
git clone <repository-url>
cd tv-assignment

# Install dependencies using pnpm / تثبيت التبعيات باستخدام pnpm
pnpm install

# Or using yarn/npm
yarn install
# or
npm install
```

## UX Video

Watch the app in action showcasing the modern TV interface and navigation:

### App Demo Video

<!-- Alternative: If you have the video file in your repo -->
<video width="800" controls>
  <source src="./assets/ux-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Key Features Demonstrated:

- **Dynamic Featured Content**: Hero section updates based on focused video
- **Smooth Navigation**: TV remote navigation with left/right controls
- **Rich Metadata Display**: Shows video information including genre, rating, runtime, and cast
- **Focus Indicators**: Visual feedback for currently selected video
- **Responsive Layout**: Optimized for TV screen dimensions
- **Background Updates**: Dynamic backdrop images that change with focus

### Navigation Controls:

- **Left/Right Arrow Keys**: Navigate between videos in the carousel
- **Enter/Select**: Play the focused video
- **Focus stays on carousel**: Simplified navigation with carousel always active

> **Note**: The video demonstrates the seamless integration of the featured content section with the video carousel, showing how the background and metadata update dynamically as users navigate through the content.

## 📱 How to Run / طريقة التشغيل

### 1. Start the Development Server / تشغيل خادم التطوير

```bash
# Using pnpm (recommended) / استخدام pnpm (موصى به)
pnpm start

# Or using other package managers
yarn start
# or
npm start
```

This will start the Expo development server and show you options to run on different platforms.

### 2. Running on Android Studio / التشغيل على أندرويد ستوديو

#### Step 1: Setup Android Studio TV Emulator / الخطوة الأولى: إعداد محاكي تلفاز أندرويد ستوديو

1. **Open Android Studio** / افتح أندرويد ستوديو
2. **Go to AVD Manager** / اذهب إلى مدير AVD
   - Tools → AVD Manager أو الأدوات ← مدير AVD
3. **Create a New Virtual Device** / إنشاء جهاز افتراضي جديد
   - Click "Create Virtual Device" / انقر على "إنشاء جهاز افتراضي"
4. **Select TV Category** / اختر فئة التلفاز
   - Choose "TV" from the category list / اختر "التلفاز" من قائمة الفئات
   - Select a TV profile (e.g., "Android TV (1080p)") / اختر ملف تعريف التلفاز (مثل "أندرويد تي في (1080p)")
5. **Choose System Image** / اختر صورة النظام
   - Select an API level (API 28+ recommended) / اختر مستوى API (API 28+ موصى به)
   - Download if necessary / حمّل إذا لزم الأمر
6. **Finish Setup** / إنهاء الإعداد
   - Name your AVD / اسم AVD الخاص بك
   - Click "Finish" / انقر على "إنهاء"

#### Step 2: Start the TV Emulator / الخطوة الثانية: تشغيل محاكي التلفاز

1. **Launch the AVD** / تشغيل AVD

   - In AVD Manager, click the "Play" button ▶️ next to your TV emulator
   - في مدير AVD، انقر على زر "تشغيل" ▶️ بجانب محاكي التلفاز

2. **Wait for Boot** / انتظر التشغيل
   - Wait for the Android TV interface to fully load / انتظر حتى يتم تحميل واجهة أندرويد تي في بالكامل

#### Step 3: Run the App / الخطوة الثالثة: تشغيل التطبيق

```bash
# Make sure your development server is running
pnpm start

# In the Expo CLI menu, press 'a' for Android
# في قائمة Expo CLI، اضغط 'a' للأندرويد
```

Or you can run directly with:
أو يمكنك التشغيل مباشرة بـ:

```bash
# Build and run for Android TV / البناء والتشغيل لأندرويد تي في
pnpm android
# or
yarn android
# or
npm run android
```

### 3. Running on Apple TV Simulator / التشغيل على محاكي آبل تي في

```bash
# For Apple TV (macOS only) / لآبل تي في (ماك فقط)
pnpm ios
# or
yarn ios
# or
npm run ios
```

### 4. Running on Web / التشغيل على الويب

```bash
# For web testing / للاختبار على الويب
pnpm web
# or
yarn web
# or
npm run web
```

## 🎮 TV Remote Controls / أوامر ريموت التلفاز

| Action        | Remote Button | Description                      |
| ------------- | ------------- | -------------------------------- |
| Navigate      | ← → ↑ ↓       | Move between videos and controls |
| Select        | Enter/OK      | Play video or activate control   |
| Go Back       | Back/Menu     | Return to home screen            |
| Show Controls | Any key       | Show player controls             |
| Play/Pause    | Play/Pause    | Toggle video playback            |

## 🏗️ Architecture / الهيكلة

### Technologies Used / التقنيات المستخدمة

- **React Native TV OS** - React Native fork with TV support
- **Expo Router** - File-based navigation system
- **TypeScript** - Type safety and better development experience
- **Expo AV** - Video playback with HLS support
- **Atomic Design Pattern** - Scalable component architecture

### Project Structure / هيكل المشروع

```
├── app/                    # Expo Router pages
├── components/            # UI Components
│   ├── atoms/            # Basic building blocks
│   ├── molecules/        # Simple combinations
│   ├── organisms/        # Complex components
│   └── templates/        # Page layouts
├── hooks/                # Custom React hooks
├── screens/              # Screen components
├── constants/            # App constants
└── data/                 # Static data
```

## 🎯 Key Features / الميزات الرئيسية

- HLS video streaming support / دعم بث فيديو HLS
- TV-optimized navigation / تنقل محسن للتلفاز
- Focus management with visual indicators / إدارة التركيز مع مؤشرات بصرية
- Auto-scroll carousel / دائري بتمرير تلقائي
- Custom video controls / أدوات تحكم فيديو مخصصة
- Error handling and retry functionality / معالجة الأخطاء ووظيفة إعادة المحاولة

## 🛠️ Troubleshooting / استكشاف الأخطاء وإصلاحها

### Common Issues / المشاكل الشائعة

1. **Android Emulator not detected** / محاكي الأندرويد غير مكتشف

   - Make sure Android Studio is properly installed / تأكد من تثبيت أندرويد ستوديو بشكل صحيح
   - Check that the emulator is running / تحقق من تشغيل المحاكي
   - Try running `adb devices` to verify connection / جرب تشغيل `adb devices` للتحقق من الاتصال

2. **pnpm command not found** / أمر pnpm غير موجود

   ```bash
   # Install pnpm globally / تثبيت pnpm عالمياً
   npm install -g pnpm
   ```

3. **Video not playing** / الفيديو لا يعمل
   - Check internet connection / تحقق من اتصال الإنترنت
   - Verify HLS stream URLs are accessible / تحقق من إمكانية الوصول لروابط HLS

## 📱 Testing / الاختبار

### Manual Testing Checklist / قائمة الاختبار اليدوي

- ✅ Video playback on TV emulators
- ✅ Remote navigation (arrows, select, back)
- ✅ Focus indicators and visual feedback
- ✅ Auto-scroll functionality
- ✅ Error state handling
- ✅ Controls auto-hide behavior

## 🚀 Deployment / النشر

```bash
# Build for production / البناء للإنتاج
npx eas build --platform all

# Deploy website / نشر الموقع
npx eas deploy
```

## 🎨 New TV Interface Design / تصميم واجهة التلفاز الجديدة

The app now features a sophisticated TV interface inspired by modern streaming platforms:

### Featured Content Section / قسم المحتوى المميز

- **Hero Layout**: Large backdrop image with detailed movie information
- **Rich Metadata**: Genre, runtime, year, rating, starring actors, and description
- **Action Buttons**: Play button and "Add to List" functionality
- **TV Navigation**: Use UP/DOWN arrows to switch between featured and carousel sections

### Carousel Section / قسم الدائري

- **Horizontal Scrolling**: Browse through additional content
- **Focus Management**: Visual indicators show current selection
- **Smooth Transitions**: Auto-scroll keeps focused items in view

### Enhanced Video Data / بيانات الفيديو المحسنة

The videos.json now includes comprehensive metadata:

- Title, description, genre, runtime, year, rating
- Starring actors and director information
- High-quality backdrop images for hero display
- Thumbnail images for carousel items

## 📄 License / الرخصة

This project is open source and available under the MIT License.
