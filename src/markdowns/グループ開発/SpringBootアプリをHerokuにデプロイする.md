# SpringBootアプリをHerokuにデプロイ

---

## 概要

Spring Bootを使って作成したJavaのWebアプリケーションを、Herokuを使ってクラウド上にアップするまで手順についての紹介です。
方法はいくつかやり方がありますが、今回はGitHubと連携する方法を紹介。
PCの環境はWindows 10、DBはPostgreSQLを使用していることを想定。

環境やバージョンが異なる場合は必要に応じて公式サイトなどを参照してください。

## 必要なアカウント

* GitHub
    Gitのホスティングサービス。

ソースコードのバージョン管理などができる。

ここでは開発したアプリのソースコードをGitHubで管理していることを想定する。

* Heroku  
    無料で利用できるクラウドサービス（PaaS）。

様々なプログラミング言語やフレームワークに対応したWebアプリケーションをデプロイすることができるプラットフォーム。

GitHubと連携できる。

それぞれアカウントがない場合は事前に作成しておく。

### 必要なツール

#### Heroku CLI  

Herokuをコマンドプロンプトなどを使ってコマンドで操作できるツール。

[HerokuDevCenter](https://devcenter.heroku.com/articles/heroku-cli)のサイトからダウンロードして指示に従ってインストール。

インストールしたら、binフォルダのパスを環境変数Pathに追加。

デフォルトだと「C:\Program Files\heroku\bin」あたり。

#### PostgreSQL  

オープンソースのデータベース。

Heroku上で無料で利用できるデータベースがPostgreSQLなので、コマンドからHeroku上のDBを操作できるようにローカルにもPostgreSQLをインストールしておく。

[公式サイト](https://www.postgresql.jp/download)からインストーラをダウンロードしてインストール。

バージョンは最新のやつなら問題ないかと。

インストールしたらbinのフォルダを環境変数Pathに追加。

デフォルトだと「C:\Program Files\PostgreSQL\<バージョン>\bin」あたり。

#### Spring Bootの開発環境  

Spring BootはJavaでWebアプリケーションを作成するためのフレームワーク。

何でもよいけれど、EclipseのFull Editionとか、STSとかで開発可能。

VS Codeでも可能。
ここではEclipseで開発していることを前提としますが、大きく違いはないと想定。

### 手順

1. Spring Bootアプリケーションの作成  
EclipseとかSTSとかを使って作成

2. GitHubにSpringBootアプリケーションのソースコードをプッシュ  
リポジトリを作成して作成したアプリをプッシュする。

最初からGitHubでソースコード管理しながら作成したほうが良いかもね。

3. Herokuアプリケーションの作成  
Herokuにログインしてダッシュボードの画面から新しいアプリケーションを作成。

アプリケーション名は任意。

Heroku CLIでもできる。お好きな方で。

アプリ名は既に誰かに作成されていた場合は重複して作成できないので注意。

4. HerokuアプリケーションにHeroku Postgresを追加  
アプリケーションの管理画面のResoucesタブを表示。

Add-onsでHeroku Postgresを検索して追加する。

5. DBの設定
ローカルにHeroku CLIとPostgreSQLがインストールされてて環境設定ができていればコマンドから  

```bash
heroku pg:psql -a <アプリ名>
```

で接続可能。

テーブルなどを事前に作成しておく必要がある場合はSQL文を流して作成しておく。

### SpringBootアプリ側の設定追加  

Spring Bootのアプリケーションに、Herokuでデプロイして動作するための設定を追加する。

* Procfileを追加  
Webアプリのフォルダ直下(POM.xmlなどと同じ階層)に「Procfile」という名前で以下の内容のファイルを作成。

Heroku上でアプリケーションを動かすためにはこのファイルが必要らしい。

言語ごとに書き方が色々あるとのこと。

```text
web: java $JAVA_OPTS -jar target/dependency/webapp-runner.jar --port $PORT target/*.war
```

詳しくは[公式サイト](https://devcenter.heroku.com/articles/java-webapp-runner#create-a-procfile)参照  
※ローカルからgitを使ってpushした場合、上記ではエラーになることがあり、

```text
web: java $JAVA_OPTS -jar target/*.war --server.port=$PORT
```

上記にするとうまくいった。

* system.propertiesを追加  
Procfileと同じ階層に「system.properties」という名前のファイルを追加。

内容はJavaのバージョン。自身のバージョンに合わせて。

バージョンが異なっているとビルドする際にエラーが出る。

Java 11の場合は1.8を11に変更する。

```text
java.runtime.version=1.8
```

* application.propertiesにDB接続情報を追加  
Herokuのアプリケーションの管理画面のSettingsタブの「Reveal Config Vars」からデータベースの接続URL情報が確認可能。

接続URLは以下のようになる。

```text
postgres://pxxsmjadcejqnv:8a68cb4f3e311442d688439ea25d780f7e580d0263da70afe65181f20c1a705b@ec2-174-129-255-15.compute-1.amazonaws.com:5432/dd2fk9n2pggjn7
```

この場合、ユーザー名、パスワード、ホスト名、DB名は以下になる。
ユーザー：pxxsmjadcejqnv
パスワード：8a68cb4f3e311442d688439ea25d780f7e580d0263da70afe65181f20c1a705b
ホスト：[ec2-174-129-255-15.compute-1.amazonaws.com](http://ec2-174-129-255-15.compute-1.amazonaws.com/)
ポート：5432
DB名：dd2fk9n2pggjn7

これをJavaのアプリケーションのDB接続情報に反映させる。

Spring JDBCを使ってた場合、application.propertiesあたりに設定を書くので、そこに反映させる。

設定が終わったらGitHub上に反映。

GitHub上で直接修正しても可。

### デプロイ

Herokuのアプリケーションの管理画面からDeployタブを表示。

GitHubに接続するボタンがあるので、そこから接続する。

ブランチを選んで「Deploy」押下で、Herokuにデプロイできる。

後はHerokuの管理画面のOpen appボタンよりアプリケーションを確認する。

### その他の注意点

* メッセージリソースを使用している場合  

エラーメッセージなどをSpringのメッセージリソースを使用している場合には注意が必要。

通常、messages_ja.properties  でメッセージリソースを作成するが、Herokuの場合リージョンが米国になるため、  
messages_en.propertiesを作成する必要がある。

（メッセージが読み込めない、という旨のエラーメッセージが出る。）  
なので、messages_ja.propertiesをコピーしてmessages_en.propertiesを作成し直す必要がある。

### GitHubと連携せずに、gitコマンドで直接Herokuにデプロイする方法

[Git を使用したデプロイ](https://devcenter.heroku.com/ja/articles/git#prerequisites-install-git-and-the-heroku-cli)  
を参考にすればできる。
