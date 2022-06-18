# switch

---

switch文とは、制御構文の中ではif文と同じ「選択」にあたります。
switch文はif文と比べると、「『ある値』がどういう状態か」で分岐したいときに使用されます。
switchをフローチャートで表現すると以下のようになります。
ある値が値(a)と等しかったら処理(1)へ、値(b)と等しかったら処理(2)へ、それ以外の場合は処理(3)へ進みます。

![picture 1](/images/21444ea0a01c84151a4232f1d65a9f63ca2bd56068e6aa79ae40f8137d823e75.png)  

---

これをJavaで書くと以下のようになります。

```java
switch (式) {
case 値:
    処理
    break;
case 値:
    ・
    ・
    break;
default:
    デフォルト処理
    break;
}
```

「case 値:」や「default:」をラベルと呼んだりもします。

```java
case ○○:
    処理
    break;
```

というブロックを追加していくことで分岐を増やしていくことができます。

---

```java
switch (式) {
case 値(a):
    処理(1)
    break;
case 値(b):
    処理(2)
    break;
default:
    処理(3)
    break;
}
```

---

サンプルプログラム(drink_input.jsp、drink_output.jsp)を確認してください。

drink_input.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>飲み物選択画面</title>
</head>
<body>
<div>
  <p>好きなジュースを選んでください。</p>
  <form action="drink_output.jsp">
    <select name="drink">
      <option value="1">りんごジュース</option>
      <option value="2">オレンジジュース</option>
      <option value="99">その他</option>
    </select>
    <button type="submit">送信</button>
  </form>
</div>
</body>
</html>
```

---

drink_output.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String drink = request.getParameter("drink");
int drinkNumber = Integer.parseInt(drink);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>飲み物結果画面</title>
</head>
<body>
<%
switch (drinkNumber) {
case 1:
    out.println("りんごジュース");
    break;
case 2:
    out.println("オレンジジュース");
    break;
default:
    out.println("どちらでもない");
    break;
}
%>
</body>
</html>
```

---

java部分のみ抜粋

```java
switch (drinkNumber) {
case 1:
    out.println("りんごジュース");
    break;
case 2:
    out.println("オレンジジュース");
    break;
default:
    out.println("どちらでもない");
    break;
}
```

---

実行すると、以下のような結果になります。

![picture 2](/images/0a7422a5ae3f4a75cf37c0f9d67250825df42d21c0f453405e0363f411e7c28f.png)  

---

```java
switch (drinkNumber) {  // (1)
case 1:                 // (2)
    out.println("りんごジュース"); // (3)
    break;              // (4)
case 2:
    out.println("オレンジジュース");
    break;
default:                // (5)
    out.println("どちらでもない");
    break;
}
```

---

(1)  
まず(1)は、条件分岐をするための条件（値）を指定しています。
drinkNumberというint型の変数を指定しています。

(2)  
次に(2)は、「条件である値が1だった場合」という意味で、実際に1だったときにジャンプする先になります。
このようにswitch文では、ジャンプする先を「case 値:」というラベルで指定します。

(3)  
(3)は分岐先での処理です。
「リンゴジュース」という一文を出力しています。

(4)  
そして(4)は、分岐先の処理の終了を表します。
このbreakがないと、処理が止まらず下へ流れます。

このように「case ～ 処理 ～ break」でひとかたまりとなっています。
そして必要なだけcaseを書くことで、分岐先を増やすことができます。

(5)  
最後に(5)ですが、defaultというラベルを指定しています。
どのcaseにも一致しなかった場合にジャンプします。
　(defaultは省略可能です)

---

## switch文で使える型

先ほどはswitch文の「式」にint型の値を指定しました。
使用できる型は決まっています。
switch文の式には、以下の型の値を指定できます。

|型|備考|
|:--|:--|
|byte||
|char||
|short||
|int||
|Enum|Java5.0から|
|String|Java7から|

---

## 講義動画

[条件分岐](https://youtu.be/bJu_lricxqc)
