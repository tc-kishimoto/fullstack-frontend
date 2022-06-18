# MongoDB

---

## 概要

* DocumentDBの1つであるMongoDBについて学びます。

---

## MongoDBとは

MongoDBはNoSQLに分類されるDBの1つです。
NoSQLの中でも、DocumentDBと呼ばれるJSON形式でデータを保存するDBに分類されます。
NoSQLやDocumentDBそのものについての解説はNoSQLの単元を参照ください。

MongoDBでは、RDBでは表現が難しいデータ構造を容易に扱えたり、スケールアップが簡単に実現できます。
そのため、RDBでは対応が難しい機能に対してシステムの一部で部分的にMongoDB等のNoSQLが採用される場面が増えています。

MongoDBは商用版もありますが、オープンソースとして無料で使用することもできます。

[公式サイト](https://www.mongodb.com/)

---

## 特徴

MongoDB(DocumentDB)には以下の特徴があります。

* スケールアップ(サーバーの台数増加に伴う性能アップ)が可能
* 入れ子構造や配列構造のデータをそのまま扱うことができる
* スキーマレス（事前にデータ構造を決めず、動的に構造が変更できる）

逆に、RDBでは当たり前に備わっている以下の機能はDocumetDBにはありません。

* トランザクション制御
* データ同士の結合
* ストアドプロシージャ、トリガー、ビューなどの機能

この特徴からも分かる通り、DocumentDBはRDBの代わりになるDBではありません。
それぞれの特徴を知ったうえで、システムの性質に合わせて使い分けることが大事です。

---

## MongoDBの使いどころ

MongoDBの使用が向いているシステムや機能をいくつか紹介します。

### ログ格納システム

ログは様々な形式があるのでフォーマットを決めておくことが難しい。
⇒RDBに不向き。
⇒MongoDBならスキーマレスで対応可能。

システムの運用期間や規模が大きくなるほど量が増える。
⇒RDBではスケールアウトしにくいので不向き。
⇒MongoDBならスケールアウトできる。

トランザクション制御、結合の処理が必要ない。
⇒MongoDBに向いている。

### 商品のカタログ管理

ECサイトでは、商品のカテゴリによって登録したい属性が異なることがあります。
（家電、本、ファッションアイテムではそれぞれ表示したい情報が異なります）

⇒RDBだと対応が難しい。
・1つのテーブルで対応すると、余分なカラムが増える。
・テーブルを分けて扱うと、プログラムが複雑になる。

MongoDBだとスキーマレスで対応が容易。

※購入などのトランザクションが必要な処理はRDBで行う必要があります。
データ構造の都合で対応が難しい部分のみをMongoDBで対処します。

---

## インストール

ローカル環境にインストールするには、公式サイトからインストーラをダウンロードします。

[ダウンロードサイト](https://www.mongodb.com/try/download/community)

---

### Windowsの場合

ここではWindowsのインストール方法を紹介します。
環境のOSに合わせてインストーラをダウンロードしてください。
Windowsの場合、zip形式とmsi形式が選択できますが、ここではmsi形式をダウンロードします。
ダウンロードが完了したらインストーラを実行し、指示に従ってインストールしてください。

msi形式でインストールした場合、インストール完了後に再起動を求められるので、再起動を行います。

#### 環境変数の設定

インストールが完了したら環境変数を設定します。

mongodbがインストールされたパス（デフォルトだとC:\Program Files\MongoDB\Server\バージョン\binあたり）を環境変数のpathに設定します。

* エクスプローラ起動
* 「PC」を右クリックしてプロパティを選択
* 「システムの詳細設定」を選択
* 「環境変数」を選択
* システム環境変数の「Path」を選択肢て編集をクリック
* 「新規」を選択し、mongodbのbinのパスを設定する

設定が完了したらコマンドプロントかWindowsPowershellを起動してmongoコマンドが使用できることを確認します。

```bash
> mongo --version
```

結果

```text
MongoDB shell version v5.0.6
Build Info: {
    "version": "5.0.6",
    "gitVersion": "212a8dbb47f07427dae194a9c75baec1d81d9259",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "windows",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

---

## 用語解説

MongoDBの操作に入る前にいくつかの用語を説明します。

* Document
  * データのことを指します
  * MongoDBでは特にJSONのことを指します
  * RDBのレコードに該当します
* Collection
  * Documentを格納する入れ物
  * RDBのテーブルに該当します
* Database
  * 複数のコレクションを格納する入れ物
  * RDBのスキーマに該当します

---

## MongoDBの操作

MongoDBの操作は、コンソールやターミナルから接続して操作します。
RDBの場合、DB操作にはSQLを使用しますが、NoSQLに分類されるDBは基本的にSQLで操作しません。
MongoDBは、JavaScriptの構文でMongoDB内のオブジェクトを操作できます。

### 接続

デフォルトではmongoコマンドから接続可能です。
サーバーが起動している状態であれば、接続されて入力待ち状態になります。

```bash
> mongo
```

```text
MongoDB shell version v5.0.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("65379550-ce09-44bb-9ae9-6aea403bf0e9") }
MongoDB server version: 5.0.6
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
        https://community.mongodb.com
---
The server generated these startup warnings when booting:
        2022-03-28T13:23:12.666+09:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
>
```

接続を終了するにはexitコマンドを使用します。

```bash
> exit
```

---

### データベース操作

#### データベース一覧の確認

show dbs;でデータベースの一覧を確認できます。

```bash
> show dbs;
```

結果

```text
admin   0.000GB
config  0.000GB
local   0.000GB
```

---

#### データベースの作成（切り替え）

データベースの作成（切り替え）はuseコマンドでできます。
データベースが存在する場合はデータベースの切り替えになりますが、存在しない場合は新たに作成されます。

```bash
use データベース名;
```

以下のように入力します。

```bash
use testdb;
```

結果

```text
switched to db testdb
```

---

### コレクション操作

データベースやコレクション、ドキュメントの操作は、基本的にdbというオブジェクトから操作を行います。
データベースやコレクションなどのオブジェクトに用意されたメソッドを使うことでオブジェクトを操作します。

#### コレクション作成

```bash
> db.createCollection("コレクション名");
```

例

```bash
> db.createCollection("users");
```

結果

```text
{ "ok" : 1 }
```

#### collectionの確認

```bash
> show collections;
```

#### データの挿入

```bash
> db.コレクション名.insert({データ});
```

例

```bash
> db.users.insert({
    name: "satou",
    birth: {
        year: "1990",
        month: "10",
        day: "1"
    },
    hobby:["game", "soccer"]
});
```

結果

```text
WriteResult({ "nInserted" : 1 })
```

#### データ件数の確認

```bash
> db.コレクション名.count();
```

例

```bash
> db.users.count();
```

結果

```text
1
```

#### データ検索

```bash
db.コレクション名.find();
```

例

```bash
db.users.find();
```

結果

```text
{ "_id" : ObjectId("6241484acdceff45aabd1269"), "name" : "satou", "birth" : { "year" : "1990", "month" : "10", "day" : "1" }, "hobby" : [ "game", "soccer" ] }
```

---

### ユーザー操作

```bash
# adminで作成するとadminユーザーになる
> use admin
# ユーザー作成
> db.createUser({user:"mongo", pwd:"1234abcd", roles:["root"]})
```

ユーザーを指定した接続

`-u`オプションを指定します。

```bash
mongo -u mongo
```

他にも様々なコマンド、メソッドがあります。
以下に一部を紹介します。
必要に応じて随時公式サイト等を参考にしてください。

---

## コマンド一覧

```bash
# バージョン確認
> mongo --version

# 接続
> mongo

# ユーザー名を指定して接続
> mongo -u ユーザー名

# 終了
> exit

使用できるコマンドの確認
> help
```

### データベース操作

```bash
# データベース一覧確認
> show dbs;

# データベース作成(切り替え)
> use データベース名;

# DBの状態の確認
> db.stat();

# データベースの削除
> db.dropDatabase();
```

### コレクション操作

```bash
# コレクションの作成
> db.createCollection("コレクション名");

# コレクションの一覧確認
> show collections;

# コレクションの名前の変更
> db.コレクション名.renameCollection("新コレクション名");

# コレクションの削除
> db.コレクション名.drop();
```

### ドキュメント操作

```bash
# データの挿入
> db.コレクション名.insert({データ});

# データ件数の確認
> db.コレクション名.count();

# データの全件検索
> db.コレクション名.find();

# データの全件削除
> db.コレクション名.remove({});
```

### データの検索

```bash
> db.コレクション名.find({抽出条件}, {抽出フィールド});
```

抽出条件の書き方

* 等値検索：{フィールド名 : 値}
* 比較演算子の使用：{フィールド名 : {比較演算子 : 値}}
  * 比較演算子
    * $gte：以上
    * $gt：大なり
    * $lte：以下
    * $lt：小なり
    * $eq：等しい
    * $ne：等しくない
* 正規表現：{フィールド名 : jsの正規表現}
* 複数の条件指定(AND)：カンマ区切りで条件を指定
  * {条件1, 条件2, …}
* 複数の条件指定(OR)：$orを使用し、[]の中に条件を記述
  * {$or : [条件1, 条件2, …]}
* 1つのフィールドに複数の条件指定（in）
  * {フィールド名 : {$in : [値1, 値2, …]}}

抽出フィールドの描き方

* フィールド名:[0|1]
  * 0：非表示、1：表示
  * {name: 1} とすると、nameのみが
  * {id: 0}  とすると、id以外が表示される
  * 0と1は基本的に混在させることはできないが、idは0で他の項目を1にすることができる。
    * { _id: 0, name: 1}

### データ検索のオプション

```bash
# 抽出件数の絞り込み
> db.コレクション名.find().limit(取得件数);

# 並び替え（昇順）
> db.コレクション名.find().sort({フィールド: 1});

# 並び替え（降順）
> db.コレクション名.find().sort({フィールド: -1});

# 読み飛ばし
> db.コレクション名.find().skip(読み飛ばし件数);
```

### 更新系

```bash
# 1件のドキュメントを更新（条件に合致した最初の1件が更新される）
> db.コレクション名.update({抽出条件}, {更新内容});

# 複数のドキュメントの更新
> db.コレクション名.update({抽出条件}, {更新内容}, {multi: true});

# ドキュメントがあれば更新、なければ挿入
> db.コレクション名.update({抽出条件}, {更新内容}, {upsert: true});

# ドキュメントの削除
> db.コレクション名.remove({抽出条件});
```

更新内容の書き方

```text
{$set: {フィールド名: 更新値, …}}
```

存在しないフィールドの場合、そのまま追加される。

---

## インデックス

MongoDBではコレクションに対してインデックスの作成が可能です。
インデックスを作成することによるメリット・デメリットは基本的にRDBと同じです。

インデックス関連のコマンド

```bash
# インデックスの確認
> db.コレクション名.getIndexes();

# インデックスの作成(1：昇順, -1：降順)
> db.コレクション名.createIndex({フィールド名: [1|-1]});

# インデックスの削除
> db.コレクション名.dropIndex("インデックス名");
```

---

## Node.jsによる接続

### ドライバーのインストール

npmでmongodbのドライバを追加

```bash
npm install mongodb
```

あとは主に公式サイトの使い方を参照

[使用例](https://www.mongodb.com/docs/drivers/node/current/usage-examples/)

ローカル環境のMingoDBに接続する場合は、uriを以下にすればOK

```js
const uri = "mongodb://ユーザー名:パスワード@localhost";
```
