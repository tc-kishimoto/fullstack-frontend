# EL式とJSTL

---

JSPとサーブレットでうまく役割分担してプログラムを作成すれば、JSP内でスクリプトレットの記述を最小限にして開発をできます。
しかし、スクリプトレットの記述が少しでも必要になると、少なからずJavaの知識が必要になってきます。
本来、画面の部分はHTMLやCSSに詳しいデザイナーの人に任せ、Javaのプログラムの部分はプログラマーの人に任せた方が効率よく開発ができます。
しかし、セッションスコープやリクエストスコープのの値を出力する処理をするためだけにJavaの知識を求めるのは効率的ではありません。

そこで、JSP内でスクリプトレットを使用せずに簡単な値の出力や演算を行うための技術としてEL式と呼ばれるものがあります。
また、Javaの文法を知らなくても、独自のタグを使用することで簡単な処理をできるようにしたカスタムタグと呼ばれる技術もあります。

## EL式

まずはEL式について見ていきます。
EL式はExpression Language の略です。
サーブレットの例で作成したmypage.jspを以下の様に修正します。

mypage.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>マイページ</title>
  </head>
  <body>
    <div>
      <p>ようこそ ${requestScode.id} さん </p>
    </div>
  </body>
</html>
```

結果は変わらないはずです。
EL式では、「${}」 を使用します。
{}(中かっこ)の中の式が評価され、その結果がブラウザ上にそのまま出力されます。
requestScodeはEL式の中で使用することができるオブジェクトで、リクエストスコープを表します。

EL式の中で扱える式には以下のものがあります。

- pageScope：ページスコープを表す
- requestScode：リクエストスコープを表す
- sessionScope：セッションスコープを表す
- applicationScope：アプリケーションスコープを表す
- param：パラメータのキーと値(String)を管理する
- paramValues：パラメータとキーの値(Stringの配列)を管理する
- cookie：クッキーのキーと値を管理する
- header：リクエストヘッダーのキーと値（String）を管理する
- headerValues：リクエストヘッダーのキーと値（String[]）を管理する
- initParam：初期化パラメーターのキーと値を管理する
- pageContext：JSPのオブジェクトを管理する

ちなみに、「requestScode」は省略して

```text
${id}
```

のように書くこともできます。
オブジェクトを省略した場合、
ページスコープ ⇒ リクエストスコープ ⇒ セッションスコープ ⇒ アプリケーションスコープ
の順にスコープを参照し、キーが見つかったスコープのValueが出力される仕組みです。

また、EL式では算術演算子、比較演算子、論理演算子が使用可能です。

算術演算子

- \+：加算
- \-：減算
- \*：乗算
- \/(div)：除算
- %(mod)：剰余

比較演算子

- ==(eq)：等しい
- !=(ne)：等しくない
- <(lt)：より小さい
- <=(le)：以下
- \>(gt)：より大きい
- \>=(ge)：以上
- empty：空またはnull

論理演算子

- &&(and)
- ||(or)
- !(not)

三項演算子

- a ? b : c

```text
${10 + 20}
${10 == 10}
${10 != 10}
```

JSPの中でこのように書くと、それぞれ「30」「true」「false」と出力されます。

比較演算子は、この後に紹介するJSTLと組み合わせて使用されることもあります。

## JSTL

JSTLはJavaServer Pages Standard Tag Library の略です。
JSPでは、プログラマが自由にタグを追加できるカスタムタグと呼ばれる仕組みが用意されています。
そこでよく作成されていたタグを標準化してまとめられたものがJSTLです。

JSTLはJavaのライブラリのため、使用するにはjarファイルが必要です。
以下のページそれぞれjarファイルをダウンロードします。[https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl-api/1.2](https://mvnrepository.com/artifact/javax.servlet.jsp.jstl/jstl-api/1.2)[https://mvnrepository.com/artifact/org.glassfish.web/jstl-impl/1.2](https://mvnrepository.com/artifact/org.glassfish.web/jstl-impl/1.2)

ダウンロードしたら、「jstl-impl-1.2.jar」「jstl-api-1.2.jar」を、「WEB-INF/lib」配下にそれぞれ配置します。
その後サーバーを再起動させれば、jstlを使用することができます。

まずは例を見てみます。
mypage.jspを以下の様に修正します。

mypage.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib uri="<http://java.sun.com/jsp/jstl/core>" prefix="c"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>マイページ</title>
  </head>
  <body>
    <div>
      <c:choose>
        <c:when test="${id == 'admin'}">
          <p>管理者です。</p>
        </c:when>
        <c:otherwise>
          <p>一般ユーザーです。</p>
        </c:otherwise>
      </c:choose>
      <p>ようこそ ${id} さん </p>
    </div>
  </body>
</html>
```

この画面では、login.jspでIDに「admin」を入力した場合、「管理者です。」と表示されます。
それ以外の値を入力した場合には、「一般ユーザーです。」と表示されます。

JSTLを使用するにはまず先頭にtaglibの宣言を記述する必要があります。
JSTLを使用するにはjarファイル + taglib宣言が必要だと覚えておきましょう。

```html
<%@ taglib uri="<http://java.sun.com/jsp/jstl/core>" prefix="c"%>
```

以下の部分がJSTLのカスタムタグを使って処理を記述したものです。

```html
<c:choose>
  <c:when test="${id == 'admin'}">
    <p>管理者です。</p>
  </c:when>
  <c:otherwise>
    <p>一般ユーザーです。</p>
  </c:otherwise>
</c:choose>
```

タグの先頭にある「c」は、taglib宣言のprefix属性で指定したものです。
ここではcoreタグライブラリを宣言しているのですが、coreタグライブラリではprefixとして「c」がよく使用されます。

coreタグライブラリには他にも以下のようなものがあります。

- set：スコープに値をセットする
- remove：スコープの値を削除する
- if：elseがない単純な条件分岐
- choose, when, otherwise：複数の条件分岐
- forEach：繰り返し
- out：値の出力

また、JSTLにはcoreタグライブラリ以外にも以下のようなライブラリがあります。

[Untitled](https://www.notion.so/d9926eed569b4dedacf186758c2061a4)

Javaに慣れている人であれば、JSTLを見た時、Javaで書いた方が簡単だと感じるかもしれません。
しかし、HTMLの知識があってJavaの知識がないデザイナーの人からすれば、スクリプトレットで書く方がハードルが高いです。
スクリプトレットを書くためには、ある程度Javaの知識が必要になってきます。
しかし、JSTLであれば、Javaの知識がなくとも、新しいタグの使い方さえ覚えれば使うことができます。
そのため役割分担がしやすくなります。

JSPではEL式やJSTLを活用して、Javaのコードを書かなくても済むようにしていきましょう。

### XSS対策

login.jspでIDの入力欄に

```html
<strong>admin</strong>
```

のように、HTMLタグを付けて入力してみましょう。
そうすると、HTMLタグとして認識され、出力されたときに「admin」が太文字になって表示されます。

これは本来は意図しない動作です。
strongタグでは表示が太文字になるだけなので、大きな問題にはなりませんが、使い方によってはセキュリティ上の問題につながる場合があります。
例えば、scriptタグを使って悪意のあるプログラムを埋め込んだり、iframeタグを使って別のページを埋め込んで悪意あるページに誘導させる、といったことが可能となります。
このようにフォームの入力を利用してブラウザの意図しない表示をさせる攻撃をクロスサイトスクリプティング(XSS)といいます。

Webアプリケーションを作成する場合はXSS対策が必須です。
JSPの場合、JSTLで提供されているタグを利用することで対策が可能です。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib uri="<http://java.sun.com/jsp/jstl/core>" prefix="c"%>
<%@ taglib uri="<http://java.sun.com/jsp/jstl/functions>" prefix="fn"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>マイページ</title>
  </head>
  <body>
    <div>
      <c:choose>
        <c:when test="${id == 'admin'}">
          <p>管理者です。</p>
        </c:when>
        <c:otherwise>
          <p>一般ユーザーです。</p>
        </c:otherwise>
      </c:choose>
     <p>ようこそ ${fn:escapeXml(id)} さん </p>
    </div>
    </body>
</html>
```

functionタグライブラリを宣言し、escapeXmlを使用することで入力した文字がエスケープされ、HTMLタグではなく文字として処理されます。
Javaに限らず、どの言語であってもWebアプリケーションを作成するときはエスケープ処理が必要になることを覚えておきましょう。
