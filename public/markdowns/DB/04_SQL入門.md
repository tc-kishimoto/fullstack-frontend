# SQL入門

---

SQLの概要について学びます。

DML（SELECT、INSERT、UPDATE、DELETE）について学びます。

---

## SQL概要

SQLはデータベース（主にRDB）を操作するときに使用される言語です。
C言語、PHP、Javaなどの一般的なプログラミング言語は、「手続き型言語」と呼ばれ、処理の流れを書きます。
一方でSQLは非手続き型言語と呼ばれ、処理の流れを意識することなく、データベースに対して何をするかを記述します。

SQLはRDBMS製品ごとに実装されているため、DB毎に若干の違いがあります。

しかし、ほとんどは標準SQL規格に準拠しているため、基本的なSQLの文法はどのRDBMS製品でもほぼ同じ文法で記述できます。

---

## 事前準備

ここからは、ローカル環境にDB環境（MySQLまたはPostgreSQL）がインストールされていることを前提とします。

また、DB環境に接続して、SQLが実行できる状態で進めてください。

DBMSのインストールがまだの場合は、MySQL、またはPostgreSQLをインストールおいてください。

インストールが完了している場合はDBを起動してtestdbに接続してください。

---

## テーブルの作成

DBを使ってSQLで実際にデータを操作していくためには、データ格納用のテーブル（表）を作成する必要があります。

テーブル（表）とはデータを管理するオブジェクトで、リレーショナルデータベースの基本となるものです。

縦軸を列（カラム）といい、横軸を行（レコードまたはロウ）といいます。

縦軸はデータの属性を表し、横軸はデータそのものを表します。

|社員番号|社員名|役職|給与|部門番号|
|:--:|:--:|:--:|:--:|:--:|
|0001|井上|社員|200000|10|
|0002|梅田|社長|1000000|30|
|0003|山田|部長|500000|10|
|0004|鈴木|社員|300000|20|
|0005|佐藤|社員|250000|10|

---

リレーショナルデータベースでは複数のテーブルを関連付け（リレーションシップ）し、データを管理します。

![picture 10](/images/e8ddfc924ffad670d87cf6d5bf1e4324cc269489ab905fbe09a45e7839b4a0f7.png)  

---

データベースにもデータ型が存在します。

データ型は列に対して指定します。

また、登録できる文字数や小数点以下第何位まで登録するかといったサイズ、精度指定も行います。

|属性|データ型|解説|
|:--:|:--:|:--:|
|文字|VARCHAR|最大サイズ指定可変長文字列|
||CHAR|固定長文字列|
||TEXT|制限なし可変長文字列|
|数値|INTEGER|4バイト数値型|
||DECIMAL|可変制度数値型|
|日付|DATE|日付|

---

### テーブルの作成

DBに接続した状態でSQLを実行してください。

```sql
-- テーブルの作成
CREATE TABLE users (
id INT PRIMARY KEY
, name VARCHAR(20)
, mail VARCHAR(30)
, pass VARCHAR(20)
);
```

### 入力時のコツ

テキストのSQLは内容を分かりやすくするため複数行に跨いで改行していますが、1行にまとめて書いても問題ありません。

SQLはデフォルトでは;（セミコロン）で1文の終わりを表す設定になっているため、セミコロンを入力するまでは何行でも改行できます。

（コマンドプロンプト、PowerShellなどの）コマンドライン上での入力の場合、スペルミスがあった場合など、文法に間違いがあった場合には最初から打ち直す必要が出てきます。

入力の手間を省くには、テキストエディタなどにあらかじめSQL文を作成し、それをコピペして実行する方が効率的です。

---

### テーブルの確認

実行後はテーブルが作成されているか確認します。

MySQLの場合

```bash
-- テーブル一覧の確認
> show tables;
```

PostgreSQLの場合

```bash
-- テーブル一覧の確認
> \d
```

```bash
+------------------+
| Tables_in_testdb |
+------------------+
| users            |
+------------------+
```

---

### テーブルの詳細の確認

コマンドでテーブルの詳細を確認したい場合は、以下のコマンドから確認できます。

カラム名などに間違いがないか確認してみてください。

MySQLの場合

```bash
-- テーブルの詳細の確認
> desc テーブル名;
-- 以下でも可能
> describe テーブル名;
```

PostgreSQLの場合

```bash
> \d users
```

```bash
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int(11)     | NO   | PRI | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
| mail  | varchar(30) | YES  |     | NULL    |       |
| pass  | varchar(20) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
```

---

### テーブルの削除

スペルを誤ったなどでテーブルを一度削除したい場合は、以下のコマンドで削除可能です。

削除した場合は再度CREATE文を実行してテーブルを作成してください。

```sql
-- テーブルの削除
> DROP TABLE テーブル名;
```

---

### テーブル作成の解説

テーブル作成のSQLについて解説します。

テーブルを作成するときの書き方は一般的には以下のようになります。

```sql
-- テーブルの作成
CREATE TABLE テーブル名(
カラム名 データ型 制約
,カラム名 データ型 制約
, …
);
```

「CREATE TABLE users」で、usersというテーブル名を作成する、という意味になります。

()の中にはusersテーブルの定義を書きます。

---

```sql
-- テーブルの作成
CREATE TABLE users (
id INT PRIMARY KEY
, name VARCHAR(20)
, mail VARCHAR(30)
, pass VARCHAR(20)
);
```

id、name、mail、passはそれぞれusersテーブルのカラム名を表します。

テーブル名やカラム名は日本語にすることも可能ですが、推奨はされません。

INTとVARCHARはデータ型になります。

INTは整数を表し、VARCHAR可変調の文字列を表します。

(20)は最大20桁までデータが格納できることを表します。

PRIMARY KEY（主キー）は、対象のカラムがレコード毎に一意となる（値の重複を許さない）ことを保証します。

キーの概念についてはテーブル設計で解説します。

この段階では、異なるレコードで値が重複するとエラーになると認識しておきましょう。

---

## 制約

テーブルに対して付与できる制約には他にも以下のものがあります。

ここではPRIMARY KEY以外は使用しませんが、必要に応じて制約を付けられるようにしておきましょう。

### NOT NULL

NOT NULL制約は、単一の列に対して定義されるルールで、この列のNULL値（値がない）の入力を禁止するという制約。即ち、テーブルのすべての行で必ずその列にNULL以外の値が登録されるように制限する制約。

### UNIQUE

一意性制約は、列、または複数の列の組み合わせに対して定義されるルールで、それらの列で値が一意（ユニーク）であるデータに限りデータの挿入･更新を許可する制約。UNIQUE KEYとも呼ばれる。

### PRIMARY KEY

主キー制約は、列、または複数の列の組み合わせに対して定義されるルールで、表の中の行を一意（ユニーク）に識別するための制約。一意性制約と違って、主キーは1つのテーブルに1つしか設定できない。また主キー制約は、一意性制約にNOT NULL制約が加わったものとして見ることができる（つまり定義された列、または複数の列は重複が許されずNULLも許されない）。

---

### FOREIGN KEY

外部キー制約は、テーブルとテーブルの間をテーブル内の列（または列の組み合わせ）で、参照という関連付けを定義するルールをいう。外部キー制約はテーブル同士の関連付けを行い、子テーブルは親テーブルを参照し、子テーブルの参照列を外部キーを呼ぶ。親テーブルと子テーブルの間でデータの整合性を保つ。子テーブルに入力される値は親テーブルに存在する値かNULLでなければならない。参照整合性制約やREFERENCE KEYなどとも呼ばれる。

### CHECK

チェック制約は、入力条件を定義した制約で、列に条件を満たす値のみ入力が許可される。

---

## SQLの分類

SQLは大きく以下の3つに分類できます。

* DDL(Data Definition Language)
* DML(Data Manipulation Language)
* DCL(Data Control Language)

---

### DDL(Data Definition Language)

DDLは、データベース内のオブジェクト（ユーザー、テーブル、インデックス、ビューなど）の操作に使用します。

* CREATE
  * オブジェクトを作成する
* DROP
  * オブジェクトを削除する
* ALTER
  * オブジェクトの定義を変更する
* TRUNCATE
  * テーブルのデータをリセットする

---

### DML(Data Manipulation Language)

DMLはテーブルのレコードに対する操作で使用します。

* SELECT
  * テーブルのレコードを取得する
* INSERT
  * テーブルにレコードを挿入する
* UPDATE
  * レコードを更新する
* DELETE
  * レコードを削除する

---

### DCL(Data Control Language)

DCLはDDL、DML以外の構文で、トランザクションの制御などで使用する構文が含まれます。

ここでは詳細は割愛します。

これ以降はDML（SELECT, INSERT, UPDATE, DELETE）の基本的な書き方を見ていきます。

その他の構文については必要に応じて調べながら使えるようにしてください。

なお、先に述べたようにSQLはDBMS製品毎に若干の違いがあります。
インターネットで調べる際には、使用しているDBMSの名称を検索キーワードに含めて検索してください。

---

## INSERT

INSERTはテーブルに新しいレコードを登録するためのSQLです。

構文

```sql
-- 基本構文
INSERT INTO テーブル名 
(カラム1, カラム2, …) VALUES (値1, 値2, …);
```

---

### シンプルなINSERT文

下記のSQLはusersテーブルに1レコード登録するINSERT文です。
改行は処理に影響しないので1行で書いても構いません。
ただし改行されている部分は半角スペースを1つ以上入れてください。

```sql
-- 1レコードをインサート
INSERT INTO users 
(id, name, mail, pass)
 VALUES (1, 'Alice', 'alice@test.co.jp', 'test');
```

以下のような結果が表示されれば成功です。
エラーが出た場合はSQLの文法か、環境に問題があります。
SQLにスペルミスがないか、あるいは接続されているDB環境が間違っていないか、テーブルが存在しているか、などを確認してください。

MySQLの場合

```text
Query OK, 1 row affected
```

PostgreSQL

```text
INSERT 0 1
```

---

### 大文字と小文字の区別

なお、このテキストでは読みやすさを考慮してSQLのキーワード（INSERT, SELECTなど）は大文字、テーブル名やカラム名は小文字で表記します。

SQLは大文字と小文字を区別しないため、大文字と小文字は自分の好きなように書いて構いません。

ただし、文字列（'で囲われた部分）は大文字と小文字を区別するので、間違えないように注意してください。

---

### 結果の確認

INSERTを実行した後は、レコードが登録されていることを確認します。
下記のSQL文を実行してください。テーブルの中身が表示ます。

```sql
-- 結果の確認
SELECT * FROM users;
```

結果

| id | name | mail | pass |
|--:|:--|:--|:--|
| 1 | Alice | alice@test.co.jp | test |

SELECT文はテーブルのレコードを取得する際に使用するSQL文です。

SELECT文についてはINSERT文の後に詳しく見ていきますが、一旦下記のSQLで対象のテーブルのレコードを全件取得できると理解してください。

今後はINSERT文の実行後はSELECT文を実行してレコードの状態を確認するようにしてください。

---

### 重複エラー

続いて、先程実行したINSERT文とまったく同じINSERT文をもう一度実行してみてください。

```sql
INSERT INTO users 
(id, name, mail, pass)
 VALUES (1, 'Alice', 'alice@test.co.jp', 'test');
```

重複エラー
結果は以下のようなエラーが出るはずです。

MySQLの場合

```text
ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'
```

PostgreSQL

```text
ERROR:  重複したキー値は一意性制約"users_pkey"違反となります
DETAIL:  キー (id)=(1) はすでに存在します。
```

これは、PRIMARY KEYに設定しているidの値が重複してレコードを登録しようとしたことが原因のエラーです。
PRIMARY KEYに設定しているカラムは、異なるレコードで同じ値を持つことはできません。必ず異なる値をセットするようにしてください。

---

### カラム指定の省略

2件目のレコードをインサートしてみます。
ここではカラム名をの部分を省略してみます。
テーブルの全てのカラムに値をセットする場合、カラム名の部分は省略可能です。この時、値の順番がテーブル定義のカラムの並びになっている必要があります。

```sql
-- カラムの指定を省略してインサート
INSERT INTO users 
VALUES (2, 'Bob', 'bob@test.co.jp', 'test');
```

問題なく実行できたかと思います。
テーブルの全てのカラムに値をセットする場合、カラム名の部分は省略可能です。この時、値の順番がテーブル定義のカラムの並びになっている必要があります。
実行した後はSELECT文を実行して中身を確認してください。

---

### カラム指定

3件目のレコードをインサートしてみます。
ここではパスワードの部分を省略してみます。

```sql
-- passには値を設定しない
INSERT INTO users (id, name, mail) 
VALUES (3, 'Chris', 'chris@test.co.jp');
```

実行後はSELECT文をで中身を確認し、passの値がどうなているかを確認してください。

passの中身はnullになっているかと思います。

nullは値が入っていないことを表します。

ここではpassのカラムに制約がついていないため、nullがセットされてもエラーにはなりませんでしたが、テーブル作成時に「NOT NULL」制約をつけていた場合、INSERT時にエラーが発生します。

---

### 複数レコードをまとめてインサート

続いては複数件のレコードをまとめてインサートしてみます。
カンマ区切りでデータを複数書くことで、まとめてインサートできます。
1件でもエラーがあると全てインサートされなくなるので注意してください。

```sql
-- まとめてインサート
INSERT INTO users
VALUES 
(4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');
```

---

## INSERT文まとめ

* INSERTはテーブルにレコードを挿入するための構文
* 全ての値をセットする場合は、カラムの指定を省略することができる
* カラムを指定して特定のカラムのみに値をセットすることができる
* 複数のレコードをまとめてINSERTすることができる

---

## SELECT

### レコードの準備

ここではINSERTの章で登録したレコードが存在する前提で解説をします。
レコードの値や件数が変わっている場合は下記のSQLを実行してレコードを元の状態に戻しておいてください。

```sql
DELETE FROM users;
INSERT INTO users
VALUES
(1, 'Alice', 'alice@test.co.jp', 'test')
, (2, 'Bob', 'bob@test.co.jp', 'test')
, (3, 'Chris', 'chris@test.co.jp', NULL)
, (4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');
```

---

### SELECTの基本構文

SELECT文はレコードを取得する際に使用するSQLです。
基本構文は以下になります。
カラムリストでは、取得したいカラムをカンマ区切りで指定します。

```sql
-- 基本構文
SELECT カラムリスト 
FROM テーブル名 
WHERE 絞り込み条件;
```

---

### 全カラム、全レコードの取得

テーブルの全レコードを取得する場合は、WHERE句を省略できます。
SELECT句に「*」を指定することでテーブルの全カラムを取得できます。

```sql
-- テーブルの全レコードを取得する
SELECT * FROM テーブル名;
```

---

まずは全カラム、全レコードを取得してテーブルの中身を確認します。

```sql
-- 全カラム全レコード指定
SELECT * FROM users;
```

結果

| id | name   | mail | pass |
|--:|:--|:--|:--|
| 1 | Alice | alice@test.co.jp | test |
| 2 | Bob   | bob@test.co.jp  | test  |
| 3 | Chris | chris@test.co.jp  | NULL  |
| 4 | 佐藤  | sato@gmail.com  | password |
| 5 | 鈴木  | suzuki@yahoo.co.jp | password |
| 6 | 田中  | tanaka@gmail.com | password |

---

### カラムの指定

続いてはカラムを指定してレコードを取得します。
全てのカラムを取得する必要がない場合は、SELECT句に取得したいカラム名を任意の順番で指定できます。

```sql
-- id, name, mailのカラムのみを取得する
SELECT id, name, mail 
FROM users;
```

結果

| id | name | mail |
|--:|:--|:--|
|     1 | Alice    | alice@test.co.jp  |
|     2 | Bob      | bob@test.co.jp |
|     3 | Chris    | chris@test.co.jp |
|     4 | 佐藤     | sato@gmail.com |
|     5 | 鈴木     | suzuki@yahoo.co.jp  |
|     6 | 田中     | tanaka@gmail.com   |

---

### WHERE句

続いて条件指定してレコードを取得してみます。

特定のレコードを取得したい場合はWHERE句を使って、絞り込み条件を追加します。
ここではidの値が1のレコードを取得します。

```sql
-- idが1のレコードを取得する
SELECT *  FROM users
WHERE id = 1;
```

結果

| id    | name  | mail | pass |
|--:|:--|:--|:--|
|  1    | Alice   | alice@test.co.jp | test   |

---

### 該当レコードなし

条件に該当するレコードがない場合も実行してみます。
取得結果は表示されませんが、エラーにもなりません。
SQLでは対象のレコードが存在しない場合でも、文法にミスがなければエラーにはなりません。

```sql
-- 該当レコードがないSQL
SELECT *  FROM users
WHERE id = 9999;
```

結果（MySQLの場合）

```text
Empty set (0.070 sec)
```

---

### AND演算子

idとnameの値を指定してレコードを取得してみます。
条件を複数指定するにはANDで条件を結合します。
文字列を指定する場合は'（シングルクォート）で囲います。
ANDで条件を複数指定した場合、全ての条件に一致するレコードが取得されます。

```sql
-- idが1 かつ nameがAliceのレコードを取得する
SELECT *  FROM users
WHERE id = 1
AND name = 'Alice';
```

結果

| id    | name  | mail                    | pass  |
|--:|:--|:--|:--|
|  1    | Alice   | alice@test.co.jp | test   |

---

### OR演算子

idかnameで合致するレコードを取得します。
いずれかの条件に合致する場合としたい時にはORで条件を結合します。

```sql
-- idが1 または nameがBobのレコードを取得する
SELECT *  FROM users
WHERE id = 1
OR name = 'Bob';
```

結果

| id    | name  | mail                    | pass  |
|--:|:--|:--|:--|
|     1 | Alice  | alice@test.co.jp  | test    |
|     2 | Bob    | bob@test.co.jp   | test    |

---

### 比較演算

=で比較した場合は値が等しいかどうかを比較します。

<=, <, >, >=, !=(<>)による比較も可能です。

SQLで使用可能な比較演算子は以下になります。

|演算子|意味|
|:--:|:--:|
|=|等しい|
|>=|以上（左辺が右辺以上）|
|>|大なり|
|<=|以下|
|<|小なり|
|<>, != | 等しくない|

---

idが3以下のレコードを取得する場合は以下のようにします。

```sql
-- idが3以下のレコードを取得する
SELECT *  FROM users
WHERE id <= 3;
```

結果

| id    | name  | mail                    | pass   |
|--:|:--|:--|:--|
|     1 | Alice   | alice@test.co.jp  | test    |
|     2 | Bob     | bob@test.co.jp   | test    |
|     3 | Chris   | chris@test.co.jp | NULL |

---

idが3以外のレコードを取得する場合は以下のようにします。

```sql
-- idが3以外のレコードを取得する
SELECT *  FROM users
WHERE id <> 3;
```

結果

| id    | name   | mail                           | pass        |
|--:|:--|:--|:--|
|     1 | Alice    | alice@test.co.jp        | test          |
|     2 | Bob      | bob@test.co.jp         | test          |
|     4 | 佐藤     | sato@gmail.com       | password |
|     5 | 鈴木     | suzuki@yahoo.co.jp  | password |
|     6 | 田中     | tanaka@gmail.com   | password |

---

### NULL比較

レコードをINSERTする際に値を指定しなかった場合や、NULLを指定した場合は、NULLと呼ばれる特殊な値がセットされます。
NULLの場合、=では比較できず、IS使って比較します。

```sql
-- passがNULLのレコードを取得する
SELECT *  FROM users
WHERE pass IS NULL;
```

結果

| id    | name  | mail                    | pass   |
|--:|:--|:--|:--|
|     3 | Chris   | chris@test.co.jp | NULL |

---

### NOT演算子

条件の否定をする場合にはNOT演算子を使用します。
例えば、passがnull以外の値を取得したい場合は以下のようにします。

```sql
-- passがNULL以外のレコードを取得する
SELECT *  FROM users
WHERE pass IS NOT NULL;
```

結果

| id | name | mail | pass  |
|--:|:--|:--|:--|
| 1 | Alice | alice@test.co.jp | test |
| 2 | Bob | bob@test.co.jp | test |
| 4 | 佐藤 | sato@gmail.com | password |
| 5 | 鈴木 | suzuki@yahoo.co.jp | password |
| 6 | 田中 | tanaka@gmail.com | password |

---

### IN演算子

1つのカラムに対して、複数の値で条件したい場合は、INを使用します。
ORで実現することもできますが、INを使うことでスッキリ書くことができます。

```sql
-- idが1と2と3のレコードを取得する
SELECT *  FROM users
WHERE id IN (1, 2, 3);
```

結果

| id | name  | mail | pass |
|--:|:--|:--|:--|
| 1 | Alice | alice@test.co.jp | test |
| 2 | Bob | bob@test.co.jp | test |
| 3 | Chris | chris@test.co.jp | NULL |

---

INとNOTを組み合わせることもできます。

```sql
-- idが1と2と3以外のレコードを取得する
SELECT *  FROM users
WHERE id NOT IN (1, 2, 3);
```

結果

| id | name | mail | pass |
|--:|:--|:--|:--|
| 4 | 佐藤 | sato@gmail.com | password |
| 5 | 鈴木 | suzuki@yahoo.co.jp | password |
| 6 | 田中 | tanaka@gmail.com | password |

---

### BETWEEN演算子

値に対して範囲指定を行いたい場合は、BETWEEN演算子が使用できます。

```sql
-- idが2~5のレコードを取得する
SELECT * FROM users
WHERE id BETWEEN 2 AND 5;
```

以下のSQLでも実質同じことができる

```sql
SELECT * FROM users
WHERE id >= 2
AND id <= 5;
```

結果

| id | name | mail | pass |
|--:|:--|:--|:--|
| 2 | Bob   | bob@test.co.jp | test |
| 3 | Chris | chris@test.co.jp | NULL |
| 4 | 佐藤  | sato@gmail.com | password |
| 5 | 鈴木  | suzuki@yahoo.co.jp | password |

---

### LIKE演算子

部分一致などの、あいまい検索を行いたい場合は、LIKE演算子を使用できます。
%で任意の0文字以上という意味になります。
%をどこに指定するかによって、前方一致、後方一致、部分一致の検索方法があります。

```sql
-- メールアドレスの後ろが「@gmail.com」になっているレコードを取得する
-- 後方一致と呼ばれる
SELECT * FROM users
WHERE mail LIKE '%@gmail.com';
```

結果

| id | name | mail | pass |
|--:|:--|:--|:--|
| 4 | 佐藤 | sato@gmail.com | password |
| 6 | 田中 | tanaka@gmail.com | password |

---

```sql
-- 前方一致
-- メールアドレスがsatoから始まるレコードがヒットする
SELECT * FROM users
WHERE mail LIKE 'sato%';

-- 部分一致
-- メールアドレスに@が入るレコードがヒットする
SELECT * FROM users
WHERE mail LIKE '%@%';
```

---

### エイリアス

カラムを指定する際表示されるカラム名に別名をつけることができます。
この別名のことをエイリアスと言います。
ASは省略することが可能です。

```sql
-- nameとmailとpassに別名をつける
SELECT 
id 
, name AS 名前 -- ASは省略可能
, mail AS メールアドレス
, pass AS パスワード
FROM users;
```

結果

| id | 名前 | メールアドレス | パスワード |
|--:|:--|:--|:--|
| 1 | Alice | alice@test.co.jp  | test |

---

## SELECT文まとめ

* 全てのカラムを取得したい場合はSELECT句に「*」を指定する
* レコードを絞り込む場合はWHERE句を指定する
* 条件を複数指定する場合はANDやORを使用する
* 値の比較は比較演算子を使用する
* NULLと比較する場合はIS演算子を使用する
* 1つのカラムに複数の値を使用する場合はIN演算子を使用する
* 値の範囲指定をする場合はBETWEEN演算子を使用する
* あいまい検索をする場合はLIKE演算子を使用する
* カラムにはエイリアス（別名）をつけることができる

---

## UPDATE

---

### UPDATEの基本構文

UPDATEは既存のレコードに対して、カラムの値を更新するためのSQLになります。
基本構文は以下になります。
WHERE句で指定できる条件はSELECTで使用できるものと同じです。

```sql
-- 基本構文
UPDATE テーブル名
  SET カラム名 = 値, …
WHERE 絞り込み条件;
```

---

### UPDATE基本形

基本的なUPDATE文です。
WHERE句を指定しないと全てのレコードが更新されるので注意してください。
更新後はSELECT文を実行して値が更新されているか確認してください。

```sql
-- passを変更する
UPDATE users
  SET pass = 'testtest'
WHERE id = 1;
```

---

### 複数の値を更新

カンマ区切りで複数の値をまとめて更新することも可能です。

```sql
-- passを変更する
UPDATE users
  SET name = 'アリス', pass = 'testtest'
WHERE id = 1;
```

---

## DELETE

---

### DELETEの基本構文

DELETEはレコードを削除するSQLです。
削除されたレコードは基本的に元に戻せません。
絞り込み条件を指定しなかった場合、対象のテーブルの全てのレコードが削除されてしまうので、注意が必要です。

```sql
-- 基本構文
DELETE FROM テーブル名
WHERE 絞り込み条件;
```

---

### DELETE基本形

基本的なDELETE文です。
DELETEはレコード単位での削除になるため、カラムを指定することはできません。
特定のカラムに対して値を空白やNULLにしたい場合は、UPDATE文を使用します。

```sql
-- idが1のレコードを削除する
DELETE FROM users
WHERE id = 1;
```

---

## まとめ

* SQLはRDBを操作するための言語
* SQLはDDL、DML、DCLの3つに分類される
* DDLはテーブルなど、データベースにおけるオブジェクトの作成・削除・定義の変更などを行うもの。CREATE、DROP、ALTERなどがある
* DMLはレコードの操作を行うもの。SELECT、INSERT、UPDATE、DELETEがある

---

### DMLのSQL基本構文まとめ

```sql
INSERT INTO テーブル名 
(カラム1, カラム2, …) VALUES (値1, 値2, …);
```

```sql
SELECT カラムリスト 
FROM テーブル名 
WHERE 絞り込み条件;
```

```sql
UPDATE テーブル名
  SET カラム名 = 値, …
WHERE 絞り込み条件;
```

```sql
DELETE FROM テーブル名
WHERE 絞り込み条件;
```

---

### 絞り込み条件で使用できる演算子

* 論理演算子
  * AND, OR , NOT
* 比較演算子
  * <=, <, >, >=, !=, <>
* IS演算子
  * NULL判定で使用
* IN演算子
  * 1つのカラムに対して複数の値をORで指定したい場合に使用
* BETWEEN
  * 値の範囲指定をするときに使用
* LIKE演算子
  * あいまい検索で使用

---

SQLで使用する構文のほとんどはDMLです。
また、その中でも最も使用頻度が高いのはSELECT文です。
SELECTを使いこなすことができれば他の構文も使いこなすことができます。
ここで紹介したSELECTの使い方は基本的なものです。
SELECTでは他もに結合・集約・サブクエリなど、さまざまな機能を持っています。

---

## 使用したSQL一覧

```sql
-- テーブルの作成
CREATE TABLE users (
id INT PRIMARY KEY
, name VARCHAR(20)
, mail VARCHAR(30)
, pass VARCHAR(20)
);

-- 1レコードをインサート
INSERT INTO users 
(id, name, mail, pass)
 VALUES (1, 'Alice', 'alice@test.co.jp', 'test');

-- 結果の確認
SELECT * FROM usrs;

-- 重複エラー
INSERT INTO users 
(id, name, mail, pass)
 VALUES (1, 'Alice', 'alice@test.co.jp', 'test');

-- カラムの指定を省略してインサート
INSERT INTO users 
VALUES (2, 'Bob', 'bob@test.co.jp', 'test');

-- passには値を設定しない
INSERT INTO users (id, name, mail) 
VALUES (3, 'Chris', 'chris@test.co.jp');

-- まとめてインサート
INSERT INTO users
VALUES 
(4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');


-- レコードの準備
DELETE FROM users;
INSERT INTO users
VALUES
(1, 'Alice', 'alice@test.co.jp', 'test')
, (2, 'Bob', 'bob@test.co.jp', 'test')
, (3, 'Chris', 'chris@test.co.jp', NULL)
, (4, '佐藤', 'sato@gmail.com', 'password')
, (5, '鈴木', 'suzuki@yahoo.co.jp', 'password')
, (6, '田中', 'tanaka@gmail.com', 'password');


-- 全カラム全レコード指定
SELECT * FROM usrs;

-- id, name, mailのカラムのみを取得する
SELECT id, name, mail
FROM users;

-- idが1のレコードを取得する
SELECT *  FROM users
WHERE id = 1;

-- idが1 かつ nameがAliceのレコードを取得する
SELECT *  FROM users
WHERE id = 1
AND name = 'Alice';

-- idが1 または nameがBobのレコードを取得する
SELECT *  FROM users
WHERE id = 1
OR name = 'Bob';

-- idが3以下のレコードを取得する
SELECT *  FROM users
WHERE id <= 3;

-- idが3以外のレコードを取得する
SELECT *  FROM users
WHERE id <> 3;

-- passがNULLのレコードを取得する
SELECT *  FROM users
WHERE pass IS NULL;

-- passがNULL以外のレコードを取得する
SELECT *  FROM users
WHERE pass IS NOT NULL;

-- idが1と2と3のレコードを取得する
SELECT *  FROM users
WHERE id IN (1, 2, 3);

-- idが2~5のレコードを取得する
SELECT * FROM users
WHERE id BETWEEN 2 AND 5;

-- メールアドレスの後ろが「@gmail.com」になっているレコードを取得する
SELECT * FROM users
WHERE mail LIKE '%@gmail.com';

-- nameとmailとpassに別名をつける
SELECT 
id 
, name AS 名前
, mail AS メールアドレス
, pass AS パスワード
FROM users;

-- passを変更する
UPDATE users
  SET pass = 'testtest'
WHERE id = 1;

-- passを変更する
UPDATE users
  SET name = 'アリス', pass = 'testtest'
WHERE id = 1;

-- idが1のレコードを削除する
DELETE FROM users
WHERE id = 1;
```

---

## 講義動画

[SQL概要](https://youtu.be/oqOxZxK2vPI)
