import gleam/int
import lustre
import lustre/attribute.{attribute, class, style}
import lustre/effect.{type Effect}
import lustre/element.{text}
import lustre/element/html.{button, div, h1, h4, nav, span}
import lustre/element/svg.{svg}
import lustre/event

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
}

pub type Model {
  Model(current_slide_index: Int, total_slides: Int)
}

pub type Msg {
  UserClickedSlidePage(slide_index: Int)
  UserClickedSlideNext
  UserClickedSlidePrev
}

pub fn init(_flags) -> #(Model, Effect(Msg)) {
  #(Model(0, 4), effect.none())
}

pub fn update(model: Model, msg) {
  case msg {
    UserClickedSlidePage(n) -> #(model |> set_page_number(n), effect.none())
    UserClickedSlideNext -> #(
      model |> set_page_number(model.current_slide_index + 1),
      effect.none(),
    )
    UserClickedSlidePrev -> #(
      model |> set_page_number(model.current_slide_index - 1),
      effect.none(),
    )
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
  div([class("w-full bg-white")], [
    carousel(model.current_slide_index, model.current_slide_index),
    button([event.on_click(UserClickedSlideNext), class("font-display")], [
      text("Next"),
    ]),
    button([event.on_click(UserClickedSlidePrev), class("font-display")], [
      text("Prev"),
    ]),
    // carousel-inner
  ])
}

pub fn carousel(slide_index: Int, total_slides: Int) {
  div([class("carousel-inner font-display text-white")], [
    slide1(0, slide_index),
    slide2(1, slide_index),
    slide3(2, slide_index),
    slide4(3, slide_index),
    pagination(slide_index, total_slides),
  ])
}

fn get_transform(slide_number, current_slide) {
  #(
    "transform",
    "translateX("
      <> int.to_string({ 100 * { slide_number - current_slide } })
      <> "%)",
  )
}

fn pagination(slide_index, total_slides) {
  nav([class("absolute mx-auto bottom-0 ")], [
    button([], [text("foo")]),
    button([], [text("bar")]),
  ])
}

fn slide1(num, current) {
  div(
    [
      class("w-full h-full absolute bg-cover py-12"),
      style([
        #("background-image", "url('./priv/static/images/pbx.jpg')"),
        #("transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"),
        get_transform(num, current),
      ]),
    ],
    [slide1_content()],
  )
}

fn check_item(classes: String, content: String) {
  div([class(classes), class("flex items-center space-x-2")], [
    svg(
      [
        class("fill-current text-brand-purple size-6 relative svg-shadow"),
        attribute("xmlns", "http://www.w3.org/2000/svg"),
        attribute("viewBox", "0 0 512 512"),
      ],
      [
        svg.path([
          attribute("d", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"),
        ]),
      ],
    ),
    svg(
      [
        class("fill-current absolute svg-shadow size-3"),
        attribute("xmlns", "http://www.w3.org/2000/svg"),
        attribute("viewBox", "0 0 448 512"),
      ],
      [
        svg.path([
          attribute(
            "d",
            "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z",
          ),
        ]),
      ],
    ),
    span([class("text-lg tracking-tight text-shadow")], [text(content)]),
  ])
}

pub fn slide1_content() {
  div([class("font-display py-12 space-y-4 p-8 relative h-100")], [
    h1(
      [
        class(
          "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0",
        ),
      ],
      [text("Hosted PBX")],
    ),
    h4(
      [
        class(
          "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0",
        ),
      ],
      [text("Cloud-based communication system without the chunky equipment.")],
    ),
    div([class("flex flex-col space-y-2")], [
      check_item(
        "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
        "Can come with transportable handsets.",
      ),
      check_item(
        "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
        "Compatible with your personal mobile devices.",
      ),
      check_item(
        "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
        "Unlimited extensions.",
      ),
    ]),
    div([class("py-4 space-x-2")], [
      button(
        [
          class(
            "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-6s opacity-0",
          ),
        ],
        [text("View All Plans")],
      ),
      button(
        [
          class(
            "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-6s opacity-0",
          ),
        ],
        [text("Try It Free")],
      ),
    ]),
  ])
}

pub fn slide2(num, current) {
  div(
    [
      class("w-full h-full absolute bg-cover"),
      style([
        #("background-image", "url('./priv/static/images/pbx.jpg')"),
        #("transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"),
        get_transform(num, current),
      ]),
    ],
    [],
  )
}

pub fn slide3(num, current) {
  div(
    [
      class("w-full h-full absolute bg-cover"),
      style([
        #("background-image", "url('./priv/static/images/pbx.jpg')"),
        #("transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"),
        get_transform(num, current),
      ]),
    ],
    [],
  )
}

pub fn slide4(num, current) {
  div(
    [
      class("w-full h-full absolute bg-cover"),
      style([
        #("background-image", "url('./priv/static/images/pbx.jpg')"),
        #("transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"),
        get_transform(num, current),
      ]),
    ],
    [],
  )
}
