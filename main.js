document.addEventListener("DOMContentLoaded", () => {

    // ══════════════ 1. HIỆU ỨNG HIỆN CHỮ CUỘN TRANG ══════════════
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };

    // Chạy ngay lần đầu để hiện phần Hero lập tức
    revealOnScroll();
    // Chạy khi người dùng cuộn trang
    window.addEventListener('scroll', revealOnScroll);


    // ══════════════ 2. THANH ĐIỀU HƯỚNG MOBILE (Hamburger Menu) ══════════════
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const nav = document.getElementById('nav');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav__links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });


    // ══════════════ 3. CHẠY THANH ĐIỂM SỐ (Academic Bars) ══════════════
    const scoreBars = document.querySelectorAll('.score-card__bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    scoreBars.forEach(bar => barObserver.observe(bar));


    // ══════════════ 5. HIỆU ỨNG BACKGROUND CANVAS (Mạng lưới liên kết toàn cầu) ══════════════
    const canvas = document.getElementById('globeCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        window.addEventListener('resize', () => {
            if (canvas.offsetWidth === 0) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });

        let points = [];
        for (let i = 0; i < 40; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(184, 134, 11, 0.25)';
            ctx.strokeStyle = 'rgba(184, 134, 11, 0.04)';

            for (let i = 0; i < points.length; i++) {
                let p1 = points[i];
                p1.x += p1.vx;
                p1.y += p1.vy;

                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < points.length; j++) {
                    let p2 = points[j];
                    let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 6. SWIPER
    // 1. Khởi chạy Swiper
    const activitySwiper = new Swiper('.activity-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 3500, disableOnInteraction: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });

    // 2. Xử lý phóng to ảnh bằng Dialog Native
    const dialog = document.getElementById('lightbox-dialog');
    const dialogImg = document.getElementById('dialog-img');

    // Lắng nghe sự kiện click vào các ảnh có class .zoom-img
    document.querySelectorAll('.zoom-img').forEach(img => {
        img.addEventListener('click', () => {
            dialogImg.src = img.src; // Gán nội dung ảnh sang dialog
            dialog.showModal();      // Mở dialog dạng modal phủ lên toàn bộ trang
        });
    });

    // Click ra ngoài ảnh hoặc click nút X thì đóng dialog
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog || e.target.classList.contains('close-dialog-btn')) {
            dialog.close();
        }
    });
});