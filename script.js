// AOSの初期化
AOS.init({
    duration: 800,
    once: true
});

// カウントダウンタイマー
function updateCountdown() {
    const earlyBirdEnd = new Date('2024-06-30T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = earlyBirdEnd - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = 
        `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;

    if (distance < 0) {
        document.getElementById('timer').innerHTML = "早割は終了しました";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// アコーディオン
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        accordionItem.classList.toggle('active');
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// フォーム送信（仮実装）
document.querySelector('.apply-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('申し込みありがとうございます。担当者よりご連絡させていただきます。');
    this.reset();
}); 