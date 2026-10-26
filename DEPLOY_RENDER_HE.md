# העלאת השרת ל-Render מהטלפון (בחינם)

השתמשו בתיקייה `server-flat` מתוך ה-zip (אותו שרת, רק בלי תת-תיקיות, כדי שאפשר יהיה להעלות מהטלפון).

## א. העלאת הקבצים ל-GitHub
1. חלצו את ה-zip באפליקציית הקבצים (באייפון: לחיצה על הקובץ. באנדרואיד: Files by Google, "חילוץ").
2. בדפדפן: github.com, הרשמה / התחברות.
3. New repository: שם `video-gen-server`, Public, ואז Create repository.
4. בדף הריפו: Add file, Upload files. סמנו את **כל** הקבצים מתוך `server-flat` (לא את התיקייה עצמה) והעלו.
   אם אין כפתור כזה, הפעילו בדפדפן "אתר למחשב" (Desktop site).
5. לחצו Commit changes.
אל תעלו קובץ `.env` עם מפתחות. המפתחות נכנסים רק ב-Render.

## ב. יצירת השרת ב-Render
1. render.com, הרשמה (אפשר עם GitHub).
2. New, Web Service. בחרו את הריפו (או Public Git Repository והדביקו את כתובתו).
3. הגדרות:
   - Language: Node
   - Branch: main
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**
4. Environment Variables (Add):
   - `APP_TOKEN` = מחרוזת אקראית ארוכה (30+ תווים). **חובה**, בלעדיה השרת לא עולה.
   - `DASHSCOPE_API_KEY` = המפתח של Wan
   - `ARK_API_KEY` = המפתח של Seedance
   - (אופציונלי) `SEEDANCE_MODEL_ID`, `WAN_T2V_MODEL`, `WAN_I2V_MODEL`, `WAN_R2V_MODEL`
5. Create Web Service והמתינו לסיום הפריסה.
6. העתיקו את הכתובת (`https://שם-השירות.onrender.com`) ופתחו `/health` בדפדפן. אמורה להופיע התשובה `{"ok":true}`.

## ג. חיבור האפליקציה
בקובץ `mobile/src/config/env.js`:
- `SERVER_URL` = הכתובת מ-Render
- `APP_TOKEN` = אותו ערך בדיוק כמו ב-Render

## ד. מה חשוב לדעת
- בחינם, השרת נרדם אחרי 15 דקות בלי פניות ולוקח כדקה להתעורר. האפליקציה מעירה אותו אוטומטית לפני כל יצירה ומציגה "מעיר את השרת".
- יש מכסה של 750 שעות חינם בחודש.
- השרת הוא ציבורי: שמרו את ה-APP_TOKEN בסוד, והגדירו תקרת הוצאה / התראות תשלום בקונסולות של BytePlus ו-Alibaba.
