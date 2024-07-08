import gleam/option.{type Option}

pub type Msg {
  UserClickedSlidePage(slide_index: Int)
  UserClickedSlideNext
  UserClickedSlidePrev
  AutoplayTimeoutTriggered
  AutoplayTimeoutSet(TimerID)
  UserMouseOveredCarousel
  UserMouseLeftCarousel
}

pub type Model {
  Model(current_slide_index: Int, total_slides: Int, timer: Option(TimerID))
}

pub type RequestID =
  Nil

pub type TimerID =
  Int
