class Room < Base
  # name:string number:string
  default_scope { includes(:events).order('events.begin_date ASC') }

  has_many :likes, as: :likeable

  has_many :events, class_name: 'Event'
  accepts_nested_attributes_for :events, allow_destroy: true
  belongs_to :forum

  def near_event(near_date=nil)
    result = events.order(begin_date: :asc)
    result = result.where('begin_date > ?', near_date) if near_date
    result.order(begin_date: :asc).first
  end
  def full_name
    self.name + (self.number ? ' - ' + self.number : '')
  end
  def alias_url
    '/' + self.forum.alias + '/' + self.alias
  end
end