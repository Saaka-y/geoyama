# GeoYama 🗻

外国人旅行者向けの日本登山ガイドアプリ
デモ：https://geoyama.vercel.app/

 新宿から日帰りで行ける山を探せる、直感的なマップベースの登山情報サービス

## 概要

フロントエンドスキルの実践を目的として作成しました。自分の好きな登山を題材に、実際に使ってみたい機能を搭載して開発しています。

**ターゲット**: 登山好きな外国人旅行者

日本の山に馴染みのない方々が、まずは行きたい山を絞れるように直感的な操作と重要な情報を表示することに重点を置いています。

※ GPXデータは私が実際に歩いたものを使用しているため、掲載できる山はまだ限られています

---

## 技術スタック

※元々JavaScriptで開発していましたが、途中からTypeScriptに移行しました。現在型定義は段階的に追加しています。

| カテゴリ | 技術 |
|---------|------|
| **フレームワーク** | Next.js 16 / React 19 |
| **言語** | TypeScript 5 | 
| **地図** | Mapbox GL JS |
| **状態管理** | Zustand |
| **スタイリング** | Tailwind CSS 4 |
| **日付処理** | Day.js |
| **テスト** | Jest / Testing Library |
| **リンター** | ESLint 9 |

---

## 現在の主な機能

### 情報パネルのスライド表示
- 画面下部からスワイプで検索絞り込みや天気予報を表示
- 海外に寄せたUIデザインを意識

### フィルター検索
- 新宿からの所要時間で絞り込み
- 歩行時間（コースタイム）で絞り込み
- 日付で絞り込み（天気予報APIと連動）

### 3Dマップ表示（Mapbox GL JS）
- 標高1,000mごとに色分けしたルート表示
- 視覚的に標高差を把握しやすいデザイン

### 天気予報API（OpenWeatherMap）
- 指定日 ± 1日の天気を3時間ごとに表示  
  （登山者は前後の天気も確認するため）
- 時間帯に応じた背景グラデーションで直感的なUI

### 詳細情報
- 登山口のGoogle Mapリンク
- 最寄り駅情報


## 現在実装中の機能

- ログイン認証機能
- 山のお気に入り登録機能

---

## ポイント

実際に知り合いに使ってもらいながら、以下の技術習得に重点を置いて改善を重ねました：

| テーマ | 内容 |
|--------|------|
| **Mapbox × React統合** | マップアニメーション、カメラ制御 |
| **グローバル状態管理** | Zustandを使った効率的な状態管理 |
| **データ処理** | GPX → GeoJSON変換、MapインスタンスとReactの連携 |
| **レスポンシブ対応** | モバイル横向きにも対応 |

### react-map-gl から mapbox-gl への移行

当初 `react-map-gl` を使用していましたが、以下の理由から純粋な `mapbox-gl` に移行しました：

- カメラ追従やスムーズな座標移動の実装が複雑
- 公式ドキュメントの情報が不足

この経験を通じて、**MapboxのライフサイクルとReactのレンダーサイクルの同期**など、フレームワーク統合の複雑さを実感できる良い学習機会となりました。

---


## ディレクトリ構成

```
src/
├── components/     # UIコンポーネント
│   ├── InfoPanel/  # 情報パネル（フィルター、天気）
│   ├── Map/        # 地図関連コンポーネント
│   └── ...
├── hooks/          # カスタムフック
├── stores/         # Zustand ストア
├── utils/          # ユーティリティ関数
├── api/           # API
└── data/           # 山・ルートのJSONデータ
```

---

<br><br>

# English Version

# GeoYama 🗻

A hiking guide app for Japan, designed for foreign travelers  
Demo: https://geoyama.vercel.app/

> An intuitive map-based hiking information service to find day-trip mountains from Shinjuku

## Overview

This project was created to practice frontend development skills. I built it around my passion for hiking, implementing features I actually wanted to use.

**Target Users**: Foreign travelers who love hiking

The focus is on intuitive interaction and displaying essential information to help those unfamiliar with Japanese mountains narrow down their choices.

> ※ The GPX data is from trails I've actually hiked, so the number of mountains available is still limited.

---

## Tech Stack

※Originally developed in JavaScript, then migrated to TypeScript. Type definitions are being added gradually.

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 / React 19 |
| **Language** | TypeScript 5 | 
| **Map** | Mapbox GL JS |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS 4 |
| **Date Handling** | Day.js |
| **Testing** | Jest / Testing Library |
| **Linter** | ESLint 9 |

---

## Current Features

### Sliding Info Panel
- Swipe up from the bottom to reveal search filters and weather forecasts
- UI design inspired by international apps

### Filter Search
- Filter by travel time from Shinjuku
- Filter by hiking duration (course time)
- Filter by date (integrated with weather forecast API)

### 3D Map Display (Mapbox GL JS)
- Color-coded route display by 1,000m elevation intervals
- Visual design that makes elevation differences easy to understand

### Weather Forecast API (OpenWeatherMap)
- Shows weather for the selected date ± 1 day, in 3-hour intervals  
  (hikers often check weather before and after their planned date)
- Intuitive UI with time-based background gradients

### Detailed Information
- Google Maps links to trailheads
- Nearest station information

## Features in Development

- Login authentication
- Mountain favorites/bookmarking

---

## Key Technical Points

I focused on learning the following technologies while iterating based on feedback from friends who tested the app:

| Theme | Details |
|-------|---------|
| **Mapbox × React Integration** | Map animations, camera control |
| **Global State Management** | Efficient state management with Zustand |
| **Data Processing** | GPX → GeoJSON conversion, Map instance & React coordination |
| **Responsive Design** | Mobile landscape support |

### Migration from react-map-gl to mapbox-gl

Initially, I used `react-map-gl`, but migrated to pure `mapbox-gl` for the following reasons:

- Complex implementation for camera tracking and smooth coordinate transitions
- Insufficient official documentation

This experience provided a great learning opportunity to understand the complexities of framework integration, such as **synchronizing Mapbox's lifecycle with React's render cycle**.

---

## Directory Structure

```
src/
├── components/     # UI components
│   ├── InfoPanel/  # Info panel (filters, weather)
│   ├── Map/        # Map-related components
│   └── ...
├── hooks/          # Custom hooks
├── stores/         # Zustand stores
├── utils/          # Utility functions
└── data/           # Mountain & route JSON data
```
