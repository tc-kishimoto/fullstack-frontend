# PHPUnit

---

## 概要

システム開発におけるテスト工程について学びます。
単体テストの概要を学びます。
PHPの単体テストツールであるPHPUnitについて学びます。

---

## 前提条件

PHPはComposerによってインストールします。
（ComposerなしでもできますがComposerを使用した方が導入が楽です。）
Composerがインストールされていない場合は、事前にComposerのインストールを実施してください。

---

## テスト工程

プログラム開発では、エラーがなくなって実行できるようになれば終わりではありません。
実行できるようになったあとは、仕様通りに動作するかどうかを確認する作業が必要です。
仕様通りに動作するか検証する工程がテスト工程です。
一般に開発工程の中で最も時間がかかるのがテスト工程です。

---

テスト工程は以下のように分類されます。

* 単体テスト：画面単位・機能単位のテスト
* 結合テスト：プログラム全体のテスト
* システムテスト：本番環境によるテスト
* 運用テスト：ユーザーによるテスト

ただし、プロジェクトによって呼び方が異なる場合があります。
また、単体テストはプログラミング工程に含める場合もあります。

単体テストは、ユニットテストとも呼ばれ、テスト工程の中で最も最小単位のテストになります。
画面単位、クラス単位、関数単位でのテストになります。

---

## テストケース

テストは適当に実施すれば良いわけではりません。
あらかじめテストすべき項目・条件などを洗い出したものを作成する必要があります。
このような、テストすべき項目を洗い出したものをテストケースと呼びます。

---

## xUnit

テストは、一度実施して終了ではありません。
プログラムにバグがあった場合には、プログラムを修正し、再度テストを実施する必要がります。
なぜなら、プログラムを修正した場合、今までうまくいっていたプログラムに影響が出ていない保証はないからです。

最も典型的なテストの手法は、実際のプログラムを動かしながら、結果を画面キャプチャとして保存していく手法です。
しかし、このようなテスト手法は、プログラム修正後に何度も再テストを実施するのは手間がかかります。

---

そこで、テストをプログラムで書くことによりテストの実施を自動化し、簡単に再テストできるようにする手法が登場しました。
テストを自動化するためのツールをテスティングフレームワークと呼びます。
テスティングフレームワークには多くの種類がありますが、その中でも単体テスト（ユニットテスト）のテスティングフレームワークのであるxUnitが有名です。
xUnitは複数のテスティングフレームワークの総称で、プログラミング言語毎に様々なツールが用意されています。

---

実際に動作させるプログラムよりも前に、先にユニットテストのプログラムを書き、テストが通るようにプログラムを作成する開発手法があります。
このような開発手法はテスト駆動開発（TDD）と呼ばれ、アジャイル開発などで推奨されている開発手法です。

---

## PHPUnit

PHPUnitはPHPにおける単体テスト（ユニットテスト）ツールで、xUnit系のテスティングフレームワークです。
メソッド（関数）単位のプログラムを自動化することができます。

公式サイトは以下になります。

https://phpunit.readthedocs.io/ja/latest/index.html

PHPUnitは公式サイトに情報が充実しているため、基本的にそちらを参照しながらプログラムを作成してください。
テキストでは必要最低限の知識のみ解説します。

---

## インストール

PHPUnitの公式サイトを参考にインストールしてください。

https://phpunit.readthedocs.io/ja/latest/installation.html

バージョンは下記サイトから確認可能です。
PHPのバージョンによってインストール可能なPHPUnitのバージョンが異なります。

https://phar.phpunit.de/

---

## Composerでインストール
Composerは既にインストールされている前提です。   
Composerが入ってない場合は、Composerのテキストからインストールしてください。  

Composerでインストールするには、以下のコマンドを実行してください。  

```bash
# 対象のプロジェクトフォルダに移動
cd c:/xampp/htdocs/test

# プロジェクトにcomposer.jsonがない場合実行
composer init 

# PHPUnitをインストール
composer require phpunit/phpunit --dev
```

以上で、コマンドを実行したディレクトリにPHPUnitがインストールされます。

---

## 拡張機能のインストール

PHPUnitは基本的にコマンドからの実行になります。
VS Codeから簡単にPHPUnitの実行ができるように、
VS Code拡張機能「PHPUnit」をインストールしておいてください。

https://marketplace.visualstudio.com/items?itemName=emallin.phpunit

---

## PHPUnitの書き方

PHPUnitのテストの書き方は、PHPUnitの公式サイトに詳しく書かれていますので、そちらを参照ください。

https://phpunit.readthedocs.io/ja/latest/writing-tests-for-phpunit.html

※現場での開発では、使用する技術の情報は公式ドキュメントを参照する場面が多くなります。
わかりやすく解説したブログ記事などもありますが、公式ドキュメントの方が誤った情報がなく、確実です。
これから扱う技術では公式ドキュメントを積極的に読むようにしましょう。

---

公式サイトのサンプルプログラムについて簡単に解説します。

```php
<?php 
declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class StackTest extends TestCase
{
    public function testPushAndPop(): void
    {
        $stack = [];
        $this->assertSame(0, count($stack));

        array_push($stack, 'foo');
        $this->assertSame('foo', $stack[count($stack)-1]);
        $this->assertSame(1, count($stack));

        $this->assertSame('foo', array_pop($stack));
        $this->assertSame(0, count($stack));
    }
}
```

---

* PHPUnitを使ってテストケースを作成する場合、TestCaseクラスを継承する必要があります。
* メソッド名は「test」から始める必要があります。
* assertSameメソッドはTestCaseクラスの持つメソッドです。
* assertSameメソッドは、第一引数に期待値、第二引数ではテスト対象の値（通常はメソッドの戻り値など）を指定します。
* 第一引数の値と第二引数の値を比較し、値が同じ場合はテスト成功、値が異なる場合はテスト失敗となります。

---
## アサーション
PHPUnitでテストを実行する際のアサーションメソッドが用意されています。  
アサーションとは、テストしたいコードが実行される時に満たされるべき条件を記述して実行時にチェックする仕組みです。  
### assertEquals
ある値が期待値と等しいかどうか判定します。このメソッドはPHPでいう「==」の比較と同じで、型は見ずに値しか見ません。
```php
$this->assertEquals(1, '1');
$this->assertEquals(null, '');
$this->assertEquals(null, false);
$this->assertEquals(null, 0);
$this->assertEquals('1', true);
```

### assertSame
ある値が期待値と等しいかどうか判定します。このこのメソッドはPHPでいう「===」の比較と同じで、型と値両方を見て判定します。
```php
$this->assertSame('hoge', 'hoge'); // OK
$this->assertSame(0, 0);           // OK
$this->assertSame(false, false);   // OK

$this->assertSame('hoge', 'fuga'); // NG
$this->assertSame(0, false);       // NG
$this->assertSame(7, '7');         // NG
```

### assertTrue, assertFalse, assertNull
それぞれtrue、false、nullと等しいか判断します。
```php
$this->assertTrue(true);        // OK
$this->assertFalse(false);      // OK
$this->assertNull(null);        // OK

$this->assertTrue(false);       // NG
$this->assertFalse(true);       // NG
$this->assertNull(1);           // NG
```

ここで紹介したメソッドはごく一部です。  
その他のメソッドや使い方は公式に詳しい記載があります。
https://phpunit.readthedocs.io/ja/latest/assertions.html#asserttrue

---

## PHPUnitの実行方法
### コマンドの場合
コマンドで行う場合は、cdコマンドで対象のプロジェクトフォルダに移動し、以下のコマンドを実行します。
```bash
vendor\bin\phpunit test.php
# test.phpに入るのは実行するPHPファイル
```

### VSCodeの場合
VSCodeで実行する場合には、拡張機能をインストールしている必要があります。  
1. Shift + Ctrl + Pでコマンドパレットを開く
2. 「PHPUnit Test」を選択
3. 実行する関数、またはテストクラスを選択

ターミナルが自動で開き、実行結果が表示されます。
