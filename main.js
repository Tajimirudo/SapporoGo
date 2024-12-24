// Mapboxのアクセストークン
mapboxgl.accessToken = ppk.eyJ1IjoiY2VsZXJvbjEyMSIsImEiOiJjbTUyaG92MHMxbWtqMnFyMG9oM2UyZzd3In0.603bTGd0nYNxcEYy3Ha8BA;

// 地図を初期化
const map = new mapboxgl.Map({
    container: 'map', // 地図を表示する要素のID
    style: 'mapbox://styles/mapbox/streets-v11', // 地図のスタイル
    center: [139.6917, 35.6895], // 初期位置（東京駅付近）
    zoom: 12 // ズームレベル
});

// 電車のルートデータ
const trainData = [
    { lat: 35.6895, lng: 139.6917, time: 0 },    // 東京駅
    { lat: 35.6985, lng: 139.7005, time: 5000 }, // 新宿駅（5秒後）
    { lat: 35.7075, lng: 139.7095, time: 10000 } // 池袋駅（10秒後）
];

// 電車アイコンを作成
const trainMarker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([trainData[0].lng, trainData[0].lat])
    .addTo(map);

// 電車アニメーションの実装
function animateTrain(data) {
    let index = 0;

    function move() {
        if (index < data.length - 1) {
            const start = data[index];
            const end = data[index + 1];
            const duration = end.time - start.time;
            const startTime = performance.now();

            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const lat = start.lat + (end.lat - start.lat) * progress;
                const lng = start.lng + (end.lng - start.lng) * progress;

                trainMarker.setLngLat([lng, lat]);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    index++;
                    move();
                }
            }

            requestAnimationFrame(step);
        }
    }

    move();
}

// アニメーション開始
animateTrain(trainData);
