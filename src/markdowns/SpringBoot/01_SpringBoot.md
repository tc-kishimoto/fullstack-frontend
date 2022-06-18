# SpringBoot

---

## フレームワークとは

* 世間一般の「フレームワーク」とは
  * 枠組み、骨組み、骨格、下部構造、構造、組織などの意味を持つ英単語です。
* プログラミングを行う上での「フレームワーク」とは
  * アプリケーションソフトを開発する際によく必要とされる汎用的な機能をまとめて提供し、アプリケーションの土台として機能するソフトウェアを指します。

---

## 主なJavaのフレームワーク

* Spring Framework
* Seasar2
* Hibernate
* MyBatis
* Play Framework
* Struts2
* Wicket

---

## Spring Framework

Spring Frameworkとは、Javaプラットフォーム向けのオープンソースアプリケーションフレームワークです。
DIやAOPをサポートしており、軽量コンテナーとも呼ばれます。
Java EEなどの特定のプラットフォーム向けではなく、Java SEなどでも使用できる汎用的なフレームワークとされています。
単一のフレームワークではなく、複数のフレームワークの集合体がSpring Frameworkです。

---

Spring Frameworkのコンセプト
コアとなるDIコンテナーを提供し、他はモジュールとして提供することで広範囲へ適用できます。

![picture 26](/images/e513a764fa618206b15d8f957bf5dfa2b9d21860fec495ce6a4ffabf4ec43b89.png)  

---

### DI（Dependency Injection）とは

「依存性の注入」という意味です。
オブジェクト間で依存性のあるコンポーネントを実行時に注入するという設計思想です。
例えば、インスタンスAがインスタンスBを利用（依存）する場合に、「インスタンスBの生成をインスタンスAの内部で行う」のではなく、「外部（DIコンテナー）で生成しインスタンスAに注入する」という考え方です。

図にすると以下が今まで書いてきたプログラムのイメージ図です。

![picture 27](/images/41e9b37711fdce684c0dbcc627ebca06a0435599785cd8755a93274e89a75340.png)  

---

そして、以下がDIを利用しインスタンスを外部から注入するプログラムのイメージです。
インスタンスAとインスタンスBはDIコンテナーが生成・管理します。

![picture 28](/images/9100f1eb56d57901edadbf9ef6ebff89be6dc98a34ee9dc5628d116749987dfd.png)  

---

### DIによるメリット

DIは「あるクラスに必要となる別のクラスのインスタンスを設定すること」とも言えます。
この機能を使用することで、オブジェクト間を疎結合(結びつきが弱く、独立性が強いこと)にすることができます。
これにより、以下のようなメリットが得られます。

* テストがしやすくなる
* 実装の切り替えが容易になる

---

![picture 29](/images/e52a4ed67a60f7344333950caaa6d390e3baf362a4b6a66edd32c1c5524852dd.png)  

クラス内で直接インスタンス生成インスタンスを切り替えたい場合、ソースを直接変更する必要がある。

![picture 30](/images/6c2e8d76c6281e3cfdf701a2d5c8c90d83af8b435e13ec428dc47ee744997ce9.png)  

クラス内ではフィールドのみ定義しておき、代入されるインスタンスを設定するだけで利用できるようになる。

---

## STSの導入

STSはpleiadesのバージョン(2018-12のバージョンでのみ確認済)によっては、既にインストール済みなので、STSの導入部分は飛ばして問題ありません。

STS（Spring Tool Suite）とは
Spring Frameworkの開発元であるSpringSource社が提供しているSpring開発専用の統合開発環境です。
STSはダウンロードページからZIPファイル、もしくはインストーラー形式で入手可能です。
または、すでにインストール済みのEclipseに更新サイトからインストールすることも可能です。
※本研修で使用しているEclipseは既にSTSがインストール済のため、対応不要です。

---

## Java SEでSpringを使う

まずは今まで作ってきたようなプログラムを作成し、それを元にDIとは何かを確認していきます。

### Spring Bootとは

本テキストでは、「Spring Boot」を使用してプログラムを作成します。
Spring Bootは、Springに搭載されているフレームワークの1つです。

Springはフレームワークの集合体であり、機能に応じた多数のフレームワークで構成されているため、複数のフレームワークを組み合わせて使用する際に、設定が複雑化してしまう欠点がありました。
Spring Bootは、上記の欠点を解消するために作られており、設定のためのXMLファイルなどを可能な限り自動設定する機能が搭載されています。
最小限の記述でアプリケーションを作成することが可能です。

---

## DIのないプログラム

プロジェクトを作成します。
パースペクティブを「JavaEE」に切り替えます。
「ファイル」>「新規」>「Springスターター・プロジェクト」を選択します。

---

以下の内容で入力し、次へボタンを押します。

* 名前：SpringDI-1
* タイプ：Maven Priject  
* Javaバージョン：17
* グループ：com.example.demo
* パッケージ：com.example.demo

![picture 31](/images/47ef0b4693ea363f24d047dad4a829b0dc3b3e2d144ee718d8ab260da1a245f3.png)  

---

次の画面ではチェックを外し、完了を押します。

![picture 32](/images/0c207678e7a6d047371cb95a7c1aa5558b4593cb0c15b78e921f71cf91a79bdd.png)  

必要なライブラリなどをダウンロードするため、画面の右下「入門コンテンツのインポート」の表示が出ます。
100%になるまで待ってください。

---

### DIのない一般的なJavaプログラムの作成

まずはDIを利用しない一般的なJavaのプログラムを実装します。
データベースから「User」テーブルの全データを取得し、その結果を表示するプログラムを作ります。
ただし、Springでのデータベースの使用方法は「Spring-JDBC」のテキストで行うため、ここではデータベースから取得した結果は想定される結果を直接記述します。
また、データベース関連の例外処理などは省略しています。
以下のファイルを作っていきます(実行クラスは最初から作られているため、内容を変更します)

---

作成対象のプログラム

* 実行クラス
  * SpringDIApplication.java
* Service
  * UserService.java
* Dao
  * UserDao.java
* Entity
  * User.java

---

パッケージを間違えるとうまくいかないので、注意してください。
特に、ListとUserクラスはimport対象が複数あるので、注意してください。
下記のパッケージ内にあるクラスをimportしてください。

* List：java.utilパッケージ
* User：com.example.demo.entityパッケージ

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

    public String getUserInfo() {
        return "User [id=" + id + ", name=" + name + ", mail=" + mail + "]";
    }

}
```

---

UserDao.java

```java
package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.User;

public class UserDao {

    public List<User> findAll() {
        List<User> list = new ArrayList<>();

        // 本来は、例外処理が必要
        list.add(new User(1, "田中", "tanaka@gmail.com"));
        list.add(new User(2, "鈴木", "suzuki@gmail.com"));

        return list;
    }
}

```

---

UserService.java

```java
package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.User;
import com.example.demo.dao.UserDao;

public class UserService {
    private UserDao userDao = new UserDao();

    public List<User> findAll() {
        // 本来は、例外処理が必要
        return userDao.findAll();
    }
}
```

---

SpringDi1Application.java

```java
package com.example.demo;

import java.util.List;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@SpringBootApplication
public class SpringDi1Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringDi1Application.class, args);

        UserService userService = new UserService();
        List<User> list = userService.findAll();
        for (User u : list) {
            System.out.println(u.getUserInfo());
        }

    }
}
```

---

結果

```text
User [id=1, name=田中, mail=tanaka@gmail.com]
User [id=2, name=鈴木, mail=suzuki@gmail.com]
```

---

クラスの全体像は以下になります。

![spring-di](/images/springdi1.png)

自動生成されたクラスの内容を見ていきます。
実行ファイルは、プロジェクト作成時に自動的に作られます。
「@SpringBootApplication」というアノテーションは、SpringBootプロジェクトの実行ファイルであることを示しており、このアノテーションが付いたクラスが実行クラスとなります。

```java
@SpringBootApplication
public class SpringDi1Application {
```

---

SpringBootでは、DIなどの機能をSpring用のアノテーションを使うことで使用できるようになります。
ただし、実行クラスのパッケージ以下にあるクラスでしかSpring用のアノテーションを使うことができないため、注意が必要です。

```java
package com.example.demo;

@SpringBootApplication
public class SpringDi1Application {

```

---

今回作成したプロジェクトであれば、実行クラスが「com.example.demo」内にあるため、そのパッケージ以下のクラスのみSpring用のアノテーションが使用できます。

```text
|-src/java/main
  |-com
     |-example
        |-demo
           |-SpringDi1Application.java
           |-dao
             |-UserDao.java
           |-entity
             |-User.java
           |-service
             |-UserService.java
```

---

パッケージの表示方法は「フラット」と「階層」があり、パッケージプレゼンテーションを変えることで、表示方法を変えられます。

![picture 1](/images/3073353e6d77fe638e6e55079b204b656d5043a1e1093d65b386938ab656ed18.png)  

---

また、「SpringBootAplication.run」メソッドは、SpringBootの実行に必要な記述のため、引数の値は自動生成された際の記述のままにしておいてください。

```java
public class SpringDi1Application {

    public static void main(String[] args) {
        // SpringDi1Application.classはクラス名と一致させる
        SpringApplication.run(SpringDi1Application.class, args);

```

---

## DIの使用

それでは、先ほど作成したプログラムを、DIを使用したプログラムに変更していきます。
アノテーションを使用してDIの設定を行います。
まずは、DI関連のアノテーションについて説明します。

---

DI関連のSpringのアノテーション

|アノテーション|意味|
|:--|:--|
|@Component|Springに管理させるコンポーネント（汎用）|
|@Service|サービスを担当するコンポーネント|
|@Repository|データアクセスを担当するコンポーネント|
|@Autowired|Bean設定クラス（あるいはファイル）によって自動生成されたインスタンスを基本的にByTypeで自動的にDIする（複数ある場合、ByNameでDIする）|
|@Qualifier|使用するBeanの候補が複数ある場合、@Autowiredと一緒に使いByNameでDIする|
|@Resource|ByNameでDIをするSpringのアノテーションではない|

---

### DIの使用例

DIコンテナーによるインスタンス管理の設定は、一般的には一部のインスタンスのみ設定します。
インスタンスの切り替えや処理間の間に別の処理を挟んだりする可能性があるような下記のクラスで使用します。
「Controller」「Service」「DAO」
※Controllerについては、「SpringWebMVC」のテキストで説明します。
処理の度にインスタンスが生成され個別のフィールド値を設定するような、下記のクラスにはDIを使用しません。
「Entity」「DTO」

---

以下はアノテーションの使用例です。

UserService.java

```java
@Service
public class UserService {

  @Autowired
  private UserDao userDao;

}
```

DIで管理したい「Service」に@Serviceを付ける。
DIで管理しているインスタンスを入れたいフィールドに@Autowiredを付ける。
⇒DIコンテナーはフィールドのデータ型(UserDao)から判断し、必要と思われるインスタンスを自動的にnewして代入する
※上記の場合、UserDaoのインスタンスが自動的に代入される。

UserDao.java

```java
@Repository
public class UserDao {
}
```

DIで管理したい「Dao」に@Repositoryを付ける。

---

それでは、アノテーションを使ってDIを使用していきます。
DIを使わずに作ったプログラムを変更してください。

UserDao.java

```java
package com.example.demo.dao;

@Repository // 追記
public class UserDao {

```

---

UserService.java

```java
package com.example.demo.service;

@Service // 追記
public class UserService {
    @Autowired // 追記
    private UserDao userDao;

```

---

SpringDi1Application.java

```java
package com.example.demo;

@SpringBootApplication
public class SpringDi1Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = 
            SpringApplication.run(SpringDi1Application.class, args);

        UserService userService = context.getBean(UserService.class);
    }
}
```

---

実行して結果を確認します。

結果

```text
User [id=1, name=田中, mail=tanaka@gmail.com]
User [id=2, name=鈴木, mail=suzuki@gmail.com]
```

DIを使わなかった時と同じ結果が得られます。

---

クラスの全体像は以下になります。

![spring-di](/images/springdi1.png)

DIを使用する前とクラスの全体像は変更ありません。しかし、ソースコード上からnewというキーワードをなくすことができました。

変更した部分について説明していきます。
Daoクラスに@Repositoryアノテーションを付けています。
このアノテーションを付けることで、データアクセスのインスタンスとして、DIコンテナーで管理されます。

```java
@Repository
public class UserDao {
```

---

Serviceクラスに@Serviceアノテーションを付けています。
このアノテーションを付けることで、サービスのインスタンスとして、DIコンテナーで管理されます。

```java
@Service
public class UserService {

```

---

フィールドに@Autowiredアノテーションを付けています。
このアノテーションを付けることで、対象のフィールドにDIコンテナーで管理されているインスタンスが自動的に代入されます。

```java
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

```

実質、下記のように書いたのと同じ

```java
private UserDao userDao = new UserDao();
```

DIコンテナーが必要と思われるインスタンスを自動的に入れてくれる。

---

実行ファイルの方では、DIコンテナーで管理しているインスタンスを直接取得しています。
(先ほどの「@Autowired」はDIコンテナーで管理されているインスタンスでのみ使用可能なため)

```java
public class SpringDi1Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = 
            SpringApplication.run(SpringDi1Application.class, args);

        UserService userService = context.getBean(UserService.class);
    }
}

```

## インターフェースの利用

オブジェクトをDIコンテナーに管理させることによって、オブジェクト同士の依存関係を弱くすることができました。
DIを利用する際にインターフェースの利用は必須ではありませんが、一般的には、インターフェースを組み合わせて、依存関係をより弱くします。
それでは、インターフェースを利用したプログラムを作成します。

---

以下のプロジェクトを作成します。

【プロジェクト名】
・SpringDI-2

【作成するファイル】

* User.Java（Entity）
* UserDao.java（インターフェース）
* PgUserDao.java（上記インターフェースを実装）
* UserService.java（インターフェース）
* UserServiceImpl.java（上記インターフェースを実装）
* SpringDi2Application.java（実行クラス）

---

User.javaの作成

パッケージ：com.example.entity

「SpringDI-1」プロジェクトで作成した「User.java」ファイルと同じ内容のものを作成してください

---

UserDao.javaの作成

```java
package com.example.demo.dao;

public interface UserDao {

    public List<User> findAll();

}

```

---

PgUserDao.javaの作成

```java
package com.example.demo.dao.impl;

@Repository
public class PgUserDao implements UserDao{

    public List<User> findAll() {
        List<User> list = new ArrayList<>();

        // 本来は、例外処理が必要
        list.add(new User(1, "田中", "0311112222"));
        list.add(new User(2, "鈴木", "0571112222"));

        return list;
    }

}

```

---

UserService.javaの作成

```java
package com.example.service;

public interface UserService {

    public List<User> findAll();

}

```

---

UserServiceImpl.javaの作成

```java
package com.example.demo.service.impl;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    public List<User> findAll() {
        // 本来は、例外処理が必要
        return userDao.findAll();
    }
}

```

---

SpringDi2Application.javaの変更

```java
package com.example.demo;

@SpringBootApplication
public class SpringDi2Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(SpringDi2Application.class, args);

        UserService userService = context.getBean(UserService.class);
        List<User> list = userService.findAll();
        for (User u : list) {
            System.out.println(u.getUserInfo());
        }

    }

}
```

---

「SpringDi2Application.java」を実行し、実行結果を確認してください。

```text
User [id=1, name=田中, mail=tanala@gmail.com]
User [id=2, name=鈴木, mail=suzuki@gmail.com]
```

---

クラスの全体像は以下になります。

![spring-di2](/images/springdi2.png)

作成したプログラムについて見ていきます。
ServiceやDAOにインターフェースを使用しています。
作成するファイルは増えましたが、これにより、切り替えるファイルが増えた場合、切り替えが容易になります。

```java
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

```

フィールドのデータ型を「UserDao」インターフェースにしているため、このインターフェースを実装しているクラスのインスタンスであれば、代入することができる(多態性)
⇒直接この部分のソースを変更せずに、DIの設定を変えるだけで、代入するインスタンスを変更できる。

---

それでは、インスタンスの切り替えを行います。
「PgUserDao_Sample.java」を作成してください。

```java
package com.example.demo.dao.impl;

@Repository
public class PgUserDao_Sample implements UserDao{

    public List<User> findAll() {
        List<User> list = new ArrayList<>();

        // 本来は、例外処理が必要
        list.add(new User(0, "ID：最小", "aaaa@gmail.com"));
        list.add(new User(99999, "ID：最大", "zzzz@gmail.com"));

        return list;
    }

}

```

---

PgUserDao.javaの変更

@Repositoryアノテーションをコメントにしてください

```java
//@Repository
public class PgUserDao implements UserDao{
```

「SpringDi2Application.java」を実行し、実行結果を確認してください。

結果

```text
User [id=0, name=ID : 最小, mail=aaaa@gmail.com]
User [id=99999, name=ID : 最大, mail=zzzz@gmail.com]
```

---

クラスの全体像は以下になります。

![spring-di2](/images/springdi3.png)

このように、Serviceクラスの中身を変更せずに、使用するインスタンスを切り替えることできました。
インターフェースを使うことで、インスタンスを切り替える必要が出た場合、容易に切り替えることができます。

---

### DI関連のアノテーションを使用する際の注意点 - 1

@Autowiredをフィールドに付けた場合、そのフィールドに入れることのできるインスタンスがない場合、実行時エラーが発生するので注意してください。

「PgUserDao」と「PgUserDao_Sample」の両方に@Repositoryを付けていない場合、下記のエラーが発生する。

```text
Field userDao in com.example.demo.service.impl.UserServiceImpl required a bean of type 'com.example.demo.dao.UserDao' that could not be found.
```

---

### DI関連のアノテーションを使用する際の注意点 - 2

@Autowiredをフィールドに付けた場合、そのフィールドに入れることのできるインスタンスが複数ある場合、実行時エラーが発生するので注意してください。

「PgUserDao」と「PgUserDao_Sample」の両方に@Repositoryを付けている場合、下記のエラーが発生する。

```text
Field userDao in com.example.demo.service.impl.UserServiceImpl required a single bean, but 2 were found:
```
