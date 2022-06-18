# Git（コマンドリファレンス）

---

## 概要
Git Bashなどのコマンドラインツールを使ってGit操作する場合のコマンドの紹介。
cd, ls, viなどのLinuxの基本的なコマンドをは使用できるようにしておいてください。

### configの確認

実態はホームディレクトリの.gitconfig。

```bash
git config -l
# または
git config --list
```

### ユーザー名・メールアドレスの設定

コミットする際にユーザー名とメールアドレスが必要になるので、先に設定しておくと便利。

```bash
# ユーザー名の設定
git config --global  user.name "自身の名前"
# メールアドレスの設定
git config --global  user.email "自身メールアドレス"

# 例
git config --global  user.name "yamada"
git config --global  user.email "yamada@xxx.com"
```

リポジトリ単位で設定したい場合はglobalをlocalにして設定する。

```bash
# ユーザー名の設定
git config --local  user.name "自身の名前"
# メールアドレスの設定
git config --local  user.email "自身メールアドレス"
```

### デフォルトのブランチの設定

```bash
git config --global init.defaultBranch <name>
```

以前はデフォルトのブランチはmasterだったが、現在はmainがデフォルトになっている。
masterがデフォルトになっている場合は、mainに変更しておくと良い。
（GitHubはmainをデフォルトのリポジトリにすると発表している。）

### エディタの設定の変更

Gitではコミットする際にコミットメッセージが必須。
コミットの際にメッセージのオプションを指定しなかった場合は設定されているデフォルトのエディタが起動する。
Git Bashを使った場合デフォルトではviが起動。
変更したい場合には以下のコマンドから変更する。

```bash
git config --global core.editor "エディタのパス"
```

### エイリアスの設定

よく使用するコマンドにはエイリアスをつけることで短いコマンドで実行できるようになる

```bash
# stというコマンドでstatusと同じコマンドになる
git config --global alias.st status
# git l というコマンドだけで、git log --oneline --graph と同じ意味になる
git config --global alias.l log --oneline --graph
```

### リポジトリの初期化

カレントディレクトリに.gitディレクトリが作成される。

```bash
# リポジトリ初期化
git init
# ブランチの切り替え
git branch -m main
```

デフォルトのブランチがmasterになっている場合はmainに切り替えておく。

### クローン

リモートリポジトリをダウンロードしてローカルにリポジトリと作業ディレクトリが作成される。

```bash
git clone リポジトリURL
```

### ステータスの確認

現在の状態を確認。

```bash
git status
```

作業ディレクトリが空の場合は以下の内容になる。

```text
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

ファイルを追加すると以下のようになる。

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	test.txt

nothing added to commit but untracked files present (use "git add" to track)
```

ステージングエリアに追加すると以下のようになる。

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   test.txt
```

コミットすると以下のようになる

```text
On branch main
nothing to commit, working tree clean
```

### ステージングエリアへの追加

Gitでは作業ディレクトリで修正したファイルは一度ステージングエリア（インデックス）に追加することでコミットができるようになる仕組みになっている。

```bash
# ファイルを指定して追加
git add ファイル名
# 全てのファイルを追加
git add *
git add -A
git add .
git add --all
# 拡張子が.txtのファイルを全て追加
git add *.txt
# 変更したファイルを全て追加
git add -u
```

### git addを取り消す

```bash
# リポジトリ初期化後
# 全てのファイルを取り消し
git rm --cached -r .
# 特定のファイルのみ取り消し
git rm --cached -r ファイル名

# コミット後
# 全てのファイルを取り消し
git reset HEAD
# 特定のファイルのみ取り消し
git reset HEAD ファイル名
```

### コミット

ステージングエリアの内容をローカルリポジトリに反映させる。

```bash
# メッセージのオプションをつけなかった場合はエディタが立ち上がり、メッセージを登録する
git commit
# コメントのオプションをつける場合は-mをつける
git commit -m "コミットメッセージ"
```

成功すると以下のようなメッセージが表示される。

```text
[main 1c47f2a] commit2
 2 files changed, 1 insertion(+)
 create mode 100644 test2.txt
```

コミット対象がない状態で強制的にコミットする

```bash
# コミットの対象がなくてもコミットすることができる。
git commit --allow-empty
```

addを省略してコミット

```bash
# ステージングエリアに移動していなくても、変更したファイルをコミットすることができる。
# ただし、新規に追加したファイルには行えない。
git commit -a
```

### ブランチの確認

```bash
git branch
# オプションをつける場合
git branch -l
git branch --list
```

結果

```text
  develop
* main
```

アスタリスク(*)のついているブランチが現在の作業ブランチ。

### ブランチの追加

```bash
git branch ブランチ名
# 例
git brach develop
```

### ブランチ名の変更

現在の作業ブランチのブランチ名を新しいブランチ名に変更する

```bash
git branch -m 新規ブランチ名
```

### ブランチの削除

```bash
# ブランチの削除
git branch -d ブランチ名
```

現在の作業ブランチは削除できないので、現在のブランチを削除したい場合はcheckoutコマンドでブランチを切り替える必要がある。
コミットして、マージ・プッシュなどがされていないブランチは-dオプションでは削除できない。
強制で削除したい場合は-Dを使用する。

```bash
# ブランチの強制削除
git branch -D ブランチ名
```

### ブランチの切り替え

```bash
# 既存のブランチに切り替える
git checkout ブランチ名
# ブランチを新規に作成して切り替える
git checkout -b 新規ブランチ名
```


