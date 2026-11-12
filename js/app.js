// ==========================================================================
// DAFIN ORVALA APRILLO • SMK TELKOM MALANG - PORTFOLIO LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 1. STATE & STORAGE INITIALIZATION
    // ------------------------------------------------------------------------
    const state = {
        driverName: 'DAFIN ORVALA APRILLO',
        themeMode: localStorage.getItem('lemans_theme_mode') || 'dark',
        color1: localStorage.getItem('lemans_color_1') || '#0ea5e9',
        color2: localStorage.getItem('lemans_color_2') || '#8b5cf6',
        igHandle: 'dfinn.orvla',
        tiktokHandle: 'Doafinzx21'
    };

    // Refined, Tasteful Color Presets (Clean & Elegant)
    const colorPresets = [
        { id: 'cyan-purple', name: 'Cyan & Soft Purple (Bawaan)', tag: 'CLEAN CYAN x VIOLET', c1: '#0ea5e9', c2: '#8b5cf6' },
        { id: 'ocean-blue', name: 'Ocean & Sky Blue', tag: 'SKY BLUE x ROYAL INDIGO', c1: '#38bdf8', c2: '#3b82f6' },
        { id: 'emerald-mint', name: 'Emerald & Fresh Mint', tag: 'MINT x DEEP EMERALD', c1: '#34d399', c2: '#059669' },
        { id: 'sunset-amber', name: 'Sunset Amber & Rose', tag: 'AMBER GOLD x WARM ROSE', c1: '#f59e0b', c2: '#e11d48' },
        { id: 'slate-silver', name: 'Slate & Titanium Silver', tag: 'SLATE x COOL SILVER', c1: '#94a3b8', c2: '#475569' },
        { id: 'cyber-electric', name: 'Electric Teal & Purple', tag: 'ELECTRIC TEAL x PURPLE', c1: '#06b6d4', c2: '#9333ea' }
    ];

    // ------------------------------------------------------------------------
    // 2. THEME & COLOR ENGINE
    // ------------------------------------------------------------------------
    function applyThemeMode(mode) {
        state.themeMode = mode;
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('lemans_theme_mode', mode);

        const modeIcon = document.getElementById('mode-toggle-icon');
        if (modeIcon) {
            modeIcon.textContent = mode === 'dark' ? '☀️' : '🌙';
        }
    }

    function hexToRgba(hex, alpha) {
        let c = hex.replace('#', '');
        if (c.length === 3) {
            c = c.split('').map(x => x + x).join('');
        }
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function applyCustomColors(c1, c2) {
        state.color1 = c1;
        state.color2 = c2;
        localStorage.setItem('lemans_color_1', c1);
        localStorage.setItem('lemans_color_2', c2);

        const root = document.documentElement;
        root.style.setProperty('--color-1', c1);
        root.style.setProperty('--color-2', c2);
        root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`);
        root.style.setProperty('--primary-glow', hexToRgba(c1, 0.22));
        root.style.setProperty('--secondary-glow', hexToRgba(c2, 0.22));

        // Sync inputs
        const input1 = document.getElementById('custom-color-1');
        const input2 = document.getElementById('custom-color-2');
        if (input1) input1.value = c1;
        if (input2) input2.value = c2;

        // Sync active preset highlight
        document.querySelectorAll('.preset-color-card').forEach(card => {
            const presetC1 = card.getAttribute('data-c1');
            const presetC2 = card.getAttribute('data-c2');
            if (presetC1 === c1 && presetC2 === c2) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Initialize Theme
    applyThemeMode(state.themeMode);
    applyCustomColors(state.color1, state.color2);

    // Toggle Mode Button
    const modeBtn = document.getElementById('btn-mode-toggle');
    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            const nextMode = state.themeMode === 'dark' ? 'light' : 'dark';
            applyThemeMode(nextMode);
            if (window.racingAudio) window.racingAudio.playClick();
            showToast(`Tema dialihkan ke mode ${nextMode === 'dark' ? 'Gelap' : 'Terang'}`);
        });
    }

    // ------------------------------------------------------------------------
    // 3. COLOR PALETTE MODAL
    // ------------------------------------------------------------------------
    const paletteModal = document.getElementById('modal-palette');
    const openPaletteBtn = document.getElementById('btn-open-palette');
    const closePaletteBtn = document.getElementById('btn-close-palette');
    const presetsContainer = document.getElementById('palette-presets-container');

    // Populate Presets
    if (presetsContainer) {
        presetsContainer.innerHTML = colorPresets.map(preset => `
            <div class="preset-color-card ${preset.c1 === state.color1 && preset.c2 === state.color2 ? 'active' : ''}" 
                 data-c1="${preset.c1}" data-c2="${preset.c2}">
                <div class="preset-preview-swatch" style="background: linear-gradient(135deg, ${preset.c1}, ${preset.c2});"></div>
                <div>
                    <div class="preset-meta-title">${preset.name}</div>
                    <div class="preset-meta-tags">${preset.tag}</div>
                </div>
            </div>
        `).join('');

        presetsContainer.querySelectorAll('.preset-color-card').forEach(card => {
            card.addEventListener('click', () => {
                const c1 = card.getAttribute('data-c1');
                const c2 = card.getAttribute('data-c2');
                applyCustomColors(c1, c2);
                if (window.racingAudio) window.racingAudio.playClick();
                showToast(`Warna gradasi diperbarui: ${card.querySelector('.preset-meta-title').textContent}`);
            });
        });
    }

    if (openPaletteBtn && paletteModal) {
        openPaletteBtn.addEventListener('click', () => {
            paletteModal.classList.add('open');
            if (window.racingAudio) window.racingAudio.playClick();
        });
    }

    if (closePaletteBtn && paletteModal) {
        closePaletteBtn.addEventListener('click', () => {
            paletteModal.classList.remove('open');
            if (window.racingAudio) window.racingAudio.playClick();
        });
    }

    if (paletteModal) {
        paletteModal.addEventListener('click', (e) => {
            if (e.target === paletteModal) {
                paletteModal.classList.remove('open');
            }
        });
    }

    // Custom Color Apply Button
    const btnApplyCustom = document.getElementById('btn-apply-custom-gradient');
    if (btnApplyCustom) {
        btnApplyCustom.addEventListener('click', () => {
            const c1 = document.getElementById('custom-color-1').value;
            const c2 = document.getElementById('custom-color-2').value;
            applyCustomColors(c1, c2);
            if (window.racingAudio) window.racingAudio.playClick();
            showToast('Gradasi kustom berhasil diterapkan!');
        });
    }

    // ------------------------------------------------------------------------
    // 4. NAVIGATION / TAB SWITCHING (Utama, Profil, Kontak)
    // ------------------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-pill-btn');
    const viewSections = document.querySelectorAll('.view-section');

    function switchView(targetViewId) {
        viewSections.forEach(section => {
            if (section.id === targetViewId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navButtons.forEach(btn => {
            if (btn.getAttribute('data-view') === targetViewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        window.location.hash = targetViewId.replace('view-', '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
            if (window.racingAudio) window.racingAudio.playClick();
        });
    });

    // Links inside buttons (e.g. Hero CTA buttons)
    document.querySelectorAll('[data-goto-view]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = elem.getAttribute('data-goto-view');
            switchView(targetView);
            if (window.racingAudio) window.racingAudio.playClick();
        });
    });

    // Handle hash on initial page load
    if (window.location.hash) {
        const hashId = `view-${window.location.hash.replace('#', '')}`;
        if (document.getElementById(hashId)) {
            switchView(hashId);
        }
    }

    // Scroll to Car Showcase Buttons
    const btnScrollToCars = document.getElementById('btn-scroll-to-cars');
    const btnGotoCarsCard = document.getElementById('btn-goto-cars-from-card');
    [btnScrollToCars, btnGotoCarsCard].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Ensure main view is active if clicked from elsewhere
                switchView('view-utama');
                const targetCarSection = document.getElementById('garasi-mobil');
                if (targetCarSection) {
                    targetCarSection.scrollIntoView({ behavior: 'smooth' });
                    if (window.racingAudio) window.racingAudio.playClick();
                }
            });
        }
    });

    // ------------------------------------------------------------------------
    // 5. BANNER (16:9) & PROFILE PHOTO UPLOADER (YOUTUBE-STYLE)
    // ------------------------------------------------------------------------
    const bannerImg = document.getElementById('profile-banner-img');
    const avatarImg = document.getElementById('profile-avatar-img');
    const inputBanner = document.getElementById('input-banner-upload');
    const inputAvatar = document.getElementById('input-avatar-upload');
    const btnResetBanner = document.getElementById('btn-reset-banner');
    const btnResetAvatar = document.getElementById('btn-reset-avatar');

    // Default Assets (Banner 16:9 Underground Duo & Foto Muka Dafin)
    const DEFAULT_BANNER = 'assets/img/banner-16-9.png';
    const DEFAULT_AVATAR = 'assets/img/profile-dafin.jpg';

    // Check saved banner
    const savedBanner = localStorage.getItem('lemans_banner_data');
    if (savedBanner && !savedBanner.includes('.svg') && savedBanner.startsWith('data:image/')) {
        bannerImg.src = savedBanner;
    } else if (bannerImg) {
        bannerImg.src = DEFAULT_BANNER;
    }

    const savedAvatar = localStorage.getItem('lemans_avatar_data');
    if (savedAvatar && !savedAvatar.includes('.svg') && savedAvatar.startsWith('data:image/')) {
        avatarImg.src = savedAvatar;
    } else if (avatarImg) {
        avatarImg.src = DEFAULT_AVATAR;
    }

    // Handle Banner File Upload
    if (inputBanner && bannerImg) {
        inputBanner.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showToast('Silakan pilih file gambar yang valid (.jpg, .png, .webp)');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                bannerImg.src = dataUrl;
                try {
                    localStorage.setItem('lemans_banner_data', dataUrl);
                } catch (err) {
                    console.warn('Storage quota exceeded, displaying in session only:', err);
                }
                if (window.racingAudio) window.racingAudio.playClick();
                showToast('Gambar banner atas berhasil diperbarui.');
            };
            reader.readAsDataURL(file);
        });
    }

    // Reset Banner
    if (btnResetBanner && bannerImg) {
        btnResetBanner.addEventListener('click', () => {
            bannerImg.src = DEFAULT_BANNER;
            localStorage.removeItem('lemans_banner_data');
            if (window.racingAudio) window.racingAudio.playClick();
            showToast('Banner dikembalikan ke foto 16:9 bawaan.');
        });
    }

    // Handle Avatar File Upload
    if (inputAvatar && avatarImg) {
        inputAvatar.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showToast('Silakan pilih file foto yang valid (.jpg, .png, .webp)');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                avatarImg.src = dataUrl;
                try {
                    localStorage.setItem('lemans_avatar_data', dataUrl);
                } catch (err) {
                    console.warn('Storage quota exceeded, displaying in session only:', err);
                }
                if (window.racingAudio) window.racingAudio.playClick();
                showToast('Foto profil berhasil diperbarui.');
            };
            reader.readAsDataURL(file);
        });
    }

    // Reset Avatar
    if (btnResetAvatar && avatarImg) {
        btnResetAvatar.addEventListener('click', () => {
            avatarImg.src = DEFAULT_AVATAR;
            localStorage.removeItem('lemans_avatar_data');
            if (window.racingAudio) window.racingAudio.playClick();
            showToast('Foto profil dikembalikan ke foto muka default Dafin.');
        });
    }

    // ------------------------------------------------------------------------
    // 6. INSTAGRAM (@dfinn.orvla) & TIKTOK (@Doafinzx21) PERMANENT SYNC
    // ------------------------------------------------------------------------
    const igDisplayElem = document.getElementById('display-ig-handle');
    const ttDisplayElem = document.getElementById('display-tiktok-handle');
    const igLinkBtn = document.getElementById('btn-link-ig');
    const ttLinkBtn = document.getElementById('btn-link-tiktok');
    const driverNameDisplay = document.getElementById('profile-driver-name');

    function syncSocials() {
        if (driverNameDisplay) driverNameDisplay.textContent = 'DAFIN ORVALA APRILLO';

        if (igDisplayElem) igDisplayElem.textContent = '@dfinn.orvla';
        if (ttDisplayElem) ttDisplayElem.textContent = '@Doafinzx21';

        if (igLinkBtn) igLinkBtn.href = 'https://instagram.com/dfinn.orvla';
        if (ttLinkBtn) ttLinkBtn.href = 'https://tiktok.com/@Doafinzx21';

        const quickIg = document.getElementById('contact-quick-ig');
        const quickTt = document.getElementById('contact-quick-tiktok');
        if (quickIg) {
            quickIg.href = 'https://instagram.com/dfinn.orvla';
            quickIg.textContent = 'Instagram: @dfinn.orvla ↗';
        }
        if (quickTt) {
            quickTt.href = 'https://tiktok.com/@Doafinzx21';
            quickTt.textContent = 'TikTok: @Doafinzx21 ↗';
        }
    }

    syncSocials();

    // ------------------------------------------------------------------------
    // 7. CAR PHOTO GALLERY LIGHTBOX MODAL (4 FOTO INNOVA VENTURER)
    // ------------------------------------------------------------------------
    const lightboxModal = document.getElementById('car-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    document.querySelectorAll('.car-photo-card').forEach(card => {
        card.addEventListener('click', () => {
            const fullSrc = card.getAttribute('data-full');
            const caption = card.getAttribute('data-caption');
            if (lightboxImg) lightboxImg.src = fullSrc;
            if (lightboxCaption) lightboxCaption.textContent = caption;
            if (lightboxModal) lightboxModal.classList.add('open');
            if (window.racingAudio) window.racingAudio.playClick();
        });
    });

    if (lightboxCloseBtn && lightboxModal) {
        lightboxCloseBtn.addEventListener('click', () => {
            lightboxModal.classList.remove('open');
            if (window.racingAudio) window.racingAudio.playClick();
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('open');
            }
        });
    }

    // ------------------------------------------------------------------------
    // 8. CONTACT FORM (SOPAN & FORMAL)
    // ------------------------------------------------------------------------
    const contactForm = document.getElementById('pitwall-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sender = document.getElementById('form-sender-name').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!sender || !message) {
                showToast('Mohon lengkapi nama dan isi pesan terlebih dahulu.');
                return;
            }

            if (window.racingAudio) window.racingAudio.playClick();

            const btn = contactForm.querySelector('.btn-transmit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Mengirimkan pesan...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                contactForm.reset();
                showToast(`Terima kasih Bapak/Ibu ${sender}, pesan Anda telah berhasil terkirim.`);
            }, 750);
        });
    }

    // ------------------------------------------------------------------------
    // 9. TOAST NOTIFICATION SYSTEM
    // ------------------------------------------------------------------------
    let toastTimeout = null;
    function showToast(message) {
        let toast = document.getElementById('radio-toast-alert');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'radio-toast-alert';
            toast.className = 'radio-toast';
            toast.innerHTML = `<span class="toast-dot"></span><span class="toast-text"></span>`;
            document.body.appendChild(toast);
        }

        toast.querySelector('.toast-text').textContent = message;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3400);
    }

    window.showToast = showToast;
});
