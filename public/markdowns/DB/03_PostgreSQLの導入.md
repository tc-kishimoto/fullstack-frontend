# PostgreSQL

---

PostgreSQLはオープンソースのデータベースで、無償で利用できます。

[公式サイト](https://www.postgresql.jp/)

---

## インストール

PostgreSQLのインストーラを使ってインストールを行ってください。

インストーラがない場合は公式サイトからダウンロードしてください。

[ダウンロード](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

インストーラは自身のOSに合わせて最新バージョンをダウンロードして実行してください。

ダウンロードが完了したら、ダウンロードしたインストーラ（postgresql-xx.x-x-windows-x64.exe）を実行してください。

---

以下の画面が表示されたら［Next］を選択。

![picture 36](/images/956960225cd6af67517bb980df9fdbc71fe255719b9590c89d193863db561471.png)  

---

インストールするディレクトリの指定。デフォルトで［Next］を選択。

![picture 39](/images/0297ea61c5b9714b993cc682f3d2c6ee54c387c3f36f3306e65b335578f3a7d7.png)  

---

インストール製品の選択。全てチェックが入った状態で［Next］を選択。

![picture 40](/images/f9260c76015b07e5805cfc642144722974752da7fc6dae0bfbff63607122b1ba.png)  

---

データを保存するディレクトリの設定。

![picture 42](/images/738198c880eeda2d668e2bc34007bfd85ac25e6298c31679deceeb133914bfb3.png)  

---

スーパーユーザー「postgres」アカウントのパスワードの設定。
任意ですが、忘れた場合はDBに接続できなくなるため、自己責任で忘れないパスワードを入力します。
学習用で何でも良い場合は「axiz」としてください。
入力を終えたら［Next］を選択。

![picture 43](/images/9aa746ca5622de050fc103a896d6fc77bd950038a5f03243fd176128e7143dc4.png)  

---

ポート番号の指定。デフォルト「5432」で［Next］を選択。

![picture 44](/images/cf7be377316704151068067763719d5716c4240e1f8e387f0ab8e2595f4d0607.png)  

---

データベースクラスターを作成する場合のロケールの指定。デフォルトのまま［Next］を選択。

![picture 46](/images/06524c027c5efcc4ef4ab11e8c8cf62dbf4bb29aedc36aac02943b42e6ad17f2.png)  

---

設定内容の確認。[Next]を選択。

![picture 47](/images/d0e822f4888ab75f930172af18410b887e11c89e5ba65375bd07351a7946318d.png)  

---

インストール前の最終確認。

![picture 49](/images/0853ec72812ec66618249f612c6d42a8dbc6e997a53fe1238f3e33e76fd235b2.png)  

---

インストールが終わるまで待機。

![picture 51](/images/36974651567e6029e09075253534db841ce81aec33d3d0fd2cc3de4f94d33218.png)  

---

インストールが完了したら、チェックを外して［Finish］を選択。

![picture 52](/images/98ed7429579fa6fd378a7bbc1eda5212cf33782da40b671e77d5be43b59f6514.png)  

---

## PostgreSQLへの接続

### SQL Shell(psql)からの接続

PostgreSQLへの接続には「SQL Shell(psql)」を使用します。

スタートメニューから「SQL Shell(psql)」を選択します。

起動するとコマンドライン上に以下のように表示されます。

```bash
Server [localhost]:
```

左側が接続時に指定する項目です。[]に入っているのは未入力だった場合のデフォルト値です。

初回は基本的にデフォルトで問題ので、ユーザーのパスワードの入力になるまで、5回Enterを押します。

```bash
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Client Encoding [SJIS]:
ユーザ postgres のパスワード:
```

パスワードはインストール時に指定したパスワードを入力します。

入力しても画面上には表示されませんが、入力は反映されるので問題ありません。

---

パスワードを入力して接続が成功すると以下のようになります。

※14.1の部分はバージョン情報なので、環境によって異なります。

```bash
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Client Encoding [SJIS]:
ユーザー postgres のパスワード:
psql (14.1)
"help"でヘルプを表示します。

postgres=#
```

---

### ユーザーの作成

現在ログインしているのは、スーパーユーザーであるpostgresになります。

このユーザーを使って実際に使用するユーザーを作成します。

ここでは「axizuser」という名前のユーザーを作成します。

ログイン時のパスワードは「axiz」とします。

作成するSQLはコマンドになります。

入力後に「CREATE ROLE」と出力されれば成功です。

```bash
postgresql=# CREATE USER axizuser PASSWORD 'axiz' CREATEDB;
CREATE ROLE
```

---

### 解説

ユーザーを作成するためのSQLは以下になります。

```sql
CREATE USER axizuser PASSWORD 'axiz' CREATEDB;
```

* CREATE USERはユーザー作成時のキーワードです。
* その後に続くaxizuserがユーザー名です。
* PASSWORDをつけることで、作成時にパスワードを設定できます。
* パスワードは文字列で設定する必要があります。
SQLでは文字列は'（シングルクォーテーション）で囲う必要があります。
* CREATEDBのキーワードをつけると、ユーザーにデータベース作成の権限をつけることができます。

---

### 接続の切り替え

これからaxizuserで操作するために、新しいユーザーで再接続します。

接続を切り替えるには以下のようにします。

```bash
postgres=# \c postgres axizuser
ユーザ axizuser のパスワード:
```

※バックスラッシュは、Windows環境だと￥マーク表示になります。

パスワードを「axiz」を入力すると切り替わります。

```bash
データベース "postgres" にユーザ"axizuser"として接続しました。
postgres=>
```

---

### データベースの作成

続いてデータベースを作成します。

以下のように入力してします。

```bash
postgres=> CREATE DATABASE axizdb;
CREATE DATABASE
```

---

### 接続の切り替え

この段階では、ユーザーはaxizdbになっていますが、接続しているデータベースはpostgresなので、axizdbに切り替えます。
データベースを切り替えるには以下のようにします。

```bash
postgres=> \c axizdb
データベース "axizdb" にユーザー "axizuser"として接続しました。
axizdb=>
```

左側のpostgresがaxizdbになっていれば成功です。

これ以降は、axizuserでaxizdbに接続接続していることを前提に話を進めます。

---

### 接続を切る

DBへの接続を切るには以下のコマンドを入力します。

```bash
axizdb=>\q
続行するには何かキーをおしてください . . . 
```

このまま何かキーを入力すると、SQL Shellが終了します。

---

### 再接続

2回目以降の接続では、接続時にDB名とユーザー名を指定することで、わざわざユーザーの切り替えをする必要なく、直接axizdbに接続することが可能です。

```bash
Server [localhost]:
Database [postgres]: axizdb
Port [5432]:
Username [postgres]: axizuser
Client Encoding [SJIS]:
ユーザー axizuser のパスワード:
psql (14.1)
"help"でヘルプを表示します。

axizdb=>
```

---

## コマンドプロンプトによる接続

コマンドプロプロンプトから接続することも可能です。
コマンドプロンプトから接続する場合は、事前に環境変数の設定をしておく必要があります。

### 環境変数の設定

1. エクスプローラを起動し「PC」を右クリックし、「プロパティ」を選択
2. 設定から「システムの詳細設定」を選択
3. 「環境変数」ボタン押下
4. システムの環境変数から、「Path」を選択し、「編集」ボタン押下
5. 環境変数名の編集画面から「新規」ボタン押下
6. psql.exeのファイルが存在するフォルダのパスを追加する

psql.exeのあるフォルダのパスは、インストール時にパスを変更していなければデフォルトは  
「C:\Program Files\PostgreSQL\14\bin」  
になります。
14はバージョン情報なので、インストールしたバージョンによって異なります。

---

### 接続

コマンドプロンプトから接続するには、以下のようにします。

1. コマンドプロンプトを起動
2. 接続のコマンドを入力

接続のコマンドは以下になります。

```bash
>psql -U axizuser -d axizdb
ユーザー axizuser のパスワード
```

環境変数にpsql.exeのあるフォルダを追加したことで、コマンドプロンプトからpsqlコマンドが使えるようになります。
これでコマンドプロンプト上からSQL Shell(psql)を実行するのと実質同じ意味合いになります。

---

## 操作方法まとめ

SQL Shell(psql)で使用可能なコマンドをまとめます。
これらのコマンドはSQLとは直接関係なく、SQL ShellでPostgreSQLを操作する際に使用可能なコマンドです。

※Windows環境の場合バックスラッシュは￥マークに読み替えてください。

ユーザー及びDBの切り替え

```bash
> \c DB名 ユーザー名
```

データベースの一覧表示

```bash
> \l
```

ユーザーの一覧表示

```bash
> \du
```

---

テーブル一覧の表示

```bash
> \d
```

切断

```bash
> \q
```

コマンドプロンプトからの接続

```bash
> psql -U ユーザー名 -d データベース名
```
