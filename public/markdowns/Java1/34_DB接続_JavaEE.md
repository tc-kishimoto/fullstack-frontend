# DB接続_JavaEE

---

データベースと連携させるWebシステムの作り方を見ていきます。
JDBCを利用して連携させていきます。

## データベースの準備

まずは今回作成するシステム用にデータベースとテーブルを作成します。
以下のSQLの作成を実行してください。

```sql
--データベース作成
CREATE DATABASE testdb_web;

--テーブル作成
CREATE TABLE users (
  user_id   VARCHAR(50) PRIMARY KEY,
  user_name VARCHAR(50),
  password  VARCHAR(50)
);

--データ挿入
INSERT INTO users VALUES
 ('001', '佐藤', '100001')
,('002', '鈴木', '100002')
,('003', '高橋', '100003')
,('004', '田中', '100004')
,('005', '渡辺', '100005');

--データ確認
SELECT * FROM users;
```

---

## プロジェクトの作成

1. Ecliseを起動してください
2. パースペクティブを「JavaEE」にします
3. プロジェクト名を「DbAccessWeb」で動的Webプロジェクトを作成してください
4. 以下のファイルを作成してください。

---

index.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Index</title>
</head>
<body>
  <c:if test="${not empty msg}">
    <p>${msg}</p>
  </c:if>
  <p>IDとPASSを入力してください。</p>
  <form action="login" method="post">
    ID <input type="text" name="id"><br>
    PASS <input type="password" name="pass"><br>
    <button type="submit">クエリ送信</button>
  </form>
</body>
</html>
```

---

パッケージ：util
ファイル名：DbUtil.java

```java
package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DbUtil {
    public static Connection getConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection("jdbc:postgresql://localhost:5432/testdb_web", "testuser", "test");
        } catch (Exception e) {
            // 本来は専用の例外クラスを作成したほうがよい
            throw new RuntimeException(e);
        }
    }
}
```

---

パッケージ：util
ファイル名：ParamUtil.java

```java
package util;

/**
 * Utilityメソッドをまとめたクラス
 */
public class ParamUtil {

    /**
     * 引数に指定した文字列がnull、または空文字かを判定
     */
    public static boolean isNullOrEmpty(String str) {
        if (str == null || str.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 引数に指定した文字列が数値に変換できるかを判定
     */
    public static boolean isNumber(String str) {
        try {
            Integer.parseInt(str);
        } catch (NumberFormatException ex) {
            return false;
        }

        return true;
    }

    /**
     * 引数に指定した文字列が数値に変換して返却する。
     * 変換できない場合はnullを返却する。
     */
    public static Integer checkAndParseInt(String str) {
        if (isNumber(str)) {
            return Integer.parseInt(str);
        } else {
            return null;
        }
    }
}
```

---

パッケージ：entity
ファイル名：User.java

```java
package entity;

public class User {

    private String userId;
    private String userName;
    private String password;

    public User() {
    }

    public User(String userId, String userName, String password) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }
}
```

---

パッケージ：dao
ファイル名：UserDao.java

```java
package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.User;

public class UserDao {

    private static final String SQL_SELECT_ID_AND_PASS = "SELECT user_id, user_name, password FROM users WHERE user_id = ? AND password = ?";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public User findByIdAndPass(String id, String pass) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ID_AND_PASS)) {
            stmt.setString(1, id);
            stmt.setString(2, pass);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getString("user_id"), rs.getString("user_name"), rs.getString("password"));
            } else {
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

---

パッケージ：service
ファイル名：UserService.java

```java
package service;

import java.sql.Connection;

import dao.UserDao;
import entity.User;
import util.DbUtil;

public class UserService {

    public User authentication(String id, String pass) {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            User user = userDao.findByIdAndPass(id, pass);

            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
```

---

パッケージ：servlet
ファイル名：LoginServlet.java

```java
package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.User;
import service.UserService;
import util.ParamUtil;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 文字化け対策
        request.setCharacterEncoding("UTF-8");

        // ログインID、パスワードを取得
        String id = request.getParameter("id");
        String pass = request.getParameter("pass");

        // 入力値のチェック
        if (ParamUtil.isNullOrEmpty(id) || ParamUtil.isNullOrEmpty(pass)) {
            // メッセージ設定
            request.setAttribute("msg", "ログインできませんでした。");

            // 次画面指定
            request.getRequestDispatcher("index.jsp").forward(request, response);
            return;
        }

        // ログインチェック
        UserService userService = new UserService();
        User user = userService.authentication(id, pass);

        // 表示メッセージの受け渡し
        if (user != null) {
            // メッセージ設定
            request.setAttribute("msg", "ログインできました。");

            // 次画面指定
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } else {
            // メッセージ設定
            request.setAttribute("msg", "ログインできませんでした。");

            // 次画面指定
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

}
```

---

## JDBCの設定

「DB接続（JavaSE)」の章では、ライブラリーの追加で、JDBCドライバーの設定を行いました
ですが、Webシステムの場合は、DBに接続するためのJDBCドライバーは、プロジェクトのWEB-INF/libフォルダーに配置する必要があります

![picture 21](/images/29b24a5bbe661bfd191effc3133faf5778eb9ead3ad4bf78cd116f3f111c5abe.png)  

---

## サーブレットの作成

最初の画面を作ります。
index.jspを作成し、以下のような画面を表示できるようにします。
PASSはパスワード入力ですので、入力値が●になるようにします。
また、IDのname属性はid、PASSのname属性はpass、フォームのmethod属性はPOSTとします。

![picture 20](/images/a6122e31965e0458d858e7c8221fb0c4f23f5b38b10a91979507a4804931e9e7.png)  

---

フォームに対応する処理として、LoginServlet.javaを作成します。
以下の処理を実装します。

* 文字化け対策
* 入力値の取得および未入力チェック
* 入力値を用いて、DB（usersテーブル）問い合わせ
* index.jspへ表示メッセージの受け渡し

※ index.jspへの「表示メッセージ」は、該当するユーザーが存在する場合は「ログインできました。」、未入力チェックを含め、ログインできなかった場合は「ログインできませんでした。」とします。

---

Javaの各クラスの役割は以下の通りです。

* DbUtil.java
  * DB接続のためのコネクションを取得するユーティリティクラス
* User.java
  * usersテーブルに対応しているエンティティクラス
* UserDao.java
  * usersテーブルへのクエリを担当するDAOクラス

上記の3つは、「DAOとDTO」の章で行った内容と同じ役割です

---

* LoginServlet.java
  * リクエストとパラメーターを受け取り、ログインの可否を判断するサーブレットクラス
  * index.jspで入力したIDとパスワードを受け取り、ログインの可否を判断し、ログインできたかどうかをindex.jspに渡しています
* UserService.java
  * Userエンティティに対する操作を提供するServiceクラス
  * ログインの可否を判断するメソッドやusersテーブルのデータを取得した結果を返すメソッドなどを持たせます
  * usersテーブルへのクエリはUserDaoクラスに持たせ、UserServiceクラスはUserDaoクラスのメソッドを使い、結果や操作のみを呼び出し元に提供します

---

以下のように各クラスが連携して動作をしています。

![picture 22](/images/4b4e7dacfed6a0def79ea5bd2f6fb98787876b17e377a0ac19b6e2e159517d13.png)  

---

## 入力値の再表示

入力値の再表示を行います。
ログイン処理後、index.jspを再表示した際、入力したIDとPASSを元のフォームに再表示させるように変更します。

![picture 23](/images/f6c8c15a8feaa1aac53413c7098f672d2bbf41230a3c5d6bc8652094a9ddae0b.png)  

---

想定通りの動作になるように、index.jspを変更してください。

変更内容

* IDとパスワードのvalue属性に入力した値をセットする


```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Index</title>
</head>
<body>
  <c:if test="${not empty msg}">
    <p>${msg}</p>
  </c:if>
  <p>IDとPASSを入力してください。</p>
  <form action="login" method="post">
    ID <input type="text" name="id" value="${fn:escapeXml(param.id)}"><br>
    PASS <input type="password" name="pass" value="${fn:escapeXml(param.pass)}"><br>
    <button type="submit">クエリ送信</button>
  </form>
</body>
</html>
```

---

入力パラメータはEL式のparamオブジェクトで取得することができます。
また、入力値を出力する際にはエスケープが必要です。

---

## 一覧の表示

ユーザー情報の一覧を表示します。
ログインできた場合の遷移先画面（result.jsp）を新しく作成し、全てのユーザー情報を取得して表示します。

![picture 24](/images/7d7cfb31024cc8ab177dbe39f2bb80a104eee1fe0ecbe839706911849c627039.png)  

---

想定通りの動作になるように、各ファイルを作成、変更してください。

変更内容

* UserDao.java(テーブルの全件取得用メソッドの追加)
* UserService.java(テーブルの全件取得用メソッド「UserDaoの全件取得用メソッドを呼び出して結果を返す」の追加)
* LoginServlet.java(ログインできた際の遷移先の変更とテーブルから取得した情報を渡す処理の追加)
* result.jsp(ユーザー情報の表示)

---

以下のソースコードを参考にしてください。

UserDao.java

```java
package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import entity.User;

public class UserDao {

    private static final String SQL_SELECT_ID_AND_PASS = "SELECT user_id, user_name, password FROM users WHERE user_id = ? AND password = ?";
    private static final String SQL_SELECT_ALL = "SELECT user_id, user_name, password FROM users";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public User findByIdAndPass(String id, String pass) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ID_AND_PASS)) {
            stmt.setString(1, id);
            stmt.setString(2, pass);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getString("user_id"), rs.getString("user_name"), rs.getString("password"));
            } else {
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getString("user_id"), rs.getString("user_name"), rs.getString("password"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }
}
```

---

USerService.java

```java
package service;

import java.sql.Connection;
import java.util.Collections;
import java.util.List;

import dao.UserDao;
import entity.User;
import util.DbUtil;

public class UserService {

    public User authentication(String id, String pass) {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            User user = userDao.findByIdAndPass(id, pass);

            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<User> find() {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            return userDao.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Collections.emptyList();
    }

}

```

---

LoginServlet.java

```java
package servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.User;
import service.UserService;
import util.ParamUtil;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 文字化け対策
        request.setCharacterEncoding("UTF-8");

        // ログインID、パスワードを取得
        String id = request.getParameter("id");
        String pass = request.getParameter("pass");

        // 入力値のチェック
        if (ParamUtil.isNullOrEmpty(id) || ParamUtil.isNullOrEmpty(pass)) {
            // メッセージ設定
            request.setAttribute("msg", "ログインできませんでした。");

            // 次画面指定
            request.getRequestDispatcher("index.jsp").forward(request, response);
            return;
        }

        // ログインチェック
        UserService userService = new UserService();
        User user = userService.authentication(id, pass);

        // 表示メッセージの受け渡し
        if (user != null) {
            List<User> list = userService.find();
            request.setAttribute("userList", list);

            // 次画面指定
            request.getRequestDispatcher("result.jsp").forward(request, response);
        } else {
            // メッセージ設定
            request.setAttribute("msg", "ログインできませんでした。");

            // 次画面指定
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

}
```

---

result.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Result</title>
</head>
<body>
  ログインできました。<br>
  <br>
  ユーザーの一覧を表示します。<br>
  <table border="1">
    <tr>
      <th>user_id</th>
      <th>user_name</th>
      <th>password</th>
    </tr>
    <c:forEach var="user" items="${userList}">
      <tr>
        <td>${fn:escapeXml(user.userId)}</td>
        <td>${fn:escapeXml(user.userName)}</td>
        <td>${fn:escapeXml(user.password)}</td>
      </tr>
    </c:forEach>
  </table>
</body>
</html>
```

---

result.jspでは、coreタグライブラリのforEachタグを利用して、LoginServletでリクエストスコープに追加された「userList」に対して繰り返し処理をしています。

---

## 登録画面の作成

情報の登録画面（insert.jsp）と登録確認画面（insert_result.jsp）を作成します。
こちらのパスワードは●にする必要はありません。
ただし、結果の画面ではIDとNAMEを編集不可にします。

![picture 25](/images/17ef667f7a77073c88d2d26a5c3be41b2284735ad8712c4673a90e98a3260bf5.png)  

---

想定通りの動作になるように、各ファイルを作成、変更してください。

変更内容

* insert.jsp(登録する情報を入力)
* InsertServlet.java(入力値を受け取り、登録処理の実行、次画面への遷移を行う)
* UserDao.java(データの登録処理の追加)
* UserService.java(データの登録処理の追加)
* insert_result.jsp(登録確認画面の表示)

---

以下のソースコードを参考にしてください。

UserDao.java

```java
package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import entity.User;

public class UserDao {

    private static final String SQL_SELECT_ID_AND_PASS = "SELECT user_id, user_name, password FROM users WHERE user_id = ? AND password = ?";
    private static final String SQL_SELECT_ALL = "SELECT user_id, user_name, password FROM users";
    private static final String SQL_INSERT = "INSERT INTO users (user_id, user_name, password) VALUES (?, ?, ?)";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public User findByIdAndPass(String id, String pass) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ID_AND_PASS)) {
            stmt.setString(1, id);
            stmt.setString(2, pass);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getString("user_id"), rs.getString("user_name"), rs.getString("password"));
            } else {
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getString("user_id"), rs.getString("user_name"), rs.getString("password"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public int insert(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_INSERT)) {
            stmt.setString(1, user.getUserId());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getPassword());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

---

UserService.java

```java
package service;

import java.sql.Connection;
import java.util.Collections;
import java.util.List;

import dao.UserDao;
import entity.User;
import util.DbUtil;

public class UserService {

    public User authentication(String id, String pass) {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            User user = userDao.findByIdAndPass(id, pass);

            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<User> find() {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            return userDao.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Collections.emptyList();
    }

    public int register(User user) {
        try (Connection conn = DbUtil.getConnection()) {
            UserDao userDao = new UserDao(conn);
            return userDao.insert(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0;
    }

}
```

---

InsertServlet.java

```java
package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.User;
import service.UserService;

@WebServlet("/insert")
public class InsertServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 文字化け対策
        request.setCharacterEncoding("UTF-8");

        // 入力情報を取得
        User user = new User(request.getParameter("id"), request.getParameter("name"), request.getParameter("pass"));

        // ユーザーを登録
        UserService userService = new UserService();
        userService.register(user);

        // userを設定
        request.setAttribute("user", user);

        // 次画面指定
        request.getRequestDispatcher("insert_result.jsp").forward(request, response);
    }

}
```

---

insert.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert</title>
</head>
<body>
  <p>ユーザーを登録します。<br>ID、NAME、PASSを入力してください。</p>
  <form action="insert" method="post">
    ID <input type="text" name="id"><br>
    NAME <input type="text" name="name"><br>
    PASS <input type="text" name="pass"><br>
    <button type="submit">クエリ送信</button>
  </form>
</body>
</html>
```

---

insert_result.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>InsertResult</title>
</head>
<body>
  <p>以下の情報でユーザーを登録しました。</p>
  ID <input type="text" name="id" value="${fn:escapeXml(user.userId)}" readonly><br>
  NAME <input type="text" name="name" value="${fn:escapeXml(user.userName)}" disabled><br>
  PASS <input type="text" name="pass" value="${fn:escapeXml(user.password)}"><br>
</body>
</html>
```

---

## まとめ

Webシステムの場合は、DBに接続するためのJDBCドライバーは、プロジェクトのWEB-INF/libフォルダーに配置する必要があります。
それ以外ではJavaSEの場合のDB接続と何ら変わりありません。

サービスクラスは必ずしも作成する必要はありませんが、サービスクラスがあると役割分担して処理を作成しやすくなります。
