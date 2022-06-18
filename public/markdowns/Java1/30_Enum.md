# Enum

---

Enum（イーナム）は日本語では列挙体といいます。
Enumを使うと定数の集合を作成することができます。
初めて目にする用語かもしれませんが実は過去に1度だけ登場しています。
switch文で使える型の中にEnumが含まれています。

|型|備考|
|:--|:--|
|byte||
|char||
|short||
|int||
|String|Java5.0から|
|String|Java7から|

---

Enumの構文は以下のようになります。

```java
アクセス修飾子 enum 列挙名 { 列挙子1, 列挙子2, ...}
```

Enumはフィールドやメソッドを同じようにクラスの中に定義します。
列挙名が定数の集合全体を表し、列挙子がそれぞれの定数を表します。

---

サンプルプログラム(EnumSample.java)を確認してください。

```java
public class EnumSample {
    public enum Drink {
        APPLE_JUICE, ORANGE_JUICE
    }

    public static void main(String[] args) {
        drinkChoice(1);
    }

    public static void drinkChoice(int drinkNumber) {
        switch (drinkNumber) {
        case 1:
            System.out.println("りんごジュース");
            break;
        case 2:
            System.out.println("オレンジジュース");
            break;
        default:
            System.out.println("どちらでもない");
            break;
        }
    }
}
```

---

サンプルプログラムの中身を確認していきます。
まずはEnumの宣言部分です。

```java
public enum Drink {
    APPLE_JUICE, ORANGE_JUICE
}
```

ここでは列挙名を「Drink」としています。
「Drink」が定数の集合体を表します。
「APPLE_JUICE」と「ORANGE_JUICE」はDrinkに属する定数です。

---

drinkChoiceメソッドは、switch文の講義内容の処理をメソッド化したものです。
引数でint型を受け取り、switch文で処理します。

```java
public static void drinkChoice(int drinkNumber) {
    switch (drinkNumber) {
    case 1:
        System.out.println("りんごジュース");
        break;
    case 2:
        System.out.println("オレンジジュース");
        break;
    default:
        System.out.println("どちらでもない");
        break;
    }
}
```

mainメソッドでは、drinkChoiceメソッドを呼び出しています。
実行すると「りんごジュース」が表示されます。

結果

```text
りんごジュース
```

---

ここで定義されたdrinkChoiceメソッドにはいくつかの問題点があります。

1つ目の問題点は、引数にどの値を渡すとどんな処理になるのかが、メソッドの中身を見なければ分からないという点です。
「1」は「りんごジュース」で「2」が「オレンジジュース」になっていることは、メソッドのソースコードを読まなければ分かりません。

2つ目の問題点は、大きな値やマイナスの値など、本来意図しないであろう数値も引数に渡すことができる点です。
メソッドの制作者が意図していなかった値も受け取ることができてしまい、思わぬバグを生む可能性があります。

これらの問題点を解決するための技術がEnumです。

---

drinkChoiceメソッドを以下のように修正してみます。

```java
public static void drinkChoice(Drink drink) {
    switch (drink) {
    case APPLE_JUICE:
        System.out.println("りんごジュース");
        break;
    case ORANGE_JUICE:
        System.out.println("オレンジジュース");
        break;
    default:
        System.out.println("どちらでもない");
        break;
    }
}
```

まずは引数でDrink型を受け取るようにし、switch文の式も引数で受け取った変数に変更します。
caseのラベルはDrinkで定義した定数に変更します。

---

最後にdrinkChiceメソッドの呼び出し時の引数もEnumを使って指定するように変更します。

```java
public static void main(String[] args) {
    drinkChoice(Drink.APPLE_JUICE);
}
```

Enumを使うことで、メソッドの呼び出し時に引数になんの値を指定しているかが分かりやすくなりました。
また、「APPLE_JUICE」と「ORANGE_JUICE」の値しか渡すことができなくなったため、意図しない値が引数として渡されることもなくなりました。

---

## Enumのまとめ

Enumは定数の集合体です。
switch文の型で使用することができます。
複数の定数を定義したい場合にEnumを使用することでプログラムの可読性を上げ、ミスを減らすことができます。
