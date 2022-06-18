# iQuery

---

jQueryは、JavaScriptの「ライブラリ」の1つです。
ライブラリとは、汎用性の高い複数のプログラムを再利用可能な形でひとまとまりにしたファイルのことです。
これにより、JavaScriptの記述が簡単になったり、新しい機能を追加できます。
便利な関数がたくさん書かれた外部ファイルを読み込んで使うようなイメージです。
jQueryは、そのライブラリの中でも、簡単で高機能なため、人気の高いライブラリです。
ここでは、jQueryの使い方などの紹介をします。

---

## 使用方法

jQueryを使用するためには、jQueryのファイルを読み込む必要があります。
読み込む方法として、以下の2通りの方法があります。

1. WebサーバーからダウンロードしたjQueryのファイルを読み込む
2. Webサーバー上で公開されているjQueryのファイルを読み込む　　

---

### WebサーバーからダウンロードしたjQueryのファイルを読み込む

jQueryのファイルをあらかじめダウンロードしておき、そのファイルを読み込む方法です。
ファイルをあらかじめダウンロードしておく必要があります。

```html
<body>
    <p>文章など</p>

    <script src="js/jquery-3.5.1.min.js"></script>
</body>
```

---

### Webサーバー上で公開されているjQueryのファイルを読み込む

Webサーバー上にあるファイルを直接読み込む方法です。
ファイルが置かれているURLを直接記述することで読み込みます。
ファイルをあらかじめダウンロードしておく必要がなくなりますが、インターネット環境が必要になるのと、アクセスに少し時間がかかります。

```html
<body>
    <p>文章など</p>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</body>
```

---

サンプルプログラムを作ります。
ダウンロードしたjQueryのファイルを使用します。
以下のWebサイトにアクセスしてダウンロードしてください。

https://jquery.com/download/

---

以下のファイルを作成してください。
lesson_jQuery_example_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>example_1</title>
</head>
<body>
    <p id="date">後で日付を設定する</p>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script>
        $('#date').html('20xx/xx/xx');
        $('#date').css('color', 'red');
    </script>
</body>
</html>
```

---

結果
※ブラウザでは赤文字で表示されます。

```text
20xx/xx/xx
```

このサンプルプログラムでは、script要素を使い、jQueryのファイルを読み込んでいます。
読み込んだことにより、jQueryで用意されている関数やメソッドを使うことができています。

---

サンプルプログラムを作ります。
Webサーバー上のjQueryのファイルを読み込みます。

lesson_jQuery_example_2.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>example_1</title>
</head>
<body>
    <p id="date">後で日付を設定する</p>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script>
        $('#date').html('20xx/xx/xx');
        $('#date').css('color', 'red');
    </script>
</body>
</html>
```

先ほどと同じ結果になります。
このサンプルプログラムでは、script要素を使い、Webサーバー上のjQueryのファイルを読み込んでいます。
この方法の場合、インターネットに繋がっていないとファイルを読み込めません。

---

## 書式

### jQueryの基本的な書式

```js
$('セレクター').メソッド(引数)
```

例

```js
$('#test'),html('Hello World!)
```

\$記号  
jQueryを使用する際に使用する記号  
「jQuery」という記述のショートカットであり、「jQuery」と記述しても良いが、一般的には省略して「$」とだけ書く  

セレクター  
処理の対象を指定する  
セレクターの種類は、CSSのセレクターと同じ

メソッド  
セレクターに対するメソッドを記述する

引数  
メソッドに対する引数を指定する

---

### セレクター

jQueryで指定するセレクターの種類は、CSSと同じです。

```js
$('p')  // タイプセレクター

$('.name')  // クラスセレクター

$('#date')  // IDセレクター

$('main p')  // 子孫セレクター

```

---

### メソッド

jQueryで使用できるメソッドの一部を紹介します。

|メソッド|説明|
|:--|:--|
|html|htmlの設定 or 取得|
|text|テキストの設定 or 取得|
|val|input要素などの入力値の設定 or 取得|
|css|cssの設定 or 取得|
|attr|属性値の設定 or 取得|
|append|要素内の末尾にHTMLを挿入|
|appendTo|要素内の先頭にHTMLを挿入|
|click|「クリック」イベントの定義|

---

jQueryのメソッドの使用例です。

```html
<p id="date">後で日付を設定する</p>
<p id="date-ret"></p>
<script src="js/jquery-3.5.1.min.js"></script>
<script>
    $('#date').html('20xx/xx/xx');
    $('#date').css('color', 'red');
    $('#date-ret').html('上記の値:' + $('#date').html());
</script>
```

結果

```text
20xx/xx/xx
上記の値:20xx/xx/xx
```

「html」メソッドに引数を渡すと「設定(書き換え)」という意味に
　なります。
idが「date」の要素のCSSの「color」プロパティに「red」という値を渡しています。
「css」メソッドで値を設定する場合、引数の1つ目に「プロパティ」、2つ目に値を渡します。
「html」メソッドの引数を省略すると「取得」という意味になります。

---

サンプルプログラムを作ります。
以下のファイルを作成してください。

lesson_js_format_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>書式_1</title>
    <style>
        div {
            margin: 20px 0px;
        }
    </style>
</head>
<body>
    <p>入力した数値の2乗を求めます</p>
    <div>
        <label for="num">数値</label>
        <input type="number" id="num" value="0">
    </div>
    <div>
        <button id="culc-btn">計算</button>
    </div>
    <div>
        <span>計算結果：</span><span id="ret"></span>
    </div>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script>
        // idが「culc-btn」の要素のクリックイベントを定義
        $('#culc-btn').click(function () {
            // idが「num」の要素の入力値を取得
            let numStr = $('#num').val();

            // 入力値(文字列)を数値に変換
            let num = Number.parseInt(numStr);

            // 数値の2乗を求める
            let ret = num * num;

            // idが「ret」の要素の内容に計算結果を代入
            $('#ret').html(ret);
        });
    </script>
</body>
</html>
```

---

結果

![picture 3](/images/aac725070f3d9d299a45a4b27216a99ae30a965b94e6d90256706d2ce9b38054.png)  

---

このサンプルプログラムでは、以下の部分で、idが「culc-btn」の要素のクリックイベントを定義しています。

```js
$('#culc-btn').click(function () {
```

これと同じ処理をjQueryを使わずJavaScriptで書くと以下になります。

```js
document.getElementById('culc-btn').addEventListener('click', function () {
    // idが「num」の要素の入力値を取得
    let numStr = document.getElementById('num').value;

    // 入力値(文字列)を数値に変換
    let num = Number.parseInt(numStr);

    // 数値の2乗を求める
    let ret = num * num;

    // idが「ret」の要素の内容に計算結果を代入
    document.getElementById('ret').innerHTML = ret;
});
```

基本的にjQueryを使わなければ実現できない処理はありませんが、使うことで少ない記述で実現できる場合が多くなります。
