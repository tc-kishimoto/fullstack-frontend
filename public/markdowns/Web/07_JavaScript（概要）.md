# JavaScript（概要）

---

## JavaScriptの概要

ここではJavaScriptの概要のみ紹介します。

---

## JavaScriptとは

JavaScriptはブラウザ上で動作するプログラミング言語です。
Webページを作成する際、ブラウザに動きを与える目的で使用されます。
HTML, CSS, JavaScriptの役割を整理すると以下になります。

* HTML：Webページの構造を定義する
* CSS：Webページのレイアウトを定義する
* JavaScript：Webページに動きを加える

---

## JavaScriptでできること

JavaSriptを使うと、Webページに動きを与えることができます。
例えば以下のようなことができます。

* ボタンをクリックした時にメッセージを表示する
* スライドショー（数秒おきに画像を切り替える）
* 日時に関する計算や表示をする

などです。

HTMLとCSSだけではWebページに動きを与えることはできません。
（ただし、CSSも年々新しい技術が増え、アニメーション的な動きをつけることは可能になってきました。）
マウスをクリックした場合やマウスを移動させた場合など、ユーザーが何かしらのアクションをしたときのイベント処理を定義する場合にはJavaScriptの技術が必要になります。

---

### 静的Webサイトと動的Webサイトの違い

HTML・CSS・JavaScriptの技術だけで作成されたWebサイトのことを静的Webサイトを呼びます。
一方で、PHPやJavaなどのサーバーサイドの言語と組み合わせて作成されたWebサイト（Webアプリケーション）のことを動的Webサイトと呼ぶことがあります。

JavaScriptを使うとWebページに動きを与えることができますが、ここでいう「動き」は動的Webサイトの「動的」とは意味が異なるので注意してください。

動的Webサイトの「動的」は、使用するユーザーによって表示される画面そのものが変わるという意味です。
例えば、ログインしているユーザーによって表示されるおすすめのコンテンツが変わるようなものです。

JavaScriptの「動き」は、あくまでも静的Webサイトに対してユーザーの操作を検知して処理を行うという意味になります。

---

## JavaScriptの書き方

JavaScriptは基本的にHTML内のscript要素に記述します。

```html
<html>
    <body>
        <script>
            // ここにJavaScriptのプログラムを記述
        </script>
    </body>
</html>
```

script要素はどこに書いても構いませんが、body要素の一番下（bodyの閉じタグの直前）に書くことが多いです。
head要素内に書く場合もあります。
処理の内容によってはscript要素を書く場所が変わる動作しなくなる場合もあるので注意が必要です。
※ここでは詳細は割愛ります。JavaScriptの単元で扱います。

---

## JavaScriptのサンプル

以下はJavaScriptのサンプルです。
ボタンをクリックするとテキストボックスに入力された数値を足し算して結果を表示します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>JavaScriptサンプル</title>
</head>
<body>
    <input type="number" id="num1">
    <input type="number" id="num2">
    <button id="btn">計算</button>
    <br />
    結果
    <div id="result">

    </div> 

    <script>
        'use strict'

        document.getElementById("btn").addEventListener('click', () => {
            const num1 = (Number)(document.getElementById("num1").value);
            const num2 = (Number)(document.getElementById("num2").value);
            const result = num1 + num2;
            document.getElementById("result").innerText = result;
        })
    </script>
</body>
</html>
```

---

![picture 2](/images/2a602b1a898c8f6d7e0654e851b19a7febf9f803b3e53d6ab19dbec102e2b506.png)  

JavaScriptでは以下の内容が書かれています。

1. ボタンがクリックされた時のイベントを定義
2. idがnum1とnum2の要素のvalue属性の値を取得して変数にセット
3. それぞれの数値を合計した変数を用意
4. 合計値をidがresultの要素にセット

現時点では内容を理解できなくても問題ありません。
詳細についてはJavaScriptの単元で学習します。
ここではJavaScriptを使うことでどんなことが実現できるのかをイメージ出来れば問題ありません。

---

## タイピングゲームの作成

JavaScriptの理解を深めたい方は下記のタイピングゲーム作成にチャレンジしてみてください。

[タイピングゲームを作ろう](https://ke-kishimoto.github.io/typingGame/)
