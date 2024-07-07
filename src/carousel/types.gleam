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

@external(javascript, "../ffi.mjs", "requestAnimationFrame")
pub fn request_animation_frame(callback: fn(Float) -> Nil) -> RequestID

@external(javascript, "../ffi.mjs", "setTimeout")
pub fn set_timeout(delay: Int, callback: fn() -> a) -> TimerID

@external(javascript, "../ffi.mjs", "clearTimeout")
pub fn clear_timeout(timer: TimerID) -> Nil

@external(javascript, "../ffi.mjs", "playAnimationsForSlide")
pub fn play_animations_for_slide(selector: String, index: Int) -> Nil

@external(javascript, "../ffi.mjs", "resetAnimations")
pub fn do_reset_animations(selector: String) -> Nil
