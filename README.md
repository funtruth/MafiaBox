# CONSPIRE

ANDROID
1. git remote add origin https://github.com/CoffeePaste/HuddleC
2. git pull origin master

3. Download Visual Studio Code

4. Follow Guide
https://facebook.github.io/react-native/docs/getting-started.html

5. (ERROR) If 'adb' is unrecognized, add it in the PATH variable through Control Panel
Control Panel -> System and Security -> System -> Change Settings -> Advanced -> ENV Variables
Add to System Variables -> Path -> New
C:\Users\YOUR_USER_NAME\AppData\Local\Android\Sdk\platform-tools

6. for packaging APK, make sure Android Studio SDKs are up-to-date and then
./gradlew assembleRelease --debug

7. I used following in android/gradle.properties as a workaround before
android.enableAapt2=false