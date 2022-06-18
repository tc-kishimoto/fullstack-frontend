# DAOとDTO

---

DAOとDTOについて説明を行っていきます。
この章を始めるにあたって、「データベース基礎」の章でusersテーブルを作成している必要があります。
usersテーブルを作成していない場合は、「データベース基礎」の章を参照して、usersテーブルを作成してください。

```sql
-- テーブルの作成
CREATE TABLE users (
id INT PRIMARY KEY
, name VARCHAR(20)
, mail VARCHAR(30)
, pass VARCHAR(20)
);

DELETE FROM users;
INSERT INTO users
VALUES
(1, 'Alice', 'alice@axiz.co.jp', 'axiz')
, (2, 'Bob', 'bob@axiz.co.jp', 'axiz')
, (3, 'Chris', 'chris@axiz.co.jp', NULL)
, (4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');
```

---

実際にシステムを作っていくうえで、「システムで実現したい処理（ビジネスロジック）」と「データベースに接続する処理」が同じ場所に書かれているとメンテナンスが大変です。
そこで「データベースに接続する処理」を部品化し、処理の見通しをよくする方法を見ていきます。

この「データベースに接続する処理」というのはシステムを作るうえで「よく出るパターン」の一つです。
システム開発では、このような「よく出るパターン」に対する設計ノウハウを、デザインパターンとしてカタログ化しています。
そうすることで、誰でも設計ノウハウを再利用することができます。
「データベースに接続する処理」に関連するデザインパターンはいくつか知られていますが、今回はDAO/DTOパターンについて見ていきます。

---

## DAO（Data Access Object）

DAOとは処理部分からDBアクセス部品を切り出し、部品化したクラスのことです。
DAOを作成する際、メソッド内で表示などはせず、処理としてはあくまでも「情報の取得や更新のみ」を行います。

## DTO（Data Transfer Object）

関連する情報を一つにまとめたクラスのことです。
基本的には、データを格納するフィールドと、それに対するゲッター、セッターのみで構成されます。

---

## Entity

データベースなどで管理されてるデータを、プログラム上で保持するためのクラスです。
先述したDTOは単なる「入れ物」という意味で使用する場合が多いのですが、Entityは「システム上で管理されているデータ」という意味で使用されます。
Entityの1オブジェクトを、テーブルの1レコードに対応させるように作ることも多くあります。
SELECT文などで複数のレコードを取得する場合、Entityとして作成したクラスのオブジェクトをArrayListなどに入れて管理することが一般的です。

それではユニットテストを利用しながら、DAOやDTO（Entity）を作っていきます。

---

## プロジェクトの作成

1. Eclipseを起動してください
2. パースペクティブを「Java」にしてください。
3. 「dao_dto」という名前で新しくJavaプロジェクトを作成してください。
4. プロジェクトにJUnitのライブラリを追加してください。
   詳しい追加方法はJUnitを内容を参照してください。
5. プロジェクトにJDBCのライブラリを追加してください。
   詳しい追加方法はDB接続_JavaSEを参照してください。

以下の6つのファイルを作成してください。

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
            return DriverManager.getConnection("jdbc:postgresql://localhost:5432/axizdb", "axizuser", "axiz");
        } catch (Exception e) {
            // 本来は専用の例外クラスを作成したほうがよい
            throw new RuntimeException(e);
        }
    }
}
```

---

パッケージ：util
DbUtilTest.java.java

```java
package util;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.jupiter.api.Test;

class DbUtilTest {

    @Test
    public void testGetConnection() throws SQLException {
        try (Connection conn = DbUtil.getConnection()) {
            assertEquals(false, conn.isClosed());
        }
    }

}
```

---

パッケージ：dao
ファイル名：UserDao.java

```java
package dao;

import java.util.List;

import entity.User;

public class UserDao {

    public List<User> findAll() {
        return null;
    }

    public User findById(int userId) {
        return null;
    }

    public int insert(User user) {
        return 0;
    }

    public int update(User user) {
        return 0;
    }

    public int delete(int userId) {
        return 0;
    }

}
```

---

パッケージ：dao
ファイル名：UserDaoTest.java

```java
package dao;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import entity.User;
import util.DbUtil;

public class UserDaoTest {

    private Connection connection;
    private UserDao userDao;

    @BeforeEach
    public void setUp() throws Exception {
        connection = DbUtil.getConnection();
        connection.setAutoCommit(false);

        try (PreparedStatement stmt = connection.prepareStatement("DELETE FROM users")) {
            stmt.executeUpdate();
        }

        try (Statement stmt = connection.createStatement()) {
            stmt.addBatch("INSERT INTO users VALUES (1, 'Alice', 'alice@axiz.co.jp', 'password')");
            stmt.addBatch("INSERT INTO users VALUES (2, 'Bob', 'bob@axiz.co.jp', 'password')");
            stmt.executeBatch();
        }

        userDao = new UserDao(connection);
    }

    @AfterEach
    public void tearDown() throws Exception {
        connection.rollback();
    }

    @Test
    public void findAllで全件取得できる() {
        List<User> list = userDao.findAll();
        assertEquals(2, list.size());

        User u = list.get(0);
        assertEquals(Integer.valueOf(1), u.getUserId());
        assertEquals("Alice", u.getUserName());
        assertEquals("alice@axiz.co.jp", u.getMail());
        assertEquals("password", u.getPass());

        u = list.get(1);
        assertEquals(Integer.valueOf(2), u.getUserId());
        assertEquals("Bob", u.getUserName());
        assertEquals("password", u.getPass());
    }

    @Test
    public void findAllはデータがないと空のリストを返す() throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement("DELETE FROM users")) {
            stmt.executeUpdate();
        }

        List<User> list = userDao.findAll();
        assertEquals(0, list.size());
    }

    @Test
    public void findByIdで存在するデータが正しく取得できる() {
        User user = userDao.findById(1);
        assertEquals(Integer.valueOf(1), user.getUserId());
        assertEquals("Alice", user.getUserName());
        assertEquals("alice@axiz.co.jp", user.getMail());
        assertEquals("password", user.getPass());
    }

    @Test
    public void findByIdで存在しないデータはnullになる() {
        User user = userDao.findById(10);
        assertNull(user);
    }

    @Test
    public void insertでデータを登録できる() {
        User newUser = new User(10, "taro", "taro@gmail.com", "password");
        userDao.insert(newUser);

        User getUser = userDao.findById(10);
        assertEquals(newUser.getUserId(), getUser.getUserId());
        assertEquals(newUser.getUserName(), getUser.getUserName());
        assertEquals(newUser.getMail(), getUser.getMail());
    }

    @Test
    public void insertで主キーが重複していると例外発生() {
        User newUser = new User(1, "taro", "taro@gmail.com", "password");
        assertThrows(RuntimeException.class, () -> userDao.insert(newUser));
    }

    @Test
    public void updateでデータを更新できる() {
        User user = userDao.findById(1);
        assertEquals(Integer.valueOf(1), user.getUserId());
        assertEquals("Alice", user.getUserName());
        assertEquals("alice@axiz.co.jp", user.getMail());

        user.setUserName("佐藤");
        userDao.update(user);

        user = userDao.findById(1);
        assertEquals(Integer.valueOf(1), user.getUserId());
        assertEquals("佐藤", user.getUserName());
        assertEquals("alice@axiz.co.jp", user.getMail());
    }

    @Test
    public void deleteでデータを削除できる() {
        User user = userDao.findById(1);
        assertNotNull(user);

        userDao.delete(1);

        user = userDao.findById(1);
        assertNull(user);
    }

}
```

---

パッケージ：entity
ファイル名：User.java

```java
package entity;

public class User {

}
```

---

パッケージ：entity
ファイル名：UserTest.java

```java
package entity;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class UserTest {
    @Test
    public void usersテーブルに対応している() {
        User user = new User();
        user.setUserId(10);
        user.setUserName("test");
        user.setMail("test@test.com");
        user.setPass("password");

        assertEquals(Integer.valueOf(10), user.getUserId());
        assertEquals("test", user.getUserName());
        assertEquals("test@test.com", user.getMail());
        assertEquals("password", user.getPass());
    }

    @Test
    public void 引数のあるコンストラクターがある() {
        User user = new User(10, "test", "test@test.com", "password");

        assertEquals(Integer.valueOf(10), user.getUserId());
        assertEquals("test", user.getUserName());
        assertEquals("test@test.com", user.getMail());
        assertEquals("password", user.getPass());
    }

}
```

---

プロジェクトにはテストケースが含まれています。
まずはプロジェクト全体を確認し、テストケースを実行してください（コンパイルエラーは無視します）。
プロジェクトを選択してJunitで実行することで、全てのテストケースをまとめて実行することができます。

![picture 12](/images/46ad664052a3ebf5c4787805bdf4e7875853db46d503d8aad91f76c87631acdc.png)  

---

## Entityの作成

User.javaとUserTest.javaの内容を確認し、 entity.UserTestのテストケースが全てグリーンになるように、Userクラスの内容を変更してください
変更内容

* usersテーブルのカラムに対応するフィールドの作成
* コンストラクターの作成(各フィールドに引数の値をセット)
* 各フィールドに対応するアクセサーの作成

※分からない場合は模範解答を参考にしてください。

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 13](/images/8f2f257da1b3ce749c484409184ee75ac4a313f1bb487a8e987353bcf2230d31.png)  

---

解説を行っていきます。
Userクラスはusersテーブルに対応するように実装します。
usersテーブルのカラム名と同名のフィールドを作っています。
JavaとPostgreSQLでは同じ種類でも型名は異なるため、適切にフィールドの型を決定する必要があります。

```java
private Integer userId;
private String userName;
private String mail;
private String pass;
```

---

また、フィールドに対応したアクセサーを用意します。

```java
public Integer getUserId() {
    return userId;
}

public void setUserId(Integer userId) {
    this.userId = userId;
}

public String getUserName() {
    return userName;
}

public void setUserName(String userName) {
    this.userName = userName;
}

public String getMail() {
    return mail;
}

public void setMail(String mail) {
    this.mail = mail;
}

public String getPass() {
    return pass;
}
```

---

コンストラクターは以下の二つがあります。
必要に応じて、利用者は好きな方を使用することができます。

```java
public User() {
}

public User(Integer userId, String userName, String mail, String pass) {
    this.userId = userId;
    this.userName = userName;
    this.mail = mail;
    this.pass = pass;
}
```

---

## UserDaoのコンストラクター実装

UserDaoTestクラスの解説を行います。
setUpメソッドは、トランザクションを開始して、データベース内のusersテーブルの中身を一度全て消して、データを２件追加しています。
＠BeforeEachアノテーションがある為、各テストメソッドが呼ばれる前に一度実行されます(テスト用のデータを作成するためです)。

```java
@BeforeEach
public void setUp() throws Exception {
    connection = DbUtil.getConnection();
    connection.setAutoCommit(false);

    try (PreparedStatement stmt = connection.prepareStatement("DELETE FROM users")) {
        stmt.executeUpdate();
    }

    try (Statement stmt = connection.createStatement()) {
        stmt.addBatch("INSERT INTO users VALUES (1, 'Alice', 'alice@axiz.co.jp', 'axiz')");
        stmt.addBatch("INSERT INTO users VALUES (2, 'Bob', 'bob@axiz.co.jp', 'axiz')");
        stmt.executeBatch();
    }

    userDao = new UserDao(connection);
}
```

---

tearDownメソッドは、トランザクションをロールバックしています。
＠AfterEachアノテーションがある為、各テストメソッドが呼ばれた後に一度実行されます(テスト実行前の状態に戻すためです)。
こうすることで、テーブルの現在の状態に依存しないテストをすることが可能です。

```java
@AfterEach
public void tearDown() throws Exception {
    connection.rollback();
}
```

---

DbUtilクラスの解説を行います。
getConnectionメソッドは、データベースへの接続のためのコネクションを取得する処理です。
メソッド化して、再利用できるようにしています。

```java
public class DbUtil {
    public static Connection getConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection
            ("jdbc:postgresql://localhost:5432/axizdb", "axizuser", "axiz");
        } catch (Exception e) {
            // 本来は専用の例外クラスを作成したほうがよい
            throw new RuntimeException(e);
        }
    }
}
```

それでは、UserDaoTestのテストケースが実行できるようにしていきます。
以下のようにコンパイルエラーがありますので、解消していきます。

---

UserDaoTestのテストケースが実行できるように、UserDao.javaの内容を変更してください。

変更内容

* Connection型のフィールドの作成
* コンストラクターの作成(作成したフィールドに引数の値をセット)

全ての作業が完了したら、テストケースが実行できることを確認してください。

![picture 14](/images/4c42ebe140b31ceb7b203e8b7eb2bfe0885434e66b1f23c592b59bb1f34c4115.png)  

---

解説を行っていきます。
コンパイルエラーとなっていたのはコンストラクターなので、引数Connectionのコンストラクターを追加します。
また受け取った値をフィールドに保持するように実装します。

```java
private Connection connection;

public UserDao(Connection connection) {
    this.connection = connection;
}
```

---

## findAllの実装

UserDaoのfindAllメソッドを実装します。
「findAllで全件取得できる」と「findAllはデータがないと空のリストを返す」 のテストケースがグリーンになるように、UserDao.javaの内容を変更してください。

変更内容

* findAllメソッドの作成  
　usersテーブルから全件取得するSQL文を使って、レコードを取得し、取得した結果をList型の戻り値で返す

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 15](/images/6f8e49846fd736b38391069b602a61cc4307924a4d4440e1a0cf0c7b53977d9d.png)  

---

解説を行っていきます。
まずはusersテーブルから全件取得するSQL文を新しく追加しています。

```java
private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";
```

---

findAllの実装は以下のようになっています。
SELECT文の結果を、1行：1Userエンティティとなるように格納し、さらにそれらをListに追加しています。

```java
public List<User> findAll() {
    List<User> list = new ArrayList<User>();

    try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
            list.add(u);
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }

    return list;
}
```

---

findAllメソッドの呼び出しは以下のようになっています。
SELECT文の結果をList型の変数で受け取り、「get」メソッドを使用して、1行ずつデータを取得しています。

```java
@Test
public void findAllで全件取得できる() {
    List<User> list = userDao.findAll();
    assertEquals(2, list.size());

    User u = list.get(0);
    assertEquals(Integer.valueOf(1), u.getUserId());
    assertEquals("Alice", u.getUserName());
    assertEquals("alice@axiz.co.jp", u.getMail());
    assertEquals("password", u.getPass());

    u = list.get(1);
    assertEquals(Integer.valueOf(2), u.getUserId());
    assertEquals("Bob", u.getUserName());
    assertEquals("password", u.getPass());
}
```

このようにDAOを実装することで、呼び出し側はSQLの発行やエンティティに詰め替える処理を意識せずに済みます。

---

## findByIdの実装

UserDaoのfindByIdメソッドを実装します。
「findByIdで存在するデータが正しく取得できる」と「findByIdで存在しないデータはnullになる」のテストケースがグリーンになるように、UserDao.javaの内容を変更してください。

変更内容

* findByIdメソッドの変更  
　usersテーブルからuser_idを指定して取得するSQL文を使って、レコードを取得し、取得した結果をUser型の戻り値で返す

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 16](/images/37bfd618b1a597bb13de9f01b56e7a4c0a8590d5fcf66d89cdbf150bd506be64.png)  

---

解説を行っていきます。
まずはusersテーブルからuser_idを指定して取得するSQL文を新しく追加します。

```java
private static final String SQL_SELECT_WHERE_USER_ID = "SELECT id, name, mail, pass FROM users WHERE id = ?";
```

---

findByIdの実装は以下のようになっています。
findAllと似ていますが、user_idを条件に指定すると、結果は0件か1件のため、実装はシンプルになります。

```java
public User findById(int userId) {
    try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_WHERE_USER_ID)) {
        stmt.setInt(1, userId);
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            return new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }

    return null;
}
```

---

findByIdメソッドの呼び出しは以下のようになっています。
SELECT文の結果をUser型の変数で受け取り、使用しています。

```java
@Test
public void findByIdで存在するデータが正しく取得できる() {
    User user = userDao.findById(1);
    assertEquals(Integer.valueOf(1), user.getUserId());
    assertEquals("Alice", user.getUserName());
    assertEquals("alice@axiz.co.jp", user.getMail());
    assertEquals("password", user.getPass());
}
```

---

## insertの実装

UserDaoのinsertメソッドを実装します。
「insertでデータを登録できる」と「insertで主キーが重複していると例外発生」のテストケースがグリーンになるように、UserDao.javaの内容を変更してください。

変更内容

* insertメソッドの変更
　usersテーブルにデータを登録するためのSQL文を使って、受け取った引数の内容でデータを登録する

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 17](/images/094c7adaba8c528f2704e7f16b1b075bbc98faeef8262673befd1a4df4cdbe66.png)  

---

解説を行っていきます。
まずはusersテーブルにデータを登録するためのSQL文を新しく追加しています。

```java
private static final String SQL_INSERT = "INSERT INTO users (id, name, mail, pass) VALUES (?, ?, ?, ?)";
```

---

insertの実装は以下のようになっています。
引数で受け取ったUserオブジェクトの値を、SQLのプレースホルダーにセットしています。

```java
public int insert(User user) {
    try (PreparedStatement stmt = connection.prepareStatement(SQL_INSERT)) {
        stmt.setInt(1, user.getUserId());
        stmt.setString(2, user.getUserName());
        stmt.setString(3, user.getMail());
        stmt.setString(4, user.getPass());

        return stmt.executeUpdate();
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

---

insertメソッドの呼び出しは以下のようになっています。
登録したい値を持ったUser型の変数を用意し、insertメソッドを呼び出す際の引数に渡しています。

```java
@Test
public void insertでデータを登録できる() {
    User newUser = new User(10, "taro", "taro@gmail.com", "password");
    userDao.insert(newUser);

    User getUser = userDao.findById(10);
    assertEquals(newUser.getUserId(), getUser.getUserId());
    assertEquals(newUser.getUserName(), getUser.getUserName());
    assertEquals(newUser.getMail(), getUser.getMail());
}
```

---

## updateの実装

UserDaoのupdateメソッドを実装します。
「updateでデータを更新できる」のテストケースがグリーンになるように、UserDao.javaの内容を変更してください。

変更内容

* updateメソッドの変更  
　usersテーブルのデータを更新するためのSQL文を使って、受け取った引数の内容でデータを更新する。
　ただし、更新対象は、user_idが一致するレコードのみ。

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 18](/images/6f13d3a4ca9d5c627c1dd26fc125da09090eee9f75ba6801b38b2bad413fabdd.png)  

---

解説を行っていきます。
まずはusersテーブルのデータを更新するためのSQL文を新しく追加しています。

```java
private static final String SQL_UPDATE = "UPDATE users SET name = ?, mail = ?, pass = ? WHERE id = ?";
```

---

updateの実装は以下のようになっています。
insertのときと同じように、引数で受け取ったUserオブジェクトの値を、SQLのプレースホルダーにセットしています。
ただし、idの指定は四つ目の「?」になるため、プレースホルダーの位置には注意が必要です。

```java
public int update(User user) {
    try (PreparedStatement stmt = connection.prepareStatement(SQL_UPDATE)) {
        stmt.setString(1, user.getUserName());
        stmt.setString(2, user.getMail());
        stmt.setString(3, user.getPass());
        stmt.setInt(4, user.getUserId());

        return stmt.executeUpdate();
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

---

updateメソッドの呼び出しは以下のようになっています。
変更したい値を持ったUser型の変数を用意し、その変数が持っている値を変更して、updateメソッドを呼び出す際の引数に渡しています。

```java
@Test
public void updateでデータを更新できる() {
    User user = userDao.findById(1);
    assertEquals(Integer.valueOf(1), user.getUserId());
    assertEquals("Alice", user.getUserName());
    assertEquals("alice@axiz.co.jp", user.getMail());

    user.setUserName("佐藤");
    userDao.update(user);

    user = userDao.findById(1);
    assertEquals(Integer.valueOf(1), user.getUserId());
    assertEquals("佐藤", user.getUserName());
    assertEquals("alice@axiz.co.jp", user.getMail());
}
```

---

## deleteの実装

UserDaoのdeleteメソッドを実装します。
「deleteでデータを削除できる」のテストケースがグリーンになるように、UserDao.javaの内容を変更してください。

変更内容

* deleteメソッドの変更
　usersテーブルのデータをuser_idを指定して削除するSQL文を使って、受け取った引数に対応するデータを削除する

全ての作業が完了したら、テストケースがグリーンになることを確認してください。

![picture 19](/images/aba92729f33f2e9f78cbf9c4b7fef005c74c2b3f5ba6e29f2142d1726e604675.png)  

---

解説を行っていきます。
まずはusersテーブルのデータを削除するためのSQL文を新しく追加しています。

```java
private static final String SQL_DELETE = "DELETE FROM users WHERE id = ?";
```

---

deleteの実装は以下のようになっています。
引数で受け取った値を、SQLのプレースホルダーにセットしています。

```java
public int delete(int userId) {
    try (PreparedStatement stmt = connection.prepareStatement(SQL_DELETE)) {
        stmt.setInt(1, userId);

        return stmt.executeUpdate();
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

---

deleteメソッドの呼び出しは以下のようになっています。
削除したいデータのuser_idの番号を、deleteメソッドを呼び出す際の引数に渡しています。

```java
@Test
public void deleteでデータを削除できる() {
    User user = userDao.findById(1);
    assertNotNull(user);

    userDao.delete(1);

    user = userDao.findById(1);
    assertNull(user);
}
```

---

## DAOとDTOのまとめ

「データベースに接続する処理」の部品化について行いました。
実際にはこれだけで済むことは少なく、作成内容によってはJOINなども使うような、より複雑なSQLを扱う必要もでてきます。
また常に、今回のように、エンティティとテーブルが1：1で対応するとも限りません。
どんなに複雑になっても、DAOはあくまで「部品」です。
使い勝手を意識して作成する必要があります。

---

## 模範解答

### Entityの作成

User.java

```java
package entity;

public class User {

    private Integer userId;
    private String userName;
    private String mail;
    private String pass;

    public User() {
    }

    public User(Integer userId, String userName, String mail, String pass) {
        this.userId = userId;
        this.userName = userName;
        this.mail = mail;
        this.pass = pass;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPass() {
        return pass;
    }
    
    public void setPass(String pass) {
        this.pass = pass;
    }

}
```

---

### UserDaoのコンストラクター実装

UserDao.java

```java
public class UserDao {

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    // ...省略
}
```

---

### findAllの実装

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

    private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public User findById(int userId) {
        return null;
    }

    public int insert(User user) {
        return 0;
    }

    public int update(User user) {
        return 0;
    }

    public int delete(int userId) {
        return 0;
    }

}
```

---

### findByIdの実装

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

    private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";
    private static final String SQL_SELECT_WHERE_USER_ID = "SELECT id, name, mail, pass FROM users WHERE id = ?";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public User findById(int userId) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_WHERE_USER_ID)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    public int insert(User user) {
        return 0;
    }

    public int update(User user) {
        return 0;
    }

    public int delete(int userId) {
        return 0;
    }

}
```

---

### insertの実装

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

    private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";
    private static final String SQL_SELECT_WHERE_USER_ID = "SELECT id, name, mail, pass FROM users WHERE id = ?";
    private static final String SQL_INSERT = "INSERT INTO users (id, name, mail, pass) VALUES (?, ?, ?, ?)";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public User findById(int userId) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_WHERE_USER_ID)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    public int insert(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_INSERT)) {
            stmt.setInt(1, user.getUserId());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getMail());
            stmt.setString(4, user.getPass());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int update(User user) {
        return 0;
    }

    public int delete(int userId) {
        return 0;
    }

}
```

---

### updateの実装

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

    private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";
    private static final String SQL_SELECT_WHERE_USER_ID = "SELECT id, name, mail, pass FROM users WHERE id = ?";
    private static final String SQL_INSERT = "INSERT INTO users (id, name, mail, pass) VALUES (?, ?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE users SET name = ?, mail = ?, pass = ? WHERE id = ?";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public User findById(int userId) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_WHERE_USER_ID)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    public int insert(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_INSERT)) {
            stmt.setInt(1, user.getUserId());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getMail());
            stmt.setString(4, user.getPass());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int update(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_UPDATE)) {
            stmt.setString(1, user.getUserName());
            stmt.setString(2, user.getMail());
            stmt.setString(3, user.getPass());
            stmt.setInt(4, user.getUserId());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int delete(int userId) {
        return 0;
    }

}
```

---

### deleteの実装

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

    private static final String SQL_SELECT_ALL = "SELECT id, name, mail, pass FROM users ORDER BY id";
    private static final String SQL_SELECT_WHERE_USER_ID = "SELECT id, name, mail, pass FROM users WHERE id = ?";
    private static final String SQL_INSERT = "INSERT INTO users (id, name, mail, pass) VALUES (?, ?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE users SET name = ?, mail = ?, pass = ? WHERE id = ?";
    private static final String SQL_DELETE = "DELETE FROM users WHERE id = ?";

    private Connection connection;

    public UserDao(Connection connection) {
        this.connection = connection;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<User>();

        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_ALL)) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
                list.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public User findById(int userId) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_SELECT_WHERE_USER_ID)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(rs.getInt("id"), rs.getString("name"), rs.getString("mail"), rs.getString("pass"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    public int insert(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_INSERT)) {
            stmt.setInt(1, user.getUserId());
            stmt.setString(2, user.getUserName());
            stmt.setString(3, user.getMail());
            stmt.setString(4, user.getPass());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int update(User user) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_UPDATE)) {
            stmt.setString(1, user.getUserName());
            stmt.setString(2, user.getMail());
            stmt.setString(3, user.getPass());
            stmt.setInt(4, user.getUserId());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int delete(int userId) {
        try (PreparedStatement stmt = connection.prepareStatement(SQL_DELETE)) {
            stmt.setInt(1, userId);

            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
```
