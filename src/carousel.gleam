import carousel/slides
import gleam/int
import lustre
import lustre/attribute.{attribute, class, role}
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
  div([class("w-full bg-white")], [carousel(model.current_slide_index)])
}

pub fn carousel(slide_index: Int) {
  div(
    [class("relative overflow-hidden min-h-[500px] font-display text-white")],
    [
      slides.slide(
        "./priv/static/images/pbx.jpg",
        0,
        slide_index,
        slide1_content,
      ),
      slides.slide(
        "./priv/static/images/virtual-server.jpg",
        1,
        slide_index,
        slide2_content,
      ),
      slides.slide(
        "./priv/static/images/website-hosting.jpg",
        2,
        slide_index,
        slide3_content,
      ),
      slides.slide(
        "./priv/static/images/dedicated-server.jpg",
        3,
        slide_index,
        slide4_content,
      ),
      pagination(slide_index),
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

pub fn slide2_content() {
  div([class("font-display py-12 space-y-4 p-8 relative h-100")], [
    h1(
      [
        class(
          "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0",
        ),
      ],
      [text("Virtual Servers")],
    ),
    h4(
      [
        class(
          "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0",
        ),
      ],
      [text("Enterprise Windows or Linux virtual servers on reliable nodes.")],
    ),
    div([class("flex space-x-2")], [
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
          "1x Virtual 1.00Ghz",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
          "50GB Disk space",
        ),
      ]),
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
          "2GB RAM",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
          "50GB Bandwidth out",
        ),
      ]),
    ]),
    div([class("py-4 space-x-2")], [
      button(
        [
          class(
            "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("View All Plans")],
      ),
      button(
        [
          class(
            "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("Try It Free")],
      ),
    ]),
  ])
}

pub fn slide3_content() {
  div([class("font-display py-12 space-y-4 p-8 relative h-100")], [
    h1(
      [
        class(
          "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0",
        ),
      ],
      [text("Website Hosting")],
    ),
    h4(
      [
        class(
          "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0",
        ),
      ],
      [text("Powerful shared hosting on enterprise hardware.")],
    ),
    div([class("flex space-x-2")], [
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
          "Windows or Linux",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
          "10GB Storage",
        ),
      ]),
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
          "DNS Hosting",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
          "10GB Monthly traffic",
        ),
      ]),
    ]),
    div([class("py-4 space-x-2")], [
      button(
        [
          class(
            "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("View All Plans")],
      ),
      button(
        [
          class(
            "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("Try It Free")],
      ),
    ]),
  ])
}

pub fn slide4_content() {
  div([class("font-display py-12 space-y-4 p-8 relative h-100")], [
    h1(
      [
        class(
          "font-bold text-brand-purple text-5xl uppercase tracking-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-1s opacity-0",
        ),
      ],
      [text("Dedicated Servers")],
    ),
    h4(
      [
        class(
          "font-medium text-lg trackin-tight text-shadow animation-bounce-in-left animation-duration-1s animation-delay-2s opacity-0",
        ),
      ],
      [text("Experience enterprise class dedicated resources.")],
    ),
    div([class("flex space-x-2")], [
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-3s opacity-0",
          "iDRAC6 Express",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-4s opacity-0",
          "2 x 500GB SATAIII HDD",
        ),
      ]),
      div([class("flex flex-col space-y-2")], [
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-5s opacity-0",
          "32GB DDR3 ECC RAM",
        ),
        check_item(
          "animation-fade-in animation-duration-1s animation-delay-6s opacity-0",
          "Intel Xeon Quad Core 3.3Ghz CPU's",
        ),
      ]),
    ]),
    div([class("py-4 space-x-2")], [
      button(
        [
          class(
            "bg-brand-black border-brand-black py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("View All Plans")],
      ),
      button(
        [
          class(
            "bg-brand-purple border-brand-purple py-2 px-4 animation-zoom-in animation-duration-1s animation-delay-7s opacity-0",
          ),
        ],
        [text("Try It Free")],
      ),
    ]),
  ])
}
