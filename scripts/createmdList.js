const fs = require('fs');
const path = require("path");

const data = {
    categories: [],
    contents: {},
};
// ディレクトリ一覧取得
const dirs = fs.readdirSync('../public/markdowns').filter(file => fs.statSync(path.join('../public/markdowns', file)).isDirectory());

dirs.forEach(dir => {
    data.categories.push(dir);
    const contents = [];
    const markdowns = fs.readdirSync('../public/markdowns/' + dir).filter(e => path.extname(e) === '.md');
    markdowns.forEach(file => {
        contents.push(path.basename(file, '.md'));
    });
    // obj = {};
    // obj[dir] = contents
    // data.contents.push(obj)
    data.contents[dir] = contents;

    // data.push({category: dir, contents: contents});
})

console.log(data)

fs.writeFile('../src/config/mdlist.json', JSON.stringify(data), (err) => {
    // 書き出しに失敗した場合
    if(err){
        console.log("エラーが発生しました。" + err)
        throw err
    }
    // 書き出しに成功した場合
    else{
        console.log('mdlist.json ' + "ファイルが正常に書き出しされました")
    }
});