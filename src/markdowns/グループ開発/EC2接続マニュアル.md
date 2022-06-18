# EC2接続マニュアル

---

## Amazon EC2接続マニュアル

ここではAWSのサーバー（Amazon EC2）を利用して作成したWebアプリケーションをデプロイする方法を紹介します。
前提条件として、sshで接続可能なEC2インスタンスが作成されていることとします。
また、EC2インスタンスのマシンイメージはAmazon Linuxを前提とします。

※パブリックDNSはサーバーが再起動するタイミングで変更されます。

一度接続した情報で接続できなくなった場合は講師へ確認してください。

内容は以下の通りです。

1. 用語の解説
2. EC2インスタンスへのSSH
3. PostgreSQLへの接続
4. Webアプリケーションのデプロイ
5. Gitを活用したデプロイ方法

デプロイの方法は4、5いずれかの方法で実施可能です。

どちらで実施しても構いません。

## 前提条件

上記の作業をするにあたり、講師から以下の情報が与えられていることを前提とします。

* EC2のユーザー名とパブリックDNS
* 接続用の鍵ファイル（pemファイル）
* PostgreSQLのユーザー名とパスワード、及び使用できるデータベース名
* Tomcatのポート番号

また、クライアントの端末で以下の設定が行われる前提とします。

* 接続する側のPCでOpenSSHクライアントの機能が有効化されていること

---

## 用語の解説

AWSはAmazon.comが提供するクラウドサービスです。

EC2はAWSで提供されるIaaSのサービスの1つです。

簡単にサーバー環境を構築できます。

EC2で作成したサーバー環境をEC2インスタンスと呼びます。

EC2では様々なサーバーOSを選ぶことができますが、ここではAmazon Linux 2　を使用します。

Amazon LinuxはCentOSベースのOSで、CentOSで使用できるコマンドはほとんど使用できます。

パブリックDNSはEC2インスタンス接続するときに必要となる文字列情報で、IPアドレスなどの情報を含みます。

---

## EC2インスタンスへのSSH接続

接続手順

1. 鍵ファイル（pemファイル）をユーザーフォルダ配下に移動します  
    C:\User\<ユーザー名>\xxxxx.pem
2. コマンドプロンプト（またはPowerShell）を起動
3. sshコマンドでEC2に接続する

```bash
> ssh -i 鍵ファイル ユーザー名@パブリックDNS
```

例

```bash
> ssh -i "nihonbasib_20200915.pem" ec2-user@ec2-13-112-69-86.ap-northeast-1.compute.amazonaws.com
```

以下のような画面が表示されればOKです。

![接続画面](/images/cmd-ssh.png)

接続できればLinuxコマンドを使用してEC2を操作できます。

デフォルトのユーザー（ec2-user）はroot権限を持っていないため、root権限が必要なコマンドはsudoを付けて実行します。

---

## PostgreSQLへの接続

与えられたEC2の環境にはDB(PostgreSQL)環境を構築済みです。

グループ開発でのDB環境はEC2の環境を利用してください。

接続コマンド

```bash
> psql -h パブリックDNS -U ユーザー名 -d DB名
```

コマンドに問題がなければパスワードを求められるので、予め与えられたパスワードを入力して合っていれば接続成功です。

例

```bash
> psql -h ec2-18-180-84-177.ap-northeast-1.compute.amazonaws.com -U postgres -d postgres
```

接続できた後は必要に応じてテーブルなどを作成し、DB環境を構築してください。

※A5-Mk2などのSQLクライアントからの接続も可能です。

やりやすい方法で実施してください。

ただしEC2インスタンスが再起動されるとパブリックDNSが変更されるので、接続情報も変更されます。

---

## Webアプリケーションのデプロイ方法

デプロイとは開発環境のプログラムをアプリケーションを動作させる本番環境に反映させることをいいます。

Spring Bootを使用した場合と使用しない場合で方法が異なります。

---

### Spring Bootアプリケーション(jarファイル)の場合

[参考サイト](https://kohei.life/spring-boot-build-deploy/)

※JSPを使用していない場合（TymreafなどでViewを作成している場合）はjarファイルによるデプロイが可能です。

JSPを使用している場合は、warファイルしか動作しないので、次節にwarファイルの場合を参照ください。

**プロジェクトをビルドしてjarファイルを作成する**  
Eclipseで対象のSpring Bootプロジェクトを右クリック ⇒ 実行 ⇒ Maven install
を実行。

ビルドが成功したらtarget配下にjarファイルができる。

**jarファイルを転送する**  
scpコマンドなどを使用してjarファイルをEC2インスタンスに転送する。

コマンドプロンプトなどから

```bash
scp -i pemファイル "jarファイルのパス" ユーザー名@パブリックDNS:転送先のパス
```

を実行する。

例  
デスクトップのjarファイルをec2-userのホームディレクトリに転送する。

```bash
scp -i nihonbasib_20200915.pem "C:\Users\axiz\Desktop\demo-0.0.1-SNAPSHOT.jar" ec2-user@ec2-18-182-18-43.ap-northeast-1.compute.amazonaws.com:~/
```

**Webアプリケーションを実行する**
EC2インスタンスにSSH接続し

```bash
java -jar 転送されたjarファイル
```

を実行するとSpringBootアプリケーションが起動する。

ブラウザからアクセスして動作を確かめる  
http://<パブリックDNS>:<Tomcatのポート番号>/マッピングしているパス

プログラムを停止したい場合  
Ctrl + CでTomcatを停止できます。

ただしサーバーを停止してもプロセスが残っている場合があります。

その場合はpsコマンドでプロセスIDを確認し、killコマンドで終了させる。

```bash
# プロセスの確認
$ ps a
# 出力結果からjavaアプリケーションのPIDを確認
# killコマンドでプロセスを削除
$ kill PID
```

---

### Spring Bootアプリケーション(warファイル)の場合

**pom.xmlの設定**
warファイルにビルドするには、pom.xmlの設定が必要です。

pom.xmlに
\<packegaing>war\</packegaing>  
を追加します。

※プロジェクト作成時にパッケージを「war」で選択した場合には初めから追加されています。

**プロジェクトをビルドしてwarファイルを作成する**  
Eclipseで対象のSpring Bootプロジェクトを右クリック ⇒ 実行 ⇒ Maven install
を実行。

ビルドが成功したらtarget配下にwarファイルができる。

出来上がったwarファイルをEC2インスタンスに転送する。

```bash
scp -i pemファイル "warファイルのパス" ec2-user@パブリックDNS:~/ 
```

例

```bash
scp -i nihonbasib_20200915.pem "C:\Users\axiz\Desktop\demo.war" ec2-user@ec2-18-182-18-43.ap-northeast-1.compute.amazonaws.com:~/
```

---

### 動的Webアプリケーション(Spring未使用)の場合

Spring Bootを使用せずにJSP/Servletのみで作成した場合  

[参考サイト](https://itsakura.com/tomcat-warfile)

**warファイルを作成する**
Eclipseからプロジェクトを右クリック ⇒ エクスポート ⇒ warファイルを選択。

出力先を指定してwarファイルを出力します。

**warファイルを転送する**
scpコマンドなどでwarファイルをEC2インスタンスに転送します。

```bash
scp -i pemファイル "warファイルのパス" ec2-user@パブリックDNS:~/ 
```

例

```bash
scp -i nihonbasib_20200915.pem "C:\Users\axiz\Desktop\demo.war" ec2-user@ec2-18-182-18-43.ap-northeast-1.compute.amazonaws.com:~/
```

**Tomcatの起動とwarファイルの展開**
EC2インスタンスにssh接続し、転送されたwarファイルを  
tomcatがインストールされたディレクトリ/webapps  
に配置します。

tomcatは
/opt/apache-tomcat  
にインストールされている想定です。

インストールされていない場合は講師に確認してください。

```bash
sudo cp warファイル /opt/apache-tomcat/webapps
```

```bash
# Apacheを起動
sudo systemctl start httpd.service
# Tomcatを起動
$ sudo systemctl start tomcat.service
```

Tomcatの起動に成功すれば、webapps配下でwarファイルが展開されます。

展開されているかどうかはlsコマンドなどで確認してください。

```bash
sudo ls /opt/apache-tomcat/webapps/
```

ブラウザから  

http://<パブリックDNS>:<Tomcatのポート番号>/コンテキストルート  

でアクセスして実行結果を確認する。

---

## Gitを活用したデプロイ方法

Eclipseからjarファイルやwarファイルを作成してEC2上に転送するのではなく、直接EC2インスタンス上でjarファイルやwarファイルを作成することも可能です。

前提条件  

* EC2インスタンスにGitがインストールされていること  
* EC2インスタンスにMavenがインストールされていること（Spring Bootを使用する場合）
* GitHub, GitLabなどのホスティングサービスにリモートリポジトリが作成されていること
    ※.gitignoreでクラスファイルなどが除外されていることを確認して下さい。

```bash
# Gitがインストールされていることの確認
$ git version

# 初期設定をしておく
# ユーザー名の設定
git config --global user.name "ユーザー名"
# メールアドレスの設定
git config --global user.email "メールアドレス"

# リモートリポジトリをクローンする
$ git clone リモートリポジトリのURL

# 作業ディレクトリ移動
$ cd クローンされたプロジェクト
```

### Spring Bootの場合

プロジェクトのディレクトリ配下にpom.xmlがあることを確認する。

ビルドする際にpom.xmlがないとうまくいかない。

**プロジェクトのビルド**

```bash
# Mavenがインストールされていることの確認
$ mvn --version
# ビルド
$ mvn package spring-boot:repackage
```

ビルドが成功すればtargetディレクトリが作成され、中にjarファイル（あるいはwarファイル）が出来上がります。

**Webアプリケーションを実行する(jarファイルの場合)**
jarファイルの場合はjavaコマンドを使ってアプリケーションを起動します。

```bash
java -jar 転送されたjarファイル
```

ブラウザからアクセスして動作を確かめる  
http://<パブリックDNS>:<tomcatのポート番頭>/マッピングしているパス

プログラムを停止したい場合  
Ctrl + CでTomcatを停止できます。

ただしサーバーを停止してもプロセスが残っている場合があります。

その場合はpsコマンドでプロセスIDを確認し、killコマンドで終了させる。

```bash
# プロセスの確認
$ ps a
# 出力結果からjavaアプリケーションのPIDを確認
# killコマンドでプロセスを削除
$ kill PID
```

**warファイルの場合**  
Tomcatのwebappsディレクトリ配下にwarファイルを配置し、Tomcatw起動させればWebアプリケーションが動作します。

その辺りは次節に動的Webアプリケーションの場合を参考ください。

### 動的Webアプリケーションの場合

[参考サイト](https://qiita.com/Qui/items/14961678ef939673f744)
「src」と「WebContent」ディレクトリがあるディレクトリに移動しておく。

```bash
# ライブラリ用ディレクトリ作成
$ mkdir lib
# servlet-api.jarを移動しておく
$ sudo cp /opt/apache-tomcat/lib/servlet-api.jar lib
# ソースファイルをコンパイルする
$ javac -sourcepath src -classpath lib/* -d WebContent/WEB-INF/classes src/example/*

# warファイルを作成
$ jar cvf webtest.war -C WebContent .
```

**Tomcatの起動とwarファイルの展開**
warファイルを  
tomcatがインストールされたディレクトリ/webapps  
に配置します。

tomcatは
/opt/apache-tomcat  
にインストールされている想定です。

インストールされていない場合は講師に確認してください。

```bash
sudo cp warファイル /opt/apache-tomcat/webapps
```

```bash
# Apacheを起動
$ sudo systemctl start httpd.service
# Tomcatを起動
$ sudo systemctl start tomcat.service
```

Tomcatの起動に成功すれば、webapps配下でwarファイルが展開されます。

展開されているかどうかはlsコマンドなどで確認してください。

```bash
sudo ls /opt/apache-tomcat/webapps/
```

ブラウザから  
http://<パブリックDNS>:<tomcatのポート番号>/コンテキストルート  
でアクセスして実行結果を確認する。

---

### その他、補足説明など

#### ファイル転送について

ファイル転送についてはSCPコマンドを紹介しましたが、WinSCP、Tera Termなどのツールを使うとGUI操作でのファイル転送も可能です。
