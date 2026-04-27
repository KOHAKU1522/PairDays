import './App.css';
import styles from "./App.module.css";
import { photos } from "./data";

const START_DATE = new Date(2026, 1, 15); // 2026/2/15
const NUMBER_OF_PHOTOS = 20;

function getRandomPhotos(arr, count) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

function calcDaysSince(start) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  return Math.floor((today - s) / 86400000) + 1;
}

function calcYearsMonthsDays(start) {
  const s = new Date(start);
  const today = new Date();

  let years = today.getFullYear() - s.getFullYear();
  let months = today.getMonth() - s.getMonth();
  let days = today.getDate() - s.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// 写真の掲示枚数設定
const randomPhotos = getRandomPhotos(photos, NUMBER_OF_PHOTOS);

const totalDays = calcDaysSince(START_DATE);
const { years, months, days } = calcYearsMonthsDays(START_DATE);

const now = new Date();
const todayLabel = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;

function App() {
  return (
    <div className={styles.pageWrapper}>

      <p className={styles.todayDate}>{todayLabel}</p>

      <section className={styles.heroSection}>
        <div className={styles.countContainer}>
          <p className={styles.countTitle}>今日で付き合って</p>
          <h1 className={styles.countMain}>
            <span className={styles.countNumber}>{totalDays}</span>
            <span className={styles.countUnit}>日目</span>
          </h1>
          <p className={styles.countSub}>
            {years > 0
              ? `${years}年 ${months}ヶ月と${days}日`
              : months > 0
                ? `${months}ヶ月と${days}日`
                : `${days}日`}
          </p>
          <p className={styles.countDate}>2026.2.15 〜</p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.galleryTitle}>思い出</h2>
        <div className={styles.photoGallery}>
          {randomPhotos.map((photo, index) => (
            <div key={index} className={styles.photoItem}>
              <img src={photo} alt={`photo ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
