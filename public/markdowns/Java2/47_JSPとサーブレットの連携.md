# JSPとServletの連携

---

先の例ではサーブレットを使ってHTMLの出力を行いました。
しかし、実際の開発ではサーブレットでHTMLの出力はあまり行いません。
HTMLを作成するはサーブレットよりもJSPで行う方が分かりやすいです。
実際の開発では画面への表示に関する部分はJSPを使用し、サーブレットでは値を受け取って処理し、画面遷移などを行います。

login.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>ログイン</title>
  </head>
  <body>
    <form action="login" method="post">
    <div>ID: <input type="text" name="id"></div>
    <div>PASS: <input type="password" name="password"></div>
    <div><button type="submit">ログイン</button></div>
    </form>
  </body>
</html>
```

mypage.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%
String id = (String) request.getAttribute("id");
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>マイページ</title>
  </head>
  <body>
    <div>
     <p>ようこそ <%= id %> さん </p>
    </div>
    </body>
</html>
```

LogninServlet.java

```java
package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // login.jspに画面遷移する
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 文字コードの設定
    request.setCharacterEncoding("UTF-8");
    // フォームからの入力値を受け取る
        String id = request.getParameter("id");
        String pass = request.getParameter("password");

    // 入力値によって画面の遷移先を変える
        if (pass.equals("admin")) {
            request.setAttribute("id", id);
            request.getRequestDispatcher("/mypage.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
}
```

## 解説

### プログラムの流れ

このプログラムでは、まずTomcatを起動した後、ブラウザから[https://localhost:8080/{プロジェクト名}/login](https://localhost:8080/%7B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E5%90%8D%7D/login)
にアクセスします。
そうするとLoginServletのdoGetメソッドが実行されます。
(URLを直接指定してアクセスした場合はGETによるアクセスになります。)
doGetメソッドでは、login.jspにフォワード(画面遷移)する処理が行われ、login.jspが表示されます。
そこでIDとPASSを適当に入力して「ログイン」ボタンを押下すると、今度はLoginServletのdoPostメソッドが呼ばれます。
入力したパスワードが「admin」だった場合には、mypage.jspに遷移し、違う場合にはlogin.jspに戻るような処理になっています。

### サーブレット経由のアクセス

ブラウザからURLを直接入力した場合、GETメソッドによるアクセスとなるため、URLマッピングに対応したサーブレットのdoGetメソッドが呼ばれることになります。
サーブレットを使用せずJSPだけを使用した場合、ブラウザからはJSPのファイル名を直接指定していました。
しかし、画面の数が多くなってくると、サーブレット経由でJSPを表示させるようにするのが一般的です。

### action属性の指定

JSPでフォームボタンが押されたときにサーブレットの処理が呼ばれるようにするには、action属性の値をサーブレットのURLマッピングと紐づけるようにします。

### GETとPOST

ここではGETとPOSTを使い分けて画面遷移を行っていますが、あたらめてGETとPOSTの使い分けについて解説しておきます。
ブラウザからURLを直接入力してアクセスした際には、GETメソッドによるアクセスになります。
そのため、サーブレットではメソッドが呼ばれます。
また、リンク(aタグ)による画面遷移でもGETメソッドでのアクセスになります。
一方、フォームでサブミットボタンを押下した際には、formタグのmethod属性の値によってGETかPOSTに分かれます。

一般には、検索のような、情報の取得に関する処理ではGETが使用されます。
ユーザーを登録する場合や、記事を投稿する場合など、データの更新が行われる処理ではPOSTが使用されます。
データの更新を行わない場合でも、ログインする場合など、個人情報に関するデータを送信する場合にはPOSTが使用されます。

GETのPOSTの違いは、パラメータの送信のされ方です。
GETの場合、URLにパラメータが付加されます。
Googleなどで適当にキーワードを入力して検索を実行すると、URLの後ろに
?q=検索キーワード&...
のような情報が付加されているかと思います。
GETで情報を送信した場合、URLは[http://ホスト名/パス?パラメータ1=値&ぱためーた2=値](http://xn--zck4a3ct33s/%E3%83%91%E3%82%B9?%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF1=%E5%80%A4&%E3%81%B1%E3%81%9F%E3%82%81%E3%83%BC%E3%81%9F2=%E5%80%A4)
という風に、「?」マークの後で「&」区切りで「パラメータ=値」の情報が付きます。

URLにパラメータがつくことにメリットは、そのURLを共有することで、検索結果のページなどをそのまま共有できることです。
ECサイトで欲しい商品を検索して、その詳細のページを共有したい時、URLを共有することでそのまま同じページを見てもらうことができます。

POSTの場合、フォームから入力した情報はURLには付随されません。
HTTPリクエストのボディ部の情報として送信されます。
データの更新処理などがある場合は基本的にPOSTを使用しますが、仮にURLにパラメータの情報が追加されるとしたら、URLを直接入力してアクセスすることで、不正にデータを更新されてしまう可能性が出てきます。
また、ログインする際、ユーザー名とパスワードがURLに追加されてしまうと、他の人から簡単にパスワードを除き見られてしまう可能性があります。
そういった理由から、データの更新を行う場合と、個人情報を送信する場合はPOSTが使用されます。

GETとPOSTの特徴は、Javaで開発する場合に限らず、Webアプリケーションを開発するにあたって必須となる知識です。
GETとPOSTの特徴を知って、適切に使い分けられるようにしておきましょう。

### WEB-INF

先の例ではサーブレット経由でJSPファイルにアクセスするようにしましたが、実はURLで直接JSPファイルを指定することも可能となっています。
ブラウザから
[https://localhost:8080/{プロジェクト名}/login.jsp](https://localhost:8080/%7B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E5%90%8D%7D/login.jsp)[https://localhost:8080/{プロジェクト名}/mypage.jsp](https://localhost:8080/%7B%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E5%90%8D%7D/mypage.jsp)
とそれぞれアクセスすると、それぞれのページが表示されます。

しかし、これは本来はよくない状況です。
login.jspについては特に問題はありませんが、mypage.jspは、本来ログインが成功した場合に表示させたいページのはずです。
ですが、URLを直接入力することによってアクセスできてしまうと、ログインしていないにも関わらず、正規にログインした人と同じ操作ができてしまいます。

このような状況を防ぐために、JSPファイルに直接アクセスできないようにする仕組みがあります。
それは、JSPファイルを「WEB-INF」フォルダ配下に入れることです。
WEB-INF配下に入れたファイルは、ブラウザからURLを直接入力してもアクセスできないようになります。
サーブレットからそのJSPファイルに遷移するには、WEB-INFも含めたパスを指定します。

```java
request.getRequestDispatcher("/WEB-INF/mypage.jsp").forward(request, response);
```

### セッションの利用

Webアプリケーションを作成するにあたって、セッションを利用する場面は多くあります。
サーブレットでもセッションを利用することは多くあります。
JSPの場合、暗黙オブジェクトの中に「session」というオブジェクトがあったため、特に意識せずにセッションを利用することができます。
サーブレットの場合、セッションを利用するにはセッションのオブジェクトを取得する必要があります。
(doGetやdoPostメソッドの引数はリクエストとレスポンスのオブジェクトしかないため、セッションのオブジェクトは別で取得する必要があります。)
セッションを取得するにはリクエストオブジェクトのgetSessionメソッドを利用します。

```java
// セッションの取得
HttpSession session = request.getSession();
```

### フィルター

POSTでデータを受け取る際には、毎回setCharacterEncodingメソッドを使用して文字コードを設定してあげる必要があります。

ログインして利用するようなシステムの場合、一般にはログイン画面でIDとパスワードを入力してもらいます。
そしてログインに成功した場合には、ユーザー情報をセッションに格納します。
しかし、セッションでは一定時間の間操作がなければ、自動的にセッション情報が削除されます。(セッションタイムアウト)
そうなった場合、一度ログイン画面に戻り、再度ログイン操作をしてもらう必要があります。

このような文字コードの設定や、セッションのデータを保持しているかどうかの設定などは、画面遷移の度に処理する必要がありますが、それぞれのサーブレットやJSPに毎回同じ処理を書くのは非効率です。
こういう場合、「フィルター」という機能を利用すると便利です。
フィルターを利用すると、リクエストが送信されてからサーブレットの処理が行われる前と、サーブレットの処理が行われてからレスポンスが返る前に処理を挟むことが可能です。

処理の流れとしては、
リクエスト ⇒ フィルター ⇒ サーブレット ⇒ フィルター レスポンス
の流れになります。

SampleFilter.java

```java
package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

@WebFilter("/*")
public class SampleFilter implements Filter {

  // コンストラクタ
  public SampleFilter() {
  }

  // 後処理
    public void destroy() {
    }

  // フィルター処理
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 文字コードの設定
      request.setCharacterEncoding("UTF-8");
    // 次のフィルターやサーブレットの処理へ移る
        chain.doFilter(request, response);
    }

  // 初期化処理
    public void init(FilterConfig fConfig) throws ServletException {
    }
}
```

このフィルターの例では文字コードの設定を行っています。
これにより、サーブレットで毎回文字コードの設定を行う必要がなくなります。
フィルターのクラスを作成するには、Filterインターフェースを実装する必要があります。
@WebFilterアノテーションでURLマッピングを指定することで、URLがマッチするリクエストの場合のみフィルターを適用することができます。
