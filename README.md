# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

### 参考サイト
https://www.youtube.com/watch?v=McZWm6Jhk4o

## Setup

Make sure to install the dependencies:

## 作成方法

```bash
nuxi init todo-nuxt3
```

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## ステップ

```bash
npm install pinia @pinia/nuxt --legacy-peer-deps
```
でインストールする

```bash
npm i vitest c8
```

tailwindcssの初期化をする
```bash
npx tailwindcss init
```

### テストカバレッジの見方
- Stmts : プログラムの各ステートメントは実行されましたか？（調べたら命令網羅と同義でした）
- Branch : ifやcaseなどの全ての分岐の処理が実行されたか否か？
- Funcs：各関数が呼び出されたかの網羅率
- Line : ソースファイルの各実行可能行が実行されたか
- Uncovered Line: Lineの対象を示す行番号
# nuxt3-todo-app
