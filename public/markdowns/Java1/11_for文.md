# for文

---

for文とは、制御構文の中での「反復」にあたります。

![picture 3](/images/ea713e0588bc12b258f92dd7be68a19b6c7ed62330e8bfe6e2a28ee32128b09f.png)  

---

例えば10円玉が財布に入っている（条件）間は、10円玉を自動販売機に入れる（繰り返す処理）など、同じような動作を繰り返し行いたいときに使用します。

![picture 4](/images/64e3183b0c426c2db18995ecfc4a501ccdc8f81e370f7c1d7418321fb202e1d9.png)  

---

for文に合わせて、少しフローチャートを細かくすると以下のようになります。
実際にJavaでfor文を書いていきます。

![picture 5](/images/0c9452a23452cf612b82f62c9483a9ee10e6379e49c70d1f4c0cd6a69f938f20.png)  

---

これをJavaで書くと以下のようになります。

```java
for (初期化; 条件式; 後処理) {
    繰り返す処理
}
```

「初期化」はfor文まで処理が進んだときに「一度だけ実行される処理」です。
主に、条件式で使用する変数を初期化するために使います。
「条件式」は「繰り返す処理を実行する条件」を記述します。
条件式はif文の条件のように、結果がbooleanになるものを書く必要があります。
「後処理」は「繰り返す処理が終わった後に」実行する処理を記述します。
主に、条件式で使用する変数を更新するために使います。
「繰り返す処理」には「out.println()」や変数の宣言、四則演算など、コンピューターに行わせたい処理を必要に応じて書いていきます。

---

サンプルプログラム(for.jsp)を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>for文</title>
</head>
<body>
<%
for (int i = 0; i < 2; i++) {
    out.print("iは");
    out.print(i);
    out.println("です。");
    out.println("<br>");
}
%>
</body>
</html>
```

---

結果

```text
iは0です。
iは1です。
```

初期化  
「int i = 0」が初期化です。
最初に1回だけ実行され、forブロックの中でのみ、この変数iを使うことができます。

条件式  
「i < 2」が条件式です。
このfor文は、変数iが「2より小さい」間は繰り返し処理を行うことになります。

後処理  
「i++」が後処理です。
これはインクリメントといい、「i = i +1」と同じ意味です。
処理が行われるたび、変数iは1ずつ増えていきます。
また、インクリメントと逆の処理を行う、「i--」があります。
これはデクリメントといい、「i = i - 1」と同じ意味です。

この後処理は、場所としては以下の位置に書きますが、処理されるのは「繰り返す処理が終わった後」になります。
順番を間違えないように注意してください。

処理  
for文の「中括弧（｛｝）の中すべて」が繰り返す処理です。
以下のように、繰り返す処理は1行だけとは限りませんので注意してください。

---

処理の流れは以下のようになります。

1. 初期化：iが宣言され、0が代入（i:0）
2. 条件式判定：「i < 2」を判定（iは0のためtrueになる）
3. 繰り返す処理：「iは0です。」が出力される
4. 後処理：iに1が加算される（$i:1）
5. 条件式判定：「i < 2」を判定（$iは1のためtrueになる）
6. 繰り返す処理：「iは1です。」が出力される
7. 後処理：iに1が加算される（i:2）
8. 条件式判定：「i < 2」を判定（iは2のためfalseになる）
9. 処理終了（条件式がfalseになったので）

for文について、もう少し詳しく見ていきます。
for文の「初期化」「条件式」「後処理」は省略できます。

---

以下が「初期化」を省略したfor文です。
しかし、このままではエラーになります。

```java
// for (int i = 0; i < 2; i++) {
for (; i < 2; i++) {
    out.print("iは");
    out.print(i);
    out.println("です。");
    out.println("<br>");
}
```

「名前がiという変数が見つかりません」とエラーになります。
初期化の箇所は空欄のまま、エラーを消す方法を見ていきます。
for文の前に変数iを用意します。
このように、for文で初期化をしなくても、事前に変数などの準備ができていればfor文を動作させることができます。

```java
// for (int i = 0; i < 2; i++) {
int i = 0;
for (; i < 2; i++) {
    out.print("iは");
    out.print(i);
    out.println("です。");
    out.println("<br>");
}
```

---

続いて条件式」と「後処理」を省略した場合を見ていきます。
**この処理は実行しないようにしてください。**

```java
// for (int i = 0; i < 2; i++) {
int i = 0;
for (;;) {
    out.print("iは");
    out.print(i);
    out.println("です。");
    out.println("<br>");
}
```

このプログラムは、実行すると以下のような結果となり止まりません。
「条件式」に何も書かないとtrueとして扱われます。
そのためfor文が終了せず、ずっと「繰り返す処理」を行います
このように無限に繰り返す処理を無限ループといいます。
無限ループに入ってしまうと処理が進まなくなるので、注意が必要です。

実行した場合は、無限ループになり、処理が止まりません。
Eclipseの場合は停止ボタンで止まります。
コマンドプロンプトの場合はCtrl+Cで止まります。

---

## for文（2重ループ）

サンプルプログラム（for2.jsp）を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>for文（2重ループ）</title>
</head>
<body>
<%
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        out.print("jは");
        out.print(j);
        out.println("です。");
        out.println("<br>");
    }
}
%>
</body>
</html>
```

---

結果

```text
jは0です。
jは1です。
jは0です。
jは1です。
```

少し複雑なループ処理を見ていきます。
for文を2重（ネスト、入れ子）にした例です。

---

処理を追っていくと以下のようになります。

1. 外側のfor文の初期化：(i:0)
2. 外側のfor文の条件式判定：「i < 2」でtrueになる
3. 内側のfor文の初期化：(i:0, j:0)
4. 内側のfor文の条件式判定：「j < 2」でtrueになる
5. 出力処理：「jは0です。」
6. 内側のfor文の後処理：(i:0, j:1)
7. 内側のfor文の条件式判定：「j < 2」でtrueになる
8. 出力処理：「jは1です。」
9. 内側のfor文の後処理：(i:0, j:2)
10. 内側のfor文の条件式判定：「j < 2」でfalseになる
11. 内側のfor文終了
12. 外側のfor文の後処理（i:1）
13. 内側のfor文の初期化：(i:1, j:0)
14. 内側のfor文の条件式判定：「j < 2」でtrueになる
15. 出力処理：「jは0です。」
16. 内側のfor文の後処理：(i:1, j:1)
17. 内側のfor文の条件式判定：「j < 2」でtrueになる
18. 出力処理：「jは1です。」
19. 内側のfor文の後処理：(i:1, j:2)
20. 内側のfor文の条件式判定「j < 2」でfalseになる
21. 内側のfor文終了
22. 外側のfor文の後処理：(i:2)
23. 外側のfor文の条件式判定：「i < 2」でfalseになる
24. 外側のfor文終了

非常に長くなりましたが、1つ1つの処理は理解できるのではないでしょうか。
iのループを外側のループ、jのループを内側のループとして独立した処理と考えれば、理解しやすくなります。

---

## 変数の有効範囲(スコープ)

Javaの変数を使うにあたり、有効範囲というものを知っておく必要があります。

サンプルプログラム（scope.jsp）を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>変数のスコープ</title>
</head>
<body>
<%
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        out.println("iは" + i + "です。");
        out.println("<br>");
        out.println("jは" + j + "です。");
        out.println("<br>");
    }
}
%>
</body>
</html>
```

---

結果

```text
iは0です。
jは0です。
iは0です。
jは1です。
iは1です。
jは0です。
iは1です。
jは1です。
```

---

処理を以下のように変更してください。

```java
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        out.println("iは" + i + "です。");
        out.println("<br>");

        // out.println("jは" + j + "です。");
        // out.println(“<br>");
    }
    out.println("jは" + j + "です。");
    out.println("<br>");
}
```

コンパイルエラーになります。

---

続いて以下のように変更し、実行結果を確認してください。

```java
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        out.println("jは" + j + "です。");
　　　　 out.println("<br>");
    }
    out.println("iは" + i + "です。");
    out.println("<br>");
}
```

結果

```text
jは0です。
jは1です。
iは0です。
jは0です。
jは1です。
iは1です。
```

今度はコンパイルエラーが出ずに結果を確認できました。
jの時はエラーが出ましたが、iの時はエラーが出ません。

---

Javaの変数には、有効な範囲（使用できる範囲）が定められています。
有効な範囲は変数を宣言した場所によって決まり、その有効な範囲のことをスコープといいます。

jのスコープは内側のfor文のブロックで、iのスコープは外側のfor文のブロック内ということになります。

## ループ制御

### break

これでfor文の基本的な使い方は一通り見ることができました。
あとはfor文を組み合わせたり、他の制御構文と組み合わせることで複雑な処理を実現させていきます。
そしてこのループ処理ですが、Javaではbreakとcontinueというキーワードを使って細かく制御できます。

---

サンプルプログラム（break.jsp）を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>break文</title>
</head>
<body>
<%
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 2; j++) {
        out.println("i,jは" + i + "," + j + "です。");
        out.println("<br>");
    }
    out.println(" -------------------- ");
    out.println("<br>");
}
%>
</body>
</html>
```

---

結果

```text
i,jは0,0です。
i,jは0,1です。
--------------------
i,jは1,0です。
i,jは1,1です。
--------------------
i,jは2,0です。
i,jは2,1です。
--------------------
```

---

このループ処理の中で、「iが1だったらfor文を途中で抜けたい 」という場合、以下のように書くことで対応できます。
先ほどのプログラムを変更し、実行結果を確認してください。

```java
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 2; j++) {
        if (i == 1) {
            break;
        }
        out.println("i,jは" + i + "," + j + "です。");
        out.println("<br>");
    }
    out.println(" -------------------- ");
    out.println("<br>");
}
```

---

結果

```text
i,jは0,0です。
i,jは0,1です。
--------------------
--------------------
i,jは2,0です。
i,jは2,1です。
--------------------
```

iが1の場合の処理が行われていないことが分かります。
breakを使うと、ループ処理を1つだけ抜けることができます。

---

## continue

次にもう1つのループ制御であるcontinueを見ていきます。
サンプルプログラム（continue.jsp）を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>continue文</title>
</head>
<body>
<%
for (int i = 0; i < 3; i++) {
    out.println("iは" + i + "です。");
    out.println("<br>");
}
%>
</body>
</html>
```

---

結果

```text
iは0です。
iは1です。
iは2です。
```

このループ処理の中で、「iが1の時だけ何も出力したくない」という場合を考えます。
先ほどのプログラムを変更し、実行結果を確認してください。

```java
for (int i = 0; i < 3; i++) {
    if (i == 1) {
        break;
    }

    out.println("iは" + i + "です。");
    out.println("<br>");
}
```

結果

```text
iは0です。
```

---

iが1の時だけでなく、2の時も出力されていません。
breakはループを中断するからです。
それではbreakをcontinueに変更し、実行結果を確認します。

```java
for (int i = 0; i < 3; i++) {
    if (i == 1) {
        continue;
    }

    out.println("iは" + i + "です。");
    out.println("<br>");
}
```

結果

```text
iは0です。
iは2です
```

continueを使うと、現在の周回のみスキップしてループ処理を継続できます。
今回の例では、continueした後の次の処理はi++になります。

---

## ループ処理と配列の相性

ループ処理と配列の相性について説明します。
配列の添え字は「0から始まる連番」で管理されているため、ループ処理との相性はバツグンです。
実際にプログラムを見ながら確認します。

サンプルプログラム（loop_array.jsp）を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ループと配列</title>
</head>
<body>
<%
int[] array = { 11, 22, 33 };

for (int i = 0; i < 3; i++) {
    out.println(array[i]);
    out.println("<br>");
}
%>
</body>
</html>
```

---

結果

```text
11
22
33
```

まずarrayという名前で配列を初期化しています。
そしてfor文でiを1ずつカウントアップしながら、配列の全要素を出力しています。
この場合、配列の要素数が変わった時にループの回数を変更する必要があります。

配列は自身で要素数を管理しているので、それを利用することでより柔軟性のあるプログラムにできます。
以下のように変更し、実行結果を確認してください。

```java
int[] array = { 11, 22, 33 };

for (int i = 0; i < array.length; i++) {
    out.println(array[i]);
    out.println("<br>");
}
```

実行結果は変わりませんが、問題なく動作します。
このように、配列の要素数は「length」を利用することで取得できます。

---

## 拡張for文

先ほどのプログラムで確認したような「配列の0番目の部屋から順に全てアクセスして」処理を行うというのはよくあるパターンの1つです。
「カウントアップ用の変数を用意」し、「条件式でlengthを使用」し、「後処理でインクリメント」を書くのは記述量も多く、ミスも発生しやすいです。
Javaは5.0からfor文の機能が拡張され、通称「拡張for文」と呼ばれる制御構文が使えるようになりました。
この「拡張for文」を使用すると、配列のような「複数の値をまとめて管理している」ものに対する処理を簡潔に記述できます。
先ほど確認したプログラムで拡張for文を使います。
以下のように変更し、実行結果を確認してください。
実行結果は同じになります。

```java
int[] array = { 11, 22, 33 };

//for (int i = 0; i < array.length; i++) {
//    out.println(array[i]);
//    out.println("<br>");
//}

for (int n : array) {
    out.println(n);
    out.println("<br>");
}

```

拡張for文はJavaのもう1つのfor文です。
ループを繰り返すたびに、宣言した変数に配列の値が順番に代入されていきます。

---

### 拡張for文の構文

```java
for (変数宣言 : 配列) {
    繰り返す処理
}
```

---

## 講義動画

[繰り返し](https://youtu.be/NU1NM3GttkE)
