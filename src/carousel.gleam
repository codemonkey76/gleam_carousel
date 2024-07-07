import carousel/effects
import carousel/slides
import carousel/types.{
  type Model, type Msg, AutoplayTimeoutSet, AutoplayTimeoutTriggered, Model,
  UserClickedSlideNext, UserClickedSlidePage, UserClickedSlidePrev,
  UserMouseLeftCarousel, UserMouseOveredCarousel,
}
import carousel/ui
import gleam/int
import gleam/io
import gleam/option.{type Option, None, Some}
import lustre
import lustre/attribute.{attribute, class, id, role}
import lustre/effect.{type Effect}
import lustre/element.{text}
import lustre/element/html.{button, div, nav}
import lustre/element/svg.{svg}
import lustre/event

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
      io.println("Mouse Entered -> Pausing Autoplay")
      let model = model |> stop_autoplay
      #(model, effect.none())
    }
    UserMouseLeftCarousel -> {
      io.println("Mouse Left -> Starting Autoplay")
      #(model, effects.start_autoplay())
    }
    AutoplayTimeoutSet(timer) -> {
      #(Model(..model, timer: Some(timer)), effect.none())
    }
    AutoplayTimeoutTriggered -> {
      let model = model |> increment_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
    UserClickedSlidePage(n) -> #(
      model |> set_page_number(n),
      effects.start_animations(slide_selector, n),
    )
    UserClickedSlideNext -> {
      let model = model |> increment_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
    UserClickedSlidePrev -> {
      let model = model |> decrement_page
      #(
        model,
        effects.start_animations(slide_selector, model.current_slide_index),
      )
    }
  }
}

fn stop_autoplay(model: Model) -> Model {
  case model.timer {
    Some(timer) -> types.clear_timeout(timer)
    _ -> Nil
  }

  Model(..model, timer: None)
}

fn decrement_page(model: Model) -> Model {
  case model.current_slide_index {
    0 -> Model(..model, current_slide_index: model.total_slides - 1)
    _ -> Model(..model, current_slide_index: model.current_slide_index - 1)
  }
}

fn increment_page(model: Model) -> Model {
  case model.current_slide_index {
    n if n < model.total_slides - 1 ->
      Model(..model, current_slide_index: model.current_slide_index + 1)
    _ -> Model(..model, current_slide_index: 0)
  }
}

fn set_page_number(model: Model, page: Int) -> Model {
  case page {
    n if n < model.total_slides && n >= 0 ->
      Model(..model, current_slide_index: n)
    _ -> model
  }
}

pub fn view(model: Model) {
  div([class("w-full bg-white")], [carousel(model.current_slide_index)])
}

pub fn carousel(slide_index: Int) {
  div(
    [
      id("carousel-1"),
      event.on_mouse_enter(UserMouseOveredCarousel),
      event.on_mouse_leave(UserMouseLeftCarousel),
      class("relative overflow-hidden min-h-[500px] font-display text-white"),
    ],
    [
      slides.slide(
        "./priv/static/images/pbx.jpg",
        0,
        slide_index,
        slides.slide1_content,
      ),
      slides.slide(
        "./priv/static/images/virtual-server.jpg",
        1,
        slide_index,
        slides.slide2_content,
      ),
      slides.slide(
        "./priv/static/images/website-hosting.jpg",
        2,
        slide_index,
        slides.slide3_content,
      ),
      slides.slide(
        "./priv/static/images/dedicated-server.jpg",
        3,
        slide_index,
        slides.slide4_content,
      ),
      pagination(slide_index),
      ui.next_button(),
      ui.prev_button(),
    ],
  )
}

fn pagination(slide_index) {
  nav(
    [
      class(
        "absolute flex mx-auto pb-2 bottom-0 left-0 right-0 justify-center space-x-2",
      ),
    ],
    [
      pagination_button(0, slide_index == 0),
      pagination_button(1, slide_index == 1),
      pagination_button(2, slide_index == 2),
      pagination_button(3, slide_index == 3),
    ],
  )
}

fn pagination_button(number: Int, active: Bool) {
  let classes = case active {
    False -> "bg-[#aaa]"
    True -> "bg-[#333] scale-150"
  }
  button(
    [
      event.on_click(UserClickedSlidePage(number)),
      class(classes),
      class(
        "text-transparent rounded-full w-[.5em] h-[.5em] ease-in-out duration-250 transition-all",
      ),
      role("tab"),
      attribute.attribute("aria-selected", "true"),
    ],
    [text(int.to_string(number))],
  )
}
