# MVCモデル

---

MVCモデルとは、Webアプリケーションを作成する際によく使用される設計手法です。
Javaの開発だけで使われる用語ではなく、PHPなど、他の言語での開発でもよく用いられる設計モデルです。
MVCは、MはModel、VはView、CはContollerの略です。

V(View)は。見た目の部分のことです。
JSP/サーブレットの場合、JSPがViewに該当します。

M(Model)は、Webアプリケーションの処理を担う部分です。
例えば、DB(データベース)からデータを取得する処理や、データを登録する処理、複雑な計算をする処理などが該当します。
JSP/Servletの技術を使ってWebアプリケーションを作成する場合、JSPとサーブレット以外で自分で作成したクラスはModelに該当すると考えて良いでしょう。

C(Controller)は、ViewとModelの橋渡しを担う部分です。
Viewから受け取った入力値をModelに渡して処理を行います。
そしてModelでの処理結果を受け取り、表示するためにViewに渡しす処理などがControllerの役割です。
JSP/ServletではServletの部分がControllerになります。

ここではMVCモデルに沿って作った簡単なプログラムの例を紹介します。
5つのファイルを作成します。

- index.jsp
- user_list.jsp
- UserServlet.java
- UserLogic.java
- User.java

index.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>トップページ</title>
  </head>
  <body>
    <a href="userList">ユーザー一覧</a>
  </body>
</html>
```

user_list.jsp

```html
<%@ page<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="<http://java.sun.com/jsp/jstl/core>" prefix="c"%>
<%@ taglib uri="<http://java.sun.com/jsp/jstl/functions>" prefix="fn"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>ユーザー一覧</title>
  </head>
  <body>
    <table border="1">
      <tr>
        <th>名前</th><th>年齢</th><th>メールアドレス</th>
      </tr>
      <c:forEach var="user" items="${userList}">
      <tr>
        <td>${fn:escapeXml(user.name)}</td>
        <td>${fn:escapeXml(user.age)}</td>
        <td>${fn:escapeXml(user.mail)}</td>
      </tr>
      </c:forEach>
    </table>
  </body>
</html>
```

UserServlet.java

```java
package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Logic.UserLogic;
import beans.User;

@WebServlet("/userList")
public class UserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public UserServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserLogic logic = new UserLogic();
        List<User> list = logic.getUserList();

        request.setAttribute("userList", list);

        request.getRequestDispatcher("/user_list.jsp").forward(request, response);
    }
}
```

UserLogic.java

```java
package Logic;

import java.util.ArrayList;
import java.util.List;

import beans.User;

public class UserLogic {

    public List<User> getUserList() {

        List<User> list = new ArrayList<>();
        list.add(new User("Aさん", 25, "aaa@xxxx.com"));
        list.add(new User("Bさん", 24, "bbb@xxxx.com"));
        list.add(new User("Cさん", 26, "ccc@xxxx.com"));
        list.add(new User("Dさん", 20, "ddd@xxxx.com"));
        list.add(new User("Eさん", 29, "eee@xxxx.com"));

        return list;
    }
}
```

User.java

```java
package beans;

// ユーザーの情報を格納するクラス
public class User {

    private String name;
    private int age;
    private String mail;

    public User(String name, int age, String mail) {
        this.name = name;
        this.age = age;
        this.mail = mail;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
}
```

5つのファイルが作成できたら、ブラウザからindex.jspにアクセスします。
「ユーザー一覧」というリンクだけが表示される単純なページです。
このリンクを押すと、ユーザー一覧ページに遷移し、ユーザーの情報が出力されるプログラムです。

リンクを押したときにはまずサーブレットが呼ばれます。
サーブレットでは、UserLogicクラスのインスタンスを作成し、getUserListの処理を実行し、その結果をリクエストスコープにセットします。
UserLogicクラスでは、Userの一覧を取得し、それぞれのユーザーの情報をUserクラスのインスタンスとして作成し、Listに詰めます。
本来はユーザー情報はDB(データベース)などに格納されており、そこから取得するのが理想ですが、ここでは説明を簡単にするために、UserLogicクラスで直接ユーザーを作成します。

user_listではJSTLのforEachタグを利用してListの要素数だけ出力します。
forEachでは、items属性でリストや配列などのコレクションを指定すると、各要素がvarで指定した変数に格納される仕組みになっています。
そのためvarで指定した「user」にUserクラスのインスタンスが格納されます。[EL式ではuser.name](http://xn--eluser-xc4eic7134d.name/), user.age, user.mailを指定することで、各フィールドから値を取得しています。
しかし、Userクラスでは各フィールドのアクセス修飾子はprivateになっている点に注意してください。
privateでは自クラス以外からアクセスできないため、本来であればuser.nameとすることでnameフィールドにアクセスすることはできないはずです。

実は、EL式ではフィールドにアクセスすると、そのフィールドに対するゲッターメソッドが自動的に呼ばれる仕組みになっています。
なので、フィールドに対するゲッターメソッドが存在しなかったり、スペルが間違っていたり、Javaの命名規則にのっとっていなかった場合はうまくいかなくなりますので注意してください。

ここでは簡単な例でしたが、MVCによって役割を分けて作成することで、プログラムが作成しやすくなったことを感じ取れればOKです。
