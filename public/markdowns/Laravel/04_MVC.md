# MVC

## ルーティング - URLマッピング
 Laravelでは、「routes/web.php」で、ルーティング（URLマッピング）を⾏うことができます。  
デフォルトでは中⾝は以下のようになっています。  
これは、サーバーのルートディレクトリにGETでアクセスしたときに、viewは以下のwelcome.blade.phpファイルの内容が表⽰されることを表しています。  
＜web.php＞
```php
Route::get('/', function() {
    return view('welcome');
});
```

---

### ルーティング
web.phpの中⾝を以下のように変更してください。  
変更後、「php artisan serve」コマンド、またはDockerでサーバーを起動し、ブラウザからhttp://localhost:8000/ にアクセスしてください。  
ブラウザに「Hello」の⽂字列が表⽰されればルーティングが反映されてます。  
＜web.php＞
```php
Route::get('/', function() {
    return 'Hello';
});
```

---

 Laravelではこのように「web.php」を使ってルーティング（URLマッピング）をしていきます。  
POSTでのアクセスの場合にpostメソッドを使⽤します。  
第⼀引数にはパスを、⼤に引数には実⾏したい処理を指定します。  
今回の例では無名関数（クロージャ）を使って直接処理を書いていますが、⼀般的には処理はコントローラに書き、web.phpでは使⽤するコントローラを指定します。

### web.phpの注意点
バージョンによって使用しているクラスが「use Illuminate\Routing\Route;」となっていて、それによってルーティングのエラーが発生する場合がある。  
「use Illuminate\Support\Facades\Route;」に変更したら直った。

---

## Controller
ルーティングの説明では、「web.php」の中に直接処理を書きましたが、複雑な処理になる場合、「web.php」ファイルの中⾝が膨⼤になってしまいます。  
通常は、URLアクセスさせれた時の処理はControllerの中に定義し、「web.php」ではURLとControllerのメソッドをマッピングします。  
コントローラを作成し、そこに処理を書くようにします。

---

### Controllerの作成
コントローラーの作成はコマンドからできます。  
ここではStudentControllerという名前で作成します。  
その場合、下記コマンドを実行します。
```powershell
php artisan make:controller StudentController
```

成功すると、「app\Http\Controllers」配下にコントローラーが作成されます。  

---

コントローラーが作成できたら、試しにindex()メソッドを作成します。  
＜StudentController.php＞
```php
class StudentController extends Controller
{
    public function index()
    {
        return 'StudentController';
    }
}
```

---

### web.phpへのマッピングの追加
web.phpにマッピングを追加します。  
下記のコードを追加してください。  
コントローラーの処理を使用する場合、コントローラークラスをuseしてから、第二引数に配列でクラス、メソッドを指定します。  
＜web.php＞
```php
use App\Http\Controller\StudentController;

Route::get('/list', [StudentController::class, 'index']);
```

---

### 処理の確認
Controllerの作成とweb.phpの修正が終わった場合は、サーバーを起動してブラウザからhttp://localhost:8000/list にアクセスしてください。  
コントローラーでreturnに書いた文字列が表示されていればうまくいっています。 

---

### データの表示
コントローラーの中でモデルを使用してデータを取得して表示してみます。  
useでStudentモデルを追加し、引数でインスタンスを受け取るようにします。  
＜StudentController.php＞
```php
use App\Student;

class StudentController extends Controller
{
    public function index(Student $student)
    {
        return $student->all()->toArray();
    }
}
```

---

### データの表示
テーブルに登録されているデータが表示されます。  
＜結果＞
```powershell
[
{"id":1,"name":"Alice","score":80,
"created_at":"2021-02-10 15:31:04",
"updated_at":"2021-02-10 15:31:04"}
]
```

## Request
Webアプリケーションではリクエストを受け取って処理をすることがほとんどです。  
Laravelではパラメータを受け取る⽅法はいくつかありますが、⽅法の⼀つは、Controllerクラスの中でRequestクラスを利⽤する⽅法です。

---

### 検索フォームの追加
Requestを利用するために、一覧画面に検索フォームを追加します。  
＜list.blade.php＞
```php
<form action="list" method="get">
    <input type="text" name="keyword">
    <button>検索</button>
</form>
```

![picture 1](/images/37399ee5abea0d1d6d4c9f80c7e745ef046297e5d17b0bb0ac70a83e39496755.png)  

---

### Controllerの修正
Controllerで、リクエストされたキーワードを受け取って検索する処理を追加します。  
＜StudentController.php＞
```php
class StudentCOntroller extends Controller
{
    public function index(Request $request)
    {
        if(!empty($request->keyword)) {
            $students = Student::where('name', '=',$request->keyword)->get();
        } else {
            $students = Student::all();
        }
        return view('list')->with('students', $students); 
        }
    }
}
```

画面から名前による検索を行い、検索に対応できるようになったことを確認してください。

---

### Controllerの解説
メソッドの引数にRequestクラスを追加すると、そのインスタンスからパラメータを追加できるようになります。  
＜StudentController.php＞
```php
public function index(Request $request)
{
    if(!empty($student->keyword)) {
        $students = Student::where('name'), '=', $request->keyword)->get();
    }else{
        $students = Student::all();
    }
    return view('list')->with('students', $students);
}
```

詳しくは公式サイトを参照。  
[Laravel Request](https://readouble.com/laravel/8.x/ja/requests.html)

---

## 登録処理
新たなレコードを登録できるようにしていきましょう。

### 登録フォームの追加
list.blade.phpに登録用のフォームを追加します。  
＜list.blade.php＞
```php
<form action="regist" method="post">
    {{ csrf_field() }}
    名前：<input type="text" name="name"><br>
    スコア：<input type="number" name="score"><br>
    <button>登録</button>
</form>
```

---

### Controllerの解説
Controllerに登録用のメソッドを追加します。  
＜StudentController.php＞
```php
public function regist(Request $request, Student $student)
{
    $student->name = $request->name;
    $student->score = $request->score;
    $student->save();
    return redirect('list');
}
```

---

### ルーティングの追加
web.phpにルーティングの設定を追加します。  
データの更新を⾏う場合はpost送信になるので、ここではpostメソッドでルーティングを指定します。  
＜web.php＞
```php
use App\Http\Controllers\StudentController;

Route::post('/regist', [StudentController::class, 'regist']);
```

---

### 結果の確認
これで新しくレコードを追加できるようになりました。  
画面から名前をスコア入力し、登録できるかどうか確認してください。
![picture 2](/images/fedae3a97e87750025b911ff4a7252c0733ab79fcc361333068a9a1e30b882ed.png)  


---

### ルートパラメータ
URLからパラメータを取得したい場合にはルートパラメータを定義する必要があります。  
例えば、ユーザ一覧からユーザ一人一人の詳細ページに遷移する時の処理を見ていきましょう。  
＜web.php＞  
```php
// Viewから受とったユーザーIDを{id}で受け取る
Route::get('/detail/{id}', [UserController::class, 'getUserDetail']);
```
＜UserControllerクラス＞
```php
class UserController
{
    public function getUserDetail($id)
    {
        // DBから$idをwhere条件で指定しユーザー情報を取得
        $user = User::where('id', '=', $id);
        return view('detail')->with('user', $user);
    }
}
```
web.phpでのルーティングでは、ルートパラメータを｛｝で囲んでいます。  
こうすることでController側で｛｝の中のパラメータ名で引数で受け取ることができます。

---

## CSRF対策
### CSRFとは？
クロスサイトリクエストフォージェリの略です。掲示板や問い合わせフォームなどを処理するWebアプリケーションが、他サイトからのリクエストを受信し想定外の処理をされてしまう攻撃のことを言います。  
攻撃の例として、掲示板やアンケートフォームへの不正な書きこみや、大量にデータを登録しDBに過剰な負荷をかけられたりなどがあります。  

このcsrf対策として、@csrfという新しい記述が登場しました。   
Laravelではpost送信のフォームではこの記述がないとエラーになる場合があります。  
セキュリティ上重要になるのでPOST送信の場合は必ず書くようにします。  
Laravelのバージョンによっては@csrfが使用できない場合があります。  
その際は {{ csrf_field() }}と記述しても@csrfと同じ動作になります。  

＜list.blade.php＞
```php
<form action="regist" method="post">
    @csrf
    名前：<input type="text" name="name"><br>
    スコア：<input type="number" name="score"><br>
    <button>登録</button>
</form>
```
