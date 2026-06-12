document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const themeBtnMemorial = document.getElementById('theme-btn-memorial');
    const themeBtnDaily = document.getElementById('theme-btn-daily');
    const body = document.body;
    
    const heroStatusTag = document.getElementById('hero-status-tag');
    const heroMainTitle = document.getElementById('hero-main-title');
    const heroDescription = document.getElementById('hero-description');
    const heroVisualImg = document.getElementById('hero-visual-img');
    
    const cardMemorial = document.getElementById('card-memorial');
    const cardDaily = document.getElementById('card-daily');
    
    // シミュレーター要素
    const inputTitle = document.getElementById('input-title');
    const inputSubtitle = document.getElementById('input-subtitle');
    const previewTitleText = document.getElementById('preview-title-text');
    const previewSubtitleText = document.getElementById('preview-subtitle-text');
    const previewIconSymbol = document.getElementById('preview-icon-symbol');
    const previewPlate = document.getElementById('preview-plate');
    const laserBeam = document.getElementById('sim-laser-beam');
    const btnStartEngrave = document.getElementById('btn-start-engrave');
    
    const fontOptions = document.querySelectorAll('.font-option');
    const iconOptions = document.querySelectorAll('.icon-option');
    
    // タブ要素
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // データ定義
    const themeData = {
        memorial: {
            tag: 'MEMORIAL LINE',
            title: 'ペットとの思い出を、一生消えない刻印に。',
            desc: '愛犬・愛猫との思い出や記念性を重視した高付加価値コレクション。黒背景に美しく映えるゴールド刻印や、肉球、写真を刻んだメモリアルプレートで、世界に一つだけの絆を形にします。',
            img: 'images/memorial_tag.png',
            plateClass: 'theme-memorial'
        },
        daily: {
            tag: 'DAILY USE LINE',
            title: '日常に寄り添う、愛着あふれるカスタムギア。',
            desc: '普段使いに最適な、迷子札や首輪タグなどの実用品を揃えたコレクション。ナチュラルな木製素材や明るいデザインに、シンプルで親しみやすい犬種シルエットをレーザーで精密に焼き付けます。',
            img: 'images/daily_tag.png',
            plateClass: 'theme-daily'
        }
    };

    // テーマ切り替え処理
    function switchTheme(themeKey) {
        // body属性変更
        body.setAttribute('data-theme', themeKey);
        
        // ヘッダーボタンのクラス切り替え
        if (themeKey === 'memorial') {
            themeBtnMemorial.classList.add('active');
            themeBtnDaily.classList.remove('active');
            cardMemorial.classList.add('active-card');
            cardDaily.classList.remove('active-card');
        } else {
            themeBtnMemorial.classList.remove('active');
            themeBtnDaily.classList.add('active');
            cardMemorial.classList.remove('active-card');
            cardDaily.classList.add('active-card');
        }
        
        // ヒーローセクション情報の更新
        const data = themeData[themeKey];
        heroStatusTag.textContent = data.tag;
        heroMainTitle.textContent = data.title;
        heroDescription.textContent = data.desc;
        heroVisualImg.src = data.img;
        
        // シミュレータープレートの外観更新
        previewPlate.className = `plate-element ${data.plateClass}`;
    }

    // テーマボタンイベント
    themeBtnMemorial.addEventListener('click', () => switchTheme('memorial'));
    themeBtnDaily.addEventListener('click', () => switchTheme('daily'));
    
    // コンセプトカードクリックでもテーマが切り替わるようにする
    cardMemorial.addEventListener('click', () => switchTheme('memorial'));
    cardDaily.addEventListener('click', () => switchTheme('daily'));

    // シミュレーター入力連動
    inputTitle.addEventListener('input', (e) => {
        previewTitleText.textContent = e.target.value || 'Name';
    });

    inputSubtitle.addEventListener('input', (e) => {
        previewSubtitleText.textContent = e.target.value || 'Date / Info';
    });

    // フォント切り替え
    fontOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            fontOptions.forEach(opt => opt.classList.remove('active'));
            btn.classList.add('active');
            
            const font = btn.dataset.font;
            if (font === 'serif') {
                previewPlate.style.fontFamily = "'Playfair Display', serif";
            } else if (font === 'sans') {
                previewPlate.style.fontFamily = "'Outfit', sans-serif";
            } else {
                previewPlate.style.fontFamily = "'Noto Sans JP', sans-serif";
            }
        });
    });

    // シンボルマーク切り替え
    iconOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            iconOptions.forEach(opt => opt.classList.remove('active'));
            btn.classList.add('active');
            previewIconSymbol.textContent = btn.dataset.icon;
        });
    });

    // 模擬刻印プロセスの実行アニメーション
    btnStartEngrave.addEventListener('click', () => {
        if (laserBeam.classList.contains('animating')) return; // アニメーション中は重複実行しない

        // 刻印プロセス開始演出：プレート文字を一時的に薄くし、レーザー照射で焼き付くように見せる
        previewTitleText.style.opacity = '0.1';
        previewSubtitleText.style.opacity = '0.1';
        previewIconSymbol.style.opacity = '0.1';
        
        // レーザー照射ライン起動
        laserBeam.classList.add('animating');
        btnStartEngrave.textContent = 'レーザー刻印中...';
        btnStartEngrave.disabled = true;

        // レーザーの動きに合わせて段階的に文字を浮かび上がらせる
        setTimeout(() => {
            previewTitleText.style.transition = 'opacity 1.5s ease';
            previewTitleText.style.opacity = '1';
        }, 800);

        setTimeout(() => {
            previewSubtitleText.style.transition = 'opacity 1.5s ease';
            previewSubtitleText.style.opacity = '1';
            previewIconSymbol.style.transition = 'opacity 1.5s ease';
            previewIconSymbol.style.opacity = '1';
        }, 1600);

        // 刻印プロセス完了
        setTimeout(() => {
            laserBeam.classList.remove('animating');
            btnStartEngrave.textContent = '模擬刻印プロセスを実行';
            btnStartEngrave.disabled = false;
            
            // トランジション設定のクリア
            previewTitleText.style.transition = '';
            previewSubtitleText.style.transition = '';
            previewIconSymbol.style.transition = '';
        }, 3000);
    });

    // 事業計画タブ切り替え
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetPaneId = btn.dataset.pane;
            document.getElementById(targetPaneId).classList.add('active');
        });
    });
});
