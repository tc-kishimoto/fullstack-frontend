# VIEW

コントローラによってアクセスされるURL毎に処理を分けることができるようになりましたが、複雑なレイアウトで画⾯を表⽰したい場合にはコントローラだけで処理をするのは無理があります。  
Laravelでは画⾯表⽰（VIEW）に特化した機能も⽤意されています。

---

## Bladeテンプレート

HTMLに直接組み込むことができる技術のことをテンプレートエンジンと
呼びます。  
PHPは⾔語そのものがテンプレートエンジンとしての役割をはたしますが、LaravelではPHPを直接組み込むよりも効率的にVIEWを作成することができるBladeテンプレートと呼ばれるテンプレートエンジンが⽤意されています。  
LaravelではVIEWの開発にはBladeテンプレートを使⽤するのが⼀般的で
す。

Bladeテンプレートのファイルは「recources/views」フォルダに格納し
ます。  
Bladeテンプレートのファイル名は「xxxx.blade.php」となります。xxxx
の部分は画⾯毎に適切な名前をつけます。

---

### Bladeテンプレートの作成
実際にBladeテンプレートを作成してみます。  
HTMLの書かれたファイルを作成します。  
作成したファイルは「resources/views」フォルダに格納してください。  
＜list.blade.php＞
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Student⼀覧</title>
</head>
<body>
    <table>
        <tr>
            <th>ID</th>
            <th>名前</th>
            <th>スコア</th>
        </tr>
        <tr>
            <td>1</td>
            <td>AAAA</td>
            <td>50</td>
        </tr>
    </table>
</body>
</html>
```

---

### Bladeテンプレートの指定
コントローラでは、viewメソッドの引数にBladeテンプレートの名前を指定してreturnします。  
＜StudentController.php＞
```php
class StudentController extends Controller
{
    public function index(Student $student)
    {
        return view('list');
    }
}
```

---

### Bladeテンプレートの確認
作成出来たらサーバーを起動してブラウザからhttp://localhost:8000/list にアクセスします。  
作成されたHTMLの内容が表示されます。  
＜結果＞
```
ID 名前 スコア
1  AAAA 50
```

---

### DBのデータを表示
表示内容を固定されたものではなく、DBから取得したデータを取るように変更します。  
list.blade.phpの中身を以下のように修正します。  
＜list.blade.php＞
```php
<table>
    <tr>
        <th>ID</th>
        <th>名前</th>
        <th>スコア</th>
    </tr>
    @foreach($students as $student)
    <tr>
        <td>{{ $student->id }}</td>
        <td>{{ $student->name }}</td>
        <td>{{ $student->score }}</td>
    </tr>
    @endforeach
    </table>
</body>
</html>
```

---

コントローラを以下のようにします。  
＜StudentController.php＞
```php
class StudentController extends Controller
{
    public function index(Student $student)
    {
        $students = $student->all();
        return view('list')->with('students', $students);
    }
}
```
studentsテーブルの一覧が表示されるようになれば成功です。  
＜結果＞
```
ID 名前 スコア
1  Alice 80
```

---

### VIEWへの値の受け渡し
コントローラからVIEWに対して値を受け渡す場合は、withメソッドを使って値を受け渡すことができます。  
＜StudentController.php＞
```php
class StudentController extends Controller
{
    public function index(Student $student)
    {
        $students = $student->all();
        return view('list')->with('students', $students);
    }
}
```

---

### VIEWの制御
bladeテンプレートでは、{{ }} の中に式を書くことができます。  
あらかじめLaravelで⽤意されている変数や関数、コントローラから受け取ったオブジェクトを指定することが可能です。  
「@xxx」の部分はディレクティブと呼ばれ、@foreachはphpのforeach⽂と同じような動作をします。  
＜list.blade.php＞
```php
@foreach($students as $student)
<tr>
    <td>{{ $student->id }}</td>
    <td>{{ $student->name }}</td>
    <td>{{ $student->score }}</td>
</tr>
@endforeach
```

---

## 主要なBladeディレクティブ

### for文
繰り返し文は@forと@foreachが用意されています。
```php
@for ($i = 0; $i < 10; $i++)
    <p>iの値は {{ $i }}</p>
@endfor
```

```php
@foreach ($users as $user)
    <p>ユーザーIDは {{ $user->id }} です</p>
@endforeach
```

---

### If文
Bladeの中でif文を記述することができます。  
@if、@elseif、@else、@endifを使用します。
```php
@if ($age >= 13)
    <p>"中学生です"</p>
@elseif ($age >= 16)
    <p>"高校生です"</p>
@elseif ($age >= 18)
    <p>"成人です"</p>
@else 
    <p>"小学生以下です"</p>
@endif
```
---

### swicth文
swicthは@swicth、@case、@break、@default、@endswitchを使用します。
```php
@switch($i)
    @case(1)
        最初のケース
        @break

    @case(2)
        ２番目のケース
        @break

    @default
        デフォルトケース
@endswitch
```

---

Bladeテンプレートに関しての詳細や、使用できるディレクティブについては公式サイトを参照ください。  
[Laravel Bladeテンプレート](https://readouble.com/laravel/8.x/ja/blade.html)

---

