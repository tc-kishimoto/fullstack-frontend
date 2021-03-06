# Webサイト制作とWebデザイン

---

## Webサイト制作の流れ

通常、Webサイトを作成する場合はいきなりHTMLやCSSを書き始めることはありません。

まずはどのようなWebサイトを作成するのかを決め、その後にWebページの洗い出しやサイトマップを作成します。
サイトマップ作成後、Webページのデザインを行い、デザイン後にコーディング（HTML・CSSの作成）を行います。

---

一般にはWebサイト制作の流れは以下のようになります。

1. 企画を立てる
   * どんなサイトを作るのか。サイトの目的や、誰に向けたサイトなのかを考えます。
2. Webページの洗い出し
   * 必要なWebページを洗い出します
3. サイトマップの作成
   * 洗い出したWebページが、どのページとリンクしているのかを図にまとめます。
4. 各ページのデザイン
   * デザインツールなどを使って各Webページのデザインを行います。
5. コーディング
   * デザインをもとにHTMLやCSSをコーディングします。
6. Webサーバー上に公開
   * 一通りWebサイトが完成したら、Webサーバー上にアップロードし、インターネット上から閲覧できるようにします。

---

## Webデザインツール

Webデザインを行うツールは数多くあります。
ここではFigmaというツールを紹介します。

[Figma](https://www.figma.com/)

特徴は以下になります。

* アカウントを作成することでWeb上から直感的にWebサイトのデザインを行うことができる。
* デスクトップアプリとしてインストールすることも可能。
* 共有の設定を行うことでリンクから簡単に第三者にリンクを確認可能
* 複数人で共有編集が可能

---

Webサイト制作の課題や、今後の個人開発、グループ開発で使用するため、アカウントを作成して使えるようにしておいてください。

デスクトップアプリが良い場合はインストールしておいてください。

使い方の解説は省くので、他のWebサイトを参考にしたり、実際に使いながら慣れるようにしてください。

---

## デザインのポイント

Webデザインには様々なテクニックがありますが、まずは以下を意識することが重要です。

* サイトの目的やコンセプトに合っているか
* ユーザーにとって見やすい構造になっているか
* 全体の色やサイズ感が統一されているか

普段利用しているWebサイトのデザインを見比べながら、どのような工夫が行われているかを考え、自分でWebサイトを作成する際の参考にしてみてください。

※ネットからダウンロードした画像を使ってWebサイトを作成する場合、著作権法に引っかかる場合もあるので、他のWebサイトを参考にする際には注意してください。

※学習目的の場合は基本的にダウンロードした画像を使っても問題ありません。

---

## レスポンシブWebデザイン

昨今、Webサイトを見るためのデバイスは多様化しています。
主なデバイスとしてはPC、スマホ、タブレット等があります。
また、PCは画面の小さなノートPCで見る場合もあれば、サイズの大きいモニターを使って見る場合もあります。

実際にWebサイトを公開する場合、ユーザーはどのデバイスを使ってWebサイトを参照するか分からないため、画面のサイズによる見え方も意識してデザインを行う必要があります。

このように画面のサイズに合わせて画面レイアウトを切り替える手法を「**レスポンシブWebデザイン**」と呼びます。
通常はWebページのデザインを行う際に、PC用とスマホ用で分けてデザインを作成します。

---

## メディアクエリ

レスポンシブWebデザインは、CSSでメディアクエリという機能を使うことで実現できます。
メディアクエリでは、画面幅に合わせて適用するスタイルを変更することができます。
以下はメディアクエリの例です。

```css
/* 画面幅が0~599pxの間は以下が適用される */
@media(min-width: 0px) and (max-width: 599px) {
   p {
      font-size: 9px;
   }
}

/* 画面幅が600px以上の場合は以下が適用される */
@media(min-width: 600px)  {
   p {
      font-size: 10px;
   }
}

/* 画面幅が800px以上の場合は以下が適用される */
@media(min-width: 800px) {
   p {
      font-size: 11px;
   }
}
```

---

CSSファイルそのものを別で作成し、linkタグで画面幅に合わせて読み込むCSSを分けることも可能です。

```html
<link rel="stylesheet" href="css/style_sp.css" media="screen and (max-width: 599px)">
<link rel="stylesheet" href="css/style.css" media="screen and (min-width: 600px)">
```

---

## レスポンシブWebデザインの確認

通常Webサイトを作成する場合はPCを使用して作成することがほとんどです。
その場合、スマホやタブレットでどのように見えるか確認する必要がありますが、DevToolsを使うことで簡単に確認できます。

---

DevToolsの左上にあるスマホタブレットのマーク（Elementsタブの左、要素選択のマークの右）をクリックすると、スマホ用の画面として表示されます。

![picture 41](/images/b8539bf0ce5e01d05b8a09ae7b46fc8b2c504c45af168431c962278a44f34b91.png)  

---

また、デバイスの内容も様々な種類から選択できます。

![picture 42](/images/c56afa36a3a85b6ab9e8f143b90df554a2e177e5e5b4f7f6e4e790d86dbe26cd.png)  

---

## Flexbox

Flexboxは、フレキシブルにレイアウトを構成することができるCSSの機能です。
複数の要素を並べてWebページを構成する際に、要素の並べ方を柔軟に設定できます。
近年のWebサイトはFlexboxを用いたレイアウトが主流になっており、レスポンシブWebデザインを行う上でも重要になる技術です。

詳細の説明やサンプル等は以下のサイトを参照ください。

[Flexboxチートシート](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)

[MDN Flexbox](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

---

## Bootstrap

BootstrapはCSSのフレームワークです。
Bootstrapを用いることで、自分でCSSを記述しなくても、要素に対するクラス指定である程度整ったレイアウトを作成できます。
うまく使いこなすことで、CSSを1から作成するよりも少ない工数でレイアウトを作成できます。

導入方法や使い方は公式サイトを参考にしてください。

[公式サイト](https://getbootstrap.jp/)
