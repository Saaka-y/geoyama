# Geoyama

A Next.js application for exploring Japanese mountain trails. It provides interactive 3D maps, weather forecasts, and route information.

> 📝 **Portfolio Project** - This is a personal portfolio project showcasing front-focused web development skills with modern technologies.

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

## Error Handling

The app includes ErrorBoundary components to gracefully handle runtime errors:

- **Global ErrorBoundary** - Catches app-level errors with full-page fallback
- **MapErrorBoundary** - Handles map loading failures
- **WeatherErrorBoundary** - Manages weather API errors

This prevents the entire app from crashing when components fail.

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

## エラーハンドリング

ランタイムエラーを適切に処理するためのErrorBoundaryコンポーネントを実装：

- **Global ErrorBoundary** - アプリレベルのエラーをフルページフォールバックでキャッチ
- **MapErrorBoundary** - マップの読み込み失敗を処理
- **WeatherErrorBoundary** - 天気API エラーを管理

これにより、コンポーネントが失敗してもアプリ全体がクラッシュすることを防ぎます。

## テスト

テストを実行:
```bash
npm test
```

## ライセンス

このプロジェクトはオープンソースで、[MIT License](LICENSE)の下で利用可能です。
