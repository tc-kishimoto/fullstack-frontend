# JavaScript

---

## JavaScriptとは

JavaScriptはプログラミング言語の一種で、HTML/CSSだけではできない「動く」ページを作ることができます。
例として以下のようなことが実現できるようになります。

* ページが表示されたときに、今日の日付を画面に表示する
* ユーザーの操作に応じた内容を表示する
* カレンダー、地図、ゲーム、アニメーションなどを表示する

JavaとJavaScriptは別の言語であり、様々な違いがありますが、以下のような違いがあります。

* JavaScriptは、Webページに動きを付けて、ユーザーが使いやすいようにするためなどに使用されます
* Javaは様々な場面で使われ、各種システムやWebサービスなどを作成するためなどに使用されます

---

## JavaScriptの実行場所

JavaScriptは通常ブラウザー上で実行されます。

![picture 29](/images/80ff13963b60ef44ec3b8906ed3a9a901dde56ff591b888dd6107fe6cfa7ff60.png)  

---

## JavaScriptを使ったサイトの例

「mrdoob.com」のball-pool  

http://mrdoob.com/projects/chromeexperiments/ball-pool/

クリック、ドラッグ、ダブルクリックなどのマウス操作でさまざまなボールの動きが楽しめるサイトです。

---

## JavaScriptの使用方法

JavaScriptを使用するためには、主に以下の2通りの方法があります。

* HTMLファイル内に直接JavaScriptのプログラムを記述する
* JavaScriptのプログラムが書かれた外部ファイルを読み込む
　　
外部ファイルを使った方が汎用性が高く、ソースコードの管理も
しやすいため、外部ファイルを読み込む方法を多く使用します。
ただし、このテキストでは、文章量の関係上、HTMLファイル内に
直接書く方法を多く使用しています。

---

### HTMLファイル内に直接JavaScriptのプログラムを記述する

HTMLファイル内に直接JavaScriptのプログラムを記述する場合は、script要素内にプログラムを記述します。

```html
<script>
ここにJavaScriptのプログラムを記述する
</script>
```

---

### JavaScriptのプログラムが書かれた外部ファイルを読み込む

JavaScriptのプログラムが書かれた外部ファイルを読み込んで使用するには、HTMLファイル内で、script要素を使って、JavaScriptのプログラムが書かれたファイルを読み込みます。

HTMLファイル

```html
<script src="対象のファイルパス"></script>
<script src="対象のファイルパス2"></script>
```

---

### サンプルプログラム - 1

サンプルプログラムを作ります
HTMLファイル内に直接JavaScriptのプログラムを記述します

lesson_js_example_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>使用方法_1</title>
</head>
<body>
    <script>
        document.write('Hello');
    </script>
</body>
</html>
```

---

作成したらブラウザでhtmlファイルを表示してください。
画面に以下のように表示されます。

```text
Hello
```

---

### サンプルプログラム - 2

サンプルプログラムを作ります。JavaScriptのプログラムが書かれたファイルを読み込みます。

lesson_js_example_2.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>使用方法_2</title>
</head>
<body>
    <button id="msg-btn">クリックしてください</button>

    <script src="js/example_2.js"></script>
</body>
</html>
```

---

作成したHTMLファイルと同じ場所に「js」フォルダを作成し、
「js」フォルダ内に以下のファイルを作成してください。

example_2.js

```js
// ボタンをクリックするとポップアップを表示
let msgBtn = document.getElementById('msg-btn');
msgBtn.addEventListener('click',function(){
    alert('Hello');
});
```

---

実行すると以下のような結果になります。

![picture 30](/images/b2d7540e95d1605bb95d679aab3486a7dbe56a7b74838288f2fa0bd948537cf7.png)  

---

このサンプルプログラムでは、script要素を使って、JavaScriptのプログラムが書かれたファイルを読み込んでいます。

```html
<script src="js/example_2.js"></script>
```

JavaScriptのプログラムが書かれたファイルの方でボタンをクリックした際にポップアップが表示される処理を記述しています。
プログラムの内容については、「イベントドリブン」の章で説明します。
サンプルプログラム - 2の説明は以上です。

---

### 補足

script要素には、「type」属性と「language」属性があり、どちらの属性も、どのプログラム言語を使用するかを指定します。
JavaScriptを使用する場合は、以下のように記述します。

```html
<script type="text/javascript" language="javascript">
```

HTML5以降では、どちらの属性も省略可能です。
(省略した場合、JavaScriptを指定したことになる)。
JavaScript以外のプログラム言語を使う場合は、この属性を使うことで言語を切り替えることができます。

---

詳細は割愛しますが、JavaScriptを使用するための方法として、他にも以下のような方法があります。

イベントハンドラ

```html
<button onclick="alert('Hello!!')">
```

URL記述

```html
<a href="javascript:alert('Hello!!')">リンク</a>
```

---

## JavaScriptの基本ルール

### 大文字小文字の区別

JavaScriptでは、大文字と小文字は区別されます。
変数名や予約語などは大文字小文字を正確に記述する必要があります。

```js
document.write('メッセージ');
document.Write('メッセージ'); // ← Wが大文字のためエラーになる
```

### 文の区切り文字

JavaScriptでは、文の区切り文字としてセミコロン(;)を使用します。
セミコロンは省略することもできます。

```js
document.write('メッセージ1')  // ;省略可能
document.write('メッセージ2'); 
```

JavaScriptでは、どこからどこまでが1つの文なのかを自動で読み取ってくれるため、上の2つの文は正常に実行されます。
ただし、自動で文の区切りの判断を任せた場合、意図しない位置で文が区切られる可能性があるため、明確にセミコロンを記述するようにしてください。

---

## コメント

コメントとは、プログラムの動作とは関係ない内容を書くことができる機能です。
コメントを残すことで、他の人や後で見たときに分かりやすくすることができます。
JavaScriptでは2つのコメントの書き方があります。

```js
// 1行コメント

/*
複数行コメント
*/

```

---

## オブジェクト

JavaScriptでよく使われる書式として、以下の書式があります。

```js
オブジェクト名.メソッド名(引数1, 引数2, …)
```

オブジェクトは、以下のような意味があります。

* 複数の値をまとめたもの
* JavaScriptで命令することができる対象

JavaScriptでは、Webブラウザー上の様々な要素などに対して.「命令」をすることができます。
その対象となるものを「オブジェクト」として考えていきます。
オブジェクトに対して様々な命令などを行うことで、要素などを動的に変えることができます。

---

メソッドは、オブジェクトに対しての「命令」を意味します。
オブジェクト(対象)に対して、「何を」して欲しいのかを記述します。

引数は、メソッドに対する細かい調整を加えるための「詳細」や「情報」を意味します。
メソッド(命令)に対する「詳細」を記述します。
例えば、「2つの数値を足し算をしろ」という命令があったとして、まず足し算したい数値を渡さなければ、計算することができません。
その際に必要な情報(この場合は、2つの数値)のことを引数と呼びます。
⇒足し算の命令 = メソッド、足し算に使う数値 = 引数
引数は、メソッドによって、引数に指定する内容や数が異なります。
必ず引数を指定しないといけないメソッドもあれば、省略することができるメソッドもあります。

先ほどの書式を言い換えると、以下のように言い換えることができます。

```text
対象.命令(命令に必要な情報1, 命令に必要な情報2, …)
```

「命令に必要な情報」は、命令によって、内容や数が異なったり、省略できない場合や省略できる場合があります。

---

以下はオブジェクトの使用例です。

```js
document.write('Hello');
```

「document」というオブジェクトに対して、「write」というメソッドを使っています。
また、「write」メソッドに対して、「Hello」という文字列を引数として渡しています。
「document」「write」に関しては、「ducumentオブジェクト」の章で説明します。

---

## Documentオブジェクト

Documentオブジェクトは、Webブラウザー上に表示されている文書、つまり、表示されているページ自身のことを指します。
Documentオブジェクトを使用することで、Ｗebブラウザー上に表示されている要素を変更したり、要素の情報を取得したりすることができます。
Documentオブジェクトに対して使用できるメソッドの一部を紹介します。

|メソッド|説明|
|:--|:--|
|createElement|新たに要素を生成する|
|getElementById|対象のid属性値を持った要素を取得||getElementsByClassName|対象のclass属性値を持った要素群を取得|
|getElementsByName|対象のname属性値を持った要素群の取得|
|write|文字列を出力|
|writeln|文字列を出力(末尾に改行文字を挿入)|

---

サンプルプログラムを作ります。
以下のファイルを作成してください。

lesson_js_document_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>document_1</title>
</head>
<body>
    <h1>日付</h1>
    <script>
        document.write('20xx/xx/xx');
    </script>
</body>
</html>
```

---

結果

<h1>日付</h1>
20xx/xx/xx

「document」オブジェクトに対して「write」メソッドを使用すると、記述した場所に引数で渡した値が表示されます。

結果として以下のようなHTMLになります。

```html
<body>
    <h1>日付</h1>
    20xx/xx/xx
</body>
```

また、「document」オブジェクトの「write」メソッドに渡す引数を以下のように記述するとタグとして認識されます。

```html
<body>
    <script>
        document.write('<h1>日付</h1>');
        document.write('20xx/xx/xx');
    </script>
</body>
```

---

## プロパティ

オブジェクトに対しての操作方法には、「メソッド」の他に「プロパティ」があります。
オブジェクトは、複数の値を持っており、プロパティ名と値のセットでデータを管理しています。
オブジェクトが保持しているデータそのものにアクセスする場合は、以下の構文を使用します。

```text
オブジェクト名.プロパティ名
```

---

### Elementオブジェクトのプロパティ

オブジェクトによって、使用できる「プロパティ」は異なります。
ここでは、Elementオブジェクトのプロパティの一部を紹介します。
(Elementオブジェクトは、HTMLの要素(p要素やdiv要素など)を表現するオブジェクトです)

|プロパティ|説明|
|:--|:--|
|id|要素のid属性|
|className|要素のname属性値|
|innerHTML|要素の内容|
|style|要素のstyle属性値|
|value|input要素などの入力値/設定値|

---

サンプルプログラムを作ります。
以下のファイルを作成してください。

lesson_js_property_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>property_1</title>
</head>
<body>
    <p id="date">後で日付を設定する</p>
    <script>
        document.getElementById('date').innerHTML = '20xx/xx/xx';
    </script>
</body>
</html>
```

---

結果

```text
20xx/xx/xx
```

このサンプルプログラムでは、idが「date」の要素の内容(コンテンツ)に「20xx/xx/xx」という文字列を設定しています。

---

## 数値と文字列

### 数値

JavaScriptでは、文字列/数値/オブジェクトなど様々なデータの種類が存在します。
ここでは、計算などにも使用される数値について説明します。
数値は、以下のように計算に使用することができます。

```js
document.write(3 + 2); // 5
document.write(3 - 2); // 1
```

---

### 算術演算子

数値同士を計算に使用する場合、以下の演算子(算術演算子)を使用することができます。

|演算子|説明|
|:--:|:--|
|+|加算を行う|
|-|減算を行う|
|*|乗算を行う|
|/|除算を行う|
|%|剰余を求める|

---

### 演算子の優先順位

演算子には計算の優先順位があります。

|優先順位|演算子等|
|:--:|:--|
|高|()|
|中|* / % |
|低| + - |

---

### 文字列

次に、文字列について説明します。
文字列をプログラムの中で記述する場合には、シングルクォーテーション(')、または、ダブルクォーテーション(")で文字列全体を囲みます。
クォーテーション記号を囲んだものは「そのまま扱う」という意味になります。

クォーテーション記号の注意点  
クォーテーション記号を使う場合、クォーテーション記号の中では同じ記号を使わないように注意しましょう。

```js
// エラーになる
document.write("本日の日付は"20xx/xx/xx"です");
// 正常に動作する 
document.write('本日の日付は"20xx/xx/xx"です');
```

---

### 文字列の結合

文字列は「+」演算子を使うと、文字列を繋げることができます。

```js
document.write('abc' + 'def'); // abcdef
```

サンプルプログラムを作ります。
以下のファイルを作成してください。

lesson_js_num_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>num_1</title>
</head>
<body>
    <span>底辺：3、高さ：5の三角形の面積は？</span><br>
    <span id="answer"></span>
    <script>
        document.getElementById('answer').innerHTML = '正解は' + 3 * 5 / 2 + 'です';
    </script>
</body>
</html>
```

---

結果

```text
底辺：3、高さ：5の三角形の面積は？
正解は7.5です
```

このサンプルプログラムでは、数値の計算と文字列の結合を同時に行っています。

---

## 変数

変数とは、計算した結果や入力した値などを一時的に保持しておく箱のようなものです。
変数を作成することを「宣言」といい、以下のように書きます。
変数は複数作成することができるため、変数が被らないように、宣言する際に変数に名前(変数名)を付ける必要があります。

```js
変数宣言用のキーワード 変数名;
```

例

```js
let tax; // 変数taxを宣言
```

変数に値を入れることを「代入」といい、以下のように書きます「=」の記号は「代入する」という意味で使用され、記号の右側の値を、記号の左側の変数に代入します。

```js
変数名 = 値;
```

```javascript
let tax;      // 変数taxを宣言
tax = 1.1;    // taxに値を代入

let num = 20; // 変数numを宣言 + 値を代入
```

---

### 代入のルール

変数は値を何度でも入れ直すことができます(値は上書きされます)これを「再代入」といいます。
また、変数には様々な種類のデータを入れることができます。
変数の宣言時にデータの種類を意識する必要はありません。

例

```js
// 変数「num」の最初の値(初期値)は「20」だが
// 、再代入されたため、値は「30」に変更される
let num = 20;
num = 30;

// 文字列が入った変数に数値を入れ直すこともできるが、
// 分かりづらくなるため、データの種類が違う値を再代入するのは避けた方が良い
let message = 'Hello';
message = 30;
```

---

### 変数の参照

文字列や数値を直接書く代わりに、変数名を記述すると、変数が保持している値を参照して使用することができます。

```js
let num = 20;
num = num + 10;
document.write(num); // 30
```

---

### 変数の宣言方法

変数宣言用のキーワードは3つあり、必要に応じて使い分けます。

|キーワード|再代入|再宣言|用途|
|:--|:--|:--|:--|
|var|可|可|letとconstでは対応できない場合(詳細は割愛しますが、letとは変数の有効範囲に違いがあります)|
|let|可|不可|再代入する可能性がある場合|
|const|不可|不可|再代入の必要がない場合(初期値から値が変わらない変数のことを「定数」と呼ぶ)|

＜補足＞  
・以前は「var」しか使用できませんでしたが、途中から「let」と「const」を使用できるようになりました。
・「var」は同じ変数を再宣言できるという仕様により、意図しない値の変更などが発生する可能性があり、現在はあまり使用が好まれていません。

---

### 変数の宣言方法 - 例1

```js
var num = 20; // 変数numを宣言
var num = 30; // 変数numを再宣言(変数の再作成)

let num = 20; // 変数numを宣言
let num = 30; // 既に変数numは宣言されているので、エラーになる

const TAX = 1.1; // 変数TAXを宣言
TAX = 1.2;       // 値の再代入はできないので、エラーになる
const MAX_POINT; // 変数宣言時に初期値を省略できないので、エラーになる
```

---

### 変数の命名規則

変数は次のようなルールで名前を付けることができます。

* アルファベット/記号/数字などを使用することができる
* 1文字目に数字は使用できない(2文字目以降はOK)　
* 使用できる記号はアンダーバー( _ )、ドル記号($)のみ
* 大文字と小文字は区別される
* 予約語は使用できない(letやvarなど、JavaScriptで意味のある単語として使われているもの)

良い例

```js
let sum;
let inTaxPrice;
let MAX_POINT;
```

NGになる例

```js
let 10score;    // 1文字目に数字はNG
let var;        // varは予約語のためNG
let user-name;  // 「-」は変数名に使えない
```

---

ルールに従っていれば、どんな名前を付けても良いですが、英単語や熟語など、分かりやすい名前にしましょう。

変数に値を代入していない場合  
変数に値を代入していない場合、「undefined」(未定義という意味)という特殊な値が代入されます。
変数の宣言後には、必ず何か値を代入してから使用してください。

```js
let num; // 変数を宣言 + 初期値を入れない
document.write(num); // 値をしていない変数の値を参照
```

結果

```text
undefined
```

---

サンプルプログラムを作ります。
以下のファイルを作成してください。

lesson_js_variable_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>variable_1</title>
</head>
<body>
    <table border="">
        <tr>
            <td>国語</td>
            <td>数学</td>
            <td>英語</td>
            <td>合計</td>
            <td>平均</td>
        </tr> 
        <tr>
            <td>70</td>
            <td>80</td>
            <td>90</td>
            <td id ="sum"></td>
            <td id ="ave"></td>
        </tr>        
    </table>
    <script>
        let sum = 70 + 80 + 90;
        let ave = sum / 3;
        document.getElementById('sum').innerHTML = sum;
        document.getElementById('ave').innerHTML = ave;
    </script>
</body>
</html>

```

---

結果

|国語|数学|英語|合計|平均|
|:--|:--|:--|:--|:--|
|70|80|90|240|80|

このサンプルプログラムでは、合計点数と平均点を計算し、変数「sum」と変数「ave」にそれぞれの値を保持しています。

---

## consoleオブジェクト

GoogleChromeなどのブラウザでは、「コンソール」という画面を表示できます。
コンソールでは、ログの閲覧やJavaScriptでプログラムを作成している際のプログラムの動作確認などに使用できます。
まずは、GoogleChromeでのコンソールの表示の仕方を見ていきます。

以下のファイルを作成し、GoogleChromeで表示してください。

lesson_js_console_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>コンソール_1</title>
</head>
<body>
    <script>
    document.writo('Hello');
    </script>
</body>
</html>
```

---

### コンソールの表示の仕方

エラーが発生するため、画面には何も表示されません。
そのままWebページ上で右クリックし、「検証(I)」をクリックしてください。
コンソールタブをクリックしてください。
プログラムを間違えているため、以下のようなエラーの表示がされています。
コンソールでは履歴やエラーの表示を見ることができるため、バグやエラーの調査に役立てることができます。
意図した挙動にならない場合は、まずコンソール画面を見てエラーが発生していないか確認すると良いでしょう。

---

### Consoleオブジェクト

Consoleオブジェクトは、コンソールに対して変数が保持している値や任意の文字列を出力できます。
変数の値の変化や、ユーザの入力した値などを表示して、バグやエラーの調査に役立てることができます。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>コンソール_1</title>
</head>
<body>
    <script>
    let msg = 'Hello';
    console.log(msg);
    </script>
</body>
</html>
```

結果
※コンソールに表示されます。

```text
Hello
```

---

## 関数

何度も同じような計算や処理を書くと効率が悪いので、「関数」を使ってまとめることができます。
関数を作ることを「関数の定義」といい、定義方法は複数ありますが、ここでは、「関数式」による関数の定義方法を見ていきます。
JavaScriptでは、関数もオブジェクトであり、変数に代入することができます。

### 関数定義

```js
変数宣言キーワード 変数名 = function 関数名(引数1, 引数2, …){
  処理;
  return 戻り値;
};
```

---

* 関数名
  * 関数に名前を付けることができます
　省略可能で、省略した場合、匿名関数/無名関数といわれます
　(名前を付けると、関数内で自身を参照することなどができます)
* 引数
  * 関数に渡される引数名を指定します
　渡されたものは、関数内で使用できる変数として使えます
　引数は複数指定することや省略する(引数なしにする)ことができます
* 処理
  * 関数内で実行したい処理(任意)を書きます
* 戻り値
  * 関数を呼び出した場所に返す値(実行結果)を書きます
　戻り値は省略することもできます

---

### 関数の使用方法

関数式で作成した関数は、以下のように使用します。
メソッドと同じような使い方です。

```js
変数名(引数1, 引数2, …);
```

* 変数名
  * 関数が代入された変数名を指定します
* 引数
  * 関数に渡す引数を指定します
　渡す引数の数は、関数によって異なります

---

### 関数の使用例

```js
// 関数の定義
let getInTaxPrice = function (price) {
    price = price * 1.1;
    return price;
};

// 関数の呼び出し
let price1 = getInTaxPrice(1000);
document.writeln(price1);

let price2 = getInTaxPrice(2000);
document.writeln(price2);
```

結果

```text
1100
2200
```

---

## イベントドリブン

Webブラウザー上で、ユーザーなどが行う何かしらの動作(ボタンのクリックなど)のことを「イベント」といい、そのイベントに合わせてプログラムを動かすことを「イベントドリブン」といいます。
イベントドリブンによって、ボタンのクリック時に他の要素の内容を変更したりすることができます。

イベントは以下のように定義します。

```js
要素.addEventListener(イベントの種類, 処理);
```

要素  
対象の要素(p要素やbutton要素など)を指定します。
「document.getElementById」メソッドなどを使って要素を取得し、取得した要素を指定します。

イベントの種類  
対象の要素に対して、どのイベントが発生したときに行いたい処理なのかを指定します。

処理  
イベントが発生したときに行いたい処理を記述します。

---

```html
<p id="msg">ボタンをクリックするとメッセージが変わります</p>
<button id="change-btn">クリック</button>

<script>
    // ボタンクリック時の処理
    let changeMsg = function(){
        let msgObj = document.getElementById('msg');
        msgObj.innerHTML = 'ボタンがクリックされました';
    };

    // イベントの定義
    let btn = document.getElementById('change-btn');
    btn.addEventListener('click', changeMsg);
</script>
```

結果

![picture 1](/images/918b7f25d2f738425d63d5e39c0695f36b4c5265fe4de9973d2513428e4b69d8.png)  

---

イベントに対する処理部分には、関数が入った変数を指定せず、直接関数を記述することができます。
1度しか使わない関数などは、定義せずに直接記述した方が効率が良いです。

```js
// ボタンクリック時のイベントを定義
let btn = document.getElementById('change-btn');
btn.addEventListener('click', function () {
    let msgObj = document.getElementById('msg');
    msgObj.innerHTML = 'ボタンがクリックされました';
} );
```

---

### イベントの種類

イベントには様々な種類があり、以下が主なイベントです。

|イベント|説明|
|:--|:--|
|keydown|キーボードが押されたとき|
|keyup|キーボードが推された状態から離されたとき|
|mousedown|マウスのボタンが押されたとき|
|mouseup|マウスのボタンが離されたとき|
|mouseenter|マウスカーソルが要素に触れたとき|
|mouseleave|マウスカーソルが要素から離れたとき|
|click|くりっくしたとき|
|dbclick|ダブルクリックしたとき|

---

サンプルプログラム
lesson_js_event_1.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>イベントドリブン_1</title>
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
    <script>
        // idが「culc-btn」の要素のクリックイベントを定義
        let culcBtn = document.getElementById('culc-btn');
        culcBtn.addEventListener('click', function () {
            // idが「num」の要素の入力値を取得
            let numStr = document.getElementById('num').value;

            // 入力値(文字列)を数値に変換
            let num = Number.parseInt(numStr);

            // 数値の2乗を求める
            let ret = num * num;

            // idが「ret」の要素の内容に計算結果を代入
            document.getElementById('ret').innerHTML = ret;
        });
    </script>
</body>
</html>
```

---

結果

![picture 2](/images/d5f3c68609ad710c15b7be51386cd599434c47e4eec4b20ae0b415a236299794.png)  
