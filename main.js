'use strict';

{
  function setWord () {
    // word = words[Math.floor(Math.random() * words.length)]
    // ワードの重複を防ぐために打った単語は1つずつ減らしていく
    // wordsから要素を1件だけ取得する処理を行っているが1件だけであってもspliceの結果は配列で返されるので、その配列から要素を取り出すには[0]とする必用がある
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
  ]
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');

  document.addEventListener('click', e => {
    if(isPlaying === true){
      return;
    }

    // ゲーム開始したとする
    isPlaying = true;

    // クリック時の時刻を取得
    startTime = Date.now;

    // 最初の単語を表示
    setWord();
  })
  
  document.addEventListener('keydown', e => {
    if(e.key !== word[loc]){
      return;
    }

    // if(e.key === word[loc]){
    loc++;

    // 1:_ed
    // 2:__d
    // 3:___
    target.textContent = '_'.repeat(loc) + word.substring(loc);
    // }

    // 最後まで打ち終わったら単語数とロケーションの数が同じになる
    if(loc === word.length){

      // wordsから単語がなくなったとき（全て打ち終わったとき）
      if(words.length === 0){
        // 経過時刻を取得、ミリ秒単位なので1000で割る、小数点以下2桁まで表示したいのでtoFixed
        const elapsedTime = ((Data.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }

      // 次の単語へ
      setWord();
    }
  });
}