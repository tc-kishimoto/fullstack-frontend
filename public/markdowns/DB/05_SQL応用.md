# SQL応用

---

## 概要

SQLの応用的な使い方を学びます。
集約・結合・サブクエリなどの複雑なSQLの使い方を学びます。

---

## 事前準備

この単元では「student」テーブルと「company」テーブルを使用します。
事前に以下のSQLを実行し、テーブルとテストデータを作成してください。
このテキストでは様々なSQL文を紹介しますが、結果は自身の環境でも実行して結果を確認してください。

```sql
-- テーブル削除
-- drop table company;
-- drop table student;

-- 会社
create table company(
    id int primary key
    , name varchar(50)
    , short_name varchar(20)
);

-- 研修生
create table student (
    id int primary key
    , name varchar(30)
    , kana varchar(30)
    , gender int -- 性別 1：男性、2：女性ß
    , company_id int
    , pg_score int -- PGのスコア
    , db_score int -- DBのスコア
);

-- companyデータ登録
insert into company(id, name, short_name)
values 
(1, '株式会社ABC', 'ABC')
, (2, 'EFG株式会社', 'EFG')
, (3, '株式会社HIJ', 'HIJ')
, (4, '株式会社KLM', 'KLM');

-- studentデータ登録
insert into student values(1,'黒木 れいな','クロキ レイナ',2,1,round(random() * 100), round(random() * 100));
insert into student values(2,'小島 戴三','コジマ タイゾウ',1,1,round(random() * 100), round(random() * 100));
insert into student values(3,'齋藤 奈緒美','サイトウ ナオミ',2,1,round(random() * 100), round(random() * 100));
insert into student values(4,'土屋 勝行','ツチヤ カツユキ',1,1,round(random() * 100), round(random() * 100));
insert into student values(5,'村山 直幸','ムラヤマ ナオユキ',1,1,round(random() * 100), round(random() * 100));
insert into student values(6,'松永 栄理子','マツナガ エリコ',2,1,round(random() * 100), round(random() * 100));
insert into student values(7,'田辺 春実','タナベ ハルミ',2,1,round(random() * 100), round(random() * 100));
insert into student values(8,'手塚 英造','テヅカ エイゾウ',1,1,round(random() * 100), round(random() * 100));
insert into student values(9,'柳沢 耕介','ヤナギサワ コウスケ',1,1,round(random() * 100), round(random() * 100));
insert into student values(10,'西田 鎮雄','ニシタ シズオ',1,1,round(random() * 100), round(random() * 100));
insert into student values(11,'渡辺 今朝雄','ワタナベ ケサオ',1,2,round(random() * 100), round(random() * 100));
insert into student values(12,'瀬戸 紀子','セト トシコ',2,2,round(random() * 100), round(random() * 100));
insert into student values(13,'杉田 澄夫','スギタ スミオ',1,2,round(random() * 100), round(random() * 100));
insert into student values(14,'山本 清名','ヤマモト セイナ',2,2,round(random() * 100), round(random() * 100));
insert into student values(15,'原 淳子','ハラ ジュンコ',2,2,round(random() * 100), round(random() * 100));
insert into student values(16,'山内 直広','ヤマウチ ナオヒロ',1,3,round(random() * 100), round(random() * 100));
insert into student values(17,'宮内 敬正','ミヤウチ ヨシマサ',1,3,round(random() * 100), round(random() * 100));
insert into student values(18,'林田 真希','ハヤシダ マキ',2,3,round(random() * 100), round(random() * 100));
insert into student values(19,'川原 菊子','カワハラ キクコ',2,5,round(random() * 100), round(random() * 100));
insert into student values(20,'大石 さやか','オオイシ サヤカ',2,5,round(random() * 100), round(random() * 100));
```

---

### データの確認

テーブルとテストデータが作成できたら、一度中身を確認しておいてください。

```sql
SELECT * FROM company;
```

| id | name | short_name |
|--:|:--|:--|
|  1 | 株式会社ABC | ABC|
|  2 | EFG株式会社 | EFG|
|  3 | 株式会社HIJ | HIJ|
|  4 | 株式会社KLM | KLM|

---

```sql
SELECT * FROM student;
```

| id | name | kana | gender | company_id | pg_score | db_score |
|--:|:--|--:|--:|--:|--:|--:|
|  1 | 黒木 れいな | クロキ レイナ       | 2 | 1 | 40 | 92|
|  2 | 小島 戴三   | コジマ タイゾウ     | 1 | 1 | 87 | 79|
|  3 | 齋藤 奈緒美 | サイトウ ナオミ     | 2 | 1 | 31 |  8|
|  4 | 土屋 勝行   | ツチヤ カツユキ     | 1 | 1 | 49 | 61|
|  5 | 村山 直幸   | ムラヤマ ナオユキ   | 1 | 1 | 87 | 22|
|  6 | 松永 栄理子 | マツナガ エリコ     | 2 | 1 | 24 | 67|
|  7 | 田辺 春実   | タナベ ハルミ       | 2 | 1 | 51 | 91|
|  8 | 手塚 英造   | テヅカ エイゾウ     | 1 | 1 | 32 | 49|
|  9 | 柳沢 耕介   | ヤナギサワ コウスケ | 1 | 1 | 93 | 65|
| 10 | 西田 鎮雄   | ニシタ シズオ       | 1 | 1 | 14 | 88|
| 11 | 渡辺 今朝雄 | ワタナベ ケサオ     | 1 | 2 | 63 | 92|
| 12 | 瀬戸 紀子   | セト トシコ         | 2 | 2 | 16 | 56|
| 13 | 杉田 澄夫   | スギタ スミオ       | 1 | 2 | 53 | 29|
| 14 | 山本 清名   | ヤマモト セイナ     | 2 | 2 | 43 | 38|
| 15 | 原 淳子     | ハラ ジュンコ       | 2 | 2 | 64 | 76|
| 16 | 山内 直広   | ヤマウチ ナオヒロ   | 1 | 3 | 68 | 95|
| 17 | 宮内 敬正   | ミヤウチ ヨシマサ   | 1 | 3 | 98 | 77|
| 18 | 林田 真希   | ハヤシダ マキ       | 2 | 3 | 81 |  7|
| 19 | 川原 菊子   | カワハラ キクコ     | 2 | 5 | 97 | 89|
| 20 | 大石 さやか | オオイシ サヤカ     | 2 | 5 | 61 | 44|

ここからは企業と研修生を表す2つのテーブルを元に様々なSQLを解説します。
studentテーブルのpg_scoreとdb_scoreは、0~100までの値がランダムにセットされるため、環境によって異なります。

---

# 様々なSQL

---

## FROM句を指定しないSQL

SELECT文では、レコードからの値を取得せずに、固定で文字列や数値を取得したい場合、FROM句を省略できます。

```sql
-- FROM句のないSQL
SELECT 'aaa', 10;
```

結果

| aaa  |   10 |
|:--:|:--:|
| aaa  |   10 |

---

## 算術演算

数値については四則演算を行うことができます。

```sql
-- 四則演算
SELECT 10 + 20, 100 - 50, 10 * 10, 10 / 2;
```

結果

| 10 + 20  | 100 - 50  | 10 * 10  | 10 / 2   |
|--:|--:|--:|--:|
| 30 | 50 | 100 | 5.0000 |

---

## エイリアス

SQL文では、カラムやテーブルに対して別名（エイリアス）をつけることができます。
ASを指定することもできますが、省略可能です。

```sql
-- エイリアス
SELECT 
name 企業名
, short_name AS 略称
FROM company;
```

結果  
※2行目以降は省略

| 企業名 | 略称 |
|:--|:--|
| 株式会社ABC | ABC |

---

## 関数

SQLには文字列操作や数値計算などの様々な関数が用意されています。
ここでは小数点を切り捨てするtruncate関数及びtrunc関数を使用しています。
使える関数や関数名などは、DBMSによって異なる場合があるので注意してください。
関数には数値の計算に関するものや、文字列に関するもの、日付に関するものなどがあります。

その他の関数も必要に応じて調べて使えるようにしておきましょう。

```sql
-- 関数
-- MySQLの場合
select name, pg_score, db_score
, (pg_score + db_score) 合計
, truncate((pg_score + db_score) / 2, 0) 平均
from student;

-- PostgreSQLの場合
select name, pg_score, db_score
, (pg_score + db_score) 合計
, trunc((pg_score + db_score) / 2, 0) 平均
from student;
```

---

結果  
※ 結果は人によって異なります。

| name  | pg_score | db_score | 合計     | 平均      |
|:--|--:|--:|--:|--:|
| 黒木 れいな |       40 |       92 |  132 |   66  |
| 小島 戴三   |       87 |       79 |  166 |   83|
| 齋藤 奈緒美 |       31 |        8 |   39 |   19|
| 土屋 勝行   |       49 |       61 |  110 |   55|
| 村山 直幸   |       87 |       22 |  109 |   54|
| 松永 栄理子 |       24 |       67 |   91 |   45|
| 田辺 春実   |       51 |       91 |  142 |   71|
| 手塚 英造   |       32 |       49 |   81 |   40|
| 柳沢 耕介   |       93 |       65 |  158 |   79|
| 西田 鎮雄   |       14 |       88 |  102 |   51|
| 渡辺 今朝雄 |       63 |       92 |  155 |   77|
| 瀬戸 紀子   |       16 |       56 |   72 |   36|
| 杉田 澄夫   |       53 |       29 |   82 |   41|
| 山本 清名   |       43 |       38 |   81 |   40|
| 原 淳子     |       64 |       76 |  140 |   70|
| 山内 直広   |       68 |       95 |  163 |   81|
| 宮内 敬正   |       98 |       77 |  175 |   87|
| 林田 真希   |       81 |        7 |   88 |   44|
| 川原 菊子   |       97 |       89 |  186 |   93|
| 大石 さやか |       61 |       44 |  105 |   52|

---

## コメント

コメントは処理に影響を与えないもので、コードの説明を書く場合などに使用されます。
SQLでは2種類のコメントがあります。
1行コメント「--」と複数行コメント「/**/」があります。

```sql
-- 1行コメント
/*
  複数行コメント
*/

SELECT 
name
-- , short_name  -- この行は無視される
FROM company
```

---

## CASE式

CASE式は、SQLで条件分岐をする場合に使用します。
ここではgenderの値によって性別を表す文字列を表示しています。

```sql
-- CASE式
SELECT name
, CASE 
     WHEN gender = 1 THEN '男性'
     WHEN gender = 2 THEN '女性'
     ELSE 'その他'
END 性別
FROM student;
```

結果  

| name  | 性別  |
|:--|:--|
| 黒木 れいな | 女性|
| 小島 戴三   | 男性|
| 齋藤 奈緒美 | 女性|
| 土屋 勝行   | 男性|
| 村山 直幸   | 男性|
| 松永 栄理子 | 女性|
| 田辺 春実   | 女性|
| 手塚 英造   | 男性|
| 柳沢 耕介   | 男性|
| 西田 鎮雄   | 男性|
| 渡辺 今朝雄 | 男性|
| 瀬戸 紀子   | 女性|
| 杉田 澄夫   | 男性|
| 山本 清名   | 女性|
| 原 淳子     | 女性|
| 山内 直広   | 男性|
| 宮内 敬正   | 男性|
| 林田 真希   | 女性|
| 川原 菊子   | 女性|
| 大石 さやか | 女性|

---

## ORDER BY

レコードの出力順を並び替えたい場合にはORDER BY を使用します。
カラムを指定すると、その値の昇順（小さい順）で並びます。
文字列の値を指定することもでき、その場合は文字コード順に並びます。
カンマ区切りで複数の値を指定することも可能です。

```sql
-- ORDER BY（昇順）
SELECT name, pg_score
FROM student
ORDER BY pg_score;
```

結果  
※以下省略  

| name   | pg_score |
|:--|--:|
| 西田 鎮雄   |  14|
| 瀬戸 紀子   |  16|
| 松永 栄理子 |  24|
| 齋藤 奈緒美 |  31|
| 手塚 英造   |  32|
| 黒木 れいな |  40|
| 山本 清名   |  43|
| 土屋 勝行   |  49|
| 田辺 春実   |  51|
| 杉田 澄夫   |  53|
| 大石 さやか |  61|
| 渡辺 今朝雄 |  63|
| 原 淳子     |  64|
| 山内 直広   |  68|
| 林田 真希   |  81|
| 村山 直幸   |  87|
| 小島 戴三   |  87|
| 柳沢 耕介   |  93|
| 川原 菊子   |  97|
| 宮内 敬正   |  98|

並び順を降順（値が大きい順）にしたい場合は、カラムの後に「DESC」のキーワードを指定します。
DESCを指定しない場合は自動的に昇順なりますが、明示的に昇順であることを示すには「ASC」というキーワードを指定します。

---

```sql
-- ORDER BY（降順）
SELECT name, pg_score
FROM student
ORDER BY pg_score DESC;
```

結果

| name  | pg_score |
|:--|--:|
| 宮内 敬正   | 98|
| 川原 菊子   | 97|
| 柳沢 耕介   | 93|
| 村山 直幸   | 87|
| 小島 戴三   | 87|
| 林田 真希   | 81|
| 山内 直広   | 68|
| 原 淳子     | 64|
| 渡辺 今朝雄 | 63|
| 大石 さやか | 61|
| 杉田 澄夫   | 53|
| 田辺 春実   | 51|
| 土屋 勝行   | 49|
| 山本 清名   | 43|
| 黒木 れいな | 40|
| 手塚 英造   | 32|
| 齋藤 奈緒美 | 31|
| 松永 栄理子 | 24|
| 瀬戸 紀子   | 16|
| 西田 鎮雄   | 14|

---

ORDER BY句はカンマ区切りで複数指定することも可能です。

以下のようにすると、pg_scoreの降順で並んだあと、pg_scoreの値が同じレコードが複数あった場合には、その中でdb_scoreの昇順で並びます。

```sql
-- ORDER BY（pg_scoreの降順、db_scoreの昇順）
SELECT name, pg_score, db_score
FROM student
ORDER BY pg_score DESC, db_score;
```

結果
※pg_scoreが異なるデータは省略

| name  | pg_score | db_score |
|:--|--:|--:|
| 村山 直幸   | 87 | 22 |
| 小島 戴三   | 87 | 79 |

---

## 集約関数

複数のレコードを集約して結果を取得する関数です。

sum, avg, max, min, countなどがあります。

```sql
-- 集約関数
SELECT
sum(pg_score) 合計, avg(pg_score) 平均
, max(pg_score) 最高, min(pg_score) 最低
, count(*) 件数
FROM student;
```

結果

| 合計      | 平均       | 最高     | 最低    | 件数      |
|--:|--:|--:|--:|--:|
| 1152 | 57.6000 |   98 |   14 |   20 |

---

通常の関数（truncate関数など）は、1つの値から1つの結果を得るものでしたが、集約関数は複数のレコードをまとめて1つの結果となることに注意してください。そのため、集約関数を使用した場合、基本的には結果が1レコードになるため、集約関数を使用しない通常のカラムと混在させることはできません。

```sql
-- 以下はエラーになる
-- 1レコードに集約されるため、nameを表示することができない
SELECT
name, count(*) 件数
FROM student;
```

後述のGROUP BYを使用することで、通常のカラムも使用できるケースもあります。

---

## GROUP BY

集約関数はそのまま使用すると、取得する全てのレコードを1レコードに集約します。
GROUP BYを使用すると、指定したカラムをもとに集約できます。
以下は性別ごとの合計と平均を求める例です。

```sql
-- 集約関数
SELECT
gender
, sum(pg_score) PG合計
, avg(pg_score) PG平均
FROM student
GROUP BY gender;
```

結果

| gender  | PG合計   | PG平均   |
|--:|--:|--:|
| 2 | 508 | 50.8000 |
| 1 | 644 | 64.4000 |

---

企業ごとに集計すると以下のようになります。
GROUP BYを指定した場合、SELECT句の中で指定できるものは、集約関数か、GROUP BYで指定したカラムに限ります。

```sql
-- 集約関数
SELECT
company_id
, sum(pg_score) PG合計
, avg(pg_score) PG平均
FROM student
GROUP BY company_id
ORDER BY company_id;
```

結果

| company_id | PG合計   | PG平均   |
|--:|--:|--:|
| 1 | 508 | 50.8000 |
| 2 | 239 | 47.8000 |
| 3 | 247 | 82.3333 |
| 5 | 158 | 79.0000 |

---

GROUP BYでカラムを複数指定することもできます。
以下は企業、性別単位での合計と平均を求めたSQLになります。

```sql
-- 集約関数
SELECT
company_id
, gender
, sum(pg_score) PG合計
, avg(pg_score) PG平均
FROM student
GROUP BY company_id, gender
ORDER BY company_id, gender;
```

結果

| company_id | gender | PG合計   | PG平均   |
|--:|--:|--:|--:|
| 1 |      1 |    362 | 60.3333 |
| 1 |      2 |    146 | 36.5000 |
| 2 |      1 |    116 | 58.0000 |
| 2 |      2 |    123 | 41.0000 |
| 3 |      1 |    166 | 83.0000 |
| 3 |      2 |     81 | 81.0000 |
| 5 |      2 |    158 | 79.0000 |

---

### HAVING

集計した結果で絞り込みを行いたい場合は、HAVINGを使用します。
以下は、平均が70以上で絞り込みを行なった例です。

```sql
-- 集約関数
SELECT
company_id
, sum(pg_score) PG合計
, avg(pg_score) PG平均
FROM student
GROUP BY company_id
HAVING avg(pg_score) >= 70;
```

結果

| company_id | PG合計   | PG平均   |
|--:|--:|--:|
| 3 |  247 | 82.3333 |
| 5 |  158 | 79.0000 |

---

**HAVINGとWHERE**  
HAVINGとWHEREは両方とも絞り込みを行う構文ですが、別物なので混乱しないように注意してください。
WHEREは、元のレコードを絞り込むために使用するものです。
HAVINGは、GROUP BYを使って集約を行った後、集約結果から表示するデータを絞り込むために使用します。
別々の用途で使用するものなので、1つのSQL文の中で混在することも可能です。

---

### 結合（JOIN）

複数のテーブルのデータをまとめて同時に取得したい場合があります。
例えば、studentテーブルにはcompany_idのカラムがありますが、idの値だけを見ても会社名は分かりません。会社名を知るには、companyテーブルのレコードも取得する必要があります。
このような場合は、テーブルの結合で実現できます。
テーブルの結合にはJOINキーワードを使います。
以下はstudetテーブルとcompanyテーブルを結合し、研修生の名前と会社名を同時に取得しています。

---

```sql
-- 結合
SELECT s.name s_name
, c.name c_name
FROM student s
INNER JOIN company c
ON s.company_id = c.id;
```

結果
※以下は省略

| s_name | c_name |
|:--|:--|
| 黒木 れいな | 株式会社ABC|
| 小島 戴三   | 株式会社ABC|
| 齋藤 奈緒美 | 株式会社ABC|
| 土屋 勝行   | 株式会社ABC|
| 村山 直幸   | 株式会社ABC|
| 松永 栄理子 | 株式会社ABC|
| 田辺 春実   | 株式会社ABC|
| 手塚 英造   | 株式会社ABC|
| 柳沢 耕介   | 株式会社ABC|
| 西田 鎮雄   | 株式会社ABC|
| 渡辺 今朝雄 | EFG株式会社|
| 瀬戸 紀子   | EFG株式会社|
| 杉田 澄夫   | EFG株式会社|
| 山本 清名   | EFG株式会社|
| 原 淳子     | EFG株式会社|
| 山内 直広   | 株式会社HIJ|
| 宮内 敬正   | 株式会社HIJ|
| 林田 真希   | 株式会社HIJ|

---

### 結合の種類

結合にはいくつかの種類があります。
その中でも、大きく内部結合と外部結合の2つに分けることができます。
外部結合はさらに左外部結合、右外部結合、全外部結合の3つに分けることができます。
しかし、左外部結合と右外部結合は本質的に違いがなく、全外部結合は使用する場面が少ないので、左外部結合のみ紹介します。
結合は他にもクロス結合、自然結合などもありますが、これらも使用頻度は少ないので省略します。
必要に応じて調べてみてください。

結合の種類

* 内部結合
* 外部結合
  * 左外部結合
  * 右外部結合
  * 全外部結合
* クロス結合
* 自然結合

等がある。

---

### 内部結合（INNER JOIN）

先程の例で紹介したSQLは内部結合の例です。
内部結合はINNER JOINの後に結合対象のテーブルを指定し、ONの後に結合条件を指定します。
INNERは省略可能です。
ここではテーブルに対してそれぞれ「s」と「c」というエイリアスつけて、結合条件の記述を短く書けるようにしています。

```sql
-- 内部結合
SELECT s.name s_name
, c.name c_name
FROM student s
INNER JOIN company c
ON s.company_id = c.id;

-- INNERを省略して以下でもOK
SELECT s.name s_name
, c.name c_name
FROM student s
JOIN company c
ON s.company_id = c.id;
```

---

結果  

| s_name | c_name |
|:--|:--|
| 黒木 れいな | 株式会社ABC|
| 小島 戴三   | 株式会社ABC|
| 齋藤 奈緒美 | 株式会社ABC|
| 土屋 勝行   | 株式会社ABC|
| 村山 直幸   | 株式会社ABC|
| 松永 栄理子 | 株式会社ABC|
| 田辺 春実   | 株式会社ABC|
| 手塚 英造   | 株式会社ABC|
| 柳沢 耕介   | 株式会社ABC|
| 西田 鎮雄   | 株式会社ABC|
| 渡辺 今朝雄 | EFG株式会社|
| 瀬戸 紀子   | EFG株式会社|
| 杉田 澄夫   | EFG株式会社|
| 山本 清名   | EFG株式会社|
| 原 淳子     | EFG株式会社|
| 山内 直広   | 株式会社HIJ|
| 宮内 敬正   | 株式会社HIJ|
| 林田 真希   | 株式会社HIJ|

---

JOINを使わずに、FROM句でテーブルを指定し、WHEREで条件を指定する方法もあります。どちらを使用するかは好みによるところですが、JOINを使用することが、テーブルの結合を使用していることが明確で分かりやすいため、JOINを使う書き方を推奨します。

```sql
-- JOINを使わない以下の方法もある
SELECT s.name s_name
, c.name c_name
FROM student s, company c
WHERE s.company_id = c.id;
```

テストデータではstudentテーブルは20レコードを用意していますが、内部結合の結果では18件しか出力されていません。
company_idの値が5のレコードが2件ありますが、その2件が表示されていません。
これはcompanyテーブルにidが5のレコードがないことが原因です。
内部結合では両方のテーブルにレコードが存在しているレコードのみが取得対象になります。

---

### 外部結合（OUTER JOIN）

内部結合では出力されなかった、結合対象となるレコードがないレコード（company_idが5のレコード）も出力したい場合は、外部結合（OUTER JOIN）を使用します。
LEFT OUTER JOINで、左外部結合という意味になり、studentテーブルを起点にしてcompanyテーブルを結合します。
OUTERは省略可能です。

```sql
-- 左外部結合
SELECT s.name s_name
, c.name c_name
FROM student s
LEFT OUTER JOIN company c
ON s.company_id = c.id
WHERE s.company_id IN (3, 4, 5);

-- OUTERを省略して以下でも可能
SELECT s.name s_name
, c.name c_name
FROM student s
LEFT JOIN company c
ON s.company_id = c.id
WHERE s.company_id IN (3, 4, 5);
```

---

結果

| s_name | c_name  |
|:--|:--|
| 山内 直広 | 株式会社HIJ |
| 宮内 敬正 | 株式会社HIJ |
| 林田 真希 | 株式会社HIJ |
| 川原 菊子 | NULL  |
| 大石 さやか | NULL |

外部結合では、内部結合で出力されなかったレコードも出力されていることがわかります。
結合できなかったレコードは結果がNULLになります。
どのような結果が欲しいかによって内部結合と外部結合を使い分けられるようにしましょう。

---

## サブクエリ

SQLでは、SQL文の中で別のSELECT文を入れ込むことができます。
SQL文の一部に別のSELECT文があるものをサブクエリ（日本語だと副問い合わせ）と呼びます。
以下はSELECTの結果をWHERE句の一部として使用するサブクエリです。

short_nameが「ABC」である会社に属しているstudentのレコードを取得したい場合、以下のようになります。

```sql
-- サブクエリ
select name, company_id
from student
where company_id = (SELECT id 
                    FROM company
                    WHERE short_name = 'ABC');
```

---

結果（10件）

| name  | company_id |
|:--|--:|
| 黒木 れいな |  1 |
| 小島 戴三   |  1 |
| 齋藤 奈緒美 |  1 |
| 土屋 勝行   |  1 |
| 村山 直幸   |  1 |
| 松永 栄理子 |  1 |
| 田辺 春実   |  1 |
| 手塚 英造   |  1 |
| 柳沢 耕介   |  1 |
| 西田 鎮雄   |  1 |

WHERE句の中でサブクエリを使用する場合、サブクエリの結果が複数レコードになる場合は、INを使った条件を指定します。
サブクエリはUPDATEやDELETE文のWHERE句でも使用可能です。

---

```sql
-- サブクエリ
SELECT name, company_id
FROM student
WHERE company_id IN
                    (SELECT id 
                    FROM company 
                    WHERE name like '株式会社%');
```

結果

| name  | company_id |
|:--|--:|
| 黒木 れいな |  1 |
| 小島 戴三   |  1 |
| 齋藤 奈緒美 |  1 |
| 土屋 勝行   |  1 |
| 村山 直幸   |  1 |
| 松永 栄理子 |  1 |
| 田辺 春実   |  1 |
| 手塚 英造   |  1 |
| 柳沢 耕介   |  1 |
| 西田 鎮雄   |  1 |
| 山内 直広   |  3 |
| 宮内 敬正   |  3 |
| 林田 真希   |  3 |

---

### 相関サブクエリ

先のサブクエリは、existsというキーワードを使って以下のようにも書けます。

```sql
select name, company_id
from student s
where exists (SELECT id 
                FROM company
                WHERE short_name = 'ABC'
                AND id = s.company_id);
```

---

**２つのサブクエリの違いについて**

```sql
-- サブクエリ1
select name, company_id
from student
where company_id = (SELECT id 
                    FROM company
                    WHERE short_name = 'ABC');

-- サブクエリ2
select name, company_id
from student s
where exists (SELECT id 
                FROM company
                WHERE short_name = 'ABC'
                AND id = s.company_id);
```

上記の2つのSQLは、結果として同じになりますが、内部的な動作には違いがあります。

サブクエリ1の方は、先にサブクエリ（内側のSELECT文）が実行され、その結果を元に外側のSQLを実行します。

サブクエリ2の方は、外側のSELECT文を実行しながら、その結果の1レコードずつに対して、existsの中のSELECT文が実行されます。

このような違いから、結果が同じでも速度に差が出る場合があります。

ただし、どちらが速いかはデータの量やテーブルや設計の仕方により異なるため、どちらの書き方が良いかは一概には言えません。ここでは速度の調査方法について割愛しますが、速度に違いが出る場合があることを知っておいてください。

---

相関サブクエリはSELECT句の中で使用することもできます。
ただし、取得結果が1件になるSELECT文でなければエラーになります。
以下の例のような、外側のSELECT文レコードを使用する形式のサブクエリ（id = s.company_idの部分が該当）を相関サブクエリといいます。

```sql
-- 相関サブクエリ
SELECT 
   (SELECT name  
    FROM company 
    WHERE id = s.company_id) 企業名
, s.name
FROM student s;
```

結果  
※後半は省略

| 企業名 | name |
|:--|:--|
| 株式会社ABC | 黒木 れいな |
| 株式会社ABC | 小島 戴三   |
| 株式会社ABC | 齋藤 奈緒美 |
| 株式会社ABC | 土屋 勝行   |
| 株式会社ABC | 村山 直幸   |
| 株式会社ABC | 松永 栄理子 |
| 株式会社ABC | 田辺 春実   |
| 株式会社ABC | 手塚 英造   |
| 株式会社ABC | 柳沢 耕介   |
| 株式会社ABC | 西田 鎮雄   |
| EFG株式会社 | 渡辺 今朝雄 |
| EFG株式会社 | 瀬戸 紀子   |
| EFG株式会社 | 杉田 澄夫   |
| EFG株式会社 | 山本 清名   |
| EFG株式会社 | 原 淳子     |
| 株式会社HIJ | 山内 直広   |
| 株式会社HIJ | 宮内 敬正   |
| 株式会社HIJ | 林田 真希   |
| NULL      | 川原 菊子  |
| NULL      | 大石 さやか |

---

### インラインビュー

SELECT文の結果を一時的なテーブルとみなし、結合対象のテーブルと指定使用することもできます。

SELECTの結果で表現される一時的なテーブルをインラインビューと呼びます。

```sql
SELECT c.name, s.pg_avg
FROM company c
-- インラインビュー
JOIN (SELECT company_id,
          avg(pg_score) pg_avg
          FROM student 
          GROUP BY company_id) s
ON c.id = s.company_id;
```

結果

| name | pg_avg  |
|:--|--:|
| 株式会社ABC | 50.8000 |
| EFG株式会社 | 47.8000 |
| 株式会社HIJ | 82.3333 |

---

## 集合演算

SQLでは、SELECT文の結果に対して集合演算（和、差、積）が行えます。
ここでは使用頻度の多い和集合（UNION）について解説します。

---

### UNION

複数のSELECT文の結果を同時に取得したい場合にはUNIONを使用することで実現できます。
UNIONを使用する場合はそれぞれのSELECT文のカラムの数とデータ型が一致している必要があります。

```sql
-- UNION
SELECT 1 id, 'aaa' name
UNION 
SELECT 2, 'bbb'
```

結果

| id | name |
|--:|:--|
| 1 | aaa |
| 2 | bbb |

---

### UNION ALL

UNIONの代わりにUNION ALLを使用することもできます。
UNIONでは、上と下のSELECTの結果で同じになるレコードがあれば、重複を排除して表示します。
一方でUNION ALLは重複があった場合でもそのまま出力します。
重複を許すかどうかで使い分けましょう。
どちらでも結果が変わらない場合はUNION ALLの方が速度が速くなります。

```sql
-- UNION ALL
SELECT 1 id, 'aaa' name
UNION ALL
SELECT 2, 'bbb'
```

結果

| id | name |
|--:|:--|
| 1 | aaa |
| 2 | bbb |

---

UNIONやUNION ALLは集合演算と呼ばれる演算の一種で、和集合を表します（それぞれのSELECTの結果の和集合を取得するのがUNIONです）。
集合演算では和集合以外でも、差集合（EXCEPT、Oracleの場合はMINUS）、関集合（INTERSECT）があります。
UNIONに比べると使用頻度は低く、DBMSによってはサポートされていない場合もありますが、知識として知っておくと良いでしょう。

---

## SELECT文をデータの作成に使用する

SELECT文は、CREATE文やINSERT文と組み合わせて作成することも可能です。

```sql
-- companyテーブルを元にcompany_backupテーブルを作成
-- テーブルが作成されると同時に、データも登録される
CREATE TABLE company_backup as SELECT * FROM company;

-- 一旦データを削除
DELETE FROM company_backup;

-- companyテーブルのデータをcompany_backupにINSERT
INSERT INTO company_backup SELECT * FROM company;
```

CREATE TABLEとSELECTの組み合わせは、一時的にテーブルのデータのバックアップを作成したい場合などによく使用します。
バックアップ作成の際には便利ですが、インデックスの構造やカラムの制約などはコピーされないため、注意が必要です。
INSERTとSELECTは、特定のテーブルのデータを元に別テーブルにレコードを作成したい場合に使用します。

---

## 構文まとめ

* コメント
  * 1行コメントは「--」
  * 複数行コメントは「\/\* \*\/」
* CASE式
  * 条件によって値を変えたい場合に使用
* ORDER BY
  * 指定したカラムでレコードの並び替えを行う
  * カンマ区切りで複数指定可能
  * 昇順の場合はASC, 降順の場合はDESCを指定。指定しない場合はデフォルトでは昇順
* 集約関数
  * SUM, AVG, MAX, MIN, COUNTなどがある。
  * 合計、平均、最大値、最小値、レコード件数、を求められる。
* GROUP BY
  * 復習のレコードを集約する
* GROUP BYを指定した場合、SELECT句に書けるのはGROUP BYで指定したカラムと集約関数
* HAVING
  * GROUP BYで集約した後、集計結果で絞り込みをしたい場合に使う
* INNER JOIN
  * 内部結合
  * INNERは省略可能
  * 結合対象それぞれのテーブルにレコードが存在したものだけ取得
* LEFT OUTER JOIN
  * 左外部結合
  * OUTERは省略可能
  * FROMで指定したテーブルを起点にしてテーブルを結合する
* サブクエリ
  * SQL文の中に入り込んでいるSELECT文のこと。
* UNION
  * SELECTの結果の和集合を取る集合演算子。

---

### SELECT文の全体像

ここで紹介したSQLの構文を複数組み合わせる場合、書く順番が決まっています。
順番は以下になります。

```sql
SELECT  カラムリスト
FROM  テーブル名
JOIN  結合対象テーブル
ON    結合条件
WHERE   絞り込み条件
GROUP BY  集約対象
HAVING   集計結果による絞り込み
ORDER BY  並び順指定
```

---

## その他のSQL

これまでは主にDML（SELECT, INSERT, UPDATE, DELETE）のSQL文についてみてきました。

ここからはDDL、DCLに分類される構文もいくつか紹介しておきます。

---

### CREATE

CREATEはDDLに分類される、DBMSのオブジェクトを作成するための構文です。
DBMSのオブジェクトとは、データベース、ユーザー、テーブル、ビュー、インデックス、ストアドプロシージャなどがあります。
細かい構文は作成するオブジェクトによって異なるので、各DBMS製品のマニュアルを参照ください。

```sql
-- オブジェクトの作成
CREATE  オブジェクト名 …
```

---

### DROP

CREATE文で作成したものを削除するための構文です。
こちらも詳しくは各DBMSのマニュアルを参照ください。

```sql
-- オブジェクトの削除
DROP  オブジェクト名 …
```

---

### ALTER

CREATEで作成したオブジェクトの定義を変更したい場合に使用します。
例えば、定義済みのテーブルにカラムを追加したり、カラムの定義を変更する場合などに使用します。

```sql
-- オブジェクトの定義の変更
ALTER  オブジェクト名 …
```

---

### TRUNCATE

テーブルの切り捨てを行うSQL文です。
 DROPとは違い、テーブルの定義自体は残しますが、データを全て削除します。
DELETEで条件を指定しなかった場合と同様の動きになりますが、TRUNCATEの場合はトランザクションでロールバックしても戻すことができません。
また、インデックスの再構築などを行わず削除するため、DELETEよりも高速になります。

```sql
-- TRUNCATE
TRUNCATE テーブル名;
```

---

### トランザクション

複数のSQLを実行し、全てがうまくいった場合のみ処理を確定したい場合はトランザクションの機能を使用します。
トランザクションを開始するにはBEGIN、ロールバックスにはROLLBACK、コミットするにはCOMMITを使用します。
トランザクションの概要はDBの機能の単元で説明します。

```sql
-- トランザクション開始
BEGIN;

-- ロールバック
ROLLBACK;

-- コミット
COMMIT;
```

---

### DBMS特有のコマンド

他にもSQLで使用可能なコマンドは様々あります。
また、DBMS特有の構文やコマンド、関数などもあります（方言と呼ばれたりする）
必要に応じて自分が使用しているDBMSのマニュアルなどを調べて使えるようにしておきましょう。

---

## 書き方のコツ

SELECT文の構文を複数組み合わせる場合、書く順番は以下のようになります。
SELECT文をスムーズに書くコツは、SELECT句を最後に書くことです。
FROM句から先に書き、必要な部分を作成した後、最後にSELECT句を書くとイメージがしやすくなります。

```sql
SELECT  カラムリスト
FROM  テーブル名
JOIN  結合対象テーブル
ON    結合条件
WHERE   絞り込み条件
GROUP BY  集約対象
HAVING   集計結果による絞り込み
ORDER BY  並び順指定
```

---

### サブクエリの書き方のコツ

サブクエリを使ったSQL作成する場合は、まずは外枠のSQLを作成し、その後にサブクエリ部分を作成するのがおすすめです。

```sql
SELECT column
FROM  table
WHERE id in (サブクエリ);

SELECT
FROM 
WHERE id in (SELECT id 
            FROM table2
           WHERE name = 'AAA');
```

---

## sql一覧(コピペ用)

```sql

drop table company;
drop table student;

-- 会社
create table company(
    id int primary key
    , name varchar(50)
    , short_name varchar(20)
);

-- 研修生
create table student (
    id int primary key
    , name varchar(30)
    , kana varchar(30)
    , gender int -- 性別 1：男性、2：女性ß
    , company_id int
    , pg_score int -- PGのスコア
    , db_score int -- DBのスコア
);

-- companyデータ登録
insert into company(id, name, short_name)
values 
(1, '株式会社ABC', 'ABC')
, (2, 'EFG株式会社', 'EFG')
, (3, '株式会社HIJ', 'HIJ')
, (4, '株式会社KLM', 'KLM');

-- studentデータ登録
insert into student values(1,'黒木 れいな','クロキ レイナ',2,1,round(random() * 100), round(random() * 100));
insert into student values(2,'小島 戴三','コジマ タイゾウ',1,1,round(random() * 100), round(random() * 100));
insert into student values(3,'齋藤 奈緒美','サイトウ ナオミ',2,1,round(random() * 100), round(random() * 100));
insert into student values(4,'土屋 勝行','ツチヤ カツユキ',1,1,round(random() * 100), round(random() * 100));
insert into student values(5,'村山 直幸','ムラヤマ ナオユキ',1,1,round(random() * 100), round(random() * 100));
insert into student values(6,'松永 栄理子','マツナガ エリコ',2,1,round(random() * 100), round(random() * 100));
insert into student values(7,'田辺 春実','タナベ ハルミ',2,1,round(random() * 100), round(random() * 100));
insert into student values(8,'手塚 英造','テヅカ エイゾウ',1,1,round(random() * 100), round(random() * 100));
insert into student values(9,'柳沢 耕介','ヤナギサワ コウスケ',1,1,round(random() * 100), round(random() * 100));
insert into student values(10,'西田 鎮雄','ニシタ シズオ',1,1,round(random() * 100), round(random() * 100));
insert into student values(11,'渡辺 今朝雄','ワタナベ ケサオ',1,2,round(random() * 100), round(random() * 100));
insert into student values(12,'瀬戸 紀子','セト トシコ',2,2,round(random() * 100), round(random() * 100));
insert into student values(13,'杉田 澄夫','スギタ スミオ',1,2,round(random() * 100), round(random() * 100));
insert into student values(14,'山本 清名','ヤマモト セイナ',2,2,round(random() * 100), round(random() * 100));
insert into student values(15,'原 淳子','ハラ ジュンコ',2,2,round(random() * 100), round(random() * 100));
insert into student values(16,'山内 直広','ヤマウチ ナオヒロ',1,3,round(random() * 100), round(random() * 100));
insert into student values(17,'宮内 敬正','ミヤウチ ヨシマサ',1,3,round(random() * 100), round(random() * 100));
insert into student values(18,'林田 真希','ハヤシダ マキ',2,3,round(random() * 100), round(random() * 100));
insert into student values(19,'川原 菊子','カワハラ キクコ',2,5,round(random() * 100), round(random() * 100));
insert into student values(20,'大石 さやか','オオイシ サヤカ',2,5,round(random() * 100), round(random() * 100));

-- データの確認
select * from company;
select * from student;

-- 1行コメント
/*
複数行コメント
*/

-- FROM句なしのSELECT
SELECT 'aaa', 10;

-- 四則演算
SELECT 10 + 20, 100 - 50, 10 * 10, 10 / 2;

-- 四則演算とエイリアス
select name
, (pg_score + db_score) 合計
, trunc((pg_score + db_score) / 2, 0) 平均
from student;

-- case式
select name
, case 
    when gender = 1 then '男性'
    when gender = 2 then '女性'
    else 'その他'
  end 性別
from student;

-- order by 
select name, pg_score
from student
order by pg_score;

select name, pg_score
from student
order by pg_score desc;

-- 集計関数
select 
sum(pg_score) PG合計
, avg(pg_score) PG平均
, max(pg_score) PG最高点
, min(pg_score) PG最低点
, sum(db_score) DB合計
, avg(db_score) DB平均
, max(db_score) DB最高点
, min(db_score) DB最低点
from student;

-- group by

-- 性別によるグループ化
select 
gender
, sum(pg_score) PG合計
, avg(pg_score) PG平均
, max(pg_score) PG最高点
, min(pg_score) PG最低点
from student
group by gender;

-- 企業によるグループ化
select 
company_id
, sum(pg_score) PG合計
, avg(pg_score) PG平均
from student
group by company_id
order by company_id;

-- 企業 + 性別 によるグループ化
select 
company_id, gender
, sum(pg_score) PG合計
, avg(pg_score) PG平均
from student
group by company_id, gender
order by company_id, gender;

-- having
-- 平均が50以上
select 
company_id
, sum(pg_score) PG合計
, avg(pg_score) PG平均
from student
group by company_id
having avg(pg_score) > 50;

-- 結合
-- 研修生の名前と企業の名前を同時に取得する
-- inner join を使用する
select s.name, c.name
from student s
inner join company c
on s.company_id = c.id;

-- joinを使用しない場合
select s.name, c.name
from student s, company c
where s.company_id = c.id;

-- 会社idが存在しない人も出力する
-- 外部結合
select s.name s_name
, c.name c_name
from student s
left outer join company c
on s.company_id = c.id
where s.company_id in (3, 4, 5);

-- 結合 + group化
select 
max(c.name)
, sum(pg_score) PG合計
, avg(pg_score) PG平均
, max(pg_score) PG最高点
, min(pg_score) PG最低点
from student s
left outer join company c
on s.company_id = c.id
group by company_id
order by company_id;

-- サブクエリ
-- 企業名で研修生テーブルを検索する
select name, company_id
from student
where company_id = (select id from company where short_name = 'ABC');

-- 複数ヒットする場合
select *
from student
where company_id in (select id from company where name like '株式会社%');

-- 相関サブクエリ
select name, company_id
from student s
where exists (SELECT id 
                FROM company
                WHERE short_name = 'ABC'
                AND id = s.company_id);

select 
    (select name 
    from company 
    where id = s.company_id) 企業名
, s.name
from student s;

-- インラインビュー
select c.name, s.pg_avg
from company c
join (select company_id, avg(pg_score) pg_avg
      from student 
      group by company_id) s
on c.id = s.company_id;

-- union
select 1 id, 'aaa'
union 
select 2, 'bbb';


-- companyテーブルを元にcompany_backupテーブルを作成
-- テーブルが作成されると同時に、データも登録される
CREATE TABLE company_backup as SELECT * FROM company;

-- 一旦データを削除
DELETE FROM company_backup;

-- companyテーブルのデータをcompany_backupにINSERT
INSERT INTO company_backup SELECT * FROM company;
```
