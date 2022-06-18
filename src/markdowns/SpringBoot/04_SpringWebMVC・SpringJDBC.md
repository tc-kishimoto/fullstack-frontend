# SpringWebMVC + SpringJDBC

---

Spring Web MVCとSpring JDBCを用いたシステムを作成します。
MVCアーキテクチャを採用したWebアプリケーションフレームワークであるSpring Web MVCでは、DBアクセスはモデルに相当します。
そのモデルの実装として、DBアクセスモジュールであるSpring JDBCを利用する、という関係になります。
そしてSpring Frameworkは、Spring Web MVCやSpring JDBCを裏から支える役割を担っています。

システム開発は確かに複雑ですが、機能を分割することによってそれぞれの機能を比較的単純にすることができます。
反対に、目の前の機能だけを見ていると、システムの全体像を見失ってしまうこともあります。
全体像を把握したうえで、どの部分を開発しているのかをしっかり意識するようにしてください。

---

プロジェクトを作成します。
[ファイル]>[新規]>[Springスターター・プロジェクト]を選択します。
プロジェクト名は「Spring-MVC-jdbc」としてください。
プロジェクトを作成時に、依存関係を設定するウィンドウで「JDBC API」、「PostgreSQL Driver」、「Spring Web」にチェックを入れることを忘れないでください。

グループとパッケージ名は「com.example.demo」

---

Spring Web MVCとSpring JDBCを利用して、「/list」にアクセスした際、spring_dbデータベースのusersテーブルのデータが、画面に一覧として表示されるプログラムを作成します
アクセスするURLは以下の通りです。

サーバーで実行 ：http://localhost:8080/Spring-MVC-jdbc/list  
Spring Boot アプリケーションで実行 ：http://localhost:8080/list  

実行結果イメージ

一覧表示画面

|ID|名前|メール|
|:--|:--|:--|
|1|田中|tanaka@gmail.com|
|2|鈴木|suzuki@gmail.com|

---

以下のファイルを作成・変更してください。

* pom.xml
* application.properties
* User.java
* UserDao.java
* PgUserDao.java
* UserService.java
* UserServiceImpl.java
* UserController.java
* list.jsp

---

pom.xml

以下の依存関係(JSPとJSTLのライブラリ)を追記してください。

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>
    
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
    </dependency>

    (略)

</dependencies>
```

---

application.properties

以下の内容を追記してください。

```text
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/axizdb
spring.datasource.username=axizuser
spring.datasource.password=axiz

spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

list.jsp

JSPは以下のフォルダー構成にして配置してください。

```text
|-src
  |-main
    |-webapp
      |-WEB-INF
         |-views
            |-list.jsp
```

以下のファイルを作成してください

ファイル名

* User.java
* UserDao.java
* PgUserDao.java
* UserService.java
* UserServiceImpl.java
* UserController.java
* list.jsp

---

以下は各ファイルの役割です。

* application.properties
  * データベースとJSPの設定が必要
* UserController.java
  * 「/list」のマッピングとUserServiceの呼び出し
* UserService.java
  * サービスインターフェース
* UserServiceImpl.java
  * サービスインターフェースの実装クラス
  * Userエンティティに対する操作を提供する
* User.java
  * usersテーブルに対応するエンティティ
* UserDao.java
  * DAOインターフェース
* PgUserDao.java
  * DAOインターフェースの実装クラス
  * usersテーブルへのクエリ(SQL)を担当する
* list.jsp
  * 一覧表示用のビュー

---

User.java

```java
package com.example.demo.entity;

public class User {
    private Integer id;
    private String name;
    private String mail;

    public User() {

    }

    public User(Integer id, String name, String mail) {
        this.id = id;
        this.name = name;
        this.mail = mail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

}

```

---

UserController.java

```java
package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/list")
    public String list(Model model) {
        List<User> list = userService.findAll();
        model.addAttribute("userlist", list);

        return "list";
    }

}
```

---

UserService.java

```java
package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

    public List<User> findAll();

}

```

---

UserServiceImpl.java

```java
package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

}
```

---

UserDao.java

```java

package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.User;

public interface UserDao {

    public List<User> findAll();

}

```

---

PgUserDao.java

```java
package com.example.demo.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;

@Repository
public class PgUserDao implements UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY id", new BeanPropertyRowMapper<User>(User.class));
    }
}

```

UserController.javaは、「/list」に対応するURLのマッピングを行っています。
また、サービスクラスを使って、usersテーブルのデータを取得して、画面側に渡しています。

```java
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/list")
    public String list(Model model) {
        List<User> list = userService.findAll();
        model.addAttribute("userlist", list);

        return "list";
    }
}
```

---

list.jspは、受け取ったデータを表示しています。
エンティティの持つ値を取得するときは、セッターのプロパティ名(set〇〇の”〇〇”の部分)を指定することで、セッターを呼ぶことができ、値を取得できます。

```html
<c:forEach items="${userlist}" var="user">
  <tr>
    <td>${fn:escapeXml(user.id)}</td>
    <td>${fn:escapeXml(user.name)}</td>
    <td>${fn:escapeXml(user.mail)}</td>
  </tr>
</c:forEach>
```

---

## SQLインジェクション

Springでの、SQLインジェクション対策について見ていきます。
NamedParameterJdbcTemplateクラスを使った方法について紹介します。
以下のような画面を作成します。

![picture 20](/images/4b7169e5e7587cbb7f5ae6df9d78223a70b344c70f4f77fa240d4f981655da18.png)  

---

「Spring-MVC-jdbc-findById」という名前でSpringスタータープロジェクトを作成してください。
グループ名とパッケージ名は「com.example.demo」としてください。
「JDBC API」、「PostgreSQL Driver」、「Spring Web」を選択します。

以下のファイルを作成・変更します。

* pom.xml
* application.properties
* User.java
* UserDao.java
* PgUserDao.java
* UserService.java
* UserServiceImpl.java
* IndexForm.java
* IndexController.java
* index.jsp
* result.jsp

---

pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>
    
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
    </dependency>

    (略)

</dependencies>
```

---

application.properties

```text
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/axizdb
spring.datasource.username=axizuser
spring.datasource.password=axiz

spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

index.jsp / result.jsp

JSPは以下のフォルダー構成にして配置してください。

```text
|-src
   |-main
      |-webapp
          |-WEB-INF
            |-views
                |-index.jsp
                |-result.jsp
```

---

以下のファイルを作成してください。

ファイル名

* User.java
* UserDao.java
* PgUserDao.java
* UserService.java
* UserServiceImpl.java
* IndexForm.java
* IndexController.java
* index.jsp
* result.jsp

---

index.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>検索</title>
</head>
<body>
  <p>検索</p>
  <form:form action="result" modelAttribute="index" method="post">
    <div>
      <label>ユーザーID</label> <form:input path="id" />
    </div>
    <form:button>実行</form:button>
  </form:form>
</body>
```

---

result.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>検索結果</title>
</head>
<body>
  <p>検索結果</p>
  <p>
    <c:if test="${not empty user}">
      ${fn:escapeXml(user.name)}さんのIDです
    </c:if>
  </p>
  <a href="index">戻る</a>
</body>
```

---

User.java

※前回作成したものと同じ。

---

IndexController.java

```java
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.controller.form.IndexForm;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Controller
public class IndexController {

    @Autowired
    UserService userService;

    @RequestMapping({ "/", "/index" })
    public String index(@ModelAttribute("index") IndexForm form, Model model) {
        return "index";
    }

    @RequestMapping(value = "/result", method = RequestMethod.POST)
    public String result(@ModelAttribute("index") IndexForm form, Model model) {
        User user = userService.findById(form.getId());
        model.addAttribute("user", user);
        return "result";
    }

}
```

---

IndexForm.java

```java
package com.example.demo.controller.form;

public class IndexForm {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}

```

---

UserService.java

```java
package com.example.demo.service;

import com.example.demo.entity.User;

public interface UserService {

    public User findById(Integer id);

}
```

---

UserServiceImpl.java

```java
package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    public User findById(Integer id) {
        return userDao.findById(id);
    }
}

```

---

UserDao.java

```java
package com.example.demo.dao;

import com.example.demo.entity.User;

public interface UserDao {

    public User findById(Integer id);

}

```

---

PgUserDao.java

```java
package com.example.demo.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;

@Repository
public class PgUserDao implements UserDao {

    private static final String SELECT_BY_USER_ID = "SELECT * FROM users WHERE id = :id ORDER BY id";

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public User findById(Integer id) {
        String sql = SELECT_BY_USER_ID;

        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", id);

        List<User> resultList = jdbcTemplate.query(sql, param, new BeanPropertyRowMapper<User>(User.class));

        return resultList.isEmpty() ? null : resultList.get(0);
    }

}

```

---

プロジェクトを実行して、以下の処理を確認してください。
アクセスするURLは以下の通りです。
サーバー ：http://localhost:8080/Spring-MVC-jdbc-findById/index  
Spring Boot ：http://localhost:8080/index  

![picture 21](/images/2ee83c92c5f2dc1bb1ca556cd625aff5d69370211de0122074ea490ed4cea6a2.png)  

---

作成した内容を見ていきます。

プレースホルダーを使用するためには「JdbcTemplate」クラスではなく、「NamedParameterJdbcTemplate」クラスを使う必要があります。

PgUserDao.java

```java
@Autowired
private NamedParameterJdbcTemplate jdbcTemplate;
```

---

「DB連携」では、プレースホルダーは「？」を使っていましたが、SpringJDBCでは、コロン＋名称(任意)を使用します。

```java
private static final String SELECT_BY_USER_ID = "SELECT * FROM users WHERE id = :id ORDER BY id";
```

プレースホルダーに値を埋め込むには、 MapSqlParameterSourceクラスの持つ「addValue」メソッドを使い、名前と値を指定します。
第1引数に「名前」、第2引数に「埋め込み値」を指定します。

```java
MapSqlParameterSource param = new MapSqlParameterSource();
param.addValue("id", id);
```

---

queryメソッドを使ってSQL文を実行しています。
第1引数にSQL文、第2引数に埋め込み値を指定したMapSqlParameterSourceの変数、第3引数にRowMapperを渡します。

```java
List<User> resultList = jdbcTemplate.query(sql, param, new BeanPropertyRowMapper<User>(User.class));
```

戻り値を返す際は、条件演算子を使って、取得結果が1件も無かった場合は「null」を返し、取得結果があった場合は、Userオブジェクトを返しています。

```java
return resultList.isEmpty() ? null : resultList.get(0);
```

---

ここでは、条件演算子(三項演算子)を使用しています。
この演算子を使うことで、if文を簡潔に記述することができます。
(Springの機能ではないので、通常のJavaで記述できます)
構文は下記の通りです。

```java
条件式 ? 式1 : 式2
```

条件式の値がtrueだった場合に式1を処理し、falseだった場合に式2を処理します。
この場合、リストの中身がない場合、「null」を返し、違う場合は、Listの0番目の値を返すことになります。

---

「id」は主キーであり、「id」を指定したデータを取得した場合、複数件データが返ってくることはありません。
そのため、今回作成した「findById」メソッドはList型ではなく、User型で返した方が使い勝手が良いです。
queryメソッドの戻り値の型がList型であるため、Listの添え字0番を返すことでUserオブジェクトを返しています。

コントローラーでは、サービスクラスを使って、usersテーブルのデータを取得して、画面側に渡しています。

```java
public String result(@ModelAttribute("index") IndexForm form, Model model) {
    User user = userService.findById(form.getId());
    model.addAttribute("user", user);
    return "result";
}
```

---

## INSERT, UPDATE, DELETE

SELECT文以外のSQLの実行についてみていきます。
INSERT文を実行するには、以下のようにします。

```java
package com.example.demo.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.co.example.dao.UserDao;
import jp.co.example.entity.User;

@Repository
public class PgUserDao implements UserDao {

    private static final String INSERT = "INSERT INTO users (id, name, mail) VALUES(:id, :name, :mail)";

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void insert(User user) {
        String sql = INSERT;

        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", user.getId());
        param.addValue("name", user.getName());
        param.addValue("mail", user.getMail());

        jdbcTemplate.update(sql, param);
    }

}

```

INSERT, UPDATE, DELETE文の実行には、updateメソッドを使用します。

```java
jdbcTemplate.update(sql, param);
```
