# EL式とJSTL

---

ロジックとビューを分離することによって、処理を記述するファイルと、見た目（表示）を記述するファイルを分けることができました。
ビューを担当するのはJSPですが、リクエストスコープの値の取得や、表示の出し分けにif文が必要なため、スクリプトレットを使っています。

JSPでは、JSP上で「値の参照」や簡単な「演算」ができる**EL式（Expression Language）**と呼ばれるものが使用できます。
式言語とも呼ばれます。
またJSPではプログラマが自由にタグを追加できる「カスタムタグ」という仕組みが用意されています。
よく利用されていたタグを標準化してまとめた**JSTL（JavaServer Pages Standard Tag Library）**というものも利用することができます。
EL式とJSTLを組み合わせて利用することで、JSPからスクリプトレットをなくすことができます。

---

## EL式

EL式について確認していきます。
EL式を利用すると、リクエストスコープなどで管理されている値に簡単にアクセスすることができます。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
// String id = (String) request.getAttribute("id");
String passwordMatch = (String) request.getAttribute("passwordMatch");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>結果画面</title>
</head>
<body>
<div>
  <p>入力されたIDは${requestScope.id}でした。</p>
  <p>パスワードは
  <% if (passwordMatch.equals("ok")) { %>
    一致しました。
  <% } else { %>
    一致しませんでした。
  <% } %>
  </p>
</div>
</body>
</html>
```

---

結果

```text
入力されたIDはadminでした。
パスワードは一致しません。
```

表示結果は変わりません。
EL式は「${ }」という構文で使用することができます。
「requestScope.id」と記述しましたが、これは「リクエストスコープに設定されているidにアクセス」という意味になります。

EL式には、先ほど利用したrequestScopeのように、準備なしで利用できる暗黙オブジェクトが用意されています。

---

値には、「オブジェクト名.キー名」または「オブジェクト名["キー名"]」でアクセスすることができます。

|オブジェクト名|説明|
|:--|:--|
|pageScope|ページスコープのキーと値を管理する|
|requestScope|リクエストスコープのキーと値を管理する|
|sessionScope|セッションスコープのキーと値を管理する|
|applicationScope|アプリケーションスコープのキーと値を管理する|
|param|パラメータのキーと値（String）を管理する|
|paramValues|パラメータのキーと値（String[]）を管理する|
|cookie|クッキーのキーと値を管理する|
|header|リクエストのヘッダーのキーと値（String）を管理する|
|headerValues|リクエストヘッダーのキーと値を管理する|
|initParam|初期化パラメータのキーと値を管理する|
|pageContext|JSPのオブジェクトを管理する|

---

以下はEL式で使用できる演算子の一覧です。
記号の代わりに英単語も演算子として使えます。

|演算子|説明|
|:--|:--|
|+|加算|
|-|減算|
|*|乗算|
|/(div)|除算|
|%(mod)|剰余|
|==(eq)|等しい|
|!=(ne)|等しくない|
|<(lt)|より小さい|
|>(gt)|より大きい|
|<=(le)|以下|
|>=(ge)|以上|
|empty|nullまたは空|
|&&(and)|かつ|
|\|\|(or)|または|
|!(not)|否定|
|a ? b: c|三項演算|

---

このようにEL式を利用することで、getParameterやgetAttributeをしなくとも、簡単に各値にアクセスすることができます。
またスコープオブジェクトを省略して「キー名」だけをEL式で記述した場合、ページスコープからアプリケーションスコープの順に（狭いスコープから広いスコープの順に）、該当するキーを探索し、最初に見つかったスコープの値を使用します。

---

## JSTL

JSTLを確認していきます。
さまざまなプロジェクトで使用されるような、汎用的な処理を標準化してまとめたものがJSTLです。
JSTLはEL式と組み合わせて利用することで、より簡略化してJSPを作成することができます。

JSTLを使うためにはプロジェクトにライブラリを追加する必要があります。
Tomcatのサンプルに入っているものを使うか、インターネットなどから探してダウンロードして追加します。

```text
taglibs-standard-impl-1.2.5.jar
taglibs-standard-spec-1.2.5.jar
```

Tomcat9の場合は、下記フォルダーにJSTLのjarファイルがあります。

```text
${TOMCAT_HOME}\webapps\examples\WEB-INF\lib
```

例
```text
C:\pleiades\tomcat\9\webapps\examples\WEB-INF\lib
```

二つのjarファイルを、プロジェクトの「WebContent/WEB-INF/lib」にコピーします。

二つのjarファイルを配置後、Tomcatを停止してください。

---

result.jspを以下のように変更して、実行結果を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>結果画面</title>
</head>
<body>
<div>
  <p>入力されたIDは${requestScope.id}でした。</p>
  <c:choose>
    <c:when test="${passwordMatch eq 'ok'}">
      <p>パスワードは一致しました。</p>
    </c:when>
    <c:otherwise>
      <p>パスワードは一致しませんでした。</p>
    </c:otherwise>
  </c:choose>
</div>
</body>
</html>
```

---

表示結果は変わりません。
JSTLを使うことで、JSPからはスクリプトレットやJSP式が完全になくなりました。
変更した内容を確認していきます。
まず新しくtaglibという宣言が増えています。
JSPでタグライブラリを使うには、このtaglib宣言が必要です。
次に「c:choose」「c:when」「c:otherwise」というcoreタグライブラリで提供されているタグを使用しています。
この3種類のタグを組み合わせることで、if ～ else文を表現しています。

「c:when」タグの「test」属性で条件を指定しています。
属性値ではEL式を利用して条件式を記述しています。

このように、カスタムタグで提供されているタグの利用には、taglib宣言をした際のprefixを付与した「prefix:タグ名」という形式で利用します。
prefixを「c」としてcoreタグライブラリの利用を宣言したため、「c:choose」のようにprefixを付与しています。

---

JSTLでは以下の5種類のタグが提供されています。
taglib宣言をすることで、そのJSP内で使うことができます。

|種類|説明|URI|Prefix|
|:--|:--|:--|:--|
|core|分岐や繰り返しなどの基本的な操作を提供|http://java.sun.com/jsp/jstl/core|c|
|function|主に文字列操作を提供|http://java.sun.com/jsp/jstl/functions|fn|
|il8n|国際化対応の機能を提供|http://java.sun.com/jsp/jstl/fmt|fmt|
|xml|XML操作を提供|http://java.sun.com/jsp/jstl/xml|x|
|database|DB操作を提供|http://java.sun.com/jsp/jstl/xml|sql|

---

以下はJSTLのcoreタグライブラリで提供されている主なタグです。

|タグ|説明|
|:--|:--|
|set|スコープに値を追加する|
|remove|スコープの値を削除する|
|if|単一の条件分岐。elseに相当するものはない|
|choose,when,otherwise|複数の条件分岐|
|forEach|繰り返し|
|out|値の出力|

JSTLを利用したJSPの作成は慣れが必要ですが、慣れてしまえばスクリプトレットを利用した時よりも「簡潔に」「綺麗に」書くことができます。

---

## XSS(クロスサイトスクリプティング)

Webシステムのセキュリティについて少し触れます。
先ほどのプログラムにはセキュリティホール（脆弱性）が存在します。
実際に試していきます。

IDに

```html
<b>foofoofoo</b>
```

と入力し、送信ボタンをクリックしてください。

![picture 1](/images/dbef895aa44c851ccd2e798e924df52814a0298318c5117be35d51cf3d007a06.png)  

![picture 2](/images/c18737a3950e2aec41c74652b816c5c5be825f4c442b308e54e08506ffa46059.png)  

---

結果画面を確認すると、入力した

```text
<b>foofoofoo</b>
```

の`<b>`～`</b>`はブラウザーによってタグとして認識され、その結果、太字で表示されます。
このように、システムの利用者などが入力した値を出力した結果、ブラウザーが意図していない表示をしてしまう脆弱性をクロスサイトスクリプティング（XSS）といいます。
今回のbタグであれば実害はありませんが、XSSの脆弱性がシステムにあると、scriptタグでJavaScriptが実行されたり、iframeタグなどで別ページを読み込んだりといった攻撃をされる可能性があります。

このXSSのセキュリティ対策を行っていきます。
JSTLが提供しているタグを利用すると簡単に対策ができます。

---

result.jspを以下のように変更して、実行結果を確認してください。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

（略）

<div>
  <p>入力されたIDは${fn:escapeXml(requestScope.id)}でした。</p>
  <c:choose>

```

---

先ほどと同じように、IDに

```text
<b>foofoofoo</b>
```

と入力し、送信ボタンをクリックしてください。
「入力した値がそのまま」表示されます。

![picture 3](/images/dbef895aa44c851ccd2e798e924df52814a0298318c5117be35d51cf3d007a06.png)  

![picture 4](/images/d3039eb4ec225d7ceb594f9936a66158b79c3ea53242964224e6587f3e0c1481.png)  

Webシステムに限りませんが、システムを利用しているユーザーはどのような操作をするかは分かりません。
システムを開発する際には「どのような操作をされても」問題が出ないように作る必要があります。
そのため、システムが外部から受け取った値は一切信用してはいけません
JSPなどで値を出力する際には、「必ず」エスケープをするように気をつけてください。
