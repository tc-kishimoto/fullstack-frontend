# DB接続_JavaSE

---

JavaとDBの連携について説明を行っていきます。
この章を始めるにあたって、「データベース基礎」の章でusersテーブルを作成している必要があります。
usersテーブルを作成していない場合は、「データベース基礎」の章を参照して、usersテーブルを作成してください。
なお、データベース名は「test」、ユーザー名は「testuser」とします。

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
(1, 'Alice', 'alice@test.co.jp', 'pass')
, (2, 'Bob', 'bob@test.co.jp', 'pass')
, (3, 'Chris', 'chris@test.co.jp', NULL)
, (4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');
```

---

## JDBCドライバの準備

プログラムを作成する前にJavaからDBに接続するためのライブラリを用意します。

1. 下記のサイトからJDBCドライバをダウンロードしてください。

[PostgreSQL JDBC Driver](https://jdbc.postgresql.org/download.html)

2. Cドライブの直下に「JDBC」フォルダを作成してください。
3. ダウンロードしたjarファイルをJDBCフォルダに配置してください。

![picture 11](/images/9e1b408023adaae18b2e6755caaaaae9a2c09d77259218f7e0d029ec529aebb4.png)  

これでJDBCドライバの準備は完了です。

---

## DB接続プログラムの作成

実際のシステム運用の中で、プログラマが直接SQL文を実行することはそう多くはありません。
実際にはシステムの中にSQL文を埋め込んでおきます。
つまり「プログラムから」データベースへ接続してSQL文を実行できるようにする必要があります。

![picture 6](/images/818d13ea8fc3782205bd53cd6cb8b97ea3e97c5628c1779236b7e004d5ca22cd.png)  

Javaからデータベースへ接続する方法をみていきます。
接続方法は使用するプログラミング言語によって異なりますが、JavaではJDBCとして標準化されています。

---

「DbAccess.java」ファイルをコマンドプロンプトで実行してください。

(コンパイル、実行方法などは「java基礎」の「はじめに」の単元を参照してください)

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbAccess {
    public static void main(String[] args) {
        Connection con = null;
        PreparedStatement stmt = null;

        try {
            // load JDBC Driver
            Class.forName("org.postgresql.Driver");

            // confirm
            System.out.println(" --- before connection --- ");

            // database connect
            con = DriverManager.getConnection("jdbc:postgresql:testdb", "testuser", "test");

            // confirm
            System.out.println(" --- after connection --- ");

            // SQL query string
            String sql = "SELECT * FROM usertable";

            // create statement
            stmt = con.prepareStatement(sql);

            // execute
            ResultSet rs = stmt.executeQuery();

            // output
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String mail = rs.getString("mail");

                System.out.println(id);
                System.out.println(name);
                System.out.println(mail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // close
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

---

以下のようなエラーが出ます。

```text
java.lang.ClassNotFoundException: org.postgresql.Driver
        at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:264)
        at DbAccess.main(DbAccess.java:15)
```

---

JavaとDBを連携させるには以下の手順が必要となります。

1. 外部ライブラリの設定
2. JDBCドライバーのロード
3. DB接続
4. SQL実行用経路の作成
5. SQL実行

---

## 外部ライブラリの設定

まずは外部ライブラリの設定が必要です。
先ほどのエラーは、15行目で「org.postgresql.Driver」というクラスが見つからないという意味です。
プログラムから外部ライブラリのクラスを見つけられるようにするためには、環境によって適切な設定が必要です。

今回はコマンド プロンプトで実行しようとしているため、「環境変数CLASSPATH」の設定が必要となります。
環境変数の設定方法はOSによって異なるため、使用しているOSに合わせて設定を行う必要があります。
また設定を間違えてしまうと、他のプログラムなどにも影響が出てしまうこともあります。
変更する際には注意して行ってください。

### CLASSPATHとは

Javaアプリケーションを実行するときに、どの場所からクラスファイル　を読み込めばよいかを、指定するためのものです。
基本的には、アプリケーションを実行するために必要なクラスファイル　をCLASSPATHに指定された“場所”から読み込みます。
CLASSPATHを設定すると、複数のフォルダーに整理されているクラスを　利用できます。
また、CLASSPATHの指定順によって、実行されるクラスの優先度を設定することができます。

---

### 環境変数の設定

1. エクスプローラの起動（Windowsキー + E）
2. 「PC」を右クリック⇒プロパティ
3. 詳細情報内にある「システム詳細設定」をクリック
4. システムのプロパティ画面の右下にある 「環境変数」 を選択
5. システム環境変数内の「新規」を選択
6. 新しいシステム変数画面で以下を入力＞「OK」を選択

変数名

```text
CLASSPATH
```

変数値
※ファイル名は実際のものに合わせてください。

```text
.;C:\JDBC\postgresql-42.2.10.jar
```

7. CLASSPATHが追加されていることを確認＞[OK]を選択

---

設定が変更できたら、一度コマンドプロンプトを再起動し、再度プログラムを実行してください。
実行結果を確認すると以下のようなエラーが出ます。

```text
 --- before connection ---
 --- after connection ---
org.postgresql.util.PSQLException: ERROR: リレーション"usertable"は存在しません
  ポジション: 15
        at org.postgresql.core.v3.QueryExecutorImpl.receiveErrorResponse(QueryExecutorImpl.java:2412)
        at org.postgresql.core.v3.QueryExecutorImpl.processResults(QueryExecutorImpl.java:2125)
        at org.postgresql.core.v3.QueryExecutorImpl.execute(QueryExecutorImpl.java:297)
        at org.postgresql.jdbc.PgStatement.executeInternal(PgStatement.java:428)
        at org.postgresql.jdbc.PgStatement.execute(PgStatement.java:354)
        at org.postgresql.jdbc.PgPreparedStatement.executeWithFlags(PgPreparedStatement.java:169)
        at org.postgresql.jdbc.PgPreparedStatement.executeQuery(PgPreparedStatement.java:117)
        at DbAccess.main(DbAccess.java:33)

```

このソースはいくつか間違っている箇所があります。
順に説明していきますので、プログラムを見ながら追っていきます。

---

## JDBCドライバーのロード

プログラムの内容を見ていきます。
JDBCドライバーのロードは以下の箇所で行っています。
forNameメソッドの引数に完全限定名でJDBCドライバーのクラス名を指定しています。

```java
// load JDBC Driver
Class.forName("org.postgresql.Driver");
```

※これはPostgreSQL用のJDBCドライバーです。他のデータベースでは違う名前ですので注意してください。

## DB接続

DB接続は以下の箇所で行っています。
getConnectionメソッドの引数に「DB名」「ユーザー名」「パスワード」を指定します。
戻り値はDBへのコネクション（Connection）になりますので、変数conで受け取っています。

```java
// database connect
con = DriverManager.getConnection("jdbc:postgresql:testdb", "testuser", "test");
```

---

## SQL実行用経路の作成

以下の箇所は実行するSQLを「文字列として」用意しています。
SQLの内容はあるテーブルから全件取得するものです。

```java
// SQL query string
String sql = "SELECT * FROM usertable";
```

テーブル名が間違っているため、以下のように修正してください。

```java
// SQL query string
String sql = "SELECT * FROM users";
```

そして、以下の箇所で、SQL実行用経路を作成しています。
DBへのコネクション（Connection）から作成しています。
また引数には、先ほど用意したSQL文を指定しています。

```java
// create statement
stmt = con.prepareStatement(sql);
```

---

## SQL実行

SQLの実行は以下の箇所で行っています。
executeQueryメソッドを呼ぶことで、先ほどのSQLを実行しています。
実行結果はResultSet型として返されるため、変数rsで受け取っています。

```java
// execute
ResultSet rs = stmt.executeQuery();
```

取得した情報へのアクセス方法ですが、以下のように変数rsを利用していきます。
変数rsはイテレーターであり、nextメソッドやgetStringメソッドを使用することで情報を取得することができます。

```java
// output
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    String tel = rs.getString("mail");
}
```

「while (rs.next())」で情報が存在する限り、繰り返し情報を取得する処理を行います。
各カラムの情報を取得するには「getIntメソッド」や「getStringメソッド」を使用します。
「getIntメソッド」や「getStringメソッド」を使用するとき、引数に取得したいカラムのカラム名を指定します。

---

一連の処理の最後に、finallyを使ってステートメント、コネクションのクローズ処理を行っています。
それぞれのcloseメソッドを使用してクローズします。

```java
stmt.close();

con.close();
```

このクローズ処理は必ず行ってください。
DBへのアクセス数は上限が設定されていることが多く、上限に達すると接続解放待ちの状態になります。
そのため、解放せずに処理を終えると、どんどん接続中の人数が増え、最終的にはアクセスできなくなります。

プログラムを変更して、コンパイル、実行をしてください。
以下のような結果が表示されます。
※後半は省略

```text
 --- before connection ---
 --- after connection ---
1 
Alice
alice@test.co.jp
2
Bob
bob@test.co.jp
...
```

---

## Eclipseで実行

先ほど実行したDbAccess.javaを、今度はEclipse上で実行させます。
注意点として、実行環境が変われば必要な設定も変わる、ということです。
コマンド プロンプトでJDBCを認識させるためには環境変数CLASSPATHの設定をしましたが、Eclipseではビルド・パスの設定が必要となります。

新しくJavaプロジェクトを作成してください。
　(プロジェクト名:DbAccess)
パースペクティブを「Java」に変更してください。
先ほど動作確認ができた「DbAccess.java」を、作成したプロジェクトの「src」にコピーしてください。

このままの状態で実行してください。
以下のようなエラーが表示されます。

```text
java.lang.ClassNotFoundException: org.postgresql.Driver
    at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
    at sun.misc.Launchar$AppClassLoader..loadClass(Launchar.java:331)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
    at java.lang.Class.forName0(Native Method)
    at java.lang.Class.forName(Class.java:264)
    at DbAccess.main(DBAccess.java:14)
```

Eclipseで実行する環境で、JDBCドライバーが認識できていないという状態です。
設定方法はいくつかありますが、「ユーザー・ライブラリー」として設定を行います。

---

1. プロジェクトを右クリックし、ビルド・パス」⇒「ライブラリーの追加」を選択します。

![picture 7](/images/747021a193b764df28d68157d7c562257e0d2ddcc20e11b77c5bbaa00d78863b.png)  

1. ユーザー・ライブラリーを選択し、次へを選択します。
2. ユーザー・ライブラリーを選択します。
3. 新規を選択します。
4. ユーザーライブラリ名に「PostgreSQL JDBC」と入力し、OKを選択します。
5. 外部 JAR の追加を選択します。
6. インストール済みのJDBCドライバー(postgresql-42.2.10.jar)を選択します。
7. 「適用して閉じる」を選択し、最後に完了を選択します。

これで設定は完了です。

---

ビルド・パスの設定が完了したら、もう一度実行してください。
以下のように表示されます。

```text
 --- before connection ---
 --- after connection ---
1 
Alice
alice@test.co.jp
2
Bob
bob@test.co.jp
...
```

---

## 更新系SQL

DbAccess2.javaを「DbAccess」のプロジェクトにコピーしてください。
INSERT文の実行を行います。

DbAccess2.java

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbAccess2 {
    public static void main(String[] args) {
        Connection con = null;
        PreparedStatement stmt = null;

        try {
            // load JDBC Driver
            Class.forName("org.postgresql.Driver");

            // confirm
            System.out.println(" --- before connection --- ");

            // database connect
            con = DriverManager.getConnection("jdbc:postgresql:testdb", "testuser", "test");

            // confirm
            System.out.println(" --- after connection --- ");

            // SQL query string
            String sql = "INSERT INTO users VALUES (10, 'taro', 'taro@gmail.com')";

            // create statement
            stmt = con.prepareStatement(sql);

            // execute
            ResultSet rs = stmt.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // close
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

---

以下のようなエラーが発生します。

```text
 --- before connection ---
 --- after connection ---
org.postgresql.util.PSQLException: いかなる結果も、クエリによって返されませんでした。
        at org.postgresql.jdbc.PgPreparedStatement.executeQuery(PgPreparedStatement.java:118)
        at DbAccess2.main(DbAccess2.java:32)

```

プログラムでエラーが発生しましたが、SQLは実行されています。
テーブルの中身をSELECT文で確認してください。
(確認方法は「データベース基礎」の章を参照してください)

```sql
testdb=> select * from users where id = 10;
```

| id | name | mail | pass |
|--:|:--|:--|:--|
| 10 | taro | taro@gmail.com |  |

---

先ほどのエラーは、executeQueryメソッドの戻り値がINSERT文に対応していないことが原因です。
具体的に、Java APIドキュメントで調べていきます。

[APIドキュメント](https://docs.oracle.com/javase/jp/11/docs/api/java.sql/java/sql/PreparedStatement.html#executeQuery())

Java APIドキュメントには以下のように書かれています。
やや分かりにくい表現ですが、ここでいう「クエリ―」とはSELECT文を指しています。

![picture 10](/images/f8afe76066057507451aa796360e575193b55dde67dc8f25a66bb87c4b2de3ed.png)  

INSERT文（や、その他DMLやDDL）の実行には、代わりにexecuteUpdateメソッドを使用します。

[executeUpdate](https://docs.oracle.com/javase/jp/11/docs/api/java.sql/java/sql/PreparedStatement.html#executeUpdate())

---

下記のように、executeQueryを使用していた部分をコメントアウトし、代わりにexecuteUpdateメソッドを使用してINSERT文を実行してください（戻り値や挿入する値も書き換えてください）。

```java
// SQL query string
// String sql = "INSERT INTO users VALUES (10, 'taro', 'taro@gmail.com')";
String sql = "INSERT INTO users VALUES (11, 'taro2', 'taro2@gmail.com')";


// create statement
stmt = con.prepareStatement(sql);

// execute
//ResultSet rs = stmt.executeQuery();
stmt.executeUpdate();
```

---

実行すると、以下のような結果が表示されます。

```text
 --- before connection ---
 --- after connection ---
```

実行した結果が正しいか、テーブルの中身をSELECT文で確認してください。

```sql
testdb=> select * from users where id = 11;
```

| id | name | mail | pass |
|--:|:--|:--|:--|
| 12 | taro2 | taro2@gmail.com |  |

---

## SQLインジェクション

ここからはDBを使用する上で気をつけなければいけない、セキュリティについて見てみます。

「DbAccess3.java」を「DbAccess」のプロジェクトにコピーしてください。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbAccess3 {
    public static void main(String[] args) {
        // parameter
        String param = "test";
        int param2 = 100;
        
        Connection con = null;
        PreparedStatement stmt = null;

        try {
            // load JDBC Driver
            Class.forName("org.postgresql.Driver");

            // confirm
            System.out.println(" --- before connection --- ");

            // database connect
            con = DriverManager.getConnection("jdbc:postgresql:testdb", "testuser", "test");

            // confirm
            System.out.println(" --- after connection --- ");

            // SQL query string
            String sql = "SELECT * FROM users WHERE name = '" + param + "'" + " OR id = " + param2;

            // create statement
            stmt = con.prepareStatement(sql);

            // execute
            ResultSet rs = stmt.executeQuery();

            // output
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String mail = rs.getString("mail");

                System.out.println(id);
                System.out.println(name);
                System.out.println(mail);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // close
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

---

変数paramは「外部から与えられた値」を想定しています。
そしてその値をSQL文のWHERE句に組み込んでいます。

実行すると、以下のような結果が表示されます。

```text
 --- before connection ---
 --- after connection ---
```

user_nameが「test」または、user_idが「100」のデータが居なければ情報は1レコードも取得されません。

---

次に、以下のように変更して、再度実行してください。

```java
// parameter
String param = "test' OR '1' = '1";
```

以下のような結果が表示されます。

```text
 --- before connection ---
 --- after connection ---
1
Alice
alice@test.co.jp
2
Bob  
bob@test.co.jp
3
Chris
chris@test.co.jp
4
佐藤 
sato@gmail.com
5
鈴木 
suzuki@yahoo.co.jp
6
田中 
tanaka@gmail.com
```

---

先ほどのプログラムでは、以下のようなSQLが発行されます。

```sql
SELECT * FROM users WHERE user_name = 'test' OR '1' = '1' OR　id = 100;
```

このWHERE句は全レコードにマッチするため、全ての情報が引き出されることになります。
このように、Webサイトのフォームなどでパラメーターの一部にSQLを打ち込み、本来意図していない動作をさせるような行為をSQLインジェクションといいます。
このようなセキュリティの脆弱性は開発者が責任を持って対処しておかなければいけません。

---

この結果は「SQL文に値を直接結合した」ために発生しました。
対策は文字列結合をやめ、**プレースホルダー**と呼ばれる機能を使用することです
以下のように変更して、実行結果を確認してください。

```java
String sql = "SELECT * FROM users WHERE name = ? OR id = ?";

// create statement
stmt = con.prepareStatement(sql);
stmt.setString(1, param);
stmt.setInt(2, param2);
```

結果

```text
 --- before connection ---
 --- after connection ---
```

---

パラメーターの一部にSQLを打ち込まれても、問題は起きません。
変更した内容を確認していきます。
作成したSQLに「?」と書かれている部分があります。
この「?」をプレースホルダーといい、この部分に後から値を埋め込むことができます。

「setStringメソッド」「setIntメソッド」を呼び出すことで「?」に値を埋め込んでいます。
第1引数は何番目の「?」に埋め込むのか、第2引数に実際に埋め込む値を指定します。

変数paramはString型なので「setStringメソッド」を使用して、変数param2はint型なので「setIntメソッド」を使用するなど、埋め込む値の型によってさまざまなメソッドが提供されています。

このように、 PreparedStatementとプレースホルダーを使用することでSQLインジェクションは、ほぼ完全に対策することができます。
変数の値をSQL文に埋め込む際には、文字列結合でSQL文を生成することは避け、**必ず**プレースホルダーを使用してください。

---

## try-with-resources

ファイルやデータベースにアクセスすると、リソースの解放をするために、close処理をする必要があります。
毎回close処理を書くのも大変ですし、忘れるとメモリリークの原因にもなります。
そこで、try-with-resouces文を使うことで、これらの問題を解決することができます。

サンプルプログラム「DbAccessKai.java」を確認してください。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbAccessKai {
    public static void main(String[] args) {
        // SQL query string
        String sql = "SELECT * FROM users";

        try {
            // load JDBC Driver
            Class.forName("org.postgresql.Driver");

            // try-with-resource
            try (Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/testdb", "testuser", "test");
                    PreparedStatement stmt = con.prepareStatement(sql)) {

                // execute
                ResultSet rs = stmt.executeQuery();

                // output
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String mail = rs.getString("mail");

                    System.out.print(id + "\t");
                    System.out.print(name + "\t");
                    System.out.println(mail);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

try」のすぐ後ろにクローズする対象の変数等を定義します。
対象が複数ある場合は、セミコロンで区切ります。
この方法を使うことで、finallyブロックでclose()を呼び出さなくても自動でcloseをしてくれるようになります。
