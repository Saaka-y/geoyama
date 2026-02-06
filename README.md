
# 🏔️ Geoyama

日本の山を探せる登山プランアプリ。

🌐 デモ: [https://geoyama.vercel.app/](https://geoyama.vercel.app/)

## 機能
- マップで山・ルート表示
- 天気予報
- フィルター（距離・日付・コースタイム）

## 技術
- Next.js / Mapbox GL / Zustand / Tailwind CSS

## セットアップ
Node.js 20以上、APIトークンを.env.localに記入。

```bash
git clone https://github.com/Saaka-y/geoyama.git
cd geoyama
npm install
npm run dev
```

## トレイル追加
GPXをpublic/GPX/へ→scripts/saveTrailGeojson.js実行→src/data/routeGeojson/に生成

## テスト
```bash
npm test
```

## 作者
Saaka-y

- **Next.js 15** - React framework
- **Mapbox GL JS** - Interactive maps
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Jest & React Testing Library** - Testing (still getting the hang of Jest!)
- **APIs**: 
  - Mapbox GL API (domain-restricted for frontend safety)
  - OpenWeatherMap API (called from backend)
- **Data Tools**: 
  - @mapbox/togeojson (converts GPX to GeoJSON)


## Project Structure

```
geoyama/
├── scripts/             # Node.js scripts for data processing
│   └── saveTrailGeojson.js   # GPX to GeoJSON conversion
├── src/
│   ├── components/      # React components
│   │   ├── ErrorBoundary/   # Error handling
│   │   ├── InfoPanel/       # Filters and weather display
│   │   ├── MainView/        # Main layout
│   │   └── Map/             # Map components
│   ├── data/            # Mountain data and GeoJSON routes
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Next.js pages and API routes
│   ├── stores/          # Zustand state management
│   ├── styles/          # Global styles
│   ├── ui/              # UI utilities
│   └── utils/           # Helper functions
└── public/              # Static assets
    └── GPX/             # GPX files
```


## Error Handling

Added ErrorBoundary components so things don't completely break if something goes wrong:

- **Global ErrorBoundary** - Catches app-level errors with a nice fallback page
- **MapErrorBoundary** - Handles map loading issues
- **WeatherErrorBoundary** - Manages weather API problems

Basically, if one part fails, the rest of the app keeps working!

## Behind the Scenes

<details>
<summary>Click to see the details</summary>

### Design Choices

- **Who It's For**: Foreign tourists who hike regularly and want to explore mountains accessible from Tokyo
- **Features That Matter to Hikers**: 
  - Weather forecasts for 2 days before and after your hiking date (hikers care about weather, temperature, and wind direction not just on the day, but before and after as well)
  - "Drive time from Shinjuku" filter—for tourists starting from central Tokyo
  - General course time
  - Visual route confirmation so you know exactly what you're getting into (elevation changes clearly managed by color)
- **Keeping APIs Secure**: 
  - Mapbox API is domain-restricted for safe frontend use
  - OpenWeatherMap API is called from backend to keep the key hidden
- **Getting Trail Data**: 
  - Downloaded GPS tracks (GPX) from my YAMAP account and converted to GeoJSON (using @mapbox/togeojson) Way easier than drawing routes manually
- **Why I Switched Frameworks**: 
  - Initially used react-map-gl, but official documentation wasn't detailed enough for advanced features, so I thought it would be easier in the long run to migrate
  - Switched to pure mapbox-gl for camera following, smooth transitions, and dynamic route rendering
- **Little UX Details**: 
  - Placed Mapbox logo in top-left to avoid accidental taps (advice from friends who actually used it)
  - Used Tailwind's landscape utilities for better mobile rotation experience
  - Made weather card backgrounds gradient based on time of day so you can tell at a glance

### Problems I Ran Into (and Solutions)

- **GPX File Location**: Initially placed in `components/data/`, but Node's fs module apparently doesn't work client-side → Moved everything to `public/`
- **Line Gradients**: react-map-gl v7.1 didn't support mapbox's line-gradient feature → This was also one reason to switch to pure mapbox-gl
- **Smooth Animations**: FlyToInterpolator was removed in react-map-gl v7+ → Used mapRef with official mapbox methods
- **Route Pin Animation**: Pins wouldn't follow the route properly → Used line-gradient/line-progress for coloring and updated marker position every frame
- **Map Loading Timing**: Tried to render route before map style loaded → Apparently Mapbox and React render timing was off, causing errors to pile up → Added `isMapReady` flag for simple control
- **React vs Mapbox Lifecycle**: Mapbox's onLoad and React's render cycle weren't in sync → Also solved this with `isMapReady` flag
- **Hydration Errors**: Class names with line breaks caused React hydration errors → Used `join()` for long class names, kept short ones on single line

</details>

## Testing

Run tests:
```bash
npm test
```

-----------------

# 🏔️ Geoyama

日本を訪れる登山好き外国人観光客向けの、ハイキングプランアプリです。

🌐 **デモサイト**: [https://geoyama.vercel.app/](https://geoyama.vercel.app/)

## 開発背景

**フロントエンド開発スキルの実践** を目的として作成しました。自分の好きな登山を題材にして、実際に使ってみたい機能を搭載して開発しました。

ターゲットは、登山好きな外国人旅行者です。

旅行者にとって、どの山であれば日帰りで登れるかを調べるのは意外と大変です。このアプリは東京周辺の山を、実際のトレイル情報、天気予報、新宿からの所要時間、駐車場の場所と共に紹介します。

必ず寄るであろう新宿から日帰りで行ける、自分に合った山を見つけてもらえるような作りになっています。細かいルート設定などは別アプリ（AllTrais, Yamap）などで可能なため、geoyamaは日本の山に馴染みのない方々が、まずは行きたい山を絞れるように直感的な操作と重要な情報を表示することに重きを置きました。



### プロジェクトの特徴

特に以下の技術習得に重点を置きました（実際に知り合いに使ってもらうことで、少しずつ改善していきました）：

- **MapboxとReactの統合** - マップアニメーションとカメラ制御で視覚的にわかりやすい山情報
- **グローバル状態管理** - Zustandを使った効率的な状態管理
- **データ処理** - GPXからGeoJSONへの変換、MapインスタンスとReactの連携
- **レスポンシブデザイン** - モバイル横向きにも対応した細かいUX調整

当初react-map-glを使用していましたが、カメラ追従やスムーズな座標移動などの複雑さや、公式ドキュメントの乏しさから、途中で純粋なmapbox-glに移行しました。MapboxのライフサイクルとReactのレンダーサイクルの同期など、フレームワーク統合の複雑さを実感できる良い学習機会となりました。


## 機能

- 🗺️ **インタラクティブマップ** - Mapbox GLで日本の山を探索（今のところ自分のGPSデータから作ってるので数は少なめです）
- 🏔️ **3D地形** - リアルな3D標高で山の様子をチェック
- 🌤️ **天気予報** - 登山予定日の前後2日間の天気を確認できます
- 📍 **トレイルルート** - スタート、ゴール、山頂マーカー付きで実際のルートをプレビュー
- 🔍 **スマートフィルタリング** - 日付、距離、予想ハイキング時間で山を絞り込み
- 📱 **レスポンシブデザイン** - デスクトップ、タブレット、スマホ（縦向きも横向きも）でスムーズに動作

## 使った技術

- **Next.js 15** - Reactフレームワーク
- **Mapbox GL JS** - インタラクティブマップ
- **Zustand** - 状態管理
- **Tailwind CSS** - スタイリング
- **Jest & React Testing Library** - テスト（Jestはまだ勉強中！）
- **API**: 
  - Mapbox GL API（ドメイン制限でフロントエンド安全使用）
  - OpenWeatherMap API（バックエンドから呼び出し）
- **データツール**: 
  - @mapbox/togeojson（GPXをGeoJSONに変換）
  - tippecanoe（ベクタータイル生成。最終的には個々のベクタータイルを生成せず、Map自体をベクターに変更して落ち着きました）


## プロジェクト構造

```
geoyama/
├── scripts/             # データ処理用Node.jsスクリプト
│   └── saveTrailGeojson.js   # GPX→GeoJSON変換
├── src/
│   ├── components/      # Reactコンポーネント
│   │   ├── ErrorBoundary/   # エラーハンドリング
│   │   ├── InfoPanel/       # フィルターと天気表示
│   │   ├── MainView/        # メインレイアウト
│   │   └── Map/             # マップコンポーネント
│   ├── data/            # 山データとGeoJSONルート
│   ├── hooks/           # カスタムReactフック
│   ├── pages/           # Next.jsページとAPIルート
│   ├── stores/          # Zustand状態管理
│   ├── styles/          # グローバルスタイル
│   ├── ui/              # UIユーティリティ
│   └── utils/           # ヘルパー関数
└── public/              # 静的アセット
    └── GPX/             # GPXファイル
```

## トレイルの追加方法

1. GPXデータを`public/GPX/`に配置
2. `scripts/saveTrailGeojson.js`にルート情報を追加
3. 変換スクリプトを実行:
```bash
node scripts/saveTrailGeojson.js
```
4. `src/data/routeGeojson/`にGeoJSONファイルが生成されます

GeoJSONファイルは地図上で直接読み込まれます（ベクタータイルも検討しましたが、標高ベースの色グラデーションが困難だったため現在の方式を採用）。

## エラーハンドリング

何か問題が起きても完全に壊れないようErrorBoundaryコンポーネントを追加しました：

- **Global ErrorBoundary** - アプリレベルのエラーをフォールバックページでキャッチ
- **MapErrorBoundary** - マップの読み込み問題を処理
- **WeatherErrorBoundary** - 天気API の問題を管理

基本的に、一部が失敗してもアプリの残りは動き続けます！

## 開発の裏側

<details>
<summary>クリックで詳細を見る</summary>

### 設計の工夫

- **誰のため？**: 日頃ハイキングをしていて、東京からアクセスできる山を探したい外国人旅行者向け
- **ハイカーのための機能**: 
  - 登山予定日の前後2日間の天気予報（登山者はその日だけでなく、前後の天気や気温、風向きも気にするため）
  - 「新宿からの運転時間」フィルター—東京中心部から出発する旅行者に向けて
  - 体力レベルに合わせたコースタイム
  - 視覚的なルート確認で、どんなコースなのか一目瞭然（標高差もわかりやすく色で管理）
- **APIのセキュリティ**: 
  - Mapbox APIはドメイン制限をかけてフロントエンドで安全に使用
  - OpenWeatherMap APIはバックエンドから呼び出してキーを隠している
- **トレイルデータの取得**: 
  - 自分の「YAMAP」アカウントからGPSトラック（GPX）をダウンロード、GeoJSONに変換（@mapbox/togeojson使用）
  - 手作業でルートを描くより断然楽だった
- **なぜフレームワークを変更？**: 
  - 最初はreact-map-glを使っていたが、公式ドキュメントが高度な機能についてあまり詳しく書かれておらず、移行した方が長い目で見れば楽だと思ったため
  - カメラ追従、スムーズな移動、動的ルート描画のために純粋なmapbox-glに移行
- **小さなUXの工夫**: 
  - 誤ってタップしないようMapboxロゴは左上に配置（実際に使用した知り合いからのアドバイス）
  - Tailwindのlandscapeユーティリティでスマホを回転させても見やすく
  - 天気カードの背景を、時間帯に合わせてグラデーションにして見た瞬間にわかるようにした

### 直面した問題（と解決法）

- **GPXファイルの場所**: 最初`components/data/`に置いてたが、Nodeのfsモジュールはクライアントサイドで動かないらしい → 全て`public/`に移動
- **ラインのグラデーション**: react-map-gl v7.1がmapboxのline-gradient機能に非対応 → これも純粋なmapbox-glに切り替えた理由の一つ
- **滑らかなアニメーション**: react-map-gl v7+でFlyToInterpolatorが削除された → 公式のmapboxメソッドとmapRefを使用
- **ルートピンのアニメーション**: ピンがルートに沿わずずれてしまう → line-gradient/line-progressで色付けして、毎フレームマーカー位置を更新
- **マップ読み込みのタイミング問題**: マップスタイルの読み込み前にルートを描画しようとした → どうやらMapboxとReactのレンダータイミングがずれてエラーが重なる →  `isMapReady`フラグを追加してシンプルに制御
- **ReactとMapboxのライフサイクル**: MapboxのonLoadとReactのレンダーサイクルが同期してなかった → こちらも`isMapReady`フラグで解決
- **Hydrationエラー**: 改行入りのクラス名がReactのHydrationエラーを引き起こした → 長いクラス名は`join()`使用、短いものは1行に

</details>
[def]
## テスト

テストを実行:
```bash
npm test
```
