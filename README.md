# chat-space DB設計

## users_table
|Column|Type|Options|
|------|----|-------|
|id----|integer|----|
|email|string|------|
|password|string|---|
|name|text|null: false, index: true|
### Association
- has_many :message
- has_many :users_groups_table
- has_many :groups, through: :user_groups

## groups_table
|Column|Type|Options|
|------|----|-------|
|name|text|---|
### Association
- has_many :message
- has_many :users_groups_table
- has_many :users, through: :user_groups

## massages_table
|Column|Type|Options|
|------|----|-------|
|text--|text|-------|
|date--|datetime|---|
|image|string|------|
|users_id|references|null: false, foreign_key: true|
|groups_id|references|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :users

## users_groups_table(中間テーブル)
|Column|Type|Options|
|------|----|-------|
|users_id|references|null: false, foreign_key: true|
|groups_id|references|null: false, foreign_key: true|
### Association
- has_many :message
- belongs_to :groups
- belongs_to :users
