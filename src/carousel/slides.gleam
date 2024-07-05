import gleam/int
import lustre/attribute.{class, style}
import lustre/element.{type Element}
import lustre/element/html.{div}

pub fn slide(
  image_url: String,
  slide_index: Int,
  current_index: Int,
  content: fn() -> Element(a),
) {
  div(
    [
      class("w-full h-full absolute bg-cover py-12 slide"),
      style([
        #("background-image", "url('" <> image_url <> "')"),
        #("transition", "transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);"),
        get_transform(slide_index, current_index),
      ]),
    ],
    [content()],
  )
}

fn get_transform(slide_number, current_slide) {
  #(
    "transform",
    "translateX("
      <> int.to_string({ 100 * { slide_number - current_slide } })
      <> "%)",
  )
}
