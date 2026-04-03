function Locations() {
  const storeLocations = [
    {
      id: 1,
      name: "Sharon's Pure Gems",
      address: "新竹市東區中央東路 168 號（工作室）",
      phone: "03-577-1320",
      hours: "11:00 - 21:30",
      mapUrl: "https://www.google.com/maps",
    },
    {
      id: 2,
      name: "新竹巨城快閃據點",
      address: "新竹市東區中央路 229 號（巨城外圍露天廣場）",
      phone: "03-577-1230",
      hours: "不定期擺攤 請鎖定IG",
      mapUrl: "https://www.google.com/maps",
    },
    
  ];

  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#8b5e3c" }}>LOCATIONS</h2>
        <p className="text-muted">歡迎前往實體據點親自感受寶石的溫度</p>
        <hr className="mx-auto" style={{ width: "50px", borderTop: "2px solid #8b5e3c" }} />
      </div>

      <div className="row justify-content-center">
        {storeLocations.map((store) => (
          <div className="col-md-4 mb-4" key={store.id}>
            <div 
              className="card h-100 border-0 shadow-sm" 
              style={{ background: "#fff7e6", borderRadius: "15px" }}
            >
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3" style={{ color: "#5d4037" }}>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  {store.name}
                </h5>
                <p className="card-text mb-1 text-muted">
                  <strong>地址：</strong>{store.address}
                </p>
                <p className="card-text mb-1 text-muted">
                  <strong>電話：</strong>{store.phone}
                </p>
                <p className="card-text mb-4 text-muted">
                  <strong>營業時間：</strong>{store.hours}
                </p>
                
                <a 
                  href={store.mapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-outline-dark btn-sm w-100 rounded-pill"
                >
                  查看 Google 地圖
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部溫馨提示 */}
      <div className="mt-5 p-4 text-center rounded" style={{ border: "1px dashed #d7ccc8" }}>
        <p className="mb-0 text-muted small">
          ＊實際營業時間以百貨商場公告為準。前往前可先電話諮詢是否有您喜歡的款式現貨。
        </p>
      </div>
    </div>
  );
}

export default Locations;