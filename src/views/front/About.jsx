import React from 'react';

function About() {
  return (
    <>
 <div className="container py-5">
      <div className="row align-items-center">
        {/* 右邊文字 */}
        <div className="col-md-6 text-start">
            <h3 className="mb-4 fw-bold">關於我們
          </h3>

          <p className="mb-4" style={{ lineHeight: "1.9" }}>
            在日常的縫隙裡，我慢慢學會，把心安放在細微而溫柔的事物之中。
            這個工作室，誕生於一段不那麼容易的時光——當生命中重要的人悄然離開，世界一度失去顏色。
            直到某個偶然的瞬間，我遇見了水晶。
          </p>

          <p className="mb-4" style={{ lineHeight: "1.9" }}>
            那不是一種華麗的相遇，而是靜靜地，被一抹光吸引。
            握在掌心的那一刻，彷彿有種無聲的陪伴，柔軟卻堅定地存在著。
            日子依然前行，但多了一點被理解的溫度，也多了一份與自己對話的空間。
          </p>

          <p className="mb-4" style={{ lineHeight: "1.9" }}>
            於是，我開始將這份感受，一點一滴編織成飾品。
            每一顆水晶、每一道線條，都是對生活的回應，也是對溫柔的練習。
            它們不只是飾品，而是日常裡的小光——在平凡的日子中，替你輕輕亮起。
          </p>

          <p className="mb-4" style={{ lineHeight: "1.9" }}>
            我相信，生活不需要過於張揚的美好，有時候，一點剛剛好的光，就能照亮一整天。
            也希望透過這個工作室，把這份來自水晶的溫暖與安定，傳遞給更多人。
            讓每一個配戴的瞬間，都像被輕輕擁抱；讓那些微小卻真實的感動，在世界的角落悄悄蔓延。
          </p>

          <p className="mt-5 fw-semibold" style={{ lineHeight: "1.9" }}>
            願你在這裡，找到一份屬於自己的溫柔光芒。
          </p>
        </div>
          {/* 左邊圖片 */}
          <div className="col-md-6 mb-4 mb-md-0">
            <p>&nbsp;</p>
          <img
            src="images/about2.png"
            alt="手作水晶飾品"
            className="img-fluid rounded-4 shadow-sm"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </div>
    </>
  );
  }


export default About;

