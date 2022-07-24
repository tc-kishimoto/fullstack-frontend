// src/configにmdlist.jsonファイルを作成する
const fs = require('fs');
const path = require("path");
const config = JSON.parse(fs.readFileSync('../src/config/config.json', 'utf8'));

const data = {
    categories: [],
    contents: {},
};
// ディレクトリ一覧取得
const dirs = fs.readdirSync('../public/markdowns').filter(file => fs.statSync(path.join('../public/markdowns', file)).isDirectory());
// ディレクトリ並び替え
dirs.sort((a, b) => {
    num1 = ('order' in config.categoryInfo[a]) ? config.categoryInfo[a].order : 9999;
    num2 = ('order' in config.categoryInfo[b]) ? config.categoryInfo[b].order : 9999;
    return num1 - num2;
})
dirs.forEach(dir => {
    data.categories.push(dir);
    const contents = [];
    const markdowns = fs.readdirSync('../public/markdowns/' + dir).filter(e => path.extname(e) === '.md');
    // 絞り込み
    const target = markdowns.filter(m => !config.exclusionList.find(e => e === path.basename(m, '.md')))
    target.forEach(file => {
        contents.push(path.basename(file, '.md'));
    });
  
    data.contents[dir] = contents;

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