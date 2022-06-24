# Spring JDBC

---

## 事前準備

Spring JDBCについて説明を行っていきます。
この章を始めるにあたって、事前にデータベースをテーブルを作成してください。

データベース：spring_db

テーブル：users

```sql
-- データベース作成
CREATE DATABASE spring_db;

-- 接続切り替え
\c spring_db

-- テーブル作成
CREATE TABLE users (
id   INT PRIMARY KEY,
name VARCHAR(50),
mail    VARCHAR(50)
);

-- データ登録
INSERT INTO users values (1, '田中', 'tanaka@gmail.com');
INSERT INTO users values (2, '鈴木', 'suzuki@gmail.com');
```

---

## Spring JDBC

Spring FrameworkはJava開発における全レイヤーをカバーするフレームワークであり、さまざまな機能を提供しています。
Springを利用したデータベースアクセスについて確認していきます。

Springにはデータベースへのアクセスを簡単にするためにJDBC 抽象化レイヤーを提供するモジュールが含まれています。
このモジュールを使用することにより、プログラマはConnection等のリソースの取得・破棄といった、実際のロジックとは関係のない処理を行う必要がなくなります。

---

プロジェクトを作成します。
[ファイル]>[新規]>[Springスターター・プロジェクト]を選択します。
プロジェクト名は「Spring-jdbc」としてください。
プロジェクト作成時に、依存関係を設定するウィンドウで「JDBC」と「PostgreSQL」にチェックを入れることを忘れないでください。

![picture 3](/images/d6ff08ad71a62c678d9b37c9d98b1386a9687dbe08e12789008ca11cf7293139.png)  

---

### pom.xml

「pom.xml」はSpringのプロジェクトの設定ファイルです。
プロジェクト名などの設定の他、ライブラリの設定なども行うことができます。
データベースを使用する際などは、このファイルに設定を記述する必要があります。

---

pom.xmlの内容を確認すると、先ほどチェックを入れたJDBCとPostgreSQLが設定されていることがわかります。
チェックを入れ忘れた場合は、下記の内容を直接記述しても構いません。

※一部のみ抜粋

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

このプロジェクトでデータベースにアクセスするプログラムを作っていきます。
以下のファイルを作成・変更します。

* application.properties
* User.java
* UserDao.java
* PgUserDao.java
* UserService.java
* UserServiceImpl.java
* SpringJdbcApplication.java

---

### application.properties

データベースにアクセスするための設定情報を記述します。
src/main/resources内にあるapplication.propertiesを以下のように変更してください。

```text
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/spring_db
spring.datasource.username=testuser
spring.datasource.password=test
```

---

User.java

※01_SpringBootのテキストで作成した内容と同じものを使用します。
usersテーブルに対するentityとして作成します。

---

UserDao.java

```java
package com.example.dao;

public interface UserDao {

    public List<User> findAll();

}
```

---

PgUserDao.java

```java
package com.example.dao.impl;

@Repository
public class PgUserDao implements UserDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY id",
            new BeanPropertyRowMapper<User>(User.class));
    }
}

```

---

UserService.java

```java
package com.example.service;

public interface UserService {

    public List<User> findAll();

}
```

---

UserServiceImpl.java

```java
package com.example.service.impl;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    public List<User> findAll() {
        return userDao.findAll();
    }
}
```

---

SpringJdbcApplication.java

```java
package com.example;

@SpringBootApplication
public class SpringJdbcApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(SpringJdbcApplication.class, args);

        UserService userService = context.getBean(UserService.class);
        List<User> list = userService.findAll();
        for (User u : list) {
            System.out.println(u.getUserInfo());
        }
    }

}

```

全て作成できたら、実行結果を確認してください。

結果

```text
User [id=1, name=田中, mail=tanaka@gmail.com]
User [id=1, name=鈴木, mail=suzuki@gmail.com]
```

---

application.propertiesには、データベースにアクセスするための設定情報を記述しています。
ドライバー、接続先、ユーザー名、パスワードを指定します。

```text
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/testdb
spring.datasource.username=testuser
spring.datasource.password=test
```

### application.propertiesの注意点

「pom.xml」にデータベースのライブラリを設定した場合は、「application.properties」内のデータベースの設定情報の記述は必須です。
記述しなかった場合、下記のようなエラーが発生するため、注意してください。

```text
Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.
```

---

エンティティであるUser.javaでは、各カラムに対応するフィールド、ゲッター、セッターを用意しています。

```java
public class User {
    private Integer id;
    
    // (略)
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // (略)

```

アクセサー名(set〇〇、get〇〇の”〇〇”の部分)が実際のカラム名と対応している必要があります(カラム名がnameの場合は、getName、setNameとする)

---

PgUserDao.javaでは@Repositoryアノテーションを使用しています。
Springで管理したいコンポーネントのうち、データアクセスを担当するものに付与するものです。
JdbcTemplateというクラスはJDBCを使用するための基本的な機能を提供するクラスです。
@Autowiredアノテーションを付与することでDIコンテナーに登録してあるコンポーネントを使用できるようにしています。
queryメソッドを利用してSQLを発行しています。
第2引数にRowMapperを渡すことで、DBからの取得結果を自動でエンティティに詰め替えてくれます。

```java
package com.example.dao.impl;

@Repository
public class PgUserDao implements UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY id", 
        new BeanPropertyRowMapper<User>(User.class));
    }
}
```

---

このように、Spring JDBCを利用することで、本来やりたいことに注力することができます。
通常のJavaで記述した場合と比較をしてみてください。
Connection等のリソースの取得・破棄や、接続できなかった時の例外処理など、実際のロジックとは関係のない処理が必要なくなっています。

---

## パラメータの使用

続いて、パラメータを使用してレコードを絞り込む方法を見ていきます。

ServiceとDaoにそれぞれidでレコードを１件のみ出力する処理を追記し、mainメソッドを修正します。

UserService.java

```java
package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

    public List<User> findAll();
    
    public User findById(int id);

}

```

UserServiceImpl.java

```java
package com.example.demo.service.imle;

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

    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findById(int id) {
        return userDao.findById(id);
    }
}
```

UserDao.java

```java
package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.User;

public interface UserDao {

    public List<User> findAll();
    
    public User findById(int id);

}
```

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
public class PgUserDao implements UserDao{

    @Autowired
    // private JdbcTemplate jdbcTemplate;
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY id",
            new BeanPropertyRowMapper<User>(User.class));
    }

    @Override
    public User findById(int id) {
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", id);
        List<User> list = jdbcTemplate.query("SELECT * FROM users WHERE id = :id", param, new BeanPropertyRowMapper<User>(User.class));
        return list.isEmpty() ? null : list.get(0);
    }
}
```

SpringJdbcApplication.java

```java
package com.example;

@SpringBootApplication
public class SpringJdbcApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(SpringJdbcApplication.class, args);

        UserService userService = context.getBean(UserService.class);
        // List<User> list = userService.findAll();
        // for (User u : list) {
        //     System.out.println(u.getUserInfo());
        // }
        User user = userService.findById(1);
        System.out.println(user.getUserInfo());
    }

}

```

全て作成できたら、実行結果を確認してください。

結果

```text
User [id=1, name=田中, mail=tanaka@gmail.com]
```

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

## 更新系のSQL

ここまではデータの取得について見てきましたが、続いてINSERT, UPDATE, DELETEなどの更新系の処理を見ていきます。
Service, Daoに以下の処理を追加し、mainメソッドを修正してください。

UserService.java

```java
package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

    public List<User> findAll();
    
    public User findById(int id);
    
    public int insert(User user);

}
```

UserServiceImpl.java

```java
package com.example.demo.service.imle;

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

    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findById(int id) {
        return userDao.findById(id);
    }

    @Override
    public int insert(User user) {
        return userDao.insert(user);
    }
}
```

UserDao.java

```java
package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.User;

public interface UserDao {

    public List<User> findAll();
    
    public User findById(int id);
    
    public int insert(User user);

}
```

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
public class PgUserDao implements UserDao{

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY id",
            new BeanPropertyRowMapper<User>(User.class));
    }

    @Override
    public User findById(int id) {
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", id);
        List<User> list = jdbcTemplate.query("SELECT * FROM users WHERE id = :id", param, new BeanPropertyRowMapper<User>(User.class));
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public int insert(User user) {
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", user.getId());
        param.addValue("name", user.getName());
        param.addValue("mail", user.getMail());
        return jdbcTemplate.update("INSERT INTO users VALUES(:id, :name, :mail)", param);
    }
}
```

SpringJdbcApplication.java

```java
package com.example;

@SpringBootApplication
public class SpringJdbcApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(SpringJdbcApplication.class, args);

        UserService userService = context.getBean(UserService.class);
//        List<User> list = userService.findAll();
//        for (User u : list) {
//            System.out.println(u.getUserInfo());
//        }
        User newUser = new User(101, "testUser", "test@gmail.com");
        userService.insert(newUser);
        User user = userService.findById(101);
        System.out.println(user.getUserInfo());
    }

}

```

結果

```text
User [id=101, name=testUser, mail=test@gmail.com]
```

更新系のSQLの場合でも、基本的な使い方は変わりません。
更新系のSQLの場合はqueryメソッドの代わりにupdateメソッドを使用します。

```java
MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id", user.getId());
        param.addValue("name", user.getName());
        param.addValue("mail", user.getMail());
        return jdbcTemplate.update("INSERT INTO users VALUES(:id, :name, :mail)", param);
```
