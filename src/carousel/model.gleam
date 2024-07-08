import carousel/globals.{clear_timeout}
import carousel/types.{type Model, Model}
import gleam/option.{None, Some}

pub fn stop_autoplay(model: Model) -> Model {
  case model.timer {
    Some(timer) -> clear_timeout(timer)
    _ -> Nil
  }

  Model(..model, timer: None)
}

pub fn decrement_page(model: Model) -> Model {
  case model.current_slide_index {
    0 -> Model(..model, current_slide_index: model.total_slides - 1)
    _ -> Model(..model, current_slide_index: model.current_slide_index - 1)
  }
}

pub fn increment_page(model: Model) -> Model {
  case model.current_slide_index {
    n if n < model.total_slides - 1 ->
      Model(..model, current_slide_index: model.current_slide_index + 1)
    _ -> Model(..model, current_slide_index: 0)
  }
}

pub fn set_page_number(model: Model, page: Int) -> Model {
  case page {
    n if n < model.total_slides && n >= 0 ->
      Model(..model, current_slide_index: n)
    _ -> model
  }
}
