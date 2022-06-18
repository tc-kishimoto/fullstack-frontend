# Git

---

## 概要

* バージョン管理について学びます
* Gitの概要について学びます
* Gitの操作方法について学びます
* Gitに関連するツールやサービスについて学びます

---

# Gitとは

---

## Gitとは

Git（ギット）は現在最も普及しているバージョン管理システムの一つです。
Gitを使うことで、ファイルの変更履歴を簡単に管理することができ、結果的に開発効率の向上が期待できます。
Gitについて詳しく知る前に、まずはバージョン管理システムについて知っておきましょう。

---

## バージョン管理システム

バージョン管理システムとは、ファイルの修正履歴を管理するためのシステムです。
ファイルに対し、「誰が」「いつ」「何のために」ファイルを修正したのかを履歴として残すことができます。
修正履歴が管理できるようになると、システムに問題が発生した時に調査が容易になったり、簡単な操作で以前の状態に戻すことができるようになります。
結果として、バージョン管理システムを導入することで開発効率の向上が期待できます。

---

### リポジトリ

バージョン管理システムの中で、ファイルの変更履歴を保管しているデータベースのことをリポジトリと呼びます。
リポジトリは日本語では「貯蔵庫」とも呼ばれます。

---

### 集中管理型と分散管理型

バージョン管理システムは多くの種類がありますが、リポジトリの性質から大きく2つに分けることができます。
1つのリポジトリでバージョン管理を行う集中管理型と、作業者それぞれがリポジトリを保持する分散管理型に分かれます。
主なツールとしては以下のようなものがあります。

* 集中管理型のバージョン管理システム
  * CVS
  * SVN（Subversion）

* 分散管理型のバージョン管理システム
  * Git
  * Mercurial

---

### 分散管理型バージョンシステム

集中管理型のバージョン管理システムは、リポジトリが存在するサーバーとネットワークがつながっている状態でなければバージョン管理ができません。
一方、分散管理型のバージョン管理は作業者が各々のリポジトリを保持するため、ネットワークにつながっていなくてもバージョン管理が可能です。
現在、バージョン管理の主流は分散管理型で、その中でもGitが最も主流となっています。

分散管理型のバージョンシステムでは、自分のPCに存在するリポジトリのことを**ローカルリポジトリ**、誰かと共有することを目的としたサーバー上にあるリポジトリを**リモートリポジトリ**と呼びます。

---

### Git

Gitは現在最も主流となっているバージョン管理システムの1つです。
元々はLinux OSのソースコードを管理する目的で開発されました。
Linuxの開発者、リーナス・トーバルズが作成したバージョン管理システムです。

Gitに似た用語で「GitHub」というサービスがあります。
GitHubはGitを使ったサービスですが、GitとGitHubは別物なので、混同しないように注意してください。

---

# Gitの導入

---

## インストール

Gitの公式サイトからダウンロード方法を確認してダウンロードを行ってください。

[公式サイト](https://git-scm.com/downloads)

### Windowsの場合

インストーラをダウンロードし、インストーラの指示に従ってインストールしてください。
インストールが完了したら「Git Bash」というツールが使えるようになっていることを確認してください。

### Mac、Linuxの場合

サイトの指示に従って適当にインストールしてください。
インストール後にターミナルなどのコマンドラインからgitコマンドが使えることを確認してください。

---

## 初期設定

### emailとnameの設定

Gitの操作を行うには、Gitの中でユーザー名とメールアドレスを設定しておく必要があります。（コミットの操作を行う場合などに必要になります。）
Windowsの場合はスタートメニューから「Git Bash」を起動します。
Macの場合はターミナルなどを起動します。

---

ツール起動後に下記コマンドから設定を行ってください。

ユーザー名の設定

```bash
git config --global  user.name "自身の名前"
```

メールアドレスの設定

```bash
git config --global  user.email "自身メールアドレス"
```

例

```bash
git config --global  user.name "yamada"
git config --global  user.email "yamada@xxx.com"
```

---

### 設定内容の確認

設定が終わったら、正しく設定されているかを確認します。
下記のコマンドから、設定内容を確認できます。

```bash
git config --list
```

設定の一覧が表示されます。
その中でuser.nameとuser.emailが設定した値になっているかを確認してください。

```text
user.name=yamada
user.email=yamada@xxx.com
```

---

# 基本用語

---

Gitの操作方法の前に、バージョン管理システムやGitで使用される基本的な用語をいくつか解説します。

### リポジトリ

ファイルの変更履歴を格納するためのデータベースのことです。
Gitの場合、リポジトリの実態は「.git」という名前の隠しフォルダです。
このフォルダの中に履歴情報が格納されます。

### 作業ディレクトリ（ワークツリー）

作業するフォルダのこと。
ここではディレクトリ = フォルダのことだと思って問題ありません。
プログラム開発でGitを使用する場合は、ソースコードが配置されたフォルダが作業ディレクトリになります。

### インデックス（ステージングエリア）

バージョン管理対象のファイルを格納する場所のこと。
Gitではファイルの変更履歴はすぐにリポジトリに格納されるわけではなく、一度インデックスと呼ばれる領域に格納された後にリポジトリに格納される仕組みになっています。

---

### コミット

ステージングエリアにあるファイルの変更履歴をリポジトリに格納すること。
Gitではコミット時にメッセージを記述することが必須となっています。

### コミットメッセージ

Gitではコミットの際に必ずメッセージを残す必要があり、このメッセージのことをコミットメッセージと呼びます。
コミットメッセージには、そのコミットでどんな修正が行われたのかを第三者でも分かる形でコメントを書きます。

---

# Git BashによるGit操作

---

### Git Bash

Git Bashは、WindowsでGitをインストールした際に導入されるCUIのGit操作ツールです。

### GUI

GUIとは、 Graphical User Interface（グラフィカル・ユーザ・インターフェース）の略で、マウスなどで直感的に操作できるようなUIのことです。
マウスなどで直感的に操作できるツールをGUIツールと呼びます。

### CUI

CUIは、 Character User Interfaceの略で、キーボード操作（コマンドの入力）だけで操作するUIのことです。
CUIで操作するツールのことをCUIツールと呼びます。
Gitは単体でインストールした場合、CUIの操作がメインになります。

---

## コマンド

※Git Bashを起動して操作しながら動作を確認してください。

**カレントディレクトリの確認**

```bash
pwd
```

結果
※結果は環境によって異なります。

```text
/c/Users/admin
```

コマンドから操作を行う場合、今作業しているディレクトリ（フォルダ）がどこなのかを意識する必要があります。
pwdコマンドでは、現在の作業ディレクトリ（カレントディレクトリ）を確認できます。
pwdはGit独自のコマンドではなく、Linuxの一般的なコマンドになります。

---

**作業ディレクトリの移動**

```bash
cd 作業ディレクトリのパス
```

こちらもGitのコマンドではありません。
コマンドを使う場合は現在の位置（カレントディレクトリ）を対象となるフォルダに移動させる必要があります。
Gitでバージョン管理をしている作業ディレクトリにはcdコマンドを使って移動します。

例

```bash
cd Document # カレントディレクトリ配下のDocumentに移動
cd ../ # 一つ上の階層のディレクトリに移動
cd /c/Users/admin/Document/Web_Sample/ # Webサンプルフォルダに移動
```

※HTML、CSSの単元で作業していたフォルダにcdコマンドで移動を行ってください。

---

**カレントディレクトリのファイル一覧の確認**

```bash
ls
```

結果
※環境によって異なります。

```text
css/  images/  index.html
```

lsコマンドで、カレントディレクトリにあるファイルの一覧を確認できます。

---

**リポジトリの初期化**

```bash
git init
```

カレントディレクトリに対してリポジトリ（.git）フォルダが作成されます。
エクスプローラで確認し、以下のようなフォルダができていれば成功です。

![picture 1](/images/66ffd83a9e821979bf5916d50dab6aa499c7428a08a5e6afee283c9087600ef4.png)  

※表示されない場合は、エクスプローラの表示設定で「隠しファイル」にチェックが入っているか確認して下さい。

---

**現状の確認**

```bash
git status
```

結果

```text
No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)
```

内容を変更したがステージングエリアに追加されていないファイル、ステージングエリアに追加したがコミットされてないファイル、など、作業ディレクトリ内のファイルがGitから見てどのような状態かを確認できます。

上記の結果は、まだコミットもステージングエリアへの追加もしていない状態の場合の例です。

---

**ステージングエリアへの追加**

```bash
git add ファイル名 
```

指定したファイルをステージングエリアに追加し、バージョン管理対象にします。
ファイル名の箇所で「.」を指定すると、作業フォルダにあるファイルをまとめてステージングエリアに追加することが可能です。
ワイルドカードを指定して特定の拡張子のファイルのみ対象にするなどもできます。

例

```bash
git add index.html # index.htmlを追加
git add . # カレントディレクトリの全てのファイルを追加
```

---

ステージングエリアへの追加が完了したら、再度statusコマンドで状態を確認してください。

```bash
git status
```

結果

```text
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html
```

コミットはされていないが、index.htmlがステージングエリアへ追加されていること確認できます。

---

**コミット**

```bash
git commit –m コミットメッセージ
```

ステージングエリアにあるファイルの変更履歴をリポジトリに格納するためのコマンド。
Gitではコミット時にメッセージの入力が必須なので、-mのオプションをつけてメッセージを書きます。

例

```bash
git commit -m "first commit"
```

結果

```text
[master (root-commit) 09da048] first commit
 1 file changed, 108 insertions(+)
 create mode 100644 index.html
```

Gitではコミット毎にIDが割り振られる仕組みになっています。ここでは「09da048」がコミットIDになります。

---

Gitでは他にもまだまだできることがありますが、まずはコミットまでの流れをつかむようにしてください。
ローカルでGitを使って作業する場合の流れは以下になります。

1. 作業ディレクトリを用意
2. リポジトリの作成（git init）
3. 作業を行う
4. ステージングエリアへの追加（git add）
5. コミット（git commit）

---

図で表すと以下のようなイメージです。

![git1](/images/git1.drawio.png)

---

## VS CodeによるGit操作

テキストエディタでVS Codeを使用している場合、VS Code上からもGitを操作することが可能です。

メニューバーの下図のアイコンのメニューからGit関連の操作が可能です。

![picture 1](/images/eb4b5780e80314164f3f3b3b9cf8a5349513f45bc93c888ccc19b17c6800684f.png)  

---

Gitのアイコンを選択するとサイドバーにはバージョン管理対象で内容が変更されたファイルの一覧が表示されます。

![picture 2](/images/ce61ebd2a56c65304c47dc24163b0f922638603625de83273538a2729f4f2009.png)  

---

ファイルを選択してプラスボタンをクリックすると対象のファイルをステージングエリアに移動できます。

![picture 3](/images/98654e9b648b255d5e3473517d768df1badbaefe19e86c7afb7bbfe17f12ca99.png)  

↓

![picture 4](/images/1b22db3d0ac6e526791f41151138b10fb7dde8e07106e0c7847aa0019351498e.png)  

---

メッセージ入力欄にメッセージを入力してチェックマークをクリックすることで、ステージングエリアのファイルをコミットできます。

![picture 5](/images/08b6e5de67b63eb13bd5b861aa6147b970d611cf768346b32e7c21ed7f648545.png)  

このように、簡単な操作であればマウス操作で行うことができます。
また、拡張機能を追加することでより便利に機能を使うことが可能です。
興味があれば自分で調べながら色々な拡張機能を自由に試してください。

また、コマンド操作を行う場合は、ターミナルからGit Bashを操作することも可能です。

---

VS Codeを使ってコミットまでの流れを確認してください。

1. HTML・CSSの作業ディレクトリを開く
2. HTML・CSSのファイルの中身を適当に変更する
3. 編集したファイルをステージングエリアに追加する
4. コミットを行う

---

## 履歴を残す目的

Gitを使い始めたことは、ファイルを編集しながら定期的にコミットの作業を行うのは面倒に感じるかもしれません。
しかし、問題が発生した時（編集している途中でプログラムが動作しなくなるなど）、定期的にコミットを残しておくことで前回コミットされた分からの差分を確認できます。
また前回のコミットの状態に簡単に戻すこともできます。

つまり、問題発生時の調査が楽になったり、ファイルを前の状態に戻すことができるようにしておくことで、結果的に開発スピードを上げることが可能になります。

---

## その他のGUIツール

Gitでは他に様々なGUIツールが用意されています。
実際の開発現場でよく利用されているのは

* SourceTree
* GitHub Desktop
* TortoiseGit（Windowsのみ）

あたりです。ツールによって見た目や操作方法が異なります。
プロジェクトによって、あるいは人によって使用するツールが異なっている場合がありますが、基本的にできることはほとんど同じです。（Gitの操作はGit Bashで全て行うことが可能です。その中で主要な操作をマウス操作できるようにしたものがGUIツールです。）

以下のサイトからGUIツールをダウンロード可能なので、使用してみたいツールがあれば導入して自由に活用してください。

[Git GUI Client](https://git-scm.com/downloads/guis
)

---

# ブランチ

---

## ブランチ

Gitにはブランチと呼ばれる機能があります。
ブランチを有効に活用することで、より効率よく、より柔軟な開発を行うことが可能になります。

---

### コミット履歴

Gitではコミットの履歴が1本の線としてつながっています。

![git2](/images/git2.png)

---

### ブランチのイメージ

ブランチの機能を使うと、以下の図のようにコミットの履歴を分岐させることができます。

![git3](/images/git3.png)

ブランチを分けると、別ブランチの影響を受けずに作業を進めることができます。
新しい機能を試しに追加したい場合、現在のブランチに影響を与えずにバグ修正を行いたい場合、チームでお互いに影響を与えず開発を行う場合などに役に立ちます。

---

### マージ

ブランチを分けて作業を進めた場合、作業がひと段落した段階で元のブランチに内容を反映させる必要があります。
この作業をマージ（merge）と呼びます。

![git4](/images/git4.png)

そのブランチの作業が不要になった場合は、マージせずにそのブランチをそのまま削除することも可能です。

マージする際、同じファイルが既に修正されていた場合、コンフリクト（競合）という現象が起きます。
競合が発生した場合、競合が発生したファイルを手動で修正して再度更新する必要があります。

---

ブランチは一人で作業を行っている分には、使用するメリットは感じにくいｋです。
しかし、現場でGitを使ってチームによる開発を行う場合はほぼ必須で使用する機能になります。

ブランチの運用方法についてはいくつかのパターンがあります。

興味がある方はGitHubフロー、Gitフローなどで検索して学習してみてください。

---

# ホスティングサービス

---

Gitをインストールすると自分のPC内でファイルのバージョン管理をすることが可能です。
しかし、それだけではチームで開発する場合にプログラムや資料を共有することはできません。
複数のPCやサーバーでリポジトリを共有したい場合には、ネットワーク上でGitのリポジトリが必要になります。

ネットワーク上にあるリポジトリのことをリモートリポジトリと呼びます。

自分でリモートリポジトリを構築することも可能ですが、Gitにはアカウントの登録だけでクラウド上でGitのサービスを利用することができるホスティングサービスと呼ばれるものがあります。

---

Gitのホスティングサービスでは以下のようなものがあります。

* GitHub
* BitBucket
* GitLab

複数人での開発を行う場合、これらのサービスを使ってリモートリポジトリを作成するのが一般的です。
アカウントの作成はどれも無料で行うことができます。
それぞれのサービスで利用できる機能などが異なり、無料アカウントでの制限事項等が異なります。

---

# GitHub

---

GitHubは最もメジャーなGitのホスティングサービスの１つです。
Gitと間違えられることがありますが、GitとGitHubは別物ですので注意してください。

* Git：バージョン管理システム
* GitHub：Gitのホスティングサービス

---

### アカウントの作成

研修では今後演習や課題の提出でGitHubを使用します。
事前にGitHubのサイトの「サインアップ」からアカウントを作成してください。

[GitHub](https://github.co.jp/)

※既に個人でGitHubアカウントを作成済みの場合はそのアカウントでも構いません。
研修用のメールアドレスで新しく作成しても構いません。

---

## 基本用語

リモートリポジトリを使用するうえで必要になる用語を解説します。

### ローカルリポジトリ

自分のPC内に存在するリポジトリのこと。

### リモートリポジトリ

サーバー上(ここではGitHub上)にあるリポジトリのこと（厳密には離れたところにあるリポジトリをさすが、通常はサーバー上に構築するか、ホスティングサービスを利用します）。

自分のPC内でのみバージョン管理を行う場合、ローカルリポジトリしか使用しませんが、GitHubを使用する場合、自分のPC内のリポジトリとGitHub上のリポジトリが存在するため、ローカルリポジトリとリモートリポジトリとして呼び分けます。

---

### プライベートリポジトリとパブリックリポジトリ

GitHubではリポジトリを作成する際、プライベートリポジトリとパブリックリポジトリを選ぶことができます。

**プライベートリポジトリ**

許可されたアカウントしか見ることのできないリポジトリ。

**パブリックリポジトリ**

URLが分かれば誰でも見ることができるリポジトリ。

通常、業務での開発ではプライベートリポジトリを使用し、開発チームメンバーのみアクセス可能にします。
個人での開発の場合は必要に応じてプライベートとパブリックを使い分けます。

※昔はGitHubでは無料アカウントでプライベートリポジトリの作成は不可でした。
Microsoftに買収された後は無料アカウントでもプライベートリポジトリが作成可能になりました。

---

### クローン

リモートリポジトリをダウンロードして、ローカルリポジトリを作成すること。

### プッシュ

ローカルリポジトリの変更履歴をリモートリポジトリに反映させること。

### プル

リモートリポジトリの変更履歴をローカルリポジトリに反映させること。

### フォーク

他人のアカウントのリモートリポジトリを自分のアカウントのリモートリポジトリにコピーすること。

---

### プルリクエスト

ブランチのマージを依頼すること。
チームで開発を行う場合、機能単位でブランチを分けて開発を行うことが一般的ですが、ブランチをマージする時、プルリクエストを行うことで、変更内容を他のメンバーにレビューしてもらうことができる。

---

## コマンドによるリモートリポジトリ操作

ここではコマンドから操作する場合のリモートリポジトリに関するものをいくつか紹介します。

**クローン**

```bash
git clone リモートリポジトリのURL
```

リモートリポジトリのURLはGitHubのリポジトリのページの「Code」から確認できます。

---

**リモートリポジトリの追加**

クローンをせずに、ローカルリポジトリをリモートリポジトリに反映したい場合、リモートの設定を行う必要があります。

```bash
git remote add origin リモートリポジトリのURL
```

反映できたかの確認

```bash
git remote -v
```

---

**プッシュ**

```bash
git push リモート名 ブランチ名
```

リモートの設定はクローンした際に設定されるか、git remoteコマンドを使って手動で設定します。
デフォルトではリモート名はoriginになります。
ブランチ名では、リモートリポジトリのブランチを指定します。
指定したブランチに対して、ローカルのリポジトリの内容を反映させます。

---

**プル**

```bash
git pullリモート名 ブランチ名
```

指定したブランチをリモートリポジトリから現在のローカルリポジトリに取り込みます。

---

説明した用語を図で表すと以下のようになります。

![git5](/images/git5.png)

---

## GitHub Pages

GitHubにはGitHub Pagesと呼ばれる機能があり、静的Webサイトを簡単にインターネットに公開できます。
ただし、GitHub Pagesを利用するにはパブリックリポジトリである必要があります。
（有料プランならプライベートリポジトリでも利用可能）
また、動的Webサイト（PHP、Javaなどのサーバーサイドの言語が必要なWebサイト。Webアプリケーション）

---

## その他の用語

### .gitignore

バージョン管理対象外のファイルを記述するための設定ファイル。
プログラム開発で必要となるファイルには、バージョン管理の対象としたくないファイルも存在します（例えば、ソースコードをコンパイルした際に出来上がる中間ファイルや、環境ごとに設定が異なる設定ファイルなど）。
.gitignoreというファイルにバージョン管理対象外にしたいファイルやフォルダを書いておくと、Gitに認識されなくなります。
結果として謝ってコミットするミスなどを減らすことができます。

---

その他、よく使われる用語に以下のようなものがあります。

* ヘッド（HEAD）
* リセット
* リバート
* リベース
* チェリーピック
* スタッシュ
* チェックアウト
* フェッチ

などなど。
これらの用語の詳細についてはここでは割愛します。
さらに深く知りたい方は他のサイトなどを参考に学習してください。

[【イラストで覚える】初心者のためのGitとGitHub用語集](https://zukulog098r.com/git/)

[サル先生のGit入門](https://backlog.com/ja/git-tutorial/)

---

## 講義動画

[バージョン管理の概要](https://youtu.be/SwEUKqaCj4o)

[Gitの導入](https://youtu.be/flrhkAE2e-M)