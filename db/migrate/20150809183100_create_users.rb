class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :encrypted_password

      # Person
      t.string :fullname
      t.datetime :registered_on

      t.belongs_to :person

      t.timestamps null: false
    end
  end
end
