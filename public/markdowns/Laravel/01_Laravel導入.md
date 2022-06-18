# Laravel導入

---

## Laravelとは

* PHPのフレームワークの1つです。
* MVCモデルを意識した開発がしやすくなります。
* 概要や使い⽅は公式サイトにほぼ載っています。
* 不明点があればまずは公式サイト⾒るようにしましょう。

[Laravel公式サイト]("http://laravel.jp/")

---

## インストール方法

*  このテキストではバージョンは8系を前提に話を進めます。
*  PHPのバージョンによっては使えない場合もありますので、その場合は⾃⾝のPHPのバージョンに合ったLaravelのバージョンを確認してインストールしてください。

[Laravel公式インストール手順](https://readouble.com/laravel/8.x/ja/installation.html)

*  また、バージョンによってはテキストと同じ内容で動作しない場合がありますので、その場合は⾃⾝のバージョンに対応したマニュアルを参照して内容を確認してください。

---

### インストールの補足説明

*  Laravelでは、ソースコードを格納するフォルダのことを**プロジェクト**と呼びます。
*  Laravelのインストールとプロジェクトの作成はコマンドを使⽤します。コマンドプロンプトやPowerShell、ターミナルなどのコマンドラインツールからインストールを⾏ってください。
* プロジェクトを作成するコマンドを実⾏した際には、コマンドライン上のカレントディレクトリにプロジェクトが作成されます。cdコマンドを使ってあらかじめプロジェクトを作成したいディレクトリに移動しておいてください。
* Laravelにはあらかじめ簡易的なWebサーバーが組み込まれているため、必ずしもXAMPPのドキュメントルート配下にフォルダを作成する必要はありません。（とはいえソースコードが⾊んなフォルダに分散されると管理が⾯倒なので、研修中はドキュメントルート配下に作るのが無難。）
* プロジェクト名は任意ですが、ここでは「axiz_fw」という名前を前提に話を進めます。

---

## インストール前に知っておきたい用語
### WSL
Windows Subsystem for Linuxの略です。   
WindowsのOS上でLinuxの実行環境を実現することができるサブシステム。  
Linuxでしか使えないコマンドが使えるようになります。  

### Docker
Dockerとは、コンテナ型の仮想環境を作成、配布、実行するためのプラットフォームです。  
仮想マシンとは何が違うのか？大きな違いはDockerにはゲストOSが必要なく、コンテナという単位でアプリケーションを動かすことができます。  
Dockerのメリットとしては、  
* コード化されたファイルを共有することで、どこでも誰でも同じ環境が作れる。
* 作成した環境を配布しやすい。
* スクラップ＆ビルドが容易にできる。  
などがあります。  

![picture 5](/images/353b8fa07ec3115d7352930d682c2f26b6da792170ad6758dbe0dcf31972b8af.png)  

---

## インストール手順

1. WSLをインストールします。
    
    管理者権限でPowerShell、またはコマンドプロンプトを開き、以下のコマンドを実行します。  
    実行後、PCを再起動してください。
    
    ```powershell
    wsl --install
    ```
     

    再起動後、自動的にインストールされたUbuntuが起動しますので、ユーザ名とパスワードの設定をします。  
    その後PowerShellを起動し以下コマンド実行で、Ubuntuに「*」がついていて、VERSIONが2になっていることを確認します。  
    
    ```powershell
    $ wsl -l -v
      NAME         STATE         VERSION
    * Ubuntu       Running        2
    ```
    

    ※「*」がUbuntuになってない場合  

    ```powershell
    wsl --set-default Ubuntu-20.04
    ```
    
    ※VERSIONが2でない場合  

    ```powershell
    wsl --set-version Ubuntu-20.04 2
    ```
    
---

2. Docker Desktopのインストール
    
    ここからWindows用Docker Desktopをインストールします。  
    [Docker Desktopインストール](https://www.docker.com/products/docker-desktop/)

---
    
3. 新規Laravelプロジェクトの作成

    Windows Terminalを開いて新しいタブを開くでUbuntuを起動し、プロジェクトを作成したいフォルダに移動します。以下コマンドを実行するとプロジェクトが作成されます。  
    （example-appはプロジェクト名。適宜変更すること。）
    
    ```powershell
    curl -s "https://laravel.build/example-app" | bash
    ```

---

4. Laravel Sail起動
    
    cdコマンドで作成したプロジェクトに移動し、以下コマンドを実行。(初回は時間がかかる場合があります。)
    
    ```powershell
    ./vendor/bin/sail up -d
    ```
    
    [http://localhost](http://localhost/) へアクセスするとLaravelページに飛びます。  
    飛ばない場合、何らかのエラーが出ています。プロジェクト内のstorage/logs/laravel.logに出力されるエラー内容を見て原因を確かめましょう。
    
---

## フォルダ構成

 Laravelのプロジェクトが作成されると、あらかじめ多くのフォルダやファイルが作られていることがわかります。  
初めから全てを把握しておく必要はありませんが、開発を進める上で最低限必要になるフォルダとその概要を理解しておきましょう。

* app
  * PHPのプログラムは基本的にこの中に作成。モデルやコントローラはここに作成する。コントローラはapp/Http/Controllersに格納する。
* config
  * 各種設定に関するファイルを格納するフォルダ。
* database
  * データベースに関するファイルを格納するフォルダ。
* public
  * css、jsなど外部から直接参照できるファイルを格納するフォルダ。
* resources/views
  * 画面に表示するviewのファイルを格納するフォルダ。
* routes
  * ルーティング(URLマッピング)に関するファイルを格納するフォルダ。
  * web.phpでURLとコントローラのマッピングをする。

---

## 初期設定

インストールが完了したらまずは初期設定をしておきましょう。  
修正するファイルは以下になります。
* 「env」ファイル
  * DB接続に関する設定箇所があるので、自身の環境に合わせて設定を変更します。
  * あらかじめMySQLにDBを作成しておいてください。
  * DB名は任意ですが、ここでは「axizdb_fw」として話を進めます。
* 「config/app.php」
  * 'timezone' => 'Asia/tokyo'
  * 'local' => 'ja'  
  に変更しておきます。

「.env」ファイルと「config」フォルダは設定に関するファイルになるので、必要に応じて中⾝を確認して修正するようにします。

---

## コマンド

* Laravelでは様々な操作をコマンドを通じて実⾏します。
* Laravelの開発を⾏う際にはコマンドラインツール（コマンドプロンプト、ターミナルなど）を起動し、「cd」コマンドを使って作業ディレクトリがLaravelプロジェクトのフォルダになるようにしておいてください。
* Laravelプロジェクトのパスが「c:\xampp\htdocs\axiz_fw」の場合
  ```powershell
  cd c:\xampp\htdocs\axiz_fw
  ```

---

### コマンドの紹介

Laravelでは「php artisan」から始まるコマンドで様々な操作をします。

* Laravelのバージョン確認
  * 対象のプロジェクトのLaravelのバージョンを確認できます。
    ```powershell
    php artisan --version
    ```
* コマンドの一覧確認
  * すべてを使うわけではありませんが、コマンド操作に慣れたらどんなコマンドがあるのか一通り目を通しておくといいでしょう。
  ```powershell
  php artisan list
  ```

* Webサーバーの起動
  * ポート番号8000でWebサーバーが起動します。
  ```powershell
  php artisan serve
  ```
  * http://localhost:8000 にアクセスし、Laravelのトップページにアクセスできることを確認してください。
  * サーバーを停止するには「Ctrl + C」を押します。
  * ポート番号を変更したい場合には「--port」オプションで指定します。
  ```powershell
  php artisan serve --port=8080
  ```

---

今回はDockerを使用して環境を構築しているため、Docker DesktopでWebサーバーやMySQLサーバーを一度に起動することができます。

---

## 既存のプロジェクトのインポート
1. githubのリポジトリから対象のプロジェクトをクローンする。  
   ```bash
   # プロジェクトをクローンするフォルダに移動
   cd C:\xampp\htdocs
   # クローン
   git clone GithubのリポジトリURL
   ```
2. クローンしたプロジェクト内に入る(ここではプロジェクト名をsample-projectにします)
   ```bash
   cd sample-project
   ```
3. composerインストール
   ```bash 
   composer install
   ```
   プロジェクト内にvendorフォルダができていればOK
4. 「.env」というフォルダを作成し、「.env.example」の内容をコピーする。 
5. Ubuntuでプロジェクトディレクトリに入り、sailコマンド実行（少し時間がかかります）
   ```bash
   # ディレクトリに移動
   cd /mnt/c/xampp/htdocs/sample-project
   # sail実行
   vendor/bin/sail up -d
   ```
6. プロジェクトキーの生成
   ```bash
   vendor/bin/sail artisan key:generate
   ```