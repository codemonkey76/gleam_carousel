import carousel/types.{UserClickedSlideNext, UserClickedSlidePrev}
import lustre/attribute.{attribute, class}
import lustre/element/html.{button, div}
import lustre/element/svg.{svg}
import lustre/event.{on_click}

pub fn prev_button() {
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

pub fn next_button() {
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
