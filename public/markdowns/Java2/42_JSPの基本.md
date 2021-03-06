# JSPの基本

---

JavaServerPagesの略です。
HTMLにJavaのコードを埋め込むことで、動的なWebページを作成するための技術です。
Javaを用いてWebアプリケーションを作成する際に利用されます。

ここではHTMLについての知識はある程度知っている前提で解説します。
まずは以下のJSPファイルを作成します。

sample.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>タイトル</title>
</head>
<body>
<%-- コメントです --%>
<%
    out.println("<p>おはよう</p>");
    out.println("<p>こんにちは</p>");
%>
</body>
</html>
```

ファイルが作成できたらTomcatを起動し、ブラウザから
htttp://localhost:8080/{プロジェクト名}/sample.jsp
にアクセスします。

うまくいけばブラウザに「おはよう」と「こんにちは」が表示されます。
HTMLについての解説はここでは省略します。

### 拡張子

JSPファイルの拡張子は「.jsp」となります。

### ページディレクティブ

先頭の部分の「<%@ ... %> 」をページディレクティブといいます。
JSPに関する設定情報などを書きます。

### スクリプトレット

body部の「<% ... %>」の部分をスクリプトレットといいます。
スクリプトレットの中には任意のJavaの処理が書くことができます。
ただし、クラスの定義やメソッドの定義をすることはできません。
通常のJavaファイルでいうところの、メソッドの中身に該当する、上から順に流れる処理の流れを定義します。
(厳密にはJSP内にメソッドを定義することはできますが、通常のスクリプトレットではできません。)

実際はJSPはJavaのプログラムです。
内部ではサーブレットと呼ばれるJavaのクラスに変換されます。
なので、クラスとメソッドの定義があり、その中に処理が書かれています。
JavaのプログラムでHTMLの出力が行われ、それがブラウザ上に表示される仕組みです。

スクリプトレットは1つのファイル内に複数書くことも可能です。
以下の様にスクリプトレットを分けて書くこともできます。

```html
<% out.println("<p>おはよう</p>"); %>
<% out.println("<p>こんにちは</p>"); %>
```

ブロックを跨いで書くことも可能です。

```java
<% int n = 10; %>
<% if(n > 5) { %>
  <p>こんにちは</p>
<% } %>
```

### ブラウザへの出力

通常のJavaのアプリケーションでは、「System.out.println」によってコンソールに値を出力することができました。
しかしJSPはHTMLに変換されてブラウザに表示されるため、出力する際にはブラウザに出力されほしいところです。
JSP(とサーブレット)では、ブラウザへの出力ができるクラスが用意されており、それをJSP上ではoutという変数で使用することが可能となっています。

「out.println」や「out.print」といったメソッドを使用すると、ブラウザに値を出力することができます。
出力した値は、HTML上の文字として出力されます。
printメソッドとprintlnメソッドの違いは、出力後に改行が入るかどうかです。
printメソッドでは出力後に改行が入らず、printlnメソッドでは出力後に改行が入ります。
(System.out.printなどと同じです。)
ただし、HTMLの場合、改行を含む文字でもブラウザで表示すると改行されません。
ブラウザ上で改行されるようにするには<br>タグや<p>タグを使用する必要があるので、ブラウザ上で改行させたい場合にはタグも一緒に出力されるようにしましょう。

### 暗黙オブジェクト

out.printlnは、System.out.printlnとは異なるものです。
Javaを学習するとき、コンソールへの出力としてSystem.out.printlnをよく利用しますが、JSPでのout.printlnは、ブラウザ上に出力される処理なので、似ているようで全くの別物です。
JSPの処理でもコンソールへの出力を行いたい場合は、System.out.printlnを利用することができます。

ところでこの「out」は何者でしょうか。
通常Javaでは変数を宣言して、インスタンスを作成しなければメソッドを使用することはできません。
しかしJSPのソース上ではoutというインスタンスを定義している箇所はありません。

実はJSPには、暗黙オブジェクトと呼ばれるものが存在します。
これは、内部で予め定義されていて、明示的に宣言しなくてもJSP内であれば使用することができるオブジェクトです。
JSPは一度Javaのファイルの変換されます。
暗黙オブジェクトは、その変換されたJavaファイルのクラスの中で定義されています。
outはその暗黙オブジェクトの中の一つです。
暗黙オブジェクトは他にもいくつかの種類がありますが、それらについては後で説明します。

### コメント

JSPではHTMLとは別でコメントの機能が用意されています。
<%-- --%>
この部分に書いた内容がコメントになります。

処理に影響を及ぼさない、という点では、HTMLのコメントと同じですが、
一つだけHTMLのコメントと異なる部分があります。
それは、JSPのコメントはHTMLのコメントに残らないという点です。
HTMLのコメントは、ブラウザからソースコードを見た時に、コメントの内容を見ることができます。
しかし、JSPのコメントは、ブラウザからHTMLのソースコードを見ても残っていません。
これは、JSPは内部的にはJavaのプログラムであり、プログラムが実行された結果としてHTMLファイルが作成される、という仕組みのため、HTMLにはコメントが残らないようになっています。
スクリプトレットの中では、Javaで使用するコメント(// や /* */)も使用することができます。

### JSP式

先ほどのサンプルでは「out.println」によりブラウザへの出力を行いましたが、実はもっとシンプルに値を出力することもできます。
<%= 値 %>
と書くと、out.printlnと同様に値をブラウザに出力することができます。

```java
<%
    out.println("<p>こんにちは</p>");
%>
```

```html
<%= "<p>こんにちは</p>" %>
```

出力のみを行う処理の場合、JSP式を使用したほうが簡潔に処理が書けるので、活用するとよいでしょう。

## JSPをさらに詳しく

### pageディレクティブ

Pageディレクティブとは、JSPのページの先頭に書かれている以下のような設定情報のことでした。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
```

### language

言語の設定です。
基本的にJavaになります。

### contentType

デフォルトではHTMLとなっていますが、画像やテキストファイルのページとしたければここで指定することができます。
charsetは文字コードです。

### pageEncoding

JSPページの文字コードです。

これ以外にもpageディレクティブで設定できる項目があります。

### import

Javaにおけるimportと同じものです。
JSP内でJavaのライブラリや自作のクラスを使用したい場合に使用します。
複数のimport文を書く場合にはカンマ区切りで書くことも可能です。
<%@ page import="java.util.List , java.util.ArrayList" %>

### errorPage

エラーが発生した場合に表示するページを設定します。

他にも色々なディレクティブがありますが、興味があれば調べてみましょう。

### JSP内でのメソッドの定義

JSP内でメソッドを定義することも可能です。
その場合、スクリプトレットの開始時に「!」を付けます。

```java
<%!
int add(int n, int m) {
  return n + m;
}
%>
<%-- 呼び出し --%>
<%= add(10, 20) %>
```

JSP内でメソッドの定義をする場面はそれほど多くはありませんが、知識として知っておきましょう。
