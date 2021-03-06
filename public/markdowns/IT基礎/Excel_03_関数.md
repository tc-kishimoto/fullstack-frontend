# Excel 関数

---

## 関数とは

Excelで複雑な計算を簡単に処理するための機能です。
正確には「ワークシート関数」といいます。
よく使用されているのは「IF」「SUM」など。

---

## 覚えるべき関数の数

Excelはバージョンアップのたびに使用できる関数の数が増えています。
Excel 2016 の時点では、使用できる関数の数は約480個あります。

しかし、よく使用する関数は限られていて、全体の2割もありません。
ここではよく使用する関数を中心に紹介していきます。
その他の関数は適宜調べながら使えるようにすれば問題ありません。

---

## 関数の書き方

関数は以下のように書きます。

```vb
=関数名(引数1, ...)
```

関数を使うときは必ず「=」から書きます。
関数名は半角で書く必要があります。
関数には引数が必要です。
引数に何が必要かは、関数によって異なります。
引数に文字列を指定する場合は""でくくります。

---

## 関数の入れ子

関数の引数の中に別の関数を書くこともできます。

```vb
=関数名(関数名(引数1, ...))
```

このような書き方を関数の入れ子と言います。
便利ですが、多用しすぎると読みづらくなるので注意して下さい。
関数の入れ子が多くなる場合、作業用の列を追加するなどの工夫で解消することができます。

---

## 関数の入力の仕方

関数を入力するには2つの方法があります。

1. 数式タブ → 関数の挿入
1. 直接入力

---

## 数式タブからの関数の挿入

数式タブ → 関数の挿入 で関数を挿入できます。
関数を選択し、ウィンドウの指示に従って引数を指定します。

![picture 6](/images/15ee0248801fce662223206b8d52a67368b0636daf800d739ab611611b2662b3.png)  

![picture 7](/images/fb05706b8e6a5dabd3e3a2381a9fe343fb67a48f4bb3d2e1b3b9114effcc1bad.png)  

---

## 関数の直接入力

セルに関数を直接入力する場合は、まず「=」または「@」を入力します。
そのあとに関数名を入力します。関数名の一部を入力すると、候補の一覧が表示されます。矢印キーで目的の関数を選択し、Tabキーを押すと、関数が入力されます。

![picture 8](/images/42e9dc69b8081ace29502d061f47ebf5ad65ce94d28c6a6192964935cd5506b5.png)  

---

## 相対参照と絶対参照

### 相対参照

関数を使用する場合、引数でセルの参照を指定することは多いです。
数式が入力されたセルをコピーして使用する場合、コピー元からコピー先の移動分、参照先もずれてしまいます。
例：SUM関数のセルを右下のセルにコピーした場合コピーされた式は以下のようになります。

```vb
=SUM(B2:B10)  → =SUM(C3:C11)
```

これを**相対参照**と言います。

---

### 絶対参照

コピーしたときのずれを防ぐには、絶対参照を使います。
絶対参照では、列と行の前にそれぞれ「$」マークを付けます。
例

```vb
=SUM($B$2:$B$10)
```

これを絶対参照と言います。
関数の入力されたセルをコピーする際に、参照先がずれないようにしたい場合は絶対参照を使用するようにしてください。

セルにカーソルが当たっている状態でF4キー押下で、相対参照と絶対参照を切り替えることができます。

---

## 関数の分類

関数はカテゴリによって以下のいずれかに分類されます。

* 文字列
* 数学/三角
* 日付/時刻
* 統計
* データベース関数
* 検索/行列
* 論理
* 財務
* その他

---

# 文字列を操作する関数

---

## 文字列の基本

### 文字列の扱い

関数の中で文字列を扱うときは 「"」(ダブルクォーテーション)で囲います。

例

```vb
=LEFT("ABCDEFG", 3)
```

---

### 文字列の連結

文字列を連結させたい場合は「&」を使用して連結します。

例

```vb
="ABC" & " " & "DEF"
```

⇒ABC DEF

---

## 文字列の主な関数の一覧

* LEFT：文字列の先頭から指定された文字数を取り出す
* RIGHT：文字列の末尾から指定された文字数を取り出す
* MID：部分文字列を取り出す
* LEN：文字列の長さを取得する
* SEARCH：文字列の中から特定の文字の位置を取得する
* SUBSTITUTE：指定された文字列を別の文字列に置き換える
* REPLACE：指定された位置から別の文字列に置き換える
* TEXT：指定された値と特定の書式の文字列に置き換える
* VALUE：文字列を数値に変換する

---

### LEFT

文字列の先頭から指定された文字数を取り出す

使い方

```vb
=LEFT(文字列, 取り出す文字数)
```

例

```vb
=LEFT("ABCDEFG", 3)
```

⇒ABC

---

### RIGHT

文字列の末尾から指定された文字数を取り出す

使い方

```vb
=RIGHT(文字列, 取り出す文字数)
```

例

```vb
=RIGHT("ABCDEFG", 3)
```

⇒EFG

---

### MID

文字列の指定された場所から指定された文字数を取り出す。（部分文字列を取り出す）

使い方

```vb
=MID(文字列, 開始文字の位置, 取り出す文字数)
```

例

```vb
=MID("ABCDEFG", 3, 3)
```

⇒CDE

---

### LEN

文字列の長さを取得する

使い方

```vb
=LEN(文字列)
```

例

```vb
=LEN("ABCDEFG")
```

⇒7

---

### SERACH

文字列の中から特定の文字を検索して、その位置を取得します。見つからない場合はエラーになります。

使い方

```vb
=SEARCH(検索文字列, 検索対象)
```

例

```vb
=SEARCH("C", "ABCDEFG")
```

⇒3

---

### SUBSTITUTE

文字列の中から指定された文字列を別の文字列に置き換えます。

使い方

```vb
=SUBSTITUTE(文字列, 置換対象文字列, 置換後文字列)
```

例

```vb
=SUBSTITUTE("ABCDEFG", "ABC", "123")
```

⇒123DEFG

---

### REPLACE

文字列の指定された位置から指定した文字数を引数の文字列で置き換えます。

使い方

```vb
=REPLACE(文字列, 開始位置, 文字数, 置換文字列)
```

例

```vb
=REPLACE("ABCDEFG", 5, 3, "123")
```

⇒ABCD123

---

### TEXT

指定された値と特定の書式の文字列に置き換えます。

使い方

```vb
=TEXT(値, 書式)
```

例

```vb
=TEXT(123456, "#,###")　　　    ⇒ 123,456
=TEXT(12:10:15, "hh:mm")　　   ⇒ 12:10
=TEXT(2018/12/1, "yyyy/mm")　⇒ 2018/12
```

---

### VALUE

文字列を数値に変換します

使い方

```vb
=VALUE(文字列)
```

例

```vb
=VALUE("100") + VALUE("200")
```

⇒300

---

# 数値を操作する関数

---

## 計算の基本

加算（足し算）

```vb
=10 + 20　　　　⇒ 30
```

減算（引き算）

```vb
=30 – 10　　⇒ 20
```

乗算（掛け算）

```vb
=10 * 10　　⇒ 100
```

除算（割り算）

```vb
= 10 / 5　　⇒ 2
```

べき乗

```vb
=10 ^ 3　　　⇒ 1000（10 × 10 × 10）
```

---

## 数値を操作する関数

* ABS：絶対値を求める
* MOD：割り算の余りを求める
* INT：整数に切り捨てる
* ROUND：数値を指定された桁数に四捨五入する
* ROUNDDOWN：数値を指定された桁数に切り捨てる
* ROUNDUP：数値を指定された桁数に切り上げる
* FLOOR：数値を指定された基準値の倍数で切り捨てる
* CEILING：数値を指定された基準値の倍数で切り上げる
* RAND：0～1の間の乱数を取得します

---

### ABS

絶対値を求めます。
絶対値とは、数値から符号を除いたもの。つまりマイナスの場合はマイナスを取った数値

使い方

```vb
=ABS(数値)
```

例

```vb
=ABS(-20)
```

⇒20

---

### MOD

割り算の余りを求めます。

使い方

```vb
=MOD(割られる数, 割る数)
```

例

```vb
=MOD(10, 3)
```

⇒1

---

### INT

整数に切り捨てます。

使い方

```vb
=INT(数値)
```

例

```vb
=INT(10.23)
```

⇒10

---

### ROUND

数値を指定された桁数に四捨五入します

使い方

```vb
=ROUND(数値, 桁数)
```

例

```vb
=ROUND(10.5, 0)
```

⇒11

---

### ROUNDDOWN

数値を指定された桁数に切り捨てます

使い方

```vb
=ROUNDDOWN(数値, 桁数)
```

例

```vb
=ROUNDDOWN(10.9, 0)
```

⇒10

---

### ROUNDUP

数値を指定された桁数に切り上げます

使い方

```vb
=ROUNDUP(数値, 桁数)
```

例

```vb
=ROUNDUP(10.1, 0)
```

⇒11

---

### FLOOR

数値を指定された基準値の倍数で切り捨てます

使い方

```vb
=FLOOR(数値, 基準値)
```

例

```vb
=FLOOR(25, 10)
```

⇒20

---

### CEILING

数値を指定された基準値の倍数で切り上げます。

使い方

```vb
=CEILING(数値, 基準値)
```

例

```vb
=CEILING(25, 10)
```

⇒30

---

### RAND

0～1の間の乱数を取得します

使い方

```vb
=RAND()
```

※更新のたびに値が変更されます。

---

# 日付を操作する関数

---

## 日付操作の基本

Excelでは、日付のデータは「シリアル値」として認識されます。
シリアル値とは、1900年1月1日を「1」とし、そこから何日経過したか、という考え方で記録する数値のことです。
コンピュータが計算しやすいようにそのような値を使用しています。

---

## 日付/時刻（日付）

* DATE：年、月、日のデータを日付データに変換する
* TODAY：本日の日時を取得する
* YEAR：日付データから年を取得する
* MONTH：日付データから月を取得する
* DAY：日付データから日を取得する
* WEEKDAY：日付データから曜日を1～7の数値に変換する
* DATEVALUE：日付を表す文字列を日付データに変換する

---

### DATE

年、月、日のデータを日付のデータに変換する

使い方

```vb
=DATE(年, 月, 日)
```

例

```vb
=DATE(2018, 9, 1)
```

⇒2018/09/01

---

### TODAY

本日の日付を取得する

使い方

```vb
=TODAY()
```

例

```vb
=TODAY()
```

⇒2018/12/1

---

### YEAR

日付データから年を取得する

使い方

```vb
=YEAR(日付データ)
```

例

```vb
=YEAR(2018/9/1)
```

⇒2018

---

### MONTH

日付データから年を取得する

使い方

```vb
=MONTH(日付データ)
```

例

```vb
=MONTH(2018/9/1)
```

⇒9

---

### DAY

日付データから日を取得する

使い方

```vb
=DAY(日付データ)
```

例

```vb
=DAY(2018/9/1)
```

⇒1

---

### WEEKDAY

日付データから曜日を1～7の値に変換して取得する

使い方

```vb
=WEEKDAY(日付データ)
```

例

```vb
=WEEKDAY(2018/9/1)
```

⇒7

---

### DATEVALUE

日付を表す文字列を日付データに変換する

使い方

```vb
=DATEVALUE(日付を表す文字列)
```

例

```vb
=DATEVALUE("2018/9/1")
```

⇒43344

---

# 時刻を操作する関数

---

## 時間操作の基本

* 時間の計算も、日付と同じくシリアル値で計算されます。
* シリアル値「1」は1日と計算されます。
* 1日は24時間のため、24時間が「1」です。
* 12時間なら0.5、6時間なら0.25のように表します。
* 時給計算の時のように、2時間なら「2」、1時間半なら「1.5」のようにしたい場合は、24をかけることで経過時間を算出できます。

---

## 日付/時刻（時刻）

* TIME：秒、分、時のデータを時刻に変換する
* NOW：現在日時を取得する
* HOUR：時刻から時のデータを取得する
* MINUTE：時刻から分のデータを取得する
* SECOND：時刻から秒のデータを取得する
* TIMEVALUE：文字列で表現された時刻を時刻データに変換する

---

### TIME

時、分、秒のデータを時刻のデータに変換する

使い方

```vb
=TIME(時, 分, 秒)
```

例

```vb
=TIME(12, 15, 10)
```

⇒12:15:10

---

### NOW

現在日時を取得する

使い方

```vb
=NOW()
```

例

```vb
=NOW()
```

⇒ 2018/12/1 13:00

---

### HOUR

時刻データから時のデータを取得する

使い方

```vb
=HOUR(時刻データ)
```

例

```vb
=HOUR(12:15:10)
```

⇒12

---

### MINUTE

時刻データから分のデータを取得する

使い方

```vb
=MINUTE(時刻データ)
```

例

```vb
=MINUTE(12:15:10)
```

⇒15

---

### SECOND

時刻データから秒のデータを取得する

使い方

```vb
=SECOND(時刻データ)
```

例

```vb
=SECOND(12:15:10)
```

⇒10

---

### TIMEVALUE

文字列で表現された時刻を時刻データに変換する

使い方

```vb
=TIMEVALUE(時刻を表す文字列)
```

例

```vb
=TIMEVALUE("12:15:10")
```

⇒12:15:10

---

# 論理関数

---

## 論理

* IF：条件によって処理を分ける
* AND：複数の条件を全て満たしているかを調べる
* OR：複数の条件のうち一つでも満たしているかを調べる
* NOT：指定した条件がTRUEならFALSE、FALSEならTRUEを返す
* IFERROR：エラーの場合に別の値に置き換える

---

### IF

条件によって処理を分ける

使い方

```vb
=IF(条件式, 真の場合[, 偽の場合])
```

例

```vb
=IF(C3>=80, "合格", "不合格")
```

---

### AND

複数の条件をすべて満たしているかを調べる

使い方

```vb
=AND(条件式1, …)
```

例

```vb
=AND(C3>=80, C3<100)
```

---

### OR

複数の条件のうち一つでも満たしているかを調べる

使い方

```vb
=OR(条件式1, …)
```

例

```vb
=OR(C3>=80, C4>=80, C5>=80)
```

---

### NOT

指定した条件式がTRUEならFALSEを、FALSEならTRUEを返す

使い方

```vb
=NOT(条件式)
```

例

```vb
=NOT(C3>=80)
```

---

### IFERROR

エラーの場合別の値に置き換える

使い方

```vb
=IFERROR(処理, エラーの時の値)
```

例

```vb
=IFERROR(B2/B3, "-")
```

---

# 統計関数

---

## 関数一覧

* SUM：合計値の取得
* SUMIF：条件に合致する合計値の取得
* AVERAGE：平均値を取得
* COUNT：数値の個数を取得
* COUNTA：空白以外のセルの個数
* COUNTIF：条件に合致するセルの個数
* MAX：指定された数値の中の最大値を取得
* MIN：指定された数値の中の最小値を取得
* RANK.EQ：指定された範囲の順位を取得
* LARGE：〇番目に大きい数値を取得
* SMALL：〇番目に小さい数値を取得

---

### SUM

指定された数値の合計値を取得します

使い方

```vb
=SUM(数値1, …)
```

例

```vb
=SUM(1, 2, 3, 4, 5)
=SUM(A1:A10)
```

---

### SUMIF

条件に合致する合計値を算出します

使い方

```vb
=SUMIF(範囲, 検索条件[, 合計範囲])
```

例

```vb
=SUMIF(B2:B10, "*営業*", C2:C10)
```

※「*」は任意の文字を表します。
こう書くことで「営業」という文字を含むセルが対象になる。

---

### AVERAGE

指定された値の平均値を取得します

使い方

```vb
=AVERAGE(数値1, …)
```

例

```vb
=AVERAGE(1, 2, 3, 4, 5)
=AVERAGE(A1:A10)
```

---

### COUNT

数値の個数を取得します

使い方

```vb
=COUNT(値1, …)
```

例

```vb
=COUNT(B2:B10)
```

---

### COUNTA

空白以外の値の入ったセルの個数を取得します

使い方

```vb
=COUNTA(値1, …)
```

例

```vb
=COUNTA(B2:B10)
```

---

### COUNTIF

条件に合致するセルの個数を取得します

使い方

```vb
=COUNTIF(範囲, 検索条件)
```

例

```vb
=COUNTIF(B2:B10, "*営業*")
```

---

### MAX

指定された数値の中の最大値を取得します

使い方

```vb
=MAX(値1, …)
```

例

```vb
=MAX(1, 2, 3, 4, 5)
=MAX(B2:B10)
```

---

### MIN

指定された数値の中の最小値を取得します

使い方

```vb
=MIN(値1, …)
```

例

```vb
=MIN(1, 2, 3, 4, 5)
=MIN(B2:B10)
```

---

### RANK.EQ

指定した数値の順位を取得します

使い方

```vb
=RANK.EQ(数値, 範囲[,順序])
```

※順序は、省略か0指定で降順、0以外の指定で昇順となる

例

```vb
=RANK.EQ(B5, B2:B10)
```

---

### LARGE

○番目に大きい値を取得します

使い方

```vb
=LARGE(範囲, 順位)
```

例

```vb
=LARGE(B2:B10, 2)
```

---

### SMALL

○番目に小さい値を取得します

使い方

```vb
=SMALL(範囲, 順位)
```

例

```vb
=SMALL(範囲, 順位)
```

---

# 検索/行列関数

---

## 関数一覧

* ROW：行番号を求める
* COLUMN：列番号を求める
* ROWS：行の数を求める
* COLUNS：列の数を求める
* VOOKUP：表の中から条件に合った値を抜き出す
* MATCH：指定されたデータの位置を求める
* INDEX：行番号からセルの値を求める
* INDIRECT：間接的にセルを指定する

---

### ROW

行番号を求める

使い方

```vb
=ROW()
```

⇒行の番号の数値が表示される。

表に対して番号を振りたい時によく使用します。

---

### COLUMN

列番号を求める

使い方

```vb
=COLUMN()
```

⇒列の番号の数値が表示される。

---

### ROWS

行の数を求める

使い方

```vb
=ROWS(範囲)
```

例

```vb
=ROWS(A1:A10)
```

⇒10

---

### COLUMNS

列の数を求める

使い方

```vb
=COLUMNS(範囲)
```

例

```vb
=COLUMNS(A1:E1)
```

⇒5

---

### VLOOKUP

表から値を抜き出す
指定したデータを、別表の左端の列から検索し、見つけたらその位置から指定した分右にあるデータを取得する

使い方

```vb
=VLOOKUP(検索値, 範囲, 列番号[, 検索方法])
```

例

```vb
=VLOOKUP(E2, B2:B10, 1, 0)
```

検索方法は、0またはFALSEにした場合は、完全一致
1, またはTRUEにした場合は近似値（検索値未満で最も大きい値）が検索される
1にする場合（近似値で検索する場合）は、左端に列のデータを昇順に並べておく必要がある。

検索方法を0にして、値が見つからなかった場合は
`#N/A!`のエラーになる。

---

VLOOKUP関数は、Excelの関数の中では難しい部類に入りますが、使いこなせると非常に便利です。

また、VLOOKUP関数だけで使われる場面は少なく、他の関数と組み合わせて使われることが多く、難しい反面、様々な場面で応用が利きます。

---

### HLOOKUP

表から値を抜き出す

VLOOKUP関数は、表の中の一番左の行から値を検索しますが、HLOOKUPは表の1番上の列から値を検索します。

VLOOKUPの縦横が反転した関数だと思ってください。

---

### MATCH

指定したデータの位置を求める

使い方

```vb
=MATCH(検索値, 検索範囲[, 照合の種類])
```

例

```vb
=("営業", B2:B10, 0)
```

---

### INDEX

行番号と列番号からセルの値を求める

使い方

```vb
=INDEX(範囲, 行番号, 列番号)
```

例

```vb
=INDEX(B2:E10, 3, 3)
```

---

### INDIRECT

間接的にセルの範囲を取得する

使い方

```vb
=INDIRECT(参照文字列)
```

例

```vb
=INDIRECT("B2:F10")
```

---

## まとめ

ここで紹介した関数は全体の一部です。
関数の使い方に慣れ、必要に応じて調べて使用したことのない関数でも使えるようにしましましょう。

一つの関数だけでやりたいことが実現できることは少ないです。
複数の関数を組み合わせて使用できるように使い方に慣れましょう。

---

## ツールの紹介

[Relax Tools](https://software.opensquare.net/relaxtools/)

エクセルの機能を拡張するためのツールです。
興味があればインストールして使ってみてください。

---

## 補足資料

[サンプルと演習問題](../resource/03_関数.zip)
