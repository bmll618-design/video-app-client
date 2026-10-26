# Wan חינמי דרך Hugging Face (ניסיוני)

## מה זה
השרת קורא ל-Space ציבורי של Wan ב-Hugging Face ומשתמש במכסת ה-GPU החינמית של החשבון שלך (כ-3.5 עד 5 דקות ליום). בפועל: כמה קליפים קצרים ביום, ויצירה אחת יכולה להיכשל אם ה-Space עמוס, ישן או השתנה.
נתמך: טקסט, ותמונת התחלה. לא נתמך: תמונת סיום ורפרנסים (האפליקציה תציג הודעה).

## שלב 1: חשבון וטוקן (בלי כרטיס אשראי)
1. huggingface.co/join, הרשמה עם אימייל ואימות האימייל.
2. huggingface.co/settings/tokens, Create new token, סוג **Read**, שם כלשהו.
3. העתיקו את הטוקן (מתחיל ב-`hf_`). הוא מוצג פעם אחת.

## שלב 2: עדכון הקבצים ב-GitHub (מהטלפון)
1. חלצו את ה-zip החדש.
2. בריפו `video-gen-server` ב-GitHub: Add file, Upload files, והעלו **את כל הקבצים** מ-`server-flat` (הקבצים הקיימים יוחלפו, ושני חדשים יתווספו: `hfProvider.js` ו-`gradioMapper.js`). חשוב: גם `package.json` חייב להתעדכן.
3. Commit changes.

## שלב 3: משתני סביבה ב-Render
ב-Render, השירות שלך, Environment:
- הוסיפו `HF_TOKEN` = הטוקן משלב 1.
- אפשר למחוק או להשאיר את `DASHSCOPE_API_KEY` ו-`ARK_API_KEY` (לא נחוצים).
- `APP_TOKEN` נשאר כמו שהוא.
- (אופציונלי) `HF_SPACE_ID` כדי להחליף Space (ברירת המחדל `multimodalart/wan2-1-fast`, לא נבדקה), ו-`HF_API_NAME` אם צריך לכפות endpoint מסוים.
Render יפרוס מחדש אוטומטית אחרי ה-Commit. המתינו שיופיע Live.

## שלב 4: שימוש
באפליקציה, במסך "סצנה חדשה", בחרו במודל **Wan חינמי (ניסיוני)**. יצירה לוקחת כמה דקות.

## אם נכשל
- "Quota exceeded" או דומה: נגמרה המכסה היומית. נסו מחר.
- "No text-to-video endpoint found" או שגיאת Space: ה-Space השתנה או נפל. חפשו ב-huggingface.co/spaces ״Wan 2.2״ או ״Wan 2.1״, בחרו Space שרץ ("Running") והחליפו את `HF_SPACE_ID`.
- הקישור לסרטון מה-Space זמני: הורידו אותו לגלריה מיד אחרי היצירה.
