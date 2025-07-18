# Yoadle

🌟 **Yoadle** הוא משחק מילים יומי בעברית, בהשראת המשחק הפופולרי Wordle, שנבנה במיוחד על מנת לספק חוויה ייחודית עם מילה יומית חדשה שמתאימה לתאריך.

## 📖 תיאור המשחק

בכל יום תוצג לשחקן מילה חדשה בעברית. על השחקן לנחש את המילה במספר מוגבל של ניסיונות. לאחר כל ניחוש יקבל השחקן רמזים:

- אות נכונה במקום הנכון – מוצגת בירוק 🟩
- אות נכונה במקום הלא נכון – מוצגת בצהוב 🟨
- אות שאינה קיימת במילה – מוצגת באפור ⬜️

## 🗓 מקור המילים

המילים היומיות במשחק מבוססות על לוח שנה מיוחד, כאשר לכל יום בשנה מותאמת מילה שונה וייחודית.

## 🛠 טכנולוגיות

- React.js
- HTML, CSS, JavaScript
- JSON לאחסון מילים ותאריכים
- GitHub Pages לאירוח האתר

## 📂 מבנה הפרויקט

```
yoadle
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── YoadleGame.jsx
│   ├── data
│   │   └── words.json
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── package.json
```

## 🚀 כיצד להפעיל את הפרויקט

1. **שכפול המאגר (Clone)**:

```bash
git clone https://github.com/your-username/yoadle.git
cd yoadle
```

2. **התקנת תלויות**:

```bash
npm install
```

3. **הפעלת סביבת פיתוח מקומית**:

```bash
npm start
```

האתר ירוץ בכתובת:

```
http://localhost:3000
```

## 📦 מבנה קובץ JSON למילים

המילים היומיות מאוחסנות בקובץ JSON פשוט, עם פורמט של תאריך-מילה:

```json
{
  "01/09/2025": "התחלה",
  "02/09/2025": "אהבה",
  "03/09/2025": "שקט"
  // המשך לכל התאריכים...
}
```

## 🔧 עדכון מילים

כדי לעדכן את המילים היומיות, פשוט ערוך את קובץ ה־`words.json` בתיקיית ה־data.

## 🌐 אירוח האתר

האתר מתארח על GitHub Pages:

1. העלאת קוד ל־GitHub:

```bash
git add .
git commit -m "Initial commit"
git push
```

2. הפעלת GitHub Pages:

- עבור לדף ה־Repository שלך ב־GitHub.
- לחץ על "Settings".
- נווט ללשונית "Pages".
- בחר את הענף (Branch) הראשי והפעל את GitHub Pages.

האתר יהיה זמין בכתובת:

```
https://your-username.github.io/yoadle
```

## 🎨 עיצוב והתאמה אישית

העיצוב הבסיסי נמצא בקובץ `index.css`. ניתן לשנות את צבעי המשחק, פונטים והאנימציות לפי ההעדפה שלך.

## ✨ תכניות לעתיד

- שמירת סטטיסטיקות והיסטוריית ניחושים
- שילוב אנימציות נוספות לחווית משתמש
- תמיכה טובה יותר במובייל

## 📬 יצירת קשר

לשאלות, הצעות לשיפור או רעיונות נוספים ניתן לפנות ישירות דרך GitHub Issues או בדוא"ל: [your-email@example.com](mailto\:your-email@example.com).

---

בהצלחה ושיהיה משחק מהנה!

❤️ יועד

