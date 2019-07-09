# chat-space DB設計

## user_table
|Column|Type|Options|
|------|----|-------|
|id----|integer|----|
|email|string|--|

## group_table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|---|
### Association
- belongs_to :user

## massage_table
|Column|Type|Options|
|------|----|-------|
|text--|text|-------|
|date--|datetime|---|
|user_id|integer|---|
|group_id|integer|---|
### Association
- belongs_to :group
- belongs_to :user

## user_group_table(中間テーブル)
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
