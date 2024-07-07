import carousel/types.{type Msg, AutoplayTimeoutSet, AutoplayTimeoutTriggered}
import carousel/ui
import lustre/effect.{type Effect}

pub fn start_autoplay() -> Effect(Msg) {
  use dispatch <- effect.from
  use _ <- types.request_animation_frame

  let timer =
    types.set_timeout(1000, fn() { dispatch(AutoplayTimeoutTriggered) })
  AutoplayTimeoutSet(timer) |> dispatch
}

pub fn start_animations(slide_selector: String, slide_index: Int) -> Effect(Msg) {
  use _ <- effect.from
  use _ <- types.request_animation_frame

  types.play_animations_for_slide(slide_selector, slide_index)
  Nil
}

pub fn init_animations(
  carousel_selector: String,
  slide_selector: String,
  slide_index: Int,
) -> Effect(Msg) {
  use dispatch <- effect.from
  use _ <- types.request_animation_frame

  types.do_reset_animations(carousel_selector)
  types.play_animations_for_slide(slide_selector, slide_index)
  let timer =
    types.set_timeout(1000, fn() { dispatch(AutoplayTimeoutTriggered) })

  AutoplayTimeoutSet(timer) |> dispatch
}
