// 返信欄の要素を変数に格納
let comment_area = document.getElementsByName('decide_message');

// 返信欄が存在する場合、後続の処理を実行
if (comment_area.length > 0) {

  // レッスン名の要素を変数に格納
  let lesson = document.getElementsByClassName('request-title');
  // レッスン名を格納するための変数を宣言
  let lesson_raw, lesson_formatted;
  // レッスン名が存在する場合、後続の処理を実行
  if (lesson.length > 0) {
    // レッスン名の原文を変数に格納
    lesson_raw = lesson[0].firstElementChild.innerHTML;
    // 原文からレッスン名の部分を変数に格納（ハイフンより前の文字列が実際のレッスン名）
    lesson_formatted = lesson_raw.substring(lesson_raw.indexOf('-') + 1).trim();
  }

  // レッスン名に応じて返信メッセージを生成
  let msg = '';
  if (lesson_formatted.match(/添削/)) {
    // レッスン名に「添削」を含む場合
    msg += `${lesson_formatted}のリクエストありがとうございます。\n`;

  } else if (lesson_formatted.match(/アカデミー/)) {
    // レッスン名に「アカデミー」を含む場合
    msg += 'リクエストありがとうございます。\n';
    msg += '\n';
    msg += `トピック: ${lesson_formatted}\n`;
    msg += '時間: \n';
    msg += '\n';
    msg += 'Zoomミーティングに参加する\n';
    msg += '\n';
    msg += 'ミーティングID: \n';
    msg += 'パスコード: \n';

  } else {
    // 上記以外
    msg += 'リクエストありがとうございます。\n';

    // 日時を取得して返信メッセージに追記(下記以外のフォーマットには未対応)
    // Sun Nov 27, 2022 17:00	
    // 2022年11月27日(日) 17時00分
    let dates = document.getElementsByClassName('date green');
    let date_raw, date_formatted;
    if (dates.length > 0) {
      // 日付の原文を変数に格納
      date_raw = dates[0].innerHTML;

      date_formatted = date_raw.match(/(\d+)年(\d+)月(\d+)/);
      if (date_formatted != null) {
        // 日付が日本語フォーマットに一致する場合、返信メッセージに日付を追加
        msg += `${date_formatted.slice(-1)[0]}日、`;
      } else {
        // 日付が英語フォーマットに一致する場合、返信メッセージに日付を追加
        date_formatted = date_raw.match(/(\d+),.(\d+)*:*/);
        if (date_formatted != null) {
          msg += `${date_formatted[1]}日、`;
        }
      }
      // 日付がフォーマットに一致する場合もしない場合も返信メッセージに定型文を追加
      msg += 'よろしくお願いします。';
    }
  }

  // 生成した返信メッセージを返信欄にセット
  comment_area[0].value = msg;
}
