# בניית קובץ APK מהטלפון (אנדרואיד)

למה לא Expo Go: הפרויקט על Expo SDK 52, ו-Expo Go מהחנות תומך בגרסת SDK אחת בלבד (חדשה יותר), אז היא לא תפתח אותו. APK שנבנה בענן עובד כאפליקציה רגילה, בלי מחשב ובלי Expo Go.

## הכנה
1. ודאו ש-`SERVER_URL/health` ב-Render עונה `{"ok":true}`.
2. הרשמה חינמית באימייל: expo.dev/signup.

## שלבים
1. ב-GitHub: ריפו חדש `video-gen-app`, Add file, Upload files, והעלו את ה-**zip עצמו** (בלי לחלץ). Commit.
2. בדף הריפו: Code, לשונית Codespaces, Create codespace on main. ייפתח עורך בדפדפן.
3. בטרמינל של העורך (תפריט Terminal, New Terminal):
```
unzip video-gen-app.zip
cd video-gen-app/mobile
```
4. פתחו בעורך את `src/config/env.js` והחליפו את `SERVER_URL` (כתובת Render) ואת `APP_TOKEN` (אותו ערך כמו ב-Render). הערכים נאפים בתוך האפליקציה בזמן הבנייה.
5. בטרמינל:
```
npm i
npx eas-cli login
npx eas-cli init
npx eas-cli build -p android --profile preview
```
   ענו Y לשאלות. הבנייה רצה בענן של Expo וייתכן שתחכו בתור.
6. בסיום יודפס קישור להורדת ה-APK. פתחו אותו בטלפון, הורידו, ואשרו "התקנה ממקורות לא ידועים".

## אם משהו נכשל
שלחו לי את שורת השגיאה האחרונה מהטרמינל.
