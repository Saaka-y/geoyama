# Geoyama

A Next.js application for exploring Japanese mountain trails. It provides interactive 3D maps, weather forecasts, and route information.

> 📝 **Portfolio Project** - This is a personal portfolio project showcasing front-focused web development skills with modern technologies.

## 🌐 Live Demo

**[https://geoyama.vercel.app/](https://geoyama.vercel.app/)**

## Features

- 🗺️ **Interactive Map** - Explore mountains across Japan with Mapbox GL (currently limited selection as routes are created from my personal topo data)
- 🏔️ **3D Terrain** - View mountains with realistic 3D elevation
- 🌤️ **Weather Forecasts** - Check weather conditions for 2 days before and after the selected date
- 📍 **Trail Routes** - View route preview with start, goal, and summit pins
- 🔍 **Smart Filtering** - Filter by date, distance, and course time
- 📱 **Responsive Design** - Works on desktop, tablet, mobile portrait and landscape

## Tech Stack

- **Framework**: Next.js 15
- **Maps**: Mapbox GL JS
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Testing**: Jest & React Testing Library (still learning Jest)
- **APIs**: 
  - Mapbox GL API (with domain restriction for frontend use)
  - OpenWeatherMap API (accessed from backend)
- **Data Tools**: 
  - @mapbox/togeojson (GPX to GeoJSON conversion)
  - tippecanoe (vector tile generation)

## Getting Started

### Prerequisites

- Node.js 20+ 
- Mapbox API token
- OpenWeather API token

### Installation

1. Clone the repository
```bash
git clone https://github.com/Saaka-y/geoyama.git
cd geoyama
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```env
NEXT_PUBLIC_MAPBOX_TOKEN=
OPENWEATHER_API_KEY=
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
scripts/             # Node.js scripts for data processing
├── saveTrailGeojson.js   # GPX to GeoJSON conversion script
src/
├── components/       # React components
│   ├── ErrorBoundary/   # Error handling boundaries
│   ├── InfoPanel/       # Filters and weather display
│   ├── MainView/        # Main layout
│   └── Map/            # Map components
├── data/            # Mountain data and GeoJSON routes
├── hooks/           # Custom React hooks
├── pages/           # Next.js pages and API routes
├── stores/          # Zustand state management
├── styles/          # Global styles
├── ui/              # UI utilities
└── utils/           # Helper functions
```

### Adding New Trail Routes

When adding new mountain routes:

1. Place GPX data in `public/GPX/`
2. Add route entry to `scripts/saveTrailGeojson.js`
3. Run `node scripts/saveTrailGeojson.js` to generate GeoJSON files in `src/data/routeGeojson/`
4. GeoJSON files are directly loaded on the map (vector tiles were considered but made gradient coloring by elevation difficult)

## Error Handling

The app includes ErrorBoundary components to gracefully handle runtime errors:

- **Global ErrorBoundary** - Catches app-level errors with full-page fallback
- **MapErrorBoundary** - Handles map loading failures
- **WeatherErrorBoundary** - Manages weather API errors

This prevents the entire app from crashing when components fail.

<details>
<summary><strong>Development Highlights</strong> (click to expand)</summary>

### Design Decisions

- **Target Audience**: Focused on international hikers, hiking enthusiasts, and mountains accessible from Tokyo
- **Hiker-Centric Features**: 
  - Weather forecasts for 2 days before and after the selected hiking date
  - "Drive time from Shinjuku" filter for international visitors
  - Course time and elevation filtering
  - Visual route confirmation with interactive maps
- **API Security**: 
  - Mapbox API is domain-restricted for safe frontend use
  - OpenWeatherMap API is accessed only from backend routes
- **Data Workflow**: 
  - Used YAMAP GPS traces to convert GPX to GeoJSON (@mapbox/togeojson)
  - Simplified the process of obtaining accurate hiking routes
- **Framework Choice**: 
  - Initially used react-map-gl, but migrated to pure mapbox-gl for better control
  - Needed advanced features: camera following, smooth coordinate transitions, dynamic route rendering
  - Lack of detailed documentation for react-map-gl influenced the decision
- **UX Considerations**: 
  - Logo positioned in top-left to prevent accidental taps
  - Responsive design with Tailwind's landscape utilities for smooth mobile orientation changes

### Technical Challenges & Solutions

- **GPX File Location**: Initially placed in `components/data/`, but fs module doesn't work client-side → Moved to `public/` directory
- **Line Gradient**: react-map-gl v7.1 didn't support mapbox's line-gradient → Migrated to pure mapbox-gl
- **Smooth Animations**: FlyToInterpolator removed in react-map-gl v7+ → Used mapRef with official mapbox methods
- **Route Pin Animation**: Coordinates were misaligned when animating pins along route → Used line-gradient/line-progress for coloring and updated marker position each frame
- **Camera Conflicts**: `easeTo` and animation loops conflicted → Separated line animation and camera operations
- **Map Loading Race Condition**: Route GeoJSON tried to render before map style loaded → Added `isMapReady` flag and state management for routeGeo
- **Lifecycle Mismatch**: Mapbox's onLoad and React's render cycle were out of sync → Implemented `isMapReady` flag to coordinate component initialization
- **Hydration Error**: Class names with line breaks caused hydration errors → Used `join()` with arrays for long class names, single line for short ones

</details>

## Testing

Run tests with:
```bash
npm test
```

## License

This project is open source and available under the [MIT License](LICENSE).

---------------------

# Geoyama（日本語）

日本の登山道を探索するためのNext.jsアプリケーションです。インタラクティブな3D地図、天気予報、ルート情報を提供します。
> 📝 **ポートフォリオプロジェクト** - これはモダンな技術を使用したフロントWeb開発スキルを示すための個人ポートフォリオプロジェクトです。

## 🌐 デモ

**[https://geoyama.vercel.app/](https://geoyama.vercel.app/)**

## 機能

- 🗺️ **インタラクティブマップ** - Mapbox GLで日本全国の山を探索（現状は私のトポから作っているため数個しか選択肢がありません）
- 🏔️ **3D地形** - リアルな3D標高で山を表示
- 🌤️ **天気予報** - 選んだ日付を中心に前後2日間の天気状況を確認
- 📍 **トレイルルート** - スタート、ゴール、山頂のピンを含むルートプレビューを表示
- 🔍 **スマートフィルタリング** - 日付、距離、コースタイムでフィルタリング
- 📱 **レスポンシブデザイン** - デスクトップ、タブレット、モバイル、モバイル横向きに対応

## 技術スタック

- **フレームワーク**: Next.js 15
- **地図**: Mapbox GL JS
- **状態管理**: Zustand
- **スタイリング**: Tailwind CSS
- **テスト**: Jest & React Testing Library（Jestはまだ勉強中です）
- **API**: 
  - Mapbox GL API（特定ドメインからのアクセスに制限してフロントで使用）
  - OpenWeatherMap API（バックエンドから呼び出し）
- **データツール**: 
  - @mapbox/togeojson（GPXからGeoJSONへの変換）
  - tippecanoe（ベクタータイル生成）

## 始め方

### 前提条件

- Node.js 20+ 
- Mapbox APIトークン
- OpenWeather APIトークン

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/Saaka-y/geoyama.git
cd geoyama
```

2. 依存関係をインストール
```bash
npm install
```

3. `.env.local`ファイルを作成
```env
NEXT_PUBLIC_MAPBOX_TOKEN=XXX
OPENWEATHER_API_KEY=XXX
```

4. 開発サーバーを起動
```bash
npm run dev
```

5. [http://localhost:3000](http://localhost:3000) を開く

## プロジェクト構造

```
scripts/             # データ処理用Node.jsスクリプト
├── saveTrailGeojson.js   # GPXからGeoJSONへの変換スクリプト
src/
├── components/       # Reactコンポーネント
│   ├── ErrorBoundary/   # エラーハンドリング用境界
│   ├── InfoPanel/       # フィルターと天気表示
│   ├── MainView/        # メインレイアウト
│   └── Map/            # マップコンポーネント
├── data/            # 山のデータとGeoJSONルート
├── hooks/           # カスタムReactフック
├── pages/           # Next.jsページとAPIルート
├── stores/          # Zustand状態管理
├── styles/          # グローバルスタイル
├── ui/              # UIユーティリティ
└── utils/           # ヘルパー関数
```

### 新しいトレイルルートの追加

山ルートを追加する手順:

1. GPXデータを`public/GPX/`に配置
2. `scripts/saveTrailGeojson.js`にルートエントリを追加
3. `node scripts/saveTrailGeojson.js`を実行して`src/data/routeGeojson/`にGeoJSONファイルを生成
4. GeoJSONファイルは地図上で直接読み込まれます（ベクタータイルも検討しましたが、標高ごとに色を変えるのが困難だったため）

## エラーハンドリング

ランタイムエラーを適切に処理するためのErrorBoundaryコンポーネントを実装：

- **Global ErrorBoundary** - アプリレベルのエラーをフルページフォールバックでキャッチ
- **MapErrorBoundary** - マップの読み込み失敗を処理
- **WeatherErrorBoundary** - 天気API エラーを管理

これにより、コンポーネントが失敗してもアプリ全体がクラッシュすることを防ぎます。

<details>
<summary><strong>開発のポイント</strong>（クリックで展開）</summary>

### 設計上の工夫

- **ターゲット設定**: 海外旅行客、登山好き、東京から行ける山に明確に焦点を当てた
- **ハイカー目線の機能**: 
  - 登山予定日の前後2日間の詳細な天気予報
  - 海外ハイカー向けに「新宿からの運転時間」フィルター
  - 公式コースタイムと標高差でのフィルタリング
  - インタラクティブな地図でハイキングルートを視覚的に確認
- **APIセキュリティ**: 
  - Mapbox APIは特定ドメインからのアクセスに制限してフロントで使用
  - OpenWeatherMap APIはバックエンドから呼び出すように設定
- **データワークフロー**: 
  - YAMAPの軌跡を使ってGPXからGeoJSONデータに変換（@mapbox/togeojson）
  - 正確なハイキングルートの取得を効率化
- **フレームワーク選択**: 
  - 当初react-map-glを使用していたが、より細かい制御のためmapbox-glに移行
  - カメラ追従、スムーズな座標移動、ハイキングルートの動的描写など複雑な処理が必要に
  - react-map-glの詳しいドキュメントが見当たらなかったことも判断材料に
- **UXの配慮**: 
  - ロゴを誤ってタップしないよう左上に設置
  - Tailwindのlandscapeユーティリティでレスポンシブ対応、スマホ横向きへスムーズに対応

### 技術的な課題と解決策

- **GPXファイルの配置**: 当初`components/data/`に配置していたが、fsモジュールはクライアントサイドでは動作しない → `public/`配下に移動
- **ライングラデーション**: react-map-gl v7.1ではmapboxのline-gradientが使えない → mapbox-glに移行
- **スムーズなアニメーション**: react-map-gl v7以降でFlyToInterpolatorが削除 → mapRefを使用して公式のmapboxメソッドで対応
- **ルートピンのアニメーション**: ルートに沿ってピンが動くUIで座標がずれていた → line-gradient/line-progressで色をつけ、毎フレームマーカー座標を更新する方法に
- **カメラ操作の競合**: `easeTo`とループの操作がぶつかると挙動がおかしくなる → ラインアニメーションとカメラ操作を別で管理
- **マップ読み込みの競合**: Mapがstyleを読み込む前にroute geojsonを描画しようとして不安定に → routeGeoをstate管理に変更、mapのload後に描画するように
- **ライフサイクルのズレ**: Mapboxのon loadとReactのレンダーサイクルがズレる → `isMapReady`フラグを設けてコンポーネント初期化を調整
- **Hydrationエラー**: クラス名を改行して書いていたためエラーが発生 → 長いものは`join()`と配列で整理、短いものは1行にまとめた

</details>

## テスト

テストを実行:
```bash
npm test
```

## ライセンス

このプロジェクトはオープンソースで、[MIT License](LICENSE)の下で利用可能です。
