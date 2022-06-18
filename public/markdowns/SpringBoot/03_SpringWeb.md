# SpringWebMVC

---

Java EEでのSpringの利用方法を見ていきます。
WebアプリケーションはMVCアーキテクチャと呼ばれる設計手法で構築されることが多くなっています。
以下のように「三つの役割」に分割してアプリケーションを設計する手法をMVCパターンあるいはMVCアーキテクチャといいます。

* M：Model モデル
* V：View ビュー
* C：Controller コントローラー

---

MVCアーキテクチャに則って設計されたWebアプリケーションフレームワークは数多くあります。
その中でもSpringエコシステムの一つとして開発されているのがSpring Web MVCです。
Spring Framework上で動作するMVCフレームワークで、Spring MVCとも呼ばれています。

---

各名称と役割。

||M|V|C|
|:--|:--|:--|:--|
|名称|Model|View|Controller|
|役割|データとビジネスロジックを担当する|Modelのデータを表示する|ユーザーの入力を受け取りModelを呼び出し、Viewへ通知する|
|Spring Web MVCでいうと|Modelインターフェース。ドメイン層のデータはModelの属性としてViewに渡される|JSPやThymeleafなど|@Controllerを付与したクラス|

---

パースペクティブをJavaEEに変えてください。
[ファイル]>[新規]>[Springスターター・プロジェクト]を選択して、プロジェクトを作成します。
以下のように各項目を入力してください。
※パッケージングは必ず「War」にしてください。
※パッケージは「com.example.demo」にしてください。

![picture 4](/images/78e771d0203d3be7631d8adeed7337a314f816ca4702ec6e4ef794bdfdcc0539.png)  

---

「Spring Web」にチェックを入れてください。

![picture 5](/images/cbcf5a77a4c2ae2e014d11647b147286b963d4b290f92380ed0bc08b787424d1.png)  

---

必要なライブラリなどをダウンロードするため、画面の右下に以下のような表示が出るので、消えるまで待ってください。

![picture 6](/images/7fcf1673a8d7771232186c1992afe71efb765afe6b1679bd046a489d4ed13617.png)  

---

以下のような構成になっていれば作成は完了です。

![picture 7](/images/b9630281ac42f01db26d69f45c2daa22f34985eb612f66b434c2bd800212479d.png)  

---

pom.xmlの内容を確認すると、先ほどチェックを入れたWebが設定されていることがわかります。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

---

この状態だと、「Spring Boot アプリケーション」で実行した際にJSPが実行できないため、以下を追記してください。
Tomcatで動作させる場合は問題ありませんが、Spring Bootの場合はJSPのライブラリが参照されていないためエラーになります。

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>

    ～(略)～
</dependecies>

```

---

Spring Web MVCを利用したプログラムを作成します。
以下のファイルを作成・変更します。

* application.properties
* TestController.java
* index_mvc.jsp

---

### application.properties

WEB-INF内の「views」フォルダーにビューファイルを配置することをSpring側にわかるよう設定情報を記述します。
src/main/resources内にあるapplication.propertiesを以下のように変更してください。

```text
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

TestController.java

```java
package com.example.demo.controller;

@Controller
public class TestController {

    @RequestMapping("/test")
    public String index(Model model) {
        model.addAttribute("msg", "Hello MVC!");

        return "index_mvc";
    }
}
```

---

index_mvc.jsp

JSPは以下のフォルダー構成にして配置してください。
「src/main/webapp」フォルダーに「WEB-INF」フォルダーを作成⇒「WEB-INF」フォルダーに「views」フォルダーを作成⇒「views」フォルダーに「index_mvc.jsp」を作成。
（フォルダーは作成したい場所の上で右クリック⇒新規⇒フォルダー)

![picture 8](/images/c18e4603d78ba7c0fbb551c31e6f55ddea3eaac9467ea67b758161e48994594c.png)  

---

index_mvc.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

<p>ここに受け取ったメッセージが表示されます。</p>
<p>${msg}</p>

</body>
</html>
```

---

実際に実行して、結果を確認します。
実行方法は二種類あり、対象のプロジェクトを右クリックして「サーバーで実行」か「Spring Boot アプリケーション」のどちらかを選択します。
実行後、ブラウザからURLにアクセスしてください。
※JSPファイルを指定して実行することはできないので注意してください。

### サーバーで実行

通常通りTomcat上で実行します。（バージョンは9を選択する）
実行後、アドレスバーに下記のURLを入力してください。
(実行時にエラーが出ても、URLアクセス時にエラーが出なければ良いです)
URLは  
http://localhost:8080/Spring-Web-MVC/test  
となります。

### Spring Boot アプリケーション

サーバーを利用せず、単独（スタンドアローン）で実行します。
実行後、GoogleChromeなどのブラウザで下記URLにアクセスします。
URLは  
http://localhost:8080/test  
となります。

※「サーバーで実行」を選択した場合は、SpringBootのプロジェクトとは別でEclipseに梱包されているTomcatを起動し、そのサーバー上で起動します。
Tomcatでは１つのサーバー上で複数のプロジェクトが起動可能となっており、URLにプロジェクト名（コンテキストパス）を指定する必要があります。

SpringBootではプロジェクト内にTomcatが梱包されているため、プロジェクト単独でサーバーを起動することができます。

---

実行方法はどちらでもかまいません。
URLに注意してアクセスをし、以下のように表示されることを確認してください。

結果

```text
ここに受け取ったメッセージが表示されます。

Hello MVC!
```

---

作成・変更した内容を確認していきます。
まずはapplication.propertiesです。
「spring.mvc.view.prefix」は、ビューを指定する際に、ビュー名の前に付与される文字列です。
「spring.mvc.view.suffix」は、ビューを指定する際に、ビュー名の後に付与される文字列です。
例えば、ビュー名が「index」の場合、読み込まれるファイルのパスは、「/WEB-INF/views/index.jsp」となります。

```text
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

続いてTestController.javaです。
このクラスはMVCのコントローラーの役割となるため、@Controllerアノテーションを付与しています。
次にindexメソッドですが、@RequestMapping("/test")というアノテーションが付与されています。
これはリクエストマッピングと呼ばれ、「URLとメソッドを紐づける」役割を持っています。
また、indexメソッドは引数にModel型を指定しています。
処理として、addAttributeメソッドを使用していますが、このように値を追加することで、ビューへ値を渡すことができます。

```java
package com.example.demo.controller;

@Controller
public class TestController {

    @RequestMapping("/test")
    public String index(Model model) {
        model.addAttribute("msg", "Hello MVC!");

        return "index_mvc";
    }
}
```

---

それでは、さらに機能を追加していきます。
まず、pom.xmlに以下の依存関係を追記してください。
JSTLを使用できるようにします。

```xml
<dependencies>    
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
</dependency>

    ～(略)～
</dependecies>
```

---

## formタグライブラリ - 1

ここまでのプロジェクトをベースに、以下の動作をする機能を追加します。
フォームは「/result」に対してPOST送信を行う。

![picture 9](/images/4287e81b3cff8ce7516b304074f32c1a7f56128042fbf11fdb0e7db739dc615b.png)  

フォームを実装するにあたって、以下の三つのファイルを作成・変更しています。

* TestForm.java
* TestController.java
* index_mvc.jsp

---

TestForm.java

```java
package com.example.demo.controller.form;

public class TestForm {

    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}

```

---

TestController.java

```java
package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.controller.form.TestForm;

@Controller
public class TestController {

    @RequestMapping("/test")
    public String index(@ModelAttribute("test") TestForm form, Model model) {
        model.addAttribute("msg", "Hello MVC!");
        return "index_mvc";
    }

    @RequestMapping(value="/result", method=RequestMethod.POST)
    public String post(@ModelAttribute("test") TestForm form, Model model) {
        model.addAttribute("msg", "You write " + form.getText() + " !!!!!!");
        return "index_mvc";
    }

}
```

---

index_mvc.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

<p>ここに受け取ったメッセージが表示されます。</p>
<p>${fn:escapeXml(msg)}</p>

<form:form action="result" modelAttribute="test">
  <form:input path="text" />
  <form:button>送信</form:button>
</form:form>

</body>
</html>
```

---

まずはTestForm.javaから確認します。
「text」という名前のフィールドと、そのアクセサーのみ定義されています。
このクラスはフォームから送信されたパラメーターを格納するためのものです。
受け取るパラメーター名とフィールド名を一致させます。

```java
public class TestForm {

    private String text;
```

---

続いてTestController.javaです。
メソッドに@ModelAttributeを付与した引数を宣言しています。
リクエストマッピングが実行される際に自動的に生成され、リクエストスコープにも設定されます。
今回はPOSTで送信されたリクエストを受け付けるので、アノテーションのmethod引数で指定しています。
postメソッドの引数にはTestFormを指定していますが、パラメーターが自動的に格納された状態で受け取ることができます。

```java
@RequestMapping("/test")
public String index(@ModelAttribute("test") TestForm form, Model model) {
    model.addAttribute("msg", "Hello MVC!");
    return "index_mvc";
}

@RequestMapping(value="/result", method=RequestMethod.POST)
public String post(@ModelAttribute("test") TestForm form, Model model) {
    model.addAttribute("msg", "You write " + form.getText() + " !!!!!!");
    return "index_mvc";
}
```

---

最後にindex_mvc.jspです。
ページ上部に、Springが提供しているformタグライブラリを利用するための宣言が追加されています。
フォームは追加したformタグライブラリを使用しています。
modelAttribute属性の「test」というのは、このフォームで使用するモデルの名前を指定してます。
またmethod属性はデフォルトでPOSTとなります。
テキストボックスなどもformタグライブラリのものを使います。
name属性ではなくpath属性を指定していますが、これはmodelAttributeで指定したオブジェクトのどのプロパティと対応付けるのかを指定しています。

```html
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

（略）

<form:form action=“result" modelAttribute="test">
  <form:input path="text" />
  <form:button>送信</form:button>
</form:form>

```

---

## formタグライブラリ - 2

次に、テキストボックスを1つ追加して、初期値を表示する方法について見ていきます。
TestForm.javaに「name」という名前のフィールドと、そのアクセサーを追加してください。

```java
package com.example.demo.controller.form;

public class TestForm {

    private String text;
    private String name;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

```

---

TestController.java

```java
package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.controller.form.TestForm;

@Controller
public class TestController {

    @RequestMapping("/test")
    public String index(@ModelAttribute("test") TestForm form, Model model) {
        model.addAttribute("msg", "Hello MVC!");
        form.setName("名前を入力してください");
        return "index_mvc";
    }

    @RequestMapping(value="/result", method=RequestMethod.POST)
    public String post(@ModelAttribute("test") TestForm form, Model model) {
        model.addAttribute("msg", "You write "
                + form.getText() + form.getName() + " !!!!!!");
        return "index_mvc";
    }

}
```

---

画面を表示する際に、formクラスのセッターを呼ぶことで、そのフィールドに対応するテキストボックスの初期値を表示させることができます。
また、追加したテキストボックスの値も表示できるように追加しています。

---

index_mvc.jsp

テキストボックスを1つ追加してTestForm.javaに追加した「name」フィールドに対応させます。

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

  <p>ここに受け取ったメッセージが表示されます。</p>
  <p>${fn:escapeXml(msg)}</p>

  <form:form action="result" modelAttribute="test">
    <form:input path="text" /><br>
    <form:input path="name" />
    <form:button>送信</form:button>
  </form:form>

</body>
</html>
```

---

実行結果を確認してください。
追加したテキストボックスに初期値が表示されます。
また、送信ボタンをクリック後、入力した結果が表示されます。

![picture 10](/images/ec5dfe4bd2fa2ae163e74e19ae0d60b9c3f9e5a886578a8b56834b8d932c9900.png)  

---

以下が全体像のイメージです。

![picture 11](/images/e9f4d879b0104b1d6609a54d51de600f64ab83dff26faae9794027740b729dc3.png)  

---

index_mvc.jspとTestController.javaの対応部分_1

![picture 12](/images/40c4ff362d59dde46860db9959093e845c3d48974f686cc5140b427239c71729.png)  

---

index_mvc.jspとTestController.javaの対応部分_2

![picture 13](/images/63b8e3b84a1a8683a926e6956406a4227152bdf8ea6108570dd1199eacbac41f.png)  

---

index_mvc.jspとTestForm.javaの対応部分

![picture 14](/images/71ba0fb55bbbf324cb8a430dd27fd2100b657df59e1d9be5172057e63f963644.png)  

---

TestForm.javaとTestController.javaの対応部分

![picture 15](/images/b3ccb79d5241fe9985db6d2589cbc6a00afc91d90eebb53e7a8f6a9256885ee8.png)  

---

formタグライブラリで提供されているタグ

|タグ|解説|
|:--|:--|
|form:form|\<form\>を出力|
|form:input|\<input type="text"\>を出力|
|form:checkbox/form:checkboxes|\<input type="checkbox"\>を出力|
|form:radiobutton/form:radiobuttons|\<input type="radio"\>を出力|
|form:password|\<input type="password"\>を出力|
|form:select/form:option/form:options|\<select\>と\<option\>を出力|
|form:textarea|\<textarea\>を出力|
|form:hidden|\<input type="hiddent"\>を出力|
|form:errors|検証エラーを出力|

---

### formタグライブラリ - 3

次に、押したボタンによって遷移先を変える方法について見ていきます。
「Spring-Web-MVC-Params」という名前のプロジェクトを作成し、以下のソースコードを追加してください。

---

index.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

  <form:form action="result" modelAttribute="index">
    <div>
      送信値
      <form:input path="input" />
    </div>
    <br>
    <form:button name="param1">結果画面1へ送信</form:button>
    <form:button name="param2">結果画面2へ送信</form:button>
  </form:form>

</body>
</html>
```

---

result1.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

  <p>結果画面1</p>
  <p>${fn:escapeXml(msg)}と入力されました。</p>

  <a href="index">戻る</a>

</body>
</html>
```

---

result2.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>

  <p>結果画面2</p>
  <p>${fn:escapeXml(msg)}と入力されました。</p>

  <a href="index">戻る</a>

</body>
</html>
```

---

IndexController.java

```java
package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.controller.form.IndexForm;

@Controller
public class IndexController {

    // 入力画面へ
    @RequestMapping("/index")
    public String index(@ModelAttribute("index") IndexForm form, Model model) {
        return "index";
    }

    // 結果画面1へ
    @RequestMapping(value = "/result", params = "param1", method = RequestMethod.POST)
    public String result1(@ModelAttribute("index") IndexForm form, Model model) {
        model.addAttribute("msg", form.getInput());
        return "result1";
    }

    // 結果画面2へ
    @RequestMapping(value = "/result", params = "param2", method = RequestMethod.POST)
    public String result2(@ModelAttribute("index") IndexForm form, Model model) {
        model.addAttribute("msg", form.getInput());
        return "result2";
    }

}
```

---

IndexForm.java

```java
package com.example.demo.controller.form;

public class IndexForm {

    private String input;

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

}
```

---

プロジェクトを実行して、以下の処理を確認してください。
アクセスするURLは以下の通りです。

![picture 16](/images/7ebec4fd8fbb4b55abd93a5f4e5664a4b8a2e374f5c3edb0c03d27ba36ebb080.png)  

---

押したボタンによって、遷移先を変える場合

index.jsp

```html
<form:button name="param1">結果画面1へ送信</form:button>
<form:button name="param2">結果画面2へ送信</form:button>
```

name属性に、遷移先に渡す値(パラメータ)を指定する
この場合は、結果画面1のボタンクリック時、「param1」結果画面2のボタンクリック時、「param2」が渡される。

IndexController.java

リクエストマッピングの「params」にパラメータ値を指定できる。
遷移先が同じURLでも、渡されたパラメータによって、行うメソッドを変えられます。

```java
// 結果画面1へ
@RequestMapping(value = "/result", params = "param1", method = RequestMethod.POST)

// 結果画面2へ
@RequestMapping(value = "/result", params = "param2", method = RequestMethod.POST)
```

---

result1.jsp

結果画面から入力画面に戻る際は、aタグを利用しています。
formタグライブラリで提供されているタグは、基本的に入力値等を次の画面に渡したり、受け取ったりする際に使用します。
入力値等を渡さずに遷移する場合は、通常のformタグとbuttonタグやaタグを使ってください。

```html
<a href="index">戻る</a>
```

---

### formタグライブラリ - 4

次に、プルダウンを使う方法について見ていきます。
以下のような画面を作成します。

![picture 17](/images/7743d5dcdc6ec41fb89b2985cb2efd25a425958ef0c65881802f87dedac6cd4c.png)  

---

「Spering-Web-MVC-Select」の名前で新しくSpringスタータープロジェクトを作成してください。
Spring Webにチェックを入れて作成してください。

以下のファイルを作成・変更します。

* pom.xml
* application.properties
* User.java
* IndexForm.java
* IndexController.java
* index.jsp
* result.jsp

---

pom.xml

以下の依存関係(JSPとJSTLのライブラリ)を追記してください

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

application.propertiesの変更

以下の内容を追記してください

```text
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

---

User.java

※これまでに作成したUser.javaと同じ。
usersテーブルに対するentityとして作成する。

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

IndexController.java

```java
package com.example.demo.controller;

@Controller
public class IndexController {

    // 入力画面
    @RequestMapping("/index")
    public String index(@ModelAttribute("index") IndexForm form, Model model) {
        // プルダウンの内容を作成
        // (実際はDaoを使ってDBから取得)
        List<User> userList = new ArrayList<>();
        userList.add(new User(1, "田中", "tanaka@gmail.com"));
        userList.add(new User(2, "鈴木", "suzuki@gmail.com"));

        // プルダウンの内容をmodelにセット
        model.addAttribute("userList", userList);
        // 入力画面へ
        return "index";
    }

    // 結果画面
    @RequestMapping(value = "/result", method = RequestMethod.POST)
    public String result(@ModelAttribute("index") IndexForm form, Model model) {
        // 選択したidを取得
        int id = form.getId();

        // idを元に、userオブジェクトを作成
        // (実際は、DBから取得した値を使う)
        User user = null;
        switch (id) {
        case 1:
            user = new User(1, "田中", "tanaka@gmail.com");
            break;
        case 2:
            user = new User(2, "鈴木", "suzuki@gmail.com");
            break;
        }

        // userオブジェクトをmodelにセット
        model.addAttribute("user", user);

        // 結果画面へ
        return "result";
    }

}

```

---

### index.jsp / result.jsp

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

index.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>
  <form:form action="result" modelAttribute="index">
    <div>
      <label>ユーザー</label>
      <form:select path="id">
        <form:options items="${userList}" itemLabel="name" itemValue="id" />
      </form:select>
    </div>
    <form:button>送信</form:button>
  </form:form>
</body>
</html>
```

---

result.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Web MVC Test</title>
</head>
<body>
  <p>結果画面</p>
  <p>${fn:escapeXml(user.name)}さんを選択しました</p>
  <a href="index">戻る</a>
</body>
</html>
```

---

プロジェクトを実行して、以下の処理を確認してください。
アクセスするURLは以下の通りです。

サーバー ：http://localhost:8080/Spring-Web-MVC-Select/index  
Spring Boot ：http://localhost:8080/index  

![picture 18](/images/6e797d49baeeb78398071d775d60665726584dcdd81b5b9ea5be417ed1b97f70.png)  

---

作成したプログラムの説明をしていきます。
以下は画面遷移のイメージです。

![picture 19](/images/2ee25c2ad5a77c2e25bbcafa9f237cf09dde47c7aa4aa2593a7e32c7c059c1f2.png)  

---

IndexController.java

indexメソッドで、URL「/index」にアクセスされた際に、index.jspを表示しています。
indexメソッド内では、ビュー表示前に、プルダウンの内容を作成しビューへ渡しています。
プルダウンの内容としてListにUserオブジェクトを2つ入れています。

```java
// 入力画面
@RequestMapping("/index")
public String index(@ModelAttribute("index") IndexForm form, Model model) {
    // プルダウンの内容を作成
    // (実際はDaoを使ってDBから取得)
    List<User> userList = new ArrayList<>();
    userList.add(new User(1, "田中", "tanaka@gmail.com"));
    userList.add(new User(2, "鈴木", "suzuki@gmail.com"));

    // プルダウンの内容をmodelにセット
    model.addAttribute("userList", userList);
    // 入力画面へ
    return "index";
}
```

---

index.jspでは
\<form:select\>タグと\<form:options\>タグを使って、プルダウンを表示しています。

```html
<form:select path="id">
  <form:options items="${userList}" itemLabel="name" itemValue="id" />
</form:select>
```

pathはformクラスのフィールドと対応している。

itemsではControllerから渡されたuserList内のデータの数だけプルダウンの内容が表示される。

itemLabelではnameと書くと、対象オブジェクトのgetNameメソッドの結果が選択肢の内容として表示される。

itemValueではidと書くと、対象オブジェクトのgetIdメソッドの結果が選択肢を選んだ際の送信値になる。

---

\<form:select\>タグと\<form:options\>タグはformタグライブラリを使わずに書くと以下の書き方になります。
formタグライブラリを使うことで記述量を少なくできます。

通常の書き方

```html
<select name="id">
  <c:forEach var="user" items="${userList}">
    <option value="${user.id}">${user.name}</option>
  </c:forEach>
</select>
```

formタグライブラリの使用

```html
<form:select path="id">
  <form:options items="${userList}" itemLabel="name" itemValue="id" />
</form:select>
```

---

index.jspの遷移先はURL：「result」になっています。

```html
<form:form action="result" modelAttribute="index">
```

resultメソッドで、URL「/result」にアクセスされた際に、result.jspを表示しています。
resultメソッド内では、ビュー表示前に、選択したプルダウンの値を取得し、対応するオブジェクトをビューへ渡しています。

```java
// 結果画面
@RequestMapping(value = "/result", method = RequestMethod.POST)
public String result(@ModelAttribute("index") IndexForm form, Model model) {
    // 選択したidを取得
    int id = form.getId();

    // idを元に、userオブジェクトを作成
    // (実際は、DBから取得した値を使う)
    User user = null;
    switch (id) {
    case 1:
        user = new User(1, "田中", "tanaka@gmail.com");
        break;
    case 2:
        user = new User(2, "鈴木", "suzuki@gmail.com");
        break;
    }

    // userオブジェクトをmodelにセット
    model.addAttribute("user", user);

    // 結果画面へ
    return "result";
}
```

---

result.jspではControllerから渡されたUserオブジェクトを使って、選択したユーザー名を表示しています。

```html
<p>${fn:escapeXml(user.name)}さんを選択しました</p>
```

戻るリンクの遷移先はURL：「index」となっているため、Controllerを介して、「index.jsp」へ戻ります.

```html
<a href="index">戻る</a>
```

---

## 自動リロード

Spring Bootアプリケーションを開発する場合、以下の依存関係を追加しておくと、ファイルを変更して保存するたびに自動的にリロードされるようになります。
設定していない場合は、サーバーを再起動しないと変更内容が反映されませんが、自動リロードの設定をしておけば、サーバーの再起動がある程度不要になります(変更内容によっては、設定していても再起動が必要な場合もあります)。

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
    </dependency>

    ～(略)～
</dependecies>

```
