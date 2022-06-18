# Composer

## パッケージ管理ツール

---

## 概要

PHPのパッケージ管理ツールであるComposerについて学びます。

---

## Composerとは

Composer（コンポーザー）とは、PHPにおけるパッケージ管理ツールです。
PHPの標準ライブラリにはないサードパーティ製（第三者企業）のライブラリの導入や、フレームワークの導入などを簡単に行うことができるツールです。
単体テストツールであるPHPUnitや、フレームワークの導入、その他各種ライブラリを使用する際に使用します。

---

## インストール

公式サイトの情報を参考にインストールを行ってください。

https://getcomposer.org/

Windowsの場合はDownloadからComposer-Setup.exeをダウンロードして、インストーラにしたがってインストールしてください。基本デフォルトの設定で問題ありませんが、php.exeのパスが設定されていない場合はphp.exeの指定でチェックを入れる必要があります。

Mac OSの場合はGetting Startedのページを参考にコマンドからインストールしてください。Home brewとかでも可能。

---

## インストール時のエラー

環境によってはインストール時にエラーが出てインストールが失敗する場合があります。
エラーが出た場合はエラーメッセージの内容をよく読み、指示に従って対処してください。

※Xdebugを導入していることでエラーが出ることがあります。
エラーの内容を読んで、php.iniの「zend_extention」をコメントアウトすることでインストールが可能になります。

---

インストールが完了したら、コマンドラインツールから下記のコマンドを実行してください。

```bash
composer -v
```

以下のようにバージョン情報が表示されればインストールは成功しています。

```text
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.2.5 2022-01-21 17:25:52
```

インストールが完了したらコマンドからパッケージを追加することが可能です。
必要に応じてComposerを使ってライブラリやフレームワークをインストールします。

---

## 概要

### composer.json
Composerでは、composer.jsonというファイルを元にライブラリをインストールします。
手動でファイルを作成しても構いませんし、以下のコマンドから作成することも可能です。

```bash
composer init
```

composer.jsonの中身は必要最低限であれば以下の内容を記述します。

composer.json

```json
{ 
  "require": {

  }
}
```

---

### ライブラリのインストール

ライブラリを追加でインストールするには、以下のコマンドから実行します。

```bash
composer require ライブラリ名
```

インストールに成功すれば、composer.jsonの中身にライブラリの表記が追加され、composer.lockというファイルも作成されます。
また、vendorというフォルダが作成され、その中にインストールしたライブラリ関連のファイルが追加されます。
インターネット経由で自動でライブラリをダウンロードするため、インターネット環境に接続されている必要があります。

---

### ライブラリのインストール

composer.jsonの内容からライブラリをインストールする場合は以下のコマンドを使用します。

```bash
composer install
```

リモートリポジトリからプログラムをクローンした場合、通常はvendorフォルダはバージョン管理対象外になっています。
そのため上記のコマンドを実行してcomposer.jsonをもとにライブラリをインストールします。