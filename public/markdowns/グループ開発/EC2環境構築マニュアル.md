# EC2環境構築マニュアル

---

## AWSサーバー構築手順(共通)

### 概要

このテキストは新入社員研修の講師向けのAWSサーバー構築手順です。

サーバー構築の目的はJavaで作成したWebアプリケーション動作環境の構築です。

サーバー環境にはEC2の「Amazon Linux 2」を利用します。

サーバーの環境として、1教室1インスタンスの場合と1グループ1インスタンスの手順がありますが、  
この手順書はどちらの場合でも共通のものになります。

※予め他の講師がEC2インスタンスで構築している場合は、そのインスタンスをコピーして作成しても構いません。

インスタンスの複製方法は「サーバー構築手順（グループ単位）」に載っています。

手順は以下になります。

#### 1. AWSコンソールマネジメントへのログイン

#### 2. キーペアの作成

#### 3. EC2インスタンスの作成

#### 4. EC2インスタンスへのログイン

#### 5. ロケールの変更

#### 6. PostgreSQLのインストール

#### 7. GitとMavenのインストール

#### 8. 手順書の案内

#### 9. 動作確認

---

### AWSコンソールマネジメントへのログイン

ここではアカウント情報（IAM）の書かれたCSVファイルが配布されている前提とします。

手順は以下になります。

1. CSVファイルの確認
2. ログイン
3. パスワードの変更
4. ホーム画面の確認
5. リージョンの変更

#### 1. CSVファイルの確認  

CSVファイルにURL、ユーザー名、パスワード情報が書かれていることを確認します。

アカウント情報の記載されたCSVファイルがない場合は、AWS環境の管理者に確認してください。

#### 2. ログイン  

CSVにあるURLからログイン画面を開きます。

CSVにユーザー名とパスワードの情報があるので入力してログインします。

#### 3. パスワードの変更  

初回ログイン時はパスワードの変更を求められるので、パスワードポリシーを満たす新しいパスワードに変更します。

#### 4. ホーム画面の確認

パスワード変更後にAWSコンソールマネジメントのホーム画面に遷移します。

#### 5. リージョンを東京の変更

初回ログイン時にはリージョンが東京になっていない場合があるので、確認して変更します。

画面右上にリージョンの選択ボタンがあるので、**アジアパシフィック(東京)** を選択します。

---

### キーペアの作成

キーペアはEC2へのssh接続時に使用する秘密鍵と公開鍵のペア。
キーペアを作成して秘密鍵をダウンロードし、ssh接続で使用します。
鍵ファイルは一度しかダウンロードできないのでなくさないように注意すること。

#### 1. サービスの一覧からEC2を選択する

#### 2. リソースの中から「キーペア」を選択

#### 3. キーペアの管理画面から、右上の「キーペアの作成」ボタンを押下してキーペアを作成する

#### 4. キーペア名の入力

キーペアの名前は「教室名_作成日付」のようにどの研修で使用するかが分かる名前にします。

ファイル形式はpemを選択します。

※SSHクライアントでPuTTYを使用したい場合はppkでも構いません。

#### 5. 鍵ファイルのダウンロード

キーペアを作成すると秘密鍵のファイルがダウンロードされます。

ダウンロードしたキーファイルはユーザーフォルダの直下に置いておく。

C:\User\ユーザー名\xxxx.pem  
※ユーザーのフォルダ配下におかないとコマンドプロンプトやpowershellからssh接続したときにセキュリティ警告が出て接続できない。

Tera TermやPuTTYを使う場合はツールから直接鍵ファイルを指定するので保存場所は関係ない。

---

## インスタンスの作成

EC2インスタンスの作成方法は2つ方法があります。

1. ブラウザからGUI操作で作成する方法
2. AWS CLIを使う方法

どちらでも大丈夫です。

好きな方で実施してください。

### ブラウザからGUI操作で作成する方法（方法１）

AWSマネジメントコンソールのサービス選択画面からEC2を選択します。

#### 1.「インスタンスを起動」を選択

EC2の管理画面から、「インスタンスを起動」ボタンを押下します。

#### 2. マシンイメージ（AMI）の選択

マシンイメージを選択します。

Amazon Linux 2 AMI 64ビット(x86)を選択します。

#### 3. インスタンスタイプの選択

t2.microを選択します。

#### 4. インスタンスの詳細の設定

デフォルトの設定で「次のステップ：～」ボタンを押下します。

#### 5. ストレージの追加

デフォルトの設定で「次のステップ：～」ボタンを押下します。

#### 6. タグの追加

「タグの追加」を押下し、キーに「Name」値に「教室名-グループ名」もしくは「教室名」でタグを追加します。

値は任意ですが、どの教室のどのグループが使用しているかが分かる名前にします。

追加したら「次のステップ：～」ボタンを押下します。

#### 7. セキュリティグループの設定

既存のセキュリティグループを選択し、「group-develop」を選択する。

選択で来たら「確認と作成」ボタンを押下します。

※このセキュリティグループがない場合は新しいセキュリティグループを作成しても構いません。

新しく作成する場合は、
22(SSH), 80(htttp), 8080(Tomcat), 5432(PostgreSQL)のポートを解法してください。

#### 8. インスタンスの確認

EC2ダッシュボード画面から「実行中のインスタンス」を選択し、作成したインスタンスが実行されていることを確認します。

### AWS CLIを使う方法（方法２）

#### 1. AWS CLIのインストール

AWS CLIはCUI操作でAWSを操作するツールです。

ブラウザからの操作不要で様々な操作ができます。

事前にAWS CLIをダウンロード＆インストールします。

[ダウンロードサイト](https://aws.amazon.com/jp/cli/)  
インストール完了後はawsコマンドが使用可能になるのでコマンドプロンプトなどで確認する。

#### 2. AWS CLIの設定

aws configureコマンドで設定を行う。

コマンドプロンプトなどから

```bash
> aws configure

Access Key ID：CSVのAccess Keyを指定
Secret Access Key：CSVのScret Access Keyを指定
Default region name：ap-northeast-1
Default output format：text
```

で設定を行う。

#### 3. インスタンス作成&起動のコマンド実行

ec2 run-instancesコマンドを使用する。

オプション

--image-id：マシンイメージのid（Amazon Linux 2のマシンイメージIDを指定する）
--instance-type：インスタンスタイプ（t2.microを指定する）  
--security-group-ids：セキュリティグループのid（group-developのidを指定する）
--key-name：キーの指定（予め作成したキーペアの名前を指定）  
--subnet-id：ネットワークのサブネットの指定  
--tag-specifications：タグの指定

例
コマンドプロンプトの場合

```bash
aws ec2 run-instances --image-id ami-0053d11f74e9e7f52 --instance-type t2.micro --security-group-ids sg-0c32a59e450f7eff4 --key-name nihonbasib_20200915 --subnet-id subnet-08d032f63a8922c44 --tag-specifications ResourceType=instance,Tags=[{Key=Name,Value=nihonbasiA-A}] ResourceType=volume,Tags=[{Key=Name,Value=nihonbasiA-A}]  
```

powerhsellの場合  
tagのオプションの際に'を付ける必要がある。

```bash
aws ec2 run-instances --image-id ami-0053d11f74e9e7f52 --instance-type t2.micro --security-group-ids sg-0c32a59e450f7eff4 --key-name nihonbasib_20200915 --subnet-id subnet-08d032f63a8922c44 --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=nihonbasiA-A}]' 'ResourceType=volume,Tags=[{Key=Name,Value=nihonbasiA-A}]'  
```

上記の例でキーとタグを変更してそのまま実行すればたぶんOK

```bash
aws ec2 run-instances --image-id ami-0053d11f74e9e7f52 --instance-type t2.micro --security-group-ids sg-0c32a59e450f7eff4 --key-name <キー名> --subnet-id subnet-08d032f63a8922c44 --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=<タグ名>}]' 'ResourceType=volume,Tags=[{Key=Name,Value=<タグ名>}]'  
```

その他、詳しくは[リファレンス](https://docs.aws.amazon.com/cli/latest/reference/ec2/run-instances.html)などを参照ください。

---

### ssh接続

ここではコマンドプロンプトからssh接続する方法を紹介。

powershellでも同じです。

Tera TermやPuTTY等のSSHクライアントつーつからも接続可能ですが、ここでは省略します。

また、詳しくはEC2のインスタンス管理画面からも接続方法を確認できるので、そちらも参照ください。

#### 1. SSHクライアントの有効化

Windowsのオプション機能より「SSH クライアント」の機能を有効にします。

「機能の追加」を押下し、一覧からOpenSSH クライアントを選択して有効にします。

#### 2. クライアント接続

先のキーペアの作成で作成したpemファイルがユーザーフォルダ配下におかれていることを前提とします。

C:\User\ユーザー名\xxxx.pem  

コマンドプロンプト、あるいはpowershellを起動して、sshコマンドを実行します。

オプションでキーの指定と、パブリックDNSを指定します。

例

```bash
ssh -i "nihonbasib_20200915.pem" ec2-user@ec2-13-112-69-86.ap-northeast-1.compute.amazonaws.com
```

各インスタンスの接続方法については、EC2インスタンスの管理画面から、該当のインスタンスを選んで、  
「アクション」⇒「接続」⇒「SSHクライアント」から確認できます。

#### 注意点

EC2インスタンスは固定IPを取得していないと、起動するたびにパブリックDNSが変更されるので注意してください。

毎回全く同じ内容のコマンドでは接続できない可能性があります。

---

### ロケールの変更

Amazon Linux 2のデフォルトのロケールはENになっています。

Spring Bootをでメッセージリソースを使う場合、デフォルトでen用のファイルを読み込んでしまため、ファイルがない場合はエラーになるので、日本に設定しておく。

ロケールをJA（日本）にしておくと、jaのメッセージリソースを読み込むようになる。

```bash
# ロケールの確認
$ localectl status
# ロケール変更
localectl set-locale LANG=ja_JP.eucjp
# 変更されたか確認
$ localectl status
```

---

### PostgreSQLのインストール

ここではEC2インスタンスにPostgreSQLをインストールして外部から接続できるようにする手順を解説します。

該当のEC2インスタンスにSSH接続されていることを前提とします。

[参考サイト](https://zatoima.github.io/postgresql-ec2-insatll.html)  

#### 1. リポジトリの更新

まずはリポジトリを更新する。
デフォルトの状態でPosgreSQLをインストールするとバージョンが9.2なので（2020/09時点）最新バージョンがインストールできるようにリポジトリ更新します。

```bash
wget https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
$ sudo rpm -Uvh --nodeps pgdg-redhat-repo-latest.noarch.rpm
$ sudo sed --in-place -e "s/\$releasever/7/g" /etc/yum.repos.d/pgdg-redhat-all.repo
```

#### 2.PostgreSQLのインストールと環境設定

まずはインストールしてサービスの起動

```bash
# postgreSQLのインストール
$ sudo yum -y install postgresql12-server
# データベース初期化
$ sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
# サービス自動起動設定
$ sudo systemctl enable postgresql-12
# サービスの起動
$ sudo systemctl start postgresql-12.service
```

デフォルトではOSユーザーでログインする設定なので、postgresユーザーにパスワードを与えてログインする。

※PostgreSQLをインストールすると自動でpostgresユーザーが作成される

```bash
# postgresのパスワード変更(ここではpassとする)
$ sudo passwd postgres
⇒pass

# ユーザーを切り替え
$ su - postgres
password ⇒ pass

# postgreSQLへログイン
$ psql
```

PostgreSQL内のpostgresユーザーのパスワードを変更しておく。

デフォルトだとパスワードは設定されていない。

```bash
# postgreSQL内のpostgreユーザーのパスワード変更(ここではpassとする)
alter user postgres with password 'pass';

# postgresqlログアウト
\q
```

postgresqlからログアウトしてec2-userに戻ったら、外部からOSのユーザー以外でもログインできるように設定ファイルを変更する。

```bash
# ec2-userに戻る(postgreユーザーになっているため)
$ exit

# 設定ファイルの変更
# 外部からのアクセスできるようにする
$ sudo vi /var/lib/pgsql/12/data/postgresql.conf

# listen_address = 'localhost'
⇓
listen_address = '*'

# 設定ファイルの変更
# 外部からのpostgreSQLユーザーのパスワードでアクセスできるようにする
$ sudo vi /var/lib/pgsql/12/data/pg_hba.conf

# IPv4 local conecctions:
host  all  all  127.0.0.1/32  ident
⇓
host  all  all  0.0.0.0/0  md5

# サービス再起動
$ sudo systemctl restart postgresql-12.service
```

外部からの接続を確認する。

コマンドプロンプト、powershell等から

```bash
psql -h <パブリックDNS> -p 5432 -U postgres -d postgres
```

その後パスワード（ここではpass）を入力して接続できることを確認する。

---

### GitとMavenのインストール

GitとMavenは最悪なくてもデプロイできるが、GitとMavenを使ってデプロイすることも可能なので、インストールしておいた方が良いかと。

#### Gitのインストール

```bash
# git インストール
$ sudo yum -y install git 
# バージョン確認
$ git version
```

#### Mavenのインストール

[参考サイト](https://qiita.com/tamorieeeen/items/bcdf9729a5e9194c5d20)

mavenの最新バージョンのリンクは[こちら](https://maven.apache.org/download.cgi)から  

```bash
# ダウンロード
$ cd ~
$ sudo wget https://ftp.jaist.ac.jp/pub/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz

# 展開&配置
$ sudo tar -xzvf apache-maven-3.6.3-bin.tar.gz
$ sudo mv apache-maven-3.6.3 /opt/
# シンボリックリンク作成
$ sudo ln -s /opt/apache-maven-3.6.3 /opt/apache-maven
# PATHの追加
$ vi .bash_profile
```

```text
PATH=$PATH:$HOME/.local/bin:$HOME/bin
⇓
MVN_HOME=/opt/apache-maven
PATH=$MVN_HOME/bin:$PATH:$HOME/.local/bin:$HOME/bin
```

```bash
# PATHを通す
$ source .bash_profile
# Mavenバージョン確認
$ mvn --version
```

---

ここからの手順は、1教室1インスタンスとするか、1グループ1インスタンスとするかで手順が異なります。

それぞれで説明します。
まずは1教室1インスタンスの場合の説明します。
1グループ1インスタンスとしたい場合は、この手順はここの手順は読み飛ばしてください。

---

## サーバー構築手順（グループ単位）

### 概要

* 1グループ1インスタンスを想定したサーバー構築手順です。

* JavaやTomcatをインストールし、Webアプリケーションが動作する環境を作ります。
* 環境ができたら、EC2インスタンスを複製してグループ分作成します。

#### 1. Javaのインストール

#### 2. ApacheとTomcatのインストール

#### 3. EC2インスタンスの複製

---

### Javaのインストール

Java環境のインストール方法です。

AmazonのOpenJDK(amazon-corretto)をインストールします。

[参考サイト](https://docs.aws.amazon.com/ja_jp/corretto/latest/corretto-11-ug/amazon-linux-install.html)  

```bash
# JDKインストール
$ sudo yum -y install java-11-amazon-corretto
# javac バージョン確認
$ javac --version
# java バージョン確認
$ java --version
```

---

### ApacheとTomcatのインストール

ApacheとTomcatのインストールに関しては以下のサイトを参考に。

[参考サイト](https://qiita.com/hiren/items/2a4f1b55c99ebfb3fd08)

ちなみに、Spring Bootアプリケーションをデプロイする場合はビルドされたファイルにTomcatが含まれるため、全グループがSpring Bootアプリケーションを前提に開発を進める場合は、この手順は省略しても問題ありません。

#### Apacheインストール

```bash
# インストール
$ sudo yum install -y httpd
# 確認
$ httpd -v
# 自動起動設定
$ sudo systemctl enable httpd.service
# 起動
$ sudo systemctl start httpd.service
# 停止
$ sudo systemctl stop httpd.service
```

#### Tomcatインストール

ダウンロードするバージョンは  
[公式サイト](https://tomcat.apache.org/download-90.cgi)  
から確認

```bash
# ユーザー作成
$ sudo useradd -s /sbin/nologin tomcat

# tomcatダウンロード
$ cd ~
$ wget https://downloads.apache.org/tomcat/tomcat-9/v9.0.38/bin/apache-tomcat-9.0.38.tar.gz

# 解凍して配置
$ tar -xzvf ~/apache-tomcat-9.0.38.tar.gz
$ sudo mv ~/apache-tomcat-9.0.38 /opt
$ sudo chown -R tomcat:tomcat /opt/apache-tomcat-9.0.38

# シンボリックリンクの作成
$ sudo ln -s /opt/apache-tomcat-9.0.38 /opt/apache-tomcat
$ sudo chown -h tomcat:tomcat /opt/apache-tomcat

# ログのシンボリックリンク作成
$ sudo ln -s /opt/apache-tomcat/logs /var/log/tomcat
$ sudo chown -h tomcat:tomcat /var/log/tomcat

# TomcatをOSにサービスとして登録する為、ルート権限でUnitを作成
$ sudo vi /usr/lib/systemd/system/tomcat.service
```

tomcat.service

```text
[Unit]
Description=Apache Tomcat Web Application Container
After=syslog.target network.target

[Service]
Type=oneshot
PIDFile=/opt/apache-tomcat/tomcat.pid
RemainAfterExit=yes
#EnvironmentFile=/etc/tomcat/tomcat.conf
#Environment="NAME="
#EnvironmentFile=-/etc/sysconfig/tomcat
ExecStart=/opt/apache-tomcat/bin/startup.sh
ExecStop=/opt/apache-tomcat/bin/shutdown.sh
ExecReStart=/opt/apache-tomcat/bin/shutdown.sh;/opt/apache-tomcat/bin/startup.sh
SuccessExitStatus=143
User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target
```

```bash
# 自動起動設定
$ sudo systemctl enable tomcat.service
# システム起動
# Apacheを先に起動
$ sudo systemctl start httpd.service
$ sudo systemctl start tomcat.service

# システム停止
$ sudo systemctl stop tomcat.service
```

ブラウザから
http://<パブリックDNS>:8080
でTomcatのトップページにアクセスできることを確認する。

例

http://ec2-18-182-18-43.ap-northeast-1.compute.amazonaws.com:8080/

※Spring Bootアプリケーションを起動したい場合は、Tomcatが起動しているとポート番号が重複してエラーになるので注意。

---

### E2インスタンスの複製

インスタンスの環境が整ったらグループ開発のグループ分だけ複製します。

#### 1. イメージの作成

EC2インスタンスの管理画面から複製対象のインスタンスを選択し、  
「アクション」⇒「イメージ」⇒「イメージを作成」を選択します。

![イメージの作成](img/ec2-image-1.png)  

イメージ名を入力します。

名前は任意ですが用途が分かる名前で。

![イメージの作成2](img/ec2-image-2.png)  

入力したら右下の「イメージを作成」ボタン押下でイメージが作成されます。

左側のメニューで「イメージ」⇒「AMI」を選択すると作成したイメージが確認できます。

![イメージ確認](img/ec2-ami.png)  

#### 2. AMIの複製

ステータスがaviravleになっていることを確認して「起動」ボタンを押します。

![イメージ確認](img/ec2-ami2.png)  

インスタンスを作成する画面になります。

![インスタンス作成](img/ec2-instance-create2.png)  
後は**EC2インスタンスの作成**と同様の手順でインスタンスを作成します。

出来上がったインスタンスは複製元のイメージと同じ状態になっています。

必要に応じてグループの数EC2インスタンスを作成してください。

AWS CLIを使用してインスタンスを作成することも可能です。

その場合はオプション「--image-id」で作成したイメージのidを指定します。

例
コマンドプロンプトの場合

```bash
aws ec2 run-instances --image-id ami-0f89be182020d9e61 --instance-type t2.micro --security-group-ids sg-0c32a59e450f7eff4 --key-name nihonbasib_20200915 --subnet-id subnet-08d032f63a8922c44 --tag-specifications ResourceType=instance,Tags=[{Key=Name,Value=nihonbasiA-C}] ResourceType=volume,Tags=[{Key=Name,Value=nihonbasiA-C}]  
```

---

---

## サーバー構築手順（教室単位）

この手順書では「サーバー構築手順（共通）」を手順を実施した前提で話を進めます。

### 概要

* 1インスタンスで複数（グループ数）のWebサービスを稼働させます。

* Dockerを使って、グループの数だけTomcatの環境を構築します。

* PostgreSQLはサーバーに1つ用意し、ユーザーとデータベースの環境をグループに合わせて用意します。

* この手順書では1教室に4グループ（A〜Dグループ）あることを想定して説明します。

Dockerについては細かい説明は省略しますので、詳しくない方は各自適当に入門サイトなどで概要を理解しておいてください。

[Docker入門](https://knowledge.sakura.ad.jp/serialization/getting-start-docker/)  

手順は以下になります。

#### 1. DB環境の用意

#### 2. Dockerのインストール

#### 3. マウント用ディレクトリの作成

#### 4. Tomcatのコンテナの起動

#### 5. Tomcatの設定

#### 6. 動作確認

---

### DB環境の用意

PostgreSQLのインストール自体は「サーバー構築手順（共通）」の内容で構築されていることを前提とします。

PostgreSQLにログインして、グループに合わせてユーザーとデータベース環境を用意してください。

PostgreSQLにログインします。

```bash
psql -h <パブリックDNS> -U postgres 
```

ユーザー作成とデータベース作成のSQLを実行します。

ユーザー名とパスワード、データベース名は講師の采配で適当に決めてください。

```sql
create user groupa password 'groupa' createdb;
create user groupb password 'groupb' createdb;
create user groupc password 'groupc' createdb;
create user groupd password 'groupd' createdb;

\c postgres groupa
create database groupadb;

\c postgres groupb
create database groupbdb;

\c postgres groupc
create database groupcdb;

\c postgres groupd
create database groupddb;
```

---

### Dockerのインストール

```bash
# Dockerのインストール
$ sudo yum install -y docker
# サービスの起動
$ sudo systemctl start docker
# 確認
$ sudo docker version
# ユーザーの追加（必要ない？？）
$ sudo usermod -a -G docker ec2-user
# システムの自動起動設定
$ sudo systemctl enable docker
```

---

### マウント用のディレクトリの作成

Docker上のTomcatとマウントする用のディレクトリを作成しておく。

マウントしておくと、ここにファイルをおけばコンテナ上にもファイルが配置される。

研修生はここにwarファイルを置く形になる。

```bash
# Tomcat用のディレクトリ作成
$ sudo mkdir /opt/tomcat
# グループ毎のディレクトリ作成（グループ分）
$ sudo mkdir /opt/tomcat/groupA
$ sudo mkdir /opt/tomcat/groupB
$ sudo mkdir /opt/tomcat/groupC
$ sudo mkdir /opt/tomcat/groupD
```

---

### Tomcatのコンテナを起動

グループの数だけtomcatのコンテナを用意し、グループによってポートを変える。

コンテナ名は指定しないとイメージと同じ（tomcat）になってしまうので、必ず指定してグループごとに名前を変更するようにする。

ポートやコンテナ名はサンプルの通りでなくてもOK。

講師がわかりやすいと思うもので設定してください。

```bash
# TomcatのDockerイメージ取得
$ sudo docker pull tomcat
# 取得できたか確認
$ sudo docker images

# tomcat用のコンテナをグループ分起動

# Aグループ用のコンテナ名をtomatAとする
# コンテナ側のポート8080をホストの8081にフォワーディング
# ホスト側の/opt/tomcat/gropAディレクトリを/usr/local/tomcat/にマウントする
$ sudo docker run -d -p 8081:8080 -v /opt/tomcat/groupA:/usr/local/tomcat/webapps --name tomcatA tomcat

# Bグループ用のコンテナ名をtomatBとする
# コンテナ側のポート8080をホストの8082にフォワーディング
# ホスト側の/opt/tomcat/gropAディレクトリを/usr/local/tomcat/にマウントする
$ sudo docker run -d -p 8082:8080 -v /opt/tomcat/groupB:/usr/local/tomcat/webapps --name tomcatB tomcat

# Cグループ用のコンテナ名をtomatCとする
# コンテナ側のポート8080をホストの8083にフォワーディング
# ホスト側の/opt/tomcat/gropCディレクトリを/usr/local/tomcat/にマウントする
$ sudo docker run -d -p 8083:8080 -v /opt/tomcat/groupC:/usr/local/tomcat/webapps --name tomcatC tomcat

# Dグループ用のコンテナ名をtomatDとする
# コンテナ側のポート8080をホストの8084にフォワーディング
# ホスト側の/opt/tomcat/gropDディレクトリを/usr/local/tomcat/にマウントする
$ sudo docker run -d -p 8084:8080 -v /opt/tomcat/groupD:/usr/local/tomcat/webapps --name tomcatD tomcat

# コンテナが正常に起動しているか確認
# runで起動したコンテナの分だけプロセスが確認できればOK
$ duso docker ps
```

自動起動の設定  
デフォルトの設定だとEC2インスタンスを再起動するとコンテナは停止した状態で、インスタンス起動後手動で起動する必要があるので、自動起動の設定をしておく。

```bash
sudo docker update --restart=always tomcatA
sudo docker update --restart=always tomcatB
sudo docker update --restart=always tomcatC
sudo docker update --restart=always tomcatD
```

ちなみに手動で起動する場合はstartコマンドを使用する。

```bash
sudo docker start tomcatA
sudo docker start tomcatB
sudo docker start tomcatC
sudo docker start tomcatD
```

---

### Tomcatの設定

tomcatではwebapps配下にデプロイするファイルを配置する。

コンテナのTomcatではデフォルトでWebappsの中身は空で、webapps.distに必要なファイルが入っているので、中身をコピーする。

（本来はリネームでも良いが、ホストとマウントしているので名前の変更はできなくなる。）  

```bash
# Docker(Tomcat)に入り込む
$ sudo docker exec -it tomcatA bash
# Webapps.distの中身をWebappsにコピー
$ cp -r webapps.dist/* webapps
# Dockerから抜ける
$ exit
```

これをグループ分（コンテナ分）繰り返す。

ここの例だとtomcatA〜tomcatDまで繰り返す。

---

### 動作確認

#### Tomcatが正常に動いているか確認

ブラウザからそれぞれのコンテナのポートにアクセスしてTomcatが正常に動作しているか確認する。

http://<パブリックDNS>:8081  
http://<パブリックDNS>:8082  
http://<パブリックDNS>:8083  
http://<パブリックDNS>:8084  

余裕があれば（そして不安であれば）マウントができているかも確認しておく。

/opt/tomcat/groupA/  
ディレクトリに適当なディレクトリを作成し、その中にindex.htmlを作成し、ブラウザから確認してみる。

```bash
# ディレクトリ作成
$ sudo mkdir /opt/tomcat/groupA/test
# 移動
$ sudo cd /opt/tomcat/groupA/test
# html作成
$ sudo vim index.html
```

```html
<html>
    Hello
</html>
```

ブラウザから  
http://<パブリックDNS>:8081/test  
にアクセス
「Hello」のページが表示されれば、マウントがうまくできている。

#### warファイルのデプロイの確認

warファイルの作成方法は省略します（共通の手順書に軽く書いてます）。

warファイルをTomcatのコンテナにデプロイして確認する方法

warファイルをコンテナとec2-userのホームディテクトりに配置
ローカルの環境で実行

```bash
scp -i <pemファイル> <warファイルのパス> ec2-user@<パブリックDNS>:~/
```

Macだとpemファイルのパーミッションは600じゃないと、エラーが出てしまう。。

EC2に接続後、warファイルをコンテナとマウントしているディレクトリに配置
※scpコマンドでマウントしているディレクトリに転送しないのは、/optはroot権限でないとアクセスできないのでエラーになるため。

```bash
sudo cp <warファイル> /opt/tomcat/groupA
```

ブラウザから
http://<パブリックDNS>:8081/<デプロイされたディレクトリ>  
にアクセスして表示されることを確認する。

ポートやディレクトリは必要に応じて変更してください。

---

## 動作確認

手順書通りにやってエラーなどが出なければ多分大丈夫ですが、不安がある場合は自分でwarファイルを作成して動作確認してみてください。

DB接続など、デプロイに関して確認が必要であれば適宜適当なWebアプリを作成してwarファイルをデプロイして確認してください。

**動的Webアプリケーションの場合**  
warファイルを作成する場合はEclipsecでプロジェクトを右クリックして「エクスポート」から作成

**Springの場合**  
warファイルの作成は、プロジェクトを右クリックし、実行 → Maven Installから可能。

実行後はプロジェクトのtargetフォルダ配下にファイルが作成される。

デフォルトだとjarファイルになるので、pom.xmlで  
\<packaging>war\</packaging>  
を追加する必要がある。
