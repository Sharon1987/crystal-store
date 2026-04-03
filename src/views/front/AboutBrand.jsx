import './AboutBrand.css'; 

const AboutBrand = () => {
  return (
    <section className="about-container">
      {/* 標題 */}
      <div className="about-header">
        <h2 className="about-title">剛好的光，溫柔的陪伴</h2>
        <div className="about-divider"></div>
      </div>

      {/* 內文 */}
      <article className="about-content">
        <p className="about-quote">
          「生命總有裂縫，那是光照進來的地方。」
        </p>

        <p>
          那時，當生命中重要的人悄然退場，世界像是被抽乾了顏色，只剩下大片灰白的寂靜。在那些細碎且漫長的夜裡，我曾試圖尋找出口，卻發現最深刻的療癒，往往不在遠方，而在那些被我們忽略的、日常的縫隙裡。
        </p>

        <p>
          直到某個偶然的瞬間，我遇見了水晶。那並非一場華麗奪目的相遇，它只是靜靜地待在角落，透著一抹內斂卻清澈的光，在那一刻，沒由來地吸引了我的目光。
        </p>

        <p>
          當我將它握在掌心，那種冰涼卻紮實的存在感，彷彿一份無聲的陪伴。它不急著說話，也不試圖改變我的悲傷，只是柔軟且堅定地存在著，讓我在那個瞬間，感受到了一份<strong className="about-highlight">「被理解的溫度」</strong>。
        </p>

        <p>
          於是我開始練習把心安放在這些細微而溫柔的事物之中。我學著觀察原石的紋理，學著在編織的過程中與自己對話。每一顆水晶的挑選、每一道線條的交織，都是我對生活的回應，也是一場關於溫柔的練習。
        </p>

        <p>
          我們的工作室，就是想將這份溫度，轉化為穿戴在身間的微光。這份美，不需要過於張揚。我相信生活有時候只需要一點<strong className="about-highlight">「剛剛好的光」</strong>，就足以照亮一整天的陰霾。這些飾品不只是裝飾，它們是日常裡的小光，是在妳疲憊低頭時，能輕輕亮起的安穩力量。
        </p>

        <div className="about-footer">
          <p className="about-footer-main">願妳能在這裡，找到那份屬於妳的溫柔光芒。</p>
          <p className="about-footer-sub">讓配戴的每個瞬間，都像被世界輕輕擁抱。</p>
        </div>
      </article>
    </section>
  );
};

export default AboutBrand;