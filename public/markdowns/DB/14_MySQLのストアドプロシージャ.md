# MySQLのストアドプロシージャ

---

## ストアドプロシージャとは

ざっくり言うとDBMS(ここではRDBMSのこと)内で動作するプログラムのことです。
SQL文を連続で実行したり、変数・条件分岐・繰り返し構文を使っていわゆるプログラムちっくな処理をDBで実現することができる仕組みがストアドプロシージャ。
SQLは単体では手続き型言語のような処理を書くことはできませんが、ストアドプロシージャを使うことで、DBMSの中で動作するプログラムにSQLを組み込むことができます。
ストアドプログラムと呼ばれたりもします。（この辺りはDBMSによる）

---

## ストアドプロシージャのメリットとデメリット

### メリット

**処理の高速化が期待できる**

複数のテーブルに更新をかけたり、大量のデータに対して連続で更新をかけたりする場合、通常のプログラム言語で処理しようとすると何度もDBにアクセスする必要が出てくるので、DBへの接続回数が増えれば増えるほどプログラムの負荷が増してしまいます。
また、APサーバとDBサーバが物理的に離れている場合、ネットワークの負荷もプラスされるためDBへのアクセス回数が増えるとパフォーマンスに影響を与える可能性が高くなります。
その点ストアドプロシージャはDBMS内で完結する処理なので、ネットワークの負荷やDB接続時の負荷は呼び出し時の1回だけで済みます。
そのため、連続して複数のテーブルに更新をかけたり、対象のデータに連続でアクセスする処理を行う場合にはパフォーマンス的に大きなメリットがあります。

---

### デメリット

**DBMSによって仕様が大きく異なる**

DBMS製品は現在色々な種類がある。Oracle DB, SQL Server, DB2, MySQL, PostgreSQL, SQLite, ...
製品によって特徴は大きく異なりますが、SQLに関してはどのDBMSもSQL標準規格にある程度準拠して作られているので、差はそれほど大きくなりません。
しかしながら、ストアドプロシージャに関しては、別のプログラミング言語というレベルで構文が異なったりします。
なので案件変わって使用するDBMSが変わると、ストアドプロシージャ使うにしても構文が違うので同じ知識をそのまま流用できなかったり、システムのDBを移行する必要が出たときにストアドプロシージャを使っている場合にはほぼ作り直す必要が出てきます。
その点が最大のデメリットと言えます。

とはいえ、ストアドプロシージャは一般的なプログラミング言語にあるオブジェクト指向のような複雑な概念はなく、SQL、変数、条件分岐、繰り返し、関数あたりの概念を理解していれば学習コストは比較的低いと言えます。
またDBMSによって構文が違うとは言ってもカーソルなどのストアドプロシージャ特融の概念はある程度共通しているので、一つのDBMS製品でストアドプロシージャを学習していれば他のDBMSでもある程度応用は効きます。

ちなみに、MySQLのストアドプロシージャはOracleやSQL Serverのそれと比べると比較的機能は少ないです。
（そういう意味では学習コストは低いかも。）
ストアドプロシージャに関しては、有償であるOracle DBやSQL Serverの方が圧倒的に優れているので、業務でストアドプロシージャをガッツリ活用する開発を行う場合には有償のDBMSを使うことを強くお勧めします。

---

## ストアドの種類

DBMSでプログラムを書く仕組みは、大きく3つあります。

* ファンクション
* プロシージャ
* トリガー

一般にストアドプロシージャといえばこの中のプロシージャのことを指すことが多いが、文脈によっては全部ひっくるめてストアドプロシージャと呼ぶこともあります。
プロシージャと区別するために3つまとめてストアドプログラムと呼ばれたりもする。ここではとりあえず3つひっくるめたものをストアドと呼ぶことにします。
この3つは大体どのDBMSにも備わっている機能だが、特性や制限などはDBMSによって大きく異なるので注意してください。

---

## それぞれの特徴

以下、ファンクション、プロシージャ、トリガーそれぞれの特徴になりますが、あくまでMySQLに限定した話です。

---

### ファンクション

* 引数を受け取り、戻り値を返すもの。関数
* SELECT文の中で呼び出すことが可能
* トランザクション制御はできない

ファンクション（関数）はSELECT文の中でも使用するものなのでイメージがしやすいでしょう。
SELECT文で使える関数として文字列を結合するconcat関数や、数値を切り捨てするtruncate関数などがありますが、これがいわゆるファンクション。
DBMSで最初から色々と用意されているが、自作することが可能です。
ファンクションの中でupdate, delete, insertなどの更新系SQLも実行可能だが、トランザクション制御はできません。

---

### プロシージャ

* SELECT文から呼び出すことはできない。CALLを使って呼び出す。
* 引数を受け取ることができるが、戻り値はない。ただし、引数でOUT, INOUTの引数を受け取ることができる。
* トランザクション制御が可能

ファンクションと比較すると呼び出し方やトランザクション制御の可否などで違いがある。
どちらを使うかはケースバイケース。

---

### トリガー

* 特定のテーブルが更新されたときに自動的に呼び出される処理
* old, newというキーワードが使用可能
* トランザクション制御はできない

トリガーはファンクションやプロシージャと違って意図的に呼び出すことができない。
その名の通り、テーブルへの更新（insert, update, delete）がトリガー（引き金）となって処理が呼び出される。
そのため引数を受け取ったり、戻り値を返したりすることはできない。
トリガーを定義する際に、更新対象のテーブル・更新の種類（insert, update, delete）・更新の前か後か(before, after)を指定する。
更新前のレコードの値をold、更新後のレコードの値をnewというキーワードで取得することができる。
トリガーの中でプロシージャを呼び出したりすることも可能。

---

## それぞれの具体例

説明だけではイメージがしにくいと思うので、ここから具体例。

---

### ファンクションの例

MySQLのファンクションは宣言時に「deterministic」か「not deterministic」かを宣言する必要があります。
deterministicとは翻訳すると「決定論的」という意味でいまいち理解しにくいが、要は引数によって戻り値の値が必ず一意に定まるかどうかということらしいです。
関数型プログラミング言語でいうところの参照透過性があるかどうかと同義と解釈している。（間違っていたらごめんなさい。。）

### deterministicなファンクションの例1

```sql
delimiter //  -- 区切り文字変更

-- 関数の宣言
create function absolute(num double) returns double
deterministic
begin
    -- 処理開始
    if num > 0 then
        return num;
    else 
        return num * -1;
    end if;
end
//

delimiter ;  -- 元に戻す
```

呼び出し

```sql
select absolute(100); -- 100
select absolute(-40); -- 40
```

**解説**

* ファンクションの概要
  * 数値を引数に受け取って絶対値を返却するするファンクション。（もともと標準でabsという関数があるが、サンプルのため別名で同じことができるファンクションを作成）
* delimiter
  * delimiterは区切り文字のこと。SQLではデフォルトではセミコロン(;)で1文が終了するが、ファンクションなどを作成する際は処理の途中にセミコロンが入るため、一度区切り文字をセミコロン以外に変更する必要がある。ここでは「//」としているが、セミコロン以外でファンクションの中で使用されない文字列であれば何でも良い
* 宣言
  * create以降がファンクションの宣言。absoluteがファンクション名。
  * ()の中のnumが引数、returns intは戻り値の型。この辺りは他のプログラミング言語を知っていれば特に問題ないかと。
  * この関数は引数によって戻り値の値は一意に決まるので、deterministicをつけている。
* 処理
  * 処理内容はbegin ~ end の間に定義する。
  * 変数の定義もこの中で行う。ここではif文を使って条件分岐によって戻り値を変えている。
  * ここではifを使用しているがcaseなども使用可能。

---

### deterministicなファンクションの例2

```sql
delimiter //

-- drop function if exists total //
create function total(start_num int, end_num int) returns int
deterministic
begin
    declare sum int default 0;  -- 変数宣言
    
    -- ループ処理
    label_loop: loop
        set sum = sum + start_num;
        set start_num = start_num + 1;
        if start_num >= end_num then
            leave label_loop;  -- ループ抜ける
        end if;
    end loop;
    
    return sum;
    
end
//

delimiter ;
```

**呼び出し**

```sql
select total(10, 100); -- 4905
```

**解説**

* ファンクションの概要
  * start_numからend_numまでの値を全て合計した値を返す
* 変数
  * 引数で受け取った値は変数として使用可能。
  * 引数以外で変数を使用したい場合は、declareで処理を書く前に定義する必要がある。
  * ここではsumが変数名。intは型で、defaultキーワードでデフォルト値を設定可能。
  * 処理の中で変数に値をセットするには、setキーワードを使用する。
* ループ処理
  * MySQLのループ処理では、ラベルを付けて、ループを抜ける条件を満たしたときにleaveで処理を抜けるようにする。
  * ここではloop構文を使用しているが、repeat構文でのループも可能。

---

### not deterministicなファンクションの例

続いてnot deterministic、つまり引数によって戻り値が一意に定まらないファンクションの例。
ここでは消費税率を持つテーブルから消費税を取得し、引数で受け取った値の税込金額を算出するファンクションを考える。

taxテーブル

|id|value|start_date|
|:--:|:--:|:--:|
|1|0.05|1997-04-01|
|2|0.08|2014-04-01|
|3|0.1|2019-10-01|

```sql
delimiter //

create function if exists getPrice(price int) returns int
not deterministic
begin
    -- 変数宣言
    declare tax double default 0.1;  

    -- 消費税の取得
    select value into tax
    from tax
    where start_date <= current_date
    order by start_date desc
    limit 1;
    
    return truncate(price + (price * tax), 0);

end
//

delimiter ;
```

**呼び出し**

```sql
select getPrice(100); -- 110
```

**解説**

* ファンクションの概要
  * 消費税率のテーブルから現在の日付をもとに税率を取得し、消費税込みの金額を計算して返却する。
  * （実際の業務の場合は軽減税率などの考慮も必要だが、ここでは省略）
  * 実行した日付によって取得される値が異なるので、引数が同じでも毎回同じ結果が変えるわけではないという点で、not deterministicをつけている。
* select ... into ...
  * ストアドの処理の中ではselect ... into ... 構文を使用することで、select文の取得結果を変数にセットすることができる。
  * このとき、select句で指定したカラムの数と、変数の数が一致していないとエラーになるので注意。（他のDBMSだとレコード型などの概念で一括でセットされる仕組みがあるが、MySQLにはないようなので注意）
  * また、この書き方の場合は取得されるレコードが1件でないとエラーになるので注意。
  * 取得されるレコードが複数ある場合は後述するカーソルを利用する必要がある。

---

## プロシージャの例

ここでは売り上げデータを記録したテーブルから、集計用のテーブルにデータを更新する処理を考える。

集計元になるテーブルは以下。

salesテーブル

|id|item_code|sales_date|price|
|:--:|:--:|:--:|:--:|
|1|001|2021-10-10|3000|
|2|002|2-21-10-17|5000|
|3|001|2-21-10-19|7000|
|4|002|2-21-10-25|4000|
|5|003|2-21-11-03|6000|
|6|002|2-21-10-05|8000|

ここから月単位で集計して以下のようにしたい。

monthly_total_price

|id|month|total|
|:--:|:--:|:--:|
|1|2021-10|19000|
|2|2021-11|14000|

---

**プロシージャの例**

```sql
delimiter //

-- drop procedure if exists calc_toal //
create procedure calc_toal(in pmonth varchar(7), inout pcount int)
begin
    declare wprice int default 0;
    declare sum int default 0;
    declare done int default false;
    -- カーソルの宣言
    declare curSales cursor for select price from sales where left(sales_date, 7) = pmonth;
    -- handlerの宣言
    declare continue handler for not found set done = true;
    declare exit handler for sqlexception, sqlwarning
      begin
        -- エラー情報を変数に格納
        get diagnostics condition 1 @sqlstate = returned_sqlstate, @errno = mysql_errno, @text = message_text;
        select @sqlstate, @errno, @text;
        rollback;  -- エラーが起きたときrollbackする
      end;

    -- トランザクション開始
    start transaction;
    
    -- 事前削除
    delete from monthly_total_price 
    where left(month, 7) = pmonth;

    -- レコード件数分ループして合計値を求める
    open curSales;
    read_loop: loop
        fetch curSales into wprice;
        if done then
            leave read_loop;
        end if;
        set sum = sum + wprice;
        set pcount = pcount + 1;
        
    end loop;
    close curSales;
    
    insert into monthly_total_price (month, total)
    values (pmonth, sum);

    commit;

end
//

delimiter ;
```

確認

```sql
set @count = 0;  -- パラメータ初期化
call calc_toal('2021-10', @count); -- プロシージャの実行
select @count; -- パラメータ確認
select * from monthly_total_price; -- プロシージャの結果の確認
```

結果

|@count|
|:--:|
|5|

|id|month|total
|:--:|:--:|:--:|
|1|2021-10|27000|

---

**解説**

* 処理概要
  * 引数で受け取った年月からsalesテーブルのレコードを絞り込み、集計用テーブルに更新を行う。
  * 正直なところこの程度の集計ならgroup by で簡単に解決できるので、プロシージャにするほどの処理ではないけれど、プロシージャやカーソルの概念を説明するためにあえてこんな処理をしていることをご理解下さい。
* 引数
  * プロシージャの引数にはin, out, inoutのいずれかを指定することができる。
  * inは外部から受け取る専用の引数。
  * outはプロシージャの呼び出し元に値を渡すことができる。
  * inoutは、inとout両方の性質を持つ（外部から受け取りつつ、再代入した値は外部に渡すことができる）。
  * プロシージャはファンクションと違って戻り値がない（returnが書けない）ので、呼び出し元に値を渡したい場合にはoutかinoutの引数を利用する。
* 宣言部
  * 宣言部では変数、カーソル、ハンドラの定義が可能。
  * 定義する順番が変数→カーソル→ハンドラの順番でないとエラーになるようなので注意。
  * カーソルについては後述。
  * ハンドラでは、エラーが起きた場合の処理、カーソルでレコードが見つからなかった場合の処理を定義できる。
* トランザクション制御
  * プロシージャではトランザクション制御が可能。
  * start transactionでトランザクションが開始される。
  * エラーが起きたときにロールバックしたい場合、sqlexceptionやsqlwarningのハンドラの中でロールバックを行う。
  * このプロシージャではロールバックと同時に、エラー情報をパラーメータにセットしてselectするようにしている。（MySQLのプロシージャでトランザクション制御するときのテンプレ的な感じらしい。）
* プロシージャの呼び出し
  * プロシージャを呼び出すには「call プロシージャ名」とする。
  * out, inoutの引数がある場合には値が上書き可能なパラメータをセットする。

---

### カーソル

カーソルはどのDBMSのストアドでも存在する重要な概念なので別で見出しを設けて説明。
ただし細かい使い方はDBMSによって微妙に異なるので注意。

* カーソルとは
  * ざっくり言うとselect文の結果を1行ずつ処理するための仕組み。
* 「declare カーソル名 for select文」によりカーソルを定義することができる
* openでカーソルの処理開始、処理が終わった場合はcloseする。
* fetchで1行ずつデータを取得することができる。このとき、into でselect句で取得した値を変数にセットすることができる。
* 最終行まで処理を終えた後はfetchでnot foundのハンドラが出るので、変数と組み合わせることでループ処理を抜けることができる。
* カーソルを複数使って２重ループなども可能。ただし、ハンドラでセットするループを抜けるための変数を適切に初期化しないとうまく動作しないので注意。

---

## トリガーの例

トリガーの使い道はいろいろ考えられるが、例えば履歴用のテーブルを作成して、テーブルの変更履歴を残す場合などに有効。
ここでは、ユーザー情報を管理するテーブルを用意し、メールアドレスが変更された履歴を残すトリガーを考える。

ユーザー情報のテーブルは以下の通り。

users

|id|user_name|email|
|:--:|:--:|:--:|
|1|AAA|AAA@gmail.com|
|2|BBB|BBB@gmail.com|
|3|CCC|CCC@gmail.com|

メールアドレスが更新された場合の履歴を残す以下のような構造のテーブルを用意する。

email_update_log

|id|user_id|before_email|after_email|updated_at|
|:--:|:--:|:--:|:--:|:--:|
|1|1|before@gmail.com|after@gmail.com|2021-11-01|

トリガーは以下のようになる。

```sql
delimiter //

-- drop trigger if exists email_update_trigger //
create trigger email_update_trigger after update on users for each row
begin
    -- 更新前と更新後の値を比較する
    if old.email <> new.email then
        insert into email_update_log
        (user_id, before_email, after_email, updated_at)
        values
        (new.id, old.email, new.email, current_timestamp());
    end if;
end
//
delimiter ;
```

確認

```sql
-- データインサート
insert into users(user_name, email) values('AAA', 'AAA@gmail.com');
select * from users;  -- 確認
select * from email_update_log; -- 確認 最初はレコード無し
-- メールアドレスを更新
update users
  set email = 'DDD@gmail.com'
where user_name = 'AAA';
-- トリガーが動いているか確認
select * from email_update_log;
```

結果

|id|user_id|before_email|after_email|updated_at|
|:--:|:--:|:--:|:--:|:--:|
|1|1|AAA@gmail.com|DDD@gmail.com|2021-10-25 13:00:00|

うまく登録できていれば、usersテーブルにupdateを実行したタイミングでレコードが増えることが確認できる。

---

**解説**

* トリガーの概要
  * usersテーブルにupdateが行われたときに、更新前と更新後のemailを比較して値が変わっていた場合に履歴用テーブルにデータを更新する。
* 宣言部
  * email_update_triggerがトリガー名
  * afterは更新後の処理を行うことを表す。更新前に処理を走らせたい場合はbeforeを指定する。
  * updateは更新の種類。insert, update, deleteのいずれかが選択できる。
  * on usersでトリガーとなるテーブルを指定する。
  * for each rowは、トリガーが更新された行毎に動作することを表す。他のDBMSではSQL文単位でトリガーを実行することができる仕組みもあるが、残念ながらMySQLではサポートされていないため、for each rowしか指定できない。
* oldとnewの補足
  * 今回の例ではoldとnewというキーワードを使って更新前と更新後の値を比較したが、oldとnewの2つが同時に使えるのはupdateのトリガーのみ。
  * insertのトリガーではnewのみ、deleteのトリガーではoldのみが使用可能。updateだけoldとnewの2つが使用可能。

---

### トリガーの注意点

トリガーは使いようによっては便利だが、トランザクション制御が行われている中の１つのテーブルに対してトリガーを定義するときには注意が必要。
例えば、以下のような処理があったとする。

```sql
start transaction;

-- tableAの更新

-- tableBの更新

-- tableCの更新

commit;
```

そしてtableBに対してトリガーが定義されていたとする。
このとき、トリガーの中ではtableBよりも前に更新されたtableAの値は参照することができるが、tableBより後に更新されているtableCの値は参照することができない。

```sql
create trigger tableb_trigger after update on tableB for each row
begin

    -- tableA 更新後のレコードを参照可能

    -- tableB 更新前と更新後の値を参照可能

    -- tableC 更新後のレコードは参照できない

end
```

つまり、トランザクション制御されていたとしても、コミット後のデータを全て参照できるわけではなく、tableBのトリガーではあくまでもtableBの値が更新されたタイミングで反映された値のみが参照可能。
勝手な思い込みでコミットされたタイミングでトリガーが走るのかなと思っていましたが、そうではなく、トランザクションの中でtableBの更新にトリガーが不随して処理されるイメージで考えたほうが良さそう。

---

### 登録時の権限エラー

ストアド（ファンクション、プロシージャ、トリガーのいずれか）を登録するときに、権限のエラーが出ることがある。

```text
ERROR 1419 (HY000): You do not have the SUPER privilege and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)
```

このエラーが出たときの解決策は2つある。

1. ユーザーにsuper権限を与える
1. log_bin_trust_function_creatorsグローバルシステム変数を1にする

---

**1で解決する場合**

権限を確認するには以下のSQLを実行

```sql
select user, Super_priv from mysql.user;
```

ログインしている該当ユーザーのSuper_privが「Y」になっていればsuper権限があり、「N」の場合は権限がない状態。

権限を付与するにはUPDATE文を実行する。

```sql
update mysql.user set Super_priv='Y' where user='ユーザー名';
```

---

**2で解決する場合**

システム変数の値を確認するには以下のSQLを実行

```sql
show variables like 'log_bin_trust_function_creators';
```

valueがONになっていれば有効で、OFFになっていれば無効。

ONにするには以下を実行する。

```sql
set global log_bin_trust_function_creators = 1;
```

いずれかの方法で登録ができるようになるはず。

---

### アクセスコントロール

プロシージャを登録後、ツール等を使ってDDLを確認すると、以下のような内容になっている。

```sql
CREATE DEFINER=`root`@`%` PROCEDURE `プロシージャ名`()
begin
  -- 処理内容
end
```

definderという宣言がついている。
これはアクセスコントロールを行うためのキーワードで、デフォルトでは対象のプロシージャを登録したときのMySQLアカウントで登録される。
これがついていると、そのプロシージャを実行するときにdefinderで指定されたアカウントでプロシージャの処理が実行される。
ローカル環境や開発環境で作成したプロシージャのDDLを抽出して他の環境に適用するときに、環境によってアカウント情報が異なっていると実行時にエラーが出てしまうので注意。
（また、処理の中でテーブルに対する更新処理を行っている場合、実行ユーザーにテーブルへの更新権限がなければエラーになるのでその点も注意。）
登録したユーザーに関係なく、実行したユーザーの権限で処理が行われるようにするには
「sql security invoke」をつければよい。

```sql
CREATE DEFINER=`root`@`%` PROCEDURE `プロシージャ名`()
SQL SECURITY INVOKER
begin
  -- 処理内容
end
```
