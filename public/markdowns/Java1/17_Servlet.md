# Servlet

---

## Java EE

Java EEで提供されている、Webシステムを作成する主な技術として「JSP」と「Servlet」があります。
JSPは、HTMLコードの中でJavaで処理を記述するための技術です。
Servletは、Javaプログラムの中でHTTPの各パラメーターにアクセスしたり、HTMLを出力するための技術です。

クライアントがリクエストを送信してから結果を受け取るまでの流れを確認していきます。

![picture 13](/images/949e9a4c8a2e27ab62902fff704b4cbef7519c0f6e5a434bfdbda5b6c464c468.png)  

---

JSPが表示されるまでの流れ。

![picture 14](/images/389f992afe3932c372ff632583c1fc6a1c3fec0d925f6081129f74e6551ebf11.png)  

---

Servletが表示されるまでの流れ。

![picture 15](/images/b466c9ca93a8eb944fdfd3ccad6c110ccd209c96e7649bde277aa97482bc4073.png)  

---

JSPとServletは、どちらが優れているかといった関係ではありません
それぞれ得手不得手があります。
次にServletを使ったWebアプリケーションの作り方を見ていきます。

---

## Servlet

Servletを作成します。

1. 「動的 Web プロジェクト」を作成してください
　(プロジェクト名:java2_02_servlet)
2. パースペクティブが「Java EE」であることを確認してください
3. 次に、プロジェクトを右クリックし、「新規」「サーブレット」の順に選択します
4. クラス名に「HelloWorldServlet」を入力し、「次へ」ボタンをクリック
5. 「URL マッピング」の追加ボタンをクリックし、「/helloworld」を追加してください
6. 追加できたら完了ボタンをクリックします

---

以下のようなファイルが生成されます。

```java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloWorldServlet
 */
@WebServlet({ "/HelloWorldServlet", "/helloworld" })
public class HelloWorldServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloWorldServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // TODO Auto-generated method stub
    response.getWriter().append("Served at: ").append(request.getContextPath());
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // TODO Auto-generated method stub
    doGet(request, response);
  }

}
```

---

doGetメソッドの処理を以下のように変更してください。

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html; charset=UTF-8");

      PrintWriter out = response.getWriter();
      out.println("<!DOCTYPE html>");
      out.println("<html>");
      out.println("<head>");
      out.println("<title>");
      out.println("Hello World!");
      out.println("</title>");
      out.println("</head>");
      out.println("<body>");

      for (int i = 0; i < 3; i++) {
          out.println("<p>Hello, World Servlet!</p>");
      }

      out.println("</body>");
      out.println("</html>");

  }

```

---

処理が書けたらファイルを保存してください。
続いて、ソースコード上で右クリック「実行」、「サーバーで実行」の順に選択し、実行結果を確認してください。

結果

```text
Hello, World Servlet!

Hello, World Servlet!

Hello, World Servlet!
```

---

結果が確認できたら、ブラウザー上で右クリックし、ソースコードも確認してください。

```html
<!DOCTYPE html>
<html>
<head>
<title>
Hello World!
</title>
</head>
<body>
<p>Hello, World Servlet!</p>
<p>Hello, World Servlet!</p>
<p>Hello, World Servlet!</p>
</body>
</html>
```

ポイントはoutインスタンスです。

```java
PrintWriter out = response.getWriter();
out.println("<!DOCTYPE html>");
```

outが持っている出力用メソッドを利用することで、ブラウザーに対してコンテンツを出力することができます。

---

## Servletファイル

作成したファイル内の「@WebServlet」の説明を行います。
Javaでは「@ほにゃらら」の形式でクラスやメソッド、処理などに注釈を付けることができます。
この「@ほにゃらら」をアノテーションと呼びます。

アノテーションはさまざまな使い方をされています。
コンパイル時にコンパイラに情報を知らせるものや、実行時にコンテナーに対して情報を知らせるものなどがあります。
基本的には誰かに対して追加情報を与えるためのメタデータ的な位置づけになります。
今回使用していた「@WebServlet」というアノテーションは、Tomcatに対して「『/HelloWorldServlet』か『/helloworld』というパスでクライアントからアクセスされたら、このServletを実行してください」という情報を知らせています。

そのため、このServletは以下のどちらのURLでアクセスしても実行されることになります。

* http://localhost:8080/${context}/HelloWorldServlet
* http://localhost:8080/${context}/helloworld

詳細は  
http://ホスト名:ポート番号/コンテキストパス/URLパターン  
となります。

---

また、Servletファイルには、以下の同じ引数のメソッドが定義されています。

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response)

protected void doPost(HttpServletRequest request, HttpServletResponse response)
```

クライアントからのアクセスのされ方によって呼び出されるメソッドが異なります。

GETでアクセスされたら「doGetメソッド」が、POSTでアクセスされたら「doPostメソッド」がTomcatによって呼ばれます。
普通のJavaファイルでは、「mainメソッド」がエントリーポイントです。
Servletファイルでは、「doGetメソッド」や「doPostメソッド」がエントリーポイントの役割を持つことになります。

---

## web.xml

Servletを新しく作る際には、「どのURLでアクセスされたら実行する」かを必ず設定する必要があります。
「@WebServlet」アノテーション以外にも、別の方法があるので、見ていきます。

WEB-INFフォルダーの下に、web.xmlという名前でXML形式の設定ファイルを配置することで、各種設定を行うことができます。
web.xmlにはServletだけでなく、さまざまな設定をすることができます。
Eclipseでは、「動的 Web プロジェクト」を作成するウィザードで作成するか、後からでも数クリックでファイルを生成することが可能です。
プロジェクト作成後に生成する方法を確認していきます。

プロジェクト・エクスプローラーの該当プロジェクトにある、「デプロイメント記述子」という項目を右クリックし、「配備記述子スタブの生成」をクリックすることで生成されます。

web.xmlにServletを登録する場合に気をつけなければいけないのが、使用しているJava EEのバージョンによって書き方が異なる点です
「@WebServlet」アノテーションが使えるようになったのはバージョン3.0からです。

---

バージョン2.3の例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE web-app PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN" "http://java.sun.com/dtd/web-app_2_3.dtd">
<web-app id="WebApp_ID">
  <servlet>
    <servlet-name>Foo</servlet-name>
    <servlet-class>FooServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Foo</servlet-name>
    <url-pattern>/FooServlet</url-pattern>
  </servlet-mapping>
  <servlet-mapping>
    <servlet-name>Foo</servlet-name>
    <url-pattern>/foo</url-pattern>
  </servlet-mapping>
</web-app>
```

---

バージョン2.4の例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd" id="WebApp_ID" version="2.4">
  <servlet>
    <servlet-name>Foo</servlet-name>
    <servlet-class>FooServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Foo</servlet-name>
    <url-pattern>/FooServlet</url-pattern>
  </servlet-mapping>
  <servlet-mapping>
    <servlet-name>Foo</servlet-name>
    <url-pattern>/foo</url-pattern>
  </servlet-mapping>
</web-app>
```

---

バージョン2.5の例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <servlet>
    <servlet-name>Foo</servlet-name>
    <servlet-class>FooServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Foo</servlet-name>
    <url-pattern>/FooServlet</url-pattern>
    <url-pattern>/foo</url-pattern>
  </servlet-mapping>
</web-app>
```

基本的にweb.xmlには上位互換がありますので、新しいTomcatで古い規格で作られたWebアプリケーションは問題なく実行できます。
web.xmlを用意する場合、動かすバージョンによって書き方が変わるので注意してください。

---

## コンテキスト

Java EEでは、どのAPサーバーでもアプリケーションが動作できるように、フォルダー構成を仕様で決めています。
そのフォルダー構成と、Eclipse上で見ている構成は異なります。
「動的 Web プロジェクト」で作成されたプロジェクトは、実行時に仕様で定められた構成に変換（ビルド）しています。

本来の構成がどのようなものなのか、確認していきます。
プロジェクト名を右クリックし、「エクスポート」「WAR ファイル」の順にクリックします。

宛先はデスクトップなど任意の場所を選択します。
「ソース・ファイルのエクスポート」にチェックを入れると、Javaファイルも同梱されます。
最後に完了ボタンをクリックします。

エクスポートが完了すると、指定した場所にwarファイルが作成されます。
Java EEの仕様に準拠して作られたアプリケーションは、このwarファイルをAPサーバーに配置するだけで動作させることができます。
次に、作成したwarファイルの中身を確認していきます。

---

warという拡張子は、圧縮の形式としてはzipと同じです。
そのため、zipを解凍できるツールであれば、warも解凍することができます。

中身は以下のような構成になっています。
META-INFはオプションなので図からは省いています。

![picture 16](/images/e5089ab9a1a82764e6e89b7cbf6fba6301df7c198ff58618c79a4e128b2fd1e6.png)  

コンテキストルートが公開フォルダーのルートになります。
また、WEB-INFは特殊なフォルダーで、ブラウザーからのアクセスでは見れないようになっています。

classesはServletなどをコンパイルしたclassファイルを格納します。
今回はコンパイル前のソースコードも含まれています。
libはWebアプリケーションで使用するライブラリを格納します。
