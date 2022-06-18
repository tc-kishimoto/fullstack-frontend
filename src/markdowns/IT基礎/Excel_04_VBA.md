# VBA

---

## 前提条件

Excelの基本的な用語を知っている。
（ブック、ワークシート、セルなど）
Excelの基本的な操作は問題なく行える。
基本的な関数を使うことができる。

---

以下の資料をダウンロードし、展開して内容を確認してください。

[成績表](../resource/04_VBA.zip)

「成績表_完成版.xlsm」を確認してください。
（ファイルを開き、マクロを有効に設定してください。）
「評価」ボタンを押下することで成績表が埋まります。
このマクロを段階を踏みながら作成していきます。

![picture 9](/images/10073596ea3824c33944010d0ff47710f54da7c43f7ff715e545ec79bbf14de6.png)  

---

# VBA概要

---

## VBAとは

Visual Basic for Application の略です。
Microsoft Office 製品上で動作するプログラミング言語です。
Excelで作業を自動化したい場合によく使用されます。
WordやPowerPointでも使用可能です。

---

## マクロとは

Excelで行っている作業を記録させて自動化したものを「マクロ」と呼びます。
マクロの実体は、VBAで書かれたプログラムです。
簡単な作業であればプログラミングを行わずに自動化もできますが、VBAで作成するほうがより柔軟性の高い自動化にすることができます。

---

## VBAにできること

* ボタン一つで複雑な作業をまとめて自動実行
* オリジナルのワークシート関数の作成
* ブックを跨いだ処理の実行や、印刷・出力の処理

など。
プログラムを作成することでExcelに関するほとんどの操作を自動で行うことができます。

---

## 事前準備

事前準備として以下を行います。

* ファイルの拡張子の表示
* 開発タブの表示

---

## ファイルの拡張子の表示

エクスプローラーを起動 → 表示タブ → 「ファイル名拡張子」にチェックを入れます。

![picture 10](/images/626e8a17d9bc08328300c95996d3fa711a122f45f35aa708678a1b0ecee5ecbf.png)  

拡張子とは、ファイルの種類を識別するためのものです。
チェックを入れると、ファイル名が「ファイル名.拡張子」と表示されます。
通常のExcelファイルは、「.xlsx」
マクロが組み込まれたExcelファイルは「.xlsm」となります。

---

## 開発タブの表示

Excel起動 → ファイルタブ → オプション → リボンのユーザー設定 → 右側のリストの「開発」のチェックボックスにチェックを入れます。
開発タブはマクロやVBAに関する機能を使用するタブです。

1. ファイルタブを選択
2. その他 ⇒ オプションを選択
3. 「リボンのユーザー設定」を選択
4. メインタグの「開発」のチェックボックスにチェックを入れる

---

## VBEの起動

VBAでプログラムを作成する際は、VBE（Visual Basic Editor）を起動する必要があります。

* 開発タブ → コードの表示　または
* Alt + F11

のいずれかで起動できます。

---

## VBEの設定

初めにいくつかVBEの設定をしておきます。

1. ツール → オプション でオプションを起動します。
2. 「自動構文チェック」のチェックを外します。
3. 「変数の宣言を強制する」にチェックを入れます。
4. 「OK」ボタンを押して、オプションを閉じます。

---

## マクロ作成の準備

1. 「成績表_未完成版.xlsm」を開く
2. VBEを起動
3. 挿入 → 標準モジュール
4. VBAのプログラムは基本的に標準モジュールに記述します。

---

# Step1 初めてのプログラム

---

早速プログラムを作ってみましょう。
先ほど用意した標準モジュールの中に以下の内容を記述します。

```vb
Sub 初めてのプログラム()
    MsgBox ("こんにちは")
End Sub
```

上記のプログラムを記述し、実行ボタン（「▶」）を押してみましょう。

---

結果

「こんにちは」と書かれたメッセージボックスが起動します。

![picture 11](/images/8ad246e0e89e9e9a667bc5172003a79b96e98f02fd801c864155cc4deae9701f.png)  

---

## 解説

```vb
Sub 初めてのプログラム()
    MsgBox ("こんにちは")
End Sub
```

「Sub ～」から「End Sub」までの部分を「プロシージャ」と呼びます。
VBAではプロシージャ単位でまとまった処理を記述していきます。

プロシージャの書き方は以下のようになります。

* Subの後に半角スペースを空けてプロシージャ名を記述します。
* プロシージャ名は、何の処理をしているかがわかる名前を付けます。
* プロシージャ名は日本語でも英語でも記述できます。
* 処理の部分は何行でも記述することができます。

---

MsgBoxはダイアログボックスでメッセージを表示する関数です。
ここでいう「関数」は、「VBA上で使用できる関数」のことで、ワークシート上で使用する「IF関数」や「SUM関数」とは異なります。
「引数を受け取って処理した結果を返す」という「関数」の意味は同じですが、VBAとワークシートでは使用できる「関数」が異なることを覚えておきましょう。

---

# Step2 マクロの登録

---

マクロを実行したくなるたびに毎回VBEを開いて実行するのは面倒です。
ボタンにマクロを登録し、ワークシート上から実行できるようにします。

開発タブ → 挿入 → 「フォームコントロール」の「ボタン」を選択。
ワークシート上の適当な場所に配置し、先ほど作成したプロシージャを選択します。
ボタンを押下すると、ダイアログボックスが表示され、プロシ
ージャに記述した処理が実行されているのが確認できます。

---

# Step3 変数

---

プロシージャを以下の内容に変更します。

```vb
Sub 初めてのプログラム()
    Dim num As Integer
    num = 100
    MsgBox (num)
End Sub
```

ボタンを押下、またはVBEから実行して実行結果を確認します。

結果

100と書かれたダイアログが表示される。

---

## 変数とは

変数とは、データを格納しておく箱のようなものです。

### 変数の宣言

変数を使用する場合、「こういう変数を使います」と事前に記述しておく必要があります。
これを変数の宣言と言います。
変数の宣言は「Dim 変数名 As 型」になります。
今回でいうと「Dim num As Integer」の部分です。

```vb
Dim num As Integer
```

---

### 変数名

変数名はデータの入れ物に付けておく名前で、自由に決めることができます。（日本語も使用可）
変数名は何でも良いですが何のデータが入っているのかがわかる名前を付ける必要があります。
今回のプログラムでは「num」としました。

### 変数の型

変数の型は、データの種類を表すものです。
今回使用している「Integer」は、整数を表す型です。
他にも小数、日付、文字などの型もあります。
全ての型を覚える必要はありません。よく使用される型は決まっているので、必要な時に覚えていきましょう。

---

### 変数への代入

変数に値を格納することを「代入」と言います。
代入には、「＝」を使用します。
「num = 100」と記述すると、「numという変数に100という数値を格納する」という意味になります。
算数や数学で使用する「＝」とは意味が異なるので注意しましょう。

```vb
num = 100
```

---

### 変数への再代入

代入は1度だけではなく、何度でもできます。代入した値にさらに変数を代入することを「再代入」と言います。

```vb
Sub 初めてのプログラム()
    Dim num As Integer
    num = 100
    num = 200
    MsgBox (num)
End Sub
```

---

### 変数の使用

値が代入された変数は、変数名で使用することができます。
「MsgBox(num)」とすると、numに格納された100が表示されます。

```vb
MsgBox (num)
```

---

# Step4 コメント

---

以下のプログラムを確認して下さい。

```vb
Sub 初めてのプログラム()
    ' これはコメントです
    Dim num As Integer
    num = 100
    MsgBox (num)  'メッセージを出します
End Sub
```

シングルクォーテーション(')から始まる文はコメントになります。
コメントはプログラムの動作に影響を与えないメモ書きです。
ソースコードを分かりやすくするために使用します。
書きすぎると逆に分かりにくくなるので、無駄なコメントは控えましょう。

---

# Step5 演算

---

数値の計算をしてみましょう。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    sum = 100 + 90 + 80
    avg = sum / 3
    MsgBox (sum)
    MsgBox (avg)
End Sub
```

結果

```text
270
90
```

---

## 解説

演算とは簡単に言えば計算のことです。
演算するための記号を「算術演算子」と呼びます。
VBAで使用できる算術演算子は以下の通りです。

|演算子|使い方|意味|
|:--|:--|:--|
|+|A+B|足し算|
|-|A-B|引き算|
|*|A*B|掛け算|
|/|A/B|割り算|
|\\|A\\B|割り算の余り|
|^|A^B|べき乗|

---

### 変数をまとめて宣言

先ほどの処理は、以下のように書き換えることもできます。
同じ型であれば、変数はまとめて宣言することもできます。
合わせて覚えておきましょう。

```vb
Sub 初めてのプログラム()
    Dim sum, avg As Integer
    sum = 100 + 90 + 80
    avg = sum / 3
    MsgBox (sum)
    MsgBox (avg)
End Sub
```

---

# Step6 セルからの値の取得

---

プログラムを以下のように修正します。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    sum = Cells(10, 3).Value + Cells(10, 4).Value + Cells(10, 5).Value
    avg = sum / 3
    MsgBox (sum)
    MsgBox (avg)
End Sub
```

結果

```text
266
89
```

---

Aさんの国語、英語、数学の合計と平均が表示されます。

|名前|国語|英語|数学|
|:--|:--|:--|:--|
|Aさん|85|89|92|

VBAはExceの操作を自動化するために作ることがほとんどなので、セルの操作はよく使用します。
セルを操作するには、「Cells」と「Range」の2種類がありますが、ここでは「Cells」を紹介。
「Cells(行, 列)」でセルを取得できます。
※行と列はA1セルから数えた数値
入力されている値は、 「Cells(行, 列).value」で取得できます。

---

# Step7 セルへの値のセット

---

計算した値をセルにセットしてみましょう。
プログラムを以下のように修正します。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    sum = Cells(10, 3).Value + Cells(10, 4).Value + Cells(10, 5).Value
    avg = sum / 3
    Cells(10, 6).Value = sum
    Cells(10, 7).Value = avg
End Sub
```

実行すると合計と平均のセルに値がセットされます。

|名前|国語|英語|数学|合計|平均|
|:--|:--|:--|:--|:--|:--|
|Aさん|85|89|92|266|89|

セルに値をセットするときも、取得の時と同様「Cells」を使用します。
Valueに値を代入するとセルの値が書き換わります。

---

# Step8 IF文

---

IF文を使用して、条件によって評価を決めてみましょう。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    Dim score As String
    sum = Cells(10, 3).Value + Cells(10, 4).Value + Cells(10, 5).Value
    avg = sum / 3
    Cells(10, 6).Value = sum
    Cells(10, 7).Value = avg
    If avg >= 80 Then
        score = "A"
    End If
    Cells(10, 8).Value = score
End Sub
```

実行するとAさんの評価の欄にAがセットされます。

|名前|国語|英語|数学|合計|平均|評価|
|:--|:--|:--|:--|:--|:--|:--|
|Aさん|85|89|92|266|89|A|

---

今回新しく「score」という変数を用意しました。
今までは「Integer」の型でしたが、今回は「String」となっています。
「A」などの文字を扱いたい場合は、「String」という型を使用します。Stringの値は"(ダブルクォーテーション)で囲う必要があります。

```vb
Dim score As String
score = "A"
```

---

プログラムの中で条件分岐（条件によって処理を分けたいとき）をする場合は、IF文を使用します。
Excelのワークシート上で使用するIF関数とは関係ありません。（条件によって分ける、という意味では同じですが）

IF書き方は以下の通りです。

```vb
If 条件式 Then
    条件がTRUEの時の処理
End If
```

---

## 比較演算子

条件式の中で使用した比較演算子には以下のようなものがあります。

|演算子|使い方|TRUEになる条件|
|:--|:--|:--|
|>|A > B|AがBより大きい時|
|>=|A >= B|AがB以上の時|
|<|A < B|AがBより小さい時|
|<=|A <= B|AがB以下の時|
|=|A <= B|AがBと等しい時|
|<>|A <> B|AがBと異なるとき|

---

## And と Or

条件の部分で複数の条件を指定したい場合もあります。
その場合、「And」か「Or」を使用します。
全ての条件を満たす場合に処理をしたい場合には、「And」を使用します。
いずれか一つでも条件を満たしている場合に処理したいときは、「Or」を使用します。

```vb
'平均が80点以上、または、合計が250点以上の場合
If avg >= 80 Or sum >= 250 Then
    score = "A"
End If
```

---

# Step9 IF～ELSE文

---

IFの条件に合致しない場合の処理も書いておきましょう。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    Dim score As String
    sum = Cells(10, 3).Value + Cells(10, 4).Value + Cells(10, 5).Value
    avg = sum / 3
    Cells(10, 6).Value = sum
    Cells(10, 7).Value = avg
    If avg >= 80 Then
        score = "A"
    Else
        score = "E"
    End If
    Cells(10, 8).Value = score
End Sub
```

---

IF～ELSE文を使用すると、条件に合致しない場合の処理も記述できます。

```vb
If 条件式 Then
    条件がTRUEの時の処理
Else
    条件がFALSEの時の処理
End If
```

---

# Step10 IF～ELSEIF～ELSE文

---

条件分岐をさらに細かくしていきましょう。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    Dim score As String
    sum = Cells(10, 3).Value + Cells(10, 4).Value + Cells(10, 5).Value
    avg = sum / 3
    Cells(10, 6).Value = sum
    Cells(10, 7).Value = avg
    If avg >= 80 Then
        score = "A"
    ElseIf avg >= 70 Then
        score = "B"
    ElseIf avg >= 60 Then
        score = "C"
    ElseIf avg >= 50 Then
        score = "D"
    Else
        score = "E"
    End If
    Cells(10, 8).Value = score
End Sub

```

---

条件をさらに細かく分けたい時はELSEIFを使用します。
ELSEIF句は何度でも使用することができます。

```vb
If 条件式１ Then
    条件１がTRUEの時の処理
ElseIf 条件式２ Then
    条件２がTRUEの時の処理
Else
    どれにも当てはまらないときの処理
End If
```

---

# Step11 For文

---

For文を使用して、5人分の評価をつけてみましょう。

```vb
Sub 初めてのプログラム()
    Dim sum As Integer
    Dim avg As Integer
    Dim score As String
    Dim i As Integer
    For i = 10 To 14
        sum = Cells(i, 3).Value + Cells(i, 4).Value + Cells(i, 5).Value
        avg = sum / 3
        Cells(i, 6).Value = sum 
        Cells(i, 7).Value = avg
        If avg >= 80 Then
            score = "A"
        ElseIf avg >= 70 Then
            score = "B"
        ElseIf avg >= 60 Then
            score = "C"
        ElseIf avg >= 50 Then
            score = "D"
        Else
            score = "E"
        End If
        Cells(i, 8).Value = score
    Next
End Sub
```

---

実行結果

うまく実行されれば５人分の合計、平均、評価が全て埋まります。

|名前|国語|英語|数学|合計|平均|評価|
|:--|:--|:--|:--|:--|:--|:--|
|Aさん|85|89|92|266|89|A|
|Bさん|75|80|78|233|78|B|
|Cさん|70|52|58|180|60|C|
|Dさん|51|55|54|160|53|D|
|Eさん|45|48|32|125|42|E|

For文は、何回も同じ処理を繰り返し行いたいときに使います。
書き方は以下の通りです。
変数の値が初期値から最大値になるまでの間繰り返されます。

```vb
Dim 変数 As Integer
For 変数 = 初期値 To 最大値
    繰り返す処理
Next 変数
```

---

# Step12 ファンクション

---

ファンクションを使って処理を分けてみましょう。
Subプロシージャの外に以下の内容を記述しましょう。

```vb
Function getScore(ByVal avg As Integer) As String
    If avg >= 80 Then
        getScore = "A"
    ElseIf avg >= 70 Then
        getScore = "B"
    ElseIf avg >= 60 Then
        getScore = "C"
    ElseIf avg >= 50 Then
        getScore = "D"
    Else
        getScore = "E"
    End If
End Function
```

---

subプロシージャを以下のように修正します。

```vb
Sub 初めてのプログラム()
    Dim sum, avg, i As Integer
    Dim score As String
    For i = 10 To 14
        sum = Cells(i, 3).Value + Cells(i, 4).Value + Cells(i, 5).Value
        avg = sum / 3
        Cells(i, 6).Value = sum
        Cells(i, 7).Value = avg
        score = getScore(avg)
        Cells(i, 8).Value = score
    Next
End Sub
```

実行したときの結果は同じになります。

---

処理が長くなってきたときは、ファンクションを使うことで処理を分けることができます。
「Function」～「End Function」の間に処理を書きます。
「getScore」はファンクションの名前です。
何の処理をしているのかが分かる名前を付けます。

括弧の中は「引数の宣言」をしていて、ファンクションが呼び出されるときに値を受け取るための定義をしています。
この宣言によって処理の中で「avg」という変数が使用できます。

```vb
Function getScore(ByVal avg As Integer) As String
    '処理
End Function
```

---

後ろの「As String」は、「戻り値の宣言」です。
ファンクションは、処理を終えた後、結果を返すことができます。
結果を返したい場合、その値の型を書きます。
返す値のことを「戻り値」と呼びます。

```vb
Function getScore(ByVal avg As Integer) As String
    '処理
End Function
```

---

処理の中で、ファンクション名に値を代入しています。
処理を終えた時にファンクション名に入っている値が戻り値になります。

```vb
Function getScore(ByVal avg As Integer) As String
    If avg >= 80 Then
        getScore = "A"
    '省略・・・
    Else
        getScore = "E"
    End If
End Function
```

---

ファンクションを使用したい場合は、ファンクション名を指定します。
引数が必要な場合は、括弧の中に渡したい値を入れます。
また、「score」の中に戻り値が入ります。

```vb
Sub 初めてのプログラム()
        '処理省略     
        Cells(i, 7).Value = avg
        score = getScore(avg)
        Cells(i, 8).Value = score
End Sub
```

---

### ファンクションの目的

処理が複雑になった場合、処理が長くて読みにくくなった場合など、ファンクションを作成して処理を分けることで、メンテナンス性や可読性が上がります。

プログラムが分かりにくいと感じ始めたら、ファンクションによる処理の分割を検討しましょう。

---

# Step13 ワークシート関数

---

ここで表の中に各教科の合計を追加してみましょう。

|名前|国語|英語|数学|合計|平均|評価|
|:--|:--|:--|:--|:--|:--|:--|
|Aさん|85|89|92|266|89|A|
|Bさん|75|80|78|233|78|B|
|Cさん|70|52|58|180|60|C|
|Dさん|51|55|54|160|53|D|
|Eさん|45|48|32|125|42|E|
|合計|326|324|314|964|321|

ループの中で足していって求めてもいいですが、せっかくなのでExcelのワークシート関数である「SUM」関数を使用してみましょう。

---

今まで書いてある処理の下に以下のコードを追加して実行してみましょう。

```vb
Sub 初めてのプログラム()
    ' 省略    
    Cells(16, 2).Value = "合計"
    Cells(16, 3).Value = WorksheetFunction.sum(Range("C10:C14"))
    Cells(16, 4).Value = WorksheetFunction.sum(Range("D10:D14"))
    Cells(16, 5).Value = WorksheetFunction.sum(Range("E10:E14"))
    Cells(16, 6).Value = WorksheetFunction.sum(Range("F10:F14"))
    Cells(16, 7).Value = WorksheetFunction.sum(Range("G10:G14"))
End Sub
```

VBAの処理の中でワークシート関数を使用したい場合は
「WorksheetFunction.関数名(引数)」で実行することができます。

引数の中で使用している「Range」は、セルの範囲を取得することができます。

---

# Step14 オブジェクト・プロパティ

---

セルのプロパティをいじってみましょう。

```vb
Sub 初めてのプログラム()
    ' 省略    
    Cells(16, 2).Value = "合計"
    Cells(16, 3).Value = WorksheetFunction.sum(Range("C10:C14"))
    Cells(16, 3).Font.Bold = True
    Cells(16, 3).Font.ColorIndex = 3
    ' 省略    
End Sub
```

以下の結果になります。

![picture 12](/images/7aa90a56042d21f82abe01d0935e803680b7029102526a12486c100cb90b0b82.png)  

---

「Cells」を使用するとセルを操作することができます。
この操作対象のことを「オブジェクト」と言います。
オブジェクトに付随する情報を「プロパティ」と言います。
今までは「Value」プロパティに値設定することでセルに値をセットしていました。

Excelではセルに書式設定でいろいろ操作することができます。
VBAでもExcelの操作でできることは何でもできます。
今回は太字の設定と文字色を設定しましたが、他にも自分で調べていろいろと試してみましょう。

---

# Step15 配列

---

配列を使ってみましょう。

```vb
Sub 初めてのプログラム()
    ' 省略
    Dim sums(5) As Integer
    sums(0) = WorksheetFunction.sum(Range("C10:C14"))
    sums(1) = WorksheetFunction.sum(Range("D10:D14"))
    sums(2) = WorksheetFunction.sum(Range("E10:E14"))
    sums(3) = WorksheetFunction.sum(Range("F10:F14"))
    sums(4) = WorksheetFunction.sum(Range("G10:G14"))
    Range("C16:G16").Value = sums
End Sub
```

---

配列は、まとまったデータを扱うときに使用するものです。
一つ一つ変数を宣言すると効率が悪いとき、配列を使うことで効率よく処理が行える場合があります。
配列に含まれる一つ一つの変数を要素と言います。
配列を使うときは要素が何個必要か指定し、使うときは0番目から使用します。

```vb
' 配列の宣言
Dim 配列変数名(要素数) As 要素の型

' 使い方
配列変数名(0) = 値
```

---

配列は、セルにまとめて値を貼り付けたい時にも使用することができます。指定した範囲と要素数が合っている必要があります。
多くのセルに値をセットする場合は、一つ一つセットするよりも、配列を使用してまとめてセットしたほうが処理速度が速くなります。

```vb
Sub 初めてのプログラム()
    ' 省略
    Range("C16:G16").Value = sums
End Sub
```

---

## まとめ

いろいろ見てきましたが、VBAでできることはこれだけではありません。
Excelは使っている人口が多いため、VBAに関しても大抵のことはネットで検索すれば出てきます。
気になったことがあれば「VBA  (やりたいこと)」でキーワードを入力して調べて試してみてください。
