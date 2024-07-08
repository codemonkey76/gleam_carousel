import carousel/slides
import carousel/types.{
  UserClickedSlideNext, UserClickedSlidePage, UserClickedSlidePrev,
  UserMouseLeftCarousel, UserMouseOveredCarousel,
}
import gleam/int
import lustre/attribute.{attribute, class, id, role}
import lustre/element.{text}
import lustre/element/html.{button, div, nav}
import lustre/element/svg.{svg}
import lustre/event.{on_click}

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
      next_button(),
      prev_button(),
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

fn prev_button() {
  div([class("absolute top-0 bottom-0 flex items-center")], [
    div([class("p-10 pl-2 group")], [
      button(
        [
          on_click(UserClickedSlidePrev),
          attribute("title", "Previous Slide"),
          class(
            "flex items-center justify-center w-10 h-10 p-3 rounded-full duration-200 group-hover:bg-white/30 text-transparent group-hover:text-gray-900/80",
          ),
        ],
        [
          svg(
            [
              class("fill-current"),
              attribute("xmlns", "http://www.w3.org/2000/svg"),
              attribute("viewBox", "0 0 320 512"),
            ],
            [
              svg.path([
                attribute(
                  "d",
                  "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z",
                ),
              ]),
            ],
          ),
        ],
      ),
    ]),
  ])
}

fn next_button() {
  div([class("absolute top-0 bottom-0 right-0 flex items-center")], [
    div([class("p-10 pr-2 group")], [
      button(
        [
          on_click(UserClickedSlideNext),
          attribute("title", "Next Slide"),
          class(
            "flex items-center justify-center w-10 h-10 p-3 rounded-full duration-200 group-hover:bg-white/30 text-transparent group-hover:text-gray-900/80",
          ),
        ],
        [
          svg(
            [
              class("fill-current"),
              attribute("xmlns", "http://www.w3.org/2000/svg"),
              attribute("viewBox", "0 0 320 512"),
            ],
            [
              svg.path([
                attribute(
                  "d",
                  "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z",
                ),
              ]),
            ],
          ),
        ],
      ),
    ]),
  ])
}
