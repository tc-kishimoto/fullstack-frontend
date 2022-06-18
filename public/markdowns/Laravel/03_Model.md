# Model

## マイグレーション - テーブルの操作

Laravelでは、SQLを直接実⾏することなく、PHP（Laravel）のプログラムからテーブルを作成したり、テーブルのレコードを作成することが可能になっています。  
まずはテーブルの作成から⾏っていきます。  
DBへの接続ができる前提で進めていくので、あらかじめDBの作成と、「.env」ファイルのDB接続設定を完了させておいてください。

---

### 事前準備
 テーブルを作成するにはマイグレーションという機能を使⽤します。  
 「database/migrations」フォルダを確認してください。  
 ⽇付から始まるphpファイルがあらかじめいくつか⽤意されていますが、それらは不要になるため削除しておいてください。

---

 ### マイグレーションファイルの作成
 ここでは「students」というテーブルを作成します。  
 まず、コマンドライン上から以下のコマンドを実行します。
 ```powershell
 php artisan make:model Student --migration
 ```

 エラーが出なければapp配下にモデルクラスが、database/migrations配下にマイグレーションファイルが作成されます。（2つのファイルが作成される）  
 モデルクラスはプログラムからDBを操作するのに、マイグレーションファイルはテーブルを定義するのにそれぞれ使用します。

 なお、テーブル名はモデルの名前から自動的に複数形になる（末尾にsがつく）ので、「students」というテーブルを作成する場合はモデル名は「Student」になります。

 ---

### マイグレーションファイルの確認

マイグレーションファイルの中⾝を確認します。  
「database/migrations/<作成⽇時>_create_students_table.php」となっているファイルを確認します。  
upメソッドはテーブル作成時に呼ばれるメソッド、downメソッドはテーブル削除時に呼ばれるメソッドになります。  
upメソッドの中でidとtimestampがあらかじめ設定されていますが、この設定により、idというカラムが⾃動で主キーとして設定され、作成⽇時(created_at)と更新⽇時（updated_at）というカラムが⾃動で作成されるようになります。

---

### マイグレーションファイルの修正
マイグレーションファイルの中⾝を修正します。  
ここはいわゆるテーブル定義を⾏う部分だと考えてください。  
テーブル「name」と「score」のカラムを追加します。  
＜作成日付_create_students_table.php＞

```php
public function up()
{
    Schema::create('students', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('name');
        $table->integer('score');
        $table->timestamps();
    });
}
```

---

カラムをvarchar型にしたい場合にはstringメソッドを、integer型にしたい場合はintegerメソッドを使用します。  
カラムに対してデータ型や制約などをphpのメソッドを通して定義します。  
細かい設定⽅法は公式サイトを参照してください。  
[Laravelマイグレーション](https://readouble.com/laravel/8.x/ja/migrations.html)

---

### マイグレーションファイルの実行
ファイルの修正ができたら、migrateコマンドを実⾏してテーブルを作成します。    
以下のコマンドを実⾏し、成功したらDB環境に接続してテーブルが作成されていることを確認してください。
```powershell
php artisan migrate
```

なお、テーブル定義を修正して再度作成し直したい場合は、以下のコマンドで取り消すことができます。
```powershell
php artisan migrate:rollback
```
その他、コマンドの細かいオプションなどは公式サイトを参照ください。

---

## コマンドライン上からのPHPの実行
PHPではコマンドライン上からプログラムを実行することも可能です。  
Laravelの場合、以下のコマンドを実行することでコマンドライン上からプログラムを実行することが可能になります。  
```powershell
php artisan tinker
```

コマンド実行後、インタラクティブ(対話)モードになり、そのままPHPプログラムを実行できます。

---

例えば、echoを実行するとそのままコマンドライン上に結果が出力されます。
```powershell
>>> echo "Hello";
Hello
```

インタラクティブモードを終了するには「Ctrl + C」を押下します。

---

## Model - データの操作
### Modelによるデータ操作
`make:model`コマンドを実行したときに、app配下にStudentクラス(モデル)が作成されました。  
Laravelのモデルクラスは、DAO、Entity両方の役割を持っており、モデルクラスを使用することで簡単にデータを操作することができます。  
コマンドからモデルクラスを使ってデータを作成してみます。  

---

Modelを使ったデータの操作方法を解説します。  
まずはtinkerコマンドでPHPのプログラムが実行できるようにします。
```powershell
php artisan tinker
```

まずはモデルのインスタンスを作成します。  
モデルの名前空間はApp\Modelsになるので、App\Models\クラス名で指定します。(名前空間はバージョンによって異なる場合があります。)  
入力後にEnterを押下してエラーが出なければ$studentにインスタンスが格納されます。  
```powershell
>>> use App\Models\Student;
>>> $student = new Student;
```

---

カラム名をプロパティとして使用できるので、プロパティにレコードとして登録した値をセットします。  
レコードにデータを登録するにはsave()メソッドを使用します。  
save()メソッドの結果がtrueになればレコードが挿入されているはずです。
```powershell
>>> $student->name = 'Alice';
=> "Alice" #実行結果
>>> $student->score = 80;
=> 80 #実⾏結果
>>> $student->save();
=> true #実⾏結果 
```

---

レコードの取得なら、以下のようなコードでもできます。
```powershell
>>> use App\Models\Student;
    # 全てのレコードを取得
>>> Student::all();
    # IDが1のレコードを取得
>>> Student::find(1);
    # nameカラムが'Alice'のレコードを取得
>>> Student::where('name', '=', 'Alice')->get();
```

---

### データの確認

実際のテーブルにもデータが登録されているか、使用しているDBに接続してテーブルの中身を確認してみてください。
```powershell
> select * from students;
+----+-------+-------+-----------------------+----------------------+
| id | name | score | created_at | updated_at |
+----+-------+-------+-----------------------+----------------------+
| 1 | Alice | 80 | 2021-02-10 15:31:04 | 2021-02-10 15:31:04 |
+----+-------+-------+-----------------------+----------------------+
1 row in set (0.00 sec)
```

---

### Modelによるデータ操作(1件)
続いてはデータの取得をします。  findメソッドで引数にidを指定することでレコードを取得することができます。

```powershell
>>> $student->find(1);
=> App\Student {#3938
id: 1,
name: "Alice",
score: 80,
created_at: "2021-02-10 15:31:04",
updated_at: "2021-02-10 15:31:04",
}
```

### Modelによるデータ操作(全件)
データを全件取得するには、all()メソッドを使用します。
```powershell
>>> $student->all();
=> Illuminate\Database\Eloquent\Collection
{#4043
    all: [
        App\Student {#4186
        id: 1,
        name: "Alice",
        score: 80,
        created_at: "2021-02-10 15:31:04",
        updated_at: "2021-02-10 15:31:04",
        },
    ],
}
```

このように、モデルクラスのメソッドによって柔軟にデータの更新や取得をすることができます。  
LaravelのモデルはEloquentモデルと呼ばれます。  
Eloquentモデルについての詳しい情報は公式サイトを参照ください。

[Laravel Eloquent](https://readouble.com/laravel/8.x/ja/eloquent.html)

---

## クエリビルダによるDBアクセス
Eloquentモデル以外のDBアクセス⽅法として、クエリビルダという⼿法を⽤いる⽅法もあります。  
クエリビルダを⽤いると、直接SQL⽂を書かずとも、PHPのメソッドを繋げて書くことで⾼度なSQL⽂を実現することができます。  
[Laravel クエリビルダ](https://readouble.com/laravel/8.x/ja/queries.html)

---

クエリビルダではDBというクラスを用いてDBアクセスの処理を定義します。

```powershell
>>> use Illuminate\Support\Facades\DB;
>>> DB::table('students')->get();
Illuminate\Support\Collection {#3267
    all: [
        {#3264
        +"id": 1,
        +"name": "Alice",
        +"score": 80,
        +"created_at": "2021-02-10 15:31:04",
        +"updated_at": "2021-02-10 15:31:04",
        },
    ],
}
```

---

データのインサートは以下のようにします。  
2次元配列を指定することで複数のレコードをまとめてインサートすることも可能です。  
```powershell
>>> DB::table('students')->insert(
['name' => 'John', 'score' => 85]);
=> true
```

---

データのインサートは以下のようにします。  
2次元配列を指定することで複数のレコードをまとめてインサートすることも可能です。
```powershell
>>> DB::table('students')->insert(
['name' => 'John', 'score' => 85]);
=> true
```

---

直接SQL⽂を⽂字列で書いて実⾏することもできます。その場合はselectメソッドを使⽤します。  
パラメータを指定する場合には第⼆引数で指定します。
```powershell
>>> DB::select("select * from students where id = 1");
=> [
        {#3293
        +"id": 1,
        +"name": "Alice",
        +"score": 80,
        +"created_at": "2021-02-10 15:31:04",
        +"updated_at": "2021-02-10 15:31:04",
        },
    ]
```

---

### DBアクセスまとめ
LaravelではDBアクセスを実現する方法として、  
1. Eloquentモデルを使う
2. クエリビルダを使う
3. 直接SQL文を記述する

の3つの方法があります。

---

## シーディング - データの登録(初期値の設定)
先ほどはModelを操作することでデータを操作しましたが、シーディングという機能を使うことで効率よくデータを作成したり、データを初期化することができます。  
ここからはシーディングを使ったデータ作成⽅法について⾒て⾏きます。

---

### シーダクラスの作成
以下のコマンドを実行し、Studentsテーブルに対するシードクラスを作成します。
```powershell
php artisan make:seed StudentsTableSeeder
```

実行に成功すると、「database/seeds」フォルダの中に対象のクラスが作成されます。

---

### シーダクラスの修正
StudentsTableSeederクラスのrunメソッドを以下のように修正します。  
ここではクエリビルダを使⽤してデータをインサートする処理を追加し
ます。  
＜StudentsTableSeede.php＞
```php
uses Illuminate\Support\Facadas\DB;

// 中略

public function run()
{
    DB::table('students')->insert([
        ['name' => 'Alice', 'score' => 80],
        ['name' => 'Bob', 'score' => 70] 
    ]);
}
```

---

database/seedsフォルダにあらかじめ存在しているDatabaseSeederクラスのrunメソッドで、StudentsTableSeederクラスが実⾏されるように以下のコードを追加します。  
＜DatabaseSeeder.php＞
```php
public function run()
{
    $this.call(StudentsTableSeeder::class);
}
```

---

### シーダクラスの実行
シーダクラスを作成した後は、オートローダーを再⽣成するために以下のコマンドを実⾏します。
```powershell
composer dump-autoload
```
シーダを実⾏するには以下のコマンドを実⾏します。
```powershell
php artisan db:seed
```
実⾏に成功したら、DBに接続してデータが登録されているかどうか確認
してください。

---

シーダの実⾏では、特定のクラスのみ実⾏したり、テーブルをドロップしてマイグレーションする際に初期値としてシーダを実⾏したりすることができます。  
詳しくは公式サイトを参照してください。
[Laravel シーディング](https://readouble.com/laravel/8.x/ja/seeding.html)
