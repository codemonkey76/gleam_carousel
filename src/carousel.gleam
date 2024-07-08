import carousel/effects
import carousel/model
import carousel/types.{
  type Model, type Msg, AutoplayTimeoutSet, AutoplayTimeoutTriggered, Model,
  UserClickedSlideNext, UserClickedSlidePage, UserClickedSlidePrev,
  UserMouseLeftCarousel, UserMouseOveredCarousel,
}
import carousel/view
import gleam/option.{None, Some}
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element/html

const carousel_selector = "#carousel-1"

const slide_selector = ".slide"

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
}

pub fn init(_flags) -> #(Model, Effect(Msg)) {
  #(
    Model(0, 4, None),
    effects.init_animations(carousel_selector, slide_selector, 0),
  )
}

pub fn update(model: Model, msg) {
  case msg {
    UserMouseOveredCarousel -> {
      let model = model |> model.stop_autoplay
      #(model, effect.none())
    }
    UserMouseLeftCarousel -> {
      #(model, effects.start_autoplay())
    }
    AutoplayTimeoutSet(timer) -> {
      #(Model(..model, timer: Some(timer)), effect.none())
    }
    AutoplayTimeoutTriggered -> {
      let model = model |> model.increment_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
    UserClickedSlidePage(n) -> #(
      model |> model.set_page_number(n),
      effects.start_animations(slide_selector, n),
    )
    UserClickedSlideNext -> {
      let model = model |> model.increment_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
    UserClickedSlidePrev -> {
      let model = model |> model.decrement_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
  }
}

pub fn view(model: Model) {
  html.div([attribute.class("w-full bg-white")], [
    view.carousel(model.current_slide_index),
  ])
}
