# chat-space
<!-- ・ユーザー管理機能
   user_table
・チャットグループ管理機能
   group_table
・チャットメッセージの保存機能
  massage_table -->


## user_table
|Column|Type|Options|
|------|----|-------|
|id----|integer|----|
|email|string|--|

## group_table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|---|

## massage_table
|Column|Type|Options|
|------|----|-------|
|text--|text|-------|
|date--|datetime|---|
|user_id|integer|---|
|group_id|integer|---|

## membersテーブル(中間テーブル)

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
