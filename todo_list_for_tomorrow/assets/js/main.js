// このファイルに処理を記述する
let data;
let done;
// もしデータが保存されていたら、取り出す、そうでなければ空っぽの配列を代入しておく
// 取り出した中身があったら、trueと認識してくれる
if (localStorage.getItem('todoDataList')){
  data = JSON.parse(localStorage.getItem('todoDataList')); //データを取り出してdataに代入
}else{
  data = [];
}

if (localStorage.getItem('doneList')){
  done = JSON.parse(localStorage.getItem('doneList')); //データを取り出してdataに代入
}else{
  done = [];
}

// ローカルストレージの中身を確認する
console.log(data);

// 保存されたデータを、画面に表示する
for (let displayText of data){
   add_li_tag(displayText,'.todo-list');
}


// Addボタン要素の取得
let addBtn = document.querySelector('#btn');

// Addボタンが押された時のイベントを取得（addEventListener)
// イベントを察知したい要素.addEventListener(察知したいイベント名（文字列）,function(){イベントが発生したら行いたい処理});
addBtn.addEventListener('click',function(){

// 1.入力文字のチェック
// 入力文字の取得
let input_text = document.querySelector('#input').value;

  // input_textが空じゃなかったら、処理を行う
  if (input_text != ''){

    // liタグを追加する（2.3.の処理を実行)
    add_li_tag(input_text,'.todo-list');

    // 配列に新しい入力文字を追加
    data.push(input_text);

    // 配列をローカルストレージに保存
    localStorage.setItem('todoDataList',JSON.stringify(data));

    // 4.入力欄を空っぽにする
    document.querySelector('#input').value = '';
  }

});

// 追加するliタグの生成をする関数
function add_li_tag(task_text,parent_class_name){
  // liタグを追加する処理を記述
  // 2.ulの中にliとして表示する
  // 親要素のulを変数に取得
  let parent_list = document.querySelector(parent_class_name);

  // 追加予定のliタグを生成
  let li = document.createElement('li');
  // liのclassにlistを追加
  li.classList.add('list');

  li.textContent = task_text;

  // 3.liの中にボタンエリアとなるdivタグを追加
  // ボタン用のdivタグを生成
  let div_button = document.createElement('div');
  
  // divにクラス名buttonを指定
  div_button.classList.add('button');

  if (parent_class_name == '.todo-list'){
    // iタグの生成
    let i_tag_check = create_i('fas fa-check-circle');
    let i_tag_trash = create_i('far fa-trash-alt');

    // チェックボタンの処理の設定
    i_tag_check.addEventListener('click',function(){
      click_btn_check(this);
    });

    // 削除ボタンの処理の設定
    i_tag_trash.addEventListener('click',function(){
      click_btn_delete(this,'todoDataList');
    });

    div_button.appendChild(i_tag_check);
    div_button.appendChild(i_tag_trash);
  }else{
    // iタグの生成
    let i_tag_archive = create_i('fas fa-archive');
    // 削除ボタンの処理の設定
    i_tag_archive.addEventListener('click',function(){
      click_btn_delete(this,'doneList');
    });

    div_button.appendChild(i_tag_archive);
  }
  

  // 生成したdivタグを親要素liに追加
  li.appendChild(div_button);
  // liには、 <li class="list">入力された文字<div class="delete">Delete</div></li> が入ってる

  // 生成したliタグを親要素のulタグに追加(appendChildを使うことによりどんどん下に追加される)
  parent_list.appendChild(li);

}

// iタグを生成する関数
function create_i(class_list){
  let i_tag = document.createElement('i');

  let class_list_array = class_list.split(' ');

  for (let class_name of class_list_array){
    i_tag.classList.add(class_name);
  }

  return i_tag;
}

// 削除ボタンが押されたときの処理の関数
function click_btn_delete(clicked_btn,storageKey){
  let hantei = confirm('本当に削除しますか？');
  // OKが押されたら、削除する
  if (hantei == true){
        // 配列から削除
        let del_text = clicked_btn.parentElement.parentElement.textContent;
        data.splice(data.indexOf(del_text),1);

        clicked_btn.parentElement.parentElement.remove();
        // 削除済みの配列を全体的にローカルストレージに上書き保存
        localStorage.setItem(storageKey,JSON.stringify(data));
  }
}

// チェックボタンが押されたときの処理の関数（Doneに移動する）
function click_btn_check(clicked_btn){
  // Doneリストに追加
  let doneText = clicked_btn.parentElement.parentElement.textContent;
  add_li_tag(doneText,'.done-list');
  // 配列に新しい入力文字を追加
  done.push(doneText);

  // 配列をローカルストレージに保存
  localStorage.setItem('doneList',JSON.stringify(done));

  // todoからは削除
  // 配列から削除
  let del_text = clicked_btn.parentElement.parentElement.textContent;
  data.splice(data.indexOf(del_text),1);

  clicked_btn.parentElement.parentElement.remove();
  // 削除済みの配列を全体的にローカルストレージに上書き保存
  localStorage.setItem('todoDataList',JSON.stringify(data));
}



// quoteを出す配列
let quote = ['Be Athelete!','Go World!','Enjoy Everything.','Rome wasn\'t built in a day','Google it.','口に出して紙に書いてコミットする事。それは成功への近道'];
var random = Math.floor( Math.random() * quote.length );
document.querySelector('#quote').textContent = quote[random];