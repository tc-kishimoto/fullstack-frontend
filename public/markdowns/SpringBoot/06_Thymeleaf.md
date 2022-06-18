# Thymeleaf

---

## Thymeleafとは

Thymeleaf（タイムリーフ）は、Spring Bootでサポートされているテンプレートエンジンの1つです。
MVCのVIEWをカバーする技術になります。
HTMLに対して「th:」から始まる属性を指定することで、変数の出力や条件分岐、繰り返し処理などを簡単に実装できます。

### テンプレートエンジン

テンプレートエンジンとは、テンプレート（雛形）となるファイルにデータを合成し、結果を出力するソフトウェアのことです。
ThymeleafではテンプレートはHTMLのことを指し、「th:」から始まる特殊な属性によってデータを表現します。

Java EEではJSP(Java Server Pages)がテンプレートエンジンとして使用されていますが、Spring BootではテンプレートエンジンとしてThymeleafの使用を推奨しています。

### JSPとの違い

Tomcatを使ったWebアプリケーションの場合、JSPを使っても同様のことが実現できます。
JSPとTymeleafの違いは、JSPはJSTLと呼ばれるカスタムタグによって処理を実装するのに対し、Tymeleafでは属性の指定で処理を実装します。
JSPを使う場合、HTMLのタグにプラスしてJSTLのタグを埋め込む必要がありますが、Tymeleafの場合はHTMLの構造をそのままに属性の追加だけで済むため、可読性が向上します。

以下は、JSPとTymeleafで同様の処理をした場合の書き方の違いです。

---

変数の出力：JSPの場合

```html
<p><c:out value="${userName}"></p>
```

変数の出力：Tymeleafの場合

```html
<p th:text="${userName}"></p>
```

条件分岐：JSPの場合

```html
<c:if test="${flag}" >
<p>Hello</p>
</c:if>
```

条件分岐：Thymeleafの場合

```html
<p th:if="${flag}">Hello</p>
```

繰り返し処理：JSPの場合

```html
<c:forEach items="${userlist}" var="user">
    <tr>
        <td>${fn:escapeXml(user.loginId)}</td>
        <td>${fn:escapeXml(user.userName)}</td>
    </tr>
</c:forEach>
```

繰り返し処理：Thymeleafの場合

```html
<tr th:each="user : ${userList}">
    <td>${fn:escapeXml(user.loginId)}</td>
    <td>${fn:escapeXml(user.userName)}</td>
</tr>
```

---

比較結果から分かるように、JSPの場合、`<c:out>`、`<c:if>`、`<c:forEach>`などのタグを使う必要があります。
そのためソースコードにHTMLタグ以外のタグが埋め込まれる形になり、ソースコードの量が増え、HTMLの知識しか持たない人にとっても読みずらいコードになります。

一方、Thymeleafの場合は既存のHTMLタグに対して属性を埋め込む形になるため、ソースコードのステップ数が無駄に増えることを防ぎつつ、HTMLの知識しか持たない人にとっても直感的に読みやすいものになります。

---

## 導入方法

Spring Bootアプリケーションのプロジェクトを作成します。
Eclipseを使用している場合は、Spring・スタータープロジェクトを作成します。

pom.xmlに以下を追加します。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

Tymeleafのファイルは、拡張子「.html」のファイルとして作成します。
ファイル作成場所はtemplatesフォルダになります。
src/main/resources/templatesフォルダの中に、htmlファイルを作成します。

※CSS、JavaScript、画像などのリソースファイルを使用する場合は「recources/staticフォルダ」に格納します。

作成したHTMLファイルでは、htmlタグにTymeleafを使用するための属性を追加します。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
```

---

## Thymeleafでできること

### EL式

JSPと同じく、スコープにセットされた変数はEL式でアクセスできます。
コントローラーからModelにセットした変数もEL式を使ってアクセスできます。

### 値の出力

IndexController.java

```java
@Controller
public class IndexController {
    /*  
     * トップページへの遷移
     */
    @RequestMapping(value = {"/", "/index"})
    public String index(Model model) {
        model.addAttribute("message", "Hello");
        return "index";
    }
}
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<title>トップページ</title>
</head>
<body>
    <!-- 変数の出力 -->
    <!-- th:textを使う方法と[[]]を使う方法がある -->
    <p th:text="${message}"></p>
    <p>[[ ${message} ]]</p>

    <!-- 固定文字列の出力 シングルクォーテーションを使用 -->
    <p th:text="'Hello World'"></p>
    <p>[[ 'Hello World' ]]</p>
</body>
</html>
```

結果

```text
Hello
Hello
Hello World
Hello World
```

### 条件分岐

```html
<p th:if="${flag}">Hello</p>
```

値がtrueと評価される場合は要素が出力され、falseの場合は要素が出力されません。

### 繰り返し処理

```html
<tr th:each="user : ${userList}">
    <td>${fn:escapeXml(user.loginId)}</td>
    <td>${fn:escapeXml(user.userName)}</td>
</tr>
```

---

## Formクラスとの連携

Formクラスと連携することで、Formクラスのインスタンスを通じて値の受け渡しができるようになります。
また、Formクラスのフィールドにアノテーションを付けることでバリデーションチェックを行うことができます。

以下のサンプルを確認してください。

バリデーションを行うにはpom.xmlに以下を追加します。

```xml
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

Formクラスでアクセッサメソッドの自動生成を行うために以下を追加します。

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

Formクラスを作成します。
クラスに対して@Dataアノテーションをつけることで、アクセッサメソッドをコンパイル時に自動生成します。

LoginForm.java

```java
package com.example.demo.form;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginForm {

    @NotBlank
    private String loginId;
    @NotBlank
    private String password;
}
```

IndexController.java

```java
package com.example.demo.controller;

// import文は省略

@Controller
public class IndexController {

    @Autowired UserDao userDao;
    @Autowired HttpSession session;

    /*  
    * トップページへの遷移
    */
    @RequestMapping(value = {"/", "/index"})
    public String index(@ModelAttribute("loginForm") LoginForm loginForm, Model model) {
        return "index";
    }
    /*
    * ログイン
    */
    @RequestMapping(value="/login")
    public String login(@Validated @ModelAttribute("loginForm") LoginForm loginForm, BindingResult bindingResult, Model model) {
        // エラーが存在する場合はトップページに戻す
        if(bindingResult.hasErrors()) {
            return "/index";
        }
        // Daoの詳細は省略
        // IDとパスワードからユーザー情報を取得できるかチェックする
        var user = userDao.login(loginForm.getLoginId(), loginForm.getPassword());
        if (user == null) {
            model.addAttribute("errorMsg", "IDまたはパスワードが不正です。");
            return "/index";
        }
        // 存在する場合はユーザー情報をセッションに保存してメニュー画面へ遷移
        session.setAttribute("user", user);
        return "menu";
    }
}
```

index.html

※CSS等は省略します。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<title>ログイン</title>
</head>
<body>
  <p class="error" th:text="${errorMsg}"></p>

  <form action="/login" method="post" th:object="${loginForm}">
    <fieldset>
      <input type="text" th:field="*{loginId}" placeholder="ID">
      <div class="error" th:each="error: ${#fields.errors('loginId')}">
        [[ ${error} ]]
      </div>

      <input type="password" th:field="*{password}" placeholder="PASS">
      <div class="error" th:each="error: ${#fields.errors('password')}">
        [[ ${error} ]]
      </div>
    </fieldset>
    <button type="submit">ログイン</button>
  </form>
</body>
</html>
```

ポイントのみ解説します。

Fromクラスと連携する画面のformタグに対し、th:object属性を指定します。

```html
<form action="/login" method="post" th:object="${loginForm}">
```

コントローラでは、index.htmlに遷移するメソッドと、index.htmlから遷移する両方のメソッドの引数で@ModelAttributeを指定し、Formクラスを指定する必要があります。

```java
/* トップページへの遷移 */
@RequestMapping(value = {"/", "/index"})
    public String index(@ModelAttribute("loginForm") LoginForm loginForm, Model model){...}

/* ログイン */
@RequestMapping(value="/login")
    public String login(@Validated @ModelAttribute("loginForm") LoginForm loginForm, BindingResult bindingResult, Model model){...}
```

th:object属性で指定する変数名と、@ModelAttributeアノテーションの引数で指定するFormの名前は一致させる必要があります。
名前が一致していれば、命名は任意です。
ここでは「loginForm」としています。

バリデーションをおこなう場合は、@Validatedアノテーションを付ける必要があります。
また、Fromクラスの引数の次の引数にBindingResult型の引数を指定する必要があります。
BindingResultのインスタンスには、バリデーションチェックの結果が入っています。

input要素の入力項目ではth:field属性をFormクラスのフィールド名を一致させます。
th:objectのある要素の子要素の中では、`*{}`を使うことでオブジェクトのフィールドに直接アクセスできます。

```html
<input type="text" th:field="*{loginId}" placeholder="ID">
...
<input type="password" th:field="*{password}" placeholder="PASS">
```

```java
@NotBlank
private String loginId;
@NotBlank
private String password;
```

```html
<div class="error" th:each="error: ${#fields.errors('loginId')}">
[[ ${error} ]]
</div>
```

バリデーションチェックによるエラーは`${#fields.errors('【フィールド名】')}`でアクセスできます。
中身はリストになっているため、th:eachで要素を1つずつ取り出すことができます。

---

その他の構文や仕様については[公式サイト](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf_ja.html)を参照ください。
