# 事前準備

HTMLの学習を始める前にいくつかの事前準備をしておきます。

---

## ファイル拡張子の表示

拡張子はファイルを識別するためのにファイルの末尾につく文字のことです。

Windows環境ではデフォルトで拡張子は非表示になっているので、表示する設定に切り替えます。

1. エクスプローラーを起動（Windowsキー + E）
2. 表示タブをクリック
3. ファイル名拡張子にチェックを入れる

![847dc2324322391d33e3e7ae72e94f964a76d57ce36475d31c7e6b4bf7056171](https://user-images.githubusercontent.com/88996082/170389291-c2d48120-4f1e-45a0-bf4e-8c4ff56d0b5c.png)



---

### 作業場所の作成

WebページはHTMLファイルだけでなく、CSS、画像などの複数のファイルで構成されています。
そのため作業場所としてフォルダーを用意し、必要なファイルは全てそこへ保存するようにします。
本単元では「ドキュメント」の中にフォルダーを作成します。

1. エクスプローラー起動（Windowsキー + E）
2. ドキュメントの中に「Sample_Web」を作成

![picture 56](/images/ee5f0653d2de0a3441d92066e143dd724583e4c748d65ea0c34049d43785a74d.png)  

---

### Webブラウザとテキストエディタの準備

Webページの作成ではGoogle ChromeとVS Codeを使用します。
インストールができていない場合は環境構築を元にインストールを行ってください。

---

## Webの基礎

HTMLはWebページを作成するための技術です。

まずはWebの基礎を学びます。

### Web基礎基本用語

* Webページ
  * Web（ウェブ）の基本的な構成単位となる一枚の文書のこと
  * Webブラウザなどで一枚の面として一度に表示されるデータのまとまり
* Webブラウザ
  * Webページを閲覧するためのソフトのこと
* Webサイト
  * 複数のWebページのまとまり
* ホームページ
  * 一般にはWebサイトと同じ意味
  * 厳密にはWebサイトのトップページ、あるいはWebブラウザを起動したときに表示されるWebページのこと

---

### HTML

HTML = HyperText Markup Language（ハイパーテキストマークアップランゲージ）の略で、ハイパーテキストを使用したマークアップ言語のことです。

Webページを作成するための言語で、構成要素には文章のほか、画像、音声・動画ファイル等へのリンクや他のページに移動するためのハイパーリンクを埋め込むことができます。

ハイパーリンクは通常単に「リンク」とも呼ばれ、クリックすることで該当ページへジャンプできます。

---

### リクエストとレスポンス

インターネットでWebページを見る際には、クライアント（Webブラウザー）からWebサーバーにページデータの要求（リクエスト）が送信されます。
Webサーバーは要求されたデータをクライアントに送信（レスポンス）します。
この一往復のやり取りをセッションといい、データ送受信の基本となります。

![picture 57](/images/70897947e11526a33c4128cd4b647fcd6d40f29071fdbfeeb80027f967ffea5c.png)  

---

### Webページの作成

VS Codeを起動してHTMLファイルを作成します。

1. VS Codeを起動
2. [ファイル]⇒[フォルダーを開く]を選択
3. 先の手順で作成した「Sample_Web」フォルダーを選択
4. フォルダを右クリックして「新しいファイル」から「index.html」という名前のファイルを作成
5. 「Sample_Web」フォルダーにある「index.html」ファイルを確認する
6. 「index.html」ファイルをブラウザ（Google Chrome）にドラッグアンドドロップして中身が表示されることを確認する

---

以下のように真っ白なページが表示されます。

![picture 58](/images/69e6bde3570ec626ee9bef37243d00e68d2042565a11f1fc60a67a2b4eabff5b.png)  

---

以下のように内容を変えます。

* ページのタイトルをつける
* 内容を表示する

index.htmlの中身を以下の内容にし、完了したらブラウザの再表示ボタンをクリックします。（F5でも可）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>私のレシピ集</title>
</head>
<body>私のレシピ集 私のレシピ集へようこそ！！ ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。
</body>
</html>
```

---

タブの名前と内容が変わることを確認してください。

## タグ

HTMLファイルは「<」と「>」で囲まれた「タグ」によって文書構造を記述します。
これをHTMLタグといいます。

### タグの書き方

```html
<タグ名> </タグ名>
```

「タグ名」によって、指示する内容が変わります。

1つ目のタグを開始タグ、2つ目のタグを終了タグと呼び、指示する開始と終了を示します。

2つ目の記述には、タグ名の前に「スラッシュ ( / )」を付けて、ペアであることを示しています。

HTMLには、タグが複数あり、これらを組み合わせてWebページ全体を構成します。

タグによって構造を明確にすることを「マークアップする」といいます。

タグは基本的に開始タグと終了タグをペアで使用します。

---

以下はbodyタグの開始タグと終了タグです。

```html
<body>私のレシピ集 私のレシピ集へようこそ！！ ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。
</body>
```

![picture 59](/images/0549460e8cfeb1393be76bbccd14cbb907fbb824d6683ad345c980d0c25d753f.png)  

---

タグは基本的に、開始タグと終了タグがペアになるということを前述しましたが、metaタグのように、開始タグしかないものもあります。

```html
<meta charset="UTF-8">
```

metaタグは、開始タグと終了タグで挟む内容がありませんこのような要素のことを空要素と呼びます。
空要素は、終了タグが必要ないため、終了タグはありません。
終了タグがないことを分かりやすくするため、タグの最後に半角スペースとスラッシュを付ける書き方もあります。

```html
<meta charset="UTF-8" />
```

---

### 基本的ファイル構成

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>私のレシピ集</title>
</head>
<body>
私のレシピ集
私のレシピ集へようこそ！！
ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。
</body>
</html>
```

```html
<!DOCTYPE html>
```

⇒ DOCTYPE宣言。HTML5を使用することを示す。

```html
<html lang="ja">
```

⇒ htmlタグ…HTMLのデータであることを示す。

---

```html
<head>
<meta charset="UTF-8">
<title>私のレシピ集</title>
</head>
```

⇒ headタグ…Webページに関する設定（ページの設定、タイトル）の記述。

⇒ metaタグ…文字コードの指定を行う近年のWebページでは「UTF-8」が一般的です。

```html
<body>
私のレシピ集
私のレシピ集へようこそ！！
ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。
</body>
```

⇒ bodyタグ…コンテンツ（本文、画像、リンク）などページの本体を記述。

「index.html」を見やすくする段落を表す``<p>``タグを使い、文章を読みやすくします。
``<p>``タグは段落を表すため、前後の行に改行が生まれます。

---

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>私のレシピ集</title>
</head>
<body>私のレシピ集 <p> 私のレシピ集へようこそ！！ ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。</p>
</body>
</html>
```

段落が分かれていることを確認してください。

![picture 60](/images/04f804b2f7bd4c0ed125764d522544041e643e793be17fdee2371919baf38516.png)  

---

**ここで「演習問題-タグ」に取り組んでください。**

---

### 属性

タグに指定する属性について説明します。

### 画像の追加

資料の中にある「images」フォルダごと、「Sample_Web」フォルダにコピーします。
`<img>`タグを使い、以下の画像を表示します。

![picture 61](/images/76a0b7c09bc25e4a2b59a35e42f4d32832e3fac9b2e1c532de0d2aed21d2e27f.jpg)  

---

ソースコードは以下になります。

```html
<body>私のレシピ集 <p> 私のレシピ集へようこそ！！ ここでは不定期に私が作った料理のレシピを公開します。
初心者なので上手くできないこともありますが、参考にしてもらえると嬉しいです。</p>
<p><img src="images/kitchen.jpg" alt="キッチン"></p>
</body>
```

画像が表示されることを確認してください。

![picture 62](/images/75fc3fa1c0478a81c5392c24d8d4a7d6cd56f4701385b4da4c1fbef79d7c3761.png)  

---

### 入れ子構造

```<img>```タグを見ると、```<p>```タグの中に入っています。
これを入れ子構造といい、一部を除いて、タグの中に別のタグを入れることができます。このとき、囲っている```<p>```タグを親要素、その中の```<img>```タグを子要素と呼びます。

```html
<p><img src="images/kitchen.jpg" alt="キッチン"></p>
```

※ただし、タグによっては、「子要素を入れられないもの」や「子要素にしかなれないもの」などもあります。

---

```<img>```タグを見ると、タグ名の後ろに記述されているものがあります。
これを属性といい、要素に対して追加情報を与えることができます属性は「属性名="属性値"」のように指定をできます。
また、間に半角スペースを入れて複数指定することも可能です。

※属性値の前後は、ダブルクォーテーション（"）で囲むのが一般的であるが、シングルクォーテーション（'）を使ったり、省略もできる。
ただし、特別な理由が無ければ、ダブルクォーテーションで囲んでおいた方が良い。

※使用できる属性は、タグの種類によって異なる。

また、画像などの外部ファイルにリンクするには、お互いの位置関係が重要です。
例えば「index.html」と「kitchen.jpg」が同じフォルダーにあるなら、ファイル名を指定すれば画像を表示できます。
一方で、フォルダーを作成し、その中にファイルを格納した場合にはファイル名だけでは画像を表示させることはできません。

---

正しく表示させるにはフォルダー名も含めたパスという形式で指定する必要があります。
例えば「images」フォルダーを作成し、その中にファイルを格納した場合、index.htmlで指定するパスは以下のように指定します。

```html
./images/kitchen.jpg
```

※先頭の「./」は省略可能

```html
<img src="images/kitchen.jpg"> 
```

または

```html
<img src="./images/kitchen.jpg"> 
```

![picture 63](/images/07665d02493c4491df0b39726a50b6e821d530b062e76d6627c5ae9e7027abc5.png)  

※また、1つ前のフォルダを指定する際は、「../」とすることで、指定できる。

---

タグ・属性の書き方をまとめると以下のようになります。

![picture 64](/images/edcd66224aade0e054788e8e81b89abe0705ea6b0e1cc145e9cc9715743be698.png)  


---

# タグ紹介/参考

## メタデータ

|タグ|意味|用例|
|:--:|:--:|:--|
|meta|そのドキュメントにメタデータを付与する|\<meta charset="UTF-8">|
|title|タイトルをつける|\<title>Welcom My Page\</title>|
|script|JavaScriptなどのスクリプトを組み込む|\<script>alert('Hello');\</script>|
|style|スタイルシートを記述する|\<style> p {color: blue;}\</style>|
|link|リンク先の外部リソースを指定する|\<link rel="stylesheet" href="base.css">|

---

### セクション

|タグ|意味|用例|
|:--:|:--:|:--|
|h1 ～ h6|見出し|\<h1>TOPICS\</h1>|
|section|ひとつのセクションを表す|\<section>セクション\</section>|
|nav|ナビゲーションを表す|\<nav>\<a href="about.html">概要\</a>\</nav>|
|header|文書のヘッダー情報を記述する|\<header>ヘッダー\</header>|
|footer|文書のフッター情報を記述する|\<footer>フッター\</footer>|
|article|記事を記述する|\<article>記事\</article>|
|aside|本文から独立可能な補足や脚注を表す|\<aside>広告・バナー\</aside>|

---

## コンテンツのまとまり

|タグ|意味|用例|
|:--:|:--:|:--|
|p|パラグラフ（段落）を表す。改行が入る。|\<p>文章\</p>|
|blockquote|引用を表す|\<blockquote>引用文\</blockquote>|
|div|ひとかたまりのブロックを定義する|\<div>\</div>|
|span|ひとかたまりのテキストを定義する|\<span>\</span>|

---

## リスト

|タグ|意味|
|:--:|:--:|
|ol|順序のあるリストを作成する|
|ul|順序のないリストを作成する|
|li|リストの項目を作成する|
|dl|定義リストを作成する|
|dt|定義リストの項目を作成する|
|dd|定義リスト項目の定義・説明を記述する|

---

用例

```html
<ol>
    <li>項目1</li>
    <li>項目2</li>
</ol>

<ul>
    <li>項目1</li>
    <li>項目2</li>
</ul>

<dl>
  <dt>項目1</dt><dd>説明1</dd>
  <dt>項目2</dt><dd>説明2</dd>
</dl>
```

---

## ハイパーリンク

|タグ|意味|用例|
|:--:|:--:|:--|
|a|ハイパーリンクを作成する|\<a href="topics.html">TOPICS\</a>|

## テキスト関連

|タグ|意味|用例|
|:--:|:--:|:--|
|strong|強調する|ここは```<strong>```重要```</strong>```です|
|b|太字|```<br>```太字```<br>```|
|br|Webページ上で改行する|1行目```<br>```2行目```<br>```3行目|

---

## テーブル

|タグ|意味|
|:--:|:--:|
|table|テーブル（表）を作成する|
|tr|テーブルの行を定義する|
|td|テーブルのデータセルを定義する|
|th|テーブルの見出しセルを定義する|

用例

```html
<table>
  <tr>
    <td>11</td><td>12</td><td>13</td>
  </tr>
</table>
```

---

## イメージ

|タグ|意味|
|:--:|:--:|
|img|リンク先の画像を表示する|
|figure|挿絵、図表、コードなどのまとまりを表す|
|figcaption|figure要素に見出しや説明を加える|

用例

```html
<img src="sea.jpg" alt="海の写真">

<figure>
  <figcapttion>旅の写真</figcaption>
  <img src="trip.png" alt="旅の写真">
</figure>
```

---

HTMLタグは紹介したもの以外にも多く存在します。
他のタグや属性は以下のサイトなどを参考にしてください。

* とほほのWWW入門
  * http://www.tohoho-web.com/www.htm
* html5.jp
  * http://www.html5.jp/tag/elements/index.html
* htmlクイックリファレンス
  * http://www.htmq.com/

---

**※ここで「演習問題-属性」に取り組んでください。**

**※入力フォームはCSSの後に取りくんでください。**

---

# 入力フォーム

---

ブラウザー上からユーザーがデータを入力する仕組みです。
メールアドレスやパスワードなどのユーザー情報を入力し、送信ボタンを押すことで、指定された場所へデータを送信できます。
フォームはformタグと、inputタグなどのフォーム部品タグを組み合わせて作成します。
基本的に一度の通信で送る情報は、1つのformタグの中にまとめて記述する必要があります。

```html
<form action="result.html">
  入力項目1<input type="text" name="name1">
  入力項目2<input type="text" name="name2">
  <button type="submit">送信</button>
</form>
```

上記例では、ユーザーが自由に入力できる項目が2つあり、送信ボタンをクリックすると、入力した2つの情報を「result.html」のページに渡すことができる。

---

以下のような入力ページと結果ページを作ります。

![picture 65](/images/89914d5f9b973bc5294f098240ff6899e6e5524060e7623afb2cbe141d0a30f6.png)  

↓

![picture 66](/images/d5ff68305bdacf5d8ffc252164c2f313e5ca7913730f587d765f079b10c6e0b2.png)  

---

入力ページを作ります。
このページ以降のファイルを作ってください。

register.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8" />
    <title>登録画面</title>
</head>
<body>
  <div>
    <form action="result.html">
      <div class="form-group">
        <label for="name">名前</label>
        <input type="text" id="name" name="name">
      </div>
      <div class="form-group">
        <label>趣味</label>
        <label>
          <input type="checkbox" name="hobby" value="baseball" checked>野球
        </label>
        <label>
          <input type="checkbox" name="hobby" value="soccer">サッカー
        </label>
      </div>
      <div class="form-group">
        <label for="job">職業</label>
        <select id="job" name="job">
          <option value="0">選択してください</option>
          <option value="1" selected>会社員</option>
          <option value="2">学生</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">意見</label>
        <textarea id="message" name="message">ご意見を入力ください</textarea>
      </div>
      <button type="submit">送信</button>
    </form>
  </div>
</body>
```

---

結果ページを作ります。

result.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>結果画面</title>
</head>
<body>
  <p>
    登録されました！
  </p>
  <a href="register.html">戻る</a>
</body>
</html>
```

作り終えたらブラウザで表示し、送信ボタンによって画面が遷移することを確認してください。

---

### formタグ

* 入力した内容を送信先に送るためには、formタグが必要です
* 基本的には、formタグ内の入力内容が送信先に送られます
* 送られてきた情報を受け取るためには、「Java」などのプログラミング言語を使って処理する必要があります。詳細は割愛します

【使用例】

```html
<form action="送信先" method="getまたはpost">
```

* action属性には、送信先のパスを指定します
* method属性には、送信方法を指定します
* 値には、getまたはpostを指定します
* method属性を省略した場合は、getになります

---

### getとpost

【get】  
URLの一部分に入力した内容を足して送信する方法。
通常のURLの後に「?」記号に続けて送信内容を付け足す。
送信の際に送られる情報のことを「パラメータ」と呼ぶ。
検索ページなどに使われ、検索結果のページのURLをコピーすることで共有や保存が簡単にできる。
URLに含めない方が良い個人情報や大量の情報の送信には向いていない。

【post】  
URLを変化させることなく情報を送信する方法。
パスワード、個人情報、大量の情報の送信などに使われる。
getと違い、URLから同じページを再現できないため、検索ページなどには向いていない。

---

### inputタグ

データやフィールドを表します。
通常はユーザーがデータを編集することができるようにするための部品です。
type属性に入力タイプを指定し、それに伴い見た目も変化します。
指定できるものを一部紹介します。

|type|意味|
|:--|:--|
|text|一般的なテキスト|
|checkbox|チェックボックス|
|radio|ラジオボタン|
|password|パスワード(入力した内容が隠れる)|
|email|メールアドレス|
|url|url|
|file|ファイルパス(ファイルを指定できる)|
|tel|電話番号|
|number|数値|
|date|日付|

---

### inputタグの使用例

name属性は送信データを送信する際の名前を指定します。
他の入力パーツと名前が重複しないようにする必要があります。
(プログラミング言語と連携して利用するため詳細は割愛します)

### テキストボックス

```html
<input type="text" name="name" value="初期値">
```

<input type="text" name="name" value="初期値">

通常のテキスト入力。
value属性を付けることで初期値を表示。

### チェックボックス

```html
<input type="checkbox" name="test" value="check" checked>check
```

<input type="checkbox" name="test" value="check" checked>check  

チェックボックス（オン・オフの切替ができる）
checked属性を付けると初期選択状態になる。
value属性は選択時に送信する値を指定する。

---

### ラジオボタン

```html
<input type="radio" name="sei" value="male" checked>男
<input type="radio" name="sei" value="female">女
```

<input type="radio" name="sei" value="male" checked>男
<input type="radio" name="sei" value="female">女

ラジオボタン(name属性が同じものをグループとみなし、同じグループで1つだけ選択可能)  
checked属性を付けると初期選択状態になる。

value属性は選択時に送信する値を指定する。


### パスワード

```html
<input type="password" name="pass">
```

<input type="password" name="pass">

入力した内容にマスクがかかる  
（内容が伏せられる）

---

### placeholder属性

inputタグには様々な属性を指定できます。

入力例などを示すことができる「placeholder」属性を紹介します。

【使用例】

```html
<input type="text" name="name" placeholder="例)手久野 興亜"> 
```

<input type="text" name="name" placeholder="例)手久野 興亜">   

薄い文字で入力例が表示されます。
ユーザーが文字を入力すると見えなくなります。

---

### required属性

inputタグには様々な属性を指定できます。
必須項目にすることができる「required」属性を紹介します。

【使用例】

```html
<input type="text" name="name" required> 
```

入力項目に何も入力せずに送信しようとすると、下記のような警告が表示されます。

![picture 67](/images/18976262ecad61faa4fc8024adc6bddf0d55f05b907bd47c707cf79a92000b48.png)  

---

### selectタグ

プルダウン形式でユーザーに選択させるための部品です。

項目の列挙にはoptionタグを使用します。

【使用例】

```html
<select name="趣味">
    <option value="soccer" selected >サッカー</option>
    <option value="golf">ゴルフ</option>
</select>
```

---

<select name="趣味">
    <option value="soccer" selected >サッカー</option>
    <option value="golf">ゴルフ</option>
</select>  

selected属性を付けると初期選択状態になる。
value属性は選択時に送信する値を指定する。

### textareaタグ

複数行の入力フィールドを表示し、長文を入力させるための部品です。

【使用例】

```html
<textarea name="free" rows="2" cols="20"></textarea>
```

<textarea name="free" rows="2" cols="20"></textarea>  

rows属性は行数、cols属性は幅を指定します。

---

### buttonタグ

ボタンを表示します。
type属性にボタンタイプを指定し、それに伴いクリック時の挙動が変化します。

【使用例】

```html
<button type="submit">OK</button>
```

<button type="submit">OK</button>  

⇒入力内容を別の画面などに送信するボタン

```html
<button type="reset">CLEAR</button>
```

⇒フォーム内の入力内容をすべてリセットするボタン

```html
<button type="button">NO</button>
```

⇒JavaScriptなどを使い、クリックした時の動きを別途与えることで利用する。

---

### labelタグ

input要素などのフォーム部品と共に利用されます。
フォーム部品とラベルを関連付けることで、ラベルをクリックしたときにそのフォーム部品にフォーカスがあたるようになります。

【使用例】

```html
<label for="name">名前</label>
<input type="text" id="name" name="name">
```

<label for="name">名前</label>
<input type="text" id="name" name="name">  

⇒labelのfor属性に、関連付けたい要素のid名を指定することで、
関連付けることができる
ラベルをクリックすると、入力項目にフォーカスがあたる

```html
<label><input type="checkbox" name="hobby">野球</label>
```

<label><input type="checkbox" name="hobby">野球</label>  

⇒labelのコンテンツに関連付けたい要素を入れることで関連付ける。
ラベルをクリックすると、チェックのオン・オフの切替ができる。

---

### 論理属性

論理属性とは、「値の指定が必要のない属性」のことです。
有効または無効のいずれかを選択します。
selectedやchecked属性などが論理属性です。
記述方法は、「属性名」「属性名=""」「属性名="属性名"」のいずれかを指定できます。
この記述をした場合は、有効になります。
記述しない場合は、無効になります。

【使用例】

```html
<input type="radio" checked>
<input type="radio" checked="">
<input type="radio" checked="checked">
```

上記のいずれの方法でも、初期選択状態になります。

---

**※「演習問題-入力フォーム1」と「演習問題-入力フォーム2」に取り組んでください。**

---

## 講義動画

[HTMLの用語解説](https://youtu.be/ytHK2m-sM-E)

[index.htmlの解説](https://youtu.be/o_JIKM2msOs)

[HTMLでよく使うタグ1](https://youtu.be/HT-_lBKFfq0)

[パスとリンクと画像](https://youtu.be/_IT5G1LHJQ4)

[入力フォーム](https://youtu.be/AcSl4JwOv3Y)

[セクション](https://youtu.be/JNABwgV0yw4)

[グローバル属性](https://youtu.be/gKjoSHMKR2M)
