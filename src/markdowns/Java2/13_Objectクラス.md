# Objectクラス

---

Javaの標準ライブラリの中にObjectクラスというクラスがあります。
これはJavaの中でも特別なクラスで、全てのクラスのスーパークラスになります。
自分で新しくクラスを作成した際に、extendsを使用しなかった場合は、
暗黙的に「extends Object」と書かれた状態と同じになります。

```java
public class A {

}

// 上と同じ
public class A extends Object {

}
```

全てのクラスは暗黙的にObjectクラスを継承しているため、
Objectクラスで定義されているメソッドはどのクラスでも使用可能ということです。
どんなメソッドがあるか、詳しくはJavaのAPIリファレンスを参照してください。
ここでは代表的なメソッドをいくつか紹介します。

## toStringメソッド

そのクラスの文字列表現を表すメソッドです。
コンソールに出力するためのprintメソッドやprintlnメソッドの引数に
何かしらのインスタンスを入れた際は、そのクラスのtoStringメソッドが実行される仕組みになっています。

Ningen.java

```java
package app;

public class Ningen {
    String name;
    int age;

    public Ningen(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

Main.java

```java
package app;

// 動作確認
public class Main {

    public static void main(String[] args) {
        Ningen n = new Ningen("Alice", 20);
        System.out.println(n);  // ObjectクラスのtoStringメソッドの実行結果が表示される
    }
}
```

結果

```text
Ningen@15db9742
```

Ningen.java

```java
package app;

public class Ningen {
    String name;
    int age;

    public Ningen(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "名前：" + name + ", 年齢：" + age;
    }
}
```

Main.java

```java
package app;

// 動作確認
public class Main {

    public static void main(String[] args) {
        Ningen n = new Ningen("Alice", 20);
        System.out.println(n);  // オーバーライドしたtoStringメソッドの実行結果が表示される
    }
}
```

結果

```text
名前：Alice, 年齢：20
```

これはポリモーフィズムが活用されている例になります。
printlnメソッドは、引数にObject型のインスタンスを受け取ります。
全てのクラスはObjectクラスを継承しているため、どのクラスのインスタンスでも引数に渡すことができます。
そして、引数で受け取ったインスタンスのtoStringメソッドを呼び出しているため、ポリモーフィズムが適用され、オーバーライドしたメソッドが呼ばれます。

## equalsメソッド

インスタンス同士が等しいかどうかを判断するためのメソッドです。
オーバーライドしない場合、インスタンスのアドレスを比較する（\==で比較した場合と同じ）。
フィールドの値が同じ場合は同じインスタンスとみなしたい、
という場合、はequalsメソッドをオーバーライドします。
文字列を比較する場合にもequalsメソッドを使用したのを覚えているでしょうか。
Stringも参照型なので、文字列同士を\==で比較した場合はインスタンスのアドレスが比較されてしまいます。
文字列の値で比較ができるように、Stringクラスの中で、equalsメソッドがオーバーライドされており、文字が全て等しいかどうかを確かめています。
そのため、equalsメソッドを使用することで文字列の比較できるようになっています。

Ningen.java

```java
package app;

public class Ningen {
    String name;
    int age;

    public Ningen(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

Main.java

```java
package app;

// 動作確認
public class Main {

    public static void main(String[] args) {
        Ningen n1 = new Ningen("Alice", 20);
        Ningen n2 = new Ningen("Alice", 20);
        System.out.println(n1 == n2);       // false
        System.out.println(n1.equals(n2));  // false オーバーライドしていない場合は==と同じ
    }
}
```

結果

```text
false
false
```

Ningen.java

```java
package app;

public class Ningen {
    String name;
    int age;

    public Ningen(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if(o != null) {
            if (o instanceof Ningen) {
                Ningen n = (Ningen)o;
                // nameとageが同じなら同じとみなす
                if(name.equals(n.name) && age == n.age) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

Main.java

```java
package app;

// 動作確認
public class Main {

    public static void main(String[] args) {
        Ningen n1 = new Ningen("Alice", 20);
        Ningen n2 = new Ningen("Alice", 20);
        System.out.println(n1 == n2);       // false
        System.out.println(n1.equals(n2));  // true
    }
}
```

結果

```text
false
true
```

## Objectクラスのまとめ

- Objectクラスは全てのクラスのスーパークラス
- extendsを使用しなかった場合は自動的にObjectクラスが継承される
- ObjectクラスはtoStringメソッドやequalsメソッドなどのメソッドを持つ

## 講義動画

[Objectクラス, final, is-a関係](https://youtu.be/QuAHYe82R2g)
