# מדריך התקנה: מאיפה מורידים/מעתיקים כל דבר

## 1. מה להתקין (פעם אחת)
| מה | איפה | הערה |
|---|---|---|
| Node.js (גרסת LTS) | https://nodejs.org | מתקינים עם "הבא, הבא". בודקים בטרמינל: `node -v` |
| עורך קוד (אופציונלי) | https://code.visualstudio.com | לעריכת קובץ ה-.env |
| Expo Go (בטלפון) | App Store / Google Play, חיפוש "Expo Go" | או https://expo.dev/go |

## 2. מפתח API ל-Seedance (BytePlus ModelArk)
1. נכנסים ל-https://console.byteplus.com/ark ויוצרים חשבון / מתחברים.
2. בקונסולה יוצרים API Key (באזור ניהול ה-API Keys).
3. ייתכן שצריך להפעיל (Activate) את מודל Seedance בקונסולה לפני שימוש, ולהוסיף אמצעי תשלום.
4. מעתיקים את המפתח לקובץ `server/.env` בשורה `ARK_API_KEY=`.
5. מזהה המודל (`SEEDANCE_MODEL_ID`): ודאו בקונסולה / בתיעוד ModelArk את המזהה המדויק של Seedance 2.5. ערך ברירת המחדל הגיע ממקור לא רשמי.

## 3. מפתח API ל-Wan (Alibaba Cloud Model Studio)
1. מדריך רשמי: https://www.alibabacloud.com/help/model-studio/get-api-key
2. נכנסים ל-Model Studio ובוחרים אזור **International (Singapore)**.
3. בדף Key Management לוחצים Create API Key (Workspace: Default Workspace).
4. מעתיקים לקובץ `server/.env` בשורה `DASHSCOPE_API_KEY=`.
5. חשוב: מפתח של סינגפור עובד רק מול הכתובת `https://dashscope-intl.aliyuncs.com` (כבר מוגדרת כברירת מחדל). מפתח של בייג'ינג לא יעבוד מולה.
6. מזהי המודלים (`WAN_T2V_MODEL`, `WAN_I2V_MODEL`, `WAN_R2V_MODEL`): ברירת המחדל היא Wan 2.7. אם יש גרסה חדשה יותר בקונסולה, מחליפים שם.

## 4. הרצת השרת (על המחשב)
```
cd server
cp .env.example .env      # ב-Windows: copy .env.example .env
# פותחים את .env וממלאים את שני המפתחות
npm i
npm start
```
אמורה להופיע ההודעה `Server on :3000`.

## 5. כתובת ה-IP של המחשב
- Windows: בטרמינל `ipconfig`, מחפשים IPv4 Address (למשל 192.168.1.23).
- Mac: בטרמינל `ipconfig getifaddr en0`.
אם חומת האש מבקשת אישור ל-Node.js, מאשרים (Private networks).

## 6. הרצת האפליקציה
1. פותחים `mobile/src/config/env.js` ומחליפים את `192.168.1.10` ב-IP מסעיף 5. את `APP_TOKEN` מתאימים לערך של `APP_TOKEN` בקובץ `.env` של השרת.
2. בטרמינל חדש:
```
cd mobile
npm i
npx expo install --fix
npx expo start
```
3. מסרקים את ה-QR עם Expo Go (באייפון: עם המצלמה). הטלפון והמחשב באותה רשת Wi-Fi.

## 7. אם משהו לא עובד
- "Network request failed": ה-IP שגוי, השרת לא רץ, או שהטלפון לא על אותה רשת.
- שגיאת "API key is not configured": המפתח לא מולא ב-.env (צריך להפעיל מחדש את השרת אחרי עריכה).
- 401 מהמודל: המפתח לא תואם לאזור/כתובת, או שהמודל לא הופעל בחשבון.
- שגיאה על תמונה ב-Seedance: ייתכן שזוהה פנים של אדם אמיתי. השתמשו באיור או בפריים מסרטון שנוצר.
- קישור הסרטון שהמודל מחזיר פג אחרי זמן קצר (בדרך כלל כ-24 שעות), לכן כדאי להוריד לגלריה.
