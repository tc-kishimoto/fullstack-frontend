# Enum

---

Enum（イーナム）は日本語では列挙型といます。
Enumは一言でいうと定数の集合です。
つまり、複数の定数を1つにまとめたものです。
Enumは、定数をより使いやすくする仕組みです。

```java
package app;

public class Main {
    public static void main(String[] args) {
        // メソッドを呼び出し
        janken(1);
        janken(2);
        janken(3);
        janken(4);
    }

    // 引数じゃんけんをするメソッド
    public static void janken(int n) {
        switch (n) {
            case 1:
                System.out.println("グー");
                break;
            case 2:
                System.out.println("チョキ");
                break;
            case 3:
                System.out.println("パー");
                break;
        }
    }
}
```

このソースコードは正直言って良いソースコードではありません。
jankenメソッドの中のswitchで指定しているラベル(1, 2, 3)は何を表しているのか分かりません。
また、呼び出し側のソースも、引数の値だけを見てもどんな結果になるのかが想像できません。
あらかじめ「グーは1」「チョキは2」「パーは3」を表していることを知っておく必要があります。

このような読みにくいソースコードを読みやすくする解決策として、定数を使ってソースコードを読みやすくする方法が考えられます。

Main.java

```java
package app;

public class Main {

    // 定数を追加する
    public static final int GU = 1;
    public static final int CHOKI = 2;
    public static final int PA = 3;

    public static void main(String[] args) {

        // 引数に定数を使用する
        janken(GU);
        janken(CHOKI);
        janken(PA);
        janken(4);  // 意図しない値も入る

    }

    // 引数じゃんけんをするメソッド
    public static void janken(int n) {
        switch (n) {
            case GU: // ラベルに定数を使用する
                System.out.println("グー");
                break;
            case CHOKI:
                System.out.println("チョキ");
                break;
            case PA:
                System.out.println("パー");
                break;
        }
    }
}
```

このように修正すると、ソースコードは先ほどよりも読みやすくなりました。
メソッドのラベルが定数名になることで、メソッドの中身が読みやすくなりました。
また、メソッドの呼び出しでも引数に定数を入れることで、意味が分かりやすくなりました。
しかし、まだ問題は残ります。
メソッドの呼び出しの個所で、引数に4を入れて呼び出している個所が存在します。
引数をint型で受け取っているため、問題なく値を受け渡すことができますが、本来は意図しない値です。

3種類の決められた値のみを受け取れる仕組みがあるとこのようなミスを減らすことができます。
Enumを使うことでこのような仕組みを実現できます。

```java
package app;

public class Main {

    public enum Janken {
        GU, CHOKI, PA
    };

    public static void main(String[] args) {

        // 引数に定数を使用する
        janken(Janken.GU);
        janken(Janken.CHOKI);
        janken(Janken.PA);
        // janken(4);  // エラーになる

    }

    // 引数じゃんけんをするメソッド
    public static void janken(Janken j) {
        switch (j) {
            case GU: // ラベルに定数を使用する
                System.out.println("グー");
                break;
            case CHOKI:
                System.out.println("チョキ");
                break;
            case PA:
                System.out.println("パー");
                break;
        }
    }
}
```

今度はEnumを使用して修正した結果です。
引数でJanken型を指定しているため、Jankenの中で定義された要素しか指定することができなくなります。
そのため、意図しない値が入ってくることがなくなり、プログラムのミスを減らすことができます。

## Enumのまとめ

- Enumは定数をまとめたもの
- Enumを使うことでプログラムのミスを減らしたり、可読性を上げることができる
