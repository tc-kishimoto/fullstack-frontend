# SQL実践編

---

## 概要

* SQLの基礎構文と現場で使用できるテクニックを学習します。
* SQLの書き方と速度について学習します。

---

## 事前準備

事前にテーブルとテストデータを用意します。
使用するDB製品は任意ですが、ここではPostgreSQLを前提とします。
任意のDBに接続し、以下のSQLを実行してテーブルとテストデータを作成しておいてください。

テーブルとテストデータ作成用SQL

```sql
-- GROUP BY 用
drop table if exists EX_SALES_GROUP;
create table EX_SALES_GROUP as 
select '2018/9/1' SALES_DATE, '商品A' item_name, 300 price, 10 quantity
union
select '2018/9/2' , '商品A' , 300 , 5 
union
select '2018/9/3' , '商品A' , 300 , 20 
union
select '2018/9/4' , '商品B' , 400 , 8 
union
select '2018/9/5' , '商品B' , 400 , 5 
union
select '2018/9/6' , '商品C' , 500 , 5 
union
select '2018/9/7' , '商品C' , 500 , 10 
union
select '2018/9/8' , '商品C' , 500 , 8 
union
select '2018/9/9' , '商品C' , 500 , 7
union
select '2018/9/10' , '商品C' , 500 , 10 ;

-- DISTINCT用
drop table if exists EX_SALES_DISTINCT;
create table EX_SALES_DISTINCT as 
select '2018/9/1' sales_date, '顧客A' customer_name, '商品①' item_name, 10 quantity, 1000 amount
union
select '2018/9/1', '顧客B', '商品①', 20, 4000
union
select '2018/9/2', '顧客A', '商品③', 10, 3000
union
select '2018/9/2', '顧客B', '商品①', 5, 500
union
select '2018/9/2', '顧客C', '商品③', 5, 1500
union
select '2018/9/3', '顧客C', '商品③', 2, 600
union
select '2018/9/4', '顧客A', '商品①', 5, 500
union
select '2018/9/4', '顧客B', '商品②', 10, 2000
union
select '2018/9/5', '顧客A', '商品②', 3, 600;

-- クロス結合用
drop table if exists EX_PG_LANGUAGE; 
create table ex_pg_language as
select 'PHP' pg_language
union
select 'Java'
union
select 'Ruby';

drop table if exists EX_DBMS;
create table EX_DBMS as 
select 'Oracle' DBMB_NAME
union
select 'MySQL'
union
select 'PostgreSQL';

-- 結合用
drop table if exists ex_items; 
create table ex_items as 
select 1 id , 'りんご' item_name
union
select 2 ,'バナナ'
union
select 3 ,'オレンジ'
union
select 4 ,'ぶどう'
union
select 5 ,'いちご'
union
select 6 ,'メロン';

drop table if exists ex_item_price; 
create table ex_item_price as 
select 1 id, 100 price
union
select 2 ,160
union
select 3 ,80
union
select 7 ,300
union
select 8 ,200
union
select 9 ,600;

-- 集合演算用
drop table if exists Astore_items; 
create table Astore_items as 
select 1 id, 'りんご' item_name, 100 price
union
select 2 , 'バナナ' , 160
union
select 3 , 'オレンジ' , 80
union
select 4 , 'ぶどう' , 300
union
select 5 , 'いちご' , 200;

drop table if exists Bstore_items; 
create table Bstore_items as 
select 1 id, 'りんご' item_name, 100 price
union
select 2 , 'バナナ' , 160
union
select 3 , 'オレンジ' , 90
union
select 6 , 'メロン' , 600;

-- 並び替え用
drop table if exists ex_sales_order;
create table ex_sales_order as 
select '2018/9/1' sales_date, '商品A' item_name, 100 price, 15 quantity
union
select '2018/9/3' , '商品C' , 300 , 7
union
select '2018/9/2' , '商品A' , 100 , 20
union
select '2018/9/2' , '商品B' , 200 , 12
union
select '2018/9/4' , '商品B' , 200 , 5;

-- 関数用
drop table if exists ex_sales_function;
create table ex_sales_function as 
select '2018/09/01' sales_date, 'water' item_name, 156 price, 5.5 weight
union
select '2018/09/02', 'tea' item_name, 156 price, 5.5 weight;


-- サブクエリ用
drop table if exists ex_item_sub;
create table ex_item_sub as 
select '001' item_id, '商品A' item_name, 200 price
union
select '002' , '商品B' , 350
union
select '003' , '商品C' , 170
union
select '004' , '商品D' , 200
union
select '005' , '商品E' , 300;

drop table if exists ex_sales_sub;
create table ex_sales_sub as 
select '2018/9/1' sales_date,'001' item_id, 20 quantity
union
select '2018/9/2' ,'001' , 15
union
select '2018/9/3' ,'002' , 40
union
select '2018/9/4' ,'002' , 30
union
select '2018/9/5' ,'003' , 50;

-- CASE用
drop table if exists ex_item_case;
create table ex_item_case as 
select '001' item_id, '商品A' item_name, 1000 price
union
select '002' , '商品B' , 5000
union
select '003' , '商品C' , 10000;

-- ウィンドウ関数
drop table if exists ex_sales_window; 
create table ex_sales_window as 
select '2018/9/1' sales_date, 'X商店' customer,'商品A' item_name, 200 price, 100 quantity
union
select '2018/9/1' ,'X商店' ,'商品B' , 300 , 50
union
select '2018/9/1' ,'X商店' ,'商品C' , 500 , 10
union
select '2018/9/2' ,'Y商店' ,'商品A' , 200 , 40
union
select '2018/9/2' ,'Y商店' ,'商品B' , 300 , 150
union
select '2018/9/3' ,'Z商店' ,'商品C' , 500 , 80;
```

---

## SQLの基本

### SQLとは

* SQLとは、データベース（特にRDBMS）を操作するための言語です。
* Structure Query Languageの略（と言われている）で、Query（問い合わせ）をDBMSに投げることで、実行結果を取得できます。
* 通常のプログラミング言語（C言語、Java、PHPなど）を手続き型言語（HOW型）と呼ぶのに対し、SQLは非手続き型言語（WHAT型）と呼ばれます。

SQLは、データベース製品に実装されている言語です。
そのため、製品によって仕様が異なります。
講義では、PostgreSQLを使用します。内容によっては他のDBでは使用できないものもあるので、注意してください。

* 主なDB製品
  * Oracle DB
  * SQL Server
  * MySQL
  * PostgreSQL
  * DB2
  * SQLite
  * etc...

---

### SQLの分類

SQLは大きくDDL, DML, DCLの3つに分類されます。

* DDL(Data Definition Language)
  * CREATE
  * DROP
  * ALTER
* DML(Data Manipulation Language)
  * SELECT
  * INSERT
  * UPDATE
  * DELETE
* DCL(Data Control Language)
  * COMMIT
  * ROLLBACK

---

## 基本構文

### INSERT文の基本構文

```sql
-- 一般的なインサート文
INSERT INTO テーブル名(カラム1, …) VALUES (値1, …);
```

```sql
-- 全カラムに値をセットするときはカラムのリストは省略可
INSERT INTO テーブル名 VALUES (値1, …);
```

```sql
-- SELECTの実行結果をそのままインサートもできる
INSERT INTO テーブル名 (カラム1, …) SELECT句;
```

### DELETE文の基本構文

```sql
-- 一般的なデリート文
-- 条件を絞り込まないと全件削除されるので注意
DELETE FROM テーブル名
WHERE 絞り込み条件
```

### UPDATE文の基本構文

```sql
-- 一般的なアップデート文
-- 値の部分ではサブクエリも使用可能
UPDATE テーブル名
SET カラム1 = 値1
, カラム2 = 値2
…
WHERE 絞り込み条件;
```

```sql
-- 複数のカラムを一気に指定する
-- Oracleで使用可能
UPDATE テーブル名
SET 
(カラム1, カラム2, …) = (値1, 値2, …)
…
WHERE 絞り込み条件;
```

---

### SELECT文の基本構文

```sql
-- テーブルの全カラム・全レコードを取得
SELECT *
FROM テーブル名;
```

```sql
-- カラムを指定してレコードを取得
SELECT カラム1, カラム2, ....
FROM テーブル名; 
```

```sql
-- レコードを絞り込む
SELECT *
FROM テーブル名
WHERE 絞り込み条件;
```

```sql
-- レコードの並び替え
SELECT *
FROM テーブル名
ORDER BY カラム名1, ... (ASC|DESC) ;
```

```sql
-- 集約
SELECT ...
FROM テーブル名
GROUP BY カラム名1, ...
HAVING 絞り込み条件;
```

```sql
-- レコード件数の制限
SELECT *
FROM テーブル名
LIMIT 件数;
```

---

よく使用されるSQLの構文の組み合わせです。

```sql
-- 基本構文
SELECT カラム1, ... -- 取得したいカラムリスト
FROM テーブル名 -- レコードの取得対象のテーブル
JOIN句 結合対象テーブル -- 結合対象のテーブル
ON 結合条件 -- 結合条件
WHERE 絞込条件1 ... -- レコードの絞り込み
GROUP BY カラム1, ... -- 集約
HAVING 絞り込み条件 -- 集約後の絞り込み
ORDER BY カラム1, ... -- 並び替え
;
```

### SQLのコメント

* SQL文におけるコメントは2つあります。

1. 1行コメント：「-- コメント」
2. 複数行コメント：「\/\* コメント \*\/」

```sql
-- カラム2と3はコメント
SELECT 
column1
/* 
, column2
, column3 
*/
FROM table1;
```

### SQLで使用できる演算子

#### 算術演算子

* \+ ： 加算
* \- ： 減算
* \* ： 乗算
* \/ ： 除算
* \% ： 剰余（DB製品によってはmod関数を使用）

* ||
  * 文字列結合（DB製品によっては + 演算子を使用）

```sql
-- 演算と文字列結合
SELECT 1 + 2 加算, 10 – 5 減算, 5 * 5 乗算
, 10 / 3 除算, 10 % 3 剰余
, 'abc' || 'def' 文字列結合;
```

結果

|加算|減算|乗算|除算|剰余|文字列結合|
|:--|:--|:--|:--|:--|:--|
|3|5|25|3|1|abcdef|

---

#### 比較演算子

* = ： 等しい
* <> ： 等しくない（!=でも可）
* \>=、<=、>、< ： 以上、以下、大なり、小なり
* IS ： NULL判定で使用

#### 論理演算子

* NOT：否定
* AND：論理積
* OR ： 論理和

```sql
-- 比較演算子と論理演算
SELECT ...
FROM table1
WHERE column1 >= 10 AND column2 = 'a'
AND column3 IS NOT NULL;
```

---

### WHERE句でよく使用する演算子

* IN：ORによる複数の条件指定を1つにまとめます。
* LIKE：あいまい検索での絞り込みをします。
* BETWEEN：カラムに対して範囲指定で絞り込みをします。

```sql
-- WHERE句で使用する演算子
SELECT ...
FROM table1
WHERE colmn1 IN ('AAA', 'BBB', 'CCC')
AND column2 LIKE '%ABC%'
AND column3 BETWEEN 100 AND 200;
```

---

### エイリアス

* SQLでは、カラムやテーブルに対して別名を付けることができます。
* 別名のことをエイリアスといいます。
* エイリアスを使用する際は、「AS」を付ける場合とつけない場合があります。

```sql
-- 基本構文
SELECT カラム1 エイリアス名, カラム2 AS エイリアス名
FROM テーブル名;
```

---

## 実践SQL

### 集約(GROUP BY)

GROUP BY は複数のレコードを1行にまとめる場合に使用します。
集約関数（COUNT, SUM, MAX, MIN, AVGなど）と組み合わせて使用する場合が多いです。
集約関数の結果に対して絞り込み条件を指定する場合は、HAVING句を使用します。

```sql
-- 例
SELECT column1, SUM(column2), COUNT(*)
FROM table1
GROUP BY column1 
HAVING SUM(column2) > 10000;
```

#### WHEREとHAVINGの違い

集約関数を適用しないカラムで絞り込みを行う場合、WHERE句で絞り込む方法とHAVING句で絞り込む方法があります。
以下の例では結果は同じになりますが、パフォーマンスに差が出ます。

```sql
-- 例①
SELECT column1, SUM(column2)
FROM table1
WHERE column1 = 200
GROUP BY column1 ;
```

```sql
-- 例②
SELECT column1, SUM(column2)
FROM table1
GROUP BY column1 
HAVING column1 = 200;
```

この例の場合、基本的に①の方が速度は速くなります。
集約の処理はコストのかかる処理ですが、WHEREで条件指定した場合、レコードをあらかじめ絞り込んだ後に集約するため、かかるコストは低くなります。
一方でHAVINGによる絞り込みの場合、集約を行った後の絞り込みのため、コストが高くなります。

---

### COUNT関数（実習）

COUNTは集約したレコードの件数を取得する際に使用します。

```sql
-- 集約前
SELECT * FROM ex_sales_group;
```

結果

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018//9/1|商品A|300|10|
|2018//9/2|商品A|300|5|
|2018//9/3|商品A|300|20|
|2018//9/4|商品B|400|8|
|2018//9/5|商品B|400|5|
|2018//9/6|商品A|500|5|
|2018//9/7|商品A|500|10|
|2018//9/8|商品A|500|8|
|2018//9/9|商品A|500|7|
|2018//9/10|商品A|500|10|

```sql
-- 商品ごとのレコード件数を取得
SELECT item_name
, COUNT(*) count
FROM ex_sales_group
GROUP BY item_name
ORDER BY item_name;
```

結果

|items|count|
|:--|:--|
|商品A|3|
|商品B|2|
|商品C|5|

---

### SUM関数

SUMは数値の合計を求めるときに使用します。

```sql
-- 集約前
SELECT * FROM ex_sales_group;
```

結果

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018//9/1|商品A|300|10|
|2018//9/2|商品A|300|5|
|2018//9/3|商品A|300|20|
|2018//9/4|商品B|400|8|
|2018//9/5|商品B|400|5|
|2018//9/6|商品A|500|5|
|2018//9/7|商品A|500|10|
|2018//9/8|商品A|500|8|
|2018//9/9|商品A|500|7|
|2018//9/10|商品A|500|10|

```sql
-- 商品ごとの数量と金額の合計を取得
SELECT item_name
, SUM(quantity) sum_quantity
, SUM(price * quantity) total 
FROM ex_sales_group
GROUP BY item_name
ORDER BY item_name;
```

|item_name|sum_quantity|total|
|:--|:--|:--|
|商品A|35|10500|
|商品B|13|5200|
|商品C|40|20000|

---

### MAX関数, MIN関数

MAXは最大値を、MINは最小値を求めます。

```sql
-- 集約前
SELECT * FROM ex_sales_group;
```

結果

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018//9/1|商品A|300|10|
|2018//9/2|商品A|300|5|
|2018//9/3|商品A|300|20|
|2018//9/4|商品B|400|8|
|2018//9/5|商品B|400|5|
|2018//9/6|商品A|500|5|
|2018//9/7|商品A|500|10|
|2018//9/8|商品A|500|8|
|2018//9/9|商品A|500|7|
|2018//9/10|商品A|500|10|

```sql
-- 商品ごとの数量と金額の合計を取得
SELECT item_name
, MAX(quantity) max_quantity,
MIN(quantity) min_quantity
, MAX(sales_date) new_sales_date
FROM ex_sales_group
GROUP BY item_name
ORDER BY item_name;
```

結果

|item_name|max_quantity|min_quantity|new_sales_date|
|:--|:--|:--|:--|
|商品A|20|5|2018/9/3|
|商品B|8|5|2018/9/5|
|商品C|10|5|2018/9/9|

---

### MAX関数は超便利

MAX関数は、最大値を求める場合にしか使用しないものと思われがちですが、実はかなり使い勝手のいい関数です。
以下の様に、item_codeをキーに集約するが、item_nameも一緒に結果を表示したいという場合にMAXが有効です。

ex_sales

|sales_date|item_code|item_name|price|quantity|
|:--|:--|:--|:--|:--|
|2018/9/3|002|商品B|300|20|
|2018/9/2|001|商品A|300|5|
|2018/9/1|001|商品A|300|10|

```sql
-- 商品ごとの数量と金額の合計を取得
SELECT item_code, max(item_name) item_name
, sum(price * quantity) total
FROM ex_sales
GROUP BY item_code
ORDER BY item_code;
```

結果

|item_code|item_name|total|
|:--|:--|:--|
|001|商品A|4500|
|002|商品B|6000|

---

### 重複の削除 DISTINCT

SELECT句に記述したカラムの組み合わせを重複を排除した形で取得できます。

```sql
-- 書き方
SELECT DISTINCT column1, column2, …
FROM table1
```

```sql
SELECT * FROM ex_sales_distinct
```

|sales_date|customer_name|item_name|quantity|amount|
|:--|:--|:--|:--|:--|
|2018/9/1|顧客A|商品①|10|1000|
|2018/9/1|顧客B|商品①|20|4000|
|2018/9/2|顧客A|商品③|10|3000|
|2018/9/2|顧客B|商品①|5|500|
|2018/9/2|顧客C|商品③|5|1500|
|2018/9/3|顧客C|商品③|2|600|
|2018/9/4|顧客A|商品①|5|500|
|2018/9/4|顧客B|商品②|10|2000|
|2018/9/5|顧客A|商品②|3|600|

```sql
-- 顧客と商品の組み合わせを取得
SELECT DISTINCT customer_name, item_name
FROM ex_sales_distinct;
```

結果

|customer_name|item_name|
|:--|:--|
|顧客A|商品①|
|顧客A|商品②|
|顧客A|商品③|
|顧客A|商品①|
|顧客B|商品②|
|顧客B|商品③|

---

### 並び替え ORDER BY

SELECT文を実行した際の結果の並び順を指定したい場合にはORDER BY句を指定します。
並び替えの基準となるカラムを指定し、昇順の場合はASC, 降順の場合はDESCを指定します。省略した場合は昇順となります。
カラムは複数指定することも可能です。その場合、優先順位の高いものから順に記述します。

```sql
-- 書き方
SELECT句
FROM句
WHERE句
ORDER BY column1 (ASC|DESC), column2 (ASC|DESC),…
```

---

```sql
SELECT * FROM ex_sales_order
```

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018/9/1|商品A|100|15|
|2018/9/3|商品C|300|7|
|2018/9/2|商品A|100|20|
|2018/9/2|商品B|200|12|
|2018/9/4|商品B|200|5|

```sql
-- 金額の降順で並べる
SELECT * , price * quantity AS amount
FROM ex_sales_order
ORDER BY price * quantity DESC;
```

|sales_date|item_name|price|quantity|amount|
|:--|:--|:--|:--|:--|
|2018/9/2|商品B|200|12|2400|
|2018/9/3|商品C|300|7|2100|
|2018/9/2|商品A|100|20|2000|
|2018/9/1|商品A|100|15|1500|
|2018/9/4|商品B|200|5|1000|

---

### 取得行数の制限

LIMIT, OFFSET

取得するレコード件数を制限したい場合はLIMITを使用します。
一般的にはORDER BYの後に書きます。
また、OFFSETを使用すると、読み飛ばす件数も同時に指定できます。

```sql
-- 書き方
SELECT句
FROM句
WHERE句
ORDER BY句
LIMIT 取得件数
OFFSET 読み飛ばす件数
```

---

LIMITの例

```sql
SELECT * FROM ex_sales_order
```

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018/9/1|商品A|100|15|
|2018/9/3|商品C|300|7|
|2018/9/2|商品A|100|20|
|2018/9/2|商品B|200|12|
|2018/9/4|商品B|200|5|

```sql
-- 日付の昇順で並べ、上位3件を取得する
SELECT * FROM ex_sales_order
ORDER BY sales_date
LIMIT 3;
```

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018/9/1|商品A|100|15|
|2018/9/2|商品A|100|20|
|2018/9/2|商品B|200|12|

---

OFFSETの例

```sql
SELECT * FROM ex_sales_order
```

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018/9/1|商品A|100|15|
|2018/9/3|商品C|300|7|
|2018/9/2|商品A|100|20|
|2018/9/2|商品B|200|12|
|2018/9/4|商品B|200|5|

```sql
-- 日付の昇順で並べ、上位3件を読み飛ばして2件取得する
SELECT * FROM ex_sales_order
ORDER BY sales_date
LIMIT 2
OFFSET 3
```

|sales_date|item_name|price|quantity|
|:--|:--|:--|:--|
|2018/9/3|商品C|300|7|
|2018/9/4|商品B|200|5|

---

## 結合(JOIN)

---

### 結合の種類

結合にはいくつかの種類があります。

* クロス結合
* 内部結合
* 外部結合
* 自己結合
* 自然結合

などがあります。

---

### クロス結合

結合対象となるテーブルのレコードの全ての組み合わせを取得する結合方法です。
2通りの書き方があります。

```sql
-- 書き方①
SELECT * FROM table1 
CROSS JOIN table2
```

```sql
-- 書き方②
SELECT * FROM table1, table2
```

取得するレコード数は「Aのレコード数 × Bのレコード数」です。
②の書き方の場合、内部結合をしようとして、結合条件を記述し忘れた際に、意図せずクロス結合になってしまうことがあるので注意が必要です。

---

クロス結合の例

ex_pg_language

|pg_language|
|:--|
|PHP|
|Java|
|Ruby|

ex_dbms

|dbms_name|
|:--|
|Oracle|
|MySQL|
|PostgreSQL|

```sql
SELECT *
FROM ex_pg_language
CROSS JOIN ex_dbms;
```

結果

|pg_language|dbms_name|
|:--|:--|
|PHP|Oracle|
|PHP|MySQL|
|PHP|PostgreSQL|
|Java|Oracle|
|Java|MySQL|
|Java|PostgreSQL|
|Ruby|Oracle|
|Ruby|MySQL|
|Ruby|PostgreSQL|

結合結果のレコード数は「3×3 = 9レコード」となります。

#### クロス結合はほとんど使用しない

クロス結合は、対象となるレコード同士のすべての組み合わせを取得するため、パフォーマンスが低下します。
これを使用しなければ実現できない、という場合以外は基本的に使用しません。（滅多にないですが。。）

---

### 内部結合

結合条件を指定し、合致するレコードのみを取得する結合方法です。
2通りの書き方があります。

```sql
-- 書き方①
SELECT * FROM table1 t1
INNER JOIN table2 t2
ON t1.column = t2.column
```

```sql
-- 書き方②
SELECT * FROM table1 t1, table2 t2
WHERE t1.column = t2.column
```

お勧めは①の書き方。
②の書き方の場合、絞り込み条件なのか結合条件なのかが分かりにくくなります。また、結合条件を書き忘れてもエラーにならず、意図せずクロス結合が行われてしまいます。

---

内部結合の例

ex_items

|id|item_name|
|:--|:--|
|1|りんご|
|2|バナナ|
|3|オレンジ|
|4|ぶどう|
|5|いちご|
|6|メロン|

ex_item_price

|id|price|
|:--|:--|
|1|100|
|2|160|
|3|160|
|7|300|
|8|200|
|9|600|

```sql
-- 内部結合
SELECT item.id, item_name, price
FROM ex_items item
INNER JOIN ex_item_price ex_price
ON item.id = ex_price.id
ORDER BY item.id;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|

---

### 外部結合

外部結合は3つの種類があります。
左外部結合、右外部結合、全外部結合、の3つです。
左外部結合と右外部結合は、実質的に同じです。
全外部結合はDBMSによってはサポートされていないので注意が必要です。

```sql
-- 書き方（左外部結合）
SELECT * FROM table1 t1
LEFT OUTER JOIN table2 t2
ON t1.column = t2.column;
```

```sql
-- 書き方（右外部結合）
SELECT * FROM table1 t1
RIGHT OUTER JOIN table2 t2
ON t1.column = t2.column;
```

```sql
-- 書き方（全外部結合）
SELECT * FROM table1 t1
FULL OUTER JOIN table2 t2
ON t1.column = t2.column
```

---

左外部結合の例

ex_items

|id|item_name|
|:--|:--|
|1|りんご|
|2|バナナ|
|3|オレンジ|
|4|ぶどう|
|5|いちご|
|6|メロン|

ex_item_price

|id|price|
|:--|:--|
|1|100|
|2|160|
|3|160|
|7|300|
|8|200|
|9|600|

```sql
-- 左外部結合
SELECT i.id, item_name, price
FROM ex_items i
LEFT OUTER JOIN ex_item_price p
ON i.id = p.id
ORDER BY i.id;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|(NULL)|
|5|いちご|(NULL)|
|6|メロン|(NULL)|

---

### 左外部結合（注意点）

以下の2つのSQLの違いが分かりますか？

```sql
-- 結合条件での絞り込み
SELECT i.id, item_name, price
FROM ex_items i
LEFT OUTER JOIN ex_item_price p
ON i.id = p.id
AND p.price >= 100
ORDER BY i.id;
```

```sql
-- 結合後の条件での絞り込み
SELECT i.id, item_name, price
FROM ex_items i
LEFT OUTER JOIN ex_item_price p
ON i.id = p.id
WHERE p.price >= 100
ORDER BY i.id;
```

---

一見同じように見えますが結果は以下のようになります。

```sql
-- 結合条件での絞り込み
SELECT i.id, item_name, price
FROM ex_items i
LEFT OUTER JOIN ex_item_price p
ON i.id = p.id
AND p.price >= 100
ORDER BY i.id;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|(NULL)|
|4|ぶどう|(NULL)|
|5|いちご|(NULL)|
|6|メロン|(NULL)|

```sql
-- 結合後の条件での絞り込み
SELECT i.id, item_name, price
FROM ex_items i
LEFT OUTER JOIN ex_item_price p
ON i.id = p.id
WHERE p.price >= 100
ORDER BY i.id;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|

結合条件で絞り込むのか、それとも結合後にWHEREで絞り込むのかによって結果が変わってきます。
違いを理解して適切な使い方をしましょう。

---

右外部結合の例

ex_items

|id|item_name|
|:--|:--|
|1|りんご|
|2|バナナ|
|3|オレンジ|
|4|ぶどう|
|5|いちご|
|6|メロン|

ex_item_price

|id|price|
|:--|:--|
|1|100|
|2|160|
|3|160|
|7|300|
|8|200|
|9|600|

```sql
SELECT p.id, item_name, price
FROM ex_items i
RIGHT OUTER JOIN ex_item_price p
ON i.id = p.id
ORDER BY p.id;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|7|(NULL)|300|
|8|(NULL)|200|
|9|(NULL)|600|

---

全外部結合の例

ex_items

|id|item_name|
|:--|:--|
|1|りんご|
|2|バナナ|
|3|オレンジ|
|4|ぶどう|
|5|いちご|
|6|メロン|

ex_item_price

|id|price|
|:--|:--|
|1|100|
|2|160|
|3|160|
|7|300|
|8|200|
|9|600|

```sql
SELECT i.id id1, p.id id2, item_name, price
FROM ex_items i
FULL OUTER JOIN ex_item_price p
ON i.id = p.id
ORDER BY i.id, p.id;
```

結果

|id1|id2|item_name|price|
|:--|:--|:--|:--|
|1|1|りんご|100|
|2|2|バナナ|160|
|3|3|オレンジ|80|
|4|(NULL)|ぶどう|(NULL)|
|5|(NULL)|いちご|(NULL)|
|6|(NULL)|メロン|(NULL)|
|(NULL)|7|(NULL)|300|
|(NULL)|8|(NULL)|200|
|(NULL)|9|(NULL)|600|

---

### 内部結合と外部結合の名前の由来

集合で考えた時、内部結合で抽出されたレコードはクロス結合の集合に含まれます。
外部結合では、クロス結合の集合に含まれないレコードが抽出されることがあります（NULLを含む場合）。
クロス結合の集合の内部か外部かで、内部結合と外部結合という名前になっています。

![picture 10](/images/1cbecf0ad9b9217ec501083ca72e9605264d82941e1681eaf4403a1715442665.png)  

---

### 自己結合

自分自身のテーブルと結合する結合。
結合対象のテーブルが自分自身のテーブルになっただけで、結合の方法は内部結合と同じです。

```sql
-- 自己結合
SELECT * FROM table1 t1
INNER JOIN table1 t1
ON t1.column = t1.column;
```

---

### 自然結合

結合条件を記述せず、テーブルの同じ名前の列名同士で統合が結ばれる結合。
内部結合よりも記述が短くなりますが、どのカラムで結合しているかはテーブル定義を理解している必要があるため、あえて自然結合で記述するメリットはほとんどないでしょう。

```sql
-- 書き方
SELECT * FROM table1 
NATURAL JOIN table2;
```

```sql
-- 内部結合での表現
SELECT * FROM table1 
INNER JOIN table2
ON table1.id = table2.id;
```

---

### 結合全体のまとめ

通常の業務で多く使用するのは内部結合と左外部結合。
読みやすい書き方で記述する。
DBMSによってはここで紹介した結合のSQLでサポートされていないDBMSもある。また、SQLの実装が異なる場合もあるので注意する。

---

## 集合演算(UNION, EXCEPT, INTERSECT)

### SQLの集合演算

SQLの集合演算とは、SELECT文の結果(表)に対しての表同士の足し算、引き算、掛け算のことです。

* 集合演算の演算子
  * 和集合（UNION）
  * 差集合（EXCEPT）
  * 積集合（INTERSECT）

---

### UNIONとUNION ALL

2つのSELECT文の和集合の結果を得るための演算子。

```sql
-- 書き方
SELECT文①
UNION
SELECT文②
```

```sql
-- 書き方
SELECT文①
UNION ALL
SELECT文②
```

それぞれの演算子で何が違うが分かりますか？

「UNION」と「UNION ALL」の違いは、SELECT文①とSELECT文②に重複があった場合に現れます。
UNION単独の場合、重複は削除して1行のみ表示します。UNION ALL は、重複もそのまま表示します。
パフォーマンス面ではUNION ALLの方が高速になります。UNIONは、重複排除のために内部でソートの処理を行いますが、UNION ALLではソートの処理は行われません。そのため速度に違いがでます。

---

UNIONの例

Astore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|

Bstore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|90|
|6|メロン|600|

```sql
SELECT * FROM Astore_items
UNION
SELECT * FROM Bstore_items;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|3|オレンジ|90|
|4|ぶどう|300|
|5|いちご|200|
|6|メロン|600|

---

UNION ALLの例

Astore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|

Bstore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|90|
|6|メロン|600|

```sql
SELECT * FROM Astore_items
UNION ALL
SELECT * FROM Bstore_items;
```

結果

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|90|
|6|メロン|600|

---

### EXCEPT

UNIONの逆で、差集合を求めるための演算子。

```sql
-- 書き方
SELECT文①
EXCEPT
SELECT文②
```

SELECT文①の結果から下のSELECT文②の結果を除いた結果が取得できる。
Oracleの場合はMINUS演算子がEXCEPTの役割を果たします。

---

EXCEPTの例

Astore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|

Bstore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|90|
|6|メロン|600|

```sql
SELECT * FROM Astore_items
EXCEPT
SELECT * FROM Bstore_items;
```

|id|item_name|price|
|:--|:--|:--|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|

---

### INTERSECT

2つのSELECT文の積（共通部分）を求めるための演算子。

```sql
-- 書き方
SELECT文①
INTERSECT 
SELECT文②
```

SELECT文①とSELECT文②に共通するレコードが取得できる。

---

### INTERSECTの例

Astore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|80|
|4|ぶどう|300|
|5|いちご|200|

Bstore_items

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|
|3|オレンジ|90|
|6|メロン|600|

```sql
SELECT * FROM Astore_items
INTERSECT
SELECT * FROM Bstore_items;
```

|id|item_name|price|
|:--|:--|:--|
|1|りんご|100|
|2|バナナ|160|

---

## 関数

関数とは、引数で値を受け取り、引数によって処理した結果を返すもののことです。
ほとんどのプログラミング言語でも関数（メソッド、ファンクションなど、言語によって呼び方は様々）がありますが、それと同じです。

### 文字列関数

* ||：左辺と右辺の文字列を結合する。
* trim：前後の余白を取り除く。
* substr：部分文字列を作成する。
* char_length：文字列の長さを取得する。
* lower：小文字に変換する。
* upper：大文字に変換する。

```sql
SELECT 
trim(' abc ') f1
, substr('abcdef', 2, 3) f2
, char_length('abcde') f3
, lower('HELLO') f4
, upper('world') f5;
```

|f1|f2|f3|f4|f5|
|:--|:--|:--|:--|:--|:--|
|abc|bcd|5|hello|WORLD|

---

### 数値関数（一部）

* floor：引数の数値よりも小さい整数の中で最も大きい整数を返す。
* ceil：引数の数値よりも大きい整数の中で最も小さい整数を返す。
* random：0～1の範囲でランダムな値を返す。
* round：引数の数値を四捨五入した値を返す。
* trunc：引数の数値の小数点を切り捨てた値を返す。

```sql
SELECT 
floor(10.8) f1
, ceil(10.8) f2
, random() f3
, round(10.5) f4
, trunc(10.9) f5;
```

|f1|f2|f3|f4|f5|
|:--|:--|:--|:--|:--|:--|
|10|11|0.917...|11|10|

---

### 関数まとめ

* 関数は他にも様々な種類があります。詳しくは業務で使用しているDB製品のマニュアルなどを参照してください。
* また、関数はselect句以外でも、where句・group by句・order by句などでも使用可能ですので、柔軟に使いこなせるようにしておきましょう。
* ただし、where句やorder by句で使用する場合、使い方によっては速度に影響がでるので注意してください。
* 関数は自分で作成することも可能です。

---

## サブクエリ (副問い合わせ)

副問い合わせとも呼ばれます。
SELECT文の結果を別のクエリ（SQL文）に使用する書き方。
FROM句として使用したり、結合対象としてサブクエリを使用することも多いです。
更新系のSQLでも使用できます。

```sql
-- 例（SELECT文の結果をJOINの対象にする）
SELECT table1.* , total
FROM table1
INNER JOIN (SELECT id, SUM(num) total
FROM table2 GROUP BY id) t2
ON table1.id = t2.id;
```

---

サブクエリの例

ex_item_sub

|item_id|item_name|price|
|:--|:--|:--|
|001|商品A|200|
|002|商品B|350|
|003|商品C|170|
|004|商品D|200|
|005|商品E|300|

ex_sales_sub

|sales_date|item_id|quantity|
|:--|:--|:--|
|2018/9/1|001|20|
|2018/9/2|001|15|
|2018/9/3|002|40|
|2018/9/4|002|30|
|2018/9/5|003|50|

```sql
-- 例（販売数を商品で集約した結果を、結合に使用する）
SELECT i.*, sum
FROM ex_item_sub i
LEFT OUTER JOIN (SELECT item_id, SUM(quantity) sum
                FROM ex_sales_sub
                GROUP BY item_id) s
ON i.item_id = s.item_id
ORDER BY i.item_id;
```

|item_id|item_name|price|sum|
|:--|:--|:--|:--|
|001|商品A|200|35|
|002|商品B|350|70|
|003|商品C|170|50|
|004|商品D|200|(NULL)|
|005|商品E|300|(NULL)|

---

### 相関サブクエリ

外側のクエリの値を内側のクエリ内で使用するサブクエリ。
よく使用されるのはEXISTSを使用したSQL文。

```sql
-- 例（table2に、idが一致するレコードが存在するtable1のレコードを表示）
SELECT * FROM table1 t1
WHERE EXISTS (SELECT * FROM table2 t2
WHERE t1.id = t2.id);
```

```sql
-- INを使用したEXISTSの代用
SELECT * FROM table1 t1
WHERE id IN (SELECT id FROM table2 t2)
```

---

相関サブクエリの例

ex_item_sub

|item|item_name|price|
|:--|:--|:--|
|001|商品A|200|
|002|商品B|350|
|003|商品C|170|
|004|商品D|200|
|005|商品E|300|

ex_sales_sub

|sales_date|item_id|quantity|
|:--|:--|:--|
|2018/9/1|001|20|
|2018/9/2|001|15|
|2018/9/3|002|40|
|2018/9/4|002|30|
|2018/9/5|003|50|

```sql
-- 9/1～9/3の期間に一度でも販売された商品を取得するSQL文
SELECT * FROM ex_item_sub i
WHERE EXISTS (SELECT * FROM ex_sales_sub
WHERE item_id = i.item_id
AND sales_date BETWEEN '2018/9/1' AND '2018/9/3');
```

結果

|item|item_name|price|
|:--|:--|:--|
|001|商品A|200|
|002|商品B|350|

---

### スカラ・サブクエリ

SELECT句の中にサブクエリを記述する方法。
結果がイメージしやすいが、多用するとパフォーマンスが悪くなる。

```sql
-- SELECT句の中で、別のテーブルのレコードを取得する
SELECT id
, (SELECT name
FROM table2
WHERE id = table1.id) エイリアス名
FROM table1
```

---

スカラ・サブクエリの例

ex_item_sub

|item|item_name|price|
|:--|:--|:--|
|001|商品A|200|
|002|商品B|350|
|003|商品C|170|
|004|商品D|200|
|005|商品E|300|

ex_sales_sub

|sales_date|item_id|quantity|
|:--|:--|:--|
|2018/9/1|001|20|
|2018/9/2|001|15|
|2018/9/3|002|40|
|2018/9/4|002|30|
|2018/9/5|003|50|

```sql
-- 売上のレコードを取得して、商品名も表示する
SELECT 
sales_date
, item_id
, (SELECT item_name FROM ex_item_sub i
WHERE item_id = s.item_id) item_name
, quantity
FROM ex_sales_sub s;
```

結果

|sales_date|item_id|item_name|quantity|
|:--|:--|:--|:--|
|2018/9/4|002|商品B|30|
|2018/9/1|001|商品A|20|
|2018/9/3|002|商品B|40|
|2018/9/2|001|商品A|15|
|2018/9/5|003|商品C|50|

---

## 条件分岐 CASE式

### CASE式

SQLで条件分岐をするための構文です。
SELECT句、WHERE句、GROUP BY句のなど、どこでも使用可能です。
一般的にはWHERE句では使用せずにSELECT句の中で使用することが多い。
maxや、sumなどの集約関数の中に入れ込むこともある。

```sql
-- 書き方
SELECT
    CASE 
        WHEN 条件式1 THEN 値1
        WHEN 条件式2 THEN 値2
        ELSE 値3
    END エイリアス名
FROM table2
```

---

CASE式の例

ex_item_case

|item_id|item_name|price|
|:--|:--|:--|
|001|商品A|1000|
|002|商品B|5000|
|003|商品C|10000|

```sql
-- 単価によってランクを決める
SELECT *
, CASE
WHEN price >= 10000 THEN '高級品'
WHEN price BETWEEN 5000 AND 9999 THEN '普通'
ELSE '安物'
END rank
FROM ex_item_case;
```

結果

|item_id|item_name|price|rank|
|:--|:--|:--|:--|
|001|商品A|1000|安物|
|002|商品B|5000|普通|
|003|商品C|10000|高級品|

---

### CASE式（SELECT句以外での使用）

CASE式はGROUP BY句でORDER BY句でも使用可能です。

```sql
-- 単価のランクでグループ化するし、ランクごとに集計する
SELECT sum(price)
    , CASE
        WHEN price >= 10000 THEN 'A'
        WHEN price BETWEEN 5000 AND 9999 THEN 'B'
        ELSE 'C'
    END rank
FROM ex_item_case
GROUP BY CASE
            WHEN price >= 10000 THEN 'A'
            WHEN price BETWEEN 5000 AND 9999 THEN 'B'
            ELSE 'C'
        END rank;
```

---

### CASE式（集約関数と組み合わせ）

CASE式は集約関数（sum関数やmax関数）と組み合わせることで便利な使い方ができます。
例えば、以下のようなテーブルで、取引ごとに金額を集計し、横に表示したいとします。

取引履歴

|取引|金額|
|:--|:--|
|仕入|100|
|売上|200|
|仕入|300|
|売上|400|

取得したい結果

|仕入金額|売上金額|
|:--|:--|
|400|600|

この場合、以下のようなSQL文で実現可能です。

```sql
-- 単価のランクでグループ化するし、ランクごとに集計する
SELECT
sum(CASE
        WHEN 取引 = '仕入' THEN 金額
        ELSE 0
    END) 仕入金額
, sum(CASE
        WHEN 取引 = '売上' THEN 金額
        ELSE 0
    END) 売上金額
FROM 取引履歴
```

まとめ

CASE式を使用すると柔軟なデータの取得が可能です。
ただし、関数と同様SELECT句以外で使用すると速度に影響が出る可能性もあるので注意が必要です。

---

## ウィンドウ関数

GROUP BY を使わずとも集約関数の結果を取得できる関数。
row_number, count, sum, max, rank, dense_rank などがあります。
使いこなせると非常に便利ですが、DBMSやバージョンによっては実装されていないものもあるので注意が必要です。
関数名() over(…) のように使用します。overの中にはpartition by句とorder by句が記述できます。

```sql
-- 書き方
関数名() over(partition by カラムリスト order by カラムリスト)
```

---

主なウィンドウ関数

* count, sum, max, min：集約関数を同じ
* row_number()：連番の取得
* rank()：ランクを取得
* dense_rank()：ランクを取得

```sql
-- 書き方の例
SELECT
row_number() over(partition by column1 order by column2)
, count() over(partition by column3 order by column4 desc)
FROM table1
```

---

ウィンドウ関数の例

ex_sales_window

|sales_date|customer|item_name|price|quantity|
|:--|:--|:--|:--|:--|
|2018/9/1|X商店|商品A|200|100|
|2018/9/1|X商店|商品B|300|50|
|2018/9/1|X商店|商品C|500|10|
|2018/9/2|Y商店|商品A|200|40|
|2018/9/2|Y商店|商品B|300|150|
|2018/9/3|Z商店|商品A|500|80|

```sql
--例(売上の分析)
SELECT 
row_number() over(ORDER BY sales_date, customer, item_name) 連番
, rank() over(ORDER BY price * quantity DESC) lank 
, sum(price * quantity) over(PARTITION BY sales_date ORDER BY item_name) 累計
, sum(price * quantity) over(PARTITION BY sales_date) 日付合計
FROM ex_sales_window;
```

結果

|連番|売上ランク|累計|日付合計|
|:--|:--|:--|:--|
|1|3|20000|40000|
|2|4|35000|40000|
|3|6|40000|40000|
|4|5|8000|53000|
|5|1|53000|53000|
|6|2|40000|40000|

---

ウィンドウ関数の使い道

多くの業務系のシステムでは、過去のデータを集計して分析資料をアウトプットする機能がついています。

ウィンドウ関数をうまく活用すると、プログラムを作成せずとも一発のSELECT文で分析資料に必要なデータを全て取得できる場合もあります。

多用しすぎると可読性が下がり、メンテナンス性が下がるので注意が必要です。
有効に使うことができれば、プログラムのソースを減らし、かつ速度の改善も見込めるため、使えるようにしておくと良いでしょう。

---

## WITH句

### WITH句

WITH句は、SELECT文の結果に名前を付けることができる構文です。
1つのSQL文が長くなってしまう場合に、SELECT文の途中経過に名前を付けることで、全体のSQL文の可読性を上げることができます。

```sql
-- 書き方
WITH 名前 AS (SELECT文)
```

---

WITH句の例

WITH句の中でのSELECT文の結果に対して、「all_items」という名前を付けることで、WITH句の後に続くSQLで、all_itemsという名前をテーブルのように使用できます。

```sql
-- 例
WITH all_items AS (
SELECT * FROM AStore_items
UNION
SELECT * FROM BStore_items
)
SELECT * FROM all_items;
```

---

## SQLまとめ

* 結合、集合演算、サブクエリの使い方に慣れておきましょう。
* CASE式は非常に便利です。有効に使っていきましょう。
* Windows関数を使えるようになるとデータの分析が非常に楽になります。
* SQLの知識を身に付けるとかなり複雑なデータの取得も1発のSELECT文だけでできるようになります。
* 1発のSELECT文で取得しようとすると、一般に速度は上がりますが、可読性は下がります。
* メリット・デメリットを踏まえたうえでどのようなSQL文を作成したほうが良いかを常に考えるようにしましょう。

## SQL文の書き方

### SQLを書く順番

SQLは以下の順番で作成すると書きやすいです。

1. FROM句（メインテーブル）
2. JOIN句（結合対象のテーブル）
3. WHERE句
4. GROUP BY句
5. HAVING句
6. ORDER BY句
7. SELECT句

---

### 大文字と小文字

SQL文は大文字と小文字を区別しません。
どちらで書いても構いませんが、プロジェクトのコーディング規約で決まりがある場合はその規約に従いましょう。
決まりがない場合、SQL文のキーワード（select, from, whereなど）と、そうでない文字（テーブル名、カラム名など）で大文字小文字は分けるようにしましょう。

```sql
-- キーワードを大文字にする
SELECT col1, col2, col3
FROM table1
WHERE col1 = 100;
```

```sql
-- キーワードを小文字にする
select COL1, COL2, COL3
from TABLE1
where COL1 = 100;
```

---

### 改行

select句でのカラムが増えてくると、カラムごとに改行したほうが読みやすくなります。
その場合カンマを改行前に書く場合と改行後に書く場合があります。
改行前に書いた方が読みやすいと感じる人が多いようですが、改行後に書いた方が、後でカラムを追加する際には楽になります。

```sql
-- 改行前にカンマを入れる
SELECT 
col1, 
col2, 
col3,
col4
FROM table1
```

```sql
-- 改行前にカンマを入れる
SELECT 
col1
, col2
, col3
, col4
FROM table1
```

---

## SQLの速度

### SQLの速度

SQLは同一の結果を得るにも複数の書き方ができます。
複数の書き方が存在する場合に、どちらの書き方がパフォーマンス的に優れているかを学習します。

---

### INとEXISTS

サブクエリで条件指定してレコードを取得する場合、INによる書き方とEXISTSによる書き方があります。
下の2つの書き方は同じ結果になります。どちらがパフォーマンス的にすぐれているでしょうか。

```sql
-- EXISTSの場合
SELECT *
FROM products p
WHERE EXISTS (SELECT * FROM sales 
WHERE products_id = p.products_id);
```

```sql
-- INの場合
SELECT *
FROM products p
WHERE products_id IN (SELECT products_id FROM sales);
```

結論、状況によって変わってきます。
「テーブルのレコード件数」「インデックスの有無」「サブクエリでレコードがどれだけ絞り込まれるか」などの要因で結果が変わります。
先ほどの例の場合、salesのproduct_idにインデックスが張られていれば、existsの方が速い可能性が高いが、実際には実行計画を確認しなければわからりません。

---

### 結合＋DISTINCTとEXISTS

INやEXISTSと同じ結果を得るために、結合を用いることもできます。
ただし結合を使用する場合は、結果を一意にするためDISTINCTが必要な場面もあります。

```sql
-- EXISTSの場合
SELECT *
FROM products p
WHERE EXISTS (SELECT * FROM sales 
WHERE products_id = p.products_id);
```

```sql
-- 結合の場合
SELECT DISTINCT p.*
FROM products p
INNER JOIN sales s
ON p.products_id = s.products_id;
```

このような場合、EXISTSの方が高速になります。
理由は、DISTINCTは重複排除のためにソートをするため、その分のコストがかかります。
DISTINCTを使用しない場合は、結合とEXISTSでどちらの方が速いかはケースバイケースです。

---

### UNIONとUNION ALL

「UNION」と「UNION ALL」では、「UNION ALL」の方が高速です。
理由は、UNIONは重複削除のためにソートの処理を行うためです。
そのため、重複がないと分かっている場合や、ソートの必要がない場合はUNION ALLを使用することにしましょう。

---

### HAVINGとWHERE

GROUP BY句を使用する場合、HAVING句とWHERE句による絞り込みが可能です。例えば以下の2つのSQL文は同じ結果になります。

```sql
-- HAVINGの場合
SELECT category_id, COUNT(*), MAX(products_id), MIN(products_id)
FROM products_2 
GROUP BY category_id
HAVING category_id = 3;
```

```sql
-- WHEREの場合
SELECT category_id, COUNT(*), MAX(products_id), MIN(products_id)
FROM products_2
WHERE category_id = 3
GROUP BY category_id;
```

この場合はWHERE句で絞り込みをした方が高速になります。
理由は、WHERE句であらかじめ絞り込んでおけば、GROUP BYで集約する際のコストを抑えることができるためです。
SUMやCOUNTの結果に対しての条件指定はHAVINGでしかできませんが、WHEREでも絞り込める場合はWHEREで絞り込むようにしましょう。
