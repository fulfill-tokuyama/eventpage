// AOSの初期化
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// カウントダウンタイマー
function updateTimer() {
    const targetDate = new Date('2025-06-30T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = `
        <div class="timer-item">
            <span class="timer-number">${days}</span>
            <span class="timer-label">日</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${hours}</span>
            <span class="timer-label">時間</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${minutes}</span>
            <span class="timer-label">分</span>
        </div>
        <div class="timer-item">
            <span class="timer-number">${seconds}</span>
            <span class="timer-label">秒</span>
        </div>
    `;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "早割は終了しました";
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// アコーディオンの実装
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const content = button.nextElementSibling;
        
        // 他のアコーディオンを閉じる
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            }
        });

        // クリックされたアコーディオンの開閉
        accordionItem.classList.toggle('active');
        if (accordionItem.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null;
        }
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// フォームのバリデーション
const form = document.querySelector('.apply-form form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // バリデーション
        let isValid = true;
        const email = data.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            isValid = false;
            alert('有効なメールアドレスを入力してください。');
        }
        
        if (isValid) {
            // 送信成功時のアニメーション
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.innerHTML = '送信中...';
            submitButton.disabled = true;
            
            // ここに実際の送信処理を追加
            
            // 送信完了後の処理
            setTimeout(() => {
                submitButton.innerHTML = '送信完了！';
                submitButton.style.backgroundColor = '#48bb78';
                this.reset();
                
                setTimeout(() => {
                    submitButton.innerHTML = '申し込む';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        }
    });
}

// スクロールアニメーション
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向の検出
    if (scrollTop > lastScrollTop) {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop;
}); 