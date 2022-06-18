# JUnit

---

## テストとは

プログラム開発では、全てのプログラムのコンパイルが通った時点で終了するわけではありません。
コンパイルが正常に通っていても、実際に動かしてみた場合には実行時エラーで終了する可能性があります。　　
また、たとえエラーが発生しなかったとしても、意図していた通りに動くとは限りません。　　
例えば、計算を行うプログラムの場合、エラーが起きなかったとしても、計算結果が間違っていたら、正しいプログラムとは言えません。

このように、プログラムは作り終わった段階で完成といえる状態にはなっていません。
プログラムを作った後には、プログラムが意図したとおりに動くのかどうかを確認する作業が必要になります。
その作業がテスト（検証）作業です。
プログラムはテストが終わった後、初めて完成したといえます。

## テストの種類

実際のシステム開発の中ではテストもいくつかの種類があります。
例えば、

- 単体テスト
- 結合テスト
- システムテスト
- 運用テスト

などがあります。

### 単体テスト

ユニットテストとも言います。
メソッド単位のテスト、クラス単位でのテスト、画面単位のテストなどが単体テストにあたります。
簡単に言うと1つの機能単位でのテストです。
単体テストは一般的にはプログラミングの工程に含まれる場合が多いです。

### 結合テスト

1つ1つの機能を連動させて動かした場合に正常に動作するかどうかを確認するテストのことです。
例えば、

1. ユーザーを新規登録
2. 登録したユーザーでログイン
3. サービスを利用
4. ログアウト

のような一連の流れがうまくいくかどうかを確かめる作業です。

### システムテスト

総合テストとも呼ばれます。
システムテストでは、作成したプログラムを実際のサーバー環境や実際のデータを使ってテストします。
よりユーザーが使用する環境に近い状態でテストし、動作に問題ないかを検証します。
パフォーマンスに問題がないかどうかや、障害が発生した場合のリカバリーなど、システムの機能以外の部分に関してのテストも行います。

### 運用テスト

運用テストでは、実際にプログラムを使用するユーザーに動かしてもらい、問題がないかを検証します。

## JUnitとは

JUnitは、Javaプログラムの単体テストのためのフレームワークです。
テスティングフレームワークとも呼ばれます。
JUnitでは、テスト用のクラスを新たに作成し、テストしたいメソッドを検証する処理を書きます。
処理を書き終えたらJUnitのクラスを実行します。
実行結果がそのままテスト結果となります。

なぜテストをするためにわざわざプログラムを作成するのでしょうか。
JUnitなどのテスティングフレームワークを使用せずにテストを行う場合、作成したプログラムを実行し、実行結果が意図したものになったかどうかを確認します。
このようなテストの場合、いくつかの問題点があります。
テストの目的はプログラムの質を上げることであり、バグを発見することです。
そのため、テストを実施していると、NGが出てバグを発見することもあります
バグが出てきた場合、そのままではいけないので、プログラムを修正する必要があります。
プログラムを修正したら再度テストを実施するのですが、NGが出た個所だけを再テストして完了ではありません。
プログラムのある機能を修正すると、その修正によって他の機能にも影響が出ている可能性もあります。
それを検証するためには、今まで実施したテストも再度実施する必要が出てきます。
つまり、手動でテストを行っていた場合、プログラムの修正が発生するたびに何度の同じテストを手動で実施する必要があるため、とても手間がかかります。

JUnitは、プログラムでテストを書くことにより、テストプログラムの実行だけで再テストができます。
そのため、うまく活用すれば効率よくテストできます。
当然、JUnitだけで全てのテストを賄うことはできません。
画面のレイアウトなどは実際に起動して目視しなければ確かめることはできませんし、メソッドによっては性質上手動で確認する必要があるものもでてくるでしょう。
テスティングフレームワークにこだわり過ぎる必要ありませんが、使用できる場面では積極的に使用するとよいでしょう。

## テスト仕様書とテストケース

TODO

## Junitの使い方

ここではVS Codeでの通常のJavaプロジェクトにおいてJunitを使用する方法を説明します。
JUnitはJava標準のライブラリには含まれていないため、使用するにはライブラリを追加する必要があります。

JUnitを使用するには2つのライブラリ（jarファイル）が必要です。
下記のサイトから
junit.jar
と
hamcrest-core.jar
をダウンロードします。
バージョンは変更される可能性がありますが、私が試したときにはそれぞれ以下のバージョンのファイルでした。
junit-4.13-rc-2.jar
hamcrest-core-1.3.jar

[https://github.com/junit-team/junit4/wiki/Download-and-Install](https://github.com/junit-team/junit4/wiki/Download-and-Install)

Javaのプロジェクトのフォルダの中に「lib」フォルダを作成します。
（srcやbinと同じ階層）
.classpathのファイルを開き、classpath要素の中に以下の内容を追加します。
pathの値はそれぞれのファイル名に合わせてください。

```xml
<classpathentry kind="lib" path="lib/junit-4.13-rc-2.jar"/>
<classpathentry kind="lib" path="lib/hamcrest-core-1.3.jar"/>
```

内容が反映させて問題がなければテストクラスでテストの実行ができるようになります。

### Mavenで

TODO

## テストクラスの作成

まずはテスト対象となるクラスと、テストを実施するクラスを作成して結果を確認してみます。

テスト対象となるクラス
Utility.java

```java
package app;

public class Utility {

    // FizzBuzzメソッド
    // 3の倍数ならFizz、5の倍数ならBuzz、3の倍数かつ5の倍数ならFizzBuzz、それ以外は数値をそのまま返す
  public static String FizzBuzz(int i) {
      if (i % 15 == 0) {
        return "FizzBuzz";
        } else if (i % 3 == 0) {
          return "Fizz";
        } else if (i % 5 == 0) {
          return "Buzz";
        } else {
          return String.valueOf(i);
        }
    }

  // 偶数かどうかを判断するメソッド
    public static boolean isEven(int n) {
        if(n % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }
}

```

テストクラス
UtilityTest.java

```java
package test;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class UtilityTest {

    // 実行開始時に最初に呼ばれる
    @BeforeClass
    public static void 始まり() {
        System.out.println("テスト開始");
    }

    // テストメソッド実行前に呼ばれる
    @Before
    public void テストメソッド前() {
        System.out.println("テスト前");
    }

    @Test
    public void FizzBuzz3の倍数() {
        String result = Utility.FizzBuzz(3);
        // 引数の2つの値が一致したら成功
        assertEquals("Fizz", result);
    }

    @Test
    public void FizzBuzz5の倍数() {
        String result = Utility.FizzBuzz(5);
        // 失敗した場合は第一引数のメッセージを表示する
        assertEquals("エラー","Buzz", result);
    }

    @Test
    public void FizzBuzz15の倍数() {
        String result = Utility.FizzBuzz(15);

        assertEquals("FizzBuzz", result);
    }

    @Test
    public void FizzBuzz以外() {
        String result = Utility.FizzBuzz(17);

        assertEquals("17", result);
    }

    @Test
    public void Even2() {
        boolean result = Utility.isEven(2);
        // 引数の値がtrueの場合は成功
        assertTrue(result);
    }

    @Test
    public void Even4() {
        boolean result = Utility.isEven(4);
        // 失敗の場合は第一引数のメッセージを出力
        assertTrue("4がダメ", result);
    }

    @Test
    public void Even1() {
        boolean result = Utility.isEven(1);
        // 引数の値がfalseの場合はエラー
        assertFalse(result);
    }

    @Test
    public void Even3() {
        boolean result = Utility.isEven(3);
        // 失敗の場合は第一引数のメッセージを出力
        assertFalse("3がダメ", result);
    }

    // テストメソッド実行後に呼ばれる
    @After
    public void テストメソッド後() {
        System.out.println("テスト後");
    }

    // テスト終了後に最後に呼ばれる
    @AfterClass
    public static void 終わり() {
        System.out.println("テスト終了");
    }
}
```

結果

```text
テスト開始
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト前
テスト後
テスト終了
```

コンソールへの出力は、@BeforeClass、@Before、@After、@AfterClassのついたメソッドがそれぞれどのタイミングで実施されるのかを確認するためのもので、それ以外に特に意味はありません。
テストクラスの場合、重要なのはテスト結果です。
VS Codeを使用している場合は、テストを実行したら「Java Test Report」のタブが表示されます。
(表示されない場合は、画面下の×やチェックマークがついた「View test report」を押すと表示されます。)
ここにメソッドごとのテスト結果が表示されます。

### テストクラスのクラス名

テストクラスも基本的にJavaのクラスなので、作成方法は通常のクラスと変わりません。
クラス名も任意に付けることができますが、テストクラスであることを示すためにクラス名の前か後ろに「Test」を付けるのが一般的です。
また、特定のクラスに対するテストクラスに場合、「テスト対象クラスのクラス名 + Test」とすると分かりやすくなります。

### JUnitで使用できるアノテーション

テストクラスではメソッドにアノテーションを付けることで、テスト用のメソッドであることをお知らせします。
JUnitで使用できるアノテーションにはいくつかの種類がありますが、テスト用のメソッドには@Testのアノテーションを付けます。
通常は@Testが付くメソッドは、テストケースの分だけ作成します。
処理を実行する前に一度だけ実行したい処理があるのであれば、@BeforeClassアノテーションを使用します。
処理の最後に一度だけ実行したい処理があるのであれば、@AfterClassアノテーションを使用します。
@Testが書かれた処理の前後に毎回実施したい処理がある場合、@Beforeや@Afterを使用します。

### JUnitで使用できるメソッド

JUnitでは、assertXxxxという形式のメソッドが多数用意されていて、それらを使うことでテストを実施します。
assertEqualsメソッドでは、引数に期待値と実行結果を渡し、一致していればテスト成功で、一致しなければ失敗となります。
様々なメソッドがあるのでテスト内容によって使い分けられるようにしておきましょう。

### assertThat

TODO

### 日本語のメソッド名

上記のテストクラスのメソッド名で日本を使用しています。
実はメソッド名に日本語を使用することも可能です。
ただし、テスト用ではない通常のメソッドでは推奨されません。

テストクラスはプログラムのテストを行うためのプログラムなので、システムのリリース時には必要とされないクラスです。
そのため分かりやすさのためにメソッド名で日本語が使用されることがあります。

### staticインポート

クラスフィールドやクラスメソッドの使用を楽にするためのインポート方法です。
importの宣言部で「import static org.junit.Assert.*;」という見慣れない記述があります。
ソースコードでは「import static」とありますが、名称としてはstaticインポートと呼びます。
staticインポートを使用すると、クラスフィールドやクラスメソッドにアクセスする際に、クラス名を省略することができいます。

staticインポートの使用例
Main.java

```java
package app;

import static java.lang.System.*;

public class Main {
    public static void main(String[] args) {
        // Systemクラスのクラスフィールドであるoutをクラス名なしで使用できる
        out.println("Hello");
    }
}
```

```text
Hello
```

## テスト駆動開発

TODO

## JUnitのまとめ

- テストには単体テスト、結合テスト、システムテスト、運用テスト等がある
- JUnitはJavaで単体テスト行うためのツール(フレームワーク)
- プログラムでテストを書くことで再テストを楽にすることができる

## 講義動画

[JUnit](https://youtu.be/SLDZHgxul7M)
