import React from 'react';

function AboutCrystal() {

    return (
      <>
      {/* --- 水晶簡介  --- */}
      <div className="container py-5 mt-4">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <header className="mb-5 text-start">
            <h1 className="display-5 fw-bold text-dark mb-3">走過億萬年時光的足跡：水晶</h1>
            <p className="lead text-muted fst-italic mb-4">
                淬鍊億萬年的純淨能量，只為你綻放獨特光彩。
            </p>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#343a40' }}></div>
          </header>

          
          <section className="mb-5 text-start" style={{ lineHeight: '1.9', color: '#333' }}>
            <h2 className="h4 fw-bold text-dark mb-4" style={{ letterSpacing: '1px' }}>
              ✧ 什麼是水晶？
            </h2>
            <p className="mb-4 text-dark opacity-75">
              從科學的視角來看，水晶主要是由 <strong>二氧化矽 (SiO₂)</strong> 組成的礦物。
              它們誕生於地殼深處，在極端的高溫與高壓環境下，歷經了漫長的億萬年冷凝過程，
              最終萃取大自然精華，形成了具有規則幾何外形的完美晶體。
            </p>
            <p className="text-dark opacity-75">
              每一顆天然水晶都承載著地質變遷的歷史痕跡，其獨特的晶體結構與物理特性，
              不僅賦予了它迷人的光澤，更使其在現代生活中扮演著多樣的角色。
            </p>
          </section>

          <section className="mb-5 text-start" style={{ lineHeight: '1.9', color: '#333' }}>
            <h2 className="h4 fw-bold text-dark mb-4" style={{ letterSpacing: '1px' }}>
              ✧ 水晶的獨特魅力
            </h2>
            <p className="text-dark opacity-75">
              在日常生活中，水晶飾品不僅是精美的點綴，更被賦予了許多美好的寓意。
              許多人相信水晶具有獨特的振動頻率，能夠幫助我們平衡內心情緒，調節忙碌生活中的壓力。
            </p>
          </section>
          
          <section className="mb-5 pb-3 text-start">
            <h2 className="h4 fw-bold text-dark mb-4" style={{ letterSpacing: '1px' }}>
              ✧ 常見水晶與其象徵
              </h2>
              <br/>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <span className="py-2 px-3 border border-dark rounded-pill text-dark small fw-medium">紫水晶：智慧與寧靜</span>
              <span className="py-2 px-3 border border-dark rounded-pill text-dark small fw-medium">粉水晶：桃花與人緣</span>
              <span className="py-2 px-3 border border-dark rounded-pill text-dark small fw-medium">黃水晶：財富與自信</span>
              <span className="py-2 px-3 border border-dark rounded-pill text-dark small fw-medium">白水晶：純淨與能量</span>
            </div>
          </section>
        </div>
      </div>
      <hr className="container border-secondary opacity-25" />


    <div className="care-container">

  <h2 className="care-title" >✧ 水晶飾品保養指南</h2>
  <p className="care-subtitle">讓日常的光，安靜地陪你更久一點</p>

  <div className="care-grid">

      <div className="care-card">
             
      <h3>-白水晶-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        質地穩定、硬度高，不易刮傷。建議清水輕洗後擦乾，
        或用柔布輕拭。避免香水與清潔劑接觸，收納時單獨放置。
                </p>
              <img src="images/ClearQuartz.png" alt="白水晶" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-白瑪瑙-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        白瑪瑙表面溫潤但不耐撞擊，收納時與其他飾品分開擺放。保養時建議乾布擦拭，避免高溫曝曬，
        以維持柔和光感。
        </p>
        <img src="images/WhiteAgate.png" alt="白瑪瑙" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-紫水晶-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        長時間日曬可能造成褪色，
        日常配戴需盡量避免陽光直射，
        平時可以用軟布清潔，並放置於陰涼乾燥處。
              </p>
              <img src="images/Amethyst.png" alt="紫水晶" style={{ width: '100%',height: '160px' }} />

    </div>

<div className="care-card">
  <h3>-粉晶-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        粉水晶的質地細緻，應避免曝曬與碰撞。日常以乾布輕柔擦拭，
        收納時建議單獨放置於陰涼乾燥處。
      </p>
      <img src="images/RoseQuartz.png" alt="粉晶" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-櫻花瑪瑙-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        櫻花瑪瑙紋理特殊，避免碰撞與長時間接觸水，以避免水晶受損。
        日常建議乾布擦拭保養並與其他水晶分開收納。
      </p>
      <img src="images/BlossomAgate.png" alt="櫻花瑪瑙" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-海藍寶-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        海藍寶質地較易產生刮痕，應該避免與硬物碰撞。
        一般保養建議清水沖洗後擦乾，避免存放於高溫潮濕環境。
      </p>
      <img src="images/Aquamarine.png" alt="海藍寶" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-藍晶石-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        藍晶石的層狀結構易裂，應避免擠壓與長時間碰水，
        日常收納建議與其他水晶隔開單獨放置。
              </p>
              <img src="images/Kyanite.png" alt="藍晶石" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-月光石-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        月光石易刮傷，避免與其他水晶混放。保養時可用軟布擦拭，不可使用酒精或清潔劑，
        避免化學物質接觸。
              </p>
              <img src="images/Moonstone.png" alt="月光石" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-太陽石-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        太陽石如表面刮傷會影響閃耀效果，避免與其他水晶混放。保養建議用軟布擦拭並分開收納。
              </p>
              <img src="images/Sunstone.png" alt="太陽石" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-紅瑪瑙-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        紅瑪瑙性質穩定，但仍應避免重擊與陽光曝曬，
        日常保養以乾布擦拭即可。
              </p>

              <img src="images/RedAgate.png" alt="紅瑪瑙" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-黃水晶-</h3>
  <p style={{ 
    lineHeight: '1.6em', 
    height: '6.4em',      // 1.6 * 4 = 6.4
    overflow: 'hidden', 
    marginBottom: '15px',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  }}>
        黃水晶保存時應避免陽光直射，可清水清潔後擦乾，
        放置陰涼處保存。
              </p>
              <img src="images/Citrine.png" alt="黃水晶" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-黃虎眼-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        黃虎眼石具有明顯的紋理，神似老虎的眼睛，保存時應避免其刮傷影響光澤，
        收納時避免堆疊。
      </p>


      <img src="images/YellowTigerEye.png" alt="黃虎眼" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card">
  <h3>-東菱玉-</h3>
<p style={{ 
  lineHeight: '1.6em', 
  height: '6.4em',      // 1.6 * 4 = 6.4
  overflow: 'hidden', 
  marginBottom: '15px',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical'
}}>
        東菱玉具有玉的質感，保存時應避免摩擦與接觸化學物質，
        建議乾布清潔擦拭後單獨收納。
              </p>
              <img src="images/Aventurine.png" alt="東菱玉" style={{ width: '100%',height: '160px' }} />
    </div>

<div className="care-card metal">
  <h3>-金屬吊飾-</h3>
  <p style={{ 
    lineHeight: '1.6em', 
    height: '6.4em',      // 1.6 * 4 = 6.4
    overflow: 'hidden', 
    marginBottom: '15px',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  }}>
        易氧化，建議配戴後擦拭，
        避免接觸水、香水與清潔劑。
              </p>
              <img src="images/JewelryFindings.png" alt="金屬吊飾" style={{ width: '100%',height: '160px' }} />  
    </div>
  </div>
</div>
            </>);
}

export default AboutCrystal;